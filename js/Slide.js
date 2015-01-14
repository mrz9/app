/**
 * Created by jimmy on 15-1-12.
 */

var Slide = function(option){
    this.elem = typeof(option.elem) === "string" ? $("#"+option.elem) : option.elem;
    this.type = option.type || "mouseover";
    this.lazyLoad = option.lazyload;
    this.tabNav = this.elem.find(".tab_nav");
    this.tabContent = this.elem.find(".tab_content");
    this.autoPlay = option.autoplay || 0;
    this.time = option.time || 3000;
    this.random = option.random || 0;  //1是0否随机显示
    this.autopage = option.autopage || 0;
    this.i = 1;
    this.init();

}
Slide.prototype = {
    init: function(){
        this.start();
        if(this.random==1){
            var len = parseInt(this.tabNav.find("li").length);
            this.i = parseInt(Math.random()*len);
            this.slideT(this.i);
        }
        if(this.autoPlay==1){
            this.auto();
        }
        if(this.autopage==1){
            this.autoPage();
        }
    },
    start:function(){
        var that = this;
        this.tabNav.find("li").on(this.type,function(){
            var index = $(this).index();
            that.i = index+1;
            that.slideT(index);
        });
    },
    slideT:function(index){
        this.tabNav.find(">li").eq(index).addClass("current").siblings().removeClass("current");
        this.tabContent.find(">li").eq(index).show().siblings().hide();
        if(this.lazyLoad){//tab 延迟加载
            var src = this.tabContent.find(">li").eq(index).find("img").attr(this.lazyLoad);
            this.tabContent.find(">li").eq(index).find("img").attr("src",src);
        }
    },
    auto: function(){
        var that = this,
            len = that.tabNav.find("li").length;
        var autoSlide = function(){
            that.slideT(that.i);
            that.i++;
            if(that.i>=len){that.i=0}
        }
        var interval = setInterval(autoSlide,this.time);
        this.elem.hover(function(){
            clearInterval(interval);
        },function(){
            interval = setInterval(autoSlide,that.time)
        })
    },
    autoPage: function(){
        var len = this.tabNav.find("li").length;
        for(var i=0;i<len;i++){
            this.tabNav.find("li").eq(i).find("a").prepend('<i class="i i'+i+'">'+(i+1)+'</i>');
        }
    }
}

var imgFocus = new Slide({elem:"img_focus",autoplay:1,time:1000,lazyload:"load_src"});

