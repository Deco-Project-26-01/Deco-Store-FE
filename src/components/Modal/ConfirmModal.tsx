import TextButton from '@components/Button/TextButton';
import Modal from '@components/Modal/Modal';
import { useModalStore } from '@store/useModalStore';

interface IConfirmModalProps {
	title: string;
	description: string;
	firstButtonText: string;
	secondButtonText: string;
	onConfirm?: () => void;
}

const ConfirmModal = ({
	title,
	description,
	firstButtonText,
	secondButtonText,
	onConfirm,
}: IConfirmModalProps) => {
	const closeModal = useModalStore((state) => state.closeModal);

	return (
		<Modal onClose={closeModal}>
			<div className="pt-2xl pb-4xl px-2xl text-center">
				<h3 className="text-titleLarge text-primaryDark mb-2xl">{title}</h3>
				<p className="text-bodyBase text-black">{description}</p>
			</div>
			<div className="flex">
				<TextButton
					variant="light"
					size="fullMedium"
					rect={true}
					onClick={() => {
						closeModal();
					}}
				>
					{firstButtonText}
				</TextButton>
				<TextButton
					variant="dark"
					size="fullMedium"
					rect={true}
					onClick={() => {
						if (onConfirm) onConfirm();
						closeModal();
					}}
				>
					{secondButtonText}
				</TextButton>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
