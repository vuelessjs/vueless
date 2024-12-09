import type { DirectiveBinding, MaybeRef } from "vue";

export type RemoveEvents = () => void;
export type ClickCallback = (event: MouseEvent) => void;

export interface ClickOutsideOptions {
  capture?: boolean;
  ignore?: MaybeRef<Element | Element[] | null>[];
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
