import SearchButton from '@components/Button/SearchButton';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Buttons/SearchButton',
	component: SearchButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div
				style={{
					backgroundColor: '#004127',
					padding: '40px',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Story />
			</div>
		),
	],
	args: { onClick: fn() },
} satisfies Meta<typeof SearchButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
