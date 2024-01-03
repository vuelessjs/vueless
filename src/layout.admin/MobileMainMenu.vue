<template>
  <div class="menu-wrap">
    <ul class="menu">
      <template v-for="(item, index) in items">
        <li
          v-if="item.isShownOnMobileDock"
          :id="`menu-link-${item.page}`"
          :key="index"
          :data-cy="`menu-link-${item.page}`"
          class="menu-item"
        >
          <ULink
            class="menu-item-link"
            :url="item.link"
            :target-blank="item.targetBlank"
            :route="getRoute(item)"
            no-focus-ring
            @click="onClickItem(item)"
          >
            <div class="menu-item-link-block">
              <UIcon
                v-if="item.iconName"
                class="menu-item-link-icon"
                :name="item.iconName"
                :interactive="getInteractive(item)"
                :color="getColor(item)"
                size="lg"
                variant="light"
              />

              <span class="menu-item-link-text" :class="textClass(item)">
                {{ $t(item.translate) }}
              </span>
            </div>
          </ULink>
        </li>
      </template>

      <li :data-cy="`menu-link-item-more`" class="menu-item">
        <ULink class="menu-item-link" no-focus-ring @click="onClickItemMore">
          <div class="menu-item-link-block">
            <UIcon
              class="menu-item-link-icon"
              name="menu"
              :interactive="getInteractive()"
              :color="getMenuColor()"
              variant="light"
              size="lg"
            />

            <span class="menu-item-link-text" :class="getMenuTextClass()"> {{ i18n.more }} </span>
          </div>
        </ULink>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import I18nServiceDefault from "vueless/service.i18n";

import ULink from "vueless/ui.button-link";
import UIcon from "vueless/ui.image-icon";

import layoutMixin from "./mixins";

const COLORS = {
  default: "gray",
  active: "black",
};

const ACTIVE_CLASS = "active";

export default {
  name: "MobileMainMenu",

  components: {
    ULink,
    UIcon,
  },

  mixins: [layoutMixin],

  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  setup() {
    const { getTranslation } = new I18nServiceDefault();

    return { getTranslation };
  },

  computed: {
    ...mapState("layout", ["isOpenedMobileSubBlock"]),

    ...mapGetters("breakpoint", ["isTabletDevice"]),

    isSettingsPage() {
      return this.$route.path.includes("settings");
    },

    i18n() {
      return {
        more: this.getTranslation("more"),
      };
    },
  },

  methods: {
    ...mapMutations("layout", ["OPEN_ASIDE", "CLOSE_MOBILE_SUB_BLOCK", "TOGGLE_MOBILE_SUB_BLOCK"]),

    checkActiveItem(item) {
      return item ? !this.checkActivePage(item) : !this.isOpenedMobileSubBlock;
    },

    getInteractive(item) {
      return this.checkActiveItem(item);
    },

    getColor(item) {
      return !this.checkActiveItem(item) ? COLORS.active : COLORS.default;
    },

    getMenuColor() {
      return this.isSettingsPage ? COLORS.active : this.getColor();
    },

    getMenuTextClass() {
      return this.isSettingsPage ? ACTIVE_CLASS : this.textClass();
    },

    textClass(item) {
      return !this.checkActiveItem(item) ? ACTIVE_CLASS : "";
    },

    onClickItem() {
      this.CLOSE_MOBILE_SUB_BLOCK();
    },

    onClickItemMore() {
      this.TOGGLE_MOBILE_SUB_BLOCK();
    },
  },
};
</script>

<i18n>
en:
  more: "More"
ru:
  more: "Еще"
ua:
  more: "Ще"
</i18n>

<style lang="postcss" scoped>
.menu-wrap {
  @apply w-full;
  @apply pt-1;
  @apply relative z-50;

  .menu {
    @apply flex items-center;

    &-item {
      @apply flex flex-grow items-center justify-center;

      &-link {
        &-block {
          @apply flex flex-col items-center;
        }

        &-icon {
          .interactive {
            &:hover {
              @apply text-gray-800 opacity-100;
            }
          }
        }

        &-text {
          @apply text-2xs text-gray-400;
        }

        .active {
          @apply text-gray-900;
        }
      }
    }
  }
}
</style>
