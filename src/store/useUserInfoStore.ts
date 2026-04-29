import { create } from 'zustand';

interface IUserInfo {
	id: number;
	email: string;
	lastName: string | null;
	firstName: string | null;
	nation: string;
	phone: string;
	companyName: string | null;
	businessNumber: string | null;
	shippingAddress: string | null;
	userType: string;
	label: string | null;
	role: string;
	status: string;
	emailVerifiedAt: string;
	createdAt: string;
	updatedAt: string;
}

interface IUserInfoState {
	userInfo: IUserInfo | null;
}

interface IUserInfoActions {
	setUserInfo: (userInfo: IUserInfo) => void;
	clearUserInfo: () => void;
}

export const useUserInfoStore = create<IUserInfoState & IUserInfoActions>(
	(set) => ({
		userInfo: null,
		setUserInfo: (userInfo) => set({ userInfo }),
		clearUserInfo: () => set({ userInfo: null }),
	}),
);
