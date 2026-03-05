import { create } from 'zustand';

interface ModalState {
	node: React.ReactNode | null;
}

interface ModalActions {
	openModal: (node: React.ReactNode) => void;
	closeModal: () => void;
}

export const useModalStore = create<ModalState & ModalActions>((set) => ({
	node: null,
	openModal: (node) => set({ node }),
	closeModal: () => set({ node: null }),
}));
