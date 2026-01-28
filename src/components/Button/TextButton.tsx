import type { ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'dark' | 'light' | 'gray' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'fullSmall' | 'fullMedium';

interface ITextButtonProps extends ComponentPropsWithoutRef<'button'> {
	variant: ButtonVariant;
	size: ButtonSize;
	children: string;
}

const small = 'px-md py-sm';
const medium = 'px-lg py-md';
const fullSmall = 'w-full py-sm';
const fullMedium = 'w-full py-md';

const buttonSize: Record<ButtonSize, string> = {
	small,
	medium,
	fullSmall,
	fullMedium,
};

const dark =
	'bg-primaryDark text-white hover:bg-primaryBase focus-visible:outline focus-visible:outline-secondaryBase';
const light =
	'bg-base100 text-primaryDark hover:bg-base200 focus-visible:outline focus-visible:outline-primaryDark';
const gray =
	'bg-base700 text-base100 hover:bg-base500 focus-visible:outline focus-visible:outline-base300';
const outlined =
	'bg-transparent text-white border border-solid border-white box-border hover:bg-white hover:text-primaryDark focus-visible:outline focus-visible:outline-secondaryBase';
const text =
	'bg-transparent text-primaryDark hover:underline hover:decoration-solid focus-visible:outline focus-visible:outline-primaryDark';
const disabled =
	'disabled:bg-base300 disabled:text-white disabled:cursor-not-allowed';

const buttonVariant: Record<ButtonVariant, string> = {
	dark,
	light,
	gray,
	outlined,
	text,
};

const TextButton = ({
	type = 'button',
	variant,
	size,
	children,
	...rest
}: ITextButtonProps) => {
	return (
		<button
			type={type}
			className={`
				text-titleBase
				rounded-xs
				${buttonVariant[variant]}
				${buttonSize[size]}
				${disabled}
				flex items-center justify-center`}
			{...rest}
		>
			{children}
		</button>
	);
};

export default TextButton;
