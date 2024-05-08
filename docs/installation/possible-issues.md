# Possible issues

## 1. SyntaxError: Unexpected token 'export'

```bash
/[root dir path]/vueless.config.js:6
export default {
^^^^^^

SyntaxError: Unexpected token 'export'
...
```

<mark style="color:green;">**Solution:**</mark> add `"type": "module"` in your project `package.json`

***

## 2. SyntaxError: The requested module '/node\_modules/tailwindcss/colors.js?v=...' does not provide an export named 'default'

<mark style="color:green;">**Solution:**</mark> add `optimizeDeps` to the project `vite.config`.

```javascript
export default defineConfig({
  ...
  optimizeDeps: {
    include: ["tailwindcss/colors.js", "tailwindcss/colors", "@tailwindcss/forms"],
  },
});
```
