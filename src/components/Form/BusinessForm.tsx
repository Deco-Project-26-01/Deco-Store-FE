import type { IRegisterFormData } from '#types/auth';
import DefaultInput from '@components/Input/DefaultInput';
import InputLabel from '@components/Label/InputLabel';
import { useFormContext } from 'react-hook-form';

const BusinessForm = () => {
	const { register, resetField, watch } =
		useFormContext<Pick<IRegisterFormData, 'companyName' | 'businessNumber'>>();
	return (
		<>
			{/* 회사명 */}
			<div className="flex flex-col gap-sm mb-lg">
				<InputLabel htmlFor="companyName" isRequired>
					Company Name
				</InputLabel>
				<DefaultInput
					id="companyName"
					type="text"
					placeholder="Enter your company name"
					{...register('companyName', {
						required: 'Company name is required',
					})}
					showClearIcon={!!watch('companyName')}
					onClearIconClick={() => resetField('companyName')}
				/>
			</div>
			{/* 사업자 등록번호 */}
			<div className="flex flex-col gap-sm mb-lg">
				<InputLabel htmlFor="businessNumber" isRequired>
					Registration Number
				</InputLabel>
				<DefaultInput
					id="businessNumber"
					type="text"
					placeholder="Enter your company's registration number"
					{...register('businessNumber', {
						required: 'Registration number is required',
					})}
					showClearIcon={!!watch('businessNumber')}
					onClearIconClick={() => resetField('businessNumber')}
				/>
			</div>
		</>
	);
};

export default BusinessForm;
