import { useLoaderData } from 'react-router-dom';

const CheckoutComplete = () => {
	const { orderId } = useLoaderData();

	return (
		<>
			<title>Order Complete</title>
			<section>
				<h1>Your order placed successfully!</h1>
				<p>Order Id : {orderId}</p>
			</section>
		</>
	);
};

export default CheckoutComplete;
