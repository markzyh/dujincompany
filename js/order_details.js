var app = new Vue({
	el: '#dymain',
	data: {
		isShowProblems:false,
		orderNumber:'',//订单编号
		userName:'',
		douyinId:'',
		orderInfo:'',//用户信息对象
		//orderStatus:0,
		orderLink:'',//投放链接
		playCount:'',//播放量
		interactionCount:'',//互动量
		shareCount:'',//分享量
		commentCount:'',//评论量
		likeCount:'',//点赞量
		orderMoney:'',//下单金额
		createTime:'',//下单时间
		payTime:'',//审核通过时间
		completeTime:'',//完成时间
		costMoney:24,//消耗金额
		orderStatusLists: [
			{
				name: '全部',
				value: ''
			},
			{
				name: '审核中',
				value: 0
			},
			{
				name: '未支付',
				value: 1
			},
			{
				name: '投放中',
				value: 2
			},
			{
				name: '已完成',
				value: 3
			}
			,
			{
				name: '',
				value: 4
			},
			{
				name: '',
				value: 5
			},
			{
				name: '',
				value: 6
			}
		],
		orderStatus:0,
	},
	methods: {
		//查询订单状态
		chenckOrderStatus:function(){
			this.orderStatus = this.orderInfo.Status
			for(var i = 0;i<this.statusLists.length;i++){
				if(this.statusLists[i] == this.orderStatus){

				}
			}
		},
		//常见问题
		showProblems:function(){
			this.isShowProblems = true
		},
		closeProblems:function(){
			this.isShowProblems = false
		},
		checkTen: function (num) {
			if (num < 10) {
				num = "0" + num
			}
			return num
		},
		//转换时间戳格式
		transformDateStamp:function(param) {
			var date = new Date(parseInt(param.substr(6, 19)))
			var timeYear = new Date(date).getFullYear();
			var timeMouth = new Date(date).getMonth() + 1;
			var timeDate = new Date(date).getDate();
			var timeHours = new Date(date).getHours();
			var timeMinutes = new Date(date).getMinutes();
			var timeSeconds = new Date(date).getSeconds();
			var time = this.checkTen(timeYear) + "-" + this.checkTen(timeMouth) + "-" + this.checkTen(timeDate) + "   " + this.checkTen(timeHours) + ":" + this.checkTen(timeMinutes) + ":" + this.checkTen(timeSeconds)
			return time
		},
		getOrderMessage:function(){
			this.createTime = this.transformDateStamp(this.orderInfo.CreateDateTime)
			this.payTime = this.transformDateStamp(this.orderInfo.PayTime)
			this.completeTime = this.transformDateStamp(this.orderInfo.CompleteTime)
		},
		//根据订单信息渲染页面
		getUserMessage:function(){
			//console.log(this.orderInfo)
			this.userName = getUsermessage().userName
			this.douyinId = getUsermessage().douyinId
			this.orderLink = this.orderInfo.Url
			this.playCount = this.orderInfo.PlayCount
			this.interactionCount = this.orderInfo.InteractionCount
			this.shareCount = this.orderInfo.ShareCount
			this.commentCount = this.orderInfo.CommentCount
			this.likeCount = this.orderInfo.LikeCount
			this.orderMoney = this.orderInfo.Money
			this.orderDate = this.transformDateStamp(this.orderInfo.CreateDateTime)
			//this.chenckOrderStatus()//检查订单的状态,显示页面上
		},
		//异步加载订单信息
		getOrderInfo:function(){
			var token = getUsermessage().token
			var OrderNumber = this.orderNumber
			var _this = this
			axios.post('http://dou.fudayiliao.com/order/GetOrderDetail',{
				Token:token,
				OrderNumber:OrderNumber
			},{
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			}).then(function(res){
				console.log(res.data.Data)
				_this.orderInfo = res.data.Data
				_this.orderStatus = res.data.Data.Status
				_this.getOrderMessage()
				_this.getUserMessage()
				console.log(_this.orderInfo)
			})
		},
		//获取从订单中心传递的订单号
		getOrderNumber:function(){
			this.orderNumber = localStorage.orderNumber
			console.log(this.orderNumber)
			//localStorage.orderNumber = ''
		}	
	},
	mounted: function () {
		this.getOrderNumber()
		this.getOrderInfo()
		
	}
})