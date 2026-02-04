import type { ComponentPropsWithoutRef } from 'react';

type TextLinkVariant = 'dark' | 'light' | 'gray' | 'outlined' | 'text';
type TextLinkSize = 'small' | 'medium' | 'fullSmall' | 'fullMedium';

interface ITextLinkProps extends ComponentPropsWithoutRef<'a'> {
	variant: TextLinkVariant;
	size: TextLinkSize;
	children: string;
}

const small = 'px-md py-sm';
const medium = 'px-lg py-md';
const fullSmall = 'w-full py-sm';
const fullMedium = 'w-full py-md';

const linkSize: Record<TextLinkSize, string> = {
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

const linkVariant: Record<TextLinkVariant, string> = {
	dark,
	light,
	gray,
	outlined,
	text,
};

const TextLink = ({ variant, size, children, ...rest }: ITextLinkProps) => {
	return (
		<a
			className={`text-titleBase
				rounded-xs
				duration
				${linkVariant[variant]}
				${linkSize[size]}
				flex items-center justify-center
      `}
			{...rest}
		>
			{children}
		</a>
	);
};

export default TextLink;
