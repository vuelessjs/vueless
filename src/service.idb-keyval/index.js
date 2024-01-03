import { get as idbGet, set as idbSet, clear as idbClear, createStore } from "idb-keyval";
import DataServiceDefault from "vueless/service.data";

const mainIDBStore = createStore("main", "store");
const instanceIDBStore = createStore("instance", "store");

const { getRawValue } = new DataServiceDefault();

const idbMain = {
  async get(key) {
    return await idbGet(key, mainIDBStore);
  },

  async set(key, value) {
    await idbSet(key, getRawValue(value), mainIDBStore);
  },

  async clear() {
    await idbClear(mainIDBStore);
  },
};

const idbInstance = {
  async get(key) {
    return await idbGet(key, instanceIDBStore);
  },

  async set(key, value) {
    await idbSet(key, getRawValue(value), instanceIDBStore);
  },

  async clear() {
    await idbClear(instanceIDBStore);
  },
};

export { idbMain, idbInstance };
