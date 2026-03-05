import iconOrderBase900 from '@assets/icons/icon-order-base900.svg';
import iconSupportBase900 from '@assets/icons/icon-support-base900.svg';
import iconUserBase900 from '@assets/icons/icon-user-base900.svg';
import MypageMenuLink from '@components/Link/MypageMenuLink';
import TextButton from '@components/Button/TextButton';
import useLogout from '@hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
	const { mutate: logout } = useLogout();
	const navigate = useNavigate();

	const handleLogout = () => {
		// 모달 추가
		console.log('User logged out');
		navigate('/', { replace: true });
		logout();
	};

	return (
		<>
			<title>My Page</title>
			<section className="py-2xl">
				<h1 className="sr-only">My Page</h1>
				<div className="mb-4xl flex gap-lg items-center justify-between">
					<h2 className="text-titleXlarge text-primaryDark">Hello, User!</h2>
					<TextButton variant="dark" size="small" onClick={handleLogout}>
						Logout
					</TextButton>
				</div>
				<div className="w-full px-4xl grid grid-cols-3 gap-2xl">
					<MypageMenuLink
						to="/mypage/account"
						imagePath={iconUserBase900}
						title="Account"
						description="Manage your account information."
					/>
					<MypageMenuLink
						to="/mypage/order"
						imagePath={iconOrderBase900}
						title="Orders"
						description="Manage your orders."
					/>
					<MypageMenuLink
						to="/mypage/support"
						imagePath={iconSupportBase900}
						title="Support"
						description="Contact us for personalized support."
					/>
				</div>
			</section>
		</>
	);
};

export default Mypage;
