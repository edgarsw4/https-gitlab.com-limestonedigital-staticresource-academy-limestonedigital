<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<?php
require_once get_template_directory() . '/inc/Mobile_Detect.php';

$post_id       = get_queried_object_id();
global $all_post_meta;
global $options;
$all_post_meta = get_post_meta( $post_id );
$options    = get_fields('options');
$detect = new Mobile_Detect;
// additional page class
$body_class = ($detect->isSafari())? 'safari': '';
$body_class .= ($detect->isMobile())? ' mobile': '';
$body_class .= ($detect->isTablet())? ' tablet': '';

$popup_button = $args['popup_button'];
$menu = (empty($args['menu']))? 'primary': $args['menu'];

?>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="SKYPE_TOOLBAR" content ="SKYPE_TOOLBAR_PARSER_COMPATIBLE"/>
    <?php if (is_front_page()) { ?>
    <meta name="facebook-domain-verification" content="<?php echo $options['facebook-domain-verification']; ?>" />
    <?php } ?>
    <?php if ( is_404() ) { ?>
        <meta name="robots" content="noindex, nofollow"/>
    <?php } ?>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <?php wp_head(); ?>
    <?php do_action('corppix_before_close_head_tag'); ?>
</head>
<body <?php body_class($body_class); ?>>

<?php do_action('corppix_after_open_body_tag'); ?>


<div id="wrapper" class="wrapper">

    <?php do_action('corppix_before_site_header'); ?>

    <header id="site-header" class="site-header">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 inner">

                    <a href="<?php echo pll_home_url(); ?>" class="logo">
                        <svg id="Logo" xmlns="http://www.w3.org/2000/svg"
                             width="153" height="51" viewBox="0 0 153 51">
                            <path class="cls-1" fill="#00b100" fill-rule="evenodd" d="M109.224,93.217V55H98v47h21.267c0.933,0,1.85-.032,2.745-0.1V93a21.7,21.7,0,0,1-3.283.24Zm3.731-29.46h5.773c9.4-.016,15.564,5.639,15.564,14.743,0,6.588-3.2,11.359-8.571,13.5v9.43C137.533,99.224,145,90.8,145,78.51c0-14.391-10.25-23.5-25.735-23.5h-6.327Z" transform="translate(-98 -55)"/>
                            <path class="cls-2" fill="#fff" d="M151.01,84.023h9.973V81.178h-6.862V69.946H151.01V84.023Zm10.7-.048h3.046V73.2h-3.046V83.974Zm1.523-12.444a1.769,1.769,0,0,0,1.866-1.667,1.372,1.372,0,0,0,0-.143A1.72,1.72,0,0,0,163.382,68q-0.074,0-.147.006a1.772,1.772,0,1,0-.2,3.539,1.831,1.831,0,0,0,.2,0V71.53Zm17.058,1.309a4.513,4.513,0,0,0-3.7,1.853,3.865,3.865,0,0,0-3.51-1.853,4.392,4.392,0,0,0-3.456,1.471V73.2h-2.91V83.974h3.051V78.587c0-2,1.009-2.9,2.413-2.9s2.09,0.808,2.09,2.564v5.727h3.056V78.522c0-1.934.923-2.839,2.257-2.839,1.188,0,1.933.808,1.933,2.564v5.727h3.046V77.757C184.558,74.4,182.766,72.839,180.293,72.839Zm10.826,2.354a2.53,2.53,0,0,1,2.554,2.306h-5.13A2.515,2.515,0,0,1,191.119,75.193Zm5.4,3.313a5.176,5.176,0,0,0-5.4-5.565,5.315,5.315,0,0,0-5.556,5.522,5.576,5.576,0,0,0,5.939,5.856,5.392,5.392,0,0,0,4.32-1.773l-1.62-1.934a3.28,3.28,0,0,1-2.608,1.164,2.849,2.849,0,0,1-2.986-2.419h7.884C196.481,79.093,196.518,78.749,196.518,78.506Zm5.314,5.759c3.142,0,4.859-1.358,4.859-3.437,0-4.471-6.3-2.6-6.3-4.536,0-.6.594-1.078,1.993-1.078a5.351,5.351,0,0,1,2.991.862l0.972-2.219a8.288,8.288,0,0,0-3.942-.905c-3.061,0-4.784,1.374-4.784,3.458,0,4.542,6.291,2.6,6.291,4.5,0,0.673-.54,1.077-1.966,1.077a6.2,6.2,0,0,1-3.6-1.158l-0.988,2.306A8.733,8.733,0,0,0,201.832,84.265Zm12.754-2.882a1.965,1.965,0,0,1-1.232.415,1.277,1.277,0,0,1-1.312-1.465V75.791h2.63V73.545h-2.63V70.883H209v2.661h-1.62v2.246H209V80.37c0,2.629,1.447,3.949,3.931,3.949a4.23,4.23,0,0,0,2.484-.69Zm6.76,0.345c-1.533,0-2.7-1.175-2.7-3.135s1.183-3.135,2.7-3.135,2.7,1.18,2.7,3.135S222.885,81.728,221.346,81.728Zm0,2.58a5.716,5.716,0,1,0-5.805-5.716A5.511,5.511,0,0,0,221.346,84.308Zm13.288-11.469a4.656,4.656,0,0,0-3.6,1.5v-1.12h-2.915V83.99h3.05V78.652c0-2.041,1.08-2.968,2.614-2.968,1.393,0,2.2.808,2.2,2.564v5.727h3.056V77.757C239.046,74.4,237.167,72.839,234.634,72.839ZM245.6,75.193a2.537,2.537,0,0,1,2.56,2.306h-5.136A2.515,2.515,0,0,1,245.6,75.193Zm5.4,3.313a5.177,5.177,0,0,0-5.4-5.565,5.319,5.319,0,0,0-5.555,5.071c-0.007.15-.007,0.3,0,0.452a5.576,5.576,0,0,0,5.939,5.856,5.39,5.39,0,0,0,4.32-1.773l-1.62-1.934a3.3,3.3,0,0,1-2.619,1.164,2.849,2.849,0,0,1-2.98-2.419h7.878C250.963,79.093,251,78.749,251,78.506Zm-68.095,23.321h3.062V91.053h-3.057Zm1.523-12.444a1.769,1.769,0,0,0,1.871-1.66,1.529,1.529,0,0,0,0-.166,1.725,1.725,0,0,0-1.738-1.714q-0.067,0-.135.006a1.767,1.767,0,1,0,0,3.534h0Zm-18.57,12.444h3.046V91.053h-3.046v10.774Zm1.523-12.444a1.77,1.77,0,0,0,1.872-1.66c0-.055,0-0.111,0-0.166a1.726,1.726,0,0,0-1.738-1.714c-0.046,0-.091,0-0.136.006a1.767,1.767,0,1,0,0,3.534h0ZM154.11,98.935V90.487h2.97c2.8,0,4.627,1.616,4.627,4.223s-1.83,4.224-4.627,4.224h-2.97ZM151,101.773h6.242c4.595,0,7.559-2.941,7.559-7.062s-2.981-7.063-7.559-7.063H151.01Zm25.054-3.281a2.591,2.591,0,0,1-2.808-2.585,2.8,2.8,0,0,1,5.6-.054A2.588,2.588,0,0,1,176.054,98.492Zm2.905-7.542v1.212a4.227,4.227,0,0,0-3.515-1.546,5.22,5.22,0,1,0-.336,10.436q0.168,0,.336,0A4.327,4.327,0,0,0,178.8,99.7v0.459c0,2.117-.95,3.28-3.121,3.28a5.705,5.705,0,0,1-3.753-1.4l-1.209,2.446A8.476,8.476,0,0,0,175.913,106c3.78,0,5.837-1.875,5.837-6.217V90.967Zm15.319,8.183a1.943,1.943,0,0,1-1.232.415,1.279,1.279,0,0,1-1.312-1.471V93.542h2.619V91.3h-2.619V88.6h-3.067V91.3h-1.619v2.246h1.619v4.585c0,2.624,1.448,3.949,3.931,3.949a4.206,4.206,0,0,0,2.479-.7Zm5.729,0.754a1.452,1.452,0,0,1-1.669-1.417c0-.846.438-1.379,1.825-1.379h2v1.2A2.159,2.159,0,0,1,200.007,99.888Zm0.232-9.293a7.114,7.114,0,0,0-4.32,1.325l1.026,2.192a4.553,4.553,0,0,1,2.894-.991c1.588,0,2.349.776,2.349,2.111h-2.349c-3.056,0-4.287,1.347-4.287,3.383s1.371,3.459,3.72,3.459a3.249,3.249,0,0,0,3.11-1.562V101.7h2.857v-6.26c0-3.27-1.858-4.822-5-4.822V90.595Zm6.636-3.879h3.056v15h-3.056v-15Z" transform="translate(-98 -55)"/>
                        </svg>
                    </a>

                    <div class="header-content-wrapper">
                        <div class="header-content">
                            <?php wp_nav_menu( [ 
                                //'menu' => 'Header menu '.strtoupper(pll_current_language()),
                                'container' => 'nav',
                                'theme_location'  => $menu
                            ] ); ?>

                            <ul class="language-switcher language-switcher-tablet">
                                <?php 
                                $args = array(
                                    'show_flags' => 0, 
                                    'show_names' => 0, 
                                    'force_home' => 0,
                                    'display_names_as'=>'slug'
                                );
                                pll_the_languages($args);
                                ?>
                            </ul>
                        </div>
                    </div>

                    <div class="header-buttons">
                        <?php
                        if (
                            isset($options['header_button_link_'.pll_current_language()])
                            && !empty($options['header_button_link_'.pll_current_language()])
                            && $popup_button
                        ) {
                        ?>
                            <a href="<?php echo $options['header_button_link_'.pll_current_language()]; ?>"
                            class="btn-main js-open-popup-activator">
                                <?php echo $options['header_button_text_'.pll_current_language()] ?>
                            </a>
                        <?php } ?>

                        <div class="language-switcher-wrapper language-switcher-wrapper-desktop">
                            <ul class="language-switcher">
                                <?php
                                $args = array(
                                    'show_flags' => 1, 
                                    'force_home' => 0,
                                    'show_names' => 1, 
                                    'display_names_as'=>'slug'
                                );
                                pll_the_languages($args);
                                ?>
                            </ul>
                        </div>

                        <div class="menu-btn">
                            <div class="menu-btn__burger"></div>
                        </div>
                    </div>

                </div>
           </div>
        </div>
    </header>

    <?php do_action('corppix_after_site_header'); ?>

    <main id="main-wrapper">
        <?php do_action('corppix_after_primary_wrapper_beginning_tag'); ?>
