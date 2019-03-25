<template>
	<rt-section title="监理评分">
    <template slot="toolbar">
    </template>
		<el-table stripe ref="tableData" max-height="500" v-loading="loading" v-bind:data="tableData">
            <el-table-column prop="new_supervision_idName" label="监理单号">
            </el-table-column>
  			    <el-table-column prop="new_code" label="代码">
            </el-table-column>
            <el-table-column prop="new_evaluationstandard_idName" label="评分项目">
            </el-table-column>
            <el-table-column prop="new_gradingcontent" label="评分内容">
            </el-table-column>
            <el-table-column prop="new_standardvalue" label="标准分值">
            </el-table-column>
            <el-table-column prop="new_actualscore" label="实际得分（百分制）">
            </el-table-column>
  			    <el-table-column prop="new_systemuser_idName" label="评分人员">
            </el-table-column>
            <el-table-column prop="new_scoringtime" label="评分时间">
            </el-table-column>
            <el-table-column prop="new_memo" label="备注">
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
      var apiUrl = "../api/Supervision/GetSupervisionScore?id=" + this.supervisionid;
      rt
        .get(apiUrl)
        .then(res => {
          this.tableData = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    }
  }
};
</script>
<style></style>