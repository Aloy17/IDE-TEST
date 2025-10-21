function initIDE() {
    const newBtn = document.getElementById('new-btn');
    if (newBtn) {
        newBtn.addEventListener('click', newFile);
    }
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveFile);
    }
    const runBtn = document.getElementById('run-btn');
    if (runBtn) {
        runBtn.addEventListener('click', runCode);
    }
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveFile();
        }
        if (e.key === 'F5') {
            e.preventDefault();
            runCode();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            newFile();
        }
    });
}
function initTheme() {
    const savedTheme = localStorage.getItem('ridley-theme') || 'theme-quiet-light';
    document.body.className = savedTheme + ' loaded';
    updateThemeIcon();
    setTimeout(() => {
        const animatedBg = document.getElementById('animated-background');
        if (animatedBg) {
            animatedBg.classList.add('loaded');
        }
    }, 100);
}
function toggleTheme() {
    const isDarkMode = document.body.classList.contains('theme-dark-modern');
    if (isDarkMode) {
        document.body.className = 'theme-quiet-light loaded';
        localStorage.setItem('ridley-theme', 'theme-quiet-light');
    } else {
        document.body.className = 'theme-dark-modern loaded';
        localStorage.setItem('ridley-theme', 'theme-dark-modern');
    }
    updateThemeIcon();
}
function updateThemeIcon() {
    const isDark = document.body.classList.contains('theme-dark-modern');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    if (sunIcon && moonIcon) {
        if (isDark) {
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    setTimeout(() => {
        initIDE();
    }, 100);
});
document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());