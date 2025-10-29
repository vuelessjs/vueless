# TypeScript

Vueless UI provides first-class TypeScript support, ensuring you get full type safety, autocompletion, and IntelliSense across your entire project.

## Vue and Nuxt

Add a reference to the Vueless module types in your project’s global type declarations:

{% code title="env.d.ts" %}
```typescript
/// <reference types="vueless/modules" />
```
{% endcode %}

&#x20;Or define them directly in your `tsconfig.json`:

{% code title="tsconfig.json" %}
```json
{
  "compilerOptions": {
    ...
    "types": [
      "vueless/modules",
    ]
  },
}
```
{% endcode %}

## Vue

Add type declarations for components to provide prop autocompletion in IDEs.

{% code title="tsconfig.json" %}
```json
{
  "include": [
    ...
    "components.d.ts",
  ],
}
```
{% endcode %}

## Nuxt

Add this rule to override the default Nuxt TypeScript preset:

{% code title="tsconfig.json" %}
```json
{
  "compilerOptions": {
    ...
    "noUncheckedIndexedAccess": false,
  }
}
```
{% endcode %}

