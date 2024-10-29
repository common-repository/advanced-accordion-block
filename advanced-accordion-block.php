<?php

/**
 * Plugin Name: Advanced Accordion Block
 * Description: <strong>Advanced Accordion Block</strong> is a custom Gutenberg Block that allows to showcase the content in accordion mode. It also helps to build FAQ sections easily.
 * Requires at least: 5.7
 * Requires PHP: 7.4
 * Version: 4.7.2
 * Plugin URI: https://spider-themes.net/advanced-accordion-block
 * Author: spider-themes
 * Author URI: https://spider-themes.net/advanced-accordion-block
 * License: GPLv3 or later
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: advanced-accordion-block
 *
 * @package @wordpress/create-block
 */
// Stop Direct Access
if ( !defined( 'ABSPATH' ) ) {
    exit;
}
if ( function_exists( 'aab_fs' ) ) {
    aab_fs()->set_basename( false, __FILE__ );
} else {
    // DO NOT REMOVE THIS IF, IT IS ESSENTIAL FOR THE `function_exists` CALL ABOVE TO PROPERLY WORK.
    if ( !function_exists( 'aab_fs' ) ) {
        function aab_fs() {
            global $aab_fs;
            if ( !isset( $aab_fs ) ) {
                // Activate multisite network integration.
                if ( !defined( 'WP_FS__PRODUCT_11041_MULTISITE' ) ) {
                    define( 'WP_FS__PRODUCT_11041_MULTISITE', true );
                }
                // Include Freemius SDK.
                require_once dirname( __FILE__ ) . '/includes/fs/start.php';
                $aab_fs = fs_dynamic_init( array(
                    'id'              => '11041',
                    'slug'            => 'advanced-accordion-block',
                    'premium_slug'    => 'advanced-accordion-block-pro',
                    'type'            => 'plugin',
                    'public_key'      => 'pk_7347c71192131d87905aefe5e928f',
                    'premium_suffix'  => 'pro',
                    'is_premium'      => false,
                    'is_premium_only' => false,
                    'has_addons'      => false,
                    'has_paid_plans'  => true,
                    'trial'           => array(
                        'days'               => 14,
                        'is_require_payment' => true,
                    ),
                    'menu'            => array(
                        'slug'       => 'advanced-accordion-block',
                        'first-path' => 'plugins.php',
                        'contact'    => false,
                        'support'    => false,
                    ),
                    'is_live'         => true,
                ) );
            }
            return $aab_fs;
        }

        // Init Freemius.
        aab_fs();
        // Signal that SDK was initiated.
        do_action( 'aab_fs_loaded' );
    }
    // ... Your plugin's main file logic ...
    /**
     * Blocks Final Class
     */
    final class AAGB_BLOCKS_CLASS {
        public function __construct() {
            // define constants
            $this->define_constants();
            $this->core_includes();
            // block initialization
            add_action( 'init', [$this, 'blocks_init'] );
            // blocks category
            if ( version_compare( $GLOBALS['wp_version'], '5.7', '<' ) ) {
                add_filter(
                    'block_categories',
                    [$this, 'register_block_category'],
                    10,
                    2
                );
            } else {
                add_filter(
                    'block_categories_all',
                    [$this, 'register_block_category'],
                    10,
                    2
                );
            }
            // redirecting
            add_action( 'activated_plugin', [$this, 'user_redirecting'] );
            // enqueue block assets
            add_action( 'enqueue_block_assets', [$this, 'external_libraries'] );
            add_action( 'enqueue_block_editor_assets', [$this, 'block_editor_assets'] );
        }

        /**
         * Initialize the plugin
         */
        public static function init() {
            static $instance = false;
            if ( !$instance ) {
                $instance = new self();
            }
            return $instance;
        }

        /**
         * Define the plugin constants
         */
        private function define_constants() {
            define( 'AAGB_VERSION', '4.5.0' );
            define( 'AAGB_URL', plugin_dir_url( __FILE__ ) );
            define( 'AAGB_LIB_URL', AAGB_URL . 'lib/' );
        }

        /**
         * Include Files
         *
         * Load core files required to run the plugin.
         *
         * @access public
         */
        public function core_includes() {
            require_once __DIR__ . '/includes/functions.php';
        }

        /**
         * Blocks Registration
         */
        public function register_block( $name, $options = array() ) {
            register_block_type( __DIR__ . '/build/' . $name, $options );
        }

        // render inline css
        public function render_inline_css( $handle, $css ) {
            wp_register_style( $handle, false );
            wp_enqueue_style( $handle );
            wp_add_inline_style( $handle, $css );
        }

        /**
         * Blocks Initialization
         */
        public function blocks_init() {
            // register single block
            $this->register_block( 'accordion', array(
                'render_callback' => [$this, 'render_separate_accordion'],
            ) );
            $this->register_block( 'group-accordion', array(
                'render_callback' => [$this, 'render_group_accordion'],
            ) );
            $this->register_block( 'accordion-item', array(
                'render_callback' => [$this, 'render_separate_accordion_item'],
            ) );
        }

        // Separate accordion render callback
        public function render_separate_accordion( $attributes, $content ) {
            wp_register_style(
                'aagb-separate-accordion',
                plugins_url( '/', __FILE__ ) . 'build/accordion/style-index.css',
                array(),
                'initial'
            );
            return $content;
        }

        // Separate accordion-item render callback
        public function render_separate_accordion_item( $attributes, $content ) {
            wp_register_style( 'aagb-separate-accordion-item', plugins_url( '/', __FILE__ ) . 'build/accordion-item/style-index.css' );
            return $content;
        }

        public function block_editor_assets() {
            wp_register_style(
                'aagb-separate-accordion',
                plugins_url( '/', __FILE__ ) . 'build/accordion/style-index.css',
                array(),
                'initial'
            );
            wp_register_style(
                'aagb-separate-accordion-itemt',
                plugins_url( '/', __FILE__ ) . 'build/accordion-item/style-index.css',
                array(),
                'initial'
            );
        }

        // Group accordion render callback
        public function render_group_accordion( $attributes, $content ) {
            $container_border_style = ( isset( $attributes['activeAccordionBorder']['style'] ) ? 'border-style: ' . $attributes['activeAccordionBorder']['style'] . ' !important;' : '' );
            $container_border_color = ( isset( $attributes['activeAccordionBorder']['color'] ) ? 'border-color: ' . $attributes['activeAccordionBorder']['color'] . ' !important;' : '' );
            $body_border_style = ( isset( $attributes['activeAccordionBorder']['style'] ) ? 'border-top-style: ' . $attributes['activeAccordionBorder']['style'] . ' !important;' : '' );
            $body_border_color = ( isset( $attributes['activeAccordionBorder']['color'] ) ? 'border-top-color: ' . $attributes['activeAccordionBorder']['color'] . ' !important;' : '' );
            if ( !is_admin() ) {
                $handle = 'aagb-' . $attributes['uniqueId'];
                $custom_css = '';
                // container
                $custom_css .= '.aagb_accordion_' . $attributes['uniqueId'] . ' .aagb__accordion_active{ ' . $container_border_color . ' border-width: ' . $attributes['activeAccordionBorder']['width'] . '!important; ' . $container_border_style . ' }';
                // body
                $custom_css .= '.aagb_accordion_' . $attributes['uniqueId'] . ' .aagb__accordion_body--show{ ' . $body_border_color . ' border-top-width: ' . $attributes['activeAccordionBorder']['width'] . '!important; ' . $body_border_style . ' }';
                $this->render_inline_css( $handle, $custom_css );
            }
            //wp_register_style( 'aagb-group-accordion', plugins_url( '/', __FILE__ ) . 'build/group-accordion/style-index.css' );
            return $content;
        }

        /**
         * Register Block Category
         */
        public function register_block_category( $categories, $post ) {
            return array_merge( array(array(
                'slug'  => 'accordion-block',
                'title' => esc_html__( 'Accordion Blocks', 'advanced-accordion-block' ),
            )), $categories );
        }

        /**
         * Redirecting on activating the plugin
         *
         * @param $plugin
         *
         * @return void
         */
        function user_redirecting( $plugin ) {
            if ( plugin_basename( __FILE__ ) == $plugin ) {
                wp_redirect( admin_url( 'options-general.php?page=advanced-accordion-block' ) );
                die;
            }
        }

        /**
         * Enqueue Block Assets
         */
        public function external_libraries() {
            if ( !is_admin() ) {
                wp_enqueue_style( 'dashicons' );
            }
            // enqueue JS
            //			wp_enqueue_script( 'aagb-anchor-js', AAGB_LIB_URL . 'js/anchor.js', array( 'jquery' ), '', true );
            //			wp_enqueue_script( 'aagb-separate-accordion', AAGB_LIB_URL . 'js/separate-accordion.js', array( 'jquery' ), AAGB_VERSION, true );
            //			wp_enqueue_script( 'aagb-accordion-group', AAGB_LIB_URL . 'js/group-accordion.js', array( 'jquery' ), AAGB_VERSION, true );
            wp_register_script(
                'aagb-anchor',
                plugins_url( '/', __FILE__ ) . 'lib/js/anchor.js',
                array('jquery'),
                '',
                true
            );
            wp_register_script(
                'aagb-separate-accordion',
                plugins_url( '/', __FILE__ ) . 'lib/js/separate-accordion.js',
                array('jquery'),
                AAGB_VERSION,
                true
            );
            wp_register_script(
                'aagb-accordion-group',
                plugins_url( '/', __FILE__ ) . 'lib/js/group-accordion.js',
                array('jquery'),
                AAGB_VERSION,
                true
            );
            wp_register_script(
                'aagb-group-accordion-frontend',
                plugins_url( '/', __FILE__ ) . 'lib/js/group-accordion-frontend.js',
                array('jquery'),
                AAGB_VERSION,
                true
            );
            $licensing = array(
                'can_use_premium_code' => aab_fs()->can_use_premium_code(),
            );
            wp_localize_script( 'jquery', 'aagb_local_object', array(
                'ajax_url'  => admin_url( 'admin-ajax.php' ),
                'nonce'     => wp_create_nonce( 'aagb_accordion_nonce' ),
                'licensing' => $licensing['can_use_premium_code'],
            ) );
        }

    }

    /**
     * Kickoff
     */
    AAGB_BLOCKS_CLASS::init();
    // external admin support file
    require_once plugin_dir_path( __FILE__ ) . 'admin/admin.php';
}