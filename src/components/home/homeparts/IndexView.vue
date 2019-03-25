<template>
	<div id="index-view">
		<div class="dialog">
			<div class="dialog-title flex">
				<span class="title-name">
					 指标查看
				</span>
				<button class="close el-icon-close" @click="hideThis"></button>
			</div>
			<div class="content"></div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:['showFlag'],
		methods:{
			hideThis(){
				this.$emit("hideIndexView",false);
			}
		}
	}
</script>

<style lang="scss">
	#index-view {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .4);
		top: 0;
		left: 0;
		.dialog {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			background: white;
			width: 611px;
			height: 654px;
			border-radius: 2px;
		}
		.dialog-title {
			height: 85px;
			align-items: center;
			position: relative;
		}
		.title-name {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-left: 10px;
			font-size: 16px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #222;
		}
		.title-name:before {
			content: "";
			display: inline-block;
			width: 4px;
			height: 20px;
			background: #468FF9;
			margin-right: 20px;
		}
		.close {
			width: 40px;
			height: 40px;
			border: none;
			border-radius: 50%;
			font-size: 14px;
			color: #888888;
			position: absolute;
			right: 17px;
			top: 22.5px;
			outline: none;
		}
		.content{
			width: 551px;
			height: 569px;
			overflow: auto;
			background: #F6F7FB;
			margin: 0 auto;
		}
	}
</style>