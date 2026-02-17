import type { ComponentPropsWithoutRef } from 'react';

type TextAnchorVariant = 'dark' | 'light' | 'gray' | 'outlined' | 'text';
type TextAnchorSize = 'small' | 'medium' | 'fullSmall' | 'fullMedium';

interface ITextAnchorProps extends ComponentPropsWithoutRef<'a'> {
	variant: TextAnchorVariant;
	size: TextAnchorSize;
	children: string;
}

const small = 'px-md py-sm';
const medium = 'px-lg py-md';
const fullSmall = 'w-full py-sm';
const fullMedium = 'w-full py-md';

const anchorSize: Record<TextAnchorSize, string> = {
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

const anchorVariant: Record<TextAnchorVariant, string> = {
	dark,
	light,
	gray,
	outlined,
	text,
};

const TextAnchor = ({ variant, size, children, ...rest }: ITextAnchorProps) => {
	return (
		<a
			className={`text-titleBase
				rounded-xs
				duration
				${anchorVariant[variant]}
				${anchorSize[size]}
				flex items-center justify-center
      `}
			{...rest}
		>
			{children}
		</a>
	);
};

export default TextAnchor;
