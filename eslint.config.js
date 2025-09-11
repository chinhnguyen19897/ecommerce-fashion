import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import nuxt from 'eslint-plugin-nuxt'

export default [
  {
    ignores: ['node_modules', 'dist', '.nuxt'] // bỏ qua thư mục build
  },
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      globals: {
        window: 'readonly',
        document: 'readonly',
        process: 'readonly'
      }
    },
    plugins: {
      vue,
      '@typescript-eslint': ts,
      prettier,
      nuxt
    },
    rules: {
      ...js.configs.recommended.rules,
      ...vue.configs['vue3-recommended'].rules,
      ...ts.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
      ...nuxt.configs.recommended.rules,

      // Vue rules
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

      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // General JS
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
  }
]
