import Header from '@components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
	const { pathname } = useLocation();
	const isCheckoutPage = pathname.split('/')[1] === 'checkout';

	return (
		<>
			<Header type={isCheckoutPage ? 'checkout' : 'default'} />
			<Outlet />
		</>
	);
};

export default Layout;
