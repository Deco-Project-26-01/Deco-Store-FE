import { Outlet } from 'react-router-dom';

const OrderLayout = () => {
	return (
		<section className="py-2xl">
			<Outlet />
		</section>
	);
};

export default OrderLayout;
