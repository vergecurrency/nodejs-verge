import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['src/**/*.ts'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		files: ['test/**/*.js'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
		},
		languageOptions: {
			globals: {
				Buffer: 'readonly',
				process: 'readonly',
				require: 'readonly',
			},
		},
	},
	{
		ignores: ['dist/**', 'node_modules/**'],
	}
)
