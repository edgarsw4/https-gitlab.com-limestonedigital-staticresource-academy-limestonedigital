<?php get_header(); ?>

<div class="container">
<div class="row">
<div class="col-xs-12">
<div class="content-inner">


<?php

if ( have_posts() ) :
    // Start the loop.
    while ( have_posts() ) : the_post(); ?>

        <div class="wrap-post">
                <?php
                $attachment_url = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' );
                $url = $attachment_url['0'];
                $image_crop = aq_resize($url, 330, 200, true);
                if (!$image_crop) $image_crop = $url;
                ?>
                <div class="wrap-img">
                    <figure><img src="<?php echo $image_crop; ?>" alt="thumb"></figure>
                </div>

                <p class="post-caption"><a href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a></p>
                <p class="post-date"><?php echo get_the_date('d F Y'); ?></p>

                <div class="excerpt">
                    <?php
                    $excerpt = strip_tags(get_the_excerpt());
                    $content = strip_tags(get_the_content());

                    if ( has_excerpt() ) {
                        echo $corppix->px_string_limit_words($excerpt,28).'...';
                    } else {
                        echo $corppix->px_string_limit_words($content,28).'...';
                    }
                    ?>
                    <a href="<?php echo get_permalink(); ?>" class="coverFull"></a>
                </div>
            </div>
        </div>

        <?php
        // End the loop.
    endwhile;

// If no content, include the "No posts found" template.
else :
    get_template_part( 'content', 'none' );
endif;

echo '<div class="clear"></div>';

// Previous/next page navigation.
the_posts_pagination( array(
    'prev_text'          => __( 'Prev', 'twentyfifteen' ),
    'next_text'          => __( 'Next', 'twentyfifteen' ),
    'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'twentyfifteen' ) . ' </span>',
) );
?>


</div>
</div>
</div>
</div>

<?php get_footer(); ?>
