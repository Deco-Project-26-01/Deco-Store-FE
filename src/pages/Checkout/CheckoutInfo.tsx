import type { INewOrderRequestData, OrderPageState } from '#types/order';
import type { INewAddressFormData } from '#types/userinfo';
import iconBookWhite from '@assets/icons/icon-book-white.svg';
import IconTextButton from '@components/Button/IconTextButton';
import TextButton from '@components/Button/TextButton';
import CountryDropdown from '@components/Input/CountryDropdown';
import DefaultInput from '@components/Input/DefaultInput';
import InputLabel from '@components/Label/InputLabel';
import AlertModal from '@components/Modal/AlertModal';
import useGetUserInfo from '@hooks/useGetUserInfo';
import useOrder from '@hooks/useOrder';
import { useModalStore } from '@store/useModalStore';
import getCountryCodeFromNation from '@utils/getCountryCodeFromNation';
import { Controller, useForm } from 'react-hook-form';
import { getCountryCallingCode } from 'react-phone-number-input';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const CheckoutInfo = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const openModal = useModalStore((state) => state.openModal);

	const state = location.state as OrderPageState | null;
	const orderItems = state?.orderItems;
	const returnTo = state?.returnTo;

	if (!orderItems?.length) {
		return <Navigate to="/checkout/cart" replace />;
	}

	const totalPrice = orderItems.reduce(
		(total, item) => total + item.unitPrice * item.quantity,
		0,
	);

	const {
		register,
		watch,
		setValue,
		formState: { errors },
		handleSubmit,
		reset,
		control,
	} = useForm<INewAddressFormData>({
		mode: 'onChange',
		defaultValues: {
			addressLabel: '',
			recipientName: '',
			nation: '',
			phone: '',
			address: '',
		},
	});

	const { refetch, isFetching } = useGetUserInfo(false);

	const handleSelectSavedAddress = async () => {
		const result = await refetch();

		if (result.isError) {
			openModal(
				<AlertModal
					title="Failed to load saved information"
					description="Could not load your saved shipping information. Please try again."
					buttonText="OK"
				/>,
			);
			return;
		}

		const userInfo = result.data;

		if (!userInfo) {
			openModal(
				<AlertModal
					title="Failed to load saved information"
					description="No user information was returned. Please try again."
					buttonText="OK"
				/>,
			);
			return;
		}

		const shippingAddress = userInfo.data.shippingAddress;

		if (!shippingAddress) {
			openModal(
				<AlertModal
					title="No saved address found"
					description={`You don't have any saved shipping address.\nPlease enter a new shipping address to proceed.`}
					buttonText="OK"
				/>,
			);
			return;
		}

		const phoneParts = (userInfo.data.phone || '').split('-');
		const phoneNumber =
			phoneParts.length > 1
				? phoneParts.slice(1).join('-')
				: userInfo.data.phone || '';

		reset({
			addressLabel: userInfo.data.label || '',
			recipientName:
				userInfo.data.firstName && userInfo.data.lastName
					? `${userInfo.data.firstName} ${userInfo.data.lastName}`
					: '',
			nation: getCountryCodeFromNation(userInfo.data.nation),
			phone: phoneNumber,
			address: shippingAddress,
		});
	};

	const { mutate: createOrder } = useOrder();

	const onSubmit = (data: INewAddressFormData) => {
		const callingCode = data.nation
			? `+${getCountryCallingCode(data.nation as any)}`
			: '';

		const formData: INewOrderRequestData = {
			label: data.addressLabel || null,
			recipientName: data.recipientName,
			recipientPhone: `${callingCode}-${data.phone}`,
			address: data.address,
			items: orderItems.map((item) => ({
				productId: Number(item.productId),
				quantity: Number(item.quantity),
			})),
		};

		createOrder(formData, {
			onSuccess: (data) => {
				const orderId = data.data.id;

				openModal(
					<AlertModal
						title="Order Created Successfully"
						description={`Your order has been created successfully.`}
						buttonText="OK"
						onConfirm={() => {
							navigate(`/checkout/complete/${orderId}`, { replace: true });
						}}
					/>,
				);
			},
			onError: (error) => {
				openModal(
					<AlertModal
						title="Order Creation Failed"
						description={
							error.message ||
							'An error occurred while creating your order. Please try again.'
						}
						buttonText="OK"
					/>,
				);
			},
		});
	};

	return (
		<>
			<title>New Order</title>
			<section>
				<div className="mb-4xl">
					<h2 className="text-titleXlarge text-primaryDark mb-2xl">
						Shipping Information
					</h2>
					<div className="flex gap-lg justify-between items-start mb-2xl">
						<IconTextButton
							variant="dark"
							size="medium"
							iconPath={iconBookWhite}
							onClick={handleSelectSavedAddress}
							disabled={isFetching}
						>
							Select from saved information
						</IconTextButton>
						<span className="block text-right text-bodyXsmall text-primaryDark font-bold">
							<b className="text-alert">*</b> Required fields
						</span>
					</div>
					<form id="shipping-form" onSubmit={handleSubmit(onSubmit)}>
						<div className="flex gap-4xl justify-between items-start mb-lg">
							<div className="min-w-[56rem] flex flex-col gap-sm">
								<InputLabel htmlFor="addressLabel">Label</InputLabel>
								<DefaultInput
									id="addressLabel"
									placeholder="e.g. Home, Work, Parents' house"
									{...register('addressLabel')}
									showClearIcon={!!watch('addressLabel')}
									onClearIconClick={() =>
										setValue('addressLabel', '', {
											shouldDirty: true,
											shouldValidate: true,
										})
									}
								/>
							</div>
							<div className="min-w-[56rem] flex flex-col gap-sm">
								<InputLabel htmlFor="recipientName" isRequired>
									Name
								</InputLabel>
								<DefaultInput
									id="recipientName"
									placeholder="Please enter the recipient's name"
									{...register('recipientName', {
										required: 'Recipient name is required',
									})}
									showClearIcon={!!watch('recipientName')}
									onClearIconClick={() =>
										setValue('recipientName', '', {
											shouldDirty: true,
											shouldValidate: true,
										})
									}
									error={errors.recipientName?.message}
								/>
							</div>
						</div>
						<div className="flex gap-4xl justify-between items-start">
							<div className="min-w-[56rem] flex flex-col gap-sm">
								<InputLabel htmlFor="phoneNumber" isRequired>
									Phone Number
								</InputLabel>

								<div className="flex items-start gap-lg">
									<div>
										<Controller
											name="nation"
											control={control}
											rules={{ required: 'Please select a country' }}
											render={({ field }) => (
												<CountryDropdown
													listHeight={15}
													value={field.value || undefined}
													onChange={(next) => {
														field.onChange(next ?? '');
													}}
												/>
											)}
										/>
										<p
											role="alert"
											className="mt-xs text-bodyXsmall text-alert"
										>
											{errors.nation?.message}
										</p>
									</div>

									<DefaultInput
										id="phoneNumber"
										type="text"
										placeholder="Enter your phone number"
										{...register('phone', {
											required: 'Phone number is required',
										})}
										showClearIcon={!!watch('phone')}
										onClearIconClick={() =>
											setValue('phone', '', {
												shouldDirty: true,
												shouldValidate: true,
											})
										}
										error={errors.phone?.message}
									/>
								</div>
							</div>
							<div className="min-w-[56rem] flex flex-col gap-sm">
								<InputLabel htmlFor="address" isRequired>
									Address
								</InputLabel>
								<DefaultInput
									id="address"
									placeholder="Please enter the recipient's address"
									{...register('address', {
										required: 'Address is required',
									})}
									showClearIcon={!!watch('address')}
									onClearIconClick={() =>
										setValue('address', '', {
											shouldDirty: true,
											shouldValidate: true,
										})
									}
									error={errors.address?.message}
								/>
							</div>
						</div>
					</form>
				</div>
				<div>
					<h2 className="text-titleXlarge text-primaryDark mb-lg">Summary</h2>
					<div className="mb-2xl p-lg border-y border-solid border-x-0 border-base500">
						<div className="mb-lg pb-lg border-b border-solid border-t-0 border-x-0 border-base300">
							<div className="mb-lg flex gap-lg align-center justify-between">
								<p className="text-bodyLarge text-base500">Subtotal</p>
								<p className="w-[12rem] text-bodyLarge text-primaryDark font-normal text-center">
									$ {totalPrice}.00
								</p>
							</div>
							<div className="flex gap-lg align-center justify-between mb-lg">
								<p className="text-bodyLarge text-base500">VAT(0%)</p>
								<p className="w-[12rem] text-bodyLarge text-primaryDark font-normal text-center">
									$ 0.00
								</p>
							</div>
							<div className="flex gap-lg align-center justify-between">
								<p className="text-bodyLarge text-base500">Shipping fee</p>
								<p className="w-[12rem] text-bodyLarge text-primaryDark font-normal text-center">
									$ 0.00
								</p>
							</div>
						</div>
						<div className="flex gap-lg align-center justify-between">
							<p className="text-bodyLarge text-base500">Total Price</p>
							<p className="w-[12rem] text-bodyLarge text-primaryDark text-center">
								$ {totalPrice}.00
							</p>
						</div>
					</div>
					<div className="flex gap-lg justify-end">
						<TextButton
							variant="light"
							size="medium"
							onClick={() =>
								navigate('/checkout/cart', {
									state: {
										orderItems,
										returnTo,
									},
								})
							}
						>
							Back
						</TextButton>
						<TextButton
							variant="dark"
							size="medium"
							type="submit"
							form="shipping-form"
						>
							Continue
						</TextButton>
					</div>
				</div>
			</section>
		</>
	);
};

export default CheckoutInfo;
