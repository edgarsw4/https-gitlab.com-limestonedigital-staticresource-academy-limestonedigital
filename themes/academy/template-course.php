<?php
/**
 * Template name: Сourse page
 */

get_header();
if (empty($all_post_meta) || empty($options)) {
    $all_post_meta = get_post_meta( get_queried_object_id() );
    $all_meta = $all_post_meta;
    $options       = get_fields('options');
}

include( locate_template('sections/course-header.php', false, false ));

include( locate_template('sections/statistic.php', false, false ));

include( locate_template('sections/skills.php', false, false ));

include( locate_template('sections/learning.php', false, false ));

get_footer();
