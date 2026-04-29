import type {
	ILogoutFailureResponse,
	ILogoutSuccessResponse,
} from '#types/auth';
import useCustomAxios from '@hooks/useCustomAxios';
import { useUserInfoStore } from '@store/useUserInfoStore';
import { useUserStore } from '@store/useUserStore';
import { useMutation } from '@tanstack/react-query';
import type { AxiosInstance } from 'axios';
import { isAxiosError } from 'axios';

const logout = async (instance: AxiosInstance) => {
	try {
		const response =
			await instance.post<ILogoutSuccessResponse>('/auth/logout');
		return response.data;
	} catch (error) {
		if (isAxiosError<ILogoutFailureResponse>(error)) {
			if (error.response?.status === 400) {
				throw new Error('Invalid token. Please try again.');
			} else if (error.response?.status === 401) {
				throw new Error('Unauthorized. Please try again.');
			}
		}

		throw new Error('Failed to logout. Please try again.');
	}
};

const useLogout = () => {
	const axios = useCustomAxios();
	const clearTokens = useUserStore((state) => state.clearTokens);
	const clearUserInfo = useUserInfoStore((state) => state.clearUserInfo);

	return useMutation({
		mutationFn: () => logout(axios),
		onError: (error) => {
			console.error('Logout failed:', error);
		},
		onSettled: () => {
			clearTokens();
			clearUserInfo();
		},
	});
};

export default useLogout;
