window.onload = function(){
	var oWrap = document.getElementById('wrap');
	var prev = getEleByClass(oWrap, 'prev')[0];
	var next = getEleByClass(oWrap, 'next')[0];
	var mark_left = getEleByClass(oWrap, 'mark_left')[0];
	var mark_right = getEleByClass(oWrap, 'mark_right')[0];

	//左右按钮
	prev.onmouseover = mark_left.onmouseover = function(){
		startMove(prev, 'opacity', 100);
	};
	prev.onmouseout = mark_left.onmouseout = function(){
		startMove(prev, 'opacity', 0);
	};

	next.onmouseover = mark_right.onmouseover = function(){
		startMove(next, 'opacity', 100);
	};
	next.onmouseout = mark_right.onmouseout = function(){
		startMove(next, 'opacity', 0);
	};

	//点击小图大图从上往下缓冲运动
	var aSmallImg = getEleByClass(oWrap, 'small_pic')[0].getElementsByTagName('li');
	var aBigImg = getEleByClass(oWrap, 'big_pic')[0].getElementsByTagName('li');
	var nowZIndex = 2;
	var now = 0;//用于记录当前小图
	var flag = false;
	var smallPicUl = getEleByClass(oWrap,'small_pic_content')[0];
	smallPicUl.style.width = aSmallImg[0].offsetWidth * aSmallImg.length + 'px';
	var aPhotoName = ['都市魅力','古香古色','沉浸舞步的舞者','名贵跑车','聆听天籁的精灵','绚彩光芒'];
	var text = getEleByClass(oWrap, 'text')[0];
	var leng = getEleByClass(oWrap, 'length')[0];

	for(var i = 0, len = aSmallImg.length; i < len; i++){
		aSmallImg[i].index = i;
		aSmallImg[i].onclick = function(){//为每张小图添加鼠标点击事件
			if(now === this.index)return;
			now = this.index;
			flag = true;
			tab();
		};
		//每张小图添加鼠标移入移出事件
		aSmallImg[i].onmouseover = function(){
			startMove(this, {'opacity':100});
		};
		aSmallImg[i].onmouseout = function(){
			if(this.index != now){
				startMove(this, {'opacity':40});
			}
		};
	}
	tab();
	function tab(){
		if(!flag){
			startMove(aSmallImg[now], {'opacity':100});
		}else{
			aBigImg[now].style.zIndex = nowZIndex++;
			aBigImg[now].style.height = 0;
			startMove(aBigImg[now], {'height':320});
			for(var i = 0, len = aSmallImg.length; i < len; i++){
				startMove(aSmallImg[i], {'opacity':40});
			}
			startMove(aSmallImg[now], {'opacity':100});

			//小图大图轮播效果
			if(now === 0){
				startMove(smallPicUl, {'left':0});
			}else if(now === aSmallImg.length - 1){
				startMove(smallPicUl, {'left':-(now - 2) * aSmallImg[0].offsetWidth});
			}else{
				startMove(smallPicUl, {'left':-(now - 1) * aSmallImg[0].offsetWidth});
			}

			//大图下方文字说明
			text.innerHTML = aPhotoName[now];
			leng.innerHTML = (now + 1) + '/' + aSmallImg.length;
		}
	}

	//上一张下一张图片切换
	next.onclick = function(){
		now++;
		if(now === aSmallImg.length){
			now = 0;
		}
		flag = true;
		tab();
	};
	prev.onclick = function(){
		now--;
		if(now === -1){
			now = aSmallImg.length - 1;
		}
		flag = true;
		tab();
	};

	//自动轮播效果
	var timer = setInterval(next.onclick, 2000);
	oWrap.onmouseover = function(){
		clearInterval(timer);
	};
	oWrap.onmouseout = function(){
		timer = setInterval(next.onclick, 2000);
	};

	function getEleByClass(obj, sClass, iTag){
		var parent = obj || document;
		var tag = iTag || '*';
		if(parent.getElementsByClass){
			return parent.getElementsByClass(sClass);
		}else{
			var aResult = [];
			var aElems = parent.getElementsByTagName(tag);
			for(var i = 0, len = aElems.length; i < len; i++){
				if(aElems[i].className === sClass){
					aResult.push(aElems[i]);
				}
			}
			return aResult;
		}
	}
};

