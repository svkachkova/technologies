# Summary

1. Use the `observable` decorator or `observable(object or array)` functions to make objects trackable for MobX.
2. The `computed` decorator can be used to create functions that can automatically derive value from the state and cache them.
3. Use `autorun` to automatically run functions that depend on some observable state. This is useful for logging, making network requests, etc.
4. Use the `observer` wrapper from the `mobx-react-lite` package to make your React components truly reactive. They will update automatically and efficiently.