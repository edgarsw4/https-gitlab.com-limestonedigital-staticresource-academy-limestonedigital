<?php
/**
 * The template for displaying 404 pages (not found)
 */
$text = __( 'It looks like nothing was found at this location. Maybe try a search?', 'twentytwentyone' );
$text = mb_substr($text, 0, mb_strpos($text, '.')+1);

get_header();
?>
<div class="error-404-content">
    <div class="container">
        <div class="row inner">
            <div class="col-xs-12 col-start-md-4 col-end-md-10">
                <div class="error-404 not-found default-max-width">
                    <div class="page-content">
                        <p class="h1 code">404</p>
                        <p class="h3"><?php echo $text; ?></p>
                        <br>
                        <br>
                        <a class="btn-main" href="<?php echo pll_home_url(); ?>"><?php _e('Home'); ?></a>
                    </div><!-- .page-content -->
                </div><!-- .error-404 -->
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>
