import { getCountries } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';

const getCountryCodeFromNation = (nation: string | null | undefined) => {
	if (!nation) return '';

	return (
		getCountries().find(
			(country) => en[country as keyof typeof en] === nation,
		) ?? ''
	);
};

export default getCountryCodeFromNation;
