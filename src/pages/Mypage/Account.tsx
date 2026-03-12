import TextButton from '@components/Button/TextButton';
import ChangeProfileModal from '@components/Modal/ChangeProfileModal';
import useGetUserInfo from '@hooks/useGetUserInfo';
import { useModalStore } from '@store/useModalStore';
import { useUserInfoStore } from '@store/useUserInfoStore';
import { useEffect, useState } from 'react';

const Account = () => {
	const openModal = useModalStore((state) => state.openModal);
	const { data } = useGetUserInfo();
	const [selectedItems] = useState<string[]>([]);
	const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

	const userData = data.data;

	useEffect(() => {
		setUserInfo(userData);
	}, [userData, setUserInfo]);

	return (
		<>
			<title>My Page | Account</title>
			<section className="py-2xl">
				<h1 className="sr-only">My Page</h1>
				{/* 프로필 */}
				<div className="mb-2xl">
					<h2 className="text-titleXlarge text-primaryDark mb-2xl">Profile</h2>
					{/* 유저 정보 */}
					<div className="flex flex-col gap-lg mb-lg">
						<div className="flex gap-lg">
							<p className="w-[10rem] text-bodyBase text-base700">Name</p>
							<p className="text-bodyMedium">
								{userData.userType === 'PERSONAL'
									? `${userData.firstName} ${userData.lastName}`
									: `${userData.companyName}`}
							</p>
						</div>
						<div className="flex gap-lg">
							<p className="w-[10rem] text-bodyBase text-base700">E-mail</p>
							<p className="text-bodyMedium">{userData.email}</p>
						</div>
						<div className="flex gap-lg">
							<p className="w-[10rem] text-bodyBase text-base700">Phone</p>
							<p className="text-bodyMedium">{userData.phone}</p>
						</div>
						<div className="flex gap-lg">
							<p className="w-[10rem] text-bodyBase text-base700">Password</p>
							<p className="text-bodyMedium">●●●●●●●●●●●●●●</p>
						</div>
					</div>
					{/* 정보 수정 */}
					<div className="flex gap-lg justify-end">
						<TextButton
							variant="light"
							size="small"
							onClick={() => {
								openModal(<ChangeProfileModal />);
							}}
						>
							Change Profile
						</TextButton>
						<TextButton variant="dark" size="small" onClick={() => {}}>
							Change Password
						</TextButton>
					</div>
				</div>
				{/* 배송지 */}
				<div>
					<h2 className="text-titleXlarge text-primaryDark mb-2xl">Address</h2>
					<div className="flex justify-between items-center mb-xl">
						<p className="text-titleMedium text-base700">
							Total <span className="text-primaryDark">1</span> address (
							<span className="text-primaryDark">{selectedItems.length}</span>{' '}
							address
							{selectedItems.length > 1 ? 'es' : ''} selected)
						</p>
						<TextButton variant="light" size="small" onClick={() => {}}>
							Remove Selected
						</TextButton>
					</div>
				</div>
			</section>
		</>
	);
};

export default Account;
