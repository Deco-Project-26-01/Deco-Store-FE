import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '@store/useUserStore';

// TODO: 추후 모달을 추가하여 UX 개선 (로그인 페이지 대신 홈으로 이동)
const PublicRoute = () => {
	const accessToken = useUserStore((state) => state.accessToken);

	if (accessToken) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default PublicRoute;
