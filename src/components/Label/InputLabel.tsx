import type { ComponentPropsWithoutRef } from 'react';

interface IInputLabelProps extends ComponentPropsWithoutRef<'label'> {
	isRequired: boolean;
	children: string;
}

const InputLabel = ({ isRequired, children, ...rest }: IInputLabelProps) => {
	return (
		<label
			className={`
        text-bodyCaption font-bold
        text-primaryDark
      `}
			{...rest}
		>
			{children}
			{isRequired && (
				<>
					<span className="text-alert" aria-hidden="true">
						*
					</span>
					<span className="sr-only">Required</span>
				</>
			)}
		</label>
	);
};

export default InputLabel;
