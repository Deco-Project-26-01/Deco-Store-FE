import type { IGuardState } from '#types/router';
import LoginForm from '@components/Form/LoginForm';
import TextLink from '@components/Link/TextLink';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const state: IGuardState | null = location.state;

	useEffect(() => {
		if (state?.reason === 'auth' && state?.from) {
			alert('You need to log in to access this page.');
		}

		navigate(location.pathname, { replace: true, state: null });
	}, []);

	const redirectTo = state?.from ?? '/';

	return (
		<>
			<title>Login</title>
			<section className="w-[60rem] py-4xl mx-auto my-auto">
				<h2 className="mb-2xl text-center text-title2Xlarge text-primaryDark">
					Login
				</h2>
				{/* 로그인 폼 영역 */}
				<div className="p-md ">
					<LoginForm redirectTo={redirectTo} />
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
