import DefaultInput from '@components/Input/DefaultInput';
import InputLabel from '@components/Label/InputLabel';
import FormModal from '@components/Modal/FormModal';
import type { Meta, StoryObj } from '@storybook/react-vite';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'PopUp/FormModal',
	component: FormModal,
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
		firstButtonText: { control: 'text', description: '첫 번째 버튼의 텍스트' },
		secondButtonText: { control: 'text', description: '두 번째 버튼의 텍스트' },
		formId: { control: 'text', description: '모달 내 폼의 id' },
		children: { control: 'object', description: '모달의 내용' },
		closeOnOverlayClick: {
			control: 'boolean',
			description: '오버레이 클릭 시 모달을 닫을지 여부',
		},
		isPending: {
			control: 'boolean',
			description: '비동기 작업 진행 중인지 여부 (버튼 비활성화)',
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof FormModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Form Modal',
		firstButtonText: 'Cancel',
		secondButtonText: 'Save',
		formId: 'example-form',
		children: (
			<div className="flex flex-col gap-x-sm">
				<InputLabel htmlFor="example" isRequired>
					Label
				</InputLabel>
				<DefaultInput
					id="example"
					value={'Example'}
					placeholder="Enter something..."
					onClearIconClick={() => {}}
				/>
			</div>
		),
	},
};
