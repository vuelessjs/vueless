import axios from "axios";
import JwtServiceDefault from "vueless/service.jwt";
import NotifyServiceDefault from "vueless/service.notify";
import I18nServiceDefault from "vueless/service.i18n";

export default class ApiServiceDefault {
  #notify = new NotifyServiceDefault();

  constructor() {
    this.pendingRequests = [];
  }

  addPendingRequest(request) {
    this.pendingRequests.push(request);
  }

  removePendingRequest(request) {
    const index = this.pendingRequests.indexOf(request);

    if (index !== -1) {
      this.pendingRequests.splice(index, 1);
    }
  }

  cancelPendingRequests() {
    this.pendingRequests.forEach((request) => {
      request.cancel();
    });
    this.pendingRequests = [];
  }

  /**
   * Inits axios
   */
  init() {
    const restApiPrefix = import.meta.env.VITE_REST_API_PREFIX;
    let apiBaseUrl = import.meta.env.VITE_API_DOMAIN;

    axios.defaults.baseURL = apiBaseUrl + restApiPrefix;

    this.setAxiosInterceptors(axios);
  }

  /**
   * Set axios interceptors
   * @param { Object } $axios
   */
  setAxiosInterceptors($axios) {
    $axios.interceptors.response.use(
      (response) => {
        this.loader("off", response.config.url);

        return response;
      },
      (error) => {
        const { config, response, message } = error;
        const apiMessage = this.getResponseMessage(response);

        this.loader("off", error.config.url);

        // show error notification if it isn't disabled in partiular api request
        if (!config?.disableErrorNotify) {
          if (message === "Network Error") {
            this.#notify.error("networkError");
          } else {
            Array.isArray(apiMessage) && apiMessage.length
              ? apiMessage.forEach((code) => this.#notify.error(code))
              : this.#notify.error(apiMessage);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  /**
   * Set the default HTTP request headers
   */
  setHeaders(withLanguage = true) {
    const authToken = new JwtServiceDefault().getAuthToken();
    const activeLanguage = new I18nServiceDefault().getActiveLanguage();

    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

    if (withLanguage) axios.defaults.headers.common["Language"] = activeLanguage;
  }

  /**
   * Get message code for global notification
   * @param { Object } response
   * @returns String
   */
  getResponseMessage(response) {
    return response?.data?.message;
  }

  /**
   * Show success notify or set type and message in local storage for display with delay
   * @param { String } message
   * @param { Boolean } withDelay
   */
  showSuccessNotify(message, withDelay) {
    const type = "success";

    withDelay ? this.#notify.setDelayed(type, message) : this.#notify.success(message);
  }

  /**
   * Change loaders state (on | off): redeclare this method
   * @param { String } state
   * @param { String } resource
   */
  loader(state, resource) {
    // eslint-disable-next-line no-console
    if (state === "on") console.log(state, resource);
    // eslint-disable-next-line no-console
    if (state === "off") console.log(state, resource);
  }

  /**
   * Get axios request config (method for redeclaration)
   * @param { Object } settings
   * @returns { Object }
   */
  getRequestConfig(settings) {
    const { allowMultipleRequests = false, disableErrorNotify = false } = settings;

    const config = {};

    if (allowMultipleRequests) {
      config.allowMultipleRequests = allowMultipleRequests;
    }

    if (disableErrorNotify) {
      config.disableErrorNotify = disableErrorNotify;
    }

    return config;
  }

  /**
   * Send the GET HTTP request
   * @param { String } resource
   * @param { Object } settings
   * @returns { IDBRequest<IDBValidKey> | Promise<void> }
   */
  get(resource, settings = {}) {
    const config = this.getRequestConfig(settings);
    const { withLoader = true, withNotify = false, delaySuccessNotify = false } = settings;

    if (withLoader) {
      this.loader("on", resource);
    }

    config.cancelToken = new axios.CancelToken((cancel) => {
      this.addPendingRequest({ cancel });
    });

    return axios.get(resource, config).then((response) => {
      this.removePendingRequest(config.cancelToken);

      if (withNotify) {
        const message = this.getResponseMessage(response);

        this.showSuccessNotify(message, delaySuccessNotify);
      }

      return response;
    });
  }

  /**
   * Set the POST HTTP request
   * @param { String } resource
   * @param params
   * @param { Object } settings
   * @returns { IDBRequest<IDBValidKey> | Promise<void> }
   */
  post(resource, params = null, settings = {}) {
    const config = this.getRequestConfig(settings);
    const { withLoader = true, withNotify = false, delaySuccessNotify = false } = settings;

    if (withLoader) {
      this.loader("on", resource);
    }

    return axios.post(resource, params, config).then((response) => {
      if (withNotify) {
        const message = this.getResponseMessage(response);

        this.showSuccessNotify(message, delaySuccessNotify);
      }

      return response;
    });
  }

  /**
   * Send the PUT HTTP request
   * @param { String } resource
   * @param params
   * @param { Object } settings
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put(resource, params = null, settings = {}) {
    const config = this.getRequestConfig(settings);
    const { withLoader = true, withNotify = false, delaySuccessNotify = false } = settings;

    if (withLoader) {
      this.loader("on", resource);
    }

    return axios.put(resource, params, config).then((response) => {
      if (withNotify) {
        const message = this.getResponseMessage(response);

        this.showSuccessNotify(message, delaySuccessNotify);
      }

      return response;
    });
  }

  /**
   * Send the PATCH HTTP request
   * @param { String } resource
   * @param params
   * @param { Object } settings
   * @returns { IDBRequest<IDBValidKey> | Promise<void> }
   */
  patch(resource, params = null, settings = {}) {
    const config = this.getRequestConfig(settings);
    const { withLoader = true, withNotify = false, delaySuccessNotify = false } = settings;

    if (withLoader) {
      this.loader("on", resource);
    }

    return axios.patch(resource, params, config).then((response) => {
      if (withNotify) {
        const message = this.getResponseMessage(response);

        this.showSuccessNotify(message, delaySuccessNotify);
      }

      return response;
    });
  }

  /**
   * Send the DELETE HTTP request
   * @param { String } resource
   * @param { Object } settings
   * @returns { IDBRequest<IDBValidKey> | Promise<void> }
   */
  delete(resource, settings = {}) {
    const config = this.getRequestConfig(settings);
    const { withLoader = true, withNotify = false, delaySuccessNotify = false } = settings;

    if (withLoader) {
      this.loader("on", resource);
    }

    return axios.delete(resource, config).then((response) => {
      if (withNotify) {
        const message = this.getResponseMessage(response);

        this.showSuccessNotify(message, delaySuccessNotify);
      }

      return response;
    });
  }
}
