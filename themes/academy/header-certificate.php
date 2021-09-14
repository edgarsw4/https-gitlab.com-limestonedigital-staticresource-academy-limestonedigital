<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <!--<meta name="viewport" content="width=device-width, user-scalable=no" />-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no" />
    <meta name="SKYPE_TOOLBAR" content ="SKYPE_TOOLBAR_PARSER_COMPATIBLE"/>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <?php wp_head(); ?>
    <?php do_action('corppix_before_close_head_tag'); ?>
</head>
<body <?php body_class($body_class); ?>>

<?php do_action('corppix_after_open_body_tag'); ?>


<div id="wrapper" class="wrapper">

    <?php do_action('corppix_before_site_header'); ?>

    <?php do_action('corppix_after_site_header'); ?>

    <main id="main-wrapper">
        <?php do_action('corppix_after_primary_wrapper_beginning_tag'); ?>
