import { IMenuActionHandler } from "@/common/interfaces/IMenuActionHandler";
import { DevLicenseState } from "@/lib/license";
import { IPlatformInfo } from "../IPlatformInfo";
import { IGroupedUserSettings } from "../transport/TransportUserSetting";

export function menuItems(
  actionHandler: IMenuActionHandler,
  settings: IGroupedUserSettings,
  platformInfo: IPlatformInfo
) {
  return {
    upgradeModal: (label: string) => {
      return {
        id: `upgrade-${label}`,
        label: label,
        click: actionHandler.upgradeModal,
      };
    },
    quit: {
      id: "quit",
      label: platformInfo.isMac ? "退出" : "退出",
      accelerator: platformInfo.isMac ? "CommandOrControl+Q" : undefined,
      click: actionHandler.quit,
    },
    undo: {
      id: "undo",
      label: "撤销",
      // Displayed only — the focused editor (CodeMirror, text inputs)
      // handles the shortcut itself. Registering it would fire an extra
      // webContents.undo() per keypress, undoing 2-3 steps at once.
      accelerator: "CommandOrControl+Z",
      click: actionHandler.undo,
      registerAccelerator: false,
      role: "undo",
    },
    redo: {
      id: "redo",
      label: "重做",
      accelerator: platformInfo.isWindows
        ? "Ctrl+Y"
        : "Shift+CommandOrControl+Z",
      click: actionHandler.redo,
      registerAccelerator: false,
      role: "redo",
    },
    cut: {
      id: "cut",
      label: "剪切",
      accelerator: "CommandOrControl+X",
      click: actionHandler.cut,
      registerAccelerator: false,
      role: "cut",
    },
    copy: {
      id: "copy",
      label: "复制",
      accelerator: "CommandOrControl+C",
      click: actionHandler.copy,
      registerAccelerator: false,
      role: "copy",
    },
    paste: {
      id: "paste",
      label: "粘贴",
      accelerator: "CommandOrControl+V",
      click: actionHandler.paste,
      registerAccelerator: false,
      role: "paste",
    },
    pasteAsNewRows: {
      id: "paste-as-new-rows",
      label: "粘贴为新行",
      // Displayed only — the shortcut is handled by the table grid's own
      // keymap so it stays scoped to the table and doesn't fire elsewhere
      // (e.g. plain-text paste in the query editor).
      accelerator: "CommandOrControl+Shift+V",
      registerAccelerator: false,
      click: actionHandler.pasteAsNewRows,
    },

    selectAll: {
      id: "select-all",
      label: "全选",
      accelerator: "CommandOrControl+A",
      click: actionHandler.selectAll,
      role: "selectAll",
    },
    // view
    zoomreset: {
      id: "zoom-reset",
      label: "重置缩放",
      accelerator: "CommandOrControl+0",
      click: actionHandler.zoomreset,
    },
    zoomin: {
      id: "zoom-in",
      label: "放大",
      accelerator: "CommandOrControl+=",
      click: actionHandler.zoomin,
    },
    zoominNumpad: {
      id: "zoom-in-numpad",
      label: "放大（小键盘）",
      accelerator: "CommandOrControl+numadd",
      click: actionHandler.zoomin,
      visible: false,
    },
    zoomout: {
      id: "zoom-out",
      label: "缩小",
      accelerator: "CommandOrControl+-",
      click: actionHandler.zoomout,
    },
    zoomoutNumpad: {
      id: "zoom-out-numpad",
      label: "缩小（小键盘）",
      accelerator: "CommandOrControl+numsub",
      click: actionHandler.zoomout,
      visible: false,
    },
    editorFontSizeReset: {
      id: "editor-font-size-reset",
      label: "重置编辑器字号",
      click: actionHandler.editorFontSizeReset,
    },
    editorFontSizeIncrease: {
      id: "editor-font-size-increase",
      label: "增大编辑器字号",
      accelerator: platformInfo.isMac ? "Command+Shift+." : "Ctrl+Shift+.",
      click: actionHandler.editorFontSizeIncrease,
    },
    editorFontSizeDecrease: {
      id: "editor-font-size-decrease",
      label: "减小编辑器字号",
      accelerator: platformInfo.isMac ? "Command+Shift+," : "Ctrl+Shift+,",
      click: actionHandler.editorFontSizeDecrease,
    },
    fullscreen: {
      id: "fullscreen",
      label: "切换全屏",
      accelerator: platformInfo.isMac ? "Command+Control+F" : "F11",
      click: actionHandler.fullscreen,
    },
    // help
    about: {
      id: "about",
      label: "关于 Beekeeper Studio",
      click: actionHandler.about,
      role: "about",
    },
    devtools: {
      id: "dev-tools",
      label: "显示开发者工具",
      nonNativeMacOSRole: true,
      click: actionHandler.devtools,
    },
    restart: {
      id: "restart",
      label: "重启 Beekeeper",
      click: actionHandler.restart,
    },
    checkForUpdate: {
      id: "updatecheck",
      label: "检查软件更新",
      click: actionHandler.checkForUpdates,
    },
    opendocs: {
      id: "opendocs",
      label: "文档",
      click: actionHandler.opendocs,
    },
    support: {
      id: "contactSupport",
      label: "联系支持",
      click: actionHandler.contactSupport,
    },
    gettingStartedGuide: {
      id: "gettingStartedGuide",
      label: "快速上手指南",
      click: actionHandler.openGettingStarted,
    },
    reload: {
      id: "reload-window",
      label: "重新加载窗口",
      accelerator: "CommandOrControl+Shift+R",
      click: actionHandler.reload,
    },
    newWindow: {
      id: "new-window",
      label: "新建窗口",
      accelerator: "CommandOrControl+Shift+N",
      click: actionHandler.newWindow,
    },
    addBeekeeper: {
      id: "add-beekeeper",
      label: "添加 Beekeeper 数据库",
      click: actionHandler.addBeekeeper,
    },
    newTab: {
      id: "new-query-menu",
      label: "新建标签",
      accelerator: "CommandOrControl+T",
      click: actionHandler.newQuery,
      enabled: false,
    },
    closeTab: {
      id: "close-tab",
      label: "关闭标签",
      accelerator: "CommandOrControl+W",
      click: actionHandler.closeTab,
      registerAccelerator: false,
      enabled: false,
    },
    importSqlFiles: {
      id: "import-sql-files",
      label: "导入已保存的查询",
      accelerator: "CommandOrControl+I",
      click: actionHandler.importSqlFiles,
      showWhenConnected: true,
      enabled: false,
    },
    quickSearch: {
      id: "go-to",
      label: "快速搜索",
      accelerator: "CommandOrControl+P",
      registerAccelerator: false,
      click: actionHandler.quickSearch,
      enabled: false,
    },
    disconnect: {
      id: "disconnect",
      label: "断开连接",
      accelerator: "Shift+CommandOrControl+Q",
      click: actionHandler.disconnect,
      enabled: false,
    },
    primarySidebarToggle: {
      id: "menu-toggle-sidebar",
      label: "切换主侧边栏",
      accelerator: platformInfo.isMac ? "CommandOrControl+B" : "Alt+S",
      click: actionHandler.togglePrimarySidebar,
      enabled: false,
    },
    secondarySidebarToggle: {
      id: "menu-secondary-sidebar",
      label: "切换副侧边栏",
      // accelerator: "Alt+S",
      click: actionHandler.toggleSecondarySidebar,
      enabled: false,
    },
    privacyModeToggle: {
      id: "privacy-mode-toggle",
      label: "切换隐私模式",
      click: actionHandler.togglePrivacyMode,
      checked: settings?.privacyMode?.value,
    },
    themeToggle: {
      id: "theme-toggle-menu",
      label: "主题",
      submenu: [
        {
          type: "radio",
          label: "跟随系统",
          click: actionHandler.switchTheme,
          checked: settings?.theme?.value === "system",
        },
        {
          type: "radio",
          label: "浅色",
          click: actionHandler.switchTheme,
          checked: settings?.theme?.value === "light",
        },
        {
          type: "radio",
          label: "深色",
          click: actionHandler.switchTheme,
          checked: settings?.theme?.value === "dark",
        },
        {
          type: "radio",
          label: "Solarized",
          click: actionHandler.switchTheme,
          checked: settings?.theme?.value === "solarized",
        },
        {
          type: "radio",
          label: "Solarized Dark",
          click: actionHandler.switchTheme,
          checked: settings?.theme?.value === "solarized-dark",
        },
        {
          type: "radio",
          label: "VS Code Dark",
          click: actionHandler.switchTheme,
          checked: settings?.theme?.value === "vs-code-dark",
        },
      ],
    },
    enterLicense: {
      id: "enter-license",
      label: "管理许可证密钥",
      click: actionHandler.enterLicense,
    },
    backupDatabase: {
      id: "backup-database",
      label: "创建数据库备份",
      click: actionHandler.backupDatabase,
      enabled: false,
    },
    restoreDatabase: {
      id: "restore-database",
      label: "还原数据库备份",
      click: actionHandler.restoreDatabase,
      enabled: false,
    },
    exportTables: {
      id: "export-tables",
      label: "导出数据",
      click: actionHandler.exportTables,
      enabled: false,
    },
    updatePin: {
      id: "update-pin",
      label: "更新 PIN",
      click: actionHandler.updatePin,
    },
    minimalModeToggle: {
      id: "minimal-mode-toggle",
      label: "切换极简模式",
      click: actionHandler.toggleMinimalMode,
    },
    simulatePlatform: {
      id: "simulate-platform",
      label: "DEV Simulate Platform",
      submenu: [
        {
          type: "radio",
          label: "None (use real platform)",
          checked: true,
          click: (item, win) =>
            actionHandler.simulatePlatform(item, win, "none"),
        },
        {
          type: "radio",
          label: "Snap",
          click: (item, win) =>
            actionHandler.simulatePlatform(item, win, "snap"),
        },
        {
          type: "radio",
          label: "Flatpak",
          click: (item, win) =>
            actionHandler.simulatePlatform(item, win, "flatpak"),
        },
      ],
    },
    licenseState: {
      id: "license-state",
      label: "DEV Switch License State",
      submenu: [
        { label: ">>> BEWARE: ALL LICENSES WILL BE LOST! <<<" },
        {
          label: "First time install, no license, no trial.",
          click: (item, win) =>
            actionHandler.switchLicenseState(
              item,
              win,
              DevLicenseState.firstInstall
            ),
        },
        {
          label: "On a trial license",
          click: (item, win) =>
            actionHandler.switchLicenseState(
              item,
              win,
              DevLicenseState.onTrial
            ),
        },
        {
          label: "Trial expired",
          click: (item, win) =>
            actionHandler.switchLicenseState(
              item,
              win,
              DevLicenseState.trialExpired
            ),
        },
        {
          label: "On an active paid license",
          click: (item, win) =>
            actionHandler.switchLicenseState(
              item,
              win,
              DevLicenseState.activePaidLicense
            ),
        },
        {
          label: "On an expired, lifetime license, that covers this version",
          click: (item, win) =>
            actionHandler.switchLicenseState(
              item,
              win,
              DevLicenseState.expiredLifetimeCoversThisVersion
            ),
        },
        {
          label:
            "On an expired, lifetime license, that covers an earlier version",
          click: (item, win) =>
            actionHandler.switchLicenseState(
              item,
              win,
              DevLicenseState.expiredLifetimeCoversEarlierVersion
            ),
        },
      ],
    },
    toggleBeta: {
      id: "toggle-beta",
      label: "发布通道",
      submenu: [
        {
          type: "radio",
          label: "稳定版",
          click: actionHandler.toggleBeta,
          checked: settings?.useBeta?.value == false,
        },
        {
          type: "radio",
          label: "测试版",
          click: actionHandler.toggleBeta,
          checked: settings?.useBeta?.value == true,
        },
      ],
    },
    managePlugins: {
      id: "manage-plugins",
      label: "管理插件",
      click: actionHandler.managePlugins,
    },
    keyboardShortcuts: {
      id: "keyboard-shortcuts",
      label: "键盘快捷键",
      click: actionHandler.keyboardShortcuts,
    },
  };
}
