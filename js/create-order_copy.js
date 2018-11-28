/*axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';*/
var app = new Vue({
  el: '#create_box',
  data: {
    nowIndex: 0,
    nowPayIndex:0,
    nowPayAutoIndex:0,
	orderType:'智能投放',
    payNumberValue:100,//充值金额
    customPayNumber:'¥ 请输入金额',//自定义充值金额
    isShowDefaultValue:false,
    userAgeIndex:[1],
    userSexIndex:0,
    userRegionIndex:0,
    clickProviceIndex:0,//控制显示省
    isShowcitiesIndex:0,//控制显示城市
    //chooseProviceArray:[0],
    chooseProviceIndex:0,//单选择省
    choosecitiesArray:[0],//多选择市数组
    chooseCitiesIndex:0,//单选城市
    chooseCountiesArray:[0],//多选县区数组
    chooseCountiesIndex:0,//单选县区
    chooseCirclesArray:[0],//多选商圈数组
    //chooseCountiesIndex:0,//单选县区
    ischooseCitiesRadio:false,//控制城市是否单选
    ischooseCountiesRadio:false,//控制区县是否单选
    orderLink:'请输入您所要投放的链接',
    orderTypeName:'',
    userSex:'不限',
    userAge:'18-22岁',
    choosedValue:'全国',//已经选择地区
    choosedSex:'不限',//选择的性别
    choosedAge:['18-23岁'],//选择的年龄数组
    chooseRegionTitle:'',//地域选择的title值
    choosedRegion:'',//已经选择的地区
    choosedFlag:false,//是否已经选择过地区
    isShowCustomForm:true,
    isShowProvince:false,
    isShowProvinceTrueIndex:false,
    orderTypeLists:[
        {
            name:'系统智能投放',
            orderTypeName:'autoType',
            isChecked:true,
            isCustom:false
        },
        {
            name:'自定义定向投放',
            orderTypeName:'customType',
            isChecked:false,
            isCustom:false
        }
    ],
    PayLists:[
        {
            name:'投放金额'
        },
        {
            name:'自定义投放'
        }
    ],
    payNumberList:[
        {
            name:'¥ 100',
            value:100
        },
        {
            name:'¥ 200',
            value:200
        },
        {
            name:'¥ 500',
            value:500
        },
        {
            name:'¥ 1000',
            value:1000
        },
        {
            name:'¥ 2000',
            value:2000
        },
    ],
    sexLists:['不限','男','女'],
    ageLists:['不限','18-22岁','20-40岁','40岁+'],
    regionLists:['全国','省市','县区','商圈','附近'],
    proviceLists:[]
  },
  methods:{
    confirmOrder:function(){
		this.getToken()
		var token = this.getToken().token
		var OrderType = this.orderType;
		//alert(token)
        var link = this.orderLink
        var customData = this.choosedSex.toString()+this.choosedAge.toString()+this.choosedValue 
        var payNumber = this.payNumberValue
        //var data = "链接:"+link+"用户自定义信息:"+customData+"投放金额:"+payNumber
        var _this = this//指向vue实例
        axios.post('http://dou.fudayiliao.com/order/Submit',{
            Url: link,//投放链接
			OrderType:OrderType,
            Sex: _this.choosedSex.toString(),//目标性别
            Age:_this.choosedAge.toString(),//目标年龄
            Region:_this.choosedValue,//目标地域
            Serving:'5000',//播放量暂时没做
            Money:payNumber,//投放金额
            Token:token//token值
          },{
			headers: { 'content-type': 'application/x-www-form-urlencoded' }
		})
          .then(function (response) {
			if(response.data.Code == 11){
                  alert('请重新登录')
             }else{
				alert('订单提交成功!')
				window.location.href = '/order_center'
				console.log(response);
            	console.log('axios is done') 
			 }
			
            
          })
          .catch(function (error) {
            console.log(error);
          });
        //console.log(data)
    },
	getToken:function(){
        var cookieObj = {};
        var cookieArray = document.cookie.split('; ')
        for(var i=0;i<cookieArray.length;i++){
            var cookiesplit = cookieArray[i].split('=')
            cookieObj[cookiesplit[0].toString()] = cookiesplit[1].toString()	
        }
        console.log(cookieObj)
        //getUserName(cookieObj.userName)
        //$(".flied_tc").removeClass('show');//隐藏登录框
        return cookieObj
        //alert(cookieObj.token)
    },
    confirmProvice:function(index){
        console.log(index+'测试index')
        //this.isShowProvince = false
        this.showProvinceForm(false)
        console.log(this.isShowProvince)
    },
    getChoosedValue:function(){
        //console.log(this.chooseProviceIndex+'index')
        var choosedProvice = this.proviceLists[this.chooseProviceIndex].name//省名字
        if(this.ischooseCitiesRadio == false){//城市多选时
            var choosedCitiesArray = this.choosecitiesArray;//多选择市数组
            //console.log(choosedCitiesArray+"市区数组")
            var choosedCitiesName = []
            for(var i = 0;i < choosedCitiesArray.length;i++){
                var item = choosedCitiesArray[i]
                //console.log(item+"遍历市区数组值")
                var thisCities = this.proviceLists[this.chooseProviceIndex].cities
                //console.log(thisCities.length+'省级下市区的长度')
                choosedCitiesName.push(thisCities[item].name)
                //console.log(thisCities[item].name+'市区的名字'+"item"+item)
            }
            //console.log(choosedCitiesName+'----------市区名称的数组')
            var choosedCitiesString = choosedCitiesName.join(',')
            //console.log(choosedCitiesString)
            this.choosedValue = choosedProvice+"-"+choosedCitiesString
        }
        if(this.ischooseCitiesRadio == true){//城市单选时
            var _this = this.proviceLists[this.chooseProviceIndex].cities
            var choosedRadioCities = _this[this.chooseCitiesIndex].name//单选的城市名称
            if(this.ischooseCountiesRadio == false){
                var choosedCountiesArray = this.chooseCountiesArray;//多选择区数组
                //console.log(choosedCitiesArray+"市区数组")
                var choosedCountiesName = []
                for(var i = 0;i < choosedCountiesArray.length;i++){
                    var item = choosedCountiesArray[i]
                    choosedCountiesName.push(_this[this.chooseCitiesIndex].counties[item].name)
                } 
                this.choosedValue  = choosedProvice+'-'+ choosedRadioCities+"---"+choosedCountiesName.join(',')
            }else{
                var choosedRadioCounties = _this[this.chooseCitiesIndex].counties[this.chooseCountiesIndex].name//单选,县区的名字
                var choosedCirclesName = []
                var choosedCirclesArray = this.chooseCirclesArray;//多选择区数组
                for(var i = 0;i < choosedCirclesArray.length;i++){
                    var item = choosedCirclesArray[i]
                    choosedCirclesName.push(_this[this.chooseCitiesIndex].counties[this.chooseCountiesIndex].circles[item].name)
                }
                this.choosedValue  = choosedProvice+'-'+ choosedRadioCities+"-"+choosedRadioCounties+"---"+choosedCirclesName.join(',') 
            }
            
        }
/*         if(this.ischooseCitiesRadio == true && this.ischooseCountiesRadio == true){//都单选时

        } */
        
        
    },
    chooseAll:function(index,attr){//全选
        //this.getChoosedValue()
       var _this = this.proviceLists[this.chooseProviceIndex]
       //console.log(_this[attr].length)
       this.chooseCountiesArray = []
       if(this.ischooseCitiesRadio == false){
            for(var i = 0 ;i < _this.cities.length;i++){
                this.choosecitiesArray.push(i)
            }
            
       }else{
            //console.log(_this.cities[this.chooseCitiesIndex].counties.length+'--------------counties')
            for(var i = 0 ;i < _this.cities[this.chooseCitiesIndex].counties.length;i++){
                this.chooseCountiesArray.push(i)
            }
            if(this.ischooseCountiesRadio == true){//县区单选时
                for(var i = 0 ;i < _this.cities[this.chooseCitiesIndex].counties[this.chooseCountiesIndex].circles.length;i++){
                    this.chooseCirclesArray.push(i)
                }
            }
       } 
       
       this.getChoosedValue()
       //console.log(this.choosecitiesArray)
    },
    chooseCircles:function(index){//选择商圈
        if(this.chooseCirclesArray.indexOf(index) == -1){
            this.chooseCirclesArray.push(index)
            console.log(this.chooseCirclesArray+'城市数组')
        }else{
            //找到点击的index在数组中的位置
            for(var i=0;i<this.chooseCirclesArray.length;i++){
                if(this.chooseCirclesArray[i] == index){//i为点击的数字在数组中的位置
                    this.chooseCirclesArray.splice(i,1)
                }
            }
        }
        this.getChoosedValue()
    },
    chooseCounties:function(index){
        if(this.ischooseCountiesRadio == false){//区县单选时
            if(this.chooseCountiesArray.indexOf(index) == -1){
                this.chooseCountiesArray.push(index)
                console.log(this.chooseCountiesArray+'城市数组')
            }else{
                //找到点击的index在数组中的位置
                for(var i=0;i<this.chooseCountiesArray.length;i++){
                    if(this.chooseCountiesArray[i] == index){//i为点击的数字在数组中的位置
                        this.chooseCountiesArray.splice(i,1)
                    }
                }
            }
        }else{
            this.chooseCountiesIndex = index//8
            //alert(0)
        }
        
        this.getChoosedValue()
    },
    clearchooseAll:function(){
        this.choosecitiesArray = [0];
        this.chooseCountiesArray = [0];
    },
    chooseCities:function(index,length){ 
        //console.log()
        this.clearchooseAll()
        if(this.ischooseCitiesRadio == false){
            if(this.choosecitiesArray.indexOf(index) == -1){
                this.choosecitiesArray.push(index)
                console.log(this.choosecitiesArray+'城市数组')
            }else{
                //找到点击的index在数组中的位置
                for(var i=0;i<this.choosecitiesArray.length;i++){
                    if(this.choosecitiesArray[i] == index){//i为点击的数字在数组中的位置
                        this.choosecitiesArray.splice(i,1)
                    }
                }
            }
        }else{
            this.chooseCitiesIndex = index
        }    
        this.getChoosedValue()
    },
    showProvinceForm:function(attr){
        this.isShowProvince = attr
    },
    chooseProvice:function(index){
        this.isShowcitiesIndex = index
        this.chooseProviceIndex = index
        //this.choosecitiesArray = []
        this.clearchooseAll()
        this.getChoosedValue(index)
        
    },
    chooseRegion:function(index,attr,array){
        if(index === 0){
            this.choosedValue = '全国'
            this.showProvinceForm(false)
            this.ischooseCitiesRadio = false
        }else if(index === 1){
            this.chooseRegionTitle = '按省市选择'
            this.showProvinceForm(true)
            this.ischooseCitiesRadio = false
        }else if(index === 2){
            this.chooseRegionTitle = '按区县选择'
            this.showProvinceForm(true)
            this.ischooseCitiesRadio = true
        }else if(index === 3){
            this.chooseRegionTitle = '按商圈选择'
            this.showProvinceForm(true)
            this.ischooseCitiesRadio = true//城市变为单选
            this.ischooseCountiesRadio = true//区县为单选
        }else{
            this.showProvinceForm(false)
            this.ischooseCitiesRadio = false//城市变为单选
            
        }
        if(this.choosedFlag == true && index != this.userRegionIndex){
            alert('地域只支持单选,如果选择其他区域,已选择的地域将会失效')
        }
        this.choosedFlag = true//改变状态,证明已经选择过地区了
        //this.chooseParmas(index,attr,array)
        this[attr] = index//单选事件,改变单选的值
        //var _this = this //es5
          
    },
    //年龄选择按钮
    chooseAge:function(index){
        if(this.userAgeIndex.indexOf(index) === -1){
            this.userAgeIndex.push(index)
        }else{
            //找到点击的index在数组中的位置
            for(var i=0;i<this.userAgeIndex.length;i++){
                if(this.userAgeIndex[i] == index){//i为点击的数字在数组中的位置
                    this.userAgeIndex.splice(i,1)

                }
            } 
        }
        var choosedAgeArray = []
        for(var j=0;j<this.userAgeIndex.length;j++){
            
            choosedAgeArray.push(this.ageLists[j])  
            //console.log(this.ageLists[j]+'年龄组')
        }
        this.choosedAge = choosedAgeArray
        console.log(choosedAgeArray+"---------------已经改变的年龄组")

    },
    choosePayAuto:function(index){
        this.nowPayAutoIndex = index
        this.payNumberValue = this.payNumberList[index].value
    },
    //单选按钮,改变单选的值,改变已经选择的值
    chooseParmas:function(index,attr,array){
        this[attr] = index
        var _thisArray = this[array]//取得对应数组的值
        this.choosedSex = _thisArray[index]
    },
    confirmCustomPay:function(){
        this.payNumberValue = this.customPayNumber
        this.nowPayIndex = 2
    },
    choosePayNumber:function(index){
        this.nowPayIndex = index
    },
    chooseOrderType:function(index){
        this.nowIndex = index
        this.orderTypeName = this.orderTypeLists[index].orderTypeName
        //选择投放方式后,显示默认值
        if(index === 1){//选择自定义投放之后
			this.orderType = '自定义投放'
            this.isShowDefaultValue = true//是否显示默认选中的值
            if(this.proviceLists.length == 0){//只获取一次,有值就不再获取
                var _this = this //es5
                axios.get('https://easy-mock.com/mock/5bc6c497d50e8869d9d12d3e/example/getRegion')
                .then(function(res){//需要使用箭头函数
                    console.log(_this)
                    _this.proviceLists = res.data//给本地数组赋值,值就是大的json文件
                   //_this.isShowProvince = true//!_this.isShowProvince
                    console.log(_this.proviceLists)
                })
            }   
        }else{
			this.orderType = '智能投放'
            this.isShowDefaultValue = false
        }
        //console.log(this.orderTypeName)
    },  
    inputFocus: function(){
        if(this.orderLink == '请输入您所要投放的链接'){
            this.orderLink = ''
        }
        if(this.customPayNumber == '¥ 请输入金额'){
            this.customPayNumber = ''
        }
    },
    inputBlur:function(){
        if(this.orderLink == ''){
            this.orderLink = '请输入您所要投放的链接'
        }
        if(this.customPayNumber == ''){
            this.customPayNumber = '¥ 请输入金额'
        }
    }
  },
})
