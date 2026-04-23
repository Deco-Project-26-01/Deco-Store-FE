import type { OrderPageState } from '#types/order';
import { Navigate, useLocation } from 'react-router-dom';

const CheckoutInfo = () => {
	const location = useLocation();

	const state = location.state as OrderPageState | null;
	const orderItems = state?.orderItems;
	const prevPage = state?.from;

	if (!orderItems?.length) {
		return <Navigate to="/checkout/cart" replace />;
	}

	console.log(orderItems, prevPage);

	return (
		<>
			<title>New Order</title>
			<section>
				<h1>Billing Information</h1>
			</section>
		</>
	);
};

export default CheckoutInfo;
