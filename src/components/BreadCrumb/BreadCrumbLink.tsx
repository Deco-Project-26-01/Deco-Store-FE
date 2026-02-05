import { Link, type LinkProps } from 'react-router-dom';

interface IBreadCrumbLinkProps extends LinkProps {
	to: string;
	variant: 'primary' | 'secondary';
	children: string;
}

const BreadCrumbLink = ({ to, variant, children }: IBreadCrumbLinkProps) => {
	return (
		<Link
			to={to}
			className={`
      ${variant === 'primary' ? 'text-base700' : 'text-base300'}
      duration
      hover:underline
      focus-visible:rounded-[1px]
      focus-visible:outline focus-visible:outline-offset-2
      ${variant === 'primary' ? 'focus-visible:outline-base700' : 'focus-visible:outline-base300'}
    `}
		>
			{children}
		</Link>
	);
};

export default BreadCrumbLink;
