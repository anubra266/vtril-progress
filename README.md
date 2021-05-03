# Inertia.js Progress

This package adds an [NProgress](https://ricostacruz.com/nprogress/) page loading indicator to your Inertia.js app.

## Installation

```bash
npm install vtril-progress
yarn add vtril-progress
```

Once it's been installed, initialize it in your app:

```js
import { VtrilProgress } from "vtril-progress";

VtrilProgress.init({
  // The delay after which the progress bar will
  // appear during navigation, in milliseconds.
  delay: 250,

  // The color of the progress bar.
  color: "#29d",

  // Whether to include the default NProgress styles.
  includeCSS: true,

  // Whether the NProgress spinner will be shown.
  showSpinner: false,
});
```

### Disable for an Inertia Request

```js
VtrilProgress.disable(() => {
  Inertia.post("/notification-seen");
});
```
