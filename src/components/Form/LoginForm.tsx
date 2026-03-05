import type { ILoginData } from '#types/auth';
import TextButton from '@components/Button/TextButton';
import DefaultInput from '@components/Input/DefaultInput';
import PasswordInput from '@components/Input/PasswordInput';
import InputLabel from '@components/Label/InputLabel';
import ConfirmModal from '@components/Modal/ConfirmModal';
import useLogin from '@hooks/useLogin';
import { useModalStore } from '@store/useModalStore';
import { useForm } from 'react-hook-form';
import { useNavigate, type Location } from 'react-router-dom';

const LoginForm = ({ redirectTo }: { redirectTo: '/' | Location<any> }) => {
	const {
		handleSubmit,
		register,
		watch,
		setFocus,
		resetField,
		formState: { errors },
	} = useForm<ILoginData>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const { mutate: login, isPending } = useLogin();
	const navigate = useNavigate();
	const openModal = useModalStore((state) => state.openModal);

	const handleLogin = async (data: ILoginData) => {
		login(data, {
			onSuccess: () => {
				openModal(
					<ConfirmModal
						title="Login Successful"
						description="You have successfully logged in."
						buttonText="Home"
						onConfirm={() => {
							navigate(redirectTo, { replace: true });
						}}
					/>,
				);
			},
			onError: (error: Error) => {
				openModal(
					<ConfirmModal
						title="Login Failed"
						description={error.message}
						buttonText="Retry"
						onConfirm={() => {
							resetField('password');
							setFocus('email');
						}}
					/>,
				);
			},
		});
	};

	return (
		// React-Hook-Form의 validation을 위해 기본 validation 삭제
		<form noValidate onSubmit={handleSubmit(handleLogin)}>
			{/* 이메일 */}
			<div className="mb-lg flex flex-col gap-sm">
				<InputLabel htmlFor="email">E-mail</InputLabel>
				<DefaultInput
					id="email"
					type="email"
					inputMode="email"
					placeholder="Enter your email"
					{...register('email', {
						required: 'E-mail is required',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'Please enter a valid email address',
						},
					})}
					showClearIcon={!!watch('email')}
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
					showClearIcon={!!watch('password')}
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
					disabled={isPending}
				>
					Login
				</TextButton>
			</div>
		</form>
	);
};

export default LoginForm;
