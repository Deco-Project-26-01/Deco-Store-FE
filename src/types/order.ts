export interface IAddCartRequestData {
	productId: number;
	quantity: number;
}

export interface ICartResponse {
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

export interface ICartSuccessResponse extends ICartResponse {
	success: true;
	data: ICartData;
	error: null;
}

export interface ICartFailureResponse extends ICartResponse {
	success: false;
	data: null;
	error: {
		status: number;
		code: string;
	};
}

export type OrderItem = {
	productId: number;
	productName: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
};

export type OrderPageState = {
	orderItems: OrderItem[];
	from: string;
};
