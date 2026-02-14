import iconEyeOffPrimaryDark from '@assets/icons/icon-eye-off-primaryDark.svg';
import iconEyePrimaryDark from '@assets/icons/icon-eye-primaryDark.svg';
import DefaultInput from '@components/Input/DefaultInput';
import InputButton from '@components/Input/InputButton';
import { useState } from 'react';

interface IPasswordInputProps {
	id: string;
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	onClearIconClick: React.MouseEventHandler<HTMLButtonElement>;
	description?: string;
	error?: string;
}

const PasswordInput = ({
	id,
	value,
	onChange,
	onClearIconClick,
	description,
	error,
}: IPasswordInputProps) => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<DefaultInput
			id={id}
			type={isVisible ? 'text' : 'password'}
			value={value}
			onChange={onChange}
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
		/>
	);
};

export default PasswordInput;
