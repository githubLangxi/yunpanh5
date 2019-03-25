<template>
  <div v-if="formDialog" class="createStep">
      <el-dialog title="添加签核步骤" :visible.sync="formDialog" :show-close="true" :close-on-press-escape="false" :close-on-click-modal="false" width="580px" >

              <el-form :model="StepForm" :rules="rules" ref="StepForm" :label-position="labelPosition" label-width="100px" class="rt-portal-form">
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="12">
                      <el-form-item label="步骤顺序" prop="Seq">
                          <el-input v-model="StepForm.Seq" clearable></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="步骤名称" prop="Name">
                          <el-input v-model="StepForm.Name" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="24">
                      <el-form-item label="描述" prop="Desc">
                          <el-input v-model="StepForm.Desc" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="24">
                      <el-form-item label="是否会签">
                        <el-checkbox v-model="StepForm.IsTogether"></el-checkbox>   </el-form-item>
                  </el-col>
                 
                </el-row>
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="12">
                      <el-form-item label="用户类型" prop="RoleType">
                          <el-select v-model="StepForm.RoleType" placeholder="----请选择----" >
                            <el-option v-for="item in RoleType" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                <div v-if="StepForm.RoleType==2">
                    <el-col :span="12">
                      <el-form-item label="签核角色" prop="Role">
                           <rt-lookup v-model="Role" entity="new_flowrole" :dialog-display-fields="[{name:'new_name',label:'名称',width:150},{name:'createdon',label:'创建时间'}]" />
                     </el-form-item>
                    </el-col>
                  </div>
                  <div v-if="StepForm.RoleType==9">
                    <el-col :span="12">
                      <el-form-item label="自定义用户" prop="ApproveUser">
                          <rt-lookup v-model="ApproveUser" entity="workflow" idField="workflowid" nameField="name"  :dialog-display-fields="[{name:'name',label:'名称',width:150},{name:'createdon',label:'创建时间'}]" :dialog-filter-fields="name" dialog-request-url="../api/PortalFlow/GetConditionWorkFlowType"/>
                     </el-form-item>
                    </el-col>
                </div>
                </el-row>
                
                 <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="12">
                      <el-form-item label="是否禁止撤回" prop="IsForbitRecall">   
                         <el-checkbox v-model="StepForm.IsForbitRecall"></el-checkbox>   
                      </el-form-item>
                  </el-col>
                  
                  <el-col :span="12">
                      <el-form-item label="是否自动保存" prop="IsAutoSave">
                        <el-checkbox v-model="StepForm.IsAutoSave"></el-checkbox>  
                      </el-form-item>
                  </el-col>
                  
                </el-row>
              
              
              
                 <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="12">
                      <el-form-item label="条件类型" prop="ConditionType">
                          <el-select v-model="StepForm.ConditionType" placeholder="----请选择----" >
                            <el-option v-for="item in ConditionType" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                </el-row>
              
                <template  v-if="StepForm.ConditionType==2">
                    <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="24">
                      <el-form-item>提示：条件之间是并且的关系</el-form-item>
                  </el-col>
                </el-row>
                 <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="11">
                      <el-form-item label="条件字段1" prop="ConditionField1" >
                          <el-input v-model="StepForm.ConditionField1" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="6">
                      <div prop="ConditionNop1">
                          <el-select v-model="StepForm.ConditionNop1" placeholder="----请选择----" >
                            <el-option v-for="item in ConditionNop1" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </div>
                  </el-col>
                  <el-col :span="7">
                      <div prop="ConditionValue1">
                          <el-input v-model="StepForm.ConditionValue1" clearable ></el-input>
                      </div>
                  </el-col>
                </el-row>
                 <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="11">
                      <el-form-item label="条件字段2" prop="ConditionField2">
                          <el-input v-model="StepForm.ConditionField2" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="6">
                      <div  prop="ConditionNop2">
                          <el-select v-model="StepForm.ConditionNop2" placeholder="----请选择----" >
                            <el-option v-for="item in ConditionNop2" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </div>
                  </el-col>
                  <el-col :span="7">
                      <div  prop="ConditionValue2">
                          <el-input v-model="StepForm.ConditionValue2" clearable ></el-input>
                      </div>
                  </el-col>
                </el-row>
                 <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="11">
                      <el-form-item label="条件字段3" prop="ConditionField3" >
                          <el-input v-model="StepForm.ConditionField3" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="6">
                      <div  prop="MemoField3">
                          <el-select v-model="StepForm.ConditionNop3" placeholder="----请选择----" >
                            <el-option v-for="item in ConditionNop3" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </div>
                  </el-col>
                  <el-col :span="7">
                      <div  prop="ConditionValue3">
                          <el-input v-model="StepForm.ConditionValue3" clearable ></el-input>
                      </div>
                  </el-col>
                </el-row>
              
                </template>
              
               <template  v-if="StepForm.ConditionType==3">
                   <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="24">
                      <el-form-item> 提示：查询记录数=1代表可用，记录数=0代表不可用（多条记录使用top 1,当前实体ID使用$id$代替）</el-form-item>
                      
                  </el-col>
                </el-row>
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="24">
                      <el-form-item label="FetchXml" prop="ConditionFetchXml">
                          <el-input v-model="StepForm.ConditionFetchXml" type="textarea" :rows="5"></el-input>
                      </el-form-item>                      
                  </el-col>
                </el-row>
                </template> 
                
                <template v-if="StepForm.ConditionType==4"><el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="24">
                    <el-form-item >
                      提示：流程需要返回一个名称为Result的bool类型参数，true代表可用，返回false代表不可用（流程请注册到当前实体上)"
                    </el-form-item>
                      
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                      <el-form-item label="操作名称" prop="ConditionWorkFlow">
                        <div class="rt-lookup-flow">
                          <rt-lookup v-model="ConditionWorkFlow" entity="workflow" idField="workflowid" nameField="name"  :dialog-display-fields="[{name:'name',label:'名称',width:150},{name:'createdon',label:'创建时间'}]" :dialog-filter-fields="name" dialog-request-url="../api/PortalFlow/GetConditionWorkFlowType"/>
                        </div>
                      </el-form-item>
                  </el-col>
                </el-row>
                
                </template>
      
                  
                 <el-row  class="rt-portal-form-row">
                  <el-col :span="24">
                      <el-form-item label="同意动作" prop="AgreeWorkFlowId">
                           <rt-lookup v-model="AgreeWorkFlowId" entity="workflow" idField="workflowid" nameField="name"  :dialog-display-fields="[{name:'name',label:'名称',width:150},{name:'createdon',label:'创建时间'}]" :dialog-filter-fields="name" />
                     </el-form-item>
                  </el-col>
                  </el-row>
                  <div v-if="false">
                    <el-row>
                  <el-col :span="12">
                      <el-form-item label="同意动作名称" prop="AgreeAction">
                          <el-input v-model="StepForm.AgreeAction" :disabled="true" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="同意动作类型" prop="AgreeWorkFlowType">
                          <el-select v-model="StepForm.AgreeWorkFlowType" placeholder="----请选择----" :disabled="true">
                            <el-option v-for="item in AgreeWorkFlowType" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                   </el-row>
                  </div>
                <el-row  class="rt-portal-form-row">
                  <el-col :span="24">
                      <el-form-item label="驳回动作" prop="RejectWorkFlowId">
                           <rt-lookup v-model="RejectWorkFlowId" entity="workflow" idField="workflowid" nameField="name"  :dialog-display-fields="[{name:'name',label:'名称',width:150},{name:'createdon',label:'创建时间'}]" :dialog-filter-fields="name" />
                     </el-form-item>
                  </el-col>
                  </el-row>
                  <div v-if="false">
                    <el-row>
                  <el-col :span="12">
                      <el-form-item label="驳回动作名称" prop="RejectAction">
                          <el-input v-model="StepForm.RejectAction" :disabled="true" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="驳回动作类型" prop="RejectWorkFlowType">
                          <el-select v-model="StepForm.RejectWorkFlowType" placeholder="----请选择----" :disabled="true">
                            <el-option v-for="item in RejectWorkFlowType" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                   </el-row>
                  </div>
                <el-form-item >
                     <div>
                        <el-button @click="cancelAddStep">取消</el-button>
                        <el-button type="primary" @click="addStep">确认</el-button>
                     </div>
                  </el-form-item>
                </el-form>
      </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      StepForm: {
        Id: "",
        Seq: "",
        Name: "",
        Desc: "",
        IsTogether: false,
        RoleType: "",
        IsForbitRecall: false,
        IsAutoSave: false,
        ConditionType: "",
        ConditionFetchXml: "",
        ConditionField1: "",
        ConditionField2: "",
        ConditionField3: "",
        ConditionValue1: "",
        ConditionValue2: "",
        ConditionValue3: "",
        ConditionNop1: "",
        ConditionNop2: "",
        ConditionNop3: "",
        ConditionWorkFlow: "",
        AgreeWorkFlow: "",
        AgreeAction: "",
        AgreeWorkFlowType: "",
        RejectWorkFlow: "",
        RejectAction: "",
        RejectWorkFlowType: "",
        Role:""
      },
      new_flowid: "",
      labelPosition: "left",
      ConditionType: [],
      ConditionNop1: [],
      ConditionNop2: [],
      ConditionNop3: [],
      Role:null,
      ConditionWorkFlow: null,
      AgreeWorkFlowId: null,
      RejectWorkFlowId: null,
      ApproveUser: null,
      AgreeWorkFlowType: [],
      RejectWorkFlowType: [],
      RoleType: [],
      name: "name",
      rules: {
        Seq: [{ required: true, message: "请填写步骤顺序", trigger: "change" }],
        Name: [
          { required: true, message: "请填写步骤名称", trigger: "change" }
        ],
        Desc: [{ required: true, message: "请填写描述", trigger: "change" }],
        RoleType: [
          { required: true, message: "请填写用户类型", trigger: "change" }
        ]
      },
      formDialog: false
    };
  },
  watch: {
    'AgreeWorkFlowId': function(newVal) {
      this.StepForm.AgreeWorkFlow = newVal.id;
      this.setActionandType();
    },
    'RejectWorkFlowId': function(newVal) {
      this.StepForm.RejectWorkFlow = newVal.id;
      this.setActionandType();
    },
    'ConditionWorkFlow': function(newVal) {
      this.StepForm.ConditionWorkFlow = newVal.id;
    },
    'ApproveUser': function(newVal) {
      this.StepForm.ApproveUser = newVal.id;
    },
    'Role': function(newVal) {
      this.StepForm.Role = newVal.id;
    },
  },
  props: {},
  mounted: function() {
    if (this.$route.params.id) {
      this.new_flowid = this.$route.params.id;
    }
    this.getFlowStepConditionType();
    this.getFlowStepConditionNopType();
    this.getRoletype();
    this.getCategoryType();
  },
  methods: {
    show: function() {
      this.formDialog = true;
      for (var name in this.$data.StepForm) {
        this.$data.StepForm[name] = "";
      }
      this.StepForm.ConditionType = 1;
    },

    getFlowStepConditionType() {
      let apiUrl = "../api/PortalFlow/GetFlowStepConditionType";
      let that = this;
      rt
        .get(apiUrl)
        .then(res => {
          that.ConditionType = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    getFlowStepConditionNopType() {
      let apiUrl = "../api/PortalFlow/GetFlowStepConditionNopType";
      let that = this;
      rt
        .get(apiUrl)
        .then(res => {
          that.ConditionNop1 = res;
          that.ConditionNop2 = res;
          that.ConditionNop3 = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    getRoletype() {
      let apiUrl = "../api/PortalFlow/GetFlowStepRoletype";
      let that = this;
      rt
        .get(apiUrl)
        .then(res => {
          that.RoleType = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    addStep() {
      if (this.StepForm.Id == "") {
        let apiUrl = "../api/PortalFlow/CreateStep?id=" + this.new_flowid;
        let that = this;
        rt
          .post(apiUrl, this.StepForm)
          .then(res => {
            that.StepForm.Id = res;
            rt.showSuccessToast("创建成功");
            that.$emit("a");
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      } else {
        let apiUrl = "../api/PortalFlow/SaveStep?id=" + this.StepForm.Id;
        let that = this;
        rt
          .post(apiUrl, this.StepForm)
          .then(res => {
            rt.showSuccessToast(res);
            that.$emit("a");
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
    },
    cancelAddStep() {
      this.formDialog = false;
    },
    setActionandType() {
      if (this.StepForm.AgreeWorkFlow) {
        let apiUrl =
          "../api/PortalFlow/GetWorkFlowById?id=" + this.StepForm.AgreeWorkFlow;
        rt
          .get(apiUrl)
          .then(res => {
            this.StepForm.AgreeAction = res.AgreeAction;
            this.StepForm.AgreeWorkFlowType = res.AgreeWorkFlowType;
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
      if (this.StepForm.RejectWorkFlow) {
        let apiUrl =
          "../api/PortalFlow/GetWorkFlowById?id=" +
          this.StepForm.RejectWorkFlow;
        rt
          .get(apiUrl)
          .then(res => {
            this.StepForm.RejectAction = res.RejectAction;
            this.StepForm.RejectWorkFlowType = res.RejectWorkFlowType;
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
    },

    getCategoryType() {
      let apiUrl = "../api/PortalFlow/GetCategoryType";
      let that = this;
      rt
        .get(apiUrl)
        .then(res => {
          that.AgreeWorkFlowType = res;
          that.RejectWorkFlowType = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    }
  }
};
</script>
<style>
.rt-lookup-flow {
position: relative;
}
</style>

