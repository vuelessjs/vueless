import { registerSW } from "virtual:pwa-register";

export default class WorkerServiceDefault {
  #intervalInMilliseconds = 60 * 60 * 1000;

  init = () => {
    if (import.meta.env.DEV || window.Cypress) return;

    registerSW({
      onRegistered: this.onRegistered,
      onOfflineReady: this.onOfflineReady,
    });
  };

  onRegistered = (worker) => {
    if (!worker) return;

    setInterval(() => {
      worker.update();
    }, this.#intervalInMilliseconds);
  };

  onOfflineReady = () => {
    // console.log("Offline is Ready");
  };
}
