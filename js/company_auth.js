var app = new Vue({
	el: '#dymain',
	data: {
		douyinName: '', //投放的抖音名称
		companyName: '', //公司名称
		companyId: '', //公司营业注册号
		companyIdUrl: false, //营业执照图片链接
		permitUrl: false, //行业许可证图片链接
		authUrl: false, //认证公函图片链接
		operateName: '', //运营人姓名
		operatePhone: '', //运营人电话
		imgCheckCode: '', //图形验证码
		imgCheckCodeUrl: '', //图形验证链接
		phoneCheckCode: '', //短信验证码
		createdToken: '', //自定义token
		phoneCodeBtn: '获取验证码',
		isLetPhoneCode: true, //是否允许获取验证
		isConfirm: false, //是否确认了

		isAgree: false, //是否同意协议
	},
	methods: {
		closeConfirm:function(){
			this.isConfirm = false
			window.location.reload()
		},
		//确认提交
		confirmCompanyAuth: function () {
			if (this.checkCompanyAuthPage() == true) {
				var token = getUsermessage().token
				var AuthType = '企业认证'
				var Name = this.douyinName //抖音名
				var CorpName = this.companyName //公司名
				var CorpId = this.companyId //执照
				var CorpLicense = this.companyIdUrl //执照图片
				var CorpPermit = this.permitUrl //许可证图片
				var AuthPub = this.authUrl //认证公函
				var CorpUser = this.operateName //运营人姓名
				var CorpPhone = this.operatePhone //运营人电话
				var Code = this.phoneCheckCode //手机验证码
				var _this = this
				axios.post('http://dou.fudayiliao.com/account/Update', {
					Token: token,
					CorpName: CorpName,
					Name: Name,
					CorpId: CorpId,
					CorpLicense: CorpLicense,
					CorpPermit: CorpPermit,
					AuthPub: AuthPub,
					CorpUser: CorpUser,
					CorpPhone: CorpPhone,
					Code: Code,
					AuthType: AuthType
				}, {
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				}).then(function (res) {
					_this.isConfirm = true
					
					//_this.$refs.auth_form.reset()
					return false
					console.log(res)
				})
			}
		},
		//checkCompanyAuth
		//自定义token
		createToken: function () {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		},
		getImgCheckCode: function () {
			this.createdToken = this.createToken()
			console.log(this.createdToken)
			this.imgCheckCodeUrl = 'http://dou.fudayiliao.com/account/getcode/' + this.createdToken
			console.log(this.imgCheckCodeUrl)
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
		//获取验证码
		getPhoneCode: function () {
			if (this.operatePhone == '') {
				alert('请您先输入电话号码')
				return false
			}
			if (this.checkPhone(this.operatePhone) == false) {
				alert('请您输入正确的手机号')
				return false
			} else {
				this.isLetPhoneCode = false
				var tInterval, num = 5
				var _this = this
				tInterval = setInterval(function () {
					_this.phoneCodeBtn = num + "s"
					console.log(_this.phoneCodeBtn)
					num--
					if (num < 0) {
						clearInterval(tInterval)
						_this.phoneCodeBtn = '获取验证码'
						_this.isLetPhoneCode = true
						return false
					}
				}, 1000)
				var Key = this.createdToken
				var Data = this.imgCheckCode
				var url = 'http://dou.fudayiliao.com/account/GetSmsCode/' + this.operatePhone
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
		//同意协议
		changeAgree: function () {
			this.isAgree = !this.isAgree
		},
		//图片上传是验证图片
		beforeUpload(file) {
			var fileSize = 5 * 1024 //500k 
			var fileType1 = 'JPG'
			var fileType2 = 'JPEG'
			var uploadFileType = file.type.split('/')[1]
			var uploadFileSize = file.size
			console.log(uploadFileType)
			console.log(fileType2.toLowerCase())
			if (uploadFileType != fileType1 && uploadFileType != fileType2 && uploadFileType != fileType1.toLowerCase() && uploadFileType != fileType2.toLowerCase()) {
				alert('图片只支持JPG或者JPEG格式')
				return false
			}
			if (uploadFileSize > fileSize) {
				alert('图片大小不能超过500k')
				return false
			} else {
				return true
			}
		},
		choosedAuth: function (index) {
			this.choosedAuthIndex = index
		},
		/* uploadCardFace:function(){
			var file = this.$refs.upload_idcard_face.files[0]
			var formData = new FormData()
			formData.append('file',file)

		}, */
		uploadCardFace: function (event, ref, attr) {
			console.log(this.$refs[ref])
			var file = this.$refs[ref].files[0]
			console.log(file)
			if (this.beforeUpload(file) == true) {
				var formData = new FormData()
				//var file = this.$refs.upload_idcard_face.files[0]
				formData.append('path', file)
				var _this = this
				console.log(formData.get('path'))
				var instance = axios.create()
				instance({
					url: 'http://dou.fudayiliao.com/account/ImageUpload',
					method: 'post',
					transformRequest: [function (data) {
						// 对 data 进行任意转换处理
						return data;
					}],
					data: formData
				}).then(function (res) {
					console.log(res)
					//console.log(_this)
					console.log(attr)
					_this[attr] = "http://dou.fudayiliao.com" + res.data.Data
					console.log(_this[attr])
				})
			}
		},
		/* 		openFile: function (index) {
					this.$refs.upload_idcard_face.click() //模拟点击
				}, */
		/* 		checkPersonalAuth: function () {
					var realName = this.userRealName
					var isUploadFace = this.idcardFaceURL //不为false
					var idUploadBack = this.idcardBackURL
					if (realName == '') {
						alert('真实姓名为必填选项')
						return false
					}
					if (isUploadFace == false) {
						alert('个人身份证正面还未上传哦!')
						return false
					}
					if (idUploadBack == false) {
						alert('个人身份证国徽面还未上传哦!')
						return false
					} else {
						return true
					}
				}, */
		checkCompanyAuthPage: function () {
			var douyinName = this.douyinName //抖音名
			var companyName = this.companyName //公司名
			var companyId = this.companyId //执照
			var companyIdUrl = this.companyIdUrl //执照图片
			var permitUrl = this.permitUrl //许可证图片
			var authUrl = this.authUrl //认证公函
			var operateName = this.operateName //运营人姓名
			var operatePhone = this.operatePhone //运营人电话
			var phoneCheckCode = this.phoneCheckCode //手机验证码
			if (douyinName == '' || companyName == '' || companyId == '') {
				alert('输入框均为必填选项,请您填写完整!')
				return false
			}
			if (companyIdUrl == false) {
				alert('营业执照还未上传!')
				return false
			}
			if (permitUrl == false) {
				alert('行业许可证还未上传!')
				return false
			}
			if (authUrl == false) {
				alert('认证公函还未上传!')
				return false
			}
			if (operateName == '' || operatePhone == '' || phoneCheckCode == '') {
				alert('输入框均为必填选项,请您填写完整!')
				return false
			} else {
				return true
			}
		},
		//提交企业认证
		submitAuth: function () {
			var token = getUsermessage().token
			var _this = this
			if (this.checkCompanyAuthPage() == true) {
				var AuthType = '企业认证' //认证类型
				var douyinName = this.douyinName //抖音名
				var companyName = this.companyName //公司名
				var companyId = this.companyId //执照
				var companyIdUrl = this.companyIdUrl //执照图片
				var permitUrl = this.permitUrl //许可证图片
				var authUrl = this.authUrl //认证公函
				var operateName = this.operateName //运营人姓名
				var operatePhone = this.operatePhone //运营人电话
				var phoneCheckCode = this.phoneCheckCode //手机验证码
				axios.post('http://dou.fudayiliao.com/account/Update', {
					Token: token,
					Name: douyinName,
					DouyinId: DouyinId,
					AuthType: AuthType,
					CorpId: CorpId,
					CorpName: CorpName,
					Face: Face,
					FaceBack: FaceBack,
					RealName: RealName
				}, {
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				}).then(function (res) {
					if (res.data.Code == 11) {
						userLoginOut()
					}
					//console.log(res)
					alert('资料提交完成,请您重新登录')
					userLoginOut()
				})
			}


		},
		dyNameFocus: function () {
			if (this.douyinNameVal == getUsermessage().userName) {
				this.douyinNameVal = ''
			}
		},
		dyNameBlur: function () {
			if (this.douyinNameVal == '') {
				this.douyinNameVal = getUsermessage().userName
			}
		},
		dyIdFocus: function () {
			if (this.douyinNameVal == getUsermessage().DouyinId) {
				this.douyinNameVal = ''
			}
		},
		dyIdBlur: function () {
			if (this.douyinNameVal == '') {
				this.douyinNameVal = getUsermessage().DouyinId
			}
		},
		/* 		inputFocus: function () {
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
				} */
	},
	computed: {
		watchPhoneCodeBtn: function () {
			return this.phoneCodeBtn
		}
	},
	mounted: function () {
		/* this.userCellphoneNumber = getUsermessage().cellphoneNumber
		this.douyinNumberVal = getUsermessage().douyinId
		this.douyinNameVal = getUsermessage().userName */
		this.getImgCheckCode()
	}
})