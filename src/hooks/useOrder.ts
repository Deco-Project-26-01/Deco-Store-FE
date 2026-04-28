import {
	type IOrderCreatedSuccessResponse,
	type INewOrderRequestData,
	type IOrderCreatedFailureResponse,
} from '#types/order';
import useCustomAxios from '@hooks/useCustomAxios';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError, type AxiosInstance } from 'axios';

const createOrder = async (
	formData: INewOrderRequestData,
	instance: AxiosInstance,
) => {
	try {
		const response = await instance.post<IOrderCreatedSuccessResponse>(
			'/orders',
			formData,
		);

		return response.data;
	} catch (error) {
		if (isAxiosError<IOrderCreatedFailureResponse>(error)) {
			console.log(error.response?.data);
			if (error.response?.status === 400) {
				throw new Error(
					'Invalid order data. Please check your input and try again.',
				);
			} else if (error.response?.status === 401) {
				throw new Error('Unauthorized. Please login again.');
			} else if (error.response?.status === 403) {
				throw new Error(
					'Forbidden. You do not have permission to perform this action.',
				);
			} else if (error.response?.status === 404) {
				throw new Error(
					'One or more products not found. Please check and try again.',
				);
			}
		}

		throw new Error('Failed to create order. Please try again.');
	}
};

const useOrder = () => {
	const axios = useCustomAxios();

	return useMutation({
		mutationFn: (formData: INewOrderRequestData) =>
			createOrder(formData, axios),
	});
};

export default useOrder;
