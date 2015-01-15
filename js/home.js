/**
 * Created by jimmy on 15-1-12.
 */

/*顶部广告*/
var rad = new Array();
var nad = new Array();
rad.width = 560; //广告宽度
rad.height = 120; //广告高度
rad.num = 2; //轮播数量
//商业广告(flash)
rad.push(["http://app.xizi.com/uploadfile/2014/0905/20140905053448709.jpg?EZBLKY", "", "<startdate>2009-1-1</startdate>", "<enddate>2100-12-31</enddate>", "http://app.xizi.com/click/22692"]);
rad.push(["http://home.xizi.com/a/2014/09/ots/0911/20140911_560_120.gif?6CEbJv", "", "<startdate>2009-1-1</startdate>", "<enddate>2100-12-31</enddate>", "http://app.xizi.com/click/22959"]);
new RotatorAD(rad,nad,'5492');

var baseUrl = 'http://my.xizi.com/';

/*顶部登录*/
var socket, timing, multilevelElem, showState=0;
$(".multilevel").each(function(){
		$(this).get(0).onmouseover = null;
		$(this).get(0).onmouseout = null;
	});
$(".multilevel").live("mouseover", function(){ 	
	if(multilevelElem && $(this).get(0) != multilevelElem.get(0)){
		multilevelElem.removeClass("hover").find(".show_layer").hide();
		timing && clearTimeout(timing);
		timing = null;
		
	}
	multilevelElem = $(this);
	
	!$(this).hasClass("forum") && showState && msgTipsElem && msgTipsElem.hide();
	
	timing && clearTimeout(timing);
	$(this).addClass("hover").find(".show_layer").show(); 
}); 
$(".multilevel").live("mouseout", function(){ 	
		var that = $(this);
		timing = setTimeout(function(){
			that.removeClass("hover").find(".show_layer").hide();
			
			!$(this).hasClass("forum") && showState && msgTipsElem && msgTipsElem.show();
		}, 300); 			
	}); 


/*图片轮播*/
function slideImg(targetId){
	 jQuery("#"+targetId).slide({
		titCell:".slideTit li",
		mainCell:".slideData",
		autoPlay:true,
		startFun:function( i, c){
		var img = $("#"+targetId+" .slideData>li").eq(i).find("img");
			img.each(function(){
				$(this).attr("src",$(this).attr("load_src"));
			})
		if((i+1)<c){
				var img = $("#"+targetId+" .slideData>li").eq(i+1).find("img");
				img.each(function(){
					$(this).attr("src",$(this).attr("load_src"));
				})
				
			}
		}	
	 });
}
 
slideImg("img_focus");
slideImg("pageRight-loop");
slideImg("pageRight-loop2");
slideImg("movie_focus");



$(function(){
	clickNav({elem:"J_dropdown",showCell:"dd"});
	searchTab({id:"search_nav",curNav:"search_bd"});
	xzBlockClick({elem:"img_desc"}); //整块响应
	xzSlidingAd({slideElem:"slide_ad"}); //顶部滑动广告	
	bbshover({id:"club_box"});
	xz_sel({selectElem:"house_price"});
	xz_sel({selectElem:"house_area"});
	xz_sel({selectElem:"house_type"});
	xz_sel({selectElem:"job_area"});
	xz_sel({selectElem:"job_type"});
	xz_sel({selectElem:"car_type"})
	
	$("img").lazyload({effect: "fadeIn"});
	
	$(".bl-nav a").hover(function(){
		$(this).siblings().removeClass("cur");
        $(this).addClass("cur");
		var show = $(this).attr("data-show"),
			hide = $(this).attr("data-hide");
		$(this).parents(".baoliao").find(".bl-nav"+hide).hide();
		$(this).parents(".baoliao").find(".bl-nav"+show).fadeIn();
	});
	
    $(".bl-list li").hover(function(){
        $(this).siblings().removeClass("cur");
        $(this).addClass("cur");
    });
})
	

//首页搜房模块修改
$("#housing_type").click(function(e){
	e.stopPropagation();
	var ul = $(this).find("ul"),
		li = $(this).find("li"),
		input = $(this).find("input"),
		span = $(this).find("span"),
		m = $("#house_m"),
		c = $("#house_c"),
		ht = $("#house_type"),
		price = $("#house_price"),
		inputP = $("#price");
	ul.show();
	li.hover(
		function(){$(this).addClass("over");},
		function(){$(this).removeClass("over");}
	);
	li.bind("click",function(e){
		e.stopPropagation();
		var thisValue = $(this).attr("val"),
			thisText = $(this).text();
		input.val(thisValue);
		span.text(thisText);
		ul.hide();
		if(thisValue=="list_sale" ||thisValue=="list_rent"){
			ht.show();
			price.hide();
			m.val("agent");
			c.val("lists");
			inputP.val("");
		}else{
			ht.hide();
			price.show();
			m.val("house");
			c.val("index");
		}
	});
});
	
//整块响应函数
function xzBlockClick(option){
	var opt = option || {},
		elem = typeof(opt.elem) === "string" ? $("."+opt.elem) : opt.elem,
		hoverClass = opt.hoverClass || "hover";
	
	if(!elem){return;}
	
	elem.live("mouseover", function(){
			if($(this).hasClass("no_block")){return;}
			if(!$(this).find(".create_link").length){
				$(this).append('<a href="' + $(this).find("a").eq(0).attr("href") + '" target="_blank" class="create_link"></a>');
			}
			hoverClass && $(this).addClass(hoverClass);

		})
		.live("mouseout", function(){
			if($(this).hasClass("no_block")){return;}
			hoverClass && $(this).removeClass(hoverClass);
		});
}

//顶部滑动广告
function xzSlidingAd(option){
	var executeUp,
		opt = option || {},
		slideElem = typeof(opt.slideElem) == "string" ? $("#"+opt.slideElem) : opt.slideElem, //滑动元素
		slideHeight = opt.slideHeight || 300, //滑动高度
		duration = opt.duration || 800, //滑动持续时间
		dwellTime = opt.dwellTime || 5000, //停留时间
		keepHeight = opt.keepHeight || 0, //保留高度
		smallImg = opt.smallImg || "smallImg",
		bigImg = opt.bigImg || "bigImg",
		sImgId = $("#"+smallImg),
		bImgId = $("#"+bigImg);
	if(!bImgId.length){return;}
	slideElem.css({marginTop:"3px"});
	var up = function(){
		slideElem.animate({height:sImgId.length ? 35 : keepHeight + "px"}, duration, function(){
				sImgId && sImgId.show();
				bImgId.hide();
		});
	}
	executeUp = setTimeout(up, dwellTime);
}


var clickNav = function(option){ 
	var elem = typeof(option.elem) === "string" ? $("."+option.elem) : option.elem,
		showCell = option.showCell;
	elem.on("click",function(e){
		e.stopPropagation(); //阻止事件冒泡
		$(this).find(showCell).show();
	});
	
	$(document).click(function(){
		elem.find(showCell).hide();
	})

}

function searchTab(option){
	var id = typeof(option.id) == "string" ? $("#"+option.id) : option.id,
	curNav = typeof(option.curNav) == "string" ? $("#"+option.curNav) : option.curNav;
	id.find("a").click(function(){
		var index = $(this).index();
		if(index==4){return;}
		$(this).addClass("current").siblings().removeClass("current");
		curNav.find(".search_item").eq(index).show().siblings().hide();
	});
}

/*论坛列表Hover*/
function bbshover(opt){
	var id = typeof(opt.id) == "string" ? $("#"+opt.id) : opt.id;
	id.find("ul li").hover(function(){
		var color = $(this).find(".club_name a").css("color");
		$(this).addClass("hover");
		$(this).css({borderColor:color});
	},function(){
		$(this).removeClass("hover");
		$(this).css({borderColor:"#fff"});
	});
}

//获得登录状态
	$.getJSON(baseUrl + "index.php?r=api/wwwtop&random="+Math.random()+"&callback=?", function(data){
		if(data){
			$("#site_nav .nav_user_handle").html(data.content);	
			if(data.uid && data.uid !== "0"){
				xzGlobal.uid = data.uid;
				var s = document.createElement('script');
					s.src = "http://nodejs.xizi.com:3000/socket.io/socket.io.js"
				$('head')[0].appendChild(s);
				if(typeof(io)!=="undefined"){
					socket = io.connect('http://nodejs.xizi.com:3000');
					socket.emit("senduid", {at:data.at, msg:data.msg, notice:data.notice, uid:xzGlobal.uid, replynotice:data.replynotice});
					socket.on("get", function(data){
						msgTipsBox(data);
					});
				}
				//if(data.show){msgTipsBox(data);}
			} else {
				loginFunc();
			}
		}
	});
//登录
	function loginFunc(){
		
		var loginForm = $("#nav_login_form");
		
		if(!loginForm.length){return;}
		
		var loginTip = $(".nav_login_tip"),
			un = $("#nav_login_un"),
			pwd = $("#nav_login_pwd"),
			rmbMe = $(".nav_login_rmb input"),
			isLoading = false;
			
		loginForm.submit(function(){
			
			if(!un.val()){
				loginTip.text("用户名不能为空").show();
				un.focus();
				return false;
			} else if(!pwd.val()){
				loginTip.text("密码不能为空").show();
				pwd.focus();
				return false;
			} 
			if(isLoading){return;}
			isLoading = true;
			
			loginTip.addClass("loading").text("登录中...");
			
			$.getJSON(baseUrl+"index.php?r=members/ajaxlogin&callback=?", {username:un.val(), password:hex_md5(pwd.val()), rememberme:rmbMe.attr("checked")?1:0}, function(data){
				if(data){
					if(data.uid > 0){
						//loginTip.removeClass("loading");
						xzGlobal.login = 1;
						$("body").append(data.synscript);
						
						setTimeout(function(){
							window.location.href = window.location.href;
						}, 300);	
						
					} else {
						loginTip.removeClass("loading").text("用户名或密码错误").show();
					}
				} else {
					loginTip.removeClass("loading").text("登录出错，请刷新页面").show();
				}
				isLoading = false;
			});
			
			return false;
			
		});
	}
	
//使用ul代替select
function xz_sel(option, callback){
	var opt = option || {},
		select = typeof(opt.selectElem) === "string" ? $("#"+opt.selectElem) : opt.selectElem,
		over = opt.over || "over",
		type = opt.type || "click",
		selType = opt.selType || 1,//设定默认值
		i = 0,
		selectLen = select.length,
		timing;
	
	//初始化
	(function(){
		for(; i<selectLen; i++){
			var that = select.eq(i),
				span = that.find("span"),
				ul = that.find("ul"),
				li = that.find("li"),
				firstLi = that.find("li").eq(0),
				currentLi = that.find("li.current"),
				input = that.find("input");
			//设定默认值	
			(selType == 1) && span.text(currentLi.text() || firstLi.text());
			input.val(currentLi.attr("val") || firstLi.attr("val"));

			var uw = ul.width(),
				lp = firstLi.outerWidth() - firstLi.width();
			li.width(uw-lp);
			ul.css({display:"none", visibility:"visible"});
		}
	})();
	
	select.bind(type, function(e){	
		e.stopPropagation();
		var span = $(this).find("span"),
			ul = $(this).find("ul"),
			li = ul.find("li"),
			input = $(this).find("input");
		li.unbind("click");	
		ul.show();
		
		li.hover(
			function(){$(this).addClass(over);},
			function(){$(this).removeClass(over);}
		);
		
		li.click(function(e){
			e.stopPropagation();
			var thisText = $(this).text(),
				thisValue = $(this).attr("val");	
			(selType == 1) && span.text(thisText);
			input.val(thisValue);
			ul.hide();
			callback && callback($(this));
		});
	});
	select.hover(
		function(){
			timing && clearTimeout(timing);
		},
		function(){
			var ul = $(this).find("ul"),
				li = ul.find("li");
			timing = setTimeout(function(){ul.hide();}, 300);
		}
	);
}


/*回到顶部*/
//回到顶部
(function(){
	var doc=document,win=window;
	function getObj(id){
		return document.getElementById(id);
	}
	window.isIE6=$.browser.msie&&($.browser.version == "6.0")&&!$.support.style;
	window.ScrollBar=function(){
		var Tween={
			Quad:{
				easeOut: function(t,b,c,d){
					return -c *(t/=d)*(t-2) + b;
				},
				easeInOut: function(t,b,c,d){
					if ((t/=d/2) < 1) return c/2*t*t + b;
					return -c/2 * ((--t)*(t-2) - 1) + b;
				}
			}
		}
		var that = this;
		if(!getObj("scrollBar")){
			var ele = doc.createElement("div");
			ele.id = "scrollBar";
			ele.innerHTML+='<a id="backtop" class="backtop" hideFocus="true" href="javascript:void(0)">回到顶部</a>';
			doc.body.appendChild(ele);
		}else{
			var ele = getObj("scrollBar");
		}
		var barTxt="回到顶部";
		var distance=200;//限定范围
		var dd = doc.documentElement;
		var db = doc.body;
		var scrollTop;//顶部距离
		var backtop = getObj("backtop");
		this.setStyle = function(){
			scrollTop = db.scrollTop || dd.scrollTop;//顶部距离
			var sw = dd.scrollWidth;
			var pos='right:50%;margin-right:-570px;';
			var fullscreen = getObj('fullscreenStyle');//判断屏幕状态
			if((fullscreen && !fullscreen.disabled) || sw<1020){//宽屏或者窗口宽度小于可见值时 1020=960+20*2+10*2
				pos='right:5px;';
				ele.className = "small";
			} else {
				ele.className = "";
			}
			var ctxt=scrollTop >= distance ? 'display:block': 'display:none';
			ele.style.cssText='position:fixed;'+pos+'bottom:75px;'+'display:block';
			backtop.style.cssText=ctxt;
		}
		this.update=function(){//控制滑块显示 并修正IE6定位
			scrollTop = db.scrollTop || dd.scrollTop;
			ele.style.display=(scrollTop>=distance)?"block":"block";
			backtop.style.display=(scrollTop>=distance)?"block":"none";
			if(!win.XMLHttpRequest){//如果IE6
				var h = ele.offsetHeight;
				var ch = doc.documentElement.clientHeight;
				ele.style.position="absolute";
				ele.style.top=ch+scrollTop-h-75+"px";
			}
		}
		that.b=0;//初始值
		that.c=0;//变化量
		var d = 10,t = 0;//持续时间和增量
		this.run=function(){
			if(dd.scrollTop){
				dd.scrollTop=Math.ceil(Tween.Quad.easeOut(t,that.b,that.c,d));
			}else{
				db.scrollTop = Math.ceil(Tween.Quad.easeOut(t,that.b,that.c,d));
			}
			if(t<d){ t++; setTimeout(that.run, 10); }else{t=0;}
		}
		ele.onclick=function(event){
			var event = event || window.event,
				target = event.target || event.srcElement;

			if(target.className == "backtop"){
				that.b = scrollTop;
				that.c =- scrollTop;
				that.run();
				return false;
			}
		}
		this.init=function(){
			this.setStyle();
			win.onscroll=function(){
				that.update();
			}
			win.onresize=function(){
				that.setStyle();
				that.update();
			}
		}
	}
	window.onload=function(){
		var goTop=new ScrollBar();
		goTop.init();
		win.goTop=goTop;
	}
})()


/*md5*/
	
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}

