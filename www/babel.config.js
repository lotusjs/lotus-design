module.exports = {
  presets: [
    require.resolve('@docusaurus/core/lib/babel/preset')
  ],
  plugins: [
    ['import', {
      libraryName: '@sensoro-design/react',
      libraryDirectory: 'src',
      // camel2DashComponentName: false,
      style: (name) => {
        console.log(name)
        return require('path').join(name, 'style/index.less');
      }
    }]
  ]
};
