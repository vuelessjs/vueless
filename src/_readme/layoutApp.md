## App layout:

Settings for an `app` layout shuld be configured in the `app.layout.config.js`.
When using this layout on the project, you need to import the file from `store/authLayout.js` to the project's `store`.

For icons use in layout configs, you need to create an `icons` constant, where set to specify the path to the icons.

Example:

``` javascript
const icons = {
    SettingsFill: require("@material-symbols/svg-400/outlined/settings-fill.svg"),
}

iconName: icons.SettingsFill
```

***

**logoPath** – logo image path from `/public` folder.
- type: String
- default: ""

Example:

``` javascript
logoPath: "static/logos/dark-outline.svg"
```

***

**mobileLogoPath** – logo path from `/public` folder for mobile version.
- type: String
- default: ""

Example:

``` javascript
mobileLogoPath: "static/logos/light.svg",
```

***

**brandName** – brand name.
- type: String
- default: ""

Example:

``` javascript
brandName: "Atmosfera"
```

***

**profileRouteName** – Vue.js router route name which need to be invoked on click by user block.
- type: String
- default: ""

Example:

``` javascript
profileRouteName: "Profile",
```

***

**mainMenuItems** – main menu items.
- type: Array of Objects
- default: []

Example:

``` javascript
// Internal link 
mainMenuItems: [
    {
      iconName: icons.SettingsFill,
      page: "MainLayout",
      translate: "title.information.support", 
    },
],
```

``` javascript
// External link
mainMenuItems: [
    {
      iconName: icons.SettingsFill,
      translate: "title.information.support",
      link: {
        url: "https://google.com",
        targetBlank: false,
      },
    },
],
```

``` javascript
// Hidden menu item
mainMenuItems: [
    {
      iconName: icons.SettingsFill,
      translate: "title.information.support",
      page: "MainLayout",
      isHidden: true,
    },
],
```

``` javascript
// Menu item section
mainMenuItems: [
    {
      translate: "title.sections",
      isHidden: false,
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

***

**footerMenuItems** – footer menu items. Settings for `footerMenuItems` are same as in `mainMenuItems` excludes sections.
- type: Array of Objects
- default: []

***
