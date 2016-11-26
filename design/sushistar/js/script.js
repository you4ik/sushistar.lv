setTimeout(registerProductListeners,1000);
function calculateRow(){
    var productsPerRow = parseInt($('.tovar_box').width()/220);
    return productsPerRow;
}



function registerProductListeners(){
	//alert('Product listeners attached');
	$('.txt_col_tov').attr('readonly','readonly');
	$('.tovar .pic').off().on('click',function(event){

		var prev_zoom = $('.tovar_zoom.animate');
		$(prev_zoom).find('.recomend').hide();
		$(prev_zoom).removeClass('animate');
		if($(prev_zoom).hasClass('last_zoom')){
			$(prev_zoom).css('left','0');
		}


		var zoom = $(this).parent().find('.tovar_zoom');
		
		$(zoom).addClass('animate');

		setTimeout(function(){
			$(zoom).find('.recomend').show();
			$(zoom).find('.zoom').show();
		}, 200);

		

		if($(zoom).hasClass('last_zoom')){
			if(window.innerWidth <=640){
				$(zoom).css('left','-267px');
			}else{
				$(zoom).css('left','-247px');
			}
		}
	});
	$('.tovar_zoom .pic').off().on('click',function(event){
		
		var zoom = $(this).parent();
		$(zoom).find('.recomend').hide();
		$(zoom).find('.zoom').hide();
		$(zoom).removeClass('animate');
		if($(zoom).hasClass('last_zoom')){
			$(zoom).css('left','0');
		}
		
	});
	
	var perRow = calculateRow();
	
	$('.tovar_zoom').each(function(i,elem){
		$(elem).removeClass('last_zoom');
		if((i+1)%perRow==0){
			$(elem).addClass('last_zoom');
		}
	});
	
	setTimeout(function(){
		$('.tovar').removeClass('animate');
	}, 1000);
		
	$(window).resize(function(){
		var perRow = calculateRow();	
		$('.tovar_zoom').each(function(i,elem){
			$(elem).removeClass('last_zoom');
			if((i+1)%perRow==0){
				$(elem).addClass('last_zoom');
			}
		});
	});

    var tovar_class="tovar";
    if($('.detail_tovar').length>0){
        tovar_class = 'detail_tovar';
    }
    $('.addtocart').off().on('click',function(){
        var product = $(this).closest('.'+tovar_class);
        addToBasket(product);
    });
    $('.'+tovar_class+' .minus_tov').off().on('click',function(e){
        var product = $(this).closest('.'+tovar_class);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
        changeProdutValue(product,'decrease');
        e.preventDefault();
    });

    $('.'+tovar_class+' .plus_tov').off().on('click',function(e){
        var product = $(this).closest('.'+tovar_class);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
        changeProdutValue(product,'increase');
        e.preventDefault();
    });
	$('.like').off().on('click',function(){
		var link = $(this);
		$.ajax({
            type: 'POST',
            url: '/bdhandlers/likes_bd.php',
            dataType: 'json',
            data: {item_id: $(this).closest('.'+tovar_class).data('id')},
            success: function (data) {
	            if(data.user_like==0){
		            $(link).addClass('you_not_like_bitch');
	            }else{ 
		            $(link).removeClass('you_not_like_bitch');
	            }
	            if(parseInt(data.total)>0){
	            	$(link).removeClass('likes_disabled').find('span').text(data.total);
	            }else{
		            $(link).addClass('likes_disabled').find('span').html('');
	            }
            }
        });
        return false;
	});
	$('.tovar_cost').each(function(i,item){ 
		$(item).find('.balloon').remove();
		$(item).append("<img class='balloon' src='/design/sushistar/img/balloon.png' style='display:none;'>");
	});
}
function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('.togmenu').offset().top;
    if (window_top > div_top) {
        $('.poplavok').addClass('stick');
    } else {
        $('.poplavok').removeClass('stick');
    }
}
$(document).ready(function(){
	
	$(window).scroll(sticky_relocate);
    sticky_relocate();
	
setTimeout(registerProductListeners,1000);
	$(document).on('click', function (e) {
	    if ($(e.target).closest(".tovar_zoom").length === 0 && $(e.target).closest(".pic").length === 0 && $('.tovar_zoom.animate').is(':visible')) {
	        var zoom = $('.tovar_zoom.animate');
			$(zoom).find('.recomend').hide();
			$(zoom).removeClass('animate');
			if($(zoom).hasClass('last_zoom')){
				$(zoom).css('left','0');
			}
	    }
	    
	    if($(e.target).closest("#paid").length === 0 && $('#paid').is(':visible')){
			$('#paid').hide();
	    }
	    if($(e.target).closest("#error").length === 0 && $('#error').is(':visible')){
			$('#error').hide();
	    }
	    if($(e.target).closest("#cart").length === 0 && $('#cart').is(':visible')){
			$('#cart').addClass('animate_out');
	    }
	    
	    if($(e.target).closest("#thank").length === 0 && $('#thank').is(':visible')){
			$('#thank').addClass('animate_out');
	    }
	    if($(e.target).closest("#oform").length === 0 && $('#oform').is(':visible')){
			$('#oform').addClass('animate_out');
			setDevliveryPrice(0,0);
			setTimeout(function(){
				$('#oform').removeClass('animate_out').hide();	
			}, 1000);
	    }

		if($(e.target).closest('.phone').length === 0 && $(e.target).closest(".call_back_popup").length === 0 && $('.call_back_popup').is(':visible')){
			$('.call_back_popup').addClass('animate_out');
			
	    }

	});


		
	function updateSize(){
        var minHeight=parseInt($('.owl-item').find('img').height());
        $('.owl-item').each(function () {
            var thisHeight = parseInt($(this).css('height'));
            minHeight=(minHeight<=thisHeight?minHeight:thisHeight);
        });
        $('.owl-wrapper-outer').css('height',minHeight-5+'px');
    }
    
	
	
	

	
	if($('.slider')){
		$('.slider').owlCarousel({singleItem:true,autoPlay: true});
	}
	
	$('#headphone').click(function(e){
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		$('.call_back_popup').css('top', ((scrollTop)) +89 + 'px');
		$('.cb_start').show();
		$('.cb_start').removeClass('animate_out').addClass('animate_in');
		e.preventDefault();
	});	
	$('.call_back_popup .close').click(function(e){
		$('.call_back_popup').addClass('animate_out');
		e.preventDefault();
	});	
	$('#thank .close').click(function(e){
		$('#thank').hide();
		e.preventDefault();
	});
	$('#paid .close').click(function(e){
		$('#paid').hide();
		e.preventDefault();
	});
	$('#error .close').click(function(e){
		$('#error').hide();
		e.preventDefault();
	});	
		
	$('.podarki_close .open').click(function(e){
		$('.podarki_close .open').hide();
		$('.podarki_close .shkala').hide();
		$('.podarki_open').removeClass('animate_out').addClass('animate_in').show();
		$('.podarki_open').find('.shkala').show();
		$('.podarki_close').addClass('animate_out');
		e.preventDefault();
	});	
	$('.podarki_open .close').click(function(e){
		
		$('.podarki_close .shkala').show();
		$('.podarki_close').removeClass('animate_out').addClass('animate_in').show();
		$('.podarki_open').find('.shkala').hide();
		$('.podarki_open').removeClass('animate_in').addClass('animate_out');
		
		$('.podarki_close .open').addClass('animate');
		setTimeout(function(){
		$('.podarki_close .open').show();	
		},100);
		
		e.preventDefault();
	});	

	$('#cart .close').click(function(e){
		$('#cart').addClass('animate_out');
		e.preventDefault();
	});	
	
	$('#oform .close').click(function(e){
		$('#oform').addClass('animate_out');
		setDevliveryPrice(0,0);
		setTimeout(function(){
			$('#oform').removeClass('animate_out').hide();	
		}, 800);
		e.preventDefault();
	});				
	
	$('#mobmenu').click(function(e){
		$('.togmenu').slideToggle();
		e.preventDefault();
	});	
	$('.togmenu .close').click(function(e){
		$('.togmenu').slideToggle();
		e.preventDefault();
	});	 
		
});