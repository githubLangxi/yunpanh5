<template>
	<div id="assessment" class="feeinfo assessment">
		<div class="top">
			<div class="part-title">
				考核激励 
			<!-- <span class="count">（+5650元）</span> -->
			</div>
			<!-- <div class="arrow-right el-icon-arrow-right">
			</div> -->
		</div>
		<div class="middle" style="border-bottom: none;">
			<dl class="status half hasdashed" @click="showDetailes(1)">
				<dd class="status-money">
					<span class="money-symbol">￥</span> 10,000.00
					<img src="../../../assets/imgs/upper.png" />
				</dd>
				<dt class="status1">已奖励</dt>
			</dl>
			<dl class="status half" @click="showDetailes(0)">
				<dd class="status-money">
					<span class="money-symbol">￥</span> {{data.monthsum || data.monthsum !=null ?data.monthsum*1:'--'  }}
					<img src="../../../assets/imgs/lower.png" v-if="data.Ringratio <0" />
					<img src="../../../assets/imgs/upper.png" v-if="data.Ringratio >0" />
					<span class="suibian" v-if="data.Ringratio==0" style="color: #60aa00;">- -</span>
				</dd>
				<dt class="status2">已罚款</dt>
			</dl>
		</div>
		<div class="mask" v-if="maskFlag">
			<div class="positive">
				<div class="title">
					<div class="title-left">
						<span class="title-icon"></span>
						<dl class="change">
							<dt class="show-assessment">考核激励-{{type}}<cite></cite></dt>
							<dd class="hide-assessment">
								<ul class="assessments">
									<li>考核激励-正激励</li>
									<li>考核激励-负激励</li>
								</ul>
							</dd>
						</dl>
					</div>
					<button class="close el-icon-close" @click="coloseDialog"></button>
				</div>
				<div class="content">
					<div class="productlines">
						<span class="product-tag" v-bind:class="{'active':slectName=='家用空调'}" @click="showNextChart('家用空调')">家用空调</span>
						<span class="product-tag" v-bind:class="{'active':slectName=='中央空调'}" @click="showNextChart('中央空调')">中央空调</span>
						<span class="product-tag" v-bind:class="{'active':slectName=='厨电'}" @click="showNextChart('厨电')">厨电</span>
					</div>
					<div class="title">
						<div class="title-left">
							<span class="title-radius"></span>
							<dl class="change content-dl">
								<dt class="show-assessment">日期:<span class="choice">{{selectMonth.value}}</span><cite @click="showConditions"></cite></dt>
								<dd class="hide-assessment next" v-if="conditionFlag">
									<ul class="assessments">
										<!-- <li>考核激励-正激励</li>
										<li>考核激励-负激励</li> -->
										<li v-for="(item,index) in months">{{item.value}}</li>
									</ul>
								</dd>
							</dl>
						</div>
						<div class="assessment-count">
							<span>{{type}}合计：</span>
							<span>￥</span>
							<span>{{count || count !=null ?count*1:'--'  }}</span>
							<img src="../../../assets/imgs/lower.png" v-if="data.Ringratio <0" />
							<img src="../../../assets/imgs/upper.png" v-if="data.Ringratio >0" />
							<span class="suibian" v-if="data.Ringratio==0" style="color: #60aa00;">- -</span>
						</div>
					</div>
					<div class="chart" id="assessmentChart">

					</div>
					<div class="types">
						<dl class="type" v-for="(item,index) in showLists" @click="gotoPage(item)">
							<dt class="type-title">{{item.new_name}}：{{item.count}}单</dt>
							<dd>
								<span class="type-status">{{type}}</span>
								<span class="type-count">{{item.money*1}}</span>
							</dd>
						</dl>
						<!--<dl class="type">
							<dt class="type-title">微信安装5星好评率：36单</dt>
							<dd>
								<span class="type-status">正激励</span>
								<span class="type-count">260</span>
							</dd>
						</dl>
						<dl class="type">
							<dt class="type-title">微信安装5星好评率：36单</dt>
							<dd>
								<span class="type-status">正激励</span>
								<span class="type-count">260</span>
							</dd>
						</dl>
						<dl class="type">
							<dt class="type-title">微信安装5星好评率：36单</dt>
							<dd>
								<span class="type-status">正激励</span>
								<span class="type-count">260</span>
							</dd>
						</dl>
						<dl class="type">
							<dt class="type-title">微信安装5星好评率：36单</dt>
							<dd>
								<span class="type-status">正激励</span>
								<span class="type-count">260</span>
							</dd>
						</dl>-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
let Base64 = require('js-base64').Base64;
import { conditions } from '../../../store/publicFucs';
export default {
    data() {
        return {
            colors: [
                '#FF576E',
                '#DAEF44FF',
                '#FF61FFFF',
                '#C36AFFFF',
                '#7874FFFF',
                '#BD5EFBFF',
                '#5FEEF9FF',
                '#92B3FFFF',
                '#FFD255FF',
                '#FFFF60FF',
                '#FFB865FF',
                '#6589FFFF',
                '#47CEF1FF',
                '#85F147FF',
                '#CD5BFEFF'
            ],
            maskFlag: false, //弹窗显示
            upFlag: true, //
            type: '正激励',
            slectName: '家用空调',
            conditionFlag: false,
            showLists: [],
            months: [],
            selectMonth: {},
            data: {},
            count: null,
            lists1: [],
            lists2: []
        };
    },
    mounted() {},
    created() {
        this.setConditions();
        this.getIndexExcitation();
    },
    methods: {
        getIndexExcitation() {
            /* let date = new Date(),
			month = date.getMonth() + 1;
			let params = {
				monthsum:month,
				Ringratio:'-'
			} */
            rt.get('../api/Index/getNegativeincentiveSum')
                .then(res => {
                    this.data = res;
                    this.count = res.jymonthsum;
                })
                .catch(err => {});
        },
        gotoPage(item) {
            let name = item.new_name,
                count = item.count,
                str = '';
            if (name == '重电') {
                str = 'new_rechargecycles';
            }
            if (name == '跟踪警告') {
                str = 'new_trace_warningtimes';
            }
            if (name == '督办预警') {
                str = 'new_supervise_warningtimes';
            }
            if (name == '督办') {
                str = 'new_supervise';
            }
			if(str){
				let params = {
					name:str,
					count:count
				}
				let type = Base64.encode(JSON.stringify(params));
				sessionStorage.removeItem('conditionData');
				this.$router.push({
					path: `/workOrder/list/${type}`
				});
			}else{
				
			}
            /* if(item.name == "重电"){
				str = "new_rechargecycles"
			} */
        },
        getOption(data) {
            let color = this.colors,
                that = this.type;
            let option = {
                tooltip: {
                    trigger: 'item',
                    //formatter: "{a} <br/>{b}: {c} ({d}%)"
                    formatter: function(item) {
                        return item.name + ':' + item.percent + '%<br />' + that + ':' + item.value;
                    }
                },
                color: color,
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: [],
                    textStyle: {
                        fontSize: 12
                    }
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: '18',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: []
                    }
                ]
            };
            data.map((item, index, arr) => {
                let obj = {
                        value: item.money * 1,
                        name: item.new_name
                    },
                    obj1 = { name: item.new_name };
                option.legend.data.push(obj1);

                option.series[0].data.push(obj);
            });
            return option;
        },
        getExcitation() {
            let params = {
                name: this.slectName,
                month: this.selectMonth.key
            };
            rt.get('../api/Index/getNegativeincentive', params)
                .then(res => {
                    let option = this.getOption(res);
                    this.showLists = res;
                    this.drawLine(option);
                })
                .catch(err => {});
        },
        showNextChart(name) {
            this.slectName = name;
            if (name == '家用空调') {
                this.count = this.data.jymonthsum;
            } else if (name == '中央空调') {
                this.count = this.data.jymonthsum;
            } else {
                this.count = this.data.cdmonthsum;
            }
            this.getExcitation();
        },
        setConditions() {
            let date = new Date(),
                year = date.getFullYear(),
                month = date.getMonth() + 1,
                arry = [];
            for (let i = 1; i <= month; i++) {
                var item = {};
                if (i == month) {
                    item.key = i;
                    item.value = '本月度';
                    this.selectMonth = item;
                } else {
                    item.key = i;
                    item.value = i + '月';
                }
                arry.push(item);
            }
            this.months = arry;
        },
        showConditions() {
            this.conditionFlag = !this.conditionFlag;
        },
        showDetailes(type) {
            this.maskFlag = true;
            this.slectName = '家用空调';
            if (type) {
                this.type = '正激励';
                this.showLists = this.lists1;
            } else {
                this.type = '负激励';
                this.showLists = this.lists2;
            }
            let body = document.getElementsByTagName('body')[0];
            body.style.overflow = 'hidden';
            this.getExcitation(type);
            /* setTimeout(() => {
                this.drawLine();
            }, 20); */
        },
        coloseDialog() {
            this.maskFlag = false;
            let body = document.getElementsByTagName('body')[0];
            body.style.overflow = 'auto';
        },
        drawLine(option) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
                document.getElementById('assessment').getElementsByClassName('chart')[0]
            );

            // 绘制图表
            myChart.clear();
            myChart.setOption(option);
        }
    }
};
</script>

<style lang="scss">
#assessment {
    .status {
        cursor: pointer;
    }
    .suibian {
        position: relative;
        top: -5px;
    }
    .productlines {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 19px;
    }
    .product-tag {
        cursor: pointer;
        width: 120px;
        height: 34px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #5a98f3;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #e5e5e5;
        border-left: none;
    }
    .product-tag:first-child {
        border-left: 1px solid #e5e5e5;
    }
    .product-tag.active {
        color: white;
        background: #5a98f3;
        border: none;
    }
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        z-index: 22;
    }
    .positive {
        position: absolute;
        /* width: 611px; */
        width: 840px;

        height: 654px;
        background: white;
        border-radius: 2px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    .title {
        height: 85px;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
    .hide-assessment.next {
        display: block;
        left: 80%;
        white-space: nowrap;
    }
    .assessments {
        cursor: pointer;
    }
    .content {
        width: calc(100% - 60px);
        height: calc(100% - 109px);
        background: #f6f7fb;
        margin: 0 auto;
        overflow: auto;
    }
    /*滚动条宽度*/
    .content::-webkit-scrollbar {
        width: 4px;
    }
    /*滚动条滑块*/
    .content::-webkit-scrollbar-thumb {
        height: 100px;
        background: #888888;
    }
    .content-title {
        height: 44px;
    }
    .title-radius {
        display: inline-block;
        width: 9px;
        height: 9px;
        background: #468ff9;
        border-radius: 50%;
        margin-left: 20px;
    }
    .choice {
        margin-left: 20px;
    }
    .content-dl {
        margin-left: 9px;
        color: #888888;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
    }
    .assessment-count {
        margin-right: 31px;
        span:nth-child(1) {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #888888;
        }
        span:nth-child(2) {
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #222222;
        }
        span:nth-child(3) {
            font-size: 24px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #222222;
            margin-right: 13px;
        }
        img {
            width: 11px;
            height: 16px;
        }
    }
    .chart {
        width: calc(100% - 60px);
        margin: 0 auto;
        height: 175px;
    }
    .types {
        width: calc(100% - 60px);
        margin: 10px auto;
    }
    .type {
		cursor: pointer;
        width: 100%;
        height: 60px;
        background: white;
        border-radius: 10px;
        display: flex;
        margin-top: 8px;
        justify-content: space-between;
        align-items: center;
    }
    .type-title,
    .type-status {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #888888;
        margin-right: 8px;
    }
    .type-title {
        margin-left: 24px;
    }
    .type-count {
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #222222;
        margin-right: 40px;
    }
    .status-money {
        img {
            width: 11px;
            height: 16px;
        }
    }
    .count {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #888888;
    }
    .hasdashed {
        position: relative;
    }
    .hasdashed:after {
        content: '';
        display: inline-block;
        height: 40px;
        border: 1px dashed #dddddd;
        position: absolute;
        right: 0;
        top: 30px;
    }
}
</style>
