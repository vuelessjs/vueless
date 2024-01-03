import { renderToStaticMarkup } from "react-dom/server";
import { decode } from "html-entities";
import prettier2 from "prettier2";
import HTMLParser from "prettier2/parser-html";

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

export const renderToHTML = (templateSource, { args, argTypes }) => {
  const componentArgs = {};

  for (const [key, val] of Object.entries(argTypes)) {
    const value = args[key];

    if (
      typeof val !== "undefined" &&
      val.table &&
      val.table.category === "props" &&
      value !== val.defaultValue
    ) {
      componentArgs[key] = val;
    }
  }

  const slotTemplateCode =
    // eslint-disable-next-line vue/max-len
    '<template v-for="(slot, index) of slots" :key="index" v-slot:[slot]><template v-if="args[slot]">{{args[slot]}}</template></template>';
  const templateWrapperRegEx = /<template>([\s\S]*)<\/template>/i;
  const vBindRegEx = /v-bind="\{([\s\S]*?)}"/g;

  const propsString = Object.keys(componentArgs)
    .map((key) => " " + propToSource(kebabCase(key), args[key]))
    .join("");

  const source = templateSource
    .replace(slotTemplateCode, "")
    .replace(templateWrapperRegEx, "$1")
    .replace(vBindRegEx, propsString);

  const markup = renderToStaticMarkup(source);

  return prettier2.format(decode(markup), {
    parser: "html",
    plugins: [HTMLParser],
    htmlWhitespaceSensitivity: "ignore",
    tabWidth: 2,
  });

  function propToSource(key, val) {
    const type = typeof val;

    switch (type) {
      case "boolean":
        return val ? key : "";
      case "string":
        return `${key}="${val}"`;
      default:
        return `:${key}="${val}"`;
    }
  }

  function kebabCase(str) {
    return str
      .split("")
      .map((letter, idx) => {
        return letter.toUpperCase() === letter
          ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
          : letter;
      })
      .join("");
  }
};
