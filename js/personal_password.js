var app = new Vue({
	el: '#dymain',
	data: {
		//userNewPassword:'',
		userCellphoneNumber: '',
		checkCode: "", //图形验证码
		oldPassword:'',
		userNewPassword:'',
		confirmNewPassword:''
	},
	methods: {
		//提交
		confirmSubmitNewPassword:function(){
			var oldPassword = this.oldPassword
			var userNewPassword = this.userNewPassword
			var confirmNewPassword = this.confirmNewPassword
			var Token = getUsermessage().token
			console.log(Token)
			if(oldPassword == '' || userNewPassword == ''){
		          alert('密码不能为空!')
		          return false
		      }
			if(oldPassword == userNewPassword){
				alert('新密码与旧密码一致,请您输入新的密码')
				return false
			}
			if(userNewPassword != confirmNewPassword){
				alert('两次输入密码不一致,请您重新输入')
				return false
			}else{
				alert('成功')
				axios.post('http://dou.fudayiliao.com/account/Update',{
					Token:Token,
					Password:oldPassword,
					NewPassword:userNewPassword
				},{
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					console.log(res)
					if(res.data.Code == 14){
						alert('您的原密码输入有误,请您重新输入')
					}
					//alert('修改密码成功')
				})
			}
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
		
	},
	mounted: function () {
		//this.userCellphoneNumber = localStorage.cellphoneNumber
		//this.getCheckCode()
		//console.log(this.createToken())

	}
})