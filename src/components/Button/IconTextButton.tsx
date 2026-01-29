import type { ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'dark' | 'light' | 'textDark' | 'textGray';
type ButtonSize = 'small' | 'medium';

interface IIconTextButtonProps extends ComponentPropsWithoutRef<'button'> {
	variant: ButtonVariant;
	size: ButtonSize;
	iconPath: string;
	iconAlt: string;
	children: string;
}

const small = 'px-sm py-xs';
const medium = 'px-md py-sm';

const buttonSize: Record<ButtonSize, string> = {
	small,
	medium,
};

const dark =
	'bg-primaryDark text-white hover:bg-primaryBase focus-visible:outline focus-visible:outline-secondaryBase';
const light =
	'bg-base100 text-primaryDark hover:bg-base200 focus-visible:outline focus-visible:outline-primaryDark';
const textDark =
	'bg-transparent text-primaryDark hover:underline focus-visible:outline focus-visible:outline-primaryDark';
const textGray =
	'bg-transparent text-base300 hover:text-base100 focus-visible:outline focus-visible:outline-base300';

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
			className={`
				text-titleBase
				rounded-xs
				flex justify-center items-center gap-sm
				duration
				${buttonVariant[variant]}
				${buttonSize[size]}`}
		>
			<img src={iconPath} alt={iconAlt} className="w-[1.6rem] h-[1.6rem]" />

			{children}
		</button>
	);
};

export default IconTextButton;
