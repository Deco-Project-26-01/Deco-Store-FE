import type {
	IOrderListFailureResponse,
	IOrderListSuccessResponse,
} from '#types/order';
import useCustomAxios from '@hooks/useCustomAxios';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError, type AxiosInstance } from 'axios';

const fetchOrders = async (
	pageNum: number,
	params: string,
	instance: AxiosInstance,
) => {
	try {
		const response = await instance.get<IOrderListSuccessResponse>(
			`/orders?size=${import.meta.env.VITE_PRODUCTS_PER_PAGE}${pageNum > 0 ? `&page=${pageNum}` : ''}${params ? `&${params}` : ''}`,
		);
		return response.data;
	} catch (error) {
		if (isAxiosError<IOrderListFailureResponse>(error)) {
			if (error.response?.status === 401) {
				throw new Error('Unauthorized. Please login again.');
			}
		}

		throw new Error('Failed to fetch orders. Please try again.');
	}
};

const useGetOrders = (pageNum: number = 0, params: string = '') => {
	const axios = useCustomAxios();

	return useQuery({
		queryKey: ['orders', { pageNum, params }],
		queryFn: () => fetchOrders(pageNum, params, axios),
		select: (response) => ({
			orders: response.data.content,
			pageInfo: {
				currentPage: response.data.currentPage,
				totalPages: response.data.totalPages,
				hasNext: response.data.hasNext,
				hasPrevious: response.data.hasPrevious,
			},
		}),
	});
};

export default useGetOrders;
