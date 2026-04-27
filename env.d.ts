/// <reference types="vite/client" />
/// <reference types="./src/modules" />

declare module "lodash-es" {
  import cloneDeep from "lodash/cloneDeep";
  import isEqual from "lodash/isEqual";
  import merge from "lodash/merge";
  import range from "lodash/range";
  export { cloneDeep, isEqual, merge, range };
}
