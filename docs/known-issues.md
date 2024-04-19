# Known issues

### SyntaxError: Unexpected token 'export'

```bash
/[root dir path]/vueless.config.js:6
export default {
^^^^^^

SyntaxError: Unexpected token 'export'
...
```

**Solution:** add `"type": "module"` in your project `package.json`
