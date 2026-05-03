import type { IChangeProfileRequestData } from '#types/userinfo';
import ChangeProfileForm from '@components/Form/ChangeProfileForm';
import AlertModal from '@components/Modal/AlertModal';
import FormModal from '@components/Modal/FormModal';
import useChangeProfile from '@hooks/useChangeProfile';
import { useModalStore } from '@store/useModalStore';

const ChangeProfileModal = () => {
	const closeModal = useModalStore((state) => state.closeModal);
	const openModal = useModalStore((state) => state.openModal);
	const { mutate, isPending } = useChangeProfile();

	const handleSave = (formData: Partial<IChangeProfileRequestData>) => {
		mutate(formData, {
			onSuccess: () => {
				closeModal();
				openModal(
					<AlertModal
						title="Profile Updated"
						description="Your profile has been updated successfully."
						buttonText="OK"
					/>,
				);
			},
			onError: (error) => {
				openModal(
					<AlertModal
						title="Error"
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
			title="Change Profile"
			firstButtonText="Cancel"
			secondButtonText={isPending ? 'Saving...' : 'Save'}
			formId="changeProfileForm"
			closeOnOverlayClick={false}
			isPending={isPending}
		>
			<ChangeProfileForm onSubmit={handleSave} isPending={isPending} />
		</FormModal>
	);
};

export default ChangeProfileModal;
