import type {
	IChangeProfileRequestData,
	IEditAddressRequestData,
} from '#types/userinfo';
import EditAddressForm from '@components/Form/EditAddressForm';
import AlertModal from '@components/Modal/AlertModal';
import FormModal from '@components/Modal/FormModal';
import useChangeProfile from '@hooks/useChangeProfile';
import { useModalStore } from '@store/useModalStore';
import { useUserInfoStore } from '@store/useUserInfoStore';

interface IEditAddressModalProps {
	data: {
		label: string | null;
		shippingAddress: string;
	};
}

const EditAddressModal = ({ data }: IEditAddressModalProps) => {
	const userInfo = useUserInfoStore((state) => state.userInfo);

	const closeModal = useModalStore((state) => state.closeModal);
	const openModal = useModalStore((state) => state.openModal);

	const { mutate: changeProfile, isPending } = useChangeProfile();

	const handleSave = (formData: IEditAddressRequestData) => {
		if (!userInfo) return;

		const payload: IChangeProfileRequestData = {
			firstName: userInfo.firstName ?? null,
			lastName: userInfo.lastName ?? null,
			companyName: userInfo.companyName ?? null,
			businessNumber: userInfo.businessNumber ?? null,
			nation: userInfo.nation,
			phone: userInfo.phone,

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
					label: data.label || null,
					shippingAddress: data.shippingAddress,
				}}
			/>
		</FormModal>
	);
};

export default EditAddressModal;
