import {
	getCountries,
	getCountryCallingCode,
} from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en';
import Dropdown from '@components/Dropdown/Dropdown';

interface ICountryDropdownProps {
	value?: string;
	onChange: (value?: string) => void;
}

const CountryDropdown = ({ value, onChange }: ICountryDropdownProps) => {
	const list = getCountries()
		.filter(
			(country) => country !== 'CN' && country !== 'KP' && country !== 'IR',
		)
		.map((country) => ({
			value: country,
			label: `${en[country]} +${getCountryCallingCode(country)}`,
		}));

	return (
		<Dropdown
			width={20}
			listHeight={20}
			selectedValue={value}
			list={list}
			onChange={(next) => onChange(next || undefined)}
		/>
	);
};

export default CountryDropdown;
