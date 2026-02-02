import IconLink from '@components/Link/IconLink';
import LogoLink from '@components/Link/LogoLink';
import type { ComponentPropsWithoutRef } from 'react';

import iconUserWhite from '@assets/icons/icon-user-white.svg';
import iconCartWhite from '@assets/icons/icon-cart-white.svg';
import iconSupportWhite from '@assets/icons/icon-support-white.svg';

interface IDefaultHeaderProps extends ComponentPropsWithoutRef<'header'> {
	type: 'default';
	cartNum?: number;
}

interface ICheckoutHeaderProps extends ComponentPropsWithoutRef<'header'> {
	type: 'checkout';
	cartNum?: never;
}

type HeaderProps = IDefaultHeaderProps | ICheckoutHeaderProps;

const Header = ({ type = 'default', cartNum = 0 }: HeaderProps) => {
	return (
		<header className="bg-primaryDark">
			<div
				className={`
				full-inner
				px-3xl py-lg box-border
				flex justify-between items-center gap-3xl
			`}
			>
				<LogoLink variant="white" />
				<h1 className="sr-only">Deco</h1>
				{type === 'default' && (
					<>
						<div className="w-[60rem]">
							<form
								role="search"
								onSubmit={(e) => {
									e.preventDefault();
								}}
							>
								<div>
									<label htmlFor="header-search" className="sr-only">
										Search for keywords
									</label>
									<input id="header-search" type="search" placeholder="" />
								</div>
								<button type="submit">
									<span className="sr-only">Search</span>
									<img src="" alt="" aria-hidden="true" />
								</button>
							</form>
						</div>
						<nav className="flex-shrink-0">
							<ul className="flex items-center gap-xl">
								<li>
									<IconLink
										to="/mypage"
										iconPath={iconUserWhite}
										title="Account"
									/>
								</li>
								<li>
									<IconLink
										to="/cart"
										iconPath={iconCartWhite}
										title="Cart"
										cartNum={cartNum}
									/>
								</li>
								<li>
									<IconLink
										to="/mypage/support"
										iconPath={iconSupportWhite}
										title="Support"
									/>
								</li>
							</ul>
						</nav>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
