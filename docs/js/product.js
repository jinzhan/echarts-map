// JavaScript Document
$(document).ready(function(){
 $("dd").hide();
 var current_dd =$(".current").next("dd");
 
 $(current_dd).show();
 
 $("dt").find("a").after("<a class='iexpand' href='#'>+</a>");
 $(".current").find(".iexpand").text("-");
 $("dt a").click(function(){
	 var iepand = $(this).parent().find(".iexpand").text();
	 $(".iexpand").text("-");
	 if(iepand==="+"){
		 $(this).parent().find(".iexpand").text("-");
		 }
	 else{
		  $(this).parent().find(".iexpand").text("+");
	 }
	 
	 
 $(this).parent().toggleClass("bg");
 $(this).parent().prevAll("dt").removeClass("bg")
 $(this).parent().nextAll("dt").removeClass("bg")
 $(this).parent().next().slideToggle();
 $(this).parent().prevAll("dd").slideUp("slow");
 $(this).parent().next().nextAll("dd").slideUp("slow");
 return false;
 });
 
 
 
 //------tab-----------
$('.tabtitle li').click(function () {
var index = $(this).index();
$(this).attr('class',"tabhover").siblings('li').attr('class','taba');
$('.tabcontent').eq(index).show(200).siblings('.tabcontent').hide();
});




if($('#article_image_list').find('li').length == 0){
            $('#article_image_list').parents('div.detail_r').hide().prev('div.detail_l').css('width', '100%');
}
else{
       jQuery(".picScroll").slide({mainCell:".bd ul",autoPage:true,effect:"leftLoop",autoPlay:false,vis:6,trigger:"click"});
	   $(".picList>li").click(function(){
       var img = $(this).find("img").attr("src");
       $(".picFocus>.bd li").find("img").attr("src",img);
	   $(".picFocus>.bd li a").attr("href",img);
	   $(".picFocus>.bd li a").attr("target","_blank");
       });

       var firstImg = $(".picList>li:not(.clone)").find('img')[0].src;
       $(".picFocus>.bd li").find("img").attr("src",firstImg);
	   
}


 
 
 
});