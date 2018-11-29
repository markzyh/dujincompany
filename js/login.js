//console.log(window.screen.height+"高度") 
//获取屏幕高度
function getScreenHeight() {
	return window.screen.height
}
//点击登录弹出登录框
function openUserLogin() {
	$('.flied_tc').show('100')
}

function hideLoginForm() {
	$('.flied_tc').hide()
}
//登录确认
function userLogin() {
	var Phone = $("#userphone").val();
	var Code = $('#check_code').val();
	var dataVal = {};
	dataVal.Phone = Phone;
	dataVal.Code = Code;
	$.ajax({
		url: 'http://dou.fudayiliao.com/account/register',
		type: 'post',
		//contentType:'application/json',
		dataType: 'json',
		data: JSON.stringify(dataVal),
		success: function (res) {
			hideLoginForm(); //隐藏登录框
			console.log(res)
			//app.data.userIsLogin = true
			var setDate = new Date().getTime() //返回距离1970 年 1 月 1 日之间的毫秒数,用来设置过期时间
			var token = res.Token,
				userName = res.Data.Name,
				cellphoneNumber = res.Data.Phone,
				douyinId = res.Data.DouyinId
			//setUserMessage(userName, token,cellphoneNumber) //获取用户名和token,本地存储
			var userMessageObj = {
				setDate: setDate,
				token: token,
				userName: userName,
				cellphoneNumber: cellphoneNumber,
				douyinId: douyinId
			}
			setUserMessage('userMessage', userMessageObj)//本地存储用户信息
			console.log(localStorage)
			checkUserIsLogin() //开始检测是否存入本地存储中,如果存入拿出用户名
			//openCreateOrder()//都加速页面,判断
			//alert('你已经成功登录')
			//document.cookie = "token" + "=" + res.Token
			//document.cookie = "userName" + "=" + res.Data.Name
			//getCookie()
			//getUserName(getCookie.token)//给头部改名字
			//window.location.href = '/create-order'
		},
		error: function () {
			console.log('err')
		}
	})
}
//退出登录
function userLoginOut() {
	//alert('退出登录后,登录信息将不再保存')
	clearUserMessage() //清空本地存储的用户信息
	checkUserIsLogin() //检测是否登录
	//openCreateOrder()//都加速页面,判断
	alert('您已经退出登录')
}
//上面的都放在外面

$("#slider2").slider({
	width: 385, // width
	height: 40, // height
	sliderBg: "#cdcdcd", // 滑块背景颜色
	color: "#fff", // 文字颜色
	fontSize: 14, // 文字大小
	bgColor: "#19be6b", // 滑动成功后背景颜色
	textMsg: "请按住滑块，拖动到最右边", // 初始提示文字
	successMsg: "验证成功", // 验证成功提示文字
	successColor: "#ffffff", // 滑块验证成功提示文字颜色
	time: 400, // 返回时间
	callback: function (result) { // 回调函数，true(成功),false(失败)
		//$("#result2").text(result);
		checkPhone();
		//getCheckNumberDisable()
	}
});
//除了首页,其他页面的限制
function limit() {
	checkUserIsLogin()
	if (checkUserIsLogin()) {
		//alert('登录了')
	} else {
		alert('您还没有注册或登录')
		window.location.href = "/"
	}
}
//判断用户是否登录,检测登录是否过期
function checkUserIsLogin() {
	getUsermessage() //从locatStroage里获取用户信息
	//获取用户信息
	if (getUsermessage()) { //如果返回一个对象,则已经登录过了
		var nowDate = new Date().getTime() //获取页面加载时的时间
		var lifeDay = 1 * 24 * 60 * 60 * 1000 //过期的天数
		var lifeTime = nowDate - getUsermessage().setDate
		if (lifeTime > lifeDay) {
			clearUserMessage() //清除用户保存的信息,清除localStroage
			alert('登录状态已经过期,请您重新登录')
			return false
		}
		//alert('已经登录')
		//头部显示用户名和头像
		$(".user_is_login").addClass('show')
		$(".user_is_login .user_login_name").html(getUsermessage().userName)
		$(".user_isnot_login").removeClass('show')
		return true
	} else { //如果没有登录		
		$(".user_is_login").removeClass('show')
		$(".user_is_login .user_login_name").html('')
		$(".user_isnot_login").addClass('show')
		return false
	}
}
$(document).ready(function () {
	checkUserIsLogin() //页面加载完成后就开始检测是否登录
})
//获取本地存储的用户信息
function getUsermessage() {
	//var date = new Date()
	if (typeof (Storage) !== "undefined") {
		var userMessage = localStorage.userMessage
		if (userMessage) { //如果有这个对象
			return JSON.parse(userMessage) //返回对象
		} else {
			return false
		}
		//var userName = userMessage.userName,token = localStorage.userMessage.token //从localStorage中取值
	} else {
		//document.getElementById("result").innerHTML = "对不起，您的浏览器不支持 web 存储。";
	}
}
//设置本地存储用户信息
function setUserMessage(obj, val) {
	if (typeof (Storage) !== "undefined") {
		localStorage.setItem(obj, JSON.stringify(val))
		//localStorage.userName = userName
		//localStorage.token = token
		//localStorage.cellphoneNumber = cellphoneNumber
	} else {
		//document.getElementById("result").innerHTML = "对不起，您的浏览器不支持 web 存储。";
	}
}
//清除本地存储,登出,隐藏用户信息
function clearUserMessage(userName, token) {
	if (typeof (Storage) !== "undefined") {
		localStorage.clear()

		/* localStorage[userName] = null
		localStorage[token] = null */
		/*$(".clickBtn").click(function () {//都加速页面
			alert('您还没有注册或登录')
		})*/
		/*function openCreateOrder(){
			alert('您还没有注册或登录')
		}*/
	} else {
		//document.getElementById("result").innerHTML = "对不起，您的浏览器不支持 web 存储。";
	}
}
//获取验证码按钮不可点击
function getCheckNumberDisable() {
	$("#get_check").attr('disabled', false);
	$("#get_check").addClass('disable');
}
//获取手机验证码
function getCheckNumber() {
	var userPhoneVal = $('#userphone').val();
	$("#get_check").removeClass('disable');
	$("#get_check").attr('disabled', true);
	$.ajax({
		url: 'http://dou.fudayiliao.com/account/GetSmsCode/' + userPhoneVal,
		type: 'get',
		//data: userPhoneVal,
		success: function (res) {
			console.log('成功')
			console.log(res)
		}
	})
	var num = 60,
		tInterval;
	tInterval = setInterval(function () {
		$("#get_check").val(num + 's')
		num--
		if (num == -1) {
			clearInterval(tInterval);
			$("#get_check").val('获取手机验证码');
			$("#slider2").slider("restore"); //初始化
		}
	}, 1000)
}
//验证手机号码规则
function checkPhone() {
	var phone = document.getElementById('userphone').value;

	if (!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone))) {
		alert("手机号码有误，请重填");
		$("#slider2").slider("restore"); //初始化
		return false;
	} else {
		getCheckNumberDisable()
	}
}
//转换时间戳
function transformDate(param) {
	var date = new Date(parseInt(param.substr(6, 19)))
	var timeYear = new Date(date).getFullYear();
	var timeMouth = new Date(date).getMonth() + 1;
	var timeDate = new Date(date).getDate();
	var timeHours = new Date(date).getHours();
	var timeMinutes = new Date(date).getMinutes();
	var timeSeconds = new Date(date).getSeconds();
	var time = this.checkTen(timeYear) + "-" + this.checkTen(timeMouth) + "-" + this.checkTen(timeDate) + "   " + this.checkTen(timeHours) + ":" + this.checkTen(timeMinutes) + ":" + this.checkTen(timeSeconds)
	return time
}




















/*$(document).ready(function () {
	//speed页面
	function checkIsLogin() {
		var token = getCookie().token
		if (token) { //已经登录
			return true
		} else { //没有登录
			return false
		}
	}
	function speedJump() {
		checkIsLogin()
		if (checkIsLogin()) { //已经登录
			//alert('已经登录')
			$(".clickBtn").click(function () {
				//alert(0)
				window.location.href = "http://doujiasu.dujin021.com/create-order"
			})
		} else { //没有登录
			//alert('没有登录')
			$(".clickBtn").click(function () {
				alert('您还没有注册或登录')
			})
		}
	}
	speedJump()
})*/
//speed页面end



$(document).ready(function () {
	//根据路径判断添加导航的class
	var nowPath = window.location.pathname; //判断当前路径
	for (var i = 0; i < $("#mainmenu li").length; i++) {
		var navLink = $('#mainmenu li').eq(i).children('a').attr('href').substring(1) //遍历每个导航下的链接名称
		if (nowPath.indexOf(navLink) > 0) { //不够严谨,后期有时间改进下
			$('#mainmenu li').eq(i).addClass('active').siblings().removeClass('active')
		}

	}
	var st = 200;
	$('#arrh').mouseenter(function () {
		$(this).find('.douyin_list').stop(false, true).slideDown(st);
	}).mouseleave(function () {
		$(this).find('.douyin_list').stop(false, true).slideUp(st);
	});
	/*$("#arrh").mouseenter(function() {
		$('.douyin_list').slideDown();
	});
	$("#arrh").mouseleave(function() {
		$('.douyin_list').slideUp();
	});*/
	$('.douyin_list_dl dl').hover(function () {
		$(this).addClass("on").siblings("dl").removeClass("on");
	});
	//登录注册模块
	$(".open_login_form").click(function () {
		$(".flied_tc").addClass('show');
	})
	//登出
	$(".loginOut").click(function () {
		clearAllCookie()
		alert('您已经退出登录!')
		getUserName(false)
		speedJump()
	})

})