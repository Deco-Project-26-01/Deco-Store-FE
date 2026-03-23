import type {
	IProductListFailureResponse,
	IProductListSuccessResponse,
} from '#types/products';
import useCustomAxios from '@hooks/useCustomAxios';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError, type AxiosInstance } from 'axios';

const fetchProducts = async (
	pageNum: number,
	params: string,
	instance: AxiosInstance,
) => {
	try {
		const response = await instance.get<IProductListSuccessResponse>(
			`/products?size=${import.meta.env.VITE_PRODUCTS_PER_PAGE}${pageNum > 0 ? `&page=${pageNum}` : ''}${params ? `&${params}` : ''}`,
		);
		return response.data;
	} catch (error) {
		if (isAxiosError<IProductListFailureResponse>(error)) {
			if (error.response?.status === 401) {
				throw new Error('Unauthorized. Please login again.');
			}
		}

		throw new Error('Failed to fetch products. Please try again.');
	}
};

const useGetProducts = (pageNum: number = 0, params: string = '') => {
	const axios = useCustomAxios();

	return useQuery({
		queryKey: ['products', { pageNum, params }],
		queryFn: () => fetchProducts(pageNum, params, axios),
		select: (response) => ({
			products: response.data.content,
			pageInfo: {
				currentPage: response.data.currentPage,
				totalPages: response.data.totalPages,
				hasNext: response.data.hasNext,
				hasPrevious: response.data.hasPrevious,
			},
		}),
	});
};

export default useGetProducts;
