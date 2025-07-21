import * as reactRules from './rules/react';
import * as securityRules from './rules/security';

const coreConfig = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      // jsx: true,
      // decorators: true
    },
    babelOptions: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
    },
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'//, 'plugin:i18n-json/recommended'
  ],
  plugins: [
    'react',
    'prettier',
    'react-hooks',
    'mocha',
    'preact',
    '@m6web/i18n'
  ],
  env: {
    browser: true,
    mocha: true,
    node: true,
    es2021: true,
  },
  globals: {
    CLIENT: true,
    PKG_VERSION: true,
    BASE_PATH: true,
    BUILD_COMMIT_HASH: true,
    BUILD_TIMESTAMP: true,
    tinyMCE: true,
    webkit: true,
    tinymce: true,
    electron: true,
    CONFIG: true,
    sinon: true,
    expect: true,
    browser: true,
    global: true,
    element: true,
    sleep: true,
    by: true,
    $: true,
  },
  rules: {
    ...reactRules,
    ...securityRules,
    'brace-style': ['error', '1tbs'],
    eqeqeq: ['error', 'smart'],
    'react/jsx-wrap-multilines': 'warn',
    'no-shadow': 'error',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    '@m6web/i18n/no-unknown-key': 'error',
    '@m6web/i18n/no-text-as-attribute': 'error',
    '@m6web/i18n/no-text-as-children': 'error',
    '@m6web/i18n/interpolation-data': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 100,
        trailingComma: 'none',
        arrowParens: 'avoid',
      },
    ],
    'react/jsx-uses-react': 'off', // for Preact 10+
    'react/jsx-uses-vars': 'error', // <--- THIS IS CRUCIAL
    'react/react-in-jsx-scope': 'off',
    'react/jsx-fragments': ['error', 'element'],
    'react/jsx-no-useless-fragment': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-uses-react': 'off',
    'no-empty-pattern': 'off',
    'no-empty': 'off',
  },
  settings: {
    react: {
      version: '16.3',
    },
    'preact': {
      // Customize according to your project
      version: '10.16', // Preact version used in your project
    },
    '@m6web/i18n': {
      principalLangs: [
        { name: 'en_US', path: 'src/intl/en_US.json' },
      ],
      secondaryLangs: [
        { name: 'ar', path: 'src/intl/ar.json' },
        { name: 'bg', path: 'src/intl/bg.json' },
        { name: 'ca', path: 'src/intl/ca.json' },
        { name: 'cs', path: 'src/intl/cs.json' },
        { name: 'da', path: 'src/intl/da.json' },
        { name: 'de', path: 'src/intl/de.json' },
        { name: 'es', path: 'src/intl/es.json' },
        { name: 'eu', path: 'src/intl/eu.json' },
        { name: 'fr_FR', path: 'src/intl/fr_FR.json' },
        { name: 'fr_CA', path: 'src/intl/fr_CA.json' },
        { name: 'hi', path: 'src/intl/hi.json' },
        { name: 'hr', path: 'src/intl/hr.json' },
        { name: 'hu', path: 'src/intl/hu.json' },
        { name: 'id', path: 'src/intl/id.json' },
        { name: 'it', path: 'src/intl/it.json' },
        { name: 'ja', path: 'src/intl/ja.json' },
        { name: 'ko', path: 'src/intl/ko.json' },
        { name: 'lo', path: 'src/intl/lo.json' },
        { name: 'ms', path: 'src/intl/ms.json' },
        { name: 'nl', path: 'src/intl/nl.json' },
        { name: 'nn_NO', path: 'src/intl/nn_NO.json' },
        { name: 'pl', path: 'src/intl/pl.json' },
        { name: 'pt_BR', path: 'src/intl/pt_BR.json' },
        { name: 'pt', path: 'src/intl/pt.json' },
        { name: 'ro', path: 'src/intl/ro.json' },
        { name: 'ru', path: 'src/intl/ru.json' },
        { name: 'sl', path: 'src/intl/sl.json' },
        { name: 'sv', path: 'src/intl/sv.json' },
        { name: 'ta', path: 'src/intl/ta.json' },
        { name: 'th', path: 'src/intl/th.json' },
        { name: 'tr', path: 'src/intl/tr.json' },
        { name: 'uk', path: 'src/intl/uk.json' },
        { name: 'vi', path: 'src/intl/vi.json' },
        { name: 'zh_CN', path: 'src/intl/zh_CN.json' },
        { name: 'zh_HK', path: 'src/intl/zh_HK.json' },
        { name: 'zh_TW', path: 'src/intl/zh_TW.json' }
      ],
      functionName: 't',
      componentNames: ['t']
  }
    // 'preact-i18n': {
    //   languageFiles: [
    //     { name: 'ar', path: 'src/intl/ar.json' },
    //     { name: 'bg', path: 'src/intl/bg.json' },
    //     { name: 'ca', path: 'src/intl/ca.json' },
    //     { name: 'cs', path: 'src/intl/cs.json' },
    //     { name: 'da', path: 'src/intl/da.json' },
    //     { name: 'de', path: 'src/intl/de.json' },
    //     { name: 'en_US', path: 'src/intl/en_US.json' },
    //     { name: 'es', path: 'src/intl/es.json' },
    //     { name: 'eu', path: 'src/intl/eu.json' },
    //     { name: 'fr_FR', path: 'src/intl/fr_FR.json' },
    //     { name: 'fr_CA', path: 'src/intl/fr_CA.json' },
    //     { name: 'hi', path: 'src/intl/hi.json' },
    //     { name: 'hr', path: 'src/intl/hr.json' },
    //     { name: 'hu', path: 'src/intl/hu.json' },
    //     { name: 'id', path: 'src/intl/id.json' },
    //     { name: 'it', path: 'src/intl/it.json' },
    //     { name: 'ja', path: 'src/intl/ja.json' },
    //     { name: 'ko', path: 'src/intl/ko.json' },
    //     { name: 'lo', path: 'src/intl/lo.json' },
    //     { name: 'ms', path: 'src/intl/ms.json' },
    //     { name: 'nl', path: 'src/intl/nl.json' },
    //     { name: 'nn_NO', path: 'src/intl/nn_NO.json' },
    //     { name: 'pl', path: 'src/intl/pl.json' },
    //     { name: 'pt_BR', path: 'src/intl/pt_BR.json' },
    //     { name: 'pt', path: 'src/intl/pt.json' },
    //     { name: 'ro', path: 'src/intl/ro.json' },
    //     { name: 'ru', path: 'src/intl/ru.json' },
    //     { name: 'sl', path: 'src/intl/sl.json' },
    //     { name: 'sv', path: 'src/intl/sv.json' },
    //     { name: 'ta', path: 'src/intl/ta.json' },
    //     { name: 'th', path: 'src/intl/th.json' },
    //     { name: 'tr', path: 'src/intl/tr.json' },
    //     { name: 'uk', path: 'src/intl/uk.json' },
    //     { name: 'vi', path: 'src/intl/vi.json' },
    //     { name: 'zh_CN', path: 'src/intl/zh_CN.json' },
    //     { name: 'zh_HK', path: 'src/intl/zh_HK.json' },
    //     { name: 'zh_TW', path: 'src/intl/zh_TW.json' }
    //   ]
    //   // textComponents: [
    //   //   { nameRegex: '^Text$' },
    //   //   { nameRegex: '^TextInput$', id: 'placeholderId' },
    //   //   { nameRegex: '^AlignedLabel$', id: 'textId' },
    //   //   { nameRegex: '^(?:Inline)?Modal(?:Dialog|Drawer)', id: 'title' },
    //   //   { nameRegex: '^ContactSuggestion$', id: 'previouslySelectedLabel' }
    //   // ]
    // }
  },
};

export default coreConfig;