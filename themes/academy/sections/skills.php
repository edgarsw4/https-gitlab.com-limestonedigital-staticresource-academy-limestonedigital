<?php
$skills_title = $all_post_meta['skills_title'][0];
$skills_description = $all_post_meta['skills_description'][0];
?>
<section id="skills" class="skills">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="skills-content">
                    <div class="circle-1"></div>
                    <div class="circle-2"></div>
                    <h2 class="h2 title"><?php echo $skills_title; ?></h2>
                    <p class="description"><?php echo $skills_description; ?></p>
                </div>
            </div>
        </div>
    </div>
</section>
