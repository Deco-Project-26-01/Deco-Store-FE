import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import TextButton from '@components/Button/TextButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Buttons/TextButton',
	component: TextButton,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story, context) => {
			const hasDarkBg = context.args.variant === 'outlined';
			return (
				<div
					style={{
						backgroundColor: hasDarkBg ? '#004127' : '#FFF',
						padding: '40px 80px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Story />
				</div>
			);
		},
	],
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: { type: 'select', options: ['button', 'submit', 'reset'] },
			description: 'HTML 버튼 타입 설정',
		},
		variant: {
			control: {
				type: 'select',
				options: ['dark', 'light', 'gray', 'outlined', 'text'],
			},
			description: '버튼 테마 설정',
		},
		size: {
			control: {
				type: 'select',
				options: ['small', 'medium', 'fullSmall', 'fullMedium'],
			},
			description: '버튼 크기 설정',
		},
		children: { control: 'text', description: '버튼 내용' },
		disabled: { control: 'boolean', description: '버튼 비활성화 여부' },
	},
	args: { onClick: fn() },
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark_Small: Story = {
	args: {
		type: 'button',
		variant: 'dark',
		size: 'small',
		children: 'Button',
		disabled: false,
	},
};

export const Dark_Medium: Story = {
	args: {
		type: 'button',
		variant: 'dark',
		size: 'medium',
		children: 'Button',
		disabled: false,
	},
};

export const Dark_Full_Small: Story = {
	args: {
		type: 'button',
		variant: 'dark',
		size: 'fullSmall',
		children: 'Button',
		disabled: false,
	},
};

export const Dark_Full_Medium: Story = {
	args: {
		type: 'button',
		variant: 'dark',
		size: 'fullMedium',
		children: 'Button',
		disabled: false,
	},
};

export const Light_Small: Story = {
	args: {
		type: 'button',
		variant: 'light',
		size: 'small',
		children: 'Button',
		disabled: false,
	},
};

export const Light_Medium: Story = {
	args: {
		type: 'button',
		variant: 'light',
		size: 'medium',
		children: 'Button',
		disabled: false,
	},
};

export const Light_Full_Small: Story = {
	args: {
		type: 'button',
		variant: 'light',
		size: 'fullSmall',
		children: 'Button',
		disabled: false,
	},
};

export const Light_Full_Medium: Story = {
	args: {
		type: 'button',
		variant: 'light',
		size: 'fullMedium',
		children: 'Button',
		disabled: false,
	},
};

export const Outlined: Story = {
	args: {
		type: 'button',
		variant: 'outlined',
		size: 'medium',
		children: 'Button',
		disabled: false,
	},
};

export const Text: Story = {
	args: {
		type: 'button',
		variant: 'text',
		size: 'small',
		children: 'Button',
		disabled: false,
	},
};

export const Disabled: Story = {
	args: {
		type: 'button',
		variant: 'light',
		size: 'small',
		children: 'Button',
		disabled: true,
	},
};
