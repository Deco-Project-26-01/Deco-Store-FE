import type { ICartFailureResponse, ICartSuccessResponse } from '#types/order';
import useCustomAxios from '@hooks/useCustomAxios';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError, type AxiosInstance } from 'axios';

const fetchCart = async (instance: AxiosInstance) => {
	try {
		const response = await instance.get<ICartSuccessResponse>('/carts');
		return response.data;
	} catch (error) {
		if (isAxiosError<ICartFailureResponse>(error)) {
			if (error.response?.status === 404) {
				throw new Error('Cart not found or is empty.');
			}
		}
		throw new Error('Failed to fetch cart data. Please try again.');
	}
};

const useGetCart = () => {
	const axios = useCustomAxios();

	return useQuery({
		queryKey: ['cart'],
		queryFn: () => fetchCart(axios),
	});
};

export default useGetCart;
