<?php
$statistic = get_field('statistic');
?>
<section id="statistic" class="statistic">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="statistic-items">
                    <?php foreach($statistic as $item) { ?>
                        <div class="statistic-item">
                            <img class="statistic-icon" src="<?php echo $item['icon']['url']; ?>" alt="<?php _e('Statistic icon'); ?>">
                            <div class="statistic-content">
                                <p class="statistic-value"><?php echo $item['value']; ?></p>
                                <p class="statistic-description"><?php echo $item['description']; ?></p>
                            </div>
                        </div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div>
</section>
