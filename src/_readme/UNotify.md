## Notify config:

Settings for an `UNotify` component.

**duration** – component hide time.
- type: Object
- default: 

``` javascript
{
  short: 4000,
  medium: 8000,
  long: 12000,
  permanent: 300000,
},
```

Example with **owervrited** default params:

``` javascript
duration: {
  extraShort: 500,
  short: 1000,
  medium: 4000,
  long: 10000,
  permanent: 250000,
}
```

***where***: 

- `short` – duration name which may be used in `UNotify` component.
- `1000` – duration time in milliseconds.

***

**positionClasses** – if you need to center notify in the non-centred `UPage` use this config.
- type: Object
- default: {}

``` javascript
positionClasses: {
  page: ".mono-page-wrapper",
  aside: ".aside",
},
```

***where***:

- `page` – class of page block you're going to center notify component.
- `aside` – class of aside block to shift this in calculations.

***
