import TextButton from '@components/Button/TextButton';
import Modal from '@components/Modal/Modal';
import { useModalStore } from '@store/useModalStore';

interface IFormModalProps {
	title: string;
	firstButtonText: string;
	secondButtonText: string;
	formId: string;
	closeOnOverlayClick?: boolean;
	isPending?: boolean;
	children: React.ReactNode;
}

const FormModal = ({
	title,
	firstButtonText,
	secondButtonText,
	formId,
	closeOnOverlayClick = true,
	isPending = false,
	children,
}: IFormModalProps) => {
	const closeModal = useModalStore((state) => state.closeModal);
	return (
		<Modal
			title={title}
			onClose={closeModal}
			closeOnOverlayClick={closeOnOverlayClick}
		>
			<div className="px-2xl pt-2xl pb-4xl">{children}</div>
			<div className="flex">
				<TextButton
					variant="light"
					size="fullMedium"
					rect={true}
					onClick={closeModal}
					disabled={isPending}
				>
					{firstButtonText}
				</TextButton>
				<TextButton
					type="submit"
					form={formId}
					variant="dark"
					size="fullMedium"
					rect={true}
					disabled={isPending}
				>
					{secondButtonText}
				</TextButton>
			</div>
		</Modal>
	);
};

export default FormModal;
