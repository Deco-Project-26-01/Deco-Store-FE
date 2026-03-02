import RadioInput from '@components/Input/RadioInput';

interface IRadioFormProps<T extends string> {
	name: string;
	legend: string;
	isRequired?: boolean;
	list: { label: string; value: T }[];
	value: T;
	setValue: React.Dispatch<React.SetStateAction<T>>;
}

const RadioForm = <T extends string>({
	name,
	legend,
	isRequired,
	list,
	value,
	setValue,
}: IRadioFormProps<T>) => {
	return (
		<fieldset>
			<legend className="text-bodyCaption text-primaryDark font-bold mb-sm">
				{legend} {isRequired && <span className="text-alert">*</span>}
			</legend>

			<div className="flex gap-x-2xl gap-y-sm flex-wrap">
				{list.map((item) => (
					<RadioInput
						key={item.value}
						item={item}
						name={name}
						value={value}
						setValue={setValue}
					/>
				))}
			</div>
		</fieldset>
	);
};

export default RadioForm;
