(function( $ ) {
  $.fn.gridacord = function(o) {
	  
	if(o === undefined){
		o = {};
	}
	  
	target = $(this).selector;
	item_margin = o.item_margin === undefined ? 5 : o.item_margin;
	width = o.width === undefined ? 290 : o.width;
	height = o.height === undefined ? 290 : o.height;
	transition_time = o.transition_time === undefined ? 800 : o.transition_time;

	if(verify_integrity(target)){
			    
		init_grid(target, width, height, item_margin);
		init_images(target, width, height);
		
		resize_images(target);
		
		$(target + " .item").hover(function(){
		
			index = $(target + " .item").index(this);
			grid_size = parseInt($(target).css("width"));	
			
			if($(target + " .item").eq(index).attr("data-exp-width") != null){
				exp_width = parseInt($(target + " .item").eq(index).attr("data-exp-width"));
			}else{
				exp_width = $(target + " .item img").eq(index).width();
			}
			
			if($(target + " .item").eq(index).attr("data-exp-height") != null){
				exp_height = parseInt($(target + " .item").eq(index).attr("data-exp-height"));
			}else{
				exp_height = $(target + " .item img").eq(index).height();
			}
		
			qt_items = $(target + " .item").size();
			items_per_row = Math.sqrt(qt_items);
		
			col = Math.floor(index/items_per_row);
			line = Math.floor(index%items_per_row);
		
			for(i = 0; i<qt_items; i++){
				
				a_col = Math.floor(i/items_per_row);
				a_line = Math.floor(i%items_per_row);
				
				l = null;
				t = null;
				
				if(a_col == col){
					new_height = exp_height;
					l = 0;
				}else{
					new_height = (grid_size - item_margin - exp_height - 2 * item_margin) / (items_per_row-1) - (2*item_margin);
				}
				
				if(a_line == line){
					new_width = exp_width;
					t = 0;
				}else{
					new_width = (grid_size - item_margin - exp_width - 2 * item_margin ) / (items_per_row-1) - (2*item_margin);
				}
				
				$(target + " .item").eq(i).animate({"height": new_height, "width": new_width}, {"duration" : transition_time, "queue" : false});
				
				$(target + " .item img").eq(i).animate({"left": l, "top": t}, {"duration" : transition_time, "queue" : false});
			}
		},function(){
			
			for(i = 0; i<qt_items; i++){
				
				$(target + " .item").eq(i).animate({"height": width, "width": height}, {"duration" : transition_time, "queue" : false});

				l = jQuery.data($(target + " .item img")[i], "l");
				t = jQuery.data($(target + " .item img")[i], "t");
				
				$(target + " .item img").eq(i).animate({"left": l, "top": t}, {"duration" : transition_time, "queue" : false});
			}
			
		});
		
	}
	
	function init_grid(target, width, height, item_margin){
		
		$(target + " .item").css({"width" : width +"px", "height" : height+"px", "margin" : item_margin+"px", "float" : "left", "overflow" : "hidden"});
		$(target + " .item img").css({"position" : "relative"});

		i = $(target + " .item").size();
		j = Math.sqrt(i);
		
		container_width = (width + 2 * item_margin)*j + item_margin;
		container_height = (height + 2 * item_margin)*j + item_margin;
		
		$(target).css({"width" : container_width, "height" : container_height, "padding" : item_margin +"px 0px 0px " + item_margin + "px"});
	}
	
	
	
	function init_images(target, width, height){

		$(target + " .item img").imagesLoaded(function(){
			
			$(target + " .item").each(function(){
				
				target_width = $(this).width();
				target_height = $(this).height();
				
				if($(this).find("img").length == 0){
					return true;
				}
				
				img_width = $(this).find("img").width();
				img_height = $(this).find("img").height();
				
				spot_x = $(this).attr("data-spot-x");
				spot_y = $(this).attr("data-spot-y");
				
				if(spot_x == null){
					spot_x = 50;
				}
				
				if(spot_y == null){
					spot_y = 50;
				}
				
				l = ((img_width*(spot_x/100)) * -1) + (target_width/2);
				t = ((img_height*(spot_y/100)) * -1) + (target_height/2);
				
				if(l > 0){
					l = 0;
				}else if((l*-1) + width > img_width){
					l = (img_width - width) * -1;
				}
				
				if(t > 0){
					t = 0;
				}else if((t*-1) + height > img_height){
					t = (img_height - height) * -1;
				}
				
				$(this).find("img").css("left", l);
				jQuery.data($(this).find("img")[0], "l", l);
				$(this).find("img").css("top", t);
				jQuery.data($(this).find("img")[0], "t", t);
				
			});
		});
	}
	
	function verify_integrity(target){
		
		i = $(target + " .item").size();
		j = Math.sqrt(i);
		if(parseInt(j) != j){
			console.log("Items number must a power of 2");
			return false;
		}else{
			return true;
		}
	}
	
	function resize_images(target){
		
		$(target + " .item").each(function(){
			
			if($(this).attr("data-exp-width") != null){
				$(this).find("img").width($(this).attr("data-exp-width"));
			}
			
			if($(this).attr("data-exp-height") != null){
				$(this).find("img").height($(this).attr("data-exp-height"));
			}
		});
	}	
	
  };
})( jQuery );
