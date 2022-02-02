<?php
$teacher_title = $all_post_meta['teacher_title'][0];
$teacher_subtitle = $all_post_meta['teacher_subtitle'][0];
$teacher_description = $all_post_meta['teacher_description'][0];
$teacher_image = get_field('teacher_image');
?>
<section id="teacher" class="teacher">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-md-5 img-col">
                <figure class="teacher-figure">
                    <img class="teacher-img" src="<?php echo $teacher_image['url']; ?>" alt="<?php _e('Photo'); ?>">
                </figure>
            </div>

            <div class="col-xs-12 col-md-6 content-col">
                <h2 class="h2 title"><?php echo $teacher_title; ?></h2>

                <h4 class="h4 subtitle"><?php echo $teacher_subtitle; ?></h4>

                <p class="description"><?php echo $teacher_description; ?></p>
            </div>
        </div>
    </div>
</section>
