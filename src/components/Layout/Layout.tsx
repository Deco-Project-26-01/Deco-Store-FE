import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';

import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
	const { pathname } = useLocation();
	const isCheckoutPage = pathname.split('/')[1] === 'checkout';

	return (
		<div className="flex min-w-max min-h-screen flex-col">
			<Header type={isCheckoutPage ? 'checkout' : 'default'} />
			<main className="grow">
				<div className="full-inner">
					<Outlet />
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
