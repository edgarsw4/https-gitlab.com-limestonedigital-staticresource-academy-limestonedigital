<?php
$faq_title = $all_post_meta['faq_title'][0];
$ticks_list = get_field('ticks_list');
if (!empty($ticks_list)) {
?>
<section id="faq" class="faq">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h2 class="h2 title"><?php echo $faq_title; ?></h2>

                <ul class="ticks-list">
                    <?php foreach($ticks_list as $key => $tick_item) {
                        $class = '';
                        if (!empty($tick_item['desсription'])) {
                            $class = " expandable";

                            if ($key === 0) {
                                $class .= " active";
                            }
                        }?>
                        <li class="tick<?php echo $class;?>">
                            <div class="tick-sign-bg"></div>

                            <p class="tick-text"><?php echo do_shortcode($tick_item['tick']); ?></p>

                            <?php if (!empty($tick_item['desсription'])) { ?>
                                <p class="tick-description"><?php echo do_shortcode($tick_item['desсription']); ?></p>
                            <?php } ?>
                        </li>
                    <?php } ?>
                </ul>
            </div>
        </div>
    </div>
</section>
<?php
}
