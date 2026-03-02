import { useEffect, useRef, type RefObject } from 'react';

const useKeyboardNavigation = (
	isOpened: boolean,
	element: 'a' | 'button',
	callback: () => void,
	ref: RefObject<HTMLElement | null>,
) => {
	const savedCallback = useRef(callback);

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isOpened) return;

			// ESC 종료 로직
			if (e.key === 'Escape') savedCallback.current();

			// 방향키 탐색 로직
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				// 기본 동작 - 페이지 스크롤 방지
				e.preventDefault();

				const items = ref.current?.querySelectorAll(element);
				if (!items) return;

				const currentIndex = Array.from(items).findIndex(
					(item) => item === document.activeElement,
				);

				if (e.key === 'ArrowDown') {
					const nextIndex = (currentIndex + 1) % items.length;
					items[nextIndex].focus();
				} else if (e.key === 'ArrowUp') {
					const prevIndex = (currentIndex - 1 + items.length) % items.length;
					items[prevIndex].focus();
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpened, ref]);
};

export default useKeyboardNavigation;
