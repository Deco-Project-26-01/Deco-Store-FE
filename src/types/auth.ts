// 이메일 인증 요청의 응답 타입
export interface IEmailVerificationResponse {
	success: boolean;
	message: string;
	data: null;
}

export interface IEmailVerificationFailureResponse extends IEmailVerificationResponse {
	success: false;
	error: {
		status: number;
		code: string;
	};
}

export interface IEmailVerificationSuccessResponse extends IEmailVerificationResponse {
	success: true;
	error: null;
}

// 이메일 인증 확인 요청의 응답 타입
export interface IEmailVerificationCheckResponse {
	success: boolean;
	message: string;
	data: null;
}

export interface IEmailVerificationCheckFailureResponse extends IEmailVerificationCheckResponse {
	success: false;
	error: {
		status: number;
		code: string;
	};
}

export interface IEmailVerificationCheckSuccessResponse extends IEmailVerificationCheckResponse {
	success: true;
	error: null;
}

// 로그인 요청의 데이터 타입
export interface ILoginData {
	email: string;
	password: string;
}

// 로그인 요청의 응답 타입
export interface ILoginSuccessResponse {
	grantType: 'Bearer';
	accessToken: string;
	refreshToken: string;
}

export interface ILoginFailureResponse {
	success: false;
	message: string;
	data: null;
	error: {
		status: number;
		code: string;
	};
}

// 회원가입 폼의 데이터 타입
export interface IRegisterFormData {
	email: string;
	emailVerification: string;
	isEmailVerified: boolean;
	password: string;
	passwordConfirm: string;
	firstName?: string;
	lastName?: string;
	companyName?: string;
	businessNumber?: string;
	nation: string;
	callingCode: string;
	phone: string;
	terms: boolean;
}

// 회원가입 요청의 데이터 타입
export interface IRegisterRequestData {
	email: string;
	password: string;
	firstName: string | null;
	lastName: string | null;
	companyName: string | null;
	businessNumber: string | null;
	nation: string;
	phone: string;
}

export interface IRegisterResponse {
	success: boolean;
	message: string;
	data: null;
}

export interface IRegisterFailureResponse {
	success: false;
	error: {
		status: number;
		code: string;
	};
}

export interface IRegisterSuccessResponse {
	success: true;
	error: null;
}

// refresh token 요청의 응답 타입
export interface IRefreshTokenResponse {
	success: boolean;
	message: string;
	data: {
		grantType: 'Bearer';
		accessToken: string;
		refreshToken: string;
	};
	error: null;
}

// 로그아웃 요청의 응답 타입
export interface ILogoutResponse {
	success: boolean;
	message: string;
	data: null;
}

export interface ILogoutFailureResponse extends ILogoutResponse {
	success: false;
	error: {
		status: number;
		code: string;
	};
}

export interface ILogoutSuccessResponse extends ILogoutResponse {
	success: true;
	error: null;
}
