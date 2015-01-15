var loadtop;

$(window).scroll(function(){
	update();
});
$(window).resize(function(){
	update();
});
$(document).ready(function(){
	update();
});
 
function update(){
	loadtop = $(window).scrollTop();
	$("img[xz_src]").each(function(i){
		if($(this).offset().top + 100 > loadtop && $(this).offset().top - 100 < loadtop + $(window).height()){
			$(this).attr("src",$(this).attr("xz_src"));
			$(this).removeAttr("xz_src");
		}	
	});
}