import type { IRefreshTokenResponse } from '#types/auth';
import { useUserStore } from '@store/useUserStore';
import axios, {
	AxiosError,
	type AxiosInstance,
	type InternalAxiosRequestConfig,
} from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;
const REFRESH_TOKEN_URL = '/auth/refresh';

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const redirectToLogin = () => {
	if (window.location.pathname !== '/login') {
		window.location.replace('/login?reason=session-expired');
	}
};

const useCustomAxios = () => {
	const { accessToken, refreshToken, setTokens, clearTokens } = useUserStore(
		(state) => state,
	);

	// 사설 인스턴스 (인증 필요한 요청용)
	const instance = axios.create({
		baseURL: API_URL,
		headers: { 'Content-Type': 'application/json' },
	});

	// 토큰 사용 요청 interceptor
	instance.interceptors.request.use((config) => {
		if (accessToken && refreshToken) {
			const token =
				config.url === REFRESH_TOKEN_URL ? refreshToken : accessToken;

			config.headers = config.headers ?? {};
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});

	// 토큰 사용 응답 interceptor
	instance.interceptors.response.use(
		(response) => response,
		async (error: AxiosError) => {
			const { config, response } = error;

			if (!config || !response || response.status !== 401) {
				return Promise.reject(error);
			}

			// 무한 루프 방지
			const originalConfig = config as RetryConfig;

			if (originalConfig.url === '/auth/logout') {
				clearTokens();
				redirectToLogin();
				return Promise.reject(error);
			}

			// ⚠️ TODO: refresh token 만료 시 로그아웃 처리
			if (originalConfig.url === REFRESH_TOKEN_URL) {
				clearTokens();
				redirectToLogin();
				return Promise.reject(error);
			}

			if (originalConfig._retry) {
				clearTokens();
				redirectToLogin();
				return Promise.reject(error);
			}
			originalConfig._retry = true;

			const newTokens = await getAccessToken(instance);
			if (!newTokens) return Promise.reject(error);

			const { newAccessToken, newRefreshToken } = newTokens;
			setTokens(newAccessToken, newRefreshToken);

			originalConfig.headers = originalConfig.headers ?? {};
			originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;

			return instance(originalConfig);
		},
	);

	return instance;
};

export default useCustomAxios;

const getAccessToken = async (
	instance: AxiosInstance,
): Promise<{ newAccessToken: string; newRefreshToken: string } | null> => {
	try {
		const { data } =
			await instance.get<IRefreshTokenResponse>(REFRESH_TOKEN_URL);

		if (!data.success) return null;

		return {
			newAccessToken: data.data.accessToken,
			newRefreshToken: data.data.refreshToken,
		};
	} catch (err) {
		return null;
	}
};
