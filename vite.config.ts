/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname =
	typeof __dirname !== 'undefined'
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: '/src',
			},
			{
				find: '@assets',
				replacement: '/src/assets',
			},
			{
				find: '@components',
				replacement: '/src/components',
			},
			{
				find: '@pages',
				replacement: '/src/pages',
			},
			{
				find: '@hooks',
				replacement: '/src/hooks',
			},
			{
				find: '@store',
				replacement: '/src/store',
			},
			{
				find: '@styles',
				replacement: '/src/styles',
			},
			{
				find: '@stories',
				replacement: '/src/stories',
			},
			{
				find: '@tests',
				replacement: '/src/tests',
			},
			{
				find: '#types',
				replacement: '/src/types',
			},
			{
				find: '@utils',
				replacement: '/src/utils',
			},
			{
				find: '@constants',
				replacement: '/src/constants',
			},
		],
	},
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, '.storybook'),
					}),
				],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [
							{
								browser: 'chromium',
							},
						],
					},
					setupFiles: ['.storybook/vitest.setup.ts'],
				},
			},
		],
	},
});
