<?php
$learning_title = $all_post_meta['learning_title'][0];
$learning_items = get_field('learning_items');
?>
<section id="learning" class="learning">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="circle-3"></div>
                <h2 class="h2 title"><?php echo $learning_title; ?></h2>
                <?php
                    if ( !empty($learning_items) ) {
                        echo '<div class="stages-holder">';

                        foreach ( $learning_items as $index => $stage ) {
                            $subcaption  = $stage['title'];
                            $description = $stage['description'];

                            $icon     = $stage['icon'];
                            $icon_url = ( is_array($icon) ) ? $icon['url'] : '';

                            if ($index === 1) {
                                // this element should not be first or last child
                                // needed for mobile screens
                                echo '<div class="stage-point stage-point-final"></div>';
                                // this is needed to keep odd/even order
                                echo '<div style="display: none"></div>'; 
                            }
                            ?>
                            <div class="stage">
                                <figure class="stage-figure">
                                    <img class="stage-image" src="<?php echo $icon_url; ?>" alt="Stage icon">
                                </figure>

                                <div class="stage-info">
                                    <h3 class="h3">
                                        <?php echo do_shortcode($subcaption); ?>
                                    </h3>

                                    <div class="description">
                                        <?php echo do_shortcode($description); ?>
                                    </div>
                                </div>

                                <div class="stage-point"></div>
                                <div class="stage-line-hover"></div>
                            </div>
                            <?php
                        }

                        echo '</div>';
                    }
                ?>
            </div>
        </div>
    </div>
</section>
