import IconTextLink from '@components/Link/IconTextLink';
import LogoLink from '@components/Link/LogoLink';
import TextLink from '@components/Link/TextLink';

import iconInstagramGray from '@assets/icons/icon-instagram-gray.svg';
import iconLinkedInGray from '@assets/icons/icon-linkedin-gray.svg';
import iconYouTubeGray from '@assets/icons/icon-youtube-gray.svg';

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
					<TextLink variant="gray" size="medium" href="#">
						Contact
					</TextLink>
				</div>
				{/* 주소 및 대표자 정보 */}
				<div className="mb-sm px-lg py-md flex items-center gap-lg text-titleBase">
					<p>Deco Corp</p>
					<p>Jongno 3-ga, Seoul, Korea</p>
					<p>CEO: Kim</p>
				</div>
				{/* 저작권 및 각종 링크 */}
				<div className="w-full px-lg flex items-center justify-between gap-3xl">
					<p className="text-bodyCaption">
						COPYRIGHT © Deco.corp All Rights RESERVED
					</p>
					<ul className="py-xs flex items-center gap-xl ml-auto">
						<li>
							<IconTextLink
								href="#"
								variant="textGray"
								size="medium"
								iconPath={iconLinkedInGray}
							>
								LinkedIn
							</IconTextLink>
						</li>
						<li>
							<IconTextLink
								href="#"
								variant="textGray"
								size="medium"
								iconPath={iconInstagramGray}
							>
								Instagram
							</IconTextLink>
						</li>
						<li>
							<IconTextLink
								href="#"
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
