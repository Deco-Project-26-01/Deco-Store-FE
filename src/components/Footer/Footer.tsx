import iconGlobeGray from '@assets/icons/icon-globe-base400.svg';
import iconLinkedInGray from '@assets/icons/icon-linkedin-gray.svg';
import IconTextLink from '@components/Link/IconTextLink';
import LogoLink from '@components/Link/LogoLink';
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
					<TextAnchor
						variant="gray"
						size="medium"
						href="https://www.decoindco.com/company?tab=contact"
					>
						Contact
					</TextAnchor>
				</div>
				{/* 주소 및 대표자 정보 */}
				<div className="mb-sm px-lg py-md text-bodyCaption flex gap-lg items-center">
					<address className="flex items-center gap-lg">
						<p>Deco Indco Ltd</p>
						<p>Jongno 3-ga, Seoul & Iksan-city, Korea</p>
					</address>
					<dl className="flex items-center gap-xs">
						<dt>CEO:</dt>
						<dd>Kim & Lee</dd>
					</dl>
				</div>

				{/* 저작권 및 각종 링크 */}
				<div className="w-full px-lg flex items-center justify-between gap-3xl">
					<p className="text-bodyCaption">
						COPYRIGHT © Deco Indco Ltd All Rights RESERVED
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
								href="https://buykorea.org/ec/prd/selectSvcDetail.do?goodsSn=3602010"
								variant="textGray"
								size="medium"
								iconPath={iconGlobeGray}
							>
								buyKOREA
							</IconTextLink>
						</li>
					</ul>
				</div>
			</section>
		</footer>
	);
};

export default Footer;
