import type { IGuardState } from '#types/router';
import LoginForm from '@components/Form/LoginForm';
import TextLink from '@components/Link/TextLink';
import AlertModal from '@components/Modal/AlertModal';
import { useModalStore } from '@store/useModalStore';
import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const openModal = useModalStore((state) => state.openModal);

	const state: IGuardState | null = location.state;
	const reason = state?.reason ?? searchParams.get('reason');

	useEffect(() => {
		if (reason === 'auth' && state?.from) {
			openModal(
				<AlertModal
					title="Authentication Required"
					description="You need to log in to access this page."
					buttonText="Login"
				/>,
			);

			navigate(location.pathname, {
				replace: true,
				state: { from: state.from },
			});
			return;
		}

		if (reason === 'session-expired') {
			openModal(
				<AlertModal
					title="Session Expired"
					description="Your session has expired. Please log in again."
					buttonText="OK"
				/>,
			);

			navigate(location.pathname, {
				replace: true,
			});
		}
	}, [reason, state?.from, openModal, navigate, location.pathname]);

	return (
		<>
			<title>Login</title>
			<section className="w-[60rem] py-4xl mx-auto my-auto">
				<h2 className="mb-2xl text-center text-title2Xlarge text-primaryDark">
					Login
				</h2>
				<div className="p-md">
					<LoginForm />
					<div className="mt-xl px-md py-xs flex items-center justify-center gap-md">
						<p className="text-titleBase text-black">Don't have an account?</p>
						<TextLink to="/register" variant="text" size="small">
							Register
						</TextLink>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
