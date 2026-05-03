import type {
	IChangeProfileRequestData,
	INewAddressRequestData,
} from '#types/userinfo';
import NewAddressForm from '@components/Form/NewAddressForm';
import AlertModal from '@components/Modal/AlertModal';
import FormModal from '@components/Modal/FormModal';
import useChangeProfile from '@hooks/useChangeProfile';
import { useModalStore } from '@store/useModalStore';

const NewAddressModal = () => {
	const closeModal = useModalStore((state) => state.closeModal);
	const openModal = useModalStore((state) => state.openModal);

	const { mutate: changeProfile, isPending } = useChangeProfile();

	const handleSave = (formData: INewAddressRequestData) => {
		const payload: Partial<IChangeProfileRequestData> = {
			label: formData.label || null,
			shippingAddress: formData.shippingAddress || null,
		};

		changeProfile(payload, {
			onSuccess: () => {
				closeModal();
			},
			onError: (error) => {
				openModal(
					<AlertModal
						title="Failed to save address"
						description={
							error instanceof Error
								? error.message
								: 'An unknown error occurred.'
						}
						buttonText="OK"
					/>,
				);
			},
		});
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
