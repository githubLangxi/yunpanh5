<template>
  <div>
    <el-dialog  title="服务单产品明细" :visible.sync="dialogFormVisible" :before-close="handleClose" size="large">
        <div class="rt-header1" >
          <rt-toolbar showBack @goback="beforeGoBack">
              <rt-button type="save" text="保存" v-if="this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17" @click="onSave()" />
          </rt-toolbar>
        </div>
        <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left" :rules="rules" v-if="workOrder.new_type==5||(workOrder.new_auditpoint!=4&&workOrder.new_auditpoint!=5)">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="条码" prop="new_name">
                <el-input v-model="editForm.new_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="包修开始日期" prop="new_begindate" >
                <el-input v-model="editForm.new_begindate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="包修截止日期" prop="new_enddate">
                <el-input v-model="editForm.new_enddate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>    
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="机型名称" prop="new_product_idName">
                <el-input v-model="editForm.new_product_idName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否过保" prop="new_isoutwarranty">
                <el-checkbox v-model="editForm.new_isoutwarranty" :disabled="true"></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否纳入结算" prop="new_issettlement">
                <el-checkbox v-model="editForm.new_issettlement" :disabled="!(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)"></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>  
          <el-row :gutter="50">
            <el-col :span="24">
              <el-form-item label="纳入结算说明" prop="new_settlement_memo" :rules="editForm.new_isoutwarranty==1&&editForm.new_issettlement==1? ruleRequire:null">
                  <el-input type="textarea" v-model="editForm.new_settlement_memo" :disabled="!(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>    
        </el-form>           
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "workOrder2UserprofileEditDialog",
  data: function() {
    return {
      dialogFormVisible: false,
      editForm: {},
      rules: {},
      disableForm: false,
      new_srv_workorder2userprofileid: "",
      ruleRequire: {
        required: true,
        message: "",
        trigger: "change"
      },
    };
  },
  props: {
    workOrder: Object
  },
  mounted: function() {},
  methods: {
    //提供给父组件调用
    show: function(val) {
      this.$nextTick(() => {
        this.dialogFormVisible = true;
        if (val) {
          this.new_srv_workorder2userprofileid = val;
          this._fetchRecords();
        } else {
          this.disabledform = false;
        }
      });
    },

    //根据服务单产品明细ID加载页面数据
    _fetchRecords: function() {
      if (this.new_srv_workorder2userprofileid) {
        var requestStr =
          "../api/WorkOrder/GetWorkOrder2UserprofileById/" +
          this.new_srv_workorder2userprofileid;
        rt
          .get(requestStr)
          .then(res => {
            this.editForm = res;
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
    },
    //保存
    onSave: function() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          var self = this;
          var params = self.editForm;
          //更新
          params.id = self.new_srv_workorder2userprofileid;
          self
            .updateFormData(params)
            .then(function(res) {
              rt.showSuccessToast(self.$t("Successfullysaved"));
              self._fetchRecords();
            })
            .catch(error => {
              rt.showErrorToast(error);
            });
        } else {
          rt.showErrorToast(this.$t("PleaseInputRequiredFields"));
          return;
        }
      });
    },

    //更新服务单产品明细
    updateFormData: function(params) {
      return rt.post("../api/WorkOrder/UpdateWorkOrder2Userprofile", params);
    },

    //关闭时清除form内容
    handleClose: function() {
      this.dialogFormVisible = false;
      this.$refs["editForm"].resetFields();
      this.disableForm = false;
      this.$emit("reLoad");
    },

    //返回按钮之前提示保存服务单数据
    beforeGoBack: function() {
      this.handleClose();
    }
  }
};
</script>