import iconEyeOffPrimaryDark from '@assets/icons/icon-eye-off-primaryDark.svg';
import iconEyePrimaryDark from '@assets/icons/icon-eye-primaryDark.svg';
import DefaultInput from '@components/Input/DefaultInput';
import InputButton from '@components/Input/InputButton';
import { useState, type ComponentPropsWithoutRef } from 'react';

interface IPasswordInputProps extends ComponentPropsWithoutRef<'input'> {
	onClearIconClick: React.MouseEventHandler<HTMLButtonElement>;
	description?: string;
	error?: string;
}

const PasswordInput = ({
	onClearIconClick,
	description,
	error,
	...rest
}: IPasswordInputProps) => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<DefaultInput
			type={isVisible ? 'text' : 'password'}
			onClearIconClick={onClearIconClick}
			passwordToggle={
				<InputButton
					iconPath={isVisible ? iconEyeOffPrimaryDark : iconEyePrimaryDark}
					iconAlt={isVisible ? 'Hide password' : 'Show password'}
					onClick={() => setIsVisible((prev) => !prev)}
				/>
			}
			description={description}
			error={error}
			{...rest}
		/>
	);
};

export default PasswordInput;
