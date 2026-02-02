import IconButton from '@components/Button/IconButton';
import type { Meta, StoryObj } from '@storybook/react-vite';
import iconXCircleBase300 from '@assets/icons/icon-x-circle-base300.svg';

import { fn } from 'storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Buttons/IconButton',
	component: IconButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		iconPath: { control: 'text', description: '아이콘 파일 경로' },
		iconAlt: {
			control: 'text',
			description: '스크린 리더를 위한 아이콘 대체 텍스트',
		},
	},
	args: { onClick: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
	args: {
		iconPath: iconXCircleBase300,
		iconAlt: 'Clear',
	},
};
