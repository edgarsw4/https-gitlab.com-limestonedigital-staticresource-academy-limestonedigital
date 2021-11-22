<?php
$courses = get_field('courses');
?>
<div id="courses" class="courses">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
             <?php
                if ( !empty($courses) ) {
                    echo '<div class="courses-carousel js-courses-carousel">';

                    foreach ($courses as $course) {
                        $item_upper_caption = $course['upper_caption'];
                        $item_title         = $course['course_title'];
                        $item_description   = $course['description'];
                        $item_button_text   = $course['button_text'];
                        $item_button_url    = get_permalink($course['course']);

                        echo '<div class="course-box-wrapper"><div class="course-box">';
                            echo '<p class="upper-caption">'.$item_upper_caption.'</p>';
                            echo '<p class="h4">'.do_shortcode($item_title).'</p>';
                            echo '<div class="description">'.do_shortcode($item_description).'</div>';

                            if ( !empty($item_button_url) && !empty($item_button_text) )
                            echo '<p><a class="btn-green"
                                        href="'.$item_button_url.'">
                                            '.$item_button_text.'
                                     </a>
                                  </p>';
                        echo '</div></div>';
                    }

                    echo '</div>';
                }
            ?>
            </div>
        </div>
    </div>
</div>
