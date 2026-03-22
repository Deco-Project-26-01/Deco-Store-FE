import Dropdown from '@components/Dropdown/Dropdown';
import ProductLink from '@components/Link/ProductLink';
import ProductListSkeleton from '@components/Skeleton/ProductListSkeleton';
import useGetProducts from '@hooks/useGetProducts';
import { useUserStore } from '@store/useUserStore';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
	const accessToken = useUserStore((state) => state.accessToken);
	const [searchParams] = useSearchParams();
	const category = searchParams.get('products');
	const { data, isLoading, error } = useGetProducts();

	const products = data?.products ?? [];
	const baseImageUrl = import.meta.env.VITE_DECO_BACKEND_URL;

	return (
		<div>
			<h1 className="sr-only">Home</h1>
			<h2 className="sr-only">
				{category
					? `Category: ${category.slice(0, 1).toUpperCase()}${category.slice(1)}`
					: 'All'}
			</h2>
			{/* 상품 영역 */}
			<section>
				{/* 정렬 및 필터 */}
				<div className="flex justify-between items-center mb-2xl">
					<div className="flex items-center gap-lg">
						<Dropdown
							width={15}
							listHeight={20}
							placeholder={'Filter 1'}
							onChange={() => {}}
							list={[
								{ label: 'item1', value: 'filter1-item1' },
								{ label: 'item2', value: 'filter1-item2' },
							]}
						/>
						<Dropdown
							width={15}
							listHeight={20}
							placeholder={'Filter 2'}
							onChange={() => {}}
							list={[
								{ label: 'item1', value: 'filter2-item1' },
								{ label: 'item2', value: 'filter2-item2' },
							]}
						/>
					</div>
					<Dropdown
						width={20}
						listHeight={20}
						placeholder={'Sort By'}
						onChange={() => {}}
						list={[
							{ label: 'item1', value: 'sort-item1' },
							{ label: 'item2', value: 'sort-item2' },
						]}
					/>
				</div>
				{/* 상품 리스트 */}
				{isLoading ? (
					<ProductListSkeleton />
				) : error ? (
					<p className="text-center">Failed to load products.</p>
				) : products.length > 0 ? (
					<div className={`grid grid-cols-4 gap-xl`}>
						{products.map((product) => {
							const thumbnail = product.images?.find((img) => img.isThumbnail);

							const imageUrl = thumbnail
								? `${baseImageUrl}${thumbnail.imageUrl}`
								: '';

							return (
								<ProductLink
									key={product.id}
									id={product.id}
									name={product.name}
									description={product.description}
									price={product.price}
									imageUrl={imageUrl}
									isAuthorized={!!accessToken}
								/>
							);
						})}
					</div>
				) : (
					<p className="text-center">No products available.</p>
				)}
			</section>
		</div>
	);
};

export default Home;
