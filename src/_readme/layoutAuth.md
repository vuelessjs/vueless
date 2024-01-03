## Auth layout:

Settings for an `auth` layout should be configured in the `auth.layout.config.js`.

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

**logoLabel** – small text label at the top right part of a logo. Value can be string or array of objects (use when you want to add different labels for routes that useing same auth layout).
- type: String / Array
- default: ""

Example:

``` javascript
// String
logoLabel: "admin"
```    


``` javascript
// Array of Objects
logoLabel: [
    {     
        routeNames: ["Login", "ForgotPassword"],
        label: "",
    },
    {     
        routeNames: ["AdminLogin"],
        label: "admin",
    }
]
```
***where***:

`logoLabel[x].routeNames` – array with page Vue route names.
- type: Array of Objects
- default: []

`logoLabel[x].label` – small text label near logo.
- type: String
- default: ""

***

**languages** – languages block.
- type: Object
- default: {}

Example:

``` javascript    
languages: {
  isHidden: true,
}
```
***where***:

`isHidden` – hides languages block.
- type: Boolean
- default: false

***

**features** – the page is divided into two parts, a block for some information and a block with a login form.
- type: Object
- default: {}

Example:

``` javascript   
features: {
  isHidden: false,
  logoPath: "static/logos/dark-outline.svg",
}
```
***where***:

`isHidden` – shows features block.
- type: Boolean
- default: true

`logoPath` – logo image path from `/public` folder for features block.
- type: String
- default: ""

***

**brandName** – footer brand name.
- type: String
- default: ""

Example:

``` javascript
brandName: "Atmosfera"
``` 

***

**footerMenuItems** – footer menu items.
- type: Array of Objects
- default: []

Example:

``` javascript
// Internal link 
footerMenuItems: [
    {
      iconName: icons.SettingsFill,
      page: "MainLayout",
      translate: "title.information.support", 
    },
],
```

``` javascript
// External link
footerMenuItems: [
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
footerMenuItems: [
    {
      iconName: icons.SettingsFill,
      translate: "title.information.support",
      page: "MainLayout",
      isHidden: true,
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
