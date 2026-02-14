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
		placeholder: { control: 'text', description: '입력 전 기본 텍스트' },
		value: { control: 'text', description: '입력 필드의 값' },
		description: { control: 'text', description: '입력값의 조건 설명' },
		error: { control: 'text', description: '에러 메시지' },
		onClearIconClick: {
			action: 'clicked',
			description: '입력 필드 초기화 아이콘 클릭 이벤트 핸들러',
		},
	},
	args: { onChange: fn(), onClearIconClick: fn() },
} satisfies Meta<typeof DefaultInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Placeholder',
		value: '',
	},
};

export const With_Value: Story = {
	args: {
		placeholder: 'Placeholder',
		value: 'this is input',
	},
};

export const With_Error: Story = {
	args: {
		type: 'email',
		placeholder: 'Placeholder',
		value: 'stevekim123naver.com',
		error: 'E-mail does not meet the requirements.',
	},
};

export const With_Description: Story = {
	args: {
		type: 'text',
		placeholder: 'Placeholder',
		value: 'this is input',
		description: 'Description',
		error: '',
	},
};
