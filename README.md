<div align="center">

<h1>RIDLEY IDE</h1>

<p>A modern, standalone desktop IDE for the RID Programming Language.</p>

<p>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Platform-Windows-blue.svg" alt="Platform: Windows">
  </a>
  <a href="https://www.electronjs.org/">
    <img src="https://img.shields.io/badge/Built%20with-Electron-47848F.svg" alt="Built with Electron">
  </a>
</p>

</div>

---

## Overview

**RIDLEY IDE** is a modern desktop environment designed for learning, writing, and executing programs written in the **RID Programming Language**.  
It features a clean UI, built-in tutorials, real-time execution, and a fully integrated RID transpiler backend.  
RIDLEY requires **no setup or dependencies** — download and run immediately.

Learn more about the RID language at:  [RID Programming Language Repository](https://github.com/Aloy17/RID-language)

---

## Key Features

- **Zero Installation:** Completely standalone. No Python or setup required.  
- **Integrated RID Engine:** Executes RID code instantly with real-time input/output.  
- **Powerful Editor:** Line numbering, syntax highlighting, and tabbed interface.  
- **Interactive Tutorials:** Six guided lessons from basics to full projects.  
- **Dual Themes:** Quiet Light and Dark Modern with persistent user preference.  
- **File Management:** Create, open, and organize projects within the IDE.  
- **Error Feedback:** Displays detailed syntax and runtime errors.  
- **Portable:** Works from any directory with all dependencies bundled.

---

## Installation

### System Requirements
- **OS:** Windows 10 or higher  
- **RAM:** 4 GB minimum (8 GB recommended)  
- **Disk Space:** 200 MB free  
- **Display:** 1280×720 minimum resolution  

### Download
Get the latest release from the [RIDLEY Releases Page](https://github.com/Aloy17/RIDLEY/releases):

- **Windows Installer:** `RIDLEY-Setup.exe`  
- **Portable ZIP:** `RIDLEY-Windows.zip`  

### Installation Steps

**Installer Version**
1. Download `RIDLEY-Setup.exe`  
2. Run the installer and follow the prompts  
3. Launch RIDLEY IDE from the Start Menu  

**Portable Version**
1. Download and extract `RIDLEY-Windows.zip`  
2. Run `rid-ide.exe` directly  

---

## Getting Started

### First Launch
Choose from:
- **Start Learning** – Open interactive tutorials  
- **Open Editor** – Begin writing RID code immediately  

Default project directory:
```

%APPDATA%/RIDLEY IDE/projects/

````

### First Program
```rid
~ Hello World in RID ~
out("Hello, RIDLEY!")
line
````

Run the code using the **Run** button or press **F5**.

---

## Interface Overview

**Toolbar** – Quick access to Run, Save, Delete, and Theme controls.
**Sidebar** – File and folder explorer with drag-and-drop support.
**Editor** – Core code editing area with line numbers and indentation.
**Output Panel** – Displays real-time output and accepts user input.

Resizable panels allow dynamic workspace customization.

---

## Built-in Tutorials

RIDLEY includes six step-by-step lessons:

1. Getting Started
2. Variables & Types
3. Conditionals (`agar`, `ya_fir`, `warna`)
4. Loops (`Run`, `Run while`)
5. Functions (`func`, `give`)
6. Projects (number games, calculators, etc.)

Each tutorial includes explanations, examples, and expected output.

---

## Keyboard Shortcuts

| Action       | Shortcut       |
| ------------ | -------------- |
| Run Code     | `F5`           |
| Save File    | `Ctrl + S`     |
| New File     | `Ctrl + N`     |
| Close Tab    | Click `×`      |
| Toggle Theme | Toolbar button |

---

## File Management

Files are automatically stored at:

```
%APPDATA%/RIDLEY IDE/projects/
```

* **Create File:** `Ctrl + N` or New File button
* **Save File:** `Ctrl + S`
* **Delete File:** Toolbar Delete button
* **Folders:** Created via sidebar or manually in filesystem
* **Tabs:** Reorder or close with drag and click actions

---

## Technical Architecture

### 1. Overview

RIDLEY IDE is built with **Electron** for the desktop shell, a **Python backend** for RID execution, and an **HTML/CSS/JS frontend** for the interface.

---

### 2. Frontend (Electron Renderer)

* **Stack:** HTML, CSS, JavaScript
* **UI Pages:** Home, Tutorials, Tutorial Details, IDE Editor
* **Editor:** Textarea-based code editor with line numbers and tab management
* **Output Panel:** Handles interactive I/O for `in()` and displays results
* **Themes:** Light and Dark via CSS variables
* **Animations:** Subtle background effects
* **Window Controls:** Custom minimize, maximize, close for frameless window

---

### 3. Backend (Python)

* **RID Transpiler:** Parses and executes RID code via `lexer.py`, `parser.py`, and `main.py`
* **Execution Flow:** Code sent from frontend → Transpilation → Python execution → Output streamed back
* **Interactive Input:** Prompts displayed in output panel; responses returned to backend
* **Real-time Output:** Streamed continuously for live feedback

---

### 4. Electron Main Process

* **main.js:** Launches the app and manages the Python backend as a child process
* **IPC Communication:** Frontend ↔ Backend messaging for code, output, and input events
* **Security:** `preload.js` exposes only safe APIs for renderer communication

---

### 5. File & Project Structure

```
RIDLEY/
├── src/              # Frontend UI files
│   ├── index.html
│   ├── css/
│   └── js/
├── backend/          # Python RID transpiler
├── main.js           # Electron entry point
├── preload.js        # Safe IPC bridge
├── package.json      # Electron/Node dependencies
└── forge.config.js   # Packaging configuration
```

---

### 6. Key Technical Features

* Multi-page architecture (Home, Tutorials, IDE)
* Real-time execution through IPC
* Full RID transpiler integration
* Theme persistence and animation system
* Responsive layout and keyboard shortcuts

---

### 7. Execution Flow

1. User writes RID code
2. User clicks **Run**
3. Frontend sends code via IPC to backend
4. Backend executes and streams output
5. Frontend updates the output panel in real time
6. Interactive inputs are exchanged dynamically

---

## Next Steps

* Complete tutorials to master RID basics
* Explore example programs
* Experiment with custom themes and layouts
* Report issues or contribute improvements via GitHub

---

## Related Project

**RID Programming Language** – The core language RIDLEY runs and teaches
Repository: [https://github.com/Aloy17/RID-language](https://github.com/Aloy17/RID-language)

---

## License

MIT License © 2025 **Ryane Bose**
See [`LICENSE`](LICENSE) for full details.

---

## Author

Ryane Bose: Creator of the RID Programming Language and RIDLEY IDE.

---


Would you like me to add a **“Contributing”** section (with basic setup steps for building RIDLEY from source via `npm install && npm run start`) before finalizing?
```
