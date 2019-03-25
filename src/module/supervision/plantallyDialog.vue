<template>
	<rt-section title="项目评估风险">
    <template slot="toolbar">
    </template>
		<el-table stripe ref="tableData" max-height="500" v-loading="loading" v-bind:data="tableData">
            <el-table-column prop="new_categories" label="点检大类">
            </el-table-column>
  			<el-table-column prop="new_type" label="点检小类">
            </el-table-column>
            <el-table-column prop="new_level" label="风险等级">
            </el-table-column>
            <el-table-column prop="new_des" label="风险说明">
            </el-table-column>
            <el-table-column prop="new_audittime" label="审核时间">
            </el-table-column>
            <el-table-column prop="createdon" label="创建时间">
            </el-table-column>
	    </el-table>	
          <!-- <InvoicerecordCreateDialog :id="qualityfeedbackid" @resetLoadData="_fetchRecords" :visible.sync="needShowCreateDialog" v-if="needShowCreateDialog"></InvoicerecordCreateDialog> -->
	</rt-section>
</template>
<script>
// import InvoicerecordCreateDialog from "./InvoicerecordCreateDialog";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      needShowCreateDialog: false,
      time: ""
    };
  },
  components: {
    //   InvoicerecordCreateDialog
  },
  props: {
    supervisionid: {
      type: String,
      require: true
    },
    visible: {
      type: Boolean,
      require: true
    }
  },
  watch: {
    formDialog: function(val) {
      if (!this.formDialog) {
        this.$emit("reloadEdit");
      }
    }
  },
  mounted: function() {
    this._fetchRecords();
  },
  methods: {
    _fetchRecords: function() {
      var apiUrl =
        "../api/Supervision/GetPlantally?id=" + this.supervisionid;
      rt
        .get(apiUrl)
        .then(res => {
          this.tableData = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
  }
};
</script>
<style></style>