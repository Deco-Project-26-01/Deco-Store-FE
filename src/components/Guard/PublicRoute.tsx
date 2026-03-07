import { useUserStore } from '@store/useUserStore';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
	const accessToken = useUserStore((state) => state.accessToken);
	const hasHydrated = useUserStore.persist.hasHydrated();

	if (!hasHydrated) return null;

	if (accessToken) return <Navigate to="/" replace />;

	return <Outlet />;
};

export default PublicRoute;
