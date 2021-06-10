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

include( locate_template('sections/program.php', false, false ));

include( locate_template('sections/technologies.php', false, false ));

include( locate_template('sections/certificate.php', false, false ));

include( locate_template('sections/about.php', false, false ));

include( locate_template('sections/teacher.php', false, false ));

include( locate_template('sections/join.php', false, false ));

include( locate_template('sections/faq.php', false, false ));

get_footer();
