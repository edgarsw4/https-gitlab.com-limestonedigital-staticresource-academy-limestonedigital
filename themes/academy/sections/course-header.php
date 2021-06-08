<?php
$course_header_title = $all_post_meta['course_header_title'][0];
$course_header_description = $all_post_meta['course_header_description'][0];
$course_header_button_text = $all_post_meta['course_header_button_text'][0];
$course_header_button_link = $all_post_meta['course_header_button_link'][0];
$course_header_image = get_field('course_header_image');
?>
<section id="course-header" class="course-header first-section">
    <div class="container">
        <div class="row">
            <div class="gradient-1"></div>
            <div class="gradient-2"></div>
            <div class="col-xs-12 col-md-7">
                <h1 class="h1 title"><?php echo $course_header_title; ?></h1>
                <p class="description"><?php echo $course_header_description; ?></p>
                <a class="btn-main" href="<?php echo $course_header_button_link; ?>"><?php echo $course_header_button_text; ?></a>
            </div>
            <div class="col-xs-12 col-md-5 img-col">
                <figure class="first-section-figure">
                    <img class="first-section-img" src="<?php echo $course_header_image['url']; ?>" alt="<?php _e('Illustration'); ?>">
                </figure>
            </div>
        </div>
    </div>
</section>
