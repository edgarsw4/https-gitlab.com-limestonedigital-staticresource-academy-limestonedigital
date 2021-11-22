<?php

class Corppix {


    /**
     * Add custom Menu item in admin dashboard for Shortcodes Description
     */
    private function px_add_custom_theme_menu_item() {

        function theme_settings_page() {
            echo '<div class="wrap">
			    <h1>Shortcodes for this theme</h1>
			    <p>Use them to shorten the code in the admin panel and get the correct data</p>';

                require_once get_template_directory() . '/inc/shortcodes-description.html';
            echo '</div>';
        }


        function add_theme_menu_item() {
            add_menu_page(
                "Theme Shortcodes",
                "Theme Shortcodes",
                "manage_options",
                "theme-shortcodes",
                "theme_settings_page",
                'dashicons-book',
                99
            );
        }

        add_action("admin_menu", "add_theme_menu_item");
    }



    /**
     * Removing cycling links from menu
     *
     * @param $p
     *
     * @return mixed
     */
    private function px_no_link_current_page() {

        function removeCycling($p) {
            return preg_replace( '%((current_page_item|current-menu-item)[^<]+)[^>]+>([^<]+)</a>%',     '$1<span class="like-link nav__link">$3</span>', $p, 1 );
        }

        // Remove cycling links from menu
        add_filter('wp_nav_menu', 'removeCycling' );
        add_filter( 'wp_list_categories', 'removeCycling');
    }



    /**
     * Produces cleaner FILE NAMES for uploads
     *
     * @param  string $filename
     * @return string - sanitized filename
     */
    public function custom_sanitize_file_name( $filename ) {

        $sanitized_filename = remove_accents( $filename ); // Convert to ASCII

        // Standard replacements
        $invalid = array(
            ' '   => '-',
            '%20' => '-',
            '_'   => '-',
        );
        $sanitized_filename = str_replace( array_keys( $invalid ), array_values( $invalid ), $sanitized_filename );

        // Remove all non-alphanumeric except
        $sanitized_filename = preg_replace('/[^A-Za-z0-9-\. ]/', '', $sanitized_filename);
        // Remove all but last
        $sanitized_filename = preg_replace('/\.(?=.*\.)/', '', $sanitized_filename);
        // Replace any more than one - in a row
        $sanitized_filename = preg_replace('/-+/', '-', $sanitized_filename);
        // Remove last - if at the end
        $sanitized_filename = str_replace('-.', '.', $sanitized_filename);
        // Lowercase
        $sanitized_filename = strtolower( $sanitized_filename );

        return $sanitized_filename;
    }



    /**
     * Custom body class depends to device
     *
     * @param $classes array - existing classes
     *
     * @return array of classes
     */
    public function stag_body_class( $classes ) {
        global $is_lynx, $is_gecko, $is_IE, $is_opera, $is_NS4, $is_safari, $is_chrome, $is_iphone;

        global $browser_detect;
        $browser_detect = '';

        if($is_lynx) $browser_detect = 'lynx';
        elseif($is_gecko) $browser_detect = 'gecko';
        elseif($is_opera) $browser_detect = 'opera';
        elseif($is_NS4) $browser_detect = 'ns4';
        elseif($is_safari) $browser_detect = 'safari';
        elseif($is_chrome) $browser_detect = 'chrome';
        elseif($is_IE) {
            $browser = $_SERVER['HTTP_USER_AGENT'];
            $browser = substr( "$browser", 25, 8);
            if ($browser == "MSIE 7.0"  ) {
                $browser_detect = 'ie7';
                $browser_detect .= ' ie';
            } elseif ($browser == "MSIE 6.0" ) {
                $browser_detect = 'ie6';
                $browser_detect .= ' ie';
            } elseif ($browser == "MSIE 8.0" ) {
                $browser_detect = 'ie8';
                $browser_detect .= ' ie';
            } elseif ($browser == "MSIE 9.0" ) {
                $browser_detect = 'ie9';
                $browser_detect .= ' ie';
            } elseif ($browser == "MSIE 11.0" ) {
                $browser_detect = 'ie11';
                $browser_detect .= ' ie';
            } else {
                $browser_detect = 'ie';
            }
        }
        else $browser_detect = ' unknown';

        if( $is_iphone ) $browser_detect .= ' iphone';

        $detect = new Mobile_Detect;
        if ( $detect->isTablet() ) {
            $browser_detect .= ' tablet';
        }
        if ( $detect->isMobile() && !$detect->isTablet() ) {
            $browser_detect .= ' mobile';
        }

        $classes[] = $browser_detect;

        return $classes;
    }



    /**
     * Remove version from source in url
     *
     * @param $src string  - src before changes
     *
     * @return string - src without ?ver
     */
    public function px_remove_version_data( $src ){
        $parts = explode( '?ver', $src );
        return $parts[0];
    }



    /**
     * Add a screen-reader-text` class to the search form's submit button.
     *
     * @param string $html Search form HTML.
     * @return string Modified search form HTML.
     */
    public function px_search_form_modify( $html ) {
        return str_replace( 'class="search-submit"',
                            'class="search-submit screen-reader-text"',
                            $html
                          );
    }



    /**
     * JavaScript Detection.
     * Adds a `js` class to the root `<html>` element when JavaScript is detected.
     */
    public function px_javascript_detection() {
        echo "<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js')})(document.documentElement);</script>\n";
    }



    /**
     * Register custom widgets area
     */
    public function px_widgets_init() {
        register_sidebar( array(
            'name'          => __( 'Left Sidebar', 'corppix_site' ),
            'id'            => 'sidebar-left',
            'description'   => __( 'Add widgets here to appear in your sidebar.', 'corppix_site' ),
            'before_widget' => '<aside id="%1$s" class="widget %2$s">',
            'after_widget'  => '</aside>',
            'before_title'  => '<p class="widget-title">',
            'after_title'   => '</p>',
        ) );

        register_sidebar( array(
            'name'          => __( 'Right Sidebar', 'corppix_site' ),
            'id'            => 'sidebar-right',
            'description'   => __( 'Add widgets here to appear in your sidebar.', 'corppix_site' ),
            'before_widget' => '<aside id="%1$s" class="widget %2$s">',
            'after_widget'  => '</aside>',
            'before_title'  => '<p class="widget-title">',
            'after_title'   => '</p>',
        ) );

        register_sidebar( array(
            'name'          => __( 'Blog Sidebar', 'corppix_site' ),
            'id'            => 'sidebar-blog',
            'description'   => __( 'Add widgets here to appear in your sidebar.', 'corppix_site' ),
            'before_widget' => '<aside id="%1$s" class="widget %2$s">',
            'after_widget'  => '</aside>',
            'before_title'  => '<p class="widget-title">',
            'after_title'   => '</p>',
        ) );
    }



    /**
     * The excerpt based on words
     *
     * @param $string      string  - Initial string
     * @param $word_limit  number
     *
     * @return string  -  cropped string
     */
    public function px_string_limit_words($string, $word_limit) {

        $words = explode(' ', $string, ($word_limit + 1));

        if ( count($words) > $word_limit ) {
            array_pop($words);
        }

        return implode(' ', $words).'<span class="excert_arrow"></span>';

    }



    /**
     * The excerpt based on character
     *
     * @param $excerpt
     * @param int $substr
     *
     * @return bool|string
     */
    function px_string_limit_char( $excerpt, $substr=0 ) {

        $string = strip_tags(str_replace('...', '...', $excerpt));

        if ($substr>0) {
            $string = substr($string, 0, $substr);
        }

        return $string;

    }



    /**
     * Set custom upload size limit
     *
     * @param $value
     */
    public function px_custom_upload_size_limit($value){

        global $upload_size_limit;
        $upload_size_limit = $value;

        @ini_set( 'upload_max_size', $value.'M' );
        @ini_set( 'post_max_size', $value.'M');
        @ini_set( 'max_execution_time', '300' );

        add_filter( 'upload_size_limit', 'PBP_increase_upload' );
        function PBP_increase_upload( $value ) {
            global $upload_size_limit;
            return $upload_size_limit*1048576; // 3 megabyte
        }
    }



    /**
     * Check if page is blog page
     *
     * @return bool
     */
    function is_blog () {
        global  $post;
        $posttype = get_post_type($post );

        return (
            ( is_archive()||is_author()||is_category()||is_home()||is_single()||is_tag() ) && $posttype == 'post' )
                ? true : false ;
    }



    /**
     * Find youtube Link in string and Convert it into embed code
     *
     * @param string   $youtube_url  Youtube url
     * @return string  Embed url
     */
    public function px_getYoutubeEmbedUrl($youtube_url)
    {
        $shortUrlRegex = '/youtu.be\/([a-zA-Z0-9_]+)\??/i';
        $longUrlRegex = '/youtube.com\/((?:embed)|(?:watch))((?:\?v\=)|(?:\/))(\w+)/i';

        if (preg_match($longUrlRegex, $youtube_url, $matches)) {
            $youtube_id = $matches[count($matches) - 1];
        }

        if (preg_match($shortUrlRegex, $youtube_url, $matches)) {
            $youtube_id = $matches[count($matches) - 1];
        }
        return 'https://www.youtube.com/embed/' . $youtube_id ;
    }




    /**
     * Find youtube preview image
     *
     * @param string   $youtube_url  Youtube url
     * @return string  Image url
     */
    public function getYoutubeIframeData($youtubeUrl){
        $pattern =
            '%^# Match any youtube URL
                    (?:https?://)?  # Optional scheme. Either http or https
                    (?:www\.)?      # Optional www subdomain
                    (?:             # Group host alternatives
                      youtu\.be/    # Either youtu.be,
                    | youtube\.com  # or youtube.com
                      (?:           # Group path alternatives
                        /embed/     # Either /embed/
                      | /v/         # or /v/
                      | /watch\?v=  # or /watch\?v=
                      )             # End path alternatives.
                    )               # End host alternatives.
                    ([\w-]{10,12})  # Allow 10-12 for 11 char youtube id.
                    $%x'
        ;
        $result = preg_match($pattern, $youtubeUrl, $matches);

        if ($result) {
            $videoID = $matches[1];  // get youtube video ID from URL
            // getting iframe image preview
            return "https://img.youtube.com/vi/$videoID/0.jpg";
        }

        return null;
    }


    /**
     * remove "Archive" word from title
     *
     * @return void
     */
    public function px_remove_Archive_word_from_title(){
        add_filter( 'get_the_archive_title', function ($title) {
            if ( is_category() ) {
                $title = single_cat_title( '', false );
            } elseif ( is_tag() ) {
                $title = single_tag_title( '', false );
            }  elseif ( is_post_type_archive() ) {
                $title = post_type_archive_title( '', false );
            } elseif ( is_author() ) {
                $title = '<span class="vcard"></span>' ;
            }

            return $title;
        });
    }



    /**
     * Ajax request from Front end to Backend
     *
     * @param $actionName
     * @param $callbackFunction
     *
     * @return void  - Send data back to frontend
     */
    public function ajax_front_to_backend($actionName, $callbackFunction) {
        add_action( 'wp_ajax_nopriv_'.$actionName, $callbackFunction );
        add_action( 'wp_ajax_'.$actionName, $callbackFunction );
    }



    /**
     * Mobile menu block
     * @return string - html of mobile menu block
     */
    public function mobile_menu_block() {}



    /**
     * Main site setting setup
     */
    public function px_site_setup() {

        // including aq_resize.php file for crop images
        require get_template_directory() . '/inc/aq_resizer.php';

        // detect mobile deveces
        require get_template_directory() . '/inc/Mobile_Detect.php';

        // including some required file with shortcodes
        require get_template_directory() . '/inc/custom_shortcodes.php';

        // including quick tags settings
        require get_template_directory() . '/inc/custom_quick_tags.php';

        // including Visual editor additional buttons
        require get_template_directory() . '/inc/custom_mce_buttons.php';


        /*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on corppix_site, use a find and replace
		 * to change 'corppix_site' to the name of your theme in all the template files
		 */
        load_theme_textdomain( 'corppix_site', get_template_directory() . '/languages' );


        // remove some unused things
        remove_action('wp_head', 'wp_generator');
        remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
        remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0 );
        remove_action('wp_head', 'rel_canonical');
        remove_action('wp_head', 'wlwmanifest_link');
        remove_action('wp_head', 'rsd_link');
        remove_action('wp_head', 'feed_links', 2);
        remove_action('wp_head', 'feed_links_extra', 3);
        remove_action('wp_head', 'qtranxf_wp_head');
        remove_action('wp_head', 'wp_generator' );
        remove_action('wp_head', 'wp_resource_hints', 2);
        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('wp_print_styles', 'print_emoji_styles');
        remove_action('admin_print_scripts', 'print_emoji_detection_script');
        remove_action('admin_print_styles', 'print_emoji_styles');

        // remove auto adding paragraph
        remove_filter('the_content', 'wpautop');
        remove_filter('the_content', 'wptexturize');
        remove_filter( 'the_excerpt', 'wpautop' );
        remove_filter('acf_the_content', 'wpautop');

        // File Size notification in admin area
        add_action(
            'post-plupload-upload-ui',
            function(){
                echo '<p>To compress files to the desired size you can use the service
                            <a href="http://optimizilla.com/">http://optimizilla.com/</a>
                      </p>';
            },
            10,
            1
        );

        // some styles in admin area
        add_action('admin_head', 'my_custom_fonts');
        function my_custom_fonts() {
            echo '<style>
            .metaslider .left table tr.slide textarea {
                height: 120px !important;
            }

            .metaslider-ui .metaslider-slides-container .slide {
                max-height: 315px;
            }
            .acf-repeater .acf-row > td {
			    border-top: 10px solid #e6e6e6 !important;
                border-bottom: 10px solid #e6e6e6 !important;
			}
			.acf-repeater .acf-row-handle.order {
                color: #000;
                font-size: 24px;
            }
            .mce-menu .mce-menu-item-normal.mce-active,
            .mce-menu .mce-menu-item-preview.mce-active,
            .mce-menu .mce-menu-item.mce-selected,
            .mce-menu .mce-menu-item:focus,
            .mce-menu .mce-menu-item:hover {
                background: #94d2f0 !important;
            }
          </style>';
        }


        // Enable  "styleselect" dropdown in visual editor
        add_filter('mce_buttons_2', 'wpse3882_mce_buttons_2');
        function wpse3882_mce_buttons_2($buttons) {
            array_unshift( $buttons, 'styleselect' );
            return $buttons;
        }

        // Allow to load SVG in media uploader
        add_filter( 'upload_mimes', 'add_svg_to_upload_mimes', 10, 1 );
        function add_svg_to_upload_mimes( $upload_mimes ) {
            $upload_mimes['svg'] = 'image/svg+xml';
            $upload_mimes['svgz'] = 'image/svg+xml';
            return $upload_mimes;
        }



        // Specify which menu location will be used in theme
        register_nav_menus( array(
            'primary'      => __( 'Primary Menu', 'corppix_site' ),
            'secondary'      => __( 'Secondary Menu', 'corppix_site' ),
            'mobile_menu'  => __( 'Mobile menu', 'corppix_site' ),
            'fixed_menu'   => __( 'Fixed menu', 'corppix_site' ),
            'footer-menu'   => __( 'Footer menu', 'corppix_site' ),
        ) );


        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support( 'html5', array(
            'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
        ) );

        // Declaring Woocommerce support for our theme
        add_theme_support( 'woocommerce',
            array(
                'thumbnail_image_width' => 150,
                'single_image_width'    => 300,
                'product_grid' => array(
                    'default_rows'    => 3,
                    'min_rows'        => 2,
                    'max_rows'        => 8,
                    'default_columns' => 4,
                    'min_columns'     => 2,
                    'max_columns'     => 5,
                ),
            )
        );


        /*
         * This theme styles the visual editor to resemble the theme style,
         * specifically font, colors, icons, and column width.
         */
        // add_editor_style('editor-style.css');
        // add_editor_style('custom-editor-style.css');


        // Add custom Menu item in admin dashboard for Shortcodes Description
        $this->px_add_custom_theme_menu_item();

        // force remove "Archive" word from title
        $this->px_remove_Archive_word_from_title();

        // force remove cycling links
        // $this->px_no_link_current_page();

        // Register widget area.
        $this->px_widgets_init();


        add_filter( 'wpseo_canonical', '__return_false' );

        // remove version from source in javascript and styles url
        add_filter( 'script_loader_src', array( $this, 'px_remove_version_data' ), 15, 1 );
        add_filter( 'style_loader_src', array( $this, 'px_remove_version_data' ), 15, 1 );

        // Add title tag support
        add_theme_support( 'title-tag' );

        // Add default posts and comments RSS feed links to head.
        add_theme_support( 'automatic-feed-links' );

        // Enable support for Post Thumbnails on posts and pages.
        add_theme_support( 'post-thumbnails' );

        // Add shortcode support in text widgets
        add_filter('widget_text', 'do_shortcode');

        // DETECTING BROWSER = Add custom body class to the head
        add_filter( 'body_class', array( $this,'stag_body_class' ) );

        // Add a screen-reader-text` class to the search form's submit button.
        add_filter( 'get_search_form', array( $this,'px_search_form_modify') );

        // Set  Revisions Config to Zero
        add_filter( 'wp_revisions_to_keep', '__return_zero' );

        // remove SEO noodp meta tag
        add_filter('wpseo_robots', '__return_empty_string', 999);

        // Adding mobile menu
        add_action('corppix_before_site_header', array($this, 'mobile_menu_block'), 15);

        // Scroll button
        add_action('corppix_after_site_page_tag', function(){ echo '<span id="scroll-top"></span>'; }, 5);

        // JavaScript Detection.
        add_action( 'wp_head', array($this, 'px_javascript_detection') );

        // Produces cleaner FILE NAMES for uploads
        //add_filter( 'sanitize_file_name', array($this, 'custom_sanitize_file_name'), 10, 1 );
    }



}
