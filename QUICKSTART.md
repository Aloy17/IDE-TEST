# Quick Start Guide - RID IDE# Quick Start Guide - RID IDE# Quick Start Guide - RID IDE



Get started with RID IDE in minutes!



---Get started with RID IDE in minutes!Get started with RID IDE in minutes!



## FOR END USERS (Recommended - Zero Setup!)



### Step 1: Download Installer------



**Windows (64-bit):**

1. Go to [Releases](https://github.com/Aloy17/IDE-TEST/releases/latest)

2. Download `RID-IDE-Setup.exe` (approximately 130 MB)## FOR END USERS (Recommended - Zero Setup!)## FOR END USERS (Recommended - Zero Setup!)

3. Run the installer

4. Launch from Start Menu



**No Node.js or Python required!** Python runtime is bundled inside the application.### Step 1: Download Installer### Step 1: Download Installer



**Platform: Windows Only**



### Step 2: Start Learning**Windows (64-bit):****Windows (64-bit):**



1. Loading Screen - Binary rain animation1. Go to [Releases](https://github.com/Aloy17/IDE-TEST/releases/latest)1. Go to [Releases](https://github.com/Aloy17/IDE-TEST/releases/latest)

2. Home Page - Click **TUTORIAL**

3. Learn RID through 6 complete lessons2. Download `RID-IDE-Setup.exe`2. Download `RID-IDE-Setup.exe`

4. Click **IDE** to write your own code

3. Run the installer3. Run the installer

---

4. Launch from Start Menu4. Launch from Start Menu

## FOR DEVELOPERS (From Source)



### Prerequisites

**No Node.js, Python, or npm needed!****No Node.js, Python, or npm needed!**

- Node.js 16+

- Python 3.7+ (with PyInstaller)

- Git

- Windows OS**Platform: Windows Only**### Step 2: Start Learning



### Quick Start



```bash### Step 2: Start Learning1. Loading Screen - Binary rain animation

git clone https://github.com/Aloy17/IDE-TEST.git

cd IDE-TEST2. Home Page - Click **TUTORIAL**

npm install

npm start1. Loading Screen - Binary rain animation3. Learn RID through 6 complete lessons

```

2. Home Page - Click **TUTORIAL**4. Click **IDE** to write your own code

### Build Installers

3. Learn RID through 6 complete lessons

```bash

npm run make4. Click **IDE** to write your own code---

# This automatically builds the Python backend and packages everything

# Output: out/make/squirrel.windows/x64/

```

---## FOR DEVELOPERS (From Source)

---



## Step-by-Step Development Guide

## FOR DEVELOPERS (From Source)### Prerequisites

### Step 1: Install Dependencies



Open PowerShell in the IDE-TEST folder and run:

### Prerequisites- Node.js 16+

```powershell

npm install- Python 3.7+

```

- Node.js 16+- Git

This will install:

- electron (v28.0.0)- Python 3.7+- Windows OS

- @electron-forge/cli

- All build dependencies- Git



Expected output:- Windows OS

```

added 493 packages in 1m

```

### Quick Start```bash### Test File Operations:

### Step 2: Build Python Backend (First Time Only)



```powershell

npm run build:backend```bashgit clone https://github.com/YOUR_USERNAME/RID-IDE.git1. Click **NEW** → Creates blank editor

```

git clone https://github.com/Aloy17/IDE-TEST.git

This creates a standalone `rid_backend.exe` that bundles Python.

cd IDE-TESTcd RID-IDE2. Write code

Expected output:

```npm install

Building EXE from EXE-00.toc completed successfully.

```npm startnpm install3. Click **SAVE** → Save dialog opens



### Step 3: Run the Application```



```powershellnpm start4. Save as `test.rid`

npm start

```### Build Installers



Expected behavior:```5. See file appear in sidebar

1. Electron window opens (1400x900)

2. Loading screen appears with binary rain```bash

3. Purple "RID" logo pulses

4. Progress bar fillsnpm run make6. Click file in sidebar → Opens it

5. After 2.5 seconds - Home page

6. Floating particles in background# Output: out/make/squirrel.windows/x64/



### Step 4: Test the IDE```### Build Installers



**Test Navigation:**

1. Click **TUTORIAL** button - See 6 lessons

2. Click **BACK** button - Return to home---## Troubleshooting

3. Click **IDE** button - Open code editor



**Test Code Editor:**

1. Type some RID code:## Step-by-Step Development Guide```bash

```rid

out("Hello World!")

line

```### Step 1: Install Dependenciesnpm run make### If you see: "npm: command not found"

2. Click **RUN** button

3. Check output panel shows: `Hello World!`



**Test File Operations:**Open PowerShell in the IDE-TEST folder and run:# Output: out/make/**Solution:** Install Node.js from https://nodejs.org/

1. Click **NEW** - Creates blank editor

2. Write code

3. Click **SAVE** - Save dialog opens

4. Save as `test.rid````powershell```

5. See file appear in sidebar

6. Click file in sidebar - Opens itnpm install



---```### If you see: "Python not found"



## Troubleshooting



### For End Users (Installed App)This will install:---**Solution:** Install Python 3.7+ from https://www.python.org/



**If the app won't start:**- electron (v28.0.0)

- Make sure you downloaded the latest version

- Try reinstalling- @electron-forge/cli

- Check Windows Event Viewer for errors

- All build tools

**If code won't run:**

- This should not happen - Python is bundled## 🎮 Using the IDE### If fonts don't load:

- Report the issue on GitHub

Expected output:

### For Developers

```**Solution:** Requires internet connection for Google Fonts

**If you see: "npm: command not found"**

**Solution:** Install Node.js from https://nodejs.org/added 493 packages in 1m



**If you see: "Python not found" (during development)**```### Navigation

**Solution:** Install Python 3.7+ from https://www.python.org/



**If you see: "pyinstaller: command not found"**

**Solution:** ### Step 2: Run the Application- **HOME** - Main menu### If code execution fails:

```powershell

pip install pyinstaller

```

```powershell- **TUTORIAL** - 6 lessons**Check:**

**If fonts don't load:**

**Solution:** Requires internet connection for Google Fontsnpm start



**If code execution fails in development:**```- **IDE** - Code editor```powershell

**Check:**

```powershell

python --version

```Expected behavior:python --version

Should show Python 3.7 or higher

1. Electron window opens (1400x900)

If not, edit `main.js` line 75:

```javascript2. Loading screen appears with binary rain### Code Editor```

// Change from:

ridProcess = spawn('python', [pythonScript]);3. Purple "RID" logo pulses



// To:4. Progress bar fills- **NEW** - Create fileShould show Python 3.7 or higher

ridProcess = spawn('python3', [pythonScript]);

```5. After 2.5 seconds - Home page



---6. Floating particles in background- **SAVE** - Save code



## Using the IDE



### Navigation### Step 3: Test the IDE- **RUN** - Execute (F5)If not, edit `main.js` line 67:

- **HOME** - Main menu

- **TUTORIAL** - 6 lessons

- **IDE** - Code editor

**Test Navigation:**```javascript

### Code Editor

- **NEW** - Create file1. Click **TUTORIAL** button - See 6 lessons

- **SAVE** - Save code

- **RUN** - Execute (F5)2. Click **BACK** button - Return to home### Keyboard Shortcuts// Change from:



### Keyboard Shortcuts3. Click **IDE** button - Open code editor

- `Ctrl+S` - Save

- `F5` - Run- `Ctrl+S` - Saveconst pythonProcess = spawn('python', [pythonScript]);

- `Ctrl+N` - New file

**Test Code Editor:**

---

1. Type some RID code:- `F5` - Run

## Learn RID

```rid

**6 Complete Lessons:**

1. Getting Started - `out()` functionout("Hello World!")- `Ctrl+N` - New file// To:

2. Variables & Types

3. Conditionals - `agar`, `ya_fir`, `warna`line

4. Loops - `Run`, `jab_tak`

5. Functions - `func`, `give````const pythonProcess = spawn('python3', [pythonScript]);

6. Complete Projects

2. Click **RUN** button

Click any lesson - View content - Click NEXT to continue

3. Check output panel shows: `Hello World!`---```

---



## Features to Test

**Test File Operations:**

- [ ] Loading screen animation

- [ ] Home page buttons1. Click **NEW** - Creates blank editor

- [ ] Tutorial cards (click to see lesson)

- [ ] IDE sidebar navigation2. Write code## 📚 Learn RID## Features to Test

- [ ] Code editor (type, tab key, line numbers)

- [ ] Run button (execute code)3. Click **SAVE** - Save dialog opens

- [ ] Save button (save file dialog)

- [ ] New button (clear editor)4. Save as `test.rid`

- [ ] File list (click to open files)

- [ ] Output panel (success/error messages)5. See file appear in sidebar

- [ ] Keyboard shortcuts (Ctrl+S, F5)

6. Click file in sidebar - Opens it**6 Complete Lessons:**- [ ] Loading screen animation

---



## Next Steps

---1. Getting Started - `out()` function- [ ] Home page buttons

Once everything works:



### Build Installers:

```powershell## Troubleshooting2. Variables & Types- [ ] Tutorial cards (click to see lesson)

npm run make

```



This creates installers in `out/make/` folder.### If you see: "npm: command not found"3. Conditionals - `agar`, `ya_fir`, `warna`- [ ] IDE sidebar navigation

- Automatically builds Python backend first

- Packages everything together**Solution:** Install Node.js from https://nodejs.org/

- Creates Windows installer

4. Loops - `Run`, `jab_tak`- [ ] Code editor (type, tab key, line numbers)

### Package Without Installer:

```powershell### If you see: "Python not found"

npm run package

```**Solution:** Install Python 3.7+ from https://www.python.org/5. Functions - `func`, `give`- [ ] Run button (execute code)



This creates a portable app in `out/` folder.



---### If fonts don't load:6. Complete Projects- [ ] Save button (save file dialog)



## Quick Reference**Solution:** Requires internet connection for Google Fonts



### RID Language Basics- [ ] New button (clear editor)



**Print:**### If code execution fails:

```rid

out("Hello")**Check:**Click any lesson → View content → Click NEXT to continue- [ ] File list (click to open files)

line

``````powershell



**Variables:**python --version- [ ] Output panel (success/error messages)

```rid

Let x = 10```

```

Should show Python 3.7 or higher---- [ ] Keyboard shortcuts (Ctrl+S, F5)

**Loops:**

```rid

Run(5) {

    out("Hi")If not, edit `main.js` line 75:

}

``````javascript



**Conditionals:**// Change from:## 🔧 Troubleshooting## Next Steps

```rid

agar(x > 0) {const pythonProcess = spawn('python', [pythonScript]);

    out("Positive")

}

```

// To:

**Functions:**

```ridconst pythonProcess = spawn('python3', [pythonScript]);**App won't start:**Once everything works:

func add(a, b) {

    give a + b```

}

``````bash



------



## Important Notesrm -rf node_modules### Build Installers:



- **End Users:** No Python installation required - it's bundled!## Using the IDE

- **Developers:** Need Python + PyInstaller to build the backend

- **Platform:** Windows only (64-bit)npm install```powershell

- **Size:** Installer is approximately 130 MB (includes Python runtime)

### Navigation

---

- **HOME** - Main menunpm startnpm run make

**Need Help?** Check README.md for full documentation.

- **TUTORIAL** - 6 lessons

- **IDE** - Code editor``````



### Code Editor

- **NEW** - Create file

- **SAVE** - Save code**Code won't run:**This creates installers in `out/make/` folder.

- **RUN** - Execute (F5)

- Press F12 → Console tab → Check errors

### Keyboard Shortcuts

- `Ctrl+S` - Save### Package Without Installer:

- `F5` - Run

- `Ctrl+N` - New file**Need help?**```powershell



---- GitHub Issues: Report bugsnpm run package



## Learn RID- Discussions: Ask questions```



**6 Complete Lessons:**

1. Getting Started - `out()` function

2. Variables & Types---This creates a portable app in `out/` folder.

3. Conditionals - `agar`, `ya_fir`, `warna`

4. Loops - `Run`, `jab_tak`

5. Functions - `func`, `give`

6. Complete Projects## 🎉 You're Ready!---



Click any lesson - View content - Click NEXT to continue



---**End Users:** Download → Install → Learn  ## Quick Reference



## Features to Test**Developers:** Clone → Install → Code



- [ ] Loading screen animation### RID Language Basics

- [ ] Home page buttons

- [ ] Tutorial cards (click to see lesson)Enjoy RID IDE! 🚀

- [ ] IDE sidebar navigation

- [ ] Code editor (type, tab key, line numbers)**Print:**

- [ ] Run button (execute code)```rid

- [ ] Save button (save file dialog)out("Hello")

- [ ] New button (clear editor)line

- [ ] File list (click to open files)```

- [ ] Output panel (success/error messages)

- [ ] Keyboard shortcuts (Ctrl+S, F5)**Variables:**

```rid

---Let x = 10

```

## Next Steps

**Loops:**

Once everything works:```rid

Run(5) {

### Build Installers:    out("Hi")

```powershell}

npm run make```

```

**Conditionals:**

This creates installers in `out/make/` folder.```rid

agar(x > 0) {

### Package Without Installer:    out("Positive")

```powershell}

npm run package```

```

**Functions:**

This creates a portable app in `out/` folder.```rid

func add(a, b) {

---    give a + b

}

## Quick Reference```



### RID Language Basics---



**Print:****Need Help?** Check README.md for full documentation.

```rid
out("Hello")
line
```

**Variables:**
```rid
Let x = 10
```

**Loops:**
```rid
Run(5) {
    out("Hi")
}
```

**Conditionals:**
```rid
agar(x > 0) {
    out("Positive")
}
```

**Functions:**
```rid
func add(a, b) {
    give a + b
}
```

---

**Need Help?** Check README.md for full documentation.
