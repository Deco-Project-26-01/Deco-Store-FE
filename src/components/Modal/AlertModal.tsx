import TextButton from '@components/Button/TextButton';
import Modal from '@components/Modal/Modal';
import { useModalStore } from '@store/useModalStore';

interface IAlertModalProps {
	title: string;
	description: string;
	buttonText: string;
	onConfirm?: () => void;
}

const AlertModal = ({
	title,
	description,
	buttonText,
	onConfirm,
}: IAlertModalProps) => {
	const closeModal = useModalStore((state) => state.closeModal);

	return (
		<Modal onClose={closeModal}>
			<div className="pt-2xl pb-4xl px-2xl text-center">
				<h3 className="text-titleLarge text-primaryDark mb-2xl">{title}</h3>
				<p className="text-bodyBase text-black whitespace-pre-line">
					{description}
				</p>
			</div>
			<div>
				<TextButton
					variant="dark"
					size="fullMedium"
					rect={true}
					onClick={() => {
						if (onConfirm) onConfirm();
						closeModal();
					}}
				>
					{buttonText}
				</TextButton>
			</div>
		</Modal>
	);
};

export default AlertModal;
