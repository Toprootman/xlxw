/*浏览器兼容代码*/

/*获取任意元素样式值*/
function getElementStyleValue(element, attr) {
	if(window.getComputedStyle) {
		return window.getComputedStyle(element, null)[attr];
	} else {
		return element.currentStyle[attr];
	}
}

/*设置透明度值*/
function setOpacityValue(element, value) {
	//判断透明度值是否超过范围
	value = value < 0 ? 0 : value;
	value = value > 1 ? 1 : value;
	//判断浏览器是否支持opacity
	if(document.all) {
		//设置IE浏览器透明度值
		element.style.filter = "alpha(opacity=" + (value * 100) + ")";
	} else {
		//设置非IE浏览器透明度
		element.style.opacity = value;
	}
}

/*获取页面向上或者向左卷曲出去的距离的值*/
function getScroll() {
	return {
		left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
		top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
	};
}

/*获取任意标签的内容*/
function getInnerText(element) {
	if(typeof element.textContent == "undefined") {
		return element.innerText;
	} else {
		return element.textContent;
	}
}

/*设置任意标签的内容*/
function setInnerText(element, text) {
	if(typeof element.textContent == "undefined") {
		return element.innerText = text;
	} else {
		return element.textContent = text;
	}
}

/*为任意元素绑定事件*/
function addEventListener(element, type, fn) {
	if(element.addEventListener) {
		element.addEventListener(type, fn, false);
	} else if(element.attachEvent) {
		element.attachEvent("on" + type, fn);
	} else {
		element["on" + type] = fn;
	}
}

/*为任意元素解绑事件*/
function removeEventListener(element, type, fnName) {
	if(element.removeEventListener) {
		element.removeEventListener(type, fnName, false);
	} else if(element.detachEvent) {
		element.detachEvent("on" + type, fnName);
	} else {
		element["on" + type] = null;
	}
}

/*获取任意一个父级元素的第一个子元素*/
function getfirstElementChild(element) {
	if(element.firstElementChild) {
		return element.firstElementChild;
	} else {
		var node = element.firstChild;
		while(node && node.nodeType != 1) {
			node = node.nextSibling;
		}
		return node;
	}
}

/*获取任意一个父级元素的最后一个子元素*/
function getLastElementChild(element) {
	if(element.lastElementChild) {
		return element.lastElementChild;
	} else {
		var node = element.lastChild;
		while(node && node.nodeType != 1) {
			node = node.previousSibling;
		}
		return node;
	}
}

/*获取任意一个子元素的前一个兄弟元素*/
function getPreviousElementSibling(element) {
	if(element.previousElementSibling) {
		return element.previousElementSibling;
	} else {
		var node = element.previousSibling;
		while(node && node.nodeType != 1) {
			node = node.previousSibling;
		}
		return node;
	}
}

/*获取任意一个子元素的后一个兄弟元素*/
function getNextElementSibling(element) {
	if(element.nextElementSibling) {
		return element.nextElementSibling;
	} else {
		var node = element.nextSibling;
		while(node && node.nodeType != 1) {
			node = node.nextSibling;
		}
		return node;
	}
}

/*变速动画函数*/
function animation(element, json, fn) {
	//清理定时器
	clearInterval(element.timeId);
	//设置定时器
	element.timeId = setInterval(function() {
		//标记位，默认所有动作都已完成
		var flag = true;
		//循环遍历所有属性值
		for(var attr in json) {
			//判断是否是透明度属性
			if(attr == "opacity") {
				//获取当前元素的当前透明度值并且扩大100倍
				var current = getElementStyleValue(element, attr) * 100;
				//设置终点透明度值并且扩大100倍
				var target = json[attr] * 100;
				//设置基本步长值
				var step = (target - current) / 10;
				//确定移动的步数
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				//移动后的步数值
				current += step;
				//缩小100倍并设置移动后元素的透明度值
				element.style[attr] = (current / 100);
				//判断是否是层级属性
			} else if(attr == "zIndex") {
				//直接设置元素的层级
				element.style[attr] = json[attr];
				//普通属性
			} else {
				//获取当前元素的当前属性值
				var current = parseInt(getElementStyleValue(element, attr));
				//设置终点目标值
				var target = json[attr];
				//设置基本步长值
				var step = (target - current) / 10;
				//确定移动的步数
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				//移动后的步数值
				current += step;
				//设置移动后元素属性值
				element.style[attr] = current + "px";
			}
			//判断是否到达目标
			if(current != target) {
				flag = false;
			}
		}
		//如果全部动作都已完成，则清理定时器
		if(flag) {
			clearInterval(element.timeId);
			//当动画完成，判断用户是否传入了回调函数
			if(fn) {
				fn();
			}
		}
	}, 20);
}

/*获取当前元素坐标位置*/
var eventObject = {
	//window.event和事件参数对象e的兼容
	getEvent: function(e) {
		return window.event || e;
	},
	//可视区域的横坐标的兼容代码
	getClientX: function(e) {
		return this.getEvent(e).clientX;
	},
	//可视区域的纵坐标的兼容代码
	getClientY: function(e) {
		return this.getEvent(e).clientY;
	},
	//页面向左卷曲出去的横坐标
	getScrollLeft: function() {
		return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0;
	},
	//页面向上卷曲出去的纵坐标
	getScrollTop: function() {
		return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
	},
	//相对于页面的横坐标（pageX或者是clientX+scrollLeft）
	getPageX: function(e) {
		return this.getEvent(e).pageX ? this.getEvent(e).pageX : this.getClientX(e) + this.getScrollLeft();
	},
	//相对于页面的纵坐标（pageY或者是clientY+scrollTop）
	getPageY: function(e) {
		return this.getEvent(e).pageY ? this.getEvent(e).pageY : this.getClientY(e) + this.getScrollTop();
	}
};

/*地区选择*/
(function() {
	var xlxw_header_areatext = document.getElementById("xlxw_header_areatext");
	var xlxw_header_areatext_list = document.getElementById("xlxw_header_areatext_ul").getElementsByTagName("li");
	//循环注册点击事件
	for(var i = 0; i < xlxw_header_areatext_list.length; i++) {
		xlxw_header_areatext_list[i].onclick = function() {
			setInnerText(xlxw_header_areatext, getInnerText(this));
		};
	}
})();

/*搜索选项*/
(function() {
	var xlxw_search_group_select_ul_text = document.getElementById("xlxw_search_group_select_ul_text");
	var xlxw_search_group_select_ul_list = document.getElementById("xlxw_search_group_select_ul").getElementsByTagName("li");
	//循环注册点击事件
	for(var i = 0; i < xlxw_search_group_select_ul_list.length; i++) {
		xlxw_search_group_select_ul_list[i].onclick = function() {
			var value = getInnerText(this);
			xlxw_search_group_select_ul_text.innerHTML = value + "<i class=\"mdui-icon material-icons\">&#xe5cf;</i>";
			document.getElementById("xlxw_search_group_select_ul").style.display = "none";
		};
	}
	xlxw_search_group_select_ul_text.onmouseover = function() {
		document.getElementById("xlxw_search_group_select_ul").style.display = "block";
	};

	document.getElementById("xlxw-search-group-select").onmouseout = function() {
		document.getElementById('xlxw_search_group_select_ul').style.display = "none";
	};
	xlxw_search_group_select_ul_text.onmouseover = function() {
		document.getElementById('xlxw_search_group_select_ul').style.display = "block";
	};
	document.getElementById('xlxw_search_group_select_ul').onmouseover = function() {
		document.getElementById('xlxw_search_group_select_ul').style.display = "block";
	};
})();

/*外部轮播插件*/
$(function() {

	var $tabLi = $('#banner .tab li');
	var $picLi = $('#banner .pic li');
	var $btn = $('#banner .btn');
	var $btnDiv = $('#banner .btn div');
	var $banner = $('#banner');
	var index = 0;
	var timer;

	$tabLi.hover(function() {
		index = $(this).index();
		fn();
	});

	$banner.hover(function() {
		$btn.show();
		clearInterval(timer);
	}, function() {
		$btn.hide();
		auto();
	});

	$btnDiv.click(function() {
		var i = $(this).index();
		if(i) {
			index++;
			index %= $tabLi.length;
		} else {
			index--;
			if(index < 0) index = $tabLi.length - 1;
		}
		fn();
	}).mousedown(function() {
		return false;
	});

	auto();

	function auto() {
		timer = setInterval(function() {
			index++;
			index %= $tabLi.length;
			fn();
		}, 4000);
	}

	function fn() {
		$tabLi.eq(index).addClass('on').siblings().removeClass('on');
		$picLi.eq(index).stop(true).fadeIn().siblings().stop(true).fadeOut();
	}
});

/*轮播图区域二级导航菜单*/
(function() {
	var xlxw_menu_item_menu_list = document.querySelectorAll(".xlxw-menu-item");
	var xlxw_menu_item_nav = document.getElementById("xlxw_menu_item_nav");
	var xlxw_menu_item_nav_list = document.getElementById("xlxw_menu_item_nav").getElementsByTagName("li");

	for(var i = 0; i < xlxw_menu_item_nav_list.length; i++) {
		xlxw_menu_item_nav_list[i].setAttribute("index", i);

		xlxw_menu_item_nav_list[i].onmouseover = function() {
			document.getElementById("banner").style.display = "none";
			var index = this.getAttribute("index");
			//二级导航菜单容器显示
			xlxw_menu_item_nav.style.display = "block";
			//子菜单显示
			xlxw_menu_item_nav_list[index].style.display = "block";
		};
		xlxw_menu_item_nav_list[i].onmouseout = function() {
			document.getElementById("banner").style.display = "block";
			//二级导航菜单容器隐藏
			xlxw_menu_item_nav.style.display = "none";
			var index = this.getAttribute("index");
			//子菜单显示
			xlxw_menu_item_nav_list[index].style.display = "none";
		};
	}

	for(var i = 0; i < xlxw_menu_item_menu_list.length; i++) {
		xlxw_menu_item_menu_list[i].setAttribute("index", i);

		xlxw_menu_item_menu_list[i].onmouseover = function() {
			document.getElementById("banner").style.display = "none";
			var index = this.getAttribute("index");
			//二级导航菜单容器显示
			xlxw_menu_item_nav.style.display = "block";
			//子菜单显示
			xlxw_menu_item_nav_list[index].style.display = "block";
		};
		xlxw_menu_item_menu_list[i].onmouseout = function() {
			document.getElementById("banner").style.display = "block";
			//二级导航菜单容器隐藏
			xlxw_menu_item_nav.style.display = "none";
			var index = this.getAttribute("index");
			//子菜单显示
			xlxw_menu_item_nav_list[index].style.display = "none";
		};
	}
})();

/*市场动态*/
(function() {
	var xlxw_scContent = document.getElementById("xlxw_scContent");
	var xlxw_scContent_list = document.getElementById("xlxw_scContent_list");

	var xlxw_scContent_list_top = 0;

	setInterval(function() {
		xlxw_scContent_list_top = (xlxw_scContent_list_top - 30);
		if(parseInt(xlxw_scContent_list_top) <= -1080) {
			xlxw_scContent_list_top = 0;
		}
		animation(xlxw_scContent_list, {
			"marginTop": xlxw_scContent_list_top
		});
	}, 4000);
})();

// 平滑返回顶部
$("#xlxw-toolbar-item-top").click(function() {
	$("html,body").animate({
		scrollTop: 0
	}, "600");
});

/*滑动检测*/
window.onscroll = function() {
	//获取滚动条滚动时距离顶部的距离
	var t = document.documentElement.scrollTop || document.body.scrollTop;
	//获取子元素id
	var xlxw_toolbar = document.getElementById('xlxw-toolbar');
	var xlxw_toolbar_item_areaHot = document.getElementById('xlxw-toolbar-item-areaHot');
	var xlxw_toolbar_item_fruits = document.getElementById('xlxw-toolbar-item-fruits');
	var xlxw_toolbar_item_vegetables = document.getElementById('xlxw-toolbar-item-vegetables');
	var xlxw_toolbar_item_meat = document.getElementById('xlxw-toolbar-item-meat');
	var xlxw_toolbar_item_seafood = document.getElementById('xlxw-toolbar-item-seafood');
	var xlxw_toolbar_item_oil = document.getElementById('xlxw-toolbar-item-oil');
	var xlxw_toolbar_item_top = document.getElementById('xlxw-toolbar-item-top');
	//显示侧栏
	if(t >= 900) {
		xlxw_toolbar.style.display = "block";
		xlxw_toolbar_item_areaHot.style.background = "orange";
		xlxw_toolbar_item_fruits.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_vegetables.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_meat.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_seafood.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_oil.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_top.style.background = "rgba(0, 0, 0, 0.25)";
	} else {
		xlxw_toolbar.style.display = "none";
	}
	//当地特色
	if(t >= 1200) {
		xlxw_toolbar_item_fruits.style.background = "#4FBB6E";
		xlxw_toolbar_item_vegetables.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_meat.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_seafood.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_oil.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_top.style.background = "rgba(0, 0, 0, 0.25)";
	}
	//时令水果
	if(t >= 1400) {
		xlxw_toolbar_item_fruits.style.background = "#4FBB6E";
		xlxw_toolbar_item_vegetables.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_meat.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_seafood.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_oil.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_top.style.background = "rgba(0, 0, 0, 0.25)";
	}
	//新鲜蔬菜
	if(t >= 1780) {
		xlxw_toolbar_item_fruits.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_vegetables.style.background = "#A7BF36";
		xlxw_toolbar_item_meat.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_seafood.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_oil.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_top.style.background = "rgba(0, 0, 0, 0.25)";
	}
	//肉禽蛋品
	if(t >= 2400) {
		xlxw_toolbar_item_fruits.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_vegetables.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_meat.style.background = "#FF9F6E";
		xlxw_toolbar_item_seafood.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_oil.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_top.style.background = "rgba(0, 0, 0, 0.25)";
	}
	//水产海鲜
	if(t >= 3100) {
		xlxw_toolbar_item_fruits.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_vegetables.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_meat.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_seafood.style.background = "#55B1E8";
		xlxw_toolbar_item_oil.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_top.style.background = "rgba(0, 0, 0, 0.25)";
	}
	//柴米油盐
	if(t >= 3700) {
		xlxw_toolbar_item_fruits.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_vegetables.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_meat.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_seafood.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_oil.style.background = "#f8db62";
		xlxw_toolbar_item_top.style.background = "rgba(0, 0, 0, 0.25)";
	}
	//返回顶部
	if(t >= 4300) {
		xlxw_toolbar_item_fruits.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_vegetables.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_meat.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_seafood.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_oil.style.background = "rgba(0, 0, 0, 0.25)";
		xlxw_toolbar_item_top.style.background = "green";
	}

	/*检测搜索栏*/

	//获取滚动条滚动时距离顶部的距离
	var t = document.documentElement.scrollTop || document.body.scrollTop;
	//获取子元素id
	var xlxw_search = document.getElementById("xlxw-search");
	var xlxw_all = document.getElementById("xlxw_all");

	//是否悬浮搜索栏
	if(t >= 1080) {
		xlxw_search.style.position = "fixed";
		xlxw_search.style.width = "100%";
		xlxw_search.style.top = "0";
		xlxw_search.style.background = "#FAFAFA";
		xlxw_search.style.marginTop = "0";
		xlxw_search.style.marginBottom = "0";
		xlxw_search.style.borderBottom = "1px solid #E0E0E0";
		xlxw_search.style.zIndex = "9998";
		xlxw_all.style.marginTop = "100px";
	} else {
		xlxw_search.style.position = "relative";
		xlxw_search.style.width = "100%";
		xlxw_search.style.top = "0";
		xlxw_search.style.background = "#F3F3F3";
		xlxw_search.style.marginTop = "25px";
		xlxw_search.style.marginBottom = "25px";
		xlxw_search.style.borderBottom = "none";
		xlxw_all.style.marginTop = "0px";
	}

}