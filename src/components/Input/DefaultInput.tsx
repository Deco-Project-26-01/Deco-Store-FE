import iconXCircleBase300 from '@assets/icons/icon-x-circle-base300.svg';
import InputButton from '@components/Input/InputButton';
import { type ComponentPropsWithoutRef, type ReactElement } from 'react';

interface IDefaultInputProps extends ComponentPropsWithoutRef<'input'> {
	passwordToggle?: ReactElement;
	showClearIcon?: boolean;
	onClearIconClick: React.MouseEventHandler<HTMLButtonElement>;
	description?: string;
	error?: string;
}

const DefaultInput = ({
	id,
	type = 'text',
	passwordToggle,
	showClearIcon,
	onClearIconClick,
	description,
	error,
	value,
	...rest
}: IDefaultInputProps) => {
	// value가 undefined가 아니면 제어 컴포넌트로 간주
	const isControlled = value !== undefined;
	const shouldShowActions = isControlled ? !!value : !!showClearIcon;
	const reserveWidth = passwordToggle ? 'w-[5.6rem]' : 'w-[2.4rem]';

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
					type={type}
					className="grow ellipsis text-bodyBase placeholder:text-base500"
					aria-invalid={!!error}
					data-testid={id}
					{...(isControlled ? { value } : {})}
					{...rest}
				/>
				<div className={`shrink-0 ${reserveWidth}`}>
					<div
						className={`flex items-center gap-sm ${shouldShowActions ? '' : 'invisible pointer-events-none'}`}
					>
						{passwordToggle}
						<InputButton
							iconPath={iconXCircleBase300}
							iconAlt={'Clear'}
							onClick={onClearIconClick}
						/>
					</div>
				</div>
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
