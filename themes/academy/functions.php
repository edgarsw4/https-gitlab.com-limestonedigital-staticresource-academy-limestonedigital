<?php

// include main Theme Class
require get_template_directory() . '/inc/Corppix.php';

$corppix = new Corppix();

// main theme init
add_action( 'after_setup_theme', array($corppix,'px_site_setup') );

add_filter( 'sanitize_file_name', array($corppix, 'custom_sanitize_file_name'), 10, 1 );

// Set custom upload size limit
$corppix->px_custom_upload_size_limit(40);

function get_file_modify($filename){
    if (file_exists(get_template_directory_uri().$filename)) {
        return filemtime(get_template_directory_uri().$filename);
    }

    return 0;
}

// Enqueue scripts and styles.
function px_site_scripts() {

    // Load our main stylesheet.
    wp_enqueue_style( 'corppix_site-style', get_stylesheet_uri() );

    wp_enqueue_style('open_sans_font', 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');

    wp_enqueue_style('corppix_site_style', get_template_directory_uri().'/build/styles/style.css?v='.get_file_modify('/build/styles/style.css'));


    wp_localize_script( 'corppix_site-script', 'screenReaderText', array(
        'expand'   => '<span class="screen-reader-text">' . __( 'expand child menu', 'ld_academy' ) . '</span>',
        'collapse' => '<span class="screen-reader-text">' . __( 'collapse child menu', 'ld_academy' ) . '</span>',
    ) );

    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', get_template_directory_uri() . "/build/js/jquery-3.6.0.min.js", array(), '3.6.0' );

    // wp_enqueue_script('jquery', false, array(), false, false);
    wp_enqueue_script( 'libs_js', get_template_directory_uri() . '/build/js/libs.js?v='.get_file_modify('/build/js/libs.js'), array('jquery'), null, true );

    wp_enqueue_script( 'customization_js', get_template_directory_uri() . '/build/js/customization.js?v=1&d='.get_file_modify('/build/js/customization.js'), array('jquery', 'libs_js'), null, true );

    // static variables
    $vars = array(
        'ajax_url'   => admin_url( 'admin-ajax.php' ),
        'site_url'   => get_site_url()
    );

    wp_localize_script( 'customization_js', 'var_from_php', $vars );

    //Remove Gutenberg Block Library CSS from loading on the frontend
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'wc-block-style' ); // Remove WooCommerce block CSS


    remove_action('wp_head', 'wp_print_scripts');
    remove_action('wp_head', 'wp_enqueue_scripts', 1);

    add_action('wp_footer', 'wp_print_scripts', 5);
    add_action('wp_footer', 'wp_print_head_scripts', 5);
}
add_action( 'wp_enqueue_scripts', 'px_site_scripts' );


// ===========================
// ===========================
// Add type="module" to script file with our customization
function add_data_attribute($tag, $handle) {
    if ( 'corppix_site_js' !== $handle )
        return $tag;

    return str_replace( ' src', ' type="module" src', $tag );
}
add_filter('script_loader_tag', 'add_data_attribute', 10, 2);


/*********************************************************/
/*********************************************************/


/**
 * Add Dropcap option but keep the defaults.
 */
add_filter( 'tiny_mce_before_init', 'my_wpeditor_formats_options' );
function my_wpeditor_formats_options( $settings ){

    /* Default Style Formats */
    $default_style_formats = array(
        array(
            'title'   => 'Headings',
            'items' => array(
                array(
                    'title'   => 'Heading 1',
                    'format'  => 'h1',
                ),
                array(
                    'title'   => 'Heading 2',
                    'format'  => 'h2',
                ),
                array(
                    'title'   => 'Heading 3',
                    'format'  => 'h3',
                ),
                array(
                    'title'   => 'Heading 4',
                    'format'  => 'h4',
                ),
                array(
                    'title'   => 'Heading 5',
                    'format'  => 'h5',
                ),
                array(
                    'title'   => 'Heading 6',
                    'format'  => 'h6',
                ),
            ),
        ),
        array(
            'title'   => 'Inline',
            'items' => array(
                array(
                    'title'   => 'Bold',
                    'format'  => 'bold',
                    'icon'    => 'bold',
                ),
                array(
                    'title'   => 'Italic',
                    'format'  => 'italic',
                    'icon'    => 'italic',
                ),
                array(
                    'title'   => 'Underline',
                    'format'  => 'underline',
                    'icon'    => 'underline',
                ),
                array(
                    'title'   => 'Strikethrough',
                    'format'  => 'strikethrough',
                    'icon'    => 'strikethrough',
                ),
                array(
                    'title'   => 'Superscript',
                    'format'  => 'superscript',
                    'icon'    => 'superscript',
                ),
                array(
                    'title'   => 'Subscript',
                    'format'  => 'subscript',
                    'icon'    => 'subscript',
                ),
                array(
                    'title'   => 'Code',
                    'format'  => 'code',
                    'icon'    => 'code',
                ),
            ),
        ),
        array(
            'title'   => 'Blocks',
            'items' => array(
                array(
                    'title'   => 'Paragraph',
                    'format'  => 'p',
                ),
                array(
                    'title'   => 'Blockquote',
                    'format'  => 'blockquote',
                ),
                array(
                    'title'   => 'Div',
                    'format'  => 'div',
                ),
                array(
                    'title'   => 'Pre',
                    'format'  => 'pre',
                ),
            ),
        ),
        array(
            'title'   => 'Alignment',
            'items' => array(
                array(
                    'title'   => 'Left',
                    'format'  => 'alignleft',
                    'icon'    => 'alignleft',
                ),
                array(
                    'title'   => 'Center',
                    'format'  => 'aligncenter',
                    'icon'    => 'aligncenter',
                ),
                array(
                    'title'   => 'Right',
                    'format'  => 'alignright',
                    'icon'    => 'alignright',
                ),
                array(
                    'title'   => 'Justify',
                    'format'  => 'alignjustify',
                    'icon'    => 'alignjustify',
                ),
            ),
        ),
    );

    /* Our Own Custom Options */
    $custom_style_formats = array(
        array(
            'title'   => 'Special',
            'items' => array(
                array(
                    'title' => 'Caption 1',
                    'block' => 'p',
                    'classes' => 'caption1',
                    //'styles' => array('color' => '#fff')
                ),
                array(
                    'title' => 'Caption 2',
                    'block' => 'p',
                    'classes' => 'caption2',
                    //'styles' => array('color' => '#fff')
                ),
                array(
                    'title' => 'Form Caption',
                    'block' => 'p',
                    'classes' => 'form-caption',
                    //'styles' => array('color' => '#fff')
                ),

                /*array(
                    'title'   => 'Justify',
                    'format'  => 'alignjustify',
                    'icon'    => 'alignjustify',
                ),*/
            ),
        ),
    );

    /* Merge It */
    $new_style_formats = array_merge( $default_style_formats, $custom_style_formats );

    /* Add it in tinymce config as json data */
    $settings['style_formats'] = json_encode( $new_style_formats );
    return $settings;
}


function cc_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');


/**
 * Remove tag <p> и <br> in plugin contact form.
 */
add_filter('wpcf7_autop_or_not', '__return_false');

/**
 *  Disable Autocomplete
 */
add_filter( 'wpcf7_form_elements', 'imp_wpcf7_form_elements' );
function imp_wpcf7_form_elements( $content ) {

    $fieldsArr = array('fcf_user_name', 'fcf_user_email', 'fcf_user_message');

    foreach ($fieldsArr as $field) {
        $str_pos = strpos( $content, 'name="'.$field.'"' );

        if ( $str_pos ) {
            $content = substr_replace( $content, ' autocomplete="both" autocomplete="off" ', $str_pos, 0 );
        }
    }

    return $content;
}



// https://stackoverflow.com/questions/931725/simple-smtp-email-validation-function-for-php-also-is-it-worth-it
function email_domain_validation($domain) {
    if (checkdnsrr($domain, 'MX') || checkdnsrr($domain, 'A')) {
        return true;
    }

    return false;
}


function ajax_email_domain_validation() {
    if (
        isset($_REQUEST) &&
        isset($_REQUEST['email']) &&
        filter_var($_REQUEST['email'], FILTER_VALIDATE_EMAIL)
    ) {

        $email = $_REQUEST['email'];
        $domain = substr($email, strpos($email, '@') + 1);

        if (email_domain_validation($domain)) {
            wp_send_json(array('result' => true, 'email' => $email));
            die();
        }
    }

    wp_send_json(array('result' => false, 'email' => $email));

    die();
}
add_action("wp_ajax_ajax_email_domain_validation", "ajax_email_domain_validation");
add_action("wp_ajax_nopriv_ajax_email_domain_validation", "ajax_email_domain_validation");

function ajax_get_country() {
    $ip_addr = getIp();

    try {
        $json = file_get_contents('https://geolocation-db.com/json/'.$ip_addr);
        $obj = json_decode($json);

        wp_send_json(array('result' => true, 'country_code' => $obj->country_code, 'country_name' => $obj->country_name ));
    } catch (Exception $e) {
        wp_send_json(array('result' => false));
    }

    die();
}
add_action("wp_ajax_ajax_get_country", "ajax_get_country");
add_action("wp_ajax_nopriv_ajax_get_country", "ajax_get_country");




// validate user location
// and phone
add_filter( 'wpcf7_validate_text', 'custom_user_location_validation_filter', 20, 2 );
function custom_user_location_validation_filter( $result, $tag ) {
    $location = isset( $_POST['text-984'] ) ? trim( $_POST['text-984'] ) : '';
    if (!preg_match('/^[0-9\.\,\-\+\^e]*$/', $location)) {
        $validation_message = "Invalid location coordinates";
        $result->invalidate( $tag, $validation_message );
    }

    // phone server validation
    if (isset( $_POST['country_phone'] )) {
        $phone_digits = filter_var($_POST['country_phone'], FILTER_SANITIZE_NUMBER_INT);

        if (!preg_match('/^[+\-*#()0-9 ]*$/i', $_POST['country_phone'])) {
            $validation_message = "Invalid symbols in number, please use only digits and separators";
            $result->invalidate( $tag, $validation_message );
        }
    }

    return $result;
}


/** Get correct user IP address
 * @return string content
 */
function getIp() {
    $keys = [
        'HTTP_CLIENT_IP',
        'HTTP_X_FORWARDED_FOR',
        'REMOTE_ADDR'
    ];
    foreach ($keys as $key) {
        if (!empty($_SERVER[$key])) {
            $ip = trim(end(explode(',', $_SERVER[$key])));
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
}

add_filter( 'wpcf7_validate_tel*', 'custom_tel_confirmation_validation_filter', 20, 2 );
function custom_tel_confirmation_validation_filter( $result, $tag ) {
    // feature/52hxk1
    if (isset( $_POST['tel-71'] )) {
        $phone_digits = filter_var($_POST['tel-71'], FILTER_SANITIZE_NUMBER_INT);

        if (strlen($phone_digits) < 6) {
            $validation_message = "The field is too short.";
            $result->invalidate( $tag, $validation_message );
        }

        if (strlen($phone_digits) > 13) {
            $validation_message = "The field is too long.";
            $result->invalidate( $tag, $validation_message );
        }
    }
    return $result;
}

// Adding custom theme option page
if( function_exists('acf_add_options_page') ) {

    acf_add_options_page(array(
        'page_title' 	=> 'Theme General Settings',
        'menu_title'	=> 'Theme Settings',
        'menu_slug' 	=> 'theme-general-settings',
        'capability'	=> 'edit_posts',
        'redirect'		=> false
    ));
}
