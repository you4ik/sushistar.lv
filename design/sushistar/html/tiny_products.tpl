{* Превью товара *}
<div
        class="tovar animate fn-product"
        data-price="{$product->variant->price|convert}"
        data-old-price="{$product->variant->compare_price|convert}"
        data-id="{$product->variant->id}"
>
    <div class="pic">
        {if $product->image->filename}
            <img src="{$product->image->filename|resize:220:172}" alt="{$product->name|escape}" title="{$product->name|escape}" style="height:172px"/>
        {else}
            <img src="design/{$settings->theme}/images/no_image.png" width="200" height="172" alt="{$product->name|escape}"/>
        {/if}
        <div class="mask"></div>
        <div class="zoom"></div>
    </div>
    {if $product->special}
        <div class="label" style="background-color: #ff6a39">{$product->special}</div>
    {/if}

    <div class="about">
        {* Название товара *}
        <div class="title">
            <a data-product="{$product->id}" href="{$lang_link}products/{$product->url}">{$product->name|escape}</a>
        </div>
        <p>{$product->annotation}</p>
    </div>

    <div class="down">
        <form class="fn-variants okaycms" action="/{$lang_link}cart">
            {* Варианты товара *}
            <select name="variant" class="fn-variant okaycms form-control c-select hidden">
                {foreach $product->variants as $v}
                    <option value="{$v->id}" data-price="{$v->price|convert}" data-stock="{$v->stock}"{if $v->compare_price > 0} data-cprice="{$v->compare_price|convert}"{/if}{if $v->sku} data-sku="{$v->sku}"{/if}>{if $v->name}{$v->name}{else}{$product->name|escape}{/if}</option>
                {/foreach}
            </select>
            <div class="tovar_info">
                {if $product->variant->compare_price}<span class="old_price"><b><span>{$product->variant->compare_price|convert}</span></b>&euro;</span>{/if}
                <span class="price"><span>{$product->variant->price|convert}</span>&euro;</span>
                <span class="gramm">150 гр / 8 шт</span>                            </div>
            <div class="tovar_cost">
                <div class="colich_tov">
                    <input type="button" value="-" class="minus_tov" />
                    <input type="text" value="1" class="txt_col_tov" />
                    <input type="button" value="+" class="plus_tov" />
                </div>
                <button class="addtocart" data-language="{$translate_id['tiny_products_add_cart']}" type="submit"></button>
                <img class="balloon" src="design/{$settings->theme}/img/balloon.png" style="display:none;">
            </div>
        </form>
    </div>
    <div class="tovar_zoom">
        <div class="pic">
            {if $product->image->filename}
                <img src="{$product->image->filename|resize:400:300}" alt="{$product->name|escape}" title="{$product->name|escape}"/>
            {else}
                <img src="design/{$settings->theme}/images/no_image.png" alt="{$product->name|escape}"/>
            {/if}
            <div class="mask"></div>
            <div class="zoom"></div>
        </div>
        {if $product->special}
            <div class="label" style="background-color: #ff6a39">{$product->special}</div>
        {/if}
        <div class="about">
            {* Название товара *}
            <div class="title">
                <a data-product="{$product->id}" href="{$lang_link}products/{$product->url}">{$product->name|escape}</a>
            </div>
            <p>{$product->annotation}</p>
        </div>
        <div class="down">
            <form class="fn-variants okaycms" action="/{$lang_link}cart">
                {* Варианты товара *}
                <select name="variant" class="fn-variant okaycms form-control c-select{if $product->variants|count < 2} hidden-xs-up{/if}">
                    {foreach $product->variants as $v}
                        <option value="{$v->id}" data-price="{$v->price|convert}" data-stock="{$v->stock}"{if $v->compare_price > 0} data-cprice="{$v->compare_price|convert}"{/if}{if $v->sku} data-sku="{$v->sku}"{/if}>{if $v->name}{$v->name}{else}{$product->name|escape}{/if}</option>
                    {/foreach}
                </select>

                <div class="tovar_info">
                    {if $product->variant->compare_price}<span class="old_price"><b><span>{$product->variant->compare_price|convert}</span></b>&euro;</span>{/if}
                    <span class="price"><span>{$product->variant->price|convert}</span>&euro;</span>
                    <span class="gramm">150 гр / 8 шт</span>                            </div>
                <div class="tovar_cost">
                    <div class="colich_tov">
                        <input type="button" value="-" class="minus_tov" />
                        <input type="text" value="1" class="txt_col_tov" />
                        <input type="button" value="+" class="plus_tov" />
                    </div>
                    <button class="addtocart" data-language="{$translate_id['tiny_products_add_cart']}" type="submit"></button>

                </div>
            </form>
        </div>
    </div>


</div><!-- .tovar -->
