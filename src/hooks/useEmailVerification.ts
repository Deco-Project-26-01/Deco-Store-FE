import type {
	IEmailVerificationFailureResponse,
	IEmailVerificationSuccessResponse,
} from '#types/auth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const requestVerificationCode = async (email: string) => {
	try {
		const response = await axios.post<IEmailVerificationSuccessResponse>(
			`${VITE_API_BASE_URL}/auth/email/verification`,
			{ email },
		);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError<IEmailVerificationFailureResponse, any>(error)) {
			// 추후 서버에서 제공하는 에러 메시지로 전환
			if (error.response?.status === 409) {
				throw new Error('Email is already in use');
			} else if (error.response?.status === 429) {
				throw new Error('Too many requests. Please try again later.');
			}
		}

		throw new Error('Failed to send verification code. Please try again.');
	}
};

const useEmailVerification = () => {
	return useMutation<IEmailVerificationSuccessResponse, Error, string>({
		mutationFn: requestVerificationCode,
		onSuccess: (data) => {
			console.log('Verification code sent successfully:', data);
		},
	});
};

export default useEmailVerification;
