import { Link, type LinkProps } from 'react-router-dom';

interface ILinkProps extends LinkProps {
	to: string;
	iconPath: string;
	title: string;
	cartNum?: number;
}

const IconLink = ({
	to,
	iconPath,
	title,
	cartNum = 0,
	...rest
}: ILinkProps) => {
	return (
		<Link
			to={to}
			className={`
        w-[4.8rem] h-[4.8rem]
        py-[2px]
        text-white
        relative
        flex flex-col items-center gap-sm
        focus-visible:rounded-xs
        focus-visible:outline focus-visible:outline-white focus-visible:outline-offset-4
    `}
			aria-label={cartNum > 0 ? `${title}, ${cartNum} items in cart` : title}
			{...rest}
		>
			<img
				src={iconPath}
				className="w-[2rem] h-[2rem]"
				alt=""
				aria-hidden="true"
			/>
			<span className="text-bodyCaption" aria-hidden="true">
				{title}
			</span>
			{cartNum > 0 && (
				<span
					className={`
            absolute top-[0] right-[0] -translate-y-1/2
            w-[1.2rem] h-[1.2rem]
            bg-secondaryBase
            rounded-[100%]
            text-[6px] font-semibold leading-[1.2rem]
            text-center
            `}
					aria-hidden="true"
				>
					{cartNum > 9 ? '9+' : cartNum}
				</span>
			)}
		</Link>
	);
};

export default IconLink;
