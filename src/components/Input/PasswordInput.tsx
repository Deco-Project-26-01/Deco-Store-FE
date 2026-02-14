import iconEyePrimaryDark from '@assets/icons/icon-eye-primaryDark.svg';
import iconEyeOffPrimaryDark from '@assets/icons/icon-eye-off-primaryDark.svg';
import DefaultInput from '@components/Input/DefaultInput';
import { useState, type ComponentPropsWithoutRef } from 'react';
import PasswordToggle from '@components/Input/PasswordToggle';

interface IPasswordInputProps extends ComponentPropsWithoutRef<'input'> {
	value: string;
	onIconClick: React.MouseEventHandler<HTMLButtonElement>;
	description?: string;
	error?: string;
}

const PasswordInput = ({
	value,
	onIconClick,
	description,
	error,
	...rest
}: IPasswordInputProps) => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<DefaultInput
			id="password"
			type={isVisible ? 'text' : 'password'}
			value={value}
			onIconClick={onIconClick}
			passwordToggle={
				<PasswordToggle
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
