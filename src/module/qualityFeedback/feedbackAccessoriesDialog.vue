<template>
	<rt-section title="配件明细">
    <template slot="toolbar">
      <rt-button type="add" text="添加" @click="gotoAddPage" v-if="visible"/>
      <rt-button type="delete" @click="deleteDetail" v-if="visible"/>
    </template>
		<el-table stripe ref="tableData" max-height="500" v-loading="loading" v-bind:data="tableData">
            <el-table-column type="selection" width="55" :selectable="isSelectedTable" v-if="visible">
            </el-table-column>
            <el-table-column prop="new_srv_partstype_idName" label="配件小类">
            </el-table-column>
  			    <el-table-column prop="new_product_idName" label="配件名称">
            </el-table-column>
            <el-table-column prop="new_partcode" label="配件编码">
            </el-table-column>
            <el-table-column prop="new_uom_idName" label="计量单位">
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
      needShowCreateDialog:false,
      time:'',
    };
  },
  components: { 
    //   InvoicerecordCreateDialog
       },
  props: {
    qualityfeedbackid: {
      type: String,
      require: true
    },
    qualityfeedbackname: {
      type: String,
      require: true
    },
    visible:{
      type: Boolean,
      require: true
    }
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
      var apiUrl = "../api/QualityFeedback/GetFeedbackAccessories?id=" + this.qualityfeedbackid;
      rt
        .get(apiUrl)
        .then(res => {
          this.tableData = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    //创建记录
    gotoAddPage() {
      //创建记录
      this.$router.push({ name: "feedbackAccessoriesCreate" , params: { id: this.qualityfeedbackid ,name: this.qualityfeedbackname} });
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
            deleteList.push(selection[i].Id)
          }
          var params = deleteList
          var deleteStr = '../api/QualityFeedback/DeleteFeedbackAccessories'
          rt
            .post(deleteStr, params)
            .then(res => {
              rt.showSuccessToast("删除成功")
              this._fetchRecords()
              this.loading = false
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
  }
};
</script>
<style></style>