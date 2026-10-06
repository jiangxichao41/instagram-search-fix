# Instagram Search Fix

修复 Instagram 网页版搜索按钮点击无反应的问题。

适用于 Instagram 桌面网页和 Android 移动网页。

## ✨ 功能

- 修复 Instagram 网页版搜索按钮无反应
- 支持 Windows / macOS 桌面浏览器
- 支持 Android 移动网页
- 支持中文、英文等搜索关键词
- 支持用户名和普通关键词搜索
- 支持 Enter 回车搜索
- 支持 `Ctrl + K` 快捷键
- 支持 `/` 快捷键
- 提供「🔍 搜索修复」备用按钮
- 不需要修改 Instagram 网页源码
- 不需要修改浏览器设置

## 🔧 工作原理

Instagram 网页端部分情况下搜索按钮点击后不会正常触发搜索功能。

本脚本会拦截 Instagram 的搜索按钮点击事件，并提供独立的搜索入口。

搜索时使用：

```text
https://www.instagram.com/explore/search/keyword/?q=关键词

📦 安装

需要安装用户脚本管理器：

Tampermonkey
Violentmonkey
ScriptCat

然后打开：

instagram-search-fix.user.js

选择安装即可。

🚀 使用方法

安装脚本后刷新 Instagram。

方法 1：Instagram 原搜索按钮

直接点击 Instagram 左侧的搜索按钮。

如果搜索按钮正常触发，脚本会自动接管。

方法 2：备用搜索按钮

如果 Instagram 原来的搜索按钮仍然无反应，可以点击：

🔍 搜索修复

输入关键词后：

点击「搜索」
或按 Enter

即可进行搜索。

方法 3：快捷键

可以使用：

Ctrl + K

或者：

/

快速打开搜索窗口。

📱 Android

本脚本支持 Android 浏览器的 Instagram 网页版。

推荐使用支持用户脚本的浏览器，例如支持 Tampermonkey / Violentmonkey / ScriptCat 的浏览器。

🖥️ Windows

支持 Chrome、Edge 等可以运行用户脚本管理器的浏览器。

⚠️ 注意

本项目是第三方用户脚本。

本项目：

与 Instagram 无关
与 Meta 无关
不属于 Instagram 官方项目
不修改或破解 Instagram 客户端
仅修改网页端的前端交互行为

Instagram 网站更新后，页面结构可能发生变化。如果搜索功能再次发生变化，可能需要更新脚本。
