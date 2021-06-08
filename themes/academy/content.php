<?php
/**
 * The default template for displaying content
 *
 * Used for both single and index/archive/search.
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php
		/* translators: %s: Name of current post */
		the_content( sprintf(
			__( 'Continue reading %s', 'ld_academy' ),
			the_title( '<span class="screen-reader-text">', '</span>', false )
		) );
	?>
</article><!-- #post-## -->
