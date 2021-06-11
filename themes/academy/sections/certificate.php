<?php
$certificate_title = $all_post_meta['certificate_title'][0];
$certificate_description = $all_post_meta['certificate_description'][0];
$certificate_button_text = $all_post_meta['certificate_button_text'][0];
$certificate_button_link = $all_post_meta['certificate_button_link'][0];
$certificate_image = get_field('certificate_image');
?>
<section id="certificate" class="certificate">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-md-6 content-col">
                <h2 class="h2 title"><?php echo $certificate_title; ?></h2>
                <p class="description"><?php echo $certificate_description; ?></p>
                <a class="btn-main js-open-popup-activator" href="<?php echo $certificate_button_link; ?>"><?php echo $certificate_button_text; ?></a>
            </div>
            <div class="col-xs-12 col-md-6 img-col">
                <figure class="certificate-figure">
                    <img class="certificate-img" src="<?php echo $certificate_image['url']; ?>" alt="<?php _e('Winner'); ?>">
                </figure>
            </div>
        </div>
    </div>
</section>
