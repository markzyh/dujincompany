var app = new Vue({
	el: '#dymain',
	data: {
		userName: '', //用户名
		userManager: '张图图', //客户经理
		userManagePhone:'',//客户经理手机号
		userManageQQ: '', //客户经理QQ
		douyinId: '', //抖音ID
		userCellphoneNumber: '', //用户手机号
		userBalance: '4500', //用户账户余额
		unpaidOrder: 0,//未支付
		completeOrder: 0,//已完成
		executingOrder: 0,//执行中
		token: '',
		userInfo:[],//获取的用户信息
	},
	methods: {
		getUserInfo: function () {
			var token = getUsermessage().token
			var _this = this
			axios.post('http://dou.fudayiliao.com/account/GetUserInfo', {
				Token: token
			}, {
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			}).then(function (res) {
				if(res.data.Code == 11){
					userLoginOut()
					return false
				}
				_this.userInfo = res.data.Data
				_this.setUserInfo()
				_this.setOrderInfo()
				console.log(_this.userInfo)
			})
		},
		setUserInfo:function(){
			var _this = this.userInfo.user
			this.userName = _this.Name
			this.userManager = _this.Customer
			this.douyinId = _this.DouyinId
			this.userCellphoneNumber = _this.Phone
			this.userBalance = this.userInfo.balance
			this.userManagePhone = _this.CustomerPhone
			this.userManageQQ = _this.CustomerQQ
		},
		setOrderInfo:function(){
			var _this = this.userInfo.order
			this.unpaidOrder = _this.notpay
			this.completeOrder = _this.complete
			this.executingOrder = _this.runing
		}
	},
	mounted: function () {
		this.getUserInfo()
	}
})