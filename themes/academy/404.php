<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

// $page_class = 'main_level_pages';

get_header(null, array(
    'page_class' => 'main_level_pages'
)); ?>

<div class="error-404-content">
    <div class="container">
        <div class="row inner">
            <div class="col-xs-12 col-start-md-2 col-end-md-7 wrap-text">
                <p class="caption">404</p>
                <p class="h3"><?php _e('Page not found!'); ?></p>
                <p><?php _e('We are sorry, the page you are looking for is no longer available. <br/>
                Use the button below to go to the home page'); ?></p>
                <a class="btn-main" href="<?php echo get_site_url(); ?>"><?php _e('Go home'); ?></a>
            </div>

            <div class="col-xs-12 col-md-4 wrap-icon">
                <img src="<?php echo get_template_directory_uri() . '/build/images/maze.svg'; ?>" alt="maze" />
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>
