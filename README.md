# Count Snooze

![React Badge](https://img.shields.io/badge/React-149eca?style=flat-square&logo=react&labelColor=grey)
![Typescript Badge](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&labelColor=grey)
![MUI Badge](https://img.shields.io/badge/Material_UI-007FFF?style=flat-square&logo=mui&labelColor=grey)
![GitHub License](https://img.shields.io/github/license/ldeveber/count-snooze?style=flat-square)
![Vite Badge](https://img.shields.io/badge/Vite-646cff?style=flat-square&logo=vite&labelColor=grey)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/ldeveber/count-snooze/build?style=flat-square)

This is a browser extension for managing and snoozing tabs in chrome!

![Count Snooze Logo](./public/icon_128.png)

## Local Development & Setup

1. `nvm install` or already be using the version listed in `.nvmrc`.
1. `npm install`
1. To build:
   * `npm run dev` for a watched development build
   * `npm run build` for a production build
1. Navigate to `chrome://extensions` in Chrome
1. Turn on `Developer mode` in the upper righthand corner
1. Click `Load unpacked` button
1. Select the `dist` folder inside this project

You should now have it loaded locally! 😊

### Additional Commands

* `npm run test` and `npm run test:watch` - local tests
* `npm run lint` - type checks, ESLint, & Prettier checks

## Local Uninstallation

1. Navigate to `chrome://extensions` in Chrome
1. Find Count Snooze in the list and click `Remove`
    * Optionally: turn off `Development mode`!

## Useful References

* [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/mv3/)
* [Vite Plugin](https://vitejs.dev/guide/api-plugin.html)
* [Rollup](https://rollupjs.org/guide/en/)

---

This project was inspired by:

* [Tab Manager Plus](https://github.com/stefanXO/Tab-Manager-Plus)
  * [Tab Manager Plus for Chrome (Chrome Store)](https://chromewebstore.google.com/detail/tab-manager-plus-for-chro/cnkdjjdmfiffagllbiiilooaoofcoeff)
* [Tab Snooze - Works as of Nov 7 2021 (Chrome Store)](https://chromewebstore.google.com/detail/tab-snooze-works-as-of-no/kgnigbfnfjgpfaiaafcbgdkpalapiinb)
* [Jonghakseo/chrome-extension-boilerplate-react-vite](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite)
