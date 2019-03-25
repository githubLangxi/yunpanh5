<template>
	<rt-section title="结算单明细">
		<el-table stripe ref="tableData" max-height="500" v-loading="loading" v-bind:data="tableData">
            <el-table-column prop="new_srv_expense_claim_idname" label="结算单号">
            </el-table-column>
  			<el-table-column prop="new_costtypetext" label="费用类型">
            </el-table-column>
            <el-table-column prop="new_aplcost" label="审核费用金额">
            </el-table-column>
            <el-table-column prop="new_costdesc" width="600" label="费用说明">
            </el-table-column>
	    </el-table>	
	</rt-section>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      needShowCreateDialog:false,
      time:'',
    };
  },
  props: {
    id: {
      type: String,
      require: true
    },
    disabled: {
      type: Boolean
    },
  },
  watch: {
    formDialog: function(val) {
      if (!this.formDialog) {
        this.$emit('reloadEdit')
      }
    }
  },
  mounted: function() {
    this._fetchRecords();
  },
  methods: {
    _fetchRecords: function() {
      var apiUrl = "../api/ExpenseSummary/GetClaimline/" + this.id;
      rt
        .get(apiUrl)
        .then(res => {
          this.tableData = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    refreshparent:function(){
       this.$emit('resetLoadData');
    },
    isSelectedTable: function() {
      if (this.disabled == true) {
        return false
      } else {
        return true
      }
    },
  }
};
</script>
<style></style>