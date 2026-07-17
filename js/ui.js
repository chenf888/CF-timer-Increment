
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
                renderChallengesList();
            }
            if (tab === 'settings') {
                if (document.getElementById('settings-content-wrapper').children.length === 0) {
                    renderSettingsLayout();
                }
                document.querySelectorAll('.layout-switch-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.layout === settingsLayout);
                });
            }
            setTimeout(() => {
                if (globalEditMode) {
                    applyEditModeToAllCards();
                }
            }, 50);
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
            if (modalChallengeMode) modalChallengeMode.textContent = challengeMode ? t('yes') : t('no');
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
                if (isUnlocked && !ach.unlocked) ach.unlocked = true;

                let rawProgress = 0;
                if (typeof ach.progress === 'function') rawProgress = ach.progress();
                const displayProgress = Math.min(100, Math.max(0, Math.floor(rawProgress)));

                const item = document.createElement('div');
                item.className = `achievement-item editable-card ${isUnlocked ? 'unlocked' : 'locked'}`;  // ← 添加 editable-card

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
            const container = document.getElementById('challengesGrid');
            if (!container) return;

            const scrollTop = container.scrollTop;
            container.innerHTML = '';

            challenges.forEach(challenge => {
                const isCompleted = challenge.completed;
                const isActive = activeChallenge === challenge.id;
                const canActivate = !isCompleted && !activeChallenge;

                let rawProgress = 0;
                if (typeof challenge.progress === 'function') rawProgress = challenge.progress();
                const displayProgress = Math.min(100, Math.max(0, Math.floor(rawProgress)));

                const item = document.createElement('div');
                item.className = `achievement-item editable-card ${isCompleted ? 'completed' : isActive ? 'active' : 'locked'}`; // ← 添加 editable-card

                item.innerHTML = `
            <div class="achievement-icon">
                <i class="fas ${challenge.icon || 'fa-flag'}"></i>
            </div>
            <div class="achievement-title">${t(challenge.titleKey)}</div>
            <div class="achievement-tooltip">
                ${t(challenge.descKey)}<br><br>
                <strong>${t('reward')}:</strong> ${t(challenge.rewardKey)}<br>
                <strong>${t('progress')}:</strong> ${isCompleted ? t('complete') : displayProgress + '%'}
                <div class="ach-progress-bar-bg">
                    <div class="ach-progress-bar-fill" style="width: ${displayProgress}%"></div>
                </div>
            </div>
            ${canActivate ? `<button onclick="startChallenge('${challenge.id}')" class="btn-challenge-start">${t('start_challenge')}</button>` : ''}
            ${isActive ? `<button onclick="abandonChallenge()" class="btn-challenge-abandon">${t('abandon_challenge')}</button>` : ''}
        `;
                container.appendChild(item);
            });

            container.scrollTop = scrollTop;
        }
        function renderChallengesList() {
            const container = document.getElementById('challenges-list');
            if (!container) return;
            container.innerHTML = '';

            challenges.forEach(challenge => {
                const isCompleted = challenge.completed;
                const isActive = activeChallenge === challenge.id;

                let rawProgress = 0;
                if (typeof challenge.progress === 'function') rawProgress = challenge.progress();
                const displayProgress = Math.min(100, Math.max(0, Math.floor(rawProgress)));

                const timeLimitText = challenge.timeLimit
                    ? `<div class="challenge-time-limit">${t('time_limit')}: ${Math.floor(challenge.timeLimit / 60)}:${(challenge.timeLimit % 60).toString().padStart(2, '0')}</div>`
                    : `<div class="challenge-time-limit">${t('no_time_limit')}</div>`;

                const card = document.createElement('div');
                card.className = `challenge-card editable-card ${isCompleted ? 'completed' : isActive ? 'active' : ''}`;  // ← 添加 editable-card

                card.innerHTML = `
            <div class="challenge-icon"><i class="fas ${challenge.icon}"></i></div>
            <div class="challenge-title">${t(challenge.titleKey)}</div>
            <div class="challenge-desc">${t(challenge.descKey)}</div>
            <div class="challenge-reward">${t('reward')}: ${t(challenge.rewardKey)}</div>
            ${timeLimitText}
            <div class="challenge-progress">
                <div class="progress-bar"><div class="progress-fill" style="width: ${displayProgress}%"></div></div>
                <div class="progress-text">${isCompleted ? t('complete') : isActive ? t('in_progress') : displayProgress + '%'}</div>
            </div>
            ${!isCompleted && !isActive ? `<button onclick="startChallenge('${challenge.id}')" class="btn-start-challenge">${t('start_challenge')}</button>` : ''}
        `;
                container.appendChild(card);
            });
        }

        function updateChallengeUI() {
            const statusPanel = document.getElementById('challenge-mode-status');
            const entryPanel = document.getElementById('challenge-mode-entry');
            const challengesList = document.getElementById('challenges-list');

            if (challengeMode) {
                statusPanel.style.display = 'block';
                entryPanel.style.display = 'none';
                challengesList.style.display = 'grid';

                if (activeChallenge) {
                    const challenge = challenges.find(c => c.id === activeChallenge);
                    if (challenge) {
                        document.getElementById('current-challenge-title').textContent = challenge.title;

                        let progress = 0;
                        if (typeof challenge.progress === 'function') {
                            progress = challenge.progress();
                        }
                        document.getElementById('challenge-progress-fill').style.width = Math.min(100, progress) + '%';
                        document.getElementById('challenge-progress-text').textContent = Math.floor(progress) + '%';

                        if (challenge.timeLimit && challengeStartTime) {
                            const elapsed = (Date.now() - challengeStartTime) / 1000;
                            const remaining = Math.max(0, challenge.timeLimit - elapsed);
                            const minutes = Math.floor(remaining / 60);
                            const seconds = Math.floor(remaining % 60);
                            document.getElementById('challenge-timer').textContent = `剩余时间: ${minutes}:${seconds.toString().padStart(2, '0')}`;
                        } else {
                            document.getElementById('challenge-timer').textContent = '无时间限制';
                        }
                    }
                }
            } else {
                statusPanel.style.display = 'none';
                entryPanel.style.display = 'block';
                challengesList.style.display = 'none';
            }
        }

        window.enterChallengeMode = function () {
            if (challengeMode) return;

            challengeMode = true;
            activeChallenge = null;
            challengeStartTime = null;

            updateChallengeUI();
            renderChallengesList();
            saveGame();

            alert(t('enter_challenge_success'));
        };

        window.exitChallengeMode = function () {
            if (!challengeMode) return;

            if (confirm(t('exit_challenge_confirm'))) {
                challengeMode = false;
                activeChallenge = null;
                challengeStartTime = null;

                updateChallengeUI();
                renderChallengesList();
                saveGame();

                alert(t('exit_challenge_success'));
            }
        };

        window.startChallenge = function (challengeId) {
            if (!challengeMode || activeChallenge) return;

            const challenge = challenges.find(c => c.id === challengeId);
            if (!challenge || challenge.completed) return;

            activeChallenge = challengeId;
            challengeStartTime = Date.now();
            resetForChallenge();

            updateChallengeUI();
            renderChallengesList();
            saveGame();

            alert(t('challenge_start_details', challenge.title, challenge.desc, challenge.reward));
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
            if (!challengeMode || !activeChallenge) return;

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

                alert(t('challenge_completed_msg', challenge.title, challenge.reward));

                activeChallenge = null;
                challengeStartTime = null;

                updateChallengeUI();
                renderChallengesList();
                saveGame();
                createParticleBurst();
            }
        }

        function failChallenge() {
            if (!activeChallenge) return;

            const challenge = challenges.find(c => c.id === activeChallenge);
            alert(t('challenge_failed', challenge.title));

            activeChallenge = null;
            challengeStartTime = null;

            updateChallengeUI();
            renderChallengesList();
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
