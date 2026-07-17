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
            renderUpgrades();
            renderAchievements();
            renderChallengesGrid();
            renderChallengesList();
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
                renderChallengesList();
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
