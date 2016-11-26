


function changeProdutValue(product,direction){

    var plus_tov = $(product).find('.txt_col_tov').first();
    var plus_tov_val = plus_tov.val();

    if(direction=='increase')
        plus_tov_val++;

    if(direction=='decrease' && plus_tov_val>1)
        plus_tov_val--;


    price = $(product).data('price').replace(",", ".");
    oldprice = $(product).data('old-price').replace(",", ".");
    animateNumbers($(product).find('.price span').first(),price*plus_tov_val);
    animateNumbers($(product).find('.price span').last(),price*plus_tov_val);
    animateNumbers($(product).find('.old_price span').first(),oldprice*plus_tov_val);
    animateNumbers($(product).find('.old_price span').last(),oldprice*plus_tov_val);



    $(product).find('.txt_col_tov').val(plus_tov_val);

}



