# Icons

Vueless supports three popular SVG icon libraries: `@material-symbols`, `bootstrap-icons`, `heroicons`.

if you going to use `bootstrap-icons` or `heroicons` or other weight of `@material-symbols`  you should install needed package first.

{% tabs %}
{% tab title="npm" %}
```bash
# weight from 100 to 700 is available
npm install @material-symbols/svg-500
# or
npm install bootstrap-icons
# or
npm install heroicons
```
{% endtab %}

{% tab title="yarn" %}
```bash
# weight from 100 to 700 available
yarn add @material-symbols/svg-500
# or
yarn add bootstrap-icons
# or
yarn add heroicons
```
{% endtab %}

{% tab title="pnpm" %}
```bash
# weight from 100 to 700 available
pnpm add @material-symbols/svg-500
# or
pnpm add bootstrap-icons
# or
pnpm add heroicons
```
{% endtab %}

{% tab title="bun" %}
```bash
# weight from 100 to 700 available
bun add @material-symbols/svg-500
# or
bun add bootstrap-icons
# or
bun add heroicons
```
{% endtab %}
{% endtabs %}

And after set the library in the config:

{% tabs %}
{% tab title="@material-symbols/svg-500" %}
{% code title="vueless.config.js" %}
```javascript
export default {
  component: {
    UIcon: {
      defaults: {
        library: "@material-symbols/svg-500",
        style: "outlined", // sharp | rounded | outlined
      }
    }
  }
};
```
{% endcode %}
{% endtab %}

{% tab title="bootstrap-icons" %}
{% code title="vueless.config.js" %}
```javascript
export default {
  component: {
    UIcon: {
      defaults: {
        library: "bootstrap-icons",
      }
    }
  }
};
```
{% endcode %}
{% endtab %}

{% tab title="heroicons" %}
{% code title="vueless.config.js" %}
```javascript
export default {
  component: {
    UIcon: {
      defaults: {
        library: "heroicons",
      }
    }
  }
};
```
{% endcode %}
{% endtab %}
{% endtabs %}

## Custom icons

&#x20;`UIcon` component supports custom icons as well. To use it:

* Import the SVG icon, with suffix `?component` .&#x20;
* Pass the imported component in the `:src` prop.

```html
<UIcon :src="EqualIcon" color="gray" />

<script setup>
import EqualIcon from "./images/equal.svg?component";
</script>
```

## Dynamic import

Before the build Vueless automatically scan the project files and collects all the icons. If Vueless can't recognise the icon it may be skipped, what mean's it will be lost after build.

To avoid this behavior and include all the icons into the build, please follow rules below or add needed icons into the safelist.

```html
<!-- ✅ this will work (string) -->
<UIcon name="close" />

<!-- ✅ this will work too (ternary operator with strings) -->
<UIcon name="isOpened ? 'arrow_up' : 'arrow_down'" />

<!-- 🛑 this won't work (variable) -->
<UIcon :name="stateIcon" />
```

If you need to use icon names in JS you should declare the icon names in any of JS object. If the key in the object includes  `icon` word it will be automatically recognised by Vueless and icon will be added to the build.

```html
<UIcon :name="stateIcon" />

<script setup>
import { computed } from "vue";

/* here is the trick */
const icons = {
  iconArrowUp: "arrow_up",
  iconArrowDown: "arrow_down",
}

const stateIcon = computed(() => isOpened ? icons.iconArrowUp : icons.iconArrowDown);
</script>
```

## Icons safelist

if you don't want to use object approach you can simply add needed icons into the safelist.

{% code title="vueless.config.js" %}
```js
export default {
  component: {
    UIcon: {
      safelistIcons: ["1k", "2d", "close"],
    }
  }
};
```
{% endcode %}

{% hint style="info" %}
In this case regular and filled icon variants will be safelisted and added into the build.
{% endhint %}

## Replace all icons at once

If you going to use `bootstrap-icons` or `heroicons` you need to replace icon names in all needed Vueless components. You can easily do that by using the config below:

{% code title="vueless.config.js" %}
```javascript
export default {
  component: {
    UAccordion: {
      expandIcon: "add",
      collapseIcon: "remove",
    },
    UModal: {
      backIcon: "arrow_back",
      closeIcon: "close",
    },
    UPage: {
      backIcon: "arrow_back",
    },
    UDataList: {
      dragIcon: "drag_indicator",
      deleteIcon: "delete",
      editIcon: "edit_note",
    },
    UTable: {
      expandIcon: "add",
      collapseIcon: "remove",
    },
    UDropdownBadge: {
      dropdownIcon: "keyboard_arrow_down",
    },
    UDropdownButton: {
      dropdownIcon: "keyboard_arrow_down",
    },
    UDropdownLink: {
      dropdownIcon: "keyboard_arrow_down",
    },
    UDropdownList: {
      addOptionIcon: "add",
    },
    UCalendar: {
      viewSwitchIcon: "keyboard_arrow_down",
      nextIcon: "keyboard_arrow_right",
      prevIcon: "keyboard_arrow_left",
    },
    UCheckbox: {
      partiallyCheckedIcon: "remove",
      checkedIcon: "check",
    },
    UColorPicker: {
      unselectedIcon: "close",
    },
    UDatePickerRange: {
      nextIcon: "keyboard_arrow_right",
      prevIcon: "keyboard_arrow_left",
      ownRangeIcon: "apps",
    },
    UInput: {
      passwordVisibleIcon: "visibility-fill",
      passwordHiddenIcon: "visibility_off-fill",
    },
    UInputFile: {
      chooseFileIcon: "attach_file",
      clearIcon: "close",
      removeItemIcon: "close",
    },
    UInputNumber: {
      removeIcon: "remove",
      addIcon: "add",
    },
    UInputRating: {
      selectedIcon: "star-fill",
      unselectedIcon: "star",
    },
    UInputSearch: {
      clearIcon: "close",
      searchIcon: "search",
    },
    USelect: {
      dropdownIcon: "expand_more",
      clearIcon: "close_small",
      clearMultipleIcon: "close_small",
    },
    USwitch: {
      onIcon: "check",
      offIcon: "close",
    },
    UAlert: {
      closeIcon: "close",
    },
    UEmpty: {
      emptyIcon: "emoji_food_beverage",
    },
    UFile: {
      fileIcon: "description",
    },
    UNotify: {
      successIcon: "check_circle",
      warningIcon: "warning",
      errorIcon: "error",
      closeIcon: "close",
    },
  },
};
```
{% endcode %}

## Deep tuning

Loding SVG icons provided by [`@vueless/plugin-vite`](https://github.com/vuelessjs/vueless-plugin-vite)  which in turn was be inspired by [`vite-svg-loader`](https://github.com/jpkleemans/vite-svg-loader) .

For loading SVG  [`@vueless/plugin-vite`](https://github.com/vuelessjs/vueless-plugin-vite) use [SVGO](https://github.com/svg/svgo) by default. We created and already included optimal config to cover most of the cases, but if you will face with some issues with SVG rendering feel free to change it by passing you own config under the `svgoConfig` key, ([see SVGO plugin docs](https://svgo.dev/docs/preset-default/)).

{% code title="vite.config.js" %}
```javascript
import { Vueless } from "@vueless/plugin-vite";

export default defineConfig({
  plugins: [
    ...
    Vueless({
      svgoConfig: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
                convertColors: {
                  currentColor: true,
                },
              },
            },
          },
        ],
      },
    }),
  ],
  ...
});
```
{% endcode %}

Or you can disable SVGO globally as well.

{% code title="vite.config.js" %}
```javascript
import { Vueless } from "@vueless/plugin-vite";

export default defineConfig({
  plugins: [
    ...
    Vueless({ svgo: false }),
  ],
  ...
});
```
{% endcode %}

SVGO also can be explicitly disabled for one file by adding the `?skipsvgo` suffix.

```html
<UIcon :src="IconWithoutOptimizer" />

<script setup>
import IconWithoutOptimizer from "./my-icon.svg?skipsvgo"
</script>
```

