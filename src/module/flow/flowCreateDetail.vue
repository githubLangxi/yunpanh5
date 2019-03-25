<template>
  <div class="createData">
      <rt-header title="签核角色">
          <rt-toolbar show-autoback>
              <rt-button type="save" @click="createDetail"></rt-button>
          </rt-toolbar>
      </rt-header>

      <rt-content>
              <el-form :model="ViewForm" :rules="rules" ref="ViewForm" label-width="150px" class="rt-portal-form"  :label-position="labelPosition">
          <rt-section title="常规">
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="12">
                      <el-form-item label="流程名称" prop="Name">
                          <el-input v-model="ViewForm.Name" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="实体名称" prop="Etn" >
                          <el-input v-model="ViewForm.Etn" clearable></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="24">
                      <el-form-item label="流程描述" prop="Desc">
                          <el-input v-model="ViewForm.Desc" clearable></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="12">
                      <el-form-item label="表单明细实体" prop="FormEntityDetail">
                          <el-input v-model="ViewForm.FormEntityDetail" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="明细关联主档ID字段" prop="FormEntityDetailIdField">
                          <el-input v-model="ViewForm.FormEntityDetailIdField" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="12">
                      <el-form-item label="单号字段" prop="NameField">
                          <el-input v-model="ViewForm.NameField" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="备注字段1" prop="MemoField1">
                          <el-input v-model="ViewForm.MemoField1" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="12">
                      <el-form-item label="备注字段2" prop="MemoField2">
                          <el-input v-model="ViewForm.MemoField2" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="备注字段3" prop="MemoField3">
                          <el-input v-model="ViewForm.MemoField3" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>
          </rt-section>
      
          <rt-section title="可用性">
                 <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="12">
                      <el-form-item label="条件类型" prop="ConditionType">
                          <el-select v-model="ViewForm.ConditionType" placeholder="----请选择----" >
                            <el-option v-for="item in ConditionType" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                </el-row>
            <template v-if="ViewForm.ConditionType==2">
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="24">
                      <el-form-item>
                          提示：条件之间是并且的关系
                      </el-form-item>
                  </el-col>
                </el-row>
                 <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="9">
                      <el-form-item label="条件字段1" prop="ConditionField1"  label-width="150px">
                          <el-input v-model="ViewForm.ConditionField1" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="5">
                          <el-select v-model="ViewForm.ConditionNop1" placeholder="----请选择----" >
                            <el-option v-for="item in ConditionNop1" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>

                  </el-col>
                  <el-col :span="10">
                          <el-input v-model="ViewForm.ConditionValue1" clearable ></el-input>
                  </el-col>
                </el-row>
                 <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="9">
                      <el-form-item label="条件字段2" prop="ConditionField2"  label-width="150px">
                          <el-input v-model="ViewForm.ConditionField2" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="5">
                          <el-select v-model="ViewForm.ConditionNop2" placeholder="----请选择----" >
                            <el-option v-for="item in ConditionNop2" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                  </el-col>
                  <el-col :span="10">
                          <el-input v-model="ViewForm.ConditionValue2" clearable ></el-input>
                  </el-col>
                </el-row>
                 <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="9">
                      <el-form-item label="条件字段3" prop="ConditionField3"  label-width="150px">
                          <el-input v-model="ViewForm.ConditionField3" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="5">
                          <el-select v-model="ViewForm.ConditionNop3" placeholder="----请选择----" >
                            <el-option v-for="item in ConditionNop3" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                  </el-col>
                  <el-col :span="10">
                          <el-input v-model="ViewForm.ConditionValue3" clearable ></el-input>
                  </el-col>
                </el-row>
            </template>
            <template v-if="ViewForm.ConditionType==3">
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="24">
                      <el-form-item>
                           提示：查询记录数=1代表可用，记录数=0代表不可用（多条记录使用top 1,当前实体ID使用$id$代替）
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="24">
                      <el-form-item label="FetchXml" prop="ConditionFetchXml" label-width="150px">
                          <el-input v-model="ViewForm.ConditionFetchXml" type="textarea" :rows="10"></el-input>
                      </el-form-item>                      
                  </el-col>
                </el-row>
            </template>
            <template v-if="ViewForm.ConditionType==4">
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="24">
                      <el-form-item>
                          提示：流程需要返回一个名称为Result的bool类型参数，true代表可用，返回false代表不可用（流程请注册到当前实体上)
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                      <el-form-item label="操作名称" label-width="150px" prop="ConditionWorkFlow">
                          <rt-lookup v-model="ConditionWorkFlow" entity="workflow" idField="workflowid" nameField="name"  :dialog-display-fields="[{name:'name',label:'名称',width:150},{name:'createdon',label:'创建时间'}]" :dialog-filter-fields="name" dialog-request-url="../api/PortalFlow/GetConditionWorkFlowType"/>
                      </el-form-item>
                  </el-col>
                </el-row>
            </template>
          </rt-section>
          <rt-section title="执行动作">
                 <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="8">
                      <el-form-item label="提交前动作" prop="PreSubmitWorkFlowId">
                          <rt-lookup v-model="PreSubmitWorkFlowId" entity="workflow" idField="workflowid" nameField="name"  :dialog-display-fields="[{name:'name',label:'名称',width:150},{name:'createdon',label:'创建时间'}]" :dialog-filter-fields="name" />
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item label="提交前动作名称" prop="PreSubmitAction">
                          <el-input v-model="ViewForm.PreSubmitAction" :disabled="true" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item label="提交前动作类型" prop="PreSubmitWorkFlowType">
                          <el-select v-model="ViewForm.PreSubmitWorkFlowType" placeholder="----请选择----" :disabled="true">
                            <el-option v-for="item in PreSubmitWorkFlowType" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                </el-row>
                 <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="8">
                      <el-form-item label="提交后动作" prop="SubmitWorkFlowId">
                           <rt-lookup v-model="SubmitWorkFlowId" entity="workflow" idField="workflowid" nameField="name"  :dialog-display-fields="[{name:'name',label:'名称',width:150},{name:'createdon',label:'创建时间'}]" :dialog-filter-fields="name"/>

                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item label="提交后动作名称" prop="SubmitAction">
                          <el-input v-model="ViewForm.SubmitAction" :disabled="true" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item label="提交后动作类型" prop="SubmitWorkFlowType">
                          <el-select v-model="ViewForm.SubmitWorkFlowType" placeholder="----请选择----" :disabled="true">
                            <el-option v-for="item in SubmitWorkFlowType" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="8">
                      <el-form-item label="撤回动作" prop="RecallWorkFlowId">
                           <rt-lookup v-model="RecallWorkFlowId" entity="workflow" idField="workflowid" nameField="name"  :dialog-display-fields="[{name:'name',label:'名称',width:150},{name:'createdon',label:'创建时间'}]" :dialog-filter-fields="name" />
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item label="撤回动作名称" prop="RecallAction">
                          <el-input v-model="ViewForm.RecallAction" :disabled="true" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item label="撤回动作类型" prop="RecallWorkFlowType">
                          <el-select v-model="ViewForm.RecallWorkFlowType" placeholder="----请选择----" :disabled="true">
                            <el-option v-for="item in RecallWorkFlowType" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="8">
                      <el-form-item label="同意动作" prop="AgreeWorkFlowId" position:fixed>
                           <rt-lookup v-model="AgreeWorkFlowId" entity="workflow" idField="workflowid" nameField="name"  :dialog-display-fields="[{name:'name',label:'名称',width:150},{name:'createdon',label:'创建时间'}]" :dialog-filter-fields="name" />
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item label="同意动作名称" prop="AgreeAction">
                          <el-input v-model="ViewForm.AgreeAction" :disabled="true" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item label="同意动作类型" prop="AgreeWorkFlowType">
                          <el-select v-model="ViewForm.AgreeWorkFlowType" placeholder="----请选择----" :disabled="true">
                            <el-option v-for="item in AgreeWorkFlowType" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="8">
                      <el-form-item label="驳回动作" prop="RejectWorkFlowId">
                            <rt-lookup v-model="RejectWorkFlowId" entity="workflow" idField="workflowid" nameField="name"  :dialog-display-fields="[{name:'name',label:'名称',width:150},{name:'createdon',label:'创建时间'}]" :dialog-filter-fields="name" />
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item label="驳回动作名称" prop="RejectAction">
                          <el-input v-model="ViewForm.RejectAction" :disabled="true" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item label="驳回动作类型" prop="RejectWorkFlowType">
                          <el-select v-model="ViewForm.RejectWorkFlowType" placeholder="----请选择----" :disabled="true">
                            <el-option v-for="item in RejectWorkFlowType" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                </el-row>
              </rt-section>
          </el-form>
      </rt-content>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      ViewForm: {
        Id: "",
        Name: "",
        Etn: "",
        NameField: "",
        Desc: "",
        FormEntityDetail: "",
        FormEntityDetailIdField: "",
        MemoField1: "",
        MemoField2: "",
        MemoField3: "",
        ConditionFetchXml: "",
        ConditionField1: "",
        ConditionField2: "",
        ConditionField3: "",
        ConditionValue1: "",
        ConditionValue2: "",
        ConditionValue3: "",
        ConditionType: "",
        PreSubmitWorkFlowId: "",
        PreSubmitAction: "",
        PreSubmitWorkFlowType: "",
        SubmitWorkFlowId: "",
        SubmitAction: "",
        SubmitWorkFlowType: "",
        RecallWorkFlowId: "",
        RecallAction: "",
        RecallWorkFlowType: "",
        AgreeWorkFlowId: "",
        AgreeAction: "",
        AgreeWorkFlowType: "",
        RejectWorkFlowId: "",
        RejectAction: "",
        RejectWorkFlowType: "",
        ConditionNop1: "",
        ConditionNop2: "",
        ConditionNop3: "",
        ConditionWorkFlow: ""
      },
      labelPosition: "left",
      ConditionType: [],
      PreSubmitWorkFlowId: null,
      SubmitWorkFlowId: null,
      RecallWorkFlowId: null,
      AgreeWorkFlowId: null,
      RejectWorkFlowId: null,
      ConditionWorkFlow: null,
      PreSubmitWorkFlowType: [],
      SubmitWorkFlowType: [],
      RecallWorkFlowType: [],
      AgreeWorkFlowType: [],
      RejectWorkFlowType: [],
      ConditionNop1: [],
      ConditionNop2: [],
      ConditionNop3: [],
      name: "name",
      rules: {
        Name: [
          { required: true, message: "请填写流程名称", trigger: "change" }
        ],
        Etn: [{ required: true, message: "请填写实体名称", trigger: "change" }],
        NameField: [
          { required: true, message: "请填写单号字段", trigger: "change" }
        ],
        Desc: [{ required: true, message: "请填写流程描述", trigger: "change" }]
      }
    };
  },
  watch:{
      'PreSubmitWorkFlowId':function(newVal){
          this.ViewForm.PreSubmitWorkFlowId=newVal.id;
          this.setActionandType();
      },
      'SubmitWorkFlowId':function(newVal){
          this.ViewForm.SubmitWorkFlowId=newVal.id;
          this.setActionandType();
      },
      'RecallWorkFlowId':function(newVal){
          this.ViewForm.RecallWorkFlowId=newVal.id;
          this.setActionandType();
      },
      'AgreeWorkFlowId':function(newVal){
          this.ViewForm.AgreeWorkFlowId=newVal.id;
          this.setActionandType();
      },
      'RejectWorkFlowId':function(newVal){
          this.ViewForm.RejectWorkFlowId=newVal.id;
          this.setActionandType();
      },
      'ConditionWorkFlow':function(newVal){
          this.ViewForm.ConditionWorkFlow=newVal.id;
      },
  },

  mounted: function() {
    this.getConditionType();
    this.getConditionNopType();
    this.getCategoryType();
  },
  methods: {
    getConditionType() {
      let apiUrl = "../api/PortalFlow/GetConditionType";
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
    getCategoryType() {
      let apiUrl = "../api/PortalFlow/GetCategoryType";
      let that = this;
      rt
        .get(apiUrl)
        .then(res => {
          that.PreSubmitWorkFlowType = res;
          that.SubmitWorkFlowType = res;
          that.RecallWorkFlowType = res;
          that.AgreeWorkFlowType = res;
          that.RejectWorkFlowType = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
   

    getConditionNopType() {
      let apiUrl = "../api/PortalFlow/GetConditionNopType";
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
    setActionandType() {
      if (this.ViewForm.PreSubmitWorkFlowId) {
        let apiUrl =
          "../api/PortalFlow/GetWorkFlowById?id=" +
          this.ViewForm.PreSubmitWorkFlowId;
        rt
          .get(apiUrl)
          .then(res => {
            this.ViewForm.PreSubmitAction = res.PreSubmitAction;
            this.ViewForm.PreSubmitWorkFlowType = res.PreSubmitWorkFlowType;
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
      if (this.ViewForm.SubmitWorkFlowId) {
        let apiUrl =
          "../api/PortalFlow/GetWorkFlowById?id=" +
          this.ViewForm.SubmitWorkFlowId;
        rt
          .get(apiUrl)
          .then(res => {
            this.ViewForm.SubmitAction = res.SubmitAction;
            this.ViewForm.SubmitWorkFlowType = res.SubmitWorkFlowType;
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
      if (this.ViewForm.RecallWorkFlowId) {
        let apiUrl =
          "../api/PortalFlow/GetWorkFlowById?id=" +
          this.ViewForm.RecallWorkFlowId;
        rt
          .get(apiUrl)
          .then(res => {
            this.ViewForm.RecallAction = res.RecallAction;
            this.ViewForm.RecallWorkFlowType = res.RecallWorkFlowType;
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
      if (this.ViewForm.AgreeWorkFlowId) {
        let apiUrl =
          "../api/PortalFlow/GetWorkFlowById?id=" +
          this.ViewForm.AgreeWorkFlowId;
        rt
          .get(apiUrl)
          .then(res => {
            this.ViewForm.AgreeAction = res.AgreeAction;
            this.ViewForm.AgreeWorkFlowType = res.AgreeWorkFlowType;
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
      if (this.ViewForm.RejectWorkFlowId) {
        let apiUrl =
          "../api/PortalFlow/GetWorkFlowById?id=" +
          this.ViewForm.RejectWorkFlowId;
        rt
          .get(apiUrl)
          .then(res => {
            this.ViewForm.RejectAction = res.RejectAction;
            this.ViewForm.RejectWorkFlowType = res.RejectWorkFlowType;
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
    },
    createDetail() {
      if (this.ViewForm.Id == "") {
        let apiUrl = "../api/PortalFlow/CreateFlow";
        let that = this;
        rt
          .post(apiUrl, this.ViewForm)
          .then(res => {
            rt.showSuccessToast("创建成功!");
            that.ViewForm.Id = res;
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      } else {
        let apiUrl = "../api/PortalFlow/SaveFlow";
        rt
          .post(apiUrl, this.ViewForm)
          .then(res => {
            rt.showSuccessToast(res);
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
    }
  }
};
</script>
