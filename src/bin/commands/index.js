import { vuelessInit } from "./init.js";
import { createVuelessComponent } from "./create.js";
import { copyVuelessComponent } from "./copy.js";

export const commands = {
  init: vuelessInit,
  create: createVuelessComponent,
  copy: copyVuelessComponent,
};
