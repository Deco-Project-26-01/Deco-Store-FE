import type {
	IOrderCreatedFailureResponse,
	IOrderCreatedSuccessResponse,
} from '#types/order';
import useCustomAxios from '@hooks/useCustomAxios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError, type AxiosInstance } from 'axios';

const cancelOrder = async (orderId: string, instance: AxiosInstance) => {
	try {
		const response = await instance.patch<IOrderCreatedSuccessResponse>(
			`/orders/${orderId}/cancel`,
		);
		return response.data;
	} catch (error) {
		if (isAxiosError<IOrderCreatedFailureResponse>(error)) {
			if (error.response?.status === 401) {
				throw new Error('Unauthorized. Please login and try again.');
			} else if (error.response?.status === 404) {
				throw new Error('Invalid order status. Cannot cancel this order.');
			}
		}

		throw new Error('Failed to cancel order. Please try again.');
	}
};

const useCancelOrder = () => {
	const axios = useCustomAxios();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (orderId: string) => cancelOrder(orderId, axios),
		onSuccess: (_, orderId) => {
			queryClient.invalidateQueries({
				queryKey: ['orders'],
			});

			queryClient.invalidateQueries({
				queryKey: ['orderDetail', orderId],
			});
		},
	});
};

export default useCancelOrder;
