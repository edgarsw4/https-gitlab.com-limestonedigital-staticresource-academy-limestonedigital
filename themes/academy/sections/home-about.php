<?php
/**
 *  Description section
 */
$caption     = $all_post_meta['description_caption'][0];
$text        = $all_post_meta['description_text'][0];
$photo       = $all_post_meta['description_author_photo'][0];
$photo_url   = wp_get_attachment_image_url( $photo,'full');
$name        = $all_post_meta['description_author_name'][0];
$position    = $all_post_meta['description_author_position'][0];
$author_text = $all_post_meta['description_author_text'][0];

if ( !empty($caption)) {
?>
<div class="home-about" id="about-us">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-md-6">
                <?php echo '<h2 class="h2">'.do_shortcode($caption).'</h2>'; ?>

                <div class="text">
                    <?php echo do_shortcode($text); ?>
                </div>

                <div class="quote">
                    <figure class="quote-figure">
                        <img src="<?php echo $photo_url; ?>" alt="Quote author" >
                    </figure>
                    <div class="quote-content">
                        <p class="quote-author h4">
                            <?php echo do_shortcode($name); ?>
                            <span class="quote-author-position label"><?php echo do_shortcode($position); ?></span>
                        </p>
                        <p class="quote-text"><?php echo do_shortcode($author_text); ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php
}