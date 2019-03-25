<template>
	<div id="partdialog">
		<div class="title">
			<span class="partdialog-icon"></span>配件安全库存
			<span class="close el-icon-close" @click="closeDialig"></span>
		</div>
		<div class="parts-section">
			<table class="parts-table" border="" cellspacing="" cellpadding="">
				<!--<tr><th>Header</th></tr>-->
				<tr class="part-infomation">
					<td class="part-name"><span>加长轴(空心) φ15×651</span></td>
					<td class="now-has"><span>当前库存 <span class="has-color">3</span> 个</span>
					</td>
					<td class="safty-has"><span>安全库存 <span class="has-color">197</span>个</span>
					</td>
					<td class="btn-td"><span class="has-apply">已申请（2）</span></td>
				</tr>
				<tr class="part-infomation">
					<td class="part-name"><span>加长轴(空心) φ15×651</span></td>
					<td class="now-has"><span>当前库存 <span class="has-color">3</span> 个</span>
					</td>
					<td class="safty-has"><span>安全库存 <span class="has-color">197</span>个</span>
					</td>
					<td class="btn-td"><span class="has-apply go-apply">数量申请</span></td>
				</tr>
				<tr class="part-infomation">
					<td class="part-name"><span>加长轴(空心) φ15×651</span></td>
					<td class="now-has"><span>当前库存 <span class="has-color">3</span> 个</span>
					</td>
					<td class="safty-has"><span>安全库存 <span class="has-color">197</span>个</span>
					</td>
					<td class="btn-td"><span class="has-apply">已申请（2）</span></td>
				</tr>
			</table>
		</div>
		<div class="btns">
			<button class="reset">全部重置</button>
			<button class="quick-apply">一键申请</button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			closeDialig(){
				this.$emit("close",false);
			}
		},
		created(){
			
		},
		mounted(){
			
		}
	}
</script>

<style lang="scss">
	#partdialog {}
</style>