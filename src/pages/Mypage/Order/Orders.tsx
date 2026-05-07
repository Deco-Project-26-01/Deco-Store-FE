import TextButton from '@components/Button/TextButton';
import ConfirmModal from '@components/Modal/ConfirmModal';
import useCancelOrder from '@hooks/useCancelOrder';
import useGetOrders from '@hooks/useGetOrders';
import { useModalStore } from '@store/useModalStore';
import { Link, useSearchParams } from 'react-router-dom';

const statusList = [
	{ label: 'All', value: '', to: '/mypage/order' },
	{ label: 'Pending', value: 'PENDING', to: '/mypage/order?status=PENDING' },
	{
		label: 'Preparing',
		value: 'PREPARING',
		to: '/mypage/order?status=PREPARING',
	},
	{ label: 'Shipped', value: 'SHIPPED', to: '/mypage/order?status=SHIPPED' },
	{
		label: 'In Transit',
		value: 'IN_TRANSIT',
		to: '/mypage/order?status=IN_TRANSIT',
	},
	{
		label: 'Delivered',
		value: 'DELIVERED',
		to: '/mypage/order?status=DELIVERED',
	},
	{
		label: 'Cancelled',
		value: 'CANCELLED',
		to: '/mypage/order?status=CANCELLED',
	},
];

const Orders = () => {
	const [searchParams] = useSearchParams();
	const currentStatus = searchParams.get('status') ?? '';

	const pageParam = Number(searchParams.get('page'));

	const pageNum = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 0;
	const params = new URLSearchParams(searchParams);
	params.delete('page');

	const { data, isLoading, isError, error } = useGetOrders(
		pageNum,
		params.toString(),
	);
	const orders = data?.orders ?? [];
	const openModal = useModalStore((state) => state.openModal);
	const closeModal = useModalStore((state) => state.closeModal);

	const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();

	return (
		<>
			<title>My Page | Orders</title>
			{isLoading && <div>Loading...</div>}

			{isError && <div>{error.message}</div>}
			{!isLoading && !isError && (
				<div>
					<h2 className="text-titleXlarge text-primaryDark mb-2xl">Orders</h2>
					<p className="text-titleMedium text-base700 mb-lg">
						<b className="text-primaryDark">{orders.length}</b> orders
					</p>
					<div className="mb-lg p-xs rounded-xs bg-base100 w-fit flex items-center">
						{statusList.map((option) => {
							const isActive = currentStatus === option.value;

							return (
								<Link
									key={option.value || 'all'}
									to={option.to}
									className={`
									w-[12rem] py-sm flex items-center justify-center text-titleBase
									${isActive ? 'bg-white text-primaryDark' : 'text-base700'}
								`}
								>
									{option.label}
								</Link>
							);
						})}
					</div>
					<div>
						<table className="table-fixed w-full text-center">
							<colgroup>
								<col className="w-[284px]" />
								<col className="w-[176px]" />
								<col className="w-[266px]" />
								<col className="w-[156px]" />
								<col className="w-[156px]" />
								<col className="w-[148px]" />
							</colgroup>
							<thead className="text-titleBase bg-base100 border-solid border-0 border-y border-base500">
								<tr>
									<th className="pl-lg pr-sm py-sm" scope="col">
										Order No.
									</th>
									<th className="px-sm py-sm" scope="col">
										Date
									</th>
									<th className="px-sm py-sm" scope="col">
										Order
									</th>
									<th className="px-sm py-sm" scope="col">
										Total Price
									</th>
									<th className="px-sm py-sm" scope="col">
										Status
									</th>
									<th className="pl-sm pr-lg py-sm" scope="col">
										<span className="sr-only">Edit</span>
									</th>
								</tr>
							</thead>

							<tbody>
								{orders.length > 0 ? (
									orders.map((order) => (
										<tr
											key={order.id}
											className="border-solid border-0 border-y border-base500"
										>
											{/* Order No. */}
											<td className="pl-lg pr-sm py-lg align-middle">
												<Link
													to={`/mypage/order/${order.id}`}
													className="text-bodyBase hover:underline hover:font-semibold"
												>
													{order.orderNumber}
												</Link>
											</td>
											{/* Date */}
											<td className="px-sm py-lg align-middle">
												<p className="text-bodyBase">
													{order.orderedAt.split('T')[0]}
												</p>
											</td>
											{/* Order */}
											<td className="px-sm py-lg align-middle">
												<div className="flex flex-col items-center gap-sm">
													{order.items.map((item) => (
														<p
															key={item.orderProductId}
															className="text-bodyBase"
														>
															{item.productName} x {item.quantity}
														</p>
													))}
												</div>
											</td>
											{/* Total Price */}
											<td className="px-sm py-lg align-middle">
												<p className="text-bodyBase font-semibold text-primaryDark">
													$ {order.orderPrice}.00
												</p>
											</td>
											{/* Status */}
											<td className="px-sm py-lg align-middle">
												<p className="text-bodyBase font-semibold text-primaryDark">
													{order.status}
												</p>
											</td>
											{/* Edit */}
											<td className="pl-sm pr-lg py-lg align-middle">
												{order.status === 'PENDING' && (
													<TextButton
														variant="dark"
														size="fullSmall"
														disabled={isCancelling}
														onClick={() => {
															openModal(
																<ConfirmModal
																	title="Cancel order"
																	description="Are you sure you want to cancel this order?"
																	firstButtonText="No"
																	secondButtonText="Yes"
																	onConfirm={() => {
																		cancelOrder(String(order.id), {
																			onSuccess: () => {
																				closeModal();
																			},
																		});
																	}}
																/>,
															);
														}}
													>
														Cancel order
													</TextButton>
												)}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={6}
											className="py-[12rem] border-solid border-0 border-y border-base500 "
										>
											<p className="text-bodyBase text-center">
												No orders found.
											</p>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	);
};

export default Orders;
