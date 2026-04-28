import { useNavigate, useParams } from 'react-router-dom';

const CheckoutComplete = () => {
	const { orderId } = useParams<{ orderId: string }>();
	const navigate = useNavigate();

	if (!orderId) {
		navigate('/mypage/order');
		return null;
	}

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
