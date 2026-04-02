import useGetCart from '@hooks/useGetCart';
import iconEmptyCart from '@assets/icons/icon-empty-cart-base500.svg';
import TextLink from '@components/Link/TextLink';
import { useState } from 'react';
import TextButton from '@components/Button/TextButton';

const Cart = () => {
	const { data, isLoading, error } = useGetCart();
	const [selectedItems] = useState<number[]>([]);

	const cartItems = data?.data.items;
	const totalQuantity = data?.data.totalQuantity ?? 0;
	const totalPrice = data?.data.totalPrice ?? 0;

	console.log(totalPrice);

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
								Total <span className="text-primaryDark">{totalQuantity}</span>{' '}
								items ({' '}
								<span className="text-primaryDark">{selectedItems.length}</span>{' '}
								selected )
							</p>

							<div>
								<table className="table-fixed w-full text-center">
									<colgroup>
										<col className="w-[3.6rem]" />
										<col className="w-[50%]" />
										<col className="w-[10rem]" />
										<col className="w-[12rem]" />
										<col className="w-[9.2rem]" />
									</colgroup>
									<thead className="text-titleBase bg-base100 border-solid border-0 border-y border-base500 box-border">
										<tr>
											<th className="py-sm pl-lg" scope="col">
												<span className="sr-only">Select</span>
											</th>
											<th className="py-sm" scope="col">
												Product
											</th>
											<th className="py-sm" scope="col">
												Quantity
											</th>
											<th className="py-sm" scope="col">
												Price
											</th>
											<th className="py-sm pr-lg" scope="col">
												<span className="sr-only">Remove</span>
											</th>
										</tr>
									</thead>

									<tbody></tbody>
								</table>
							</div>
						</div>
						<div className="flex justify-end">
							<TextButton variant="dark" size="medium">
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
