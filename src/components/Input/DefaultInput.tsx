import iconXCircleBase300 from '@assets/icons/icon-x-circle-base300.svg';
import InputButton from '@components/Input/InputButton';
import { type ComponentPropsWithoutRef, type ReactElement } from 'react';

interface IDefaultInputProps extends ComponentPropsWithoutRef<'input'> {
	passwordToggle?: ReactElement;
	onClearIconClick: React.MouseEventHandler<HTMLButtonElement>;
	description?: string;
	error?: string;
}

const DefaultInput = ({
	id,
	value,
	passwordToggle,
	onClearIconClick,
	description,
	error,
	...rest
}: IDefaultInputProps) => {
	return (
		<div className="w-full">
			<div
				className={`
					w-full mb-xs
					flex items-center gap-sm
					pl-lg pr-md py-sm
					rounded-xs box-border
					border-solid border-2
					${error ? 'border-alert' : 'border-base300'}
					${error ? 'focus-within:border-alert' : 'focus-within:border-primaryDark'}
			`}
			>
				<input
					id={id}
					value={value}
					className="grow ellipsis text-bodyBase placeholder:text-base500"
					aria-invalid={!!error}
					data-testid={id}
					{...rest}
				/>
				{passwordToggle}
				{!!value && (
					<InputButton
						iconPath={iconXCircleBase300}
						iconAlt={'Clear'}
						onClick={onClearIconClick}
					/>
				)}
			</div>
			{description && (
				<p role="note" className="text-bodyXsmall text-base700">
					{description}
				</p>
			)}
			{error && (
				<p role="alert" className="text-bodyXsmall text-alert">
					{error}
				</p>
			)}
		</div>
	);
};

export default DefaultInput;
