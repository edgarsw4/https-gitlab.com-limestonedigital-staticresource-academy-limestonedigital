<?php
class Custom_sublevel_menu_mobile extends Walker_Nav_Menu {

    function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {

        $title        = $item->title;
        $url          = $item->url;
        $description  = $item->description;
        $classes      = $item->classes;
        $special_submenu_check  = $item->special_submenu_check;
        $permalink              = $item->url;
        $add_attribute          = $item->add_attribute;
        $button_title = strtolower('all '.$title);

        if (substr($button_title, -1) !== 's' && strtolower($title) !== 'portfolio') {
            $button_title .= 's';
        }

        $li_class = ( $special_submenu_check )
                        ? 'menu-item-has-children js-special-sub-menu-holder'
                        : '';

        $output .= "<li class='".implode(" ", $item->classes)." ".$li_class."'>";
            $output .= '<a href="' . $permalink . '">'.$title;
                if( $description != '' && $depth == 0 ) {
                    $output .= '<small class="description">' . $description . '</small>';
                }
            $output .= '</a>';

            if ( $special_submenu_check ) {
                $output .= '<div class="special-sub-menu js-special-sub-menu">';
                $output .= '<div class="inner-holder">';
                    $output .= '<button aria-label="'.__("back").'" class="js-prev-menu prev-menu">'.__("back").'</button>';

                    // Getting data from menu item https://prnt.sc/re8rue
                    // Format:
                    // {{"Core services"dedicated-team||discovery-phase||managed-delivery||build-from-scratch}}
                    // Core services - column caption
                    // dedicated-team||discovery-phase||managed-delivery||build-from-scratch - slug for pages
                    $sub_menu_blocks  = $item->sub_menu_blocks;

                    // separate caption from items
                    $matches = explode('{{', $sub_menu_blocks);
                    array_shift($matches);
                    $matches = array_map(
                            function($item) {
                                $item = str_replace("\r", '', $item);
                                $item = str_replace("\n", '', $item);
                                $item = str_replace('}}', '', $item);
                                return $item;
                            },
                            $matches
                    );

                    // build our custom menu structure
                    foreach ( $matches as $match ) {
                        $output .= '<div class="column">';
                            $parts  = explode('"', $match);

                            if ( !empty($parts[1]) ) {
                                $output .= '<div class="caption">'.$parts[1].'</div>';
                            }

                            if ( !empty($parts[2]) ) {
                                $output .= '<ul class="link-list">';
                                foreach ( explode('||', $parts[2]) as $item ) {
                                    $item_data =  explode('*', $item);
                                    $page = get_page_by_path($item, OBJECT);
                                    $title = (isset($item_data[1]) && $item_data[1]) ? $item_data[1]: $page->post_title;
                                    $output .= '<li><a href="'.get_permalink($page->ID).'">
                                                                    '.$title.'
                                                                </a></li>';
                                }
                                $output .= '</ul>';
                            }

                        $output .= '</div>';

                    }

                    $output .= '<a href="'.$url.'"
                                   class="btn-main service-btn">'.$button_title.'</a>';

                $output .= '</div>';
                $output .= '</div>';
            }

    }
}

?>
