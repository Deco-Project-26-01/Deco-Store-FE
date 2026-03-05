import ConfirmModal from '@components/Modal/ConfirmModal';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'PopUp/ConfirmModal',
	component: ConfirmModal,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story) => {
			const id = 'modal-portal';
			if (!document.getElementById(id)) {
				const el = document.createElement('div');
				el.id = id;
				document.body.appendChild(el);
			}
			return Story();
		},
	],
	argTypes: {
		title: { control: 'text', description: '모달의 제목' },
		description: { control: 'text', description: '모달의 내용' },
		buttonText: { control: 'text', description: '버튼의 텍스트' },
	},
	args: { onConfirm: fn() },
	tags: ['autodocs'],
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Confirm Modal!',
		description: 'This is a confirm modal.',
		buttonText: 'Close',
	},
};
