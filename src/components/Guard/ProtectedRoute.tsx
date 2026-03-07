import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '@store/useUserStore';
import type { IGuardState } from '#types/router';

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
