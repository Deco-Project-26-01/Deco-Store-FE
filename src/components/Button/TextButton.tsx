import type { ComponentPropsWithoutRef } from 'react';

type ButtonTheme = 'dark' | 'light' | 'outlined' | 'text';

interface ITextButtonProps extends ComponentPropsWithoutRef<'button'> {
	type: 'button' | 'submit' | 'reset';
	variant: ButtonTheme;
	children: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	isDisabled: boolean;
}

const Button = ({ type, children, onClick, isDisabled }: ITextButtonProps) => {
	return (
		<button type={type} onClick={onClick} disabled={isDisabled}>
			{children}
		</button>
	);
};

export default Button;
