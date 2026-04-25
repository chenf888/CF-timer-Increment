# ⏱️ Timer Increment — 时间增量游戏

[![Game Version](https://img.shields.io/badge/version-1.4.1-blue)](https://github.com/你的用户名/仓库名)
[![Status](https://img.shields.io/badge/status-active-brightgreen)]()

> **Language / 语言**  
> [English](#english-version) | [中文](#中文版本)

---

## ✨ 游戏简介

**Timer Increment** 是一款以「时间」为核心资源的增量游戏（Idle/Incremental Game）。  
你需要积累**秒**与**分钟**，购买各种升级，挑战特殊关卡，通过**重生系统**不断突破时间极限。

游戏采用 HTML/CSS/JS 技术实现，所有数据保存在浏览器本地。无需安装，打开即玩。

---

## 🎮 中文版本

### 🌟 核心玩法

- **时间积累**：时间会自动流逝（默认 1 秒/秒），通过升级可以大幅提升每秒获得的时间。
- **分钟与循环**：每 60 秒完成一个「循环」，可获得分钟奖励。循环数越多，分钟增长速度越快。
- **升级系统**：分为**基础升级 / 高级升级 / 专家升级**，提升速度、自动生产、奖励倍率等。
- **成就系统**：完成特定目标（例如总时间达到 1 小时、循环达到 100 个、重生次数等）可获得成就勋章。
- **挑战模式**：进入挑战模式后，需在限定条件内完成任务。完成后获得**永久性加成**（例如永久提升基础速度、解锁新升级等）。
- **重生系统**：
  - **Time Rebirth**：消耗分钟获得 **SDP（Time Rebirth Points）**，可购买重生升级，重置当前进度但保留部分能力。
  - **Time Fragment (VDP)**：消耗 SDP 兑换 **VDP**，用于购买更高级的「时间片段升级」，进一步提升产能。
- **SDV 挑战**：独立的极难挑战，需先解锁对应的重生升级，完成后提供专属强力奖励。
- **主题切换**：内置多种界面主题（蓝、红、黑、紫蓝、黄），可随时更换。

### 🕹️ 操作方式

- 点击 **Start / Resume** 控制计时器运行与暂停。
- 前往 **Upgrades** 页面购买升级（消耗分钟）。
- 前往 **Challenges** 页面进入挑战模式并选择挑战。
- 前往 **Rebirth** 页面进行重生、兑换碎片、购买重生升级。
- **Settings** 页面支持存档导出/导入、删除数据、切换主题。

### 🔧 本地运行

由于游戏为纯前端静态页面，你可以：

1. 克隆仓库到本地：
   ```bash
   git clone https://github.com/你的用户名/仓库名.git
   ```
2. 直接双击 `index.html` 在浏览器中打开。
3. 或使用本地服务器（如 VS Code Live Server）获得最佳体验。

### 📦 存档机制

- 游戏每隔 10 秒自动保存（实际代码为 100ms 高频保存，不影响性能）。
- 支持手动 **导出 / 导入** 存档字符串，方便迁移数据。
- **删除所有数据** 功能会清空全部进度，且不可恢复，请谨慎使用。

### 🗂️ 文件结构

```
.
├── index.html          # 主游戏文件（包含样式、逻辑、结构）
└── README.md           # 项目说明文档
```

不需要任何外部依赖（除 Font Awesome 图标库外，已 CDN 引用）。

### 👥 致谢与参与

- **作者**：陈风就是浪（QQ 399095982）  
- **感谢名单**：  
  anzero(QQ 3993298503)、一个增量的人(QQ 2481258834)、一个刷号的人(QQ 3605754861)  
- **QQ 交流群**：[点击加入](https://qm.qq.com/q/vGlvGiHR4G)  
- **B站主页**：[陈风](https://b23.tv/PqMBeqb)

如有建议或 Bug 反馈，欢迎提 Issue 或联系作者。

### 📜 许可证

本项目仅用于个人学习与交流，未经作者授权请勿用于商业用途。

---

## 🇬🇧 English Version

### 🌟 Core Gameplay

**Timer Increment** is an idle incremental game where time is your primary resource.  
You accumulate **seconds** and **minutes**, purchase upgrades, complete challenges, and leverage the **Rebirth System** to push the limits of time.

- **Time accumulation**: Time flows automatically (1 second per second by default). Upgrades increase the rate dramatically.
- **Minutes & Cycles**: Every 60 seconds completes a "Cycle", rewarding minutes. More cycles lead to faster minute generation.
- **Upgrades System**: Divided into **Basic / Advanced / Expert** – boosts speed, auto‑production, multiplier, cycle bonuses, and golden time chance.
- **Achievements**: Unlock badges by reaching milestones (1 hour total, 100 cycles, certain speed, etc.).
- **Challenge Mode**: Enter a special mode where you must meet goals under restrictions. Permanently reward upon success.
- **Rebirth System**:
  - **Time Rebirth**: Spend minutes to gain **SDP (Time Rebirth Points)**. Reset progress but keep permanent upgrades.
  - **Time Fragment (VDP)**: Exchange SDP for **VDP** to purchase even stronger fragment upgrades.
- **SDV Challenges**: Harder independent challenges. Unlock via specific rebirth upgrades, gain exclusive powerful bonuses.
- **Theme Switcher**: Multiple color schemes (Blue, Red, Black, Purple+Blue, Yellow).

### 🕹️ How to Play

- Press **Start / Resume** to run or pause the timer.
- Visit **Upgrades** to buy upgrades (cost minutes).
- Go to **Challenges** to enter Challenge Mode and pick a challenge.
- Use the **Rebirth** tab to perform time rebirth, claim fragments, and buy rebirth upgrades.
- **Settings** allows save export/import, data wipe, and theme switching.

### 🔧 Run Locally

The game is a single HTML file.

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```
2. Open `index.html` in any modern web browser.
3. For better development experience, use a local server (e.g., VS Code Live Server).

### 📦 Save System

- Automatically saves every 10 seconds (actually 100ms in code, very responsive).
- Manual **Export / Import** save string supported.
- **Delete All Data** erases everything permanently.

### 📁 File Structure

```
.
├── index.html          # Main game file (HTML/CSS/JS)
└── README.md           # Documentation
```

No external dependencies except Font Awesome (CDN).

### 👥 Credits & Community

- **Author**: Chen Feng is Lang (QQ 399095982)  
- **Special Thanks**: anzero(QQ 3993298503), an incremental person(QQ 2481258834), a grinding person(QQ 3605754861)  
- **QQ Group**: [Join us](https://qm.qq.com/q/vGlvGiHR4G)  
- **Bilibili**: [Chen Feng](https://b23.tv/PqMBeqb)

Feel free to report issues or give suggestions.

### 📜 License

This project is for personal learning and communication. Commercial use is not allowed without permission.

---

---

**Enjoy the journey through time! ⏳**
