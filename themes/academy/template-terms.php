<?php
/**
 *   Template name: Terms & PP page
 */

get_header();

if (empty($all_post_meta) || empty($options)) {
    $all_post_meta = get_post_meta(get_queried_object_id());
    $options       = get_fields('options');
}

$caption        = $all_post_meta['terms_caption'][0];
$description    = $all_post_meta['terms_caption_description'][0];
$list           = get_field('terma_list');

?>
<div class="terms-section section">
    <div class="container">
        <div class="row">
            <div class="col-xs-12
            col-start-sm-2 col-end-sm-12
            col-start-md-2 col-end-md-10
            terms-content-wrapper">
                <div class="terms-content">
                    <h1 class="h3"><?php echo do_shortcode($caption); ?></h1>

                    <p><?php echo do_shortcode($description); ?></p>

                    <?php foreach($list as $index => $term) {
                        echo '<h4 class="h4" id="'.$term['id'].'">'.(++$index).'. ' . do_shortcode($term['subcaption']) . '</h4>';
                        echo '<div>' . do_shortcode($term['description']) . '</div>';
                    } ?>
                </div>
            </div>

            <div class="col-xs-6
            col-start-sm-2 col-end-sm-5
            col-start-md-10 col-end-sm-12
            terms-navigation-wrapper">
                <div class="terms-navigation-outer">
                    <button aria-label="<?php _e('Open menu'); ?>" class="terms-menu-opener js-terms-menu-opener"></button>
                    <ul class="js-terms-page-navigation terms-navigation">
                        <?php foreach($list as $term) {
                            echo '<li><a class="terms-navigation-btn" href="#'.$term['id'].'">' . do_shortcode($term['subcaption']) . '</a></li>';
                        } ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>




<?php get_footer(); ?>
