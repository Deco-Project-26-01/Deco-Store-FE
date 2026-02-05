import BreadCrumbDropdown from '@components/BreadCrumb/BreadCrumbDropdown';
import type { Meta, StoryObj } from '@storybook/react-vite';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Navigation_Text/BreadCrumbDropdown',
	component: BreadCrumbDropdown,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div
				style={{
					width: '400px',
					height: '400px',
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
				options: ['primary', 'secondary'],
			},
			description: '브레드크럼 드롭다운 테마 설정',
		},
		current: { control: 'text', description: '현재 페이지' },
		siblings: { control: 'object', description: '형제 페이지 목록' },
		children: { control: 'text', description: '현재 페이지' },
	},
} satisfies Meta<typeof BreadCrumbDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: 'primary',
		current: 'Page1',
		siblings: [
			{ label: 'Page1', path: '/parent/page1' },
			{ label: 'Page2', path: '/parent/page2' },
			{ label: 'Page3', path: '/parent/page3' },
		],
		children: 'Page1',
	},
};

export const Secondary: Story = {
	args: {
		variant: 'secondary',
		current: 'Page1',
		siblings: [
			{ label: 'Page1', path: '/parent/page1' },
			{ label: 'Page2', path: '/parent/page2' },
			{ label: 'Page3', path: '/parent/page3' },
		],
		children: 'Page1',
	},
};
