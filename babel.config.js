module.exports = function(api) {
  api.cache(true);

  return {
    plugins: [
      'react-hot-loader/babel',
      '@babel/plugin-proposal-optional-chaining',
      [
        '@babel/plugin-transform-runtime',
        {
          regenerator: true,
        },
      ],
      [
        'babel-plugin-styled-components',
        {
          displayName: true,
        },
      ],
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
  };
};
