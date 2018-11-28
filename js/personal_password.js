var app = new Vue({
	el: '#dymain',
	data: {
		//userNewPassword:'',
		userCellphoneNumber: '',
		checkCode: "" //图形验证码
	},
	methods: {

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
		
	},
	mounted: function () {
		this.userCellphoneNumber = localStorage.cellphoneNumber
		this.getCheckCode()
		console.log(this.createToken())

	}
})