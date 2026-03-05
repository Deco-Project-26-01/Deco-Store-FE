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

type PersistedUserState = Pick<UserState, 'accessToken' | 'refreshToken'>;

export const useUserStore = create<UserState & UserActions>()(
	persist(
		(set) => ({
			accessToken: null,
			refreshToken: null,
			setTokens: (accessToken, refreshToken) =>
				set({ accessToken, refreshToken }),
			clearTokens: () => set({ accessToken: null, refreshToken: null }),
		}),
		{
			name: 'user',
			storage: createJSONStorage<PersistedUserState>(() => sessionStorage),
			partialize: (state): PersistedUserState => ({
				accessToken: state.accessToken,
				refreshToken: state.refreshToken,
			}),
		},
	),
);
