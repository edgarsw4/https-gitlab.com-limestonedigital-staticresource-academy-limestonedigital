<?php

// Add Quicktags
function custom_quicktags() {
	
	if ( wp_script_is( 'quicktags' ) ) {
		?>
		<script type="text/javascript">
			QTags.addButton( 'container_shortcode', 'container', '[container]', '[/container]', '', 'container shortcode', 1 );
			QTags.addButton( 'row_shortcode', 'row', '[row]', '[/row]', '', 'row shortcode', 1 );
			QTags.addButton( 'row_inner', 'row_inner', '[row_inner]', '[/row_inner]', '', 'row_inner shortcode', 1 );
			QTags.addButton( 'bs_column', 'bs_column', '[bs_column class="col-xs-12 clearfix"]', '[/bs_column]', '', 'bs_column shortcode', 1 );
			QTags.addButton( 'bs_column_inner', 'bs_column_inner', '[bs_column_inner class="col-xs-12 clearfix"]', '[/bs_column_inner]', '', 'bs_column_inner shortcode', 1 );
			QTags.addButton( 'info_box', 'info_box', '[info_box class=""]', '[/info_box]', '', 'info_box shortcode', 1 );
			QTags.addButton( 'info_box_inner', 'info_box_inner', '[info_box_inner class=""]', '[/info_box_inner]', '', 'info_box_inner shortcode', 1 );
			QTags.addButton( 'just_wrapper', 'just_wrapper', '[just_wrapper class=""]', '[/just_wrapper]', '', 'just_wrapper shortcode', 1 );
			QTags.addButton( 'just_wrapper_inner', 'just_wrapper_inner', '[just_wrapper_inner class=""]', '[/just_wrapper_inner]', '', 'just_wrapper_inner shortcode', 1 );
			QTags.addButton( 'just_link', 'just_link', '[just_link class="" href=""]', '[/just_link]', '', 'just_link shortcode', 1 );
			QTags.addButton( 'custom_menu', 'custom_menu', '[custom_menu class="" menu_name=""]', '[/custom_menu]', '', 'custom_menu shortcode', 1 );
			QTags.addButton( 'custom_widget', 'custom_widget', '[custom_widget widget_name=""]', '[/custom_widget]', '', 'custom_widget shortcode', 1 );
			QTags.addButton( 'photo_list', 'photo_list', '[photo_list class="" thumb_width="" thumb_height=""]', '[/photo_list]', '', 'photo_list shortcode', 1 );
			QTags.addButton( 'br', 'br', '[br]', '', '', 'br shortcode', 1 );
			QTags.addButton( 'p', 'p', '<p class="">', '</p>', '', 'p shortcode', 1 );
			QTags.addButton( 'h1', 'h1', '<h1 class="">', '</h1>', '', 'h1 shortcode', 1 );
			QTags.addButton( 'h2', 'h2', '<h2 class="">', '</h2>', '', 'h2 shortcode', 1 );
			QTags.addButton( 'h3', 'h3', '<h3 class="">', '</h3>', '', 'h3 shortcode', 1 );
			QTags.addButton( 'h4', 'h4', '<h4 class="">', '</h4>', '', 'h4 shortcode', 1 );
			QTags.addButton( 'h5', 'h5', '<h5 class="">', '</h5>', '', 'h5 shortcode', 1 );
			QTags.addButton( 'h6', 'h6', '<h6 class="">', '</h6>', '', 'h6 shortcode', 1 );
			QTags.addButton( 'spacer_big', 'spacer_big', '[spacer_big]', '', '', 'spacer_big shortcode', 1 );
			QTags.addButton( 'spacer_small', 'spacer_small', '[spacer_small]', '', '', 'spacer_small shortcode', 1 );
			QTags.addButton( 'spacer_super_small', 'spacer_super_small', '[spacer_super_small]', '', '', 'spacer_super_small shortcode', 1 );
			QTags.addButton( 'current_year', 'current_year', '[current_year]', '', '', 'current_year shortcode', 1 );
			QTags.addButton( 'admin_notes', 'admin_notes', '[admin_notes]', '[/admin_notes]', '', 'admin_notes shortcode', 1 );
			QTags.addButton( 'only_for_mobile', 'only_for_mobile', '[only_for_mobile]', '[/only_for_mobile]', '', 'only_for_mobile shortcode', 1 );
			QTags.addButton( 'only_for_desktop', 'only_for_desktop', '[only_for_desktop]', '[/only_for_desktop]', '', 'only_for_desktop shortcode', 1 );
			QTags.addButton( 'logged_user', 'logged_user', '[logged_user]', '[/logged_user]', '', 'logged_user shortcode', 1 );
			QTags.addButton( 'logout_user', 'logout_user', '[logout_user]', '[/logout_user]', '', 'logout_user shortcode', 1 );
			QTags.addButton( 'woo_cart_overview', 'woo_cart_overview', '[woo_cart_overview cart_url=""]', '[/woo_cart_overview]', '', 'woo_cart_overview shortcode', 1 );
		</script>
		<?php
	}
	
}
add_action( 'admin_print_footer_scripts', 'custom_quicktags' );





?>