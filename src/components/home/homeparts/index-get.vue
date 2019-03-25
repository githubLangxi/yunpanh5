<template>
	<div class="index-querry" id="index-get">
		<div class="title-box">
			<div class="detail">指标查看</div>
			<ul class="navs">
				<li class="nav" v-bind:class="{'active':selectName =='家用空调'}" @click="showData('家用空调')">家用空调</li>
				<li class="nav" v-bind:class="{'active':selectName =='中央空调'}" @click="showData('中央空调')">中央空调</li>
				<li class="nav" v-bind:class="{'active':selectName =='厨电'}" @click="showData('厨电')">厨电</li>
			</ul>
		</div>
		<div class="index-box">
			<div class="index-top">
				<dl class="box-value" v-for="(item,index) in fiveData"  @click="showMask(item,item.count)">
					<dt class="value-title">
						<span class="index-icon icon1"></span>
						{{ item.name}}
					</dt>
					<dd class="value-percent green" v-bind:class="{'red':item.count&&item.count != null&&item.count*1< item.name=='安装好评率（电商）'?0.99:item.name=='安装好评率（400/微信）'||item.name=='维修好评率（400/微信）'?0.98:0.85}">{{item.count || item.count*1 == 0 ? (item.count*100).toFixed(0)+'%' : '- -' }}</dd>
					<dd class="value-info">全国：{{item.Nationalranking || item.Nationalranking*1 == 0 ? item.Nationalranking*1 : '- -' }}/中心：{{item.Centerranking || item.Centerranking*1 == 0 ? item.Centerranking*1 : '- -' }}</dd>
				</dl>
				<!-- <dl class="box-value" @click="showMask">
					<dt class="value-title">
						<span class="index-icon icon1"></span>
						安装好评率（电商）
					</dt>
					<dd class="value-percent green" v-bind:class="{'red':fiveData.InstallationpraiseE && fiveData.InstallationpraiseE.count !=null && fiveData.InstallationpraiseE.count*1 <0.99}">{{fiveData.InstallationpraiseE? fiveData.InstallationpraiseE.count || fiveData.InstallationpraiseE.count == 0 ? fiveData.InstallationpraiseE.count +'%':'--':'--' }}</dd>
					<dd class="value-info">全：{{fiveData.InstallationpraiseE? fiveData.InstallationpraiseE.Nationalranking&&fiveData.InstallationpraiseE.Nationalranking >=0 ? fiveData.InstallationpraiseE.Nationalranking:'- -':'- -' }}/中：{{fiveData.InstallationpraiseE? fiveData.InstallationpraiseE.Centerranking&&fiveData.InstallationpraiseE.Centerranking >=0 ? fiveData.InstallationpraiseE.Centerranking:'- -':'- -' }}</dd>
				</dl>
				<dl class="box-value">
					<dt class="value-title">
						<span class="index-icon icon2"></span>
						安装好评率（微信/400）
					</dt>
					<dd class="value-percent green" v-bind:class="{'red':fiveData.Maintenancelinepraise && fiveData.Maintenancelinepraise.count !=null && fiveData.Maintenancelinepraise.count*1 <0.98}">{{fiveData.Maintenancelinepraise? fiveData.Maintenancelinepraise.count || fiveData.Maintenancelinepraise.count ==0 ? fiveData.Maintenancelinepraise.count +'%':'--':'--' }}</dd>
					<dd class="value-info">全：{{fiveData.Maintenancelinepraise? fiveData.Maintenancelinepraise.Nationalranking&&fiveData.Maintenancelinepraise.Nationalranking >=0 ? fiveData.Maintenancelinepraise.Nationalranking:'- -':'- -' }}/中：{{fiveData.Maintenancelinepraise? fiveData.Maintenancelinepraise.Centerranking&&fiveData.Maintenancelinepraise.Centerranking >=0 ? fiveData.Maintenancelinepraise.Centerranking:'- -':'- -' }}</dd>
				</dl>
				<dl class="box-value">
					<dt class="value-title">
						<span class="index-icon icon3"></span>
						维修好评率（微信/400）
					</dt>
					<dd class="value-percent green" v-bind:class="{'red':fiveData.Offlineinstallation && fiveData.Offlineinstallation.count !=null && fiveData.Offlineinstallation.count*1 <0.98}">{{fiveData.Offlineinstallation? fiveData.Offlineinstallation.count || fiveData.Offlineinstallation.count ==0 ? fiveData.Offlineinstallation.count +'%':'--':'--' }}</dd>
					<dd class="value-info">全：{{fiveData.Offlineinstallation? fiveData.Offlineinstallation.Nationalranking&&fiveData.Offlineinstallation.Nationalranking >=0 ? fiveData.Offlineinstallation.Nationalranking:'- -':'- -' }}/中：{{fiveData.Offlineinstallation? fiveData.Offlineinstallation.Centerranking&&fiveData.Offlineinstallation.Centerranking >=0 ? fiveData.Offlineinstallation.Centerranking:'- -':'- -' }}</dd>
				</dl>
				<dl class="box-value">
					<dt class="value-title">
						<span class="index-icon icon4"></span>
						安装24h及时率
					</dt>
					<dd class="value-percent green" v-bind:class="{'red':fiveData.ontimerate24 && fiveData.ontimerate24.count !=null && fiveData.ontimerate24.count*1 <0.85}">{{fiveData.ontimerate24? fiveData.ontimerate24.count || fiveData.ontimerate24.count ==0 ? fiveData.ontimerate24.count +'%':'--':'--' }}</dd>
					<dd class="value-info">全：{{fiveData.ontimerate24? fiveData.ontimerate24.Nationalranking&&fiveData.ontimerate24.Nationalranking >=0 ? fiveData.ontimerate24.Nationalranking:'- -':'- -' }}/中：{{fiveData.ontimerate24? fiveData.ontimerate24.Centerranking&&fiveData.ontimerate24.Centerranking >=0 ? fiveData.ontimerate24.Centerranking:'- -':'- -' }}</dd>
				</dl>
				<dl class="box-value">
					<dt class="value-title">
						<span class="index-icon icon5"></span>
						维修48h及时率
					</dt>
					<dd class="value-percent green" v-bind:class="{'red':fiveData.ontimerate48 && fiveData.ontimerate48.count !=null && fiveData.ontimerate48.count*1 <0.85}">{{fiveData.ontimerate48? fiveData.ontimerate48.count || fiveData.ontimerate48.count ==0 ? fiveData.ontimerate48.count +'%':'--':'--' }}</dd>
					<dd class="value-info">全：{{fiveData.ontimerate48? fiveData.ontimerate48.Nationalranking&&fiveData.ontimerate48.Nationalranking >=0 ? fiveData.ontimerate48.Nationalranking:'- -':'- -' }}/中：{{fiveData.ontimerate48? fiveData.ontimerate48.Centerranking&&fiveData.ontimerate48.Centerranking >=0 ? fiveData.ontimerate48.Centerranking:'- -':'- -' }}</dd>
				</dl> -->
			</div>
			<div class="index-top">
				<dl class="box-value"  @click="showNextMask('网页差评',chaPing.Nationalranking)"   >
					<dt class="value-title">
						<span class="index-icon icon6"></span>
						网页差评
					</dt>
					<dd class="value-percent green" v-bind:class="{'red': chaPing.count*1 >0}">{{chaPing.count}}</dd>
					<dd class="value-info">全国：{{chaPing.Nationalranking || chaPing.Nationalranking ==0?chaPing.Nationalranking:'- -'}}/中心：{{chaPing.Centerranking || chaPing.Centerranking == 0?chaPing.Centerranking:'- -'}}</dd>
				</dl>
				<dl class="box-value" disabled>
					<dt class="value-title">
						<span class="index-icon icon7"></span>
						评星1-4星
					</dt>
					<dd class="value-percent green">- -</dd>
					<dd class="value-info">全国：- -/中心：- -</dd>
				</dl>
				<dl class="box-value"  @click="showNextMask('重电',chongDian.Nationalranking)"  >
					<dt class="value-title">
						<span class="index-icon icon8"></span>
						重电
					</dt>
					<dd class="value-percent green" v-bind:class="{'red': chongDian.count*1 >0}">{{chongDian.count}}</dd>
					<dd class="value-info">全国：{{chongDian.Nationalranking || chongDian.Nationalranking == 0?chongDian.Nationalranking:'- -'}}/中心：{{chongDian.Centerranking || chongDian.Centerranking ==0?chongDian.Centerranking:'- -'}}</dd>
				</dl>
				<dl class="box-value" disabled>
					<dt class="value-title">
						<span class="index-icon icon9"></span>
						督办预警
					</dt>
					<dd class="value-percent green">- -</dd>
					<dd class="value-info">全国：- -/中心：- -</dd>
				</dl>
				<dl class="box-value" disabled>
					<dt class="value-title">
						<span class="index-icon icon10"></span>
						督办
					</dt>
					<dd class="value-percent green">- -</dd>
					<dd class="value-info">全国：- -/中心：- -</dd>
				</dl>
			</div>
		</div>

		<div class="mask" v-if="showflag" @click.stop>
			<div class="dialog">
				<div class="title">
					<div class="title-left">
						<span class="title-icon"></span>
						<span>{{choiceName?choiceName:selectItem.name}}</span>
					</div>
					<button class="close el-icon-close" @click.stop="closeMask"></button>
				</div>
				<div class="detail-content">
					<div class="tables">
						<span class="table" v-bind:class="{'select':!contentFlag}" @click="showContent(false,val)">网点</span>
						<span class="table" v-bind:class="{'select':contentFlag}" @click="showContent(true,val)">工人</span>
					</div>
					<div id="chart-netpoint" v-if="!contentFlag">
						
						<span class="showVal">
							<span class="tiem-type" v-if="getPassRate()">合格率</span>{{getPassRate()}}
							<span class="tiem-type">本月</span>{{val}}
						</span>
						
						<div id="chart-show"></div>
					</div>
					<div class="index-content" v-if="contentFlag">
						<div class="table-top">
							<span class="td1">排名</span>
							<span class="td2">姓名</span>
							<span class="td3"></span>
							<span class="td4">今年当月</span>
							<span class="td5">当年累计</span>
							<span class="td6">去年累计</span>
							<span class="td7">去年当月</span>
						</div>
						<!--<span class="people" v-for="(item,index) in names">
							<span>
								<span class="circular" v-bind:class="{'first':index == 0,'second':index == 1,'third':index == 2}">{{index+1}}</span>
						<span class="justaname">
											{{item.name}}
								</span>
						</span>
						<span>
								<span class="order-count">{{item.count}}</span>
						<span class="order-unit">单</span>
						</span>
						</span>-->
						<ul>
							<li class="table-bottom" v-for="(item,index) in names" @click="gotoSeverList(item)">
								<span class="td1">
									<span class="circular" v-bind:class="{'first':index == 0,'second':index == 1,'third':index == 2}">{{index+1}}</span>
								<span class="justaname">
											
								</span>
								</span>
								<span class="td2">
									{{item.name}}
								</span>
								<span class="td3">......</span>
								<span class="td4">{{item.nowyearMonth*1}}</span>
								<span class="td5">{{item.nowyearSum*1}}</span>
								<span class="td6">{{item.lastyearSum*1}}</span>
								<span class="td7">{{item.lastyearMonth*1}}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getOption } from '../../../store/publicFucs';
let Base64 = require('js-base64').Base64;
const http = 'http://47.96.95.146:8055/';
export default {
    data() {
        return {
            showflag: false,
            contentFlag: false,
            selectName: '家用空调',
            selectItem: {},
            choiceName: '',
            color: ['#5A98F3'],
            chongDian: {},
            chaPing: {},
            fiveData: [],
            names: [],
            val: '',
            index: [
                {
                    value: '安装好评率（电商）',
                    index: 1
                },
                {
                    value: '安装好评率（微信/400）',
                    index: 2
                },
                {
                    value: '维修好评率（微信/400）',
                    index: 3
                },
                {
                    value: '安装24h及时率',
                    index: 4
                },
                {
                    value: '维修48小时及时率',
                    index: 5
                },
                {
                    value: '网页差评',
                    index: 6
                },
                {
                    value: '评星1-4星',
                    index: 7
                },
                {
                    value: '重电',
                    index: 8
                },
                {
                    value: '督办预警',
                    index: 9
                },
                {
                    value: '督办',
                    index: 10
                }
            ]
        };
    },
    mounted() {},
    created() {
        this.getChongDian();
        this.getChaPing();
        this.getFiveData();
    },
    beforeDestroy() {
        let body = document.getElementsByTagName('body')[0];
        body.style.overflow = 'auto';
    },
    methods: {
		getPassRate(){
			if(!Object.keys(this.selectItem).length){
				return ''
			}
			if(this.selectItem.name =="安装好评率（电商）"){
				return '99%'
			}
			if(this.selectItem.name =="安装好评率（微信/400）" ||this.selectItem.name =="维修好评率（微信/400）"  ){
				return '98%'
			}
			if(this.selectItem.name =="安装24h及时率" ||this.selectItem.name =="维修48小时及时率"  ){
				return '85%'
			}
			return;
		},
        getIndex(name) {
            let arr = this.index;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].value == name) {
                    return arr[i].index;
                }
            }
            return;
        },
        //跳转至服务单
        gotoSeverList(item) {
            let from = 'home',
                name = item.name,
                count = item.nowyearMonth * 1,
                type = this.getIndex(this.choiceName ? this.choiceName : this.selectItem.name),
                parmas = {
                    from,
                    name,
                    count,
                    type
                };
            parmas = Base64.encode(JSON.stringify(parmas));
            sessionStorage.removeItem('conditionData');
            this.$router.push({
                path: `/workOrder/list/${parmas}`
            });
        },
        //切换产品线
        showData(name) {
            this.selectName = name;
            this.getChongDian();
            this.getChaPing();
            this.getFiveData();
        },
        ///获取上面5个
        getFiveData() {
            let params = {
                name: this.selectName,
                username: this.$store.state.user.nickName
                //username:'北京宏峰金源制冷设备维修部'
            };
            rt.get('../api/Index/getelecttopdata', params)
                .then(res => {
                    this.fiveData = res.list;
                })
                .catch(err => {});
        },
        //获取重电数据
        getChongDian() {
            let params = {
                name: this.selectName,
                username: this.$store.state.user.nickName
            };
            rt.get('../api/Index/getHeavyelectricity', params)
                .then(res => {
                    this.chongDian = res;
                })
                .catch(err => {});
        },
        getChaPing() {
            let params = {
                name: this.selectName,
                username: this.$store.state.user.nickName
            };
            rt.get('../api/Index/getWebpagebadreview', params)
                .then(res => {
                    this.chaPing = res;
                })
                .catch(err => {});
        },
        showContent(flag, val) {
            this.contentFlag = flag;
            if (flag) {
                this.getNames();
            } else {
                /* let str = typeof val ='number' && val.indexOf('%') >= 0 ? val.slice(0, val.length - 2) : val; */
                /* let str =  val.indexOf ? val.slice(0, val.length - 2) : val; */
                this.showMask(this.choiceName ? this.choiceName : this.selectItem, val);
            }
        },
        getNames() {
            let params = {
                name: this.selectName,
                username: this.$store.state.user.nickName,
                flagname: this.choiceName ? this.choiceName : this.selectItem.name
            };
            rt.get('../api/Index/QueryWork', params)
                .then(res => {
                    this.names = res.data;
                })
                .catch(err => {});
        },
        setChart() {
            let arry = document.getElementsByClassName('chart-content');
            for (let i = 0; i < arry.length; i++) {
                this.drawLine(arry[i], i);
            }
        },
        getChartData(params) {
            let body = document.getElementsByTagName('body')[0];
            body.style.overflow = 'hidden';
            this.showflag = true;
            this.contentFlag = false;

            rt.get('../api/Index/Querytop', params)
                .then(res => {
                    let option = getOption(res, 1);
                    this.drawLine(option);
                })
                .catch(err => {});
        },
        showNextMask(name, val) {
            // this.val = val || val * 1 >= 0 ? val * 1 : '- -';
            this.choiceName = name;
            this.selectItem = {};
            this.val = this.getVal(val);

            this.showNext(name);
        },
        showNext(name) {
            let params = {
                name: this.selectName,
                username: this.$store.state.user.nickName,
                flagname: this.choiceName ? this.choiceName : this.selectItem.name
            };
            this.getChartData(params);
        },
        getVal(val) {
            return val.indexOf && val.indexOf('%') >= 0
                ? val
                : this.choiceName && val.indexOf && val.indexOf('%') >= 0
                    ? val
                    : this.choiceName
                        ? val || val * 1 >= 0
                            ? val * 1
                            : '- -'
                        : val || val * 1 >= 0
                            ? (val * 100).toFixed(0) + '%'
                            : '- -';
        },
        showMask(item, val) {
            /* this.choiceName = '';
            this.selectItem = item; */
            //this.val = val || val * 1 >= 0 ? val * 100 + '%' : '- -';

            if (item.name) {
                this.choiceName = '';
                this.selectItem = item;
            } else {
                this.choiceName = item;
                this.selectItem = {};
            }
            this.val = this.getVal(val);
            let params = {
                name: this.selectName,
                username: this.$store.state.user.nickName,
                flagname: item.name ? item.name : this.choiceName
            };
            this.getChartData(params);
            /* window.setTimeout(() => {
                let box = document.getElementById('chart-show');
                this.drawLine(box);
            }, 10); */
        },
        closeMask() {
            let body = document.getElementsByTagName('body')[0];
            body.style.overflow = 'auto';
            this.showflag = false;
        },
        drawLine(option) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('chart-show'));
            // 绘制图表
            myChart.setOption(option);
        }
    }
};
</script>

<style lang="scss">
#index-get {
    margin-top: 10px;
    height: 377px;
    .index-box {
        height: calc(100% - 56px);
        width: 100%;
        box-sizing: border-box;
        padding-top: 25px;
        margin: 0 auto;
    }
    #chart-netpoint {
        height: 278px;
        position: relative;
    }

    .showVal {
        position: absolute;
        right: 30px;
        top: 30px;
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #222222ff;
        z-index: 10;
    }
    .tiem-type {
        font-size: 12px;
        font-weight: 400;
        margin-right: 4px;
    }
    #chart-show {
        width: 100%;
        height: 100%;
    }
    .table-top,
    .table-bottom {
        width: 491px;
        height: 30px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #888888;
        background: white;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.08);
        border-radius: 2px;
        display: flex;
        .td1,
        .td2,
        .td3,
        .td4,
        .td5,
        .td6,
        .td7 {
            height: 100%;
            margin-top: 0;
            display: flex;
            align-items: center;
            width: 17.2%;
            font-size: 12px;
            justify-content: center;
        }
        .td3 {
            width: 6%;
        }
        .td1 {
            width: 8%;
        }
    }
    .table-bottom {
        height: 60px;
        margin-top: 10px;
        border-radius: 10px;
        cursor: pointer;
        .td2 {
            font-size: 18px;
            color: #555555;
        }
        .td3 {
            font-size: 22px;
            color: #cccccc;
        }
        .td4,
        .td6,
        .td5,
        .td7 {
            color: #468ff9;
            font-size: 22px;
        }
        .td5,
        .td7 {
            color: #fdba42;
        }
    }
    .box-value {
        width: 18.2%;
        height: 110px;
        border-radius: 8px;
        box-sizing: border-box;
        border: 1px solid #cccccc;
        display: flex;
        flex-direction: column;
        color: #888888;
        text-align: center;
        align-items: center;
        cursor: pointer;
    }
    .index-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100% - 246px);
        margin: 0 auto;
        margin-top: 24px;
    }
    .index-icon {
        display: inline-block;
        width: 17px;
        height: 17px;
        background: white;
        margin-right: 4px;
    }
    .value-percent {
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: bold;
    }
    .value-percent {
        padding: 7px 0;
        margin: 8px 0;
    }
    .green {
        color: #60aa00;
    }
    .red {
        color: #ff0000;
    }
    .value-title {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        display: flex;
        align-items: center;
        margin-top: 12px;
    }
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.4);
        width: 100%;
        height: 100%;
        z-index: 22;
    }
    .dialog {
        width: 611px;
        height: 654px;
        background: white;
        border-radius: 2px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 85px;
    }
    .title-left {
        display: flex;
        align-items: center;
        margin-left: 10px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #222222;
    }
    .title-icon {
        width: 4px;
        height: 20px;
        background: #468ff9;
        margin-right: 16px;
    }
    .icon1,
    .icon2,
    .icon3 {
        background: url(../../../assets/imgs/thump-blue.png) no-repeat center;
        background-size: 100% 100%;
    }
    .icon4,
    .icon5 {
        background: url(../../../assets/imgs/anzhuang-blue.png) no-repeat center;
        background-size: 100% 100%;
    }
    .icon6 {
        background: url(../../../assets/imgs/chaping-blue.png) no-repeat center;
        background-size: 100% 100%;
    }
    .icon7 {
        background: url(../../../assets/imgs/star-blue.png) no-repeat center;
        background-size: 100% 100%;
    }
    .icon8 {
        background: url(../../../assets/imgs/phone-blue.png) no-repeat center;
        background-size: 100% 100%;
    }
    .icon9 {
        background: url(../../../assets/imgs/dubanwarning-blue.png) no-repeat center;
        background-size: 100% 100%;
    }
    .icon10 {
        background: url(../../../assets/imgs/duban-gray.png) no-repeat center;
        background-size: 100% 100%;
    }
    .box-value:hover {
        background: #5a98f3;
        color: white;
        border: none;
        box-shadow: 0 0 10px #5a98f3;
        .value-percent {
            color: white;
        }
        .icon1,
        .icon2,
        .icon3 {
            background: url(../../../assets/imgs/thumpup-white.png) no-repeat center;
            background-size: 100% 100%;
        }
        .icon4,
        .icon5 {
            background: url(../../../assets/imgs/anzhuang-white.png) no-repeat center;
            background-size: 100% 100%;
        }
        .icon6 {
            background: url(../../../assets/imgs/chaping-white.png) no-repeat center;
            background-size: 100% 100%;
        }
        .icon7 {
            background: url(../../../assets/imgs/star-white.png) no-repeat center;
            background-size: 100% 100%;
        }
        .icon8 {
            background: url(../../../assets/imgs/phone-white.png) no-repeat center;
            background-size: 100% 100%;
        }
        .icon9 {
            background: url(../../../assets/imgs/dubanwarning-white.png) no-repeat center;
            background-size: 100% 100%;
        }
        .icon10 {
            background: url(../../../assets/imgs/duban-white.png) no-repeat center;
            background-size: 100% 100%;
        }
    }
    .box-value.choice {
        background: #5a98f3;
        color: white;
        border: none;
        box-shadow: 0 0 10px #5a98f3;
        .value-percent {
            color: white;
        }
        .icon1,
        .icon2,
        .icon3 {
            background: url(../../../assets/imgs/thumpup-white.png) no-repeat center;
            background-size: 100% 100%;
        }
        .icon4,
        .icon5 {
            background: url(../../../assets/imgs/anzhuang-white.png) no-repeat center;
            background-size: 100% 100%;
        }
        .icon6 {
            background: url(../../../assets/imgs/chaping-white.png) no-repeat center;
            background-size: 100% 100%;
        }
        .icon7 {
            background: url(../../../assets/imgs/star-white.png) no-repeat center;
            background-size: 100% 100%;
        }
        .icon8 {
            background: url(../../../assets/imgs/phone-white.png) no-repeat center;
            background-size: 100% 100%;
        }
        .icon9 {
            background: url(../../../assets/imgs/dubanwarning-white.png) no-repeat center;
            background-size: 100% 100%;
        }
        .icon10 {
            background: url(../../../assets/imgs/duban-white.png) no-repeat center;
            background-size: 100% 100%;
        }
    }
    .close {
        width: 40px;
        height: 40px;
        background: #f3f3f3;
        border-radius: 50%;
        color: #888888;
        font-size: 13px;
        border: none;
        outline: none;
        margin-right: 17px;
        cursor: pointer;
    }
    .change {
        margin-left: 16px;
        height: 20px;
        position: relative;
        .show-assessment {
            height: 100%;
            line-height: 20px;
        }
        dd {
            position: absolute;
            left: 0;
            top: 20px;
            /*display: none;*/
        }
        cite {
            display: inline-block;
            margin-left: 6px;
            width: 11px;
            height: 11px;
            background: url(../../../assets/imgs/arrowdown-blue.png) no-repeat center;
            background-size: 100% 100%;
            cursor: pointer;
        }
        cite.arrowup {
            background: url(../../../assets/imgs/arrowup-blue.png) no-repeat center;
            background-size: 100% 100%;
            cursor: pointer;
        }
    }
    .hide-assessment {
        display: none;
    }
    .assessments {
        cursor: pointer;
    }
    .next-change {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #888888;
        position: relative;
    }
    .showstasus {
        position: absolute;
        top: 14px;
        right: 0;
        white-space: nowrap;
        display: none;
    }
    .changearrow {
        display: inline-block;
        width: 11px;
        height: 11px;
        cursor: pointer;
        background: url(../../../assets/imgs/arrowup-blue.png) no-repeat center;
        background-size: 100% 100%;
        position: relative;
        top: 1.5px;
    }
    .changearrowdown {
        background: url(../../../assets/imgs/arrowdown-blue.png) no-repeat center;
        background-size: 100% 100%;
        top: 0px;
    }
    .detail-content {
        width: calc(100% - 60px);
        max-height: calc(100% - 85px);
        overflow: auto;
        margin: 0 auto;
        background: #f6f7fb;
    }
    .tables {
        height: 62px;
        display: flex;
        justify-content: center;
        align-items: center;
        .table {
            width: 98px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            border: 1px solid #dae9fe;
            border-right: none;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #468ff9;
            cursor: pointer;
            background: rgba(246, 247, 251, 1);
        }
        .table:last-child {
            border-right: 1px solid #dae9fe;
        }
        .select {
            color: white;
            background: #468ff9;
            border-color: #468ff9;
        }
        .table:hover {
            color: white;
            background: #468ff9;
            border-color: #468ff9;
        }
    }
    .index-content {
        width: calc(100% - 60px);
        height: 507px;
        margin: 0 auto;
        overflow: auto;
        overflow-x: hidden;
        .people {
            float: left;
            display: flex;
            width: calc(50% - 6px);
            height: 60px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.08);
            border-radius: 10px;
            margin-top: 8px;
            justify-content: space-between;
            align-items: center;
        }
        .people:nth-child(even) {
            margin-left: 11px;
        }
    }
    .circular {
        width: 22px;
        height: 22px;
        display: inline-block;
        border-radius: 50%;
        text-align: center;
        line-height: 22px;
        background: #f3f3f3;
        color: #555555;
        font-size: 16px;
        font-family: Arial;
        font-weight: 400;
    }
    .first,
    .second,
    .third {
        color: white;
        background: #f52f2f;
    }
    .second {
        background: #f5801a;
    }
    .third {
        background: #e8d100;
    }
    .justaname {
        display: inline-block;
        max-width: 80px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #555555;
        position: relative;
        top: 4px;
    }
    .order-count {
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        margin-right: 4px;
    }
    .order-unit {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #888888;
        margin-right: 32px;
    }
    .right-tags {
        position: absolute;
        right: 10px;
        top: 18px;
        .right-tag:nth-child(1),
        .right-tag:nth-child(2) {
            background: #ffe4e4;
            color: #ff0000;
        }
    }
    .right-tag {
        float: left;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #60aa00;
        width: 120px;
        height: 20px;
        background: #e5f5d1;
        line-height: 20px;
        text-align: center;
        cursor: pointer;
        border-radius: 10px;
        margin-right: 10px;
    }
    .topchart {
        height: 52%;
        width: calc(100% - 40px);
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    #chart-1,
    #chart-2 {
        width: 50%;
        height: 100%;
        float: left;
        box-sizing: border-box;
    }
    .chart-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .chart-title-left,
    .chart-title-right {
        display: flex;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #222222;
        align-items: flex-end;
    }
    .chart-title-left {
        /*margin-left: 8%;*/
    }
    .chart-title-right {
        flex: 1;
        justify-content: flex-end;
    }
    .chart-icon {
        display: inline-block;
        width: 3px;
        height: 14px;
        border-radius: 3px;
        background: #ffba00;
        margin-right: 8px;
    }
    .timetype {
        font-size: 12px;
        margin-right: 8px;
        white-space: nowrap;
    }
    .percent {
        font-size: 24px;
        margin-right: 24%;
    }
    .chart-content {
        display: flex;
        flex: 1;
    }
    .index-chart {
        box-sizing: border-box;
        /*padding-left: 81px;*/
        height: 100%;
        float: left;
        display: flex;
        flex-direction: column;
    }
    .bottomchart {
        height: 48%;
        overflow: hidden;
    }
    .next-container {
        background: white;
        flex-direction: column;
    }
    .next-index-chart {
        width: 33.3%;
        padding-left: 20px;
        .percent {
            margin-right: 32%;
        }
        .chart-title-left {
            margin-left: 3.2%;
        }
    }
}
</style>
