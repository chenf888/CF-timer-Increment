        function formatStatValue(decimal) {
            let d = D(decimal);
            if (d.eq(0)) return '0';
            if (d.abs().lt(1000)) return d.toFixed(2);
            if (d.abs().lt(1e6)) return d.toFixed(0);
            return d.toExponential(2).replace(/\+/g, '');
        }
        function formatDuration(ms) {
            if (ms < 0) ms = 0;
            const totalSeconds = Math.floor(ms / 1000);
            const days = Math.floor(totalSeconds / 86400);
            const hours = Math.floor((totalSeconds % 86400) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            const parts = [];
            if (days > 0) parts.push(days + '天');
            parts.push(String(hours).padStart(2, '0') + '时');
            parts.push(String(minutes).padStart(2, '0') + '分');
            parts.push(String(seconds).padStart(2, '0') + '秒');
            return parts.join(' ');
        }
        function updateTimer() {
            if (!isRunning) return;
            const now = Date.now();
            const elapsed = (now - lastUpdate) / 1000;
            lastUpdate = now;

            const effectiveSpeed = speed;
            const gain = effectiveSpeed.times(elapsed);
            seconds = seconds.plus(gain);
            accumulatedSeconds = accumulatedSeconds.plus(gain);

            while (seconds.gte(60)) {
                seconds = seconds.minus(60);
                cycleCount = cycleCount.plus(1);
                const cycleMinuteGain = D(1).plus(cycleBonusMinutes).times(minuteMultiplier);
                minutes = minutes.plus(cycleMinuteGain);
            }

            minutes = minutes.plus(autoMinutesPerSecond.times(elapsed));
            seconds = seconds.plus(autoSecondsPerSecond.times(elapsed));

            if (challengeMode) {
                checkChallengeCompletion();
                updateChallengeUI();
                renderChallengesList();
            }

            if (seconds.gt(maxSpeed)) {
                maxSpeed = seconds;
            }

            const progressDeg = (seconds.toNumber() / 60) * 360;
            if (timerCircle) {
                timerCircle.style.setProperty('--progress', progressDeg + 'deg');
            }
            if (currentSecondsEl) {
                currentSecondsEl.textContent = Math.floor(seconds.toNumber());
            }
            if (accumulatedSecondsEl) {
                accumulatedSecondsEl.textContent = format(accumulatedSeconds);
            }
            if (cyclesEl) {
                cyclesEl.textContent = format(cycleCount);
            }
            if (speedMultiplierEl) {
                speedMultiplierEl.textContent = speed.toFixed(1) + 'x';
            }

            const minuteDisplay = document.getElementById('minuteDisplay');
            if (minuteDisplay) {
                minuteDisplay.textContent = format(minutes);
            }

            updateUpgradeAffordability();
            renderAchievementsThrottled();

            if (typeof saveGame === 'function') saveGame();
        }
        function startTimer() {
            if (isRunning) return;
            isRunning = true;
            lastUpdate = Date.now();
            const startBtn = document.getElementById('startBtn');
            if (startBtn) {
                startBtn.innerHTML = '<i class="fas fa-pause"></i> <span data-i18n="pause">暂停</span>';
                startBtn.onclick = () => pauseTimer();
                applyLanguage();
            }
        }
        function pauseTimer() {
            isRunning = false;
            const startBtn = document.getElementById('startBtn');
            if (startBtn) {
                startBtn.innerHTML = '<i class="fas fa-play"></i> <span data-i18n="play">开始</span>';
                startBtn.onclick = () => startTimer();
                applyLanguage();
            }
        }
        function resetTimer() {
            if (challengeMode) {
                alert(t('cannot_reset_in_challenge') || '挑战模式中无法重置');
                return;
            }
            if (!confirm(t('reset_confirm') || '确定要重置计时器吗？此操作不可恢复！')) return;
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
            updateTimer();
            if (typeof saveGame === 'function') saveGame();
        }
        function exportSave() {
            const data = JSON.stringify(getSaveData());
            const encoded = btoa(unescape(encodeURIComponent(data)));
            navigator.clipboard.writeText(encoded).then(() => {
                alert(t('export_success') || '存档已复制到剪贴板！');
            }).catch(() => {
                prompt(t('copy_manually') || '请手动复制：', encoded);
            });
        }
        function importSave() {
            let txt = prompt(t('paste_save') || '请粘贴存档数据：');
            if (!txt) return;
            try {
                let decoded = txt;
                try {
                    decoded = decodeURIComponent(escape(atob(txt)));
                } catch (e) {


























                    console.log("base64解码失败，使用原始字符串:", e.message);
                    decoded = txt;
                }

                const parsed = JSON.parse(decoded);
                console.log("JSON解析成功，数据键:", Object.keys(parsed));

                localStorage.setItem(SAVE_KEY, decoded);
                alert(t("import_success"));
                location.reload();
            } catch (e) {
                console.error("导入失败:", e);
                alert(t("import_error") + "
" + e.message);
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

