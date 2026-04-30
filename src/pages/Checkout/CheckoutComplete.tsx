import TextButton from '@components/Button/TextButton';
import useGetOrderDetail from '@hooks/useGetOrderDetail';
import { useNavigate, useParams } from 'react-router-dom';

const CheckoutComplete = () => {
	const { orderId } = useParams<{ orderId: string }>();
	const navigate = useNavigate();

	if (!orderId) {
		navigate('/mypage/order');
		return null;
	}

	const { data: orderDetailData, error } = useGetOrderDetail(orderId);

	return (
		<>
			<title>Order Complete</title>
			<section>
				{error && (
					<p className="text-titleMedium text-red500 mb-lg">
						Failed to load order details. Please try again later.
					</p>
				)}

				{orderDetailData && (
					<>
						<h1 className="text-titleXlarge text-primaryDark mb-2xl">
							Your order placed successfully!
						</h1>
						<p className="text-titleMedium text-base700 mb-lg">
							Order No. {orderDetailData.data.orderNumber}
						</p>
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
												key={item.productId}
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
						<div className="flex gap-2xl items-center justify-end">
							<TextButton
								variant="light"
								size="medium"
								onClick={() => navigate('/')}
							>
								Continue Shopping
							</TextButton>
							<TextButton
								variant="dark"
								size="medium"
								onClick={() => navigate(`/mypage/order/${orderId}`)}
							>
								Order Details
							</TextButton>
						</div>
					</>
				)}
			</section>
		</>
	);
};

export default CheckoutComplete;
