import DefaultInput from '@components/Input/DefaultInput';
import type { ComponentPropsWithoutRef } from 'react';

interface ITimerInputProps extends ComponentPropsWithoutRef<'input'> {
	timer?: string;
	showClearIcon?: boolean;
	onClearIconClick: React.MouseEventHandler<HTMLButtonElement>;
	description?: string;
	error?: string;
}

const TimerInput = ({ timer, ...rest }: ITimerInputProps) => {
	return (
		<DefaultInput
			timer={
				timer ? (
					<span className="text-bodyCaption text-primaryDark font-bold">
						{timer}
					</span>
				) : undefined
			}
			{...rest}
		/>
	);
};

export default TimerInput;
