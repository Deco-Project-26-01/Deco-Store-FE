import type { OrderPageState } from '#types/order';
import IconTextButton from '@components/Button/IconTextButton';
import TextButton from '@components/Button/TextButton';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import iconBookWhite from '@assets/icons/icon-book-white.svg';
import InputLabel from '@components/Label/InputLabel';
import DefaultInput from '@components/Input/DefaultInput';
import CountryDropdown from '@components/Input/CountryDropdown';
import { Controller, useForm } from 'react-hook-form';
import type { INewAddressFormData } from '#types/userinfo';

const CheckoutInfo = () => {
	const location = useLocation();
	const navigate = useNavigate();

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

	const { control } = useForm<INewAddressFormData>({
		mode: 'onChange',
		defaultValues: {
			addressLabel: '',
			recipientName: '',
			nation: '',
			phone: '',
			address: '',
		},
	});

	return (
		<>
			<title>New Order</title>
			<section>
				<div className="mb-4xl">
					<h2 className="text-titleXlarge text-primaryDark mb-2xl">
						Shipping Information
					</h2>
					<div className="flex gap-lg justify-between items-center mb-2xl">
						<IconTextButton
							variant="dark"
							size="medium"
							iconPath={iconBookWhite}
							onClick={() => {}}
						>
							Select from saved information
						</IconTextButton>
						<span className="block text-right text-bodyXsmall text-primaryDark font-bold">
							<b className="text-alert">*</b> Required fields
						</span>
					</div>
					<form>
						<div className="flex gap-4xl justify-between items-center mb-lg">
							<div className="w-full flex flex-col gap-sm">
								<InputLabel htmlFor="addressLabel">Label</InputLabel>
								<DefaultInput
									id="addressLabel"
									placeholder="e.g. Home, Work, Parents' house"
									onClearIconClick={() => {}}
								/>
							</div>
							<div className="w-full flex flex-col gap-sm">
								<InputLabel htmlFor="recipientName" isRequired>
									Name
								</InputLabel>
								<DefaultInput
									id="recipientName"
									placeholder="Please enter the recipient's name"
									onClearIconClick={() => {}}
								/>
							</div>
						</div>
						<div className="flex gap-4xl justify-between items-center">
							<div className="w-full flex flex-col gap-sm">
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
									</div>

									<DefaultInput
										id="phoneNumber"
										type="text"
										placeholder="Enter your phone number"
										onClearIconClick={() => {}}
									/>
								</div>
							</div>
							<div className="w-full flex flex-col gap-sm">
								<InputLabel htmlFor="address" isRequired>
									Address
								</InputLabel>
								<DefaultInput
									id="address"
									placeholder="Please enter the recipient's address"
									onClearIconClick={() => {}}
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
						<TextButton variant="dark" size="medium" onClick={() => {}}>
							Continue
						</TextButton>
					</div>
				</div>
			</section>
		</>
	);
};

export default CheckoutInfo;
