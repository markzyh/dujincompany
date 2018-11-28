function openCreateOrder(){
	//getUsermessage()//获取用户信息
	if (checkUserIsLogin()) { //如果用户名不为空,已经登录了
		window.location.href = "/create_order.html"
		//alert('好的!!!!')
	}else{
		alert('您还没有注册或登录')
		openUserLogin()//打开登录框
		return false
	}			
}
/*$(document).ready(function(){
	openCreateOrder()//页面加载就执行,检测是否登录
})*/



//$(function () {
//	$(".photo_wall ul li").click(function () {
//		$(this).find(".imgs").addClass("hide");
//		$(this).find(".videoBox").removeClass("hide");
//	});
//});

$(function () {
	$(".photo_wall ul li").click(function () {

		$(".imgs").removeClass("hide");
		$(".videoBox").addClass("hide");
		$(this).find(".imgs").addClass("hide");
		$(this).find(".videoBox").removeClass("hide");

		var objVideo = $(this).find(".videoPla");
		
//		statusChange(objVideo);
		
		if (objVideo[0].paused) {
			var videos=document.getElementsByTagName('video');
			for(var i=0;i<videos.length;i++){
				if(!videos[i].paused){
					videos[i].pause();
					}
			}

			objVideo[0].play();
			$(this).find(".playBtn").addClass("hide");
		} else {
			objVideo[0].pause();
			$(this).find(".playBtn").removeClass("hide");
		}
		
//		if (objVideo[0].paused) {
//			var videos=document.getElementsByTagName('video');
//			for(var i=0;i<videos.length;i++){
//				if(!videos[i].paused){
//					videos[i].pause();
//					}
//			}
//
//			objVideo[0].play();
//			$(this).find(".playBtn").addClass("hide");
//		} else {
//			objVideo[0].pause();
//			$(this).find(".playBtn").removeClass("hide");
//		}

	});
});
//function statusChange(obj) {
//	if (obj[0].paused) {
//		var videos=document.getElementsByTagName('video');
//		for(var i=0;i<videos.length;i++){
//			if(!videos[i].paused){
//				videos[i].pause();
//				}
//		}
//
//		obj[0].play();
//	} else {
//		obj[0].pause();
//	}
//}



