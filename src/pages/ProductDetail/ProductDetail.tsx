import { useParams } from 'react-router-dom';
import { useUserStore } from '@store/useUserStore';
import ImageSwiper from '@components/Swiper/ImageSwiper';
import { useState } from 'react';
import TextButton from '@components/Button/TextButton';
import QuantityInput from '@components/Input/QuantityInput';
import useGetProductDetail from '@hooks/useGetProductDetail';
import ProductDetailSkeleton from '@components/Skeleton/ProductDetailSkeleton';

const images = [
	{
		id: 2,
		imageUrl:
			'https://www.benbridge.com/dw/image/v2/ABAW_PRD/on/demandware.static/-/Library-Sites-BBJSharedLibrary/default/dwb5648ec2/category-pages/jewelry/2025/09/20250902-jewelry-LP-hero_1661x1864.jpg?sw=1440&sfrm=png&q=70',
		isThumbnail: false,
	},
	{
		id: 3,
		imageUrl:
			'https://simpleanddainty.com/cdn/shop/files/SignatureStarterJewelrySet_1400x.png?v=1726182421',
		isThumbnail: false,
	},
	{
		id: 4,
		imageUrl:
			'https://cdn.shopify.com/s/files/1/0764/4005/files/07-06-21-18_1_480x480.jpg?v=1630095231',
		isThumbnail: true,
	},
	{
		id: 5,
		imageUrl:
			'https://objects-prod.cdn.chopard.com/image/upload/t_navigation-card-portrait/q_auto,f_auto,dpr_auto/Navigation/all-collections-jewellery-4',
		isThumbnail: false,
	},
];

const ProductDetail = () => {
	const { id } = useParams();
	const accessToken = useUserStore((state) => state.accessToken);
	const [quantity, setQuantity] = useState<number>(1);
	const {
		data: productDetail,
		isLoading,
		error,
	} = useGetProductDetail(Number(id));

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
				<section className="flex gap-xl">
					{/* 상품 이미지 영역 */}
					<div className="shrink-0 w-[60rem] aspect-square">
						<ImageSwiper images={images} />
					</div>

					{/* 상품 정보 영역 */}
					<div className="w-full flex flex-col">
						<div className="grow flex flex-col gap-lg">
							<h3 className="text-titleXlarge">{`Product Title`}</h3>
							<p className="text-bodyMedium text-base500">{`Product Description`}</p>

							<dl className="flex flex-col gap-lg">
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
									<dd className="font-bold text-bodyBase text-base700">{`In Stock`}</dd>
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
										<p className="ml-auto font-bold text-bodyBase text-primaryDark">{`$ ${320 * quantity}.00`}</p>
									</div>
								</>
							)}
						</div>

						<div className="flex gap-lg">
							<TextButton variant="light" size="fullMedium" onClick={() => {}}>
								Add to cart
							</TextButton>
							{accessToken && (
								<TextButton variant="dark" size="fullMedium" onClick={() => {}}>
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
