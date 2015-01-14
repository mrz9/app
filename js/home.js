/**
 * Created by jimmy on 15-1-12.
 */

$(function(){
    $(".bl-list li").hover(function(){
        $(this).siblings().removeClass("cur");
        $(this).addClass("cur");
    });
})