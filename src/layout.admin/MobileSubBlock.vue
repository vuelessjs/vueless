<template>
  <div class="mobile-sub-block">
    <template v-if="isShownBrandBlockComponent">
      <BrandBlock v-model="isShownBrandBlock" class="brand-block" />

      <div class="line" />
    </template>

    <div v-if="!isShownBrandBlock">
      <MainSubMenu
        v-for="(subItems, index) of allMenuSubItems"
        :key="index"
        class="sub-menu"
        :items="subItems"
      />

      <MainSubMenu
        v-if="menuItemsWithoutSubItems.length"
        class="sub-menu"
        :items="menuItemsWithoutSubItems"
      />

      <div v-if="menuItemsWithoutSubItems.length" class="line" />

      <MainSubMenu class="sub-menu" :items="getMenuHelperItems()" show-icon />

      <div class="line" />
    </div>

    <div>
      <UserBlock />

      <div class="footer">
        <span>{{ appName }} {{ appVersion }}</span>

        <div v-if="!newsRoute.isHidden" class="news" @click="onClickNews">
          <UIcon :name="newsRoute.iconName" color="gray" variant="light" size="2xs" class="icon" />

          <span>
            {{ $t(newsRoute.translate) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandBlock from "./BrandBlock.vue";
import MainSubMenu from "./MainSubMenu.vue";
import UserBlock from "./UserBlock.vue";
import UIcon from "vueless/ui.image-icon";

import layoutMixin from "./mixins";

export default {
  name: "MobileSubBlock",

  components: {
    BrandBlock,
    MainSubMenu,
    UserBlock,
    UIcon,
  },

  mixins: [layoutMixin],

  data() {
    return {
      isShownBrandBlock: false,
    };
  },

  computed: {
    isShownBrandBlockComponent() {
      return !this.layoutConfig.brandBlock.isHidden;
    },

    menuItems() {
      return this.layoutConfig.mobileMainMenuItems() || this.layoutConfig.mainMenuItems();
    },

    allMenuSubItems() {
      const subItems = [];

      this.menuItems.forEach((item) => {
        if (item.subItems && !item.isHidden) subItems.push(item.subItems());
      });

      return subItems;
    },

    menuItemsWithoutSubItems() {
      const section = { translate: "sections._" };
      const menuItems = this.menuItems.filter(
        (item) => !item.isHidden && !item.subItems && !item.isShownOnMobileDock,
      );

      if (menuItems.length) menuItems.unshift(section);

      return menuItems;
    },

    newsRoute() {
      return this.layoutConfig.newsRoute;
    },
  },

  watch: {
    isShownBrandBlock: "getMenuHelperItems",
  },

  methods: {
    getMenuHelperItems() {
      let menuItems = [];

      const helperBlock = this.layoutConfig?.helperBlock;
      const settingsRoute = this.layoutConfig?.settingsRoute;

      if (settingsRoute) {
        menuItems.push(settingsRoute());
      }

      if (helperBlock) {
        menuItems = [...menuItems, ...helperBlock.mobileItems];
      }

      return menuItems;
    },

    onClickNews() {
      this.$router.push({ name: this.news.page });
    },
  },
};
</script>

<style lang="postcss" scoped>
.mobile-sub-block {
  @apply h-full w-full;
  @apply bg-gray-50;
  @apply md:transition-all md:duration-500;
  @apply py-4;
  @apply overflow-y-auto;

  .line {
    @apply h-px w-auto;
    @apply mx-6 my-4;
    @apply bg-gray-200;
  }

  .sub-menu + .sub-menu {
    @apply mt-6;
  }

  .footer {
    @apply w-full;
    @apply p-6;
    @apply flex items-center justify-between;
    @apply text-2xs text-gray-400;

    .news {
      @apply flex items-center space-x-1.5;

      .icon {
        @apply pb-0.5;
      }
    }
  }
}
</style>
