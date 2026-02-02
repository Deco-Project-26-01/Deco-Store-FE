import iconSearch from '@assets/icons/icon-search-white.svg';
import type { ComponentPropsWithoutRef } from 'react';

const SearchButton = ({ ...props }: ComponentPropsWithoutRef<'button'>) => {
	return (
		<button
			type="submit"
			className={`
        p-sm
        flex justify-center items-center
        hover:scale-95 hover:rounded-xs hover:bg-white/10
        focus-visible:rounded-xs focus-visible:outline focus-visible:outline-white
        active:scale-95 active:rounded-xs active:bg-white/10
      `}
			{...props}
		>
			<span className="sr-only">Search</span>
			<img
				src={iconSearch}
				alt=""
				className="w-[2.4rem] h-[2.4rem]"
				aria-hidden="true"
			/>
		</button>
	);
};

export default SearchButton;
