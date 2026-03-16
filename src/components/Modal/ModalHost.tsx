import { useModalStore } from '@store/useModalStore';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ModalHost = () => {
	const location = useLocation();
	const closeModal = useModalStore((state) => state.closeModal);

	useEffect(() => {
		closeModal();
	}, [location.key, closeModal]);

	const node = useModalStore((state) => state.node);

	return <>{node}</>;
};

export default ModalHost;
