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
9. 接入 antd、formily、@tanstack/react-query；

## 开发 TIPS

- VSCode 插件：CSS Module、CSS Module、ESLint、Prettier（并设置 defaultFormatter）；
- 不直接操作 localStorage，而是使用 utils 文件夹下的 LocalStorageUtils；所有的 key 值均需写在 local-key 中（不能直接写常量）；
- 不额外使用 index.ts 做一次 import 再 export；
- 全程使用 formily 来做表单相关开发；不额外引入 @formily/antd（因为滞后），使用 antd 组件改造成 formily 组件；
- navigate 不直接填写 path，而是要使用 RoutePathEnum.XX.path；
- service 均 `import * as XxxService`，而不直接引用内部方法（目的是增加代码可读性，读到该行立马意识到是发起网络请求）；

## 关于本地缓存

不直接使用 `localStorage`，而是使用 utils 文件夹下的 `LocalStorageUtils`。`LocalStorageUtils` 相较于 `localStorage`，具有“类型提示”、“对象缓存”、“同步请求”的能力，即：

1. `getItem` 不是每次从 `localStorage` 读取，而是内存读取，加快访问速度；
2. `getItem` 返回的是 JSON 解析后的结果，而不是 string，简化开发；

关于弃用 `localforage`，主要是因为 `localforage` 只支持返回 Promise（异步），对于组件渲染，会多一次无意义的空状态渲染。

TIPS：未测试（未兼容）大量缓存的情况。

## 关于认证和授权

### 跳出至“登录页”时机

用户何时会跳出至“登录页”？两个地方做了设置：

1. 在加载根路由时，在 rootLoader 中，当 localforage 不存在 LOGIN_RESULT 时，表示用户未登录，redirect 跳出；
2. 在任意请求时，在 request 中，当后端返回状态码为 401 时，表示用户登录凭证过期，window.location.replace 跳出；

两处地方稍有重复，2 基本能 cover 1，但 1 用户体验好一些。

### 权限发生变更

如果用户在浏览的过程中，被超级管理员关闭了某些权限，前端该如何做出反应？

修改用户权限后，后端会将用户的登录凭证失效。当前端再次向后端发起请求时，后端会返回 401（而不是 403），此时 request 做出反应，跳出至“登录页”。

由此可以得，当用户认证登录使用系统后，只要后端不返回 401，用户的所有操作均是合法的，权限都是正确的。因此，用户登录后，只需缓存权限一次，可以一直使用（直到后端返回 401 退出系统）。
