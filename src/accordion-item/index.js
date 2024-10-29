import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import metadata from './block.json';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';

/**
 * Block Registration
 */

registerBlockType(metadata, {
	icon: {
		src: 'minus',
		foreground: '#77b5f7',
	},
	usesContext: [ "aagb/accordion-hasQaStyle", "aagb/accordion-faqSchema", "aagb/accordion-step", "aagb/accordion-stepText", "aagb/accordion-checkList", "aagb/accordion-anchorLinksShow", "aagb/accordion-buttonShow", "aagb/accordion-readMoreText" ],
	edit: Edit,
	save: Save,
});

