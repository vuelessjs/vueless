import { defineComponent, h, withDirectives } from "vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import vTooltip from "../vTooltip";

import type { Props as TippyProps } from "tippy.js";
import type { TippyTargetElement } from "../types";

const TooltipHost = defineComponent({
  props: {
    tooltip: { type: [String, Object], default: "" },
  },
  setup(props) {
    return () => withDirectives(h("button", "Target"), [[vTooltip, props.tooltip]]);
  },
});

function getTippy(component: ReturnType<typeof mount>) {
  return (component.element as TippyTargetElement)._tippy;
}

describe("vTooltip", () => {
  it("does not create a tooltip for empty content", () => {
    const component = mount(TooltipHost, { props: { tooltip: "" } });

    expect(getTippy(component)).toBeUndefined();
  });

  it("removes the tooltip when string content becomes empty", async () => {
    const component = mount(TooltipHost, { props: { tooltip: "Full label" } });

    expect(getTippy(component)).toBeDefined();

    await component.setProps({ tooltip: "" });

    expect(getTippy(component)).toBeUndefined();
  });

  it("recreates the tooltip when content returns", async () => {
    const component = mount(TooltipHost, { props: { tooltip: "Full label" } });

    await component.setProps({ tooltip: "" });
    await component.setProps({ tooltip: "Updated label" });

    expect(getTippy(component).props.content).toBe("Updated label");
  });

  it("removes the tooltip when object binding content becomes empty", async () => {
    const tooltip: Partial<TippyProps> = { content: "Full label", placement: "bottom" };
    const component = mount(TooltipHost, { props: { tooltip } });

    await component.setProps({ tooltip: { ...tooltip, content: "" } });

    expect(getTippy(component)).toBeUndefined();
  });
});
