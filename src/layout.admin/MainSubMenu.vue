<template>
  <perfect-scrollbar class="perfect-scrollbar">
    <div class="menu-wrap">
      <ul class="menu">
        <template v-for="(item, index) in items">
          <li
            v-if="item && !item.isHidden"
            :key="index"
            :data-cy="`menu-link-${item.page}`"
            class="menu-item"
            :class="getMenuItemClasses(item)"
          >
            <div v-if="!item.page && !item.link && item.isDivider" class="menu-item-link-line" />

            <div
              v-else-if="!item.page && !item.link"
              :key="`key-${index}`"
              class="menu-item-section"
            >
              <h5 class="menu-item-section-text">{{ $t(item.translate) }}</h5>
            </div>

            <ULink
              v-else
              class="menu-item-link"
              :url="item.link"
              :target-blank="item.targetBlank"
              :route="getRoute(item)"
              no-focus-ring
              @click="onClickItem(item)"
            >
              <div class="menu-item-link-block">
                <UIcon
                  v-if="item.iconName && showIcon"
                  :name="item.iconName"
                  :color="iconColor"
                  variant="light"
                  size="sm"
                  class="menu-item-link-icon"
                />

                <div class="menu-item-link-text">{{ $t(item.translate) }}</div>
              </div>
            </ULink>
          </li>
        </template>
      </ul>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";

import { getBasePath } from "vueless/service.ui";
import ULink from "vueless/ui.button-link";
import UIcon from "vueless/ui.image-icon";

import layoutMixin from "./mixins";

export default {
  name: "MainSubMenu",

  components: {
    PerfectScrollbar,
    ULink,
    UIcon,
  },

  mixins: [layoutMixin],

  props: {
    items: {
      type: Array,
      required: true,
    },

    showIcon: {
      type: Boolean,
      default: false,
    },

    iconColor: {
      type: String,
      default: "gray",
    },

    activeItem: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState("layout", ["isAnimation"]),

    ...mapGetters("breakpoint", ["isTabletDevice", "isMobileDevice"]),
  },

  methods: {
    ...mapMutations("layout", [
      "ENABLE_ANIMATION",
      "CLOSE_ASIDE_SUB_BLOCK",
      "CLOSE_MOBILE_SUB_BLOCK",
    ]),

    getMenuItemClasses({ page }) {
      const parentRoute = page ? this.$router.resolve({ name: page }).href : page;
      const routePath = this.$route.path;
      const path = `${getBasePath()}${routePath}`;

      return {
        "menu-item-active":
          (this.checkCurrentPage(page) || path.includes(parentRoute)) && this.activeItem,
      };
    },

    onClickItem({ page }) {
      if (this.isTabletDevice) {
        this.CLOSE_ASIDE_SUB_BLOCK();
      }

      if (this.checkCurrentPage(page) && this.isMobileDevice) this.CLOSE_MOBILE_SUB_BLOCK();
    },
  },
};
</script>

<style lang="postcss" scoped>
.perfect-scrollbar {
  @apply h-full;

  .menu-wrap {
    @apply overflow-y-auto;

    .menu {
      &-item {
        &-section {
          @apply px-6 py-2 md:px-4 md:pt-0;
          @apply cursor-auto;

          &-text {
            @apply text-sm font-normal text-gray-400;
          }
        }

        &-link {
          @apply flex w-full cursor-pointer;

          &:deep(a) {
            @apply w-full;
          }

          &-block {
            @apply w-full;
            @apply flex items-center space-x-3;
            @apply px-6 md:px-4;

            &:hover {
              @apply bg-gray-200/50 md:rounded-lg;
              @apply text-gray-800;
            }
          }

          &-text {
            @apply flex items-center;
            @apply py-2.5;
            @apply text-base font-normal text-gray-600;
            @apply overflow-hidden text-ellipsis whitespace-nowrap;
          }

          &-line {
            @apply h-px w-auto;
            @apply mx-3 my-2;
            @apply bg-gray-700;
          }
        }
      }

      &-item-active {
        @apply bg-gray-200 md:rounded-lg;

        .menu-item-link-text {
          @apply text-gray-800;
        }
      }

      .menu-item + .menu-item {
        @apply mt-px;
      }
    }
  }
}
</style>
