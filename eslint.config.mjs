import tseslint from 'typescript-eslint';

export default tseslint.config(tseslint.configs.strict, {
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error'
  }
});
