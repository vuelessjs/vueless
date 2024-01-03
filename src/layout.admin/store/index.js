const DEFAULT_CONFIG_KEY = "instance";
const ASIDE_BLOCK_STATE = "aside-block-state";
const ASIDE_SUB_BLOCK_STATE = "aside-sub-block-state";
const ASIDE_SUB_MENU = "aside-sub-menu";
const ACTIVE_THEME = "active-theme";
const RIGHT_INFO_BLOCK = "right-info-block";
const LAST_OPENED_PAGE_NAME = "last-opened-page-name";

import defaultThemeFull from "../images/abstract-01.jpg";
import defaultThemePreview from "../images/abstract-01_preview.jpg";

export default {
  namespaced: true,

  state: {
    configKey: DEFAULT_CONFIG_KEY,
    firstOpenedPageName: "",
    isAnimation: false,
    isOpenedAside: true,
    isOpenedAsideSubBlock: false,
    isOpenedMobileSubBlock: false,
    isAsideSubMenu: false,
    isShownThemeModal: false,
    activeTheme: "",
    infoBlockConfigs: null,
    asideInfoBlockConfigs: null,
    rightInfoBlockConfigs: null,
    isFirstHideRightInfoBlock: false,
    defaultTheme: {
      full: defaultThemeFull,
      preview: defaultThemePreview,
    },
  },

  mutations: {
    SET_CONFIG_KEY(state, name) {
      state.configKey = name;
    },

    SET_FIRST_OPENED_PAGE_NAME(state, name) {
      state.firstOpenedPageName = name;
    },

    ENABLE_ANIMATION(state) {
      state.isAnimation = true;
    },

    OPEN_ASIDE(state) {
      if (!state.isAnimation) state.isAnimation = true;
      state.isOpenedAside = true;
    },

    CLOSE_ASIDE(state) {
      if (!state.isAnimation) state.isAnimation = true;
      state.isOpenedAside = false;
    },

    TOGGLE_ASIDE(state) {
      if (!state.isAnimation) state.isAnimation = true;
      state.isOpenedAside = !state.isOpenedAside;
    },

    OPEN_ASIDE_SUB_BLOCK(state) {
      if (!state.isAnimation) state.isAnimation = true;
      state.isOpenedAsideSubBlock = true;
    },

    CLOSE_ASIDE_SUB_BLOCK(state) {
      if (!state.isAnimation) state.isAnimation = true;
      state.isOpenedAsideSubBlock = false;
    },

    TOGGLE_ASIDE_SUB_BLOCK(state) {
      if (!state.isAnimation) state.isAnimation = true;
      state.isOpenedAsideSubBlock = !state.isOpenedAsideSubBlock;
    },

    CLOSE_MOBILE_SUB_BLOCK(state) {
      state.isOpenedMobileSubBlock = false;
    },

    TOGGLE_MOBILE_SUB_BLOCK(state) {
      state.isOpenedMobileSubBlock = !state.isOpenedMobileSubBlock;
    },

    SET_ASIDE_STATES(state) {
      const asideBlockState = window.localStorage.getItem(ASIDE_BLOCK_STATE);
      const asideSubBlockState = window.localStorage.getItem(ASIDE_SUB_BLOCK_STATE);
      const asideSubMenuState = window.localStorage.getItem(ASIDE_SUB_MENU);
      const lastOpenedPageName = window.localStorage.getItem(LAST_OPENED_PAGE_NAME);

      if (!Number(asideBlockState) && !Number(asideSubBlockState) && !state.isAnimation) {
        state.isAnimation = true;
      }

      if (asideBlockState !== null) {
        state.isOpenedAside = Number(asideBlockState);
      }

      if (asideSubBlockState !== null) {
        state.isOpenedAsideSubBlock = Number(asideSubBlockState);
      }

      if (asideSubMenuState !== null && lastOpenedPageName === state.firstOpenedPageName) {
        state.isAsideSubMenu = Number(asideSubMenuState);
      }
    },

    SAVE_ASIDE_STATES(state) {
      window.localStorage.setItem(ASIDE_BLOCK_STATE, Number(state.isOpenedAside));
      window.localStorage.setItem(ASIDE_SUB_BLOCK_STATE, Number(state.isOpenedAsideSubBlock));
      window.localStorage.setItem(ASIDE_SUB_MENU, Number(state.isAsideSubMenu));
    },

    SAVE_LAST_OPENED_PAGE_NAME(state, name) {
      window.localStorage.setItem(LAST_OPENED_PAGE_NAME, name);
    },

    SET_ASIDE_SUB_MENU(state, menuState) {
      state.isAsideSubMenu = menuState;
    },

    SET_SHOWN_THEME_MODAL(state, shown) {
      state.isShownThemeModal = shown;
    },

    SHOWN_THEME_MODAL(state) {
      state.isShownThemeModal = true;
    },

    SET_ACTIVE_THEME(state, theme) {
      const storedTheme = window.localStorage.getItem(ACTIVE_THEME);
      const [defaultUserTheme] = Object.values(
        import.meta.glob(`@/assets/images/themes/*.{png,jpg,jpeg,PNG,JPEG}`, {
          eager: true,
          as: "url",
        }),
      );

      state.activeTheme = theme || storedTheme || defaultUserTheme || state.defaultTheme.full;
    },

    SAVE_ACTIVE_THEME(state) {
      window.localStorage.setItem(ACTIVE_THEME, state.activeTheme);
    },

    SET_ASIDE_INFO_BLOCK_CONFIGS(state, configs) {
      state.asideInfoBlockConfigs = configs;
    },

    SET_RIGHT_INFO_BLOCK_CONFIGS(state, configs) {
      state.rightInfoBlockConfigs = configs;
    },

    SET_RIGHT_INFO_BLOCK_STATE(state) {
      const isFirstHideRightInfoBlock = window.localStorage.getItem(RIGHT_INFO_BLOCK);

      if (Number(isFirstHideRightInfoBlock)) {
        state.isFirstHideRightInfoBlock = true;
      }
    },

    SAVE_RIGHT_INFO_BLOCK_STATE() {
      window.localStorage.setItem(RIGHT_INFO_BLOCK, Number(true));
    },
  },
};
