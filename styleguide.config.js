const path = require('path');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');

const {
  name, version, repository,
} = require('./package.json');

module.exports = {
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    // webpackConfig.plugins[1] points to the mini-html-webpack-plugin, by changing the publicPath to '/' it now embeds the bundles with an absolute path, this is to make permalinks work.
    webpackConfig.plugins[1].options.publicPath = '/'; 
    return webpackConfig;
  },
  pagePerSection: true,
  usageMode: 'expand',
  exampleMode: 'expand',
  components: 'src/documentation/**/*.{js,jsx,ts,tsx}',
  moduleAliases: { 'permalinks-hooks': path.resolve(__dirname, 'src') },
  getComponentPathLine: componentPath => {
    const name = path.basename(componentPath, '.js');
    return `import { ${name.split('.')[0]} } from 'permalinks-hooks';`;
  },
  handlers: componentPath => (
    require('react-docgen').defaultHandlers.concat(
      require('react-docgen-external-proptypes-handler')(componentPath),
      require('react-docgen-displayname-handler').createDisplayNameHandler(componentPath),
    )
  ),
  title: `${upperFirst(camelCase(name))} v${version}`,
  ribbon: {
    url: repository.url,
    text: 'View on GitHub',
  },
};