 /*  function uploadCardFace() {
	$("#auth_idcard_face").ajaxSubmit({
		url: "http://dou.fudayiliao.com/account/ImageUpload",
		type: "post",
		success: function (data) {
			console.log(data)
			if (data.status != "BAD") {
				alert('成功')
			}
		}
	});
} */ 

var app = new Vue({
	el: '#dymain',
	data: {
		douyinNameVal: '请输入您要投放的抖音昵称',
		douyinNumberVal: '请输入您要投放的抖音号',
		userCellphoneNumber: '', //用户手机号
		choosedAuthIndex: 0, //已经选择的认证方式的索引值
		file: '',
		src: '',
		authenticationLists: [ //认证方式列表
			'个人认证',
			'企业认证'
		]
	},
	methods: {
		choosedAuth: function (index) {
			this.choosedAuthIndex = index
		},
		/* uploadCardFace:function(){
			var file = this.$refs.upload_idcard_face.files[0]
			var formData = new FormData()
			formData.append('file',file)

		}, */
		uploadCardFace: function (event) {
			var Gid = '00000000-0000-0000-0000-000000000000'
			event.preventDefault(); //取消默认行为
			this.file = event.target.files[0]; //获取文件
			var windowURL = window.URL || window.webkitURL;
			this.file = event.target.files[0]; //获取文件
			this.src = windowURL.createObjectURL(event.target.files[0]);
			var formData = new FormData()
			//var file = this.$refs.upload_idcard_face.files[0]
			formData.append('file', this.file)
			//formData.append('Gid', Gid)
			console.log(formData)
			var instance=axios.create({
				withCredentials: true
			   }) 
			axios.post('http://dou.fudayiliao.com/account/ImageUpload', {
				formData
			} , {
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}

			} ).then(function(res){
				console.log(res)
			})
		},
		openFile: function (index) {
			this.$refs.upload_idcard_face.click() //模拟点击
		},
		//提交信息
		submitUserMessage: function () {
			var token = getUsermessage().token
			var _this = this
			axios.post('http://dou.fudayiliao.com/account/Update', {
				Token: token,
				Name: _this.douyinNameVal,
				DouyinId: _this.douyinNumberVal
			}, {
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			}).then(function (res) {
				if (res.data.Code == 11) {
					userLoginOut()
				}
				alert('提交成功')
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