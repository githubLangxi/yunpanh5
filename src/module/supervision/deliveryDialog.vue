<template>
	<rt-section title="发货明细">
    <template slot="toolbar">
    </template>
		<el-table stripe ref="tableData" max-height="500" v-loading="loading" v-bind:data="tableData">
            <el-table-column prop="new_product_idName" label="机型产品">
            </el-table-column>
  			<el-table-column prop="new_productcode" label="机型产品编码">
            </el-table-column>
            <el-table-column prop="new_qty" label="数量">
            </el-table-column>
            <el-table-column prop="new_deliverydate" label="发货日期">
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
        "../api/Supervision/GetDelivery?id=" + this.supervisionid;
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