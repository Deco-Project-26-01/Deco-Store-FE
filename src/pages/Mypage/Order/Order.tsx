import { useParams } from 'react-router-dom';

const Order = () => {
	const params = useParams();
	console.log(params._id);

	return (
		<>
			<title>My Page | Order</title>
			<h2>Order</h2>
		</>
	);
};

export default Order;
