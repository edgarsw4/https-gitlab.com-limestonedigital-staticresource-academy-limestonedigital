<?php
/**
 * The template for displaying all single posts and attachments
 */

get_header(null, array(
    'page_class' => 'main_level_pages'
));
$post_ID = get_the_ID();
?>

<div class="container single-container">
    <?php
    if ( have_posts() ) :
        while ( have_posts() ) : the_post();
        $img = get_the_post_thumbnail_url(null, 'full');
        ?>
        <div class="row">
            <div class="col-xs-12 col-md-9">
                <?php the_title( '<h1 class="h2 post-title">', '</h1>' ); ?>

                <div class="post-info">
                    <?php
                    $posttags = get_the_tags();

                    if ($posttags) {
                        $tags = array();

                        foreach ($posttags as $tag) {
                            $tags[] = $tag->name;
                        }

                        echo implode(',', $tags);
                    }

                    $read_info = get_field('read_info');

                    if (!empty($read_info)) {
                        echo ' - ' . $read_info;
                    }
                    ?>
                </div>
            </div>
            <div class="col-xs-12 col-md-3"></div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-md-9 content-column">

                <?php if (!empty($img)) { ?>
                    <img class="post-image" src="<?php echo $img ?>" alt="<?php _e('Post image'); ?>">
                <?php } ?>

                <?php the_content(); ?>

                <?php
                $output = '';
                $content_banners = get_the_terms($post, 'banner');
                ob_start();

                if (!empty($content_banners)) {
                    foreach($content_banners as $banner) {
                        $fields = get_fields($banner);
                
                        if ($fields['banner_type'] === "content") {
                        ?>
                            <a href="<?php echo $fields['banner_link']; ?>" class="content-banner">
                                <figure class="content-banner-figure">
                                    <img class="content-banner-img content-banner-img-hd" src="<?php echo $fields['banner_image_hd']['url']; ?>">
                                    <img class="content-banner-img content-banner-img-desktop" src="<?php echo $fields['banner_image_desktop']['url']; ?>">
                                    <img class="content-banner-img content-banner-img-tablet" src="<?php echo $fields['banner_image_tablet']['url']; ?>">
                                    <img class="content-banner-img content-banner-img-mobile" src="<?php echo $fields['banner_image_mobile']['url']; ?>">
                                </figure>
                            </a>
                        <?php 
                        }
                    }
                }

                $output .= ob_get_clean();

                if (!empty($output)) {
                    echo '<div class="content-banners">'.$output.'</div>';
                }
                ?>
                
            </div>
            <div class="col-xs-12 col-md-3 sidebar-column">
                <?php if ($post->post_type === 'post') { ?>
                    <?php get_template_part( 'parts/banners-sidebar'); ?>
                <?php } ?>
            </div>
        </div>
        <?php endwhile;
    endif;
    ?>
</div>

<?php get_footer(); ?>
