import IconTextButton from '@components/Button/IconTextButton';
import TextButton from '@components/Button/TextButton';
import ChangePasswordModal from '@components/Modal/ChangePasswordModal';
import ChangeProfileModal from '@components/Modal/ChangeProfileModal';
import useGetUserInfo from '@hooks/useGetUserInfo';
import { useModalStore } from '@store/useModalStore';
import { useUserInfoStore } from '@store/useUserInfoStore';
import { useEffect } from 'react';
import iconPlusWhite from '@assets/icons/icon-plus-white.svg';
import NewAddressModal from '@components/Modal/NewAddressModal';

const Account = () => {
	const openModal = useModalStore((state) => state.openModal);
	const { data } = useGetUserInfo();
	const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

	const userData = data.data;

	useEffect(() => {
		setUserInfo(userData);
	}, [userData, setUserInfo]);

	return (
		<>
			<title>My Page | Account</title>
			<section className="py-2xl">
				<h1 className="sr-only">Account</h1>
				{/* 프로필 */}
				<div className="mb-4xl">
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
						<TextButton
							variant="dark"
							size="small"
							onClick={() => {
								openModal(<ChangePasswordModal />);
							}}
						>
							Change Password
						</TextButton>
					</div>
				</div>
				{/* 배송지 */}
				<div>
					<h2 className="text-titleXlarge text-primaryDark mb-2xl">Address</h2>
					<div>
						<table className="w-full text-center">
							<thead className="text-titleBase bg-base100 border-solid border-0 border-y border-base500 box-border">
								<tr className="flex items-center gap-lg">
									<th className="py-sm flex-1" scope="col">
										Label
									</th>

									<th className="py-sm flex-1" scope="col">
										Recipient
									</th>

									<th className="py-sm flex-1" scope="col">
										Phone
									</th>

									<th className="py-sm w-[32rem] shrink-0" scope="col">
										Address
									</th>

									<th className="py-sm w-[5.5rem] shrink-0" scope="col">
										<span className="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{userData.shippingAddress ? (
									<tr className="flex items-center gap-lg">
										<td>Home</td>
										<td>Elon Musk</td>
										<td>+1 512-555-0000</td>
										<td>1 Tesla Road, Austin, TX 78725, USA</td>
										<td>
											<button type="button">Edit</button>
										</td>
									</tr>
								) : (
									<tr>
										<td colSpan={5}>
											<div className="w-full p-3xl flex flex-col justify-center items-center gap-lg border-solid border-0 border-b border-base500 box-border">
												<span className="text-titleMedium">
													No shipping address yet.
												</span>
												<IconTextButton
													variant="dark"
													size="medium"
													iconPath={iconPlusWhite}
													onClick={() => {
														openModal(<NewAddressModal />);
													}}
												>
													Add address
												</IconTextButton>
											</div>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</>
	);
};

export default Account;
