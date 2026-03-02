import Dropdown from '@components/Dropdown/Dropdown';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
	title: 'Dropdown/Dropdown',
	component: Dropdown,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div
				style={{
					width: '500px',
					height: '500px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
	argTypes: {
		width: { control: 'number', description: '드롭다운의 너비' },
		listHeight: { control: 'number', description: '드롭다운의 높이' },
		selectedValue: { control: 'text', description: '현재 활성화된 아이템' },
		placeholder: {
			control: 'text',
			description: '선택된 아이템이 없을 때 보여지는 텍스트',
		},
		list: { control: 'object', description: '리스트 목록' },
	},
	args: { onChange: fn() },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		width: 20,
		listHeight: 20,
		selectedValue: '',
		list: [
			{
				label: 'Item 1',
				value: 'item1',
			},
			{
				label: 'Item 2',
				value: 'item2',
			},
		],
	},
};

export const Selected: Story = {
	args: {
		width: 20,
		listHeight: 20,
		selectedValue: 'item1',
		list: [
			{
				label: 'Item 1',
				value: 'item1',
			},
			{
				label: 'Item 2',
				value: 'item2',
			},
		],
	},
};
