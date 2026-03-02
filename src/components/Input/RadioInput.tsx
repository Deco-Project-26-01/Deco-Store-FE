interface IRadioInputProps<T extends string> {
	item: { label: string; value: T };
	name: string;
	value: T;
	setValue: React.Dispatch<React.SetStateAction<T>>;
}

const RadioInput = <T extends string>({
	item,
	name,
	value,
	setValue,
}: IRadioInputProps<T>) => {
	return (
		<label
			htmlFor={item.value}
			className="flex items-center gap-sm cursor-pointer"
		>
			<input
				type="radio"
				id={item.value}
				name={name}
				value={item.value}
				checked={value === item.value}
				onChange={() => setValue(item.value)}
				className="peer sr-only"
			/>
			<span
				className={`
              flex items-center justify-center
              w-lg h-lg
              bg-white rounded-full
              border-2 border-solid border-base500 box-border
              peer-checked:after:content-[''] peer-checked:after:w-sm peer-checked:after:h-sm peer-checked:after:bg-primaryDark peer-checked:after:rounded-full
            `}
			/>
			<span className="text-bodyBase">{item.label}</span>
		</label>
	);
};

export default RadioInput;
