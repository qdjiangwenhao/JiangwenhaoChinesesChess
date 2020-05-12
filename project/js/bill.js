var bill = bill || {};

//初始化
bill.init = function (){
	if (mod.store){
		clearInterval(bill.timer);
		bill.setBillList(mod.arr2Clone(mod.initMap)); //写入棋谱列表
		play.isPlay=false;	
		mod.show();
	}else {
		bill.timer = setInterval("bill.init()",300);	
	}
}


//把所有棋谱写入棋谱列表
bill.setBillList = function (map){
	var list=mod.get("billList")
	for (var i=0; i < mod.store.length ; i++){
		var option = document.createElement('option');
		 option.text='棋谱'+(i+1);
		 option.value=i;
		list.add(option , null);
	}
	
	list.addEventListener("change", function(e) {
		bill.setBox (mod.store[this.value], map)
	})
	bill.setBox (mod.store[0], map)
}


//棋谱分析 写入
bill.setMove = function (bl,inx,map){
	var map = mod.arr2Clone(map);
	for (var i=0; i<map.length; i++){
		for (var n=0; n<map[i].length; n++){
			var key = map[i][n];
			if (key){
				mod.mans[key].x=n;
				mod.mans[key].y=i;
				mod.mans[key].isShow = true;
			}
		}
	}

	for (var i=0; i<= inx ; i++){
		var n = i*4
		var y = bl[n+1]
		var newX = bl[n+2]
		var x = bl[n+0]
		var newY = bl[n+3]
		if (mod.mans[map[newY][newX]]) {
			mod.mans[map[newY][newX]].isShow = false;
		}
		
		mod.mans[map[y][x]].x = newX;
		mod.mans[map[y][x]].y = newY;
		
		if (i == inx) {
			mod.showPane(x ,y,newX,newY);
		}
		map[newY][newX] = map[y][x];
		delete map[y][x];
		
	}
	return map;
}

//写入棋谱
bill.setBox = function (bl,initMap){
	var map = mod.arr2Clone(initMap);
	var bl= bl.split("");
	var h='';
	for (var i=0; i< bl.length ; i+=4){
		h +='<li id="move_'+(i/4)+'">';
		var x = bl[i+0];
		var y = bl[i+1];
		var newX = bl[i+2];
		var newY = bl[i+3];
		h += mod.createMove(map,x,y,newX,newY);
		h +='</li>\n\r';
	}
	mod.get("billBox").innerHTML = h;
	
	var doms=mod.get("billBox").getElementsByTagName("li");
	
	for (var i=0; i<doms.length; i++){
			doms[i].addEventListener("click", function(e) {
				
			var inx = this.getAttribute("id").split("_")[1];
			bill.setMove (bl , inx , initMap)
			mod.show();
		})
	}

}