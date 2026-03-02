import Footer from '@components/Footer/Footer';
import type { Meta, StoryObj } from '@storybook/react-vite';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Footer/Footer',
	component: Footer,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story) => (
			<div
				style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
			>
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
