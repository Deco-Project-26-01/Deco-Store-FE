// 회원 정보 조회 응답의 타입
export interface IUserInfoResponse {
	success: boolean;
	message: string;
}

// 회원 정보 조회 성공 응답의 타입
export interface IUserInfoSuccessResponse extends IUserInfoResponse {
	success: true;
	data: {
		id: number;
		email: string;
		lastName: string;
		firstName: string;
		nation: string;
		phone: string;
		companyName: string;
		businessNumber: string;
		shippingAddress: string;
		userType: string;
		role: string;
		status: string;
		emailVerifiedAt: string;
		createdAt: string;
		updatedAt: string;
	};
	error: null;
}

// 회원 정보 조회 실패 응답의 타입
export interface IUserInfoFailureResponse extends IUserInfoResponse {
	success: false;
	data: null;
	error: {
		status: number;
		code: string;
	};
}

// 회원 정보 수정 요청의 데이터 타입
export interface IChangeProfileRequestData {
	lastName?: string | null;
	firstName?: string | null;
	companyName?: string | null;
	businessNumber?: string | null;
	nation?: string;
	phone?: string;
	shippingAddress?: string;
}
