<template>
    <div>
        <el-dialog title="故障明细" :visible.sync="dialogFormVisible" :before-close="handleClose" size="large">
            <div class="rt-header1" >
                <rt-toolbar showBack @goback="beforeGoBack">
                    <rt-button type="save" v-show="true" @click="onSave('editForm')" />
                </rt-toolbar>
            </div>
            <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left" :rules="rules">
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="选择故障机" prop="new_userprofile_idName">
                            <el-input v-model="editForm.new_userprofile_idName" readonly :disabled="disabledform" icon="search" :on-icon-click="workOrderUserProfileLookup"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="故障机条码" prop="new_number">
                            <el-input v-model="editForm.new_number" readonly disabled=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="故障现象" prop="new_srv_error_idName">
                            <el-input v-model="editForm.new_srv_error_idName" readonly :disabled="disabledform" icon="search" :on-icon-click="errorLookup"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="故障原因" prop="new_srv_errorgroup_idName">
                            <el-input v-model="editForm.new_srv_errorgroup_idName" readonly :disabled="disabledform" icon="search" :on-icon-click="errorGroupLookup"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="维修项目" prop="new_troubleproject_idName">
                            <el-input v-model="editForm.new_troubleproject_idName" readonly :disabled="disabledform" icon="search" :on-icon-click="projectLookup"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="配件小类" prop="new_partstype_idName">
                            <el-input v-model="editForm.new_partstype_idName" readonly disabled="" icon="search" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
        <errorGroupLookupDialog ref="errorGroup" @lookupSelect="selectErrorGroup" @lookupSelectClear="clearErrorGroup" ></errorGroupLookupDialog>
        <errorLookupDialog ref="error" @lookupSelect="selectError" @lookupSelectClear="clearError"></errorLookupDialog>
        <projectDialog ref="projectDialog" @lookupSelect="selectProject" @lookupSelectClear="clearProject" :errgroupid="editForm.new_srv_errorgroup_id" :insideoroutside="editForm.new_insideoroutside" ></projectDialog>
        <workOrderUserProfileDialog ref="workOrderUserProfileDialog" @lookupSelect="selectWorkOrderUserProfile" @lookupSelectClear="clearWorkOrderUserProfile" :workOrder="this.workOrder"></workOrderUserProfileDialog>
    </div>
</template>

<script>
// import errorGroupLookupDialog from "./errorGroupLookupDialog";
// import errorLookupDialog from "./errorLookupDialog";
// import projectDialog from "../dialog/projectDialog";
// import workOrderUserProfileDialog from "../dialog/workOrderUserProfileDialog";
export default {
  name: "troubleDialog",
  data: function() {
    return {
      dialogFormVisible: false,
      disabledform: false,
      new_srv_troubleid: "", //故障模式id
      new_srv_workorderid: "", //主档id
      fault: "fault",

      editForm: {
        new_srv_errorassembly_id: "", //故障系统id
        new_srv_errorassembly_idName: "", //故障系统
        new_errormodule_id: "", //故障部件id
        new_errormodule_idName: "", //故障部件
        new_srv_errorgroup_id: "", //故障零件id
        new_srv_errorgroup_idName: "", //故障零件
        new_srv_error_id: "", //故障现象id
        new_srv_error_idName: "", //故障现象
        new_userprofile_id: "", //选择故障机id
        new_userprofile_idName: "", //选择故障机
        new_troubleproject_id: "", //维修项目id
        new_troubleproject_idName: "", //维修项目
        new_partstype_id: "", //配件小类id
        new_partstype_idName: "" //配件小类
        //----------------------------------------------------------
        //说明
        //故障系统 new_srv_errorassembly_id 故障原因大类
        //故障零件 new_srv_errorgroup_id
        //故障部件 new_errormodule_id
        //故障原因 lookup
        //----------------------------------------------------------
      },
      rules: {}
    };
  },
  props: {
    workOrder: {
      type: Object,
      require: true
    }
  },
  components: {
    errorGroupLookupDialog: resolve => {
      require(["./errorGroupLookupDialog.vue"], resolve);
    },
    errorLookupDialog: resolve => {
      require(["./errorLookupDialog.vue"], resolve);
    },
    projectDialog: resolve => {
      require(["../dialog/projectDialog.vue"], resolve);
    },
    workOrderUserProfileDialog: resolve => {
      require(["../dialog/workOrderUserProfileDialog.vue"], resolve);
    }
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
      this.$nextTick(() => {
        this.dialogFormVisible = true;
        if (val) {
          this.new_srv_troubleid = val; //获取传递的参数，赋值故障模式明细id，加载数据
          this._fetchRecords();
        } else {
          this.new_srv_troubleid = "";
          this.editForm.new_srv_workhours_id = "";
        }
      });
    },
    //保存故障模式明细
    onSave: function() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          var self = this;
          var params = self.editForm;
          params.new_srv_workorder_id = self.workOrder.id;
          //创建
          if (rt.isNullOrWhiteSpace(self.new_srv_troubleid)) {
            self
              .createFormData(params)
              .then(function(res) {
                rt.showSuccessToast(self.$t("Successfullysaved"));
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
                rt.showSuccessToast(self.$t("Successfullysaved"));
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

    //关闭时清除form内容
    handleClose: function() {
      this.$refs["editForm"].resetFields();
      this.dialogFormVisible = false;
      this.$emit("reLoad");
      this.clearError();
      this.clearProject();
      this.clearWorkOrderUserProfile();
      this.clearErrorGroup();
    },

    //返回按钮之前提示保存服务单数据
    beforeGoBack: function() {
      this.handleClose();
    },

    //故障零件Lookup
    errorGroupLookup: function() {
      this.$refs.errorGroup.show(
        this.editForm.new_srv_error_id,
        this.editForm.new_userprofile_id
      );
    },
    //选择故障零件
    selectErrorGroup: function(data) {
      this.editForm.new_srv_errorassembly_id = data.assemblyid;
      this.editForm.new_srv_errorassembly_idName = data.assembly;
      this.editForm.new_srv_errorgroup_id = data.id;
      this.editForm.new_srv_errorgroup_idName = data.name;
      this.editForm.new_errormodule_id = data.moduleid;
      this.editForm.new_errormodule_idName = data.module;
    },
    //清除故障零件
    clearErrorGroup: function() {
      this.editForm.new_srv_errorassembly_id = "";
      this.editForm.new_srv_errorassembly_idName = "";
      this.editForm.new_srv_errorgroup_id = "";
      this.editForm.new_srv_errorgroup_idName = "";
      this.editForm.new_errormodule_id = "";
      this.editForm.new_errormodule_idName = "";
    },

    //故障现象lookup
    errorLookup: function() {
      this.$refs.error.show(
        this.editForm.new_srv_errorgroup_id,
        this.editForm.new_userprofile_id
      );
    },
    //监听故障现象组件双击、确定事件，传递参数值
    selectError: function(data) {
      this.editForm.new_srv_error_id = data.id;
      this.editForm.new_srv_error_idName = data.name;
    },
    //监听故障现象组件移除值事件，清除故障现象数据
    clearError: function() {
      this.editForm.new_srv_error_id = "";
      this.editForm.new_srv_error_idName = "";
    },

    //维修项目lookup
    projectLookup: function() {
      this.$refs.projectDialog.show();
    },

    selectProject: function(id, name, new_partstype_id, new_partstype_idName) {
      this.editForm.new_troubleproject_id = id;
      this.editForm.new_troubleproject_idName = name;
      this.editForm.new_partstype_id = new_partstype_id;
      this.editForm.new_partstype_idName = new_partstype_idName;
    },

    clearProject: function() {
      this.editForm.new_troubleproject_id = "";
      this.editForm.new_troubleproject_idName = "";
      this.editForm.new_partstype_id = "";
      this.editForm.new_partstype_idName = "";
    },

    //故障机lookup
    workOrderUserProfileLookup: function() {
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
    },

    clearWorkOrderUserProfile: function() {
      this.editForm.new_userprofile_id = "";
      this.editForm.new_userprofile_idName = "";
      this.editForm.new_number = "";
      this.editForm.new_insideoroutside = 0;
    }
  }
};
</script>
