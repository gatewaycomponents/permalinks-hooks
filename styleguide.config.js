const path = require('path');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');

const {
  name, version, repository,
} = require('./package.json');

module.exports = {
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
  configureServer(app) {
    // `app` is the instance of the express server running Styleguidist
    app.get('/*', (req, res) => {
      res.status(200).send({ response: 'Server invoked' })
    })
  },
  // webpackConfig: {
  //   devServer: {
  //     publicPath: '/',
  //   },
  //   devtool: 'source-map',
  //   module: {
  //     rules: [
  //       {
  //         test: /\.js$/,
  //         exclude: /node_modules/,
  //         loader: 'babel-loader',
  //       },
  //       {
  //         test: /\.jsx$/,
  //         exclude: /node_modules/,
  //         loader: 'babel-loader',
  //       }
  //     ],
  //   },
  // }
};