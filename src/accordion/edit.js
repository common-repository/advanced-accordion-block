/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-shadow */
/* eslint-disable @wordpress/no-unsafe-wp-apis */
const { Fragment } = wp.element;
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { useState, useEffect } from "@wordpress/element";
import {
	ColorPalette,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalBoxControl as BoxControl,
	__experimentalBorderControl as BorderControl,
	TextControl,
	// custom
	PanelRow,
} from '@wordpress/components';
const { __ } = wp.i18n;

import colors from '../colors';
import icons from './icons';
import tags from '../tags';

// include editor styles
import './editor.scss';

const iconPositions = [
	{
		label: 'Left',
		value: 'aab_left_icon',
	},
	{
		label: 'Right',
		value: 'aab_right_icon',
	},
];
const anchorPositions = [
	{
		label: 'Left',
		value: 'aab_left_link',
	},
	{
		label: 'Right',
		value: 'aab_right_link',
	},
];

const { select } = wp.data;

const Edit = ({ attributes, setAttributes, clientId, isSelected }) => {
	const {
		uniqueId,
		makeActive,
		feedbackShow,
		border,
		margins,
		paddings,
		borderRadius,
		qIconText,
		qIconColor,
		qIconBg,
		aIconText,
		aIconColor,
		aIconBg,
		heading,
		subheading,
		headingTag,
		anchorLinkShow,
		anchorPosition,
		headingColor,
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
		feedbacLabel,
		yesBtn,
		noBtn,
		counterShow,
		uniqueKey,
		faqSchema,
	} = attributes;

	const numericClientId = clientId.replace(/\D/g, '').slice(0, 5);

	// Ensure numericClientId contains exactly 5 characters
	while (numericClientId.length < 5) {
		numericClientId = '0' + numericClientId;
	}

	// set unique ID
	setAttributes({
		uniqueId: clientId.slice(0, 8),
		uniqueKey: numericClientId,
	});

	// Check if aab_premium is true
	const aab_premium = aagb_local_object.licensing;

	const is_disable = aab_premium ? '' : 'disabled';
	const voting_checked = aab_premium ? feedbackShow : 'false';
	const anchor_link_checked = aab_premium ? anchorLinkShow : 'false';
	const counter_checked = aab_premium ? counterShow : 'false';
	const has_disabled_class = aab_premium ? '' : 'aab-pro-element';

	const blockProps = useBlockProps();
	const qaStyle = blockProps.className.includes('is-style-qa')


	const [hasQaStyle, setHasQaStyle] = useState(null);


	useEffect(() => {
		setHasQaStyle(qaStyle);

	}, [qaStyle])

	const noProClass = aab_premium ? '' : 'no-pro-plan';
	
	if ( ! aab_premium ) {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.addedNodes.length) {
					mutation.addedNodes.forEach((node) => {
						// Find the button for the "Q A" style and disable it
						jQuery('.block-editor-block-styles__variants button[aria-label=aab-style-pro-checked]').attr('disabled', 'disabled');
						// add class parent .components-panel__body.is-opened
						jQuery('.block-editor-block-styles__variants button[aria-label=aab-style-pro-checked]').closest('.components-panel__body').addClass('aab-pro-element');
					});
				}
			});
		});

		// Start observing the editor for changes
		observer.observe(document.body, { childList: true, subtree: true });
	}
	
	return (
		<Fragment>
			
			 <InspectorControls group="styles" class="testdd">

				{ hasQaStyle && aab_premium && (
					<>
					 
				<PanelBody
					title={__('Q/A Icons Styles', 'advanced-accordion-block')}
					initialOpen={false}
				>
					<p className="aab__label">
						{__('Q Icon Color', 'advanced-accordion-block')}
					</p>
					<ColorPalette
						colors={colors}
						value={qIconColor}
						onChange={(qIconColor) =>
							setAttributes({ qIconColor })
						}
					/>

					<p className="aab__label">
						{__('Q Icon Background Color', 'advanced-accordion-block')}
					</p>
					<ColorPalette
						colors={colors}
						value={qIconBg}
						onChange={(qIconBg) =>
							setAttributes({ qIconBg })
						}
					/>

					{/*<PanelRow>*/}
					{/*	<fieldset>*/}
					{/*		<ToggleControl label="ttt Show an heading before" />*/}
					{/*	</fieldset>*/}
					{/*</PanelRow>*/}

					<p className="aab__label">
						{__('A Icon Color', 'advanced-accordion-block')}
					</p>
					<ColorPalette
						colors={colors}
						value={aIconColor}
						onChange={(aIconColor) =>
							setAttributes({ aIconColor })
						}
					/>


					<p className="aab__label">
						{__('A Icon Background Color', 'advanced-accordion-block')}
					</p>
					<ColorPalette
						colors={colors}
						value={aIconBg}
						onChange={(aIconBg) =>
							setAttributes({ aIconBg })
						}
					/>


				</PanelBody>
					 </>
				 )}

				 <PanelBody
					 initialOpen={false}
				 title={__('Accordion Head', 'advanced-accordion-block')}
				 >
					 <p className="aab__label">
						 {__('Header Color', 'advanced-accordion-block')}
					 </p>
					 <ColorPalette
						 colors={colors}
						 value={headingColor}
						 onChange={(headingColor) =>
							 setAttributes({ headingColor })
						 }
					 />
					 <p className="aab__label">
						 {__('Header Background', 'advanced-accordion-block')}
					 </p>
					 <ColorPalette
						 colors={colors}
						 value={headerBg}
						 onChange={(headerBg) => setAttributes({ headerBg })}
					 />

				 </PanelBody>

				 <PanelBody
				 initialOpen={false}
				 title={__('Accordion Icon', 'advanced-accordion-block')}
				 >
					 { ! showIcon && <p>To change font size you must select Show Icon in settings tab.</p> }

					 {showIcon && (
						 <Fragment>
							 <RangeControl
								 label="Font Size"
								 value={iconFontSize}
								 onChange={(value) =>
									 setAttributes({ iconFontSize: value })
								 }
								 min={20}
								 max={50}
							 />

							 <p className="aab__label">
								 {__('Icon Color', 'advanced-accordion-block')}
							 </p>
							 <ColorPalette
								 colors={colors}
								 value={iconColor}
								 onChange={(iconColor) =>
									 setAttributes({ iconColor })
								 }
							 />
							 <p className="aab__label">
								 {__(
									 'Icon Background',
									 'advanced-accordion-block'
								 )}
							 </p>
							 <ColorPalette
								 colors={colors}
								 value={iconBackground}
								 onChange={(iconBackground) =>
									 setAttributes({ iconBackground })
								 }
							 />
						 </Fragment>
					 )}

				 </PanelBody>


				 <PanelBody
					 title={__('Accordion Body', 'advanced-accordion-block')}
					 initialOpen={false}
				 >
					 <p className="aab__label">
						 {__('Background Color', 'advanced-accordion-block')}
					 </p>
					 <ColorPalette
						 colors={colors}
						 value={bodyBg}
						 onChange={(bodyBg) => setAttributes({ bodyBg })}
					 />
				 </PanelBody>
				 
			</InspectorControls>

			
			<InspectorControls>
				<PanelBody
					initialOpen={false}
					title={__('Accordion ID', 'advanced-accordion-block')}
				>
					<TextControl
						label={__(
							'Set Accordion ID',
							'advanced-accordion-block'
						)}
						value={id}
						onChange={(id) => setAttributes({ id })}
					/>
				</PanelBody>
				<PanelBody
					initialOpen={false}
					title={__('Accordion Status', 'advanced-accordion-block')}
				>
					<ToggleControl
						label={__(
							'Make it Active on Load',
							'advanced-accordion-block'
						)}
						checked={makeActive}
						onChange={() =>
							setAttributes({ makeActive: !makeActive })
						}
					/>

					<ToggleControl
						label={__(
							'Make it a Disable Accordion?',
							'advanced-accordion-block'
						)}
						checked={disableAccordion}
						onChange={() =>
							setAttributes({
								disableAccordion: !disableAccordion,
							})
						}
						help={__(
							'No click event works. This feature is for the frontend only!',
							'advanced-accordion-block'
						)}
					/>
				</PanelBody>

				{useBlockProps().className.includes('is-style-qa') && (
					<>


				<PanelBody
				initialOpen={false}
				title={__('Q/A Icons', 'advanced-accordion-block')}
				>

					<p className="aab__label">
						{__('Q Icon Text', 'advanced-accordion-block')}
					</p>
					<TextControl
						label={__(
							'Set Q Icon Text',
							'advanced-accordion-block'
						)}
						value={qIconText}
						onChange={ (value) => setAttributes({ qIconText: value })}
					/>


					<p className="aab__label">
						{__('A Icon Text', 'advanced-accordion-block')}
					</p>
					<TextControl
						label={__(
							'Set A Icon Text',
							'advanced-accordion-block'
						)}
						value={aIconText}
						onChange={ (value) => setAttributes({ aIconText: value })}
					/>

				</PanelBody>

					</>
				)}

				<PanelBody
					initialOpen={false}
					title={__('Accordion Head', 'advanced-accordion-block')}
				>

					<SelectControl
						label={__(
							'Select Heading Tag',
							'advanced-accordion-block'
						)}
						options={tags}
						onChange={(headingTag) => setAttributes({ headingTag })}
						value={headingTag}
					/>
				</PanelBody>
				<PanelBody
					title={__('Anchor Link', 'advanced-accordion-block')}
					initialOpen={false}
					className={has_disabled_class}
				>
					<ToggleControl
						label={__(
							'Show Anchor Link',
							'advanced-accordion-block'
						)}
						disabled={is_disable}
						checked={anchor_link_checked}
						onChange={() =>
							setAttributes({ anchorLinkShow: !anchorLinkShow })
						}
					/>


					{anchorLinkShow &&  ! hasQaStyle && (

						<Fragment>
							<SelectControl
								label={__(
									'Anchor Icon Position',
									'advanced-accordion-block'
								)}
								disabled={is_disable}
								options={anchorPositions}
								onChange={(anchorPosition) =>
									setAttributes({
										anchorPosition,
									})
								}
								value={anchorPosition}
							/>
						</Fragment>
					)}
				</PanelBody>
				<PanelBody
					title={__('Accordion Icon', 'advanced-accordion-block')}
					initialOpen={false}
				>
					<ToggleControl
						label={__('Show Icon', 'advanced-accordion-block')}
						checked={showIcon}
						onChange={() => setAttributes({ showIcon: !showIcon })}
					/>
					{showIcon && (
						<Fragment>

							<SelectControl
								label={__(
									'Select Icon Type',
									'advanced-accordion-block'
								)}
								options={icons}
								onChange={(iconClass) => {
									setAttributes({ iconClass });
								}}
								value={iconClass}
							/>
							<SelectControl
								label={__(
									'Icon Position',
									'advanced-accordion-block'
								)}
								options={iconPositions}
								onChange={(iconPosition) => {
									setAttributes({ iconPosition });
								}}
								value={iconPosition}
							/>

						</Fragment>
					)}
				</PanelBody>

				<PanelBody
					title={__('Feedback', 'advanced-accordion-block')}
					initialOpen={false}
					className={has_disabled_class}
				>
					<ToggleControl
						label={__(
							'Enable / Disable',
							'advanced-accordion-block'
						)}
						disabled={is_disable}
						checked={voting_checked}
						onChange={() =>
							setAttributes({ feedbackShow: !feedbackShow })
						}
					/>
					{feedbackShow == 1 && (
						<Fragment>
							<TextControl
								label={__('Label', 'advanced-accordion-block')}
								disabled={is_disable}
								value={feedbacLabel}
								onChange={(feedbacLabel) =>
									setAttributes({ feedbacLabel })
								}
							/>
							<TextControl
								label={__('Yes', 'advanced-accordion-block')}
								disabled={is_disable}
								value={yesBtn}
								onChange={(yesBtn) => setAttributes({ yesBtn })}
								className="bbpc-control-half yes-btn"
							/>

							<TextControl
								label={__('No', 'advanced-accordion-block')}
								disabled={is_disable}
								value={noBtn}
								onChange={(noBtn) => setAttributes({ noBtn })}
								className="bbpc-control-half no-btn"
							/>
							<ToggleControl
								label={__(
									'Counter',
									'advanced-accordion-block'
								)}
								disabled={is_disable}
								checked={counter_checked}
								onChange={() =>
									setAttributes({ counterShow: !counterShow })
								}
							/>
							<TextControl
								label={__('ID', 'advanced-accordion-block')}
								value={uniqueKey}
								onChange={(uniqueKey) =>
									setAttributes({ uniqueKey })
								}
								disabled
							/>
						</Fragment>
					)}
				</PanelBody>

				<PanelBody
					initialOpen={false}
					title={__('FAQ Schema', 'advanced-accordion-block')}
				>
					<ToggleControl
						label={__(
							'Make it enable',
							'advanced-accordion-block'
						)}
						checked={faqSchema}
						onChange={() =>
							setAttributes({ faqSchema: !faqSchema })
						}
					/>


				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps({
					className:  `aab__accordion_container ${
						makeActive
							? `active__accordion_container_${uniqueId}`
							: ''
					} ${noProClass}`

				})}
				// style={{
				// 	border: `${border.width} ${border.style} ${border.color}`,
				// 	marginTop: `${margins.top}`,
				// 	marginBottom: `${margins.bottom}`,
				// 	margin: style.margin,
				// 	margin: '100px',
				// 	padding: '60px',
				// 	borderRadius: `${borderRadius}px`,
				// }}
				id={id !== '' ? id : ''}
				role="button"
				aria-expanded={makeActive}
				tabIndex="0"
			>
				<Fragment>
					<div
						tabIndex="0"
						className={`aab__accordion_head ${iconPosition} ${makeActive ? 'active' : ''} ` }
						style={{
							color: headingColor ? headingColor : '#333333',
							backgroundColor: headerBg
								? headerBg
								: 'transparent',
							// padding: `${paddings.top} ${paddings.left} ${paddings.bottom} ${paddings.right}`,
						}}
					>
						<div
							className={`aab__accordion_heading ${iconPosition} ${anchorPosition}`}
							tabIndex="0"
						>
							{hasQaStyle && aab_premium && (
							<div className="icon-container">
								<div className="icon-q"
								style={{
									color: qIconColor,
									backgroundColor: qIconBg
								}}
								>{ qIconText }</div>
								<div className="icon-a"

									 style={{
										 color: aIconColor,
										 backgroundColor: aIconBg,
									 }}>{ aIconText }</div>
							</div>
							)}

							<RichText
								tabIdex="0"
								tagName={headingTag}
								value={heading}
								className="aab__accordion_title"
								onChange={(heading) =>
									setAttributes({ heading })
								}
								style={{
									margin: 0,
									color: headingColor
										? headingColor
										: '#333333',
								}}
							/>
							{anchorLinkShow && aab_premium &&  (
								<a className="anchorjs-link" href="#">
									<i className="dashicons dashicons-admin-links"></i>
								</a>
							)}
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
									className={`aab__icon dashicons dashicons-${iconClass}`}
									style={{
										fontSize: iconFontSize
											? iconFontSize + 'px'
											: '',
									}}
								></span>
							</div>
						)}
					</div>
					{/* <div className="sub-heading-box">
							<RichText
								className="sub-heading"
								tagName="p"
								placeholder="Write some subheding"
								value={subheading}
								onChange={(value) => {
									setAttributes({ subheading: value });
								}}
							/>
						</div> */}
					<div
						tabIndex="0"
						className={`aab__accordion_body ${makeActive ? `aab__accordion_body--show` : ``}  ${
							makeActive ? `active__accordion_${uniqueId}` : ''
						}`}
						role="region"
						style={{
							backgroundColor: bodyBg ? bodyBg : 'transparent',
							// borderTop: `${border.width} ${border.style} ${border.color}`,
							// padding: `${paddings.top} ${paddings.right} ${paddings.bottom} ${paddings.left}`,
							display: makeActive ? 'block' : 'none',
						}}
					>
						<InnerBlocks
							allowedBlocks={true}
							template={[
								[
									'core/paragraph',
									{
										placeholder:
											'Write your content or add any block here...',
									},
								],
							]}
						/>
						{ feedbackShow == 1 && aab_premium && (
							<span className={'feedback-btn-wrap'}>
								{feedbacLabel && <span>{feedbacLabel}</span>}

								{yesBtn && (
									<button
										className="feedback-btn"
										data-value="yes"
									>
										{yesBtn}
										{counterShow && (
											<span className="count">--</span>
										)}
									</button>
								)}

								{noBtn && (
									<button
										className="feedback-btn"
										data-value="no"
									>
										{noBtn}
										{counterShow && (
											<span className="count">--</span>
										)}
									</button>
								)}
							</span>
						)}
					</div>
				</Fragment>
			</div>
		</Fragment>
	);
};

export default Edit;