$(document).ready(function(){


    $('#oform .minus_tov').off().on('click',function(e){
		var product_id = $(this).closest('li').data('id');
		//console.log($(this).closest('li').data('is-gift'));
		if($(this).closest('li').data('is-gift')==0 || $(this).closest('li').data('is-gift')==undefined){
			var minus_tov = $(this).next('.txt_col_tov');
			var minus_tov_val = minus_tov.val();
			if (minus_tov_val>1) {
                minus_tov_val--;
				minus_tov.val(minus_tov_val);
			}
        }
		e.preventDefault();
    });

	$('#oform .plus_tov').off().on('click',function(e){

		var product_id = $(this).closest('li').data('id');
		if($(this).closest('li').data('is-gift')==0 || $(this).closest('li').data('is-gift')==undefined){
			var plus_tov = $(this).prev('.txt_col_tov');
			var plus_tov_val = plus_tov.val();
			plus_tov_val++;
			plus_tov.val(plus_tov_val);
		}
		e.preventDefault();
	});


    $('.cart_meta input[type="submit"]').on('click',function(){
		$('#cart').hide();
		$('#oform').show();
		$('.out_sum').val($('.cart_btn span').text().split(' ').join(''));
		if($('.payment_type').length>0 && $('.payment_type').val()=='offline'){
			$('.need_short_change_container').show();
		}
		setDevliveryPrice($('.delivery_list option:selected').data('delivery-price'),$('.delivery_list option:selected').data('free-delivery'));
        return false;
	});

	$('.back_to_cart').on('click',function(){
        $('#oform').hide();
		$('#cart').removeClass('animate_in').show();
		setDevliveryPrice(0,0);
		return false;
	});

	if($('.gift_box_products.active').length>0){
		$('.gift_box_products').each(function(i,item){
			if(!$(item).hasClass('active')){
				$(item).find('.maska').show();
			}
		})
	}

	$('.pol').on('click',function(){
		if($('.gift_box_products.active').length==0){
			$('.gift_box_products').find('.maska').show();
			$('.need_more').css('background-color','#8B8B8B');
			$(this).closest('.gift_box_products').addClass('active').find('.maska').hide();
			var product = $(this).closest('.gift_box_products');
			addToBasket(product);
		}
	});

	$('.neh').on('click',function(){
		$('.gift_box_products').find('.maska').hide();
		$('.need_more').each(function(i,item){
			$(item).css('background-color',$(item).data('normal-bg'));

			var product_id = $(item).closest('.gift_box_products').data('id');

			$.ajax({
	            type: 'POST',
	            url: '/bdhandlers/basket.php?t='+new Date().getTime(),
	            data: {action: 'deleteById', item_id: product_id},
	            success: function (data) {
		            animateNumbers($('.cart_btn span'),data);
	            }
        	});

		});
		$(this).closest('.gift_box_products').removeClass('active');

	});


    $('.payment_type').on('change',function(){
		if($(this).val()=='online'){
			$('.send_order_btn').val(BX.message('PAYIT'));
			$('.need_short_change_container').hide();
			$('.need_short_change').removeClass('required');
		}else{
			$('.send_order_btn').val(BX.message('ORDERBUTTON'));
			$('.need_short_change_container').show();
			$('.need_short_change').addClass('required');

        }
    });
//Мену корзины
    $('.cart_btn').on('click', function () {
        if ($(this).hasClass('cart')) {
            return false;
        }
        $('.cart_spinner').show();
        $('#cart').html('');


        $.ajax({
            type: 'GET',
            url: '/ajax/cart_ajax.php',
            dataType: 'json',
            data: {},
            success: function (data) {
                $('#cart').append(data.cart_purchases);


                $('.cart_popup').find('.summa span').text(number_format(data.total, 0, '.', ' '));
                $('#oform').find('.summa span').text(number_format(data.total, 0, '.', ' '));

                var $scrollbar = $("#scrollbar1");
                $scrollbar.tinyscrollbar();
                var scrollbar__ = $scrollbar.data("plugin_tinyscrollbar");
                //scrollbar__.update();
                //$('.promo_value').val(data.code);


                registerCartListeners();

                // refreshGiftNotify(data.total);
                $('.cart_spinner').hide();

            }
        });
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        $('.cart_popup').css('top', ((scrollTop)) +89 + 'px');
        $('.panda_popup').css('top', ((scrollTop)) +89 + 'px');
        $('#cart').show();

        $('#cart').removeClass('animate_out').addClass('animate_in');

        return false;
    });

});


function refreshGiftNotify(total){
	if(total<window.gift_level_1){
		animateNumbers($('.need_to_gift'),window.gift_level_1-total);
		$('.empty_podarok').show();
		$('.podarok').hide();
		$('.podarok_complete').hide();
	}else{
		$('.empty_podarok').hide();
		$('.podarok_complete').hide();
		$('.podarok').show();
	}
	var has_gift = 0;
	$('.zakaz_list').find('li').each(function(i,item){
		if($(item).data('is-gift')==1){
			$('.empty_podarok').hide();
			$('.podarok').hide();
			$('.podarok_complete').show();
			has_gift = 1;
		}
    });

}

function updateCountInCart(item_id, count){
	$.ajax({
            type: 'POST',
            url: '/bdhandlers/basket.php?t='+new Date().getTime(),
            dataType: 'json',
            data: {action: 'updateCount', item_id: item_id, count: count},
            success: function (data) {
	            if(window.shop_min_sum!==undefined && data<window.shop_min_sum){
		            $('.not_enough').show();
		            $('.cart_meta input[type="submit"]').hide();
	            }else{
		            $('.not_enough').hide();
		            $('.cart_meta input[type="submit"]').show();
	            }
	            animateNumbers($('#cart').find('.summa span'),data);
	            animateNumbers($('#oform').find('.summa span'),data);
	            renderGiftScale(data);
	            refreshGifts(data);
	            animateNumbers($('.cart_btn').find('span'),data);
	            refreshGiftsInCart(data);
	            refreshGiftNotify(data);
            }
        });
}

function refreshGiftsInCart(total){
	$('.zakaz_list li').each(function(i,item){
		if($(item).data('is-gift')==1){ 
			if(total<$(item).data('min-total')){
				deleteCartItem($(item).data('index'));
				refreshGifts(total);
				
				$('.need_more').each(function(i,item){
					$(item).closest('.gift_box_products').removeClass('active');
					$(item).closest('.gift_box_products').find('.maska').hide();
					$(item).css('background-color',$(item).data('normal-bg'));
				});
			}
		}
	});
}

function changeProdutValue(product,direction){

    var plus_tov = $(product).find('.txt_col_tov').first();
    var plus_tov_val = plus_tov.val();

    if (direction == 'increase')
        plus_tov_val++;

    if (direction == 'decrease' && plus_tov_val > 1)
        plus_tov_val--;


    price = $(product).data('price').replace(",", ".");
    oldprice = $(product).data('old-price').replace(",", ".");
    animateNumbers($(product).find('.price span').first(), price * plus_tov_val);
    animateNumbers($(product).find('.price span').last(), price * plus_tov_val);
    animateNumbers($(product).find('.old_price span').first(), oldprice * plus_tov_val);
    animateNumbers($(product).find('.old_price span').last(), oldprice * plus_tov_val);


    $(product).find('.txt_col_tov').val(plus_tov_val);

}

function refreshGifts(total){
	if($('.need_more').length>0){
		$('.need_more').each(function(i,item){
			if(parseInt(total)>=parseInt($(item).data('min-total'))){
				$(item).hide();
				$(item).parent().find('.down').show();

			}else{
				$(item).show();
				$(item).parent().find('.down').hide();

			}

		});
	}
}

function registerChangeAmountEvent(){
	$('#cart .minus_tov').off().on('click',function(e){
		var product_id = $(this).closest('li').data('index');
		//console.log($(this).closest('li').data('is-gift'));
		if($(this).closest('li').data('is-gift')==0 || $(this).closest('li').data('is-gift')==undefined){
			var minus_tov = $(this).next('.txt_col_tov');
			var minus_tov_val = minus_tov.val();
			if (minus_tov_val>1) {
                minus_tov_val--;
				minus_tov.val(minus_tov_val);
			}

			updateCountInCart(product_id, minus_tov.val());
        }
		e.preventDefault();
    });

	$('#cart .plus_tov').off().on('click',function(e){

        var product_id = $(this).closest('li').data('index');
		if($(this).closest('li').data('is-gift')==0 || $(this).closest('li').data('is-gift')==undefined){
			var plus_tov = $(this).prev('.txt_col_tov');
			var plus_tov_val = plus_tov.val();
			plus_tov_val++;
			plus_tov.val(plus_tov_val);
			updateCountInCart(product_id, plus_tov.val());
		}
		e.preventDefault();
	});
}

function registerCartListeners(){
	$('.delete_basket_item').off().on('click',function(){
		if($(this).closest('li').data('is-gift')==1){
			setTimeout(function(){
				$('.empty_podarok').hide();
				$('.podarok_complete').hide();
				$('.podarok').show();	
			}, 900);
			
			$('.gift_box_products').find('.maska').hide();
			$('.need_more').each(function(i,item){
				$(item).css('background-color',$(item).data('normal-bg'));	
			});		
			$('.gift_box_products').removeClass('active');
			$('.podarok_complete').addClass('bounceOutLeft');
			$('.podarok').addClass('bounceInLeft');
		}
		deleteCartItem($(this).closest('li').data('index'));
	});
	
	registerChangeAmountEvent();
	
}
function animateNumbers(elem,new_val){
    $({val_i: parseInt($(elem).text().split(' ').join(''))}).animate({val_i: new_val}, {
        duration: 500,
        easing: 'swing',
        step: function () {
            $(elem).text(parseInt(this.val_i) + 0, 7);
        },
        complete: function () {
            $(elem).text(number_format(new_val, 2, ',', ' '));
        }
    })
}

function deleteCartItem(item_id){
	$.ajax({
            type: 'POST',
            url: '/bdhandlers/basket.php?t='+new Date().getTime(),
            data: {action: 'delete', item_id: item_id},
            success: function (data) {
	            if(window.shop_min_sum!==undefined && data<window.shop_min_sum){
		            $('.not_enough').show();
		            $('.cart_meta input[type="submit"]').hide();
	            }else{
		            $('.not_enough').hide();
		            $('.cart_meta input[type="submit"]').show();
	            }
	            animateNumbers($('#cart').find('.summa span'),data);
	            animateNumbers($('#oform').find('.summa span'),data);
	            renderGiftScale(data);
	            refreshGiftsInCart(data);
	            refreshGifts(data); 
				var index = $('.zakaz_list').find('li[data-id="'+item_id+'"]').index();
	            var scrollToItem = index*100;
	            
	            $('.zakaz_list').find('li[data-index="'+item_id+'"]').addClass('basket_remove_animate');
		            
	            	
	            setTimeout(function(){
			        $('.zakaz_list').find('li[data-index="'+item_id+'"]').remove(); 
			        if($('.zakaz_list').find('li').length==0){
						$('.cart_popup .close').trigger('click');
						$('.cart_btn').removeClass('cart_full').addClass('cart').html("");
					}else{
						animateNumbers($('.cart_btn').find('span'),data);
					}
	            },700);
	            refreshGiftNotify(data);
	            
	            var $scrollbar = $("#scrollbar1");
				$scrollbar.tinyscrollbar();	
				var scrollbar__ = $scrollbar.data("plugin_tinyscrollbar");
	            setTimeout(function(){ 
		            if($('.zakaz_list').find('li').length>=3 && index>3){
						scrollbar__.update(scrollToItem-300);
		            }else{
			        	scrollbar__.update();    
		            }
	            },900);
	            
				
				
				
            }
        });
}

function renderCartItem(i,item){
	return '<li  data-index="'+i+'" data-is-gift="'+item.is_gift+'" data-price="'+item.item_price+'" data-min-total="'+item.min_total+'" data-id="'+item.item_id+'"><div class="pic"><img src="'+item.item_img+'" alt=""></div>'+
                            '<div class="name"><span>'+item.item_name+'</span></div>'+
                            '<div class="colich_tov">'+
                                '<input type="button" value="-" class="minus_tov">'+
                                '<input type="text" value="'+item.count+'" class="txt_col_tov" readonly="readonly">'+
                                '<input type="button" value="+" class="plus_tov">'+
        '</div>' +
                            '<div class="price">'+item.item_price+' <i class="rouble rouble_padding_3px">i</i></div>'+
                            '<span class="delete delete_basket_item" data-id="'+item.item_id+'"></span>'+
                        '</li>';
}



function renderGiftScale(total){
	var percent = (total/window.gift_level_3)*100;
	$('.delenija').css('height',percent+'%');
	if(total>=window.gift_level_1){
		$('.free_panda.lit').addClass('active');
		if(total>=window.gift_level_2){
			$('.free_panda.mid').addClass('active');
			$('.free_panda.lit .zabr').hide();
			if(total>=window.gift_level_3){
				$('.free_panda.hot').addClass('active');
				$('.free_panda.lit .zabr').hide();
				$('.free_panda.mid .zabr').hide();
			}else{
				$('.free_panda.hot').removeClass('active');
				$('.free_panda.mid .zabr').show();
			}
		}else{
			$('.free_panda.mid').removeClass('active');
			$('.free_panda.hot').removeClass('active');
			$('.free_panda.lit .zabr').show();
			$('.free_panda.mid .zabr').hide();
		}
	}else{
		$('.free_panda').removeClass('active');
		$('.free_panda.mid').removeClass('active');
		$('.free_panda.hot').removeClass('active');
		$('.free_panda.lit .zabr').hide();
		$('.free_panda.mid .zabr').hide();
	}
	
	
	
	
}

function addToBasket(product) {
    var product_id = parseInt($(product).data('id'));
    $('.cart_summa').removeClass('cart_summa_empty');
    $('.cart_summa').find('.rouble').show();
    $('.cart_summa').find('.summ_count').show();

    $('.cart_empty_block').hide();
    $('.summa').show();
    $('.down_box').show();
    $('.addtocart').attr('disabled', 'disabled');
    setTimeout(function () {
        $('.addtocart').removeAttr('disabled');
    }, 500);

    var cart = $('.cart_btn').delay(1000);

    var imgtodrag = $(product).find('.balloon').eq(0);

    var amount = 1;

    amount = $(product).find('.txt_col_tov').first().val();


    $.ajax({
        type: 'GET',
        url: 'ajax/cart.php',
        dataType: 'json',
        data: {variant: product_id, amount: amount},
        success: function (response) {
            if ($('.cart_btn').html().trim() == '') {
                $('.cart_btn').html('<span>0</span><i class="rouble rouble_padding">i</i>');
            }
            $('.cart_btn').html(response);
            $('.cart_btn').removeClass('cart').addClass('cart_full');
            // animateNumbers($('.cart_btn').find('span'),data.total);
        }
    });
    if (imgtodrag) {
        var imgclone = imgtodrag.clone()
            .offset({
                top: $(product).find('.addtocart').offset().top,
                left: $(product).find('.addtocart').offset().left
            })
            .css({
                'opacity': '1',
                'position': 'absolute',
                'z-index': '100',
                'visibility': 'visible',
                'display': 'block',
            })
            .appendTo('body')
            .animate({
                'top': cart.offset().top,
                'left': cart.offset().left,
            }, 500);
    }
}


function number_format(number, decimals, dec_point, thousands_sep) {

    var i, j, kw, kd, km;
    if (isNaN(decimals = Math.abs(decimals))) {
        decimals = 2;
    }
    if (dec_point == undefined) {
        dec_point = ",";
    }
    if (thousands_sep == undefined) {
        thousands_sep = ".";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    kw = i.split(/(?=(?:\d{3})+$)/).join(thousands_sep);
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


    return kw + kd;
}

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
};



