import type { Meta, StoryObj } from '@storybook/react-vite';

import iconInstagramGray from '@assets/icons/icon-instagram-gray.svg';
import iconLinkedInGray from '@assets/icons/icon-linkedin-gray.svg';
import iconYouTubeGray from '@assets/icons/icon-youtube-gray.svg';
import IconTextLink from '@components/Link/IconTextLink';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Links/IconTextLink',
	component: IconTextLink,
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
		variant: {
			control: {
				type: 'select',
				options: ['dark', 'light', 'textGray', 'textDark'],
			},
			description: '링크 테마 설정',
		},
		size: {
			control: { type: 'select', options: ['small', 'medium'] },
			description: '링크 크기 설정',
		},
		children: { control: 'text', description: '버튼 내용' },
		iconPath: { control: 'text', description: '아이콘 경로' },
	},
} satisfies Meta<typeof IconTextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Instagram: Story = {
	args: {
		variant: 'textGray',
		size: 'small',
		children: 'Instagram',
		iconPath: iconInstagramGray,
		href: '#',
	},
};

export const LinkedIn: Story = {
	args: {
		variant: 'textGray',
		size: 'small',
		children: 'LinkedIn',
		iconPath: iconLinkedInGray,
		href: '#',
	},
};

export const YouTube: Story = {
	args: {
		variant: 'textGray',
		size: 'small',
		children: 'YouTube',
		iconPath: iconYouTubeGray,
		href: '#',
	},
};
