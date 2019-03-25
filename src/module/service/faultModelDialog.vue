<template>
    <div>
        <el-dialog :title="$t('new_srv_trouble')" :visible.sync="dialogFormVisible" :before-close="handleClose">
            <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left" :rules="rules">
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_trouble.new_srv_errorassembly_id')" prop="new_srv_errorassembly_idname">
                            <el-input v-model="editForm.new_srv_errorassembly_idname" readonly :disabled="disabledform" icon="search" :on-icon-click="errorAssemblyLookup"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_trouble.new_errormodule_id')" prop="new_errormodule_idname">
                            <el-input v-model="editForm.new_errormodule_idname" readonly :disabled="disabledform" icon="search" :on-icon-click="errorModuleLookup"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_trouble.new_srv_errorgroup_id')" prop="new_srv_errorgroup_idname">
                            <el-input v-model="editForm.new_srv_errorgroup_idname" readonly :disabled="disabledform" icon="search" :on-icon-click="errorGroupLookup"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_trouble.new_srv_error_id')" prop="new_srv_error_idname">
                            <el-input v-model="editForm.new_srv_error_idname" readonly :disabled="disabledform" icon="search" :on-icon-click="errorLookup"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_trouble.new_srv_workhours_id')"  prop="new_srv_workhours_idname">
                            <el-input v-model="editForm.new_srv_workhours_idname" readonly  :disabled="disabledform"  icon="search" :on-icon-click="repairWorkHoursLookup"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('new_srv_trouble.new_description')" prop="new_description">
                            <el-input type="textarea" v-model="editForm.new_description"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('new_srv_trouble.new_solution')" prop="new_solution">
                            <el-input type="textarea" v-model="editForm.new_solution"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">{{this.$t('BUTTON_CANCEL')}}</el-button>
                <el-button type="primary" @click="onSave('editForm')">{{this.$t('BUTTON_DETERMINE')}}</el-button>
            </div>
        </el-dialog>
        <errorAssemblyDialog ref="errorAssembly" @lookupSelect="selecterrorAssembly" @lookupSelectClear="clearErrorAssembly"></errorAssemblyDialog>
        <errorModuleDialog ref="errorModule" @lookupSelect="selecterrorModule" @lookupSelectClear="clearErrorModule"></errorModuleDialog>
        <errorGroupDialog ref="errorGroup" @lookupSelect="selecterrorGroup" @lookupSelectClear="clearErrorGroup"></errorGroupDialog>
        <errorDialog ref="error" @lookupSelect="selectError" @lookupSelectClear="clearError"></errorDialog>
        <repairWorkHours ref="repairWorkHours" :workOrderId="this.workOrderId"  :projectId="''" :fault="fault" @lookupSelect="selectRepairWorkHours" @lookupSelectClear="clearWorkHours"></repairWorkHours>
    </div>
</template>

<script>
import errorAssemblyDialog from "../dialog/errorAssemblyDialog";
import errorModuleDialog from "../dialog/errorModuleDialog";
import errorGroupDialog from "../dialog/errorGroupDialog";
import errorDialog from "../dialog/errorDialog";
import repairWorkHours from "../dialog/repairWorkHoursDialog";
export default {
  name: "faultModelDialog",
  data: function() {
    return {
      dialogFormVisible: false,
      disabledform: false,
      new_srv_troubleid: "", //故障模式id
      new_srv_workorderid: "", //主档id
      fault:"fault",

      editForm: {
        new_srv_errorassembly_id: "", //故障系统id
        new_srv_errorassembly_idname: "", //故障系统
        new_errormodule_id: "", //故障部件id
        new_errormodule_idname: "", //故障部件
        new_srv_errorgroup_id: "", //故障零件id
        new_srv_errorgroup_idname: "", //故障零件
        new_srv_error_id: "", //故障现象id
        new_srv_error_idname: "", //故障现象
        new_description: "", //故障现象描述
        new_solution: "" ,//维修措施

        //维修说明
        new_srv_workhours_id:"",
        new_srv_workhours_idname:"",
        new_standardhour:"",
        new_workhourprice:"",
        new_workhourcost:""
      },
      rules: {
        new_srv_errorassembly_idname: [
          { required: true, message: "请选择故障系统", trigger: "change" }
        ],
        new_errormodule_idname: [
          { required: true, message: "请选择故障部件", trigger: "change" }
        ],
        new_srv_errorgroup_idname: [
          { required: true, message: "请选择故障零件", trigger: "change" }
        ],
        new_srv_error_idname: [
          { required: true, message: "请选择故障现象", trigger: "change" }
        ]
      }
    };
  },
  props: {
    workOrderId: String
  },
  components: {
    errorAssemblyDialog,
    errorModuleDialog,
    errorGroupDialog,
    errorDialog,
    repairWorkHours
  },
  mounted: function() {},
  methods: {
    //根据故障模式明细id加载故障模式内容
    _fetchRecords: function() {
      if (this.new_srv_troubleid) {
        var requestStr =
          "../api/WorkOrder/GetTroubleLineById/" + this.new_srv_troubleid;
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
    //提供给父组件调用
    show: function(val) {
      this.dialogFormVisible = true;
      if (val) {
        this.new_srv_troubleid = val; //获取传递的参数，赋值故障模式明细id，加载数据
        this._fetchRecords();
      } else {
        this.new_srv_troubleid = "";
        this.editForm.new_srv_workhours_id="";
      }
    },
    //保存故障模式明细
    onSave: function() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          var self = this;
          var params = self.editForm;
          params.new_srv_workorder_id = self.workOrderId;
          //创建
          if (rt.isNullOrWhiteSpace(self.new_srv_troubleid)) {
            self
              .createFormData(params)
              .then(function(res) {
                rt.showSuccessToast(self.$t('Successfullysaved'));
                self.$emit("reLoad");
                self.dialogFormVisible = false;
                self.$refs["editForm"].resetFields();
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          } else {
            //更新
            params.id = self.new_srv_troubleid;
            self
              .updateFormDate(params)
              .then(function(res) {
                rt.showSuccessToast(self.$t('Successfullysaved'));
                self.$emit("reLoad");

                self.dialogFormVisible = false;
                self.$refs["editForm"].resetFields();
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
      return rt.post("../api/WorkOrder/CreateOrUpdateTroubleLine", params);
    },
    //更新故障模式数据
    updateFormDate: function(params) {
      return rt.post("../api/WorkOrder/UpdateTroubleLineDetail", params);
    },

    /************
      Dialog弹出框部分
    ************/
    //故障系统lookup
    errorAssemblyLookup: function() {
      this.$refs.errorAssembly.show();
    },
    //监听故障系统组件双击、确定事件，传递参数值
    selecterrorAssembly: function(id, name) {
      this.editForm.new_srv_errorassembly_id = id;
      this.editForm.new_srv_errorassembly_idname = name;
    },
    //监听故障系统组件移除值事件，清除故障系统数据
    clearErrorAssembly: function() {
      this.editForm.new_srv_errorassembly_id = "";
      this.editForm.new_srv_errorassembly_idname = "";
    },
    //故障部件lookup
    errorModuleLookup: function() {
      this.$refs.errorModule.show();
    },
    //监听故障部件组件双击、确定事件，传递参数值
    selecterrorModule: function(id, name) {
      this.editForm.new_errormodule_id = id;
      this.editForm.new_errormodule_idname = name;
    },
    //监听故障部件组件移除值事件，清除故障部件数据
    clearErrorModule: function() {
      this.editForm.new_errormodule_id = "";
      this.editForm.new_errormodule_idname = "";
    },
    //故障零件Lookup
    errorGroupLookup: function() {
      this.$refs.errorGroup.show();
    },
    //监听故障零件组件双击、确定事件，传递参数值
    selecterrorGroup: function(id, name) {
      this.editForm.new_srv_errorgroup_id = id;
      this.editForm.new_srv_errorgroup_idname = name;
    },
    //监听故障零件组件移除值事件，清除故障零件数据
    clearErrorGroup: function() {
      this.editForm.new_srv_errorgroup_id = "";
      this.editForm.new_srv_errorgroup_idname = "";
    },
    //故障现象lookup
    errorLookup: function() {
      this.$refs.error.show();
    },
    //监听故障现象组件双击、确定事件，传递参数值
    selectError: function(id, name, description, solution) {
      this.editForm.new_srv_error_id = id;
      this.editForm.new_srv_error_idname = name;
      this.editForm.new_description = description;
      this.editForm.new_solution = solution;
    },
    //监听故障现象组件移除值事件，清除故障现象数据
    clearError: function() {
      this.editForm.new_srv_error_id = "";
      this.editForm.new_srv_error_idname = "";
      this.editForm.new_description = "";
      this.editForm.new_solution = "";
    },
    //维修工时说明Lookup
    repairWorkHoursLookup: function() {
      this.$refs.repairWorkHours.show();
    },
    //监听维修工时说明双击、确定事件，传递参数值
    selectRepairWorkHours: function(id, name, standardhour, hourcost) {
      this.editForm.new_srv_workhours_id = id;
      this.editForm.new_srv_workhours_idname = name;
      this.editForm.new_standardhour = standardhour;
      this.editForm.new_workhourprice = hourcost;
      this.editForm.new_workhourcost = standardhour * hourcost;
    },
    //监听维修工时说明双击、确定事件，移除维修工时说明数据
    clearWorkHours: function() {
      this.editForm.new_srv_workhours_id = "";
      this.editForm.new_srv_workhours_idname = "";
      this.editForm.new_standardhour = "";
      this.editForm.new_workhourprice = "";
      this.editForm.new_workhourcost = "";
    },

    //关闭时清除form内容
    handleClose: function() {
      this.$refs["editForm"].resetFields();
      this.dialogFormVisible = false;
    }
  }
};
</script>
