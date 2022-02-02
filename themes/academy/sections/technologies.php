<?php
$technologies_title = $all_post_meta['technologies_title'][0];
$technologies_icons = get_field('technologies_icons');
?>
<section id="technologies" class="technologies">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h2 class="h2 title"><?php echo $technologies_title; ?></h2>
            </div>
            <?php foreach($technologies_icons as $icon) { ?>
                <div class="col-xs-6 col-md-3">
                    <figure class="technology-figure">
                        <img class="technology-image" src="<?php echo $icon['url']?>" alt="<?php _e('Technology'); ?>">
                    </figure>
                </div>
            <?php } ?>
        </div>
    </div>
</section>
