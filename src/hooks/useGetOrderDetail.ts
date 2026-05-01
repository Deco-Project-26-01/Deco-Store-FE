import type {
	IOrderDetailFailureResponse,
	IOrderDetailSuccessResponse,
} from '#types/order';
import useCustomAxios from '@hooks/useCustomAxios';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError, type AxiosInstance } from 'axios';

const fetchOrderDetail = async (orderId: string, instance: AxiosInstance) => {
	try {
		const response = await instance.get<IOrderDetailSuccessResponse>(
			`/orders/${orderId}`,
		);
		return response.data;
	} catch (error) {
		if (isAxiosError<IOrderDetailFailureResponse>(error)) {
			if (error.response?.status === 401) {
				throw new Error('Unauthorized. Please log in and try again.');
			} else if (error.response?.status === 404) {
				throw new Error('Order not found. Please check and try again.');
			}
		}

		throw new Error('Failed to fetch order details. Please try again.');
	}
};

const useGetOrderDetail = (orderId: string) => {
	const axios = useCustomAxios();

	return useQuery({
		queryKey: ['orderDetail', orderId],
		queryFn: () => fetchOrderDetail(orderId, axios),
	});
};

export default useGetOrderDetail;
