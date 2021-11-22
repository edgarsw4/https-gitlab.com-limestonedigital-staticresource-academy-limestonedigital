<?php
if (empty($options)) {
    $options       = get_fields('options');
}

$facebook  = $options['facebook_link'];
$twitter   = $options['twitter_link'];
$instagram = $options['instagram_link'];
$linkedin  = $options['linkedin_link'];
?>
        
        
        <?php do_action('corppix_before_site_footer'); ?>

        <footer id="site-footer" class="site-footer">
            <?php
            $clutch_url  = $options['clutch_url'];

            $ank_box     = $options['ank_image'];
            $ank_box_url = $ank_box['url'];

            $copyright        = $options['copyrights_'.pll_current_language()];

            $contacts_label   = $options['contacts_label_'.pll_current_language()];
            $address          = $options['address_'.pll_current_language()];
            $menu_label       = $options['menu_label_'.pll_current_language()];
            $find_us_label    = $options['find_us_label_'.pll_current_language()];
            ?>
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-4 clutch-desktop">
                        <div class="clutch-holder">
                            <a rel="noopener" href="<?php echo $clutch_url; ?>" target="_blank" class="footer-logo">
                                <script type="text/javascript" src="https://widget.clutch.co/static/js/widget.js"></script><div class="clutch-widget" data-url="https://widget.clutch.co" data-widget-type="2" data-height="50" data-darkbg="1" data-clutchcompany-id="414239"></div>
                            </a>

                            <a rel="noopener" class="footer-logo-ahk" href="https://tschechien.ahk.de/cz/" target="_blank"><img src="<?php echo $ank_box_url; ?>" alt="thumb" /></a>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                    <?php
                        echo '<p class="footer-caption">'.do_shortcode($contacts_label).'<p>';

                        if (isset($address) && !empty($address)) { ?>
                            <div class="address">
                                <?php echo do_shortcode($address); ?>
                            </div>
                        <?php }

                    ?>
                    </div>
                    <div class="col-xs-12 col-sm-3 col-md-2">
                    <?php 
                        echo '<p class="footer-caption">'.do_shortcode($menu_label).'<p>';
                        wp_nav_menu(array(
                            'theme_location' => 'footer-menu',
                            'menu_class' => 'menu'
                        ));
                    ?>
                    </div>
                    <div class="col-xs-12 col-sm-3 col-md-2">
                        <?php echo '<p class="footer-caption">'.do_shortcode($find_us_label).'<p>'; ?>
                    
                        <div class="social-links">
                            <?php
                            if ( !empty($linkedin) ) {
                                echo '<a rel="noopener" href="'.$linkedin.'" target="_blank" class="linkedin">'.__('Linkedin').'</a>';
                            }
                            if ( !empty($instagram) ) {
                                echo '<a rel="noopener" href="'.$instagram.'" target="_blank" class="instagram">'.__('Instagram').'</a>';
                            }
                            if ( !empty($facebook) ) {
                                echo '<a rel="noopener" href="'.$facebook.'" target="_blank" class="facebook">'.__('Facebook').'</a>';
                            }
                            if ( !empty($twitter) ) {
                                echo '<a rel="noopener" href="'.$twitter.'" target="_blank" class="twitter">'.__('Twitter').'</a>';
                            }
                            ?>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4 clutch-tablet">
                        <div class="clutch-holder">
                            <a rel="noopener" href="<?php echo $clutch_url; ?>" target="_blank" class="footer-logo">
                                <script type="text/javascript" src="https://widget.clutch.co/static/js/widget.js"></script><div class="clutch-widget" data-url="https://widget.clutch.co" data-widget-type="2" data-height="50" data-darkbg="1" data-clutchcompany-id="414239"></div>
                            </a>

                            <a rel="noopener" class="footer-logo-ahk" href="https://tschechien.ahk.de/cz/" target="_blank"><img src="<?php echo $ank_box_url; ?>" alt="thumb" /></a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="footer-line"></div>

                        <p class="copyright"><?php echo do_shortcode($copyright); ?></p>
                    </div>
                </div>
            </div>
        </footer>

        <?php do_action('corppix_after_site_footer'); ?>

    </main><!-- end of <main> -->

</div><!-- .wrapper -->


<?php
include( locate_template('parts/popups.php', false, false ));

do_action('corppix_after_site_page_tag');

wp_footer();

do_action('corppix_before_body_closing_tag');
?>
</body>
</html>
