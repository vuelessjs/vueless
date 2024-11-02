import { COMPONENTS } from "../constants.js";

interface WebTypes {
  framework: string;
  name: string;
  version: string;
  contributions: Contributions;
}

interface Contributions {
  html: HtmlContributions;
}

interface HtmlContributions {
  "description-markup": string;
  "types-syntax": string;
  tags: Tag[];
}

interface Tag {
  name: string;
  description?: string;
  attributes?: Attribute[];
  events?: Event[];
  slots?: Slot[];
  exposes?: Expose[];
  source?: Source;
}

interface Attribute {
  name: string;
  enum: string[];
  required?: boolean;
  description?: string;
  value: AttributeValue;
  default?: unknown;
}

interface AttributeValue {
  kind: string;
  type: string;
}

interface Event {
  name: string;
  description?: string;
  properties?: EventProperty[];
}

interface EventProperty {
  type: string[];
  name: string;
  description?: string;
}

interface Slot {
  name: string;
  description?: string;
  scoped?: boolean;
  bindings?: SlotBinding[];
}

interface SlotBinding {
  type: string;
  name: string;
  description?: string;
}

interface Expose {
  name: string;
  description?: string;
  properties: ExposeProperty[];
}

interface ExposeProperty {
  type: string;
  description?: string;
}

interface Source {
  module: string;
  symbol: string;
}

interface Types {
  [key: string]: ArgType | undefined;
}

export interface ArgType {
  control?: "text" | "number" | "boolean" | "array" | "select" | false;
  options?: string[];
  table?: TableConfig;
  name?: string;
  description?: string;
  type?: string | null;
  action?: string;
}

interface TableConfig {
  disable?: boolean;
  defaultValue?: { summary: unknown };
  category?: "slots" | "expose" | "Storybook Events";
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
  return webTypes.contributions.html.tags.find((item: Tag) => item.name === componentName);
};

export function getSlotNames(componentName: string | undefined) {
  if (!componentName) return;

  return getComponentData(componentName as ComponentNames)?.slots?.map((item) => item.name);
}

/**
 * Create story param config to show component description with a link on GitHub.
 */
export function getDocsDescription(componentName: string | undefined) {
  if (!componentName) return;

  return {
    docs: {
      description: {
        component: `The \`${componentName}\` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/${COMPONENTS[componentName as ComponentNames]})`,
      },
    },
  };
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

    if (type === "string" || type.includes("string")) {
      types[attribute.name] = {
        control: "text",
        table: {
          defaultValue: { summary: attribute.default || "" },
        },
      };
    }

    if (type === "number") {
      types[attribute.name] = {
        control: "number",
        table: {
          defaultValue: { summary: attribute.default || "" },
        },
      };
    }

    if (type === "boolean") {
      types[attribute.name] = {
        control: "boolean",
        table: {
          defaultValue: { summary: attribute.default || "" },
        },
      };
    }

    if (type === "array") {
      types[attribute.name] = {
        control: "array",
        table: {
          defaultValue: { summary: attribute.default || [] },
        },
      };
    }

    if (type.includes("|")) {
      types[attribute.name] = {
        control: type.split("|")[0] as ArgType["control"],
        table: {
          defaultValue: { summary: attribute.default || "" },
        },
      };
    }

    if (attribute.enum) {
      types[attribute.name] = {
        options: attribute.enum,
        control: "select",
        table: {
          defaultValue: { summary: attribute.default || "" },
          type: { summary: attribute.enum.join(" | ") },
        },
      };
    }

    if (attribute.description?.includes("@ignore")) {
      types[attribute.name] = {
        table: {
          disable: true,
        },
      };
    }
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
