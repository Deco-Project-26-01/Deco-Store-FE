import iconCartWhite from '@assets/icons/icon-cart-white.svg';
import iconSupportWhite from '@assets/icons/icon-support-white.svg';
import iconUserWhite from '@assets/icons/icon-user-white.svg';
import IconLink from '@components/Link/IconLink';
import LogoLink from '@components/Link/LogoLink';
import SearchForm from '@components/Search/SearchForm';
import type { ComponentPropsWithoutRef } from 'react';

interface IDefaultHeaderProps extends ComponentPropsWithoutRef<'header'> {
	type: 'default';
	cartNum?: number;
}

interface ICheckoutHeaderProps extends ComponentPropsWithoutRef<'header'> {
	type: 'checkout';
	cartNum?: never;
}

type HeaderProps = IDefaultHeaderProps | ICheckoutHeaderProps;

const Header = ({ type, cartNum = 0 }: HeaderProps) => {
	return (
		<header className="shrink-0 mb-auto min-w-max bg-primaryDark">
			<div
				className={`
					full-inner
					px-3xl py-lg box-border
					flex justify-between items-center gap-2xl
				`}
			>
				<LogoLink variant="white" />
				<h1 className="sr-only">Deco</h1>
				{type === 'default' && (
					<>
						<SearchForm />
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
