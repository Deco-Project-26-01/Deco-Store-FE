import type {
	IEditAddressFormData,
	IEditAddressRequestData,
} from '#types/userinfo';
import DefaultInput from '@components/Input/DefaultInput';
import InputLabel from '@components/Label/InputLabel';
import { useForm } from 'react-hook-form';

interface IEditAddressForm {
	onSubmit: (data: IEditAddressRequestData) => void;
	isPending: boolean;
	defaultValues: {
		label: string | null;
		shippingAddress: string;
	};
}

const EditAddressForm = ({
	onSubmit,
	isPending,
	defaultValues,
}: IEditAddressForm) => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<IEditAddressFormData>({
		mode: 'onChange',
		defaultValues: {
			label: defaultValues.label ? defaultValues.label : '',
			shippingAddress: defaultValues.shippingAddress,
		},
	});

	const handleSave = (data: IEditAddressFormData) => {
		const formData: IEditAddressRequestData = {
			label: data.label ? data.label : null,
			shippingAddress: data.shippingAddress,
		};

		onSubmit(formData);
	};

	return (
		<form id="editAddressForm" onSubmit={handleSubmit(handleSave)}>
			{/* 배송지 이름 */}
			<div className="flex flex-col gap-sm mb-lg">
				<InputLabel htmlFor="addressLabel">Label</InputLabel>
				<DefaultInput
					id="addressLabel"
					placeholder="e.g. Home, Work, Parents' house"
					disabled={isPending}
					{...register('label')}
					showClearIcon={!!watch('label') && !isPending}
					onClearIconClick={() =>
						setValue('label', '', {
							shouldDirty: true,
							shouldValidate: true,
						})
					}
				/>
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
					{...register('shippingAddress', {
						required: 'Address is required',
					})}
					showClearIcon={!!watch('shippingAddress') && !isPending}
					onClearIconClick={() =>
						setValue('shippingAddress', '', {
							shouldDirty: true,
							shouldValidate: true,
						})
					}
					error={errors.shippingAddress?.message}
				/>
			</div>
		</form>
	);
};

export default EditAddressForm;
