module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '^react-native$': 'react-native-web',
        },
      },
      'react-native-reanimated/plugin',
    ],
  ],
};
