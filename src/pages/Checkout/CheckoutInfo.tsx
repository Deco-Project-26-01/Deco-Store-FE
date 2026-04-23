import type { OrderPageState } from '#types/order';
import { Navigate, useLocation } from 'react-router-dom';

const CheckoutInfo = () => {
	const location = useLocation();

	const state = location.state as OrderPageState | null;
	const orderItems = state?.orderItems;

	if (!orderItems?.length) {
		return <Navigate to="/checkout/cart" replace />;
	}

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
