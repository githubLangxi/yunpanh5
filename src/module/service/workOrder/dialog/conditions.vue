<template>
	<div id="conditions" v-bind:class="{'conditionshow':showCondition}">
		<div class="dialog">
			<div class="title">
				<span class="blue-bar"></span> 智能添加
				<span class="close el-icon-close" @click="closeDialog"></span>
			</div>
			<div class="section">
				<div class="selected">
					<div class="selected-title">
						已选标签
					</div>
					<div class="select-tags">
						<span class="select-tag" v-for="(item,index) in hasSelect">
							{{item.name}}
							<span class="del el-icon-close" @click="sliceHasSelect(item,index)"></span>
						</span>
					</div>
				</div>
				<div class="all-tags">
					<div class="all-tags-nav">
						<span class="all-tags-title" v-bind:class="{'active':flag}" @click="selectTyps(true)">常用</span>
						<span class="all-tags-title" v-bind:class="{'active':!flag}" @click="selectTyps(false)">不常用</span>
					</div>
					<div class="tag-groups">
						<div class="tags-box" v-if="flag">
							<span class="tag" v-for="(item,index) in allConditions.table1" v-bind:class="{'selected-tag':item.selected}" @click="selectTag(item)">
								{{item.name}}
							</span>
							<!--<span class="tag selected-tag">
								重电次数(大于等于)
							</span>-->
						</div>
						<div class="tags-box" v-if="!flag">
							<span class="tag" v-for="(item,index) in allConditions.table2" v-bind:class="{'selected-tag':item.selected}" @click="selectTag(item)">
								{{item.name}}
							</span>
						</div>
					</div>
					<div class="btns">
						<button class="reset" @click="allReset">全部重置</button>
						<button class="confirm" @click="updataTags">确定</button>
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
				flag: true, //显示常用或者不常用
				hasSelect: [], //已经选中的
				allConditions: {
					table1: [{
						key: 'new_serviceitem',
						name: '服务项目',
						value: null,
						selected: false,
					}, {
						key: 'new_logisticsstatus',
						name: '物流状态',
						value: null,
						selected: false,
					}, {
						key: 'new_deliverydate',
						name: '妥投/物流签收日期',
						value: '',
						selected: false,
					}, {
						key: 'new_retreatnumber',
						name: '退单次数',
						value: null,
						selected: false,
					}, {
						key: 'new_trace_warningtimes',
						name: '跟踪警告次数(大于等于)',
						value: null,
						selected: false,
					}, {
						key: 'new_supervise_warningtimes',
						name: '督办预警次数(大于等于)',
						value: null,
						selected: false,
					}, {
						key: 'new_supervise',
						name: '督办次数',
						value: null,
						selected: false,
					}, {
						key: 'new_rechargecycles',
						name: '重电次数(大于等于)',
						value: null,
						selected: false,
					}, {
						key: 'new_speicaltype',
						name: '特殊类型',
						value: null,
						selected: false,
					}, {
						key: 'new_overduereasons',
						name: '超期原因',
						value: null,
						selected: false,
					}, {
						key: 'new_csi',
						name: "用户好评率",
						value: null,
						selected: false,
					}, {
						key: 'new_iscomplain',
						name: '是否差评',
						value: null,
						selected: false,
					}, {
						key: 'new_servicelength2',
						name: '总时长',
						value: null,
						selected: false,
					}, {
						key: 'new_servicelength1',
						name: '网点时长(小时)',
						value: null,
						selected: false,
					},{
						key: 'engineer_mine',
						name: '工程师预约',
						value: null,
						selected: false,
					},
					/*,
					{
						key: 'new_worker_code',
						name: '派往工程师编码',
						value: '',
						selected: false,
					}*/
					/*, {
						key: 'new_worker_name',
						name: '派往工程师名称',
						value: '',
						selected: false,
					}*/
					],
					table2: [{
						key: 'new_dealstage',
						name: '处理阶段',
						value: null,
						selected: false,
					}, {
						key: 'new_dealstatus',
						name: '处理状态',
						value: null,
						selected: false,
					}, {
						key: 'new_productmodel_id',
						name: '产品类型',
						value: 'obj',
						selected: false,
					}, {
						key: 'new_source',
						name: '来源途径',
						value: null,
						selected: false,
					}, {
						key: 'new_viplevel',
						name: 'VIP等级',
						value: null,
						selected: false,
					}, {
						key: 'dateFrom',
						name: '受理时间起',
						value: '',
						selected: false,
					}, {
						key: 'dateTo',
						name: '受理时间止',
						value: '',
						selected: false,
					}, {
						key: 'new_deallevel',
						name: '处理级别',
						value: null,
						selected: false,
					}, {
						key: 'new_content',
						name: '跟单内容',
						value: null,
						selected: false,
					}, {
						key: 'new_auditpoint',
						name: '网点完工结果',
						value: null,
						selected: false,
					}, {
						key: 'new_auditcentrality',
						name: '中心完工结果',
						value: null,
						selected: false,
					}, {
						key: 'new_audithq',
						name: '总部完工结果',
						value:null,
						selected: false,
					}, {
						key: 'new_status',
						name: '回访状态',
						value: null,
						selected: false,
					}, {
						key: 'new_requiretime',
						name: '预约上门时间',
						value: '',
						selected: false,
					}, {
						key: 'new_timequantum',
						name: '预约上门时间段',
						value: '',
						selected: false,
					}, {
						key: 'new_confirmtime1',
						name: '网点完工时间段',
						value: '',
						selected: false,
					}, {
						key: 'new_confirmtime1From',
						name: '网点完工日期起',
						value: '',
						selected: false,
					}, {
						key: 'new_confirmtime1To',
						name: '网点完工日期止',
						value: '',
						selected: false,
					}, {
						key: 'new_statement',
						name: '派工说明',
						value: '',
						selected: false,
					}, {
						key: 'new_reassignment',
						name: '改派原因',
						value: null,
						selected: false,
					}, {
						key: 'new_ownstation_id',
						name: '原安装网点',
						value: 'obj',
						selected: false,
					}, {
						key: 'new_province_id',
						name: '省份',
						value: 'obj',
						selected: false,
					}, {
						key: 'new_city_id',
						name: '城市',
						value: 'obj',
						selected: false,
					}, {
						key: 'new_county_id',
						name: '区县',
						value: 'obj',
						selected: false,
					}, {
						key: 'new_town_id',
						name: '街道',
						value: 'obj',
						selected: false,
					}, {
						key: 'new_engineeringcode',
						name: '工程工单',
						value: '',
						selected: false,
					}, {
						key: 'new_coolanttype',
						name: '制冷剂',
						value: null,
						selected: false,
					}, 
					/*{
						key: 'new_systemuser_id',
						name: '受理人',
						value: 'obj',
						selected: false,
					}*/
					]
				}, //所有筛选条件
			}
		},
		watch: {
			showCondition: {
				handler(cur, old) {
					if(cur) {
						this.hasSelect = this.selectTags;
						this.hasSelect.map((item, index, arr) => {
							this.setChoice(item, this.allConditions.table1);
							this.setChoice(item, this.allConditions.table2);
						})
					}
				},
				deep: true
			}
		},
		props: ["showCondition", "selectTags"],
		methods: {
			closeDialog() {
				this.allReset();
				this.flag = true;
				this.$emit("closeCondition", false);
			},
			selectTyps(flag) {
				this.flag = flag;
			},
			selectTag(item) {
				item.selected = !item.selected;
				this.setHasSelect(item);
			},
			setHasSelect(item) {
				if(item.selected) {
					this.hasSelect = this.unique(this.hasSelect.concat(item));
				} else {
					this.hasSelect = this.hasSelect.filter((item1, index, arr) => {
						return item1.key != item.key
					})
				}
			},
			sliceHasSelect(item, index) {
				this.hasSelect.splice(index, 1);
				if(this.flag) {
					this.setSelectFlag(this.allConditions.table1, item);
				} else {
					this.setSelectFlag(this.allConditions.table2, item);
				}
			},
			setSelectFlag(arr, obj) {
				if(obj) {
					arr.map((item, index, arry) => {
						if(item.key == obj.key) {
							item.selected = false;
							return;
						}
					})
				} else {
					arr.map((item, index, arry) => {
						item.selected = false;
					})
				}
			},
			allReset() {
				this.hasSelect = [];
				this.setSelectFlag(this.allConditions.table1);
				this.setSelectFlag(this.allConditions.table2);
			},
			unique(arr) {
				let unique = {};
				arr.forEach(function(item) {
					unique[JSON.stringify(item)] = item;
				})
				arr = Object.keys(unique).map(function(u) {
					return JSON.parse(u);
				})
				return arr;
			},
			updataTags() { //存储搜索tags
				let params = [JSON.stringify(this.hasSelect)];
				rt.post("../api/Work/PostSearch", params).then((res) => {
					/*console.log(res, 1);
					console.log(JSON.parse(res));*/
					this.closeDialog();
				}).catch((err) => {
					alert(err)
				})
			},
			setChoice(item, arr) {
				for(let i = 0; i < arr.length; i++) {
					if(arr[i].key == item.key) {
						arr[i].selected = true;
						break;
					} else {
						continue;
					}
				}
			},
		},
		createed() {
		},
		mounted() {
		}
	}
</script>

<style lang="scss">
	#conditions {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .4);
		display: none;
		.dialog {
			width: 891px;
			height: 665px;
			background: white;
			border-radius: 2px;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
		}
		.section {
			height: calc(100% - 74px);
			overflow: auto;
			display: flex;
			flex-direction: column;
		}
		.title {
			height: 74px;
			font-size: 16px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #222222;
			line-height: 74px;
			position: relative;
		}
		.blue-bar {
			display: inline-block;
			width: 4px;
			height: 20px;
			background: #468FF9;
			position: relative;
			top: 3px;
			margin-left: 10px;
			margin-right: 15px;
			border-radius: 2px;
		}
		.close {
			color: #888888;
			font-size: 14px;
			position: absolute;
			top: 30px;
			right: 30px;
			cursor: pointer;
		}
		.selected-title {
			height: 48px;
			line-height: 48px;
			text-indent: 39px;
			font-size: 24px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #222222;
		}
		.select-tags {
			box-sizing: border-box;
			padding: 0 10px;
			padding-top: 30px;
			border-bottom: 1px solid #F0F0F0;
			max-height: 230px;
			overflow: auto;
		}
		.select-tag {
			background: #468FF9;
			padding: 10px 32px;
			display: inline-block;
			border-radius: 4px;
			color: white;
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			margin-left: 30px;
			margin-bottom: 30px;
		}
		.del {
			color: white;
			margin-left: 19px;
			font-size: 12px;
			cursor: pointer;
		}
		.all-tags-nav {
			height: 71px;
			color: #888888;
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			box-sizing: border-box;
			padding-left: 20px;
		}
		.all-tags-title {
			display: inline-block;
			height: 100%;
			line-height: 71px;
			padding: 0 20px;
			text-align: center;
			cursor: pointer;
		}
		.all-tags-title:hover {
			color: #468FF9;
		}
		.all-tags-title.active {
			color: #468FF9;
		}
		.btns {
			height: 64px;
			background: #F8F8F8;
			line-height: 64px;
		}
		.reset,
		.confirm {
			width: 331px;
			height: 44px;
			color: black;
			border: 1px solid #DDDDDD;
			background: white;
			margin-left: 20px;
			border: none;
			border-radius: 2px;
			font-size: 16px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			cursor: pointer;
			box-shadow: 0 0 2px #DDDDDD;
		}
		.confirm {
			background: #468FF9;
			color: white;
			width: 500px;
		}
		.tag-groups {
			display: flex;
			flex-direction: column;
			flex: 1;
		}
		.all-tags {
			display: flex;
			flex-direction: column;
			flex: 1;
		}
		.tags-box {
			display: block;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding: 0 10px;
			overflow: auto;
		}
		.tag {
			display: inline-block;
			padding: 9px 24px;
			background: #F6FAFC;
			border-radius: 4px;
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #555555;
			margin-left: 30px;
			cursor: pointer;
			margin-bottom: 20px;
		}
		.selected-tag {
			background: #E4F1FF url(../../../../assets/imgs/checked.png) no-repeat right top;
			background-size: 20px 19px;
			color: #4990E2;
		}
		.tag:hover {
			background: #E4F1FF url(../../../../assets/imgs/checked.png) no-repeat right top;
			background-size: 20px 19px;
			color: #4990E2;
		}
	}
	
	.conditionshow {
		display: block !important;
	}
</style>