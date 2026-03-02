import GoldRateButton from '@components/Tab/GoldRateButton';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

type Category = 'All' | 'Bracelets' | 'Necklaces';

const ProductsTab = () => {
	const [searchParams] = useSearchParams();
	const { pathname } = useLocation();
	const currentCategory = searchParams.get('products');
	const categories: Category[] = ['All', 'Bracelets', 'Necklaces'];

	const getIsActive = (category: Category) =>
		category === 'All'
			? pathname === '/' && currentCategory === null
			: currentCategory?.toLowerCase() === category.toLowerCase();

	const getStyle = (isActive: boolean) => `
		relative w-[12rem] py-[2.8rem]
		flex justify-center items-center
		duration
		${isActive ? 'text-primaryDark font-bold' : 'text-base700 hover:text-primaryDark'}

		after:content-['']
		after:absolute after:bottom-[0] after:inset-x-[0] after:h-[2px]
		after:bg-primaryDark
		after:duration after:origin-center

		${isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}
		
		focus-visible:outline-none focus-visible:bg-primaryDark/5 focus-visible:rounded-xs
	`;

	return (
		<nav className="min-w-max bg-base100">
			<div className="full-inner px-3xl flex items-center gap-2xl">
				<ul
					role="tablist"
					className="flex items-center gap-2xl text-titleMedium text-base700"
				>
					{categories.map((category) => {
						const isActive = getIsActive(category);
						return (
							<li key={category} role="presentation">
								<Link
									to={
										category === 'All'
											? '/'
											: `/?products=${category.toLowerCase()}`
									}
									className={getStyle(isActive)}
									role="tab"
									aria-selected={isActive}
									aria-current={isActive ? 'page' : undefined}
								>
									{category}
								</Link>
							</li>
						);
					})}
				</ul>
				{/* 금 시세 조회 버튼 영역 */}
				<GoldRateButton />
			</div>
		</nav>
	);
};

export default ProductsTab;
