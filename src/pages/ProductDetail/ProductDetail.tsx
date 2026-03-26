import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '@store/useUserStore';
import ImageSwiper from '@components/Swiper/ImageSwiper';
import { useState } from 'react';
import TextButton from '@components/Button/TextButton';
import QuantityInput from '@components/Input/QuantityInput';
import useGetProductDetail from '@hooks/useGetProductDetail';
import ProductDetailSkeleton from '@components/Skeleton/ProductDetailSkeleton';
import useAddCart from '@hooks/useAddCart';
import { useModalStore } from '@store/useModalStore';
import AlertModal from '@components/Modal/AlertModal';

const ProductDetail = () => {
	const { id } = useParams();
	const productId = Number(id);
	const isValidProductId = Number.isInteger(productId) && productId > 0;

	const accessToken = useUserStore((state) => state.accessToken);
	const [quantity, setQuantity] = useState<number>(1);
	const {
		data: productDetail,
		isLoading,
		error,
	} = useGetProductDetail(productId, isValidProductId);

	const navigate = useNavigate();

	if (!isValidProductId) {
		return <div className="py-2xl">Invalid product ID.</div>;
	}

	const { mutate: addToCart, isPending: isAddingToCart } = useAddCart();
	const openModal = useModalStore((state) => state.openModal);

	const handleAddCart = (productId: number, quantity: number) => {
		addToCart(
			{ productId, quantity },
			{
				onSuccess: () => {
					openModal(
						<AlertModal
							title="Add to Cart"
							description="Product has been added to your cart."
							buttonText="Confirm"
							onConfirm={() => {
								navigate('/cart');
							}}
						/>,
					);
				},
				onError: (error) => {
					openModal(
						<AlertModal
							title="Failed to Add to Cart"
							description={error.message}
							buttonText="OK"
						/>,
					);
				},
			},
		);
	};

	return (
		<div className="py-2xl">
			<h1 className="sr-only">Product Detail</h1>
			<h2 className="sr-only">Product ID: {id}</h2>
			{/* 상품 상세 정보 영역 */}
			{isLoading ? (
				<ProductDetailSkeleton isAuthorized={!!accessToken} />
			) : error ? (
				<div>Error: {error.message}</div>
			) : productDetail ? (
				<section className="flex gap-3xl">
					{/* 상품 이미지 영역 */}
					<div className="shrink-0 w-[60rem] aspect-square">
						<ImageSwiper
							images={productDetail.data.images.map((image) => ({
								...image,
								imageUrl: `${import.meta.env.VITE_DECO_BACKEND_URL}${image.imageUrl}`,
							}))}
						/>
					</div>

					{/* 상품 정보 영역 */}
					<div className="w-full flex flex-col">
						<div className="grow flex flex-col gap-2xl">
							<h3 className="text-titleXlarge">{productDetail.data.name}</h3>
							<p className="text-bodyMedium text-base500">
								{productDetail.data.description}
							</p>

							<dl className="flex flex-col gap-2xl">
								<div className="flex items-center gap-2xl">
									<dt className="w-[12rem] font-bold text-bodyBase text-base500">
										Product ID
									</dt>
									<dd className="font-bold text-bodyBase text-base700">{id}</dd>
								</div>
								<div className="flex items-center gap-2xl">
									<dt className="w-[12rem] font-bold text-bodyBase text-base500">
										Availability
									</dt>
									<dd className="font-bold text-bodyBase text-base700">
										{productDetail.data.stock > 0 ? 'In Stock' : 'Out of Stock'}
									</dd>
								</div>
							</dl>

							<div className="flex items-center gap-2xl">
								<p className="grow font-bold text-bodyBase text-base500">
									Quantity
								</p>
								<QuantityInput
									value={quantity}
									min={1}
									max={10}
									onDecrease={() => setQuantity((prev) => prev - 1)}
									onIncrease={() => setQuantity((prev) => prev + 1)}
								/>
							</div>
							{/* 가격 영역 */}
							{accessToken && (
								<>
									<hr className="border border-base300" />
									<div className="flex items-center gap-2xl">
										<p className="grow font-bold text-bodyBase text-base500">
											Total Price
										</p>
										<p className="ml-auto font-bold text-bodyBase text-primaryDark">{`$ ${productDetail.data.price * quantity}.00`}</p>
									</div>
								</>
							)}
						</div>

						<div className="flex gap-lg">
							<TextButton
								variant="light"
								size="fullMedium"
								disabled={isAddingToCart || productDetail.data.stock === 0}
								onClick={() => {
									handleAddCart(productDetail.data.id, quantity);
								}}
							>
								Add to cart
							</TextButton>
							{accessToken && (
								<TextButton
									variant="dark"
									size="fullMedium"
									onClick={() => {
										// TODO: 주문 내역 전역상태 저장
										navigate('/checkout/cart');
									}}
								>
									Buy Now
								</TextButton>
							)}
						</div>
					</div>
				</section>
			) : (
				<div>Product not found.</div>
			)}
		</div>
	);
};

export default ProductDetail;
