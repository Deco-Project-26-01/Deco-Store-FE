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
		isError: { control: 'boolean', description: '입력 값의 에러 여부' },
		errorMessage: { control: 'text', description: '에러 메시지' },
		onIconClick: {
			action: 'clicked',
			description: '입력 필드 초기화 아이콘 클릭 이벤트 핸들러',
		},
	},
	args: { onChange: fn(), onIconClick: fn() },
} satisfies Meta<typeof DefaultInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default_Without_Error: Story = {
	args: {
		placeholder: 'Placeholder',
		value: '',
		isError: false,
		errorMessage: 'Error Message',
	},
};

export const Default_With_Error: Story = {
	args: {
		type: 'email',
		placeholder: 'Placeholder',
		value: 'stevekim123naver.com',
		isError: true,
		errorMessage: 'E-mail does not meet the requirements.',
	},
};

export const Default_With_Description: Story = {
	args: {
		type: 'password',
		placeholder: 'Placeholder',
		value: 'qwer1234',
		description:
			'Your password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g. ! @ # $ %).',
		isError: false,
		errorMessage: 'Error Message',
	},
};
