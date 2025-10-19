# RID IDE - Desktop Application

<div align="center">

![RID IDE](https://img.shields.io/badge/RID-IDE-a855f7?style=for-the-badge&logo=electron)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen?style=for-the-badge)
![Platform](https://img.shields.io/badge/platform-Windows-blue?style=for-the-badge)

**A standalone desktop IDE for the RID programming language**

*Windows Only - Zero setup - Retro aesthetic - Complete learning environment*

</div>

---

## Table of Contents

- [Quick Start (End Users)](#quick-start-end-users)
- [For Developers](#for-developers)
- [Features](#features)
- [Building Installers](#building-installers)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)

---

## Overview

RID IDE is a standalone desktop application for Windows that provides a complete development environment for the RID programming language. It features a retro pixel-art aesthetic with modern functionality, allowing users to learn, write, and execute RID code without any external dependencies.

**Platform Support: Windows Only**

---

## Quick Start (End Users)

### Option 1: Download Pre-built Installer (Recommended)

**Download the latest Windows release:**

**Windows (64-bit):**
1. Download `RID IDE-1.0.0 Setup.exe` from [Releases](https://github.com/Aloy17/IDE-TEST/releases/latest)
2. Run the installer
3. Launch RID IDE from your Start Menu
4. Start coding!

**No Node.js, Python, or npm required!** Everything is bundled.

---

### Option 2: Run from Source (Requires Node.js)

If you want to run from source or contribute:

```bash
# 1. Clone the repository
git clone https://github.com/Aloy17/IDE-TEST.git
cd IDE-TEST

# 2. Install dependencies (one-time only)
npm install

# 3. Run the app
npm start
```

**Requirements for running from source:**
- Node.js 16+ (for development only)
- Python 3.7+ (bundled in releases, needed for source)

---

## Features

**Windows Installer:**
- `RID-IDE-Setup.exe` (Approximately 130 MB)
- Includes embedded Python runtime (no Python installation required)

### Installation Steps

1. Download the installer
2. Run the installer
3. Launch RID IDE from your Start Menu
4. Start coding - no additional setup needed!

---

## Development Setup

### Prerequisites

- **Node.js** 16+ and npm
- **Python** 3.7+ (with PyInstaller for building)
- **Git**
- **Windows OS** (Primary platform)

### Clone Repository

```bash
git clone https://github.com/Aloy17/IDE-TEST.git
cd IDE-TEST
```

### Install Dependencies

```bash
npm install
```

This will install:
- Electron
- Electron Forge
- All build dependencies

### Build Python Backend

Before building the Electron app, you need to build the Python backend:

```bash
npm run build:backend
```

This creates a standalone `rid_backend.exe` that bundles Python so end users don't need Python installed.

### Run Development Server

```bash
npm start
```

This will:
1. Launch the Electron application
2. Show the loading screen
3. Transition to the home page
4. Enable all IDE features

---

## Usage

### 1. **Home Page**

When you launch RID IDE, you'll see:
- Large "RID" logo with purple glow effect
- Two buttons: **TUTORIAL** and **IDE**

### 2. **Tutorial Page**

Click **TUTORIAL** to access 6 comprehensive lessons:

1. **Getting Started** - Learn basic output
2. **Variables & Types** - Work with data
3. **Conditionals** - Decision making
4. **Loops** - Repetition
5. **Functions** - Reusable code
6. **Complete Projects** - Build real applications

### 3. **IDE Page**

Click **IDE** to start coding:

#### **Sidebar**
- Navigate between Home, Tutorials, and Code
- View all your .rid files
- Click any file to open it

#### **Toolbar**
- **NEW** - Create a new file
- **SAVE** - Save current file
- **▶ RUN** - Execute your code

#### **Code Editor**
- Full syntax highlighting for RID
- Line numbers
- Tab support (2 spaces)
- Auto-scroll

#### **Output Panel**
- View execution results
- See error messages with details
- Color-coded output (green for success, red for errors)

### Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save file
- `Ctrl/Cmd + N` - New file
- `F5` - Run code
- `Tab` - Insert 2 spaces

---

## Building

### Build for Windows

The build process automatically compiles the Python backend before packaging:

```bash
npm run make
```

This will:
1. Build the Python backend into a standalone .exe
2. Package the Electron app with the bundled backend
3. Create the Windows installer

This creates installers in the `out/make` directory.

### Output Location

**Windows:**
```
out/make/squirrel.windows/x64/RID-IDE-1.0.0 Setup.exe
```

### Package Only (No Installer)

```bash
npm run package
```

This creates a packaged app in `out/` without building installers.

---

## Project Structure

```
IDE-TEST/
├── backend/
│   ├── examples/              # Example .rid files
│   │   ├── hello.rid
│   │   ├── calculator.rid
│   │   ├── loops.rid
│   │   ├── functions.rid
│   │   ├── fibonacci.rid
│   │   └── conditionals.rid
│   ├── rid_transpiler/        # RID compiler
│   │   ├── __init__.py
│   │   ├── lexer.py
│   │   └── parser.py
│   └── rid_backend.py         # Python-Electron bridge
│
├── src/
│   ├── index.html             # Main HTML
│   ├── css/
│   │   └── styles.css         # All styling
│   ├── js/
│   │   ├── animations.js      # Particle effects & binary rain
│   │   ├── editor.js          # Code editor logic
│   │   ├── pages.js           # Page navigation
│   │   └── renderer.js        # Main renderer
│   └── assets/
│       └── (fonts, icons)
│
├── main.js                    # Electron main process
├── preload.js                 # Electron preload script
├── package.json               # npm configuration
├── forge.config.js            # Build configuration
└── README.md                  # This file
```

---

## Design System

### Colors (Purple Cyberpunk)

```css
--black:         #0a0014  /* Background */
--dark-purple:   #1a0a2e  /* Surfaces */
--purple:        #a855f7  /* Primary */
--bright-purple: #e879f9  /* Highlights */
--green:         #10b981  /* Success */
--red:           #ef4444  /* Errors */
--cyan:          #06b6d4  /* Info */
```

### Fonts

- **Press Start 2P** - Logos, buttons, titles
- **VT323** - UI text, descriptions
- **JetBrains Mono** - Code editor only

### Animations

- Rising particles (30 particles)
- Binary rain (loading screen)
- Button hover effects (lift + glow)
- Page transitions (300ms fade)

---

## Troubleshooting

### Application won't start

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm start
```

### Troubleshooting

**Error:** `Failed to import RID transpiler`

**Solution:**
- This should not occur in the packaged app (Python is bundled)
- For development: Ensure Python 3.7+ is installed
- Check that `backend/rid_transpiler/` contains `lexer.py` and `parser.py`

### Code execution fails

**In Development Mode:**

**Solution:**
1. Verify Python is in your PATH: `python --version`
2. Try using `python3` instead:
   - Edit `main.js`, line 75: Change `'python'` to `'python3'`

**In Packaged App:**
- The bundled backend should work without Python installed
- If errors persist, check the application logs

### Files not saving

**Solution:**
1. Check file permissions in projects folder
2. Windows: `%APPDATA%/RID-IDE/projects/`

### Binary rain not showing

**Solution:**
- Binary rain only shows on loading screen for 2.5 seconds
- Refresh the app to see it again

### Fonts not loading

**Solution:**
- App uses Google Fonts (online)
- Ensure internet connection on first launch
- Fonts are cached after first load

---

## Example Code

### Hello World

```rid
~ My first RID program ~

out("Hello from RID!")
line
```

### Fibonacci

```rid
Let a = 0
Let b = 1
Let count = 0

Run while(count < 10) {
    out(a)
    out(" ")
    
    Let temp = a + b
    a = b
    b = temp
    
    count = count + 1
}
line
```

### Factorial Function

```rid
func factorial(n) {
    agar(n <= 1) {
        give 1
    }
    warna {
        give n * factorial(n - 1)
    }
}

Let result = factorial(5)
out("5! = ")
out(result)
line
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

---

## License

MIT License

Copyright (c) 2025 Ryane Bose

---

## Acknowledgments

- **Electron** - Desktop app framework
- **Press Start 2P** - Pixel font by CodeMan38
- **VT323** - Terminal font by Peter Hull
- **JetBrains Mono** - Code font by JetBrains

---

## Support

For issues or questions:

- **GitHub Issues**: [github.com/Aloy17/IDE-TEST/issues](https://github.com/Aloy17/IDE-TEST/issues)
- **Email**: ryaneb2004@gmail.com

---

<div align="center">

**Made with love by Ryane Bose**

</div>
