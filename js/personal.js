var app = new Vue({
	el: '#dymain',
	data: {
		isShowProblems:false,
		orderNumber: '',
		choosedTransactionType:'消费类型',
		startDateVal:'',
		endDateVal:'',
		orderList: [],
		transactionTypeLists:[
			{
				name:'消费类型',
				disabled:true,
				value:''
			},
			{
				name:'充值',
				value:1
			},
			{
				name:'消费',
				value:2
			}
		]

	},
	methods: {
		showProblems:function(){
			this.isShowProblems = true
		},
		closeProblems:function(){
			this.isShowProblems = false
		},
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
				//console.log(_this.choosedOrderStatus)
				var endDateString = _this.transformDate(_this.endDateVal)//时间戳
				var stratDateString = _this.transformDate(_this.startDateVal)//时间戳
				//_this.chekDate(stratDateString,endDateString)
				if(_this.chekDate(stratDateString,endDateString)){
					//console.log("时间筛选成功")
					var type =_this.choosedTransactionType//类型
					if(type == '充值类型'){
						type = ''
					}
					var start = _this.startDateVal
					var end = _this.endDateVal
					_this.getPaymentList(type,start,end)
				}else{
					alert('结束时间必须在开始时间之后,请您重新选择')
					return false
				}
			})
		},
        //点击查询订单
		chooseTransactionType:function(){
			this.getPaymentList(this.choosedTransactionType)
			console.log(this.choosedTransactionType)
		},
		getPaymentList:function(type,start,end){
			var token = getUsermessage().token
			var _this = this
			axios.post('http://dou.fudayiliao.com/Payment/GetPaymentList', {
					Token: token,
					Type:type,
					End:end,
					Start:start
				}, {
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				})
				.then(function (res) {
					console.log(res)
					if(res.data.Code == 11){
						//alert('"登录状态失效，请重新登录"')
						userLoginOut()
					}
					_this.orderList = res.data.Data
				})
		},
		timeString: function (string) {
			var aa = new Date(parseInt(string.substr(6, 19)))
			var timeYear = new Date(parseInt(string.substr(6, 19))).getFullYear();
			var timeMouth = new Date(parseInt(string.substr(6, 19))).getMonth()+1;
			var timeDate = new Date(parseInt(string.substr(6, 19))).getDate();
			var timeHours = new Date(parseInt(string.substr(6, 19))).getHours();
			var timeMinutes = new Date(parseInt(string.substr(6, 19))).getMinutes();
			var timeSeconds = new Date(parseInt(string.substr(6, 19))).getSeconds();
			var time = this.checkTen(timeYear) + "-" + this.checkTen(timeMouth) + "-" + this.checkTen(timeDate) + "   " + this.checkTen(timeHours) + ":" + this.checkTen(timeMinutes) + ":" + this.checkTen(timeSeconds)
			return time
		},
		checkTen: function (num) {
			if (num < 10) {
				num = "0" + num
			}
			return num
		}

	},
	mounted: function () {
		this.getPaymentList('')
		this.endDatePicker() //必须页面渲染后先执行一次,不然无法点击出现时间框,暂时还没有理解为什么
		this.startDatePicker()

	},
	created:function(){

	}
})
