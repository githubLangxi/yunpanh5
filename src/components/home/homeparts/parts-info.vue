<template>
	<div class="parts-info" id="parts-info">
		<div class="title-box">
			<div class="detail">配件明细</div>
			<ul class="navs">
				<li class="nav" v-bind:class="{'active':selectName=='家用空调'}" @click="showDetaile('家用空调')">家用空调</li>
					<li class="nav" v-bind:class="{'active':selectName=='中央空调'}" @click="showDetaile('中央空调')">中央空调</li>
					<li class="nav" v-bind:class="{'active':selectName=='厨电'}" @click="showDetaile('厨电')">厨电</li>
				<!--<li class="nav" v-for="(item,index) in productLine" v-bind:class="{'active':selectName==getProductLineName(item.new_auxcompanytext)}" @click="getCount(getProductLineName(item.new_auxcompanytext))">
					{{getProductLineName(item.new_auxcompanytext)}}
				</li>-->
			</ul>
			<!--<button class="getSaftyInfo" @click="showMask">查看安全库存<span class="el-icon-arrow-right"></span></button>-->
		</div>

		<div class="content">
			<dl class="part-info">
				<dt class="moneycount">
    				<span class="money-icon">￥</span>
    				{{feeshow.TotalDeposit}}
    			</dt>
				<dd class="money-describe">已抵押金</dd>
			</dl>
			<dl class="part-info hasborder">
				<dt class="moneycount">
    				<span class="money-icon">￥</span>
    				{{feeshow.CreditAmount}}
    			</dt>
				<dd class="money-describe">可用授信</dd>
			</dl>
			<dl class="part-info">
				<dt class="moneycount">
    				<span class="money-icon">￥</span>
    				{{feeshow.InventoryAmount}}
    			</dt>
				<dd class="money-describe">已占用</dd>
			</dl>
			<dl class="part-info">
				<dt class="moneycount hascolor">
    				<span class="money-icon">￥</span>
    				{{feeshow.AvailableAmount}}
    			</dt>
				<dd class="money-describe">剩余可用</dd>
			</dl>
		</div>

		<!--<dl class="part-info">
			<dt>
    			<button class="getmorebtn" @click="showMask">查看安全库存</button>
    		</dt>
		</dl>-->
		<div class="mask" v-bind:class="{show:flag}" @click="hideMask"></div>
		<dialog-form v-bind:class="{show:flag}" v-on:close="hideDialog"></dialog-form>
	</div>
</template>

<script>
	import { getProductName } from "../../../store/publicFucs"
	import dialogForm from "../../dialog/partdialog"
	const http = "http://47.96.95.146:8055/"
	export default {
		data() {
			return {
				flag: false,
				selectName: '家用空调',
				feeInfo:[],
				feeshow:{},
			}
		},
		components: {
			dialogForm
		},
		methods: {
			showMask() {
				this.flag = true;
				let body = document.getElementsByTagName("body")[0];
				body.style.overflow = "hidden";
			},
			hideMask() {
				/*this.flag = false;
				let body = document.getElementsByTagName("body")[0];
				body.style.overflow = "auto";*/
				this.resetData();
			},
			hideDialog(msg) {
				//console.log(msg,123)
				this.flag = msg;
				this.resetData();
			},
			resetData() {
				this.flag = false;
				let body = document.getElementsByTagName("body")[0];
				body.style.overflow = "auto";
			},
			getShowFee(choiceName){
				let obj = [];
				if(choiceName == '家用空调'){
					obj = this.feeInfo.filter((item,index,arr)=>{
						return item.new_auxcompanytext == '股份-家用'
					})
				}
				if(choiceName == '中央空调'){
					obj = this.feeInfo.filter((item,index,arr)=>{
						return item.new_auxcompanytext == '宁波奥克斯电气股份有限公司'
					})
				}
				if(choiceName == '厨电'){
					obj = this.feeInfo.filter((item,index,arr)=>{
						return item.new_auxcompanytext == '厨电'
					})
				} 
				return obj
			},
			getProducInfo() {
				rt.get("../api/AmountChangeLog/GetAmountCreditModel").then((res) => {
					this.feeInfo = res;
					let feeshow = this.getShowFee(this.selectName);
					this.feeshow = feeshow[0] ? feeshow[0] : {}
					/*this.getCount(this.selectName);*/
				}).catch((err) => {

				})
			},
			getProductLineName(name) {
				return getProductName(name)
			},
			showDetaile(name){
				this.selectName = name;
				let feeshow = this.getShowFee(this.selectName);
				this.feeshow = feeshow[0] ? feeshow[0] : {};
				console.log(this.feeshow)
			},
			getCount(name) {
				this.selectName = name;
				/*if(name) {
					let params = {
						name: name
					}
					rt.get(http + "api/Index/getmoneydata", params).then((res) => {
						this.feeInfo = res;
					}).catch((err) => {

					})
				}*/

			}
		},
		created() {
			this.getProducInfo()
		},
		mounted() {

		}
	}
</script>

<style lang="scss">

</style>