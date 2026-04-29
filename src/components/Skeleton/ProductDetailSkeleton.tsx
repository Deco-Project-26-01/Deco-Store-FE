interface ProductDetailSkeletonProps {
	isAuthorized: boolean;
}

const ProductDetailSkeleton = ({
	isAuthorized,
}: ProductDetailSkeletonProps) => {
	return (
		<section
			aria-label="Loading product details"
			aria-busy="true"
			className="flex gap-xl"
		>
			{/* 이미지 영역 */}
			<div className="shrink-0 w-[60rem] aspect-square">
				<div className="flex flex-col gap-xl">
					{/* 메인 이미지 */}
					<div className="w-[60rem] h-[60rem] rounded-sm bg-base200 animate-pulse" />

					{/* 썸네일 */}
					<div className="flex justify-center gap-md">
						{Array.from({ length: 5 }).map((_, i) => (
							<div
								key={i}
								className="h-24 w-24 rounded-md bg-base200 animate-pulse"
							/>
						))}
					</div>
				</div>
			</div>

			{/* 정보 영역 */}
			<div className="w-full flex flex-col">
				<div className="grow flex flex-col gap-lg">
					{/* 제목 */}
					<div className="h-10 w-2/3 rounded-md bg-base200 animate-pulse" />

					{/* 설명 */}
					<div className="flex flex-col gap-sm">
						<div className="h-5 w-full rounded-md bg-base200 animate-pulse" />
						<div className="h-5 w-5/6 rounded-md bg-base200 animate-pulse" />
					</div>

					{/* 상세 정보 */}
					<div className="flex flex-col gap-lg">
						<div className="flex items-center gap-2xl">
							<div className="h-6 w-[12rem] rounded-md bg-base200 animate-pulse" />
							<div className="h-6 w-24 rounded-md bg-base200 animate-pulse" />
						</div>

						<div className="flex items-center gap-2xl">
							<div className="h-6 w-[12rem] rounded-md bg-base200 animate-pulse" />
							<div className="h-6 w-32 rounded-md bg-base200 animate-pulse" />
						</div>
					</div>

					{/* 수량 영역 */}
					{isAuthorized && (
						<div className="flex items-center gap-2xl">
							<div className="h-6 grow rounded-md bg-base200 animate-pulse" />
							<div className="h-12 w-[14rem] rounded-md bg-base200 animate-pulse" />
						</div>
					)}

					{/* 가격 */}
					{isAuthorized && (
						<>
							<hr className="border border-base300" />
							<div className="flex items-center gap-2xl">
								<div className="h-6 grow rounded-md bg-base200 animate-pulse" />
								<div className="h-6 w-32 rounded-md bg-base200 animate-pulse" />
							</div>
						</>
					)}
				</div>

				{/* 버튼 영역 */}
				{isAuthorized && (
					<div className="mt-auto flex gap-lg">
						<div className="h-12 w-full rounded-md bg-base200 animate-pulse" />

						<div className="h-12 w-full rounded-md bg-base200 animate-pulse" />
					</div>
				)}
			</div>
		</section>
	);
};

export default ProductDetailSkeleton;
