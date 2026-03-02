import LoginForm from '@components/Form/LoginForm';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, waitFor } from 'storybook/test';

const meta = {
	title: 'Forms/LoginForm',
	component: LoginForm,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div style={{ width: '500px' }}>
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
	argTypes: {
		redirectTo: {
			control: 'text',
			description: '로그인 성공 후 리디렉션할 경로',
		},
	},
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty_Form: Story = {
	args: { redirectTo: '/' },
	play: async ({ canvas }) => {
		const emailInput = canvas.getByTestId('email');
		await expect(emailInput).toBeInTheDocument();

		const passwordInput = canvas.getByTestId('password');
		await expect(passwordInput).toBeInTheDocument();

		const loginButton = canvas.getByRole('button', { name: 'Login' });
		await expect(loginButton).toBeInTheDocument();
	},
};

export const Invalid_Form: Story = {
	args: { redirectTo: '/' },
	play: async ({ canvas, userEvent }) => {
		const emailInput = canvas.getByTestId('email');
		await userEvent.type(emailInput, 'invalid@email');

		const loginButton = canvas.getByRole('button', { name: 'Login' });
		await userEvent.click(loginButton);

		await waitFor(() => {
			expect(
				canvas.getByText('Please enter a valid email address'),
			).toBeInTheDocument();

			expect(canvas.getByText('Password is required')).toBeInTheDocument();
		});
	},
};

export const Filled_Form: Story = {
	args: { redirectTo: '/' },
	play: async ({ canvas, userEvent }) => {
		const emailInput = canvas.getByTestId('email');
		await userEvent.type(emailInput, 'test@email.com');

		const passwordInput = canvas.getByTestId('password');
		await userEvent.type(passwordInput, 'qwer123!@#');

		const loginButton = canvas.getByRole('button', { name: 'Login' });
		await expect(loginButton).toBeEnabled();
	},
};

// export const Submitting_Form: Story = {
// 	args: { redirectTo: '/' },
// 	parameters: {
// 		msw: {
// 			handlers: [
// 				http.post('*/auth/login', async () => {
// 					await new Promise((r) => setTimeout(r, 300));

// 					return HttpResponse.json({
// 						success: true,
// 						data: {
// 							accessToken: 'mock-access',
// 							refreshToken: 'mock-refresh',
// 						},
// 					});
// 				}),
// 			],
// 		},
// 	},
// 	play: async ({ canvas, userEvent }) => {
// 		const emailInput = canvas.getByTestId('email');
// 		await userEvent.type(emailInput, 'test@email.com');

// 		const passwordInput = canvas.getByTestId('password');
// 		await userEvent.type(passwordInput, 'Qwer123!@#');

// 		const loginButton = canvas.getByRole('button', { name: 'Login' });
// 		await userEvent.click(loginButton);

// 		// 버튼이 클릭된 후 잠시 비활성화되어야 함
// 		await waitFor(() => {
// 			expect(canvas.getByRole('button', { name: /login/i })).toBeDisabled();
// 		});

// 		await waitFor(
// 			() => {
// 				expect(canvas.getByRole('button', { name: /login/i })).toBeEnabled();
// 			},
// 			{ timeout: 8000 },
// 		);
// 	},
// };
