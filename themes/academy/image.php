<?php

// Redirect attachment page to post that contain this attachment
wp_redirect(get_permalink($post->post_parent));