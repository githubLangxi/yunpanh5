<template>
	<rt-section v-bind:title="$t('new_srv_workorder')">
		<el-table stripe ref="tableData" max-height="500" v-loading="loading" v-bind:data="tableData">
            <el-table-column prop="new_name" v-bind:label="$t('new_srv_workorder.new_name')" width="170">
            </el-table-column>
      			<el-table-column prop="new_typetext" v-bind:label="$t('new_srv_workorder.new_type')" width="150">
      			</el-table-column>
      			<el-table-column prop="new_productmodel_idName" v-bind:label="$t('new_srv_workorder.new_productmodel_id')" width="150">
      			</el-table-column>
            <el-table-column prop="new_station_idname" show-overflow-tooltip  v-bind:label="$t('new_srv_workorder.new_station_id')" width="200">
            </el-table-column>
            <el-table-column  prop="new_srv_worker_idname" v-bind:label="$t('new_srv_workorder.new_srv_worker_id')"  show-overflow-tooltip width="150">
            </el-table-column> 
            <el-table-column prop="new_workhourcost" v-bind:label="$t('new_srv_workorder.new_workhourcost')"  width="200" >
            </el-table-column>
            <el-table-column prop="new_partcost" v-bind:label="$t('new_srv_workorder.new_partcost')" width="200">
            </el-table-column>
            <el-table-column prop="new_outsidecost" v-bind:label="$t('new_srv_workorder.new_outsidecost')" width="200">
            </el-table-column>
            <el-table-column prop="new_othercost" v-bind:label="$t('new_srv_workorder.new_othercost')" width="150">
            </el-table-column>
            <el-table-column prop="new_totalcost" v-bind:label="$t('new_srv_workorder.new_totalcost')" width="150">
            </el-table-column>     		
	 </el-table>		    	
	</rt-section>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      options: []
    };
  },
  props: {
    id: {
      type: String,
      require: true
    }
  },
  mounted: function() {
    this.getServiceType();
    this._fetchRecords();
  },
  methods: {
    getServiceType: function() {
      var self = this;
      rt
        .get("../api/crmpicklist/options/new_srv_workorder/new_type")
        .then(function(res) {
          self.options = res;
        });
    },
    _fetchRecords: function() {
      let that = this;
      var apiUrl =
        "../api/ExpenseClaim/GetExpenseClaimLines/" + escape(this.id);
      rt
        .get(apiUrl)
        .then(res => {
          for (var i = 0; i < res.length; i++) {
            for (var j in that.options) {
              if (that.options[j].Value == res[i].new_type) {
                res[i].new_typetext = that.options[j].Text;
              }
            }
          }
          that.tableData = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    }
  }
};
</script>
<style type="text/css">

</style>