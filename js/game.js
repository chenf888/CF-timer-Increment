
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
                completed: false,
                check: () => false,
                progress: () => 0
            },
            {
                id: "sdv2",
                titleKey: "sdv2_title",
                descKey: "sdv2_desc",
                rewardKey: "sdv2_reward",
                completed: false,
                check: () => false,
                progress: () => 0
            },
            {
                id: "sdv3",
                titleKey: "sdv3_title",
                descKey: "sdv3_desc",
                rewardKey: "sdv3_reward",
                completed: false,
                check: () => false,
                progress: () => 0
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
                let reb6 = (rebirthUpgrades[5] && rebirthUpgrades[5].currentLevel) ? rebirthUpgrades[5].currentLevel : 0;
                let reb11 = (rebirthUpgrades[10] && rebirthUpgrades[10].currentLevel) ? rebirthUpgrades[10].currentLevel : 0;
                let vdp11 = (vdpUpgrades[0] && vdpUpgrades[0].currentLevel) ? vdpUpgrades[0].currentLevel : 0;
                let vdp12 = (vdpUpgrades[1] && vdpUpgrades[1].currentLevel) ? vdpUpgrades[1].currentLevel : 0;
                let vdp21 = (vdpUpgrades[2] && vdpUpgrades[2].currentLevel) ? vdpUpgrades[2].currentLevel : 0;
                let vdp22 = (vdpUpgrades[3] && vdpUpgrades[3].currentLevel) ? vdpUpgrades[3].currentLevel : 0;
                let vdp23 = (vdpUpgrades[4] && vdpUpgrades[4].currentLevel) ? vdpUpgrades[4].currentLevel : 0;
                let vdp33 = (vdpUpgrades[5] && vdpUpgrades[5].currentLevel) ? vdpUpgrades[5].currentLevel : 0;
                let boosterUnlocked = (vdpUpgrades[6] && vdpUpgrades[6].currentLevel) ? vdpUpgrades[6].currentLevel : 0;

                bonusSpeed = D(up0Level).times(0.1);
                if (reb3) {
                    bonusSpeed = bonusSpeed.plus(minutes.times(0.005));
                }
                if (reb4) {
                    bonusSpeed = bonusSpeed.plus(minutes.sqrt().times(0.02));
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
                    speedMultiplier = speedMultiplier.times(2.5);
                }
                if (boosterLevel) {
                    speedMultiplier = speedMultiplier.plus(D(boosterLevel).times(0.05));
                }
                minuteMultiplier = D(1).plus(D(up4Level).times(0.1));
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
                    case 0: effectDisplay = t('up_effect_speed', (lvl * 0.1).toFixed(1)); break;
                    case 1: effectDisplay = t('up_effect_auto_seconds', (lvl * 0.01).toFixed(2)); break;
                    case 2: effectDisplay = t('up_effect_minute_boost', (lvl * 0.01).toFixed(2)); break;
                    case 3: effectDisplay = t('up_effect_speed_multiplier', (1 + lvl * 0.1).toFixed(1)); break;
                    case 4: effectDisplay = t('up_effect_minute_multiplier', (1 + lvl * 0.1).toFixed(1)); break;
                    case 5: effectDisplay = t('up_effect_cycle_bonus', lvl); break;
                    case 6: effectDisplay = t('up_effect_auto_minutes', (lvl * 0.01).toFixed(2)); break;
                    case 7: effectDisplay = t('up_effect_cost_reduction', (lvl * 5).toFixed(0)); break;
                    case 8: effectDisplay = t('up_effect_golden_time', (lvl * 1).toFixed(0)); break;
                    default: effectDisplay = '';
                }

                const buttonText = canAfford
                    ? t('upgrade_button', format(cost), t('minutes_currency'))
                    : `${format(cost)} ${t('minutes_currency')}`;

                const item = document.createElement('div');
                item.className = 'upgrade-item editable-card';   // ← 添加了 editable-card
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
            if (currencyEl) currencyEl.textContent = format(minutes);
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
                item.className = 'upgrade-item editable-card';   // ← 添加 editable-card
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
                item.className = 'upgrade-item editable-card';   // ← 添加 editable-card
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
                const timeLimitHtml = challenge.timeLimit ? `<div class="challenge-time-limit">${t('time_limit')}: ${challenge.timeLimit} ${t('seconds')}</div>` : '';

                const item = document.createElement('div');
                item.className = `challenge-card editable-card ${isCompleted ? 'completed' : isActive ? 'active' : ''}`;  // ← 添加 editable-card
                if (!unlocked && !isCompleted) item.classList.add('locked');

                item.innerHTML = `
            <div class="challenge-icon"><i class="fas ${challenge.icon || 'fa-flag'}"></i></div>
            <div class="challenge-title">${t(challenge.titleKey)}</div>
            <div class="challenge-desc">${t(challenge.descKey)}</div>
            <div class="challenge-reward">${t('reward')}: ${t(challenge.rewardKey)}</div>
            ${timeLimitHtml}
            <div class="challenge-progress-bar"><div class="challenge-progress-fill" style="width: ${displayProgress}%;"></div></div>
            <div class="challenge-progress-text">${isCompleted ? t('complete') : displayProgress + '%'}</div>
            <div class="challenge-card-actions">
                ${canActivate ? `<button onclick="startSdvChallenge('${challenge.id}')" class="btn-start-challenge">${t('start_sdv')}</button>` : ''}
                ${isActive ? `<button onclick="abandonSdvChallenge()" class="btn-challenge-abandon">${t('abandon_sdv')}</button>` : ''}
                ${!unlocked && !isCompleted ? `<div style="margin-top:10px; color:#ffb86c; font-size:0.9rem;">${t('sdv_unlock_hint')}</div>` : ''}
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
            challengeMode = false;
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
