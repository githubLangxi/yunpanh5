<template>
	<rt-section title="电话记录">
    <template slot="toolbar">
    </template>
		<el-table stripe ref="tableData" max-height="500" v-loading="loading" v-bind:data="tableData">
            <el-table-column prop="owneridName" label="负责人">
            </el-table-column>
  			<el-table-column prop="subject" label="内容反馈">
            </el-table-column>
            <el-table-column prop="new_contact" label="联系人">
            </el-table-column>
            <el-table-column prop="phonenumber" label="电话号码">
            </el-table-column>
            <el-table-column prop="scheduledstart" label="电话跟进时间">
            </el-table-column>
            <el-table-column prop="new_supervision_idName" label="监理单号">
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
        "../api/Supervision/GetPhoneCall?id=" + this.supervisionid;
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