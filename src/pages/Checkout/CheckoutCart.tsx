import type { OrderPageState } from '#types/order';
import TextButton from '@components/Button/TextButton';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const CheckoutCart = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const state = location.state as OrderPageState | null;
	const orderItems = state?.orderItems;
	const returnTo = state?.returnTo;

	if (!orderItems?.length) {
		return <Navigate to={returnTo || '/cart'} replace />;
	}

	const totalPrice = orderItems.reduce(
		(total, item) => total + item.unitPrice * item.quantity,
		0,
	);

	return (
		<>
			<title>New Order</title>
			<section>
				<h1 className="sr-only">Checkout Cart</h1>
				<div className="mb-4xl">
					<h2 className="text-titleXlarge text-primaryDark mb-2xl">Orders</h2>
					<div>
						<p className="text-titleMedium text-base700 mb-lg">
							Total{' '}
							<span className="text-primaryDark">{orderItems.length}</span>{' '}
							{orderItems.length > 1 ? 'items' : 'item'}
						</p>

						<table className="table-fixed w-full text-center">
							<colgroup>
								<col />
								<col className="w-[292px]" />
								<col className="w-[232px]" />
							</colgroup>
							<thead className="text-titleBase bg-base100 border-solid border-0 border-y border-base500">
								<tr>
									<th className="pl-lg pr-[9.6rem] py-sm" scope="col">
										Product
									</th>
									<th className="px-[9.6rem] py-sm" scope="col">
										Quantity
									</th>
									<th className="pl-[9.6rem] pr-lg py-sm" scope="col">
										Price
									</th>
								</tr>
							</thead>

							<tbody>
								{orderItems.map((item) => (
									<tr
										key={item.productId}
										className="border-solid border-0 border-y border-base500"
									>
										{/* Products */}
										<td className="pl-lg pr-[9.6rem] py-xl align-middle">
											<p className="text-titleMedium">{item.productName}</p>
										</td>
										{/* Quantity */}
										<td className="px-[9.6rem] py-xl align-middle">
											<p className="text-titleMedium text-primaryDark">
												{item.quantity}
											</p>
										</td>
										{/* Price */}
										<td className="pl-[9.6rem] pr-lg py-xl align-middle">
											<p className="text-titleMedium text-primaryDark">
												$ {item.unitPrice * item.quantity}.00
											</p>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div>
					<h2 className="text-titleXlarge text-primaryDark mb-lg">Summary</h2>
					<div className="mb-2xl p-lg border-y border-solid border-x-0 border-base500">
						<div className="mb-lg pb-lg border-b border-solid border-t-0 border-x-0 border-base300">
							<div className="mb-lg flex gap-lg align-center justify-between">
								<p className="text-bodyLarge text-base500">Subtotal</p>
								<p className="w-[12rem] text-bodyLarge text-primaryDark font-normal text-center">
									$ {totalPrice}
									.00
								</p>
							</div>
							<div className="flex gap-lg align-center justify-between">
								<p className="text-bodyLarge text-base500">VAT(0%)</p>
								<p className="w-[12rem] text-bodyLarge text-primaryDark font-normal text-center">
									$ 0.00
								</p>
							</div>
						</div>
						<div className="flex gap-lg align-center justify-between">
							<p className="text-bodyLarge text-base500">Total Price</p>
							<p className="w-[12rem] text-bodyLarge text-primaryDark text-center">
								$ {totalPrice}
								.00
							</p>
						</div>
					</div>
					<div className="flex gap-lg justify-end">
						<TextButton
							variant="light"
							size="medium"
							onClick={() => navigate(returnTo || '/cart')}
						>
							Back
						</TextButton>
						<TextButton
							variant="dark"
							size="medium"
							onClick={() => {
								navigate('/checkout/info', {
									state: {
										orderItems,
										returnTo,
									},
								});
							}}
						>
							Continue
						</TextButton>
					</div>
				</div>
			</section>
		</>
	);
};

export default CheckoutCart;
