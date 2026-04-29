import type { IProductImage } from '#types/products';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { useRef, useState } from 'react';

import 'swiper/swiper.css';

const ImageSwiper = ({ images }: { images: IProductImage[] }) => {
	const swiperRef = useRef<SwiperType | null>(null);
	const thumbnailIndex = images.findIndex((img) => img.isThumbnail);
	const initialIndex = thumbnailIndex >= 0 ? thumbnailIndex : 0;

	const [activeIndex, setActiveIndex] = useState(initialIndex);
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);

	return (
		<div className="flex flex-col gap-xl">
			{/* 메인 이미지 */}
			<div className="relative w-[50rem]">
				<Swiper
					modules={[Navigation]}
					slidesPerView={1}
					initialSlide={initialIndex}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
						setIsBeginning(swiper.isBeginning);
						setIsEnd(swiper.isEnd);
					}}
					onSlideChange={(swiper) => {
						setActiveIndex(swiper.activeIndex);
						setIsBeginning(swiper.isBeginning);
						setIsEnd(swiper.isEnd);
					}}
					className="w-[50rem] h-[50rem]"
				>
					{images.map((image) => (
						<SwiperSlide key={image.id}>
							<div className="w-[50rem] h-[50rem] overflow-hidden rounded-sm bg-base200">
								<img
									src={image.imageUrl}
									alt={`Product Image ${image.id}`}
									className="w-full h-full object-contain"
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* 이전 버튼 */}
				<button
					type="button"
					onClick={() => swiperRef.current?.slidePrev()}
					disabled={isBeginning}
					className={`absolute left-md top-1/2 z-10 -translate-y-1/2 rounded-full px-md py-sm shadow transition ${
						isBeginning
							? 'bg-gray-200 cursor-not-allowed opacity-50'
							: 'bg-white/80 hover:bg-white'
					}`}
					aria-label="Previous Image"
				>
					‹
				</button>

				{/* 다음 버튼 */}
				<button
					type="button"
					onClick={() => swiperRef.current?.slideNext()}
					disabled={isEnd}
					className={`absolute right-md top-1/2 z-10 -translate-y-1/2 rounded-full px-md py-sm shadow transition ${
						isEnd
							? 'bg-gray-200 cursor-not-allowed opacity-50'
							: 'bg-white/80 hover:bg-white'
					}`}
					aria-label="Next Image"
				>
					›
				</button>
			</div>

			{/* 썸네일 목록 */}
			<div className="flex w-[50rem] justify-center gap-md overflow-x-auto">
				{images.map((image, index) => {
					const isActive = activeIndex === index;

					return (
						<button
							key={`${image.id}-thumb-${index}`}
							type="button"
							onClick={() => {
								swiperRef.current?.slideTo(index);
								setActiveIndex(index);
							}}
							className={`shrink-0 overflow-hidden rounded-xs border transition ${
								isActive
									? 'border-primaryDark'
									: 'border-base300 opacity-70 hover:opacity-100'
							}`}
							aria-label={`View image ${index + 1}`}
							aria-pressed={isActive}
						>
							<img
								src={image.imageUrl}
								alt=""
								className="h-24 w-24 object-cover"
								aria-hidden="true"
							/>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default ImageSwiper;
