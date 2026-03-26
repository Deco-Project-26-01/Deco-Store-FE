import type {
	IAddCartFailureResponse,
	IAddCartRequestData,
	IAddCartSuccessResponse,
} from '#types/order';
import useCustomAxios from '@hooks/useCustomAxios';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError, type AxiosInstance } from 'axios';

const addCart = async (
	productId: number,
	quantity: number,
	instance: AxiosInstance,
) => {
	try {
		const response = await instance.post<IAddCartSuccessResponse>('/carts', {
			productId,
			quantity,
		});
		return response.data;
	} catch (error) {
		if (isAxiosError<IAddCartFailureResponse>(error)) {
			if (error.response?.status === 400) {
				throw new Error(
					'Quantity must be at least 1. Please check and try again.',
				);
			} else if (error.response?.status === 404) {
				throw new Error('Product not found. Please check and try again.');
			}
		}

		throw new Error('Failed to add to cart. Please try again.');
	}
};

const useAddCart = () => {
	const axios = useCustomAxios();

	return useMutation({
		mutationFn: (payload: IAddCartRequestData) =>
			addCart(payload.productId, payload.quantity, axios),
	});
};

export default useAddCart;
