module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@components': './src/components',
        },
        extensions: ['.tsx', '.js', '.jsx', '.json', '.tsx', '.ts'],
      },
    ],
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
      },
    ],
  ],
};
