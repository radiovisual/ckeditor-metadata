/* global CKEDITOR  */

CKEDITOR.dialog.add('metadataDialog', function (editor) {
	return {
		title: 'Metadata Properties',
		minWidth: 400,
		minHeight: 200,

		contents: [{
			id: 'tab-basic',
			label: 'Basic Settings',
			elements: [{
				type: 'text',
				id: 'caption',
				label: 'Caption',
				setup: function (element) {
					this.setValue(element.getAttribute('data-caption') || '');
				},
				commit: function (element) {
					element.setText(this.getValue());
				}
			}, {
				type: 'text',
				id: 'credit',
				label: 'Credit',
				setup: function (element) {
					this.setValue(element.getAttribute('data-credit') || '');
				},
				commit: function (element) {
					element.setText(this.getValue());
				}
			}]
		}, {
			id: 'tab-social',
			label: 'Social Media',
			elements: [{
				type: 'text',
				id: 'tweetText',
				label: 'Tweet Text',
				setup: function (element) {
					this.setValue(element.getAttribute('data-tweet') || '');
				},
				commit: function (element) {
					element.setText(this.getValue());
				}
			}, {
				type: 'text',
				id: 'facebookText',
				label: 'Facebook Text',
				setup: function (element) {
					this.setValue(element.getAttribute('data-facebook') || '');
				},
				commit: function (element) {
					element.setText(this.getValue());
				}
			}]
		}],
		onShow: function () {
			// The code that will be executed when a dialog window is loaded.
			var selection = editor.getSelection();

			var element = selection.getStartElement();

			// save a copy of the root element in case we need to reference it.
			// For example, in case this element is a fakeAudio element and we
			// want to update the 'data-cke-realelement'
			this.rootElement = element;

			this.isIframe = false;
			this.isFakeAudio = false;

			if (element) {
				var div = element.getAscendant('div', true);
				var img = element.getAscendant('img', true);
				var isIFrameInsulator = div ? div.hasClass('iframe-insulator') : null;

				if (div && isIFrameInsulator) {
					// assign the containing iframe to the element
					// because that is where the metadata is stored
					// NOTE: Accessing via $ seems hacky. Is there a better way?
					element = div.$.firstElementChild;
					this.isIframe = true;
				} else if (img) {
					// is this a cke_audio image?
					if (img.hasClass('cke_audio')) {
						var decoded = decodeURIComponent(img.data('cke-realelement'));
						element = CKEDITOR.dom.element.createFromHtml(decoded);
						this.isFakeAudio = true;
					} else {
						// just a regular image
						element = img;
					}
				}
			}
			// So we can access the element in onOK
			this.element = element;

			// Call the setup function on all the contents.elements fields
			this.setupContent(element);
		},
		onOk: function () {
			var dialog = this;

			var attributes = {
				caption: dialog.getValueOf('tab-basic', 'caption'),
				credit: dialog.getValueOf('tab-basic', 'credit'),
				tweet: dialog.getValueOf('tab-social', 'tweetText'),
				facebook: dialog.getValueOf('tab-social', 'facebookText')
			};

			this.element.setAttribute('data-caption', attributes.caption);
			this.element.setAttribute('data-credit', attributes.credit);
			this.element.setAttribute('data-tweet', attributes.tweet);
			this.element.setAttribute('data-facebook', attributes.facebook);

			// if this was a fakeAudio object, then you need to replace the
			// 'data-cke-realelement' attribute with encoded data
			if (this.isFakeAudio) {
				var encoded = encodeURIComponent(this.element.getOuterHtml());
				this.rootElement.setAttribute('data-cke-realelement', encoded);
			}
		}
	};
});
