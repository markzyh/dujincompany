var app = new Vue({
	el: '#dymain',
	data: {
		isDisabled: false, //获取手机验证码是否是disabled
		cellphoneBtnVal: '获取验证码',
		userCellphoneNumber: '', //mpounted后获取的用户原有的手机
		cellphoneCheckCode: '', //手机验证码
		userNewPhone: '', //用户新手机号码
		checkCodeUrl: "", //图形验证码链接
		imgCheckCode: '', //图像验证码内容
		createdToken: '' //自动生成的token
	},
	methods: {
		//确认修改手机号
		confirmChangeNumber: function () {
			if (this.checkPersonalCellphone() == true) {
				var Token = getUsermessage().token
				var Phone = this.userNewPhone
				var Code = this.cellphoneCheckCode
				var Data = this.imgCheckCode
				var Key = this.createdToken
				axios.post('http://dou.fudayiliao.com//account/ChangePhone', {
					Token: Token,
					Phone: Phone,
					Code: Code,
					Data: Data,
					Key: Key
				}, {
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				}).then(function (res) {
					if (res.data.Code == 12) {
						alert('您修改的手机号与原手机号一致,请您输入新的手机号')
					}
					console.log(res)
				})
			}

		},
		checkPersonalCellphone: function () {
			if (this.userNewPhone == '') {
				alert('手机号必填,请您重新输入')
				return false
			}
			if (this.imgCheckCode == '') {
				alert('请您先填写图形验证码')
				return false
			}
			if (this.checkPhone(this.userNewPhone) == false) {
				alert('请您填写正确的手机号')
				return false
			} else {
				return true
			}
		},
		checkPhone: function (phone) {
			//var phone = document.getElementById('userphone').value;
			if (!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone))) {
				//alert("手机号码有误，请重填");
				//$("#slider2").slider("restore"); //初始化
				return false;
			} else {
				//getCheckNumberDisable()
				return true
			}
		},
		//获取手机验证码
		getPhoneCode: function () {
			if (this.checkPersonalCellphone() == true) {
				this.isDisabled = true
				var interval
				var _this = this
				var num = 60
				interval = setInterval(function () {
					_this.cellphoneBtnVal = num + "s"
					num--
					if (num == -1) {
						clearInterval(interval)
						_this.isDisabled = false
						_this.cellphoneBtnVal = '获取验证码'
						//alert('999')
					}
				}, 1000)
				var Key = this.createdToken
				var Data = this.imgCheckCode
				console.log(Key)
				console.log(Data)
				console.log(this.userNewPhone)
				var url = 'http://dou.fudayiliao.com/account/GetSmsCode/' + this.userNewPhone
				axios.post(url, {
					Key: Key,
					Data: Data
				}, {
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				}).then(function (res) {
					console.log(res)
				})
			}

		},
		//点击验证码换图
		changeImgCheck: function () {
			this.getCheckCode()
		},
		//获取图形验证码
		getCheckCode: function () {
			//var token = getUsermessage().token
			var phone = this.userNewPhone
			this.createdToken = this.createToken()
			console.log(this.createdToken)
			var checkCode = 'http://dou.fudayiliao.com/account/getcode/' + this.createdToken
			this.checkCodeUrl = checkCode.toString()
			console.log(this.checkCodeUrl)
		},
		//自定义token
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