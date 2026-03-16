import {
	type IChangePasswordSuccessResponse,
	type IChangePasswordFailureResponse,
	type IChangePasswordRequestData,
} from '#types/userinfo';
import useCustomAxios from '@hooks/useCustomAxios';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError, type AxiosInstance } from 'axios';

const changePassword = async (
	formData: IChangePasswordRequestData,
	instance: AxiosInstance,
) => {
	try {
		const response = await instance.patch<IChangePasswordSuccessResponse>(
			'/users/password',
			formData,
		);
		return response.data;
	} catch (error) {
		if (isAxiosError<IChangePasswordFailureResponse>(error)) {
			if (error.response?.status === 400) {
				throw new Error('Wrong current password. Please check and try again.');
			} else if (error.response?.status === 401) {
				throw new Error('Unauthorized. Please log in again.');
			}
		}

		throw new Error('Failed to change password. Please try again.');
	}
};

const useChangePassword = () => {
	const axios = useCustomAxios();

	return useMutation({
		mutationFn: (formData: IChangePasswordRequestData) =>
			changePassword(formData, axios),
	});
};

export default useChangePassword;
