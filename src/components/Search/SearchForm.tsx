import SearchButton from '@components/Button/SearchButton';
import SearchInput from '@components/Input/SearchInput';
import { useState } from 'react';

const SearchForm = () => {
	const [keyword, setKeyword] = useState<string>('');
	return (
		<form
			role="search"
			onSubmit={(e) => {
				e.preventDefault();
			}}
			className={`
					flex-shrink-0
					w-[60rem] pl-md py-xs box-border
					flex items-center gap-md
					border-b-1 [border-bottom-style:solid] border-white
				`}
		>
			<label htmlFor="header-search" className="sr-only">
				Search for keywords
			</label>
			<SearchInput
				id="header-search"
				data-testid="header-search"
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				onIconClick={() => setKeyword('')}
			/>
			<SearchButton />
		</form>
	);
};

export default SearchForm;
