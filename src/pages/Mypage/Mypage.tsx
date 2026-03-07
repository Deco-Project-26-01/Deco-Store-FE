import iconOrderBase900 from '@assets/icons/icon-order-base900.svg';
import iconSupportBase900 from '@assets/icons/icon-support-base900.svg';
import iconUserBase900 from '@assets/icons/icon-user-base900.svg';
import MypageMenuLink from '@components/Link/MypageMenuLink';
import TextButton from '@components/Button/TextButton';
import useLogout from '@hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@store/useModalStore';
import ConfirmModal from '@components/Modal/ConfirmModal';

const Mypage = () => {
	const { mutate: logout } = useLogout();
	const openModal = useModalStore((state) => state.openModal);
	const navigate = useNavigate();

	const handleLogout = () => {
		// 모달 추가
		openModal(
			<ConfirmModal
				title="Logout"
				description="Do you really want to logout from the service?"
				firstButtonText="Cancel"
				secondButtonText="Logout"
				onConfirm={() => {
					navigate('/', { replace: true });
					logout();
				}}
			/>,
		);
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
