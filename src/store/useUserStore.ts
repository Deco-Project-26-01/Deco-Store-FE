import { create } from 'zustand';

interface UserState {
	accessToken: string | null;
	refreshToken: string | null;
}

interface UserActions {
	setTokens: (accessToken: string, refreshToken: string) => void;
	clearTokens: () => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
	accessToken: null,
	refreshToken: null,
	setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
	clearTokens: () => set({ accessToken: null, refreshToken: null }),
}));
