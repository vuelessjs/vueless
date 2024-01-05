## App config:

`vueless.config.js` – library configuration file.

All other config files can have any names and may be included from anywhere.
At the moment, the following configuration files are imported to it: 
- `[name].layout.config.js` – set of separated configs for each layout. For example `admin.layout.config.js` or/and `auth.layout.config.js`...

See documentation in the appropriate named `.md` files.

We recommend storing all configuration files in the `/src/configs` folder.

***

**backgroundsPath** – path to layout backgrounds from `/public` folder (user customisable backgrounds).
- type: String
- default: ""

Example:

``` javascript
backgroundsPath: "static/backgrounds/"
```

***

**component** – components global configuration.
- type: Object
- default: {}

Example:

``` javascript
component: {
    UTopLoader: { color: "blue" },
},
```

***where***:

`component` can includes next base components: `UTopLoader`, `UPage`, etc..

***

**layout** – layouts configuration.

``` javascript
const { default: admin } = require("./admin.layout.config");
const { default: auth } = require("./auth.layout.config");

layout: { admin, auth }
```

***

**notify** – application notify configuration.

``` javascript
notify: {
    positionClasses: {
      page: ".mono-page-wrapper",
      aside: ".aside",
    },
  },
```
