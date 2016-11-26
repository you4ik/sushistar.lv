function addToBasket(product) {
    var product_id = parseInt($(product).data('id'));
    $('.cart_summa').removeClass('cart_summa_empty');
    $('.cart_summa').find('.rouble').show();
    $('.cart_summa').find('.summ_count').show();

    $('.cart_empty_block').hide();
    $('.summa').show();
    $('.down_box').show();
    $('.addtocart').attr('disabled','disabled');
    setTimeout(function(){
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
            if($('.cart_btn').html().trim()==''){
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
function animateNumbers(elem,new_val){
    $({val_i: parseInt($(elem).text().split(' ').join(''))}).animate({val_i: new_val}, {
        duration: 500,
        easing: 'swing',
        step: function () {
            $(elem).text(parseInt(this.val_i)+0,7);
        },
        complete: function () {
            $(elem).text(number_format(new_val, 2, ',', ' '));
        }
    })
}

function number_format( number, decimals, dec_point, thousands_sep ) {

    var i, j, kw, kd, km;
    if( isNaN(decimals = Math.abs(decimals)) ){
        decimals = 2;
    }
    if( dec_point == undefined ){
        dec_point = ",";
    }
    if( thousands_sep == undefined ){
        thousands_sep = ".";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    kw = i.split( /(?=(?:\d{3})+$)/ ).join( thousands_sep );
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


    return kw + kd;
}
function changeProdutValue(product,direction){

    var plus_tov = $(product).find('.txt_col_tov').first();
    var plus_tov_val = plus_tov.val();

    if(direction=='increase')
        plus_tov_val++;

    if(direction=='decrease' && plus_tov_val>1)
        plus_tov_val--;


    price = $(product).data('price').replace(",", ".");;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    oldprice = $(product).data('old-price').replace(",", ".");;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    animateNumbers($(product).find('.price span').first(),price*plus_tov_val);
    animateNumbers($(product).find('.price span').last(),price*plus_tov_val);
    animateNumbers($(product).find('.old_price span').first(),oldprice*plus_tov_val);
    animateNumbers($(product).find('.old_price span').last(),oldprice*plus_tov_val);



    $(product).find('.txt_col_tov').val(plus_tov_val);

}



