import { Navigate, useLocation } from 'react-router-dom';

type OrderItem = {
	productId: number;
	productName: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
};

type OrderPageState = {
	orderItems: OrderItem[];
};

const CheckoutCart = () => {
	const location = useLocation();
	const orderItems = (location.state as OrderPageState | null)?.orderItems;

	if (!orderItems?.length) {
		return <Navigate to="/cart" replace />;
	}

	console.log(orderItems);

	return (
		<>
			<title>New Order</title>
			<section>
				<h1>Orders</h1>
			</section>
		</>
	);
};

export default CheckoutCart;
