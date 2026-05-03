import type {
	IChangeProfileRequestData,
	IEditAddressRequestData,
	IUserInfo,
} from '#types/userinfo';
import EditAddressForm from '@components/Form/EditAddressForm';
import AlertModal from '@components/Modal/AlertModal';
import FormModal from '@components/Modal/FormModal';
import useChangeProfile from '@hooks/useChangeProfile';
import { useModalStore } from '@store/useModalStore';

interface EditAddressModalProps {
	userData: IUserInfo;
}

const EditAddressModal = ({ userData }: EditAddressModalProps) => {
	const closeModal = useModalStore((state) => state.closeModal);
	const openModal = useModalStore((state) => state.openModal);

	const { mutate: changeProfile, isPending } = useChangeProfile();

	const handleSave = (formData: IEditAddressRequestData) => {
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
			title="Edit Address"
			firstButtonText="Cancel"
			secondButtonText={isPending ? 'Saving...' : 'Save'}
			formId="editAddressForm"
			closeOnOverlayClick={false}
			isPending={isPending}
		>
			<EditAddressForm
				onSubmit={handleSave}
				isPending={isPending}
				defaultValues={{
					label: userData.label || null,
					shippingAddress: userData.shippingAddress ?? '',
				}}
			/>
		</FormModal>
	);
};

export default EditAddressModal;
