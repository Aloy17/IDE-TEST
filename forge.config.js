module.exports = {
  packagerConfig: {
    name: 'RID IDE',
    executableName: 'rid-ide',
    extraResource: [
      './backend/dist/rid_backend.exe',
      './backend/examples'
    ],
    asar: true
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'RID-IDE'
      }
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        name: 'RID-IDE'
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Ryane Bose',
          homepage: 'https://github.com/Aloy17/IDE-TEST'
        }
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux']
    }
  ]
};