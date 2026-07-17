# ⏱️ 计时器增量 (CF Timer Incremental)

一个基于纯 Web 技术的时间增量游戏。玩家通过购买升级和完成挑战来加速时间累计，体验从缓慢到爆发的成长过程。

## 🎮 游戏玩法

- **累积秒数**：时间自动流逝，秒数持续增长
- **完成周期**：每 60 秒完成一个周期，获得分钟（主要货币）
- **购买升级**：使用分钟购买各类升级，提升速度和产量
- **成就系统**：达成里程碑解锁成就
- **挑战模式**：在限定条件下完成挑战，获得永久奖励
- **重生系统**：重置进度获得 SDP（时间重生点数），再投资获得永久加成
- **时间碎片**：将 SDP 转化为 VDP（时间碎片），解锁更强大的升级

## 🚀 快速开始

### 在线游玩

访问 GitHub Pages 或直接打开 `index.html`。

### 本地运行

```bash
git clone https://github.com/chenf888/CF-timer-Increment.git
cd CF-timer-Increment
# 直接用浏览器打开 index.html，或使用任意静态服务器
python -m http.server 8080
```

无需构建工具，纯原生 HTML + CSS + JavaScript。

## 📂 项目结构

```
├── index.html              # 游戏入口
├── css/
│   ├── base.css            # 基础样式、CSS 变量、主题、布局
│   └── components.css      # 所有组件样式
├── js/
│   ├── app.js              # 全部游戏逻辑
│   └── break_eternity.js   # 大数运算库 (break_eternity.js)
└── lang/
    ├── zh-CN.txt           # 简体中文
    └── ...                 # 其他语言
```

## 🏗️ 技术栈

| 技术 | 用途 |
|---|---|
| 纯 HTML/CSS/JS | 零依赖，无框架 |
| [break_eternity.js](https://github.com/Patashu/break_eternity.js) | 大数精度运算（支持超越 1e308 的数字） |
| Font Awesome 6.4.0 | 图标 |
| CSS 变量 | 6 种主题皮肤切换 |
| localStorage | 存档持久化 |

## 🎨 主题

支持 6 种视觉主题，可在设置中切换：
- 🔵 蓝色（默认）
- 🟡 黄色
- ⚪ 简约
- 💜 霓虹
- 🔴 暗红
- 🎨 自定义颜色

## 🌍 多语言

当前支持 25 种语言，翻译文件位于 `lang/` 目录。

## 📝 版本历史

- **v1.4.4** — 重生系统完善，挑战系统重构，大数库升级为 break_eternity.js
- **v1.4.3** — 原始版本

## 👤 作者

**陈风就是浪** (QQ: 399095982)

## 🙏 鸣谢

- anzero (QQ: 3993298503)
- 一个增量的人 (QQ: 2481258834)
- 一个刷号的人 (QQ: 3605754861)
- [break_eternity.js](https://github.com/Patashu/break_eternity.js) — 大数运算库

## 📄 开源协议

MIT License
