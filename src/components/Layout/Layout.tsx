import type { IRouteHandle } from '#types/router';
import BreadCrumb from '@components/BreadCrumb/BreadCrumb';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';

import { Outlet, useLocation, useMatches } from 'react-router-dom';

const Layout = () => {
	const { pathname } = useLocation();
	const matches = useMatches();

	// breadcrumb 목록 생성
	const breadCrumbs = matches
		.filter((match) => match.handle)
		.map((match) => ({
			path: match.pathname,
			...(match.handle as IRouteHandle),
		}));

	return (
		<div className="flex min-w-max min-h-screen flex-col">
			<Header type={pathname.startsWith('checkout') ? 'checkout' : 'default'} />
			<main className="grow">
				<div className="full-inner px-3xl py-2xl">
					{pathname !== '/' && !pathname.startsWith('checkout') && (
						<BreadCrumb variant="primary" items={breadCrumbs} />
					)}
					<Outlet />
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
