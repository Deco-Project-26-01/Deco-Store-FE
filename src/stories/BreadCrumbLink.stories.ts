import BreadCrumbLink from '@components/BreadCrumb/BreadCrumbLink';
import type { Meta, StoryObj } from '@storybook/react-vite';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Navigation_Text/BreadCrumbLink',
	component: BreadCrumbLink,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: {
				type: 'select',
				options: ['primary', 'secondary'],
			},
			description: '링크 테마 설정',
		},
		children: { control: 'text', description: '링크 내용' },
	},
} satisfies Meta<typeof BreadCrumbLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		to: '#',
		variant: 'primary',
		children: 'Page',
	},
};

export const Secondary: Story = {
	args: {
		to: '#',
		variant: 'secondary',
		children: 'Page',
	},
};
