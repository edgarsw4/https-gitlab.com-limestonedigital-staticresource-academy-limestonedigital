<?php
/**
 * Template name: Home page
 */

get_header();
if (empty($all_post_meta) || empty($options)) {
    $all_post_meta = get_post_meta( get_queried_object_id() );
    $all_meta = $all_post_meta;
    $options       = get_fields('options');
}
?>


<?php get_footer(); ?>
