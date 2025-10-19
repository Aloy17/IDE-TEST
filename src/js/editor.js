let currentFile = 'untitled.rid';
let currentContent = '';

function initEditor() {
    const editor = document.getElementById('code-editor');
    const lineNumbers = document.getElementById('line-numbers');

    editor.addEventListener('input', updateLineNumbers);
    editor.addEventListener('scroll', syncScroll);
    editor.addEventListener('keydown', handleTab);

    updateLineNumbers();
}

function updateLineNumbers() {
    const editor = document.getElementById('code-editor');
    const lineNumbers = document.getElementById('line-numbers');
    
    const lines = editor.value.split('\n');
    const lineNumbersText = lines.map((_, i) => i + 1).join('\n');
    
    lineNumbers.textContent = lineNumbersText;
}

function syncScroll() {
    const editor = document.getElementById('code-editor');
    const lineNumbers = document.getElementById('line-numbers');
    
    lineNumbers.scrollTop = editor.scrollTop;
}

function handleTab(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        
        const editor = e.target;
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        
        const value = editor.value;
        editor.value = value.substring(0, start) + '  ' + value.substring(end);
        
        editor.selectionStart = editor.selectionEnd = start + 2;
    }
}

async function loadFiles() {
    try {
        const files = await window.electronAPI.getFiles();
        const filesList = document.getElementById('files-list');
        
        filesList.innerHTML = '';
        
        if (files.length === 0) {
            filesList.innerHTML = '<div style="padding: 10px; color: #6b7280;">No files yet</div>';
            return;
        }
        
        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.textContent = `📄 ${file}`;
            fileItem.addEventListener('click', () => openFile(file));
            filesList.appendChild(fileItem);
        });
    } catch (err) {
        console.error('Failed to load files:', err);
    }
}

async function openFile(filename) {
    try {
        const result = await window.electronAPI.loadFile(filename);
        
        if (result.success) {
            const editor = document.getElementById('code-editor');
            editor.value = result.content;
            currentFile = filename;
            currentContent = result.content;
            
            updateLineNumbers();
            updateActiveFile(filename);
            updateOutputPanel('info', `> Opened ${filename}`);
            
            updateFileTab(filename);
        } else {
            updateOutputPanel('error', `> Error: ${result.error}`);
        }
    } catch (err) {
        updateOutputPanel('error', `> Error opening file: ${err.message}`);
    }
}

function updateActiveFile(filename) {
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach(item => {
        if (item.textContent.includes(filename)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function updateFileTab(filename) {
    const fileTabs = document.getElementById('file-tabs');
    fileTabs.innerHTML = `
        <div class="file-tab active" data-file="${filename}">
            <span class="tab-name">${filename}</span>
        </div>
    `;
}

function newFile() {
    const editor = document.getElementById('code-editor');
    editor.value = '~ Write your RID code here ~\n\n';
    currentFile = 'untitled.rid';
    currentContent = '';
    
    updateLineNumbers();
    updateFileTab('untitled.rid');
    updateOutputPanel('info', '> New file created...');
}

async function saveFile() {
    const editor = document.getElementById('code-editor');
    const content = editor.value;
    
    try {
        if (currentFile === 'untitled.rid') {
            const result = await window.electronAPI.saveFileDialog(content);
            
            if (result.canceled) {
                return;
            }
            
            if (result.success) {
                currentFile = result.filename;
                currentContent = content;
                updateOutputPanel('success', `> File saved as ${result.filename}`);
                updateFileTab(result.filename);
                await loadFiles();
            } else {
                updateOutputPanel('error', `> Error: ${result.error}`);
            }
        } else {
            const result = await window.electronAPI.saveFile(currentFile, content);
            
            if (result.success) {
                currentContent = content;
                updateOutputPanel('success', `> File saved: ${currentFile}`);
            } else {
                updateOutputPanel('error', `> Error: ${result.error}`);
            }
        }
    } catch (err) {
        updateOutputPanel('error', `> Error saving file: ${err.message}`);
    }
}

async function runCode() {
    const editor = document.getElementById('code-editor');
    const code = editor.value;
    
    const outputContent = document.getElementById('output-content');
    outputContent.innerHTML = '<div class="output-line info">&gt; Running...</div>';
    
    try {
        const result = await window.electronAPI.executeRID(code);
        
        outputContent.innerHTML = '';
        
        if (result.success) {
            const lines = result.output.split('\n');
            lines.forEach(line => {
                if (line.trim()) {
                    updateOutputPanel('success', line);
                }
            });
            
            if (lines.length === 0 || lines.every(l => !l.trim())) {
                updateOutputPanel('success', '> Program executed successfully (no output)');
            }
        } else {
            updateOutputPanel('error', `> ${result.error}`);
        }
    } catch (err) {
        updateOutputPanel('error', `> Execution error: ${err.message}`);
    }
}

function updateOutputPanel(type, message) {
    const outputContent = document.getElementById('output-content');
    const line = document.createElement('div');
    line.className = `output-line ${type}`;
    line.textContent = message;
    outputContent.appendChild(line);
    
    outputContent.scrollTop = outputContent.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initEditor();
        loadFiles();
    }, 100);
});
