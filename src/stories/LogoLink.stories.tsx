import type { Meta, StoryObj } from '@storybook/react-vite';

import LogoLink from '@components/Link/LogoLink';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Links/LogoLink',
	component: LogoLink,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story, context) => {
			const isHeader = context.args.variant === 'white';
			return (
				<div
					style={{
						backgroundColor: isHeader ? '#004127' : '#1A1A1A',
						width: '400px',
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
		variant: {
			control: { type: 'select', options: ['white', 'gray'] },
			description: 'Logo 링크 색상',
		},
	},
} satisfies Meta<typeof LogoLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = {
	args: {
		variant: 'white',
	},
};

export const Footer: Story = {
	args: {
		variant: 'gray',
	},
};
