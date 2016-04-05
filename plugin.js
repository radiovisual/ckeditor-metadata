/* global CKEDITOR  */
/* eslint-disable new-cap */

CKEDITOR.plugins.add('metadata', {
	// Important: icon file must match the button name, in lowercase
	icons: 'metadata',
	init: function (editor) {
		editor.addCommand('metadata', new CKEDITOR.dialogCommand('metadataDialog'));

		// Tell the editor to load the dialog when the button is clicked.
		CKEDITOR.dialog.add('metadataDialog', this.path + 'dialogs/metadata.js');

		if (editor.contextMenu) {
			editor.addMenuGroup('metadataGroup');
			editor.addMenuItem('metadataItem', {
				label: 'Edit Metadata',
				icon: this.path + 'icons/metadata.png',
				command: 'metadata',
				group: 'metadataGroup'
			});

			editor.contextMenu.addListener(function (element) {
				var div = element.getAscendant('div', true);
				var isIFrameWrapper = div ? div.hasClass('iframe-insulator') : null;
				var img = element.getAscendant('img', true);

				if ((div && isIFrameWrapper) || img) {
					return {metadataItem: CKEDITOR.TRISTATE_OFF};
				}
				return false;
			});
		}
	}
});

// IMPORTANT!
// Remember to add your new plugin to the ckeditor configuration with:
// config.extraPlugins = 'metadata';

// Because we are creating content:
// config.allowedContent = true;

