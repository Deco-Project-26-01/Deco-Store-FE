import SearchForm from '@components/Search/SearchForm';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect } from 'storybook/test';

const meta = {
	title: 'Forms/SearchForm',
	component: SearchForm,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div
				style={{
					backgroundColor: '#004127',
					padding: '40px',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
} satisfies Meta<typeof SearchForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty_Form: Story = {
	play: async ({ canvas }) => {
		const searchInput = canvas.getByTestId('header-search');
		await expect(searchInput).toBeInTheDocument();

		const clearButton = canvas.queryByRole('button', { name: 'Clear' });
		await expect(clearButton).not.toBeInTheDocument();

		const searchButton = canvas.getByRole('button', { name: 'Search' });
		await expect(searchButton).toBeInTheDocument();
	},
};

export const Filled_Form: Story = {
	play: async ({ canvas, userEvent }) => {
		const searchInput = canvas.getByTestId('header-search');
		await userEvent.type(searchInput, 'diamond');

		const clearButton = canvas.getByRole('button', { name: 'Clear' });
		await expect(clearButton).toBeInTheDocument();

		const searchButton = canvas.getByRole('button', { name: 'Search' });
		await expect(searchButton).toBeInTheDocument();
	},
};
