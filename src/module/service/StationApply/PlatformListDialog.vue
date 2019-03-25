<template>
<div>
    <el-dialog   title="平台信息" :visible.sync="dialogFormVisible" :before-close="handleClose" size="large">
        <div class="rt-header1" >
            <rt-toolbar showBack @goback="beforeGoBack">
                <rt-button type="save" v-show="true" @click="onSave('editForm')" />
            </rt-toolbar>
        </div>
        <el-form ref="editForm" :model="editForm" :disabled="this.IsForm" label-width="120px" label-position="left" :rules="rules" v-loading="loading">
            <el-row :gutter="50">
             <el-col :span="8">
                 <el-form-item label="奥克斯公司别" prop="new_company">
                  <rt-picklist v-model="editForm.new_company" :disabled="this.IsForm" entity="new_srv_station_apply2platform" attribute="new_company"></rt-picklist>
                </el-form-item>
              </el-col>
               <el-col :span="8">
              <el-form-item label="平台分类" prop="new_platform_type">
              <rt-picklist v-model="editForm.new_platform_type" :disabled="this.IsForm" entity="new_srv_station_apply2platform" attribute="new_platform_type"></rt-picklist>
              </el-form-item>
              </el-col>
             <el-col :span="8">
              <el-form-item label="平台网点编码" prop="new_platform_shop_code">
                <el-input type="text" v-model="editForm.new_platform_shop_code" :disabled="this.IsForm"></el-input>
              </el-form-item>
              </el-col>
             </el-row>
            <el-row :gutter="50">
              <el-col :span="8">
              <el-form-item label="平台网点名称" prop="new_platform_shop_name">
                <el-input type="text" v-model="editForm.new_platform_shop_name" :disabled="this.IsForm"></el-input>
              </el-form-item>
              </el-col>
             <el-col :span="8">
              <el-form-item label="平台网点属性" prop="new_platform_shop_property">
             <rt-picklist v-model="editForm.new_platform_shop_property" :disabled="this.IsForm" entity="new_srv_station_apply2platform" attribute="new_platform_shop_property"></rt-picklist>
              </el-form-item>
              </el-col>
           <el-col :span="8">
              <el-form-item label="合作关系" prop="new_platform_shop_partner">
             <rt-picklist v-model="editForm.new_platform_shop_partner" :disabled="this.IsForm" entity="new_srv_station_apply2platform" attribute="new_platform_shop_partner"></rt-picklist>
              </el-form-item>
              </el-col>
          </el-row>
            <el-row :gutter="50">
             <el-col :span="8">
              <el-form-item label="二级服务商" prop="new_second_level_station">
                    <el-input v-model="editForm.new_second_level_station" :disabled="this.IsForm"  readonly @keyup.enter.native="quickChooseCounty"  icon="search" :on-icon-click="levelLookup"></el-input>
              </el-form-item>
              </el-col>
           <el-col :span="8">
              </el-col>
          </el-row>
        </el-form>
    </el-dialog>
      <levelDialog ref="PlatformListDialog" @lookupSelect="selectlevel" @lookupSelectClear="clear"></levelDialog>
</div>
</template>
<script>
export default {
  name: "PlatformListDialog",
  data: function() {
    return {
      dialogFormVisible: false,
      editForm: {
        new_company: "",
        new_platform_type: "",
        new_platform_shop_code: "",
        new_platform_shop_name: "",
        new_platform_shop_property: "",
        new_platform_shop_partner: "",
        new_second_level_station: "",
        new_station_id: "",
        new_srv_station_apply2platformid: "",
        new_second_level_stationname: ""
      },
      IsForm: false,
      loading: false,
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
    show: function(apply2platformid) {
      this.loading = true;
      this.$nextTick(() => {
        this.dialogFormVisible = true;
        if (apply2platformid) {
          var params = { id: apply2platformid };
          var requestStr = "../api/StationApply/GetPlatformModel";
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
          this.editForm.new_company = "";
          this.editForm.new_platform_type = "";
          this.editForm.new_platform_shop_code = "";
          this.editForm.new_platform_shop_name = "";
          this.editForm.new_platform_shop_property = "";
          this.editForm.new_platform_shop_partner = "";
          this.editForm.new_second_level_station = "";
          this.editForm.new_station_id = "";
          this.editForm.new_srv_station_apply2platformid = "";
          this.editForm.new_second_level_stationname = "";
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
          rt.post("../api/StationApply/AddPlatform", params)
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
      this.$refs.PlatformListDialog.show(
        this.editForm.new_second_level_station
      );
    },
    selectlevel: function(id, name) {
      if (
        this.editForm.new_second_level_stationname == id &&
        this.editForm.new_second_level_station == name
      ) {
        return;
      } else {
        this.editForm.new_second_level_stationname = id;
        this.editForm.new_second_level_station = name;
      }
    },
    //二级服务清除省份数据
    clear: function() {
      this.editForm.new_second_level_stationname = "";
      this.editForm.new_second_level_station = "";
    },

    //二级服务Dialog
    levelLookup: function() {
      this.$refs.PlatformListDialog.show(
        this.editForm.new_second_level_station
      );
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
