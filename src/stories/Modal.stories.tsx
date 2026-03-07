import Modal from '@components/Modal/Modal';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'PopUp/Modal',
	component: Modal,
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
			return <Story />;
		},
	],
	argTypes: {
		title: { control: 'text', description: '모달의 제목' },
		onClose: { action: 'close', description: '모달을 닫는 함수' },
	},
	args: { onClose: fn() },
	tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Without_Title: Story = {
	args: {
		children: (
			<div style={{ padding: '3.2rem 3.2rem 6.4rem' }}>
				<h4>Modal Content</h4>
			</div>
		),
	},
};

export const With_Title: Story = {
	args: {
		title: 'Title',
		children: (
			<div style={{ padding: '3.2rem 3.2rem 6.4rem' }}>
				<h4>Modal Content</h4>
			</div>
		),
	},
};
