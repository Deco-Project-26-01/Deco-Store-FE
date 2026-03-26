export interface IAddCartRequestData {
	productId: number;
	quantity: number;
}

export interface IAddCartResponse {
	success: boolean;
	message: string;
}

interface ICartItem {
	cartProductId: number;
	productId: number;
	productName: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
}

interface ICartData {
	cartId: number;
	status: boolean;
	totalQuantity: number;
	totalPrice: number;
	items: ICartItem[];
}

export interface IAddCartSuccessResponse extends IAddCartResponse {
	success: true;
	data: ICartData;
	error: null;
}

export interface IAddCartFailureResponse extends IAddCartResponse {
	success: false;
	data: null;
	error: {
		status: number;
		code: string;
	};
}
