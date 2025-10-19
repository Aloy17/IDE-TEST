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

document.addEventListener('DOMContentLoaded', () => {
    console.log('RID IDE Initialized');
    
    setTimeout(() => {
        initIDE();
    }, 100);
});

window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());
