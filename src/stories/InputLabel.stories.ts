import InputLabel from '@components/Label/InputLabel';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'Text/InputLabel',
	component: InputLabel,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		htmlFor: { control: 'text', description: 'label의 for 속성' },
		isRequired: { control: 'boolean', description: '입력 필수값 여부' },
		children: { control: 'text', description: 'label의 내용' },
	},
} satisfies Meta<typeof InputLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		htmlFor: 'email',
		isRequired: false,
		children: 'E-mail',
	},
};

export const Password_Required: Story = {
	args: {
		htmlFor: 'password',
		isRequired: true,
		children: 'Password',
	},
};
