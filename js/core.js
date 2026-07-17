        // ===================== 核心变量 =====================
        const GAME_VERSION = "1.4.3";
        const D = (x) => new Decimal(x || 0);
        console.log("✅ Break Infinity 加载状态:", typeof Decimal === "function" ? "成功！" : "失败！");
        let seconds = D(0);
        let accumulatedSeconds = D(0);
        let cycleCount = D(0);
        let minutes = D(0);
        let speed = D(1);
        let baseSpeed = D(1);
        let bonusSpeed = D(0);
        let bonusMinutesPerSecond = D(0);
        let autoSecondsPerSecond = D(0);
        let speedMultiplier = D(1);
        let minuteMultiplier = D(1);
        let cycleBonusMinutes = D(0);
        let autoMinutesPerSecond = D(0);
        let costReduction = D(1);
        let vdp = D(0);
        let sdp = D(0);
        let timeRebirthCount = D(0);
        let vdpResets = D(0);
        let activeChallenge = null;
        let challengeMode = false;
        let challengeStartTime = null;
        let currentUpgradeTab = "basic";
        let maxSpeed = D(1);
        let saveCreatedAt = Date.now();
        let isRunning = false;
        let lastUpdate = Date.now();
        let currentTheme = localStorage.getItem("theme") || "blue";
        let clickCount = 0;
        let clickGainedSeconds = 0;
        const timerCircle = document.getElementById('timerCircle');
        const currentSecondsEl = document.getElementById('currentSeconds');
        const accumulatedSecondsEl = document.getElementById('accumulatedSeconds');
        const cyclesEl = document.getElementById('cycles');
        const speedMultiplierEl = document.getElementById('speedMultiplier');
        const startBtn = document.getElementById('startBtn');
        const particlesContainer = document.getElementById('particles');
        const languageList = [
            { code: 'zh-CN', nameKey: 'lang_zh' },
            { code: 'en-US', nameKey: 'lang_en' },
            { code: 'ja', nameKey: 'lang_ja' },
            { code: 'ko', nameKey: 'lang_ko' },
            { code: 'fr', nameKey: 'lang_fr' },
            { code: 'de', nameKey: 'lang_de' },
            { code: 'es', nameKey: 'lang_es' },
            { code: 'pt', nameKey: 'lang_pt' },
            { code: 'it', nameKey: 'lang_it' },
            { code: 'ru', nameKey: 'lang_ru' },
            { code: 'ar', nameKey: 'lang_ar' },
            { code: 'hi', nameKey: 'lang_hi' },
            { code: 'th', nameKey: 'lang_th' },
            { code: 'vi', nameKey: 'lang_vi' },
            { code: 'id', nameKey: 'lang_id' },
            { code: 'tr', nameKey: 'lang_tr' },
            { code: 'pl', nameKey: 'lang_pl' },
            { code: 'nl', nameKey: 'lang_nl' },
            { code: 'sv', nameKey: 'lang_sv' },
            { code: 'da', nameKey: 'lang_da' },
            { code: 'fi', nameKey: 'lang_fi' },
            { code: 'nb', nameKey: 'lang_nb' },
            { code: 'cs', nameKey: 'lang_cs' },
            { code: 'hu', nameKey: 'lang_hu' },
            { code: 'ro', nameKey: 'lang_ro' }
        ];

        window.format = function (val) {
            let d = D(val);
            if (d.abs().gte(10000)) return d.toExponential(2).replace(/\+/g, '');
            return d.toFixed(0);
        };

        window.openAbout = function () {
            const overlay = document.getElementById('aboutOverlay');
            if (overlay) overlay.classList.add('visible');
        };

        window.closeAbout = function () {
            const overlay = document.getElementById('aboutOverlay');
            if (overlay) overlay.classList.remove('visible');
        };

        window.switchUpgradeTab = function (tab) {
            currentUpgradeTab = tab;
            document.querySelectorAll('.upgrade-sub-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById(`upgrade-tab-${tab}`).classList.add('active');
            renderUpgrades();
            if (typeof saveGame === 'function') saveGame();
        };
        const achievements = [
            { id: "first_upgrade", titleKey: "ach_first_step_title", descKey: "ach_first_step_desc", icon: "fa-hand-point-up", check: () => upgrades.some(up => up.currentLevel > 0), progress: () => upgrades.some(up => up.currentLevel > 0) ? 100 : 0, unlocked: false },
            { id: "seconds_3600", titleKey: "ach_one_hour_title", descKey: "ach_one_hour_desc", icon: "fa-clock", check: () => accumulatedSeconds.gte(3600), progress: () => Math.min(accumulatedSeconds.toNumber(), 3600) / 3600 * 100, unlocked: false },
            { id: "seconds_10000", titleKey: "ach_time_traveler_title", descKey: "ach_time_traveler_desc", icon: "fa-hourglass-half", check: () => accumulatedSeconds.gte(10000), progress: () => Math.min(accumulatedSeconds.toNumber(), 10000) / 10000 * 100, unlocked: false },
            { id: "minutes_100", titleKey: "ach_100_minutes_title", descKey: "ach_100_minutes_desc", icon: "fa-hourglass-end", check: () => minutes.gte(100), progress: () => Math.min(minutes.toNumber(), 100) / 100 * 100, unlocked: false },
            { id: "minutes_1000", titleKey: "ach_1000_minutes_title", descKey: "ach_1000_minutes_desc", icon: "fa-hourglass-end", check: () => minutes.gte(1000), progress: () => Math.min(minutes.toNumber(), 1000) / 1000 * 100, unlocked: false },
            { id: "cycle_1", titleKey: "ach_start_cycle_title", descKey: "ach_start_cycle_desc", icon: "fa-sync-alt", check: () => cycleCount.gte(1), progress: () => Math.min(cycleCount.toNumber(), 1) * 100, unlocked: false },
            { id: "speed_3x", titleKey: "ach_time_controller_title", descKey: "ach_time_controller_desc", icon: "fa-rocket", check: () => speed >= 3.0, progress: () => Math.min(speed, 3) / 3 * 100, unlocked: false },
            { id: "speed_5x", titleKey: "ach_time_accelerator_title", descKey: "ach_time_accelerator_desc", icon: "fa-rocket", check: () => speed >= 5.0, progress: () => Math.min(speed, 5) / 5 * 100, unlocked: false },
            { id: "speed_10x", titleKey: "ach_extreme_speed_title", descKey: "ach_extreme_speed_desc", icon: "fa-tachometer-alt", check: () => speed >= 10.0, progress: () => Math.min(speed, 10) / 10 * 100, unlocked: false },
            { id: "speed_25x", titleKey: "ach_meteor_acceleration_title", descKey: "ach_meteor_acceleration_desc", icon: "fa-tachometer-alt", check: () => speed >= 25.0, progress: () => Math.min(speed, 25) / 25 * 100, unlocked: false },
            { id: "sdp_1000", titleKey: "ach_prestige_beginning_title", descKey: "ach_prestige_beginning_desc", icon: "fa-gem", check: () => sdp.gte(1000), progress: () => Math.min(sdp.toNumber(), 1000) / 1000 * 100, unlocked: false },
            { id: "vdp_1", titleKey: "ach_fragment_obtained_title", descKey: "ach_fragment_obtained_desc", icon: "fa-shapes", check: () => vdp.gte(1), progress: () => Math.min(vdp.toNumber(), 1) * 100, unlocked: false },
            { id: "rebirth_1", titleKey: "ach_first_rebirth_title", descKey: "ach_first_rebirth_desc", icon: "fa-redo-alt", check: () => timeRebirthCount.gte(1), progress: () => Math.min(timeRebirthCount.toNumber(), 1) * 100, unlocked: false },
            { id: "vdp_resets_1", titleKey: "ach_fragment_reset_title", descKey: "ach_fragment_reset_desc", icon: "fa-sync-alt", check: () => vdpResets.gte(1), progress: () => Math.min(vdpResets.toNumber(), 1) * 100, unlocked: false },
            { id: "rebirth_upgrades_1", titleKey: "ach_fragment_upgrader_title", descKey: "ach_fragment_upgrader_desc", icon: "fa-cog", check: () => rebirthUpgrades.some(up => up.currentLevel > 0), progress: () => rebirthUpgrades.filter(up => up.currentLevel > 0).length >= 1 ? 100 : 0, unlocked: false },
            { id: "rebirth_upgrades_5", titleKey: "ach_fragment_craftsman_title", descKey: "ach_fragment_craftsman_desc", icon: "fa-cog", check: () => rebirthUpgrades.filter(up => up.currentLevel > 0).length >= 5, progress: () => Math.min(rebirthUpgrades.filter(up => up.currentLevel > 0).length, 5) / 5 * 100, unlocked: false },
            { id: "challenge_1", titleKey: "ach_challenge_door_title", descKey: "ach_challenge_door_desc", icon: "fa-flag-checkered", check: () => challenges.filter(c => c.completed).length >= 1, progress: () => Math.min(challenges.filter(c => c.completed).length, 1) * 100, unlocked: false },
            { id: "challenge_3", titleKey: "ach_challenge_master_title", descKey: "ach_challenge_master_desc", icon: "fa-flag-checkered", check: () => challenges.filter(c => c.completed).length >= 3, progress: () => Math.min(challenges.filter(c => c.completed).length, 3) / 3 * 100, unlocked: false },
            { id: "challenge_5", titleKey: "ach_ultimate_challenge_title", descKey: "ach_ultimate_challenge_desc", icon: "fa-flag-checkered", check: () => challenges.filter(c => c.completed).length >= 5, progress: () => Math.min(challenges.filter(c => c.completed).length, 5) / 5 * 100, unlocked: false },
            { id: "cycle_100", titleKey: "ach_hundred_year_solitude_title", descKey: "ach_hundred_year_solitude_desc", icon: "fa-sync-alt", check: () => cycleCount.gte(52560000), progress: () => Math.min(cycleCount.toNumber(), 52560000) / 525600 * 100, unlocked: false },
        ];
        const challenges = [
            {
                id: "speed_demon",
                titleKey: "ch_speed_demon_title",
                descKey: "ch_speed_demon_desc",
                icon: "fa-rocket",
                rewardKey: "ch_speed_demon_reward",
                timeLimit: 180,
                check: () => speed >= 25,
                progress: () => Math.min(speed.toNumber(), 25) / 25 * 100,
                completed: false
            },
            {
                id: "time_master",
                titleKey: "ch_time_master_title",
                descKey: "ch_time_master_desc",
                icon: "fa-clock",
                rewardKey: "ch_time_master_reward",
                timeLimit: 120,
                check: () => cycleCount >= 200,
                progress: () => Math.min(cycleCount.toNumber(), 200) / 200 * 100,
                completed: false
            },
            {
                id: "efficiency_expert",
                titleKey: "ch_efficiency_expert_title",
                descKey: "ch_efficiency_expert_desc",
                icon: "fa-calculator",
                rewardKey: "ch_efficiency_expert_reward",
                timeLimit: null,
                check: () => speed >= 100 && minutes < 1000,
                progress: () => minutes < 1000 ? Math.min(speed.toNumber(), 100) / 100 * 100 : 0,
                completed: false
            },
            {
                id: "minimalist_master",
                titleKey: "ch_minimalist_master_title",
                descKey: "ch_minimalist_master_desc",
                icon: "fa-leaf",
                rewardKey: "ch_minimalist_master_reward",
                timeLimit: null,
                check: () => accumulatedSeconds >= 5000 && upgrades.every(up => up.currentLevel === 0),
                progress: () => upgrades.every(up => up.currentLevel === 0) ? Math.min(accumulatedSeconds.toNumber(), 5000) / 5000 * 100 : 0,
                completed: false
            },
            {
                id: "golden_chaser",
                titleKey: "ch_golden_chaser_title",
                descKey: "ch_golden_chaser_desc",
                icon: "fa-star",
                rewardKey: "ch_golden_chaser_reward",
                timeLimit: 600,
                check: () => false,
                progress: () => 0,
                completed: false,
                goldenCount: 0
            }
        ];
        const themes = [
            { id: "blue", nameKey: "theme_blue" },
            { id: "darkred", nameKey: "theme_darkred" },
            { id: "minimal", nameKey: "theme_minimal" },
            { id: "neon", nameKey: "theme_neon" },
            { id: "yellow", nameKey: "theme_yellow" },
        ];
        const SAVE_KEY = "timer_increment_v131";

        function getSaveData() {
            return {
                seconds: seconds.toString(),
                accumulatedSeconds: accumulatedSeconds.toString(),
                minutes: minutes.toString(),
                cycleCount: cycleCount.toString(),
                baseSpeed: baseSpeed.toString(),
                bonusSpeed: bonusSpeed.toString(),
                bonusMinutesPerSecond: bonusMinutesPerSecond.toString(),
                autoSecondsPerSecond: autoSecondsPerSecond.toString(),
                speedMultiplier: speedMultiplier.toString(),
                minuteMultiplier: minuteMultiplier.toString(),
                cycleBonusMinutes: cycleBonusMinutes.toString(),
                autoMinutesPerSecond: autoMinutesPerSecond.toString(),
                costReduction: costReduction.toString(),
                challengeCompletions: challenges.map(c => c.completed),
                activeChallenge: activeChallenge,
                challengeMode: challengeMode,
                challengeStartTime: challengeStartTime,
                upgradeLevels: upgrades.map(up => up.currentLevel),
                theme: currentTheme,
                currentUpgradeTab: currentUpgradeTab,
                clickCount: clickCount,
                clickGainedSeconds: clickGainedSeconds,
                sdp: sdp.toString(),
                vdp: vdp.toString(),
                timeRebirthCount: timeRebirthCount.toString(),
                vdpResets: vdpResets.toString(),
                rebirthUpgradeLevels: rebirthUpgrades.map(up => up.currentLevel),
                vdpUpgradeLevels: vdpUpgrades.map(up => up.currentLevel),
                boosterLevel: boosterLevel,
                sdvChallengeCompletions: sdvChallenges.map(c => c.completed),
                activeSDVChallenge: activeSDVChallenge,
                sdvChallengeStartTime: sdvChallengeStartTime,
                sdvMode: sdvMode,
                saveCreatedAt: saveCreatedAt,
                maxSpeed: maxSpeed.toString(),
                language: currentLang,
            };
        }
        function loadGame() {
            const raw = localStorage.getItem(SAVE_KEY);
            if (!raw) return;
            try {
                const d = JSON.parse(raw);
                if (d.language) currentLang = d.language;
                seconds = D(d.seconds || 0);
                accumulatedSeconds = D(d.accumulatedSeconds || 0);
                minutes = D(d.minutes || 0);
                cycleCount = D(d.cycleCount || 0);
                baseSpeed = D(d.baseSpeed || 1);
                bonusSpeed = D(d.bonusSpeed || 0);
                bonusMinutesPerSecond = D(d.bonusMinutesPerSecond || 0);
                autoSecondsPerSecond = D(d.autoSecondsPerSecond || 0);
                speedMultiplier = D(d.speedMultiplier || 1);
                minuteMultiplier = D(d.minuteMultiplier || 1);
                cycleBonusMinutes = D(d.cycleBonusMinutes || 0);
                autoMinutesPerSecond = D(d.autoMinutesPerSecond || 0);
                costReduction = D(d.costReduction || 1);
                activeChallenge = d.activeChallenge || null;
                challengeMode = d.challengeMode || false;
                challengeStartTime = d.challengeStartTime || null;

                if (d.challengeCompletions && challenges) {
                    d.challengeCompletions.forEach((completed, i) => {
                        if (challenges[i]) challenges[i].completed = completed;
                    });
                }

                clickCount = d.clickCount || 0;
                clickGainedSeconds = d.clickGainedSeconds || 0;

                if (d.upgradeLevels && upgrades) {
                    d.upgradeLevels.forEach((lvl, i) => {
                        if (upgrades[i]) upgrades[i].currentLevel = lvl;
                    });
                }
                if (d.rebirthUpgradeLevels && rebirthUpgrades) {
                    d.rebirthUpgradeLevels.forEach((lvl, i) => {
                        if (rebirthUpgrades[i]) rebirthUpgrades[i].currentLevel = lvl;
                    });
                }
                if (d.vdpUpgradeLevels && vdpUpgrades) {
                    d.vdpUpgradeLevels.forEach((lvl, i) => {
                        if (vdpUpgrades[i]) vdpUpgrades[i].currentLevel = lvl;
                    });
                }
                boosterLevel = d.boosterLevel || 0;
                if (d.sdvChallengeCompletions && sdvChallenges) {
                    d.sdvChallengeCompletions.forEach((completed, i) => {
                        if (sdvChallenges[i]) sdvChallenges[i].completed = completed;
                    });
                }
                activeSDVChallenge = d.activeSDVChallenge || null;
                sdvChallengeStartTime = d.sdvChallengeStartTime || null;
                sdvMode = d.sdvMode || false;
                sdp = D(d.sdp || 0);
                vdp = D(d.vdp || 0);
                timeRebirthCount = D(d.timeRebirthCount || 0);
                vdpResets = D(d.vdpResets || 0);
                saveCreatedAt = d.saveCreatedAt ? Number(d.saveCreatedAt) : Date.now();
                maxSpeed = d.maxSpeed ? D(d.maxSpeed) : D(1);
                if (d.theme) currentTheme = d.theme;
                if (d.currentUpgradeTab) currentUpgradeTab = d.currentUpgradeTab;
                recalculateSpeed();
            } catch (e) {
                console.error("存档解析失败:", e);
                alert(t('save_load_error') + e.message + "\n\n" + t('save_check_message'));
            }
        }
        function saveGame() {
            localStorage.setItem(SAVE_KEY, JSON.stringify(getSaveData()));
        }
        function applyTheme(themeId) {
            if (themeId === 'custom') {
                document.documentElement.removeAttribute('data-theme');
                const customColors = loadCustomColors();
                if (customColors) {
                    applyCustomColors(customColors);
                }
                currentTheme = 'custom';
            } else {
                const root = document.documentElement;
                root.style.removeProperty('--text');
     
                root.style.removeProperty('--bg-start');
                root.style.removeProperty('--bg-end');
                root.style.removeProperty('--primary');
                root.style.removeProperty('--primary-rgb');
                root.style.removeProperty('--shadow');
                root.style.removeProperty('--border');
                root.style.removeProperty('--inner-bg');
                root.style.removeProperty('--panel-bg');
                root.setAttribute('data-theme', themeId);
                currentTheme = themeId;
                localStorage.setItem('theme', themeId);
            }

            document.querySelectorAll('.theme-option-item').forEach(btn => {
                btn.classList.remove('active');
            });
            const activeBtn = document.querySelector('.theme-option-item[data-theme-id="' + themeId + '"]');
            if (activeBtn) activeBtn.classList.add('active');

            const triggerBtn = document.querySelector('.theme-trigger-btn span');
            if (triggerBtn) {
                if (themeId === 'custom') {
                    triggerBtn.textContent = t('custom_theme') || '自定义';
                } else {
                    const themeObj = themes.find(th => th.id === themeId);
                    triggerBtn.textContent = themeObj ? t(themeObj.nameKey) : themeId;
                }
            }
        }
        function createThemeButtons() {
            const container = document.getElementById('theme-buttons');
            if (!container) return;
            container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.className = 'theme-selector-wrapper';
            const triggerBtn = document.createElement('button');
            triggerBtn.className = 'setting-btn theme-trigger-btn';
            const currentThemeName = currentTheme === 'custom' ? (t('custom_theme') || '自定义') : t((themes.find(th => th.id === currentTheme) || themes[0]).nameKey);
            triggerBtn.innerHTML = '<i class="fas fa-palette"></i> <span>' + currentThemeName + '</span> <i class="fas fa-chevron-down"></i>';
            triggerBtn.onclick = () => {
                const menu = wrapper.querySelector('.theme-dropdown-menu');
                if (menu) menu.classList.toggle('active');
            };
            wrapper.appendChild(triggerBtn);
            const dropdownMenu = document.createElement('div');
            dropdownMenu.className = 'theme-dropdown-menu';
            themes.forEach(th => {
                const btn = document.createElement('button');
                btn.className = 'setting-btn theme-option theme-option-item';
                btn.dataset.themeId = th.id;
                btn.textContent = t(th.nameKey);
                if (th.id === currentTheme) btn.classList.add('active');
                btn.onclick = () => {
                    applyTheme(th.id);
                    dropdownMenu.classList.remove('active');
                };
                dropdownMenu.appendChild(btn);
            });
            const customBtn = document.createElement('button');
            customBtn.className = 'setting-btn theme-option theme-option-item';
            customBtn.dataset.themeId = 'custom';
            customBtn.textContent = t('custom_theme') || '自定义';
            if (currentTheme === 'custom') customBtn.classList.add('active');
            customBtn.onclick = () => {
                applyTheme('custom');
                dropdownMenu.classList.remove('active');
            };
            dropdownMenu.appendChild(customBtn);
            wrapper.appendChild(dropdownMenu);
            container.appendChild(wrapper);
            document.addEventListener('click', function closeThemeDropdown(e) {
                if (!wrapper.contains(e.target)) {
                    dropdownMenu.classList.remove('active');
                }
            });
        }
        function createParticles() {
            const container = document.getElementById('particles');
            if (!container) return;
            container.innerHTML = '';
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 3 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
                container.appendChild(particle);
            }
        }
        function createParticleBurst() {
            const container = document.getElementById('particles');
            if (!container) return;
            const count = 12;
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                const angle = (i / count) * Math.PI * 2;
                const distance = 60 + Math.random() * 80;
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;
                particle.style.setProperty('--end-x', endX + 'px');
                particle.style.setProperty('--end-y', endY + 'px');
                particle.style.setProperty('--end-scale', (0.3 + Math.random() * 0.7).toString());
                particle.style.setProperty('--end-opacity', '0');
                particle.style.left = '50%';
                particle.style.top = '50%';
                particle.style.animation = 'burst 0.8s ease-out forwards';
                particle.style.width = '4px';
                particle.style.height = '4px';
                container.appendChild(particle);
                setTimeout(() => particle.remove(), 800);
            }
        }
        function format(decimal) {
            let d = D(decimal);
            if (d.lt(1000)) return d.toFixed(1);
            if (d.lt(1e6)) return d.toFixed(0);
            if (d.lt(1e15)) {
                let e = D.floor(d.log10());
                let m = d.div(D(10).pow(e));
                return m.toFixed(2) + 'e' + e.toString();
            }
            return d.toExponential(2).replace(/\+/g, '');
        }
