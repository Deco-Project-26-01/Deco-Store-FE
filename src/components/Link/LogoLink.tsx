import { Link } from 'react-router-dom';
import logoWhite from '@assets/logo/logo_white.png';
import logoBase300 from '@assets/logo/logo_base300.png';

type LinkVariant = 'white' | 'gray';

interface ILinkProps {
	variant: LinkVariant;
}

const LogoLink = ({ variant }: ILinkProps) => {
	return (
		<Link
			to="/"
			aria-label="To DECO Store Home"
			className={`
        inline-block
        w-[12rem] h-[4.8rem]
        px-lg py-[1.4rem]
        duration
        focus-visible:rounded-xs
        focus-visible:outline
        ${variant === 'white' ? 'focus-visible:outline-white' : 'focus-visible:outline-base300'}
      `}
		>
			<img
				src={variant === 'white' ? logoWhite : logoBase300}
				alt=""
				className="w-full h-full object-contain"
				aria-hidden="true"
			/>
		</Link>
	);
};

export default LogoLink;
