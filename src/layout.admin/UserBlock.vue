<template>
  <div class="user-wrap">
    <span v-if="!isMobileDevice && isProfilePageActive" class="user-block-circle" />

    <UAvatar
      class="user-avatar"
      rounded="full"
      bordered
      :user-name="currentUserName || currentUserEmail"
      :class="userAvatarClass"
      data-cy="desktop-user-block"
      @click="onClickAvatar"
    />

    <template v-if="isMobileDevice">
      <div class="user-info" @click="onClickUserInfo">
        <div data-cy="user-block-name" class="user-info-name">
          {{ currentUserName || i18n.defaultCurrentUserName }}
        </div>

        <div class="user-info-email">
          {{ currentUserEmail }}
        </div>
      </div>

      <UIcon
        name="logout"
        class="logout-icon"
        color="gray"
        size="sm"
        variant="light"
        interactive
        data-cy="logout-btn"
        @click="onClickLogout"
      />
    </template>

    <div v-if="isShownUserInfo && !isMobileDevice" class="user-block">
      <div class="user-info" @click="onClickUserInfo">
        <div data-cy="user-block-name" class="user-info-name">
          {{ currentUserName || i18n.defaultCurrentUserName }}
        </div>

        <div class="user-info-email">
          {{ currentUserEmail }}
        </div>
      </div>

      <div class="line" />

      <div class="user-logout" @click="onClickLogout">
        <div>{{ $t("title.logout") }}</div>
        <UIcon name="logout" color="white" size="xs" class="logout-icon" data-cy="logout-btn" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import { mapState, mapGetters, mapMutations, mapActions, useStore } from "vuex";
import { layout } from "vueless/service.ui";
import I18nServiceDefault from "vueless/service.i18n/index.js";

import UIcon from "vueless/ui.image-icon";
import UAvatar from "vueless/ui.image-avatar";

import layoutMixin from "./mixins";

export default {
  name: "UserBlock",

  components: {
    UAvatar,
    UIcon,
  },

  mixins: [layoutMixin],

  setup() {
    const store = useStore();

    const currentUserName = ref("");
    const currentUserEmail = ref("");
    const logoutUser = ref(null);

    const configKey = computed(() => store.state.layout.configKey);

    watchEffect(() => {
      const layoutConfig = layout.admin[configKey.value] || layout.admin;
      const userBlock = layoutConfig.userBlock;

      logoutUser.value = () => store.dispatch(userBlock?.logoutAction);

      currentUserName.value = computed(() => store.getters[userBlock?.userNameGetter]).value;
      currentUserEmail.value = computed(() => store.getters[userBlock?.userEmailGetter]).value;
    });

    const { getTranslation } = new I18nServiceDefault();

    return {
      getTranslation,
      currentUserName,
      currentUserEmail,
      logoutUser,
    };
  },

  data() {
    return {
      isShownUserInfo: false,
    };
  },

  computed: {
    ...mapState("layout", ["isOpenedAside"]),

    ...mapGetters("breakpoint", ["isMobileDevice", "isTabletDevice"]),

    isProfilePageActive() {
      const routeName = this.layoutConfig.userBlock?.profileRouteName || "Profile";

      return this.$route.name === routeName;
    },

    userAvatarClass() {
      return (this.isProfilePageActive || this.isShownUserInfo) && !this.isMobileDevice
        ? "active"
        : "";
    },

    i18n() {
      return {
        defaultCurrentUserName: this.getTranslation("defaultCurrentUserName"),
      };
    },
  },

  watch: {
    isOpenedAside: "onChangeAsideState",
  },

  created() {
    window.addEventListener("click", (event) => this.closeUserBlock(event));
  },

  unmounted() {
    window.removeEventListener("click", (event) => this.closeUserBlock(event));
  },

  methods: {
    ...mapMutations("layout", ["CLOSE_ASIDE_SUB_BLOCK"]),

    ...mapActions({
      logout: () => {
        return this.layoutConfig.userBlock?.logoutAction;
      },
    }),

    onClickAvatar() {
      this.isShownUserInfo = !this.isShownUserInfo;

      if (this.isMobileDevice) this.onClickUserInfo();
    },

    onClickUserInfo() {
      const routeName = this.layoutConfig.userBlock?.profileRouteName || "Profile";

      this.isShownUserInfo = false;

      if (this.$route.name !== routeName) this.$router.push({ name: routeName });
    },

    async onClickLogout() {
      if (this.isTabletDevice) this.CLOSE_ASIDE_SUB_BLOCK();

      await this.logoutUser();
    },

    onChangeAsideState() {
      this.isShownUserInfo = false;
    },

    closeUserBlock(event) {
      if (!this.$el.contains(event.target)) {
        this.isShownUserInfo = false;
      }
    },
  },
};
</script>

<i18n>
en:
  defaultCurrentUserName: Name not specified
ru:
  defaultCurrentUserName: Имя не указано
ua:
  defaultCurrentUserName: Ім'я не вказано
</i18n>

<style lang="postcss" scoped>
.user-wrap {
  @apply relative;
  @apply flex items-center;
  @apply px-6 md:px-0;

  .user-block-circle {
    @apply absolute -left-2.5 top-3 z-30;
    @apply h-1.5 w-1.5;
    @apply rounded-full bg-black;
  }

  .user-avatar {
    @apply cursor-pointer;

    :deep(.gray) {
      @apply bg-white;
    }

    .size-md {
      @apply h-9 w-9 md:h-8 md:w-8;
    }

    &.active,
    &:hover {
      :deep(.gray) {
        &.mono-avatar-border {
          @apply border border-gray-900;
        }
      }
    }
  }

  .user-block {
    @apply flex flex-col space-y-2;
    @apply absolute bottom-0 left-10;
    @apply rounded-lg border border-gray-700 bg-gray-900;
    @apply py-2;
  }

  .user-info {
    @apply cursor-pointer;
    @apply font-normal;
    @apply w-full whitespace-nowrap;
    @apply flex flex-col;
    @apply px-3 py-1 md:px-5;

    &:hover {
      @apply text-white;
      @apply bg-white/5;
      @apply md:transition md:duration-100 ease-in-out;
    }

    &-name {
      @apply text-base text-gray-600 md:text-gray-200;
      @apply truncate;
      @apply mb-0.5;
    }

    &-email {
      @apply text-xs text-gray-400 md:text-gray-500/[85];
      @apply truncate;
    }
  }

  .line {
    @apply h-px w-auto;
    @apply mx-3 my-4;
    @apply bg-gray-700;
  }

  .user-logout {
    @apply cursor-pointer;
    @apply flex items-center space-x-2;
    @apply text-sm text-gray-200;
    @apply px-5 py-1;

    &:hover {
      @apply text-white;
      @apply bg-white/5;
      @apply md:transition md:duration-100 ease-in-out;
    }

    .logout-icon {
      @apply ml-3 flex items-center;
    }
  }
}
</style>
