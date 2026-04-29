import type { IChangeProfileRequestData } from '#types/userinfo';
import CountryDropdown from '@components/Input/CountryDropdown';
import DefaultInput from '@components/Input/DefaultInput';
import InputLabel from '@components/Label/InputLabel';
import { useUserInfoStore } from '@store/useUserInfoStore';
import getCountryCodeFromNation from '@utils/getCountryCodeFromNation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getCountryCallingCode } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';

interface IChangeProfileFormData {
	lastName: string;
	firstName: string;
	companyName: string;
	businessNumber: string;
	nation: string;
	phone: string;
	callingCode: string;
}

interface IChangeProfileFormProps {
	onSubmit: (data: IChangeProfileRequestData) => void;
	isPending?: boolean;
}

const ChangeProfileForm = ({
	onSubmit,
	isPending = false,
}: IChangeProfileFormProps) => {
	const userInfo = useUserInfoStore((state) => state.userInfo);

	const {
		handleSubmit,
		register,
		watch,
		control,
		setValue,
		reset,
		formState: { errors },
	} = useForm<IChangeProfileFormData>({
		mode: 'onChange',
		defaultValues: {
			lastName: '',
			firstName: '',
			companyName: '',
			businessNumber: '',
			nation: '',
			phone: '',
			callingCode: '',
		},
	});

	useEffect(() => {
		if (!userInfo) return;

		const nextNationCode = getCountryCodeFromNation(userInfo.nation);

		reset({
			lastName: userInfo.lastName || '',
			firstName: userInfo.firstName || '',
			companyName: userInfo.companyName || '',
			businessNumber: userInfo.businessNumber || '',
			nation: nextNationCode,
			phone: userInfo.phone.split('-')[1] || '',
			callingCode: nextNationCode
				? `+${getCountryCallingCode(nextNationCode)}`
				: '',
		});
	}, [userInfo, reset]);

	if (!userInfo) return null;

	const userType = userInfo.userType;

	const handleSave = (data: IChangeProfileFormData) => {
		const formData: IChangeProfileRequestData = {
			lastName: userType === 'PERSONAL' ? String(data.lastName) : null,
			firstName: userType === 'PERSONAL' ? String(data.firstName) : null,
			companyName: userType === 'CORPORATE' ? String(data.companyName) : null,
			businessNumber:
				userType === 'CORPORATE' ? String(data.businessNumber) : null,
			nation: en[data.nation as keyof typeof en],
			phone: `${data.callingCode}-${data.phone}`,
		};

		onSubmit(formData);
	};

	return (
		<form id="changeProfileForm" onSubmit={handleSubmit(handleSave)}>
			{userType === 'PERSONAL' && (
				<div className="mb-lg flex flex-col gap-lg">
					<div className="flex flex-col gap-sm">
						<InputLabel htmlFor="lastName" isRequired>
							Last Name
						</InputLabel>
						<DefaultInput
							id="lastName"
							type="text"
							placeholder="Enter your last name"
							disabled={isPending}
							{...register('lastName', {
								required:
									userType === 'PERSONAL' ? 'Last name is required' : false,
							})}
							showClearIcon={!!watch('lastName') && !isPending}
							onClearIconClick={() =>
								setValue('lastName', '', {
									shouldDirty: true,
									shouldValidate: true,
								})
							}
							error={errors.lastName?.message}
						/>
					</div>

					<div className="mb-lg flex flex-col gap-sm">
						<InputLabel htmlFor="firstName" isRequired>
							First Name
						</InputLabel>
						<DefaultInput
							id="firstName"
							type="text"
							placeholder="Enter your first name"
							disabled={isPending}
							{...register('firstName', {
								required:
									userType === 'PERSONAL' ? 'First name is required' : false,
							})}
							showClearIcon={!!watch('firstName') && !isPending}
							onClearIconClick={() =>
								setValue('firstName', '', {
									shouldDirty: true,
									shouldValidate: true,
								})
							}
							error={errors.firstName?.message}
						/>
					</div>
				</div>
			)}

			{userType === 'CORPORATE' && (
				<div className="mb-lg flex flex-col gap-lg">
					<div className="flex flex-col gap-sm">
						<InputLabel htmlFor="companyName" isRequired>
							Company Name
						</InputLabel>
						<DefaultInput
							id="companyName"
							type="text"
							placeholder="Enter your company name"
							disabled={isPending}
							{...register('companyName', {
								required:
									userType === 'CORPORATE' ? 'Company name is required' : false,
							})}
							showClearIcon={!!watch('companyName') && !isPending}
							onClearIconClick={() =>
								setValue('companyName', '', {
									shouldDirty: true,
									shouldValidate: true,
								})
							}
							error={errors.companyName?.message}
						/>
					</div>

					<div className="flex flex-col gap-sm">
						<InputLabel htmlFor="businessNumber" isRequired>
							Business Number
						</InputLabel>
						<DefaultInput
							id="businessNumber"
							type="text"
							placeholder="Enter your business number"
							disabled={isPending}
							{...register('businessNumber', {
								required:
									userType === 'CORPORATE'
										? 'Business number is required'
										: false,
							})}
							showClearIcon={!!watch('businessNumber') && !isPending}
							onClearIconClick={() =>
								setValue('businessNumber', '', {
									shouldDirty: true,
									shouldValidate: true,
								})
							}
							error={errors.businessNumber?.message}
						/>
					</div>
				</div>
			)}

			<div className="flex flex-col gap-sm">
				<InputLabel htmlFor="phoneNumber" isRequired>
					Phone Number
				</InputLabel>

				<div className="flex items-start gap-lg mb-2xl">
					<div>
						<Controller
							name="nation"
							control={control}
							rules={{ required: 'Please select a country' }}
							render={({ field }) => (
								<CountryDropdown
									listHeight={10}
									value={field.value || undefined}
									onChange={(next) => {
										if (isPending) return;

										const nextNation = next ?? '';
										field.onChange(nextNation);

										const code = next ? getCountryCallingCode(next as any) : '';

										setValue('callingCode', code ? `+${code}` : '', {
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

					<DefaultInput
						id="phoneNumber"
						type="text"
						placeholder="Enter your phone number"
						disabled={isPending}
						{...register('phone', {
							required: 'Phone number is required',
						})}
						showClearIcon={!!watch('phone') && !isPending}
						onClearIconClick={() =>
							setValue('phone', '', {
								shouldDirty: true,
								shouldValidate: true,
							})
						}
						error={errors.phone?.message}
					/>
				</div>
			</div>
		</form>
	);
};

export default ChangeProfileForm;
