<template>
  <div :data-cy="dataCy" class="mono-avatar" @click="onClick">
    <div v-if="imgPath" class="mono-avatar-image" :class="avatarClasses" :style="bgImage" />

    <span v-else class="mono-avatar-letters" :class="avatarClasses">
      {{ userNameFirstLatter }}
    </span>
  </div>
</template>

<script>
export default {
  name: "UAvatar",

  props: {
    /**
     * Set avatar's image. It may be a URL or path from the "public" folder.
     */
    path: {
      type: String,
      default: "",
    },

    /**
     * The size of the avatar.
     * @values xs, sm, md, lg, xl, 2xl
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * The color of the avatar.
     * @values gray, red, orange, yellow, green, blue, violet, fuchsia
     */
    color: {
      type: String,
      default: "gray",
    },

    /**
     * Set user's name.
     */
    userName: {
      type: String,
      default: "",
    },

    /**
     * The rounded of the avatar.
     * @values sm, md, lg, full
     */
    rounded: {
      type: String,
      default: "md",
    },

    /**
     * Active / disabled avatar border.
     */
    bordered: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["click"],

  computed: {
    userNameFirstLatter() {
      const [name, surname] = this.userName.split(" ");

      const nameFirstLetter = name ? name[0].toUpperCase() : "";
      const surnameFirstLetter = surname ? surname[0].toUpperCase() : "";

      return nameFirstLetter + surnameFirstLetter;
    },

    imgPath() {
      let path;

      if (this.path) {
        path = this.path.includes("http") ? this.path : import.meta.env.BASE_URL + this.path;
      } else if (!this.userName && !this.path) {
        path = require("./default-avatar.png");
      }

      return path;
    },

    bgImage() {
      return `background-image: url(${this.imgPath});`;
    },

    avatarClasses() {
      const size = `size-${this.size}`;
      const border = this.bordered ? "mono-avatar-border" : "";

      return [size, border, this.color, this.roundedClass];
    },

    roundedClass() {
      return {
        "border-radius-sm": this.rounded === "sm",
        "border-radius-md": this.rounded === "md",
        "border-radius-lg": this.rounded === "lg",
        "border-radius-full": this.rounded === "full",
      };
    },
  },

  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped lang="postcss">
.mono-avatar-image {
  @apply bg-gray-100 bg-contain bg-center bg-no-repeat;
}

.mono-avatar-letters {
  @apply flex h-full items-center justify-center;
  @apply bg-green-200 text-green-700;
  @apply text-lg font-medium;
}

.border-radius {
  &-sm {
    @apply rounded;
  }

  &-md {
    @apply rounded-lg;
  }

  &-lg {
    @apply rounded-xl;
  }

  &-full {
    @apply rounded-full;
  }
}

.size {
  &-xs {
    @apply h-4 w-4;
    @apply text-2xs;
  }

  &-sm {
    @apply h-6 w-6;
    @apply text-xs;
  }

  &-md {
    @apply h-8 w-8;
    @apply text-sm;
  }

  &-lg {
    @apply h-10 w-10;
    @apply text-lg;
  }

  &-xl {
    @apply h-12 w-12;
    @apply text-2xl;
  }
}

.size-2xl {
  @apply h-14 w-14;
  @apply text-3xl;
}

.gray {
  @apply bg-gray-100 text-gray-600;

  &.mono-avatar-border {
    @apply border border-gray-200;
  }
}

.red {
  @apply bg-red-100 text-red-600;

  &.mono-avatar-border {
    @apply border border-red-200;
  }
}

.orange {
  @apply bg-orange-100 text-orange-600;

  &.mono-avatar-border {
    @apply border border-orange-200;
  }
}

.yellow {
  @apply bg-yellow-100 text-yellow-600;

  &.mono-avatar-border {
    @apply border border-yellow-200;
  }
}

.green {
  @apply bg-green-100 text-green-600;

  &.mono-avatar-border {
    @apply border border-green-200;
  }
}

.blue {
  @apply bg-blue-100 text-blue-600;

  &.mono-avatar-border {
    @apply border border-blue-200;
  }
}

.violet {
  @apply bg-violet-100 text-violet-600;

  &.mono-avatar-border {
    @apply border border-violet-200;
  }
}

.fuchsia {
  @apply bg-fuchsia-100 text-fuchsia-600;

  &.mono-avatar-border {
    @apply border border-fuchsia-200;
  }
}
</style>
