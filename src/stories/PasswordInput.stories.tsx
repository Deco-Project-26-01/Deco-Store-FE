import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import PasswordInput from '@components/Input/PasswordInput';
import InputLabel from '@components/Label/InputLabel';

const meta = {
	title: 'Input/PasswordInput',
	component: PasswordInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div style={{ width: '400px' }}>
				<InputLabel isRequired={false} htmlFor="password">
					Password
				</InputLabel>
				<Story args={{ id: 'password' }} />
			</div>
		),
	],
	argTypes: {
		id: { control: 'text', description: '입력 필드의 id' },
		value: { control: 'text', description: '비밀번호 입력 값' },
		onChange: {
			action: 'changed',
			description: '입력 값 변경 시 호출되는 함수',
		},
		onClearIconClick: {
			action: 'icon clicked',
			description: '입력값 초기화 아이콘 클릭 시 호출되는 함수',
		},
		description: {
			control: 'text',
			description: '입력 필드 아래에 표시되는 설명 텍스트',
		},
		error: {
			control: 'text',
			description: '입력 필드 아래에 표시되는 에러 메시지',
		},
	},
	args: { onChange: fn(), onClearIconClick: fn() },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: 'password',
		value: 'password123',
	},
};

export const With_Description: Story = {
	args: {
		id: 'password',
		value: 'password123',
		description:
			'Your password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g. ! @ # $ %).',
	},
};

export const With_Error: Story = {
	args: {
		id: 'password',
		value: 'pass',
		error: 'Password does not meet the requirements.',
	},
};
