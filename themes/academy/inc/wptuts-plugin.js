(function() {
	tinymce.create('tinymce.plugins.Wptuts', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {

			/****** container shortcode btn *******/
			ed.addButton('container', {
				title : 'Add bootstrap container shortcode',
				cmd : 'container',
				//image : url + '/moon.png'
				text: 'container'
			});

			ed.addCommand('container', function() {
				var selected_text = ed.selection.getContent();
				var return_text = '[container]' + selected_text + '[/container]';
				ed.execCommand('mceInsertContent', 0, return_text);
			});


			/****** row shortcode btn *******/
			ed.addButton('row', {
				title : 'Add bootstrap row shortcode',
				cmd : 'row',
				//image : url + '/moon.png'
				text: 'row'
			});

			ed.addCommand('row', function() {
				var selected_text = ed.selection.getContent();
				var return_text = '[row]' + selected_text + '[/row]';
				ed.execCommand('mceInsertContent', 0, return_text);
			});


			/****** row inner shortcode btn *******/
			ed.addButton('row_inner', {
				title : 'Add bootstrap row inner shortcode',
				cmd : 'row_inner',
				//image : url + '/moon.png'
				text: 'sub row'
			});

			ed.addCommand('row_inner', function() {
				var selected_text = ed.selection.getContent();
				var return_text = '[row_inner]' + selected_text + '[/row_inner]';
				ed.execCommand('mceInsertContent', 0, return_text);
			});


			/****** bs_column shortcode btn *******/
			ed.addButton('bs_column', {
				title : 'Add bootstrap column shortcode',
				cmd : 'bs_column',
				//image : url + '/moon.png'
				text: 'column'
			});

			ed.addCommand('bs_column', function() {
				var selected_text = ed.selection.getContent();
				var return_text = '[bs_column class="col-xs-12 ADD-YOUR-CLASS-HERE"]' + selected_text + '[/bs_column]';
				ed.execCommand('mceInsertContent', 0, return_text);
			});


			/****** bs_column_inner shortcode btn *******/
			ed.addButton('bs_column_inner', {
				title : 'Add bootstrap column shortcode inside other column',
				cmd : 'bs_column_inner',
				//image : url + '/moon.png'
				text: 'sub column'
			});

			ed.addCommand('bs_column_inner', function() {
				var selected_text = ed.selection.getContent();
				var return_text = '[bs_column_inner class="col-xs-12 ADD-YOUR-CLASS-HERE"]' + selected_text + '[/bs_column_inner]';
				ed.execCommand('mceInsertContent', 0, return_text);
			});


			/****** info_box shortcode btn *******/
			ed.addButton('info_box', {
				title : 'Add info_box shortcode',
				cmd : 'info_box',
				//image : url + '/moon.png'
				text: 'info_box'
			});

			ed.addCommand('info_box', function() {
				var selected_text = ed.selection.getContent();
				var return_text = '[info_box class="ADD-YOUR-CLASS-HERE"]' + selected_text + '[/info_box]';
				ed.execCommand('mceInsertContent', 0, return_text);
			});


			/****** info_box_inner shortcode btn *******/
			ed.addButton('info_box_inner', {
				title : 'Add info box shortcode inside other one',
				cmd : 'info_box_inner',
				text: 'sub info_box'
			});

			ed.addCommand('info_box_inner', function() {
				var selected_text = ed.selection.getContent();
				var return_text = '[info_box_inner class="ADD-YOUR-CLASS-HERE"]' + selected_text + '[/info_box_inner]';
				ed.execCommand('mceInsertContent', 0, return_text);
			});



			/****** orange btn shortcode *******/
			/*ed.addButton('orange_button', {
				title : 'Add orange button shortcode',
				cmd : 'orange_button',
				//image : url + '/moon.png'
				text: 'orange button'
			});

			ed.addCommand('orange_button', function() {
				var url = prompt("Please add link to button");
					btn_text = prompt("Please add text to button");

				if (url !== null) {
					var return_text = '<a class="btn-big-orange" href="'+url+'">'+btn_text+'</a>';
					ed.execCommand('mceInsertContent', 0, return_text);
				}
			});*/

			/*************/



			// ed.addCommand('showrecent', function() {
			// 	var number = prompt("How many posts you want to show ? "),
			// 		shortcode;
			// 	if (number !== null) {
			// 		number = parseInt(number);
			// 		if (number > 0 && number <= 20) {
			// 			shortcode = '[recent-post number="' + number + '"/]';
			// 			ed.execCommand('mceInsertContent', 0, shortcode);
			// 		}
			// 		else {
			// 			alert("The number value is invalid. It should be from 0 to 20.");
			// 		}
			// 	}
			// });
		},

		/**
		 * Creates control instances based in the incomming name. This method is normally not
		 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
		 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
		 * method can be used to create those.
		 *
		 * @param {String} n Name of the control to create.
		 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
		 * @return {tinymce.ui.Control} New control instance or null if no control was created.
		 */
		createControl : function(n, cm) {
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'Wptuts Buttons',
				author : 'Lee',
				authorurl : 'http://wp.tutsplus.com/author/leepham',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/example',
				version : "0.1"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add( 'wptuts', tinymce.plugins.Wptuts );
})();