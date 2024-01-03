export default class JwtServiceDefault {
  #AUTH_TOKEN = "token";
  #AUTH_TOKEN_EXPIRES = "token-expires";
  #VERSION_HASH = "version-hash";

  getAuthToken() {
    return window.localStorage.getItem(this.#AUTH_TOKEN);
  }

  getAuthTokenExpiresTime() {
    return window.localStorage.getItem(this.#AUTH_TOKEN_EXPIRES);
  }

  saveAuthToken(token, expires) {
    window.localStorage.setItem(this.#AUTH_TOKEN, token);
    window.localStorage.setItem(this.#AUTH_TOKEN_EXPIRES, expires);
  }

  destroyAuthToken() {
    window.localStorage.removeItem(this.#AUTH_TOKEN);
    window.localStorage.removeItem(this.#AUTH_TOKEN_EXPIRES);
  }

  getVersionHash() {
    return window.localStorage.getItem(this.#VERSION_HASH);
  }
}
