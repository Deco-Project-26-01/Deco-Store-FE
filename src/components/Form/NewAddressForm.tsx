import type { INewAddressFormData } from '#types/userinfo';
import CountryDropdown from '@components/Input/CountryDropdown';
import DefaultInput from '@components/Input/DefaultInput';
import InputLabel from '@components/Label/InputLabel';
import { Controller, useForm } from 'react-hook-form';
import { getCountryCallingCode } from 'react-phone-number-input';

interface INewAddressForm {
	onSubmit: (data: any) => void;
	isPending: boolean;
}

const NewAddressForm = ({ onSubmit, isPending }: INewAddressForm) => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
		control,
	} = useForm<INewAddressFormData>({
		mode: 'onChange',
		defaultValues: {
			addressLabel: '',
			recipientName: '',
			nation: '',
			phone: '',
			callingCode: '',
			address: '',
		},
	});

	return (
		<form id="newAddressForm" onSubmit={handleSubmit(onSubmit)}>
			{/* 배송지 이름 */}
			<div className="flex flex-col gap-sm mb-lg">
				<InputLabel htmlFor="addressLabel">Label</InputLabel>
				<DefaultInput
					id="addressLabel"
					placeholder="e.g. Home, Work, Parents' house"
					disabled={isPending}
					{...register('addressLabel')}
					showClearIcon={!!watch('addressLabel') && !isPending}
					onClearIconClick={() =>
						setValue('addressLabel', '', {
							shouldDirty: true,
							shouldValidate: true,
						})
					}
				/>
			</div>
			{/* 수령인 정보 */}
			<div className="flex flex-col gap-sm mb-lg">
				<InputLabel htmlFor="recipientName" isRequired>
					Name
				</InputLabel>
				<DefaultInput
					id="recipientName"
					placeholder="Please enter the recipient's name"
					disabled={isPending}
					{...register('recipientName', {
						required: 'Recipient name is required',
					})}
					showClearIcon={!!watch('recipientName') && !isPending}
					onClearIconClick={() =>
						setValue('recipientName', '', {
							shouldDirty: true,
							shouldValidate: true,
						})
					}
					error={errors.recipientName?.message}
				/>
			</div>
			{/* 연락처 정보 */}
			<div className="flex flex-col gap-sm">
				<InputLabel htmlFor="phoneNumber" isRequired>
					Phone Number
				</InputLabel>

				<div className="flex items-start gap-lg mb-lg">
					<div>
						<Controller
							name="nation"
							control={control}
							rules={{ required: 'Please select a country' }}
							render={({ field }) => (
								<CountryDropdown
									listHeight={15}
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
			{/* 배송지 주소 정보 */}
			<div className="flex flex-col gap-sm mb-xl">
				<InputLabel htmlFor="address" isRequired>
					Address
				</InputLabel>
				<DefaultInput
					id="address"
					placeholder="Please enter the recipient's address"
					disabled={isPending}
					{...register('address', {
						required: 'Address is required',
					})}
					showClearIcon={!!watch('address') && !isPending}
					onClearIconClick={() =>
						setValue('address', '', {
							shouldDirty: true,
							shouldValidate: true,
						})
					}
					error={errors.address?.message}
				/>
			</div>
		</form>
	);
};

export default NewAddressForm;
