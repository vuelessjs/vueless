import { contributions } from "../../web-types.json";

const getComponentData = (componentName) => {
  return contributions.html.tags.find((item) => item.name === componentName);
};

export function getSlotNames(componentName) {
  return getComponentData(componentName)?.slots?.map((item) => item.name);
}

export function getArgTypes(componentName) {
  const component = getComponentData(componentName);

  if (!component) return;

  const types = {};

  getSlotNames(componentName)?.forEach((slotName) => {
    types[slotName] = { control: "text" };
  });

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

  if (import.meta.env.STORYBOOK_FULL) {
    component.events?.forEach((event) => {
      const eventName = "on" + event.name.charAt(0).toUpperCase() + event.name.slice(1);

      types[eventName] = {
        action: event.name,
        table: { category: "Storybook Events" },
      };
    });
  }

  return types;
}

export function getSource(defaultCnfig) {
  return defaultCnfig.replace("export default /*tw*/ ", "").replace(";", "");
}
