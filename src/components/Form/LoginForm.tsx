import TextButton from '@components/Button/TextButton';
import DefaultInput from '@components/Input/DefaultInput';
import PasswordInput from '@components/Input/PasswordInput';
import InputLabel from '@components/Label/InputLabel';
import { useForm } from 'react-hook-form';

interface ILoginData {
	email: string;
	password: string;
}

const LoginForm = () => {
	const {
		handleSubmit,
		register,
		resetField,
		formState: { errors, isSubmitting },
	} = useForm<ILoginData>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const handleLogin = async (data: ILoginData) => {
		await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate an API call
		console.log('Login data:', data);
	};

	return (
		<form onSubmit={handleSubmit(handleLogin)}>
			{/* 이메일 */}
			<div className="mb-lg flex flex-col gap-sm">
				<InputLabel htmlFor="email">E-mail</InputLabel>
				<DefaultInput
					id="email"
					type="email"
					placeholder="Enter your email"
					{...register('email', {
						required: 'E-mail is required',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'Please enter a valid email address',
						},
					})}
					onClearIconClick={() => resetField('email')}
					error={errors.email?.message}
				/>
			</div>
			{/* 비밀번호 */}
			<div className="mb-xl flex flex-col gap-sm">
				<InputLabel htmlFor="password">Password</InputLabel>
				<PasswordInput
					id="password"
					placeholder="Enter your password"
					{...register('password', {
						required: 'Password is required',
					})}
					onClearIconClick={() => resetField('password')}
					error={errors.password?.message}
				/>
			</div>
			{/* 버튼 */}
			<div>
				<TextButton
					type="submit"
					variant="dark"
					size="fullMedium"
					// API 요청 시 비활성화되도록 설정 - 반복적인 API 호출 방지
					disabled={isSubmitting}
				>
					Login
				</TextButton>
			</div>
		</form>
	);
};

export default LoginForm;
