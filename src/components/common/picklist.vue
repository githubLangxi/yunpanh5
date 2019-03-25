<template>
	<div class="picklist">
		<el-select v-model="value" clearable :disabled="disabled" class="rt-portal-item-select">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				{{item.label}}
			</el-option>
		</el-select>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:['entitylogicname','attributename','originSelected','isDisabled'],
		data(){
			return{
				options: [],
				value:this.originSelected,
				disabled:false
			}
		},
		computed:{
			modifyisDisabled:function(){
				return Boolean(this.isDisabled)
			}
		},
		methods:{
			bindPicklist:function(){
				var self = this;
				var name = self.entitylogicname;
				var atrname = self.attributename;
				this.$http.get("../api/crmpicklist/options/" + name + "/" + atrname)
				.then(function (res) {
					var picklist = res.data.Data;
					for (var i = 1; i <= picklist.length; i++) {
						var picklistOption={};
						picklistOption.value = picklist[i - 1].Value;
						picklistOption.label = picklist[i - 1].Text;
						self.options.push(picklistOption);
					}
				});
			}
		},
		mounted:function(){
			this.disabled = this.modifyisDisabled;
			this.bindPicklist();
		},
		watch: {
			value:function(val){
				this.$emit('selected-option',val);
			},
			originSelected:function(val){
				this.value=val;
			},
			modifyisDisabled:function(val){
				this.disabled = val;
			}
		}
	}
</script>

<style type="text/css">
	
</style>