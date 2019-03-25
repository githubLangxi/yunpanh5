<template>
  <div v-if="formDialog">
      <el-dialog title="签核提醒" :visible.sync="formDialog" :show-close="true" :close-on-press-escape="false" :close-on-click-modal="false" width="580px" >
        <el-form :model="NotificationForm" :rules="rules" ref="NotificationForm" label-position="left" label-width="120px" class="rt-portal-form">
          <el-row :gutter="50" class="rt-portal-form-row">
            <el-col :span="24">
              <el-form-item label="签核流程" prop="Flow">
                          <rt-lookup v-model="Flow" entity="new_flow" :disabled="true"/>
                      </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50" class="rt-portal-form-row">
            <el-col :span="24">
              <el-form-item label="执行动作" prop="ActionWorkFlow">
                <rt-lookup v-model="ActionWorkFlow" entity="workflow" idField="workflowid" nameField="name"  :dialog-display-fields="[{name:'name',label:'名称',width:150},{name:'createdon',label:'创建时间'}]" :dialog-filter-fields="name" dialog-request-url="../api/PortalFlow/GetConditionWorkFlowType"/>
                    </el-form-item>
            </el-col>
          </el-row>
        </el-form>
                 
        <div>
          <el-button type="primary" @click="addNotification">确认</el-button>
          <el-button @click="cancelAdd">取消</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      NotificationForm: {
        Id: "",
        Flow: "",
        ActionWorkFlow: "",
        ActionWorkFlowName: "",
        Subject: "",
        NoteText: "",
        IsDocument: "",
        FileName: ""
      },
      name:"name",
      Flow: null,
      ActionWorkFlow: null,
      new_flowid: "",
      rules: {
        Flow: [
          { required: true, message: "请填写签核流程", trigger: "change" }
        ],
        ActionWorkFlow: [
          { required: true, message: "请填写执行动作", trigger: "change" }
        ]
      },
      formDialog: false,
      Annotation: false
    };
  },
  mounted: function() {
    if (this.$route.params.id) {
      this.new_flowid = this.$route.params.id;
    }

  },
  watch:{
    'ActionWorkFlow':function(newVal){
       this.NotificationForm.ActionWorkFlow = newVal.id;
    }
  },
  methods: {
    show: function() {
      this.formDialog = true;
      this.Annotation = false;
      this.getNotificationFlow();
      for (var name in this.$data.NotificationForm) {
        this.$data.NotificationForm[name] = "";
      }
    },
    getNotificationFlow() {
      let apiUrl =
        "../api/PortalFlow/GetNotificationFlow?id=" + this.new_flowid;
      let that = this;
      rt
        .get(apiUrl)
        .then(res => {
          that.Flow = {id:res.Value,name:res.Text};
          that.NotificationForm.Flow=that.Flow.id;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    addNotification() {
      if (this.NotificationForm.Id == "") {
        let apiUrl = "../api/PortalFlow/CreateNotification";
        let that = this;
        rt
          .post(apiUrl, this.NotificationForm)
          .then(res => {
            that.NotificationForm.Id = res;
            rt.showSuccessToast("创建成功");
            that.$emit("a");
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      } else {
        let apiUrl = "../api/PortalFlow/SaveNotification";
        let that = this;
        rt
          .post(apiUrl, this.NotificationForm)
          .then(res => {
            rt.showSuccessToast(res);
            that.$emit("a");
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
    },
    cancelAdd() {
      this.formDialog = false;
    },
    
  }
};
</script>

