import type {
	IUserInfoFailureResponse,
	IUserInfoSuccessResponse,
} from '#types/userinfo';
import useCustomAxios from '@hooks/useCustomAxios';
import { useUserStore } from '@store/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError, type AxiosInstance } from 'axios';

const fetchUserInfo = async (instance: AxiosInstance) => {
	try {
		const response = await instance.get<IUserInfoSuccessResponse>('/users/me');
		return response.data;
	} catch (error) {
		if (isAxiosError<IUserInfoFailureResponse>(error)) {
			if (error.response?.status === 401) {
				throw new Error('Unauthorized. Please login again.');
			}
		}

		throw new Error('Failed to fetch user info. Please try again.');
	}
};

const useGetUserInfo = (enabled = true) => {
	const accessToken = useUserStore((state) => state.accessToken);
	const axios = useCustomAxios();

	return useQuery({
		queryKey: ['userInfo'],
		queryFn: () => fetchUserInfo(axios),
		enabled: !!accessToken && enabled,
		retry: false,
	});
};

export default useGetUserInfo;
