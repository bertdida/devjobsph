module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,

  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/forbid-prop-types': 'off',
    'no-use-before-define': ['error', { functions: false }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    camelcase: 'off',
    'react/jsx-props-no-spreading': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
