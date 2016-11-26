<?php

require_once('api/Okay.php');

// Этот класс выбирает модуль в зависимости от параметра Section и выводит его на экран
class IndexAdmin extends Okay {
    
    private $left_menu = array(
        'ProductsAdmin'       => 'catalog',
        'ProductAdmin'        => 'catalog',
        'CategoriesAdmin'     => 'catalog',
        'CategoryAdmin'       => 'catalog',
        'BrandsAdmin'         => 'catalog',
        'BrandAdmin'          => 'catalog',
        'FeaturesAdmin'       => 'catalog',
        'FeatureAdmin'        => 'catalog',
        'SpecialAdmin'        => 'catalog',
        
        'OrdersAdmin'         => 'orders',
        'OrderAdmin'          => 'orders',
        'OrdersLabelsAdmin'   => 'orders',
        'OrdersLabelAdmin'    => 'orders',
        
        'UsersAdmin'          => 'users',
        'UserAdmin'           => 'users',
        'ExportUsersAdmin'    => 'users',
        'GroupsAdmin'         => 'users',
        'GroupAdmin'          => 'users',
        'CouponsAdmin'        => 'users',
        'CouponAdmin'         => 'users',
        'SubscribeMailingAdmin'=> 'users',
        
        'PagesAdmin'          => 'pages',
        'PageAdmin'           => 'pages',
        
        'BlogAdmin'           => 'blog',
        'PostAdmin'           => 'blog',
        
        'CommentsAdmin'       => 'comments',
        'FeedbacksAdmin'      => 'comments',
        'CallbacksAdmin'      => 'comments',
        
        'ImportAdmin'         => 'auto',
        'ExportAdmin'         => 'auto',
        'MultiImportAdmin'    => 'auto',
        'MultiExportAdmin'    => 'auto',
        'ImportLogAdmin'      => 'auto',

        'StatsAdmin'          => 'stats',
        'ReportStatsAdmin'    => 'stats',
        'CategoryStatsAdmin'  => 'stats',
        'YametrikaAdmin'      => 'stats',
        'TopvisorProjectsAdmin'=> 'topvisor',
        'TopvisorProjectAdmin'=> 'topvisor',
        
        'ThemeAdmin'          => 'design',
        'StylesAdmin'         => 'design',
        'TemplatesAdmin'      => 'design',
        'ImagesAdmin'         => 'design',
        'ScriptsAdmin'        => 'design',
        'RobotsAdmin'         => 'design',
        
        'BannersAdmin'		  => 'banners',
		'BannerAdmin'		  => 'banners',
		'BannersImagesAdmin'  => 'banners',
		'BannersImageAdmin'   => 'banners',
        
        'SettingsAdmin'       => 'settings',
        'CurrencyAdmin'       => 'settings',
        'DeliveriesAdmin'     => 'settings',
        'DeliveryAdmin'       => 'settings',
        'PaymentMethodAdmin'  => 'settings',
        'PaymentMethodsAdmin' => 'settings',
        'ManagersAdmin'       => 'settings',
        'ManagerAdmin'        => 'settings',
        'LanguageAdmin'       => 'settings',
        'LanguagesAdmin'      => 'settings',
        'TranslationAdmin'    => 'settings',
        'TranslationsAdmin'   => 'settings',
        
    );
    
    // Соответсвие модулей и названий соответствующих прав
    private $modules_permissions = array(
        'ProductsAdmin'       => 'products',
        'ProductAdmin'        => 'products',
        'CategoriesAdmin'     => 'categories',
        'CategoryAdmin'       => 'categories',
        'BrandsAdmin'         => 'brands',
        'BrandAdmin'          => 'brands',
        'FeaturesAdmin'       => 'features',
        'FeatureAdmin'        => 'features',
        'OrdersAdmin'         => 'orders',
        'OrderAdmin'          => 'orders',
        'OrdersLabelsAdmin'   => 'labels',
        'OrdersLabelAdmin'    => 'labels',
        'UsersAdmin'          => 'users',
        'UserAdmin'           => 'users',
        'ExportUsersAdmin'    => 'users',
        'GroupsAdmin'         => 'groups',
        'GroupAdmin'          => 'groups',
        'CouponsAdmin'        => 'coupons',
        'CouponAdmin'         => 'coupons',
        'PagesAdmin'          => 'pages',
        'PageAdmin'           => 'pages',
        'BlogAdmin'           => 'blog',
        'PostAdmin'           => 'blog',
        'CommentsAdmin'       => 'comments',
        'FeedbacksAdmin'      => 'feedbacks',
        'ImportAdmin'         => 'import',
        'ExportAdmin'         => 'export',
        'MultiImportAdmin'    => 'import',
        'MultiExportAdmin'    => 'export',
        'ImportLogAdmin'      => 'import',
        'StatsAdmin'          => 'stats',
        'ThemeAdmin'          => 'design',
        'StylesAdmin'         => 'design',
        'TemplatesAdmin'      => 'design',
        'ImagesAdmin'         => 'design',
        'ScriptsAdmin'        => 'design',
        'SettingsAdmin'       => 'settings',
        'CurrencyAdmin'       => 'currency',
        'DeliveriesAdmin'     => 'delivery',
        'DeliveryAdmin'       => 'delivery',
        'PaymentMethodAdmin'  => 'payment',
        'PaymentMethodsAdmin' => 'payment',
        'ManagersAdmin'       => 'managers',
        'ManagerAdmin'        => 'managers',
        'SubscribeMailingAdmin'=> 'users',
        'BannersAdmin'		  => 'banners',
		'BannerAdmin'		  => 'banners',
		'BannersImagesAdmin'  => 'banners',
		'BannersImageAdmin'   => 'banners',
        'SpecialAdmin'        => 'special',
        'CallbacksAdmin'      => 'callbacks',
        
        /* Мультиязычность start */
        'LanguageAdmin'       => 'languages',
        'LanguagesAdmin'      => 'languages',
        'TranslationAdmin'    => 'languages',
        'TranslationsAdmin'   => 'languages',
        /* Мультиязычность end */
        /*statistic*/
        'ReportStatsAdmin'    => 'stats',
        'CategoryStatsAdmin'  => 'stats',
        /*statistic*/
        'TopvisorProjectsAdmin'=> 'topvisor',
        'TopvisorProjectAdmin'=> 'topvisor',
        /*YaMetrika*/
        'YametrikaAdmin'      => 'yametrika',
        /*YaMetrika*/
        'RobotsAdmin'         => 'robots'
    );
    
    // Конструктор
    public function __construct() {
        // Вызываем конструктор базового класса
        parent::__construct();

        // Берем название модуля из get-запроса
        $module = $this->request->get('module', 'string');
        $module = preg_replace("/[^A-Za-z0-9]+/", "", $module);

        // Администратор
        $this->manager = $this->managers->get_manager();
        $this->design->assign('mаnаgеr', $this->manager);
        if (!$this->manager && $module!='AuthAdmin') {
            header('location: '.$this->config->root_url.'/backend/index.php?module=AuthAdmin');
            exit();
        } elseif ($this->manager && $module == 'AuthAdmin') {
            header('location: '.$this->config->root_url.'/backend/index.php');
            exit();
        }

        if ($module != 'AuthAdmin') {

            $this->design->assign('manager', $this->manager);

        }

        $this->design->set_templates_dir('backend/design/html');
        $this->design->set_compiled_dir('backend/design/compiled');

        $this->design->assign('settings',	$this->settings);
        $this->design->assign('config',	$this->config);
        
        // Язык
        $languages = $this->languages->languages();
        $this->design->assign('languages', $languages);
        
        if (count($languages)) {
            $post_lang_id = $this->request->post('lang_id', 'integer');
            $admin_lang_id = ($post_lang_id ? $post_lang_id : $this->request->get('lang_id', 'integer'));
            if ($admin_lang_id) {
                $_SESSION['admin_lang_id'] = $admin_lang_id;
            }
            if (!isset($_SESSION['admin_lang_id']) || !isset($languages[$_SESSION['admin_lang_id']])) {
                $l = reset($languages);
                $_SESSION['admin_lang_id'] = $l->id;
            }
            $this->design->assign('current_language', $languages[$_SESSION['admin_lang_id']]);
            $this->languages->set_lang_id($_SESSION['admin_lang_id']);
        }
        
        $lang_id = $this->languages->lang_id();
        $this->design->assign('lang_id', $lang_id);
        
        $lang_label = '';
        $lang_link = '';
        if($lang_id && $languages) {
            $lang_label = $languages[$lang_id]->label;
            
            $first_lang = $this->languages->languages();
            $first_lang = reset($first_lang);
            if($first_lang->id != $lang_id) {
                $lang_link = $lang_label.'/';
            }
        }
        $this->design->assign('lang_label', $lang_label);
        $this->design->assign('lang_link', $lang_link);
        
        // Если не запросили модуль - используем модуль первый из разрешенных
        if(empty($module) || !is_file('backend/'.$module.'.php')) {
            foreach($this->modules_permissions as $m=>$p) {
                if($this->managers->access($p)) {
                    $module = $m;
                    break;
                }
            }
        }
        if(empty($module)) {
            $module = 'ProductsAdmin';
        }
        if (isset($this->left_menu[$module])) {
            $this->design->assign('menu_selected', $this->left_menu[$module]);
        }
        
        // Подключаем файл с необходимым модулем
        require_once('backend/'.$module.'.php');
        
        // Создаем соответствующий модуль
        if(class_exists($module)) {
            $this->module = new $module();
        } else {
            die("Error creating $module class");
        }
    }
    
    public function fetch() {
        $currency = $this->money->get_currency();
        $this->design->assign("currency", $currency);

        // Проверка прав доступа к модулю
        if(get_class($this->module) == 'AuthAdmin' || isset($this->modules_permissions[get_class($this->module)])
        && $this->managers->access($this->modules_permissions[get_class($this->module)])) {
            $content = $this->module->fetch();
            $this->design->assign("content", $content);
        } else {
            $this->design->assign("content", "Permission denied");
            $this->design->assign('menu_selected', '');
        }
        
        // Счетчики для верхнего меню
        $new_orders_counter = $this->orders->count_orders(array('status'=>0));
        $this->design->assign("new_orders_counter", $new_orders_counter);
        
        $new_comments_counter = $this->comments->count_comments(array('approved'=>0));
        $this->design->assign("new_comments_counter", $new_comments_counter);

        $new_feedbacks = $this->feedbacks->get_feedbacks(array('processed'=>0));
        $new_feedbacks_counter = count($new_feedbacks);
        $this->design->assign("new_feedbacks_counter", $new_feedbacks_counter);
        
        $new_callbacks = $this->callbacks->get_callbacks(array('processed'=>0));
        $new_callbacks_counter = count($new_callbacks);
        $this->design->assign("new_callbacks_counter", $new_callbacks_counter);
        
        // Создаем текущую обертку сайта (обычно index.tpl)
        $wrapper = $this->design->smarty->getTemplateVars('wrapper');
        if(is_null($wrapper)) {
            $wrapper = 'index.tpl';
        }
        
        if(!empty($wrapper)) {
            return $this->body = $this->design->fetch($wrapper);
        } else {
            return $this->body = $content;
        }
    }
    
}
