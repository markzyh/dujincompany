var app = new Vue({
	el: '#dymain',
	data: {
		isShowProblems:false,
		screenHeight:100
	},
	methods: {
		showProblems:function(){
			this.isShowProblems = true
		},
		closeProblems:function(){
			this.isShowProblems = false
		}
	},
	mounted: function () {
		
	}
})
