var app = new Vue({
	el: '#dymain',
	data: {
		choosedInvoiceIndex:0,//是否选择发票列表索引
		isAgree: false, //是否同意协议
		douyinNameVal: '',
		douyinNumberVal: '',
		userCellphoneNumber: '', //用户手机号
		choosedAuthIndex: 0, //已经选择的认证方式的索引值
		companyName:'',//企业名称  
		companyNumber:'', //营业执照注册号
		file: '',
		src: '',
		companyIdUrl:false,//企业营业执照图片链接
		industryCardURL:false,//行业许可证照片链接
		userRealName: '', //用户真实姓名
		isGetInvoiceLists: [ //是否需要发票列表
			'索要发票',
			'我放弃索要发票'
		]
	},
	methods: {
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
		checkPersonalAuth: function () {
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
		},
		checkCompanyAuth:function(){
			var companyName = this.companyName
			var companyNumber = this.companyNumber
			var isUploadCompany = this.companyIdUrl
			var isUploadIndustry = this.industryCardURL
			if(companyName == '' || companyNumber == ''){
				alert('企业名称和营业执照注册号为必填选项!')
				return false
			}
			if(isUploadCompany == false){
				alert('营业执照还未上传!')
				return false
			}
			if (isUploadIndustry == false) {
				alert('行业许可证还未上传!')
				return false
			} else {
				return true
			}
		},
		//提交信息
		submitUserMessage: function () {
			var token = getUsermessage().token
			var _this = this
			var RealName = this.userRealName
			var Name = this.douyinNameVal//用户昵称
			var DouyinId = this.douyinNumberVal//抖音id
			var AuthType = this.authenticationLists[this.choosedAuthIndex]//认证类型
			var CorpId = this.companyNumber//公司id
			var CorpName = this.companyName//公司名称
			var Face,FaceBack//身份或者营业执照,行业许可证
			if (!Name || !DouyinId) {
				alert('请填写您的抖音昵称和抖音号!')
				return false
			}
			if (this.choosedAuthIndex == 0) { //个人认证的时候
				if (this.checkPersonalAuth() == false) {
					return false
				}
				Face = this.idcardFaceURL//身份证
				FaceBack = this.idcardBackURL//背面
			}
			if(this.choosedAuthIndex == 1){//企业认证的时
				if(this.checkCompanyAuth() == false){
					return false
				}
				Face = this.companyIdUrl//营业执照
				FaceBack = this.industryCardURL//行业许可证
			}
			//alert('成功')
			axios.post('http://dou.fudayiliao.com/account/Update', {
				Token: token,
				Name: Name,
				DouyinId: DouyinId,
				AuthType:AuthType,
				CorpId:CorpId,
				CorpName:CorpName,
				Face:Face,
				FaceBack:FaceBack,
				RealName:RealName
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
	mounted: function () {
		this.userCellphoneNumber = getUsermessage().cellphoneNumber
		this.douyinNumberVal = getUsermessage().douyinId
		this.douyinNameVal = getUsermessage().userName
	}
})