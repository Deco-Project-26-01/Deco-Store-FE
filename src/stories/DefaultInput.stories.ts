import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import DefaultInput from '@components/Input/DefaultInput';

const meta = {
	title: 'Input/DefaultInput',
	component: DefaultInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		onChange: {
			action: 'changed',
			description: '입력 필드의 값 변경 이벤트 핸들러',
		},
		value: { control: 'text', description: '입력 필드의 현재 값, 50자 제한' },
		onIconClick: {
			action: 'clicked',
			description: '아이콘 클릭 이벤트 핸들러',
		},
	},
	args: { onChange: fn(), onIconClick: fn() },
} satisfies Meta<typeof DefaultInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		value: 'Something',
	},
};
