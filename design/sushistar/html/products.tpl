<div class="main_tovar_box_inner">
<div class="wrap">

    {* Категории товаров *}
    {function name=categories_tree}
        {if $categories}
			<div class="togmenu">
				<div class="title">Меню</div>
				<span class="close"></span>
				<ul class="sec_menu">
                    {foreach $categories as $c}
								<li><a href="/{$lang_link}catalog/{$c->url}" data-category="{$c->id}" data-target="#{$c->id}" {if $c->url == $smarty.get.category}class="active"{/if}>{$c->name|escape}</a></li>
                    {/foreach}
				</ul>
			</div>
        {/if}
    {/function}

    {categories_tree categories=$categories level=1}


</div>

{* Каталог товаров *}
{* Канонический адрес страницы *}
{if $set_canonical}
	{if $category}
		{$canonical="/catalog/{$category->url}" scope=parent}
	{elseif $brand}
		{$canonical="/brands/{$brand->url}" scope=parent}
    {elseif $page->url=='discounted'}
        {$canonical="/discounted" scope=parent}
    {elseif $page->url=='bestsellers'}
        {$canonical="/bestsellers" scope=parent}
	{elseif $keyword}
		{$canonical="/all-products" scope=parent}
	{else}
		{$canonical="/all-products" scope=parent}
	{/if}
{/if}

<div class="for_poplavok">
	<div class="wrap">
        <div class="tovar_box">

				{* Список товаров *}
				<div id="fn-products_content">
					{include file="products_content.tpl"}
				</div>
		</div>
	</div>
	<div class="clear"></div>
			{if $products}
				{* ЧПУ пагинация *}
				<div class="shpu_pagination">
					{include file='chpu_pagination.tpl'}
				</div>
			{/if}
			{* Описание страницы (если задана) *}
			{$page->body}

			{if $current_page_num == 1 && (!$category || !$brand)}
				{* Описание категории *}
				{$category->description}

				{* Описание бренда *}
				{$brand->description}
			{/if}

</div>
</div>