<template>
	 <rt-section :title="$t('new_srv_partsreturnline')">
        <template slot="toolbar">
            <rt-button type="add" @click="createDetail" v-if="!disabled"/>
            <rt-button type="delete" @click="deleteDetail" v-if="!disabled"/>
        </template>
        <el-table stripe @row-dblclick="partsReturnDataEdit"  ref="tableData" max-height="500" v-loading="loading" v-bind:data="tableData">
            <el-table-column type="selection" width="55" v-if="!disabled">
            </el-table-column>
      			<el-table-column prop="new_partsidname" :label="$t('new_srv_partsreturnline.new_partsid')" width="115">
      			</el-table-column>
      			<el-table-column prop="new_partscode" :label="$t('new_srv_partsreturnline.new_partscode')" width="115">
      			</el-table-column>
            <el-table-column prop="new_uom_idname" label="计量单位" width="198">
            </el-table-column>
            <el-table-column prop="new_appqty" label="申请返厂数量">
            </el-table-column>
            <el-table-column prop="new_approvalqty" label="实际返厂数量">
            </el-table-column>
            <el-table-column prop="new_notsignqty" label="未签数量">
            </el-table-column>
            <el-table-column prop="new_receiveqty" label="已签数量">
            </el-table-column>
            <el-table-column prop="new_settlementprice" label="结算价" width="133">
      			</el-table-column>
            <el-table-column prop="new_amount" label="返厂总金额" show-overflow-tooltip width="160">
            </el-table-column>
            <el-table-column prop="new_srv_changeorder_idname" label="转换单号" show-overflow-tooltip width="160">
            </el-table-column>
            <el-table-column prop="new_workorderidname" :label="$t('new_srv_partsreturnline.new_workorderid')" width="150" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="new_logistics" label="物流单号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.new_logistics" @blur="changeLogistics(scope.row)" :disabled="disabled" :class="scope.row.new_logistics==''?'actives':''"></el-input>
              </template>
            </el-table-column>
	    </el-table>

      <!-- 明细编辑dialog -->
      <partsReturnDetailDialog :parts-return-id="partsreturnId" :parts-row-id="id" :visible.sync="needShowDialog" v-if="needShowDialog"  @resetLoadData="_fetchRecords"></partsReturnDetailDialog>

      <!-- 明细新建dialog -->

      <partsReturnCreateDialog :parts-return-id="partsreturnId" :is-failure-parts="isfailureparts" :product-group-id="productgroupid" @resetLoadData="_fetchRecords" :visible.sync="needShowCreateDialog" v-if="needShowCreateDialog"></partsReturnCreateDialog>

   </rt-section>
</template>
<script>
import partsReturnDetailDialog from "./partsReturnDetailDialog";
import partsReturnCreateDialog from "./partsReturnCreateDialog";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      needShowDialog: false, //明细编辑
      needShowCreateDialog: false, //明细新建
      id: ""
    };
  },
  props: {
    partsreturnId: {
      type: String,
      require: true
    },
    disabled: {
      type: Boolean,
      require: true
    },
     isfailureparts:{
      type: String,
      require: true
    },
    productgroupid:{
      type: String,
      require: true
    }
  },
  components: {
    partsReturnDetailDialog,
    partsReturnCreateDialog
  },
  mounted: function() {
    this._fetchRecords();
  },
  methods: {
    //初始化数据
    _fetchRecords: function() {
      this.loading = true;
      var apiUrl = "../api/PartsReturn/PartsReturnLine/" + this.partsreturnId;
      var that = this;
      rt
        .get(apiUrl)
        .then(res => {
          that.tableData = res;
          that.loading = false;
          that.$emit("ievent", that.tableData);
        })
        .catch(error => {
          rt.showErrorToast(error);
          that.loading = false;
        });
    },

    //更新物流单号
    changeLogistics:function(row){
       if (row.new_logistics === "") {
        this.$message({
          showClose: true,
          type: "warning",
          message:'请填写物流单号'
        });
        return;
      }

      var obj = {};
      obj.id = row.id;
      obj.new_logistics = row.new_logistics;
      var apiUrl = "../api/PartsReturn/CreateOrUpdatePartsReturnDetaillogistics";
      var params = obj;
      this.loading = true;
      rt
        .post(apiUrl, params)
        .then(res => {
        
          rt.showSuccessToast(this.$t("ModifySuccess"));
          this.loading = false;
          this._fetchRecords();
        })
        .catch(error => {
          this.loading = false;
          rt.showErrorToast(error);
        });
    },

    // 明细删除
    deleteDetail: function() {
      var selection = this.$refs.tableData.store.states.selection; //????
      var partsDeleteList = [];
      if (selection == null || selection.length == 0) {
        this.$message({
          showClose: true,
          message: this.$t("PleaseChooseAtLeastOne"),
          type: "warning"
        });
        return;
      } else {
        this.$confirm(this.$t("ThisActionDeletePerpetually"), this.$t("Tip"), {
          confirmButtonText: this.$t("BUTTON_DETERMINE"),
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: this.$t("BUTTON_CANCEL"),
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            for (var i = 0; i < selection.length; i++) {
              partsDeleteList.push(selection[i].id);
            }
            var params = partsDeleteList;
            var apiUrl = "../api/PartsReturn/DeletePartsReturnLine";
            rt
              .post(apiUrl, params)
              .then(res => {
                rt.showSuccessToast(res);
                this._fetchRecords();
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: this.$t("HasCancelled")
            });
          });
      }
    },

    // 旧件明细编辑
    partsReturnDataEdit: function(row) {
      //if (this.disabled) return;
      //this.needShowDialog = true;
      //this.id = row.id;
    },

    // 旧件明细新建
    createDetail: function() {
      this.needShowCreateDialog = true;
    }
  }
};
</script>
<style></style>
