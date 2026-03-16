import type { IChangePasswordRequestData } from '#types/userinfo';
import ChangePasswordForm from '@components/Form/ChangePasswordForm';
import AlertModal from '@components/Modal/AlertModal';
import FormModal from '@components/Modal/FormModal';
import useChangePassword from '@hooks/useChangePassword';
import { useModalStore } from '@store/useModalStore';

const ChangePasswordModal = () => {
	const closeModal = useModalStore((state) => state.closeModal);
	const openModal = useModalStore((state) => state.openModal);
	const { mutate: changePassword, isPending } = useChangePassword();

	const handleSave = (data: IChangePasswordRequestData) => {
		const formData: IChangePasswordRequestData = {
			currentPassword: data.currentPassword,
			newPassword: data.newPassword,
		};

		changePassword(formData, {
			onSuccess: () => {
				closeModal();
				openModal(
					<AlertModal
						title="Password Changed"
						description="Your password has been changed successfully."
						buttonText="OK"
					/>,
				);
			},
			onError: (error) => {
				openModal(
					<AlertModal
						title="Failed"
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
			title="Change Password"
			firstButtonText="Cancel"
			secondButtonText="Save"
			formId="changePasswordForm"
			closeOnOverlayClick={false}
			isPending={isPending}
		>
			<ChangePasswordForm onSubmit={handleSave} isPending={isPending} />
		</FormModal>
	);
};

export default ChangePasswordModal;
