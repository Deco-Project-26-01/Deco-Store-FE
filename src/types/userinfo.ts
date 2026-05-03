// 회원 정보 조회 응답의 타입
export interface IUserInfoResponse {
	success: boolean;
	message: string;
}

export interface IUserInfo {
	id: number;
	email: string;
	lastName: string | null;
	firstName: string | null;
	nation: string;
	phone: string;
	companyName: string | null;
	businessNumber: string | null;
	shippingAddress: string | null;
	userType: string;
	label: string | null;
	role: string;
	status: string;
	emailVerifiedAt: string;
	createdAt: string;
	updatedAt: string;
}

// 회원 정보 조회 성공 응답의 타입
export interface IUserInfoSuccessResponse extends IUserInfoResponse {
	success: true;
	data: IUserInfo;
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
	lastName: string | null;
	firstName: string | null;
	companyName: string | null;
	businessNumber: string | null;
	nation: string;
	phone: string;
	label: string | null;
	shippingAddress: string | null;
}

// 비밀번호 수정 요청의 데이터 타입
export interface IChangePasswordRequestData {
	currentPassword: string;
	newPassword: string;
}

// 비밀번호 수정 응답의 데이터 타입
export interface IChangePasswordResponse {
	success: boolean;
	message: string;
	data: null;
}

// 비밀번호 수정 성공 응답의 타입
export interface IChangePasswordSuccessResponse extends IChangePasswordResponse {
	success: true;
	error: null;
}

// 비밀번호 수정 실패 응답의 타입
export interface IChangePasswordFailureResponse extends IChangePasswordResponse {
	success: false;
	error: {
		status: number;
		code: string;
	};
}

// 배송지 정보 추가 폼의 데이터 타입
export interface INewAddressFormData {
	label: string;
	shippingAddress: string;
}

export interface IEditAddressFormData {
	label: string;
	shippingAddress: string;
}

// 배송지 정보 등록 요청의 데이터 타입
export interface INewAddressRequestData {
	label: string | null;
	shippingAddress: string;
}

// 배송지 정보 수정 요청의 데이터 타입
export interface IEditAddressRequestData {
	label: string | null;
	shippingAddress: string;
}
