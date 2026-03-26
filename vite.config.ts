/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/

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
});
