import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
	accessToken: string | null;
	refreshToken: string | null;
}

interface UserActions {
	setTokens: (accessToken: string, refreshToken: string) => void;
	clearTokens: () => void;
}

export const useUserStore = create(
	persist<UserState & UserActions>(
		(set) => ({
			accessToken: null,
			refreshToken: null,
			setTokens: (accessToken, refreshToken) =>
				set({ accessToken, refreshToken }),
			clearTokens: () => set({ accessToken: null, refreshToken: null }),
		}),
		{
			name: 'user',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
