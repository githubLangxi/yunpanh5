<template>
  <div>
    <el-dialog  title="套机信息" :visible.sync="dialogFormVisible" :before-close="handleClose" size="large">
        <div class="rt-header1" >
          <rt-toolbar showBack @goback="beforeGoBack">
              <rt-button type="save" text="保存套机" v-show="true" @click="onSave()" />
          </rt-toolbar>
        </div>
        <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left" :rules="rules" v-if="workOrder.new_type==5||(workOrder.new_auditpoint!=4&&workOrder.new_auditpoint!=5)">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="套机类型" prop="new_settype">
                <rt-picklist v-model="editForm.new_settype" entity="new_srv_workorder2userprofile" attribute="new_settype" :disabled="disableForm"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="外机数量" prop="new_outcount" v-if="editForm.new_settype==3">
                <el-input v-model="editForm.new_outcount" :disabled="disableForm"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="内机数量" prop="new_incount" v-if="editForm.new_settype==3">
                <el-input v-model="editForm.new_incount" :disabled="disableForm"></el-input>
              </el-form-item>
            </el-col>
          </el-row>    
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="购买单位" prop="new_accountidname">
                <el-input v-model="editForm.new_accountidname" readonly @keyup.enter.native="quickChooseAccount" icon="search" :on-icon-click="accountLookup" :disabled="disableForm"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="购机日期" prop="new_buydate">
                <el-date-picker v-model="editForm.new_buydate" :editable="false" class="rt-portal-item-date" type="date" placeholder="选择日期" :disabled="disableForm"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>  
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="开票单位" prop="new_invoicefrom">
                <el-input v-model="editForm.new_invoicefrom" :disabled="disableForm"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票号码" prop="new_invoiceno">
                <el-input v-model="editForm.new_invoiceno" :disabled="disableForm"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="工程单号" prop="new_projectno">
                <el-input v-model="editForm.new_projectno" :disabled="disableForm"></el-input>
              </el-form-item>
            </el-col> -->
          </el-row>    
        </el-form>
        <userprofileDialog ref="userprofileDialog" :workOrder="this.workOrder" @reLoad="reLoadUserprofile" @setFormDisable="setFormDisable" @setFormData="setFormData"></userprofileDialog>           
    </el-dialog>
    <accountDialog ref="accountDialog" @lookupSelect="selectAccount" @lookupSelectClear="clearAccount" :accountid="this.editForm.new_accountid"></accountDialog>
  </div>
</template>
<script>
// import userprofileDialog from "./userprofileDialog";
// import accountDialog from "../dialog/accountDialog";

export default {
  name: "workOrder2UserprofileDialog",
  data: function() {
    return {
      dialogFormVisible: false,
      editForm: {
        new_accountid: "",
        new_accountidname: ""
      },
      rules: {},
      disableForm: false,
      isSetType: false,
      canSave: true
    };
  },
  watch: {
    "editForm.new_settype": {
      handler(newValue, oldValue) {
        if (newValue != oldValue) {
          this.editForm.new_outcount = "";
          this.editForm.new_incount = "";
          if (newValue == 3) {
            this.isSetType = true;
          }

          if (this.workOrder.new_type == 4 && newValue == 3) {
            rt.showErrorToast("安装单不允许选择N对N");
            this.editForm.new_settype = oldValue;
          }
        }
      },
      deep: true
    }
  },
  props: {
    workOrder: Object
  },
  components: {
    userprofileDialog: resolve => {
      require(["./userprofileDialog.vue"], resolve);
    },
    accountDialog: resolve => {
      require(["../dialog/accountDialog.vue"], resolve);
    }
  },
  mounted: function() {},
  methods: {
    //提供给父组件调用
    show: function() {
      this.$nextTick(() => {
        //验证是否已选择完工说明，服务单状态是否正确
        if (!this.workOrder || rt.isNullOrWhiteSpace(this.workOrder.id)) {
          rt.showErrorToast("请先保存服务单");
          return;
        }
        var requestStr =
          "../api/WorkOrder/GetWorkOrderById/" + this.workOrder.id;
        var that = this;
        if (
          this.workOrder.new_purchase_date != null &&
          this.workOrder.new_purchase_date != undefined
        )
          this.editForm.new_buydate = this.workOrder.new_purchase_date;
        rt.get(requestStr).then(res => {
          if (res.new_dealstage == 14) {
            rt.showErrorToast("服务单已结单，无法添加套机产品");
            return;
          }
          if (!res.new_auditpoint || res.new_auditpoint <= 0) {
            rt.showErrorToast("请先保存服务单的完工结果");
            return;
          }
          this.workOrder.new_auditpoint = res.new_auditpoint;
          this.dialogFormVisible = true;
        });
      });
    },

    getReplacetypeOptions: function() {
      return [
        {
          Value: 1,
          Text: "退机",
          disabled: this.workOrder.new_auditpoint == 5
        },
        {
          Value: 2,
          Text: "换机",
          disabled: this.workOrder.new_auditpoint == 4
        }
      ];
    },

    quickChooseAccount: function() {
      this.$refs.accountDialog.show();
    },
    //显示城市Dialog
    accountLookup: function() {
      if (this.disableForm) {
        return;
      }
      this.$refs.accountDialog.show();
    },
    //客户选择
    selectAccount: function(id, name) {
      if (
        this.editForm.new_accountid == id &&
        this.editForm.new_accountidname == name
      ) {
        return;
      } else {
        this.editForm.new_accountid = id;
        this.editForm.new_accountidname = name;
      }
    },
    //清除市数据，并将县数据一起清除
    clearAccount: function() {
      this.editForm.new_accountid = "";
      this.editForm.new_accountidname = "";
    },
    //关闭时清除form内容
    handleClose: function() {
      this.dialogFormVisible = false;
      this.$refs["editForm"].resetFields();
      this.$refs.userprofileDialog.userprofileData = [];
      this.disableForm = false;
      this.$emit("reLoad");
      this.$refs.userprofileDialog.installed = false;
      this.$refs.userprofileDialog.notInstalled = false;
    },
    //返回按钮之前提示保存服务单数据
    beforeGoBack: function() {
      this.handleClose();
    },
    reLoadUserprofile: function() {},

    //保存事件
    onSave: function() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          if (
            this.workOrder.new_type == 4 &&
            this.workOrder.new_auditpoint != 4 &&
            this.workOrder.new_auditpoint != 5
          ) {
            if (!this.editForm.new_settype || this.editForm.new_settype <= 0) {
              rt.showErrorToast("请选择套机类型");
              return;
            }
            if (!this.editForm.new_buydate) {
              rt.showErrorToast("请选择购机日期");
              return;
            } else if (this.editForm.new_buydate > new Date()) {
              rt.showErrorToast("购机日期不能大于当前日期");
              this.editForm.new_buydate = null;
              return;
            }
          } else if (this.workOrder.new_type == 5 && !this.disableForm) {
            if (!this.editForm.new_settype || this.editForm.new_settype <= 0) {
              rt.showErrorToast("请选择套机类型");
              return;
            }
            if (!this.editForm.new_buydate) {
              rt.showErrorToast("请选择购机日期");
              return;
            } else if (this.editForm.new_buydate > new Date()) {
              rt.showErrorToast("购机日期不能大于当前日期");
              this.editForm.new_buydate = null;
              return;
            }
          }

          var self = this;
          if (!self.checkCanSaveData()) {
            return;
          }
          var params = self.editForm;
          params.new_srv_workorder_id = self.workOrder.id;
          params.new_srv_workorder_idName = self.workOrder.name;
          var userprofileData = self.$refs.userprofileDialog.userprofileData;
          if (!userprofileData || userprofileData.length <= 0) {
            rt.showErrorToast("请添加套机设备");
            return;
          }
          if (
            this.workOrder.new_auditpoint == 1 ||
            this.workOrder.new_auditpoint == 4 ||
            this.workOrder.new_auditpoint == 5
          ) {
            var hasError = false;
            for (var item in userprofileData) {
              if (userprofileData[item].new_iserror) {
                hasError = true;
              }
            }
            if (!hasError) {
              rt.showErrorToast("请选择故障机");
              return;
            }
          }
          params.List = userprofileData;
          //创建
          rt.post("../api/WorkOrder/CheckWorkOrder2Userprofile", params)
            .then(function(res) {
              console.info(res);
              rt.showSuccessToast(self.$t("Successfullysaved"));
              if (rt.isNullOrWhiteSpace(res)) {
                self.dialogFormVisible = false;
                self.$refs["editForm"].resetFields();
                self.$refs.userprofileDialog.userprofileData = [];
                self.disableForm = false;
                self.$refs.userprofileDialog.installed = false;
                self.$refs.userprofileDialog.notInstalled = false;
                self.$emit("reLoad");
              } else {
                self.$emit("gotoNewOrder", res);
              }
            })
            .catch(error => {
              rt.showErrorToast(error);
            });
        } else {
          this.$message({
            message: this.$t("PleaseInputRequiredFields"),
            type: "error"
          });
        }
      });
    },
    //设置单据装态
    setFormDisable: function(val) {
      this.disableForm = val;
    },
    //设置单据数据
    setFormData: function(val) {
      this.editForm = val;
    },

    checkCanSaveData: function() {
      //维修验证是否都已填写新机条码
      if (this.workOrder.new_type == 5 && this.workOrder.new_auditpoint == 5) {
        var userprofileData = this.$refs.userprofileDialog.userprofileData;
        if (!userprofileData || userprofileData.length <= 0) {
          rt.showErrorToast("请添加套机设备");
          return;
        }
        for (var item in userprofileData) {
          if (userprofileData[item].new_iserror) {
            if (
              rt.isNullOrWhiteSpace(userprofileData[item].new_changednumber)
            ) {
              rt.showErrorToast(
                "故障机" + userprofileData[item].new_number + "请填写新机条码"
              );
              return false;
            } else if (
              rt.isNullOrWhiteSpace(
                userprofileData[item].new_userprofileid_changed
              )
            ) {
              rt.showErrorToast(
                "故障机" +
                  userprofileData[item].new_number +
                  "正在验证新机条码，请稍后保存"
              );
              return false;
            }
          }
        }
      }
      return true;
    }
  }
};
</script>
<style>
.rt-header1 {
  background-color: #ffffff;
  margin-bottom: 10px !important;
  margin-top: -30px !important;
  height: 40px;
  line-height: 40px;
  box-shadow: none !important;
}
</style>
