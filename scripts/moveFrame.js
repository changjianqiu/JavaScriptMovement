function startMove(obj, json, fnEnd){

	clearInterval(obj.timer);//若物体之前开有定时器则先关闭

	obj.timer = setInterval(function(){
		var bStop = true; //假设所有的属性值运动到了目标值
		for(var attr in json){//遍历物体传过来的json值
			var start = 0;
			if(attr === 'opacity'){//透明度
				start = Math.round(parseFloat(getStyle(obj, attr))*100);
			}else{//非透明度属性
				start = parseInt(getStyle(obj, attr));
			}
			if(start != json[attr]){//若有属性值未运动到目标值，将bStop的值赋为false
				bStop = false;
			}
			var speed = (json[attr] - start)/6;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);//速度为正值向上取整，速度为负值向下取整
			if(attr === 'opacity'){
				obj.style.filter = 'alpha(opacity:'+ (start + speed) +')';//IE浏览器
				obj.style.opacity = (start + speed)/100;//非IE浏览器
			}else{
				obj.style[attr] = start + speed + 'px';
			}
		}
		if(bStop){//所有的属性值都运动到了目标值,则关闭定时器并执行回调函数
			clearInterval(obj.timer);
			if(fnEnd)fnEnd();
		}
	}, 30);
}

function getStyle(obj, attr){//获取当前属性的值
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj, false)[attr];
	}
}


