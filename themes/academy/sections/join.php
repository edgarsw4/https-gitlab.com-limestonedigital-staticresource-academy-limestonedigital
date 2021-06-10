<?php
$join_title = $all_post_meta['join_title'][0];
$join_form = $all_post_meta['join_form'][0];
?>
<section id="join" class="join">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-start-md-3 col-end-md-11">
                <div class="join-form-wrapper">
                    <h2 class="h2 title"><?php echo $join_title; ?></h2>

                    <?php echo do_shortcode($join_form); ?>
                </div>
            </div>
        </div>
    </div>
</section>
