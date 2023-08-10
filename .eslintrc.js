module.exports = {
  root: true,
  extends: '@react-native-community', //react-app
  rules: {
    'react-native/no-inline-styles': 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react-hooks/exhaustive-deps': 'off', // 'react/prop-types': 0,
    '@typescript-eslint/no-unused-vars': 'off',
    'react/no-unstable-nested-components': [
      'off' || 'warn' || 'error',
      {
        allowAsProps: true | false,
        customValidators: [] /* optional array of validators used for propTypes validation */,
      },
    ],
  },
};
