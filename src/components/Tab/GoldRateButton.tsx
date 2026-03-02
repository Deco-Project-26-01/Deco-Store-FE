import { useState } from 'react';

const GoldRateButton = () => {
	const [isGoldRateOpen, setIsGoldRateOpen] = useState(false);
	return (
		<div>
			<button
				type="button"
				onClick={() => setIsGoldRateOpen((prev) => !prev)}
				className={`
          relative w-[12rem] py-[2.8rem]
          flex justify-center items-center
          text-titleMedium text-base700
          duration
          ${isGoldRateOpen ? 'text-primaryDark font-bold' : 'text-base700 hover:text-primaryDark'}

					after:content-['']
					after:absolute after:bottom-[0] after:inset-x-[0] after:h-[2px]
				after:bg-primaryDark
					after:duration after:origin-center

          ${isGoldRateOpen ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}
		
					focus-visible:outline-none focus-visible:bg-primaryDark/5 focus-visible:rounded-xs
        `}
				aria-haspopup="dialog"
				aria-expanded={isGoldRateOpen}
			>
				Gold Rates
			</button>
			{/* 금 시세 Modal - (구현 예정) */}
		</div>
	);
};

export default GoldRateButton;
