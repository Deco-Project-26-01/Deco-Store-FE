import type {
	IProductDetailSuccessResponse,
	IProductDetailFailureResponse,
} from '#types/products';
import useCustomAxios from '@hooks/useCustomAxios';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError, type AxiosInstance } from 'axios';

const fetchProductDetail = async (id: number, instance: AxiosInstance) => {
	try {
		const response = await instance.get<IProductDetailSuccessResponse>(
			`/products/${id}`,
		);
		return response.data;
	} catch (error) {
		if (isAxiosError<IProductDetailFailureResponse>(error)) {
			if (error.response?.status === 401) {
				throw new Error('Unauthorized. Please login again.');
			} else if (error.response?.status === 403) {
				throw new Error('Forbidden. You do not have access to this product.');
			} else if (error.response?.status === 404) {
				throw new Error('Product not found. It may have been removed.');
			}
		}

		throw new Error('Failed to fetch product detail. Please try again.');
	}
};

const useGetProductDetail = (id: number, enabled = true) => {
	const axios = useCustomAxios();

	return useQuery({
		queryKey: ['product', id],
		queryFn: () => fetchProductDetail(id, axios),
		enabled,
	});
};

export default useGetProductDetail;
