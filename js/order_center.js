function test() {
	alert('pppppp')
}
var app = new Vue({
	el: '#dymain',
	data: {
		endDateVal: '', //日期选择结束时间
		startDateVal: '', //日期选择开始时间
		token: '',
		isLogin: false,
		isShowOrderDetails: false, //是否显示订单详情
		orderList: [],
		choosedOrderStatus: '全部',
		choosedOrderTime: '下单时间',
		orderTimeLists: [{
				name: '下单时间',
				value: 0
			},
			{
				name: '支付时间',
				value: 1
			},
			{
				name: '完成时间',
				value: 2
			}

		],
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
		]
	},
	methods: {
		//验证时间
		chekDate:function(startDate,endDate){
			if(parseInt(startDate) > parseInt(endDate)){
				
				return false
			}else{
				return true
			}
		},
		//转换时间格式,转换为时间戳格式
		transformDate:function(dateString){
			var dateYear = dateString.substring(0,4)//取年份
			var dateMounth = dateString.substring(5,7)//取月份
			var dateDay = dateString.substring(8,10)//取天数
			var parseDateString = dateYear+'-'+dateMounth+"-"+dateDay//转换为标准时间格式,可以被解析
			console.log(Date.parse(parseDateString))
			return Date.parse(parseDateString)//返回时间戳
		},
		startDatePicker: function () {
			var _this = this
			$('.start_date').datepicker({ //bootstrap-datepicker
				language: "zh-CN", //中文
				orientation: "bottom auto", //位置
				todayHighlight: true //今天高亮
			}).on('hide', function (e) { //回调函数,hide是固定api,意味在窗口隐藏后的回调
				var val = $(".start_date").val() //获取dom的value,测试用vue无法获取,不知道是不写法问题
				_this.startDateVal = val
				console.log(_this.startDateVal)
			})
		},
		endDatePicker: function () {			
			//-_-!!!!!万不得已,用基于dom的插件了
			var _this = this
			$('.end_date').datepicker({ //bootstrap-datepicker
				language: "zh-CN", //中文
				orientation: "bottom auto", //位置
				todayHighlight: true //今天高亮
			}).on('hide', function (e) { //回调函数,hide是固定api,意味在窗口隐藏后的回调
				var val = $(".end_date").val() //获取dom的value,测试用vue无法获取,不知道是不写法问题
				_this.endDateVal = val
				console.log(_this.endDateVal)
				//验证开始时间必须比结束时间小
				console.log(_this.choosedOrderStatus)
				var endDateString = _this.transformDate(_this.endDateVal)//时间戳
				var stratDateString = _this.transformDate(_this.startDateVal)//时间戳
				//_this.chekDate(stratDateString,endDateString)
				if(_this.chekDate(stratDateString,endDateString)){
					//console.log("时间筛选成功")
					var status =_this.choosedOrderStatus
					var start = _this.startDateVal
					var end = _this.endDateVal
					var dateType = _this.choosedOrderTime
					_this.getOrderList(status,start,end,dateType)
				}else{
					alert('结束时间必须在开始时间之后,请您重新选择')
					return false
				}
			})
		},
		closeProblems: function () {
			this.isShowProblems = false
		},
		//选择筛选时间
		/* chooseOrderTime: function () {
			//this.getOrderListAttr(this.choosedOrderTime)
			this.choosedOrderTime = this
			console.log(this.choosedOrderTime)
		}, */
		//选择订单状态,根据状态查询
		chooseOrderStatus: function () {
			//var status = this.choosedOrderStatus
			var status
			for(var i=0;i<this.orderStatusLists.length;i++){
				if(this.orderStatusLists[i].name == this.choosedOrderStatus){
					status = i-1
				}
			} 
			//var status = this.choosedOrderStatus
			//alert(this.choosedOrderStatus.value())
			//var status = index
			this.getOrderList(status)
			//this.getOrderListAttr(this.choosedOrderStatus)
			console.log(this.choosedOrderStatus)
			//console.log(this.choosedOrderStatus)
		},
		//点击查询订单
		searchOrderNumber: function (orderNumber) {
			//把orderNumber写入localStorage
			localStorage.orderNumber = orderNumber
			//alert(localStorage.orderNumber)
		},
/*  		getOrderListAttr: function () {
			//this.getToken()
			var token = getUsermessage().token
			//console.log(token)
			var _this = this
			axios.post('http://dou.fudayiliao.com/order/GetOrderList', {
					Token: token,
					Status: attr.toString()
				}, {
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				})
				.then(function (res) {
					console.log(res)
					_this.orderList = res.data.Data
					//alert('筛选成功')
				})
		}, */
		getOrderList: function (status,start,end,dateType) {
			//this.getToken()
			var token = getUsermessage().token
			//console.log(token)
			var _this = this
			axios.post('http://dou.fudayiliao.com/order/GetOrderList', {
					Token: token,
					Status:status,
					Start:start,
					End:end,
					DateType:dateType
				}, {
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				})
				.then(function (res) {
					if(res.data.Code == 11){
						//alert('登录状态已过期,请重新登录')
						userLoginOut()//退出登录
					}
					console.log(res)
					_this.orderList = res.data.Data
				})
		},
		//把时间戳转译成普通格式
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
		/* timeString: function (string) {
			var aa = new Date(parseInt(string.substr(6, 19)))
			var timeYear = new Date(parseInt(string.substr(6, 19))).getFullYear();
			var timeMouth = new Date(parseInt(string.substr(6, 19))).getMonth() + 1;
			var timeDate = new Date(parseInt(string.substr(6, 19))).getDate();
			var timeHours = new Date(parseInt(string.substr(6, 19))).getHours();
			var timeMinutes = new Date(parseInt(string.substr(6, 19))).getMinutes();
			var timeSeconds = new Date(parseInt(string.substr(6, 19))).getSeconds();
			var time = this.checkTen(timeYear) + "-" + this.checkTen(timeMouth) + "-" + this.checkTen(timeDate) + "   " + this.checkTen(timeHours) + ":" + this.checkTen(timeMinutes) + ":" + this.checkTen(timeSeconds)
			return time
		}, */
		checkTen: function (num) {
			if (num < 10) {
				num = "0" + num
			}
			return num
		},

	},
	mounted: function () {
		//limit()//验证登录
		this.getOrderList()
		this.endDatePicker() //必须页面渲染后先执行一次,不然无法点击出现时间框,暂时还没有理解为什么
		this.startDatePicker()
		//this.initDatePicker()
		//this.checkDate()
	},
	computed: {
		watchEndDateVal: function () {
			return this.endDateVal
		}
	}
})