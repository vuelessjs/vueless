<template>
  <perfect-scrollbar class="perfect-scrollbar">
    <div class="menu-wrap">
      <ul class="menu" :class="menuClass">
        <template v-for="(item, index) in items">
          <li
            v-if="!item.isHidden"
            :key="index"
            :data-cy="`menu-link-${item.page}`"
            class="menu-item"
          >
            <UDot v-if="checkActivePage(item)" class="menu-item-dot" color="black" />

            <ULink
              class="menu-item-link"
              :url="item.link"
              :target-blank="item.targetBlank"
              :route="getRoute(item)"
              no-focus-ring
              @click="onClickItem(item)"
            >
              <template v-if="item.iconName">
                <UIcon
                  v-if="tooltip"
                  class="menu-item-link-icon"
                  :name="item.iconName"
                  :interactive="getInteractive(item)"
                  :tooltip="getTranslate(item.translate)"
                  :tooltip-settings="tooltipSettings"
                  :color="getColor(item)"
                  variant="light"
                  size="lg"
                />

                <span
                  v-else
                  class="menu-item-link-block"
                  @mouseover="onMouseover(item)"
                  @mouseleave="onMouseleave"
                >
                  <UIcon
                    class="menu-item-link-icon"
                    :name="item.iconName"
                    :interactive="getInteractive(item)"
                    :color="getColor(item)"
                    variant="light"
                    size="lg"
                  />

                  <UText
                    class="menu-item-link-text"
                    :class="getTextClass(item)"
                    :html="getTranslate(item.translate)"
                  />
                </span>
              </template>
            </ULink>
          </li>
        </template>
      </ul>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import layoutMixin from "./mixins";

import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";

import UDot from "vueless/ui.other-dot";
import ULink from "vueless/ui.button-link";
import UIcon from "vueless/ui.image-icon";
import UText from "vueless/ui.text-block";

export default {
  name: "MainMenu",

  components: {
    PerfectScrollbar,
    UDot,
    ULink,
    UIcon,
    UText,
  },

  mixins: [layoutMixin],

  props: {
    items: {
      type: Array,
      required: true,
    },

    tooltip: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      focusItem: {},
      tooltipSettings: {
        placement: "bottom",
        arrow: false,
        size: "small",
        theme: "dark",
        distance: 0.4,
        duration: [0, 0],
      },
    };
  },

  computed: {
    ...mapState("layout", ["isAnimation", "isOpenedAside"]),

    ...mapGetters("breakpoint", ["isTabletDevice"]),

    menuClass() {
      return !this.tooltip ? "menu-without-tooltip" : "";
    },
  },

  methods: {
    ...mapMutations("layout", [
      "ENABLE_ANIMATION",
      "OPEN_ASIDE_SUB_BLOCK",
      "TOGGLE_ASIDE_SUB_BLOCK",
    ]),

    getInteractive(item) {
      return !this.checkActivePage(item);
    },

    getColor(item) {
      return this.checkActivePage(item) || this.focusItem.page === item.page ? "black" : "gray";
    },

    getTranslate(translate) {
      return this.$t(translate);
    },

    getTextClass(item) {
      return this.checkActivePage(item) ? "menu-item-link-text-active" : "";
    },

    onMouseover(item) {
      this.focusItem = item;
    },

    onMouseleave() {
      this.focusItem = {};
    },

    onClickItem({ page, subItems }) {
      const isActivePage = this.checkActivePage({ page, subItems });

      if (!this.isAnimation) this.ENABLE_ANIMATION();

      if (this.isTabletDevice && subItems) {
        this.TOGGLE_ASIDE_SUB_BLOCK();

        if (!this.checkCurrentPage(page) && !isActivePage) this.OPEN_ASIDE_SUB_BLOCK();
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.perfect-scrollbar {
  @apply h-full;

  .menu-wrap {
    .menu {
      @apply w-[4rem];
      @apply flex flex-col items-center justify-center space-y-5;
      @apply pt-3;

      &-item {
        @apply relative;

        &-dot {
          @apply absolute -left-2.5 top-3 z-30;
        }

        &-link {
          @apply flex items-center;

          &-icon {
            :deep(.interactive) {
              &:hover {
                @apply text-gray-800 opacity-100;
              }
            }
          }

          &-block {
            @apply flex flex-col items-center;

            .menu-item-link-text {
              @apply w-[2.938rem];
              @apply text-center align-text-top text-2xs text-gray-400;
              @apply break-all;

              &-active {
                @apply text-gray-900;
              }
            }

            &:hover {
              .menu-item-link-text {
                @apply !text-gray-900;
              }
            }
          }
        }
      }

      &-without-tooltip {
        .menu-item-dot {
          @apply -left-[0.25rem] top-4;
        }
      }
    }
  }
}

:deep(.mono-link) {
  @apply whitespace-normal;
}
</style>
