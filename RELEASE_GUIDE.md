# 📦 Creating Releases for RID IDE

This guide explains how to build and distribute RID IDE so users can download and run it without any dependencies.

---

## 🎯 Goal

Users should be able to:
1. Download a single installer file
2. Run the installer
3. Launch RID IDE immediately
4. No Node.js, Python, or npm required

---

## 🛠️ Building Installers

### Prerequisites (For Maintainers Only)

- Node.js 16+
- Python 3.7+
- npm

### Build Commands

```bash
# Install dependencies (one-time)
npm install

# Build for your current platform
npm run make

# Output will be in: out/make/
```

### Platform-Specific Builds

**Windows (creates .exe installer):**
```bash
npm run make
# Output: out/make/squirrel.windows/x64/RID-IDE-Setup.exe
```

**macOS (creates .dmg):**
```bash
npm run make
# Output: out/make/RID-IDE.dmg
```

**Linux (creates .AppImage and .deb):**
```bash
npm run make
# Output: out/make/RID-IDE.AppImage
#         out/make/deb/x64/rid-ide_1.2.0_amd64.deb
```

---

## 📤 Publishing to GitHub Releases

### Manual Release Process

1. **Build the installers:**
   ```bash
   npm run make
   ```

2. **Create a new release on GitHub:**
   - Go to your repository on GitHub
   - Click "Releases" → "Create a new release"
   - Tag version: `v1.2.0`
   - Release title: `RID IDE v1.2.0`
   - Description: List new features/changes

3. **Upload the installers:**
   - Drag and drop files from `out/make/` folder:
     - `RID-IDE-Setup.exe` (Windows)
     - `RID-IDE.dmg` (macOS)
     - `RID-IDE.AppImage` (Linux)
     - `rid-ide_1.2.0_amd64.deb` (Linux/Debian)

4. **Publish the release**

5. **Update README.md:**
   - Update the release links
   - Update version numbers

---

## 🤖 Automated Releases (GitHub Actions)

For automatic building on every release, create `.github/workflows/release.yml`:

```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ${{ matrix.os }}
    
    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run make
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: installers-${{ matrix.os }}
          path: out/make/**/*
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        if: startsWith(github.ref, 'refs/tags/')
        with:
          files: out/make/**/*
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### To trigger automatic build:

```bash
# Tag a release
git tag v1.2.0
git push origin v1.2.0

# GitHub Actions will automatically:
# 1. Build for Windows, macOS, Linux
# 2. Create a release
# 3. Upload all installers
```

---

## 📋 What Gets Bundled

When you build installers, they include:

✅ **Electron app** (all HTML/CSS/JS)  
✅ **Node.js runtime** (embedded)  
✅ **Python runtime** (embedded via PyInstaller - TODO)  
✅ **RID transpiler** (lexer.py, parser.py)  
✅ **Example files** (6 RID examples)  
✅ **SVG icons**  
✅ **All dependencies**  

**Users don't need to install anything!**

---

## 🔧 Current Limitations

### Python Bundling (TODO)

Currently, users need Python installed. To fix this:

1. **Install PyInstaller:**
   ```bash
   pip install pyinstaller
   ```

2. **Bundle Python backend:**
   ```bash
   cd backend
   pyinstaller --onefile rid_backend.py
   ```

3. **Update forge.config.js:**
   ```javascript
   packagerConfig: {
     extraResource: [
       './backend/dist/rid_backend.exe',  // Windows
       './backend/rid_transpiler/'
     ]
   }
   ```

4. **Update main.js to use bundled Python:**
   ```javascript
   const pythonPath = app.isPackaged
     ? path.join(process.resourcesPath, 'rid_backend.exe')
     : path.join(__dirname, 'backend', 'rid_backend.py');
   ```

This will make the app truly standalone!

---

## 📊 Installer Sizes

**Expected file sizes:**

- **Windows (.exe):** ~150-200 MB
  - Electron runtime: ~120 MB
  - Python runtime: ~30 MB (when bundled)
  - App code: ~5 MB

- **macOS (.dmg):** ~160-210 MB
  - Similar breakdown

- **Linux (.AppImage):** ~150-200 MB
  - Similar breakdown

**Why so large?**
- Includes entire Chromium browser (Electron)
- Includes Python interpreter
- Ensures zero-dependency experience

---

## 🎯 Release Checklist

Before creating a release:

- [ ] Update version in `package.json`
- [ ] Update version badge in `README.md`
- [ ] Test on Windows, macOS, and Linux
- [ ] Run `npm run make` successfully
- [ ] Test the built installer
- [ ] Write release notes
- [ ] Create git tag
- [ ] Push to GitHub
- [ ] Upload installers to release
- [ ] Announce the release

---

## 📝 Version Numbers

Use semantic versioning:

- **Major** (1.x.x): Breaking changes
- **Minor** (x.2.x): New features (like v1.2 tutorial pages)
- **Patch** (x.x.1): Bug fixes

Current version: **v1.2.0**

---

## 🌐 Distribution Strategy

### For End Users (Non-Technical)

**Primary method:** GitHub Releases with installers
- Clear download buttons
- Platform-specific instructions
- One-click install

### For Developers

**Secondary method:** Clone and run from source
- Allows contributions
- Easier to debug
- Faster iteration

### For Package Managers (Future)

**Optional:** Submit to package managers
- `winget` (Windows)
- `brew` (macOS)
- `snap` / `flatpak` (Linux)

---

## 💡 Making It Easier

### Add a "Download" Page

Create a simple landing page: `docs/index.html`

```html
<!DOCTYPE html>
<html>
<head>
    <title>Download RID IDE</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background: #1a0a2e;
            color: #f3e8ff;
        }
        .download-btn {
            display: inline-block;
            margin: 20px;
            padding: 20px 40px;
            background: #a855f7;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-size: 18px;
        }
        .download-btn:hover {
            background: #c084fc;
        }
    </style>
</head>
<body>
    <h1>Download RID IDE</h1>
    <p>Choose your platform:</p>
    
    <a href="https://github.com/YOUR_USERNAME/RID-IDE/releases/latest/download/RID-IDE-Setup.exe" class="download-btn">
        🪟 Windows
    </a>
    
    <a href="https://github.com/YOUR_USERNAME/RID-IDE/releases/latest/download/RID-IDE.dmg" class="download-btn">
        🍎 macOS
    </a>
    
    <a href="https://github.com/YOUR_USERNAME/RID-IDE/releases/latest/download/RID-IDE.AppImage" class="download-btn">
        🐧 Linux
    </a>
</body>
</html>
```

Then enable GitHub Pages to host this at:
`https://YOUR_USERNAME.github.io/RID-IDE/`

---

## ✅ Summary

**What users download:**
- Single installer file (150-200 MB)

**What users do:**
1. Download
2. Install
3. Run

**What users DON'T need:**
- ❌ Node.js
- ❌ npm
- ❌ Python (once bundled)
- ❌ Git
- ❌ Any terminal commands

**That's the goal of a standalone desktop app!** 🎉

---

## 📞 Next Steps

1. **Now:** Users can run from source (`git clone` + `npm install` + `npm start`)
2. **Soon:** Bundle Python with PyInstaller
3. **Then:** Create first release with installers
4. **Future:** Automate with GitHub Actions

Your RID IDE will be as easy to install as any other desktop app!
