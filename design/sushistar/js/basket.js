





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



