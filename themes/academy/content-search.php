<?php
/**
 * The template part for displaying results in search pages
 *
 */

$postID = get_the_id();

?>

<article class="archive-post-item flex-box clearfix">
    <?php
    if (has_post_thumbnail()) {
        echo '<a class="wrapThumb" href="'.get_permalink().'">';
        the_post_thumbnail(array(250, 250));
        echo '</a>';
    } else {
        echo '<a class="wrapThumb" href="'.get_permalink().'"></a>';
    }
    ?>

    <div class="wrapInfo">
        <h3><?php the_title(); ?></h3>
        <div class="post-meta flex-box">
            <p><i class="fa fa-clock-o"></i> <?php echo get_the_date('d.m.Y'); ?></p>
            <p>
                <i class="fa fa-tag"></i>
                <?php
                $categories = get_the_category();
                if ( ! empty( $categories ) ) {
                    echo '<a href="' . esc_url( get_category_link( $categories[0]->term_id ) ) . '">' . esc_html( $categories[0]->name ) . '</a>';
                }
                ?>
            <p>
        </div>

        <div class="excerpt">
            <?php
            $excerpt = get_the_excerpt();
            if (has_excerpt()) echo $excerpt;
            ?>
        </div>

        <div class="wrapMore">
            <a href="<?php echo get_permalink(); ?>" class="readmore">
                <?php _e('Read more', 'ld_academy'); ?>
            </a>
        </div>
    </div>
</article>
