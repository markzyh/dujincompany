var app = new Vue({
	el: '#dymain',
	data: {
		isShowProblems:false,
		orderNumber:''//订单编号
	},
	methods: {
		showProblems:function(){
			this.isShowProblems = true
		},
		closeProblems:function(){
			this.isShowProblems = false
		},
		getOrderNumber:function(){
			this.orderNumber = localStorage.orderNumber
			console.log(this.orderNumber)
			//localStorage.orderNumber = ''
		},
		getOrderInfo:function(){
			var token = getUsermessage().token
			var OrderNumber = this.orderNumber
			axios.post('http://dou.fudayiliao.com/order/GetOrderDetail',{
				Token:token,
				OrderNumber:OrderNumber
			},{
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			}).then(function(res){
				console.log(res.data)
			})
		}
	},
	mounted: function () {
		this.getOrderNumber()
		this.getOrderInfo()
	}
})
