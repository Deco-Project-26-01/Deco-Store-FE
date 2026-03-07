import type { IGuardState } from '#types/router';
import LoginForm from '@components/Form/LoginForm';
import TextLink from '@components/Link/TextLink';
import AlertModal from '@components/Modal/AlertModal';
import { useModalStore } from '@store/useModalStore';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const openModal = useModalStore((state) => state.openModal);
	const state: IGuardState | null = location.state;

	const from = state?.from ?? '/';

	useEffect(() => {
		if (state?.reason === 'auth' && state?.from) {
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
		}
	}, [state?.reason, state?.from, openModal, navigate, location.pathname]);

	return (
		<>
			<title>Login</title>
			<section className="w-[60rem] py-4xl mx-auto my-auto">
				<h2 className="mb-2xl text-center text-title2Xlarge text-primaryDark">
					Login
				</h2>
				{/* 로그인 폼 영역 */}
				<div className="p-md ">
					<LoginForm redirectTo={from} />
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
