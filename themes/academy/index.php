<?php
/**
 * The template for displaying all single posts and attachments
 * Blog page
 */

get_header(null, array(
    'page_class' => 'main_level_pages'
));
$post_ID = get_the_ID();

if (empty($all_post_meta) || empty($options)) {
    $all_post_meta = get_post_meta(get_queried_object_id());
    $options       = get_fields('options');
}

$is_blog = !is_front_page() && is_home();

if ($is_blog) {

    get_template_part( 'sections/blog-sections');

} else {
    if ( have_posts() ) {

        // Load posts loop.
        while ( have_posts() ) {
            the_post();
    
            the_content();
        }
    
    }
}?>

<?php get_footer(); ?>
