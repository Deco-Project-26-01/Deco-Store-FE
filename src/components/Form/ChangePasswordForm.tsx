import type { IChangePasswordRequestData } from '#types/userinfo';
import PasswordInput from '@components/Input/PasswordInput';
import InputLabel from '@components/Label/InputLabel';
import { useForm } from 'react-hook-form';

interface IChangePasswordForm {
	onSubmit: (data: IChangePasswordRequestData) => void;
	isPending: boolean;
}

interface IChangePasswordFormData {
	currentPassword: string;
	newPassword: string;
	newPasswordConfirm: string;
}

const ChangePasswordForm = ({
	onSubmit,
	isPending = false,
}: IChangePasswordForm) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		resetField,
		getValues,
	} = useForm<IChangePasswordFormData>({
		mode: 'onChange',
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			newPasswordConfirm: '',
		},
	});

	const handleSave = (data: IChangePasswordFormData) => {
		const formData: IChangePasswordRequestData = {
			currentPassword: data.currentPassword,
			newPassword: data.newPassword,
		};

		onSubmit(formData);
	};

	return (
		<form id="changePasswordForm" onSubmit={handleSubmit(handleSave)}>
			<div className="flex flex-col gap-sm mb-lg">
				<InputLabel htmlFor="currentPassword" isRequired>
					Current Password
				</InputLabel>
				<PasswordInput
					id="currentPassword"
					placeholder="Enter your current password"
					{...register('currentPassword', {
						required: 'Current password is required',
					})}
					showClearIcon={!!watch('currentPassword')}
					onClearIconClick={() => resetField('currentPassword')}
					error={errors.currentPassword?.message}
					disabled={isPending}
				/>
			</div>
			<div className="flex flex-col gap-sm mb-lg">
				<InputLabel htmlFor="newPassword" isRequired>
					New Password
				</InputLabel>
				<PasswordInput
					id="newPassword"
					placeholder="Enter your new password"
					{...register('newPassword', {
						required: 'New password is required',
						pattern: {
							value:
								/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$/,
							message: 'Password does not meet the requirements.',
						},
						validate: (value) =>
							value !== getValues('currentPassword') ||
							'New password must be different from the cusrrent password',
					})}
					showClearIcon={!!watch('newPassword')}
					onClearIconClick={() => resetField('newPassword')}
					description={
						!watch('newPassword')
							? 'Your password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g. ! @ # $ %).'
							: ''
					}
					error={!watch('newPassword') ? '' : errors.newPassword?.message}
					disabled={isPending}
				/>
			</div>
			<div className="flex flex-col gap-sm mb-lg">
				<InputLabel htmlFor="newPasswordConfirm" isRequired>
					Confirm New Password
				</InputLabel>
				<PasswordInput
					id="newPasswordConfirm"
					placeholder="Confirm your new password"
					{...register('newPasswordConfirm', {
						required: 'Please confirm your new password',
						validate: (value) =>
							value === getValues('newPassword') || 'Passwords do not match',
					})}
					showClearIcon={!!watch('newPasswordConfirm')}
					onClearIconClick={() => resetField('newPasswordConfirm')}
					error={errors.newPasswordConfirm?.message}
					disabled={isPending}
				/>
			</div>
		</form>
	);
};

export default ChangePasswordForm;
