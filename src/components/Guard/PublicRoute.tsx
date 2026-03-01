import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '@store/useUserStore';

type GuardState = {
	from?: string;
	message?: string;
};

// TODO: 추후 모달을 추가하여 UX 개선 (로그인 페이지 대신 홈으로 이동)
const PublicRoute = () => {
	const accessToken = useUserStore((state) => state.accessToken);
	const hasHydrated = useUserStore.persist.hasHydrated();
	const location = useLocation();
	const state = location.state as GuardState | null;

	if (!hasHydrated) return null;

	// 이미 로그인 상태
	if (accessToken) {
		// ProtectedRoute에서 넘어온 경우 원래 이동하려던 페이지로 이동
		if (
			(location.pathname === '/login' || location.pathname === '/register') &&
			state?.from
		) {
			return <Outlet />;
		}

		// 주소창으로 /login 들어온 경우 홈으로 보내기
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default PublicRoute;
