var app = new Vue({
	el: '#dymain',
	data: {
		userName:'',//用户名
		userManager:'张图图',//客户经理
		douyinId:'',//抖音ID
		userCellphoneNumber:'',//用户手机号
		userQQ:'779737368',//用户QQ
		userBalance:'4500',//用户账户余额
		unpaidOrder:0,
		paidOrder:20,
		executingOrder:10,
		token: '',
	},
	methods: {
		//用户中心页面,从本地存储中获取用户数据
        _getUserMessage:function(){
			var userObj = getUsermessage()//获取用户信息对象
			this.userName = userObj.userName
			this.douyinId = userObj.douyinId
			this.userCellphoneNumber = userObj.cellphoneNumber
		}
	},
	mounted: function () {
		this._getUserMessage()
	}
})
