const ProductCardSkeleton = () => {
	return (
		<div className="animate-pulse">
			<div className="mb-md aspect-square w-full rounded-md bg-base200" />
			<div className="mb-sm h-5 w-3/4 rounded bg-base200" />
			<div className="mb-sm h-4 w-full rounded bg-base200" />
			<div className="h-4 w-1/2 rounded bg-base200" />
		</div>
	);
};

const ProductListSkeleton = () => {
	return (
		<div className={`grid grid-cols-4 gap-xl`}>
			{Array.from({
				length: Number(import.meta.env.VITE_PRODUCTS_PER_PAGE),
			}).map((_, index) => (
				<ProductCardSkeleton key={index} />
			))}
		</div>
	);
};

export default ProductListSkeleton;
