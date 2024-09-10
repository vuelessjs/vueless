/* eslint-disable no-unused-vars */
import { effectScope, getCurrentScope, onScopeDispose } from "vue";

export function createSharedComposable(composableFunction) {
  let subscribers = 0;
  let state = undefined;
  let scope = undefined;

  function onDispose() {
    subscribers -= 1;

    if (scope && subscribers <= 0) {
      scope.stop();

      state = undefined;
      scope = undefined;
    }
  }

  return (...args) => {
    subscribers += 1;

    if (!scope) {
      scope = effectScope(true);
      state = scope.run(() => composableFunction(...args));
    }

    if (getCurrentScope()) {
      onScopeDispose(onDispose);
    }

    console.log(state);

    return state;
  };
}
