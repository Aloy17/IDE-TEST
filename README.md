<div align="center">

# RIDLEY IDE

**A modern, standalone desktop IDE for the RID Programming Language**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows-blue.svg)](#)
[![Built with Electron](https://img.shields.io/badge/Built%20with-Electron-47848F.svg)](https://www.electronjs.org/)

[Installation](#installation) • [Getting Started](#getting-started) • [Documentation](#table-of-contents) • [Tutorials](#interactive-tutorials)

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

---

## Introduction

**RIDLEY IDE** is a standalone desktop integrated development environment specifically designed for the RID Programming Language. It provides a complete learning and development environment with zero external dependencies, built-in tutorials, and real-time code execution.

### Key Features

- **Zero Installation**: Completely self-contained with no external dependencies
- **Integrated RID Engine**: Real-time code execution with immediate feedback
- **Modern Editor**: Syntax highlighting, line numbering, and intelligent code formatting
- **Interactive Tutorials**: Six comprehensive lessons covering all language features
- **Dual Theme Support**: Light (Quiet Light) and Dark (Dark Modern) themes
- **Project Management**: Intuitive file and folder organization
- **Cross-Platform**: Built with Electron for Windows, macOS, and Linux

### System Requirements

- **Operating System**: Windows 10 or higher
- **Memory**: 4 GB RAM minimum (8 GB recommended)
- **Storage**: 200 MB free disk space
- **Display**: Minimum resolution of 1280x720 pixels

**Note**: Currently available for Windows only. macOS and Linux support coming soon.

---

## Installation

### Download

Get the latest release from the [RIDLEY Releases Page](https://github.com/Aloy17/RIDLEY/releases).

### Windows Installation

1. Download `RID IDE-1.0.0 Setup.exe` from the releases page
2. Run the installer and follow the installation wizard
3. Launch RIDLEY IDE from the Start Menu or desktop shortcut

### Portable Version

1. Download the portable executable from the releases page
2. Place it in your desired directory
3. Double-click to launch (no installation required)

### Default Project Location

Projects are stored at:
```
Windows: %APPDATA%/RIDLEY IDE/projects/
```

---

## Getting Started

### First Launch

Upon launching RIDLEY IDE, you will see the home screen with two options:

1. **Start Learning** - Opens the interactive tutorial system
2. **Open Editor** - Launches the main IDE interface

### Your First Program

Create a new file and write:

```rid
~ Hello World Program ~
out("Hello, RIDLEY!")
line
```

Press **F5** or click the **Run** button to execute. You should see the output in the panel below.

### Understanding the Output

- `out()` - Prints text without a newline
- `line` - Prints a newline character
- `~` comments `~` - Comments are enclosed in tildes

---

## User Interface

### Main Components

#### 1. Title Bar
- Custom window controls (minimize, maximize, close)
- Frameless design for a modern appearance
- Drag region for window movement

#### 2. Toolbar
Located at the top of the IDE, provides quick access to:
- **Back Button** - Return to home screen
- **Run Button** - Execute current code (F5)
- **Delete Button** - Remove current file
- **Save Button** - Save current file (Ctrl+S)

#### 3. Sidebar (Files Panel)
- Hierarchical file and folder structure
- Create new files and folders with action buttons
- Drag-and-drop support for reorganization
- Click to open files, click folders to expand/collapse

#### 4. Editor Panel
- **Tab Bar** - Manage multiple open files
- **Line Numbers** - Synchronized with editor content
- **Code Editor** - Main editing area with syntax awareness
- Auto-pairing for brackets, quotes, and parentheses
- Smart indentation on Enter key

#### 5. Output Panel
- Real-time execution output
- Interactive input prompts
- Color-coded messages:
  - Green: Successful output
  - Red: Error messages
  - Blue: Information messages
  - Purple: Input prompts

#### 6. Theme Toggle
- Floating button (top-right in most views, bottom-right in IDE)
- Switches between Quiet Light and Dark Modern themes
- Theme preference is persisted across sessions

### Resizable Panels

- **Sidebar Width**: Drag the vertical border between sidebar and main area
- **Output Height**: Drag the horizontal border between editor and output

---

## RID Language Reference

### Comments

Comments are enclosed in tildes and can span multiple lines:

```rid
~ This is a single-line comment ~

~ 
This is a
multi-line comment
~
```

### Variables

Declare variables using the `Let` keyword:

```rid
Let name = "Alice"
Let age = 25
Let height = 5.7
Let isStudent = True
```

**Supported Types**:
- **String**: Text enclosed in double quotes
- **Number**: Integers (42, -10)
- **Decimal**: Floating-point numbers (3.14, -0.5)
- **Boolean**: True or False

**Variable Reassignment**:

```rid
Let count = 10
count = count + 5
count = 20
```

### Type Conversion

Convert between types using conversion functions:

```rid
Let age_string = "25"
Let age_number = num(age_string)      ~ String to integer ~

Let pi_string = "3.14159"
Let pi_decimal = dec(pi_string)       ~ String to decimal ~

Let value = 42
Let value_string = word(value)        ~ Number to string ~

Let flag = bool(1)                     ~ Number to boolean ~
```

### Operators

**Arithmetic**:
- `+` Addition
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `%` Modulo

**Comparison**:
- `==` Equal to
- `!=` Not equal to
- `<` Less than
- `>` Greater than
- `<=` Less than or equal to
- `>=` Greater than or equal to

### Output

Print to the output panel:

```rid
out("Hello World")           ~ Print without newline ~
line                         ~ Print newline ~
out("Value: " + word(42))    ~ Concatenation ~
```

### Input

Read user input:

```rid
Let name = in("Enter your name: ")
Let age = num(in("Enter your age: "))
```

The IDE displays the prompt in the output panel and waits for user input.

### Conditionals

Make decisions using `agar` (if), `ya_fir` (elif), and `warna` (else):

```rid
Let score = 85

agar(score >= 90) {
    out("Grade: A")
    line
}
ya_fir(score >= 80) {
    out("Grade: B")
    line
}
ya_fir(score >= 70) {
    out("Grade: C")
    line
}
warna {
    out("Grade: F")
    line
}
```

### Loops

**Fixed-Count Loop**:

```rid
Let counter = 1
Run(5) {
    out("Count: " + word(counter))
    line
    counter = counter + 1
}
```

**While Loop**:

```rid
Let number = 5
Let factorial = 1

Run while(number > 1) {
    factorial = factorial * number
    number = number - 1
}

out("Result: " + word(factorial))
line
```

### Functions

Define reusable code blocks:

```rid
func greet(name) {
    out("Hello, " + name + "!")
    line
}

greet("Alice")
greet("Bob")
```

**Functions with Return Values**:

```rid
func add(x, y) {
    give x + y
}

func multiply(x, y) {
    give x * y
}

Let sum = add(10, 5)
Let product = multiply(4, 7)

out("Sum: " + word(sum))
line
out("Product: " + word(product))
line
```

**Recursive Functions**:

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
out("5! = " + word(result))
line
```

---

## IDE Features

### Smart Code Editing

**Auto-Pairing**:
- Typing `(` automatically adds `)`
- Typing `{` automatically adds `}`
- Typing `"` automatically adds closing `"`

**Smart Indentation**:
- Press Enter between braces to auto-indent
- Maintains current indentation level
- Tab key inserts 2 spaces

**Line Numbers**:
- Automatically updated as you type
- Synchronized scrolling with editor

### Tab Management

**Opening Files**:
- Click files in the sidebar to open them
- Files open in new tabs
- Previously opened files are remembered

**Tab Operations**:
- Click tab to switch files
- Click X to close tab
- Drag tabs to reorder them
- Active tab highlighted with accent color

**Unsaved Changes**:
- Changes are tracked per file
- Save individual files with Ctrl+S

### Code Execution

**Running Code**:
1. Click the Run button or press F5
2. Output appears in the bottom panel
3. Errors are highlighted in red
4. Click error messages to jump to error line

**Interactive Input**:
- When code requires input, a prompt appears
- Type response and press Enter
- Input is echoed in the output panel

**Output Management**:
- Maximum 1000 lines retained
- Clear output with the clear button
- Color-coded message types

### Error Handling

When errors occur:
1. Error message displays in output panel
2. Error line is automatically selected in editor
3. Editor scrolls to show the error
4. Line number is included in error message

Common error types:
- **Syntax Error**: Invalid RID syntax
- **Name Error**: Undefined variable or function
- **Type Error**: Invalid type operation
- **Runtime Error**: Division by zero, recursion limit, etc.

---

## File Management

### Creating Files

**Method 1**: Click the plus icon in the sidebar header
**Method 2**: Use Ctrl+N

- Enter filename (`.rid` extension added automatically)
- Press Enter to confirm
- Press Escape to cancel
- Invalid characters are rejected

### Creating Folders

1. Click the folder icon in sidebar header
2. Enter folder name
3. Press Enter to confirm
4. Folders appear at the top of file list

### Opening Files

- Click any file in the sidebar
- File opens in a new tab
- Content loads into editor
- Previous content is auto-saved

### Saving Files

**New Files**:
- Click Save or press Ctrl+S
- Choose location and filename
- File is added to project directory

**Existing Files**:
- Click Save or press Ctrl+S
- File is saved in place
- No dialog appears

### Deleting Files

1. Open the file to delete
2. Click Delete button in toolbar
3. Confirm deletion
4. File is permanently removed

### Drag and Drop

**Files**:
- Drag files to move into folders
- Drag files to root to move out of folders
- Visual feedback during drag operation

**Folders**:
- Drag files into folders
- Cannot drag folders (coming soon)

**Tabs**:
- Drag tabs to reorder
- Drop indicator shows insertion point

### File Organization

- Folders displayed before files
- Items sorted alphabetically
- Expand/collapse folders with click
- Expanded state remembered

---

## Keyboard Shortcuts

### General

| Action | Shortcut |
|--------|----------|
| Run Code | F5 |
| Save File | Ctrl+S |
| New File | Ctrl+N |

### Editor

| Action | Shortcut |
|--------|----------|
| Indent | Tab |
| Auto-complete Braces | { then Enter |
| Close Tab | Click X on tab |

### Navigation

| Action | Method |
|--------|--------|
| Switch Tabs | Click tab |
| Jump to Error | Click error in output |
| Scroll Editor | Mouse wheel or scrollbar |

---

## Interactive Tutorials

RIDLEY includes six comprehensive tutorials covering all RID features.

### Tutorial Structure

Each lesson includes:
- **Lesson Explanation**: Concepts and syntax
- **Example Code**: Practical demonstrations
- **Expected Output**: What to expect when running
- **Navigation**: Previous and Next buttons

### Tutorial Topics

1. **Getting Started**
   - Output with `out()` function
   - Comments and basic syntax
   - First program execution

2. **Variables & Types**
   - Variable declaration with `Let`
   - Data types: strings, numbers, booleans
   - Variable reassignment

3. **Conditionals**
   - Decision making with `agar`, `ya_fir`, `warna`
   - Comparison operators
   - Building conditional logic

4. **Loops**
   - Fixed-count loops with `Run(n)`
   - Conditional loops with `Run while()`
   - Loop control and iteration

5. **Functions**
   - Function definition with `func`
   - Parameters and arguments
   - Return values with `give`

6. **Complete Projects**
   - Number guessing game
   - Combining all concepts
   - Interactive programs

### Accessing Tutorials

1. Click "Start Learning" from home screen
2. Select any tutorial card
3. Read explanation and code
4. Use navigation buttons to move between lessons
5. Return to tutorial list or home anytime

---

## Troubleshooting

### Common Issues

**Code Doesn't Run**

- Check for syntax errors in output panel
- Ensure all brackets and quotes are closed
- Verify variable names are defined before use

**File Won't Save**

- Check disk space
- Verify write permissions
- Ensure filename contains no invalid characters

**Output Not Appearing**

- Check if code uses `out()` function
- Verify code execution completed (no infinite loops)
- Clear output panel and run again

**Input Prompt Not Working**

- Ensure you press Enter after typing
- Check that `in()` function is used correctly
- Verify prompt message is displayed

### Error Messages

**"Variable 'x' is not defined"**

- Declare variable with `Let x = value` before use
- Check spelling and capitalization

**"Expected ')' to close function"**

- Count opening and closing parentheses
- Ensure proper syntax in function calls

**"Line X: Syntax Error"**

- Click error to jump to problematic line
- Review syntax rules for that statement type

### Performance Tips

- Close unused tabs to free memory
- Clear output panel periodically
- Limit recursive function depth
- Break large programs into functions

---

## Technical Architecture

### Overview

RIDLEY IDE is built using:
- **Electron**: Cross-platform desktop framework
- **Python**: RID language transpiler and execution engine
- **HTML/CSS/JavaScript**: User interface and interaction

### Frontend (Renderer Process)

**Technologies**:
- Vanilla JavaScript (no frameworks)
- CSS3 with custom properties (variables)
- HTML5 semantic markup

**Key Components**:
- Multi-page architecture (Home, Tutorials, IDE)
- Real-time editor with line numbers
- Tab management system
- Drag-and-drop file operations
- Theme system with persistence

### Backend (Python)

**RID Transpiler**:
- `lexer.py`: Tokenization of RID source code
- `parser.py`: Syntax parsing and Python code generation
- `main.py`: Execution coordinator

**Execution Flow**:
1. RID code sent from frontend via IPC
2. Lexer tokenizes source code
3. Parser generates Python AST
4. Python code executed in isolated environment
5. Output streamed back to frontend
6. Interactive input handled bidirectionally

### Electron Main Process

**Responsibilities**:
- Window management and lifecycle
- Python subprocess management
- IPC communication bridge
- File system operations
- Project directory initialization

**Security**:
- Context isolation enabled
- Node integration disabled in renderer
- Preload script exposes safe APIs only

### Inter-Process Communication

**Frontend to Backend**:
- Code execution requests
- User input responses
- File operations (save, load, delete)

**Backend to Frontend**:
- Execution output (streaming)
- Input prompts
- Error messages
- Completion signals

### File Structure

```
RIDLEY/
├── src/                    # Frontend UI
│   ├── index.html         # Main HTML shell
│   ├── css/
│   │   └── styles.css     # All styles
│   ├── js/
│   │   ├── animations.js  # Background effects
│   │   ├── editor.js      # Editor logic
│   │   ├── lessons.js     # Tutorial content
│   │   ├── pages.js       # Navigation
│   │   └── renderer.js    # Theme and window controls
│   └── assets/            # Icons and images
├── backend/               # Python transpiler
│   ├── rid_transpiler/
│   │   ├── lexer.py
│   │   ├── parser.py
│   │   └── __init__.py
│   ├── rid_backend.py     # Entry point
│   └── examples/          # Sample programs
├── main.js                # Electron main process
├── preload.js             # IPC bridge
├── package.json           # Node dependencies
└── forge.config.js        # Build configuration
```

### Packaging

**Build Process**:
1. Python transpiler bundled with PyInstaller
2. Electron app packaged with Electron Forge
3. Platform-specific installers generated
4. ASAR archive for faster loading

**Distribution**:
- Windows: Squirrel installer (.exe)
- macOS: DMG package
- Linux: DEB package and ZIP archive

---

## Development

### Prerequisites

- Node.js 14+ and npm
- Python 3.7+
- PyInstaller (for backend compilation)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run in development mode:
   ```bash
   npm start
   ```

### Building

**Backend**:
```bash
npm run build:backend
```

**Full Application**:
```bash
npm run make
```

**Package Without Installer**:
```bash
npm run package
```

### Project Structure for Development

- **src/**: Modify UI and frontend logic
- **backend/rid_transpiler/**: Modify language implementation
- **main.js**: Modify window management
- **preload.js**: Modify IPC interface

### Contributing

Contributions are welcome. Please:
1. Fork the repository
2. Create a feature branch
3. Submit pull request with clear description
4. Include tests where applicable

### License

MIT License - See LICENSE file for details

---

## Additional Resources

**RID Language Repository**: [github.com/Aloy17/RID-language](https://github.com/Aloy17/RID-language)

**Issue Tracker**: Report bugs and request features through GitHub Issues

**Author**: Ryane Bose

---

**Version**: 1.0.0  
**Last Updated**: 2025

For questions and support, please visit the GitHub repository or contact the maintainer.
