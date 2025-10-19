module.exports = {
  packagerConfig: {
    name: 'RID IDE',
    executableName: 'rid-ide',
    icon: './src/assets/icon',
    extraResource: ['./backend'],
    asar: true
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'RID-IDE',
        setupIcon: './src/assets/icon.ico',
        iconUrl: 'https://example.com/icon.ico',
        loadingGif: './src/assets/loading.gif'
      }
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        icon: './src/assets/icon.icns',
        name: 'RID-IDE'
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: './src/assets/icon.png',
          maintainer: 'Ryane Bose',
          homepage: 'https://github.com/ryanebose/rid'
        }
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux']
    }
  ]
};
