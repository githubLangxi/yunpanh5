<template>
	<div class="feeinfo" id="feeinfo">
		<div class="top">
			<div class="part-title">
				厨电明细
				<div class="select">
					<span class="arrow-blue" @click.stop="showFees">
						<img src="../../../assets/imgs/arrow-blue.png" />
					</span>
					<ul class="select-fee" v-bind:class="{active:flag}">
						<li class="fee" @click.stop="chooseFee">费用1</li>
						<li class="fee" @click.stop="chooseFee">费用2</li>
					</ul>
				</div>
			</div>
			<div class="subsidy">
				<span>￥</span> 3,600.00
				<span>(补贴)</span>
			</div>
		</div>
		<div class="middle">
			<dl class="status"  @click.stop="showDialog">
				<dt class="status1">已提交</dt>
				<dd class="status-money">
					<span class="money-symbol">￥</span> 10,000,00.00
				</dd>
			</dl>
			<dl class="status"  @click.stop="showDialog">
				<dt class="status2">已提交</dt>
				<dd class="status-money">
					<span class="money-symbol">￥</span> 10,000,00.00
				</dd>
			</dl>
		</div>
		<div class="bottom">
			<div>
				<span class="invoice">发票：￥</span>12,762.00
			</div>
			<div class="sendtype">已寄出</div>
		</div>
		<div class="mask" v-bind:class="{show:showFlag}" @click.stop="hideMask"></div>
		<feeDialog v-bind:class="{show:showFlag}" v-on:close="hideDialog"></feeDialog>
	</div>
</template>

<script>
	import feeDialog from '../../dialog/feeDialog'
	export default {
		data() {
			return {
				showFlag: false,
				flag:false,
			}
		},
		components: {
			feeDialog
		},
		methods: {
			showFees() {
				this.flag = true;
			},
			chooseFee() {
				this.flag = false;
			},
			showDialog() {
				this.showFlag = true;
				let body = document.getElementsByTagName("body")[0];
		 		body.style.overflow = "hidden";
			},
			resetData() {
				this.showFlag = false;
				let body = document.getElementsByTagName("body")[0];
				body.style.overflow = "auto";
			},
			hideMask() {
				this.resetData();
			},
			hideDialog(msg) {
				this.showFlag = msg;
		 		this.resetData();
			}
		}
	}
</script>

<style lang="scss">
	#feeinfo {
		.select {
			display: inline-block;
			position: relative;
		}
		.select-fee {
			position: absolute;
			left: 0;
			top: 6px;
			white-space: nowrap;
			display: none;
		}
		.fee {
			font-size: 12px;
			font-weight: 400;
			color: #888888;
			cursor: pointer;
		}
		.fee:hover {
			background: #468FF9;
			color: white;
		}
		.active {
			display: block;
		}
		.arrow-blue {
			display: inline-block;
			width: 11px;
			height: 6px;
			cursor: pointer;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.mask {
			position: fixed;
			width: 100%;
			height: 100%;
			background: black;
			opacity: .4;
			z-index: 22;
			top: 0;
			left: 0;
		}
	}
</style>