import iconError from '@assets/icons/icon-error-base500.svg';
import TextButton from '@components/Button/TextButton';
import TextLink from '@components/Link/TextLink';
import ConfirmModal from '@components/Modal/ConfirmModal';
import OrderStatus from '@components/StatusBar/OrderStatus';
import useCancelOrder from '@hooks/useCancelOrder';
import useGetOrderDetail from '@hooks/useGetOrderDetail';
import { useModalStore } from '@store/useModalStore';
import { Navigate, useParams } from 'react-router-dom';

const Order = () => {
	const { orderId } = useParams<{ orderId: string }>();
	const openModal = useModalStore((state) => state.openModal);
	const closeModal = useModalStore((state) => state.closeModal);

	if (!orderId) {
		return <Navigate to="/mypage/order" replace />;
	}

	const { data: orderDetailData, error } = useGetOrderDetail(orderId);
	const { mutate: cancelOrder } = useCancelOrder();

	if (error) {
		return (
			<div className="py-4xl flex flex-col gap-3xl items-center">
				{/* 에러 아이콘 변경 필요 */}
				<img src={iconError} alt="Error" className="w-[15rem] h-[15rem]" />
				<p className="text-titleLarge">Something went wrong</p>
				<p className="text-bodyBase">{error.message}</p>
				<TextLink to="/" variant="dark" size="small">
					Back to Home
				</TextLink>
			</div>
		);
	}

	return (
		<>
			<title>My Page | Order</title>
			{orderDetailData && (
				<div>
					<h2 className="text-titleXlarge text-primaryDark mb-2xl">
						Order No. {orderDetailData.data.orderNumber}
					</h2>
					{/* Order Status Bar */}
					<div className="mb-2xl w-full">
						<OrderStatus status={orderDetailData.data.status} />
					</div>
					{/* Order Detail */}
					<div className="mb-2xl">
						<table className="table-fixed w-full text-center">
							<colgroup>
								<col />
								<col className="w-[232px]" />
							</colgroup>
							<thead className="text-titleBase bg-base100 border-solid border-0 border-y border-base500">
								<tr>
									<th className="pl-lg pr-[9.6rem] py-sm" scope="col">
										Order
									</th>
									<th className="pl-[9.6rem] pr-lg py-sm" scope="col">
										Price
									</th>
								</tr>
							</thead>
							<tbody>
								<>
									{orderDetailData.data.items.map((item) => (
										<tr
											key={item.orderProductId}
											className="border-solid border-0 border-y border-base500"
										>
											{/* Order */}
											<td className="pl-lg pr-[9.6rem] py-xl align-middle text-left">
												<div className="flex gap-3xl items-center">
													<p className="text-titleMedium w-[44rem]">
														{item.productName}
													</p>
													<span className="text-titleMedium font-normal text-base500">
														|
													</span>
													<p className="text-titleMedium text-base700">
														{item.quantity} {item.quantity > 1 ? 'pcs' : 'pc'}
													</p>
												</div>
											</td>

											{/* Price */}
											<td className="pl-[9.6rem] pr-lg py-xl align-middle">
												<p className="text-titleMedium text-primaryDark font-normal">
													$ {item.unitPrice * item.quantity}.00
												</p>
											</td>
										</tr>
									))}
									<tr className="border-solid border-0 border-y border-base500">
										<td className="pl-lg pr-[9.6rem] py-xl align-middle text-left">
											<p className="text-titleMedium">VAT(0%)</p>
										</td>
										<td className="pl-[9.6rem] pr-lg py-xl align-middle">
											<p className="text-titleMedium font-normal text-primaryDark">
												$ 0.00
											</p>
										</td>
									</tr>
									<tr className="border-solid border-0 border-y border-base500">
										<td className="pl-lg pr-[9.6rem] py-xl align-middle text-left">
											<div className="flex flex-col gap-md mb-lg">
												<p className="text-titleMedium">Shipping address</p>
												<p className="text-titleMedium font-normal text-base500">
													{orderDetailData.data.address}
												</p>
											</div>
											<p className="text-titleMedium">Shipping fee</p>
										</td>
										<td className="pl-[9.6rem] pr-lg py-xl align-bottom">
											<p className="text-titleMedium font-normal text-primaryDark">
												$ 0.00
											</p>
										</td>
									</tr>
									<tr className="border-solid border-0 border-y border-base500">
										<td className="pl-lg pr-[9.6rem] py-xl align-middle text-left">
											<p className="text-titleMedium">Total price</p>
										</td>
										<td className="pl-[9.6rem] pr-lg py-xl align-middle">
											<p className="text-titleMedium text-primaryDark">
												$ {orderDetailData.data.orderPrice}.00
											</p>
										</td>
									</tr>
								</>
							</tbody>
						</table>
					</div>
					{/* Button */}
					{orderDetailData.data.status === 'PENDING' && (
						<div className="flex gap-2xl justify-end">
							<TextButton
								variant="dark"
								size="medium"
								onClick={() => {
									openModal(
										<ConfirmModal
											title="Cancel order"
											description="Are you sure you want to cancel this order?"
											firstButtonText="No"
											secondButtonText="Yes"
											onConfirm={() => {
												cancelOrder(String(orderDetailData.data.id), {
													onSuccess: () => {
														closeModal();
													},
												});
											}}
										/>,
									);
								}}
							>
								Cancel Order
							</TextButton>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default Order;
