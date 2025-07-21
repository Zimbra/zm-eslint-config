module.exports = {
  // Rules from react.js file
  'react/jsx-boolean-value': ['error', 'never'],
  'react/jsx-closing-bracket-location': 'error',
  'react/jsx-curly-spacing': 'error',
  'react/display-name': ['error', { ignoreTranspilerName: false }],
  'react/jsx-equals-spacing': 'error',
  'react/jsx-indent-props': ['error', 'tab'],
  'react/jsx-max-props-per-line': ['error', { maximum: 6 }],
  'react/jsx-no-bind': ['error', { ignoreRefs: true }],
  'react/jsx-no-comment-textnodes': 'error',
  'react/jsx-no-duplicate-props': 'error',
  'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
  'react/jsx-no-undef': 'error',
  'react/jsx-pascal-case': 'error',
  'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
  'react/jsx-uses-vars': 'error',
  'react/no-danger': 'error',
  'react/no-did-mount-set-state': 'error',
  'react/no-did-update-set-state': 'error',
  'react/no-find-dom-node': 'error',
  'react/no-is-mounted': 'error',
  'react/no-string-refs': 'off',
  'react/prefer-es6-class': 'error',
  'react/prefer-stateless-function': 'warn',
  'react/require-render-return': 'error',
  'react/self-closing-comp': 'error',
  'react/sort-comp': [
    'error',
    {
      order: [
        'static-variables',
        'static-methods',
        'lifecycle',
        '/^on.+$/',
        'everything-else',
        'rendering'
      ],
      groups: {
        rendering: ['/^render.+$/', 'render']
      }
    }
  ]
};
