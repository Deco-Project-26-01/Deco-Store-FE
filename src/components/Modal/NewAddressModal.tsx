import type {
	INewAddressFormData,
	INewAddressRequestData,
} from '#types/userinfo';
import NewAddressForm from '@components/Form/NewAddressForm';
import FormModal from '@components/Modal/FormModal';

const NewAddressModal = () => {
	// const closeModal = useModalStore((state) => state.closeModal);

	// 추후 mutate의 isPending으로 변경 예정 - 아직 개발 전
	const isPending = false;

	const handleSave = (data: INewAddressFormData) => {
		const formData: INewAddressRequestData = {
			label: data.addressLabel ? data.addressLabel : 'Default',
			recipientName: data.recipientName,
			phone: data.phone,
			address: data.address,
		};

		console.log(formData);
	};

	return (
		<FormModal
			title="New Address"
			firstButtonText="Cancel"
			secondButtonText={isPending ? 'Saving...' : 'Save'}
			formId="newAddressForm"
			closeOnOverlayClick={false}
			isPending={isPending}
		>
			<NewAddressForm onSubmit={handleSave} isPending={isPending} />
		</FormModal>
	);
};

export default NewAddressModal;
