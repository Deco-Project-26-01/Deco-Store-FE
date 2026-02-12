import iconXCircleBase300 from '@assets/icons/icon-x-circle-base300.svg';
import IconButton from '@components/Button/IconButton';
import { type ComponentPropsWithoutRef, type ReactElement } from 'react';

interface IDefaultInputProps extends ComponentPropsWithoutRef<'input'> {
	passwordToggle?: ReactElement;
	onIconClick: React.MouseEventHandler<HTMLButtonElement>;
	description?: string;
	isError: boolean;
	errorMessage: string;
}

const DefaultInput = ({
	value,
	passwordToggle,
	onIconClick,
	description,
	isError,
	errorMessage,
	...rest
}: IDefaultInputProps) => {
	return (
		<div className="w-full">
			<div
				className={`
					mb-xs
					flex items-center gap-sm
					pl-lg pr-md py-sm
					rounded-xs
					box-border
					border-solid border-2 border-base300
					focus-within:border-primaryDark
					${isError ? 'border-alert focus-within:border-alert' : ''}
			`}
			>
				<input
					value={value}
					className="grow ellipsis text-bodyBase placeholder:text-base500"
					{...rest}
				/>
				{passwordToggle && passwordToggle}
				{!!value ? (
					<div
						className={`
							ml-auto
							w-[2.4rem] h-[2.4rem] p-xs
							duration
							flex items-center justify-center
							hover:scale-95 hover:rounded-xs hover:bg-base300/10
							focus-within:rounded-xs focus-within:outline focus-within:outline-1 focus-within:outline-base300
							active:scale-95 active:rounded-xs active:bg-base300/10
						`}
					>
						<IconButton
							iconPath={iconXCircleBase300}
							iconAlt={'Clear'}
							onClick={onIconClick}
						/>
					</div>
				) : (
					<div className="w-[2.4rem] h-[2.4rem] ml-auto" />
				)}
			</div>
			{description && (
				<p className="text-bodyXsmall text-base500">{description}</p>
			)}
			{isError && <p className="text-bodyXsmall text-alert">{errorMessage}</p>}
		</div>
	);
};

export default DefaultInput;
