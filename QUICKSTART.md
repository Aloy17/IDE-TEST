# Quick Start Guide - RID IDE# Quick Start Guide - RID IDE



Get started with RID IDE in minutes!Get started with RID IDE in minutes!



------



## FOR END USERS (Recommended - Zero Setup!)## FOR END USERS (Recommended - Zero Setup!)



### Step 1: Download Installer### Step 1: Download Installer



**Windows (64-bit):****Windows (64-bit):**

1. Go to [Releases](https://github.com/Aloy17/IDE-TEST/releases/latest)1. Go to [Releases](https://github.com/Aloy17/IDE-TEST/releases/latest)

2. Download `RID-IDE-Setup.exe`2. Download `RID-IDE-Setup.exe`

3. Run the installer3. Run the installer

4. Launch from Start Menu4. Launch from Start Menu



**No Node.js, Python, or npm needed!****No Node.js, Python, or npm needed!**



**Platform: Windows Only**### Step 2: Start Learning



### Step 2: Start Learning1. Loading Screen - Binary rain animation

2. Home Page - Click **TUTORIAL**

1. Loading Screen - Binary rain animation3. Learn RID through 6 complete lessons

2. Home Page - Click **TUTORIAL**4. Click **IDE** to write your own code

3. Learn RID through 6 complete lessons

4. Click **IDE** to write your own code---



---## FOR DEVELOPERS (From Source)



## FOR DEVELOPERS (From Source)### Prerequisites



### Prerequisites- Node.js 16+

- Python 3.7+

- Node.js 16+- Git

- Python 3.7+- Windows OS

- Git

- Windows OS



### Quick Start```bash### Test File Operations:



```bashgit clone https://github.com/YOUR_USERNAME/RID-IDE.git1. Click **NEW** → Creates blank editor

git clone https://github.com/Aloy17/IDE-TEST.git

cd IDE-TESTcd RID-IDE2. Write code

npm install

npm startnpm install3. Click **SAVE** → Save dialog opens

```

npm start4. Save as `test.rid`

### Build Installers

```5. See file appear in sidebar

```bash

npm run make6. Click file in sidebar → Opens it

# Output: out/make/squirrel.windows/x64/

```### Build Installers



---## Troubleshooting



## Step-by-Step Development Guide```bash



### Step 1: Install Dependenciesnpm run make### If you see: "npm: command not found"



Open PowerShell in the IDE-TEST folder and run:# Output: out/make/**Solution:** Install Node.js from https://nodejs.org/



```powershell```

npm install

```### If you see: "Python not found"



This will install:---**Solution:** Install Python 3.7+ from https://www.python.org/

- electron (v28.0.0)

- @electron-forge/cli

- All build tools

## 🎮 Using the IDE### If fonts don't load:

Expected output:

```**Solution:** Requires internet connection for Google Fonts

added 493 packages in 1m

```### Navigation



### Step 2: Run the Application- **HOME** - Main menu### If code execution fails:



```powershell- **TUTORIAL** - 6 lessons**Check:**

npm start

```- **IDE** - Code editor```powershell



Expected behavior:python --version

1. Electron window opens (1400x900)

2. Loading screen appears with binary rain### Code Editor```

3. Purple "RID" logo pulses

4. Progress bar fills- **NEW** - Create fileShould show Python 3.7 or higher

5. After 2.5 seconds - Home page

6. Floating particles in background- **SAVE** - Save code



### Step 3: Test the IDE- **RUN** - Execute (F5)If not, edit `main.js` line 67:



**Test Navigation:**```javascript

1. Click **TUTORIAL** button - See 6 lessons

2. Click **BACK** button - Return to home### Keyboard Shortcuts// Change from:

3. Click **IDE** button - Open code editor

- `Ctrl+S` - Saveconst pythonProcess = spawn('python', [pythonScript]);

**Test Code Editor:**

1. Type some RID code:- `F5` - Run

```rid

out("Hello World!")- `Ctrl+N` - New file// To:

line

```const pythonProcess = spawn('python3', [pythonScript]);

2. Click **RUN** button

3. Check output panel shows: `Hello World!`---```



**Test File Operations:**

1. Click **NEW** - Creates blank editor

2. Write code## 📚 Learn RID## Features to Test

3. Click **SAVE** - Save dialog opens

4. Save as `test.rid`

5. See file appear in sidebar

6. Click file in sidebar - Opens it**6 Complete Lessons:**- [ ] Loading screen animation



---1. Getting Started - `out()` function- [ ] Home page buttons



## Troubleshooting2. Variables & Types- [ ] Tutorial cards (click to see lesson)



### If you see: "npm: command not found"3. Conditionals - `agar`, `ya_fir`, `warna`- [ ] IDE sidebar navigation

**Solution:** Install Node.js from https://nodejs.org/

4. Loops - `Run`, `jab_tak`- [ ] Code editor (type, tab key, line numbers)

### If you see: "Python not found"

**Solution:** Install Python 3.7+ from https://www.python.org/5. Functions - `func`, `give`- [ ] Run button (execute code)



### If fonts don't load:6. Complete Projects- [ ] Save button (save file dialog)

**Solution:** Requires internet connection for Google Fonts

- [ ] New button (clear editor)

### If code execution fails:

**Check:**Click any lesson → View content → Click NEXT to continue- [ ] File list (click to open files)

```powershell

python --version- [ ] Output panel (success/error messages)

```

Should show Python 3.7 or higher---- [ ] Keyboard shortcuts (Ctrl+S, F5)



If not, edit `main.js` line 75:

```javascript

// Change from:## 🔧 Troubleshooting## Next Steps

const pythonProcess = spawn('python', [pythonScript]);



// To:

const pythonProcess = spawn('python3', [pythonScript]);**App won't start:**Once everything works:

```

```bash

---

rm -rf node_modules### Build Installers:

## Using the IDE

npm install```powershell

### Navigation

- **HOME** - Main menunpm startnpm run make

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
