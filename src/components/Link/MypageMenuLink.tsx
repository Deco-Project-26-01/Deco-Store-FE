import { Link, type LinkProps } from 'react-router-dom';

interface IMypageMenuLinkProps extends LinkProps {
	imagePath: string;
	title: string;
	description: string;
}

const MypageMenuLink = ({
	imagePath,
	title,
	description,
	...rest
}: IMypageMenuLinkProps) => {
	return (
		<Link
			className={`
        w-full aspect-square
				px-lg py-lg box-border
        flex flex-col gap-lg justify-center items-center
        rounded-lg duration
        text-base900
        border-1 border-solid border-base500
        hover:border-primaryDark hover:bg-base200/20
        focus-visible:outline focus-visible:outline-primaryDark
      `}
			{...rest}
		>
			<img
				src={imagePath}
				alt=""
				aria-hidden={true}
				className={`
          w-[8rem] h-[8rem]
        `}
			/>
			<span className="text-titleLarge">{title}</span>
			<span className="text-bodyBase text-base500">{description}</span>
		</Link>
	);
};

export default MypageMenuLink;
