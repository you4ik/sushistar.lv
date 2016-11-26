
<!DOCTYPE html>
<html {if $language->label}lang="{$language->label|escape}"{/if}>
<head>

    {* Полный базовый адрес *}
	<base href="{$config->root_url}/"/>
    {* Метатеги *}
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    {* Тайтл страницы *}
	<title>{$meta_title|escape}{$filter_meta->title|escape}</title>
    {if (!empty($meta_description) || !empty($meta_keywords) || !empty($filter_meta->description) || !empty($filter_meta->keywords)) && !$smarty.get.page}
		<meta name="description" content="{$meta_description|escape}{$filter_meta->description|escape}"/>
		<meta name="keywords" content="{$meta_keywords|escape}{$filter_meta->keywords|escape}"/>
    {/if}
    {if $module == 'ProductsView'}
        {if $set_canonical}
			<meta name="robots" content="noindex,nofollow"/>
        {elseif $smarty.get.page || $smarty.get.sort}
			<meta name="robots" content="noindex,follow"/>
        {elseif isset($smarty.get.keyword)}
			<meta name="robots" content="noindex,follow"/>
        {else}
			<meta name="robots" content="index,follow"/>
        {/if}
    {elseif $smarty.get.module == "RegisterView" || $smarty.get.module == "LoginView" || $smarty.get.module == "UserView" || $smarty.get.module == "CartView"}
		<meta name="robots" content="noindex,follow"/>
    {elseif $smarty.get.module == "OrderView"}
		<meta name="robots" content="noindex,nofollow"/>
    {else}
		<meta name="robots" content="index,follow"/>
    {/if}
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
	<meta name="generator" content="{$config->version}"/>
    {if $settings->g_webmaster}
		<meta name="google-site-verification" content="{$settings->g_webmaster}" />
    {/if}
    {if $settings->y_webmaster}
		<meta name='yandex-verification' content="{$settings->y_webmaster}" />
    {/if}
    {$rel_prev_next}

    {* Изображения товара и поста для соц. сетей *}
    {if $module == 'ProductView'}
		<meta property="og:url" content="{$config->root_url}{if $lang_link}/{str_replace('/', '', $lang_link)}{/if}{$canonical}"/>
		<meta property="og:type" content="article"/>
		<meta property="og:title" content="{$product->name|escape}"/>
		<meta property="og:description" content='{$product->annotation}'/>
        {if $product->images}
            {foreach $product->images as $i=>$image}
                {*for vk*}
				<link rel="image_src" href="{$image->filename|resize:330:300}"/>
                {*for fb*}
				<meta property="og:image" content="{$image->filename|resize:330:300}"/>
            {/foreach}
        {/if}
		<meta property="og:image" content="{$product->image->filename|resize:330:300}"/>
		<link rel="image_src" href="{$product->image->filename|resize:330:300}"/>
        {*twitter*}
		<meta name="twitter:card" content="summary">
		<meta name="twitter:title" content="{$product->name|escape}">
		<meta name="twitter:description" content="{$product->annotation}">
		<meta name="twitter:image" content="{$product->image->filename|resize:330:300}">
    {elseif $module == 'BlogView'}
		<meta property="og:url" content="{$config->root_url}{if $lang_link}/{str_replace('/', '', $lang_link)}{/if}{$canonical}"/>
		<meta property="og:type" content="article"/>
		<meta property="og:title" content="{$post->name|escape}"/>
        {if $post->image}
			<meta property="og:image" content="{$post->image|resize:400:300:false:$config->resized_blog_dir}"/>
			<link rel="image_src" href="{$post->image|resize:400:300:false:$config->resized_blog_dir}"/>
        {else}
			<meta property="og:image" content="{$config->root_url}/design/{$settings->theme}/images/logo_ru.png" />
			<meta name="twitter:image" content="{$config->root_url}/design/{$settings->theme}/images/logo_ru.png">
        {/if}
		<meta property="og:description" content='{$post->annotation}'/>

        {*twitter*}
		<meta name="twitter:card" content="summary">
		<meta name="twitter:title" content="{$post->name|escape}">
		<meta name="twitter:description" content="{$post->annotation|escape}">
		<meta name="twitter:image" content="{$post->image|resize:400:300:false:$config->resized_blog_dir}">
    {else}
		<meta property="og:title" content="{$settings->site_name}" />
		<meta property="og:type" content="website"/>
		<meta property="og:url" content="{$config->root_url}"/>
		<meta property="og:image" content="{$config->root_url}/design/{$settings->theme}/images/logo_ru.png" />
		<meta property="og:site_name" content="{$settings->site_name}"/>
		<meta property="og:description" content="{$meta_description|escape}"/>
		<link rel="image_src" href="{$config->root_url}/design/{$settings->theme}/images/logo_ru.png"/>
        {*twitter*}
		<meta name="twitter:card" content="summary">
		<meta name="twitter:title" content="{$settings->site_name}">
		<meta name="twitter:description" content="{$meta_description|escape}">
		<meta name="twitter:image" content="{$config->root_url}/design/{$settings->theme}/images/logo_ru.png">
    {/if}

    {* Канонический адрес страницы *}
    {if isset($canonical)}
		<link rel="canonical" href="{$config->root_url}{if $lang_link}/{str_replace('/', '', $lang_link)}{/if}{$canonical}"/>
    {elseif $smarty.get.sort}
		<link rel="canonical" href="{$sort_canonical}"/>
    {/if}

    {* Языковый атрибут *}
    {foreach $languages as $l}
        {if $l->enabled}
			<link rel="alternate" hreflang="{$l->label}" href="{$config->root_url}/{$l->url}"/>
        {/if}
    {/foreach}

    {* JQuery *}
	<script src="design/{$settings->theme}/js/jquery-2.1.4.min.js"></script>

    {* JQuery UI *}
    {* Библиотека с "Slider", "Transfer Effect" *}
	<script src="design/{$settings->theme}/js/jquery-ui.min.js"></script>

    {* Fancybox *}
	<script src="design/{$settings->theme}/js/jquery.fancybox.min.js"></script>

    {* Autocomplete *}
	<script src="design/{$settings->theme}/js/jquery.autocomplete-min.js"></script>

    {* slick slider *}
	<script src="design/{$settings->theme}/js/slick.min.js"></script>

    {* Карточка товаров, поделиться в соц. сетях *}
    {if $smarty.get.module == 'ProductView' || $smarty.get.module == "BlogView"}
		<script type="text/javascript" src="//yastatic.net/es5-shims/0.0.2/es5-shims.min.js"></script>
		<script type="text/javascript" src="//yastatic.net/share2/share.js"></script>
    {/if}

    {* Стили *}
	<link href="dhttps://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>
	<link href="design/{$settings->theme|escape}/css/style.css" type="text/css" data-template-style="true" rel="stylesheet">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="design/{$settings->theme|escape}/js/jquery.animateNumber.min.js"></script>

    {* Okay *}
    {include file="scripts.tpl"}
	<script src="design/{$settings->theme}/js/script.js"></script>
	<script src="design/{$settings->theme}/js/okay.js"></script>
	<script src="design/{$settings->theme}/js/my.js"></script>
	<script src="design/{$settings->theme}/js/baloon.js"></script>
	<script src="design/{$settings->theme}/js/owl.carousel.min.js"></script>

	<!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	<link rel="stylesheet" type="text/css" href="http://delivery.bdvision.ru/bitrix/templates/bd_sushi_shop_default/vendor/owl-carousel/owl.carousel.css">
	<link rel="stylesheet" type="text/css" href="http://delivery.bdvision.ru/bitrix/templates/bd_sushi_shop_default/animate.css">
</head>

<body>

<div class="wrapper">
	<header class="header ">
		<div class="wrap top_wrap">
            {* Информер корзины *}
			<div id="cart_informer" class="col-xs-6 col-lg-2 pull-lg-right">
                {include file='cart_informer.tpl'}
			</div>
			<span class="logo">Sushi Star <span>Riga</span></span>            <a href="#" class="cart_btn cart_full">

				<span>400</span>
				<i class="rouble rouble_padding">i</i>
			</a>
			<div class="head_center">
				<div class="head_center">
					<ul>
                        {foreach $pages as $p}
                            {if $p->menu_id == 1}
								<li><a data-page="{$p->id}" href="{$lang_link}{$p->url}">{$p->name|escape}</a></li>
                            {/if}
                        {/foreach}
					</ul>
					<div class="phone" id="headphone">
						+371 <span>{$lang->index_phone_1}</span></div>
				</div>            </div>


		</div>
	</header><!-- .header-->
	<main class="content ">
		<div class="slider">
			<div class="slider_item_first"  id="bx_3218110189_638">
				<div class="slider_item_child" style="background: #00000a url() no-repeat center;   background-size: cover;">
					<div class="slide_item_bd">
						<img
								src="http://delivery.bdvision.ru/upload/iblock/c55/c5511fd4a483ab71df0e0eae2a4a5148.jpg"
								alt="Samurai set"
								title="Samurai set"
						/>
					</div>
				</div>
			</div>

		</div>
		<div class="info_line">
			<div class="wrap">
				<div class="phone_box">
					<div class="phone"><span>(371)</span> {$lang->index_phone_1}</div>
					<div class="dostavka">Доставка с 9.00 до 22.00</div>
				</div>
				<div class="inf_box if_1">
					<div class="title">Быстро</div>
					<p>Время доставки заказ за 45 минут.</p>                </div>
				<div class="inf_box if_2">
					<div class="title">Вкусно</div>
					<p>Мы готовим только из свежих продуктов.</p>                </div>
				<div class="inf_box if_3">
					<div class="title">Бесплатная доставка</div>
					<p>Минимальный заказ 300 рублей</p>
				</div>
			</div>
		</div><!-- .info_line -->

		<div id="fn-content">
                        {$content}
		</div>
		<div class="wrap">
			<div id='tab-container'>
				<div class="os"></div>

				<div class="tab-content">
					<div class="tab">Оплата при получении</div>
					<div class="tabscontent">
						<div class="pic">
							<img
									src="http://delivery.bdvision.ru/upload/iblock/229/229a383d5cdd5aea082010169948e1b0.png"
									alt="Оплата при получении"
									title="Оплата при получении"
							/>
						</div>
						<div class="opis">
							Оплата посылки в почтовом отделении осуществляется наложенным платежом при получении, при этом к стоимости заказа добавляется почтовый сбор за наложенный платеж согласно тарифам Почты России, составляющий 2&#37; от стоимости заказа, но не менее 50 рублей.<br />
							При доставке курьером оплата осуществляется наличными курьеру.<br />
							В Пунктах Выдачи Заказов стоимость посылки оплачивается наличными сотруднику Пункта Выдачи Заказов при получении посылки. В некоторых Пунктах Выдачи Заказов оплата может быть произведена с помощью пластиковых карт.<br />
							При оплате посылки курьеру или в Пункте Выдачи Заказов дополнительные платежи на взимаются.                        	</div>
					</div>
				</div>
				<div class="tab-content">
					<div class="tab">Оплата кредитной картой</div>
					<div class="tabscontent">
						<div class="pic">
							<img
									src="http://delivery.bdvision.ru/upload/iblock/229/229a383d5cdd5aea082010169948e1b0.png"
									alt="Оплата кредитной картой"
									title="Оплата кредитной картой"
							/>
						</div>
						<div class="opis">
							<p>Для оплаты товара кредитной картой на соответствующей странице сайта в процессе заказа необходимо выбрать пункт "Оплата картой". Обратите внимание, что при оплате кредитной картой Вы не можете использовать в счет оплаты заказа сумму, находящуюся на Вашем персональном счете в ОТТО. Для использования суммы со счета клиента в ОТТО, пожалуйста, выбирайте тип оплаты "при получении заказа". Кроме того, после сохранения заказа Вы не сможете добавить изменить товар в Вашем заказе. Возможна только отмена товара.</p>
							<div class="tit">Безопасность передаваемой информации</div>
							<p>Для защиты информации от несанкционированного доступа на этапе передачи от клиента на сервер системы ASSIST используется протокол SSL 3.0, сертификат сервера (128 bit) выдан компанией Thawte - признанным центром выдачи цифровых сертификатов.</p>
							<div class="tit">При аннулировании заказа</div>
							<p>При аннулировании позиций из оплаченного заказа (или при аннулировании заказа целиком)<br> Вы можете вернуть сумму на карту, позвонив в наш сервисный центр:  (000) 000-00-00.</p>                         	</div>
					</div>
				</div>
				<div class="tab-content">
					<div class="tab">Доставка</div>
					<div class="tabscontent">
						<div class="pic">
							<img
									src="http://delivery.bdvision.ru/upload/iblock/229/229a383d5cdd5aea082010169948e1b0.png"
									alt="Доставка"
									title="Доставка"
							/>
						</div>
						<div class="opis">
							<div class="tit">Забрать самому:</div>
							<p>Самовывоз из офиса интернет-магазина<br>
								Минимальная сумма заказа отсутствует. Эта услуга бесплатна.&nbsp;<br>
								Cвой заказ можно получить в офисе интернет-магазина каждый день с с 9:00 до 21:00.<br>
								по адресу: Челюскинцев ул, дом 15 <a href="#">на карте</a></p>
							<div class="tit">Курьером:</div>
							<p>Доставка курьерской службой<br>
								Наш курьер доставит заказ по указанному адресу с 10:00 до 21:00. После предварительного звонка оператора курьер дополнительно свяжется для предупреждения о выезде по адресу доставки (ориентировочно за 1 час).<br> Стоимость доставки 200 руб. при сумме заказа менее 2000 руб. <br> При сумме заказа более 2000 руб. доставка осуществляется бесплатно.</p>
							<div class="tit">Срочная доставка</div>
							<p>Мы можем предложить доставку в день заказа или в любой последующий день с 10:00 до 21:00. Срочная доставка может быть осуществлена в любое удобное время в интервале 1 час, но не ранее, чем через 3 часа после оформления заказа. В случае опоздания курьера - доставка за наш счет!</p>                        	</div>
					</div>
				</div>
				<div class="tab-content">
					<div class="tab">Компания</div>
					<div class="tabscontent">
						<div class="pic">
							<img
									src="http://delivery.bdvision.ru/upload/iblock/229/229a383d5cdd5aea082010169948e1b0.png"
									alt="Компания"
									title="Компания"
							/>
						</div>
						<div class="opis">
							МЫ — агентство интернет-маркетинга &quot;Больше денег&quot;, в приоритет ставим увеличение продаж, качество выполняемой работы и сервис. Создаем индивидуальные решения и отвечаем за результат. Выступаем квалифицированным заказчиком. Привлекаем различных специалистов для реализации задач проекта. МЫ — агентство интернет-маркетинга &quot;Больше денег&quot;, в приоритет ставим увеличение продаж, качество выполняемой работы и сервис. Создаем индивидуальные решения и отвечаем за результат. Выступаем квалифицированным заказчиком. Привлекаем различных специалистов для реализации задач проекта. МЫ — агентство интернет-маркетинга &quot;Больше денег&quot;, в приоритет ставим увеличение продаж, качество выполняемой работы и сервис. Создаем индивидуальные решения и отвечаем за результат. Выступаем квалифицированным заказчиком. Привлекаем различных специалистов для реализации задач проекта. МЫ — агентство интернет-маркетинга &quot;Больше денег&quot;, в приоритет ставим увеличение продаж, качество выполняемой работы и сервис. Создаем индивидуальные решения и отвечаем за результат. Выступаем квалифицированным заказчиком. Привлекаем различных специалистов для реализации задач проекта.                        	</div>
					</div>
				</div>




			</div>
			<script type="text/javascript" src="design/{$settings->theme}/js/tabs.js"></script>



		</div>



	</main><!-- .content -->
</div><!-- .wrapper -->

<footer class="footer">
	<div class="wrap">
		<div class="foot_name">Название компании (с) 2015</div>
		<div class="foot_right">
			<div class="bitrix_logo" id="bx-composite-banner"></div>
			<!-- Удаление копирайтов является нарушением лицензионного соглашения. -->
			<div class="developer"><span>BD</span> <a href="http://bdlab.pro" title="Разработка сайта - &laquo;Больше денег&raquo;">created by humans</a></div>
		</div>
		<ul class="social">

			<li><a id="bx_3485106786_643" href="http://vk.com/supbd" class="instagram" target="_blank"></a></li>

			<li><a id="bx_3485106786_642" href="http://vk.com/supbd" class="fb" target="_blank"></a></li>

			<li><a id="bx_3485106786_641" href="http://vk.com/supbd" class="vk" target="_blank"></a></li>

		</ul>
	</div>
</footer><!-- .footer -->

</body>
</html>