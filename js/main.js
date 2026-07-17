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

            const editBtnHTML = `<button id="globalEditToggle" class="global-edit-toggle" onclick="toggleGlobalEdit()">✏️ 开启全局编辑</button>`;

            if (settingsLayout === 'grid') {
                wrapper.innerHTML = editBtnHTML + `<div class="settings-grid-cards">
        <div class="settings-card-group">
          <div class="setting-card editable-card">
            <div class="setting-card-icon"><i class="fas fa-save"></i></div>
            <h3 data-i18n="save_management">存档管理</h3>
            <div class="setting-card-actions">
              <button onclick="exportSave()" class="setting-btn"><i class="fas fa-file-export"></i> <span data-i18n="export_save">导出存档</span></button>
              <button onclick="importSave()" class="setting-btn"><i class="fas fa-file-import"></i> <span data-i18n="import_save">导入存档</span></button>
            </div>
          </div>
          <div class="setting-card editable-card">
            <div class="setting-card-icon"><i class="fas fa-language"></i></div>
            <h3 data-i18n="language">语言 / Language</h3>
            <div class="setting-card-actions" id="language-buttons"></div>
            <p class="setting-desc" data-i18n="language_desc">选择界面语言</p>
          </div>
          <div class="setting-card editable-card">
            <div class="setting-card-icon"><i class="fas fa-palette"></i></div>
            <h3 data-i18n="interface_theme">界面主题</h3>
            <div class="setting-card-actions" id="theme-buttons"></div>
            <p class="setting-desc" data-i18n="theme_desc">切换不同视觉风格</p>
          </div>
          <div class="setting-card danger-card editable-card">
            <div class="setting-card-icon"><i class="fas fa-exclamation-triangle"></i></div>
            <h3 data-i18n="danger_operations">危险操作</h3>
            <div class="setting-card-actions">
              <button onclick="deleteSaveConfirm()" class="setting-btn danger-btn"><i class="fas fa-trash-alt"></i> <span data-i18n="delete_save">删档重来</span></button>
            </div>
            <p class="setting-desc" data-i18n="delete_save_desc">彻底清除所有游戏数据，此操作不可恢复！</p>
          </div>
          <div class="setting-card editable-card">
            <div class="setting-card-icon"><i class="fas fa-paint-brush"></i></div>
            <h3 data-i18n="custom_colors">自定义颜色</h3>
            <div class="custom-color-group">
                <div class="custom-color-row"><label data-i18n="text_color">文字颜色</label><input type="color" id="customTextColor" value="#e2e8f0"></div>
                <div class="custom-color-row"><label data-i18n="bg_color">背景颜色</label><input type="color" id="customBgColor" value="#0f172a"></div>
                <div class="custom-color-row"><label data-i18n="theme_color">主题颜色</label><input type="color" id="customPrimaryColor" value="#38bdf8"></div>
            </div>
            <button id="resetCustomColors" class="setting-btn" style="margin-top:12px; width:100%;"><i class="fas fa-undo"></i> <span data-i18n="reset_custom_colors">重置自定义颜色</span></button>
          </div>
        </div>
      </div>`;
            } else {
                wrapper.innerHTML = editBtnHTML + `<div class="settings-sidebar-layout">
        <div class="settings-container">
          <nav class="settings-sidebar">
            <button class="sidebar-item active" data-panel="general"><i class="fas fa-cogs"></i> <span data-i18n="general_tab">通用</span></button>
            <button class="sidebar-item" data-panel="appearance"><i class="fas fa-paint-brush"></i> <span data-i18n="appearance_tab">外观</span></button>
            <button class="sidebar-item" data-panel="danger"><i class="fas fa-skull"></i> <span data-i18n="danger_tab">危险</span></button>
          </nav>
          <div class="settings-content">
            <div class="settings-panel active" data-panel="general">
              <div class="setting-group editable-card">
                <h3 data-i18n="save_management">存档管理</h3>
                <div class="settings-row">
                  <button onclick="exportSave()" class="setting-btn"><i class="fas fa-file-export"></i> <span data-i18n="export_save">导出存档</span></button>
                  <button onclick="importSave()" class="setting-btn"><i class="fas fa-file-import"></i> <span data-i18n="import_save">导入存档</span></button>
                </div>
              </div>
              <div class="setting-group editable-card">
                <h3 data-i18n="language">语言 / Language</h3>
                <div class="settings-row" id="language-buttons"></div>
                <p class="setting-desc" data-i18n="language_desc">选择界面语言</p>
              </div>
            </div>
            <div class="settings-panel" data-panel="appearance">
              <div class="setting-group editable-card">
                <h3 data-i18n="interface_theme">界面主题</h3>
                <div class="settings-row" id="theme-buttons"></div>
                <p class="setting-desc" data-i18n="theme_desc">切换不同视觉风格</p>
              </div>
              <div class="setting-group editable-card">
                <h3 data-i18n="custom_colors">自定义颜色</h3>
                <div class="custom-color-group">
                    <div class="custom-color-row"><label data-i18n="text_color">文字颜色</label><input type="color" id="customTextColor" value="#e2e8f0"></div>
                    <div class="custom-color-row"><label data-i18n="bg_color">背景颜色</label><input type="color" id="customBgColor" value="#0f172a"></div>
                    <div class="custom-color-row"><label data-i18n="theme_color">主题颜色</label><input type="color" id="customPrimaryColor" value="#38bdf8"></div>
                </div>
                <button id="resetCustomColors" class="setting-btn" style="margin-top:12px;"><i class="fas fa-undo"></i> <span data-i18n="reset_custom_colors">重置自定义颜色</span></button>
              </div>
            </div>
            <div class="settings-panel" data-panel="danger">
              <div class="setting-group danger-zone editable-card">
                <h3 data-i18n="danger_operations">危险操作</h3>
                <button onclick="deleteSaveConfirm()" class="setting-btn danger-btn"><i class="fas fa-trash-alt"></i> <span data-i18n="delete_save">删档重来</span></button>
                <p class="setting-desc" data-i18n="delete_save_desc">彻底清除所有游戏数据，此操作不可恢复！</p>
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

            syncGlobalEditButton();
            if (typeof createThemeButtons === 'function') createThemeButtons();
            if (typeof createLanguageSelector === 'function') createLanguageSelector();
            initCustomColorPickers();

            setTimeout(() => {
                if (globalEditMode) applyEditModeToAllCards();
            }, 50);
        }
        function applyEditModeToAllCards() {
            if (!globalEditMode) return;
            document.body.classList.add('edit-mode');
            document.querySelectorAll('.editable-card').forEach(card => {
                // 添加编辑按钮（避免重复）
                if (!card.querySelector('.card-edit-btn')) {
                    const editBtn = document.createElement('button');
                    editBtn.className = 'card-edit-btn';
                    editBtn.innerHTML = '<i class="fas fa-palette"></i>';
                    editBtn.title = '自定义颜色';
                    editBtn.onclick = (e) => {
                        e.stopPropagation();
                        toggleColorEditor(card);
                    };
                    card.appendChild(editBtn);
    
                card.setAttribute('draggable', 'true');
                card.addEventListener('dragstart', handleDragStart);
                card.addEventListener('dragover', handleDragOver);
                card.addEventListener('drop', handleDrop);
                card.addEventListener('dragend', handleDragEnd);
            });

            localStorage.setItem('globalEditMode', 'true');
            if (!silent) alert('编辑模式已开启，可以拖动卡片排序，点击调色板修改颜色。');
        }
        function syncGlobalEditButton() {
            const btn = document.getElementById('globalEditToggle');
            if (!btn) return;
            if (globalEditMode) {
                btn.textContent = '✏️ 关闭全局编辑';
                btn.classList.add('active');
            } else {
                btn.textContent = '✏️ 开启全局编辑';
                btn.classList.remove('active');
            }
        }
        function switchSettingsLayout(layout) {
            settingsLayout = layout;
            localStorage.setItem('settingsLayout', layout);
            document.querySelectorAll('.layout-switch-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.layout === layout);
            });
            renderSettingsContent();
            createThemeButtons();
            createLanguageSelector();
            applyLanguage();
            setTimeout(() => {
                if (globalEditMode) applyEditModeToAllCards();
            }, 50);
        }
        function initSettingsSwitcher() {
            document.querySelectorAll('.layout-switch-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    switchSettingsLayout(btn.dataset.layout);
                });
            });
        }
        const CUSTOM_COLOR_KEYS = {
            text: '--text',
            bg: '--bg-start',
            primary: '--primary'
        };
        function loadCustomColors() {
            const raw = localStorage.getItem('customColors');
            if (!raw) return null;
            try { return JSON.parse(raw); } catch (e) { return null; }
        }
        function saveCustomColors(colors) {
            localStorage.setItem('customColors', JSON.stringify(colors));
        }
        function applyCustomColors(colors) {
            if (!colors) return;
            const root = document.documentElement;
            root.style.setProperty('--text', colors.text || '#e2e8f0');
            root.style.setProperty('--bg-start', colors.bg || '#0f172a');
            root.style.setProperty('--bg-end', colors.bg ? LightenDarkenColor(colors.bg, 20) : '#1e293b');
            root.style.setProperty('--primary', colors.primary || '#38bdf8');
            root.style.setProperty('--primary-rgb', hexToRgb(colors.primary || '#38bdf8').join(', '));
            root.style.setProperty('--shadow', 'rgba(' + hexToRgb(colors.primary || '#38bdf8').join(', ') + ', 0.4)');
            root.style.setProperty('--border', 'rgba(' + hexToRgb(colors.primary || '#38bdf8').join(', ') + ', 0.2)');
            root.style.setProperty('--inner-bg', colors.bg ? LightenDarkenColor(colors.bg, 10) : '#1e293b');
            root.style.setProperty('--panel-bg', colors.bg ? 'rgba(' + hexToRgb(colors.bg).join(', ') + ', 0.5)' : 'rgba(15, 23, 42, 0.5)');
        }
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),















            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16)
            ] : [0, 0, 0];
        }
        function LightenDarkenColor(col, amt) {
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
        // ====================== 全局编辑模式 ======================
        let globalEditMode = false;
        let savedCardStyles = {};
        let savedCardOrder = [];

        // 加载编辑状态和样式
        function loadEditModeState() {
            const saved = localStorage.getItem('globalEditMode');
            if (saved === 'true') {
                enableEditMode(true); // 静默启用
            }
            const styles = localStorage.getItem('cardCustomStyles');
            if (styles) {
                savedCardStyles = JSON.parse(styles);
                applyAllCardStyles();
            }
        }

        // 应用所有保存的卡片样式
        function applyAllCardStyles() {
            Object.keys(savedCardStyles).forEach(selector => {
                const el = document.querySelector(selector);
                if (el) {
                    const style = savedCardStyles[selector];
                    if (style.bg) el.style.backgroundColor = style.bg;
                    if (style.text) el.style.color = style.text;
                    if (style.border) el.style.borderColor = style.border;
                }
            });
        }

        // 切换编辑模式
        function toggleGlobalEdit() {
            globalEditMode = !globalEditMode;
            if (globalEditMode) {
                enableEditMode(false);
            } else {
                disableEditMode();
            }
        }

        function enableEditMode(silent = false) {
            globalEditMode = true;
            document.body.classList.add('edit-mode');
            syncGlobalEditButton();

            // 为所有 editable-card 添加编辑按钮和拖拽事件
            document.querySelectorAll('.editable-card').forEach(card => {
                if (!card.querySelector('.card-edit-btn')) {
                    const editBtn = document.createElement('button');
                    editBtn.className = 'card-edit-btn';
                    editBtn.innerHTML = '<i class="fas fa-palette"></i>';
                    editBtn.title = '自定义颜色';
                    editBtn.onclick = (e) => {
                        e.stopPropagation();
                        toggleColorEditor(card);
                    };
                    card.appendChild(editBtn);
                }
                card.setAttribute('draggable', 'true');
                card.addEventListener('dragstart', handleDragStart);
                card.addEventListener('dragover', handleDragOver);
                card.addEventListener('drop', handleDrop);
                card.addEventListener('dragend', handleDragEnd);
            });

            localStorage.setItem('globalEditMode', 'true');
            if (!silent) alert('编辑模式已开启，可以拖动卡片排序，点击调色板修改颜色。');
        }

        function disableEditMode() {
            globalEditMode = false;
            document.body.classList.remove('edit-mode');
            syncGlobalEditButton();

            // 移除编辑按钮和拖拽事件
            document.querySelectorAll('.card-edit-btn').forEach(b => b.remove());
            document.querySelectorAll('.editable-card').forEach(card => {
                card.removeAttribute('draggable');
                card.removeEventListener('dragstart', handleDragStart);
                card.removeEventListener('dragover', handleDragOver);
                card.removeEventListener('drop', handleDrop);
                card.removeEventListener('dragend', handleDragEnd);
            });

            // 关闭所有颜色弹窗
            document.querySelectorAll('.color-editor-popup').forEach(p => p.remove());
            localStorage.setItem('globalEditMode', 'false');
        }

        // 颜色编辑弹窗
        function toggleColorEditor(card) {
            // 关闭其他弹窗
            document.querySelectorAll('.color-editor-popup').forEach(p => p.remove());
            const selector = buildSelector(card);
            const saved = savedCardStyles[selector] || {};

            const popup = document.createElement('div');
            popup.className = 'color-editor-popup show';
            popup.innerHTML = `
        <div class="color-editor-row">
            <span>背景色</span>
            <input type="color" class="card-bg-color" value="${saved.bg || '#ffffff'}">
        </div>
        <div class="color-editor-row">
            <span>文字色</span>
            <input type="color" class="card-text-color" value="${saved.text || '#e2e8f0'}">
        </div>
        <div class="color-editor-row">
            <span>边框色</span>
            <input type="color" class="card-border-color" value="${saved.border || '#38bdf8'}">
        </div>
        <button class="setting-btn" style="margin-top:8px; padding:6px;" onclick="this.parentElement.remove()">关闭</button>
    `;
            card.appendChild(popup);

            const updateStyle = () => {
                const bg = popup.querySelector('.card-bg-color').value;
                const text = popup.querySelector('.card-text-color').value;
                const border = popup.querySelector('.card-border-color').value;
                card.style.backgroundColor = bg;
                card.style.color = text;
                card.style.borderColor = border;
                card.style.borderStyle = 'solid';
                card.style.borderWidth = '2px';
                card.style.borderRadius = '12px';

                savedCardStyles[selector] = { bg, text, border };
                localStorage.setItem('cardCustomStyles', JSON.stringify(savedCardStyles));
            };

            popup.querySelector('.card-bg-color').addEventListener('input', updateStyle);
            popup.querySelector('.card-text-color').addEventListener('input', updateStyle);
            popup.querySelector('.card-border-color').addEventListener('input', updateStyle);
        }
        function buildSelector(el) {
            let path = [];
            let current = el;
            while (current && current !== document.body && path.length < 5) {
                let selector = current.tagName.toLowerCase();
                if (current.id) {
                    selector += '#' + current.id;
                    path.unshift(selector);
                    break;
                }
                if (current.className) {
                    selector += '.' + Array.from(current.classList).join('.');
                }
                path.unshift(selector);
                current = current.parentElement;
            }
            return path.join(' > ');
        }
        let dragSrcElement = null;
        function handleDragStart(e) {
            dragSrcElement = this;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.outerHTML);
            this.style.opacity = '0.4';
        }
        function handleDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            return false;
        }
        function handleDrop(e) {
            e.stopPropagation();
            if (dragSrcElement !== this) {
                const parent = dragSrcElement.parentNode;
                parent.insertBefore(dragSrcElement, this);
                saveCardOrder();
            }
            return false;
        }
        function handleDragEnd(e) {
            this.style.opacity = '1';
        }
        function saveCardOrder() {
            const order = [];
            document.querySelectorAll('.editable-card').forEach(card => {
                order.push(buildSelector(card));
            });
            localStorage.setItem('cardOrder', JSON.stringify(order));
        }

        function restoreCardOrder() {
            const saved = localStorage.getItem('cardOrder');
            if (!saved) return;
            try {
                const order = JSON.parse(saved);
                order.forEach(selector => {
                    const el = document.querySelector(selector);
                    if (el && el.parentNode) {
                        el.parentNode.appendChild(el);
                    }
                });
            } catch (e) { }
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
            loadEditModeState();
            restoreCardOrder();
            if (globalEditMode) {
                applyEditModeToAllCards();
            }

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

            console.log(`%c ${t('game_title')} V${GAME_VERSION}`, 'color:#38bdf8; font-size:1.2rem; font-weight:bold;');
        }
        window.addEventListener('DOMContentLoaded', init);
