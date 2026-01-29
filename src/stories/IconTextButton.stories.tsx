import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import IconTextButton from '@/components/Button/IconTextButton';
import iconPlusPrimaryDark from '@/assets/icons/icon-plus-primaryDark.svg';
import iconBookWhite from '@/assets/icons/icon-book-white.svg';
import iconInstagramGray from '@/assets/icons/icon-instagram-gray.svg';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Buttons/IconTextButton',
	component: IconTextButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [
		(Story, context) => {
			const hasDarkBg = context.args.variant === 'textGray';

			return (
				<div
					style={{
						backgroundColor: hasDarkBg ? '#1A1A1A' : '#FFF',
						padding: '40px 80px',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Story />
				</div>
			);
		},
	],
	argTypes: {
		type: {
			control: { type: 'select' },
			description: 'HTML 버튼 타입 설정',
			options: ['button', 'submit', 'reset'],
		},
		variant: {
			control: { type: 'select' },
			description: '버튼 테마 설정',
			options: ['dark', 'light', 'textGray', 'textDark'],
		},
		size: {
			control: { type: 'select' },
			description: '버튼 크기 설정',
			options: ['small', 'medium'],
		},
		children: { control: 'text', description: '버튼 내용' },
		iconPath: { control: { type: 'text', description: '아이콘 경로' } },
		iconAlt: { control: { type: 'text', description: '아이콘 대체 텍스트' } },
	},
	args: { onClick: fn() },
} satisfies Meta<typeof IconTextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark_Small: Story = {
	args: {
		type: 'button',
		variant: 'dark',
		size: 'small',
		children: 'Icon Button',
		iconPath: iconBookWhite,
		iconAlt: 'book icon',
	},
};

export const Dark_Medium: Story = {
	args: {
		type: 'button',
		variant: 'dark',
		size: 'medium',
		children: 'Icon Button',
		iconPath: iconBookWhite,
		iconAlt: 'book icon',
	},
};

export const Light_Small: Story = {
	args: {
		type: 'button',
		variant: 'light',
		size: 'small',
		children: 'Icon Button',
		iconPath: iconPlusPrimaryDark,
		iconAlt: 'plus icon',
	},
};

export const Light_Medium: Story = {
	args: {
		type: 'button',
		variant: 'light',
		size: 'medium',
		children: 'Icon Button',
		iconPath: iconPlusPrimaryDark,
		iconAlt: 'plus icon',
	},
};

export const Text_Gray: Story = {
	args: {
		type: 'button',
		variant: 'textGray',
		size: 'small',
		children: 'Icon Button',
		iconPath: iconInstagramGray,
		iconAlt: 'instagram icon',
	},
};

export const Text_Dark: Story = {
	args: {
		type: 'button',
		variant: 'textDark',
		size: 'small',
		children: 'Icon Button',
		iconPath: iconPlusPrimaryDark,
		iconAlt: 'plus icon',
	},
};
