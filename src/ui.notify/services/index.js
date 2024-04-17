import Vue3Notify, { notify as VueNotify } from "@kyvg/vue3-notification";
import { globalComponentConfig } from "../../service.ui";

const defaultDuration = {
  short: 4000,
  medium: 8000,
  long: 12000,
  permanent: 300000,
};

export default class NotifyServiceDefault {
  notifyInstance = Vue3Notify;

  #lastMessageTime = 0;
  #lastMessageCode = "";

  notify(settings) {
    const { type, title, text, code, duration, ignoreDuplicates, closeOnClick, data } = settings;
    const isSameMessage =
      this.#lastMessageCode === code && new Date() - this.#lastMessageTime < 1000;

    if (isSameMessage || !code) return;

    this.#lastMessageTime = new Date();
    this.#lastMessageCode = code;

    VueNotify({
      group: "notify",
      type,
      title: title || "",
      text: text || "",
      duration: duration || globalComponentConfig.UNotify?.duration?.short || defaultDuration.short,
      ignoreDuplicates: ignoreDuplicates || false,
      closeOnClick: closeOnClick || false,
      data: { ...data, code },
    });
  }

  success(code, duration = globalComponentConfig.UNotify?.duration?.short) {
    this.notify({
      type: "success",
      code: code,
      duration: duration,
    });
  }

  warning(code, duration = globalComponentConfig.UNotify?.duration?.medium) {
    this.notify({
      type: "warning",
      code: code,
      duration: duration,
    });
  }

  error(code, duration = globalComponentConfig.UNotify?.duration?.long) {
    this.notify({
      type: "error",
      code: code,
      duration: duration,
    });
  }

  clearAll() {
    VueNotify({
      group: "notify",
      clean: true,
    });
  }

  setDelayed(type, message) {
    localStorage.setItem("notify", JSON.stringify({ type, message }));
  }

  getDelayed() {
    const notifyData = JSON.parse(localStorage.getItem("notify"));

    this.clearAll();

    if (notifyData) {
      const { type, message } = notifyData;

      this[type](message);

      localStorage.removeItem("notify");
    }
  }
}
