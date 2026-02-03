import type { ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'dark' | 'light' | 'textDark' | 'textGray';
type ButtonSize = 'small' | 'medium';

interface IIconTextButtonProps extends ComponentPropsWithoutRef<'button'> {
	variant: ButtonVariant;
	size: ButtonSize;
	iconPath: string;
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
	'bg-transparent text-base400 hover:text-base100 focus-visible:outline focus-visible:outline-base400';

const buttonVariant: Record<ButtonVariant, string> = {
	dark,
	light,
	textDark,
	textGray,
};

const IconTextButton = ({
	type = 'button',
	variant,
	size,
	iconPath,
	children,
	onClick,
	...rest
}: IIconTextButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`
				text-titleBase
				rounded-xs
				flex justify-center items-center gap-sm
				duration
				${buttonVariant[variant]}
				${buttonSize[size]}`}
			{...rest}
		>
			<img
				src={iconPath}
				aria-hidden={true}
				className="w-[1.6rem] h-[1.6rem]"
			/>

			{children}
		</button>
	);
};

export default IconTextButton;
