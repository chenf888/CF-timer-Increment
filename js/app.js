
        // ===================== 核心变量 =====================

        const GAME_VERSION = "1.4.4";

        const D = (x) => new Decimal(x || 0);

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

                root.style.removeProperty('--text-muted');

                root.style.removeProperty('--bg-start');

                root.style.removeProperty('--bg-end');

                root.style.removeProperty('--card-bg');

                root.style.removeProperty('--inner-bg');

                root.style.removeProperty('--primary');

                root.style.removeProperty('--primary-rgb');

                root.style.removeProperty('--primary-dark');

                root.style.removeProperty('--shadow');

                root.style.removeProperty('--border');

                root.style.removeProperty('--panel-bg');

                document.documentElement.setAttribute("data-theme", themeId);

                currentTheme = themeId;

            }

            localStorage.setItem("theme", currentTheme);

            const progress = timerCircle.style.getPropertyValue('--progress') || '0deg';

            timerCircle.style.setProperty('--progress', '0deg');

            setTimeout(() => timerCircle.style.setProperty('--progress', progress), 10);



            document.querySelectorAll('.particle').forEach(p => {

                p.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();

            });

            if (typeof createThemeButtons === 'function') createThemeButtons();

        }

        function createThemeButtons() {

            const container = document.getElementById('theme-buttons');

            if (!container) return;

            container.innerHTML = '';

            container.innerHTML = '';

            let displayName;

            if (currentTheme === 'custom') {

                displayName = t('custom_theme') || '自定义';

            } else {

                const currentThemeData = themes.find(t => t.id === currentTheme) || themes[0];

                displayName = t(currentThemeData.nameKey);

            }

            const triggerBtn = document.createElement('button');

            triggerBtn.className = 'setting-btn theme-trigger-btn';

            triggerBtn.innerHTML = `<span>${displayName}</span><i class="fas fa-chevron-down" style="font-size:0.8rem"></i>`;

            const menu = document.createElement('div');

            menu.className = 'theme-options-menu';

            themes.forEach(theme => {

                const btn = document.createElement('button');

                btn.className = 'setting-btn theme-option-item';

                btn.textContent = t(theme.nameKey);

                btn.onclick = (e) => {

                    e.stopPropagation();

                    applyTheme(theme.id);

                    menu.classList.remove('active');

                    createThemeButtons();

                    if (typeof createParticleBurst === 'function') createParticleBurst();

                };

                menu.appendChild(btn);

            });

            const customBtn = document.createElement('button');

            customBtn.className = `setting-btn theme-option-item ${currentTheme === 'custom' ? 'active' : ''}`;

            customBtn.textContent = t('custom_theme') || '自定义';

            customBtn.onclick = (e) => {

                e.stopPropagation();

                applyTheme('custom');

                menu.classList.remove('active');

                createThemeButtons();

                if (typeof createParticleBurst === 'function') createParticleBurst();

            };

            menu.appendChild(customBtn);

            triggerBtn.onclick = (e) => {

                e.stopPropagation();

                menu.classList.toggle('active');

            };



            document.addEventListener('click', () => {

                menu.classList.remove('active');

            }, { once: true });



            const wrapper = document.createElement('div');

            wrapper.className = 'theme-selector-container';

            wrapper.appendChild(triggerBtn);

            wrapper.appendChild(menu);

            container.appendChild(wrapper);

        }

        function createParticles() {

            particlesContainer.innerHTML = '';

            const particleCount = 30;

            for (let i = 0; i < particleCount; i++) {

                const particle = document.createElement('div');

                particle.className = 'particle';

                const size = Math.random() * 4 + 1;

                particle.style.width = `${size}px`;

                particle.style.height = `${size}px`;

                const angle = Math.random() * Math.PI * 2;

                const distance = 45 + Math.random() * 5;

                const x = 50 + Math.cos(angle) * distance;

                const y = 50 + Math.sin(angle) * distance;

                particle.style.left = `${x}%`;

                particle.style.top = `${y}%`;

                const duration = 2 + Math.random() * 3;

                const delay = Math.random() * 5;

                particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s, fade ${duration}s infinite ease-in-out ${delay}s`;

                particlesContainer.appendChild(particle);

            }

        }

        function createParticleBurst() {

            const burstCount = 50;

            for (let i = 0; i < burstCount; i++) {

                const particle = document.createElement('div');

                particle.className = 'particle';

                const size = Math.random() * 6 + 2;

                particle.style.width = `${size}px`;

                particle.style.height = `${size}px`;

                particle.style.left = '50%';

                particle.style.top = '50%';

                const angle = Math.random() * Math.PI * 2;

                const distance = 40 + Math.random() * 30;

                particle.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();

                const duration = 1 + Math.random() * 1;

                particle.style.animation = `burst ${duration}s ease-out forwards`;

                particle.style.setProperty('--end-x', `${50 + Math.cos(angle) * distance}%`);

                particle.style.setProperty('--end-y', `${50 + Math.sin(angle) * distance}%`);

                particle.style.setProperty('--end-scale', `${Math.random() * 0.5}`);

                particle.style.setProperty('--end-opacity', '0');

                particlesContainer.appendChild(particle);

                setTimeout(() => particle.remove(), duration * 1000);

            }

        }

        function format(decimal) {

            let d = D(decimal);

            if (isNaN(d.toNumber())) return "0.00";

            if (d.abs().gte(10000)) {

                return d.toExponential(2).replace(/\+/g, '');

            }

            return d.toFixed(0);

        }

        function formatStatValue(decimal) {

            let d = D(decimal);

            if (isNaN(d.toNumber())) return "0";

            if (d.eq(0)) return "0";

            const abs = d.abs();

            if (abs.lt(0.0001)) {

                return d.toExponential(2).replace(/\+/g, '');

            }

            if (abs.lt(1)) {

                return d.toFixed(4).replace(/\.?(0+)$/, '');

            }

            if (abs.lt(10000)) {

                return d.toFixed(2).replace(/\.?(0+)$/, '');

            }

            return d.toExponential(2).replace(/\+/g, '');

        }

        function formatDuration(ms) {

            const totalSeconds = Math.floor(ms / 1000);

            const days = Math.floor(totalSeconds / 86400);

            const hours = Math.floor((totalSeconds % 86400) / 3600);

            const minutes = Math.floor((totalSeconds % 3600) / 60);

            const secondsValue = totalSeconds % 60;

            const parts = [];

            if (days) parts.push(`${days}${t('time_day')}`);

            if (hours || days) parts.push(`${hours.toString().padStart(2, '0')}${t('time_hour')}`);

            parts.push(`${minutes.toString().padStart(2, '0')}${t('time_minute')}`);

            parts.push(`${secondsValue.toString().padStart(2, '0')}${t('time_second')}`);

            return parts.join(' ');

        }

        let totalDisplay

        let lastSpeedUpdate = Date.now();

        function updateTimer() {

            seconds = D(seconds);

            const newSeconds = seconds.floor().toNumber();

            document.getElementById('currentSeconds').textContent = newSeconds;

            document.getElementById('accumulatedSeconds').textContent = format(accumulatedSeconds);

            document.getElementById('cycles').textContent = format(cycleCount);

            if (Date.now() - lastSpeedUpdate > 1000) {

                baseSpeed = D(1).plus(D(0.9).mul(D(1).plus(accumulatedSeconds.div(100)).ln()));

                speed = baseSpeed.plus(bonusSpeed);

                lastSpeedUpdate = Date.now();

            }

            const minuteDisplay = document.getElementById('minuteDisplay');

            if (minuteDisplay) minuteDisplay.textContent = format(minutes);

            updateRebirthDisplay();

            baseSpeed = D(1).plus(D(0.9).mul(D(1).plus(accumulatedSeconds.div(100)).ln()));

            speed = baseSpeed.plus(bonusSpeed);

            const speedEl = document.getElementById('speedMultiplier');

            if (speedEl) speedEl.textContent = speed.toFixed(2) + "x";

            const secondsThisMinute = seconds.minus(seconds.div(60).floor().mul(60));

            const progressDeg = secondsThisMinute.toNumber() * 6;

            timerCircle.style.setProperty('--progress', `${progressDeg}deg`);



            if (document.getElementById('tab-upgrades').classList.contains('active')) {

                updateUpgradeAffordability();

            }



            if (document.getElementById('tab-stats').classList.contains('active')) {

                updateStatsDisplay();

            }

            checkChallengeCompletion();



            updateChallengeUI();

        }



        const achievementsTab = document.getElementById('tab-achievements');

        if (achievementsTab && achievementsTab.classList.contains('active')) {

            renderAchievementsThrottled();

        }

        function startTimer() {

            if (isRunning) {

                isRunning = false;

                document.getElementById('startBtn').innerHTML = '<i class="fas fa-play"></i> 继续';

                return;

            }



            isRunning = true;

            document.getElementById('startBtn').innerHTML = '<i class="fas fa-pause"></i> 暂停';

            lastUpdate = Date.now();



            let frame = 0;



            const loop = () => {

                if (!isRunning) return;



                const now = Date.now();

                const delta = D((now - lastUpdate) / 1000);

                lastUpdate = now;



                const timePassed = delta.times(speed);



                seconds = seconds.plus(timePassed).plus(autoSecondsPerSecond.times(delta));

                accumulatedSeconds = accumulatedSeconds.plus(timePassed).plus(autoSecondsPerSecond.times(delta));

                minutes = minutes.plus(bonusMinutesPerSecond.times(delta)).plus(autoMinutesPerSecond.times(delta)).times(minuteMultiplier);



                if (seconds.gte(60)) {

                    const gains = seconds.div(60).floor();

                    cycleCount = cycleCount.plus(gains);

                    minutes = minutes.plus(gains).plus(cycleBonusMinutes.times(gains));

                    const goldenChance = (upgrades[8] && upgrades[8].currentLevel) ? upgrades[8].currentLevel * 0.01 : 0;

                    if (Math.random() < goldenChance) {

                        const bonus = gains.times(2);

                        minutes = minutes.plus(bonus);

                        createParticleBurst();

                    }



                    seconds = seconds.minus(seconds.div(60).floor().mul(60));

                }



                frame++;

                if (frame % 3 === 0) {

                    updateTimer();

                }



                requestAnimationFrame(loop);

            };

            requestAnimationFrame(loop);

        }



        function pauseTimer() {

            clearInterval(timer);

            isRunning = false;

            startBtn.innerHTML = `<i class="fas fa-play"></i> ${t('resume')}`;

        }



        function resetTimer() {

            isRunning = false;

            seconds = D(0);

            accumulatedSeconds = D(0);

            cycleCount = D(0);

            speed = D(1.0);

            baseSpeed = D(1.0);

            bonusSpeed = D(0);

            bonusMinutesPerSecond = D(0);

            autoSecondsPerSecond = D(0);

            speedMultiplier = D(1);

            minuteMultiplier = D(1);

            cycleBonusMinutes = D(0);

            autoMinutesPerSecond = D(0);

            costReduction = D(1);

            activeChallenge = null;

            startBtn.innerHTML = `<i class="fas fa-play"></i> ${t('play')}`;

            timerCircle.classList.remove('accelerated');

            updateTimer();

            localStorage.removeItem(SAVE_KEY);

        }



        function exportSave() {

            saveGame();

            const saveData = localStorage.getItem(SAVE_KEY);

            if (saveData) {

                try {

                    const encoded = btoa(encodeURIComponent(saveData));

                    prompt(t('export_prompt'), encoded);

                } catch (e) {

                    prompt(t('export_prompt_raw'), saveData);

                }

            }

        }



        function importSave() {

            let txt = prompt(t('import_prompt'));

            if (!txt) return;



            txt = txt.replace(/\s/g, '');



            try {

                let decoded;

                try {

                    decoded = decodeURIComponent(atob(txt));

                    console.log("base64解码成功");

                } catch (e) {

                    console.log("base64解码失败，使用原始字符串:", e.message);

                    decoded = txt;

                }



                const parsed = JSON.parse(decoded);

                console.log("JSON解析成功，数据键:", Object.keys(parsed));



                localStorage.setItem(SAVE_KEY, decoded);

                alert(t('import_success'));

                location.reload();

            } catch (e) {

                console.error("导入失败:", e);

                alert(t('import_error') + '\n' + e.message);

            }

        }



        function deleteSaveConfirm() {

            if (confirm(t('delete_confirm'))) {



                localStorage.removeItem(SAVE_KEY);

                localStorage.removeItem("theme");

                seconds = D(0);

                minutes = D(0);

                accumulatedSeconds = D(0);

                cycleCount = D(0);

                speed = D(1.0);

                baseSpeed = D(1.0);

                bonusSpeed = D(0);

                bonusMinutesPerSecond = D(0);

                autoSecondsPerSecond = D(0);

                speedMultiplier = D(1);

                minuteMultiplier = D(1);

                cycleBonusMinutes = D(0);

                autoMinutesPerSecond = D(0);

                costReduction = D(1);

                activeChallenge = null;

                currentMilestoneIndex = 0;

                clickCount = 0;

                clickGainedSeconds = 0;

                if (typeof upgrades !== 'undefined') {

                    upgrades.forEach(up => { up.currentLevel = 0; });

                }

                if (typeof achievements !== 'undefined') {

                    achievements.forEach(ach => { ach.unlocked = false; });

                }

                alert(t('delete_success'));

                location.reload();

            }

        }

        function switchTab(tab) {

            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));

            const targetContent = document.getElementById(`tab-${tab}`);

            if (targetContent) targetContent.classList.add('active');

            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

            const targetBtn = document.getElementById(`tab-btn-${tab}`);

            if (targetBtn) targetBtn.classList.add('active');

            if (tab === 'achievements') {

                renderAchievements();

            }

            if (tab === 'stats') {

                updateStatsDisplay();

            }

            if (tab === 'upgrades') {

                renderUpgrades();

            }

            if (tab === 'rebirth') {

                switchRebirthPage(currentRebirthPage || 'info');

            }

            if (tab === 'challenges') {

                renderChallengesGrid();

                renderChallengesGrid();

            }

            if (tab === 'settings') {

                if (document.getElementById('settings-content-wrapper').children.length === 0) {

                    renderSettingsLayout();

                }

                document.querySelectorAll('.layout-switch-btn').forEach(btn => {

                    btn.classList.toggle('active', btn.dataset.layout === settingsLayout);

                });

            }

        }

        function updateStatsDisplay() {

            const modalTotal = document.getElementById('modalaccumulatedSeconds');

            const modalSeconds = document.getElementById('modalSeconds');

            const modalMinutes = document.getElementById('modalMinutes');

            const modalCycles = document.getElementById('modalCycles');

            const modalMaxSpeed = document.getElementById('modalSpeed');

            const modalHighestSpeed = document.getElementById('modalHighestSpeed');

            const modalSaveCreatedAt = document.getElementById('modalSaveCreatedAt');

            const modalSaveAge = document.getElementById('modalSaveAge');

            const modalBaseSpeed = document.getElementById('modalBaseSpeed');

            const modalBonusSpeed = document.getElementById('modalBonusSpeed');

            const modalMinuteMultiplier = document.getElementById('modalMinuteMultiplier');

            const modalAutoSeconds = document.getElementById('modalAutoSeconds');

            const modalAutoMinutes = document.getElementById('modalAutoMinutes');

            const modalCostReduction = document.getElementById('modalCostReduction');

            const modalUpgradeCount = document.getElementById('modalUpgradeCount');

            const modalRebirthUpgradeCount = document.getElementById('modalRebirthUpgradeCount');

            const modalSDP = document.getElementById('modalSDP');

            const modalVDP = document.getElementById('modalVDP');

            const modalRebirthCount = document.getElementById('modalRebirthCount');

            const modalVDPResetCount = document.getElementById('modalVDPResetCount');

            const modalChallengesCompleted = document.getElementById('modalChallengesCompleted');

            const modalCurrentChallenge = document.getElementById('modalCurrentChallenge');

            const modalChallengeMode = document.getElementById('modalChallengeMode');

            const modalTheme = document.getElementById('modalTheme');

            const modalUpgradeTab = document.getElementById('modalUpgradeTab');



            if (modalTotal) modalTotal.textContent = format(accumulatedSeconds);

            if (modalSeconds) modalSeconds.textContent = formatStatValue(seconds);

            if (modalMinutes) modalMinutes.textContent = formatStatValue(minutes);

            if (modalCycles) modalCycles.textContent = format(cycleCount);

            if (modalMaxSpeed) modalMaxSpeed.textContent = D(speed).toFixed(2) + 'x';

            if (modalHighestSpeed) modalHighestSpeed.textContent = D(maxSpeed).toFixed(2) + ' ' + t('unit_seconds_per_second');

            if (modalSaveCreatedAt) modalSaveCreatedAt.textContent = new Date(saveCreatedAt).toLocaleString();

            if (modalSaveAge) modalSaveAge.textContent = formatDuration(Date.now() - saveCreatedAt);

            if (modalBaseSpeed) modalBaseSpeed.textContent = D(baseSpeed).toFixed(2) + 'x';

            if (modalBonusSpeed) modalBonusSpeed.textContent = formatStatValue(bonusSpeed);

            if (modalMinuteMultiplier) modalMinuteMultiplier.textContent = D(minuteMultiplier).toFixed(2) + 'x';

            if (modalAutoSeconds) modalAutoSeconds.textContent = formatStatValue(autoSecondsPerSecond);

            if (modalAutoMinutes) modalAutoMinutes.textContent = formatStatValue(autoMinutesPerSecond);

            if (modalCostReduction) modalCostReduction.textContent = `${D(1).minus(costReduction).times(100).toFixed(1)}%`;

            if (modalUpgradeCount) modalUpgradeCount.textContent = upgrades.reduce((sum, up) => sum + up.currentLevel, 0);

            if (modalRebirthUpgradeCount) modalRebirthUpgradeCount.textContent = rebirthUpgrades.reduce((sum, up) => sum + up.currentLevel, 0);

            if (modalSDP) modalSDP.textContent = format(sdp);

            if (modalVDP) modalVDP.textContent = format(vdp);

            if (modalRebirthCount) modalRebirthCount.textContent = format(timeRebirthCount);

            if (modalVDPResetCount) modalVDPResetCount.textContent = format(vdpResets);

            if (modalChallengesCompleted) modalChallengesCompleted.textContent = challenges.filter(c => c.completed).length;

            if (modalCurrentChallenge) modalCurrentChallenge.textContent = activeChallenge || t('none');

            if (modalChallengeMode) modalChallengeMode.textContent = activeChallenge ? t('yes') : t('no');

            if (modalTheme) {

                if (currentTheme === 'custom') {

                    modalTheme.textContent = t('custom_theme') || '自定义';

                } else {

                    const themeObj = themes.find(t => t.id === currentTheme);

                    modalTheme.textContent = themeObj ? t(themeObj.nameKey) : currentTheme;

                }

            }

            if (modalUpgradeTab) modalUpgradeTab.textContent = t(currentUpgradeTab + '_upgrades');

        }

        let lastAchievementsRender = 0;

        let renderAchievementsTimeout = null;



        function renderAchievementsThrottled() {

            const now = Date.now();

            if (now - lastAchievementsRender < 800) return;

            if (renderAchievementsTimeout) clearTimeout(renderAchievementsTimeout);

            renderAchievementsTimeout = setTimeout(() => {

                renderAchievements();

                lastAchievementsRender = Date.now();

                renderAchievementsTimeout = null;

            }, 100);

        }



        function renderAchievements() {

            const container = document.getElementById('achievementsGrid');

            if (!container) return;



            const scrollTop = container.scrollTop;

            container.innerHTML = '';



            achievements.forEach(ach => {

                const isUnlocked = ach.check();



                if (isUnlocked && !ach.unlocked) {

                    ach.unlocked = true;

                }



                let rawProgress = 0;

                if (typeof ach.progress === 'function') {

                    rawProgress = ach.progress();

                }

                const displayProgress = Math.min(100, Math.max(0, Math.floor(rawProgress)));



                const item = document.createElement('div');

                item.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;



                item.innerHTML = `

            <div class="achievement-icon">

                <i class="fas ${ach.icon || 'fa-trophy'}"></i>

            </div>

            <div class="achievement-title">${t(ach.titleKey)}</div>

            <div class="achievement-tooltip">

                ${t(ach.descKey)}<br><br>

                <strong>${t('progress')}:</strong> ${isUnlocked ? t('unlocked') : displayProgress + '%'}

                <div class="ach-progress-bar-bg">

                    <div class="ach-progress-bar-fill" style="width: ${displayProgress}%"></div>

                </div>

            </div>

        `;

                container.appendChild(item);

            });



            container.scrollTop = scrollTop;

        }



        function renderChallengesGrid() {
            const container = document.getElementById('challenges-grid');
            if (!container) return;
            container.innerHTML = '';

            challenges.forEach(challenge => {
                const isCompleted = challenge.completed;
                const isActive = activeChallenge === challenge.id;
                const canStart = !isCompleted && !activeChallenge;

                let rawProgress = 0;
                if (typeof challenge.progress === 'function') rawProgress = challenge.progress();
                const displayProgress = Math.min(100, Math.max(0, Math.floor(rawProgress)));

                const timeLimitText = challenge.timeLimit
                    ? '<div class="challenge-time-limit">' + t('time_limit') + ': ' + Math.floor(challenge.timeLimit / 60) + ':' + (challenge.timeLimit % 60).toString().padStart(2, '0') + '</div>'
                    : '<div class="challenge-time-limit">' + t('no_time_limit') + '</div>';

                const card = document.createElement('div');
                card.className = 'challenge-card' + (isCompleted ? ' completed' : isActive ? ' active' : '');

                card.innerHTML = ''
                    + '<div class="challenge-icon"><i class="fas ' + challenge.icon + '"></i></div>'
                    + '<div class="challenge-title">' + t(challenge.titleKey) + '</div>'
                    + '<div class="challenge-desc">' + t(challenge.descKey) + '</div>'
                    + '<div class="challenge-reward">' + t('reward') + ': ' + t(challenge.rewardKey) + '</div>'
                    + timeLimitText
                    + '<div class="challenge-progress"><div class="progress-bar"><div class="progress-fill" style="width: ' + displayProgress + '%"></div></div>'
                    + '<div class="progress-text">' + (isCompleted ? t('complete') : isActive ? t('in_progress') : displayProgress + '%') + '</div></div>'
                    + (canStart ? '<button onclick="startChallenge(\'' + challenge.id + '\')" class="btn-start-challenge">' + t('start_challenge') + '</button>' : '')
                    + (isActive ? '<button onclick="abandonChallenge()" class="btn-challenge-abandon">' + t('abandon_challenge') + '</button>' : '');

                container.appendChild(card);
            });
        }

        function updateChallengeUI() {
            const panel = document.getElementById('challenge-active-panel');
            if (!panel) return;

            if (activeChallenge) {
                panel.style.display = 'block';
                const challenge = challenges.find(c => c.id === activeChallenge);
                if (challenge) {
                    document.getElementById('challenge-active-title').textContent = t(challenge.titleKey);
                    let progress = 0;
                    if (typeof challenge.progress === 'function') progress = challenge.progress();
                    document.getElementById('challenge-progress-fill').style.width = Math.min(100, progress) + '%';
                    document.getElementById('challenge-progress-text').textContent = Math.floor(progress) + '%';

                    if (challenge.timeLimit && challengeStartTime) {
                        const elapsed = (Date.now() - challengeStartTime) / 1000;
                        const remaining = Math.max(0, challenge.timeLimit - elapsed);
                        const mins = Math.floor(remaining / 60);
                        const secs = Math.floor(remaining % 60);
                        document.getElementById('challenge-timer').textContent = t('remaining_time') + ': ' + mins + ':' + secs.toString().padStart(2, '0');
                    } else {
                        document.getElementById('challenge-timer').textContent = t('no_time_limit');
                    }
                }
            } else {
                panel.style.display = 'none';
            }
        }

        window.startChallenge = function (challengeId) {
            if (activeChallenge) return;
            const challenge = challenges.find(c => c.id === challengeId);
            if (!challenge || challenge.completed) return;

            if (!confirm(t('challenge_start_confirm') || '确定要开始挑战吗？当前计时器进度将被重置。')) return;

            activeChallenge = challengeId;
            challengeStartTime = Date.now();
            resetForChallenge();

            updateChallengeUI();
            renderChallengesGrid();
            saveGame();
        };

        window.abandonChallenge = function () {
            if (!activeChallenge) return;
            if (!confirm(t('abandon_challenge_confirm') || '确定要放弃当前挑战吗？进度将会丢失。')) return;

            activeChallenge = null;
            challengeStartTime = null;

            updateChallengeUI();
            renderChallengesGrid();
            saveGame();
        };

        function resetForChallenge() {
            seconds = D(0);
            accumulatedSeconds = D(0);
            cycleCount = D(0);
            minutes = D(0);
            baseSpeed = D(1);
            bonusSpeed = D(0);
            bonusMinutesPerSecond = D(0);
            autoSecondsPerSecond = D(0);
            speedMultiplier = D(1);
            minuteMultiplier = D(1);
            cycleBonusMinutes = D(0);
            autoMinutesPerSecond = D(0);
            costReduction = D(1);
            recalculateSpeed();
            updateTimer();
        }

        function checkChallengeCompletion() {
            if (!activeChallenge) return;
            const challenge = challenges.find(c => c.id === activeChallenge);
            if (!challenge || challenge.completed) return;

            if (challenge.timeLimit && challengeStartTime) {
                const elapsed = (Date.now() - challengeStartTime) / 1000;
                if (elapsed >= challenge.timeLimit) {
                    failChallenge();
                    return;
                }
            }

            if (challenge.check()) {
                challenge.completed = true;
                applyChallengeReward(challenge);
                alert(t('challenge_completed_msg', t(challenge.titleKey), t(challenge.rewardKey)));
                activeChallenge = null;
                challengeStartTime = null;
                updateChallengeUI();
                renderChallengesGrid();
                saveGame();
                if (typeof createParticleBurst === 'function') createParticleBurst();
            }
        }

        function failChallenge() {
            if (!activeChallenge) return;
            const challenge = challenges.find(c => c.id === activeChallenge);
            if (challenge) alert(t('challenge_failed', t(challenge.titleKey)));
            activeChallenge = null;
            challengeStartTime = null;
            updateChallengeUI();
            renderChallengesGrid();
            saveGame();
        }

        function applyChallengeReward(challenge) {
            switch (challenge.id) {
                case 'speed_demon':
                    bonusSpeed = bonusSpeed.plus(1.0);
                    break;
                case 'time_master':
                    break;
                case 'efficiency_expert':
                    break;
                case 'minimalist_master':
                    break;
                case 'golden_chaser':
                    break;
            }
            recalculateSpeed();
        }

        const upgrades = [

            {

                id: "speed_boost",

                nameKey: "up_speed_boost_name",

                descKey: "up_speed_boost_desc",

                icon: "fa-rocket",

                baseCost: D(1),

                costMult: 1.5,

                currentLevel: 0,

                maxLevel: 100,

                category: "basic"

            },

            {

                id: "auto_seconds",

                nameKey: "up_auto_seconds_name",

                descKey: "up_auto_seconds_desc",

                icon: "fa-robot",

                baseCost: D(1),

                costMult: 1.1,

                currentLevel: 0,

                maxLevel: 100,

                category: "basic"

            },

            {

                id: "minute_boost",

                nameKey: "up_minute_boost_name",

                descKey: "up_minute_boost_desc",

                icon: "fa-clock",

                baseCost: D(10),

                costMult: 1.8,

                currentLevel: 0,

                maxLevel: 100,

                category: "basic"

            },

            {

                id: "speed_multiplier",

                nameKey: "up_speed_multiplier_name",

                descKey: "up_speed_multiplier_desc",

                icon: "fa-bolt",

                baseCost: D(100),

                costMult: 2.2,

                currentLevel: 0,

                maxLevel: 100,

                category: "advanced"

            },

            {

                id: "minute_multiplier",

                nameKey: "up_minute_multiplier_name",

                descKey: "up_minute_multiplier_desc",

                icon: "fa-coins",

                baseCost: D(200),

                costMult: 2.5,

                currentLevel: 0,

                maxLevel: 100,

                category: "advanced"

            },

            {

                id: "cycle_bonus",

                nameKey: "up_cycle_bonus_name",

                descKey: "up_cycle_bonus_desc",

                icon: "fa-gift",

                baseCost: D(500),

                costMult: 3.0,

                currentLevel: 0,

                maxLevel: 100,

                category: "advanced"

            },

            {

                id: "auto_minutes",

                nameKey: "up_auto_minutes_name",

                descKey: "up_auto_minutes_desc",

                icon: "fa-magic",

                baseCost: D(1000),

                costMult: 3.5,

                currentLevel: 0,

                maxLevel: 999,

                category: "expert"

            },

            {

                id: "cost_reduction",

                nameKey: "up_cost_reduction_name",

                descKey: "up_cost_reduction_desc",

                icon: "fa-percentage",

                baseCost: D(2000),

                costMult: 4.0,

                currentLevel: 0,

                maxLevel: 100,

                category: "expert"

            },

            {

                id: "golden_time",

                nameKey: "up_golden_time_name",

                descKey: "up_golden_time_desc",

                icon: "fa-star",

                baseCost: D(10),

                costMult: 5.0,

                currentLevel: 0,

                maxLevel: 49,

                category: "expert"

            }

        ];



        const rebirthUpgrades = [

            { id: "rebirth1", nameKey: "reb1_name", descKey: "reb1_desc", icon: "fa-bolt", baseCost: D(1), costType: "sdp", currentLevel: 0, maxLevel: 1 },

            { id: "rebirth2", nameKey: "reb2_name", descKey: "reb2_desc", icon: "fa-shield-alt", baseCost: D(2), costType: "sdp", currentLevel: 0, maxLevel: 1 },

            { id: "rebirth3", nameKey: "reb3_name", descKey: "reb3_desc", icon: "fa-fire", baseCost: D(4), costType: "sdp", currentLevel: 0, maxLevel: 1 },

            { id: "rebirth4", nameKey: "reb4_name", descKey: "reb4_desc", icon: "fa-superscript", baseCost: D(8), costType: "sdp", currentLevel: 0, maxLevel: 1 },

            { id: "rebirth5", nameKey: "reb5_name", descKey: "reb5_desc", icon: "fa-flag-checkered", baseCost: D(10), costType: "sdp", currentLevel: 0, maxLevel: 1 },

            { id: "rebirth6", nameKey: "reb6_name", descKey: "reb6_desc", icon: "fa-sync", baseCost: D(15), costType: "sdp", currentLevel: 0, maxLevel: 1 },

            { id: "rebirth7", nameKey: "reb7_name", descKey: "reb7_desc", icon: "fa-star", baseCost: D(28), costType: "sdp", currentLevel: 0, maxLevel: 1 },

            { id: "rebirth8", nameKey: "reb8_name", descKey: "reb8_desc", icon: "fa-percentage", baseCost: D(50), costType: "sdp", currentLevel: 0, maxLevel: 1 },

            { id: "rebirth9", nameKey: "reb9_name", descKey: "reb9_desc", icon: "fa-plus", baseCost: D(68), costType: "sdp", currentLevel: 0, maxLevel: 1 },

            { id: "rebirth10", nameKey: "reb10_name", descKey: "reb10_desc", icon: "fa-bolt", baseCost: D(100), costType: "sdp", currentLevel: 0, maxLevel: 1 },

            { id: "rebirth11", nameKey: "reb11_name", descKey: "reb11_desc", icon: "fa-chart-line", baseCost: D(188), costType: "sdp", currentLevel: 0, maxLevel: 1 }

        ];



        const vdpUpgrades = [

            { id: "vdp1-1", nameKey: "vdp11_name", descKey: "vdp11_desc", icon: "fa-bolt", baseCost: D(1), costType: "vdp", currentLevel: 0, maxLevel: 1 },

            { id: "vdp1-2", nameKey: "vdp12_name", descKey: "vdp12_desc", icon: "fa-hourglass-end", baseCost: D(1), costType: "vdp", currentLevel: 0, maxLevel: 1 },

            { id: "vdp2-1", nameKey: "vdp21_name", descKey: "vdp21_desc", icon: "fa-chart-line", baseCost: D(2), costType: "vdp", currentLevel: 0, maxLevel: 1 },

            { id: "vdp2-2", nameKey: "vdp22_name", descKey: "vdp22_desc", icon: "fa-shapes", baseCost: D(2), costType: "vdp", currentLevel: 0, maxLevel: 1 },

            { id: "vdp2-3", nameKey: "vdp23_name", descKey: "vdp23_desc", icon: "fa-hourglass-half", baseCost: D(2), costType: "vdp", currentLevel: 0, maxLevel: 1 },

            { id: "vdp3-3", nameKey: "vdp33_name", descKey: "vdp33_desc", icon: "fa-trophy", baseCost: D(3), costType: "vdp", currentLevel: 0, maxLevel: 1 },

            { id: "vdp4-1", nameKey: "vdp41_name", descKey: "vdp41_desc", icon: "fa-rocket", baseCost: D(5), costType: "vdp", currentLevel: 0, maxLevel: 1 }

        ];



        const sdvChallenges = [

            {

                id: "sdv1",

                titleKey: "sdv1_title",

                descKey: "sdv1_desc",

                rewardKey: "sdv1_reward",

                timeLimit: 600,

                completed: false,

                check: () => accumulatedSeconds.gte(7777),

                progress: () => Math.min(accumulatedSeconds.toNumber(), 7777) / 7777 * 100

            },

            {

                id: "sdv2",

                titleKey: "sdv2_title",

                descKey: "sdv2_desc",

                rewardKey: "sdv2_reward",

                timeLimit: 900,

                completed: false,

                check: () => speed.gte(50),

                progress: () => Math.min(speed.toNumber(), 50) / 50 * 100

            },

            {

                id: "sdv3",

                titleKey: "sdv3_title",

                descKey: "sdv3_desc",

                rewardKey: "sdv3_reward",

                timeLimit: 1200,

                completed: false,

                check: () => accumulatedSeconds.gte(2125),

                progress: () => Math.min(accumulatedSeconds.toNumber(), 2125) / 2125 * 100

            }

        ];



        let currentRebirthPage = 'info';

        let boosterLevel = 0;

        let boosterMaxLevel = 5;

        let sdvMode = false;

        let activeSDVChallenge = null;

        let sdvChallengeStartTime = null;



        function isRebirthUpgradeUnlocked(index) {

            if (index === 0) return true;

            const prev = rebirthUpgrades[index - 1];

            return prev && prev.currentLevel >= prev.maxLevel;

        }



        function recalculateSpeed() {

            try {

                let base = D(1.0);

                let up0Level = (upgrades[0] && upgrades[0].currentLevel) ? upgrades[0].currentLevel : 0;

                let up1Level = (upgrades[1] && upgrades[1].currentLevel) ? upgrades[1].currentLevel : 0;

                let up2Level = (upgrades[2] && upgrades[2].currentLevel) ? upgrades[2].currentLevel : 0;

                let up3Level = (upgrades[3] && upgrades[3].currentLevel) ? upgrades[3].currentLevel : 0;

                let up4Level = (upgrades[4] && upgrades[4].currentLevel) ? upgrades[4].currentLevel : 0;

                let up5Level = (upgrades[5] && upgrades[5].currentLevel) ? upgrades[5].currentLevel : 0;

                let up6Level = (upgrades[6] && upgrades[6].currentLevel) ? upgrades[6].currentLevel : 0;

                let up7Level = (upgrades[7] && upgrades[7].currentLevel) ? upgrades[7].currentLevel : 0;

                let up8Level = (upgrades[8] && upgrades[8].currentLevel) ? upgrades[8].currentLevel : 0;

                let reb1 = (rebirthUpgrades[0] && rebirthUpgrades[0].currentLevel) ? rebirthUpgrades[0].currentLevel : 0;

                let reb2 = (rebirthUpgrades[1] && rebirthUpgrades[1].currentLevel) ? rebirthUpgrades[1].currentLevel : 0;

                let reb3 = (rebirthUpgrades[2] && rebirthUpgrades[2].currentLevel) ? rebirthUpgrades[2].currentLevel : 0;

                let reb4 = (rebirthUpgrades[3] && rebirthUpgrades[3].currentLevel) ? rebirthUpgrades[3].currentLevel : 0;

                let reb8 = (rebirthUpgrades[7] && rebirthUpgrades[7].currentLevel) ? rebirthUpgrades[7].currentLevel : 0;

                let reb9 = (rebirthUpgrades[8] && rebirthUpgrades[8].currentLevel) ? rebirthUpgrades[8].currentLevel : 0;

                let reb6 = (rebirthUpgrades[5] && rebirthUpgrades[5].currentLevel) ? rebirthUpgrades[5].currentLevel : 0;

                let reb11 = (rebirthUpgrades[10] && rebirthUpgrades[10].currentLevel) ? rebirthUpgrades[10].currentLevel : 0;

                let vdp11 = (vdpUpgrades[0] && vdpUpgrades[0].currentLevel) ? vdpUpgrades[0].currentLevel : 0;

                let vdp12 = (vdpUpgrades[1] && vdpUpgrades[1].currentLevel) ? vdpUpgrades[1].currentLevel : 0;

                let vdp21 = (vdpUpgrades[2] && vdpUpgrades[2].currentLevel) ? vdpUpgrades[2].currentLevel : 0;

                let vdp22 = (vdpUpgrades[3] && vdpUpgrades[3].currentLevel) ? vdpUpgrades[3].currentLevel : 0;

                let vdp23 = (vdpUpgrades[4] && vdpUpgrades[4].currentLevel) ? vdpUpgrades[4].currentLevel : 0;

                let vdp33 = (vdpUpgrades[5] && vdpUpgrades[5].currentLevel) ? vdpUpgrades[5].currentLevel : 0;

                let boosterUnlocked = (vdpUpgrades[6] && vdpUpgrades[6].currentLevel) ? vdpUpgrades[6].currentLevel : 0;



                bonusSpeed = D(up0Level).times(reb1 ? 0.15 : 0.1);

                if (reb2) {
                    autoSecondsPerSecond = autoSecondsPerSecond.plus(minutes.times(0.001));
                }
                if (reb3) {

                    bonusSpeed = bonusSpeed.plus(minutes.times(0.01));

                }

                if (reb4) {

                    bonusSpeed = bonusSpeed.plus(minutes.sqrt().times(0.02));

                }

                if (reb8) {
                    const sdv2Completed = sdvChallenges.find(c => c.id === "sdv2")?.completed;
                    if (sdv2Completed) {
                        speedMultiplier = speedMultiplier.times(7.8);
                    }
                }
                if (reb9) {
                    const purchasedRebirthCount = rebirthUpgrades.filter(up => up.currentLevel > 0).length;
                    bonusSpeed = bonusSpeed.plus(D(purchasedRebirthCount).times(0.02));
                }
                if (reb11) {

                    bonusSpeed = bonusSpeed.plus(sdp.times(0.025));

                }

                if (vdp21) {

                    bonusSpeed = bonusSpeed.plus(minutes.pow(0.6));

                }

                if (vdp22) {

                    bonusSpeed = bonusSpeed.plus(sdp.pow(0.7));

                }

                if (vdp33) {

                    bonusSpeed = bonusSpeed.plus(D(challenges.filter(c => c.completed).length).times(0.02));

                }



                autoSecondsPerSecond = D(up1Level).times(0.1);

                bonusMinutesPerSecond = D(up2Level).times(0.01);

                speedMultiplier = D(1).plus(D(up3Level).times(0.1));

                if (reb1) {

                    speedMultiplier = speedMultiplier.times(2);

                }

                if (boosterLevel) {

                    speedMultiplier = speedMultiplier.plus(D(boosterLevel).times(0.05));

                }

                minuteMultiplier = D(1).plus(D(up4Level).times(0.1));

                if (vdp12) {
                    minuteMultiplier = minuteMultiplier.times(3);
                }
                if (vdp23) {

                    minuteMultiplier = minuteMultiplier.times(D(1).plus(sdp.pow(0.55)));

                }

                if (reb6) {

                    minuteMultiplier = minuteMultiplier.times(D(1).plus(timeRebirthCount.sqrt()));

                }

                cycleBonusMinutes = D(up5Level).times(1);

                autoMinutesPerSecond = D(up6Level).times(0.01);

                costReduction = D(1).minus(D(up7Level).times(0.05));



                speed = base.plus(bonusSpeed).times(speedMultiplier);

                if (speed.gt(maxSpeed)) {

                    maxSpeed = speed;

                }

            } catch (e) {

                console.error("计算速度时出错，正在恢复默认值:", e);

                alert(t('speed_calc_error') + e.message + "\n\n" + t('speed_calc_error_hint'));

                speed = D(1.0);

                bonusSpeed = D(0);

                bonusMinutesPerSecond = D(0);

                autoSecondsPerSecond = D(0);

                speedMultiplier = D(1);

                minuteMultiplier = D(1);

                cycleBonusMinutes = D(0);

                autoMinutesPerSecond = D(0);

                costReduction = D(1);

            }

        }

        function renderUpgrades() {

            const container = document.getElementById('upgradesGrid');

            if (!container) return;

            container.innerHTML = '';



            upgrades.forEach((up, index) => {

                if (up.category !== currentUpgradeTab) return;

                const baseCost = up.baseCost.times(Math.pow(up.costMult, up.currentLevel));

                const cost = baseCost.times(costReduction);

                const canAfford = minutes.gte(cost);

                let effectDisplay = '';

                const lvl = up.currentLevel;

                switch (index) {

                    case 0:

                        effectDisplay = t('up_effect_speed', (lvl * 0.1).toFixed(1));

                        break;

                    case 1:

                        effectDisplay = t('up_effect_auto_seconds', (lvl * 0.01).toFixed(2));

                        break;

                    case 2:

                        effectDisplay = t('up_effect_minute_boost', (lvl * 0.01).toFixed(2));

                        break;

                    case 3:

                        effectDisplay = t('up_effect_speed_multiplier', (1 + lvl * 0.1).toFixed(1));

                        break;

                    case 4:

                        effectDisplay = t('up_effect_minute_multiplier', (1 + lvl * 0.1).toFixed(1));

                        break;

                    case 5:

                        effectDisplay = t('up_effect_cycle_bonus', lvl);

                        break;

                    case 6:

                        effectDisplay = t('up_effect_auto_minutes', (lvl * 0.01).toFixed(2));

                        break;

                    case 7:

                        effectDisplay = t('up_effect_cost_reduction', (lvl * 5).toFixed(0));

                        break;

                    case 8:

                        effectDisplay = t('up_effect_golden_time', (lvl * 1).toFixed(0));

                        break;

                    default:

                        effectDisplay = '';

                }



                // 按钮文字

                const buttonText = canAfford

                    ? t('upgrade_button', format(cost), t('minutes_currency'))

                    : `${format(cost)} ${t('minutes_currency')}`;



                const item = document.createElement('div');

                item.className = 'upgrade-item';

                item.dataset.upgradeIndex = index;

                if (!canAfford) item.classList.add('disabled');



                item.innerHTML = `

            <div class="upgrade-header">

                <div class="upgrade-name">${t(up.nameKey)}</div>

                <div class="upgrade-level">Lv.${up.currentLevel}</div>

            </div>

            <div class="upgrade-desc">${t(up.descKey)}</div>

            <div class="upgrade-effect">${effectDisplay}</div>

            <button data-upgrade-index="${index}" onclick="buyUpgrade(${index}); event.stopImmediatePropagation();" ${!canAfford ? 'disabled' : ''} class="btn-upgrade">

                ${buttonText}

            </button>

        `;

                container.appendChild(item);

            });



            const currencyEl = document.getElementById('minuteDisplay');

            if (currencyEl) {

                currencyEl.textContent = format(minutes);

            }

        }



        function updateUpgradeAffordability() {

            const container = document.getElementById('upgradesGrid');

            if (!container) return;

            container.querySelectorAll('.upgrade-item').forEach(item => {

                const index = Number(item.dataset.upgradeIndex);

                if (Number.isNaN(index)) return;

                const up = upgrades[index];

                if (!up || up.category !== currentUpgradeTab) return;



                const baseCost = up.baseCost.times(Math.pow(up.costMult, up.currentLevel));

                const cost = baseCost.times(costReduction);

                const canAfford = minutes.gte(cost);

                const completed = up.currentLevel >= up.maxLevel;



                item.classList.toggle('disabled', !canAfford || completed);

                const button = item.querySelector('button');

                if (!button) return;

                button.disabled = !canAfford || completed;



                let buttonText = '';

                if (completed) {

                    buttonText = t('upgrade_completed');

                } else if (canAfford) {

                    buttonText = t('upgrade_button', format(cost), t('minutes_currency'));

                } else {

                    buttonText = `${format(cost)} ${t('minutes_currency')}`;

                }

                if (button.textContent !== buttonText) {

                    button.textContent = buttonText;

                }

            });

        }



        function renderRebirthUpgrades() {

            const container = document.getElementById('rebirthUpgradesGrid');

            if (!container) return;

            container.innerHTML = '';



            rebirthUpgrades.forEach((up, index) => {

                const unlocked = isRebirthUpgradeUnlocked(index);

                const canAfford = unlocked && sdp.gte(up.baseCost);

                const item = document.createElement('div');

                item.className = 'upgrade-item';

                if (!unlocked || !canAfford || up.currentLevel >= up.maxLevel) item.classList.add('disabled');

                if (!unlocked) item.classList.add('locked');



                const buttonText = up.currentLevel >= up.maxLevel

                    ? t('upgrade_completed')

                    : !unlocked

                        ? t('need_purchase_previous')

                        : canAfford

                            ? t('purchase_button', format(up.baseCost), t('sdp_currency'))

                            : `${format(up.baseCost)} ${t('sdp_currency')}`;



                item.innerHTML = `

            <div class="upgrade-header">

                <div class="upgrade-name">${t(up.nameKey)}</div>

                <div class="upgrade-level">Lv.${up.currentLevel}/${up.maxLevel}</div>

            </div>

            <div class="upgrade-desc">${t(up.descKey)}</div>

            <button onclick="buyRebirthUpgrade(${index}); event.stopImmediatePropagation();" ${!unlocked || !canAfford || up.currentLevel >= up.maxLevel ? 'disabled' : ''} class="btn-upgrade">

                ${buttonText}

            </button>

        `;

                container.appendChild(item);

            });



            updateRebirthDisplay();

        }



        function isVdpUpgradeUnlocked(index) {

            if (index === 0) return true;

            const prev = vdpUpgrades[index - 1];

            return prev && prev.currentLevel >= prev.maxLevel;

        }



        function renderVdpUpgrades() {

            const container = document.getElementById('vdpUpgradesGrid');

            if (!container) return;

            container.innerHTML = '';



            vdpUpgrades.forEach((up, index) => {

                const unlocked = isVdpUpgradeUnlocked(index);

                const canAfford = unlocked && vdp.gte(up.baseCost);

                const item = document.createElement('div');

                item.className = 'upgrade-item';

                if (!unlocked || !canAfford || up.currentLevel >= up.maxLevel) item.classList.add('disabled');

                if (!unlocked) item.classList.add('locked');



                const buttonText = up.currentLevel >= up.maxLevel

                    ? t('upgrade_completed')

                    : !unlocked

                        ? t('need_purchase_previous')

                        : canAfford

                            ? t('purchase_button', format(up.baseCost), t('vdp_currency'))

                            : `${format(up.baseCost)} ${t('vdp_currency')}`;



                item.innerHTML = `

            <div class="upgrade-header">

                <div class="upgrade-name">${t(up.nameKey)}</div>

                <div class="upgrade-level">Lv.${up.currentLevel}/${up.maxLevel}</div>

            </div>

            <div class="upgrade-desc">${t(up.descKey)}</div>

            <button onclick="buyVdpUpgrade(${index}); event.stopImmediatePropagation();" ${!unlocked || !canAfford || up.currentLevel >= up.maxLevel ? 'disabled' : ''} class="btn-upgrade">

                ${buttonText}

            </button>

        `;

                container.appendChild(item);

            });



            const boosterDisplay = document.getElementById('boosterLevelDisplay');

            if (boosterDisplay) boosterDisplay.textContent = boosterLevel;

        }



        function isSdvChallengeUnlocked(challengeId) {
            if (challengeId === 'sdv1') return (rebirthUpgrades[4] && rebirthUpgrades[4].currentLevel > 0);
            if (challengeId === 'sdv2') return (rebirthUpgrades[6] && rebirthUpgrades[6].currentLevel > 0);
            if (challengeId === 'sdv3') return (rebirthUpgrades[9] && rebirthUpgrades[9].currentLevel > 0);
            return false;
        }

        function renderSdvChallenges() {

            const container = document.getElementById('sdvChallengesGrid');

            if (!container) return;

            container.innerHTML = '';



            sdvChallenges.forEach(challenge => {

                const isCompleted = challenge.completed;

                const isActive = activeSDVChallenge === challenge.id;

                const unlocked = isSdvChallengeUnlocked(challenge.id);

                const canActivate = unlocked && !isCompleted && !activeSDVChallenge;



                const displayProgress = typeof challenge.progress === 'function' ? Math.min(100, Math.max(0, Math.floor(challenge.progress()))) : 0;



                const timeLimitHtml = challenge.timeLimit

                    ? `<div class="challenge-time-limit">${t('time_limit')}: ${challenge.timeLimit} ${t('seconds')}</div>`

                    : '';



                const item = document.createElement('div');

                item.className = `challenge-card ${isCompleted ? 'completed' : isActive ? 'active' : unlocked ? '' : 'locked'}`;

                item.innerHTML = `

            <div class="challenge-icon">

                <i class="fas ${challenge.icon || 'fa-flag'}"></i>

            </div>

            <div class="challenge-title">${t(challenge.titleKey)}</div>

            <div class="challenge-desc">${t(challenge.descKey)}</div>

            <div class="challenge-reward">${t('reward')}: ${t(challenge.rewardKey)}</div>

            ${timeLimitHtml}

            <div class="challenge-progress-bar">

                <div class="challenge-progress-fill" style="width: ${displayProgress}%;"></div>

            </div>

            <div class="challenge-progress-text">${isCompleted ? t('complete') : displayProgress + '%'}</div>

            <div class="challenge-card-actions">

                ${canActivate ? `<button onclick="startSdvChallenge('${challenge.id}')" class="btn-start-challenge">${t('start_sdv')}</button>` : ''}

                ${isActive ? `<button onclick="abandonSdvChallenge()" class="btn-challenge-abandon">${t('abandon_sdv')}</button>` : ''}

                ${!unlocked && !isCompleted ? `<div style="margin-top: 10px; color: #ffb86c; font-size:0.9rem;">${t('sdv_unlock_hint')}</div>` : ''}

            </div>

        `;

                container.appendChild(item);

            });



            const current = document.getElementById('sdvCurrentChallenge');

            const completedCount = document.getElementById('sdvCompletedCount');

            if (current) current.textContent = activeSDVChallenge || t('none');

            if (completedCount) completedCount.textContent = sdvChallenges.filter(c => c.completed).length;

        }



        function switchRebirthPage(page) {

            currentRebirthPage = page;

            document.querySelectorAll('.upgrade-sub-btn[data-page]').forEach(btn => btn.classList.toggle('active', btn.dataset.page === page));

            document.querySelectorAll('.rebirth-page').forEach(el => el.style.display = 'none');

            const pageEl = document.getElementById(`rebirth-page-${page}`);

            if (pageEl) pageEl.style.display = 'block';



            if (page === 'time') {

                renderRebirthUpgrades();

            } else if (page === 'fragment') {

                renderVdpUpgrades();

            } else if (page === 'sdv') {

                renderSdvChallenges();

            } else {

                updateRebirthDisplay();

            }

        }

        window.startSdvChallenge = function (challengeId) {

            if (activeSDVChallenge) return;

            const challenge = sdvChallenges.find(c => c.id === challengeId);

            if (!challenge || challenge.completed) return;

            activeSDVChallenge = challengeId;

            sdvChallengeStartTime = Date.now();

            sdvMode = true;

            if (document.getElementById('sdvCurrentChallenge')) {

                document.getElementById('sdvCurrentChallenge').textContent = challenge.title;

            }

            alert(t('sdv_started', challenge.title));

            renderSdvChallenges();

            saveGame();

        };

        window.abandonSdvChallenge = function () {

            if (!activeSDVChallenge) return;

            if (!confirm(t('abandon_sdv_confirm'))) return;

            activeSDVChallenge = null;

            sdvChallengeStartTime = null;

            sdvMode = false;

            renderSdvChallenges();

            saveGame();

        };

        function calculateRebirthGain() {

            const required = D(10);

            if (minutes.lt(required)) return D(0);

            const sdpBoost = (vdpUpgrades[0] && vdpUpgrades[0].currentLevel) ? D(2) : D(1);

            return minutes.div(10).times(sdpBoost).floor();

        }

        function updateRebirthDisplay() {

            const sdpEl = document.getElementById('sdpDisplay');

            const vdpEl = document.getElementById('vdpDisplay');

            const rebirthCountEl = document.getElementById('rebirthCountDisplay');

            const vdpResetCountEl = document.getElementById('vdpResetCountDisplay');

            const previewEl = document.getElementById('rebirthGainPreview');

            const timeRebirthBtn = document.getElementById('timeRebirthBtn');

            const gain = calculateRebirthGain();



            if (sdpEl) sdpEl.textContent = format(sdp);

            if (vdpEl) vdpEl.textContent = format(vdp);

            if (rebirthCountEl) rebirthCountEl.textContent = format(timeRebirthCount);

            if (vdpResetCountEl) vdpResetCountEl.textContent = format(vdpResets);

            if (previewEl) previewEl.textContent = format(gain);

            if (timeRebirthBtn) {

                timeRebirthBtn.textContent = t('rebirth_button_text', format(gain));

            }

        }

        window.buyRebirthUpgrade = function (index) {

            const up = rebirthUpgrades[index];

            if (!up || up.currentLevel >= up.maxLevel) return;

            if (!isRebirthUpgradeUnlocked(index)) return;

            if (sdp.lt(up.baseCost)) return;

            sdp = sdp.minus(up.baseCost);

            up.currentLevel++;

            recalculateSpeed();

            renderRebirthUpgrades();

            if (currentRebirthPage === 'sdv') {

                renderSdvChallenges();

            }

            if (typeof saveGame === 'function') saveGame();

        };

        window.timeRebirth = function () {

            const required = D(10);

            if (minutes.lt(required)) {

                alert(t('rebirth_need_minutes'));

                return;

            }

            const sdpBoost = (vdpUpgrades[0] && vdpUpgrades[0].currentLevel) ? D(2) : D(1);

            const gain = minutes.div(10).times(sdpBoost).floor();

            if (gain.lte(0)) return;

            sdp = sdp.plus(gain);

            timeRebirthCount = timeRebirthCount.plus(1);

            seconds = D(0);

            accumulatedSeconds = D(0);

            cycleCount = D(0);

            minutes = D(0);

            speed = D(1.0);

            baseSpeed = D(1.0);

            bonusSpeed = D(0);

            bonusMinutesPerSecond = D(0);

            autoSecondsPerSecond = D(0);

            speedMultiplier = D(1);

            minuteMultiplier = D(1);

            cycleBonusMinutes = D(0);

            autoMinutesPerSecond = D(0);

            costReduction = D(1);

            activeChallenge = null;

            
            challengeStartTime = null;

            upgrades.forEach(up => up.currentLevel = 0);

            if (rebirthUpgrades[1] && rebirthUpgrades[1].currentLevel > 0) {

                const minSpeedBoostLevel = 3;

                if (upgrades[0]) upgrades[0].currentLevel = Math.max(upgrades[0].currentLevel, minSpeedBoostLevel);

            }

            recalculateSpeed();

            renderUpgrades();

            renderRebirthUpgrades();

            if (typeof saveGame === 'function') saveGame();

            alert(t('rebirth_success', format(gain)));

        };

        window.claimVDP = function () {

            if (sdp.lt(1000)) {

                alert(t('claim_vdp_need_sdp'));

                return;

            }

            const amount = sdp.div(1000).times(D(1).plus(vdpResets.times(0.5))).floor();

            if (amount.lte(0)) {

                alert(t('claim_vdp_cannot_claim'));

                return;

            }

            vdp = vdp.plus(amount);

            sdp = D(0);

            vdpResets = vdpResets.plus(1);

            renderRebirthUpgrades();

            if (typeof saveGame === 'function') saveGame();

            alert(t('claim_vdp_success', format(amount)));

        };



        window.buyUpgrade = function (index) {

            const up = upgrades[index];

            const baseCost = up.baseCost.times(Math.pow(up.costMult, up.currentLevel));

            const cost = baseCost.times(costReduction);



            if (minutes.lt(cost)) {

                console.log(t('insufficient_funds'));

                return;

            }



            minutes = minutes.minus(cost);

            up.currentLevel++;



            recalculateSpeed();

            if (typeof saveGame === 'function') saveGame();

            renderUpgrades();

            if (typeof createParticleBurst === 'function') {

                createParticleBurst();

            }

        };

        let lang = {};

        let currentLang = localStorage.getItem('language') || 'zh-CN';



        async function loadLanguage(langCode) {

            try {

                const response = await fetch(`lang/${langCode}.txt`);

                if (!response.ok) throw new Error('Language file not found');

                const text = await response.text();

                const lines = text.split('\n');

                lang = {};



                for (let line of lines) {

                    line = line.trim();

                    if (line.startsWith('[') && line.includes(']')) {

                        const match = line.match(/^\[(.+?)\]\s*(.*)$/);

                        if (match) {

                            lang[match[1]] = match[2];

                        }

                    }

                }



                localStorage.setItem('language', langCode);

                currentLang = langCode;

                applyLanguage();

                return true;

            } catch (e) {

                console.error('Failed to load language:', e);

                return false;

            }

        }



        function t(key, ...args) {

            let text = lang[key] || key;

            args.forEach((arg, index) => {

                text = text.replace(`{${index}}`, arg);

            });

            return text;

        }



        function applyLanguage() {

            document.title = t('game_title');

            const h1 = document.querySelector('h1');

            if (h1) h1.textContent = t('game_title');

            document.querySelectorAll('[data-i18n]').forEach(el => {

                const key = el.getAttribute('data-i18n');

                if (key === 'innerHTML') {

                    const htmlKey = el.getAttribute('data-i18n-html');

                    if (htmlKey) el.innerHTML = t(htmlKey);

                } else {

                    el.textContent = t(key);

                }

            });

            document.querySelectorAll('[data-i18n-aria]').forEach(el => {

                const key = el.getAttribute('data-i18n-aria');

                el.setAttribute('aria-label', t(key));

            });

            document.querySelectorAll('[data-i18n-title]').forEach(el => {

                const key = el.getAttribute('data-i18n-title');

                el.setAttribute('title', t(key));

            });

            const versionEl = document.getElementById('versionDisplay');
            if (versionEl) versionEl.textContent = t('version_prefix') + ' ' + GAME_VERSION;

            renderUpgrades();

            renderAchievements();

            renderChallengesGrid();

            renderChallengesGrid();

            updateTimer();

        }

        function applyAllTranslations() {

            applyLanguage();

        }

        async function initLanguage() {

            await loadLanguage(currentLang);

        }

        async function switchLanguage(langCode) {

            const success = await loadLanguage(langCode);

            if (success) {

                renderUpgrades();

                renderRebirthUpgrades();

                renderChallengesGrid();

                renderChallengesGrid();

                updateChallengeUI();

                createThemeButtons();

                createLanguageSelector();

                updateTimer();

            } else {

                alert(t('load_language_fail'));

            }

        }

        function openLanguageModal() {

            const overlay = document.getElementById('languageOverlay');

            if (!overlay) return;

            const listContainer = document.getElementById('languageModalList');

            if (!listContainer) return;

            listContainer.innerHTML = '';

            languageList.forEach(lang => {

                const btn = document.createElement('button');

                btn.className = 'setting-btn lang-btn';

                const isActive = currentLang === lang.code;

                btn.innerHTML = `${t(lang.nameKey)} ${isActive ? ' ✓' : ''}`;

                btn.style.fontWeight = isActive ? 'bold' : 'normal';

                btn.onclick = () => {

                    switchLanguage(lang.code);

                    closeLanguageModal();

                };

                listContainer.appendChild(btn);

            });

            overlay.classList.add('visible');

        }

        function closeLanguageModal() {

            const overlay = document.getElementById('languageOverlay');

            if (overlay) overlay.classList.remove('visible');

        }

        function createLanguageSelector() {

            const container = document.getElementById('language-buttons');

            if (!container) return;

            container.innerHTML = '';

            const btn = document.createElement('button');

            btn.className = 'setting-btn';

            btn.onclick = openLanguageModal;

            btn.innerHTML = `<i class="fas fa-language"></i> ${t('change_language')}`;

            container.appendChild(btn);

        }

        let settingsLayout = localStorage.getItem('settingsLayout') || 'grid';

        let isAnimatingSettings = false;

        function renderSettingsLayout() {

            renderSettingsContent();

            if (typeof createLanguageSelector === 'function') createLanguageSelector();

            if (typeof createThemeButtons === 'function') createThemeButtons();

            applyLanguage();

        }

        function renderSettingsContent() {

            const wrapper = document.getElementById('settings-content-wrapper');

            if (!wrapper) return;



            if (settingsLayout === 'grid') {

                wrapper.innerHTML = `<div class="settings-grid-cards">

        <div class="settings-card-group">

          <div class="setting-card">

            <div class="setting-card-icon"><i class="fas fa-save"></i></div>

            <h3 data-i18n="save_management">存档管理</h3>

            <div class="setting-card-actions">

              <button onclick="exportSave()" class="setting-btn"><i class="fas fa-file-export"></i> <span data-i18n="export_save">导出存档</span></button>

              <button onclick="importSave()" class="setting-btn"><i class="fas fa-file-import"></i> <span data-i18n="import_save">导入存档</span></button>

            </div>

          </div>

          <div class="setting-card">

            <div class="setting-card-icon"><i class="fas fa-language"></i></div>

            <h3 data-i18n="language">语言 / Language</h3>

            <div class="setting-card-actions" id="language-buttons"></div>

            <p class="setting-desc" data-i18n="language_desc">选择界面语言</p>

          </div>

          <div class="setting-card">

            <div class="setting-card-icon"><i class="fas fa-palette"></i></div>

            <h3 data-i18n="interface_theme">界面主题</h3>

            <div class="setting-card-actions" id="theme-buttons"></div>

            <p class="setting-desc" data-i18n="theme_desc">切换不同视觉风格</p>

          </div>

          <div class="setting-card danger-card">

            <div class="setting-card-icon"><i class="fas fa-exclamation-triangle"></i></div>

            <h3 data-i18n="danger_operations">危险操作</h3>

            <div class="setting-card-actions">

              <button onclick="deleteSaveConfirm()" class="setting-btn danger-btn">

                <i class="fas fa-trash-alt"></i> <span data-i18n="delete_save">删档重来</span>

              </button>

            </div>

            <p class="setting-desc" data-i18n="delete_save_desc">彻底清除所有游戏数据（存档、成就、点击记录等）。此操作不可恢复！</p>

          </div>

          <div class="setting-card">

    <div class="setting-card-icon"><i class="fas fa-paint-brush"></i></div>

    <h3 data-i18n="custom_colors">自定义颜色</h3>

    <div class="custom-color-group">

        <div class="custom-color-row">

            <label data-i18n="text_color">文字颜色</label>

            <input type="color" id="customTextColor" value="#e2e8f0">

        </div>

        <div class="custom-color-row">

            <label data-i18n="bg_color">背景颜色</label>

            <input type="color" id="customBgColor" value="#0f172a">

        </div>

        <div class="custom-color-row">

            <label data-i18n="theme_color">主题颜色</label>

            <input type="color" id="customPrimaryColor" value="#38bdf8">

        </div>

    </div>

    <button id="resetCustomColors" class="setting-btn" style="margin-top:12px; width:100%;">

        <i class="fas fa-undo"></i> <span data-i18n="reset_custom_colors">重置自定义颜色</span>

    </button>

</div>

        </div>

      </div>`;

            } else {

                wrapper.innerHTML = `<div class="settings-sidebar-layout">

        <div class="settings-container">

          <nav class="settings-sidebar">

            <button class="sidebar-item active" data-panel="general"><i class="fas fa-cogs"></i> <span data-i18n="general_tab">通用</span></button>

            <button class="sidebar-item" data-panel="appearance"><i class="fas fa-paint-brush"></i> <span data-i18n="appearance_tab">外观</span></button>

            <button class="sidebar-item" data-panel="danger"><i class="fas fa-skull"></i> <span data-i18n="danger_tab">危险</span></button>

          </nav>

          <div class="settings-content">

            <div class="settings-panel active" data-panel="general">

              <div class="setting-group">

                <h3 data-i18n="save_management">存档管理</h3>

                <div class="settings-row">

                  <button onclick="exportSave()" class="setting-btn"><i class="fas fa-file-export"></i> <span data-i18n="export_save">导出存档</span></button>

                  <button onclick="importSave()" class="setting-btn"><i class="fas fa-file-import"></i> <span data-i18n="import_save">导入存档</span></button>

                </div>

              </div>

              <div class="setting-group">

                <h3 data-i18n="language">语言 / Language</h3>

                <div class="settings-row" id="language-buttons"></div>

                <p class="setting-desc" data-i18n="language_desc">选择界面语言</p>

              </div>

            </div>

            <div class="settings-panel" data-panel="appearance">

              <div class="setting-group">

                <h3 data-i18n="interface_theme">界面主题</h3>

                <div class="settings-row" id="theme-buttons"></div>

                <p class="setting-desc" data-i18n="theme_desc">切换不同视觉风格</p>

              </div>

              <div class="setting-group">

        <h3 data-i18n="custom_colors">自定义颜色</h3>

        <div class="custom-color-group">

            <div class="custom-color-row">

                <label data-i18n="text_color">文字颜色</label>

                <input type="color" id="customTextColor" value="#e2e8f0">

            </div>

            <div class="custom-color-row">

                <label data-i18n="bg_color">背景颜色</label>

                <input type="color" id="customBgColor" value="#0f172a">

            </div>

            <div class="custom-color-row">

                <label data-i18n="theme_color">主题颜色</label>

                <input type="color" id="customPrimaryColor" value="#38bdf8">

            </div>

        </div>

        <button id="resetCustomColors" class="setting-btn" style="margin-top:12px;">

            <i class="fas fa-undo"></i> <span data-i18n="reset_custom_colors">重置自定义颜色</span>

        </button>

    </div>

            </div>

            <div class="settings-panel" data-panel="danger">

              <div class="setting-group danger-zone">

                <h3 data-i18n="danger_operations">危险操作</h3>

                <button onclick="deleteSaveConfirm()" class="setting-btn danger-btn">

                  <i class="fas fa-trash-alt"></i> <span data-i18n="delete_save">删档重来</span>

                </button>

                <p class="setting-desc" data-i18n="delete_save_desc">彻底清除所有游戏数据（存档、成就、点击记录等）。此操作不可恢复！</p>

              </div>

            </div>

          </div>

        </div>

      </div>`;

                const sidebar = wrapper.querySelector('.settings-sidebar');

                if (sidebar) {

                    sidebar.addEventListener('click', (e) => {

                        const item = e.target.closest('.sidebar-item');

                        if (!item) return;

                        const panelName = item.dataset.panel;

                        sidebar.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));

                        item.classList.add('active');

                        const content = wrapper.querySelector('.settings-content');

                        content.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));

                        content.querySelector(`[data-panel="${panelName}"]`).classList.add('active');

                    });

                }

            }

            if (typeof createThemeButtons === 'function') createThemeButtons();

            if (typeof createLanguageSelector === 'function') createLanguageSelector();

            initCustomColorPickers();

        }

        function switchSettingsLayout(layout) {

            if (settingsLayout === layout || isAnimatingSettings) return;

            const wrapper = document.getElementById('settings-content-wrapper');

            if (!wrapper) return;

            isAnimatingSettings = true;

            wrapper.style.animation = 'fadeOutSettings 0.2s ease forwards';

            wrapper.addEventListener('animationend', function outHandler() {

                wrapper.removeEventListener('animationend', outHandler);

                settingsLayout = layout;

                localStorage.setItem('settingsLayout', settingsLayout);

                renderSettingsLayout();

                wrapper.style.animation = 'fadeInSettings 0.3s ease forwards';

                wrapper.addEventListener('animationend', function inHandler() {

                    wrapper.removeEventListener('animationend', inHandler);

                    wrapper.style.animation = '';

                    isAnimatingSettings = false;

                });

            });

            document.querySelectorAll('.layout-switch-btn').forEach(btn => {

                btn.classList.toggle('active', btn.dataset.layout === layout);

            });

        }

        function initSettingsSwitcher() {

            document.querySelectorAll('.layout-switch-btn').forEach(btn => {

                btn.onclick = () => switchSettingsLayout(btn.dataset.layout);

            });

        }

        const CUSTOM_COLOR_KEYS = {

            text: 'customTextColor',

            bg: 'customBgColor',

            primary: 'customPrimaryColor'

        };

        function loadCustomColors() {

            const saved = localStorage.getItem('customColors');

            return saved ? JSON.parse(saved) : null;

        }

        function saveCustomColors(colors) {

            localStorage.setItem('customColors', JSON.stringify(colors));

        }

        function applyCustomColors(colors) {

            const root = document.documentElement;

            if (colors.text) {

                root.style.setProperty('--text', colors.text);

                const muted = LightenDarkenColor(colors.text, -30);

                root.style.setProperty('--text-muted', muted);

            }

            if (colors.bg) {

                root.style.setProperty('--bg-start', colors.bg);

                const bgEnd = LightenDarkenColor(colors.bg, 20);

                root.style.setProperty('--bg-end', bgEnd);

                root.style.setProperty('--card-bg', colors.bg + 'f2');

                root.style.setProperty('--inner-bg', colors.bg);

                root.style.setProperty('--panel-bg', colors.bg + '80');

            }

            if (colors.primary) {

                root.style.setProperty('--primary', colors.primary);

                root.style.setProperty('--primary-rgb', hexToRgb(colors.primary).join(', '));

                const primaryDark = LightenDarkenColor(colors.primary, -20);

                root.style.setProperty('--primary-dark', primaryDark);



                root.style.setProperty('--shadow', `rgba(${hexToRgb(colors.primary).join(', ')}, 0.4)`);

                root.style.setProperty('--border', `rgba(${hexToRgb(colors.primary).join(', ')}, 0.2)`);



            }

        }

        function hexToRgb(hex) {

            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

            return result ? [

                parseInt(result[1], 16),

                parseInt(result[2], 16),

                parseInt(result[3], 16)

            ] : [0, 0, 0];

        }

        function LightenDarkenColor(col, amt) {

            const rgb = hexToRgb(col);

            return '#' + rgb.map(c => {

                let newC = c + amt;

                newC = Math.max(0, Math.min(255, newC));

                return newC.toString(16).padStart(2, '0');

            }).join('');

        }

        function initCustomColorPickers() {

            const textPicker = document.getElementById('customTextColor');

            const bgPicker = document.getElementById('customBgColor');

            const primaryPicker = document.getElementById('customPrimaryColor');

            const resetBtn = document.getElementById('resetCustomColors');



            if (!textPicker || !bgPicker || !primaryPicker) return;



            const savedColors = loadCustomColors();

            if (currentTheme === 'custom' && savedColors) {

                textPicker.value = savedColors.text || '#e2e8f0';

                bgPicker.value = savedColors.bg || '#0f172a';

                primaryPicker.value = savedColors.primary || '#38bdf8';

                applyCustomColors(savedColors);

            } else {

                const style = getComputedStyle(document.documentElement);

                textPicker.value = rgbToHex(style.getPropertyValue('--text').trim()) || '#e2e8f0';

                bgPicker.value = rgbToHex(style.getPropertyValue('--bg-start').trim()) || '#0f172a';

                primaryPicker.value = rgbToHex(style.getPropertyValue('--primary').trim()) || '#38bdf8';

            }



            const handleChange = () => {

                const colors = {

                    text: textPicker.value,

                    bg: bgPicker.value,

                    primary: primaryPicker.value

                };

                saveCustomColors(colors);

                applyCustomColors(colors);

                currentTheme = 'custom';

                localStorage.setItem('theme', 'custom');

                const triggerBtn = document.querySelector('.theme-trigger-btn span');

                if (triggerBtn) triggerBtn.textContent = t('custom_theme') || '自定义';

                document.querySelectorAll('.theme-option-item').forEach(btn => {

                    btn.classList.remove('active');

                    if (btn.textContent === (t('custom_theme') || '自定义')) {

                        btn.classList.add('active');

                    }

                });

            };



            textPicker.addEventListener('input', handleChange);

            bgPicker.addEventListener('input', handleChange);

            primaryPicker.addEventListener('input', handleChange);



            resetBtn.addEventListener('click', () => {

                localStorage.removeItem('customColors');

                currentTheme = 'blue';

                localStorage.setItem('theme', 'blue');

                applyTheme('blue');

                const style = getComputedStyle(document.documentElement);

                textPicker.value = rgbToHex(style.getPropertyValue('--text').trim()) || '#e2e8f0';

                bgPicker.value = rgbToHex(style.getPropertyValue('--bg-start').trim()) || '#0f172a';

                primaryPicker.value = rgbToHex(style.getPropertyValue('--primary').trim()) || '#38bdf8';

                const triggerBtn = document.querySelector('.theme-trigger-btn span');

                if (triggerBtn) triggerBtn.textContent = t('theme_blue') || '蓝色';

            });

        }



        function rgbToHex(rgb) {

            if (!rgb) return '#000000';

            const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

            if (match) {

                return '#' + [match[1], match[2], match[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('');

            }

            return rgb;

        }

        async function init() {

            const savedLang = localStorage.getItem('language') || 'zh-CN';

            await loadLanguage(savedLang);

            loadGame();

            recalculateSpeed();

            applyTheme(currentTheme);

            updateTimer();

            switchUpgradeTab('basic');

            renderUpgrades();

            renderRebirthUpgrades();

            renderChallengesGrid();

            updateChallengeUI();

            renderSettingsLayout();

            initSettingsSwitcher();

            createThemeButtons();

            createLanguageSelector();

            createParticles();

            applyAllTranslations();

            applyLanguage();



            const startBtn = document.getElementById('startBtn');

            if (startBtn) {

                startBtn.onclick = () => startTimer();

            }

            const style = document.createElement('style');

            style.innerHTML = `

    @keyframes float { 0% { transform: translate(0, 0); } 100% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px); } }

    @keyframes fade { 0%,100% { opacity: 0; } 50% { opacity: 0.6; } }

    @keyframes burst { 0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }

                       100% { transform: translate(calc(var(--end-x) - 50%), calc(var(--end-y) - 50%)) scale(var(--end-scale)); opacity: var(--end-opacity); } }

  `;

            document.head.appendChild(style);

            setInterval(saveGame, 100);



            if (!isRunning) {

                startTimer();

            }




        }

        window.addEventListener('DOMContentLoaded', init);

