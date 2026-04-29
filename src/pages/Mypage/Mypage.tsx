import iconOrderBase900 from '@assets/icons/icon-order-base900.svg';
import iconSupportBase900 from '@assets/icons/icon-support-base900.svg';
import iconUserBase900 from '@assets/icons/icon-user-base900.svg';
import TextButton from '@components/Button/TextButton';
import MypageMenuLink from '@components/Link/MypageMenuLink';
import ConfirmModal from '@components/Modal/ConfirmModal';
import useGetUserInfo from '@hooks/useGetUserInfo';
import useLogout from '@hooks/useLogout';
import { useModalStore } from '@store/useModalStore';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
	const { mutate: logout } = useLogout();
	const openModal = useModalStore((state) => state.openModal);
	const navigate = useNavigate();
	const { data, isLoading, error } = useGetUserInfo();
	const userData = data?.data;

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Failed to load user info.</p>;
	}

	if (!userData) {
		return <p>No user info found.</p>;
	}

	const handleLogout = () => {
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
				closeOnOverlayClick={false}
			/>,
		);
	};

	return (
		<>
			<title>My Page</title>
			<section className="py-2xl">
				<h1 className="sr-only">My Page</h1>
				<div className="mb-4xl flex gap-lg items-center justify-between">
					<h2 className="text-titleXlarge text-primaryDark">
						Hello,{' '}
						{data.data.userType === 'PERSONAL'
							? `${userData.firstName} ${userData.lastName}`
							: `${userData.companyName}`}
					</h2>
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
