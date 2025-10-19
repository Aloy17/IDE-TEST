# ⚡ RID IDE - Quick Start Guide# 🚀 Quick Start Guide - RID IDE



Get started with RID IDE in minutes!## Step 1: Install Dependencies



---Open PowerShell in the RID-IDE folder and run:



## 📥 FOR END USERS (Recommended - Zero Setup!)```powershell

npm install

### Step 1: Download Installer```



**Choose your platform:**This will install:

- electron (v28.0.0)

**🪟 Windows:**- @electron-forge/cli

1. Go to [Releases](https://github.com/YOUR_USERNAME/RID-IDE/releases/latest)- All build tools

2. Download `RID-IDE-Setup.exe`

3. Run the installerExpected output:

4. Launch from Start Menu```

added 237 packages in 1m

**🍎 macOS:**```

1. Go to [Releases](https://github.com/YOUR_USERNAME/RID-IDE/releases/latest)

2. Download `RID-IDE.dmg`## Step 2: Run the Application

3. Open and drag to Applications

4. Launch from Applications```powershell

npm start

**🐧 Linux:**```

1. Go to [Releases](https://github.com/YOUR_USERNAME/RID-IDE/releases/latest)

2. Download `RID-IDE.AppImage`Expected behavior:

3. `chmod +x RID-IDE.AppImage`1. ✅ Electron window opens (1400x900)

4. `./RID-IDE.AppImage`2. ✅ Loading screen appears with binary rain

3. ✅ Purple "RID" logo pulses

**✅ No Node.js, Python, or npm needed!**4. ✅ Progress bar fills

5. ✅ After 2.5 seconds → Home page

### Step 2: Start Learning6. ✅ Floating particles in background



1. Loading Screen → Binary rain animation## Step 3: Test the IDE

2. Home Page → Click **TUTORIAL**

3. Learn RID through 6 complete lessons### Test Navigation:

4. Click **IDE** to write your own code1. Click **TUTORIAL** button → See 6 lessons

2. Click **◄ BACK** button → Return to home

---3. Click **IDE** button → Open code editor



## 💻 FOR DEVELOPERS (From Source)### Test Code Editor:

1. Type some RID code:

### Prerequisites```rid

- Node.js 16+out("Hello World!")

- Python 3.7+line

- Git```

2. Click **▶ RUN** button

### Quick Start3. Check output panel shows: `Hello World!`



```bash### Test File Operations:

git clone https://github.com/YOUR_USERNAME/RID-IDE.git1. Click **NEW** → Creates blank editor

cd RID-IDE2. Write code

npm install3. Click **SAVE** → Save dialog opens

npm start4. Save as `test.rid`

```5. See file appear in sidebar

6. Click file in sidebar → Opens it

### Build Installers

## Troubleshooting

```bash

npm run make### If you see: "npm: command not found"

# Output: out/make/**Solution:** Install Node.js from https://nodejs.org/

```

### If you see: "Python not found"

---**Solution:** Install Python 3.7+ from https://www.python.org/



## 🎮 Using the IDE### If fonts don't load:

**Solution:** Requires internet connection for Google Fonts

### Navigation

- **HOME** - Main menu### If code execution fails:

- **TUTORIAL** - 6 lessons**Check:**

- **IDE** - Code editor```powershell

python --version

### Code Editor```

- **NEW** - Create fileShould show Python 3.7 or higher

- **SAVE** - Save code

- **RUN** - Execute (F5)If not, edit `main.js` line 67:

```javascript

### Keyboard Shortcuts// Change from:

- `Ctrl+S` - Saveconst pythonProcess = spawn('python', [pythonScript]);

- `F5` - Run

- `Ctrl+N` - New file// To:

const pythonProcess = spawn('python3', [pythonScript]);

---```



## 📚 Learn RID## Features to Test



**6 Complete Lessons:**- [ ] Loading screen animation

1. Getting Started - `out()` function- [ ] Home page buttons

2. Variables & Types- [ ] Tutorial cards (click to see lesson)

3. Conditionals - `agar`, `ya_fir`, `warna`- [ ] IDE sidebar navigation

4. Loops - `Run`, `jab_tak`- [ ] Code editor (type, tab key, line numbers)

5. Functions - `func`, `give`- [ ] Run button (execute code)

6. Complete Projects- [ ] Save button (save file dialog)

- [ ] New button (clear editor)

Click any lesson → View content → Click NEXT to continue- [ ] File list (click to open files)

- [ ] Output panel (success/error messages)

---- [ ] Keyboard shortcuts (Ctrl+S, F5)



## 🔧 Troubleshooting## Next Steps



**App won't start:**Once everything works:

```bash

rm -rf node_modules### Build Installers:

npm install```powershell

npm startnpm run make

``````



**Code won't run:**This creates installers in `out/make/` folder.

- Press F12 → Console tab → Check errors

### Package Without Installer:

**Need help?**```powershell

- GitHub Issues: Report bugsnpm run package

- Discussions: Ask questions```



---This creates a portable app in `out/` folder.



## 🎉 You're Ready!---



**End Users:** Download → Install → Learn  ## Quick Reference

**Developers:** Clone → Install → Code

### RID Language Basics

Enjoy RID IDE! 🚀

**Print:**
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
