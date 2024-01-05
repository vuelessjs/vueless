const getComponentData = (componentName) => {
  return require("/web-types.json").default.contributions.html.tags.find(
    (item) => item.name === componentName,
  );
};

export const getSlotNames = (componentName) => {
  return getComponentData(componentName)?.slots?.map((item) => item.name);
};

export const getArgTypes = (componentName) => {
  const component = getComponentData(componentName);

  if (!component) return;

  const types = {};

  getSlotNames(componentName)?.forEach((slotName) => {
    types[slotName] = { control: "text" };
  });

  component.attributes?.forEach((attribute) => {
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
  });

  if (import.meta.env.VITE_STORYBOOK_FULL) {
    component.events?.forEach((event) => {
      const eventName = "on" + event.name.charAt(0).toUpperCase() + event.name.slice(1);

      types[eventName] = {
        action: event.name,
        table: { category: "Storybook Events" },
      };
    });
  }

  return types;
};
