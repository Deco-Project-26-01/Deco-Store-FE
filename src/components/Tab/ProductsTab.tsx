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
    w-[12rem] py-[2.8rem]
    flex justify-center items-center
    duration
    ${isActive && 'text-primaryDark font-bold shadow-[inset_0_-2px_0_0_var(--color-primary-dark)]'}

    hover:shadow-[inset_0_-2px_0_0_var(--color-primary-dark)]
    focus-visible:outline-none focus-visible:shadow-[inset_0_-2px_0_0_var(--color-primary-dark)]
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-transparent focus-visible:-outline-offset-2  
  `;

	return (
		<nav className="min-w-max bg-base100">
			<ul
				role="tablist"
				className="full-inner px-3xl flex items-center gap-2xl text-titleMedium text-base700"
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
				{/* 금 시세 조회 버튼 영역 */}
				<li role="presentation">
					<GoldRateButton />
				</li>
			</ul>
		</nav>
	);
};

export default ProductsTab;
