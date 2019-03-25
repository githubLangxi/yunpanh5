<template>
	<rt-section title="初审问题点">
		<el-table stripe ref="tableData" max-height="500" v-loading="loading" v-bind:data="tableData">
            <el-table-column prop="new_name" label="问题编码">
            </el-table-column>
  			    <el-table-column prop="new_expense_claim_idname" label="关联结算单">
            </el-table-column>
            <el-table-column prop="new_firstrule_idname" label="初审规则">
            </el-table-column>
            <el-table-column prop="new_deductamount" label="扣款金额">
            </el-table-column>
            <el-table-column prop="new_executestatustext" label="执行状态">
            </el-table-column>
            <el-table-column prop="new_ishighesttext" label="是否最高标准">
            </el-table-column>
            <el-table-column prop="createdonUTC" label="创建时间">
            </el-table-column>
	    </el-table>		    	
	</rt-section>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      tableData: []
    };
  },
  props: {
    id: {
      type: String,
      require: true
    }
  },
  mounted: function() {
    this._fetchRecords();
  },
  methods: {
    _fetchRecords: function() {
      let that = this;
      var apiUrl = "../api/ExpenseClaim/GetExpenseClaimLine/" + this.id;
      rt
        .get(apiUrl)
        .then(res => {
          //this.queryForm = res;
          that.tableData = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    }
  }
};
</script>
<style></style>