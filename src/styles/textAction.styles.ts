export type TextActionVariant = 'dark' | 'light' | 'gray' | 'outlined' | 'text';
export type TextActionSize = 'small' | 'medium' | 'fullSmall' | 'fullMedium';

const sizeClass: Record<TextActionSize, string> = {
	small: 'px-md py-sm',
	medium: 'px-lg py-md',
	fullSmall: 'w-full py-sm',
	fullMedium: 'w-full py-md',
};

const variantClass: Record<TextActionVariant, string> = {
	dark: 'bg-primaryDark text-white hover:bg-primaryBase focus-visible:outline focus-visible:outline-secondaryBase',
	light:
		'bg-base100 text-primaryDark hover:bg-base200 focus-visible:outline focus-visible:outline-primaryDark',
	gray: 'bg-base700 text-base100 hover:bg-base500 focus-visible:outline focus-visible:outline-base300',
	outlined:
		'bg-transparent text-white border border-solid border-white box-border hover:bg-white hover:text-primaryDark focus-visible:outline focus-visible:outline-secondaryBase',
	text: 'bg-transparent text-primaryDark hover:underline hover:decoration-solid focus-visible:outline focus-visible:outline-primaryDark',
};

const baseClass = `
	text-titleBase
	rounded-xs
	duration
	flex items-center justify-center
`;

export const getTextActionClass = (
	variant: TextActionVariant,
	size: TextActionSize,
) => {
	return `${baseClass} ${variantClass[variant]} ${sizeClass[size]}`;
};
