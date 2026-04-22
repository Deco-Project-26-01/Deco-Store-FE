import type {
	ICartFailureResponse,
	IAddCartRequestData,
	ICartSuccessResponse,
} from '#types/order';
import useCustomAxios from '@hooks/useCustomAxios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError, type AxiosInstance } from 'axios';

const changeCart = async (
	productId: number,
	quantity: number,
	instance: AxiosInstance,
) => {
	try {
		const response = await instance.patch<ICartSuccessResponse>('/carts', {
			productId,
			quantity,
		});
		return response.data;
	} catch (error) {
		if (isAxiosError<ICartFailureResponse>(error)) {
			if (error.response?.status === 404) {
				throw new Error('Product not found. Please check and try again.');
			}
		}

		throw new Error('Failed to change cart. Please try again.');
	}
};

const useChangeCart = () => {
	const axios = useCustomAxios();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: IAddCartRequestData) =>
			changeCart(payload.productId, payload.quantity, axios),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] });
		},
	});
};

export default useChangeCart;
