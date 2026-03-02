import ProductsTab from '@components/Tab/ProductsTab';
import type { Meta, StoryObj } from '@storybook/react-vite';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Tab/ProductsTab',
	component: ProductsTab,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ProductsTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
