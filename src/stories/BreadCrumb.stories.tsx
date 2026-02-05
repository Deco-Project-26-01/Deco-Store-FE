import BreadCrumb from '@components/BreadCrumb/BreadCrumb';
import type { Meta, StoryObj } from '@storybook/react-vite';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Navigation_Text/BreadCrumb',
	component: BreadCrumb,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [
		(Story, context) => {
			const hasDarkBg = context.args.variant === 'secondary';
			return (
				<div
					style={{
						backgroundColor: hasDarkBg ? '#1E150E' : '#FFF',
						width: '600px',
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
	argTypes: {
		variant: {
			control: {
				type: 'select',
				options: ['primary', 'secondary'],
			},
			description: '브레드크럼 테마 설정',
		},
		items: {
			control: 'object',
			description: '브레드크럼 목록',
		},
	},
} satisfies Meta<typeof BreadCrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary_Without_Siblings: Story = {
	args: {
		variant: 'primary',
		items: [
			{ path: '/', label: 'Home' },
			{ path: '/mypage', label: 'My Page' },
		],
	},
};

export const Primary_With_Siblings: Story = {
	args: {
		variant: 'primary',
		items: [
			{ path: '/', label: 'Home' },
			{ path: '/mypage', label: 'My Page' },
			{
				path: '/account',
				label: 'Account',
				siblings: [
					{ label: 'Account', path: '/mypage/account' },
					{ label: 'Orders', path: '/mypage/order' },
					{ label: 'Support', path: '/mypage/support' },
				],
			},
		],
	},
};

export const Secondary_Without_Siblings: Story = {
	args: {
		variant: 'secondary',
		items: [
			{ path: '/', label: 'Home' },
			{ path: '/mypage', label: 'My Page' },
		],
	},
};

export const Secondary_With_Siblings: Story = {
	args: {
		variant: 'secondary',
		items: [
			{ path: '/', label: 'Home' },
			{ path: '/mypage', label: 'My Page' },
			{
				path: '/account',
				label: 'Account',
				siblings: [
					{ label: 'Account', path: '/mypage/account' },
					{ label: 'Orders', path: '/mypage/order' },
					{ label: 'Support', path: '/mypage/support' },
				],
			},
		],
	},
};
