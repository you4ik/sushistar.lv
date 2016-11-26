<script>
    $.ajax({
        type: 'GET',
        url: '/ajax/misc.php?show=cart_total_price',
        dataType: 'text',
        success: function (data) {
            $('#cart_total_price').html(data);
        }
    });
</script>
<div class="bd">
	<span class="close"></span>
	<div class="title">Корзина</div>
	<div id="scrollbar1">
		<!--'start_frame_cache_scrollbar1'-->
		<div class="scrollbar" style="height: 305px;">
			<div class="track" style="height: 305px;">
				<div class="thumb" style="top: 0px; height: 44px;"></div>
			</div>
		</div>
		<div class="viewport">

			<div class="overview">
				<div class="cart_spinner spinner"></div>
				<ul class="zakaz_list">
                    {foreach $cart->purchases as $purchase}
						<li data-index="{$purchase->amount}" data-price="{($purchase->variant->price)|convert}"
							data-min-total="0" data-id="{$purchase->variant->id}">
							<div class="pic">
                                {$image = $purchase->product->images|first}
                                {if $image}
									<img src="{$image->filename|resize:150:150}" alt="{$purchase->product->name|escape}"
										 title="{$purchase->product->name|escape}">
                                {else}
									<img src="design/{$settings->theme}/images/no_image.png"
										 alt="{$purchase->product->name|escape}"
										 title="{$purchase->product->name|escape}"/>
                                {/if}
							</div>
							<div class="name"><span>{$purchase->variant->name|escape}</span></div>

							<div class="colich_tov"><input type="button" value="-" class="minus_tov"><input type="text"
																											class="txt_col_tov"
																											readonly="readonly"
																											data-id="{$purchase->variant->id}"
																											name="amounts[{$purchase->variant->id}]"
																											value="{$purchase->amount}"
																											onblur="ajax_change_amount(this, {$purchase->variant->id});"
																											data-max="{$purchase->variant->stock}"><input
										type="button" value="+" class="plus_tov"></div>
							<div class="price">
                                {($purchase->variant->price)|convert} {$currency->sign} <i
										class="rouble rouble_padding_3px">i</i>
							</div>
							<a id="cart_del" href="cart/remove/{$purchase->variant->id}"
							   onclick="ajax_remove({$purchase->variant->id});return false;" title="Удалить из корзины">
								<span class="delete delete_basket_item" data-index="{$purchase->variant->id}"></span>
							</a>
						</li>
                    {/foreach}
				</ul>
			</div>
		</div>
		<!--'end_frame_cache_scrollbar1'-->        </div>
	<div class="cart_meta">
		<div class="mleft">
			<p>Если у вас есть промо-код введите его в поле ниже и получите скидку на весь заказ.</p>
			<input type="text" maxlength="8" class="promo_value" value="" placeholder="Ввести промо-код">

		</div>
		<div class="mright">
			<div class="cena">
				<p class="itogo">Итого:</p>
				<div id="cart_total_price" class="summa"></div>
				<div class="discount_notice" style="display:none">Скидка <span class="discount_value"></span>%</div>
			</div>
			<input type="submit" class="" value="Оформить ">
		</div>
	</div>
</div>

