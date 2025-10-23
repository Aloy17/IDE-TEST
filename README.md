<div align="center">

# RIDLEY IDE

**A modern, standalone desktop IDE for the RID Programming Language**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows-blue.svg)](#)
[![Built with Electron](https://img.shields.io/badge/Built%20with-Electron-47848F.svg)](https://www.electronjs.org/)

[Installation](#installation) • [Getting Started](#getting-started) • [Documentation](#table-of-contents) • [Tutorials](#interactive-tutorials)

</div>

---

## IDE Preview

<div align="center">
 <img width="80%" alt="CODE_EDITOR_LIGHT" src="https://github.com/user-attachments/assets/b8730307-a3a5-4994-8ee7-3b14079a4d50" />
  <br>
  <sub><i>RIDLEY Code Editor — Light Theme</i></sub>
</div>

---

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [User Interface](#user-interface)
5. [RID Language Reference](#rid-language-reference)
6. [IDE Features](#ide-features)
7. [File Management](#file-management)
8. [Keyboard Shortcuts](#keyboard-shortcuts)
9. [Interactive Tutorials](#interactive-tutorials)
10. [Troubleshooting](#troubleshooting)
11. [Technical Architecture](#technical-architecture)
12. [Development](#development)
13. [Additional Resources](#additional-resources)

---

## Introduction

**RIDLEY IDE** is a standalone desktop integrated development environment specifically designed for the **RID Programming Language**. It provides a complete learning and development setup with zero external dependencies, built-in tutorials, and real-time code execution.

### Key Features

* **Zero Installation** – Completely self-contained
* **Integrated RID Engine** – Real-time code execution
* **Modern Editor** – Syntax highlighting, line numbering, intelligent formatting
* **Interactive Tutorials** – Six guided lessons covering all language features
* **Dual Theme Support** – Light (Quiet Light) & Dark (Dark Modern)
* **Project Management** – Intuitive file/folder organization
* **Cross-Platform Design** – Built with Electron for Windows, macOS, and Linux

### System Requirements

* **OS**: Windows 10 or higher
* **Memory**: 4 GB minimum (8 GB recommended)
* **Storage**: 200 MB free space
* **Display**: 1280×720 minimum

> **Note:** macOS and Linux builds are planned for future releases.

---

## Installation

### Download

Get the latest release from the [RIDLEY Releases Page](https://github.com/Aloy17/RIDLEY/releases).

### Windows Installation

1. Download `RID IDE-1.0.0 Setup.exe`
2. Run the installer and follow the setup wizard
3. Launch **RIDLEY IDE** from Start Menu or desktop

### Portable Version

1. Download the portable executable
2. Place it anywhere
3. Double-click to run

**Default Project Directory:**

```
Windows: %APPDATA%/RIDLEY IDE/projects/
```

---

## Getting Started

<div align="center">
 <img width="80%" alt="HOMEPAGE_LIGHT" src="https://github.com/user-attachments/assets/8f578a6e-865a-4d84-be05-9f32535b717b" />
  <br>
  <sub><i>RIDLEY Home Screen — Light Theme</i></sub>
</div>

### First Launch

You’ll be greeted with:

* **Start Learning** — Opens the interactive tutorial suite
* **Open Editor** — Launches the full IDE workspace

### Your First Program

```rid
~ Hello World Program ~
out("Hello, RIDLEY!")
line
```

Press **F5** or click **Run** — output appears instantly.

---

## User Interface

<div align="center">
<img width="48%" alt="CODE_EDITOR_LIGHT" src="https://github.com/user-attachments/assets/6a489f6a-44b9-44f4-91d0-8fc4e07efa56" />
<img width="48%" alt="CODE_EDITOR_DARK" src="https://github.com/user-attachments/assets/e1d9dd71-6784-4aa0-bc1e-84d3635afa9f" />
<br>
<sub><i>RIDLEY Code Editor — Light and Dark Themes</i></sub>
</div>

### Main Components

* **Title Bar:** Frameless window with drag and control buttons
* **Toolbar:** Quick Run | Save | Delete | Back actions
* **Sidebar:** File/folder tree with drag & drop support
* **Editor Panel:** Syntax-highlighted code area with tabs and line numbers
* **Output Panel:** Real-time output, color-coded by message type
* **Theme Toggle:** Floating button to switch between themes

**Resizable Panels:**

* Adjust sidebar width or output height via drag handles.

---

## RID Language Reference

RID is designed for clarity and readability. Below are core syntax highlights.

### Comments

```rid
~ This is a single-line comment ~

~
This is
a multi-line comment
~
```

### Variables

```rid
Let name = "Alice"
Let age = 25
Let isStudent = True
```

### Type Conversion

```rid
Let n = num("25")
Let s = word(42)
Let f = dec("3.14")
Let b = bool(1)
```

### Conditionals

```rid
agar(x > 0) {
    out("Positive")
}
warna {
    out("Non-positive")
}
```

### Loops

```rid
Run(5) {
    out("Iteration")
    line
}
```

### Functions

```rid
func greet(name) {
    out("Hello, " + name + "!")
    line
}

greet("Ryane")
```

### Recursive Example

```rid
func factorial(n) {
    agar(n <= 1) {
        give 1
    }
    warna {
        give n * factorial(n - 1)
    }
}
```

---

## IDE Features

### Smart Code Editing

* Auto-pairing for `()`, `{}`, and quotes
* Intelligent indentation
* Real-time error highlighting

### Tab Management

* Open multiple files as tabs
* Drag to reorder
* Active tab highlight

### Code Execution

* Press **F5** or click **Run**
* Output streamed live below
* Error lines auto-highlighted

### Output Panel

* **Green:** Success
* **Red:** Errors
* **Blue:** Info
* **Purple:** Input prompts

### Error Handling

Automatic navigation to faulty lines with detailed messages.

---

## File Management

* **New File:** `Ctrl + N` or sidebar "+"
* **Save File:** `Ctrl + S`
* **Delete:** Toolbar Delete button
* **Drag & Drop:** Move files into folders
* **Tabs:** Auto-sync with opened files

```
📁 Projects
 ├── Lesson1.rid
 ├── Lesson2.rid
 └── MyApp/
      ├── main.rid
      └── data.rid
```

---

## Keyboard Shortcuts

| Action        | Shortcut  |
| ------------- | --------- |
| Run Code      | F5        |
| Save File     | Ctrl + S  |
| New File      | Ctrl + N  |
| Close Tab     | Click X   |
| Navigate Tabs | Click tab |
| Indent        | Tab       |

---

## Interactive Tutorials

<div align="center">
<img width="45%" alt="TUTORIALS_LIGHT" src="https://github.com/user-attachments/assets/d9a70f91-e881-49e6-ab7d-2d1e7acb2a12" />
<img width="45%" alt="TUTORIALCARD_LIGHT" src="https://github.com/user-attachments/assets/b095d0f5-84b2-40da-b5ff-93e6b50b13ce" />
<br>
<sub><i>Interactive Tutorials — Overview and Card Sample</i></sub>
</div>

### Topics

1. Getting Started
2. Variables & Types
3. Conditionals
4. Loops
5. Functions
6. Complete Projects

Each includes explanations, examples, and exercises.

---

## Troubleshooting

| Issue                  | Possible Fix                         |
| ---------------------- | ------------------------------------ |
| **Code doesn’t run**   | Check syntax and matching braces     |
| **File won’t save**    | Check permissions and valid filename |
| **Output missing**     | Ensure code calls `out()` or `line`  |
| **Input prompt stuck** | Press Enter after typing             |

**Performance Tips:**
Close unused tabs, clear output, and split large code into functions.

---

## Technical Architecture

### Overview

RIDLEY is built using a **Python backend** (for RID execution) and **Electron frontend** (for the UI).

### Frontend (Renderer)

* HTML, CSS, and Vanilla JS
* Multi-page (Home, Tutorials, IDE)
* Theme persistence and animations

### Backend (Python)

* `lexer.py` → Tokenizer
* `parser.py` → Syntax analyzer
* `rid_backend.py` → Core execution

**Execution Flow:**

```
Frontend → IPC → Python Transpiler → Execute → Stream Output → Frontend
```

### Electron Main Process

* Window management
* Subprocess control
* Secure IPC bridge

**Security:**

* Context isolation enabled
* No Node.js access in renderer

### File Structure

```
RIDLEY/
├── src/
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── assets/
├── backend/
│   ├── rid_transpiler/
│   ├── rid_backend.py
│   └── examples/
├── main.js
├── preload.js
├── package.json
└── forge.config.js
```

---

## Development

### Prerequisites

* Node.js 14+
* Python 3.7+
* PyInstaller

### Setup

```bash
npm install
npm start
```

### Build

```bash
npm run build:backend
npm run make
```

**Package Without Installer:**

```bash
npm run package
```

---

## Additional Resources

* **RID Language Repository:** [RID-language](https://github.com/Aloy17/RID-language)
* **Issue Tracker:** Use GitHub Issues for bugs or feature requests
* **Author:** Ryane Bose

---

**Version:** 1.2.0
**Last Updated:** 2025
**License:** MIT


