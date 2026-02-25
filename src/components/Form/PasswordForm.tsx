import type { IRegisterFormData } from '#types/auth';
import PasswordInput from '@components/Input/PasswordInput';
import InputLabel from '@components/Label/InputLabel';
import { useFormContext } from 'react-hook-form';

const PasswordForm = () => {
	const {
		register,
		resetField,
		watch,
		formState: { errors },
	} = useFormContext<Pick<IRegisterFormData, 'password' | 'passwordConfirm'>>();
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
								/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
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
							value === watch('password') || 'Passwords do not match',
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
