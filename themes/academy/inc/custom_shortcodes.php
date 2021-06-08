<?php

/*
 *  recent_posts SHORTCODE
 */
if ( !function_exists('shortcode_recent_posts') ) {


	function shortcode_recent_posts($atts, $content = null) {

			extract(shortcode_atts(array(
					'id' => '',
					'type' => 'post',
					'category' => '',
					'num' => '5',
					'thumb' => 'true',
					'thumb_width' => '120',
					'thumb_height' => '120',
					'more_text_single' => '',
					'excerpt_count' => '0',
					'custom_class' => '',
					'custom_class_item' => ''
			), $atts));

			$id_text = ( !empty($id) ) ? 'id="'.$id.'"' : '';

			$output = '<div '.$id_text.' class="recent-posts '.$custom_class.' '.$type.'-items">';

			$output .= '<div class="container"><div class="news_wrap">';
			global $post;
            $corppix = new Corppix();


			$args = array(
                'post_type' => $type,
                'category_name' => $category,
                'numberposts' => $num,
                'orderby' => 'post_date',
                'order' => 'DESC'
            );


			$latest = get_posts($args);

			$iii = 0;
            ob_start();

			foreach($latest as $post) {
                setup_postdata($post);
                $excerpt = get_the_excerpt($post->ID);
                $attachment_url = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' );
                $url = $attachment_url['0'];

                $detect = new Mobile_Detect;
                if ( $detect->isMobile() && !$detect->isTablet() ) {
                    $image = aq_resize($url, 750);
                }
                else {
                    $image = aq_resize($url, $thumb_width, $thumb_height, true);
                }

                if (!$image) $image = $url;

                ?>

                <div class="item <?php echo $custom_class_item; ?>">

                    <?php if ($thumb === 'true' && has_post_thumbnail($post->ID) ) { ?>
                        <figure class="featured-thumbnail">
                            <a href="<?php echo get_permalink($post->ID); ?>">
                                <img  src="<?php echo $image; ?>" alt="thumb" />
                            </a>
                        </figure>
                    <?php } ?>

                    <div class="wrapInfo">
                        <p class="title">Forbes:</p>
                        <p class="date"><?php echo get_the_date('F d, Y') ?></p>
                        <p class="sub_title"><?php echo get_the_title($post->ID); ?></p>
                        <p><?php echo $corppix->px_string_limit_words($excerpt,$excerpt_count) ?></p>
                        <a href="<?php echo get_permalink($post->ID); ?>" class="read-more">
                            <?php _e('read more'); ?> >
                        </a>
                    </div>

                </div>
                <?php

                if ( ++$iii === 2 ) {
                    echo '<div class="news_item name_block"><h3>'.__("news").'</h3></div>';
                }
			}

			$output .= ob_get_clean();
			$output .= '</div>';
			$output .= '</div>';
			$output .= '</div>';

			wp_reset_query();
			return $output;

	}

	add_shortcode('recent_posts', 'shortcode_recent_posts');

}


/*
 *  latest_cases_carousel SHORTCODE
 */
if ( !function_exists('shortcode_latest_cases_carousel') ) {
	function shortcode_latest_cases_carousel($atts, $content = null) {

        extract(shortcode_atts(array(
            'id' => '',
            'type' => 'post',
            'category' => '',
            'items_to_show' => '5',
            'all_cases_btn_link' => '',
            'all_cases_btn_text' => '',
			'cases_service' => '',
			'cases_industry' => '',
        ), $atts));

        $id_text = ( !empty($id) ) ? 'id="'.$id.'"' : '';

        $output = '<div '.$id_text.' class="recent-carousel js-recent-carousel">';

        global $post;
        $corppix = new Corppix();

         $args = array(
            'post_type' => 'cases',
            'category_name' => $category,
            'numberposts' => $items_to_show,
            'orderby' => 'post_date',
            'order' => 'DESC'
        );

		if (!empty($cases_service)) {
			$args['tax_query'] = array(
				array(
					'taxonomy' => 'cases_service',
					'field' => 'slug',
					'terms' => $cases_service
				)
			);
		}

		if (!empty($cases_industry)) {
			$args['tax_query'] = array(
				array(
					'taxonomy' => 'cases_industry',
					'field' => 'slug',
					'terms' => $cases_industry
				)
			);
		}

        $latest = get_posts($args);

        ob_start();

        foreach($latest as $post) {
            // setup_postdata($post);
            // $excerpt = get_the_excerpt($post->ID);
            // $attachment_url = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' );
            // $url = $attachment_url['0'];

            // $detect = new Mobile_Detect;
            // if ( $detect->isMobile() && !$detect->isTablet() ) {
            //     $image = aq_resize($url, 750);
            // }
            // else {
            //     $image = aq_resize($url, 560, '', true);
            // }

            // if (!$image) $image = $url;

            include( locate_template('parts/recent-projects-items.php', false, false ));

			// include( locate_template('parts/cases-card.php', false, false ) );
        }
        wp_reset_query();


        echo '</div>';

        if ( !empty($all_cases_btn_link) && !empty($all_cases_btn_text) ) {
            echo '<a href="'.$all_cases_btn_link.'" class="btn-main">'.$all_cases_btn_text.'</a>';
        }

        $output .= ob_get_clean();
        return $output;

	}
	add_shortcode('latest_cases_carousel', 'shortcode_latest_cases_carousel');
}



/*
 *  carousel_post_type SHORTCODE
 */

if ( !function_exists('carousel_post_type') ) {


	function shortcode_carousel_post_type($atts, $content = null) {

			extract(shortcode_atts(array(
					'type' => 'post',
					'category' => '',
					'num' => '5',
					'thumb' => 'true',
					'thumb_width' => '120',
					'thumb_height' => '120',
					'more_text_single' => '',
					'excerpt_count' => '0',
					'custom_class' => '',
					'custom_class_item' => ''
			), $atts));

			$output = '<div class="owl-recent-posts owl-carousel '.$custom_class.'">';

			global $post;
			global $my_string_limit_words;


			$args = array(
						'post_type' => $type,
						'category_name' => $category,
						'numberposts' => $num,
						'orderby' => 'post_date',
						'order' => 'DESC'
						);


			$latest = get_posts($args);

			foreach($latest as $post) {
					setup_postdata($post);
					$excerpt = get_the_excerpt($post->ID);
					$attachment_url = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' );
					$url = $attachment_url['0'];

					$detect = new Mobile_Detect;
					if ( $detect->isMobile() && !$detect->isTablet() ) {
						$image = aq_resize($url, 750);
					}
					else {
						$image = aq_resize($url, $thumb_width, $thumb_height, true);
					}

					if (!$image) $image = $url;

					$output .= '<div class="item '.$custom_class_item.'">';

						if ($thumb == 'true') {
							if ( has_post_thumbnail($post->ID) ){
									$output .= '<figure class="featured-thumbnail">';
									$output .= '<a href="'.get_permalink($post->ID).'" title="'.get_the_title($post->ID).'">';
									$output .= '<img  src="'.$image.'" alt="thumb"/>';
									$output .= '</a>';
									$output .= '</figure>';
							}
						}

						$output .= '<div class="wrapInfo">';
							$output .= '<h4>'.get_the_title($post->ID).'</h4>';

							if($excerpt_count >= 1){
								$output .= '<div class="excerpt clearfix">';
									$output .= my_string_limit_words($excerpt,$excerpt_count);

									if($more_text_single!=""){
										$output .= '<a href="'.get_permalink($post->ID).'" class="readmore" title="'.get_the_title($post->ID).'">';
										$output .= $more_text_single;
										$output .= '</a>';
									}
								$output .= '</div>';
							}
						$output .= '</div>';

					$output .= '</div>';

			}
			$output .= '</div>';

			wp_reset_query();
			return $output;

	}

	add_shortcode('carousel_post_type', 'shortcode_carousel_post_type');

}



/*******************************************************/


/*
 *  LANGUAGE SELECTOR SHORTCODE
 */

if ( !function_exists('language_selector_shortcode') ) {

	function language_selector_shortcode($atts, $content = null) {
		extract(shortcode_atts(array(
			'class' => '',
			'type' => '',
			'format' => '',
		), $atts));

		if ( empty($format) ) {
			$qTranslateXWidget_arr = array('type' => $type, 'hide_title' => true);
		} else {
			$qTranslateXWidget_arr = array('type' => $type, 'hide_title' => true, format=> $format);
		}


		$output = '<div class="language_selector '.$class.'">';
		ob_start();
		the_widget('qTranslateXWidget', $qTranslateXWidget_arr );
		$return = ob_get_clean();
		$output .= $return;
		$output .= '</div>';

		return $output;
	}
	add_shortcode('language_selector', 'language_selector_shortcode');

}


/********************************/

/*
 *  gallery_box shortcode
 */

if ( !function_exists('gallery_box_shortcode') ) {


	function gallery_box_shortcode($atts, $content = null) {

		extract(shortcode_atts(array(
				'class' => '',
				'photo_item_class' => '',
				'thumb_width' => '',
				'meta_gallery_field' => '',
				'postid' => '',
				'thumb_height' => '',
		), $atts));

		$output = '<div class="picture_gallery '.$class.'">';
			// $output .= '<div class="row">';

			$images = get_field($meta_gallery_field, $postid);
			if( $images ):
				$ii = 0;
				$first_photo = '';

			    foreach( $images as $image ):
			        $output_temp .= '<div class="item '.$photo_item_class.'">';

			    		$image_crop = aq_resize($image['url'], $thumb_width, $thumb_height, true);
						if (!$image_crop) $image_crop = $image['url'];

						if ( !$ii ) {
							$first_photo = $image['url'];
						}

		                $output_temp .= '<img data-href="'.$image['url'].'"
		                                      src="'.$image_crop.'"
		                                      alt="thumb"
		                                      class="photo-item"
		                                 />';

			        $output_temp .= '</div>';

			        $ii++;
			    endforeach;

			    $output .= '<div class="wrap-main-photo"><img src="'.$first_photo.'" alt="main-photo" /></div>';
			    $output .= '<div class="wrap-tiles flex-box flex-wrap-wrap">'.$output_temp.'</div>';

			endif;

			// $output .= '</div>';
		$output .= '</div>';
		return $output;

	}

	add_shortcode('gallery_box', 'gallery_box_shortcode');

}


/********************************/


/*
 *  gallery_images shortcode
 */

if ( !function_exists('gallery_images_shortcode') ) {


	function gallery_images_shortcode($atts, $content = null) {

		extract(shortcode_atts(array(
				'class' => '',
				'photo_item_class' => '',
				'thumb_width' => '370',
				'meta_gallery_field' => '',
				'postid' => '',
				'thumb_height' => '250',
		), $atts));

		$output = '<div class="picture_gallery '.$class.'">';
			$images = get_field($meta_gallery_field, $postid);
			if( $images ):

			    foreach( $images as $image ):
				    $imgUrl = $image['url'];
			        $output .= '<a class="gallery-item" href="'.$imgUrl.'" data-fancybox="group">';

			    		$image_crop = aq_resize($imgUrl, $thumb_width, $thumb_height, true);
						if (!$image_crop) $image_crop = $imgUrl;

				        $output .= '<img src="'.$image_crop.'" alt="thumb" class="photo-item" />';

				    $output .= '</a>';
			    endforeach;

			endif;
		$output .= '</div>';
		return $output;

	}

	add_shortcode('gallery_images', 'gallery_images_shortcode');

}



/********************************/

/*
 *  Taxonomy category links list shortcode
 */

if ( !function_exists('shortcode_taxonomy_links_list') ) {


	function shortcode_taxonomy_links_list($atts, $content = null) {

		extract(shortcode_atts(array(
			'post_type'  => '',
			'taxonomy'   => '',
			'hide_empty' => '',
		), $atts));

		$args = array(
            'title_li'   => '',
            'taxonomy'   => $taxonomy,
            'hide_empty' => false,
		);

		$output = '<div class="taxonomy-links-list">';
			ob_start();

			wp_list_categories($args);
			$output .= ob_get_clean();

		$output .= '</div>';

		return $output;

	}

	add_shortcode('taxonomy_links_list', 'shortcode_taxonomy_links_list');

}



/********************************/


/*
 *  filtered Photo gallery shortcode
 */

if ( !function_exists('shortcode_filtered_photo_gallery') ) {


	function shortcode_filtered_photo_gallery($atts, $content = null) {

		extract(shortcode_atts(array(
				'class' => '',
				'photo_item_class' => '',
				'thumb_width' => '270',
				'thumb_height' => '200',
				'meta_field' =>''
		), $atts));

		$temp_photo = '';
		$temp_flter_str = '';

		// check if the repeater field has rows of data
		if( have_rows('gallery_repeater') ):

		 	// loop through the rows of data
		    while ( have_rows('gallery_repeater') ) : the_row();

		    	// display a sub field value
		        $gallery_filter = get_sub_field('gallery_filter');
		        $gallery_photos = get_sub_field('gallery_photos');

				if ( !empty($gallery_filter) ){
					$temp_flter_str .= '<li><a href="#" data-option-value="'.$gallery_filter.'">'.$gallery_filter.'</a></li>';
				}


		        if( $gallery_photos ):
				    foreach( $gallery_photos as $image ):
				        $temp_photo .= '<article class="item element all '.$gallery_filter.'">';
				    		$temp_photo .= '<div class="thumb-isotope"><div class="thumbnail clearfix">';
					    		$image_crop = aq_resize($image['url'], $thumb_width, $thumb_height, true);
								if (!$image_crop) $image_crop = $image['url'];

					            $temp_photo .= '<a href="'.$image['url'].'" rel="g12" class="fancybox">';
				                	$temp_photo .= '<img src="'.$image_crop.'" alt="thumb" />';
				                $temp_photo .= '</a>';
				            $temp_photo .= '</div></div>';
				        $temp_photo .= '</article>';
				    endforeach;
				endif;

		    endwhile;

		else :
		    // no rows found
		endif;


		$output = '<div class="isotope-box gallery">';
		$output .= '<div id="container" class="clearfix">';
			$output .= '<div class="col-xs-12 col-sm-3 col-md-3">';
				$output .= '<h3 class="category_title">категории</h3>';
				$output .= '<ul id="filters" class="pagination option-set clearfix" data-option-key="filter">';
					$output .= '<li><a href="" data-option-value="all" class="active">'.__('все фото', 'rent_site').'</a></li>';
					$output .= $temp_flter_str;
				$output .= '</ul>';
			$output .= '</div>';

			$output .= '<div class="col-xs-12 col-sm-9 col-md-9">';
				$output .='<h1 class="with-decoration">галерея</h1>';
				$output .= '<ul class="thumbnails clearfix photo_gallery" id="isotope-items">';
					$output .= '<div class="grid-sizer"></div>';
					$output .= $temp_photo;
				$output .= '</ul>';
			$output .= '</div>';
		$output .= '</div>';
		$output .= '</div>';

		return $output;
	}

	add_shortcode('filtered_photo_gallery', 'shortcode_filtered_photo_gallery');
}

/********************************/

/*
 *  photo list shortcode
 */

if ( !function_exists('shortcode_photo_list') ) {


 function shortcode_photo_list($atts, $content = null) {

  extract(shortcode_atts(array(
    'class' => '',
    'thumb_width' => '270',
    'thumb_height' => '200',
  ), $atts));

  $output = '<div class="photo_list '.$class.'">';
    preg_match_all('/src\s*=\s*"(.+?)"/', $content, $matches, PREG_OFFSET_CAPTURE, 3);

    foreach ($matches[1] as $key => $url) {
        $image_crop = aq_resize($url[0], $thumb_width, $thumb_height, true);
      	if (!$image_crop) $image_crop = $url[0];

       	$output .= '<a href="'.$url[0].'">';
           $output .= '<img src="'.$image_crop.'" alt="thumb" />';
        $output .= '</a>';
    }

  $output .= '</div>';
  return $output;

 }

 add_shortcode('photo_list', 'shortcode_photo_list');

}



/*
 *  CONTAINER SHORTCODE
 */

if ( !function_exists('container_shortcode') ) {

	function container_shortcode($atts, $content = null) {

		extract(shortcode_atts(
            array(
                'class'  => ''
            ), $atts));

        $class_arr = explode(' ', $class);

		$initial_class = ( in_array('fluid', $class_arr) ) ? 'container-fluid': 'container';
		$output = '<div class="'.$initial_class.' '.$class.'">'.do_shortcode($content).'</div>';

		return $output;
	}
	add_shortcode('container', 'container_shortcode');

}


/***************************************************/

/*
 *  COLUMN SHORTCODE
 */

if ( !function_exists('bs_column_column_shortcode') ) {

	function bs_column_column_shortcode($atts, $content = null) {

		extract(shortcode_atts(
            array(
                'class' => ''
            ), $atts));

		$output = '<div class="'.$class.'">'.do_shortcode($content).'</div>';
		return $output;
	}
	add_shortcode('bs_column', 'bs_column_column_shortcode');

}

/***************************************************/

/*
 *  COLUMN  inner SHORTCODE
 */

if ( !function_exists('column_inner_shortcode') ) {

	function column_inner_shortcode($atts, $content = null) {

		extract(shortcode_atts(
            array(
                'class' => ''
            ), $atts));

		$output = '<div class="'.$class.'">'.do_shortcode($content).'</div>';
		return $output;
	}
	add_shortcode('bs_column_inner', 'column_inner_shortcode');

}

/***************************************************/

/*
 *  ROW SHORTCODE
 */

if ( !function_exists('row_shortcode') ) {

	function row_shortcode($atts, $content = null) {
		extract(shortcode_atts(
            array(
                'class' => ''
            ), $atts));

		$output = '<div class="row '.$class.'">'.do_shortcode($content).'</div>';

		return $output;
	}
	add_shortcode('row', 'row_shortcode');

}

/***************************************************/

/*
 *  ROW inner SHORTCODE
 */


if ( !function_exists('row_inner_shortcode') ) {

	function row_inner_shortcode($atts, $content = null) {
		extract(shortcode_atts(
            array(
                'class' => ''
            ), $atts));

		$output = '<div class="row '.$class.'">'.do_shortcode($content).'</div>';

		return $output;
	}
	add_shortcode('row_inner', 'row_inner_shortcode');

}

/***************************************************/

/*
 *  BR SHORTCODE
 */

if ( !function_exists('br_shortcode') ) {

	function br_shortcode($atts, $content = null) {

		$output = '<br class="custom-br">';

		return $output;
	}
	add_shortcode('br', 'br_shortcode');

}

/***************************************************/

/*
 *  hr SHORTCODE
 */

if ( !function_exists('hr_shortcode') ) {

	function hr_shortcode($atts, $content = null) {

		$output = '<hr>';

		return $output;
	}
	add_shortcode('hr', 'hr_shortcode');

}

/***************************************************/

/*
 *  SPACER SHORTCODE
 */

if ( !function_exists('spacer_big_shortcode') ) {

	function spacer_big_shortcode($atts) {
		$output = '<div class="spacer_big"></div>';
		return $output;
	}
	add_shortcode('spacer_big', 'spacer_big_shortcode');

}

/***************************************************/

/*
 *  SPACER SMALL SHORTCODE
 */

if ( !function_exists('spacer_small_shortcode') ) {

	function spacer_small_shortcode($atts) {
		$output = '<div class="spacer_small"></div>';
		return $output;
	}
	add_shortcode('spacer_small', 'spacer_small_shortcode');

}

/***************************************************/

/*
 *  SPACER SUPER SMALL SHORTCODE
 */

if ( !function_exists('spacer_super_small_shortcode') ) {

	function spacer_super_small_shortcode($atts) {
		$output = '<div class="spacer_super_small"></div>';
		return $output;
	}
	add_shortcode('spacer_super_small', 'spacer_super_small_shortcode');

}

/***************************************************/

/*
 *  JUST LINK SHORTCODE
 */

if ( !function_exists('just_link_shortcode') ) {

	function just_link_shortcode($atts, $content = null) {

		extract(shortcode_atts(
			array(
				'class'  => '',
				'id'  => '',
				'href'  => '',
				'caption' =>'',
				'target' =>'',
			), $atts));


		$id_attr = ( !empty($id) ) ? 'id="'.$id.'"' : '';

		$output = '<a '.$id_attr.' class="'.$class.' just-link"
					  href="'.$href.'"
					  data-caption="'.$caption.'"
					  target="'.$target.'">
					  	<span>'.$content.'</span>
				   </a>';

		return $output;
	}

	add_shortcode('just_link', 'just_link_shortcode');
}



/***************************************************/

/*
 *  logo_link SHORTCODE
 */

if ( !function_exists('logo_link_shortcode') ) {

	function logo_link_shortcode($atts, $content = null) {
		extract(shortcode_atts(
			array(
				'class'  => '',
			), $atts));


		if ( is_front_page() ) {
            $output = '<div class="'.$class.' logo-link">'.$content.'</div>';
        } else {
            $output = '<a class="'.$class.' logo-link" href="'.get_site_url().'">'.$content.'</a>';
        }

		return $output;
	}

	add_shortcode('logo_link', 'logo_link_shortcode');
}

/***************************************************/

/*
 *  INFO BOX SHORTCODE
 */

if ( !function_exists('info_box_shortcode') ) {

	function info_box_shortcode($atts, $content = null) {

		extract(shortcode_atts(
            array(
                'class'  => '',
                'id'  => ''
            ), $atts));

		$id_attr = $id ? 'id="'.$id.'"' : '';
		$output = '<div '.$id_attr.' class="case-info-box '.$class.'">'.do_shortcode($content).'</div>';

		return $output;
	}
	add_shortcode('info_box', 'info_box_shortcode');

}

/***************************************************/

/*
 *  INFO INNER BOX SHORTCODE
 */

if ( !function_exists('info_box_inner_shortcode') ) {

	function info_box_inner_shortcode($atts, $content = null) {

		extract(shortcode_atts(
            array(
                'class'  => '',
                'id'  => ''
            ), $atts));

		$id_attr = $id ? 'id="'.$id.'"' : '';
		$output = '<div '.$id_attr.' class="info_box_inner '.$class.'">'.do_shortcode($content).'</div>';

		return $output;
	}
	add_shortcode('info_box_inner', 'info_box_inner_shortcode');

}

/***************************************************/

/*
 *  JUST WRAPPER SHORTCODE
 */

if ( !function_exists('just_wrapper_shortcode') ) {

	function just_wrapper_shortcode($atts, $content = null) {

		extract(shortcode_atts(
            array(
                'class'  => '',
                'id'  => ''
            ), $atts));

		$id_attr = $id ? 'id="'.$id.'"' : '';
		$output = '<div '.$id_attr.' class="just_wrapper '.$class.'">'.do_shortcode($content).'</div>';

		return $output;
	}
	add_shortcode('just_wrapper', 'just_wrapper_shortcode');

}

/***************************************************/

/*
 *  JUST WRAPPER INNER SHORTCODE
 */

if ( !function_exists('just_wrapper_inner_shortcode') ) {

	function just_wrapper_inner_shortcode($atts, $content = null) {

		extract(shortcode_atts(
            array(
                'class'  => '',
                'id'  => ''
            ), $atts));

		$id_attr = $id ? 'id="'.$id.'"' : '';
		$output = '<div '.$id_attr.' class="just_wrapper_inner '.$class.'">'.do_shortcode($content).'</div>';

		return $output;
	}
	add_shortcode('just_wrapper_inner', 'just_wrapper_inner_shortcode');

}

/***************************************************/


/*
 *  CURRENT YEAR SHORTCODE
 */

if ( !function_exists('current_year_shortcode') ) {

	function current_year_shortcode() {

		$output = '<span>'.date("Y").'</span>';
		return $output;
	}
	add_shortcode('current_year', 'current_year_shortcode');

}


/*
 *  CUSTOM MENU SHORTCODE
 */


if ( !function_exists('custom_menu_shortcode') ) {

	function custom_menu_shortcode($atts, $content = null) {

		extract(shortcode_atts(
            array(
                'menu_name'       => '',
                'container_class' => '',
                'class'           => '',
                'walker'          => '',
                'walker_type'     => '',
                'theme_location'  => '',
            ), $atts));

			ob_start();

            $args = array(
                'container'       => 'nav',
                'container_class' => $container_class,
                'menu_class'      => $class.' custom_menu clearfix',
                'menu_id'         => '',
                'depth'           => 0,
                'menu'            => $menu_name,
                'theme_location'  => $theme_location,
            );

            if (  $walker === 'true' ) {

                if ( $walker_type === 'mobile' ) {
                    $args['walker'] = new Custom_sublevel_menu_mobile();
                } else {
                    $args['walker'] = new Custom_sublevel_menu();
                }


            }

            wp_nav_menu( $args );

			$output = ob_get_clean();

		return $output;
	}

	add_shortcode('custom_menu', 'custom_menu_shortcode');

}


/******************************/


/*
 *  CUSTOM widget SHORTCODE
 */


if ( !function_exists('custom_widget_display_shortcode') ) {

	function custom_widget_display_shortcode($atts, $content = null) {

		extract(shortcode_atts(
            array(
                'widget_name'  => ''
            ), $atts));

			ob_start();

			dynamic_sidebar($widget_name);

			$output = ob_get_clean();

		return $output;
	}
	add_shortcode('custom_widget', 'custom_widget_display_shortcode');

}


/*
 *  ONLY FOR MOBILE SHORTCODE
 */

if ( !function_exists('only_for_mobile_shortcode') ) {

	function only_for_mobile_shortcode($atts, $content = null) {

		$detect2 = new Mobile_Detect;
		if ( $detect2->isMobile() ) {
			$output = '<section class="only_for_mobile">'.do_shortcode($content).'</section>';
		}
		else $output = '';

		return $output;
	}
	add_shortcode('only_for_mobile', 'only_for_mobile_shortcode');

}


/*
 *  ONLY FOR DESKTOP SHORTCODE
 */

if ( !function_exists('only_for_desktop_shortcode') ) {

	function only_for_desktop_shortcode($atts, $content = null) {

		$detect2 = new Mobile_Detect;
		if ( !$detect2->isMobile() ) {
			$output = '<section class="only_for_desktop">'.do_shortcode($content).'</section>';
		}
		else $output = '';

		return $output;
	}
	add_shortcode('only_for_desktop', 'only_for_desktop_shortcode');

}



/*
 *  admin_notes SHORTCODE - you should use this shortcode if you want add big comment in admin editor, but you don't
 *  want to display this info in front area
 */

if ( !function_exists('admin_notes_shortcode') ) {

	function admin_notes_shortcode($atts, $content = null) {
		return '';
	}
	add_shortcode('admin_notes', 'admin_notes_shortcode');

}


/**************************/


/*
 *  SEARCH FORM SHORTCODE
 */

if ( !function_exists('search_form_shortcode') ) {

	function search_form_shortcode($atts, $content = null) {

		extract(shortcode_atts(
            array(
                'class'  => '',
                'btn_title' =>'найти',
                'placeholder_text' =>'Найти:'

            ), $atts));

		$output = ' <form role="search" method="get" id="searchform" class="'.$class.'" action="'.home_url( '' ).'" >
						<label class="screen-reader-text" for="s">Найти: </label>
						<input type="text" value="'.get_search_query().'" name="s" id="s" placeholder="'.$placeholder_text.'"/>
						<button type="submit" id="searchsubmit">'.$btn_title.'</button>
					</form>';
		return $output;
	}
	add_shortcode('search_form', 'search_form_shortcode');

}


/***************************************************/


/*
 * Content for logged user shortcode
 */

if ( !function_exists('logged_user_shortcode') ) {

	function logged_user_shortcode($atts, $content = null) {

	    if ( is_user_logged_in() ) {
		    return do_shortcode( $content );
        }

        return '';
	}
	add_shortcode('logged_user', 'logged_user_shortcode');
}


/************************************************************************/



/*
 * get_page_content shortcode
 */

if ( !function_exists('get_page_content_shortcode') ) {

	function get_page_content_shortcode($atts, $content = null) {

		extract(shortcode_atts(array(
			'page_title' => '',
		), $atts));

		$content_post = get_page_by_title( $page_title, OBJECT, 'post' );
		if($content_post)
		{
			$content = $content_post->post_content;

			$output = do_shortcode($content);
		}

		return $output;

	}
	add_shortcode('get_page_content', 'get_page_content_shortcode');
}



/********************************/

/*
 *  Page overview shortcode
 */

if ( !function_exists('shortcode_page_overview') ) {


	function shortcode_page_overview($atts, $content = null) {

		extract(shortcode_atts(array(
			'page_ids' => '',
			'class' => '',
		), $atts));

		$page_ids_arr = explode(',', $page_ids);

		$output = '<section class="page-overview-holder '.$class.'">';

		if ( is_array($page_ids_arr) ) {
			foreach ($page_ids_arr as $key => $value) {

				$attachment_url = wp_get_attachment_image_src( get_post_thumbnail_id($value), 'full' );
				$url = $attachment_url['0'];

				$detect = new Mobile_Detect;
				if ( $detect->isMobile() && !$detect->isTablet() ) {
					$image = aq_resize($url, 750);
				}
				else {
					$image = aq_resize($url, 370, 370, true);
				}

				if (!$image) $image = $url;

				$output .= '<div class="page-overview-item">';
					$output .= '<img src="'.$image.'" alt="page-thumb" />';
					$output .= '<p class="page-item-title">'.get_the_title($value).'</p>';
					$output .= '<a href="'.get_permalink($value).'" class="coverFull"></a>';
				$output .= '</div>';

			}
		}

		$output .= '</section>';

		return $output;

	}

	add_shortcode('page_overview', 'shortcode_page_overview');

}



/********************************/

/*
 *  Popup box shortcode
 */

if ( !function_exists('shortcode_popup_box') ) {
function shortcode_popup_box($atts, $content = null) {

    extract(shortcode_atts(array(
        'box_id' => '',
        'box_caption' => '',
        'include_template' => '',
    ), $atts));

        if ( !empty($include_template) ) {
			$options   = get_fields('options');

            if ( $include_template === 'parts/recommend-to-friend.php' ) {
                $recommend_caption     = $options['vacancy_sidebar_recommend_caption'];
                $recommend_description = $options['vacancy_sidebar_recommend_description'];
            }

            ob_start();
            include( locate_template($include_template, false, false ) );
            $content .= ob_get_clean();
        }

        $output = '<div id="'.$box_id.'" class="popup">';
        $output .= '<div class="my_overlay js-popup-close"></div>';

        $output .= '<div class="popup-wrapper">';
		$output .= '<div class="popup-wrapper-inner">';
        $output .= '<div class="in text-center js-popup-inner">';

        if ( !empty($box_caption) ) {
            $output .= '<p class="box-caption text-center">'.$box_caption.'</p>';
        }

        $output .= do_shortcode($content);
        $output .= '</div>';
        $output .= '<button class="popup-close js-popup-close">close popup</button>';
        $output .= '</div>';
		$output .= '</div>';
        $output .= '</div>';

        return $output;

	}

	add_shortcode('popup_box', 'shortcode_popup_box');

}



/*
 * home_banner shortcode
 */

if ( !function_exists('home_banner_shortcode') ) {
    function home_banner_shortcode($atts, $content = null) {
        extract(shortcode_atts(array(
            'class' => '',
        ), $atts));

        ob_start();

        $banner = get_field('home_banner_page');
        $phone = get_field('global_phone', 'option');
        $phone_link = str_replace([' ', '(', ')', '-'], '', $phone);

        if ( !empty($banner) ) { ?>
            <div class="home-image">
                <a class="order-by-phone-mobile"
                   href="tel:<?php echo $phone_link ?>"></a>
                <video max-height="auto" class="js-video-box" id="video1" controls muted autoplay width="100%">
                    <source src="<?php echo $banner ?>" type="video/mp4">
                </video>
                <button id="js-dummy-btn" style="opacity: 0;background: none;border: none;width: 0;height: 0;overflow: hidden;font-size: 0;"></button>
            </div>
        <?php }

        return ob_get_clean();
    }
    add_shortcode('home_banner', 'home_banner_shortcode');
}






/*
 * sale_block shortcode
 */


if ( !function_exists('sale_block_shortcode') ) {

    function sale_block_shortcode($atts, $content = null) {

        extract(shortcode_atts(array(
            'class' => '',
        ), $atts));

        $sale_img = get_field('big_sale');
        $sale_img_mobile = get_field('mobile_sale');
        $sale_img_mobile_url = $sale_img_mobile['url'];
        $sale_img_url = $sale_img['url'];
        $detect = new Mobile_Detect;

        if(!empty($sale_img) && !empty($sale_img_mobile)) {

            ob_start();
            ?>
            <div class="sale-block">

               <?php if ( $detect->isMobile() && !$detect->isTablet() ) { ?>

                   <div class="sale-mobile">
                       <?php if( !empty($sale_img) ){ ?>
                           <img src="<?php echo $sale_img_mobile_url; ?>"
                                alt="<?php echo $sale_img_mobile['alt']; ?>" />
                       <?php } ?>
                   </div>

               <?php } else { ?>

                    <div class="sale-desktop">
                        <?php if( !empty($sale_img) ){ ?>
                            <img src="<?php echo $sale_img_url; ?>"
                                 alt="<?php echo $sale_img['alt']; ?>" />
                        <?php } ?>
                    </div>

                <?php } ?>
            </div>

            <?php
        }
        return ob_get_clean();



    }
    add_shortcode('sale_box', 'sale_block_shortcode');
}



/*
 * partners_box shortcode
 */

if ( !function_exists('partners_box_shortcode') ) {

    function partners_box_shortcode($atts, $content = null) {

        extract(shortcode_atts(array(
            'class' => '',
        ), $atts));

        ob_start();

        ?>
        <div class="partners">
            <div class="partners-wrap">
                <?php

                $terms = get_terms( [
                    'taxonomy' => 'brands',
                    'hide_empty' => false,
                ] );

                foreach( $terms as $term ){

                    $termsId = $term->term_id;
                    $term_link = get_term_link($termsId);
                    $brand_logo     = get_field('tax_logo', $term);
                    $brand_logo_url = $brand_logo['url'];
                    $brand_logo_alt = $brand_logo['alt'];

                    if( !empty($brand_logo_url) ) {

                        ?>

                        <div class="partners-item">
                            <a href="<?php echo ( $term_link ) ? $term_link : ''; ?>"> <img
                                        src="<?php echo $brand_logo_url ?>" alt="<?php echo $brand_logo_alt; ?>"/> </a>
                        </div>

                <?php
                    }
                }
                ?>
            </div>
        </div>

        <?php
        return ob_get_clean();
    }
    add_shortcode('partners_box', 'partners_box_shortcode');
}



/*
 * nav_page shortcode
 */

if ( !function_exists('nav_page_shortcode') ) {

    function nav_page_shortcode($atts, $content = null) {

        extract(shortcode_atts(array(
            'class' => '',
        ), $atts));

        ob_start();
        ?>

        <div class="nav-page">
            <div class="nav-page-wrap">

                    <?php
                    if( have_rows('page_preview') ):

                        while ( have_rows('page_preview') ) : the_row();

                            $page_image = get_sub_field('page_images');
                            $page_image_url = $page_image['url'];
                            $page = get_sub_field('link_page');
                            $page_id = $page -> ID;
                            $page_link = get_page_link($page_id);
                            $page_name = $page->post_title;

                    ?>

                            <div class="nav-page-item">
                                <a href="<?php echo ($page_link)? $page_link : '' ?>" class="img-page">
                                    <?php if(!empty($page_image_url)){ ?>
                                        <img src="<?php echo $page_image_url?>" alt="page_img">
                                    <?php } ?>
                                    <p>— <?php echo ($page_name)? $page_name : "" ?> —</p>
                                </a>

                            </div>


                    <?php

                        endwhile;
                    endif;

                    ?>



                </div>
        </div>

        <?php
        return ob_get_clean();

    }
    add_shortcode('nav_page', 'nav_page_shortcode');
}


/*
 * contact shortcode
 */

if ( !function_exists('contact_shortcode') ) {

    function contact_shortcode($atts, $content = null) {

        extract(shortcode_atts(array(
            'class' => '',
        ), $atts));

        ob_start();

        $phone       = get_field('global_phone', 'option');
        $phone_link  = str_replace([' ', '(', ')', '-'], '', $phone);
        $phone2      = get_field('second_phone', 'option');
        $phone_link2 = str_replace([' ', '(', ')', '-'], '', $phone2);
        $address     = get_field('global_adress', 'option');
        $mail        = get_field('global_email', 'option');
        ?>

       <div class="contact-block">
           <div class="contact-left">
               <p class="address"><?php echo ($address)? $address : '';?></p>

               <div class="phone-section">
                   <a class="phone" href="tel:<?php echo $phone_link ?>"><?php echo ($phone)? $phone : ''; ?></a>
                   <?php if( !empty($phone2) ) {?>
                   <a class="phone" href="tel:<?php echo $phone_link2 ?>"><?php echo ($phone2)? $phone2 : ''; ?></a>
                   <?php } ?>

                   <p>(<?php echo _('для заказа товаров') ?>)</p>
               </div>

               <a href="mailto:<?php echo $mail ?>" class="mail"><?php echo ($mail)? $mail : '' ?></a>

               <div class="social-icon-block">
                   <?php
                   if( have_rows('social_networks', 'option') ):

                       while ( have_rows('social_networks', 'option') ) : the_row();

                           $social_link = get_sub_field('social_networks_link');
                           $social_icon = get_sub_field('social_icon');
                           $social_icon_link = $social_icon['url'];

                           if(!empty($social_link)) {
                               ?>
                               <a href="<?php echo $social_link ?>">
                                   <img src="<?php echo $social_icon_link ?>" alt="<?php echo $social_icon['alt'] ?>">
                               </a>
                               <?php
                           }
                       endwhile;
                   endif;
                   ?>
               </div>


           </div>

           <div class="map-item">
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.385828447868!2d30.740057515437403!3d46.48067207912609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c631993a8eb343%3A0xfcfd4d5722f13074!2z0YPQu9C40YbQsCDQn9GD0YjQutC40L3RgdC60LDRjywgMTYsINCe0LTQtdGB0YHQsCwg0J7QtNC10YHRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgNjUwMDA!5e0!3m2!1sru!2sua!4v1572963039661!5m2!1sru!2sua" width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
           </div>

       </div>



        <?php
        return ob_get_clean();

    }
    add_shortcode('contact_page', 'contact_shortcode');
}



/*
 * Made to Measure shortcode
 */

if ( !function_exists('measure_shortcode') ) {

    function measure_shortcode($atts, $content = null) {

        extract(shortcode_atts(array(
            'class' => '',
        ), $atts));

        ob_start();

        ?>

        <div class="mtm_text_block-wrap">

            <?php
            $phone = get_field('global_phone', 'option');
            $phone_link = str_replace([' ', '(', ')', '-'], '', $phone);
            ?>

            <?php
            if( have_rows('mtm_text_block') ):

                while ( have_rows('mtm_text_block') ) : the_row();

                    $text = get_sub_field('mtm_text');
                    $image = get_sub_field('mtm_image');
                    $image_url = $image['url'];
                    $image_alt = $image['alt'];
                    $reverse = get_sub_field('left_img');
            ?>

                <div class="measure-text-block <?php echo ($reverse)? 'reverse' : '' ?>">
                <div class="measure-text-item text">
                    <?php echo ($text)?  $text : ''; ?>
                </div>
                <div class="measure-text-item">
                    <?php if( !empty($image_url) ) { ?>
                        <img src="<?php echo $image_url ;?>" alt="<?php echo $image_alt; ?>">
                    <?php } ?>
                </div>
            </div>

            <?php
                endwhile;
            endif;
            ?>
        </div>

        <?php

        return ob_get_clean();

    }
    add_shortcode('made_to_measure', 'measure_shortcode');
}



/*
 * shapes_images shortcode
 */

if ( !function_exists('shapes_images_shortcode') ) {

    function shapes_images_shortcode($atts, $content = null) {

        extract(shortcode_atts(array(
            'class' => '',
        ), $atts));

        ob_start();

        ?>
        <div class="shapes-images">
            <?php
            //if( have_rows('shapes_repeater') ):
                //while ( have_rows('shapes_repeater') ) : the_row();

                    $gallery = get_field('shapes_gallery');
                    ?>

            <?php if( $gallery ):
                ?>
                <?php foreach( $gallery as $image ):
                    $image_url = $image['url'];
                    $image_alt = $image['alt'];
                    $id = get_the_ID();

                    $image_crop = aq_resize($image_url, 574, 382, true);
                    if (!$image_crop) $image_crop = $image_url;
                    ?>
                    <div class="item">
                        <div class="inner">
                            <a href="<?php echo $image_url; ?>"
                               data-fancybox="g-gall">
                                <img src="<?php echo $image_crop; ?>"
                                     alt="<?php echo $image_alt; ?>" />
                            </a>


                            <div class="mobile-overlay js-open-gallery"></div>
                        </div>
                        <div class="block-info">
                            <div class="block-info-wrap">
                                <div class="share-block">
                                    <div class="share-block-item">
                                        <p class="share">Поделиться: </p>
                                        <a href="http://www.facebook.com/sharer.php?u=<?php echo get_permalink(); ?>"
                                           rel="noopener" target="_blank" class="facebook social"></a>
                                        <a href="https://www.pinterest.com/pin/create/bookmarklet/?description=<?=get_the_title($id)?>&url=<?php echo get_permalink(); ?>"
                                           rel="noopener" target="_blank" class="pinterest social"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            <?php endforeach; ?>
            <?php endif; ?>
                <?php
                ///endwhile;
            //endif;
            ?>
        </div>
        <?php

        return ob_get_clean();

    }
    add_shortcode('shapes_images', 'shapes_images_shortcode');
}


/*
 * sidebar_colection shortcode
 */

if ( !function_exists('collections') ) {

    function collections($atts, $content = null) {

        extract(shortcode_atts(array(
            'class' => '',
        ), $atts));

        ob_start();

        ?>

        <div class="collection-arguments">
            <h4 class="collection-title js-collection-title">Коллекции</h4>
            <form id="collection-filter" method="post">
                <?php

                $queried_object_id = get_queried_object_id();
                $data_type = get_field('page_data_type_to_display', $queried_object_id);

                if ( is_tax() ) {
                    $data_type = 'all';
                    echo '<input type="hidden" name="brand_id" value="'.$queried_object_id.'">';
                }

                echo '<input type="hidden" name="data_type" value="'.$data_type.'">';

                echo '<ul class="collection-items">';

                $terms = get_terms( array(
                    'taxonomy'      => array( 'collections' ),
                    'orderby'       => 'id',
                    'order'         => 'ASC',
                    'hide_empty'    => false,
                ) );

                    foreach( $terms as $term ){

                        $term_name = $term->name;
                        $term_id   = $term->term_id;
                        echo '<li class="term-item" data-term="'.$term_name.'">
                            <input type="checkbox"
                                   value="'.$term_id.'"
                                   name="collections[]">
                            <label>'.$term_name.'</label>
                           </li>';

                    }


                echo '</ul>';
                ?>
            </form>
        </div>
        <?php

        return ob_get_clean();

    }
    add_shortcode('collections', 'collections');
}




/*
 * share_colection shortcode
 */

if ( !function_exists('share_colection') ) {

    function share_colection($atts, $content = null) {

        extract(shortcode_atts(array(
            'class' => '',
        ), $atts));

        ob_start();
        $id = get_the_ID();
        ?>
        <div class="share-block-wrap">
            <div class="share-block text-left">
                <div class="share-block-item">
                    <p class="share">Поделиться: </p>
                    <a rel="noopener" href="http://www.facebook.com/sharer.php?u=<?php echo get_permalink(); ?>" target="_blank" class="facebook social"></a>

                    <a rel="noopener" href="https://www.pinterest.com/pin/create/bookmarklet/?description=<?=get_the_title($id)?>&url=<?php echo get_permalink(); ?>" target="_blank" class="pinterest social"></a>
                </div>
            </div>
        </div>

        <?php

        return ob_get_clean();

    }
    add_shortcode('share_colection', 'share_colection');
}
