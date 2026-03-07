import iconChevronDownPrimaryDark from '@assets/icons/icon-chevron-down-primaryDark.svg';
import iconChevronUpPrimaryDark from '@assets/icons/icon-chevron-up-primaryDark.svg';
import useKeyboardNavigation from '@hooks/useKeyboardNavigaion';
import useOutsideClick from '@hooks/useOutsideClick';
import { useRef, useState } from 'react';

interface IDropdownProps {
	width: number;
	listHeight: number;
	selectedValue?: string;
	placeholder?: string;
	onChange: (value: string) => void;
	list: { label: string; value: string }[];
}

const Dropdown = ({
	width,
	listHeight,
	selectedValue,
	placeholder = 'Select',
	onChange,
	list,
}: IDropdownProps) => {
	const [isOpened, setIsOpened] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLUListElement>(null);

	// 커스텀 훅: containerRef 외부 클릭 시 isOpened를 false로
	useOutsideClick(containerRef, () => setIsOpened(false));

	// 키보드 이벤트 대응  -> 사용자 경험 향상
	useKeyboardNavigation(isOpened, 'button', () => setIsOpened(false), menuRef);

	const selectedLabel =
		list.find((x) => x.value === selectedValue)?.label ?? placeholder;

	return (
		<div
			ref={containerRef}
			style={{ width: `${width}rem` }}
			className="relative"
		>
			<button
				type="button"
				aria-haspopup="true"
				aria-expanded={isOpened}
				onClick={() => setIsOpened((prev) => !prev)}
				className={`
					w-full
					px-lg py-[6px] box-border
					flex items-center justify-between
					border-2 border-solid border-base300 rounded-xs
					focus-visible:border-primaryDark
				`}
			>
				<span className="text-bodyBase min-w-0 ellipsis">{selectedLabel}</span>
				<img
					src={isOpened ? iconChevronUpPrimaryDark : iconChevronDownPrimaryDark}
					alt=""
					aria-hidden="true"
					className={`w-[2.4rem] h-[2.4rem]`}
				/>
			</button>

			{isOpened && (
				<ul
					role="listbox"
					ref={menuRef}
					style={{ width: `${width}rem`, maxHeight: `${listHeight}rem` }}
					className={`
						absolute top-[calc(100%+8px)] left-0
						w-full overflow-x-hidden overflow-y-auto
						bg-white
						border border-solid border-base700 z-50
						box-border
					`}
				>
					{list.map((item) => (
						<li
							key={item.value}
							className="focus-within:ring-1 focus-within:ring-inset focus-within:ring-primaryDark"
						>
							<button
								role="menuitem"
								onClick={() => {
									onChange(item.value);
									setIsOpened(false);
								}}
								className={`
									w-full ellipsis
									px-md py-sm
									text-bodyBase
									hover:text-primaryDark hover:font-semibold hover:bg-base100
								`}
							>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
