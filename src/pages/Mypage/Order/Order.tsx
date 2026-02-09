import { useParams } from 'react-router-dom';

const Order = () => {
	const params = useParams();

	return (
		<>
			<title>My Page | Order</title>
			<h2>Order {params._id}</h2>
		</>
	);
};

export default Order;
