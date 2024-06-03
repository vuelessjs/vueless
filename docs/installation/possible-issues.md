# Possible issues

### 1. SyntaxError: The requested module '/node\_modules/tailwindcss/colors.js?v=...' does not provide an export named 'default'

<mark style="color:green;">**Solution:**</mark> add `optimizeDeps` to the project `vite.config`.

```javascript
export default defineConfig({
  ...
  optimizeDeps: {
    include: ["tailwindcss/colors.js", "tailwindcss/colors", "@tailwindcss/forms"],
  },
});
```
