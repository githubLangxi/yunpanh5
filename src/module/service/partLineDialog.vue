<template>
    <div>
        <el-dialog title="更换件明细" :visible.sync="dialogFormVisible" :before-close="handleClose" size="large">
            <div class="rt-header1" >
                <rt-toolbar showBack @goback="beforeGoBack">
                    <rt-button type="save" @click="onSave('editForm')"  v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
                    <rt-button text="申请" type="submit" @click="CreatePartsApply()" v-if="((this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3)&&!this.editForm.new_srv_partsapply_id&&this.new_srv_partlineId&&this.editForm.new_apply_qty>0" />
                </rt-toolbar>
            </div>
            <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left" :rules="rules">
                <el-row :gutter="50">
                    <el-col :span="8">
                        <el-form-item label="故障机" prop="new_userprofile_idName">
                            <el-input v-model="editForm.new_userprofile_idName" readonly  icon="search" :on-icon-click="workOrderUserProfileLookup" :disabled="disabledform"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="故障机条码" prop="new_number">
                            <el-input v-model="editForm.new_number" readonly :disabled="true" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="维修项目" prop="new_troubleproject_idName">
                            <el-input v-model="editForm.new_troubleproject_idName" readonly  icon="search" :on-icon-click="projectLookup" :disabled="disabledform"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="8">
                        <el-form-item label="配件分类" prop="new_srv_partstype_idName">
                            <el-input v-model="editForm.new_srv_partstype_idName" readonly  icon="search"  :disabled="true" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="换件类型" prop="new_changetype">
                            <rt-picklist v-model="editForm.new_changetype" entity="new_srv_project" attribute="new_changetype" :disabled="true"></rt-picklist>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="8">
                        <el-form-item label="换上件名称" prop="new_product_idName">
                            <el-input v-model="editForm.new_product_idName" readonly  icon="search" :on-icon-click="partLineProductLookup" :disabled="disabledform"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="换上配件编码" prop="new_name">
                            <el-input v-model="editForm.new_name" readonly :disabled="true" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="BOM标准用量" prop="bomQty">
                            <el-input v-model="editForm.bomQty" readonly  :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="8">
                        <el-form-item label="库存数量" prop="invQty">
                            <el-input v-model="editForm.invQty" readonly :disabled="true" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="使用数量" prop="new_qty">
                            <el-input v-model="editForm.new_qty" :disabled="disabledform"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="申请数量" prop="new_apply_qty">
                            <el-input v-model="editForm.new_apply_qty" :disabled="disabledform"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="8">
                        <el-form-item label="旧件名称" prop="new_productold_idName" :rules="editForm.new_changetype==1?[{ type:'string',required: true, message: '', trigger: 'change'}]:[]">
                            <el-input v-model="editForm.new_productold_idName" readonly  icon="search" :on-icon-click="partsReplaceLookup" :disabled="this.editForm.new_changetype!=1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="旧件配件编码" prop="new_productcode">
                            <el-input v-model="editForm.new_productcode" readonly :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
        <projectLookupDialog ref="projectDialog" @lookupSelect="selectProject" @lookupSelectClear="clearProject" :new_userprofile_id="editForm.new_userprofile_id" :workOrderId="this.workOrder.id"></projectLookupDialog>
        <workOrderUserProfileDialog ref="workOrderUserProfileDialog" @lookupSelect="selectWorkOrderUserProfile" @lookupSelectClear="clearWorkOrderUserProfile" :workOrder="this.workOrder"></workOrderUserProfileDialog>
        <partLineProductDialog ref="partLineProductDialog" @lookupSelect="selectPartLineProduct" @lookupSelectClear="clearPartLineProduct" :userprofileId="this.editForm.new_userprofile_id" :partstypeId="this.editForm.new_srv_partstype_id"></partLIneProductDialog>
        <partsReplaceDialog ref="partsReplaceDialog" @lookupSelect="selectPartsReplace" @lookupSelectClear="clearPartsReplace" :productId="this.editForm.new_product_id" ></partsReplaceDialog>
    </div>
</template>

<script>
// import projectLookupDialog from "../dialog/projectLookupDialog";
// import workOrderUserProfileDialog from "../dialog/workOrderUserProfileDialog";
// import partLineProductDialog from "./partLineProductDialog";
// import partsReplaceDialog from "../dialog/partsReplaceDialog";

export default {
  name: "partLineDialog",
  data: function() {
    return {
      new_srv_partlineId: "",
      dialogFormVisible: false,
      disabledform: false,
      editForm: {
        new_userprofile_id: "",
        new_userprofile_idName: "",
        new_troubleproject_id: "",
        new_troubleproject_idName: "",
        new_srv_partstype_id: "",
        new_srv_partstype_idName: "",
        new_product_id: "",
        new_product_idName: "",
        new_changetype: "",
        new_name: "",
        bomQty: "",
        invQty: "",
        new_productcode: "",
        new_apply_qty: "",
        new_price: "",
        new_srv_troubleid: "",
        id: "",
        new_srv_partsapply_id: ""
      },
      rules: {
        new_userprofile_idName: [
          {
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_troubleproject_idName: [
          {
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_product_idName: [
          {
            required: true,
            message: "",
            trigger: "change"
          }
        ]
      }
    };
  },
  props: {
    workOrder: {
      type: Object,
      require: true
    }
  },
  watch: {
    "editForm.new_qty": {
      handler(newValue, oldValue) {
        if (this.editForm.bomQty > 0 && newValue > this.editForm.bomQty) {
          this.editForm.new_qty = 0;
          rt.showErrorToast("使用数量不能超出BOM使用量");
        }
      },
      deep: true
    }
  },
  components: {
    projectLookupDialog: resolve => {
      require(["../dialog/projectLookupDialog.vue"], resolve);
    },
    workOrderUserProfileDialog: resolve => {
      require(["../dialog/workOrderUserProfileDialog.vue"], resolve);
    },
    partLineProductDialog: resolve => {
      require(["./partLineProductDialog.vue"], resolve);
    },
    partsReplaceDialog: resolve => {
      require(["../dialog/partsReplaceDialog.vue"], resolve);
    }
  },
  mounted: function() {},
  methods: {
    //根据故障模式明细id加载故障模式内容
    _fetchRecords: function() {
      if (this.new_srv_partlineId) {
        this.disabledform = true;
        var requestStr =
          "../api/WorkOrder/GetPartsLineById/" + this.new_srv_partlineId;
        rt
          .get(requestStr)
          .then(res => {
            this.editForm = res;
            this.getTroubleProject(this.editForm.new_troubleproject_id);
            this.getProduct(
              this.editForm.new_product_id,
              this.editForm.new_product_idName,
              true
            );
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
    },

    getTroubleProject: function(newValue) {
      var self = this;
      if (!newValue) {
        self.editForm.new_srv_partstype_id = "";
        self.editForm.new_srv_partstype_idName = "";
        self.editForm.new_changetype = "";
      }
      if (newValue) {
        var requestStr =
          "../api/Helper/GetFieldValue?id=" +
          newValue +
          "&entityName=new_srv_project&attributeList=new_srv_partstype_id,new_changetype";
        rt
          .get(requestStr)
          .then(function(res) {
            var array = res.Attributes;
            for (var k in array) {
              if (array[k].Key == "new_changetype") {
                self.editForm.new_changetype = array[k].Value.Value;
              }
              if (array[k].Key == "new_srv_partstype_id") {
                self.editForm.new_srv_partstype_id = array[k].Value.Id;
                self.editForm.new_srv_partstype_idName = array[k].Value.Name;
              }
            }
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
    },

    getProduct: function(id, name, isLoad) {
      var self = this;
      self.editForm.new_name = "";
      self.editForm.bomQty = "";
      self.editForm.invQty = "";

      if (
        !self.editForm.new_userprofile_id ||
        !self.editForm.new_srv_partstype_id
      ) {
        self.editForm.new_product_id = "";
        self.editForm.new_product_idName = "";
        return;
      }

      if (id) {
        var params = {
          new_product_id: id,
          userprofileId: this.editForm.new_userprofile_id,
          partstypeId: this.editForm.new_srv_partstype_id
        };
        var requestStr = "../api/WorkOrder/GetProduct";
        rt
          .get(requestStr, params)
          .then(function(res) {
            self.editForm.new_name = res.productnumber;
            self.editForm.bomQty = res.bomQty;
            self.editForm.invQty = res.invQty;
            if (!self.editForm.new_price || self.editForm.new_price <= 0)
              self.editForm.new_price = res.price;
            if (!isLoad && self.editForm.new_changetype == 1) {
              self.editForm.new_productold_id = id;
              self.editForm.new_productold_idName = name;
              self.editForm.new_productcode = res.productnumber;
            }
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
    },

    //提供给父组件调用
    show: function(val) {
      this.$nextTick(() => {
        this.dialogFormVisible = true;
        if (val) {
          this.new_srv_partlineId = val;
          this._fetchRecords();
        } else {
          this.disabledform = false;
        }
      });
    },

    onSave: function() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this.saveData();
          // var msg =
          //   this.editForm.new_apply_qty <= 0
          //     ? "你未填写申请数量，确定不需要申请配件吗？"
          //     : "你申请" +
          //       this.editForm.new_apply_qty +
          //       "个" +
          //       this.editForm.new_product_idName +
          //       "配件，确定申请吗？";
          // this.$confirm(msg, "提示", {
          //   confirmButtonText: "确定",
          //   confirmButtonClass: "ConfirmButtonClass",
          //   cancelButtonText: "取消",
          //   cancelButtonClass: "CancelButtonClass",
          //   type: "warning"
          // }).then(() => {
          //   this.saveData();
          // });
        } else {
          this.$message({
            message: this.$t("PleaseInputRequiredFields"),
            type: "error"
          });
        }
      });
    },

    //申请配件
    CreatePartsApply: function() {
      if (this.editForm.new_apply_qty <= 0) {
        rt.showErrorToast("申请数量为0，无需申请");
        return;
      }
      if (rt.isNullOrWhiteSpace(this.new_srv_partlineId)) {
        rt.showErrorToast("请先保存更换件明细");
        return;
      }
      if (!rt.isNullOrWhiteSpace(this.editForm.new_srv_partsapply_id)) {
        rt.showErrorToast("该更换件已申请配件");
        return;
      }
      var that = this;
      rt
        .post(
          "../api/WorkOrder/CreatePartsApply?partLineId=" +
            this.new_srv_partlineId
        )
        .then(function(res) {
          rt.showSuccessToast("申请成功");
          that._fetchRecords();
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },

    //保存故障模式明细
    saveData: function() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          var self = this;
          var params = self.editForm;
          params.new_srv_workorder_id = self.workOrder.id;
          //创建
          if (rt.isNullOrWhiteSpace(self.new_srv_partlineId)) {
            self
              .createFormData(params)
              .then(function(res) {
                rt.showSuccessToast(self.$t("Successfullysaved"));
                //self.$emit("reLoad");
                //self.dialogFormVisible = false;
                //self.$refs["editForm"].resetFields();
                self.new_srv_partlineId = res;
                self._fetchRecords();
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          } else {
            //更新
            params.id = self.new_srv_partlineId;
            self
              .updateFormDate(params)
              .then(function(res) {
                rt.showSuccessToast(self.$t("Successfullysaved"));
                //self.$emit("reLoad");

                //self.dialogFormVisible = false;
                //self.$refs["editForm"].resetFields();
                self._fetchRecords();
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          }
        } else {
          rt.showErrorToast(this.$t("PleaseInputRequiredFields"));
          return;
        }
      });
    },
    //创建故障模式明细
    createFormData: function(params) {
      return rt.post("../api/WorkOrder/CreateOrUpdatePartsLine", params);
    },
    //更新故障模式数据
    updateFormDate: function(params) {
      return rt.post("../api/WorkOrder/UpdatePartsLineDetail", params);
    },

    //关闭时清除form内容
    handleClose: function() {
      this.$refs["editForm"].resetFields();
      this.editForm.new_userprofile_id = "";
      this.editForm.new_troubleproject_id = "";
      this.editForm.new_srv_partstype_id = "";
      this.editForm.new_product_id = "";
      this.editForm.id = "";
      this.editForm.new_price = "";
      this.editForm.new_srv_partsapply_id = "";
      this.new_srv_partlineId = "";
      this.dialogFormVisible = false;
      this.$emit("reLoad");
    },

    //返回按钮之前提示保存服务单数据
    beforeGoBack: function() {
      this.handleClose();
    },

    //维修项目lookup
    projectLookup: function() {
      if (this.disabledform) {
        return;
      }
      this.$refs.projectDialog.show();
    },

    selectProject: function(
      id,
      name,
      new_partstype_id,
      new_partstype_idName,
      new_srv_troubleid
    ) {
      this.editForm.new_troubleproject_id = id;
      this.editForm.new_troubleproject_idName = name;
      this.editForm.new_srv_troubleid = new_srv_troubleid;
      this.getTroubleProject(id);
      this.clearPartLineProduct();
    },

    clearProject: function() {
      this.editForm.new_troubleproject_id = "";
      this.editForm.new_troubleproject_idName = "";
      this.editForm.new_srv_partstype_id = "";
      this.editForm.new_srv_partstype_idName = "";
      this.editForm.new_changetype = null;
      this.editForm.new_srv_troubleid = "";
      this.clearPartLineProduct();
    },

    //故障机lookup
    workOrderUserProfileLookup: function() {
      if (this.disabledform) {
        return;
      }
      this.$refs.workOrderUserProfileDialog.show();
    },

    selectWorkOrderUserProfile: function(
      userprofile,
      userprofileName,
      name,
      insideoroutside
    ) {
      this.editForm.new_userprofile_id = userprofile;
      this.editForm.new_userprofile_idName = userprofileName;
      this.editForm.new_number = name;
      this.editForm.new_insideoroutside = insideoroutside;
      this.clearProject();
    },

    clearWorkOrderUserProfile: function() {
      this.editForm.new_userprofile_id = "";
      this.editForm.new_userprofile_idName = "";
      this.editForm.new_number = "";
      this.editForm.new_insideoroutside = 0;
      this.clearProject();
    },

    //更换件选择
    partLineProductLookup: function() {
      if (this.disabledform) {
        return;
      }
      this.$refs.partLineProductDialog.show();
    },

    selectPartLineProduct: function(id, name) {
      if (
        this.editForm.new_product_id == id &&
        this.editForm.new_product_idName == name
      )
        return;
      this.editForm.new_product_id = id;
      this.editForm.new_product_idName = name;
      this.getProduct(id, name, false);
    },

    clearPartLineProduct: function() {
      this.editForm.new_product_id = "";
      this.editForm.new_product_idName = "";

      this.editForm.new_productold_id = "";
      this.editForm.new_productold_idName = "";
      this.editForm.new_productcode = "";
      this.editForm.new_name = "";
      this.editForm.bomQty = "";
      this.editForm.invQty = "";
      this.editForm.new_price = 0;
    },

    //旧件选择
    partsReplaceLookup: function() {
      if (this.editForm.new_changetype != 1) {
        return;
      }
      this.$refs.partsReplaceDialog.show();
    },

    selectPartsReplace: function(id, name, code) {
      this.editForm.new_productold_id = id;
      this.editForm.new_productold_idName = name;
      this.editForm.new_productcode = code;
    },

    clearPartsReplace: function() {
      this.editForm.new_productold_id = "";
      this.editForm.new_productold_idName = "";
      this.editForm.new_productcode = "";
    }
  }
};
</script>
