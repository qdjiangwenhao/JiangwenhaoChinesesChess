var mod = mod||{};

mod.init = function (stype){
	
	mod.nowStype= stype || mod.getCookie("stype") ||"stype2";
	var stype = mod.stype[mod.nowStype];
	mod.width			=	stype.width;		//画布宽度
	mod.height			=	stype.height; 		//画布高度
	mod.spaceX			=	stype.spaceX;		//着点X跨度
	mod.spaceY			=	stype.spaceY;		//着点Y跨度
	mod.pointStartX		=	stype.pointStartX;	//第一个着点X坐标;
	mod.pointStartY		=	stype.pointStartY;	//第一个着点Y坐标;
	mod.page			=	stype.page;			//图片目录
	
	mod.canvas			=	document.getElementById("chess"); //画布
	mod.ct				=	mod.canvas.getContext("2d") ; 
	mod.canvas.width	=	mod.width;
	mod.canvas.height	=	mod.height;
	
	mod.childList		=	mod.childList||[];


	mod.loadImages(mod.page);		//载入图片/图片目录
	
}

//样式
mod.stype = {
	stype1:{
		width:325,		//画布宽度
		height:402, 		//画布高度
		spaceX:35,		//着点X跨度
		spaceY:36,		//着点Y跨度
		pointStartX:5,		//第一个着点X坐标;
		pointStartY:19,		//第一个着点Y坐标;
		page:"stype_1"	//图片目录
	},
	stype2:{
		width:523,		//画布宽度
		height:580, 		//画布高度
		spaceX:57,		//着点X跨度
		spaceY:57,		//着点Y跨度
		pointStartX:3,		//第一个着点X坐标;
		pointStartY:5,		//第一个着点Y坐标;
		page:"stype_2"	//图片目录
	},
	stype3:{
		width:530,		//画布宽度
		height:567, 		//画布高度
		spaceX:57,		//着点X跨度
		spaceY:57,		//着点Y跨度
		pointStartX:-2,		//第一个着点X坐标;
		pointStartY:0,		//第一个着点Y坐标;
		page:"stype_3"	//图片目录
	}		
}
//获取ID
mod.get = function (id){
	return document.getElementById(id)
}
//html文档加载完毕后，立即执行此方法onload
window.onload = function(){  
	

	mod.bg=new mod.class.Bg();
	mod.dot = new mod.class.Dot();
	mod.pane=new mod.class.Pane();
	mod.pane.isShow=false;
	
	mod.childList=[mod.bg,mod.dot,mod.pane];	
	mod.mans	 ={};		//棋子集合
	//打印
	this.console.log(mod.mans);
	//开始对弈
	//点击事件集合
	mod.get("playBtn").addEventListener("click", function(e) {
		play.isPlay=true ;	
		var depth = parseInt(getRadioValue("depth"), 10) || 3;

		play.init( depth );
		mod.get("chessBox").style.display = "block";
		mod.get("menuBox").style.display = "none";
	})
	
	//开始挑战
	mod.get("clasliBtn").addEventListener("click", function(e) {
		play.isPlay=true ;	
		var clasli = parseInt(getRadioValue("clasli"), 10) || 0;
		play.init( 4, mod.clasli[clasli].map );
		mod.get("chessBox").style.display = "block";
		mod.get("menuBox").style.display = "none";
	})
	
	
	
	
	// 悔棋
	mod.get("regretBtn").addEventListener("click", function(e) {
		play.regret();
	})
	
	//返回首页
	mod.get("gohomeBtn").addEventListener("click", function(e) {
		mod.get("chessBox").style.display = "none";
		mod.get("menuBox").style.display = "block";
		mod.get("indexBox").style.display = "block";
		mod.get("menuQj").style.display = "none";
		mod.get("menuDy").style.display = "none";
	})
	
	//返回
	mod.get("menuFh").addEventListener("click", function(e) {
		mod.get("indexBox").style.display = "block";
		mod.get("menuQj").style.display = "none";
		mod.get("menuDy").style.display = "none";
	})
	
	//返回关闭
	mod.get("menuGb").addEventListener("click", function(e) {
		mod.get("indexBox").style.display = "block";
		mod.get("menuQj").style.display = "none";
		mod.get("menuDy").style.display = "none";
	})
	
	//重新开始棋局
	mod.get("restartBtn").addEventListener("click", function(e) {
		if (confirm("是否确定要重新开始？")){
			play.isPlay=true ;	
			play.init( play.depth,play.nowMap );
		}
	})
	
	
	
	
	//人机对弈
	mod.get("indexDy").addEventListener("click", function(e) {
		mod.get("indexBox").style.display = "none";
		mod.get("menuQj").style.display = "none";
		mod.get("menuDy").style.display = "block";
	})
	
	//挑战棋局
	mod.get("indexQj").addEventListener("click", function(e) {
		mod.get("indexBox").style.display = "none";
		mod.get("menuQj").style.display = "block";
		mod.get("menuDy").style.display = "none";
	})

	//换肤
	mod.get("stypeBtn").addEventListener("click", function(e) {
		var stype =mod.nowStype;
		if (stype=="stype3") stype="stype2";
		else if (stype=="stype2") stype="stype1";
		else if (stype=="stype1") stype="stype3";
		mod.init(stype);
		mod.show();
		//play.depth = 4;
		//play.init();
		document.cookie="stype=" +stype;
		clearInterval(timer);
		var i=0;
		var timer = setInterval(function (){
			mod.show();
			if (i++>=5) clearInterval(timer);
		},2000);
	})
	
	//获取单选框选择的值
	function getRadioValue (name){
		var obj = document.getElementsByName(name);
		//var obj = document.getElementsByTagName("input");
		for(var i=0; i<obj.length; i ++){
			if(obj[i].checked){
				return obj[i].value;
			}
		}
	}
	
	mod.getData("js/gambit.all.js",
		function(data){
		mod.gambit=data.split(" ");
		AI.historyBill = mod.gambit;
	})
}

//载入图片
mod.loadImages = function(stype){
	
	//绘制棋盘
	mod.bgImg = new Image();
	mod.bgImg.src  = "img/"+stype+"/bg.png";
	
	//提示点
	mod.dotImg = new Image();
	mod.dotImg.src  = "img/"+stype+"/dot.png";
	
	//棋子
	for (var i in mod.args){
		mod[i] = {};
		mod[i].img = new Image();
		mod[i].img.src = "img/"+stype+"/"+ mod.args[i].img +".png";
		//mod[i].img.src = "img/"+stype+"/r_m.png";
	}
	
	//棋子外框
	mod.paneImg = new Image();
	mod.paneImg.src  = "img/"+stype+"/r_box.png";
	
	document.getElementsByTagName("body")[0].style.background= "url(img/"+stype+"/bg.jpg)";
	
}

//显示列表
mod.show = function (){
	mod.ct.clearRect(0, 0, mod.width, mod.height);  
	for (var i=0; i<mod.childList.length ; i++){
		mod.childList[i].show();
	}
}

//显示移动的棋子外框
mod.showPane  = function (x,y,newX,newY){
	mod.pane.isShow=true;
	mod.pane.x= x ;
	mod.pane.y= y ;
	mod.pane.newX= newX ;
	mod.pane.newY= newY ;
}

//生成map里面有的棋子
mod.createMans = function(map){
	for (var i=0; i<map.length; i++){
		for (var n=0; n<map[i].length; n++){
			var key = map[i][n];
			if (key){
				mod.mans[key]=new mod.class.Man(key);
				mod.mans[key].x=n;
				mod.mans[key].y=i;
				mod.childList.push(mod.mans[key])
			}
		}
	}
}


//debug alert
mod.alert = function (obj,f,n){
	if (typeof obj !== "object") {
		try{console.log(obj)} catch (e){}
		//return alert(obj);
	}
	var arr = [];
	for (var i in obj) arr.push(i+" = "+obj[i]);
	try{console.log(arr.join(n||"\n"))} catch (e){}
	//return alert(arr.join(n||"\n\r"));
}

//mod.alert的简写，考虑z变量名最不常用
var z = mod.alert;
var l = console.log;

//获取元素距离页面左侧的距离
mod.getDomXY = function (dom){
	var left = dom.offsetLeft;
	var top = dom.offsetTop;
	var current = dom.offsetParent;
	while (current !== null){
		left += current.offsetLeft;
		top += current.offsetTop;
		current = current.offsetParent;
	}
	return {x:left,y:top};
}

//获得cookie
mod.getCookie = function(name){
	if (document.cookie.length>0){
		start=document.cookie.indexOf(name + "=")
		if (start!=-1){ 
			start=start + name.length+1 
			end=document.cookie.indexOf(";",start)
		if (end==-1) end=document.cookie.length
			return unescape(document.cookie.substring(start,end))
		} 
	}
	return false;
}
//二维数组克隆
mod.arr2Clone = function (arr){
	var newArr=[];
	for (var i=0; i<arr.length ; i++){	
		newArr[i] = arr[i].slice();
	}
	return newArr;
}

//ajax载入数据
mod.getData = function (url,fun){
	var XMLHttpRequestObject=false;
	if(window.XMLHttpRequest){
		XMLHttpRequestObject=new XMLHttpRequest();
	}else if(window.ActiveXObject){
	XMLHttpRequestObject=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(XMLHttpRequestObject){
		XMLHttpRequestObject.open("GET",url);
		XMLHttpRequestObject.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		XMLHttpRequestObject.onreadystatechange=function (){
			if(XMLHttpRequestObject.readyState==4 && XMLHttpRequestObject.status==200){
				fun (XMLHttpRequestObject.responseText)
				//return XMLHttpRequestObject.responseText;
			}
		}
	XMLHttpRequestObject.send(null);
	}
}

//把坐标生成着法
mod.createMove = function (map,x,y,newX,newY){
	var h="";
	var man = mod.mans[map[y][x]];
	h+= man.text;
	map[newY][newX] = map[y][x];
	delete map[y][x];
	if (man.my===1){
		var mumTo=["一","二","三","四","五","六","七","八","九","十"];	
		newX=8-newX;
		h+= mumTo[8-x];
		if (newY > y) {
			h+= "退";
			if (man.pater == "m" || man.pater == "s" || man.pater == "x"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[newY - y -1];
			}
		}else if (newY < y) {
			h+= "进";
			if (man.pater == "m" || man.pater == "s" || man.pater == "x"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[y - newY -1];
			}
		}else {
			h+= "平";
			h+= mumTo[newX];
		}
	}else{
		var mumTo=["１","２","３","４","５","６","７","８","９","10"];
		h+= mumTo[x];
		if (newY > y) {
			h+= "进";
			if (man.pater == "M" || man.pater == "S" || man.pater == "X"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[newY - y-1];
			}
		}else if (newY < y) {
			h+= "退";
			if (man.pater == "M" || man.pater == "S" || man.pater == "X"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[y - newY-1];
			}
		}else {
			h+= "平";
			h+= mumTo[newX];
		}
	}
	return h;
}
//play.js中会调用，initMap的数据
mod.initMap = [
	['C0','M0','X0','S0','J0','S1','X1','M1','C1'],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,'P0',    ,    ,    ,    ,    ,'P1',    ],
	['Z0',    ,'Z1',    ,'Z2',    ,'Z3',    ,'Z4'],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	['z0',    ,'z1',    ,'z2',    ,'z3',    ,'z4'],
	[    ,'p0',    ,    ,    ,    ,    ,'p1',    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	['c0','m0','x0','s0','j0','s1','x1','m1','c1']
];


//棋子能走的着点
mod.bylaw ={}
//车
mod.bylaw.c = function (x,y,map,my){
	var d=[];
	//左侧检索
	for (var i=x-1; i>= 0; i--){
		if (map[y][i]) {
			if (mod.mans[map[y][i]].my!=my) d.push([i,y]);
			break
		}else{
			d.push([i,y])	
		}
	}
	//右侧检索
	for (var i=x+1; i <= 8; i++){
		if (map[y][i]) {
			if (mod.mans[map[y][i]].my!=my) d.push([i,y]);
			break
		}else{
			d.push([i,y])	
		}
	}
	//上检索
	for (var i = y-1 ; i >= 0; i--){
		if (map[i][x]) {
			if (mod.mans[map[i][x]].my!=my) d.push([x,i]);
			break
		}else{
			d.push([x,i])	
		}
	}
	//下检索
	for (var i = y+1 ; i<= 9; i++){
		if (map[i][x]) {
			if (mod.mans[map[i][x]].my!=my) d.push([x,i]);
			break
		}else{
			d.push([x,i])	
		}
	}
	return d;
}

//马
mod.bylaw.m = function (x,y,map,my){
	var d=[];
		//1点
		if ( y-2>= 0 && x+1<= 8 && !play.map[y-1][x] &&(!mod.mans[map[y-2][x+1]] || mod.mans[map[y-2][x+1]].my!=my)) d.push([x+1,y-2]);
		//2点
		if ( y-1>= 0 && x+2<= 8 && !play.map[y][x+1] &&(!mod.mans[map[y-1][x+2]] || mod.mans[map[y-1][x+2]].my!=my)) d.push([x+2,y-1]);
		//4点
		if ( y+1<= 9 && x+2<= 8 && !play.map[y][x+1] &&(!mod.mans[map[y+1][x+2]] || mod.mans[map[y+1][x+2]].my!=my)) d.push([x+2,y+1]);
		//5点
		if ( y+2<= 9 && x+1<= 8 && !play.map[y+1][x] &&(!mod.mans[map[y+2][x+1]] || mod.mans[map[y+2][x+1]].my!=my)) d.push([x+1,y+2]);
		//7点
		if ( y+2<= 9 && x-1>= 0 && !play.map[y+1][x] &&(!mod.mans[map[y+2][x-1]] || mod.mans[map[y+2][x-1]].my!=my)) d.push([x-1,y+2]);
		//8点
		if ( y+1<= 9 && x-2>= 0 && !play.map[y][x-1] &&(!mod.mans[map[y+1][x-2]] || mod.mans[map[y+1][x-2]].my!=my)) d.push([x-2,y+1]);
		//10点
		if ( y-1>= 0 && x-2>= 0 && !play.map[y][x-1] &&(!mod.mans[map[y-1][x-2]] || mod.mans[map[y-1][x-2]].my!=my)) d.push([x-2,y-1]);
		//11点
		if ( y-2>= 0 && x-1>= 0 && !play.map[y-1][x] &&(!mod.mans[map[y-2][x-1]] || mod.mans[map[y-2][x-1]].my!=my)) d.push([x-1,y-2]);

	return d;
}

//相
mod.bylaw.x = function (x,y,map,my){
	var d=[];
	if (my===1){ //红方
		//4点半
		if ( y+2<= 9 && x+2<= 8 && !play.map[y+1][x+1] && (!mod.mans[map[y+2][x+2]] || mod.mans[map[y+2][x+2]].my!=my)) d.push([x+2,y+2]);
		//7点半
		if ( y+2<= 9 && x-2>= 0 && !play.map[y+1][x-1] && (!mod.mans[map[y+2][x-2]] || mod.mans[map[y+2][x-2]].my!=my)) d.push([x-2,y+2]);
		//1点半
		if ( y-2>= 5 && x+2<= 8 && !play.map[y-1][x+1] && (!mod.mans[map[y-2][x+2]] || mod.mans[map[y-2][x+2]].my!=my)) d.push([x+2,y-2]);
		//10点半
		if ( y-2>= 5 && x-2>= 0 && !play.map[y-1][x-1] && (!mod.mans[map[y-2][x-2]] || mod.mans[map[y-2][x-2]].my!=my)) d.push([x-2,y-2]);
	}else{
		//4点半
		if ( y+2<= 4 && x+2<= 8 && !play.map[y+1][x+1] && (!mod.mans[map[y+2][x+2]] || mod.mans[map[y+2][x+2]].my!=my)) d.push([x+2,y+2]);
		//7点半
		if ( y+2<= 4 && x-2>= 0 && !play.map[y+1][x-1] && (!mod.mans[map[y+2][x-2]] || mod.mans[map[y+2][x-2]].my!=my)) d.push([x-2,y+2]);
		//1点半
		if ( y-2>= 0 && x+2<= 8 && !play.map[y-1][x+1] && (!mod.mans[map[y-2][x+2]] || mod.mans[map[y-2][x+2]].my!=my)) d.push([x+2,y-2]);
		//10点半
		if ( y-2>= 0 && x-2>= 0 && !play.map[y-1][x-1] && (!mod.mans[map[y-2][x-2]] || mod.mans[map[y-2][x-2]].my!=my)) d.push([x-2,y-2]);
	}
	return d;
}

//士
mod.bylaw.s = function (x,y,map,my){
	var d=[];
	if (my===1){ //红方
		//4点半
		if ( y+1<= 9 && x+1<= 5 && (!mod.mans[map[y+1][x+1]] || mod.mans[map[y+1][x+1]].my!=my)) d.push([x+1,y+1]);
		//7点半
		if ( y+1<= 9 && x-1>= 3 && (!mod.mans[map[y+1][x-1]] || mod.mans[map[y+1][x-1]].my!=my)) d.push([x-1,y+1]);
		//1点半
		if ( y-1>= 7 && x+1<= 5 && (!mod.mans[map[y-1][x+1]] || mod.mans[map[y-1][x+1]].my!=my)) d.push([x+1,y-1]);
		//10点半
		if ( y-1>= 7 && x-1>= 3 && (!mod.mans[map[y-1][x-1]] || mod.mans[map[y-1][x-1]].my!=my)) d.push([x-1,y-1]);
	}else{
		//4点半
		if ( y+1<= 2 && x+1<= 5 && (!mod.mans[map[y+1][x+1]] || mod.mans[map[y+1][x+1]].my!=my)) d.push([x+1,y+1]);
		//7点半
		if ( y+1<= 2 && x-1>= 3 && (!mod.mans[map[y+1][x-1]] || mod.mans[map[y+1][x-1]].my!=my)) d.push([x-1,y+1]);
		//1点半
		if ( y-1>= 0 && x+1<= 5 && (!mod.mans[map[y-1][x+1]] || mod.mans[map[y-1][x+1]].my!=my)) d.push([x+1,y-1]);
		//10点半
		if ( y-1>= 0 && x-1>= 3 && (!mod.mans[map[y-1][x-1]] || mod.mans[map[y-1][x-1]].my!=my)) d.push([x-1,y-1]);
	}
	return d;
		
}

//将
mod.bylaw.j = function (x,y,map,my){
	var d=[];
	var isNull=(function (y1,y2){
		var y1=mod.mans["j0"].y;
		var x1=mod.mans["J0"].x;
		var y2=mod.mans["J0"].y;
		for (var i=y1-1; i>y2; i--){
			if (map[i][x1]) return false;
		}
		return true;
	})();
	
	if (my===1){ //红方
		//下
		if ( y+1<= 9  && (!mod.mans[map[y+1][x]] || mod.mans[map[y+1][x]].my!=my)) d.push([x,y+1]);
		//上
		if ( y-1>= 7 && (!mod.mans[map[y-1][x]] || mod.mans[map[y-1][x]].my!=my)) d.push([x,y-1]);
		//老将对老将的情况
		if ( mod.mans["j0"].x == mod.mans["J0"].x &&isNull) d.push([mod.mans["J0"].x,mod.mans["J0"].y]);
		
	}else{
		//下
		if ( y+1<= 2  && (!mod.mans[map[y+1][x]] || mod.mans[map[y+1][x]].my!=my)) d.push([x,y+1]);
		//上
		if ( y-1>= 0 && (!mod.mans[map[y-1][x]] || mod.mans[map[y-1][x]].my!=my)) d.push([x,y-1]);
		//老将对老将的情况
		if ( mod.mans["j0"].x == mod.mans["J0"].x &&isNull) d.push([mod.mans["j0"].x,mod.mans["j0"].y]);
	}
	//右
	if ( x+1<= 5  && (!mod.mans[map[y][x+1]] || mod.mans[map[y][x+1]].my!=my)) d.push([x+1,y]);
	//左
	if ( x-1>= 3 && (!mod.mans[map[y][x-1]] || mod.mans[map[y][x-1]].my!=my))d.push([x-1,y]);
	return d;
}

//炮
mod.bylaw.p = function (x,y,map,my){
	var d=[];
	//左侧检索
	var n=0;
	for (var i=x-1; i>= 0; i--){
		if (map[y][i]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (mod.mans[map[y][i]].my!=my) d.push([i,y]);
				break	
			}
		}else{
			if(n==0) d.push([i,y])	
		}
	}
	//右侧检索
	var n=0;
	for (var i=x+1; i <= 8; i++){
		if (map[y][i]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (mod.mans[map[y][i]].my!=my) d.push([i,y]);
				break	
			}
		}else{
			if(n==0) d.push([i,y])	
		}
	}
	//上检索
	var n=0;
	for (var i = y-1 ; i >= 0; i--){
		if (map[i][x]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (mod.mans[map[i][x]].my!=my) d.push([x,i]);
				break	
			}
		}else{
			if(n==0) d.push([x,i])	
		}
	}
	//下检索
	var n=0;
	for (var i = y+1 ; i<= 9; i++){
		if (map[i][x]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (mod.mans[map[i][x]].my!=my) d.push([x,i]);
				break	
			}
		}else{
			if(n==0) d.push([x,i])	
		}
	}
	return d;
}

//卒
mod.bylaw.z = function (x,y,map,my){
	var d=[];
	if (my===1){ //红方
		//上
		if ( y-1>= 0 && (!mod.mans[map[y-1][x]] || mod.mans[map[y-1][x]].my!=my)) d.push([x,y-1]);
		//右
		if ( x+1<= 8 && y<=4  && (!mod.mans[map[y][x+1]] || mod.mans[map[y][x+1]].my!=my)) d.push([x+1,y]);
		//左
		if ( x-1>= 0 && y<=4 && (!mod.mans[map[y][x-1]] || mod.mans[map[y][x-1]].my!=my))d.push([x-1,y]);
	}else{
		//下
		if ( y+1<= 9  && (!mod.mans[map[y+1][x]] || mod.mans[map[y+1][x]].my!=my)) d.push([x,y+1]);
		//右
		if ( x+1<= 8 && y>=6  && (!mod.mans[map[y][x+1]] || mod.mans[map[y][x+1]].my!=my)) d.push([x+1,y]);
		//左
		if ( x-1>= 0 && y>=6 && (!mod.mans[map[y][x-1]] || mod.mans[map[y][x-1]].my!=my))d.push([x-1,y]);
	}
	
	return d;
}

mod.value = {
	
	//车价值
	c:[
		[206, 208, 207, 213, 214, 213, 207, 208, 206],
		[206, 212, 209, 216, 233, 216, 209, 212, 206],
		[206, 208, 207, 214, 216, 214, 207, 208, 206],
		[206, 213, 213, 216, 216, 216, 213, 213, 206],
		[208, 211, 211, 214, 215, 214, 211, 211, 208],
		
		[208, 212, 212, 214, 215, 214, 212, 212, 208],
		[204, 209, 204, 212, 214, 212, 204, 209, 204],
		[198, 208, 204, 212, 212, 212, 204, 208, 198],
		[200, 208, 206, 212, 200, 212, 206, 208, 200],
		[194, 206, 204, 212, 200, 212, 204, 206, 194]
	],
	
	//马价值
	m:[
		[90, 90, 90, 96, 90, 96, 90, 90, 90],
		[90, 96,103, 97, 94, 97,103, 96, 90],
		[92, 98, 99,103, 99,103, 99, 98, 92],
		[93,108,100,107,100,107,100,108, 93],
		[90,100, 99,103,104,103, 99,100, 90],
		
		[90, 98,101,102,103,102,101, 98, 90],
		[92, 94, 98, 95, 98, 95, 98, 94, 92],
		[93, 92, 94, 95, 92, 95, 94, 92, 93],
		[85, 90, 92, 93, 78, 93, 92, 90, 85],
		[88, 85, 90, 88, 90, 88, 90, 85, 88]
	],
	
	//相价值
	x:[
		[0, 0,20, 0, 0, 0,20, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0,23, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0,20, 0, 0, 0,20, 0, 0],
		
		[0, 0,20, 0, 0, 0,20, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[18,0, 0, 0,23, 0, 0, 0,18],
		[0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0,20, 0, 0, 0,20, 0, 0]
	],
	
	//士价值
	s:[
		[0, 0, 0,20, 0,20, 0, 0, 0],
		[0, 0, 0, 0,23, 0, 0, 0, 0],
		[0, 0, 0,20, 0,20, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0,20, 0,20, 0, 0, 0],
		[0, 0, 0, 0,23, 0, 0, 0, 0], 
		[0, 0, 0,20, 0,20, 0, 0, 0]
	],
	
	//奖价值
	j:[
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0], 
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0], 
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0]
	],
	
	//炮价值
	p:[
		
		[100, 100,  96, 91,  90, 91,  96, 100, 100],
		[ 98,  98,  96, 92,  89, 92,  96,  98,  98],
		[ 97,  97,  96, 91,  92, 91,  96,  97,  97],
		[ 96,  99,  99, 98, 100, 98,  99,  99,  96],
		[ 96,  96,  96, 96, 100, 96,  96,  96,  96], 
		
		[ 95,  96,  99, 96, 100, 96,  99,  96,  95],
		[ 96,  96,  96, 96,  96, 96,  96,  96,  96],
		[ 97,  96, 100, 99, 101, 99, 100,  96,  97],
		[ 96,  97,  98, 98,  98, 98,  98,  97,  96],
		[ 96,  96,  97, 99,  99, 99,  97,  96,  96]
	],
	
	//兵价值
	z:[
		[ 9,  9,  9, 11, 13, 11,  9,  9,  9],
		[19, 24, 34, 42, 44, 42, 34, 24, 19],
		[19, 24, 32, 37, 37, 37, 32, 24, 19],
		[19, 23, 27, 29, 30, 29, 27, 23, 19],
		[14, 18, 20, 27, 29, 27, 20, 18, 14],
		
		[ 7,  0, 13,  0, 16,  0, 13,  0,  7],
		[ 7,  0,  7,  0, 15,  0,  7,  0,  7], 
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0]
	]
}

//黑子为红字价值位置的倒置
mod.value.C = mod.arr2Clone(mod.value.c).reverse();
mod.value.M = mod.arr2Clone(mod.value.m).reverse();
mod.value.X = mod.value.x;
mod.value.S = mod.value.s;
mod.value.J = mod.value.j;
mod.value.P = mod.arr2Clone(mod.value.p).reverse();
mod.value.Z = mod.arr2Clone(mod.value.z).reverse();

//棋子们
mod.args={
	//红子 中文/图片地址/阵营/权重
	'c':{text:"车", img:'r_c', my:1 ,bl:"c", value:mod.value.c},
	'm':{text:"马", img:'r_m', my:1 ,bl:"m", value:mod.value.m},
	'x':{text:"相", img:'r_x', my:1 ,bl:"x", value:mod.value.x},
	's':{text:"仕", img:'r_s', my:1 ,bl:"s", value:mod.value.s},
	'j':{text:"将", img:'r_j', my:1 ,bl:"j", value:mod.value.j},
	'p':{text:"炮", img:'r_p', my:1 ,bl:"p", value:mod.value.p},
	'z':{text:"兵", img:'r_z', my:1 ,bl:"z", value:mod.value.z},
	
	//蓝子
	'C':{text:"�", img:'b_c', my:-1 ,bl:"c", value:mod.value.C},
	'M':{text:"�R", img:'b_m', my:-1 ,bl:"m", value:mod.value.M},
	'X':{text:"象", img:'b_x', my:-1 ,bl:"x", value:mod.value.X},
	'S':{text:"士", img:'b_s', my:-1 ,bl:"s", value:mod.value.S},
	'J':{text:"帅", img:'b_j', my:-1 ,bl:"j", value:mod.value.J},
	'P':{text:"炮", img:'b_p', my:-1 ,bl:"p", value:mod.value.P},
	'Z':{text:"卒", img:'b_z', my:-1 ,bl:"z", value:mod.value.Z}
};

mod.class = mod.class || {} //类
mod.class.Man = function (key, x, y){
	this.pater = key.slice(0,1);
	var o=mod.args[this.pater]
	this.x = x||0;   
    this.y = y||0;
	this.key = key ;
	this.my = o.my;
	this.text = o.text;
	this.value = o.value;
	this.isShow = true;
	this.alpha = 1;
	this.ps = []; //着点
	
	this.show = function (){
		if (this.isShow) {
			mod.ct.save();
			mod.ct.globalAlpha = this.alpha;
			mod.ct.drawImage(mod[this.pater].img,mod.spaceX * this.x + mod.pointStartX , mod.spaceY *  this.y +mod.pointStartY);
			mod.ct.restore(); 
		}
	}
	
	this.bl = function (map){
		var map = map || play.map
		return mod.bylaw[o.bl](this.x,this.y,map,this.my)
	}
}

mod.class.Bg = function (img, x, y){
	this.x = x||0; 
    this.y = y||0;
	this.isShow = true;
	
	this.show = function (){
		if (this.isShow) mod.ct.drawImage(mod.bgImg, mod.spaceX * this.x,mod.spaceY *  this.y);
	}
}
mod.class.Pane = function (img, x, y){
	this.x = x||0; 
    this.y = y||0;
	this.newX = x||0; 
    this.newY = y||0;
	this.isShow = true;
	
	this.show = function (){
		if (this.isShow) {
			mod.ct.drawImage(mod.paneImg, mod.spaceX * this.x + mod.pointStartX , mod.spaceY *  this.y + mod.pointStartY)
			mod.ct.drawImage(mod.paneImg, mod.spaceX * this.newX + mod.pointStartX  , mod.spaceY *  this.newY + mod.pointStartY)
		}
	}
}

mod.class.Dot = function (img, x, y){
	this.x = x||0; 
    this.y = y||0;
	this.isShow = true;
	this.dots=[]
	
	this.show = function (){
		for (var i=0; i<this.dots.length;i++){
			if (this.isShow) mod.ct.drawImage(mod.dotImg, mod.spaceX * this.dots[i][0]+10  + mod.pointStartX ,mod.spaceY *  this.dots[i][1]+10 + mod.pointStartY)
		}
	}
}

//启动项目
mod.init();

