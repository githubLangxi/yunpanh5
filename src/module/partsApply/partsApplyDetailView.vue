<template>
  <rt-section v-bind:title="$t('new_srv_partsapplydetil')">
    <!--头部操作按钮-->
    <template slot="toolbar">
      <rt-button type="add" :text="$t('BUTTON_BATCHADD')" @click="batchesAdd" v-if="!disabled" />
<!--       <rt-button type="add" @click="createDetail" v-if="!disabled" /> -->
      <rt-button type="delete" @click="deleteDetail" v-if="!disabled" />
    </template>

    <!--明细列表-->
    <el-table stripe ref="tableData" :data="tableData" max-height="500" v-loading="loading" @sort-change="handleSortChange">
      <el-table-column type="selection" width="40" :selectable="isSelectedTable" >
      </el-table-column>
      <el-table-column prop="new_applycode" label="申请配件编码" width="130">
      </el-table-column>
      <el-table-column prop="new_applyproduct_idname" label="申请配件名称" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="new_code" label="配件编码" width="130">
      </el-table-column>
      <el-table-column prop="new_product_idname" v-bind:label="$t('new_srv_partsapplydetil.new_product_id')"  width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="new_uom_idname" label="计量单位">
      </el-table-column>
      <el-table-column prop="new_price" v-bind:label="$t('new_srv_partsapplydetil.new_price')">
      </el-table-column>
      <el-table-column prop="new_qty" v-bind:label="$t('new_srv_partsapplydetil.new_qty')">
          <template slot-scope="scope">
                <el-input v-model="scope.row.new_qty" @blur="changeQty(scope.row)" :disabled="disabled" :class="scope.row.new_qty<=0?'actives':''"></el-input>
          </template>
      </el-table-column>
      <el-table-column prop="new_partscost" v-bind:label="$t('new_srv_partsapplydetil.new_partscost')">
      </el-table-column>
      <el-table-column prop="new_stocksite_sendidname" v-bind:label="$t('new_srv_partsapplydetil.new_stocksite_sendid')" width="150" show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <!-- 配件申请明细页面 弹出框 -->
    <div class="monthplandetail-edit-dialog" v-if="formDialog">
      <!-- 明细列表编辑Dialog -->
      <el-dialog v-bind:title="$t('new_srv_partsapplydetil')" :visible.sync="formDialog" :show-close="true" :before-close="beforeClose" :close-on-press-escape="false" :close-on-click-modal="false">
        <div class="monthplan-detail-form">
          <el-form :model="editForm" ref="editForm" :rules="rules" v-loading="formLoading" class="detail-form" label-position="left" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item v-bind:label="$t('new_srv_partsapplydetil.new_product_id')" prop="new_product_idname">
                  <el-input v-model="editForm.new_product_idname" icon="search" readonly :on-icon-click="productlookup"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-bind:label="$t('new_srv_partsapplydetil.new_code')" prop="new_code">
                  <el-input v-model="editForm.new_code" readonly disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item v-bind:label="$t('new_srv_partsapplydetil.new_price')" prop="new_price">
                  <el-input v-model="editForm.new_price" readonly @change="countPrice" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-bind:label="$t('new_srv_partsapplydetil.new_qty')" prop="new_qty">
                  <el-input v-model="editForm.new_qty" @change="countPrice"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item v-bind:label="$t('new_srv_partsapplydetil.new_partscost')">
                  <el-input v-model="editForm.new_partscost" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-bind:label="$t('new_srv_partsapplydetil.new_srv_workorder_id')">
                  <el-input v-model="editForm.new_srv_workorder_idname" readonly icon="search" :on-icon-click="workorderlookup"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item v-bind:label="$t('new_srv_partsapplydetil.new_stocksite_sendid')" v-show="false">
                  <el-input v-model="editForm.new_stocksite_sendid" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item v-bind:label="$t('new_srv_partsapplydetil.new_desc')" >
                  <el-input v-model="editForm.new_desc" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item v-bind:label="$t('new_srv_partsapplydetil.new_memo')" >
                  <el-input v-model="editForm.new_memo"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <div class="user-detail-buttons">
                <el-button class="Cancel-Footer" @click="beforeClose">{{$t('BUTTON_CANCEL')}}</el-button>
                <el-button class="Confirm-Footer" type="primary" @click="saveDataClick('editForm')">{{$t('BUTTON_DETERMINE')}}</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
      <PartsApplyDetailDialog ref="partsApplyDetailDialog" @select-data="outdata" @clear-data="cleardata"></PartsApplyDetailDialog>
      <PartsApplyEditDialog ref="partsApplyEditDialog" @send-workid="outworkid" @clear-workid="clearworkid"></PartsApplyEditDialog>
    </div>

     <!-- 批量添加dialog -->
     <PartsApplyDatchesDialog @resetLoadData="loadData"  :visible.sync="needShowDatchesDialog" v-if="needShowDatchesDialog" :mainid="mainid"></PartsApplyDatchesDialog>
  </rt-section>



</template>

<script type="text/javascript">
import PartsApplyDetailDialog from "../dialog/partsApplyDetailDialog";
import PartsApplyEditDialog from "../dialog/partsApplyEditDialog";

import PartsApplyDatchesDialog from "./partsApplyDatchesDialog";

export default {
  data: function() {
    return {
      //数据加载
      loading: false,

      needShowDatchesDialog: false, //批量添加界面显示

      //明细列表
      tableData: [], //列表数据源
      rowid: "", //选中行id

      //明细列表编辑Dialog
      formDialog: "", //显示隐藏Dialog
      editForm: {
        id: "", //明细列表选中行ID
        new_product_id: "", //配件ID
        new_product_idname: "", //配件名称
        new_code: "", //配件编码

        new_price: "", //价格
        new_qty: "", //数量

        new_partscost: "", //金额
        new_srv_workorder_id: "", //服务单id
        new_srv_workorder_idname: "", //服务单名称

        new_stocksite_sendid: "", //发货仓库id
        new_stocksite_sendidname: "", //发货仓库名称

        new_desc: "", //配件描述
        new_memo:"",//配件明细说明
        new_srv_partsapply_id: "" //主档ID
      },
      rules: { 
        new_product_idname: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        new_qty: [
          { required: true, message: "不能为空" },
          { pattern: /^[1-9]\d*$/, message: "必须输入正整数", trigger: "blur" }
        ]
      },
      formLoading: false, //dialog加载特效
      orderby: "new_code,descending"
    };
  },
  props: {
    mainid: "",
    disabled: {
      type: Boolean
    },
    stocksendid: "",
    stocksendidname: ""
  },
  components: {
    PartsApplyDetailDialog,
    PartsApplyEditDialog,
    PartsApplyDatchesDialog
  },
  watch: {
    formDialog: function(val) {
      if (!this.formDialog) {
        this.$emit("reloadEdit");
        this.rowid = "";
      }
    }
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    /***************/
    /**列表处理方法**/
    /***************/
    //加载数据
    loadData() {
      var self = this;
      self.loading = true;
      rt
        .get(
          "../api/PartsApply/PartsApplyLine?id=" +
            self.mainid +
            "&orderby=" +
            self.orderby
        )
        .then(function(res) {
          self.$emit("reloadEdit");
          self.tableData = res;
          self.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          self.loading = false;
        });
    },

    handleSortChange: function(sort) {
      console.log("1213");
      if (!sort.prop) {
        return;
      }
      this.orderby = sort.prop + "," + sort.order;
      this.tableData = [];
      this.loadData();
    },

    //明細列表创建明细
    createDetail: function() {
      this.clearDetail();
      this.formDialog = true;
    },

    //删除明细列表
    deleteDetail: function() {
      var selection = this.$refs.tableData.store.states.selection;
      if (selection == null || selection.length == 0) {
        rt.showErrorToast(this.$t("PleaseChooseAtLeastOne"));
        return;
      }
      this.$confirm(this.$t("ThisActionDeletePerpetually"), this.$t("Tip"), {
        confirmButtonText: this.$t("BUTTON_DETERMINE"),
        confirmButtonClass: "ConfirmButtonClass",
        cancelButtonText: this.$t("BUTTON_CANCEL"),
        cancelButtonClass: "CancelButtonClass",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          var deleteList = [];
          for (var i in selection) {
            deleteList.push(selection[i].id);
          }
          var params = deleteList;
          var deleteStr = "../api/PartsApply/DeletePartsApplyLine";
          rt
            .post(deleteStr, params)
            .then(res => {
              rt.showSuccessToast(res);
              this.$emit("reloadEdit");
              this.loadData();
              this.formLoading = false;
              this.formDialog = false;
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
    },

    //打开明细编辑Dialog
    gotoEditPage(row) {
      //编辑记录
      var self = this;
      self.rowid = row.id;
      this.loading = true;
      var requestStr = "../api/PartsApply/GetPartsApplyLineById/" + self.rowid;
      rt
        .get(requestStr)
        .then(function(res) {
          self.editForm = res;
          self.loading = false;
          self.formDialog = true;
        })
        .catch(error => {
          rt.showErrorToast(error);
          self.loading = false;
        });
    },

    //工作单打开lookup
    workorderlookup() {
      if (rt.isNullOrWhiteSpace(this.currentRow)) {
        this.lookupBtn = true;
      }
      this.$refs.partsApplyEditDialog.show();
    },

    //获取服务单
    outworkid: function(val) {
      debugger;
      this.editForm.new_srv_workorder_id = val[0];
      this.editForm.new_srv_workorder_idname = val[1];
    },

    //清空服务单
    clearworkid: function(val) {
      this.editForm.new_srv_workorder_id = "";
      this.editForm.new_srv_workorder_idname = "";
    },

    /*****************/
    /**明细Dialog方法**/
    /*****************/
    //Dialog字段（配件名称）打开lookup
    productlookup() {
      this.$refs.partsApplyDetailDialog.show();
    },
    //Dialog保存按钮
    saveDataClick(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          debugger;
          that.formLoading = true;
          that.editForm.id = that.rowid;
          that.editForm.new_srv_partsapply_id = that.mainid;
          if (that.editForm.new_qty >= 100000) {
            rt.showErrorToast(that.$t("PleaseInputLessThan100000"));
            that.formLoading = false;
            return;
          }
          if (that.rowid) {
            let apiUrl = "../api/PartsApply/UpdatePartsApplyDetail";
            rt
              .post(apiUrl, that.editForm)
              .then(res => {
                rt.showSuccessToast(that.$t("Successfullysaved"));
                that.clearDetail();
                that.loadData();
                that.formLoading = false;
                that.formDialog = false;
              })
              .catch(error => {
                that.formLoading = false;
                rt.showErrorToast(error);
                return;
              });
          } else {
            if (!rt.isNullOrWhiteSpace(that.editForm.new_product_id)) {
              for (var i in that.tableData) {
                if (
                  that.tableData[i].new_product_id ==
                  that.editForm.new_product_id
                ) {
                  rt.showErrorToast(that.$t("ThisPartLineHasExisted"));
                  that.formLoading = false;
                  that.formDialog = false;
                  return;
                }
              }
            }
            that.editForm.new_stocksite_sendid = that.stocksendid;
            that.editForm.new_stocksite_sendidname = that.stocksendidname;
            let apiUrl = "../api/PartsApply/CreatePartsApplyDetail";
            // 调用接口保存数据
            rt
              .post(apiUrl, that.editForm)
              .then(res => {
                rt.showSuccessToast(that.$t("Successfullycreated"));
                that.clearDetail();
                that.loadData();
                that.formLoading = false;
                that.formDialog = false;
              })
              .catch(error => {
                that.formLoading = false;
                rt.showErrorToast(error);
              });
          }
          // that.rowid = "";
        } else {
          return false;
        }
      });
    },
    //Dialog取消按钮
    beforeClose() {
      this.clearDetail();
      this.formDialog = false;
    },
    outdata: function(val) {
      debugger
      this.editForm.new_product_id = val[0];
      this.editForm.new_product_idname = val[1];
      this.editForm.new_code = val[2];
      this.editForm.new_price = val[3];
      this.editForm.new_desc=val[4];
      this.countPrice();
    },
    cleardata: function() {
      this.editForm.new_code = "";
      this.editForm.new_price = "";
      this.editForm.new_product_id = "";
      this.editForm.new_product_idname = "";
      this.editForm.new_desc="";
    },

    /***********/
    /**公用方法**/
    /***********/
    //计算总金额
    countPrice: function() {
      this.editForm.new_partscost =
        this.editForm.new_price * this.editForm.new_qty;
    },
    //清空Dialog字段
    clearDetail: function() {
      this.rowid = ""; //标记id
      this.editForm.id = ""; //主档ID
      this.editForm.new_product_id = ""; //配件
      this.editForm.new_product_idname = ""; //配件
      this.editForm.new_code = ""; //配件编码
      this.editForm.new_price = ""; //价格
      this.editForm.new_qty = ""; //数量
      this.editForm.new_partscost = ""; //金额
      this.editForm.new_stocksite_sendid = ""; //发货仓库id
      this.editForm.new_stocksite_sendidname = ""; //发货仓库名称
      this.editForm.new_desc = ""; //描述
      this.editForm.new_memo = ""; //备注
      this.editForm.new_srv_partsapply_id = ""; //主档id
      this.editForm.new_srv_workorder_id = ""; //服务单id
      this.editForm.new_srv_workorder_idname = ""; //服务单名称
    },
    isSelectedTable: function() {
      if (this.disabled == true) {
        return false;
      } else {
        return true;
      }
    },

    //批量添加
    batchesAdd: function(val) {
      this.needShowDatchesDialog = true;
    },

    //打开明细编辑Dialog
    gotoEditPage(row) {
      //编辑记录
      var self = this;
      self.rowid = row.id;
      this.loading = true;
      var requestStr = "../api/PartsApply/GetPartsApplyLineById/" + self.rowid;
      rt
        .get(requestStr)
        .then(function(res) {
          self.editForm = res;
          self.loading = false;
          self.formDialog = true;
        })
        .catch(error => {
          rt.showErrorToast(error);
          self.loading = false;
        });
    },

    /*Detection:function(){

    }*/

    //修改申请数量
    changeQty: function(row) {
      //console.log(row);
      if (row.new_qty === "") {
        row.new_qty = 0;
        this.$message({
          showClose: true,
          type: "warning",
          message: this.$t("AppliedquantityREQUIRED")
        });
        return;
      }

      if (!/^-?\d+$/.test(row.new_qty) && row.new_qty !== "") {
        row.new_qty = 0;
        this.$message({
          showClose: true,
          type: "warning",
          message: this.$t("OnlyInt")
        });
        return;
      }

      if (row.new_qty <= 0 && row.new_qty !== "") {
        row.new_qty = 0;
        this.$message({
          showClose: true,
          type: "warning",
          message: this.$t("CountMoreThanZero")
        });

        return;
      }

      var obj = {};
      obj.id = row.id;
      obj.new_qty = row.new_qty;
      obj.new_desc = row.new_desc;
      obj.new_partscost = row.new_qty * row.new_price;
      var apiUrl = "../api/PartsApply/UpdateCurrentPartsApplyDetail";
      var params = obj;
      this.loading = true;
      rt
        .post(apiUrl, params)
        .then(res => {
          rt.showSuccessToast(this.$t("ModifySuccess"));
          this.loading = false;
          this.loadData();
        })
        .catch(error => {
          this.loading = false;
          rt.showErrorToast(error);
        });
    },
    changeDesc: function(row) {
      var obj = {};
      obj.id = row.id;
      obj.new_qty = row.new_qty;
      obj.new_desc = row.new_desc;
      obj.new_partscost = row.new_qty * row.new_price;
      var apiUrl = "../api/PartsApply/UpdateCurrentPartsApplyDetail";
      var params = obj;
      this.loading = true;
      rt
        .post(apiUrl, params)
        .then(res => {
          this.loading = false;
          rt.showSuccessToast(this.$t("ModifySuccess"));
          this.loadData();
        })
        .catch(error => {
          this.loading = false;
          rt.showErrorToast(error);
        });
    }
  }
};
</script>

<style>
.actives .el-input__inner {
  border: 1px solid #f00 !important;
}
</style>


