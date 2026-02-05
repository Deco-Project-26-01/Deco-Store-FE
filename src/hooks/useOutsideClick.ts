import { useEffect, type RefObject } from 'react';

const useOutsideClick = (
	ref: RefObject<HTMLElement | null>,
	callback: () => void,
) => {
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent | TouchEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) callback();
		};

		// 클릭 이벤트와 터치 이벤트 대응
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);

		return () => {
			// 클린업 함수 - 컴포넌트가 언마운트되면 이벤트 리스너 제거
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
		};
	}, [ref, callback]);
};

export default useOutsideClick;
