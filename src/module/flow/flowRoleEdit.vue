<template>
    <div class="flowRoleEdit">
        <rt-header title="签核角色">
            <rt-toolbar show-autoback>
                 <rt-button type="save" @click="saveForm()" ></rt-button>
            </rt-toolbar>
        </rt-header>
        <rt-content>
          <rt-section title="常规">
            <el-form :model="ViewForm" :rules="rules" ref="ViewForm" label-width="120px" class="rt-portal-form" :label-position="labelPosition" v-loading="loading">
                <el-row :gutter="50" class="rt-portal-form-row">
                    <el-col :span="6">
                        <el-form-item label="名称" prop="Name">
                            <el-input v-model="ViewForm.Name" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
          </rt-section>
        </rt-content>
    

    <UserList ref="userList"></UserList>
    </div>
</template>
<script type="text/javascript">
import UserList from "./userList";
export default {
  data() {
    return {
      loading: false,
      labelPosition: "left",
      ViewForm: {
        Name: "",
        id: ""
      },
      rules: {
        Name: [{ required: true, message: "请选择公告类型", trigger: "change" }]
      },
      isFlowRoleEdit: false,
      flowroleid: "",
      formLabelWidth: "80px"
    };
  },
  components: { UserList },
  mounted: function() {
    if (this.$route.params.id) {
      this.flowroleid = this.$route.params.id;
    }
    this.getFlowRoleDetail();
  },
  methods: {
    //数据初始化
    getFlowRoleDetail() {
      this.loading = true;
      let apiUrl =
        "../api/PortalFlowRole/GetFlowRoleById?id=" + this.flowroleid;
      let that = this;
      rt
        .get(apiUrl)
        .then(res => {
          that.ViewForm = res;
          that.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    saveForm() {
      this.ViewForm.id = this.flowroleid;
      let apiUrl = "../api/PortalFlowRole/SaveFlowRole";
      let that = this;
      rt
        .post(apiUrl, this.ViewForm)
        .then(res => {
          rt.showSuccessToast(res);
          that.getFlowRoleDetail();
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    productlookup() {
      this.$refs.UserList.show();
    }
  }
}
</script>
