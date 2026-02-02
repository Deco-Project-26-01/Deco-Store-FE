import type { ComponentPropsWithoutRef } from 'react';

interface IIconButtonProps extends ComponentPropsWithoutRef<'button'> {
	iconPath: string;
	iconAlt: string;
}

const IconButton = ({ iconPath, iconAlt, ...rest }: IIconButtonProps) => {
	return (
		<button type="button" {...rest}>
			<span className="sr-only">{iconAlt}</span>
			<img src={iconPath} alt="" aria-hidden="true" />
		</button>
	);
};

export default IconButton;
