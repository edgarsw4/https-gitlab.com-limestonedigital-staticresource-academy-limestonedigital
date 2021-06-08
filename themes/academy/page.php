<?php
/**
 * The template for displaying pages
 *
 */
get_header();
?>

<div class="page-content">
<div class="container">
<div class="row">
<div class="col-xs-12">
    <div class="main-content-part">
        <?php
        if ( have_posts() ) :
            // Start the loop.
            while ( have_posts() ) : the_post();

                the_content();

            endwhile;
        endif;

        do_action('corppix_after_page_content');
        ?>
    </div>
</div>
</div>
</div>
</div>

<?php get_footer(); ?>
