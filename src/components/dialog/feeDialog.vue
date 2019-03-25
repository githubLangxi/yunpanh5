<template>
	<div id="feeDialog">
		<div class="title">
			<span class="partdialog-icon"></span>配件安全库存
			<span class="close el-icon-close" @click.stop="closeDialig"></span>
		</div>
		<div class="content">
			<div class="type-selece">
				<span class="pot"></span>
				日期：
				<div class="div-select">
					本年度
					<span class="img-box"><img src="../../assets/imgs/arrow-blue.png" /></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {}
		},
		methods:{
			closeDialig(){
				this.$emit("close",false);
			}
		}
	}
</script>

<style lang="scss">
	#feeDialog{
		.content{
			height: calc(100% - 68px);
			width: calc(100% - 80px);
			margin: 0 auto;
			background: #F6F7FB;
			border-radius: 2px 2px 0 0;
		}
		.type-selece{
			height: 52px;
			background: pink;
			display: flex;
			align-items: center;
		}
		
		.pot{
			display: inline-block;
			width: 9px;
			height: 9px;
			background: #468FF9;
			border-radius: 50%;  
			margin-left: 30px;
			margin-right: 10px;
		}
		.div-select{
			cursor: pointer;
		}
		.img-box{
			width: 11px;
			height: 6px;
			cursor: pointer;
			img{
				width: 11px;
				height: 6px;
			}
		}
	}
</style>