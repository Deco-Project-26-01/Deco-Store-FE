import type {
	IRegisterFailureResponse,
	IRegisterRequestData,
	IRegisterSuccessResponse,
} from '#types/auth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const register = async (formData: IRegisterRequestData) => {
	try {
		const response = await axios.post<IRegisterSuccessResponse>(
			`${VITE_API_BASE_URL}/auth/signup`,
			formData,
		);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError<IRegisterFailureResponse, any>(error)) {
			// 추후 서버에서 제공하는 에러 메시지로 전환
			if (error.response?.status === 409) {
				throw new Error('Email is already in use');
			}
		}
		throw new Error('Failed to register. Please try again.');
	}
};

const useRegister = () => {
	return useMutation({
		mutationFn: register,
		onSuccess: (data) => {
			console.log('Verification code sent successfully:', data);
		},
	});
};

export default useRegister;
