<template>
	<rt-section title="出差记录">
    <template slot="toolbar">
    </template>
		<el-table stripe ref="tableData" max-height="500" v-loading="loading" v-bind:data="tableData">
            <el-table-column prop="new_srv_workorder_idName" label="服务单号">
            </el-table-column>
  			<el-table-column prop="new_srv_worker_idName" label="服务人员">
            </el-table-column>
            <el-table-column prop="new_stationidName" label="所属服务站">
            </el-table-column>
            <el-table-column prop="new_group" label="组别">
            </el-table-column>
            <el-table-column prop="new_issingle" label="是否接单人">
            </el-table-column>
            <el-table-column prop="new_appointmenttime" label="预约时间">
            </el-table-column>
  			<el-table-column prop="new_statecodeText" label="服务状态">
            </el-table-column>
            <el-table-column prop="new_endstateText" label="完工情况">
            </el-table-column>
            <el-table-column prop="new_appointmentcreatetime" label="预约创建时间">
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
        "../api/Supervision/GetOutsideLine?id=" + this.supervisionid;
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