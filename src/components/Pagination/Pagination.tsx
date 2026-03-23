import type { IPageInfo } from '#types/products';

interface IPaginationProps {
	pageInfo: IPageInfo;
	onPageChange: (page: number) => void;
}

type PageItem = number | 'ellipsis';

const Pagination = ({ pageInfo, onPageChange }: IPaginationProps) => {
	const currentPage = pageInfo.currentPage;
	const totalPages = pageInfo.totalPages;

	const createPageItems = (): PageItem[] => {
		if (totalPages <= 0) return [];

		// 페이지가 5개 이하면 전부 표시
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		// 앞부분
		if (currentPage <= 3) {
			return [1, 2, 3, 4, 'ellipsis', totalPages];
		}

		// 뒷부분
		if (currentPage >= totalPages - 2) {
			return [
				1,
				'ellipsis',
				totalPages - 3,
				totalPages - 2,
				totalPages - 1,
				totalPages,
			];
		}

		// 중간부분
		return [
			1,
			'ellipsis',
			currentPage - 1,
			currentPage,
			currentPage + 1,
			'ellipsis',
			totalPages,
		];
	};

	const pageItems = createPageItems();
	if (totalPages <= 1) return null;

	return (
		<nav aria-label="pagination">
			<ul className="flex justify-center items-center gap-2xl text-titleMedium">
				<li>
					<button
						type="button"
						onClick={() => onPageChange(currentPage - 1)}
						disabled={!pageInfo.hasPrevious}
						className="text-base700 disabled:cursor-not-allowed disabled:opacity-40"
						aria-label="Previous Page"
					>
						Prev
					</button>
				</li>

				{pageItems.map((item, index) => (
					<li key={`${item}-${index}`}>
						{item === 'ellipsis' ? (
							<span className="text-base700">...</span>
						) : (
							<button
								type="button"
								onClick={() => onPageChange(item)}
								aria-current={currentPage === item ? 'page' : undefined}
								className={
									currentPage === item ? 'text-primaryDark' : 'text-base700'
								}
							>
								{item}
							</button>
						)}
					</li>
				))}

				<li>
					<button
						type="button"
						onClick={() => onPageChange(currentPage + 1)}
						disabled={!pageInfo.hasNext}
						className="text-base700 disabled:cursor-not-allowed disabled:opacity-40"
						aria-label="Next Page"
					>
						Next
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
