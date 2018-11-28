var app = new Vue({
	el: '#dymain',
	data: {
		isDisabled:false,//获取手机验证码是否是disabled
		cellphoneBtnVal:'获取验证码',
		userCellphoneNumber: '',//mpounted后获取的用户原有的手机
		cellphoneCheckCode:'',//手机验证码
		userNewPhone:'',//用户新手机号码
		checkCodeUrl: "", //图形验证码链接
		imgCheckCode:''//图像验证码内容
	},
	methods: {
		//确认修改手机号
		confirmChangeNumber:function(){
			var Token = getUsermessage().token
			var Phone = this.userNewPhone
			var Code = this.cellphoneCheckCode
			var Data = this.imgCheckCode
			axios.post('http://dou.fudayiliao.com//account/ChangePhone',{
				Token:Token,
				Phone:Phone,
				Code:Code,
				Data:Data
			},{
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			}).then(function(res){
				console.log(res)
			})
		},
		//获取手机验证码
		getPhoneCode:function(){
			this.isDisabled = true
			var interval
			var _this = this
			var num = 60
			interval = setInterval(function(){
				_this.cellphoneBtnVal = num+"s"
				num--
				if(num == -1){
					clearInterval(interval)
					_this.isDisabled = false
					_this.cellphoneBtnVal = '获取验证码'
					//alert('999')
				}	
			},1000)
			var url = 'http://dou.fudayiliao.com/account/GetSmsCode/'+this.userNewPhone
			axios.get(url).then(function(res){
				console.log(res)
			})
		},
		//点击验证码换图
		changeImgCheck:function(){
			this.getCheckCode()
		},
		//获取图形验证码
		getCheckCode: function () {
			//var token = getUsermessage().token
			var createdToken = this.createToken()
			var checkCode = 'http://dou.fudayiliao.com/account/getcode/'+createdToken
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