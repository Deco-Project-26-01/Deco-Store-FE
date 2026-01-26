import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import TextButton from '@/components/Button/TextButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Buttons/TextButton',
	component: TextButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: { type: 'select' },
			description: 'HTML 버튼 타입 설정',
			options: ['button', 'submit', 'reset'],
		},
		variant: {
			control: { type: 'select' },
			description: '버튼 테마 설정',
			options: ['dark', 'light', 'outlined', 'text'],
		},
		children: { control: 'text', description: '버튼 내용' },
		isDisabled: { control: 'boolean', description: '버튼 비활성화 여부' },
	},
	args: { onClick: fn() },
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
	args: {
		type: 'button',
		variant: 'dark',
		children: 'Button',
		isDisabled: false,
	},
};

export const Light: Story = {
	args: {
		type: 'button',
		variant: 'light',
		children: 'Button',
		isDisabled: false,
	},
};

export const Outlined: Story = {
	args: {
		type: 'button',
		variant: 'outlined',
		children: 'Button',
		isDisabled: false,
	},
};

export const Text: Story = {
	args: {
		type: 'button',
		variant: 'text',
		children: 'Button',
		isDisabled: false,
	},
};

export const Disabled: Story = {
	args: {
		type: 'button',
		variant: 'dark',
		children: 'Button',
		isDisabled: true,
	},
};
