import IconButton from '@components/Button/IconButton';
import { createPortal } from 'react-dom';
import iconCloseBase900 from '@assets/icons/icon-close-base900.svg';
import { useEffect, useRef } from 'react';

interface IModalProps {
	title?: string;
	children: React.ReactNode;
	onClose: () => void;
}

const Modal = ({ title, children, onClose }: IModalProps) => {
	const element = document.getElementById('modal-portal') as HTMLElement;
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, []);

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

	return createPortal(
		<div
			className={`
        fixed inset-0 bg-black/60 z-999
        flex items-center justify-center
      `}
			onClick={onClose}
		>
			<div
				ref={modalRef}
				role="dialog"
				aria-modal="true"
				tabIndex={-1}
				className={`
          w-[50rem]
        bg-white rounded-lg shadow-lg
					overflow-hidden
        `}
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
						<h3 className="text-titleLarge text-primaryDark text-center">
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
