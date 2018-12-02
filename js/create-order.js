function openMap() {
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);

    function myFun(result) {
        var cityName = result.name;
        map.setCenter(cityName);
    }
    var myCity = new BMap.LocalCity();
    myCity.get(myFun);
    console.log(map)
    return map
}
//输入地址的地图
function localMap() {
    var _thisMap = openMap()
    setTimeout(function () { //异步是因为实例化地图对象需要重做一遍,需要时间
        _thisMap.clearOverlays() //先清除地图标注
        console.log(_thisMap)
        values = $(".input_address").val();
        var myGeo = new BMap.Geocoder();
        myGeo.getPoint(values, function (point) {
            console.log(_thisMap)
            if (point) {
                var mPoint = new BMap.Point(point.lng, point.lat);
                _thisMap.enableScrollWheelZoom();
                _thisMap.centerAndZoom(mPoint, 12);
                var marker = new BMap.Marker(mPoint); // 创建标注    
                _thisMap.addOverlay(marker);
                var range = $("#dist-sel input:checked").val();
                var circle = new BMap.Circle(mPoint, range, {
                    fillColor: "blue",
                    strokeWeight: 1,
                    fillOpacity: 0.2,
                    strokeOpacity: 0.2
                });
                _thisMap.addOverlay(circle);
            }
        }, 'myFun');
    }, 200)
}
var app = new Vue({
    el: '#dymain',
    data: {
        douyinId: '', //抖音Id
        userName: '', //用户抖音昵称
        userInputAddressName: '', //用户输入的地址
        oldAddress:'',
        isPaySuccess: false, //最后,是否提交成功
        successCountDownNumber: 3, //成功后的倒计时
        userIsLogin: false, //用户是否登录
        nowIndex: 0, //投放方式的index值
        nowPayIndex: 0,
        incrementNumber: 40000, //预计播放提升量
        nowPayAutoIndex: 3, //点击选择充值金额的index
        payNumberValue: 800, //充值金额
        customPayNumber: '¥ 请输入金额', //自定义充值金额
        isShowDefaultValue: false,
        userAgeIndex: [1],
        userSexIndex: 0,
        userRegionIndex: 0,
        clickProviceIndex: 0, //控制显示省
        isShowcitiesIndex: 0, //控制显示城市
        //chooseProviceArray:[0],
        chooseProviceIndex: 0, //单选择省
        choosecitiesArray: [0], //多选择市数组
        chooseCitiesIndex: 0, //单选城市
        chooseCountiesArray: [0], //多选县区数组
        chooseCountiesIndex: 0, //单选县区
        chooseCirclesArray: [0], //多选商圈数组
        //chooseCountiesIndex:0,//单选县区
        ischooseCitiesRadio: false, //控制城市是否单选
        ischooseCountiesRadio: false, //控制区县是否单选
        orderLink: '请输入您所要投放的链接',
        orderTypeName: '智能投放', //投放方式
        userSex: '不限',
        userAge: '18-22岁',
        submitAddress: '', //手动输入的地址
        choosedValue: '全国', //已经选择地区
        choosedSex: '不限', //选择的性别
        choosedAge: ['18-23岁'], //选择的年龄数组
        chooseRegionTitle: '', //地域选择的title值
        choosedRegion: '', //已经选择的地区
        choosedFlag: false, //是否已经选择过地区
        isShowCustomForm: true,
        isShowProvince: false,
        isShowProvinceTrueIndex: false,
        submitAddressRangeList: [ //手动输入地址覆盖的范围
            {
                name: '1km',
                value: 1
            },
            {
                name: '5km',
                value: 5
            },
            {
                name: '8km',
                value: 8
            }
        ],
        orderTypeLists: [{
                name: '系统智能投放',
                orderTypeName: '系统智能投放',
                isChecked: true,
                isCustom: false
            },
            {
                name: '自定义定向投放',
                orderTypeName: '自定义定向投放',
                isChecked: false,
                isCustom: false
            }
        ],
        PayLists: [{
                name: '投放金额'
            },
            {
                name: '自定义投放'
            }
        ],
        payNumberList: [{
                name: '¥ 100',
                value: 100
            },
            {
                name: '¥ 200',
                value: 200
            },
            {
                name: '¥ 500',
                value: 500
            },
            {
                name: '¥ 800',
                value: 800
            },
            {
                name: '¥ 1000',
                value: 1000
            },
            {
                name: '¥ 1500',
                value: 1500
            },
            {
                name: '¥ 2000',
                value: 2000
            },
            {
                name: '¥ 2500',
                value: 2500
            },
            {
                name: '¥ 3000',
                value: 3000
            },
            {
                name: '¥ 3500',
                value: 3500
            },
            {
                name: '¥ 4000',
                value: 4000
            },
        ],
        sexLists: ['不限', '男', '女'],
        ageLists: ['不限', '18-23岁', '24-40岁', '40岁+'],
        regionLists: ['全国', '省市', '区县', '商圈', '附近'],
        proviceLists: [],
        choosedRangeIndex: 0, //已经选择的辐射范围的数组下标
        addNearbyKm: '+添加', //添加辐射km按钮的值
        choosedRangeValue: 4000, //单选按钮,选择的辐射范围的具体值
        choosedNearbyLists: [], //已经选择完附近,添加了的记录的数组
        customRangeLists: [ //自定义商圈的辐射范围数组
            {
                name: '6km',
                value: 6000
            },
            {
                name: '8km',
                value: 8000
            },
            {
                name: '10km',
                value: 10000
            },
            {
                name: '12km',
                value: 12000
            },
            {
                name: '15km',
                value: 15000
            }
        ]
    },
    methods: {
        confirmOrder: function () {
            if (this.orderLink == '' || this.orderLink == '请输入您所要投放的链接') {
                alert('投放链接不能为空')
                return false
            }
            var _this = this
            var token = getUsermessage().token
            //debugger
            //console.log(this)
            var orderTypeName = this.orderTypeName
            var link = this.orderLink
            //var customData = this.choosedSex.toString()+this.choosedAge.toString()+this.choosedValue 
            var payNumber = this.payNumberValue
            //var data = "链接:"+link+"用户自定义信息:"+customData+"投放金额:"+payNumber
            //console.log(data)
            axios.post('http://dou.fudayiliao.com/order/Submit', {
                    Url: link, //投放链接
                    OrderType: orderTypeName,
                    Sex: _this.choosedSex.toString(), //目标性别
                    Age: _this.choosedAge.toString(), //目标年龄
                    Region: _this.choosedValue, //目标地域
                    Serving: _this.increNumber, //播放量暂时没做
                    Money: payNumber, //投放金额
                    Token: token //token值
                }, {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(function (res) {
                    if (res.data.Code == 11) {
                        //alert('登录状态已过期,请重新登录')
                        userLoginOut() //退出登录
                    } else {
                        console.log(res);
                        console.log('put in is done')
                        _this.isPaySuccess = true
                        var interval = setInterval(function () { //倒计时
                            _this.successCountDownNumber--
                            if (_this.successCountDownNumber == 0) {
                                clearInterval(interval)
                                window.location.href = "/order_center.html"
                                //alert('订单完成!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                            }
                        }, 1000)

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //选择地域最下面的确认按钮,只用来关闭窗口
        confirmProvice: function (index) {
            console.log(index + '测试index')
            //this.isShowProvince = false
            this.showProvinceForm(false)
            console.log(this.isShowProvince)
        },
        getChoosedValue: function () {
            //console.log(this.chooseProviceIndex+'index')
            var choosedProvice = this.proviceLists[this.chooseProviceIndex].name //省名字
            if (this.ischooseCitiesRadio == false) { //城市多选时
                var choosedCitiesArray = this.choosecitiesArray; //多选择市数组
                //console.log(choosedCitiesArray+"市区数组")
                var choosedCitiesName = []
                for (var i = 0; i < choosedCitiesArray.length; i++) {
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
                this.choosedValue = choosedProvice + "-" + choosedCitiesString
            }
            if (this.ischooseCitiesRadio == true) { //城市单选时
                var _this = this.proviceLists[this.chooseProviceIndex].cities
                var choosedRadioCities = _this[this.chooseCitiesIndex].name //单选的城市名称
                if (this.ischooseCountiesRadio == false) {
                    var choosedCountiesArray = this.chooseCountiesArray; //多选择区数组
                    //console.log(choosedCitiesArray+"市区数组")
                    var choosedCountiesName = []
                    for (var i = 0; i < choosedCountiesArray.length; i++) {
                        var item = choosedCountiesArray[i]
                        choosedCountiesName.push(_this[this.chooseCitiesIndex].counties[item].name)
                    }
                    this.choosedValue = choosedProvice + '-' + choosedRadioCities + "---" + choosedCountiesName.join(',')
                } else {
                    var choosedRadioCounties = _this[this.chooseCitiesIndex].counties[this.chooseCountiesIndex].name //单选,县区的名字
                    var choosedCirclesName = []
                    var choosedCirclesArray = this.chooseCirclesArray; //多选择区数组
                    for (var i = 0; i < choosedCirclesArray.length; i++) {
                        var item = choosedCirclesArray[i]
                        choosedCirclesName.push(_this[this.chooseCitiesIndex].counties[this.chooseCountiesIndex].circles[item].name)
                    }
                    this.choosedValue = choosedProvice + '-' + choosedRadioCities + "-" + choosedRadioCounties + "---" + choosedCirclesName.join(',')
                }

            }
            /*         if(this.ischooseCitiesRadio == true && this.ischooseCountiesRadio == true){//都单选时

                    } */


        },
        chooseAll: function (index, attr) { //全选
            //this.getChoosedValue()
            var _this = this.proviceLists[this.chooseProviceIndex]
            //console.log(_this[attr].length)
            //this.chooseCountiesArray = []
            this.clearchooseAll() //全选前先全部清空数组
            /* if(this.ischooseCitiesRadio == false){
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
            }  */
            if (this.userRegionIndex === 1) { //省市选择
                //alert(0)
                for (var i = 0; i < _this.cities.length; i++) {
                    this.choosecitiesArray.push(i)
                }
            } else if (this.userRegionIndex === 2) { //区选择
                for (var i = 0; i < _this.cities[this.chooseCitiesIndex].counties.length; i++) {
                    this.chooseCountiesArray.push(i)
                }
            } else if (this.userRegionIndex === 3) { //商圈选择
                for (var i = 0; i < _this.cities[this.chooseCitiesIndex].counties[this.chooseCountiesIndex].circles.length; i++) {
                    this.chooseCirclesArray.push(i)
                }
            }
            this.getChoosedValue()
            //console.log(this.choosecitiesArray)
        },
        //删除一天附近投放记录
        deleteChoosedNearby:function(index){
            this.choosedNearbyLists.splice(index,1)
            this.oldAddress = ''

        },
        //添加一条附近投放的记录
        addNearbyKmList: function () {

            if(this.oldAddress != '' && this.oldAddress == this.userInputAddressName){
                alert('地址重复了')
                return false
            }
            var address = this.userInputAddressName
            this.oldAddress = this.userInputAddressName
            var km = this.customRangeLists[this.choosedRangeIndex].name
            var obj = {
                name: address,
                km: km
            }
            if (address == '') {
                alert('地址为空,请您先输入您要投放的地址')
                return false
            } else {
                this.choosedNearbyLists.push(obj) //将已经选择的,地域+km的对象,存入数组中
                var array = []
                for (var i = 0; i < this.choosedNearbyLists.length; i++) {//遍历数组,数组的每一项都是对象
                    array[i] = this.choosedNearbyLists[i].name.toString()+"    "+this.choosedNearbyLists[i].km.toString()
                }
                //this.choosedValue//这是最后提交时的地址
                this.choosedValue = array.join(',')
                console.log(this.choosedValue)
            }
        },
        //用户输入框输入地址,change事件
        userInputAddress: function () {
            //alert()
            if (this.userInputAddressName == '') {
                alert('请输入您要投放的具体地址')
            } else {
                localMap()
            }
        },
        //单选框change事件,显示改变的辐射范围
        showRange: function () {
            localMap()
        },
        //点击选择辐射范围,几km
        chooseNearbyKm: function (index) {
            this.choosedRangeIndex = index
            this.choosedRangeValue = this.customRangeLists[index].value
        },
        //选择附近
        chooseNearby: function () {
            openMap()

        },
        //选择商圈
        chooseCircles: function (index) { //选择商圈
            if (this.chooseCirclesArray.indexOf(index) == -1) {
                this.chooseCirclesArray.push(index)
                console.log(this.chooseCirclesArray + '城市数组')
            } else {
                //找到点击的index在数组中的位置
                for (var i = 0; i < this.chooseCirclesArray.length; i++) {
                    if (this.chooseCirclesArray[i] == index) { //i为点击的数字在数组中的位置
                        this.chooseCirclesArray.splice(i, 1)
                    }
                }
            }
            this.getChoosedValue()
        },
        chooseCounties: function (index) {
            if (this.ischooseCountiesRadio == false) { //区县单选时
                if (this.chooseCountiesArray.indexOf(index) == -1) {
                    this.chooseCountiesArray.push(index)
                    console.log(this.chooseCountiesArray + '城市数组')
                } else {
                    //找到点击的index在数组中的位置
                    for (var i = 0; i < this.chooseCountiesArray.length; i++) {
                        if (this.chooseCountiesArray[i] == index) { //i为点击的数字在数组中的位置
                            this.chooseCountiesArray.splice(i, 1)
                        }
                    }
                }
            } else {
                this.chooseCountiesIndex = index //8
                //alert(0)
            }

            this.getChoosedValue()
        },
        clearchooseAll: function () {
            this.choosecitiesArray = []
            this.chooseCountiesArray = []
            this.chooseCirclesArray = []
        },
        chooseCities: function (index, length) {
            //console.log()
            //this.clearchooseAll()
            if (this.ischooseCitiesRadio == false) {
                if (this.choosecitiesArray.indexOf(index) == -1) {
                    this.choosecitiesArray.push(index)
                    console.log(this.choosecitiesArray + '城市数组')
                } else {
                    //找到点击的index在数组中的位置
                    for (var i = 0; i < this.choosecitiesArray.length; i++) {
                        if (this.choosecitiesArray[i] == index) { //i为点击的数字在数组中的位置
                            this.choosecitiesArray.splice(i, 1)
                        }
                    }
                }
            } else {
                this.chooseCitiesIndex = index
            }
            this.getChoosedValue()
        },
        showProvinceForm: function (attr) {
            this.isShowProvince = attr
        },
        chooseProvice: function (index) {
            this.isShowcitiesIndex = index
            this.chooseProviceIndex = index
            //this.choosecitiesArray = []
            this.clearchooseAll()
            this.getChoosedValue(index)

        },
        //选择投放区域
        chooseRegion: function (index, attr, array) {
            if (index === 0) {
                this.choosedValue = '全国'
                this.showProvinceForm(false)
                this.ischooseCitiesRadio = false
            } else if (index === 1) {
                this.chooseRegionTitle = '按省市选择'
                this.showProvinceForm(true)
                this.ischooseCitiesRadio = false
            } else if (index === 2) {
                this.chooseRegionTitle = '按区县选择'
                this.showProvinceForm(true)
                this.ischooseCitiesRadio = true
            } else if (index === 3) {
                this.chooseRegionTitle = '按商圈选择'
                this.showProvinceForm(true)
                this.ischooseCitiesRadio = true //城市变为单选
                this.ischooseCountiesRadio = true //区县为单选
            } else if (index === 4) { //选择附近
                this.chooseRegionTitle = '自定义商圈'
                this.showProvinceForm(true) //显示悬浮框
                this.choosedValue = ''
                var _this = this
                setTimeout(function () { //异步的原因是v-if了,dom节点可能没有加载出来
                    _this.chooseNearby() //初始化地图    
                }, 20)
                //this.chooseNearby()//初始化地图
                //alert(0)
            } else {
                this.showProvinceForm(false)
                this.ischooseCitiesRadio = false //城市变为单选 
            }
            if (this.choosedFlag == true && index != this.userRegionIndex) {

                alert('地域只支持单选,如果选择其他区域,已选择的地域将会失效')
                this.choosedValue = '' //切换地域选择方式后,清空已经选择的
                this.clearchooseAll() //清空已经选择的,已经添加到数组中的值
                if(index === 0){
                    this.choosedValue = '全国'
                }
            }
            this.choosedFlag = true //改变状态,证明已经选择过地区了
            //this.chooseParmas(index,attr,array)
            this[attr] = index //单选事件,改变单选的值
            //var _this = this //es5

        },
        //年龄选择按钮
        chooseAge: function (index) {
            if (this.userAgeIndex.indexOf(index) === -1) {
                this.userAgeIndex.push(index)
            } else {
                //找到点击的index在数组中的位置
                for (var i = 0; i < this.userAgeIndex.length; i++) {
                    if (this.userAgeIndex[i] == index) { //i为点击的数字在数组中的位置
                        this.userAgeIndex.splice(i, 1)

                    }
                }
            }
            var choosedAgeArray = []
            for (var j = 0; j < this.userAgeIndex.length; j++) {

                choosedAgeArray.push(this.ageLists[j])
                //console.log(this.ageLists[j]+'年龄组')
            }
            this.choosedAge = choosedAgeArray
            console.log(choosedAgeArray + "---------------已经改变的年龄组")

        },
        //手动选择金额
        choosePayAuto: function (index) {
            if (index < this.autoPriceIndex) { //控制点击金额,如果小于computed值,就不做点击事件
                return false
            }
            if (index == 3) {
                this.incrementNumber = 40000
            }
            if (index == 4) {
                this.incrementNumber = 50000
            }
            if (index == 5) {
                this.incrementNumber = 100000
            }
            console.log(this.nowPayAutoIndex + "---------------手动选择金额")
            this.nowPayAutoIndex = index
            console.log(this.nowPayAutoIndex + "---------------手动选择金额")
            this.payNumberValue = this.payNumberList[index].value
        },
        //单选按钮,改变单选的值,改变已经选择的值
        chooseParmas: function (index, attr, array) {
            this[attr] = index
            var _thisArray = this[array] //取得对应数组的值
            this.choosedSex = _thisArray[index]
        },
        confirmCustomPay: function () {
            //点击确认金额后验证数字的格式
            if (this.checkCustomPayNumber(this.customPayNumber) != false) {
                this.payNumberValue = this.customPayNumber //输入的金额等于显示的金额
                //alert(this.customPayNumber)
                this.nowPayIndex = 0 //金额的方式
                //return false
            }else{
                return false
            }
            
        },
        choosePayNumber: function (index) {
            this.nowPayIndex = index
        },
        //选择投放方式
        chooseOrderType: function (index) {
            this.nowIndex = index
            //debugger
            //this.orderTypeName = this.orderTypeLists[index].orderTypeName
            //选择投放方式后,显示默认值
            if (index === 1) { //选择自定义投放之后
                this.payNumberValue = 500
                this.orderTypeName = '自定义投放'
                //alert(this.orderTypeName)
                this.isShowDefaultValue = true //是否显示默认选中的数据的值,比如年龄之类
                this.nowPayAutoIndex = 2 //选择自定义后,金额默认到第3个
                //            this.incrementNumber = 4000//默认提升量
                if (this.proviceLists.length == 0) { //只获取一次,有值就不再获取
                    //alert(this.orderTypeName+"1")
                    var _this = this //es5
                    //alert(_this.orderTypeName)
                    //console.log(this)
                    //alert(_this.orderTypeName+"999")
                    //console.log(this)
                    //console.log(_this)
                    axios.get('http://dou.fudayiliao.com/order/region')
                        .then(function (res) { //需要使用箭头函数
                            //console.log(_this+"8888")
                            //alert(_this.orderTypeName+"2")
                            console.log(res)
                            _this.proviceLists = res.data //给本地数组赋值,值就是大的json文件
                            //_this.isShowProvince = true//!_this.isShowProvince
                            // console.log(_this.proviceLists)
                            //alert(_this.orderTypeName)
                        })
                }
            } else {
                this.payNumberValue = 800
                this.orderTypeName = '智能投放'
                this.nowPayAutoIndex = 3
                this.isShowDefaultValue = false
            }
            //console.log(this.orderTypeName)
        },
        checkCustomPayNumber: function (number) { //监听自定义输入的金额
            if (this.nowIndex == 0) { //选择智能投放时
                if (number < 800 || number > 500000) {
                    alert('金额在必须是800~500000之间')
                    return false
                } else if (number % 100 != 0) {
                    alert('金额必须是数字且是100的倍数')
                    return false
                }
            }
            if (this.nowIndex == 1) { //选择自定义投放时
                if (number < 500 || number > 500000) {
                    alert('金额在必须是500~500000之间')
                    return false
                } else if (number % 100 != 0) {
                    alert('金额必须是数字且是100的倍数')
                    return false
                }
            }
            /*             if (number < 200 || number > 500000) {
                            alert('金额在必须是200~500000之间')
                            return false
                        } else if (number % 100 != 0) {
                            alert('金额必须是数字且是100的倍数')
                            return false
                        } */
            /* else if(number % 100 == NaN){
                        alert('请输入正确的数字')

                    } */
            else {
                return true
            }
        },
        inputFocus: function () {
            if (this.orderLink == '请输入您所要投放的链接') {
                this.orderLink = ''
            }
            if (this.customPayNumber == '¥ 请输入金额') {
                this.customPayNumber = ''
            }
        },
        inputBlur: function () {
            if (this.orderLink == '') {
                this.orderLink = '请输入您所要投放的链接'
            }
            if (this.customPayNumber == '') {
                this.customPayNumber = '¥ 请输入金额'
            }
        },
        _getUsermessage: function () {
            var userObj = getUsermessage()
            this.userName = userObj.userName
            this.douyinId = userObj.douyinId
        }
    },
    computed: {
        limitMoney: function () {
            if (this.nowIndex == 0) {
                return 800
            }
            if (this.nowIndex == 1) {
                return 500
            }
        },
        computedCountDownNumber: function () { //提交成功后的倒计时
            if (this.isPaySuccess == true) {
                number = this.successCountDownNumber
                return number
            }
        },
        autoPriceIndex: function () {
            if (this.nowIndex == 0) { //选择智能投放时
                return 3
            }
            if (this.nowIndex == 1) { //选择智能投放时
                return 2
            }
        },
        increNumber: function () {
            if (this.nowIndex == 1 && this.nowPayIndex == 0 && this.userRegionIndex == 3 || this.userRegionIndex == 4) { //当自定义投放下,商圈和附近,且点击选择金额时
                var base = 3300
                if (this.nowPayAutoIndex == 2) {
                    return base * 5
                }
                if (this.nowPayAutoIndex == 3) {
                    return base * 8
                } else {
                    return base * (this.nowPayAutoIndex - 2) * 5
                }
            }
            if (this.nowIndex == 1 && this.nowPayIndex != 0 && this.userRegionIndex == 3 || this.userRegionIndex == 4) { //当自定义投放下,商圈和附近,且手动输入金额
                var base = 3300
                //this.payNumberValue/100 //100的多少倍
                return parseInt(base * this.payNumberValue / 100)
            }
            if (this.nowIndex == 0 && this.nowPayIndex == 0) { //智能投放下的点击选择金额
                var base = 5000 //基数5000
                if (this.nowPayAutoIndex == 3) {
                    return base * 8
                } else {
                    return base * (this.nowPayAutoIndex - 2) * 5
                }
            }
            if (this.nowIndex == 0 && this.nowPayIndex != 0) { //智能投放下的自定义输入金额
                var base = 5000 //基数5000
                //alert(this.customPayNumber)
                //this.payNumberValue/100 //100的多少倍
                return parseInt(base * this.payNumberValue / 100)
            }
            if (this.nowIndex == 1 && this.nowPayIndex == 0) { //自定义投放下的点击选择金额
                var base = 4000
                if (this.nowPayAutoIndex == 2) {
                    return base * 5
                }
                if (this.nowPayAutoIndex == 3) {
                    return base * 8
                } else {
                    return base * (this.nowPayAutoIndex - 2) * 5
                }
            }
            if (this.nowIndex == 1 && this.nowPayIndex != 0) { //自定义投放下的自定义输入金额
                var base = 4000
                //alert(this.customPayNumber)
                //this.payNumberValue/100 //100的多少倍
                return parseInt(base * this.payNumberValue / 100)
            }
        }
    },
    mounted: function () {
        this._getUsermessage()
    },
    beforeCreate() {
        //alert(0)
    }
})