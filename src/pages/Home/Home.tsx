import Dropdown from '@components/Dropdown/Dropdown';
import ProductLink from '@components/Link/ProductLink';
import Pagination from '@components/Pagination/Pagination';
import ProductListSkeleton from '@components/Skeleton/ProductListSkeleton';
import useGetProducts from '@hooks/useGetProducts';
import useGetUserInfo from '@hooks/useGetUserInfo';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
	const { data: userData } = useGetUserInfo();
	const [searchParams, setSearchParams] = useSearchParams();
	const category = searchParams.get('category') || '';
	const sortBy = searchParams.get('sortBy') || '';
	const pageNum = Math.max(1, Number(searchParams.get('page') || '1'));

	const queryParams = useMemo(() => {
		const params = new URLSearchParams(searchParams);

		params.delete('page');

		return params.toString();
	}, [searchParams]);

	const { data, isLoading, error } = useGetProducts(pageNum - 1, queryParams);

	const products = data?.products ?? [];
	const baseImageUrl = import.meta.env.VITE_DECO_BACKEND_URL;

	const pageInfo = {
		currentPage: data?.pageInfo?.currentPage ?? 1,
		totalPages: data?.pageInfo?.totalPages ?? 0,
		hasNext: data?.pageInfo?.hasNext ?? false,
		hasPrevious: data?.pageInfo?.hasPrevious ?? false,
	};

	return (
		<div className="grow flex flex-col">
			<h1 className="sr-only">Home</h1>
			<h2 className="sr-only">
				{category
					? `Category: ${category.slice(0, 1).toUpperCase()}${category.slice(1)}`
					: 'All'}
			</h2>
			{/* 상품 영역 */}
			<section className="grow flex flex-col gap-2xl ">
				{/* 정렬 및 필터 */}
				<div className="flex justify-between items-center">
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
						selectedValue={
							sortBy === 'createdAt'
								? 'newest'
								: sortBy === 'price'
									? 'price'
									: sortBy === 'name'
										? 'name'
										: ''
						}
						onChange={(value) => {
							const nextParams = new URLSearchParams(searchParams);
							// 정렬 변경 시 1페이지로 이동
							nextParams.delete('page');

							if (value === 'newest') {
								nextParams.set('sortBy', 'createdAt');
							} else if (value === 'price') {
								nextParams.set('sortBy', 'price');
							} else if (value === 'name') {
								nextParams.set('sortBy', 'name');
							} else {
								nextParams.delete('sortBy');
							}

							setSearchParams(nextParams);
						}}
						list={[
							{ label: 'Default', value: '' },
							{ label: 'Newest', value: 'newest' },
							{ label: 'Price', value: 'price' },
							{ label: 'Name', value: 'name' },
						]}
					/>
				</div>

				{/* 상품 리스트 */}
				<div className="grow flex flex-col">
					{isLoading ? (
						<ProductListSkeleton />
					) : error ? (
						<div className="grow flex justify-center items-center">
							<p className="text-titleLarge">Failed to load products.</p>
						</div>
					) : products.length > 0 ? (
						<div className={`grid grid-cols-4 gap-xl`}>
							{products.map((product) => {
								const thumbnail = product.images?.find(
									(img) => img.isThumbnail,
								);

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
										isAuthorized={userData.data.status === 'ACTIVE'}
									/>
								);
							})}
						</div>
					) : (
						<div className="grow flex justify-center items-center">
							<p className="text-titleLarge">No products found.</p>
						</div>
					)}
				</div>
				{/* 페이지네이션 */}
				<div>
					<Pagination
						pageInfo={pageInfo}
						onPageChange={(page) => {
							const nextParams = new URLSearchParams(searchParams);
							nextParams.set('page', page.toString());
							setSearchParams(nextParams);
						}}
					/>
				</div>
			</section>
		</div>
	);
};

export default Home;
