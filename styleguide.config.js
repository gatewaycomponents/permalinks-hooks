const path = require('path');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');

const {
  name, version, repository,
} = require('./package.json');

module.exports = {
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    webpackConfig.output.publicPath = '/';
    console.log(webpackConfig);
    return webpackConfig;
  },
  pagePerSection: true,
  usageMode: 'expand',
  exampleMode: 'expand',
  components: 'src/documentation/**/*.{js,jsx,ts,tsx}',
  moduleAliases: { 'dcs-permalinks': path.resolve(__dirname, 'src') },
  getComponentPathLine: componentPath => {
    const name = path.basename(componentPath, '.js');
    return `import { ${name.split('.')[0]} } from 'dcs-permalinks';`;
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