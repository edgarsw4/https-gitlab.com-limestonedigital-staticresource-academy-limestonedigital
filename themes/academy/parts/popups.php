<?php
global $options;
global $all_post_meta;

if (empty($all_post_meta) || empty($options)) {
    $all_post_meta = get_post_meta( get_queried_object_id() );
    $all_meta = $all_post_meta;
    $options       = get_fields('options');
}

$join_title = $options['join_popup_title_'.pll_current_language()];
$join_form = $options['join_popup_form_'.pll_current_language()];

if (!empty($join_form)) {
?>
<div id="popup-join" class="popup">
    <div class="my_overlay js-popup-close"></div>
    <div class="popup-wrapper">
        <div class="popup-wrapper-inner container">
            <div class="in text-center js-popup-inner">
                <div class="join-form-wrapper">
                    <h2 class="h2 title"><?php echo $join_title; ?></h2>

                    <?php echo do_shortcode($join_form); ?>
                </div>
            </div>
            <button class="popup-close js-popup-close">close popup</button>
        </div>
    </div>
</div>
<?php
}

$cookie_policy_text = $options['cookie_policy_text_'.pll_current_language()];

if ( !empty($cookie_policy_text) ) {
    ?>
    <div id="cookie-policy-box" class="js-cookie-policy-box">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <?php echo do_shortcode($cookie_policy_text); ?>
                    <button aria-label="<?php _e('Close'); ?>" class="btn-ok js-close-reminder">
                        <?php _e('OK'); ?>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <?php
}

if ( is_page_template('template-course.php') ) {
    $title = $all_post_meta['form_popup_title'][0];
    $description = $all_post_meta['form_popup_description'][0];
    $button_text = $all_post_meta['form_popup_button_text'][0];
?>
<div id="thanks-join-popup" class="popup">
    <div class="my_overlay js-popup-close"></div>
    <div class="popup-wrapper">
        <div class="popup-wrapper-inner">
            <div class="in text-center js-popup-inner">
                <p class="box-caption"><?php echo $title; ?></p>
                <p class=""><?php echo $description; ?></p>
                <button aria-label="<?php _e('Close'); ?>" class="btn-main js-popup-close"><?php echo $button_text; ?></button>
            </div>
            <button class="popup-close js-popup-close"><?php _e('Close'); ?></button>
        </div>
    </div>
</div>

<?
}
