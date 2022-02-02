<?php
$home_header_title = $all_post_meta['home_header_title'][0];
$home_header_description = $all_post_meta['home_header_description'][0];
$home_header_image = get_field('home_header_image');
?>
<section id="home-header" class="home-header first-section">
    <div class="home-gradient"></div>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-md-6">
                <h1 class="h1 title"><?php echo $home_header_title; ?></h1>
                <p class="description"><?php echo $home_header_description; ?></p>
            </div>
            <div class="col-xs-12 col-md-6 img-col">
                <figure class="first-section-figure">
                    <img class="first-section-img" src="<?php echo $home_header_image['url']; ?>" alt="<?php _e('Illustration'); ?>">
                </figure>
            </div>
        </div>
    </div>
</section>
