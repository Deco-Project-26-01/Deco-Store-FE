import { useModalStore } from '@store/useModalStore';

const ModalHost = () => {
	const node = useModalStore((state) => state.node);

	return <>{node}</>;
};

export default ModalHost;
