import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '@store/useUserStore';
import type { IGuardState } from '#types/router';

// TODO: 추후 모달을 추가하여 UX 개선 (로그인 페이지로 이동)
const ProtectedRoute = () => {
	const location = useLocation();
	const { accessToken } = useUserStore((state) => state);
	const hasHydrated = useUserStore.persist.hasHydrated();

	if (!hasHydrated) return null;

	if (!accessToken) {
		return (
			<Navigate
				to="/login"
				replace
				state={{ from: location, reason: 'auth' } satisfies IGuardState}
			/>
		);
	}

	return <Outlet />;
};

export default ProtectedRoute;
