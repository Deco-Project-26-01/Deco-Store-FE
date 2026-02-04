import type { ComponentPropsWithoutRef } from 'react';

type IconTextLinkVariant = 'dark' | 'light' | 'textDark' | 'textGray';
type IconTextLinkSize = 'small' | 'medium';

interface IIconTextLinkProps extends ComponentPropsWithoutRef<'a'> {
	variant: IconTextLinkVariant;
	size: IconTextLinkSize;
	iconPath: string;
	children: string;
}

const small = 'px-sm py-xs';
const medium = 'px-md py-sm';

const linkSize: Record<IconTextLinkSize, string> = {
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

const linkVariant: Record<IconTextLinkVariant, string> = {
	dark,
	light,
	textDark,
	textGray,
};

const IconTextLink = ({
	variant,
	size,
	iconPath,
	children,
	...rest
}: IIconTextLinkProps) => {
	return (
		<a
			className={`
        text-titleBase
        rounded-xs
        flex justify-center items-center gap-sm
        duration
        ${linkVariant[variant]}
        ${linkSize[size]}`}
			{...rest}
		>
			<img
				src={iconPath}
				alt=""
				aria-hidden={true}
				className="w-[1.6rem] h-[1.6rem]"
			/>
			{children}
		</a>
	);
};

export default IconTextLink;
