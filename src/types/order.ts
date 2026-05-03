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

export type OrderItem = Omit<ICartItem, 'cartProductId'>;

export type OrderPageState = {
	orderItems: OrderItem[];
	returnTo?: string;
};

export interface INewOrderRequestData {
	label: string | null;
	recipientName: string;
	recipientPhone: string;
	address: string;
	items: {
		productId: number;
		quantity: number;
	}[];
}

export interface IOrderCreatedResponse {
	success: boolean;
	message: string;
}

export interface IOrderCreatedSuccessResponse extends IOrderCreatedResponse {
	success: true;
	data: {
		id: number;
		userId: number;
		orderNumber: string;
		orderPrice: number;
		currencySnapshot: number;
		status: 'PENDING';
		address: string;
		label: string | null;
		recipientName: string;
		phone: string;
		trackingNumber: string | null;
		orderedAt: string;
		cancelledAt: string | null;
		items: {
			orderProductId: number;
			productId: number;
			productName: string;
			quantity: number;
			unitPrice: number;
			totalPrice: number;
		}[];
	};
	error: null;
}

export interface IOrderCreatedFailureResponse extends IOrderCreatedResponse {
	success: false;
	data: null;
	error: {
		status: number;
		code: string;
	};
}

export interface IOrderDetailResponse {
	success: boolean;
	message: string;
}

export interface IOrderDetailSuccessResponse extends IOrderDetailResponse {
	success: true;
	data: {
		id: number;
		userId: number;
		orderNumber: string;
		orderPrice: number;
		currencySnapshot: number;
		status:
			| 'PENDING'
			| 'PREPARING'
			| 'SHIPPED'
			| 'IN_TRANSIT'
			| 'DELIVERED'
			| 'CANCELLED'
			| 'REFUNDED';
		address: string;
		label: string | null;
		recipientName: string;
		phone: string;
		trackingNumber: string | null;
		orderedAt: string;
		cancelledAt: string | null;
		items: {
			orderProductId: number;
			productId: number;
			productName: string;
			quantity: number;
			unitPrice: number;
			totalPrice: number;
		}[];
	};
	error: null;
}

export interface IOrderDetailFailureResponse extends IOrderDetailResponse {
	success: false;
	data: null;
	error: {
		status: number;
		code: string;
	};
}

export interface IAddressFormData {
	addressLabel: string;
	recipientName: string;
	nation: string;
	phone: string;
	address: string;
}
