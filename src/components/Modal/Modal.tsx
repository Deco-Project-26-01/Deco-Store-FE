import IconButton from '@components/Button/IconButton';
import { createPortal } from 'react-dom';
import iconCloseBase900 from '@assets/icons/icon-close-base900.svg';
import { useEffect, useId, useRef } from 'react';

interface IModalProps {
	title?: string;
	children: React.ReactNode;
	onClose: () => void;
}

const getFocusableElements = (container: HTMLElement) => {
	return Array.from(
		container.querySelectorAll<HTMLElement>(
			[
				'a[href]',
				'button:not([disabled])',
				'textarea:not([disabled])',
				'input:not([disabled])',
				'select:not([disabled])',
				'[tabindex]:not([tabindex="-1"])',
			].join(','),
		),
	).filter((element) => {
		return !element.hasAttribute('disabled') && element.offsetParent !== null;
	});
};

const Modal = ({ title, children, onClose }: IModalProps) => {
	const element = document.getElementById('modal-portal') as HTMLElement;
	const modalRef = useRef<HTMLDivElement>(null);
	const titleId = useId();
	const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

	// 모달이 열릴 때 배경 스크롤 방지
	useEffect(() => {
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, []);

	// ESC 키로 모달 닫기
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose]);

	// 열릴 때 포커스 이동, 닫힐 때 원래 포커스로 복귀
	useEffect(() => {
		previouslyFocusedElementRef.current =
			document.activeElement as HTMLElement | null;

		const timer = window.setTimeout(() => {
			if (!modalRef.current) return;

			const focusableElements = getFocusableElements(modalRef.current);

			if (focusableElements.length > 0) {
				focusableElements[0].focus();
			} else {
				modalRef.current.focus();
			}
		}, 0);

		return () => {
			window.clearTimeout(timer);
			previouslyFocusedElementRef.current?.focus();
		};
	}, []);

	// 포커스 트랩
	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key !== 'Tab' || !modalRef.current) return;

		const focusableElements = getFocusableElements(modalRef.current);

		if (focusableElements.length === 0) {
			event.preventDefault();
			modalRef.current.focus();
			return;
		}

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];
		const activeElement = document.activeElement as HTMLElement | null;

		if (event.shiftKey) {
			if (activeElement === firstElement) {
				event.preventDefault();
				lastElement.focus();
			}
			return;
		}

		if (activeElement === lastElement) {
			event.preventDefault();
			firstElement.focus();
		}
	};

	return createPortal(
		<div
			className={`
        fixed inset-0 bg-black/60 z-999
        flex items-center justify-center
      `}
			// 모달 외부 클릭 시 모달 닫기
			onClick={onClose}
		>
			<div
				ref={modalRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={title ? titleId : undefined}
				aria-label={!title ? 'Modal dialog' : undefined}
				tabIndex={-1}
				className={`
          w-[50rem]
        bg-white rounded-lg shadow-lg
					overflow-hidden
        `}
				// 키보드 이벤트 핸들러 등록
				onKeyDown={handleKeyDown}
				// 모달 내부 클릭 시 이벤트 버블링 방지
				onClick={(e) => e.stopPropagation()}
			>
				{/* 타이틀 영역 */}
				<div
					className={`
					relative min-h-[5.6rem] px-[4rem] py-lg
					${title ? 'border-0 border-b border-solid border-base300 box-border' : ''}
				`}
				>
					{title && (
						<h3
							id={titleId}
							className="text-titleLarge text-primaryDark text-center"
						>
							{title}
						</h3>
					)}
					<div
						className={`
              w-[2.4rem] h-[2.4rem]
              absolute top-1/2 right-lg
              transform -translate-y-1/2
              hover:scale-95 hover:rounded-xs hover:bg-black/10
              focus-within:rounded-xs focus-within:outline focus-within:outline-primaryDark
              active:scale-95 active:rounded-xs active:bg-black/10
            `}
					>
						<IconButton
							iconPath={iconCloseBase900}
							iconAlt="Close"
							onClick={onClose}
						/>
					</div>
				</div>
				{/* 콘텐츠 영역 */}
				<div>{children}</div>
			</div>
		</div>,
		element,
	);
};

export default Modal;
