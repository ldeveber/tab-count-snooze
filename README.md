# Tab Count Snooze

<!-- @see https://shields.io/ -->
![GitHub License](https://img.shields.io/github/license/ldeveber/count-snooze?style=flat-square)
![React Badge](https://img.shields.io/badge/React-149eca?style=flat-square&logo=react&labelColor=grey)
![Typescript Badge](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&labelColor=grey)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
![WXT Badge](https://img.shields.io/badge/WXT-67D55E?style=flat-square&logo=wxt&labelColor=grey)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/ldeveber/count-snooze/build?style=flat-square)

This is a browser extension for managing and snoozing tabs in chrome!

![Tab Count Snooze Logo](./assets/icon.png)

## Local Development & Setup

This project uses [WXT](https://wxt.dev/) to run and build.

For information running, [reference their documentation](https://wxt.dev/guide/introduction.html).

1. `nvm install` or already be using the version listed in `.nvmrc`.
1. `pnpm install`
1. To build:
   * `pnpm run dev` for a watched development build
   * `pnpm run build` for a production build

For Chrome:

1. Navigate to `chrome://extensions` in Chrome
1. Turn on `Developer mode` in the upper righthand corner
1. Click `Load unpacked` button
1. Select the `.output/chrome-mv3-dev` and/or `.output/chrome-m3` folder inside this project

You should now have it loaded locally! 😊

## Local Uninstallation

1. Navigate to `chrome://extensions` in Chrome
1. Find Count Snooze in the list and click `Remove`
    * Optionally: turn off `Development mode`!

---

This project was inspired by:

* [Tab Manager Plus](https://github.com/stefanXO/Tab-Manager-Plus)
  * [Tab Manager Plus for Chrome (Chrome Store)](https://chromewebstore.google.com/detail/tab-manager-plus-for-chro/cnkdjjdmfiffagllbiiilooaoofcoeff)
* [Tab Snooze - Works as of Nov 7 2021 (Chrome Store)](https://chromewebstore.google.com/detail/tab-snooze-works-as-of-no/kgnigbfnfjgpfaiaafcbgdkpalapiinb)
