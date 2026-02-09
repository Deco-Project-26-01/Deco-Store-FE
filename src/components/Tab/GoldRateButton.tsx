import { useState } from 'react';

const GoldRateButton = () => {
	const [isGoldRateOpen, setIsGoldRateOpen] = useState(false);
	return (
		<div>
			<button
				type="button"
				onClick={() => setIsGoldRateOpen((prev) => !prev)}
				className={`
          w-[12rem] py-[2.8rem]
          flex justify-center items-center
          text-titleMedium text-base700
          duration
          ${isGoldRateOpen ? 'text-primaryDark' : ''}

          hover:shadow-[inset_0_-2px_0_0_var(--color-primary-dark)]
          focus-visible:outline-none focus-visible:shadow-[inset_0_-2px_0_0_var(--color-primary-dark)]
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-transparent focus-visible:-outline-offset-2
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
