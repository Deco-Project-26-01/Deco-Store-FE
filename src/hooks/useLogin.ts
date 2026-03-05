import {
	type ILoginSuccessResponse,
	type ILoginData,
	type ILoginFailureResponse,
} from '#types/auth';
import { useUserStore } from '@store/useUserStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const login = async (data: ILoginData) => {
	try {
		const response = await axios.post<ILoginSuccessResponse>(
			`${VITE_API_BASE_URL}/auth/login`,
			data,
		);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError<ILoginFailureResponse, any>(error)) {
			// 추후 서버에서 제공하는 에러 메시지로 전환
			if (error.response?.status === 401) {
				throw new Error('Please check your email and password and try again.');
			}
		}
		throw new Error('Failed to login. Please try again.');
	}
};

const useLogin = () => {
	const setTokens = useUserStore((state) => state.setTokens);

	return useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			setTokens(data.accessToken, data.refreshToken);
		},
	});
};

export default useLogin;
