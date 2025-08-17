import { vuelessInit } from "./init";
import { createVuelessComponent } from "./create";
import { copyVuelessComponent } from "./copy";

export const commands = {
  init: vuelessInit,
  create: createVuelessComponent,
  copy: copyVuelessComponent,
};
