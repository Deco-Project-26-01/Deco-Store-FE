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
	const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

	const { data, isLoading, error } = useGetUserInfo();
	const userData = data?.data;

	useEffect(() => {
		if (userData) {
			setUserInfo(userData);
		}
	}, [userData, setUserInfo]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Failed to load user info.</p>;
	}

	if (!userData) {
		return <p>No user info found.</p>;
	}

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
						<table className="table-fixed w-full text-center">
							<colgroup>
								<col className="w-[20%]" />
								<col className="w-[20%]" />
								<col className="w-[20%]" />
								<col className="w-[32rem]" />
								<col className="w-[5.5rem]" />
							</colgroup>
							<thead className="text-titleBase bg-base100 border-solid border-0 border-y border-base500 box-border">
								<tr>
									<th className="px-lg py-sm" scope="col">
										Label
									</th>

									<th className="px-lg py-sm" scope="col">
										Recipient
									</th>

									<th className="px-lg py-sm" scope="col">
										Phone
									</th>

									<th className="py-sm w-[32rem]" scope="col">
										Address
									</th>

									<th className="py-sm w-[5.5rem]" scope="col">
										<span className="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{userData.shippingAddress ? (
									<tr className="border-solid border-0 border-b border-base500">
										<td className="px-lg py-lg align-middle">Home</td>
										<td className="px-lg py-lg align-middle">Elon Musk</td>
										<td className="px-lg py-lg align-middle">
											+1 512-555-0000
										</td>
										<td className="px-lg py-lg text-left align-middle">
											1 Tesla Road, Austin, TX 78725, USA
										</td>
										<td className="px-lg py-lg align-middle">
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
