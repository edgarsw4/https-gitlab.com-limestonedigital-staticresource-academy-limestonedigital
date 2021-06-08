<?php

add_action( 'init', 'wptuts_buttons' );
function wptuts_buttons() {
	add_filter( "mce_external_plugins", "wptuts_add_buttons" );
	add_filter( 'mce_buttons', 'wptuts_register_buttons' );
}
function wptuts_add_buttons( $plugin_array ) {
	$plugin_array['wptuts'] = get_template_directory_uri() . '/inc/wptuts-plugin.js';
	return $plugin_array;
}
function wptuts_register_buttons( $buttons ) {
	array_push(
		$buttons,
		'container',
		'row',
		'row_inner',
		'bs_column',
		'bs_column_inner',
		'info_box',
		'info_box_inner'
		//'orange_button'
	); // dropcap', 'recentposts
	return $buttons;
}

?>