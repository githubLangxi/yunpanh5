<template>
  <div>
    <rt-header title="反馈机型">
      <rt-toolbar show-autoback>
        <rt-button type="save"  @click="onSave('dataForm')"/>
      </rt-toolbar>
    </rt-header>
    <rt-content>
      <el-form ref="dataForm" :model="dataForm" label-width="120px" label-position="left">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="反馈单号">
              <el-input v-model="new_name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="条码">
              <rt-lookup v-model="dataForm.new_srv_userprofile_id" entity="new_srv_userprofile" idField="new_srv_userprofileid" nameField="new_name" dialog-filter-fields="new_name" />              
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机型">
              <rt-lookup v-model="dataForm.new_product_id" entity="product" idField="productid" nameField="name" dialog-filter-fields="name" />                     
            </el-form-item>
          </el-col>
          </el-row>
      </el-form>
    </rt-content>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      dataForm: {
        new_product_id: {},
        new_srv_userprofile_id: {}
      },
      id: "",
      new_name: "",
      feedbackmodelid: ""
    };
  },
  mounted: function() {
    this.loaddata();
  },
  methods: {
    loaddata: function() {
      this.id = this.$route.params.id;
      this.new_name = this.$route.params.name;
    },
    //保存方法
    onSave: function(formName) {
      if (
        this.dataForm.new_srv_userprofile_id.id === undefined ||
        this.dataForm.new_product_id.id === undefined
      ) {
        rt.showErrorToast("请填写相关数据！");
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            var self = this;
            var feedbackModel = self.dataForm;
            var params = {
              new_srv_userprofile_id: feedbackModel.new_srv_userprofile_id, //
              new_product_id: feedbackModel.new_product_id, //
              new_qualityfeedback_id: { id: self.id, name: self.name }
            };

            self.saveCollBack = true;
            rt
              .post("../api/QualityFeedback/CreateFeedbackModel", params)
              .then(function(res) {
                self.$message({
                  message: "保存成功",
                  type: "success"
                });
                self.saveCollBack = false;
                self.feedbackmodelid = res;
                self.loaddata();
                if (self.feedbackmodelid) {
                  self.$router.replace({
                    name: "qualityFeedbackEdit",
                    params: { id: self.id }
                  });
                } else {
                  self.$router.push({ name: "qualityFeedbackList" });
                }
              })
              .catch(error => {
                self.saveCollBack = false;
                rt.showErrorToast(error);
              });
          } else {
            rt.showErrorToast("请输入必填项！");
          }
        });
      }
    }
  }
};
</script>
