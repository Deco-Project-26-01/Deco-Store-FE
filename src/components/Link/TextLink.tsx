import {
	getTextActionClass,
	type TextActionSize,
	type TextActionVariant,
} from '@styles/textAction.styles';
import { Link, type LinkProps } from 'react-router-dom';

interface ITextLinkProps extends LinkProps {
	variant: TextActionVariant;
	size: TextActionSize;
	children: string;
}

const TextLink = ({ variant, size, children, ...rest }: ITextLinkProps) => {
	return (
		<Link className={getTextActionClass(variant, size)} {...rest}>
			{children}
		</Link>
	);
};

export default TextLink;
