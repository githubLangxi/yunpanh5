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
          <el-button type="primary" @click="SaveNotification">确认</el-button>
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
        FlowName: "",
        ActionWorkFlow: "",
        ActionWorkFlowName: "",
        Subject: "",
        NoteText: "",
        IsDocument: "",
        FileName: ""
      },
      Flow: null,
      ActionWorkFlow: null,
      AnnotationTable: [],
      new_flowid: "",
      name:"name",
      rules: {
        Flow: [
          { required: true, message: "请填写签核流程", trigger: "change" }
        ],
        ActionWorkFlow: [
          { required: true, message: "请填写执行动作", trigger: "change" }
        ]
      },
      formDialog: false,
      Notification: ""
    };
  },
    watch:{
    'ActionWorkFlow':function(newVal){
       this.NotificationForm.ActionWorkFlow = newVal.id;
    }
  },
  mounted: function() {},
  methods: {
    show(id) {
      this.formDialog = true;
      this.Notification = id;
      this.getNotificationById();


    },
    cancelAdd() {
      this.formDialog = false;
    },
    getNotificationById() {
      let apiUrl =
        "../api/PortalFlow/GetNotificationById?id=" + this.Notification;
      let that = this;
      rt
        .get(apiUrl)
        .then(res => {
          that.NotificationForm = res;
          that.Flow = {
            id: that.NotificationForm.Flow,
            name: that.NotificationForm.FlowName
          };
          that.ActionWorkFlow = {
            id: that.NotificationForm.ActionWorkFlow,
            name: that.NotificationForm.ActionWorkFlowName
          };
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
   
    SaveNotification() {
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
  }
};
</script>

