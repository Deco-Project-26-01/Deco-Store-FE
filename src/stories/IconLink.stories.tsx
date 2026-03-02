import type { Meta, StoryObj } from '@storybook/react-vite';

import IconLink from '@components/Link/IconLink';
import iconUserWhite from '@assets/icons/icon-user-white.svg';
import iconCartWhite from '@assets/icons/icon-cart-white.svg';
import iconSupportWhite from '@assets/icons/icon-support-white.svg';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Links/IconLink',
	component: IconLink,
	parameters: {
		layout: 'centered',
	},
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
	tags: ['autodocs'],
	argTypes: {
		to: { control: 'text', description: 'Link 클릭 시 이동할 페이지 경로' },
		iconPath: { control: 'text', description: 'Link 아이콘 이미지 경로' },
		title: { control: 'text', description: 'Link 타이틀' },
		cartNum: {
			control: 'number',
			description: 'Cart Link인 경우, Cart에 있는 상품 개수',
		},
	},
} satisfies Meta<typeof IconLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Account: Story = {
	args: {
		to: '/mypage',
		iconPath: iconUserWhite,
		title: 'Account',
	},
};

export const Cart: Story = {
	args: {
		to: '/cart',
		iconPath: iconCartWhite,
		title: 'Cart',
	},
};

export const Cart_Badge: Story = {
	args: {
		to: '/cart',
		iconPath: iconCartWhite,
		title: 'Cart',
		cartNum: 2,
	},
};

export const Support: Story = {
	args: {
		to: '/mypage/support',
		iconPath: iconSupportWhite,
		title: 'Support',
	},
};
