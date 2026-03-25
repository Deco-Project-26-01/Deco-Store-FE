interface QuantityInputProps {
	value: number;
	onDecrease: () => void;
	onIncrease: () => void;
	min?: number;
	max?: number;
}

const QuantityInput = ({
	value,
	onDecrease,
	onIncrease,
	min = 1,
	max,
}: QuantityInputProps) => {
	const isDecreaseDisabled = value <= min;
	const isIncreaseDisabled = max !== undefined && value >= max;

	return (
		<div
			className="inline-flex h-12 overflow-hidden rounded-xs border border-solid border-base300"
			role="group"
			aria-label="Quantity Input"
		>
			<button
				type="button"
				onClick={onDecrease}
				disabled={isDecreaseDisabled}
				aria-label="Decrease Quantity"
				className="flex w-12 items-center justify-center bg-base100 text-bodyMedium text-base700 transition hover:bg-base200 disabled:cursor-not-allowed disabled:opacity-40"
			>
				−
			</button>

			<div
				className="flex min-w-18 items-center justify-center border border-solid border-y-0 border-x border-base300 px-lg text-titleBase font-semibold text-primaryDark"
				aria-live="polite"
				aria-atomic="true"
			>
				{value}
			</div>

			<button
				type="button"
				onClick={onIncrease}
				disabled={isIncreaseDisabled}
				aria-label="Increase Quantity"
				className="flex w-12 items-center justify-center bg-base100 text-bodyMedium text-base700 transition hover:bg-base200 disabled:cursor-not-allowed disabled:opacity-40"
			>
				+
			</button>
		</div>
	);
};

export default QuantityInput;
