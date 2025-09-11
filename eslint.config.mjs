import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettierRecommend from 'eslint-plugin-prettier/recommended'

export default withNuxt(eslintPluginPrettierRecommend, {
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'error',
    'no-trailing-spaces': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        }
      }
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-empty-object-type': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
})
