# 本地开发经验汇总（Beekeeper Studio）

> 记录本次在 Windows 上把 Beekeeper Studio 跑起来、做中文化与自定义主题的经验。供后续开发参考。

## 1. 启动方式

依赖装好后（`node_modules` 已存在，无需重装）：

```powershell
# 仓库根目录
yarn bks:dev
```

链路：`ui-kit` production 构建（每次约 10~15s）→ `concurrently` 跑 `dev:esbuild`（esbuild.mjs watch：编译 main/utility/preload）→ `dev:vite`（Vite dev server，端口 3003 strictPort）→ 自动拉起 Electron 窗口。

更轻的「只看代码、不弹窗」方式（跳过每次 ui-kit 构建）：

```powershell
cd apps/studio
yarn dev:esbuild   # 终端1：主进程热编译
yarn dev:vite      # 终端2：renderer 热编译
```

### 开始菜单一键启动（本机额外配置，不在仓库内）

- 脚本：`C:\Users\mingm\beekeeper-studio-dev.cmd`（每次启动前自动清理残留 electron + 释放 3003，避免冲突）
- 快捷方式：开始菜单 `Beekeeper Studio (dev).lnk`，图标指向 `apps/studio/public/icons/win/favicon.ico`
- 启动后：点 ✕ 只关窗口，dev 服务后台常驻；在启动终端里输入 `o` 回车可重启 Electron 重开窗口；`Ctrl+C` 停止。

## 2. Windows 上必须的两处修复（本仓库 6.0.5）

1. **`apps/studio/src-commercial/backend/lib/db/clients/anywhere/SqlAnywherePool.ts`**

   - 问题：模块顶层 `import sqlanywhere from 'sqlanywhere'`，utility 进程启动时经客户端注册表静态加载；Windows 缺 SAP SQL Anywhere SDK 二进制 → require 即抛错 → utility 崩溃 → 主进程无限 `UTILITY DEAD / restarting` → 永不建窗口。
   - 修复：改为惰性 `loadSqlAnywhere()`，仅真正连接 SQL Anywhere 时才 require。

2. **`apps/studio/esbuild.mjs`**
   - 问题：main 与 utility 两个 esbuild context 各触发 `restartElectron`；主动 `process.kill(pid,'SIGINT')` 在 Windows 表现为 `signal=null` → `if (!signal) process.exit()` 误把整个 watch 杀掉 → concurrently 连带停 vite。
   - 修复：主动重启前先 `oldElectron.removeAllListeners('exit')`；并把 Electron 的 stdin 设为 `ignore`。

## 3. 开发模式行为改动（`main.ts` / `WindowBuilder.ts`）

- `main.ts`：`window-all-closed` 在开发模式下不再 `app.quit()`（后台常驻）；生产仍关窗即退。
- `WindowBuilder.ts`：开发模式**不再自动 `openDevTools()`**，需要时按 `F12` / `Ctrl+Shift+I` 手动开关。
- `package.json`：`electron:serve` 的 `concurrently` 加 `--handle-input --default-input-target 0`，把终端输入路由给 esbuild；esbuild watch 监听 stdin `o` → `restartElectron()` 重开窗口。

## 4. UI 中文化（进行中）

主题/菜单/编辑器高频界面已中文化，涉及：

- `common/menus/MenuBuilder.ts`、`MenuItems.ts`（菜单栏 label）
- `components/TabQueryEditor.vue`、`CoreTabs.vue`、`ConnectionInterface.vue`
- `connection/SaveConnectionForm.vue`、`CommonServerInputs.vue`

**注意**：Volar 对该项目全局 mixin 注入的属性（`isUltimate`/`dialect`/`tab` 等）识别不全，`get_errors` 会有大量**预先存在**的类型噪音，属正常；改动本身不要引入新的语法/结构错误即可。

剩余大量英文 UI（各数据库专属表单、侧栏树右键、结果表/状态栏、查询历史、导出/备份界面等）。

## 5. 新增主题 `vs-code-dark`

- 目录：`apps/studio/src/assets/styles/themes/vs-code-dark/`（`variables.scss` + `theme.scss`）
- 挂载：`assets/styles/app.scss` 增加 `body.theme-vs-code-dark { ... }`
- 菜单：`MenuItems.ts` 主题子菜单新增 “VS Code Dark”（label → `vs-code-dark`）
- 主色：`#011627`（用户指定），周边色用 `color.adjust($theme-bg, ...)` 派生
- JSON Viewer 的 key 颜色：在 `theme.scss` 中覆盖 `--bks-text-editor-propertyName-fg-color: #7fdbca`（亮青，适配 `#011627`），仅影响本主题

## 6. 其它

- `store/index.ts`：实体过滤器（Tables/Views/Routines）默认 `showRoutines: false`（Routines 默认不勾选）。
- Node 版本：`.nvmrc` 建议 `v22.22`；当前系统 node `v24` 也能跑，若原生模块出问题切到 22。
- 常见排障：残留进程/端口占用
  ```powershell
  Get-Process electron -ErrorAction SilentlyContinue | Stop-Process -Force
  Get-NetTCPConnection -LocalPort 3003 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ -Force }
  ```
