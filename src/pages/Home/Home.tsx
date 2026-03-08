import type { IProductData } from '#types/products';
import Dropdown from '@components/Dropdown/Dropdown';
import ProductLink from '@components/Link/ProductLink';
import { useUserStore } from '@store/useUserStore';
import { useSearchParams } from 'react-router-dom';

// 임시 데이터
const productData: IProductData[] = [
	{
		id: 1,
		name: 'Diamond Tennis Bracelet',
		category: 'BRACELET',
		carat: 2,
		price: 3500000,
		stock: 3,
		status: 'SALE',
		description: 'VS1 grade diamond tennis bracelet',
		images: [
			{
				id: 1001,
				imageUrl:
					'https://velog.velcdn.com/images/39busy/post/677cc62b-2d65-41e9-a8a8-0a624fb38bd5/image.png',
				isThumbnail: true,
			},
		],
		createdAt: '2026-01-02T10:00:00',
		updatedAt: '2026-01-12T10:00:00',
	},
	{
		id: 2,
		name: 'Gold Chain Necklace',
		category: 'NECKLACE',
		carat: 0,
		price: 950000,
		stock: 12,
		status: 'SALE',
		description: '18K gold chain necklace',
		images: [
			{
				id: 1002,
				imageUrl:
					'https://velog.velcdn.com/images/39busy/post/677cc62b-2d65-41e9-a8a8-0a624fb38bd5/image.png',
				isThumbnail: true,
			},
		],
		createdAt: '2026-01-03T11:00:00',
		updatedAt: '2026-01-11T11:00:00',
	},
	{
		id: 3,
		name: 'Emerald Pendant Necklace',
		category: 'NECKLACE',
		carat: 0.8,
		price: 1800000,
		stock: 6,
		status: 'SALE',
		description: 'Emerald pendant necklace',
		images: [
			{
				id: 1003,
				imageUrl:
					'https://velog.velcdn.com/images/39busy/post/677cc62b-2d65-41e9-a8a8-0a624fb38bd5/image.png',
				isThumbnail: true,
			},
		],
		createdAt: '2026-01-04T12:00:00',
		updatedAt: '2026-01-13T12:00:00',
	},
	{
		id: 4,
		name: 'Sapphire Bracelet',
		category: 'BRACELET',
		carat: 1.5,
		price: 2700000,
		stock: 4,
		status: 'SALE',
		description: 'Sapphire-set bracelet',
		images: [
			{
				id: 1004,
				imageUrl:
					'https://velog.velcdn.com/images/39busy/post/677cc62b-2d65-41e9-a8a8-0a624fb38bd5/image.png',
				isThumbnail: true,
			},
		],
		createdAt: '2026-01-05T09:30:00',
		updatedAt: '2026-01-14T09:30:00',
	},
	{
		id: 5,
		name: 'Minimal Gold Bracelet',
		category: 'BRACELET',
		carat: 0,
		price: 520000,
		stock: 15,
		status: 'SALE',
		description: 'Minimalist 14K gold bracelet',
		images: [
			{
				id: 1005,
				imageUrl:
					'https://velog.velcdn.com/images/39busy/post/677cc62b-2d65-41e9-a8a8-0a624fb38bd5/image.png',
				isThumbnail: true,
			},
		],
		createdAt: '2026-01-06T10:20:00',
		updatedAt: '2026-01-15T10:20:00',
	},
	{
		id: 6,
		name: 'Pearl Necklace',
		category: 'NECKLACE',
		carat: 0,
		price: 1200000,
		stock: 7,
		status: 'SALE',
		description: 'Natural pearl necklace',
		images: [
			{
				id: 1006,
				imageUrl:
					'https://velog.velcdn.com/images/39busy/post/677cc62b-2d65-41e9-a8a8-0a624fb38bd5/image.png',
				isThumbnail: true,
			},
		],
		createdAt: '2026-01-07T13:00:00',
		updatedAt: '2026-01-16T13:00:00',
	},
	{
		id: 7,
		name: 'Ruby Charm Bracelet',
		category: 'BRACELET',
		carat: 1.2,
		price: 2100000,
		stock: 5,
		status: 'SALE',
		description: 'Ruby charm bracelet',
		images: [
			{
				id: 1007,
				imageUrl:
					'https://velog.velcdn.com/images/39busy/post/677cc62b-2d65-41e9-a8a8-0a624fb38bd5/image.png',
				isThumbnail: true,
			},
		],
		createdAt: '2026-01-08T14:10:00',
		updatedAt: '2026-01-17T14:10:00',
	},
	{
		id: 8,
		name: 'Diamond Bar Necklace',
		category: 'NECKLACE',
		carat: 0.5,
		price: 1600000,
		stock: 8,
		status: 'SALE',
		description: 'Diamond bar pendant necklace',
		images: [
			{
				id: 1008,
				imageUrl:
					'https://velog.velcdn.com/images/39busy/post/677cc62b-2d65-41e9-a8a8-0a624fb38bd5/image.png',
				isThumbnail: true,
			},
		],
		createdAt: '2026-01-09T15:00:00',
		updatedAt: '2026-01-18T15:00:00',
	},
];

const Home = () => {
	const accessToken = useUserStore((state) => state.accessToken);
	const [searchParams, setSearchParams] = useSearchParams();
	const category = searchParams.get('products');

	console.log(setSearchParams);

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
				<div className={`grid grid-cols-4 gap-xl`}>
					{productData.length &&
						productData.map((product) => (
							<ProductLink
								key={product.id}
								id={product.id}
								name={product.name}
								description={product.description}
								price={product.price}
								imageUrl={product.images[0].imageUrl}
								isAuthorized={!!accessToken}
							/>
						))}
				</div>
				<div></div>
			</section>
		</div>
	);
};

export default Home;
