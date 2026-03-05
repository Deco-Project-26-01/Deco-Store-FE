import type { IRegisterFormData } from '#types/auth';
import PasswordInput from '@components/Input/PasswordInput';
import InputLabel from '@components/Label/InputLabel';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const PasswordForm = () => {
	const {
		register,
		resetField,
		getValues,
		watch,
		trigger,
		formState: { errors },
	} = useFormContext<Pick<IRegisterFormData, 'password' | 'passwordConfirm'>>();

	const password = watch('password');
	const passwordConfirm = watch('passwordConfirm');

	// 비밀번호 변경 시, 비밀번호 확인 유효성 검사 트리거
	useEffect(() => {
		if (!passwordConfirm) return;
		trigger('passwordConfirm');
	}, [password, trigger]);

	return (
		<>
			<div className="flex flex-col gap-sm mb-lg">
				<InputLabel htmlFor="password" isRequired>
					Password
				</InputLabel>
				<PasswordInput
					id="password"
					placeholder="Enter your password"
					{...register('password', {
						required: 'Password is required',
						pattern: {
							value:
								/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$/,
							message: 'Password does not meet the requirements.',
						},
					})}
					showClearIcon={!!watch('password')}
					onClearIconClick={() => resetField('password')}
					description={
						!watch('password') && !errors.password
							? 'Your password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g. ! @ # $ %).'
							: ''
					}
					error={errors.password?.message}
				/>
			</div>
			<div className="flex flex-col gap-sm mb-lg">
				<InputLabel htmlFor="passwordConfirm" isRequired>
					Password Confirm
				</InputLabel>
				<PasswordInput
					id="passwordConfirm"
					placeholder="Confirm your password"
					{...register('passwordConfirm', {
						required: 'Please confirm your password',
						validate: (value) =>
							value === getValues('password') || 'Passwords do not match',
					})}
					showClearIcon={!!watch('passwordConfirm')}
					onClearIconClick={() => resetField('passwordConfirm')}
					error={errors.passwordConfirm?.message}
				/>
			</div>
		</>
	);
};

export default PasswordForm;
