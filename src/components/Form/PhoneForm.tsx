import type { IRegisterFormData } from '#types/auth';
import CountryDropdown from '@components/Input/CountryDropdown';
import DefaultInput from '@components/Input/DefaultInput';
import InputLabel from '@components/Label/InputLabel';
import { Controller, useFormContext } from 'react-hook-form';
import { getCountryCallingCode } from 'react-phone-number-input';

const PhoneForm = () => {
	const {
		register,
		control,
		watch,
		resetField,
		setValue,
		formState: { errors },
	} = useFormContext<
		Pick<IRegisterFormData, 'nation' | 'callingCode' | 'phone'>
	>();

	return (
		<div className="flex flex-col gap-sm mb-lg">
			<InputLabel htmlFor="phoneNumber" isRequired>
				Phone Number
			</InputLabel>
			<div className="flex items-start gap-lg">
				{/* 국가 선택 드롭다운 */}
				<div>
					<Controller
						name="nation"
						control={control}
						rules={{ required: 'Please select a country' }}
						render={({ field }) => (
							<CountryDropdown
								value={field.value || undefined}
								onChange={(next) => {
									// 1) 국가 저장
									const nextNation = next ?? '';
									field.onChange(nextNation);

									// 2) 국가번호 저장 (국가가 없으면 빈 값)
									const code = next ? getCountryCallingCode(next as any) : '';
									setValue('callingCode', `+${code}`, {
										shouldDirty: true,
										shouldValidate: true,
									});
								}}
							/>
						)}
					/>
					<p role="alert" className="mt-xs text-bodyXsmall text-alert">
						{errors.nation?.message}
					</p>
				</div>

				{/* 전화번호 입력 필드 */}
				<DefaultInput
					id="phoneNumber"
					type="text"
					placeholder="Enter your phone number"
					{...register('phone', {
						required: 'Phone number is required',
					})}
					showClearIcon={!!watch('phone')}
					onClearIconClick={() => resetField('phone')}
					error={errors.phone?.message}
				/>
			</div>
		</div>
	);
};

export default PhoneForm;
