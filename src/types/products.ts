export interface IProductImage {
	id: number;
	imageUrl: string;
	isThumbnail: boolean;
}

export interface IProductData {
	id: number;
	name: string;
	category: 'NECKLACE' | 'BRACELET';
	carat: number;
	price: number;
	stock: number;
	status: string; // 추후 수정
	description: string;
	images: IProductImage[];
	createdAt: string;
	updatedAt: string;
}

export interface IPageInfo {
	currentPage: number;
	totalPages: number;
	hasNext: boolean;
	hasPrevious: boolean;
}

interface IProductListData {
	content: IProductData[];
	currentPage: number;
	totalPages: number;
	totalElements: number;
	size: number;
	hasNext: boolean;
	hasPrevious: boolean;
}

export interface IProductListResponse {
	success: boolean;
	message: string;
}

export interface IProductListSuccessResponse extends IProductListResponse {
	success: true;
	data: IProductListData;
	error: null;
}

export interface IProductListFailureResponse extends IProductListResponse {
	success: false;
	data: null;
	error: {
		status: number;
		code: string;
	};
}

export interface IProductDetailResponse {
	success: boolean;
	message: string;
}

export interface IProductDetailSuccessResponse extends IProductDetailResponse {
	success: true;
	data: IProductData;
	error: null;
}

export interface IProductDetailFailureResponse extends IProductDetailResponse {
	success: false;
	data: null;
	error: {
		status: number;
		code: string;
	};
}
