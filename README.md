# RIDLEY IDE

**A Modern Desktop IDE for the RID Programming Language**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows-blue.svg)]()
[![Built with Electron](https://img.shields.io/badge/Built%20with-Electron-47848F.svg)](https://www.electronjs.org/)

---

## Overview

RIDLEY IDE is a standalone desktop application designed for writing, learning, and executing programs in the RID programming language. With a clean, modern interface and built-in tutorials, RIDLEY makes it easy to start coding in RID—no setup required.

### What is RID?

RID is a beginner-friendly programming language with Hindi-inspired syntax that transpiles to Python. It's perfect for learning programming fundamentals while using familiar keywords like `agar` (if), `warna` (else), and `Run` (loop).

---

## Features

### Zero Installation Required
- Standalone application - Download and run, no dependencies needed
- Built-in RID interpreter - Everything bundled in one package
- Cross-platform ready - Windows support (macOS/Linux coming soon)

### Powerful Code Editor
- Line numbers for easy navigation
- Auto-indentation and smart pairing for braces/quotes
- Multiple file tabs with drag-and-drop reordering
- Folder support with drag-and-drop file organization
- Smart error highlighting - Jump directly to errors in your code

### Interactive Learning
- Built-in tutorials covering all RID features
- 6 structured lessons from basics to complete projects
- Example programs included (Hello World, Calculator, Fibonacci, Games, etc.)
- Instant feedback - Run code and see results immediately

### Beautiful UI
- Dual themes: Quiet Light (day) and Dark Modern (night)
- Animated gradient background for a modern feel
- Responsive design with resizable panels
- Frameless window with custom titlebar
- Smooth animations throughout

### Developer Tools
- Real-time output panel showing program results
- Interactive input support for RID's `in()` function
- Clear error messages with line numbers
- File management - Create, save, delete, and organize files
- Keyboard shortcuts for common actions

---

## Installation

### System Requirements
- **OS:** Windows 10 or higher
- **RAM:** 4GB minimum (8GB recommended)
- **Disk Space:** 200MB free space
- **Display:** 1280x720 minimum resolution

### Download

**Version:** 1.0.0  
**Platform:** Windows 10/11

Download the latest release from the [Releases](https://github.com/Aloy17/RIDLEY/releases) page:

- **Windows Installer (Recommended):** `RIDLEY-Setup.exe`
- **Portable ZIP:** `RIDLEY-Windows.zip`

### Installation Steps

**Using Installer:**
1. Download `RIDLEY-Setup.exe`
2. Run the installer
3. Follow the installation wizard
4. Launch RIDLEY IDE from Start Menu

**Using Portable Version:**
1. Download `RIDLEY-Windows.zip`
2. Extract to desired location
3. Run `rid-ide.exe`

---

## Quick Start

### First Launch

When you first open RIDLEY IDE, you'll see the home screen with two options:

**Start Learning** - Access interactive tutorials to learn RID step-by-step

**Open Editor** - Jump straight into coding

Example files are automatically created in your projects folder at:
```
%APPDATA%/RIDLEY IDE/projects/
```

### Your First Program

1. Click **Open Editor**
2. The default `untitled.rid` file will be open
3. Replace the content with:

```rid
~ Hello World in RID ~
out("Hello, RIDLEY!")
line
```

4. Click the **Run** button (play icon) or press `F5`
5. See the output in the bottom panel

---

## Interface Overview

### Main Window Layout

```
+--------------------------------------------------+
|  RIDLEY IDE                          [-][□][×]  |  <- Titlebar
+--------------------------------------------------+
|  [Back] [Run] [Delete] [Save]         [Theme]   |  <- Toolbar
+--------+-----------------------------------------+
| FILES  |  untitled.rid          hello.rid   [×] |  <- File Tabs
|--------|                                         |
| folder |  1  ~ Hello World ~                     |
| file1  |  2  out("Hello, RIDLEY!")               |  <- Editor
| file2  |  3  line                                |
|        |  4                                      |
+--------+-----------------------------------------+
|        |  OUTPUT                         [Clear] |  <- Output
|        |  > Hello, RIDLEY!                       |     Panel
|        |  > Program executed successfully        |
+--------+-----------------------------------------+
```

### Components

**Titlebar** - Custom window controls (minimize, maximize, close)

**Toolbar** - Quick access buttons:
- Back - Return to home screen
- Run - Execute current file (F5)
- Delete - Remove current file
- Save - Save changes (Ctrl+S)
- Theme - Toggle light/dark mode

**Sidebar** - File management:
- File tree showing all `.rid` files and folders
- New file button (+)
- New folder button
- Drag-and-drop support

**Editor** - Code editing area:
- Line numbers (synced scrolling)
- Syntax highlighting
- Auto-indentation
- Bracket matching

**Output Panel** - Program results:
- Real-time output
- Error messages
- Input prompts
- Clear button

### Resizable Panels

- **Sidebar width** - Drag the right edge (150px - 400px)
- **Output height** - Drag the top edge (minimum 120px)

---

## Writing Code

### Basic RID Syntax

**Variables:**
```rid
Let x = 10
Let name = "Alice"
Let pi = 3.14
```

**Output:**
```rid
out("Hello")        ~ Print without newline ~
line                ~ Print newline ~
```

**Input:**
```rid
Let name = in("Enter your name: ")
out("Hello, " + name)
line
```

**Conditionals:**
```rid
agar(x > 0) {
    out("Positive")
    line
}
warna {
    out("Not positive")
    line
}
```

**Loops:**
```rid
~ Fixed count ~
Run(5) {
    out("Hello")
    line
}

~ While loop ~
Let i = 0
Run while(i < 5) {
    out(i)
    line
    i = i + 1
}
```

**Functions:**
```rid
func add(a, b) {
    give a + b
}

Let result = add(5, 3)
out(result)
line
```

### Type Conversions

```rid
Let str_num = "42"
Let number = num(str_num)     ~ String to integer ~
Let decimal = dec("3.14")     ~ String to float ~
Let text = word(100)          ~ Number to string ~
Let boolean = bool(1)         ~ To boolean ~
```

### Editor Features

**Auto-Indentation**
- Press Enter inside braces `{}` to auto-indent
- Maintains current indentation level

**Smart Pairing**
- Type `(` and get `()` with cursor inside
- Type `{` and get `{}` with cursor inside
- Type `"` and get `""` with cursor inside

**Tab Key**
- Press Tab to insert 2 spaces (not a tab character)

**Line Numbers**
- Automatically updated as you type
- Synced scrolling with editor

---

## Running Programs

### Execute Code

**Method 1:** Click the **Run** button in toolbar

**Method 2:** Press `F5` keyboard shortcut

### Output

The output panel shows:
- **Success messages** in green
- **Error messages** in red
- **Info messages** in blue

### Error Handling

When an error occurs:
1. Error message appears in output with line number
2. The error line is highlighted in the editor
3. Fix the error and run again

Example error:
```
> Line 5 -> Name Error: Variable 'x' is not defined. Use 'Let x = ...' to declare it first
```

### Interactive Input

If your program uses `in()`:
1. Run the program
2. Input prompt appears in output panel
3. Type your input in the input field
4. Press Enter to submit

Example:
```rid
Let name = in("Enter your name: ")
out("Hello, " + name)
line
```

---

## File Management

### Creating Files

1. Click the **+** button in the Files panel
2. Enter filename (`.rid` extension added automatically)
3. Press Enter to create
4. New file opens in editor

**Or use:** `Ctrl+N` keyboard shortcut

### Creating Folders

1. Click the **folder** button in Files panel
2. Enter folder name
3. Press Enter to create

### Opening Files

Click any file in the sidebar to open it in a new tab.

### Saving Files

**Auto-save location:** `%APPDATA%/RIDLEY IDE/projects/`

**Save methods:**
- Click **Save** button in toolbar
- Press `Ctrl+S`
- Files save to their current location

**For new files:**
- First save prompts for filename
- Choose location and name
- File added to sidebar

### Deleting Files

1. Open the file you want to delete
2. Click **Delete** button in toolbar
3. Confirm deletion

**Warning:** This permanently deletes the file from disk.

### Organizing Files

**Drag and Drop:**
- Drag files into folders
- Drag files back to root
- Reorder file tabs by dragging

**Folder Structure:**
```
projects/
├── examples/
│   ├── hello_world.rid
│   └── calculator.rid
├── my_programs/
│   ├── game.rid
│   └── test.rid
└── learning.rid
```

---

## Built-in Tutorials

### Accessing Tutorials

1. Click **Start Learning** on home screen
2. Choose from 6 lessons
3. Each lesson includes:
   - Concept explanation
   - Example code
   - Expected output

### Tutorial Structure

**Lesson 1: Getting Started**
- Basic output with `out()`
- Printing text and expressions

**Lesson 2: Variables & Types**
- Declaring variables
- Working with numbers, strings, booleans
- Variable reassignment

**Lesson 3: Conditionals**
- `agar` (if) statements
- `ya_fir` (elif) chains
- `warna` (else) blocks

**Lesson 4: Loops**
- Fixed-count loops with `Run(n)`
- Conditional loops with `Run while()`

**Lesson 5: Functions**
- Defining functions with `func`
- Parameters and return values
- Calling functions

**Lesson 6: Complete Projects**
- Building a number guessing game
- Combining all concepts

### Navigation

- **Back** button - Return to lesson list
- **Previous** (←) - Go to previous lesson
- **Next** (→) - Go to next lesson

---

## Themes

RIDLEY includes two beautiful themes:

### Quiet Light (Default)
- Clean, minimalist design
- Soft colors for reduced eye strain
- Perfect for daytime coding

### Dark Modern
- Modern dark theme
- High contrast for night work
- Popular among developers

### Switching Themes

Click the **theme toggle button** in the top-right corner (visible on all pages).

Themes persist across sessions - your choice is remembered.

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Run Code | `F5` |
| Save File | `Ctrl+S` |
| New File | `Ctrl+N` |
| Tab (Indent) | `Tab` |
| Close Tab | Click `×` on tab |

---

## Tips & Tricks

### Editor Tips

1. **Use Comments** - Document your code with `~ comments ~`
2. **Indent Properly** - Makes code easier to read
3. **Test Frequently** - Run code often to catch errors early
4. **Use Descriptive Names** - `score` is better than `x`

### Workflow Tips

1. **Organize with Folders** - Group related files
2. **Start with Examples** - Modify existing examples to learn
3. **Follow Tutorials** - Complete all 6 lessons for full understanding
4. **Save Often** - Use `Ctrl+S` regularly

### Common Patterns

**Reading and Processing Input:**
```rid
Let input = in("Enter a number: ")
Let number = num(input)
Let doubled = number * 2
out("Result: " + word(doubled))
line
```

**Input Validation:**
```rid
Let age_str = in("Enter age: ")
Let age = num(age_str)

agar(age < 0) {
    out("Invalid age")
    line
}
warna {
    out("Valid age: " + word(age))
    line
}
```

---

## Troubleshooting

### Common Issues

**Problem: Program doesn't run**
- Check for syntax errors (red underlines)
- Ensure all braces `{}` are matched
- Verify all variables are declared with `Let`

**Problem: "Variable not defined" error**
- Variables must be declared before use
- Use `Let varname = value` first
- Check spelling of variable names

**Problem: Files not showing in sidebar**
- Refresh by clicking a different page and back
- Check files are `.rid` extension
- Ensure files are in projects folder

**Problem: Input prompt not appearing**
- Ensure you're using `in("prompt")` correctly
- Check for syntax errors before the input line
- Wait for program to reach the input statement

**Problem: Theme not switching**
- Try clicking the button again
- Restart RIDLEY IDE
- Check if button is visible on current page

### Getting Help

1. **Check Examples** - Look at included example files
2. **Review Tutorials** - Lessons cover common issues
3. **Read Error Messages** - They include helpful hints
4. **Check Language Spec** - See `language_spec.md`

### Reporting Bugs

Found a bug? Report it on GitHub:

1. Go to [Issues](https://github.com/Aloy17/RIDLEY/issues)
2. Click "New Issue"
3. Include:
   - RIDLEY version
   - Operating system
   - Steps to reproduce
   - Error messages
   - Screenshots if relevant

---

## File Locations

### Windows

**Projects Folder:**
```
%APPDATA%/RIDLEY IDE/projects/
```

**Application Data:**
```
%APPDATA%/RIDLEY IDE/
```

**Installation (Default):**
```
C:\Program Files\RIDLEY IDE\
```

---

## Next Steps

**For Beginners:**
1. Complete all 6 tutorials
2. Modify example programs
3. Create your own simple programs
4. Experiment with features

**For Experienced Programmers:**
1. Read the language specification
2. Build complex projects
3. Contribute examples
4. Report bugs and suggest features

---

## Additional Resources

- **RID Language Repository:** [https://github.com/Aloy17/RID-language](https://github.com/Aloy17/RID-language)
- **Language Specification:** `language_spec.md`
- **Example Programs:** Check the `examples/` folder
- **GitHub Issues:** [https://github.com/Aloy17/RIDLEY/issues](https://github.com/Aloy17/RIDLEY/issues)

---

**Made with care by Ryane Bose**

For questions or support, open an issue on GitHub.
