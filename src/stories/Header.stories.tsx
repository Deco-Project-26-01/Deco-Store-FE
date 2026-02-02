import Header from '@components/Header/Header';
import type { Meta, StoryObj } from '@storybook/react-vite';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Header/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		type: { table: { disable: true } },
		cartNum: {
			control: { type: 'number' },
			description: 'Cart에 상품이 있는 경우, 상품의 개수',
			if: { arg: 'type', neq: 'checkout' },
		},
	},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		type: 'default',
	},
};

export const Default_In_Cart: Story = {
	args: {
		type: 'default',
		cartNum: 2,
	},
};

export const Checkout: Story = {
	args: {
		type: 'checkout',
	},
};
