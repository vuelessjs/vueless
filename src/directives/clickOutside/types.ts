import type { DirectiveBinding } from "vue";
import type { TemplateRefElement } from "../../types.ts";

export type RemoveEvents = () => void;
export type ClickCallback = (event: MouseEvent) => void;

export interface ClickOutsideOptions {
  capture?: boolean;
  ignore?: TemplateRefElement[];
}

export interface DirectiveBindingCallback extends DirectiveBinding {
  value: ClickCallback;
}

export interface DirectiveBindingOptions extends DirectiveBinding {
  value: [ClickCallback, ClickOutsideOptions];
}

export interface ClickOutsideTargetElement extends HTMLElement {
  _clickOutsideRemove: (...args: unknown[]) => unknown;
}
