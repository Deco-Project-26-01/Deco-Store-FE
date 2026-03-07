import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '@store/useUserStore';

const PublicRoute = () => {
	const accessToken = useUserStore((state) => state.accessToken);
	const hasHydrated = useUserStore.persist.hasHydrated();
	const location = useLocation();
	if (!hasHydrated) return null;

	if (location.pathname === '/login' || location.pathname === '/register') {
		return <Outlet />;
	}

	// 이미 로그인 상태
	if (location.pathname === '/login' || location.pathname === '/register') {
		return <Outlet />;
	}

	if (accessToken) return <Navigate to="/" replace />;

	return <Outlet />;
};

export default PublicRoute;
