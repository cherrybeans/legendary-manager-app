module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            actions: './src/redux/actions',
            reducers: './src/redux/reducers',
            components: './src/components',
            containers: './src/containers',
            constants: './src/constants',
            screens: './src/screens',
            navigation: './src/navigation',
            utils: './src/utils',
            queries: './src/queries',
          },
        },
      ],
    ],
  };
};
