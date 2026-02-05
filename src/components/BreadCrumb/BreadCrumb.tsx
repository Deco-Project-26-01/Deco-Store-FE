import type { IRouteSiblings } from '#types/router';
import BreadCrumbDropdown from '@components/BreadCrumb/BreadCrumbDropdown';
import BreadCrumbLink from '@components/BreadCrumb/BreadCrumbLink';

type BreadCrumbVariant = 'primary' | 'secondary';

interface IBreadCrumbItemProps {
	label: string;
	siblings?: IRouteSiblings[];
	path: string;
}

interface IBreadCrumbProps {
	variant: BreadCrumbVariant;
	items: IBreadCrumbItemProps[];
}

const BreadCrumb = ({ variant, items }: IBreadCrumbProps) => {
	return (
		<nav aria-label="breadcrumb">
			<ol className="flex items-center gap-lg">
				{/* 3. breadcrumb 렌더링 */}
				{items.map((breadCrumb, index) => {
					// 마지막 요소인지 판단
					const isLast = index === items.length - 1;
					console.log(breadCrumb.siblings);

					return (
						<li
							key={breadCrumb.path}
							className="flex items-center gap-lg text-bodyBase font-semibold"
						>
							{index > 0 && (
								<span
									className={`${variant === 'primary' ? 'text-base700' : 'text-base300'}`}
								>
									&gt;
								</span>
							)}

							{!isLast ? (
								// 마지막 요소가 아니라면 이동할 수 있는 Link 렌더링
								<BreadCrumbLink to={breadCrumb.path} variant={variant}>
									{breadCrumb.label}
								</BreadCrumbLink>
							) : breadCrumb.siblings ? (
								// 마지막 요소이면서 형제 페이지가 있는 경우, 형제 페이지로 이동할 수 있는 드롭다운 렌더링
								<BreadCrumbDropdown
									variant={variant}
									current={breadCrumb.label}
									siblings={breadCrumb.siblings}
								>
									{breadCrumb.label}
								</BreadCrumbDropdown>
							) : (
								// 마지막 요소이면서 형제 페이지가 없는 경우, 텍스트만 렌더링
								<span
									className={`${variant === 'primary' ? 'text-primaryDark' : 'text-secondaryBase'}`}
								>
									{breadCrumb.label}
								</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default BreadCrumb;
