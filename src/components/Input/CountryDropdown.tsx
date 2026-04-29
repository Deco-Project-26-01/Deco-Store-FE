import Dropdown from '@components/Dropdown/Dropdown';
import { BLOCKED_COUNTRIES } from '@constants/countries';
import {
	getCountries,
	getCountryCallingCode,
} from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en';

interface ICountryDropdownProps {
	listHeight?: number;
	value?: string;
	onChange: (value?: string) => void;
}

const CountryDropdown = ({
	listHeight = 20,
	value,
	onChange,
}: ICountryDropdownProps) => {
	const list = getCountries()
		.filter((country) => !BLOCKED_COUNTRIES.includes(country))
		.map((country) => ({
			value: country,
			label: `${en[country]} +${getCountryCallingCode(country)}`,
		}));

	return (
		<Dropdown
			width={20}
			listHeight={listHeight}
			selectedValue={value}
			list={list}
			onChange={(next) => onChange(next || undefined)}
		/>
	);
};

export default CountryDropdown;
