<?php
$about_title = $all_post_meta['about_title'][0];
$about_items = get_field('about_items');
$about_image = get_field('about_image');
?>
<section id="about-us" class="about">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-md-9 content-col">
                <h2 class="h2 title"><?php echo $about_title; ?></h2>

                <ul class="about-items">
                    <?php foreach($about_items as $item) { ?>
                        <li class="about-item"><?php echo $item['text']; ?></li>
                    <?php } ?>
                </ul>
            </div>
            <div class="col-xs-12 col-md-3 img-col">
                <figure class="about-figure">
                    <img class="about-img" src="<?php echo $about_image['url']; ?>" alt="<?php _e('Clutch'); ?>">
                </figure>
            </div>
        </div>
    </div>
</section>
