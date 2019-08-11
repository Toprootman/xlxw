$(document).ready(function() {

	// 全部选中功能
	$(".shopping-cart-title input").click(function() {
		$(".shopping-cart-item input").prop("checked", $(this).prop("checked"));
		if($(this).prop("checked")) {
			$(".shopping-cart-item").css("backgroundColor", "#FFF4E8");
			// 更新价格
			var sumPrice = 0;
			$(".shopping-cart-item").each(function() {
				var singlePrice = $(this).children(".shopping-cart-item6").children("span").text();
				singlePrice = parseInt(singlePrice);
				sumPrice += singlePrice * 1;
			});
			// 设置新的价格
			$(".shopping-cart-bottom>.shopping-cart-bottom7>span").text(sumPrice);
		} else {
			$(".shopping-cart-item").css("backgroundColor", "#F6F6F6");
			// 设置新的价格
			$(".shopping-cart-bottom>.shopping-cart-bottom7>span").text("00.00");
		}
	});

	// 单个选中功能
	$(".shopping-cart-item input").click(function() {
		// 当前项目选中变色
		if($(this).prop("checked")) {
			$(this).parent().parent().css("backgroundColor", "#FFF4E8");
			// 增加价格
			// 获取总的价格
			var sumPrice = $(".shopping-cart-bottom>.shopping-cart-bottom7>span").text();
			sumPrice = parseInt(sumPrice);
			// 获取当前价格
			var nowPrice = $(this).parent().siblings(".shopping-cart-item6").children("span").text();
			nowPrice = parseInt(nowPrice);
			// 计算后的价格
			sumPrice += nowPrice;
			// 设置新的价格
			$(".shopping-cart-bottom>.shopping-cart-bottom7>span").text(sumPrice);
		} else {
			$(this).parent().parent().css("backgroundColor", "#F6F6F6");
			// 减少价格
			// 获取总的价格
			var sumPrice = $(".shopping-cart-bottom>.shopping-cart-bottom7>span").text();
			sumPrice = parseInt(sumPrice);
			// 获取当前价格
			var nowPrice = $(this).parent().siblings(".shopping-cart-item6").children("span").text();
			nowPrice = parseInt(nowPrice);
			// 计算后的价格
			sumPrice -= nowPrice;
			// 设置新的价格
			$(".shopping-cart-bottom>.shopping-cart-bottom7>span").text(sumPrice);
		}
		// 判断是否全部选上，如果是则将全部选上的复选框选上
		if($(".shopping-cart-item input:checked").length == $(".shopping-cart-item input").length) {
			$(".shopping-cart-title input").prop("checked", true)
		} else {
			$(".shopping-cart-title input").prop("checked", false)
		}
	});

	// 删除当前商品
	$(".shopping-cart-item8>span").click(function() {
		// 删除当前商品
		$(this).parent().parent().slideUp(1000, function() {
			$(this).remove();
		});
		// 判断当前商品是否选中
		if($(this).parent().siblings(".shopping-cart-item1").children("input").prop("checked")) {
			// 更新购物车价格
			var sum = $(this).parents().siblings(".shopping-cart-item6").children("span").text();
			var sumPrice = $(".shopping-cart-bottom>.shopping-cart-bottom7>span").text();
			sum = parseInt(sum);
			sumPrice = parseInt(sumPrice);
			sumPrice -= sum;
			// 设置新的价格
			$(".shopping-cart-bottom>.shopping-cart-bottom7>span").text(sumPrice);
		}
	});

	// 删除当前选中商品
	$(".shopping-cart-bottom1>span").click(function() {
		$(".shopping-cart-item input:checked").parent().parent().slideUp(750, function() {
			$(this).remove();
		});
		$(".shopping-cart-bottom>.shopping-cart-bottom7>span").text("00.00");
		if($(this).prop("checked")) {
			$(".shopping-cart-item").css("backgroundColor", "#FFF4E8");
			// 更新价格
			var sumPrice = 0;
			$(".shopping-cart-item").each(function() {
				var singlePrice = $(this).children(".shopping-cart-item6").children("span").text();
				singlePrice = parseInt(singlePrice);
				sumPrice -= singlePrice * 1;
			});
			// 设置新的价格
			$(".shopping-cart-bottom>.shopping-cart-bottom7>span").text(sumPrice);
		} else {
			$(".shopping-cart-item").css("backgroundColor", "#F6F6F6");
			// 设置新的价格
			$(".shopping-cart-bottom>.shopping-cart-bottom7>span").text("00.00");
		}
	});

	// 删除全部商品
	$(".shopping-cart-bottom2>span").click(function() {
		$(".shopping-cart-item").slideUp(500, function() {
			$(this).remove();
		});
		$(".shopping-cart-bottom>.shopping-cart-bottom7>span").text("00.00");
	});

	// 减少单个商品数量
	$(".count-control-left").click(function() {
		// 数量
		var count = $(this).next().text();
		if(count != 0) {
			// 单价
			var price = $(this).parent().parent().siblings(".shopping-cart-item4").children("span").text();
			price = parseInt(price);
			// 数量改变
			count = parseInt(count) - 1;
			if(count <= 0) {
				count = 0;
			}
			// 计算总价
			var sum = parseInt(count * price);
			// 设置总价
			$(this).parent().parent().siblings(".shopping-cart-item6").children("span").text(sum);
			$(this).next().text(count);
			// 判断当前商品是否选中
			if($(this).parent().parent().siblings(".shopping-cart-item1").children("input").prop("checked")) {
				// 更新购物车价格
				var sumPrice = $(".shopping-cart-bottom>.shopping-cart-bottom7>span").text();
				sumPrice = parseInt(sumPrice);
				sumPrice -= price;
				if(sumPrice <= 0) {
					sumPrice = 0;
				}
				// 设置新的价格
				$(".shopping-cart-bottom>.shopping-cart-bottom7>span").text(sumPrice);
			}
		}
	});

	// 增加单个商品数量
	$(".count-control-right").click(function() {
		// 数量
		var count = $(this).prev().text();
		// 单价
		var price = $(this).parent().parent().siblings(".shopping-cart-item4").children("span").text();
		price = parseInt(price);
		// 数量改变
		count = parseInt(count) + 1;
		// 计算总价
		var sum = parseInt(count * price);
		// 设置总价
		$(this).parent().parent().siblings(".shopping-cart-item6").children("span").text(sum);
		$(this).prev().text(count);
		// 判断当前商品是否选中
		if($(this).parent().parent().siblings(".shopping-cart-item1").children("input").prop("checked")) {
			// 更新购物车价格
			var sumPrice = $(".shopping-cart-bottom>.shopping-cart-bottom7>span").text();
			sumPrice = parseInt(sumPrice);
			sumPrice += price;
			// 设置新的价格
			$(".shopping-cart-bottom>.shopping-cart-bottom7>span").text(sumPrice);
		}
	});

	// 去结算
	$(".shopping-cart-bottom>.shopping-cart-bottom8>a").click(function() {
		var price = $(".shopping-cart-bottom>.shopping-cart-bottom7>span").text();
		if(price == "0" || price == "0.00" || price == "00.00") {
			alert("请选择商品");
		} else {
			alert("商品总价格：" + price);
		}
	});

});