## Admin layout:

Settings for an `admin` layout should be configured in the `admin.layout.config.js`.

To use this layout, you need to import vuex store from `vueless/layout.admin/store`.

For icons use in layout configs, you need to create an `icons` constant, where set to specify the path to the icons.

Example:

``` javascript
const icons = {
    SettingsFill: require("@material-symbols/svg-400/outlined/settings-fill.svg"),
}

iconName: icons.SettingsFill
```

***

**Reactive config switching**

Current layout supports reactive config switching without a page reload.
It may be useful if you need to show different menu items or change other configs on the fly.

**If you DON'T need this feature – just import layout config regularly:**

``` javascript
const { default: adminLayout } = require("./admin.layout.config");

export default {
  ...
  layout: {
    admin: adminLayout
    ...
  },
  ...
}
```

**If you need this feature, please follow the instruction below:**

1. Add different configs under its own keys `layout.admin.{key}` in the main config file `ourApp.config.js`. 

The key `instance` used as a default key inside the layout.

``` javascript
const { default: adminLayout } = require("./admin.layout.config");
const { default: adminMainLayout } = require("./adminMain.layout.config");
const { default: adminInstanceLayout } = require("./adminInstance.layout.config");

export default {
  ...
  layout: {
    admin: {
      main: {
        ...adminLayout,
        ...adminMainLayout,
      },
      instance: {
        ...adminLayout,
        ...adminInstanceLayout,
      },
    },
    ...
  },
  ...
}
```

2. Use `layout/SET_CONFIG_KEY` store mutation.

Usually it may be invoked at: `afterEachMiddleware.js` and/or `beforeEachMiddleware.js`.

``` javascript
// @/router/beforeEachMiddleware.js
// switch layout settings on the fly
if (to.meta.isMainLayout) {
  store.commit("layout/SET_CONFIG_KEY", "main");
}

// @/router/afterEachMiddleware.js
// switch layout settings on the fly
if (!to.meta.isMainLayout && !to.meta.isAuthLayout) {
  store.commit("layout/SET_CONFIG_KEY", "instance");
}
```

***

**Theme background images**

To add your own theme background images just put **full** and **preview** images into `src/assets/images/themes` folder.

The files should have same names and a preview image should have `_preview` suffix at the end.

File names example:
- `abstract-01.jpg`
- `abstract-01_preview.jpg`

After adding files into the folder, they will be imported automatically.

***

**logoPath** – logo image path from `/public` folder.
- type: String
- default: ""

Example:

``` javascript
logoPath: "static/logos/dark-outline.svg"
```

***

**mobileLogoPath** – logo image path from `/public` folder for mobile version.
- type: String
- default: ""

Example:

``` javascript
mobileLogoPath: "static/logos/light.svg",
```

***

**logoRouteName** – Vue route name for logo (where to go if we'll click on logo).
- type: String
- default: ""

Example:

``` javascript
logoRouteName: "MainLayout",
```

***

**userBlock** - settings for user block.
- type: Object,
- default: {}

Example:

``` javascript
userBlock: {
  profileRouteName: "Profile",
  logoutAction: "user/logoutUser",
  userNameGetter: "user/currentUserName",
  userEmailGetter: "user/currentUserEmail",
},
```

***where***:

`profileRouteName` – Vue route name for user block (where to go if we'll click on user profile).
- type: String
- default: ""

`logoutAction` – Vuex Action to log out from the app by API.
- type: String
- default: ""

`userNameGetter` – Vuex Getter to get prepared username from Vuex store.
- type: String
- default: ""

`userEmailGetter` – Vuex Getter to get prepared user email from Vuex store.
- type: String
- default: ""
- expected data:

***

**brandBlock** - settings for brand block.
- type: Object,
- default: {}

Example:

``` javascript
brandBlock: {
    name:  "Atmosfeta MP",
    isHidden: true,
    workspaces: {
      workspacesAction: "workspace/getWorkspaces",
      workspaceItemsGetter: "workspace/workspaceItems",
      workspaceItemsClickAction: "workspace/workspaceItemClick",
      selectedWorkspaceNameGetter: "workspace/selectedWorkspaceName",
      addRoute: {
        iconName: icons.SettingsFill,
        page: "Dashboard",
        translate: "title.add",
        isHidden: true,
      },
      listRoute: {
        iconName: icons.SettingsFill,
        page: "Dashboard",
        translate: "title.goToList",
        isHidden: false,
      },
    },
}
```

***where***:

`name` – brand company name, which we see on the top left corner of layout near logo.
- type: String
- default: ""

`isHidden` – hide brand block.
- type: Boolean
- default: false

`workspaces` – shows dropdown to change workspaces dynamically (using Vue.js Vuex).
- type: Object
- default: {}

`workspacesAction` – Vuex Action to get list of workspaces by API.
- type: String
- default: ""

`workspaceItemsGetter` – Vuex Getter to get prepared workspaces list from Vuex store.
- type: String
- default: ""
- expected data:

``` javascript
[
  {
    id: 1,
    label: Workspace One,
  },
  {
    id: 2,
    label: Workspace Two,
  }
  ...
]
```

`workspaceItemsClickAction` – Vuex Action which need to be invoked on click by workspace in dropdown.
- type: String
- default: ""
- return: value of key `id` in object `{ workspaceId: id }` from workspaces array passed by `workspaceItemsGetter`.

`selectedWorkspaceNameGetter` – Vuex Getter for selected workspace name from Vuex store.
- type: String
- default: ""
- expected data: `String` (for example "Workspace One")

`addRoute` - Vue.js route params for add workspace. Settings are same as `item` in `helperBLock.items`. 
- type: Object
- default: {}

`listRoute` - Vue.js route params for workspaces list. Settings are same as `item` in `helperBLock.items`.
- type: Object
- default: {}

***

**mobileMainMenuItems** (function) - settings for the main mobile menu items.
Use it if you want to add different items for the mobile and desktop main menu or put them in different order.
- type: Object
- default: {}

The settings are the same as for the `mainMenuItems`, see docs below.

***

**mainMenuItemsTooltip** - makes desktop menu item tooltip active.
- type: Boolean
- default: false

***

**mainMenuItems** (function) - settings for the main menu.
- type: Object
- default: {}

Example:

``` javascript
mainMenuItems: () => [
  {
    iconName: icons.SettingsFill,
    page: "MainLayout",
    translate: "title.information.support", 
  },
],
```

***where***:

Example:

``` javascript
// Internal link 
mainMenuItems: () => [
    {
      iconName: icons.SettingsFill,
      page: "MainLayout",
      translate: "title.information.support", 
    },
],
```

``` javascript
// External link
mainMenuItems: () => [
    {
      iconName: icons.SettingsFill,
      translate: "title.information.support",
      link: "https://google.com",
      targetBlank: false,
    },
],
```

``` javascript
// Hidden menu item
mainMenuItems: () => [
    {
      iconName: icons.SettingsFill,
      translate: "title.information.support",
      page: "MainLayout",
      isHidden: true,
    },
],
```

``` javascript
// Shown menu item on mobile dock
mainMenuItems: () => [
    {
      iconName: icons.SettingsFill,
      translate: "title.information.support",
      page: "MainLayout",
      isShownOnMobileDock: true,
    },
],
```

``` javascript
// Underdeveloped menu item
mainMenuItems: () => [
    {
      iconName: icons.SettingsFill,
      translate: "title.information.support",
      page: "MainLayout",
    },
],
```

``` javascript
// Menu item with sub items
mainMenuItems: () => [
    {
      iconName: icons.SettingsFill,
      translate: "title.information.support",
      page: "MainLayout",
      subItems: [ 
        {
          page: "Products",
          translate: "title.catalog._",
        }
      ],
    },
],
```

``` javascript
// Hidden menu sub item
subItems: () => [
    {
      iconName: icons.SettingsFill,
      translate: "title.information.support",
      page: "MainLayout",
      isHidden: true,
    },
],
```

``` javascript
// Menu sub item section
subItems: () => [
    {
      translate: "title.sections",
      isHidden: false,
    },
],
```

***where***:

`subItems` (function) – menu sub items for menu item. Shows in aside sub block.
- type: Object
- default: Array of Objects

`isShownOnMobileDock` – show menu item on menu dock for mobile devices.
- type: Boolean
- default: false

`iconName` – icon SVG data source path.
- type: String
- default: ""

`page` – Vue route name for page.
- type: String
- default: ""

`translate` – item text Vue i18n translation path.
- type: String
- default: ""

`link` – external link url.
- type: String
- default: ""

`targetBlank` – open external link in new window.
- type: Boolean
- default: false

`isHidden` – hide a menu item.
- type: Boolean
- default: false

`isDivider` – divider line between menu items.

***

**helperBlock** - settings for helper block.
- type: Object,
- default: {}

Example:

``` javascript
helperBlock: {
    isHidden: true,
    items: [
        {
            iconName: icons.SettingsFill,
            page: "MainLayout",
            translate: "title.information.support", 
        },
    ],
    mobileItems: [
           {
            iconName: icons.SettingsFill,
            page: "MainLayout",
            translate: "title.information.support", 
        },
    ],
}
```

***where***:

`isHidden` – hide helper block.
- type: Boolean
- default: false

`items` – menu items.
- type: Object
- default: Array of Objects

`mobileItems` - menu items for mobile device. Settings for `mobileItems` are same as in `items`.
- type: Object
- default: Array of Objects

Example:

``` javascript
// Internal link 
items: [
    {
      iconName: icons.SettingsFill,
      page: "MainLayout",
      translate: "title.information.support", 
    },
],
```

``` javascript
// External link
items: [
    {
      iconName: icons.SettingsFill,
      translate: "title.information.support",
      link: "https://google.com",
      targetBlank: false,
    },
],
```

``` javascript
// Hidden menu item
items: [
    {
      iconName: icons.SettingsFill,
      translate: "title.information.support",
      page: "MainLayout",
      isHidden: true,
    },
],
```

``` javascript
// Underdeveloped menu item
items: [
    {
      iconName: icons.SettingsFill,
      translate: "title.information.support",
      page: "MainLayout",
    },
],
```

``` javascript
// Menu item section
items: [
    {
      translate: "title.sections",
      isHidden: false,
    },
],
```

``` javascript
// Menu item divider
items: [
    {
      isDivider: true,
    },
],
```

***where***:

`iconName` – icon SVG data source path.
- type: String
- default: ""

`page` – Vue route name for page.
- type: String
- default: ""

`translate` – item text Vue i18n translation path.
- type: String
- default: ""

`link` – external link url.
- type: String
- default: ""

`targetBlank` – open external link in new window.
- type: Boolean
- default: false

`isHidden` – hide a menu item.
- type: Boolean
- default: false

`isDivider` – divider line between menu items.

***

**settingsRoute** –  Vue.js route params for settings button.
- type: Object
- default: {}

Example:

``` javascript
settingsRoute: {
    iconName: icons.SettingsFill,
    page: "Dashboard",
    translate: "title.settings",
    isHidden: true,
}
```
***where***:

`iconName` – icon SVG data source path or page in menu.
- type: String
- default: ""

`page` – page name in route.
- type: String
- default: ""

`translate` – text from localization file.
- type: String
- default: ""

`isHidden` – hide a menu item.
- type: Boolean
- default: false
***

**newsRoute** – Vue.js router route settings which use for news button. Settings for `newsRoute` are same as in `settingsRoute`.
- type: Object
- default: {}

***

**asideInfoBlock** - shows some info message in sidebar (for example license will expire soon).
- type: Object
- default: {}

Example:

``` javascript
asideInfoBlock: [
    {
      relatedPage: "Users",
      translate: {
        title: "asideInfoBlock.title",
        content: "asideInfoBlock.content",
      },
      link: {
        isButton: true,
        url: "https://my.atmo.pro",
        text: i18n.t("asideInfoBlock.backToOldCabinet"),
      },
      isHidden: true,
    },
],
```

***where***:

`relatedPage` – page on which the info block is active. Also can be "*" - active in all pages.
- type: String
- default: ""

`translate` - localization of the component.
- type: Object
- default: {}

`title` – title for component.
- type: String
- default: ""

`content` – component's content.
- type: String
- default: ""

`link` – link settings.
- type: Object
- default: {}

`isButton` – shows button instead of link.
- type: Boolean
- default: false

`url` – url link.
- type: String
- default: ""

`text` – link text.
- type: String
- default: ""

`isHidden` - makes info block inactive in page.
- type: Boolean
- default: false

***

**rightInfoBlock** - shows some text message hint at a bottom right part of the page. Settings for `rightInfoBlock` are almost the same as in `asideInfoBlock`, except param `infoBlockWidth`.
- type: Object
- default: {}

Example:

``` javascript
rightInfoBlock: [
    {
      iconName: icons.SettingsFill,
      relatedPage: "ServiceCases",
      translate: {
        title: "page.serviceCases.support.title",
        content: "page.serviceCases.support.content",
      },
      isHidden: false,
      infoBlockWidth: "lg",
    },
],
```

***where***:

`infoBlockWidth` – width of block.
- type: String
- default: ""
- values: `sm`, `md`, `lg`

***
