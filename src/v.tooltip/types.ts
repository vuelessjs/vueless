import type { Instance as TippyInstance, Props } from "tippy.js";
import type { DirectiveBinding } from "vue";

export interface TippyTargetElement extends HTMLElement {
  _tippy: TippyInstance;
}

export interface DirectiveBindingContent extends DirectiveBinding {
  value: string;
}

export interface DirectiveBindingProps extends DirectiveBinding {
  value: Props;
}
