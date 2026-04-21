import iconCheckWhite from '@assets/icons/icon-check-white.svg';
import iconEmptyCart from '@assets/icons/icon-empty-cart-base500.svg';
import TextButton from '@components/Button/TextButton';
import QuantityInput from '@components/Input/QuantityInput';
import TextLink from '@components/Link/TextLink';
import AlertModal from '@components/Modal/AlertModal';
import ConfirmModal from '@components/Modal/ConfirmModal';
import useChangeCart from '@hooks/useChangeCart';
import useGetCart from '@hooks/useGetCart';
import { useModalStore } from '@store/useModalStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
	const openModal = useModalStore((state) => state.openModal);
	const { data, isLoading, error } = useGetCart();
	const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(
		new Set(),
	);
	const [isInitialized, setIsInitialized] = useState(false);
	const [quantity, setQuantity] = useState<Record<number, number>>({});

	const cartItems = data?.data.items;
	const navigate = useNavigate();

	// 처음 장바구니 진입 시 자동으로 모두 선택
	useEffect(() => {
		if (!isInitialized && cartItems && cartItems.length > 0) {
			setSelectedItemIds(new Set(cartItems.map((item) => item.productId)));
			setQuantity(
				cartItems.reduce(
					(acc, item) => {
						acc[item.productId] = item.quantity;
						return acc;
					},
					{} as Record<number, number>,
				),
			);
			setIsInitialized(true);
		}
	}, [cartItems, isInitialized]);

	const { mutate: changeCart, isPending } = useChangeCart();
	const handleSave = ({
		productId,
		quantity,
	}: {
		productId: number;
		quantity: number;
	}) => {
		changeCart(
			{ productId, quantity },
			{
				onError: (error) => {
					openModal(
						<AlertModal
							title="Error"
							description={
								error instanceof Error
									? error.message
									: 'An unknown error occurred.'
							}
							buttonText="OK"
						/>,
					);
				},
			},
		);
	};

	const handleDelete = ({
		productId,
		quantity,
	}: {
		productId: number;
		quantity: number;
	}) => {
		openModal(
			<ConfirmModal
				title="Remove Item(s)"
				description="Are you sure you want to delete this item?"
				firstButtonText="Cancel"
				secondButtonText="Remove"
				onConfirm={() => handleSave({ productId, quantity })}
			/>,
		);
	};

	const toggleSelectItem = (productId: number) => {
		setSelectedItemIds((prev) => {
			const next = new Set(prev);

			if (next.has(productId)) {
				next.delete(productId);
			} else {
				next.add(productId);
			}

			return next;
		});
	};

	const getDisplayQuantity = (item: { productId: number; quantity: number }) =>
		quantity[item.productId] ?? item.quantity;

	const handleIncrease = (item: { productId: number; quantity: number }) => {
		const current = quantity[item.productId] ?? item.quantity;
		setQuantity((prev) => ({
			...prev,
			[item.productId]: current + 1,
		}));
	};

	const handleDecrease = (item: { productId: number; quantity: number }) => {
		const current = quantity[item.productId] ?? item.quantity;
		if (current <= 1) return;

		setQuantity((prev) => ({
			...prev,
			[item.productId]: current - 1,
		}));
	};

	const handlePlaceOrder = () => {
		if (!cartItems) return;

		const selectedCartItems = cartItems.filter((item) =>
			selectedItemIds.has(item.productId),
		);

		if (selectedCartItems.length === 0) return;

		const selectedOrderItems = selectedCartItems.map((item) => ({
			productId: item.productId,
			productName: item.productName,
			quantity: getDisplayQuantity(item),
			unitPrice: item.unitPrice,
			totalPrice: item.unitPrice * getDisplayQuantity(item),
		}));

		navigate('/checkout/cart', {
			state: {
				orderItems: selectedOrderItems,
			},
		});
	};

	return (
		<>
			<title>Cart</title>
			<section className="py-2xl">
				<h2 className="text-titleXlarge text-primaryDark">Cart</h2>
				{/* 로딩 중 */}
				{isLoading && <p>Loading...</p>}
				{/* 에러 발생 */}
				{error && (
					<div className="py-4xl flex flex-col gap-3xl items-center">
						{/* 에러 아이콘 변경 필요 */}
						<img
							src={iconEmptyCart}
							alt="Empty Cart"
							className="w-[15rem] h-[15rem]"
						/>
						<p className="text-titleLarge">Something went wrong</p>
						<p className="text-bodyBase">{error.message}</p>
						<TextLink to="/" variant="dark" size="small">
							Back to Home
						</TextLink>
					</div>
				)}
				{/* 장바구니가 비어 있을 때 */}
				{!isLoading && !error && cartItems && cartItems.length === 0 && (
					<div className="py-4xl flex flex-col gap-3xl items-center">
						<img
							src={iconEmptyCart}
							alt="Empty Cart"
							className="w-[15rem] h-[15rem]"
						/>
						<p className="text-titleLarge">Your Cart is Empty</p>
						<p className="text-bodyBase">
							Add items to your cart to get started.
						</p>
						<TextLink to="/" variant="dark" size="small">
							Continue Shopping
						</TextLink>
					</div>
				)}
				{/* 장바구니에 아이템이 있을 때 */}
				{!isLoading && !error && cartItems && cartItems.length > 0 && (
					<div className="mt-lg">
						<div className="mb-2xl flex flex-col gap-lg">
							<p className="text-titleMedium text-base700">
								Total{' '}
								<span className="text-primaryDark">{cartItems.length}</span>{' '}
								items ({' '}
								<span className="text-primaryDark">{selectedItemIds.size}</span>{' '}
								selected )
							</p>

							<div>
								<table className="table-fixed w-full text-center">
									<colgroup>
										<col className="w-[88px]" />
										<col />
										<col className="w-[164px]" />
										<col className="w-[184px]" />
										<col className="w-[134px]" />
									</colgroup>
									<thead className="text-titleBase bg-base100 border-solid border-0 border-y border-base500">
										<tr>
											<th className="pl-lg pr-3xl py-sm" scope="col">
												<span className="sr-only">Select</span>
											</th>
											<th className="px-2xl py-sm" scope="col">
												Product
											</th>
											<th className="px-2xl py-sm" scope="col">
												Quantity
											</th>
											<th className="px-2xl py-sm" scope="col">
												Price
											</th>
											<th className="pl-2xl pr-lg py-sm" scope="col">
												<span className="sr-only">Remove</span>
											</th>
										</tr>
									</thead>

									<tbody>
										{cartItems.map((item) => (
											<tr
												key={item.productId}
												className="border-solid border-0 border-y border-base500"
											>
												{/* Checkbox */}
												<td className="pl-lg pr-3xl py-xl align-middle">
													<label
														htmlFor={`select-${item.productId}`}
														className="inline-flex items-center gap-md"
													>
														<input
															type="checkbox"
															id={`select-${item.productId}`}
															className="peer sr-only"
															checked={selectedItemIds.has(item.productId)}
															onChange={() => toggleSelectItem(item.productId)}
														/>
														<span
															className={`
																flex justify-center items-center
																w-lg h-lg
																rounded-xs
																cursor-pointer
																border border-solid box-border border-base500
																peer-checked:bg-primaryDark peer-checked:border-none
															`}
															aria-hidden="true"
														>
															<img
																src={iconCheckWhite}
																alt=""
																className="w-[10px]"
															/>
														</span>
													</label>
												</td>
												{/* Products */}
												<td className="px-2xl py-xl align-middle">
													<p className="text-titleMedium">{item.productName}</p>
												</td>
												{/* Quantity */}
												<td className="px-2xl py-xl align-middle">
													<div className="flex flex-col justify-center items-center gap-lg">
														<QuantityInput
															value={getDisplayQuantity(item)}
															min={1}
															onDecrease={() => handleDecrease(item)}
															onIncrease={() => handleIncrease(item)}
														/>
														<TextButton
															variant="light"
															size="fullSmall"
															onClick={() =>
																handleSave({
																	productId: item.productId,
																	quantity: getDisplayQuantity(item),
																})
															}
															disabled={
																getDisplayQuantity(item) === item.quantity ||
																isPending
															}
														>
															Save
														</TextButton>
													</div>
												</td>
												{/* Price */}
												<td className="px-2xl py-xl align-middle">
													<p className="text-titleMedium text-primaryDark">
														$ {item.unitPrice * item.quantity}.00
													</p>
												</td>
												{/* Remove Button */}
												<td className="pl-2xl pr-lg py-xl align-middle">
													<TextButton
														variant="light"
														size="small"
														onClick={() =>
															handleDelete({
																productId: item.productId,
																quantity: 0,
															})
														}
													>
														Remove
													</TextButton>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
						<div className="flex justify-end">
							<TextButton
								variant="dark"
								size="medium"
								disabled={selectedItemIds.size === 0}
								onClick={handlePlaceOrder}
							>
								Place an order
							</TextButton>
						</div>
					</div>
				)}
			</section>
		</>
	);
};

export default Cart;
