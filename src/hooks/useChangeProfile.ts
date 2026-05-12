import type {
	IChangeProfileRequestData,
	IUserInfoFailureResponse,
	IUserInfoSuccessResponse,
} from '#types/userinfo';
import useCustomAxios from '@hooks/useCustomAxios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError, type AxiosInstance } from 'axios';

const changeProfile = async (
	formData: Partial<IChangeProfileRequestData>,
	instance: AxiosInstance,
) => {
	try {
		const response = await instance.patch<IUserInfoSuccessResponse>(
			'/users/me',
			formData,
		);
		return response.data;
	} catch (error) {
		if (isAxiosError<IUserInfoFailureResponse>(error)) {
			if (error.response?.status === 401) {
				throw new Error('Unauthorized. Please log in again.');
			} else if (error.response?.status === 404) {
				throw new Error('User not found.');
			}
		}

		throw new Error('Failed to change profile. Please try again.');
	}
};

const useChangeProfile = () => {
	const axios = useCustomAxios();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (formData: Partial<IChangeProfileRequestData>) =>
			changeProfile(formData, axios),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['userInfo'] });
		},
	});
};

export default useChangeProfile;
