import { COMPONENTS } from "../constants.js";

import type {
  WebTypes,
  Tag,
  Attribute,
  EventProperty,
  SlotBinding,
  ExposeProperty,
} from "../types.ts";

interface Types {
  [key: string]: ArgType | undefined;
}

export interface ArgType {
  control?: "text" | "date" | "number" | "boolean" | "array" | "select" | "object" | false;
  options?: string[];
  table?: TableConfig;
  name?: string;
  description?: string;
  type?: { required?: boolean } | string | null;
  action?: string;
}

interface TableConfig {
  disable?: boolean;
  defaultValue?: { summary: unknown };
  category?: "props" | "slots" | "expose" | "Storybook Events";
  type?: Record<string, string | string[]>;
}

type ComponentNames = keyof typeof COMPONENTS;

/* Load Web-Types from the project root. */
const [webTypes]: WebTypes[] = Object.values(
  import.meta.glob("/node_modules/.cache/vueless/web-types.json", {
    eager: true,
    import: "default",
  }),
);

const getComponentData = (componentName: ComponentNames) => {
  const component = webTypes?.contributions?.html?.tags?.find(
    (item: Tag) => item.name === componentName,
  );

  if (!component) {
    // eslint-disable-next-line no-console
    console.warn(
      "The component docs data is missing. Probably the `web-types.json` file is missing or have incorrect format.",
    );
  }

  return component;
};

export function getSlotNames(componentName: string | undefined) {
  if (!componentName) return;

  return getComponentData(componentName as ComponentNames)?.slots?.map((item) => item.name);
}

export function getArgTypes(componentName: string | undefined) {
  if (!componentName) return;

  const component = getComponentData(componentName as ComponentNames);

  if (!component) return;

  const types: Partial<Types> = {
    // Hide default template arg in docs.
    defaultTemplate: { table: { disable: true } },
    // Hide slot template arg in docs.
    slotTemplate: { table: { disable: true } },
  };

  component.attributes?.forEach((attribute: Attribute) => {
    const type = attribute.value.type;

    if (attribute.enum) {
      attribute.enum = attribute.enum.map((item) => {
        if (item === "UnknownObject") return "Object";
        if (item === "UnknownArray") return "Array";

        return item;
      });
    }

    const nonUnionTypes = [
      "null",
      "string",
      "number",
      "boolean",
      "Date",
      "Array",
      "Object",
      "UnknownArray",
      "UnknownObject",
    ];

    if (attribute.enum?.some((value) => !nonUnionTypes.includes(value))) {
      types[attribute.name] = {
        options: attribute.enum,
        control: "select",
        table: {
          type: { summary: attribute.enum.join(" | ") },
          defaultValue: { summary: attribute.default || "" },
        },
      };
    } else if (attribute.enum?.some((value) => nonUnionTypes.includes(value))) {
      let control = attribute.enum[0];

      if (control === "string") {
        control = "text";
      }

      if (control === "Date") {
        control = "date";
      }

      types[attribute.name] = {
        control: control as ArgType["control"],
        table: {
          type: { summary: attribute.enum.join(" | ") },
          defaultValue: { summary: attribute.default || "" },
        },
      };
    }

    if (attribute.enum?.length === 1) {
      types[attribute.name] = {
        control: "object",
        table: {
          type: { summary: attribute.enum.join(" | ") },
          defaultValue: { summary: attribute.default || "" },
        },
      };
    }

    if (type === "string") {
      types[attribute.name] = {
        control: "text",
        table: {
          type: { summary: "string" },
          defaultValue: { summary: attribute.default || "" },
        },
      };
    }

    if (type === "number") {
      types[attribute.name] = {
        control: "number",
        table: {
          type: { summary: "number" },
          defaultValue: { summary: attribute.default || "" },
        },
      };
    }

    if (type === "Date") {
      types[attribute.name] = {
        control: "date",
        table: {
          type: { summary: "Date" },
          defaultValue: { summary: attribute.default || "" },
        },
      };
    }

    if (type === "TModelValue") {
      types[attribute.name] = {
        control: "date",
        table: {
          defaultValue: { summary: attribute.default || "" },
          type: {
            summary: ["string", "Date", "from: string, to: string", "from: Date, to: Date"].join(
              " | ",
            ),
          },
        },
      };
    }

    if (type === "boolean") {
      types[attribute.name] = {
        control: "boolean",
        table: {
          type: { summary: "boolean" },
          defaultValue: { summary: attribute.default || "" },
        },
      };
    }

    if (type === "array") {
      types[attribute.name] = {
        control: "array",
        table: {
          type: { summary: "array" },
          defaultValue: { summary: attribute.default || [] },
        },
      };
    }

    /* Hide ignored props. */
    if (attribute.description?.includes("@ignore")) {
      types[attribute.name] = {
        table: {
          disable: true,
        },
      };
    }

    /* Hide strange undefiled argType. */
    types["undefined"] = {
      table: {
        disable: true,
      },
    };

    /* Applying category, required and description for all props. */
    types[attribute.name] = {
      ...types[attribute.name],
      table: {
        ...types[attribute.name]?.table,
        category: "props",
      },
      type: {
        required: attribute.required,
      },
      description: attribute.description,
    };
  });

  component.slots?.forEach((slot) => {
    const bindings: string[] = [];

    slot.bindings?.forEach((binding: SlotBinding) => {
      if (binding.name === "name") return;

      const description = binding.description ? ` (${binding.description})` : "";

      bindings.push(`${binding.name}: ${binding.type}${description}`);
    });

    types[`${slot.name}Slot`] = {
      name: slot.name,
      description: slot.description,
      type: slot.bindings ? `{ ${bindings.join(", ")} }` : null,
      control: "text",
      table: { category: "slots" },
    };

    // Hide autogenerated slot docs, but keep props with the same name
    if (!component.attributes?.map((item) => item.name)?.includes(slot.name)) {
      types[slot.name] = {
        table: {
          disable: true,
        },
      };
    }
  });

  component.exposes?.forEach((expose) => {
    const properties: string[] = [];

    expose.properties?.forEach((property: ExposeProperty) => {
      const description = property.description ? ` (${property.description})` : "";

      properties.push(`${property.type}${description}`);
    });

    types[`${expose.name}Expose`] = {
      type: expose.properties ? properties.join(", ") : null,
      name: expose.name,
      description: expose.description,
      control: false,
      table: { category: "expose" },
    };

    // Hide autogenerated expose docs, but keep props with the same name
    if (!component.attributes?.map((item) => item.name)?.includes(expose.name)) {
      types[expose.name] = {
        table: {
          disable: true,
        },
      };
    }
  });

  component.events?.forEach((event) => {
    const properties: string[] = [];

    event.properties?.forEach((property: EventProperty) => {
      const description = property.description ? ` (${property.description})` : "";

      properties.push(`${property.name}: ${property.type}${description}`);
    });

    types[event.name] = {
      type: event.properties ? properties.join(", ") : null,
      name: event.name,
      description: event.description,
    };

    if (import.meta.env.STORYBOOK_FULL) {
      const eventName = "on" + event.name.charAt(0).toUpperCase() + event.name.slice(1);

      types[eventName] = {
        action: event.name,
        table: { category: "Storybook Events" },
      };
    }
  });

  return types;
}

export function getSource(defaultConfig: string) {
  return defaultConfig.replace("export default /*tw*/ ", "").replace(";", "");
}

export function getSlotsFragment(defaultTemplate: string) {
  return `
  <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
    <template v-if="slot === 'default' && !args['defaultSlot']">${defaultTemplate || ""}</template>
    <template v-else-if="slot === 'default' && args['defaultSlot']">{{ args['defaultSlot'] }}</template>
    <template v-else-if="args[slot + 'Slot']">{{ args[slot + 'Slot'] }}</template>
  </template>
`;
}

/**
 * Create story param config to show component description with a link on GitHub.
 */
export function getDocsDescription(componentName: string | undefined) {
  if (!componentName) {
    return {};
  }

  let viewOnGitHub = "";

  if (COMPONENTS[componentName as ComponentNames]) {
    viewOnGitHub = `| <a href="https://github.com/vuelessjs/vueless/tree/main/src/${COMPONENTS[componentName as ComponentNames]}" target="_blank">View on GitHub</a>`;
  }

  return {
    description: {
      component: `The \`${componentName}\` component. ${viewOnGitHub}`,
    },
  };
}

export function getEnumVariantDescription(message = "Hover over a variant to see its value.") {
  return {
    docs: {
      description: {
        story: message,
      },
    },
  };
}
