import iconXCircleBase300 from '@assets/icons/icon-x-circle-base300.svg';
import InputButton from '@components/Input/InputButton';
import { type ComponentPropsWithoutRef, type ReactElement } from 'react';

interface IDefaultInputProps extends ComponentPropsWithoutRef<'input'> {
	passwordToggle?: ReactElement;
	timer?: ReactElement;
	showClearIcon?: boolean;
	onClearIconClick: React.MouseEventHandler<HTMLButtonElement>;
	description?: string;
	error?: string;
}

const DefaultInput = ({
	id,
	type = 'text',
	passwordToggle,
	timer,
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
	const reserveWidth = passwordToggle || timer ? 'w-[5.6rem]' : 'w-[2.4rem]';

	return (
		<div className="w-full min-w-0">
			<div
				className={`
					w-full
					flex items-center gap-sm
					pl-lg pr-md py-[6px]
					rounded-xs box-border
					border-solid border-2
					${error ? 'border-alert' : 'border-base300'}
					${error ? 'focus-within:border-alert' : 'focus-within:border-primaryDark'}
					has-[input:read-only]:bg-base100
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
				<div className={`shrink-0 ${reserveWidth} flex items-center gap-sm`}>
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
					{timer && <div className="ml-auto">{timer}</div>}
				</div>
			</div>
			{description && (
				<p role="note" className="mt-xs text-bodyXsmall text-base700">
					{description}
				</p>
			)}
			{error && (
				<p role="alert" className="mt-xs text-bodyXsmall text-alert">
					{error}
				</p>
			)}
		</div>
	);
};

export default DefaultInput;
