<template>
	<div class="index-querry" id="index-get">
		<div class="title-box">
			<div class="detail">指标查看</div>
			<ul class="navs">
				<li class="nav active">家用空调</li>
				<li class="nav">中央空调</li>
				<li class="nav">厨电</li>
			</ul>
			<ul class="right-tags">
				<li class="right-tag" @click="showMask">网页差评（12）</li>
				<li class="right-tag" @click="showMask">评星1-4星（8）</li>
				<li class="right-tag" @click="showMask">重电（0）</li>
				<li class="right-tag" @click="showMask">督办预警 （0）</li>
				<li class="right-tag" @click="showMask">督办（0）</li>
			</ul>
		</div>
		<div class="content next-container">
			<div class="topchart">
				<div id="chart-1" class="index-chart">
					<div class="chart-title">
						<div class="chart-title-left">
							<span class="chart-icon"></span> 安装24h及时率
						</div>
						<div class="chart-title-right">
							<span class="timetype">本年</span>
							<span class="percent">98%</span>
						</div>
					</div>
					<div class="chart-content">

					</div>
				</div>
				<div id="chart-2" class="index-chart">
					<div class="chart-title">
						<div class="chart-title-left">
							<span class="chart-icon"></span> 维修48h及时率
						</div>
						<div class="chart-title-right">
							<span class="timetype">本年</span>
							<span class="percent">98%</span>
						</div>
					</div>
					<div class="chart-content">

					</div>
				</div>
			</div>
			<div class="topchart bottomchart">
				<div class="index-chart next-index-chart">
					<div class="chart-title">
						<div class="chart-title-left">
							<span class="chart-icon"></span> 安装好评率（电商）
						</div>
						<div class="chart-title-right">
							<span class="timetype">本年</span>
							<span class="percent">98%</span>
						</div>
					</div>
					<div class="chart-content">

					</div>
				</div>
				<div class="index-chart next-index-chart">
					<div class="chart-title">
						<div class="chart-title-left">
							<span class="chart-icon"></span> 安装好评率（微信/400）
						</div>
						<div class="chart-title-right">
							<span class="timetype">本年</span>
							<span class="percent">98%</span>
						</div>
					</div>
					<div class="chart-content">

					</div>
				</div>
				<div class="index-chart next-index-chart">
					<div class="chart-title">
						<div class="chart-title-left">
							<span class="chart-icon"></span> 维修好评率（微信/400）
						</div>
						<div class="chart-title-right">
							<span class="timetype">本年</span>
							<span class="percent">98%</span>
						</div>
					</div>
					<div class="chart-content">

					</div>
				</div>
			</div>

		</div>

		<div class="mask" v-if="showflag" @click.stop>
			<div class="dialog">
				<div class="title">
					<div class="title-left">
						<span class="title-icon"></span>
						<span>指标查看</span>
					</div>
					<div class="next-change">
						<dl>
							<dt>日期：本月度 <span class="changearrow changearrowdown"></span></dt>
							<dd class="showstasus">
								<ul>
									<li>本季度</li>
									<li>今年</li>
								</ul>
							</dd>
						</dl>
					</div>
					<button class="close el-icon-close" @click.stop="closeMask"></button>
				</div>
				<div class="detail-content">
					<div class="tables">
						<span class="table select">网页差评18</span>
						<span class="table">评星8</span>
						<span class="table">重电6</span>
						<span class="table">督办预警3</span>
						<span class="table">督办26</span>
					</div>
					<div class="index-content">
						<span class="people" v-for="(item,index) in names">
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
						</span>
						<!--
						<span class="people">
							<span>
								<span class="circular second">1</span>
						<span class="justaname">
											赵一赵一赵一赵一赵一赵一赵一赵一赵一赵一
								</span>
						</span>
						<span>
								<span class="order-count">5</span>
						<span class="order-unit">单</span>
						</span>
						</span>
						<span class="people">
							<span>
								<span class="circular third">1</span>
						<span class="justaname">
											赵一赵一赵一赵一赵一赵一赵一赵一赵一赵一
								</span>
						</span>
						<span>
								<span class="order-count">5</span>
						<span class="order-unit">单</span>
						</span>
						</span>
						<span class="people">
							<span>
								<span class="circular">1</span>
						<span class="justaname">
											赵一赵一赵一赵一赵一赵一赵一赵一赵一赵一
								</span>
						</span>
						<span>
								<span class="order-count">5</span>
						<span class="order-unit">单</span>
						</span>
						</span>
						<span class="people">
							<span>
								<span class="circular">1</span>
						<span class="justaname">
											赵一赵一赵一赵一赵一赵一赵一赵一赵一赵一
								</span>
						</span>
						<span>
								<span class="order-count">5</span>
						<span class="order-unit">单</span>
						</span>
						</span>
						<span class="people">
							<span>
								<span class="circular">1</span>
						<span class="justaname">
											赵一赵一赵一赵一赵一赵一赵一赵一赵一赵一
								</span>
						</span>
						<span>
								<span class="order-count">5</span>
						<span class="order-unit">单</span>
						</span>
						</span>
						<span class="people">
							<span>
								<span class="circular">1</span>
						<span class="justaname">
											赵一赵一赵一赵一赵一赵一赵一赵一赵一赵一
								</span>
						</span>
						<span>
								<span class="order-count">5</span>
						<span class="order-unit">单</span>
						</span>
						</span>
						<span class="people">
							<span>
								<span class="circular">1</span>
						<span class="justaname">
											赵一赵一赵一赵一赵一赵一赵一赵一赵一赵一
								</span>
						</span>
						<span>
								<span class="order-count">5</span>
						<span class="order-unit">单</span>
						</span>
						</span>
						<span class="people">
							<span>
								<span class="circular">1</span>
						<span class="justaname">
											赵一赵一赵一赵一赵一赵一赵一赵一赵一赵一
								</span>
						</span>
						<span>
								<span class="order-count">5</span>
						<span class="order-unit">单</span>
						</span>
						</span>
						<span class="people">
							<span>
								<span class="circular">1</span>
						<span class="justaname">
											赵一赵一赵一赵一赵一赵一赵一赵一赵一赵一
								</span>
						</span>
						<span>
								<span class="order-count">5</span>
						<span class="order-unit">单</span>
						</span>
						</span>-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showflag: false,
				color: ['#5A98F3'],
				names:[{
					name:"张开达",
					count:Math.random(1,50).toFixed(0),
				},{
					name:"黄嘹亮",
					count:Math.random(1,50).toFixed(0),
				},{
					name:"袁晴怡",
					count:Math.random(1,50).toFixed(0),
				},{
					name:"张益培",
					count:Math.random(1,50).toFixed(0),
				},{
					name:"翁明",
					count:Math.random(1,50).toFixed(0),
				},{
					name:"卢山",
					count:Math.random(1,50).toFixed(0),
				},{
					name:"王乐乐",
					count:Math.random(1,50).toFixed(0),
				},{
					name:"龚覃彦",
					count:Math.random(1,50).toFixed(0),
				},{
					name:"王琛",
					count:Math.random(1,50).toFixed(0),
				}]
			}
		},
		mounted() {

			this.setChart();
		},
		methods: {
			setChart() {
				let arry = document.getElementsByClassName('chart-content');
				/*console.log(arry)
				arry.forEach((item,index,arr)=>{
					this.drawLine(item);
				})*/
				for(let i = 0; i < arry.length; i++) {
					this.drawLine(arry[i], i);
				}
			},
			showMask() {
				let body = document.getElementsByTagName("body")[0];
				body.style.overflow = 'hidden';
				this.showflag = true;
			},
			closeMask() {
				let body = document.getElementsByTagName("body")[0];
				body.style.overflow = 'auto';
				this.showflag = false;
			},
			drawLine(dom, index) {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(dom);
				// 绘制图表
				myChart.setOption({
					title: {},
					tooltip: {},
					color: index < 2 ? this.color : ['#FFA604'],
					xAxis: {
						data: ["1月","2月","3月","4月","5月", "6月", "7月", "8月", "9月", "10月", "11月","12月"]
					},
					yAxis: {
						splitLine: {
							show: false
						}
					},
					series: [{
						name: '及时率',
						type: index < 2 ? 'bar' : 'line',
						data: [5, 20, 36, 10, 10, 20, 60,100,40,10,20,8]
						/*data:function(){
							let arr = [];
							for(let i = 0; i <12; i++){
								arr.push(Math.random(0,100).toFixed(0))
							}
							return arr
						}*/
					}]
				});
			},
		},

	}
</script>

<style lang="scss">
	#index-get {
		margin-top: 10px;
		height: 580px;
		.mask {
			position: fixed;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, .4);
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
			background: #468FF9;
			margin-right: 16px;
		}
		.close {
			width: 40px;
			height: 40px;
			background: #F3F3F3;
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
			height: calc(100% - 85px);
			overflow: auto;
			margin: 0 auto;
			background: #F6F7FB;
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
				border: 1px solid #DAE9FE;
				border-right: none;
				font-size: 14px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #468FF9;
				cursor: pointer;
				background: rgba(246, 247, 251, 1);
			}
			.table:last-child {
				border-right: 1px solid #DAE9FE;
			}
			.select {
				color: white;
				background: #468FF9;
				border-color: #468FF9;
			}
			.table:hover {
				color: white;
				background: #468FF9;
				border-color: #468FF9;
			}
		}
		.index-content {
			height: calc(100% - 62px);
			width: calc(100% - 60px);
			margin: 0 auto;
			overflow: auto;
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
			background: #F3F3F3;
			color: #555555;
			font-size: 16px;
			font-family: Arial;
			font-weight: 400;
			margin-left: 16px;
			margin-right: 18px;
		}
		.first,
		.second,
		.third {
			color: white;
			background: #F52F2F;
		}
		.second {
			background: #F5801A;
		}
		.third {
			background: #E8D100;
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
				background: #FFE4E4;
				color: #FF0000;
			}
		}
		.right-tag {
			float: left;
			font-size: 12px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #60AA00;
			width: 120px;
			height: 20px;
			background: #E5F5D1;
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
			background: #FFBA00;
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
			.chart-title-left{
				margin-left: 3.2%;
			}
		}
	}
</style>