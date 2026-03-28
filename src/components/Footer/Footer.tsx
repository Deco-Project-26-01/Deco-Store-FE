import IconTextLink from '@components/Link/IconTextLink';
import LogoLink from '@components/Link/LogoLink';

import iconInstagramGray from '@assets/icons/icon-instagram-gray.svg';
import iconLinkedInGray from '@assets/icons/icon-linkedin-gray.svg';
import iconYouTubeGray from '@assets/icons/icon-youtube-gray.svg';
import TextAnchor from '@components/Link/TextAnchor';

const Footer = () => {
	return (
		<footer className="shrink-0 mt-auto min-w-max bg-base900 text-base400">
			<section
				className={`
					full-inner
					px-3xl py-4xl box-border
				`}
			>
				{/* Link - 메인 페이지 or brand.contact 페이지로 이동 (추후 링크 수정) */}
				<div className="pr-lg mb-sm flex items-center justify-between gap-3xl">
					<LogoLink variant="gray" />
					<TextAnchor variant="gray" size="medium" href="/">
						Contact
					</TextAnchor>
				</div>
				{/* 주소 및 대표자 정보 */}
				<div className="mb-sm px-lg py-md text-bodyCaption">
					<address className="mb-sm flex items-center gap-lg">
						<p>Deco</p>
						<p>Jongno 3-ga, Seoul, Korea</p>
					</address>
					<dl className="flex items-center gap-lg">
						<div className="flex items-center gap-xs">
							<dt>CEO:</dt>
							<dd>Kim & Lee</dd>
						</div>
						<div className="flex items-center gap-xs">
							<dt>CISO:</dt>
							<dd>Kim Sangho</dd>
						</div>
						<div className="flex items-center gap-xs">
							<dt>Hosting Provider:</dt>
							<dd>Deco Ind Co., Ltd.</dd>
						</div>
					</dl>
				</div>
				{/* 저작권 및 각종 링크 */}
				<div className="w-full px-lg flex items-center justify-between gap-3xl">
					<p className="text-bodyCaption">
						COPYRIGHT © Deco corp All Rights RESERVED
					</p>
					<ul className="py-xs flex items-center gap-xl ml-auto">
						<li>
							<IconTextLink
								href="https://www.linkedin.com/company/112441487/admin/dashboard/"
								variant="textGray"
								size="medium"
								iconPath={iconLinkedInGray}
							>
								LinkedIn
							</IconTextLink>
						</li>
						<li>
							<IconTextLink
								href="/"
								variant="textGray"
								size="medium"
								iconPath={iconInstagramGray}
							>
								Instagram
							</IconTextLink>
						</li>
						<li>
							<IconTextLink
								href="/"
								variant="textGray"
								size="medium"
								iconPath={iconYouTubeGray}
							>
								YouTube
							</IconTextLink>
						</li>
					</ul>
				</div>
			</section>
		</footer>
	);
};

export default Footer;
