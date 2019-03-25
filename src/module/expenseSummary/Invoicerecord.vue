<template>
	<rt-section title="发票登记单">
    <template slot="toolbar">
      <rt-button type="add" text="批量添加" @click="createDetail" v-if="!disabled" />
      <rt-button type="delete" @click="deleteDetail" v-if="!disabled" />
    </template>
		<el-table stripe ref="tableData" max-height="500" v-loading="loading" v-bind:data="tableData">
            <el-table-column type="selection" width="55" :selectable="isSelectedTable">
            </el-table-column>
            <el-table-column prop="new_invoiceno" label="发票号码">
            </el-table-column>
  			    <el-table-column prop="new_expensetypetext" label="发票类型">
            </el-table-column>
            <el-table-column prop="new_invdateUTC" label="开票日期">
            </el-table-column>
            <el-table-column prop="new_amount" label="发票金额含税">
            </el-table-column>
            <el-table-column prop="new_amount_notax" label="发票金额不含税">
            </el-table-column>
            <el-table-column prop="new_invoice_tax" label="发票税金">
            </el-table-column>
            <el-table-column prop="new_recorddateUTC" label="登记日期">
            </el-table-column>
	    </el-table>	
          <InvoicerecordCreateDialog :id="id" :time="time" @resetLoadData="_fetchRecords" @refreshparent="refreshparent" :visible.sync="needShowCreateDialog" v-if="needShowCreateDialog"></InvoicerecordCreateDialog>
	</rt-section>
</template>
<script>
import InvoicerecordCreateDialog from "./InvoicerecordCreateDialog";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      needShowCreateDialog:false,
      time:'',
    };
  },
  components: { InvoicerecordCreateDialog },
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
      var apiUrl = "../api/ExpenseSummary/GetAllInvoicerecord/" + this.id;
      rt
        .get(apiUrl)
        .then(res => {
          this.tableData = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    //明细删除
    deleteDetail: function() {
      var selection = this.$refs.tableData.store.states.selection
      if (selection == null || selection.length == 0) {
        rt.showErrorToast(this.$t('PleaseChooseAtLeastOne'))
        return
      }
      this.$confirm(this.$t('ThisActionDeletePerpetually'), this.$t('Tip'), {
        confirmButtonText: this.$t('BUTTON_DETERMINE'),
        confirmButtonClass: 'ConfirmButtonClass',
        cancelButtonText: this.$t('BUTTON_CANCEL'),
        cancelButtonClass: 'CancelButtonClass',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          var deleteList = []
          for (var i in selection) {
            deleteList.push(selection[i].id)
          }
          var params = deleteList
          var deleteStr = '../api/ExpenseSummary/DeleteInvoicerecord'
          rt
            .post(deleteStr, params)
            .then(res => {
              rt.showSuccessToast("删除成功")
              this._fetchRecords()
              this.loading = false
              this.$emit('resetLoadData')
            })
            .catch(error => {
              rt.showErrorToast(error)
              this.loading = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('HasCancelledForDeleting')
          })
        })
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
    createDetail: function() {
      this.time = this.getNowFormatDate();
      this.needShowCreateDialog = true;
    },
    getNowFormatDate: function() {
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();           //秒
        var clock = year + "-";
        if(month < 10)
            clock += "0";
        clock += month + "-";
        if(day < 10)
            clock += "0";
        clock += day + " ";
        if(hh < 10)
            clock += "0";
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm + ":"; 
        if (ss < 10) clock += '0'; 
        clock += ss; 
        return(clock); 
    }
  }
};
</script>
<style></style>