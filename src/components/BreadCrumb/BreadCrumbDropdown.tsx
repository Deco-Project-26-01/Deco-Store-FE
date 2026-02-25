import { useRef, useState, type ComponentPropsWithoutRef } from 'react';

import type { IRouteSiblings } from '#types/router';
import iconChevronDownPrimaryDark from '@assets/icons/icon-chevron-down-primaryDark.svg';
import iconChevronDownSecondaryBase from '@assets/icons/icon-chevron-down-secondaryBase.svg';
import iconChevronUpPrimaryDark from '@assets/icons/icon-chevron-up-primaryDark.svg';
import iconChevronUpSecondaryBase from '@assets/icons/icon-chevron-up-secondaryBase.svg';
import useKeyboardNavigation from '@hooks/useKeyboardNavigaion';
import useOutsideClick from '@hooks/useOutsideClick';
import { Link } from 'react-router-dom';

type BreadCrumbDropdownVariant = 'primary' | 'secondary';

interface IBreadCrumbDropdownProps extends ComponentPropsWithoutRef<'button'> {
	variant: BreadCrumbDropdownVariant;
	current: string;
	siblings: IRouteSiblings[];
	children: string;
}

const BreadCrumbDropdown = ({
	variant,
	current,
	siblings,
	children,
	...rest
}: IBreadCrumbDropdownProps) => {
	const [isOpened, setIsOpened] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLUListElement>(null);

	// 커스텀 훅: containerRef 외부 클릭 시 isOpened를 false로
	useOutsideClick(containerRef, () => setIsOpened(false));

	// 키보드 이벤트 대응  -> 사용자 경험 향상
	useKeyboardNavigation(isOpened, 'a', () => setIsOpened(false), menuRef);

	return (
		// 버튼을 감싼 영역까지 포함해야 버튼 클릭 시 setIsOpened가 중복 실행되는 것 방지
		<div ref={containerRef} className="relative inline-block">
			{/* 드롭다운 버튼 */}
			<button
				type="button"
				aria-haspopup="true"
				aria-expanded={isOpened}
				className={`
					flex items-center gap-lg
					text-bodyBase font-semibold
					${variant === 'primary' ? 'text-primaryDark' : 'text-secondaryBase'}
					hover:underline
					focus-visible:rounded-[1px]
					focus-visible:outline focus-visible:outline-offset-2
					${variant === 'primary' ? 'focus-visible:outline-primaryDark' : 'focus-visible:outline-secondaryBase'}
				`}
				onClick={() => setIsOpened((prev) => !prev)}
				{...rest}
			>
				<span>{children}</span>
				<img
					src={
						variant === 'primary'
							? isOpened
								? iconChevronUpPrimaryDark
								: iconChevronDownPrimaryDark
							: isOpened
								? iconChevronUpSecondaryBase
								: iconChevronDownSecondaryBase
					}
					alt=""
					aria-hidden="true"
					className="w-[1.6rem] h-[1.6rem]"
				/>
			</button>

			{/* 드롭다운 리스트 */}
			{isOpened && (
				<ul
					ref={menuRef}
					role="menu"
					className={`
						absolute top-[calc(100%+8px)] left-0
						w-[12rem]
						border border-solid ${variant === 'primary' ? 'border-base700' : 'border-base300'} z-50
					`}
				>
					{siblings.map((sibling) => {
						const isActive = sibling.label === current;

						return (
							<li key={sibling.path}>
								<Link
									to={sibling.path}
									role="menuitem"
									className={`
										block
										w-full text-center ellipsis
										px-xl py-sm box-border
										${isActive ? 'bg-base200' : 'bg-white'}
										text-bodyBase ${isActive ? 'font-semibold' : ''}
										${isActive ? (variant === 'primary' ? 'text-primaryDark' : 'text-secondaryDark') : 'text-base900'}
										hover:font-semibold hover:bg-base100
										focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1
										${variant === 'primary' ? 'focus-visible:outline-primaryDark' : 'focus-visible:outline-secondaryBase'}
									`}
								>
									{sibling.label}
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default BreadCrumbDropdown;
