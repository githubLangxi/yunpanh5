<template>
  <div class="createData">
      <rt-header title="签核角色">
          <rt-toolbar show-autoback>
              <rt-button type="save" @click="createDetail"/>
          </rt-toolbar>
      </rt-header>

      <rt-content>
          <rt-section title="常规">
              <el-form :model="ViewForm" :rules="rules" ref="ViewForm" label-width="120px" class="rt-portal-form"  :label-position="labelPosition" >
                    <el-row :gutter="50" class="rt-portal-form-row">
                    <el-col :span="8">
                        <el-form-item label="名称" prop="Name" >
                            <el-input v-model="ViewForm.Name" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
              </el-form>
          </rt-section>
      </rt-content>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      ViewForm: {
        Name: "",
        Id:""
      },
      rules: {
        Name: [
          { required: true, message: "请填写签核角色名称", trigger: "change" }
        ]
      },
      labelPosition: "left",
    };
  },
  methods: {
    createDetail: function() {
      if (this.ViewForm.Id == "") {
        let that = this;
        var apiUrl = "../api/PortalFlowRole/CreateFlowRole";
        rt
          .post(apiUrl, that.ViewForm)
          .then(res => {
            rt.showSuccessToast("创建成功！");
            that.ViewForm.Id = res;
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      } else {
        let that = this;
        var apiUrl = "../api/PortalFlowRole/SaveFlowRole";
        rt
          .post(apiUrl, that.ViewForm)
          .then(res => {
            rt.showSuccessToast("保存成功！");
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
    }
  }
};
</script>
