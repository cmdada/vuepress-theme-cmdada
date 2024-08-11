<h1 align="center">vuepress-theme-plume</h1>

It has built-in rich and powerful functions designed to make the content more expressive.

## Features

- 💻 Responsive layout to adapt to different screen sizes
- 📖 Blog & Documentation
- 🔗 Automatically generate permanent links to articles
- ⚖ Support multiple languages
- 🔑 Supports full site encryption and partial encryption
- 👀 Support search, article comments
- 👨‍💻‍ Support light/dark themes (including code highlighting)
- 📠 markdown enhancement, supports code block grouping, prompt container, task list, mathematical formula, code demonstration, etc.
- 📚 Embed code demo, support CodePen, JSFiddle, CodeSandbox, etc.
- 📊 Embed charts, support chart.js, Echarts, Mermaid, flowchart
- 🎛 Resource embedding, supporting PDF, bilibili videos, youtube videos, etc.
- 🪞 Supports site-wide watermarks and partial content watermarks

## Install

```sh
npm install vuepress@next vuepress-theme-plume
# or
pnpm add vuepress@next vuepress-theme-plume vue
# or
yarn add vuepress@next vuepress-theme-plume
```

## Usage

``` ts
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
// vuepress config...
theme: plumeTheme({
// theme config...
})
})
```

### `plumeTheme(options)`

__options__ : `PlumeThemeOptions`

[View options detailed description](https://theme-plume.vuejs.press//config/basic/)

## Case

- [Roboshark's website](https://1157.adabit.org/)

### Notice

This theme is based on `vuepress-theme-plume` and is just made for my stuff.

This means functionality has stabilized, but there is still a small chance of breaking changes in the future.

## Contribution Guidelines

Check out the [[Contribution Guidelines]](/CONTRIBUTING.md) to learn more
