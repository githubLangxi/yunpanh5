<template>
<div>
    <el-dialog  title="账务属性" :visible.sync="dialogFormVisible" :before-close="handleClose" size="large">
        <div class="rt-header1" >
            <rt-toolbar showBack @goback="beforeGoBack">
                <rt-button type="save" v-show="true" @click="onSave('editForm')" />
            </rt-toolbar>
        </div>
        <el-form ref="editForm" :model="editForm"  label-width="120px" label-position="left" :rules="rules" v-loading="loading">
            <el-row :gutter="50">
             <el-col :span="8">
                 <el-form-item label="奥克斯公司别" prop="new_auxcompany">
                  <rt-picklist v-model="editForm.new_auxcompany" :disabled="this.IsForm" entity="new_srv_station_apply2account" attribute="new_auxcompany"></rt-picklist>
                </el-form-item>
              </el-col>
               <el-col :span="8">
              <el-form-item label="付款方式" prop="new_sappaymethod">
              <rt-picklist v-model="editForm.new_sappaymethod" :disabled="this.IsForm" entity="new_srv_station_apply2account" attribute="new_sappaymethod"></rt-picklist>
              </el-form-item>
              </el-col>
           <el-col :span="8">
          <el-form-item label="签约品牌" prop="new_signbrand">
          <rt-picklist v-model="editForm.new_signbrand" :disabled="this.IsForm" entity="new_srv_station_apply2account" attribute="new_signbrand"></rt-picklist>
              </el-form-item>
              </el-col>
             </el-row>
            <el-row :gutter="50">
              <el-col :span="8">
              <el-form-item label="安装日能力" prop="new_install_estimate_num">
                <el-input type="text" v-model="editForm.new_install_estimate_num" :disabled="this.IsForm"></el-input>
              </el-form-item>
              </el-col>
             <el-col :span="8">
              <el-form-item label="维修日能力" prop="new_repair_estimate_num">
            <el-input type="text" v-model="editForm.new_repair_estimate_num" :disabled="this.IsForm"></el-input>
              </el-form-item>
              </el-col>
           <el-col :span="8">
              <el-form-item label="日能力变更日期" prop="new_estimate_change_date">
                 <el-date-picker class="rt-portal-item-date" :disabled="this.IsForm" v-model="editForm.new_estimate_change_date" type="date" placeholder="选择日期" ></el-date-picker>
              </el-form-item>
              </el-col>
          </el-row>
            <el-row :gutter="50">
             <el-col :span="8">
              <el-form-item label="转账服务商" prop="new_transfer_station_id">
               <el-input v-model="editForm.new_transfer_station_id" :disabled="this.IsForm" readonly @keyup.enter.native="quickChooseCounty"  icon="search" :on-icon-click="levelLookup"></el-input>
              </el-form-item>
              </el-col>
          </el-row>
        </el-form>
    </el-dialog>
      <levelDialog ref="PlatformListDialog" @lookupSelect="selectlevel"  @lookupSelectClear="clear"></levelDialog>
</div>
</template>
<script>
export default {
  name: "PlatformListDialog",
  data: function() {
    return {
      dialogFormVisible: false,
      editForm: {
        new_auxcompany: "",
        new_sappaymethod: "",
        new_signbrand: "",
        new_install_estimate_num: "",
        new_repair_estimate_num: "",
        new_estimate_change_date: "",
        new_transfer_station_id: "",
        new_station_id: "",
        new_srv_station_apply2accountid: "",
        new_transfer_station_idname: ""
      },
      loading: false,
      IsForm: false,
      rules: {}
    };
  },
  props: {
    workOrder: Object
  },
  components: {
    levelDialog: resolve => {
      require(["./levelDialog.vue"], resolve);
    }
  },
  mounted: function() {
    // this._fetchRecords();
  },
  methods: {
    //提供给父组件调用
    show: function(apply2accountid) {
      this.loading = true;
      this.$nextTick(() => {
        this.dialogFormVisible = true;
        if (apply2accountid) {
          var params = { id: apply2accountid };
          var requestStr = "../api/StationApply/GetAccountModel";
          rt.get(requestStr, params)
            .then(res => {
              this.loading = false;
              if (
                this.workOrder.state != null &&
                (this.workOrder.state != "1" && this.workOrder.state != "4")
              ) {
                this.IsForm = true;
              } else {
                this.IsForm = false;
              }
              this.editForm = res;
            })
            .catch(error => {
              this.loading = false;
              this.IsForm = true;
              rt.showErrorToast(error);
            });
        } else {
          this.loading = false;
          this.IsForm = false;
          this.editForm.new_auxcompany = "";
          this.editForm.new_sappaymethod = "";
          this.editForm.new_signbrand = "";
          this.editForm.new_install_estimate_num = "";
          this.editForm.new_repair_estimate_num = "";
          this.editForm.new_estimate_change_date = "";
          this.editForm.new_transfer_station_id = "";
          this.editForm.new_station_id = "";
          this.editForm.new_transfer_station_idname = "";
          this.editForm.new_srv_station_apply2accountid = "";
        }
      });
    },
    //保存事件
    onSave: function() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          var self = this;
          var params = self.editForm;
          params.new_station_id = self.workOrder.id;
          //创建/修改
          self.saveCollBack = true;
          rt.post("../api/StationApply/AddAccount", params)
            .then(function(res) {
              rt.showSuccessToast(self.$t("Successfullysaved"));
              self.$emit("reLoad");
              self.dialogFormVisible = false;
              self.$refs["editForm"].resetFields();
            })
            .catch(error => {
              self.saveCollBack = false;
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
    quickChooseCounty: function() {
      this.$refs.PlatformListDialog.show(this.editForm.new_transfer_station_id);
    },
    selectlevel: function(id, name) {
      if (
        this.editForm.new_transfer_station_idname == id &&
        this.editForm.new_transfer_station_id == name
      ) {
        return;
      } else {
        this.editForm.new_transfer_station_idname = id;
        this.editForm.new_transfer_station_id = name;
      }
    },
    //二级服务清除省份数据
    clear: function() {
      this.editForm.new_transfer_station_idname = "";
      this.editForm.new_transfer_station_id = "";
    },
    //二级服务Dialog
    levelLookup: function() {
      this.$refs.PlatformListDialog.show(this.editForm.new_transfer_station_id);
    },
    reLoadinteraction: function() {
      // this._fetchRecords();
      this.$emit("reLoad");
    },
    //关闭时清除form内容
    handleClose: function() {
      this.dialogFormVisible = false;
      this.$refs["editForm"].resetFields();
      this.$emit("reLoad");
    },
    //返回按钮之前提示保存服务单数据
    beforeGoBack: function() {
      this.handleClose();
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
