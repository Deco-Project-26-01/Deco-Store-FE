import type { IRouteHandle } from '#types/router';
import BreadCrumb from '@components/BreadCrumb/BreadCrumb';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import ProductsTab from '@components/Tab/ProductsTab';
import { useEffect } from 'react';
import { Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom';

const Layout = () => {
	const { pathname, state } = useLocation();
	const matches = useMatches();
	const navigate = useNavigate();

	useEffect(() => {
		// TODO: 모달 추가
		if (state?.message) {
			alert(state.message);

			navigate(pathname, { replace: true });
		}
	}, [state]);

	// breadcrumb 목록 생성
	const breadCrumbs = matches
		.filter((match) => match.handle)
		.map((match) => ({
			path: match.pathname,
			...(match.handle as IRouteHandle),
		}));

	return (
		<div className="flex min-w-max min-h-screen flex-col">
			<Header
				type={pathname.startsWith('/checkout') ? 'checkout' : 'default'}
			/>
			<main className="grow flex flex-col">
				{/* 상품 탭 */}
				{!pathname.startsWith('/cart') && !pathname.startsWith('/checkout') && (
					<ProductsTab />
				)}
				<div className="grow flex flex-col w-full full-inner px-3xl py-2xl">
					{/* 브레드크럼 */}
					{pathname !== '/' &&
						!pathname.startsWith('/checkout') &&
						!pathname.startsWith('/login') &&
						!pathname.startsWith('/register') && (
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
