import type { ComponentPropsWithoutRef } from 'react';
import iconXCircleBase300 from '@assets/icons/icon-x-circle-base300.svg';
import IconButton from '@components/Button/IconButton';

interface ISearchInputProps extends ComponentPropsWithoutRef<'input'> {
	onIconClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SearchInput = ({ value, onIconClick, ...rest }: ISearchInputProps) => {
	return (
		<div
			className={`
        w-full
        flex items-center gap-md
      `}
		>
			<input
				id="header-search"
				type="search"
				placeholder=""
				value={value}
				maxLength={50}
				className={`
          text-white text-bodyMedium
          grow
          ellipsis
        `}
				{...rest}
			/>
			{!!value && (
				<div
					className={`
          w-[2.4rem] h-[2.4rem] p-xs
          flex items-center justify-center
          hover:scale-95 hover:rounded-xs hover:bg-white/10
          focus-within:rounded-xs focus-within:outline focus-within:outline-white
          active:scale-95 active:rounded-xs active:bg-white/10
        `}
				>
					<IconButton
						iconPath={iconXCircleBase300}
						iconAlt={'Clear'}
						onClick={onIconClick}
					/>
				</div>
			)}
		</div>
	);
};

export default SearchInput;
