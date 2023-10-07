# crafted-admin

## 环境要求

- node >= v18.15.0；
- pnpm >= 8.8.0；
- VSCode 插件：CSS Module、CSS Module、ESLint、Prettier（并设置 defaultFormatter）；

## 项目初始化

1. 使用 Vite 官方脚手架初始化项目，参考 [Vite 官网 -> 开始](https://cn.vitejs.dev/guide/)；
2. 集成 Prettier，解决与 ESLint 冲突，参考 [Prettier 官网 -> Install -> ESLint](https://prettier.io/docs/en/install)；
3. 集成 lint-staged 和 husky，参考 [Prettier 官网 -> Install -> Git hooks](https://prettier.io/docs/en/install#git-hooks)；
4. 集成 commit-lint，参考 [commitlint 官网](https://github.com/conventional-changelog/commitlint)；
5. 使用 .module.less 作为项目样式语言；
6. 接入 react-router-dom；
