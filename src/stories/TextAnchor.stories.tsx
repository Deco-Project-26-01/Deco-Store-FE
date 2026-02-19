import type { Meta, StoryObj } from '@storybook/react-vite';

import TextAnchor from '@components/Link/TextAnchor';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Links/TextAnchor',
	component: TextAnchor,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div
				style={{
					backgroundColor: '#1A1A1A',
					width: '400px',
					padding: '40px 80px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: {
				type: 'select',
				options: ['dark', 'light', 'gray', 'outlined', 'text'],
			},
			description: '링크 테마 설정',
		},
		size: {
			control: {
				type: 'select',
				options: ['small', 'medium', 'fullSmall', 'fullMedium'],
			},
			description: '링크 크기 설정',
		},
		children: { control: 'text', description: '링크 내용' },
		href: { control: 'text', description: '링크 경로' },
	},
} satisfies Meta<typeof TextAnchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gray_Small: Story = {
	args: {
		variant: 'gray',
		size: 'small',
		href: '/',
		children: 'Link',
	},
};

export const Gray_Medium: Story = {
	args: {
		variant: 'gray',
		size: 'medium',
		href: '/',
		children: 'Link',
	},
};

export const Gray_Full_Small: Story = {
	args: {
		variant: 'gray',
		size: 'fullSmall',
		href: '/',
		children: 'Link',
	},
};

export const Gray_Full_Medium: Story = {
	args: {
		variant: 'gray',
		size: 'fullMedium',
		href: '/',
		children: 'Link',
	},
};
