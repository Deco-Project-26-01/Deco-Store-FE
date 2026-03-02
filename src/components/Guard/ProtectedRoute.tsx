import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '@store/useUserStore';

// TODO: 추후 모달을 추가하여 UX 개선 (로그인 페이지로 이동)
const ProtectedRoute = () => {
	const { pathname } = useLocation();
	const { accessToken, isLoggingOut } = useUserStore((state) => state);
	const hasHydrated = useUserStore.persist.hasHydrated();

	if (!hasHydrated) return null;

	if (isLoggingOut) return <Navigate to="/" replace />;

	if (!accessToken) {
		return (
			<Navigate
				to="/login"
				replace
				state={{
					from: pathname,
					message: 'You need to log in to access this page.',
				}}
			/>
		);
	}

	return <Outlet />;
};

export default ProtectedRoute;
