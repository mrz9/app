/**
 * sina flash class
 * @version 1.1.4.2
 * @author [sina ui]zhangping1@
 * @update 2008-7-7 
 */
 
if(typeof(sina)!="object"){var sina={}}
sina.$=function(i){if(!i){return null}
return document.getElementById(i)};var sinaFlash=function(V,x,X,Z,v,z,i,c,I,l,o){var w=this;if(!document.createElement||!document.getElementById){return}
w.id=x?x:'';var O=function(I,i){for(var l=0;l<I.length;l++){if(I[l]==i){return l}}
return-1},C='8.0.42.0';if(O(['eladies.sina.com.cn','ent.sina.com.cn'],document.domain)>-1){w.ver=C}else{w.ver=v?v:C}
w.ver=w.ver.replace(/\./g,',');w.__classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";w.__codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version="+w.ver;w.width=X;w.height=Z;w.movie=V;w.src=w.movie;w.bgcolor=z?z:'';w.quality=c?c:"high";w.__pluginspage="http://www.macromedia.com/go/getflashplayer";w.__type="application/x-shockwave-flash";w.useExpressInstall=(typeof(i)=="boolean")?i:false;w.xir=I?I:window.location;w.redirectUrl=l?l:window.location;w.detectKey=(typeof(o)=="boolean")?o:true;w.escapeIs=false;w.__objAttrs={};w.__params={};w.__embedAttrs={};w.__flashVars=[];w.__flashVarsStr="";w.__forSetAttribute("id",w.id);w.__objAttrs["classid"]=w.__classid;w.__forSetAttribute("codebase",w.__codebase);w.__forSetAttribute("width",w.width);w.__forSetAttribute("height",w.height);w.__forSetAttribute("movie",w.movie);w.__forSetAttribute("quality",w.quality);w.__forSetAttribute("pluginspage",w.__pluginspage);w.__forSetAttribute("type",w.__type);w.__forSetAttribute("bgcolor",w.bgcolor)}
sinaFlash.prototype={getFlashHtml:function(){var I=this,i='<object ';for(var l in I.__objAttrs){i+=l+'="'+I.__objAttrs[l]+'"'+' '}
i+='>\n';for(var l in I.__params){i+='	<param name="'+l+'" value="'+I.__params[l]+'" \/>\n'}
if(I.__flashVarsStr!=""){i+='	<param name="flashvars" value="'+I.__flashVarsStr+'" \/>\n'}
i+='	<embed ';for(var l in I.__embedAttrs){i+=l+'="'+I.__embedAttrs[l]+'"'+' '}
i+='><\/embed>\n<\/object>';return i},__forSetAttribute:function(I,i){var l=this;if(typeof(I)=="undefined"||I==''||typeof(i)=="undefined"||i==''){return}
I=I.toLowerCase();switch(I){case "classid":break;case "pluginspage":l.__embedAttrs[I]=i;break;case "onafterupdate":case "onbeforeupdate":case "onblur":case "oncellchange":case "onclick":case "ondblClick":case "ondrag":case "ondragend":case "ondragenter":case "ondragleave":case "ondragover":case "ondrop":case "onfinish":case "onfocus":case "onhelp":case "onmousedown":case "onmouseup":case "onmouseover":case "onmousemove":case "onmouseout":case "onkeypress":case "onkeydown":case "onkeyup":case "onload":case "onlosecapture":case "onpropertychange":case "onreadystatechange":case "onrowsdelete":case "onrowenter":case "onrowexit":case "onrowsinserted":case "onstart":case "onscroll":case "onbeforeeditfocus":case "onactivate":case "onbeforedeactivate":case "ondeactivate":case "codebase":l.__objAttrs[I]=i;break;case "src":case "movie":l.__embedAttrs["src"]=i;l.__params["movie"]=i;break;case "width":case "height":case "align":case "vspace":case "hspace":case "title":case "class":case "name":case "id":case "accesskey":case "tabindex":case "type":l.__objAttrs[I]=l.__embedAttrs[I]=i;break;default:l.__params[I]=l.__embedAttrs[I]=i}},__forGetAttribute:function(i){var I=this;i=i.toLowerCase();if(typeof I.__objAttrs[i]!="undefined"){return I.__objAttrs[i]}else if(typeof I.__params[i]!="undefined"){return I.__params[i]}else if(typeof I.__embedAttrs[i]!="undefined"){return I.__embedAttrs[i]}else{return null}},setAttribute:function(I,i){this.__forSetAttribute(I,i)},getAttribute:function(i){return this.__forGetAttribute(i)},addVariable:function(I,i){var l=this;if(l.escapeIs){I=escape(I);i=escape(i)}
if(l.__flashVarsStr==""){l.__flashVarsStr=I+"="+i}else{l.__flashVarsStr+="&"+I+"="+i}
l.__embedAttrs["FlashVars"]=l.__flashVarsStr},getVariable:function(I){var o=this,i=o.__flashVarsStr;if(o.escapeIs){I=escape(I)}
var l=new RegExp(I+"=([^\\&]*)(\\&?)","i").exec(i);if(o.escapeIs){return unescape(RegExp.$1)}
return RegExp.$1},addParam:function(I,i){this.__forSetAttribute(I,i)},getParam:function(i){return this.__forGetAttribute(i)},write:function(i){var I=this;if(typeof i=="string"){document.getElementById(i).innerHTML=I.getFlashHtml()}else if(typeof i=="object"){i.innerHTML=I.getFlashHtml()}}}


/*
RotatorAD V3.2
Author: Dakular <shuhu@staff.sina.com.cn>
格式: new RotatorAD(商业广告数组, 非商业广告数组, 层id)
说明: 第一次访问随机出现，以后访问顺序轮播；自动过滤过期广告；cookie时间24小时；商业广告数量不足时，从非商业广告中补充
*/
if(typeof(RotatorAD)!='function'){
var RotatorAD = function(rad,nad,div_id){

var date = new Date();
var id = 0;
var max = 99;
var url = document.location.href;
var cookiename = 'sinaRotator'+escape(url.substr(url.indexOf('/',7),2));
var timeout = 1440; //24h
var w = rad.width;
var h = rad.height;
var num = rad.num;
var ary = new Array();
//过滤无效广告
for(var i=0; i<rad.length; i++){
	var start = strToDate(rad[i][2].replace('<startdate>','').replace('</startdate>',''));
	var end = strToDate(rad[i][3].replace('<enddate>','').replace('</enddate>',''),true);
	if(date>start && date<end){
		//ary.push([rad[i][0], rad[i][1], rad[i][4], rad[i][5]?rad[i][5]:'0']);
		ary.push([rad[i][0], rad[i][1], "<url>" + rad[i][4], rad[i][5]?rad[i][5]:'0']);
	}
}
//补位
var nn = 0;
if(nad.length>0){
	for(var i=0; i<rad.num; i++){
		if(i>ary.length-1){
			ary.push([nad[nn][0], nad[nn][1], '', '0']);
			if(++nn > nad.length-1) nn = 0;
		}
	}
}else{
	num = ary.length;
}
//排序(同步有序号的广告)
ary.sort(function(x,y){return x[3]-y[3];});
//取id
if(typeof(globalRotatorId)=='undefined' || globalRotatorId==null || isNaN(globalRotatorId)){
	curId = G(cookiename);
	curId = curId==''?Math.floor(Math.random()*max):++curId;
	if(curId>max || curId==null || isNaN(curId)) curId=0;
	S(cookiename,curId,timeout);
	globalRotatorId = curId;
}
id=globalRotatorId%num+1;
//Show AD
if(id==0 || ary.length==0) return; //如果没有广告则不显示
if(id==-1) id=1; //当只有一个广告时：始终显示第一个
var n = id-1;

/*begin add by leo 2011-07-12*/
var type_str = ary[n][0].substring(ary[n][0].lastIndexOf(".")).toLowerCase(); 
var type_arr = new Array(); //定义一数组
type_arr = type_str.split("?"); //字符分割   
var type_1 = type_arr[0];
var type_arr_1 = new Array(); //定义一数组
type_arr_1 = type_1.split("."); //字符分割   
var type = type_arr_1[1];
/*end add by leo 2011-07-12*/

//var type = ary[n][0].substring(ary[n][0].length-3).toLowerCase();

var od = document.getElementById(div_id);
if(type=='swf'){
	var of = new sinaFlash(ary[n][0], div_id+'_swf', w, h, "7", "", false, "High");
	of.addParam("wmode", "opaque");
	of.addParam("allowScriptAccess", "always");
	of.addVariable("adlink", escape(ary[n][1]));
	of.write(div_id);
	
	/*begin add by leo 2011-07-12*/
	var adurl = ary[n][2].replace('<url>','');
	od.style.width = w+'px';
	od.style.height = h+'px';
	od.style.display = 'block';
	od.style.position = 'relative';
	//od.innerHTML+='<a style="position:absolute;width:'+w+'px;height:'+h+'px;left:0px;top:0px;cursor:pointer;z-index:10;background-color:#fff;filter:alpha(opacity=0);opacity:0;" target="_blank" href="'+(ary[n][2]?ary[n][2]:'http://www.xizi.com/')+'"></a>';
	od.innerHTML+='<a style="position:absolute;width:'+w+'px;height:'+h+'px;left:0px;top:0px;cursor:pointer;z-index:10;background-color:#fff;filter:alpha(opacity=0);opacity:0;" target="_blank" href="'+(adurl?adurl:'http://www.xizi.com/')+'"></a>';
	/*end add by leo 2011-07-12*/
	
}else if(type=='jpg' || type=='gif'){
	var adurl = ary[n][2].replace('<url>','');
	od.innerHTML = '<a href="'+(adurl?adurl:'http://www.xizi.com/')+'" target="_blank"><img src="'+ary[n][0]+'" border="0" width="'+w+'" height="'+h+'" /></a>';
}else if(type=='htm' || type=='tml'){
	od.innerHTML = '<iframe id="ifm_'+div_id+'" frameborder="0" scrolling="no" width="'+w+'" height="'+h+'"></iframe>';
	document.getElementById('ifm_'+div_id).src = ary[n][0];
}else if(type=='.js'){ //js
	document.write('<script language="javascript" type="text/javascript" src="'+ary[n][0]+'"></scr'+'ipt>');
}else{ //textlink
	document.write('<a href="'+ary[n][1]+'"  target="_blank">'+ary[n][0]+'</a>');
}
if(ary[n][2]!="" && ary[n][2]!=null){ //ad tracker
	var oImg = new Image();
	oImg.src = ary[n][2];
}
function G(N){
	var c=document.cookie.split("; ");
	for(var i=0;i<c.length;i++){
		var d=c[i].split("=");
		if(d[0]==N)return unescape(d[1]);
	}return '';
};
function S(N,V,Q){
	var L=new Date();
	var z=new Date(L.getTime()+Q*60000);
	document.cookie=N+"="+escape(V)+";path=/;expires="+z.toGMTString()+";";
};
function strToDate(str,ext){
	var arys = new Array();
	arys = str.split('-');
	var newDate = new Date(arys[0],arys[1]-1,arys[2],9,0,0);
	if(ext){
		newDate = new Date(newDate.getTime()+1000*60*60*24);
	}
	return newDate;
}

}
}