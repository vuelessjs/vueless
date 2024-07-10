/* Load Web-Types from the project root. */
const [webTypes] = Object.values(
  import.meta.glob("/web-types.json", { eager: true, import: "default" }),
);

const getComponentData = (componentName) => {
  return webTypes.contributions.html.tags.find((item) => item.name === componentName);
};

export function getSlotNames(componentName) {
  return getComponentData(componentName)?.slots?.map((item) => item.name);
}

export function getArgTypes(componentName) {
  const component = getComponentData(componentName);

  if (!component) return;

  const types = {};

  component.attributes?.forEach((attribute) => {
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
      const options = attribute.value.type.replace(/['|]/g, "").split(/\s+/);

      if (options.length > 1) {
        types[attribute.name] = {
          options,
          control: "select",
          table: {
            defaultValue: { summary: attribute.default || "" },
          },
        };
      }
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
    const bindings = [];

    slot.bindings?.forEach((binding) => {
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
  });

  component.events?.forEach((event) => {
    const properties = [];

    event.properties?.forEach((property) => {
      const description = property.description ? ` (${property.description})` : "";

      properties.push(`${property.name}: ${property.type}${description}`);
    });

    types[event.name] = {
      type: event.properties ? `{ ${properties.join(", ")} }` : null,
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

export function getSource(defaultCnfig) {
  return defaultCnfig.replace("export default /*tw*/ ", "").replace(";", "");
}

export const allSlotsFragment = `
  <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
    <template v-if="args[slot + 'Slot']">{{ args[slot + 'Slot'] }}</template>
  </template>
`;
