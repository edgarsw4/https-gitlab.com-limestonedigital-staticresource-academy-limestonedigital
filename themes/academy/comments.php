<div class="hl3"></div>

<div id="comments" class="clearfix">
	<?php
    $postid = get_the_id();
    $paged1 = (get_query_var('paged')) ? get_query_var('paged') : 1;

    //Gather comments for a specific page/post
    $comments = get_comments(array(
        'post_id' => $postid,
        'number' => 20,
        'status' => 'approve' //Change this to the type of comments to be displayed
    ));

    if ( $comments ) {

    	echo '<h3 class="post-comments">'.__('Comments','ld_academy').'</h3>';  ?>

        <section class="comment-block-wrapper">
            <?php

            //Display the list of comments
             wp_list_comments(array(
                'reverse_top_level' => false, //Show the latest comments at the top of the list
                'callback' => 'mytheme_comment2'
            ), $comments);  ?>

        </section>


    <?php } else {
        echo '<h3 class="post-comments">'.__('No comments', 'ld_academy').'</h3>';
    }

    ?>
</div>

<div class="clear"></div>

<div id="respond" class="comment-respond">
	<div class="live-comment">
		<?php if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) { ?>
			<!-- <div class="live-comment-title"><?php //echo __('send comments', 'ld_academy'); ?></div> -->
		<?php } ?>	

		<div class="live-comment-form">
			<div id="fields3">
				<div class="row">
				    <?php
					$args = array(
				        'title_reply' => __( 'Leave comments' ),
						'title_reply_to' => __( 'Leave comments to %s' ),
						'cancel_reply_link' => __( 'Cancel comments' ),
				        'comment_notes_before' => '',
				        'comment_notes_after' => '',
				        'label_submit' => __('Publish', 'ld_academy'),
						'fields' => apply_filters(
							'comment_form_default_fields', array(
								'author' =>'<div class="col-sm-6"><div class="form-group"><input id="author" placeholder="'.__('Name', 'ld_academy').'" name="author" type="text" value="' .
									esc_attr( $commenter['comment_author'] ).'" size="30"'.$aria_req.' aria-required="true" /></div></div>',
								'email'  => '<div class="col-sm-6"><div class="form-group">' . '<input id="email" placeholder="'.__('E-mail', 'ld_academy').'" name="email" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ).'" size="30"/></div></div>'
							)
						),
						'comment_field' => '<div class="col-sm-12"><div class="form-group"><textarea id="comment" name="comment" placeholder="" aria-required="true"></textarea></div></div>'
						);

				    comment_form( $args, $postid );
				    ?>
				</div>
			</div>
		</div>

	</div>
</div>