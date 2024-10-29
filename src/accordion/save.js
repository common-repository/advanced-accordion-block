/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-lonely-if */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
const { Fragment } = wp.element;
const { select } = wp.data;

const Save = ({ attributes }) => {
	const {
		uniqueId,
		makeActive,
		border,
		margins,
		paddings,
		borderRadius,
		qIconColor,
		qIconText,
		qIconBg,
		aIconColor,
		aIconBg,
		aIconText,
		heading,
		headingTag,
		headingColor,
		anchorPosition,
		anchorLinkShow,
		showIcon,
		iconClass,
		iconPosition,
		iconColor,
		iconFontSize,
		iconBackground,
		headerBg,
		bodyBg,
		id,
		linkedAccordion,
		link,
		tab,
		disableAccordion,
		feedbackShow,
		feedbacLabel,
		yesBtn,
		noBtn,
		counterShow,
		uniqueKey,
		styledQA,
		faqSchema,
	} = attributes;

	const activeClass = makeActive
		? `aab__accordion_body--show active__accordion_${uniqueId}`
		: '';
	// initial accordion stage
	let currentIconClass;

	if (makeActive === false) {
		currentIconClass = iconClass;
	} else {
		if (iconClass === 'plus-alt2') {
			currentIconClass = 'minus';
		} else if (iconClass === 'arrow-down') {
			currentIconClass = 'arrow-up';
		} else if (iconClass === 'arrow-down-alt2') {
			currentIconClass = 'arrow-up-alt2';
		} else if (iconClass === 'plus-alt') {
			currentIconClass = 'dismiss';
		} else if (iconClass === 'insert') {
			currentIconClass = 'remove';
		}
	}

	// Check if aab_premium is true
	const aab_premium = aagb_local_object.licensing;
	const voting_checked = aab_premium ?? 'false';
	const noProClass = aab_premium ? '' : 'no-pro-plan';	

	const FeedBackBtn = () => {
		// Get the current page ID

		return (
			feedbackShow &&
			voting_checked && (
				<span className="feedback-btn-wrap" data-id={uniqueKey}>
					{feedbacLabel && <span>{feedbacLabel}</span>}

					{yesBtn && (
						<button
							className="feedback-btn"
							data-value="yes"
							data-id={uniqueKey}
						>
							{yesBtn}
							{counterShow && <span className="count">0</span>}
						</button>
					)}

					{noBtn && (
						<button
							className="feedback-btn"
							data-value="no"
							data-id={`${uniqueKey}`}
						>
							{noBtn}
							{counterShow && <span className="count">0</span>}
						</button>
					)}
				</span>
			)
		);
	};

	return (

		<div {...(faqSchema ? { itemScope: true, itemType: "https://schema.org/FAQPage" } : {} )}>
		<div
			{...useBlockProps.save({
				className: `aab__accordion_container separate-accordion ${
					disableAccordion ? 'aab__accordion_disabled' : ''
				} ${
					makeActive ? `active__accordion_container_${uniqueId}` : ''
				} ${noProClass}`,
			})}
			// style={{
			// 	border: `${border.width} ${border.style} ${border.color}`,
			// 	marginTop: `${margins.top}`,
			// 	marginBottom: `${margins.bottom}`,
			// 	borderRadius: `${borderRadius}px`,
			// }}
			id={id !== '' ? id : ''}
			{...(faqSchema ? { itemScope: true, itemprop: "mainEntity",  itemType: "https://schema.org/Question" } : {} )}
		>

				<Fragment>
					<div
						className={`aab__accordion_head ${iconPosition} ${makeActive ? "active" : ""} `}
						data-active={makeActive}
						style={{
							color: headingColor ? headingColor : '#333333',
							backgroundColor: headerBg
								? headerBg
								: 'transparent',
							// padding: `${paddings.top} ${paddings.left} ${paddings.bottom} ${paddings.right}`,
						}}

					>
						<div
							className={`aab__accordion_heading ${iconPosition} ${
								anchorPosition || ''
							}`}
						>
							{aab_premium && (
								<div className="icon-container">
									<div className="icon-q"
										style={{
											color: qIconColor,
											backgroundColor: qIconBg
										}}
									>{qIconText}</div>
									<div className="icon-a"

										style={{
											color: aIconColor,
											backgroundColor: aIconBg,
										}}>{aIconText}</div>
								</div>
							)}

							<RichText.Content
								className="aab__accordion_title"
								tagName={headingTag}
								value={heading}
								style={{
									margin: 0,
									color: headingColor
										? headingColor
										: '#333333',
								}}
								itemprop="name"
							/>
						</div>
						{showIcon && (
							<div
								className={`aab__accordion_icon`}
								style={{
									color: iconColor ? iconColor : '#333333',
									backgroundColor: iconBackground
										? iconBackground
										: 'transparent',
								}}
							>
								<span
									className={`aab__icon dashicons dashicons-${currentIconClass}`}
									style={{
										fontSize: iconFontSize
											? iconFontSize + 'px'
											: '',
									}}
								></span>
							</div>
						)}
					</div>
					<div
						{...(faqSchema ? { itemScope: true, itemprop:"acceptedAnswer", itemType: "https://schema.org/Answer" } : {} )}
						className={`aab__accordion_body ${activeClass}`}
						role="region"
						style={{
							backgroundColor: bodyBg ? bodyBg : 'transparent',
							// borderTop: `${border.width} ${border.style} ${border.color}`,
							// padding: `${paddings.top} ${paddings.left} ${paddings.bottom} ${paddings.right}`,
						}}
					>
						<div itemProp="text">
							<InnerBlocks.Content />
						</div>

						<FeedBackBtn />
					</div>
					{anchorLinkShow === true && aab_premium && (
						<script>
							{`
								jQuery(document).ready(function($) {
									if ($('.aab__accordion_heading').length) {
										$(document).ready(function() {
											var Anchor1 = new AnchorJS();
											Anchor1.add('.aab__accordion_heading');
										});
									}
								});
							`}
						</script>
					)}
				</Fragment>

		</div>
		</div>
	);
};
export default Save;
