import type { ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'dark' | 'light' | 'textDark' | 'textGray';
type ButtonSize = 'small' | 'medium';

interface IIconTextButtonProps extends ComponentPropsWithoutRef<'button'> {
	variant: ButtonVariant;
	size: ButtonSize;
	iconPath: string;
	iconAlt: string;
	children: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const small = 'px-sm py-xs';
const medium = 'px-md py-sm';

const buttonSize: Record<ButtonSize, string> = {
	small,
	medium,
};

const dark =
	'bg-primaryDark text-white hover:bg-primaryBase focus-visible:outline focus-visible:outline-secondaryBase';
const light = '';
const textDark = '';
const textGray = '';

const buttonVariant: Record<ButtonVariant, string> = {
	dark,
	light,
	textDark,
	textGray,
};

const IconTextButton = ({
	variant,
	size,
	iconPath,
	iconAlt,
	children,
	onClick,
}: IIconTextButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`${buttonVariant[variant]} ${buttonSize[size]}`}
		>
			<img src={iconPath} alt={iconAlt} />
			<span>{children}</span>
		</button>
	);
};

export default IconTextButton;
