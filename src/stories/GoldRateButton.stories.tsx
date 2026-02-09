import GoldRateButton from '@components/Tab/GoldRateButton';
import type { Meta, StoryObj } from '@storybook/react-vite';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Tab/GoldRateButton',
	component: GoldRateButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div
				role="tablist"
				style={{
					backgroundColor: '#f5f5f5',
					padding: '40px',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof GoldRateButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
