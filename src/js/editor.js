let currentFile = 'untitled.rid';
let currentContent = '';
let openFiles = new Map(); // Map of filename -> {content, savedContent}
let activeFile = 'untitled.rid';
let currentPath = ''; // Current folder path (empty = root)
let expandedFolders = new Set(); // Track which folders are expanded
function initEditor() {
    const editor = document.getElementById('code-editor');
    const lineNumbers = document.getElementById('line-numbers');
    editor.addEventListener('input', updateLineNumbers);
    editor.addEventListener('scroll', syncScroll);
    editor.addEventListener('keydown', handleTab);
    editor.addEventListener('keydown', handleAutoPair);
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
function handleAutoPair(e) {
    const pairs = {
        '(': ')',
        '{': '}',
        '"': '"'
    };
    if (pairs[e.key]) {
        e.preventDefault();
        const editor = e.target;
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const value = editor.value;
        const selectedText = value.substring(start, end);
        const openChar = e.key;
        const closeChar = pairs[e.key];
        editor.value = value.substring(0, start) + openChar + selectedText + closeChar + value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 1;
        updateLineNumbers();
    }
    if (e.key === 'Backspace') {
        const editor = e.target;
        const start = editor.selectionStart;
        const value = editor.value;
        const charBefore = value[start - 1];
        const charAfter = value[start];
        if (pairs[charBefore] && pairs[charBefore] === charAfter) {
            e.preventDefault();
            editor.value = value.substring(0, start - 1) + value.substring(start + 1);
            editor.selectionStart = editor.selectionEnd = start - 1;
            updateLineNumbers();
        }
    }
}
async function loadFiles(subPath = '', depth = 0) {
    try {
        const items = await window.electronAPI.getFiles(subPath);
        const filesList = document.getElementById('files-list');
        if (depth === 0) {
            filesList.innerHTML = '';
            if (files.length === 0) {
                filesList.innerHTML = '<div style="padding: 8px; color: var(--color-text-secondary); font-size: 12px;">No files yet</div>';
                return;
            }
        }
        items.sort((a, b) => {
            if (a.isDirectory && !b.isDirectory) return -1;
            if (!a.isDirectory && b.isDirectory) return 1;
            return a.name.localeCompare(b.name);
        });
        for (const item of items) {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.style.paddingLeft = `${8 + depth * 16}px`;
            fileItem.dataset.path = item.path;
            fileItem.dataset.name = item.name;
            fileItem.dataset.isDirectory = item.isDirectory;
            fileItem.dataset.depth = depth;
            fileItem.draggable = true;
            if (item.isDirectory) {
                fileItem.classList.add('folder');
                const isExpanded = expandedFolders.has(item.path);
                const arrow = document.createElement('span');
                arrow.className = 'folder-arrow';
                arrow.textContent = isExpanded ? '▼' : '▶';
                fileItem.appendChild(arrow);
                const icon = document.createElement('span');
                icon.className = 'file-icon';
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;
                fileItem.appendChild(icon);
                const fileName = document.createElement('span');
                fileName.className = 'file-name';
                fileName.textContent = item.name;
                fileItem.appendChild(fileName);
                fileItem.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    if (expandedFolders.has(item.path)) {
                        expandedFolders.delete(item.path);
                    } else {
                        expandedFolders.add(item.path);
                    }
                    await loadFiles();
                });
            } else {
                const icon = document.createElement('span');
                icon.className = 'file-icon';
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`;
                fileItem.appendChild(icon);
                const fileName = document.createElement('span');
                fileName.className = 'file-name';
                fileName.textContent = item.name;
                fileItem.appendChild(fileName);
                fileItem.addEventListener('click', () => openFile(item.path));
            }
            setupDragAndDrop(fileItem, item);
            filesList.appendChild(fileItem);
            if (item.isDirectory && expandedFolders.has(item.path)) {
                await loadFiles(item.path, depth + 1);
            }
        }
    } catch (err) {
        console.error('Failed to load files:', err);
    }
}
function setupDragAndDrop(fileItem, item) {
    fileItem.addEventListener('dragstart', (e) => {
        fileItem.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', JSON.stringify({
            path: item.path,
            name: item.name,
            isDirectory: item.isDirectory
        }));
    });
    fileItem.addEventListener('dragend', (e) => {
        fileItem.classList.remove('dragging');
        document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    });
    if (item.isDirectory) {
        fileItem.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            const draggedData = e.dataTransfer.types.includes('text/plain');
            if (draggedData && !fileItem.classList.contains('dragging')) {
                fileItem.classList.add('drag-over');
            }
        });
        fileItem.addEventListener('dragleave', (e) => {
            if (e.target === fileItem) {
                fileItem.classList.remove('drag-over');
            }
        });
        fileItem.addEventListener('drop', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            fileItem.classList.remove('drag-over');
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            const sourcePath = data.path;
            const targetFolderPath = item.path;
            if (sourcePath === targetFolderPath) {
                return;
            }
            await moveFileOrFolder(sourcePath, targetFolderPath, data.name);
        });
    }
}
async function moveFileOrFolder(sourcePath, targetFolderPath, itemName) {
    try {
        const result = await window.electronAPI.moveFile(sourcePath, targetFolderPath);
        if (result.success) {
            await loadFiles();
            updateOutputPanel('info', `> Moved ${itemName} to ${targetFolderPath}`);
        } else {
            updateOutputPanel('error', `> Error moving ${itemName}: ${result.error}`);
        }
    } catch (err) {
        updateOutputPanel('error', `> Error moving file: ${err.message}`);
    }
}
async function openFile(filename) {
    try {
        console.log('Opening file:', filename);
        console.log('Currently open files:', Array.from(openFiles.keys()));
        if (openFiles.has(filename)) {
            console.log('File already open, switching to it');
            switchToFile(filename);
            return;
        }
        const result = await window.electronAPI.loadFile(filename);
        if (result.success) {
            console.log('File loaded successfully:', filename);
            openFiles.set(filename, {
                content: result.content,
                savedContent: result.content
            });
            activeFile = filename;
            currentFile = filename;
            currentContent = result.content;
            const editor = document.getElementById('code-editor');
            editor.value = result.content;
            updateLineNumbers();
            updateActiveFile(filename);
            addFileTab(filename);
        } else {
            updateOutputPanel('error', `> Error: ${result.error}`);
        }
    } catch (err) {
        console.error('Error opening file:', err);
        updateOutputPanel('error', `> Error opening file: ${err.message}`);
    }
}
function switchToFile(filename) {
    if (!openFiles.has(filename)) return;
    if (activeFile && openFiles.has(activeFile)) {
        const editor = document.getElementById('code-editor');
        openFiles.get(activeFile).content = editor.value;
    }
    activeFile = filename;
    currentFile = filename;
    const fileData = openFiles.get(filename);
    currentContent = fileData.savedContent;
    const editor = document.getElementById('code-editor');
    editor.value = fileData.content;
    updateLineNumbers();
    updateActiveFile(filename);
    setActiveTab(filename);
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
function addFileTab(filename) {
    console.log('Adding file tab:', filename);
    const fileTabs = document.getElementById('file-tabs');
    const existingTab = fileTabs.querySelector(`[data-file="${filename}"]`);
    if (existingTab) {
        console.log('Tab already exists, setting active');
        setActiveTab(filename);
        return;
    }
    console.log('Creating new tab');
    const tab = document.createElement('div');
    tab.className = 'file-tab active';
    tab.dataset.file = filename;
    const tabName = document.createElement('span');
    tabName.className = 'tab-name';
    tabName.textContent = filename;
    const closeBtn = document.createElement('span');
    closeBtn.className = 'tab-close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', (e) => {
        console.log('Close button clicked for:', filename);
        e.stopPropagation();
        closeFileTab(filename);
    });
    tab.appendChild(tabName);
    tab.appendChild(closeBtn);
    tab.addEventListener('click', () => {
        console.log('Tab clicked:', filename);
        switchToFile(filename);
    });
    setupTabDragAndDrop(tab);
    fileTabs.querySelectorAll('.file-tab').forEach(t => t.classList.remove('active'));
    fileTabs.appendChild(tab);
    console.log('Tab added successfully');
}
function setupTabDragAndDrop(tab) {
    tab.draggable = true;
    tab.addEventListener('dragstart', (e) => {
        tab.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', tab.dataset.file);
    });
    tab.addEventListener('dragend', (e) => {
        tab.classList.remove('dragging');
        document.querySelectorAll('.file-tab').forEach(t => {
            t.classList.remove('drag-over-left', 'drag-over-right');
        });
    });
    tab.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingTab = document.querySelector('.file-tab.dragging');
        if (!draggingTab || draggingTab === tab) return;
        const rect = tab.getBoundingClientRect();
        const midpoint = rect.left + rect.width / 2;
        tab.classList.remove('drag-over-left', 'drag-over-right');
        if (e.clientX < midpoint) {
            tab.classList.add('drag-over-left');
        } else {
            tab.classList.add('drag-over-right');
        }
    });
    tab.addEventListener('dragleave', (e) => {
        tab.classList.remove('drag-over-left', 'drag-over-right');
    });
    tab.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggingTab = document.querySelector('.file-tab.dragging');
        if (!draggingTab || draggingTab === tab) return;
        const rect = tab.getBoundingClientRect();
        const midpoint = rect.left + rect.width / 2;
        const fileTabs = document.getElementById('file-tabs');
        if (e.clientX < midpoint) {
            fileTabs.insertBefore(draggingTab, tab);
        } else {
            fileTabs.insertBefore(draggingTab, tab.nextSibling);
        }
        tab.classList.remove('drag-over-left', 'drag-over-right');
    });
}
function setActiveTab(filename) {
    const fileTabs = document.getElementById('file-tabs');
    fileTabs.querySelectorAll('.file-tab').forEach(tab => {
        if (tab.dataset.file === filename) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}
function closeFileTab(filename) {
    console.log('Closing file tab:', filename);
    console.log('Open files before close:', Array.from(openFiles.keys()));
    if (openFiles.size <= 1) {
        console.log('Cannot close - only one file open');
        return;
    }
    openFiles.delete(filename);
    console.log('Open files after delete:', Array.from(openFiles.keys()));
    const fileTabs = document.getElementById('file-tabs');
    const tab = fileTabs.querySelector(`[data-file="${filename}"]`);
    if (tab) {
        console.log('Removing tab element');
        tab.remove();
    } else {
        console.log('Tab element not found!');
    }
    if (activeFile === filename) {
        const remainingFile = Array.from(openFiles.keys())[0];
        console.log('Switching to remaining file:', remainingFile);
        if (remainingFile) {
            switchToFile(remainingFile);
        }
    }
}
function newFile() {
    console.log('Creating new file with inline rename');
    const filesList = document.getElementById('files-list');
    const renameItem = document.createElement('div');
    renameItem.className = 'file-item editing';
    const icon = document.createElement('span');
    icon.textContent = '📄 ';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'inline-rename-input';
    input.placeholder = 'untitled.rid';
    input.value = 'untitled.rid';
    renameItem.appendChild(icon);
    renameItem.appendChild(input);
    const firstFile = Array.from(filesList.children).find(item => !item.classList.contains('folder'));
    if (firstFile) {
        filesList.insertBefore(renameItem, firstFile);
    } else {
        filesList.appendChild(renameItem);
    }
    input.focus();
    const dotIndex = input.value.lastIndexOf('.');
    if (dotIndex > 0) {
        input.setSelectionRange(0, dotIndex);
    } else {
        input.select();
    }
    const finishRename = async () => {
        let fileName = input.value.trim();
        if (!fileName) {
            renameItem.remove();
            return;
        }
        if (!fileName.endsWith('.rid')) {
            fileName += '.rid';
        }
        const invalidChars = /[<>:"/\\|?*]/;
        if (invalidChars.test(fileName)) {
            updateOutputPanel('error', '> File name contains invalid characters: < > : " / \\ | ? *');
            input.focus();
            input.select();
            return;
        }
        let uniqueName = fileName;
        let counter = 1;
        while (openFiles.has(uniqueName)) {
            const namePart = fileName.replace('.rid', '');
            uniqueName = `${namePart}${counter}.rid`;
            counter++;
        }
        const newContent = '~ Write your RID code here ~\n\n';
        openFiles.set(uniqueName, {
            content: newContent,
            savedContent: ''
        });
        activeFile = uniqueName;
        currentFile = uniqueName;
        currentContent = '';
        const editor = document.getElementById('code-editor');
        editor.value = newContent;
        updateLineNumbers();
        addFileTab(uniqueName);
        renameItem.remove();
        await loadFiles();
    };
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            finishRename();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            renameItem.remove();
        }
    });
    input.addEventListener('blur', () => {
        setTimeout(() => finishRename(), 100);
    });
}
async function saveFile() {
    const editor = document.getElementById('code-editor');
    const content = editor.value;
    try {
        if (currentFile.startsWith('untitled')) {
            const result = await window.electronAPI.saveFileDialog(content);
            if (result.canceled) {
                return;
            }
            if (result.success) {
                const oldFilename = currentFile;
                const newFilename = result.filename;
                openFiles.delete(oldFilename);
                openFiles.set(newFilename, {
                    content: content,
                    savedContent: content
                });
                currentFile = newFilename;
                activeFile = newFilename;
                currentContent = content;
                const fileTabs = document.getElementById('file-tabs');
                const tab = fileTabs.querySelector(`[data-file="${oldFilename}"]`);
                if (tab) {
                    tab.dataset.file = newFilename;
                    tab.querySelector('.tab-name').textContent = newFilename;
                }
                await loadFiles();
            } else {
                updateOutputPanel('error', `> Error: ${result.error}`);
            }
        } else {
            const result = await window.electronAPI.saveFile(currentFile, content);
            if (result.success) {
                currentContent = content;
                if (openFiles.has(currentFile)) {
                    openFiles.get(currentFile).savedContent = content;
                    openFiles.get(currentFile).content = content;
                }
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
    clearErrorHighlight();
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
            highlightErrorLine(result.error);
        }
    } catch (err) {
        updateOutputPanel('error', `> Execution error: ${err.message}`);
    }
}
function highlightErrorLine(errorMessage) {
    const lineMatch = errorMessage.match(/Line (\d+):/);
    if (lineMatch) {
        const lineNumber = parseInt(lineMatch[1]);
        const editor = document.getElementById('code-editor');
        const lines = editor.value.split('\n');
        if (lineNumber > 0 && lineNumber <= lines.length) {
            const errorLine = lines[lineNumber - 1];
            const start = lines.slice(0, lineNumber - 1).join('\n').length + (lineNumber > 1 ? 1 : 0);
            const end = start + errorLine.length;
            editor.focus();
            editor.setSelectionRange(start, end);
            editor.scrollTop = Math.max(0, (lineNumber - 5) * 20);
            const lineNumbers = document.getElementById('line-numbers');
            lineNumbers.scrollTop = editor.scrollTop;
        }
    }
}
function clearErrorHighlight() {
    const editor = document.getElementById('code-editor');
    if (editor.selectionStart !== editor.selectionEnd) {
        editor.setSelectionRange(editor.value.length, editor.value.length);
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
function initInputHandler() {
    window.electronAPI.onInputPrompt((prompt) => {
        const outputContent = document.getElementById('output-content');
        const promptLine = document.createElement('div');
        promptLine.className = 'output-line input-prompt';
        promptLine.textContent = prompt;
        outputContent.appendChild(promptLine);
        const inputContainer = document.createElement('div');
        inputContainer.className = 'output-line input-container';
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.className = 'input-field';
        inputField.placeholder = 'Type your input and press Enter...';
        inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const userInput = inputField.value;
                const inputEcho = document.createElement('div');
                inputEcho.className = 'output-line input-echo';
                inputEcho.textContent = userInput;
                outputContent.appendChild(inputEcho);
                inputContainer.remove();
                window.electronAPI.sendInput(userInput);
                outputContent.scrollTop = outputContent.scrollHeight;
            }
        });
        inputContainer.appendChild(inputField);
        outputContent.appendChild(inputContainer);
        inputField.focus();
        outputContent.scrollTop = outputContent.scrollHeight;
    });
}
function initResizers() {
    const sidebarResizer = document.getElementById('sidebar-resizer');
    const sidebar = document.querySelector('.sidebar');
    let isResizingSidebar = false;
    sidebarResizer.addEventListener('mousedown', (e) => {
        isResizingSidebar = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    });
    document.addEventListener('mousemove', (e) => {
        if (isResizingSidebar) {
            const newWidth = e.clientX;
            if (newWidth >= 150 && newWidth <= 400) {
                sidebar.style.width = `${newWidth}px`;
            }
        }
    });
    document.addEventListener('mouseup', () => {
        if (isResizingSidebar) {
            isResizingSidebar = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    });
    const horizontalResizer = document.getElementById('horizontal-resizer');
    const editorPanel = document.querySelector('.editor-panel');
    const outputPanel = document.querySelector('.output-panel');
    let isResizingHorizontal = false;
    horizontalResizer.addEventListener('mousedown', (e) => {
        isResizingHorizontal = true;
        document.body.style.cursor = 'row-resize';
        document.body.style.userSelect = 'none';
    });
    document.addEventListener('mousemove', (e) => {
        if (isResizingHorizontal) {
            const container = document.querySelector('.main-area');
            const containerRect = container.getBoundingClientRect();
            const newEditorHeight = e.clientY - containerRect.top;
            const minHeight = 200;
            const maxHeight = containerRect.height - 100;
            if (newEditorHeight >= minHeight && newEditorHeight <= maxHeight) {
                editorPanel.style.flex = 'none';
                editorPanel.style.height = `${newEditorHeight}px`;
                outputPanel.style.flex = '1';
            }
        }
    });
    document.addEventListener('mouseup', () => {
        if (isResizingHorizontal) {
            isResizingHorizontal = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    });
}
function deleteFile() {
    if (currentFile.startsWith('untitled')) {
        updateOutputPanel('info', '> Cannot delete unsaved file');
        return;
    }
    if (confirm(`Delete ${currentFile}?`)) {
        window.electronAPI.deleteFile(currentFile)
            .then(result => {
                if (result.success) {
                    closeFileTab(currentFile);
                    if (openFiles.size === 0) {
                        newFile();
                    }
                    loadFiles();
                } else {
                    updateOutputPanel('error', `> Error: ${result.error}`);
                }
            })
            .catch(err => {
                updateOutputPanel('error', `> Error: ${err.message}`);
            });
    }
}
function copyCode() {
    const editor = document.getElementById('code-editor');
    const code = editor.value;
    navigator.clipboard.writeText(code)
        .then(() => {
        })
        .catch(err => {
            updateOutputPanel('error', '> Failed to copy code');
        });
}
function clearOutput() {
    const outputContent = document.getElementById('output-content');
    outputContent.innerHTML = '<div class="output-line ready">&gt; Output cleared</div>';
}
async function createFolder() {
    console.log('Creating new folder with inline rename');
    const filesList = document.getElementById('files-list');
    const renameItem = document.createElement('div');
    renameItem.className = 'file-item folder editing';
    const icon = document.createElement('span');
    icon.textContent = '📁 ';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'inline-rename-input';
    input.placeholder = 'New Folder';
    input.value = 'New Folder';
    renameItem.appendChild(icon);
    renameItem.appendChild(input);
    filesList.insertBefore(renameItem, filesList.firstChild);
    input.focus();
    input.select();
    const finishRename = async () => {
        const folderName = input.value.trim();
        if (!folderName) {
            renameItem.remove();
            return;
        }
        const invalidChars = /[<>:"/\\|?*]/;
        if (invalidChars.test(folderName)) {
            updateOutputPanel('error', '> Folder name contains invalid characters: < > : " / \\ | ? *');
            input.focus();
            input.select();
            return;
        }
        try {
            const result = await window.electronAPI.createFolder(folderName);
            if (result.success) {
                renameItem.remove();
                await loadFiles(); // Refresh file list
            } else {
                updateOutputPanel('error', `> Error: ${result.error}`);
                input.focus();
                input.select();
            }
        } catch (err) {
            updateOutputPanel('error', `> Error creating folder: ${err.message}`);
            input.focus();
            input.select();
        }
    };
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            finishRename();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            renameItem.remove();
        }
    });
    input.addEventListener('blur', () => {
        setTimeout(() => finishRename(), 100);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initEditor();
        loadFiles();
        initResizers();
        initInputHandler();
        openFiles.set('untitled.rid', {
            content: '~ Write your RID code here ~\n\n',
            savedContent: ''
        });
        const initialTab = document.querySelector('.file-tab[data-file="untitled.rid"]');
        if (initialTab) {
            const closeBtn = initialTab.querySelector('.tab-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeFileTab('untitled.rid');
                });
            }
            initialTab.addEventListener('click', () => {
                switchToFile('untitled.rid');
            });
            setupTabDragAndDrop(initialTab);
        }
        document.getElementById('run-btn').addEventListener('click', runCode);
        document.getElementById('delete-btn').addEventListener('click', deleteFile);
        document.getElementById('save-btn').addEventListener('click', saveFile);
        document.getElementById('new-file-btn').addEventListener('click', newFile);
        document.getElementById('new-folder-btn').addEventListener('click', createFolder);
        const clearBtn = document.querySelector('.clear-output');
        if (clearBtn) {
            clearBtn.addEventListener('click', clearOutput);
        }
        setupFilesListDropZone();
    }, 100);
});
function setupFilesListDropZone() {
    const filesList = document.getElementById('files-list');
    filesList.addEventListener('dragover', (e) => {
        if (!e.target.closest('.file-item')) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            filesList.style.backgroundColor = 'var(--color-hover-bg)';
        }
    });
    filesList.addEventListener('dragleave', (e) => {
        if (e.target === filesList) {
            filesList.style.backgroundColor = '';
        }
    });
    filesList.addEventListener('drop', async (e) => {
        if (!e.target.closest('.file-item')) {
            e.preventDefault();
            e.stopPropagation();
            filesList.style.backgroundColor = '';
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            const sourcePath = data.path;
            if (!sourcePath.includes('/') && !sourcePath.includes('\\')) {
                return; // Already at root
            }
            await moveFileOrFolder(sourcePath, '', data.name);
        }
    });
}