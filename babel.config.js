// default build config (used for everything but production)
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/react',
  ],
  plugins: [
    'istanbul',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
  ]
};
