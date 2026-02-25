import type {
	IEmailVerificationCheckFailureResponse,
	IEmailVerificationCheckSuccessResponse,
} from '#types/auth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const verifyEmail = async ({
	email,
	code,
}: {
	email: string;
	code: string;
}) => {
	try {
		const response = await axios.post<IEmailVerificationCheckSuccessResponse>(
			`${VITE_API_BASE_URL}/auth/email/verify`,
			{
				email,
				code,
			},
		);
		return response.data;
	} catch (error) {
		if (
			axios.isAxiosError<IEmailVerificationCheckFailureResponse, any>(error)
		) {
			if (error.response?.status === 400) {
				throw new Error(
					'Invalid verification code. Please check and try again.',
				);
			}
		}

		throw new Error('Failed to verify email. Please try again.');
	}
};

const useEmailVerify = () => {
	return useMutation<
		IEmailVerificationCheckSuccessResponse,
		Error,
		{ email: string; code: string }
	>({
		mutationFn: verifyEmail,
		onSuccess: (data) => {
			console.log('Verification code sent successfully:', data);
		},
	});
};

export default useEmailVerify;
