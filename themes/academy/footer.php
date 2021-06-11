        <?php do_action('corppix_before_site_footer'); ?>

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
