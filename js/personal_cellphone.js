var app = new Vue({
	el: '#dymain',
	data: {
		userCellphoneNumber: '',
		userNewPhone:'',//用户新手机号码
		checkCodeUrl: "" //图形验证码
	},
	methods: {
		//获取手机验证码
		getPhoneCode:function(){
			/* var url = 'http://dou.fudayiliao.com/account/GetSmsCode/'+this.userNewPhone
			axios.get(url).then(function(res){
				console.log(res)
			}) */
			//getCheckNumber()
		},
		inputFocus: function () {
			if (this.douyinNameVal == '请输入您要投放的抖音昵称') {
				this.douyinNameVal = ''
			}
			if (this.douyinNumberVal == '请输入您要投放的抖音号') {
				this.douyinNumberVal = ''
			}
		},
		inputBlur: function () {
			if (this.douyinNameVal == '') {
				this.douyinNameVal = '请输入您要投放的抖音昵称'
			}
			if (this.douyinNumberVal == '') {
				this.douyinNumberVal = '请输入您要投放的抖音号'
			}
		},
		//获取图形验证码
		getCheckCode: function () {
			//var token = getUsermessage().token
			var createdToken = this.createToken()
			var checkCode = 'http://dou.fudayiliao.com/account/getcode/'+createdToken
			this.checkCodeUrl = checkCode.toString()
			console.log(this.checkCodeUrl)
		},
		createToken: function () {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}
	},
	mounted: function () {
		//this.userCellphoneNumber = localStorage.cellphoneNumber
		this.getCheckCode()
	}
})