<?php
/**
 * @package Jourday_REST_FRONT
 * @version 1.0
 */
/*
Plugin Name: Jourday REST FRONT
Plugin URI: https://github.com/Jourdayltd/rest-front
Description: Plugin for frontend part of Jourday REST API .
Author: Mikhail Skorokhod
Version: 1.0
Author URI: http://arcanas.eu/
Text Domain: rest front
*/


if (!defined('JD_REST_FRONT_DIR')) {
    define('JD_REST_FRONT_DIR', plugin_dir_path(__FILE__));
}
if (!defined('JD_REST_FRONT_URL')) {
    define('JD_REST_FRONT_URL', plugin_dir_url(__FILE__));
}

/******* KEYS *********************/
if (!defined('WP_EDIT_USER')) {
    define('WP_EDIT_USER', 'wp-ajax-edit-user');
}
if (!defined('WP_EDIT_PRODUCT')) {
    define('WP_EDIT_PRODUCT', 'wp-ajax-key');
}
if (!defined('WP_PROFILE')) {
    define('WP_PROFILE', 'user');
}

/****************  REST URLS *******************/

if (!defined('REST_URL_USER_EDIT_SET')) {
    define('REST_URL_USER_EDIT_SET', 'wp/user/edit/set/');
}
if (!defined('REST_URL_USER_EDIT_GET')) {
    define('REST_URL_USER_EDIT_GET', 'wp/user/edit/get');
}
if (!defined('REST_URL_USER_SHOW_GET')) {
    define('REST_URL_USER_SHOW_GET', 'wp/user/show/get');
}

if (!defined('REST_URL_PRODUCT_CREATE')) {
    define('REST_URL_PRODUCT_CREATE', 'wp/product/create/');
}
if (!defined('REST_URL_PRODUCT_EDIT')) {
    define('REST_URL_PRODUCT_EDIT', 'wp/product/edit/');
}
if (!defined('REST_URL_PRODUCT_SHOW')) {
    define('REST_URL_PRODUCT_SHOW', 'wp/product/show/');
}

if (!defined('REST_URL_COMMENTS_CREATE')) {
    define('REST_URL_COMMENTS_CREATE', 'wp/comments/create/');
}
if (!defined('REST_URL_COMMENTS_EDIT')) {
    define('REST_URL_COMMENTS_EDIT', 'wp/comments/edit/');
}
if (!defined('REST_URL_COMMENTS_SHOW')) {
    define('REST_URL_COMMENTS_SHOW', 'wp/comments/show/');
}

if (!defined('REST_URL_REVIEW_CREATE')) {
    define('REST_URL_REVIEW_CREATE', 'wp/review/create/');
}
if (!defined('REST_URL_REVIEW_EDIT')) {
    define('REST_URL_REVIEW_EDIT', 'wp/review/edit/');
}
if (!defined('REST_URL_REVIEW_SHOW')) {
    define('REST_URL_REVIEW_SHOW', 'wp/review/show/');
}

if (!defined('REST_URL_BOOKING_CREATE')) {
    define('REST_URL_BOOKING_CREATE', 'wp/booking/create/');
}
if (!defined('REST_URL_BOOKING_EDIT')) {
    define('REST_URL_BOOKING_EDIT', 'wp/booking/edit/');
}
if (!defined('REST_URL_BOOKING_SHOW')) {
    define('REST_URL_BOOKING_SHOW', 'wp/booking/show/');
}


if (!defined('REST_URL_FINAL_PRICE')) {
    define('REST_URL_FINAL_PRICE', 'booking/final/price');
}
if (!defined('REST_URL_FORM_GET')) {
    define('REST_URL_FORM_GET', 'wp/form/get/');
}
if (!defined('REST_URL_FORM_CREATE')) {
    define('REST_URL_FORM_CREATE', 'wp/form/create/');
}
if (!defined('REST_URL_FORM_CREATE_MAIN')) {
    define('REST_URL_FORM_CREATE_MAIN', 'wp/form/create/main');
}
if (!defined('REST_URL_FORM_CREATE_WITH_IMAGE')) {
    define('REST_URL_FORM_CREATE_WITH_IMAGE', 'wp/form/create/image');
}
if (!defined('REST_URL_FORM_CREATE_RELATED')) {
    define('REST_URL_FORM_CREATE_RELATED', 'wp/form/create/related/');
}
if (!defined('REST_URL_FORM_CREATE_RELATED_IMAGE')) {
    define('REST_URL_FORM_CREATE_RELATED_IMAGE', 'wp/form/create/related/image/');
}
if (!defined('REST_URL_FORM_DELETE_RELATED')) {
    define('REST_URL_FORM_DELETE_RELATED', 'wp/form/delete/related');
}

if (!defined('REST_URL_PAYMENT_GET')) {
    define('REST_URL_PAYMENT_GET', 'wp/payment/get');
}
if (!defined('REST_URL_PAYMENT_SHOW')) {
    define('REST_URL_PAYMENT_SHOW', 'wp/payment/show');
}

if (!defined('REST_URL_MESSAGE_CREATE')) {
    define('REST_URL_MESSAGE_CREATE', 'wp/message/create');
}
if (!defined('REST_URL_MESSAGE_GET')) {
    define('REST_URL_MESSAGE_GET', 'wp/message/get');
}
if (!defined('REST_URL_MESSAGE_SHOW')) {
    define('REST_URL_MESSAGE_SHOW', 'wp/message/show');
}

if (!defined('REST_URL_LOGIN_GET')) {
    define('REST_URL_LOGIN_GET', 'wp/login');
}
if (!defined('REST_URL_LOGIN_POST')) {
    define('REST_URL_LOGIN_POST', 'users/authenticate');
}

if (!defined('REST_URL_OWNER_PRODUCT')) {
    define('REST_URL_OWNER_PRODUCT', 'products/owner');
}
if (!defined('REST_URL_OWNER_BOOKING')) {
    define('REST_URL_OWNER_BOOKING', 'booking/owner');
}
if (!defined('REST_URL_OWNER_MESSAGE')) {
    define('REST_URL_OWNER_MESSAGE', 'messages/owner');
}

/**********  ROUTES ***************/


/*********************** FRONT ROUTES *********************************/

define('FRONT_HOME', 'front-home');
define('FRONT_USER_REGISTER', 'front-register');
define('FRONT_PRODUCT_LIST', 'front-product-list');
define('FRONT_PRODUCT', 'front-product-item');
define('FRONT_ADD_TO_CARD', 'front-add-to-card');
define('FRONT_PURCHASE', 'front-purchase');
define('FRONT_PROFILE', 'front-profile');
define('FRONT_SIGN_IN', 'front-sign-in');
define('FRONT_APPROVAL', 'front-approval');


define('FRONT_PAYPAL', 'front-paypal');


$front_home_url = '<script>var front_home_url = "' . WP_REST_API .  FRONT_HOME . '";</script>';

add_action('wp_head', function () use ($front_home_url) {
    echo $front_home_url;
});

$front_register_url = '<script>var front_register_url = "' . WP_REST_API .  FRONT_USER_REGISTER . '";</script>';

add_action('wp_head', function () use ($front_register_url) {
    echo $front_register_url;
});

$front_product_list_url = '<script>var front_product_list_url = "' . WP_REST_API .  FRONT_PRODUCT_LIST . '";</script>';

add_action('wp_head', function () use ($front_product_list_url) {
    echo $front_product_list_url;
});

$front_product_url = '<script>var front_product_url = "' . WP_REST_API .  FRONT_PRODUCT . '";</script>';

add_action('wp_head', function () use ($front_product_url) {
    echo $front_product_url;
});

$front_backpack_url = '<script>var front_backpack_url = "' . WP_REST_API .  FRONT_ADD_TO_CARD . '";</script>';

add_action('wp_head', function () use ($front_backpack_url) {
    echo $front_backpack_url;
});

$front_purchase_url = '<script>var front_purchase_url = "' . WP_REST_API .  FRONT_PURCHASE . '";</script>';

add_action('wp_head', function () use ($front_purchase_url) {
    echo $front_purchase_url;
});

$front_profile_url = '<script>var front_profile_url = "' . WP_REST_API .  FRONT_PROFILE . '";</script>';

add_action('wp_head', function () use ($front_profile_url) {
    echo $front_profile_url;
});

$front_sign_in_url = '<script>var front_sign_in_url = "' . WP_REST_API .  FRONT_SIGN_IN . '";</script>';

add_action('wp_head', function () use ($front_sign_in_url) {
    echo $front_sign_in_url;
});

$front_product_list_url = '<script>var front_approval_url = "' . WP_REST_API .  FRONT_APPROVAL . '";</script>';

add_action('wp_head', function () use ($front_product_list_url) {
    echo $front_product_list_url;
});


/******* Template Urls *******************/

$front_header = WP_REST_API . 'wp-content/plugins/rest-front/template/partials/header.html';
$front_footer = WP_REST_API . 'wp-content/plugins/rest-front/template/partials/footer.html';

$front_home_content = WP_REST_API . 'wp-content/plugins/rest-front/template/partials/home/content.html';

$front_add_to_card_content = WP_REST_API . 'wp-content/plugins/rest-front/template/partials/add-to-card/content.html';

$front_product_content = WP_REST_API . 'wp-content/plugins/rest-front/template/partials/product/content.html';

$front_product_list_content = WP_REST_API . 'wp-content/plugins/rest-front/template/partials/product-list/content.html';

$front_purchase_content = WP_REST_API . 'wp-content/plugins/rest-front/template/partials/purchase/content.html';

$front_register_content = WP_REST_API . 'wp-content/plugins/rest-front/template/partials/register/content.html';

$front_profile_content = WP_REST_API . 'wp-content/plugins/rest-front/template/partials/profile/content.html';

$front_sign_in_content = WP_REST_API . 'wp-content/plugins/rest-front/template/partials/sign-in/content.html';

$front_approval_content = WP_REST_API . 'wp-content/plugins/rest-front/template/partials/approval/content.html';
$front_approval_content_success = WP_REST_API . 'wp-content/plugins/rest-front/template/partials/approval/content.html';
$front_approval_content_failure = WP_REST_API . 'wp-content/plugins/rest-front/template/partials/approval/content_failure.html';


$front_header_url = '<script>var front_header = "' . $front_header . '";</script>';
$front_footer_url = '<script>var front_footer = "' . $front_footer . '";</script>';

$front_home_content_url = '<script>var front_home_content = "' . $front_home_content . '";</script>';

$front_add_to_card_content_url = '<script>var front_add_to_card_content = "' . $front_add_to_card_content . '";</script>';

$front_product_content_url = '<script>var front_product_content = "' . $front_product_content . '";</script>';

$front_product_list_content_url = '<script>var front_product_list_content = "' . $front_product_list_content . '";</script>';

$front_purchase_content_url = '<script>var front_purchase_content = "' . $front_purchase_content . '";</script>';

$front_register_content_url = '<script>var front_register_content = "' . $front_register_content . '";</script>';

$front_profile_content_url = '<script>var front_profile_content = "' . $front_profile_content . '";</script>';

$front_sign_in_content_url = '<script>var front_sign_in_content = "' . $front_sign_in_content . '";</script>';

$front_approval_content_url = '<script>var front_approval_content = "' . $front_approval_content . '";</script>';
$front_approval_content_success_url = '<script>var front_approval_content_success = "' . $front_approval_content_success . '";</script>';
$front_approval_content_failure_url = '<script>var front_approval_content_failure = "' . $front_approval_content_failure . '";</script>';
$front_wp_host = '<script>var front_wp_host = "' . WP_REST_API_HOST . '";</script>';
$front_rest_host = '<script>var front_rest_host = "' . REST_API_HOST . '";</script>';


add_action('wp_head', function () use ($front_header_url) {
    echo $front_header_url;
});
add_action('wp_head', function () use ($front_footer_url) {
    echo $front_footer_url;
});

add_action('wp_head', function () use ($front_home_content_url) {
    echo $front_home_content_url;
});

add_action('wp_head', function () use ($front_add_to_card_content_url) {
    echo $front_add_to_card_content_url;
});

add_action('wp_head', function () use ($front_product_content_url) {
    echo $front_product_content_url;
});

add_action('wp_head', function () use ($front_product_list_content_url) {
    echo $front_product_list_content_url;
});

add_action('wp_head', function () use ($front_purchase_content_url) {
    echo $front_purchase_content_url;
});

add_action('wp_head', function () use ($front_register_content_url) {
    echo $front_register_content_url;
});

add_action('wp_head', function () use ($front_profile_content_url) {
    echo $front_profile_content_url;
});

add_action('wp_head', function () use ($front_sign_in_content_url) {
    echo $front_sign_in_content_url;
});

add_action('wp_head', function () use ($front_approval_content_url) {
    echo $front_approval_content_url;
});
add_action('wp_head', function () use ($front_approval_content_success_url) {
    echo $front_approval_content_success_url;
});
add_action('wp_head', function () use ($front_approval_content_failure_url) {
    echo $front_approval_content_failure_url;
});
add_action('wp_head', function () use ($front_rest_host) {
    echo $front_rest_host;
});
add_action('wp_head', function () use ($front_wp_host) {
    echo $front_wp_host;
});
/******* Init Data *******************/

$rest_front_init = [
    'home' => [
        'title' => 'FRONT HOME',
        'content' => file_get_contents(JD_REST_FRONT_DIR . 'template/home.html'),
        'name' => FRONT_HOME
    ],
    'register' => [
        'title' => 'FRONT Register User',
        'content' => file_get_contents(JD_REST_FRONT_DIR . 'template/register.html'),
        'name' => FRONT_USER_REGISTER
    ],
    'product-list' => [
        'title' => 'FRONT Product List',
        'content' => file_get_contents(JD_REST_FRONT_DIR . 'template/product-list.html'),
        'name' => FRONT_PRODUCT_LIST
    ],
    'product-item' => [
        'title' => 'FRONT Product Item',
        'content' => file_get_contents(JD_REST_FRONT_DIR . 'template/product.html'),
        'name' => FRONT_PRODUCT
    ],
    'add-to-card' => [
        'title' => 'FRONT Add To Card',
        'content' => file_get_contents(JD_REST_FRONT_DIR . 'template/add-to-card.html'),
        'name' => FRONT_ADD_TO_CARD
    ],
    'purchase' => [
        'title' => 'FRONT Purchase',
        'content' => file_get_contents(JD_REST_FRONT_DIR . 'template/purchase.html'),
        'name' => FRONT_PURCHASE
    ],
    'profile' => [
        'title' => 'FRONT Profile',
        'content' => file_get_contents(JD_REST_FRONT_DIR . 'template/profile.html'),
        'name' => FRONT_PROFILE
    ],
    'sign-in' => [
        'title' => 'FRONT SignIn',
        'content' => file_get_contents(JD_REST_FRONT_DIR . 'template/sign-in.html'),
        'name' => FRONT_SIGN_IN
    ],
    'approval' => [
        'title' => 'FRONT Payment Approval',
        'content' => file_get_contents(JD_REST_FRONT_DIR . 'template/approval.html'),
        'name' => FRONT_APPROVAL
    ]
];

$GLOBALS['rest_front_init'] = $rest_front_init;

require_once JD_REST_FRONT_DIR . 'class/CreateNewFrontPage.php';

require_once JD_REST_FRONT_DIR . 'php-http-class/EasyFrontRequest.php';

function add_rest_front_vars_js()
{
    /******************************* API HOST ******************************/

    $rest_api_host = '<script>var rest_front_api_host = "'
        . REST_API_HOST . '";</script>';
    add_action('wp_head', function () use ($rest_api_host) {
        echo $rest_api_host;
    });

    /***************************** PAYPAL ***************************************/

    $rest_paypal = '<script>var rest_front_paypal = "'
        . FRONT_PAYPAL . '";</script>';
    add_action('wp_head', function () use ($rest_paypal) {
        echo $rest_paypal;
    });

    /*******************************   FRONT ******************************/

    /*******************************   SERVER ******************************/

    $jd_rest_edit_user_key = '<script>var front_edit_user_key = "' . WP_EDIT_USER . '";</script>';
    $jd_rest_edit_product_key = '<script>var front_edit_product_key = "' . WP_EDIT_PRODUCT . '";</script>';
    $jd_rest_profile_key = '<script>var front_profile_key = "' . WP_PROFILE . '";</script>';
    $jd_rest_login_post_url = '<script>var front_login_post_url = "' . REST_URL_LOGIN_POST . '/";</script>';

    add_action('wp_head', function () use ($jd_rest_edit_user_key) {
        echo $jd_rest_edit_user_key;
    });
    add_action('wp_head', function () use ($jd_rest_edit_product_key) {
        echo $jd_rest_edit_product_key;
    });
    add_action('wp_head', function () use ($jd_rest_profile_key) {
        echo $jd_rest_profile_key;
    });
    add_action('wp_head', function () use ($jd_rest_login_post_url) {
        echo $jd_rest_login_post_url;
    });


    $jd_rest_user_edit_get_url = '<script>var front_user_edit_get_url = "' . REST_URL_USER_EDIT_GET . '/";</script>';
    $jd_rest_user_show_get_url = '<script>var front_user_show_get_url = "' . REST_URL_USER_SHOW_GET . '/";</script>';
    $jd_rest_payment_get_url = '<script>var front_payment_get_url = "' . REST_URL_PAYMENT_GET . '/";</script>';
    $jd_rest_payment_show_url = '<script>var front_payment_show_url = "' . REST_URL_PAYMENT_SHOW . '/";</script>';
    $jd_rest_message_create_url = '<script>var front_message_create_url = "' . REST_URL_MESSAGE_CREATE . '/";</script>';
    $jd_rest_message_get_url = '<script>var front_message_get_url = "' . REST_URL_MESSAGE_GET . '/";</script>';
    $jd_rest_message_show_url = '<script>var front_message_show_url = "' . REST_URL_MESSAGE_SHOW . '/";</script>';

    $jd_rest_product_create_get_url = '<script>var front_product_create_get_url = "' . REST_URL_PRODUCT_CREATE . '/";</script>';
    $jd_rest_product_edit_get_url = '<script>var front_product_edit_get_url = "' . REST_URL_PRODUCT_EDIT . '/";</script>';
    $jd_rest_product_show_get_url = '<script>var front_product_show_get_url = "' . REST_URL_PRODUCT_SHOW . '/";</script>';

    $jd_rest_comments_create_get_url = '<script>var front_comments_create_get_url = "' . REST_URL_COMMENTS_CREATE . '/";</script>';
    $jd_rest_comments_edit_get_url = '<script>var front_comments_edit_get_url = "' . REST_URL_COMMENTS_EDIT . '/";</script>';
    $jd_rest_comments_show_get_url = '<script>var front_comments_show_get_url = "' . REST_URL_COMMENTS_SHOW . '/";</script>';

    $jd_rest_review_create_get_url = '<script>var front_review_create_get_url = "' . REST_URL_REVIEW_CREATE . '/";</script>';
    $jd_rest_review_edit_get_url = '<script>var front_review_edit_get_url = "' . REST_URL_REVIEW_EDIT . '/";</script>';
    $jd_rest_review_show_get_url = '<script>var front_review_show_get_url = "' . REST_URL_REVIEW_SHOW . '/";</script>';

    $jd_rest_form_create_url = '<script>var front_form_create_url = "' . REST_URL_FORM_CREATE . '/";</script>';
    $jd_rest_form_create_main_url = '<script>var front_form_create_main_url = "' . REST_URL_FORM_CREATE_MAIN . '/";</script>';
    $jd_rest_form_create_with_image_url = '<script>var front_form_create_with_image_url = "' . REST_URL_FORM_CREATE_WITH_IMAGE . '/";</script>';
    $jd_rest_form_create_related_url = '<script>var front_form_create_related_url = "' . REST_URL_FORM_CREATE_RELATED . '/";</script>';
    $jd_rest_form_create_related_image_url = '<script>var front_form_create_related_image_url = "' . REST_URL_FORM_CREATE_RELATED_IMAGE . '/";</script>';
    $jd_rest_form_delete_related_url = '<script>var front_form_delete_related_url = "' . REST_URL_FORM_DELETE_RELATED . '/";</script>';
    $jd_rest_form_get_url = '<script>var front_form_get_url = "' . REST_URL_FORM_GET . '/";</script>';
    $jd_rest_final_price_url = '<script>var front_final_price_get_url = "' . REST_URL_FINAL_PRICE . '/";</script>';


    $jd_rest_login_get_url = '<script>var front_login_get_url = "' . REST_URL_LOGIN_GET . '/";</script>';
    $jd_rest_login_post_url = '<script>var front_login_post_url = "' . REST_URL_LOGIN_POST . '/";</script>';

    add_action('wp_head', function () use ($jd_rest_user_edit_get_url) {
        echo $jd_rest_user_edit_get_url;
    });
    add_action('wp_head', function () use ($jd_rest_user_show_get_url) {
        echo $jd_rest_user_show_get_url;
    });
    add_action('wp_head', function () use ($jd_rest_payment_get_url) {
        echo $jd_rest_payment_get_url;
    });
    add_action('wp_head', function () use ($jd_rest_payment_show_url) {
        echo $jd_rest_payment_show_url;
    });
    add_action('wp_head', function () use ($jd_rest_message_create_url) {
        echo $jd_rest_message_create_url;
    });
    add_action('wp_head', function () use ($jd_rest_message_get_url) {
        echo $jd_rest_message_get_url;
    });
    add_action('wp_head', function () use ($jd_rest_message_show_url) {
        echo $jd_rest_message_show_url;
    });

    add_action('wp_head', function () use ($jd_rest_product_create_get_url) {
        echo $jd_rest_product_create_get_url;
    });
    add_action('wp_head', function () use ($jd_rest_product_show_get_url) {
        echo $jd_rest_product_show_get_url;
    });
    add_action('wp_head', function () use ($jd_rest_product_edit_get_url) {
        echo $jd_rest_product_edit_get_url;
    });

    add_action('wp_head', function () use ($jd_rest_comments_create_get_url) {
        echo $jd_rest_comments_create_get_url;
    });
    add_action('wp_head', function () use ($jd_rest_comments_show_get_url) {
        echo $jd_rest_comments_show_get_url;
    });
    add_action('wp_head', function () use ($jd_rest_comments_edit_get_url) {
        echo $jd_rest_comments_edit_get_url;
    });

    add_action('wp_head', function () use ($jd_rest_review_create_get_url) {
        echo $jd_rest_review_create_get_url;
    });
    add_action('wp_head', function () use ($jd_rest_review_show_get_url) {
        echo $jd_rest_review_show_get_url;
    });
    add_action('wp_head', function () use ($jd_rest_review_edit_get_url) {
        echo $jd_rest_review_edit_get_url;
    });

    add_action('wp_head', function () use ($jd_rest_form_create_url) {
        echo $jd_rest_form_create_url;
    });
    add_action('wp_head', function () use ($jd_rest_form_create_main_url) {
        echo $jd_rest_form_create_main_url;
    });
    add_action('wp_head', function () use ($jd_rest_form_create_with_image_url) {
        echo $jd_rest_form_create_with_image_url;
    });
    add_action('wp_head', function () use ($jd_rest_form_create_related_url) {
        echo $jd_rest_form_create_related_url;
    });
    add_action('wp_head', function () use ($jd_rest_form_create_related_image_url) {
        echo $jd_rest_form_create_related_image_url;
    });
    add_action('wp_head', function () use ($jd_rest_form_delete_related_url) {
        echo $jd_rest_form_delete_related_url;
    });
    add_action('wp_head', function () use ($jd_rest_form_get_url) {
        echo $jd_rest_form_get_url;
    });
    add_action('wp_head', function () use ($jd_rest_final_price_url) {
        echo $jd_rest_final_price_url;
    });

    add_action('wp_head', function () use ($jd_rest_login_get_url) {
        echo $jd_rest_login_get_url;
    });
    add_action('wp_head', function () use ($jd_rest_login_post_url) {
        echo $jd_rest_login_post_url;
    });


}

if (!function_exists('add_jourday_angular')) {
    function add_jourday_angular()
    {
        $url = 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular.min.js';
        wp_enqueue_script('jd_rest_angular_js', $url, array(), false, false);
    }
}

if (!function_exists('add_jourday_awesomplete')) {
    function add_jourday_awesomplete()
    {
        $url = JD_REST_FRONT_URL . 'js/components/awesomplete.js';
        wp_enqueue_script('jd_rest_awesomplete_js', $url, array(), false, false);
    }
}

if (!function_exists('add_jourday_underscore')) {
    function add_jourday_underscore()
    {
        $url = 'http://underscorejs.org/underscore-min.js';
        wp_enqueue_script('jd_rest_underscore_js', $url, array(), false, false);
    }
}

if (!function_exists('add_jourday_data_tables_js')) {
    function add_jourday_data_tables_js()
    {
        $url = JD_REST_FRONT_URL . 'js/components/jquery.dataTables.min.js';
        wp_enqueue_script('jd_rest_data_tables_js', $url, array(), false, true);
    }
}

if (!function_exists('add_jourday_rest_data_tables_css')) {
    function add_jourday_rest_data_tables_css()
    {
        $url = JD_REST_FRONT_URL . 'css/components/jquery.dataTables.min.css';
        wp_enqueue_style('jd_rest_data_tables_css', $url, array());
    }
}

if (!function_exists('add_jourday_rest_data_tables_reset_css')) {
    function add_jourday_rest_data_tables_reset_css()
    {
        $url = JD_REST_FRONT_URL . 'css/components/jquery.dataTables.reset.css';
        wp_enqueue_style('jd_rest_data_tables_reset_css', $url, array());
    }
}

if (!function_exists('add_jourday_rest_awesomplete_css')) {
    function add_jourday_rest_awesomplete_css()
    {
        $url = JD_REST_FRONT_URL . 'css/components/awesomplete.css';
        wp_enqueue_style('jd_rest_data_awesomplete_css', $url, array());
    }
}

if (!function_exists('is_jd_rest_url')) {
    function is_jd_rest_url($slug)
    {
        $url = $_SERVER['REQUEST_URI'];
        return false !== stripos($url, $slug);
    }
}

function add_rest_front_js()
{
    $url = JD_REST_FRONT_URL . 'js/rest-front.js';
    wp_enqueue_script('rest_front_js', $url, array(), false, true);
}

function add_pass_strength_js()
{
    $url = JD_REST_FRONT_URL . 'password_strength/password_strength_lightweight.js';
    wp_enqueue_script('pass_strength_js', $url, array(), false, true);
}

function add_rest_front_css()
{
    $url = JD_REST_FRONT_URL . 'css/rest-front.css';
    wp_enqueue_style('rest_front_css', $url, array());
}

function add_pass_strength_css()
{
    $url = JD_REST_FRONT_URL . 'password_strength/password_strength.css';
    wp_enqueue_style('pass_strength_css', $url, array());
}


/**
 * @param array $configs
 * @return array
 */
function get_rest_front_create_classes(array $configs)
{
    $classes = [];
    foreach ($configs as $key => $value) {
        $class = new CreateNewFrontPage();
        $class->setPageContent($value['content']);
        $class->setPageTitle($value['title']);
        $class->setPageName($class->slugify($value['name']));
        $classes[] = $class;
        if (is_jd_rest_url($class->slugify($value['name'])) && $class->slugExists($class->slugify($value['name']))) {
            add_action('wp_enqueue_scripts', function () use ($key) {
                $js_url = JD_REST_FRONT_URL . 'js/' . $key . '.js';
                wp_enqueue_script('rest_front' . $key . '_js', $js_url, array(), false, false);
            }, 100);
            add_action('wp_head', function () use ($key) {
                $css_url = JD_REST_FRONT_URL . 'css/' . $key . '.css';
                wp_enqueue_style('rest_front' . $key . '_css', $css_url, array());
            });
        }
    }
    return $classes;
}


function get_rest_front_init(array $configs)
{
    foreach ($configs as $key => $value) {
        $class = new CreateNewFrontPage();
        $class->setPageContent($value['content']);
        $class->setPageTitle($value['title']);
        $class->setPageName($class->slugify($value['name']));
        $classes[] = $class;
        if (is_jd_rest_url($class->slugify($value['name'])) && $class->slugExists($class->slugify($value['name']))) {
            add_action('wp_enqueue_scripts', function () use ($key) {
                $js_url = JD_REST_FRONT_URL . 'js/' . $key . '.js';
                wp_enqueue_script('rest_front' . $key . '_js', $js_url, array(), false, false);
            }, 100);
            add_action('wp_head', function () use ($key) {
                $css_url = JD_REST_FRONT_URL . 'css/' . $key . '.css';
                wp_enqueue_style('rest_front' . $key . '_css', $css_url, array());
            });
        }
    }
}


get_rest_front_init($rest_front_init);

if (!function_exists('rest_front_activate')) {
    function rest_front_activate()
    {
        global $rest_front_init;
        $classes = get_rest_front_create_classes($rest_front_init);
        foreach ($classes as $class) {
            $class->create();
        }
    }
}

if (!function_exists('rest_front_deactivate')) {
    function rest_front_deactivate()
    {
        global $rest_front_init;
        $classes = get_rest_front_create_classes($rest_front_init);
        foreach ($classes as $class) {
            $class->delete();
        }
    }
}

if (!function_exists('rest_front_uninstall')) {
    function rest_front_uninstall()
    {
        global $rest_front_init;
        $classes = get_jd_rest_create_classes($rest_front_init);
        foreach ($classes as $class) {
            $class->delete();
        }
    }
}


/*************************  HOOKS ********************************/

register_activation_hook(__FILE__, 'rest_front_activate');
register_deactivation_hook(__FILE__, 'rest_front_deactivate');
register_uninstall_hook(__FILE__, 'rest_front_uninstall');

add_action('wp_enqueue_scripts', 'add_rest_front_css');
add_action('wp_enqueue_scripts', 'add_jourday_rest_data_tables_css');
add_action('wp_enqueue_scripts', 'add_jourday_rest_data_tables_reset_css');
add_action('wp_enqueue_scripts', 'add_jourday_rest_awesomplete_css');
add_action('wp_enqueue_scripts', 'add_pass_strength_css');
add_action('wp_enqueue_scripts', 'add_jourday_angular');
//add_action( 'wp_enqueue_scripts', 'add_jourday_underscore' );
add_action('wp_enqueue_scripts', 'add_jourday_awesomplete');
add_action('wp_enqueue_scripts', 'add_jourday_data_tables_js');
add_action('wp_enqueue_scripts', 'add_rest_front_js');
add_action('wp_enqueue_scripts', 'add_rest_front_vars_js');
add_action('wp_enqueue_scripts', 'add_pass_strength_js');


/********************** protected ***************************/

if (!function_exists('_get_query_vars')) {
    function _get_query_vars()
    {
        return $_GET;
    }
}

/*******************  AJAX FUNCTIONS  ***************************/

/**
 * @throws Exception
 */
function front_form_get()
{
    $headers = null;
    $method = null;
    $url = null;
    $params = _get_query_vars();
    if (isset($params['method'])) {
        $method = $params['method'];
    } else {
        $method = 'GET';
    }
    if (!\in_array(strtolower($method), ['get', 'post', 'delete'], true)) {
        ob_clean();
        echo json_encode(['error' => ' - Method is not correct']);
        wp_die();
    }
    if (isset($params['url'])) {
        $url = $params['url'];
    }
    if ($url) {
        $url = REST_API_HOST . $url;
    }
    if (filter_var($url, FILTER_VALIDATE_URL) === false) {
        ob_clean();
        echo json_encode(['error' => ' - Not valid URL']);
        wp_die();
    }

    if (isset($params['headers'])) {
        $headers = $params['headers'];
        $headers = json_decode($headers);
        if (!$headers) {
            ob_clean();
            switch (json_last_error()) {
                case JSON_ERROR_NONE:
                    echo ' - No errors';
                    break;
                case JSON_ERROR_DEPTH:
                    echo json_encode(['error' => ' - Maximum stack depth exceeded']);
                    break;
                case JSON_ERROR_STATE_MISMATCH:
                    echo json_encode(['error' => ' - Underflow or the modes mismatch']);
                    break;
                case JSON_ERROR_CTRL_CHAR:
                    echo json_encode(['error' => ' - Unexpected control character found']);
                    break;
                case JSON_ERROR_SYNTAX:
                    echo json_encode(['error' => ' - Syntax error, malformed JSON']);
                    break;
                case JSON_ERROR_UTF8:
                    echo json_encode(['error' => ' - Malformed UTF-8 characters, possibly incorrectly encoded']);
                    break;
                default:
                    echo json_encode(['error' => ' - Unknown error']);
                    break;
            }
            wp_die();
        }
    }

    $client = EasyFrontRequest::create(
        $method,
        $url,
        [
            'handler' => 'curl'
        ]
    );

    $client->withHeader('X-Requested-With', 'XMLHttpRequest');

    if (isset($params['Authorization'])) {
        $client->withHeader('Authorization', $params['Authorization']);
    } elseif (isset($_COOKIE['rest_user_token']) && !empty($_COOKIE['rest_user_token'])) {
        $token = 'Bearer ' . $_COOKIE['rest_user_token'];
        $client->withHeader('Authorization', $token);
    }

    $request = $client->send();
    $rr = $request->getResponse();
    $body = $rr['body'] ?? json_encode(['error' => $rr, 'url' => $url]);
    $body = wp_specialchars_decode($body);


    ob_clean();
    echo $body;
    wp_die();
}


/**
 * @throws Exception
 */
function front_get_content()
{
    $headers = null;
    $method = null;
    $url = null;
    $params = _get_query_vars();
    if (isset($params['method'])) {
        $method = $params['method'];
    }
    if (!\in_array(strtolower($method), ['get', 'post', 'delete'], true)) {
        ob_clean();
        echo json_encode(['error' => ' - Method is not correct']);
        wp_die();
    }
    if (isset($params['url'])) {
        $url = $params['url'];
    }
    if ($url) {
        $url = REST_API_HOST . $url;
    }
    if (filter_var($url, FILTER_VALIDATE_URL) === false) {
        ob_clean();
        echo json_encode(['error' => ' - Not valid URL']);
        wp_die();
    }

    if (isset($params['headers'])) {
        $headers = $params['headers'];
        $headers = json_decode($headers);
        if (!$headers) {
            ob_clean();
            switch (json_last_error()) {
                case JSON_ERROR_NONE:
                    echo ' - No errors';
                    break;
                case JSON_ERROR_DEPTH:
                    echo json_encode(['error' => ' - Maximum stack depth exceeded']);
                    break;
                case JSON_ERROR_STATE_MISMATCH:
                    echo json_encode(['error' => ' - Underflow or the modes mismatch']);
                    break;
                case JSON_ERROR_CTRL_CHAR:
                    echo json_encode(['error' => ' - Unexpected control character found']);
                    break;
                case JSON_ERROR_SYNTAX:
                    echo json_encode(['error' => ' - Syntax error, malformed JSON']);
                    break;
                case JSON_ERROR_UTF8:
                    echo json_encode(['error' => ' - Malformed UTF-8 characters, possibly incorrectly encoded']);
                    break;
                default:
                    echo json_encode(['error' => ' - Unknown error']);
                    break;
            }
            wp_die();
        }
    }


    $url = stripslashes($url);
    $url = str_replace('"', '%22', $url);
    $body = file_get_contents($url);
    $body = wp_specialchars_decode($body);


    ob_clean();
    echo $body;
    wp_die();
}

add_action('wp_ajax_front_form_get', 'front_form_get');
add_action('wp_ajax_nopriv_front_form_get', 'front_form_get');
add_action('wp_ajax_front_get_content', 'front_get_content');
add_action('wp_ajax_nopriv_front_get_content', 'front_get_content');


function front_send_form_post_user_edit()
{
    $params = $_POST;
    $files = $_FILES;

    $id = $params['id'] ?? null;
    if (!$id) {
        ob_clean();
        echo json_encode(['error' => ' - Id not found']);
        wp_die();
    }
    $query = _get_query_vars();
    $url = $query['url'] ?? REST_URL_USER_EDIT_SET;
    if ($url) {
        $url = REST_API_HOST . $url . $id;
    }

    $multipart = [];

    if (!empty($files) && is_array($files)) {
        $file = $files['fileName'] ?? null;
        $filePath = $file['tmp_name'] ?? '';
        $fileType = $file['type'] ?? '';
        $fileName = $file['name'] ?? '';
        $multipart['fileName'] = [
            'name' => 'fileName',
            'contents' => fopen($filePath, 'rb+'),
            // optional keys
            'filename' => $fileName,
            'headers' => [
                'Content-Type' => $fileType
            ]
        ];
    }

    $client = EasyFrontRequest::create('POST', $url, [
        'multipart' => $multipart
    ]);

    $client->withHeader('X-Requested-With', 'XMLHttpRequest');

    if (isset($params['Authorization'])) {
        $client->withHeader('Authorization', $params['Authorization']);
    } elseif (isset($_COOKIE['rest_user_token']) && !empty($_COOKIE['rest_user_token'])) {
        $token = 'Bearer ' . $_COOKIE['rest_user_token'];
        $client->withHeader('Authorization', $token);
    }

    if (is_array($params) && !empty($params)) {
        foreach ($params as $field => $value) {
            $client->withMultipart($field, $value);
        }
    }

    try {
        $request = $client->send();
        $rr = $request->getResponse();
        $error = json_encode(['result' => 'error', 'message' => 'Body not sent']);
        $body = $rr['body'] ?? $error;
        ob_clean();
        echo $body;
        wp_die();
    } catch (Exception $e) {
        ob_clean();
        echo json_encode(['error' => $e->getMessage()]);
        wp_die();
    }
}


function front_send_form_post_models()
{
    $params = $_POST;
    $files = $_FILES;

    $query = _get_query_vars();
    $url = $query['url'] ?? REST_URL_FORM_CREATE;
    if ($url) {
        $url = REST_API_HOST . $url;
    }

    $multipart = [];

    if (!empty($files) && is_array($files)) {
        $file = $files['fileName'] ?? null;
        $filePath = $file['tmp_name'] ?? '';
        $fileType = $file['type'] ?? '';
        $fileName = $file['name'] ?? '';
        $multipart['fileName'] = [
            'name' => 'fileName',
            'contents' => fopen($filePath, 'rb+'),
            // optional keys
            'filename' => $fileName,
            'headers' => [
                'Content-Type' => $fileType
            ]
        ];
    }

    $client = EasyFrontRequest::create('POST', $url, [
        'multipart' => $multipart
    ]);

    $client->withHeader('X-Requested-With', 'XMLHttpRequest');

    if (isset($params['Authorization'])) {
        $client->withHeader('Authorization', $params['Authorization']);
    } elseif (isset($_COOKIE['rest_user_token']) && !empty($_COOKIE['rest_user_token'])) {
        $token = 'Bearer ' . $_COOKIE['rest_user_token'];
        $client->withHeader('Authorization', $token);
    }

    if (is_array($params) && !empty($params)) {
        foreach ($params as $field => $value) {
            $client->withMultipart($field, $value);
        }
    }

    try {
        $request = $client->send();
        $rr = $request->getResponse();
        $error = json_encode(['result' => 'error', 'message' => 'Body not sent']);
        $body = $rr['body'] ?? $error;
        ob_clean();
        echo $body;
        wp_die();
    } catch (Exception $e) {
        ob_clean();
        echo json_encode(['error' => $e->getMessage()]);
        wp_die();
    }
}

add_action('wp_ajax_front_send_form_post', 'front_send_form_post_user_edit');
add_action('wp_ajax_nopriv_front_send_form_post', 'front_send_form_post_user_edit');


add_action('wp_ajax_front_send_form_post_models', 'front_send_form_post_models');
add_action('wp_ajax_nopriv_front_send_form_post_models', 'front_send_form_post_models');