<?php
$program_title = $all_post_meta['program_title'][0];
$program_modules = get_field('program_modules');
?>
<section id="program" class="program">
    <div class="container">
        <div class="row">
            <div class="gradient-3"></div>
            <div class="gradient-4"></div>
            <div class="col-xs-12 col-start-md-2 col-end-md-7">
                <h2 class="h2 title" data-sticky><?php echo $program_title; ?></h2>
            </div>
            <div class="col-xs-12 col-start-md-7 col-end-md-12">
                <?php foreach($program_modules as $module) { ?>
                    <div class="module">
                        <h3 class="module-title h3"><?php echo $module['title']; ?></h3>
                        <h4 class="module-subtitle h4"><?php echo $module['subtitle']; ?></h4>
                        <ul class="module-items">
                            <?php foreach($module['items'] as $item) { ?>
                                <li class="module-item"><?php echo escape_dashes($item['text']); ?></li>
                            <?php } ?>
                        </ul>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
</section>
