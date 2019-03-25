<template>
  <div>
    <el-dialog :title="$t('new_srv_repair')" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left" :rules="rules">
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item :label="$t('new_srv_repair.new_project_id')" prop="new_project_idname">
              <el-input v-model="editForm.new_project_idname" readonly icon="search" :on-icon-click="repairPorjectLookup"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('new_srv_repair.new_srv_workhours_id')" prop="new_srv_workhours_idname">
              <el-input v-model="editForm.new_srv_workhours_idname" readonly icon="search" :on-icon-click="repairWorkHoursLookup"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item :label="$t('new_srv_repair.new_standardhour')" prop="new_standardhour">
              <el-input disabled v-model="editForm.new_standardhour"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('new_srv_repair.new_workhourprice')" prop="new_workhourprice">
              <el-input disabled v-model="editForm.new_workhourprice"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item :label="$t('new_srv_repair.new_workhourcost')" prop="new_workhourcost">
              <el-input v-model="editForm.new_workhourcost" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('new_srv_repair.new_memo')" prop="new_memo">
              <el-input v-model="editForm.new_memo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-foot{er">
        <el-button @click="handleClose">{{this.$t('BUTTON_CANCEL')}}</el-button>
        <el-button type="primary" @click="onSave('editForm')">{{this.$t('BUTTON_DETERMINE')}}</el-button>
      </div>
    </el-dialog>
    <repairProject ref="repairProject" @lookupSelect="selectRepairProject" @lookupSelectClear="clearProject"></repairProject>
    <repairWorkHours ref="repairWorkHours" :workOrderId="this.workOrderId" :projectId="this.editForm.new_project_id" @lookupSelect="selectRepairWorkHours" @lookupSelectClear="clearWorkHours"></repairWorkHours>
  </div>
</template>

<script>
// import repairProject from "../dialog/repairProjectDialog";
// import repairWorkHours from "../dialog/repairWorkHoursDialog";
export default {
  name: "repairContentDialog",
  data: function () {
    return {
      dialogFormVisible: false,
      new_srv_workorderid: "", //主档id
      new_srv_repairid: "",
      editForm: {
        new_project_id: "", //维修项目id
        new_project_idname: "", //维修项目名称
        new_srv_workhours_id: "", //维修工时说明
        new_srv_workhours_idname: "", //维修工时
        new_standardhour: 0, //标准工时

        new_workhourprice: 0, //工时单价
        new_workhourcost: 0, //工时金额
        new_memo: "" //备注
      },
      rules: {
        new_project_idname: [
          { required: true, message: "请选择维修工时说明", trigger: "change" }
        ],
        new_srv_workhours_idname: [
          { required: true, message: "请选择维修工时说明", trigger: "change" }
        ]
      }
    };
  },
  props: {
    workOrderId: String
  },
  components: {
    repairProject:resolve => { require(['../dialog/repairProjectDialog.vue'], resolve) },
    repairWorkHours:resolve => { require(['../dialog/repairWorkHoursDialog.vue'], resolve) }
  },
  mounted: function () {
  },
  methods: {
    //根据维修内容明细id加载维修内容
    _fetchRecords: function () {
      if (this.new_srv_repairid) {
        var requestStr =
          "../api/WorkOrder/GetRepairLineById/" + this.new_srv_repairid;
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
    show: function (val) {
      this.dialogFormVisible = true;
      if (!rt.isNullOrWhiteSpace(val) || !val === " ") {
        this.new_srv_repairid = val; //获取传递的参数，赋值维修内容id，加载数据
        this._fetchRecords();
      } else {
        this.new_srv_repairid = "";
        this.editForm.new_project_id = "";
      }
    },
    //保存维修内容明细
    onSave: function () {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          var self = this;
          var params = self.editForm;
          params.new_srv_workorder_id = self.workOrderId;
          //创建
          if (rt.isNullOrWhiteSpace(self.new_srv_repairid)) {
            self
              .createFormData(params)
              .then(function (res) {
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
            params.id = self.new_srv_repairid;
            self
              .updateFormDate(params)
              .then(function (res) {
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
          this.$message({
            message: this.$t("PleaseInputRequiredFields"),
            type: "error"
          });
        }
      });
    },
    //创建维修内容明细
    createFormData: function (params) {
      return rt.post("../api/WorkOrder/CreateOrUpdateRepairLine", params);
    },
    //更新维修内容数据
    updateFormDate: function (params) {
      return rt.post("../api/WorkOrder/UpdateRepairLineDetail", params);
    },

    /************
         Dialog弹出框部分
        ************/
    //维修项目Lookup
    repairPorjectLookup: function () {
      this.$refs.repairProject.show();
    },
    //监听项目查询双击、确定事件，传递参数值
    selectRepairProject: function (id, name) {
      this.editForm.new_project_id = id;
      this.editForm.new_project_idname = name;

      this.clearWorkHours();
    },
    //监听项目移除值事件，清除项目数据
    clearProject: function () {
      this.editForm.new_project_id = "";
      this.editForm.new_project_idname = "";

      this.clearWorkHours();
    },
    //维修工时说明Lookup
    repairWorkHoursLookup: function () {
      this.$refs.repairWorkHours.show();
    },
    //监听维修工时说明双击、确定事件，传递参数值
    selectRepairWorkHours: function (id, name, standardhour, hourcost, new_workhourcost) {
      this.editForm.new_srv_workhours_id = id;
      this.editForm.new_srv_workhours_idname = name;
      this.editForm.new_standardhour = standardhour;
      this.editForm.new_workhourprice = hourcost;
      this.editForm.new_workhourcost = new_workhourcost;
    },
    //监听维修工时说明双击、确定事件，移除维修工时说明数据
    clearWorkHours: function () {
      this.editForm.new_srv_workhours_id = "";
      this.editForm.new_srv_workhours_idname = "";
      this.editForm.new_standardhour = "";
      this.editForm.new_workhourprice = "";
      this.editForm.new_workhourcost = "";
    },
    //关闭时清除form内容
    handleClose: function () {
      this.dialogFormVisible = false;
      this.$refs["editForm"].resetFields();
    }
  }
};
</script>
