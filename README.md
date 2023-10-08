# crafted-admin

## 环境要求

- node >= v18.15.0；
- pnpm >= 8.8.0；

## 项目初始化

1. 使用 Vite 官方脚手架初始化项目，参考 [Vite 官网 -> 开始](https://cn.vitejs.dev/guide/)；
2. 集成 Prettier，解决与 ESLint 冲突，参考 [Prettier 官网 -> Install -> ESLint](https://prettier.io/docs/en/install)；
3. 集成 lint-staged 和 husky，参考 [Prettier 官网 -> Install -> Git hooks](https://prettier.io/docs/en/install#git-hooks)；
4. 集成 commit-lint，参考 [commitlint 官网](https://github.com/conventional-changelog/commitlint)；
5. 使用 .module.less 作为项目样式语言；
6. 接入 react-router-dom；
7. 接入 axios，封装 request；
8. 使用 vite-plugin-mock 做本地 mock；
9. 接入 antd、formily、localforage、@tanstack/react-query；

## 开发 TIPS

- VSCode 插件：CSS Module、CSS Module、ESLint、Prettier（并设置 defaultFormatter）；
- 不直接操作 localStorage，而是使用 localforage；所有的 key 值均需写在 local-key 中（不能直接写常量）；
- 不额外使用 index.ts 做一次 import 再 export；
- 全程使用 formily 来做表单相关开发；不额外引入 @formily/antd（因为滞后），使用 antd 组件改造成 formily 组件；
