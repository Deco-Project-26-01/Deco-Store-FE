import { Outlet } from 'react-router-dom';

const Layout = () => {
	const { pathname } = useLocation();
	const isCheckoutPage = pathname.split('/')[1] === 'checkout';

	return (
		<>
			<Outlet />
		</>
	);
};

export default Layout;
