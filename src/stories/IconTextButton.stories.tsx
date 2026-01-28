import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import IconTextButton from '@/components/Button/IconTextButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Buttons/IconTextButton',
	component: IconTextButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div
				style={{
					width: '300px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Story />
			</div>
		),
	],
	argTypes: {},
	args: { onClick: fn() },
} satisfies Meta<typeof IconTextButton>;

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
