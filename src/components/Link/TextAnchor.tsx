import {
	getTextActionClass,
	type TextActionSize,
	type TextActionVariant,
} from '@styles/textAction.styles';
import type { ComponentPropsWithoutRef } from 'react';

interface ITextAnchorProps extends ComponentPropsWithoutRef<'a'> {
	variant: TextActionVariant;
	size: TextActionSize;
	children: string;
}

const TextAnchor = ({ variant, size, children, ...rest }: ITextAnchorProps) => {
	return (
		<a className={getTextActionClass(variant, size)} {...rest}>
			{children}
		</a>
	);
};

export default TextAnchor;
