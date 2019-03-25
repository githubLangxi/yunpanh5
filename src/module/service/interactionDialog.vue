<template>
    <el-dialog  title="服务互动" :visible.sync="dialogFormVisible" :before-close="handleClose" size="large">
        <div class="rt-header1" >
            <rt-toolbar showBack @goback="beforeGoBack">
                <rt-button type="save" v-show="true" @click="onSave('editForm')" />
            </rt-toolbar>
        </div>
        <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left" :rules="rules">
            <el-row :gutter="50">
              <el-col :span="8">
                <el-form-item label="跟单内容" prop="new_content">
                  <el-select v-model="editForm.new_content" clearable >
                    <el-option v-for="item in pickListOptions['new_content']" :key="item.Value" :label="item.Text" :value="item.Value">
                      {{item.Text}}
                    </el-option>
                  </el-select>
                  <!-- <rt-picklist v-model="editForm.new_content" entity="new_srv_interaction" attribute="new_content"></rt-picklist> -->
                </el-form-item>
              </el-col>
                <el-col :span="8" v-if="editForm.new_content==10">
                <el-form-item label="改约原因" prop="new_changereason">
                  <rt-picklist v-model="editForm.new_changereason" entity="new_srv_workorder" attribute="new_changereason"></rt-picklist>
                </el-form-item>
              </el-col>
               <el-col :span="8" v-if="editForm.new_content==25">
                <el-form-item label="退单类型" prop="new_retreattype">
                  <rt-picklist v-model="editForm.new_retreattype" entity="new_srv_interaction" attribute="new_retreattype"></rt-picklist>
                </el-form-item>
              </el-col>
               <el-col :span="8" v-if="editForm.new_content==25">
                <el-form-item label="退单原因" prop="new_retreatreason">
                  <rt-picklist v-model="editForm.new_retreatreason" entity="new_srv_interaction" attribute="new_retreatreason"></rt-picklist>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="editForm.new_content==26">
                <el-form-item label="重复来电分类" prop="new_type">
                  <rt-picklist v-model="editForm.new_type" entity="new_srv_interaction" attribute="new_type"></rt-picklist>
                </el-form-item>
              </el-col>
                 <el-col :span="8" v-if="editForm.new_content==26">
                <el-form-item label="是否重电" prop="new_isrepeat">
                 <el-checkbox v-model="editForm.new_isrepeat"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="50">
             <el-col :span="8">
                <el-form-item label="是否发送短信" prop="new_ismessgae">
                  <el-checkbox v-model="editForm.new_ismessgae"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
            <el-col :span="24">
              <el-form-item label="跟单描述" prop="new_desc">
                <el-input type="textarea" v-model="editForm.new_desc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
  name: "interactionDialog",
  data: function() {
    return {
      dialogFormVisible: false,
      editForm: {
        new_unit: 3,
        ownerid: "",
        owneridname: ""
      },
      rules: {},
      interactionid: "",
      pickListOptions: {}
    };
  },
  props: {
    workOrder: Object
  },
  components: {},
  mounted: function() {
    this.getPickListOptions();
    this._fetchRecords();
  },
  methods: {
    //根据服务互动明细id加载维修内容
    _fetchRecords: function() {
      this.editForm.new_unit = 3; //单位-网点
    },
    //提供给父组件调用
    show: function(val) {
      this.$nextTick(() => {
        this.dialogFormVisible = true;
        if (val) {
          this.interactionid = val; //获取传递的参数，赋值维修内容id，加载数据
          this._fetchRecords();
        }
      });
    },
    //加载下拉框
    getPickListOptions() {
      var attributes = "new_content";
      var entityName = "new_srv_interaction";
      let that = this;
      rt.get("../api/WorkOrder/GetContentList").then(function(list) {
        if (list == null || list.length <= 0) return;
        rt
          .get("../api/crmpicklists/options/" + entityName + "/" + attributes)
          .then(function(res) {
            var content = [];
            let atts = attributes.split(",");
            for (var item in res.new_content) {
              if (list.indexOf(res.new_content[item].Value) != -1) {
                content.push(res.new_content[item]);
              }
            }
            that.$set(that.pickListOptions, "new_content", content);
          });
      });
    },
    //保存事件
    onSave: function() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          var self = this;
          var params = self.editForm;
          params.new_srv_workorder_id = self.workOrder.id;
          //创建
          if (rt.isNullOrWhiteSpace(self.interactionid)) {
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
    createFormData: function(params) {
      return rt.post("../api/WorkOrder/CreateOrUpdateInteraction", params);
    },
    //更新维修内容数据
    updateFormDate: function(params) {
      return rt.post("../api/WorkOrder/UpdateInteraction", params);
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
