{* Список товаров *}
{if $products}
	{foreach $products as $product}

			{include file="tiny_products.tpl"}
		{if $product@iteration % 3 == 0}{/if}
	{/foreach}
{else}
	<span data-language="{$translate_id['products_not_found']}">{$lang->products_not_found}</span>
{/if}