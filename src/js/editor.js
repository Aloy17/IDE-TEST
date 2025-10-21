let currentFile = 'untitled.rid';
let currentContent = '';
let openFiles = new Map(); // Map of filename -> {content, savedContent}
let activeFile = 'untitled.rid';
let currentPath = ''; // Current folder path (empty = root)
let expandedFolders = new Set(); // Track which folders are expanded
let isLoadingFiles = false; // Prevent concurrent loadFiles calls
let inputPromptQueue = []; // Queue for input prompts
let isWaitingForInput = false; // Flag to track if currently waiting for input
let lastLineCount = 0; // Track line count for optimization
let lineNumberUpdateTimeout = null; // Debounce timeout
const MAX_OUTPUT_LINES = 1000; // Maximum output lines to keep
let outputLineCount = 0; // Track output line count
function initEditor() {
    const editor = document.getElementById('code-editor');
    const lineNumbers = document.getElementById('line-numbers');
    editor.addEventListener('input', debouncedUpdateLineNumbers);
    editor.addEventListener('scroll', syncScroll);
    editor.addEventListener('keydown', handleTab);
    editor.addEventListener('keydown', handleAutoPair);
    updateLineNumbers();
}

function debouncedUpdateLineNumbers() {
    // Debounce to run at most every 100ms
    if (lineNumberUpdateTimeout) {
        clearTimeout(lineNumberUpdateTimeout);
    }
    lineNumberUpdateTimeout = setTimeout(() => {
        updateLineNumbers();
    }, 100);
}

function updateLineNumbers() {
    const editor = document.getElementById('code-editor');
    const lineNumbers = document.getElementById('line-numbers');
    const lines = editor.value.split('\n');
    const currentLineCount = lines.length;
    
    // Only update if line count changed
    if (currentLineCount === lastLineCount) {
        return;
    }
    
    lastLineCount = currentLineCount;
    
    // Use textContent directly instead of creating array and joining
    let lineNumbersText = '';
    for (let i = 1; i <= currentLineCount; i++) {
        lineNumbersText += i + (i < currentLineCount ? '\n' : '');
    }
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
    
    // Handle Enter key for smart indentation
    if (e.key === 'Enter') {
        const editor = e.target;
        const start = editor.selectionStart;
        const value = editor.value;
        const charBefore = value[start - 1];
        const charAfter = value[start];
        
        // Check if cursor is between braces
        if (charBefore === '{' && charAfter === '}') {
            e.preventDefault();
            
            // Get current line to calculate indentation
            const lines = value.substring(0, start).split('\n');
            const currentLine = lines[lines.length - 1];
            const currentIndent = currentLine.match(/^\s*/)[0];
            const indent = '    '; // 4 spaces
            
            // Insert newline, indent, cursor position, newline, and closing brace indentation
            const newText = '\n' + currentIndent + indent + '\n' + currentIndent;
            editor.value = value.substring(0, start) + newText + value.substring(start);
            
            // Place cursor on the indented line
            const newCursorPos = start + currentIndent.length + indent.length + 1;
            editor.selectionStart = editor.selectionEnd = newCursorPos;
            updateLineNumbers();
            return;
        }
        
        // Regular Enter - maintain current indentation
        const lines = value.substring(0, start).split('\n');
        const currentLine = lines[lines.length - 1];
        const currentIndent = currentLine.match(/^\s*/)[0];
        
        // If line ends with {, add extra indentation
        if (charBefore === '{') {
            e.preventDefault();
            const indent = '    ';
            const newText = '\n' + currentIndent + indent;
            editor.value = value.substring(0, start) + newText + value.substring(start);
            editor.selectionStart = editor.selectionEnd = start + newText.length;
            updateLineNumbers();
            return;
        }
        
        // Otherwise just maintain current indentation
        if (currentIndent) {
            e.preventDefault();
            const newText = '\n' + currentIndent;
            editor.value = value.substring(0, start) + newText + value.substring(start);
            editor.selectionStart = editor.selectionEnd = start + newText.length;
            updateLineNumbers();
        }
    }
    
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
    // Prevent concurrent loadFiles calls at root level
    if (depth === 0) {
        if (isLoadingFiles) {
            return;
        }
        isLoadingFiles = true;
    }
    
    try {
        const items = await window.electronAPI.getFiles(subPath);
        const filesList = document.getElementById('files-list');
        
        // Clear the list only once at the root level
        if (depth === 0) {
            filesList.innerHTML = '';
            if (items.length === 0) {
                filesList.innerHTML = '<div style="padding: 8px; color: var(--color-text-secondary); font-size: 12px;">No files yet</div>';
                isLoadingFiles = false;
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
            
            // Await recursive folder loading to ensure proper order
            if (item.isDirectory && expandedFolders.has(item.path)) {
                await loadFiles(item.path, depth + 1);
            }
        }
    } catch (err) {
        console.error('Failed to load files:', err);
    } finally {
        // Release the loading flag at root level
        if (depth === 0) {
            isLoadingFiles = false;
        }
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
            // Only remove class when actually leaving the element
            const rect = fileItem.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
                fileItem.classList.remove('drag-over');
            }
        });
        fileItem.addEventListener('drop', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            fileItem.classList.remove('drag-over');
            
            try {
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                const sourcePath = data.path;
                const targetFolderPath = item.path;
                
                if (sourcePath === targetFolderPath) {
                    return;
                }
                
                await moveFileOrFolder(sourcePath, targetFolderPath, data.name);
            } catch (err) {
                console.error('Drop error:', err);
                // Ensure dragging class is removed on error
                document.querySelectorAll('.dragging').forEach(el => {
                    el.classList.remove('dragging');
                });
            }
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
        if (openFiles.has(filename)) {
            switchToFile(filename);
            return;
        }
        const result = await window.electronAPI.loadFile(filename);
        if (result.success) {
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
    
    const editor = document.getElementById('code-editor');
    
    // Always save current editor content before switching
    if (activeFile && openFiles.has(activeFile)) {
        const currentFileData = openFiles.get(activeFile);
        currentFileData.content = editor.value;
        // Sync currentContent with actual content
        if (activeFile === currentFile) {
            currentContent = currentFileData.savedContent;
        }
    }
    
    // Update active file references
    activeFile = filename;
    currentFile = filename;
    
    // Load the new file's content
    const fileData = openFiles.get(filename);
    currentContent = fileData.savedContent;
    
    // Set editor value and update line numbers
    editor.value = fileData.content;
    
    // Call updateLineNumbers after setting value to ensure sync
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
    const fileTabs = document.getElementById('file-tabs');
    const existingTab = fileTabs.querySelector(`[data-file="${filename}"]`);
    if (existingTab) {
        setActiveTab(filename);
        return;
    }
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
        e.stopPropagation();
        closeFileTab(filename);
    });
    tab.appendChild(tabName);
    tab.appendChild(closeBtn);
    tab.addEventListener('click', () => {
        switchToFile(filename);
    });
    setupTabDragAndDrop(tab);
    fileTabs.querySelectorAll('.file-tab').forEach(t => t.classList.remove('active'));
    fileTabs.appendChild(tab);
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
        
        // Prevent dropping tab on itself
        if (!draggingTab || draggingTab === tab) {
            return;
        }
        
        // Use getBoundingClientRect for accurate edge detection
        const rect = tab.getBoundingClientRect();
        const midpoint = rect.left + rect.width / 2;
        
        // Add margin for better edge detection (10% of width)
        const edgeMargin = rect.width * 0.1;
        
        tab.classList.remove('drag-over-left', 'drag-over-right');
        
        if (e.clientX < midpoint) {
            tab.classList.add('drag-over-left');
        } else {
            tab.classList.add('drag-over-right');
        }
    });
    
    tab.addEventListener('dragleave', (e) => {
        // Only remove classes if actually leaving the tab
        const rect = tab.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        
        if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
            tab.classList.remove('drag-over-left', 'drag-over-right');
        }
    });
    
    tab.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggingTab = document.querySelector('.file-tab.dragging');
        
        // Prevent dropping tab on itself
        if (!draggingTab || draggingTab === tab) {
            return;
        }
        
        const rect = tab.getBoundingClientRect();
        const midpoint = rect.left + rect.width / 2;
        const fileTabs = document.getElementById('file-tabs');
        
        // Remember the active file before reordering
        const wasActive = draggingTab.classList.contains('active');
        const draggedFile = draggingTab.dataset.file;
        
        if (e.clientX < midpoint) {
            fileTabs.insertBefore(draggingTab, tab);
        } else {
            fileTabs.insertBefore(draggingTab, tab.nextSibling);
        }
        
        tab.classList.remove('drag-over-left', 'drag-over-right');
        
        // Update active tab reference if needed
        if (wasActive) {
            activeFile = draggedFile;
            setActiveTab(draggedFile);
        }
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
    if (openFiles.size <= 1) {
        return;
    }
    
    // Remove from openFiles Map
    openFiles.delete(filename);
    
    const fileTabs = document.getElementById('file-tabs');
    const tab = fileTabs.querySelector(`[data-file="${filename}"]`);
    
    if (tab) {
        // Remove all event listeners by cloning and replacing
        const tabClone = tab.cloneNode(true);
        tab.parentNode.replaceChild(tabClone, tab);
        tabClone.remove();
        
        // Clear the reference
        tab.dataset.file = null;
    }
    
    // Clear editor content if this was the active file
    if (activeFile === filename) {
        const editor = document.getElementById('editor');
        editor.value = '';
        activeFile = null;
        
        const remainingFile = Array.from(openFiles.keys())[0];
        if (remainingFile) {
            switchToFile(remainingFile);
        }
    }
}
function newFile() {
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
    outputLineCount = 1;
    clearErrorHighlight();
    
    try {
        const result = await window.electronAPI.executeRID(code);
        outputContent.innerHTML = '';
        outputLineCount = 0;
        
        if (result.success) {
            const lines = result.output.split('\n');
            const outputLines = lines
                .filter(line => line.trim())
                .map(line => ({type: 'success', message: line}));
            
            if (outputLines.length === 0) {
                updateOutputPanel('success', '> Program executed successfully (no output)');
            } else if (outputLines.length > 10) {
                // Use batch update for many lines
                updateOutputPanelBatch(outputLines);
            } else {
                // Use regular update for few lines
                outputLines.forEach(({type, message}) => {
                    updateOutputPanel(type, message);
                });
            }
            
            // Clear any selection on successful run
            clearErrorHighlight();
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
        const lineNumber = parseInt(lineMatch[1]); // 1-based line number from error
        const editor = document.getElementById('code-editor');
        
        // Use consistent line splitting method
        const lines = editor.value.split('\n');
        
        // Check bounds correctly (lineNumber is 1-based, array is 0-based)
        if (lineNumber > 0 && lineNumber <= lines.length) {
            // Get the error line (convert 1-based to 0-based index)
            const errorLine = lines[lineNumber - 1];
            
            // Calculate character position correctly
            // Sum all previous lines' lengths plus newline characters
            let start = 0;
            for (let i = 0; i < lineNumber - 1; i++) {
                start += lines[i].length + 1; // +1 for \n
            }
            const end = start + errorLine.length;
            
            editor.focus();
            editor.setSelectionRange(start, end);
            
            // Scroll to show the error line
            editor.scrollTop = Math.max(0, (lineNumber - 5) * 20);
            const lineNumbers = document.getElementById('line-numbers');
            lineNumbers.scrollTop = editor.scrollTop;
        }
    }
}
function clearErrorHighlight() {
    const editor = document.getElementById('code-editor');
    // Clear selection by setting cursor to end
    if (editor.selectionStart !== editor.selectionEnd) {
        editor.setSelectionRange(editor.value.length, editor.value.length);
    }
}
function updateOutputPanel(type, message) {
    const outputContent = document.getElementById('output-content');
    
    // Limit output history to MAX_OUTPUT_LINES
    if (outputLineCount >= MAX_OUTPUT_LINES) {
        const firstLine = outputContent.querySelector('.output-line');
        if (firstLine) {
            firstLine.remove();
            outputLineCount--;
        }
    }
    
    const line = document.createElement('div');
    line.className = `output-line ${type}`;
    line.textContent = message;
    outputContent.appendChild(line);
    outputLineCount++;
    
    // Auto-scroll to bottom
    outputContent.scrollTop = outputContent.scrollHeight;
}

// Batch version for adding multiple lines efficiently
function updateOutputPanelBatch(lines) {
    const outputContent = document.getElementById('output-content');
    const fragment = document.createDocumentFragment();
    
    lines.forEach(({type, message}) => {
        // Remove old lines if exceeding limit
        if (outputLineCount >= MAX_OUTPUT_LINES) {
            const firstLine = outputContent.querySelector('.output-line');
            if (firstLine) {
                firstLine.remove();
                outputLineCount--;
            }
        }
        
        const line = document.createElement('div');
        line.className = `output-line ${type}`;
        line.textContent = message;
        fragment.appendChild(line);
        outputLineCount++;
    });
    
    // Single DOM update for all lines
    outputContent.appendChild(fragment);
    outputContent.scrollTop = outputContent.scrollHeight;
}
function initInputHandler() {
    window.electronAPI.onInputPrompt((prompt) => {
        // Add prompt to queue
        inputPromptQueue.push(prompt);
        
        // Process queue if not already waiting for input
        if (!isWaitingForInput) {
            processNextInputPrompt();
        }
    });
}

function processNextInputPrompt() {
    if (inputPromptQueue.length === 0) {
        isWaitingForInput = false;
        return;
    }
    
    isWaitingForInput = true;
    const prompt = inputPromptQueue.shift();
    const outputContent = document.getElementById('output-content');
    
    // Clear any old input containers before adding new one
    const oldContainers = outputContent.querySelectorAll('.input-container');
    oldContainers.forEach(container => container.remove());
    
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
        if (e.key === 'Enter' && !inputField.disabled) {
            // Disable field immediately to prevent multiple submissions
            inputField.disabled = true;
            
            const userInput = inputField.value;
            const inputEcho = document.createElement('div');
            inputEcho.className = 'output-line input-echo';
            inputEcho.textContent = userInput;
            outputContent.appendChild(inputEcho);
            
            inputContainer.remove();
            window.electronAPI.sendInput(userInput);
            
            outputContent.scrollTop = outputContent.scrollHeight;
            
            // Process next prompt in queue after a short delay
            setTimeout(() => {
                processNextInputPrompt();
            }, 100);
        }
    });
    
    inputContainer.appendChild(inputField);
    outputContent.appendChild(inputContainer);
    inputField.focus();
    outputContent.scrollTop = outputContent.scrollHeight;
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
    outputLineCount = 1;
}
async function createFolder() {
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
        setupGlobalDragCleanup();
    }, 100);
});

// Global drag cleanup to prevent state pollution
function setupGlobalDragCleanup() {
    document.addEventListener('dragend', () => {
        // Clean up all drag-related classes
        document.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });
        document.querySelectorAll('.dragging').forEach(el => {
            el.classList.remove('dragging');
        });
        // Reset filesList background
        const filesList = document.getElementById('files-list');
        if (filesList) {
            filesList.style.backgroundColor = '';
        }
    });
    
    // Additional cleanup on drag errors
    document.addEventListener('drop', () => {
        document.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });
    });
}
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