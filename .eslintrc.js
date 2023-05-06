module.exports = {
  extends: 'airbnb-base',
  rules: {
    'comma-dangle': 0,
    'import/no-dynamic-require': 0,
    'max-len': 0,
    'no-underscore-dangle': 0,
    'import/newline-after-import': 0,
    'no-restricted-syntax': 0,
    'no-plusplus': 0,
    'func-names': 0,
    'no-param-reassign': ['error', { props: false }],
    'dot-notation': ['error', { allowPattern: '^[a-z]+(_[a-z]+)+$' }],
    'linebreak-style': 0,
    'operator-linebreak': ['error', 'none'],
  },
};
