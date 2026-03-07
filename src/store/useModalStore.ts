import type { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalState {
	node: ReactNode | null;
}

interface ModalActions {
	openModal: (node: ReactNode) => void;
	closeModal: () => void;
}

export const useModalStore = create<ModalState & ModalActions>((set) => ({
	node: null,
	openModal: (node) => set({ node }),
	closeModal: () => set({ node: null }),
}));
