<template>
  <div class="flowDetail" v-loading="loading">
      <rt-header title="签核流程">
            <rt-toolbar show-autoback>
                 <rt-button type="save" @click="saveForm()" ></rt-button>
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
                  <el-col :span="8">
                      <el-form-item label="条件字段1" prop="ConditionField1"  label-width="150px">
                          <el-input v-model="ViewForm.ConditionField1" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item prop="ConditionNop1">
                          <el-select v-model="ViewForm.ConditionNop1" placeholder="----请选择----" >
                            <el-option v-for="item in ConditionNop1" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item  prop="ConditionValue1">
                          <el-input v-model="ViewForm.ConditionValue1" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>
                 <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="8">
                      <el-form-item label="条件字段2" prop="ConditionField2"  label-width="150px">
                          <el-input v-model="ViewForm.ConditionField2" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item  prop="ConditionNop2">
                          <el-select v-model="ViewForm.ConditionNop2" placeholder="----请选择----" >
                            <el-option v-for="item in ConditionNop2" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item  prop="ConditionValue2">
                          <el-input v-model="ViewForm.ConditionValue2" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>
                 <el-row :gutter="50" class="rt-portal-form-row">
                  <el-col :span="8">
                      <el-form-item label="条件字段3" prop="ConditionField3"  label-width="150px">
                          <el-input v-model="ViewForm.ConditionField3" clearable ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item  prop="MemoField3">
                          <el-select v-model="ViewForm.ConditionNop3" placeholder="----请选择----" >
                            <el-option v-for="item in ConditionNop3" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item  prop="ConditionValue3">
                          <el-input v-model="ViewForm.ConditionValue3" clearable ></el-input>
                      </el-form-item>
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
                          <rt-lookup v-model="SubmitWorkFlowId" entity="workflow" idField="workflowid" nameField="name"  :dialog-display-fields="[{name:'name',label:'名称',width:150},{name:'createdon',label:'创建时间'}]" :dialog-filter-fields="name" />
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
                      <el-form-item label="同意动作" prop="AgreeWorkFlowId">
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
      
          <rt-section title="签核步骤">
              <template slot="toolbar">
                  <rt-button type="add" @click="addFlowStep"></rt-button>
                  <rt-button type="delete" @click="deleteFlowStep"></rt-button>
              </template>
              <el-table ref="gridStepTable" :data="StepData" stripe tooltip-effect="dark" style="width: 100%" @row-dblclick="handleStepView" :default-sort="{prop: 'Seq', order: 'ascending'}" >
           <el-table-column type="selection" width="55" ></el-table-column>
            <el-table-column sortable label="步骤顺序" prop="Seq"> </el-table-column>
            <el-table-column label="步骤名称" prop="Name">
              <template slot-scope="scope">
                        <el-button type="text" @click="handleStepView(scope.row)">{{scope.row.Name}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="描述" prop="Desc"></el-table-column>
            <el-table-column label="用户类型" prop="RoleTypeName"></el-table-column>
            <el-table-column label="签核角色" prop="Role"></el-table-column>
            <el-table-column label="是否会签" prop="IsTogetherName"></el-table-column>
            <el-table-column label="是否是知会" prop="IsNotifyName"></el-table-column>
            <el-table-column label="创建时间" prop="CreatedOn"></el-table-column>
          </el-table>
          </rt-section>

          <rt-section title="签核提醒">
              <template slot="toolbar">
                  <rt-button type="add" @click="addFlowNotification"></rt-button>
                  <rt-button type="delete" @click="deleteFlowNotification"></rt-button>
              </template>
              <el-table ref="gridNotificationTable" :data="NotificationData" stripe tooltip-effect="dark" style="width: 100%" @row-dblclick="handleNotificationView" :default-sort="{prop: 'Flow', order: 'descending'}" >
           <el-table-column type="selection" width="55" ></el-table-column>
            <el-table-column sortable label="签核流程" prop="Flow">
              <template slot-scope="scope">
                        <el-button type="text" @click="handleNotificationView(scope.row)">{{scope.row.Flow}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="执行动作" prop="ActionWorkFlow"></el-table-column>
            <el-table-column label="创建时间" prop="CreatedOn"></el-table-column>
          </el-table>
          </rt-section>
      </rt-content>

      <FlowStepCreateDialog ref="flowStepCreateDialog" @a="getStep"></FlowStepCreateDialog>
      <FlowStepDetailDialog ref="flowStepDetailDialog" @a="getStep"></FlowStepDetailDialog>
      <FlowNotificationCreateDialog ref="flowNotificationCreateDialog" @a="getNotification" ></FlowNotificationCreateDialog>
      <FlowNotificationDetailDialog ref="flowNotificationDetailDialog" @a="getNotification" ></FlowNotificationDetailDialog>
      

        
  </div>
</template>

<script type="text/javascript">
import FlowStepCreateDialog from "./flowStepCreateDialog";
import FlowStepDetailDialog from "./flowStepDetailDialog";
import FlowNotificationCreateDialog from "./flowNotificationCreateDialog";
import FlowNotificationDetailDialog from "./flowNotificationDetailDialog";
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
        PreSubmitWorkFlow: "",
        PreSubmitWorkFlowName: "",
        PreSubmitAction: "",
        PreSubmitWorkFlowType: "",
        SubmitWorkFlow: "",
        SubmitWorkFlowName: "",
        SubmitAction: "",
        SubmitWorkFlowType: "",
        RecallWorkFlow: "",
        RecallWorkFlowName: "",
        RecallAction: "",
        RecallWorkFlowType: "",
        AgreeWorkFlow: "",
        AgreeWorkFlowName: "",
        AgreeAction: "",
        AgreeWorkFlowType: "",
        RejectWorkFlow: "",
        RejectWorkFlowName: "",
        RejectAction: "",
        RejectWorkFlowType: "",
        ConditionNop1: "",
        ConditionNop2: "",
        ConditionNop3: "",
        ConditionWorkFlow: "",
        ConditionWorkFlowName: ""
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
      StepData: [],
      NotificationData: [],
      formView: 0,
      formStepView: 0,
      loading: false,
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
  components: {
    FlowStepCreateDialog,
    FlowNotificationCreateDialog,
    FlowStepDetailDialog,
    FlowNotificationDetailDialog
  },
  watch: {
    'PreSubmitWorkFlowId': function(newVal) {
      this.ViewForm.PreSubmitWorkFlow = newVal.id;
      this.setActionandType();
    },
    'SubmitWorkFlowId': function(newVal) {
      this.ViewForm.SubmitWorkFlow = newVal.id;
      this.setActionandType();
    },
    'RecallWorkFlowId': function(newVal) {
      this.ViewForm.RecallWorkFlow = newVal.id;
      this.setActionandType();
    },
    'AgreeWorkFlowId': function(newVal) {
      this.ViewForm.AgreeWorkFlow = newVal.id;
      this.setActionandType();
    },
    'RejectWorkFlowId': function(newVal) {
      this.ViewForm.RejectWorkFlow = newVal.id;
      this.setActionandType();
    },
    'ConditionWorkFlow': function(newVal) {
      this.ViewForm.ConditionWorkFlow = newVal.id;
    }
  },
  mounted: function() {
    if (this.$route.params.id) {
      this.ViewForm.Id = this.$route.params.id;
    }
    this.getFlowById();

    this.getConditionType();
    this.getConditionNopType();
    this.getCategoryType();
    this.getStep();
    this.getNotification();
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
      if (this.ViewForm.PreSubmitWorkFlow) {
        let apiUrl =
          "../api/PortalFlow/GetWorkFlowById?id=" +
          this.ViewForm.PreSubmitWorkFlow;
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
      if (this.ViewForm.SubmitWorkFlow) {
        let apiUrl =
          "../api/PortalFlow/GetWorkFlowById?id=" +
          this.ViewForm.SubmitWorkFlow;
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
      if (this.ViewForm.RecallWorkFlow) {
        let apiUrl =
          "../api/PortalFlow/GetWorkFlowById?id=" +
          this.ViewForm.RecallWorkFlow;
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
      if (this.ViewForm.AgreeWorkFlow) {
        let apiUrl =
          "../api/PortalFlow/GetWorkFlowById?id=" + this.ViewForm.AgreeWorkFlow;
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
      if (this.ViewForm.RejectWorkFlow) {
        let apiUrl =
          "../api/PortalFlow/GetWorkFlowById?id=" +
          this.ViewForm.RejectWorkFlow;
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
    getFlowById() {
      this.loading = true;
      let apiUrl = "../api/PortalFlow/GetFlowById?id=" + this.ViewForm.Id;
      let that = this;
      rt
        .get(apiUrl)
        .then(res => {
          that.ViewForm = res;
          if (that.ViewForm.ConditionNop1 == -1) {
            that.ViewForm.ConditionNop1 = "";
          }
          if (that.ViewForm.ConditionNop2 == -1) {
            that.ViewForm.ConditionNop2 = "";
          }
          if (that.ViewForm.ConditionNop3 == -1) {
            that.ViewForm.ConditionNop3 = "";
          }
          if (that.ViewForm.ConditionType == -1) {
            that.ViewForm.ConditionType = "";
          }
          if (that.ViewForm.PreSubmitWorkFlowType == -1) {
            that.ViewForm.PreSubmitWorkFlowType = "";
          }
          if (that.ViewForm.SubmitWorkFlowType == -1) {
            that.ViewForm.SubmitWorkFlowType = "";
          }
          if (that.ViewForm.RecallWorkFlowType == -1) {
            that.ViewForm.RecallWorkFlowType = "";
          }
          if (that.ViewForm.AgreeWorkFlowType == -1) {
            that.ViewForm.AgreeWorkFlowType = "";
          }
          if (that.ViewForm.RejectWorkFlowType == -1) {
            that.ViewForm.RejectWorkFlowType = "";
          }
          that.ConditionWorkFlow = {
            id: that.ViewForm.ConditionWorkFlow,
            name: that.ViewForm.ConditionWorkFlowName
          };
          that.PreSubmitWorkFlowId = {
            id: that.ViewForm.PreSubmitWorkFlow,
            name: that.ViewForm.PreSubmitWorkFlowName
          };
          that.SubmitWorkFlowId = {
            id: that.ViewForm.SubmitWorkFlow,
            name: that.ViewForm.SubmitWorkFlowName
          };
          that.RecallWorkFlowId = {
            id: that.ViewForm.RecallWorkFlow,
            name: that.ViewForm.RecallWorkFlowName
          };
          that.AgreeWorkFlowId = {
            id: that.ViewForm.AgreeWorkFlow,
            name: that.ViewForm.AgreeWorkFlowName
          };
          that.RejectWorkFlowId = {
            id: that.ViewForm.RejectWorkFlow,
            name: that.ViewForm.RejectWorkFlowName
          };
          that.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    getStep() {
      this.loading = true;
      let that = this;
      let apiUrl = "../api/PortalFlow/GetStep?id=" + this.ViewForm.Id;

      rt
        .get(apiUrl)
        .then(res => {
          that.StepData = res;
          that.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    getNotification() {
      this.loading = true;
      let apiUrl = "../api/PortalFlow/GetNotification?id=" + this.ViewForm.Id;
      let that = this;
      rt
        .get(apiUrl)
        .then(res => {
          that.NotificationData = res;
          that.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    saveForm() {

      let apiUrl = "../api/PortalFlow/SaveFlow";
      rt
        .post(apiUrl, this.ViewForm)
        .then(res => {
          rt.showSuccessToast(res);
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    deleteFlowStep() {
      var selection = this.$refs.gridStepTable.store.states.selection;
      if (selection == null || selection.length == 0) {
        rt.showErrorToast("请至少选择一个");
        return;
      } else {
        var deleteList = [];
        for (var i in selection) {
          deleteList.push(selection[i].Id);
        }
      }
      this.$confirm("是否要删除", "警告", {
        confirmButtonText: "确认",
        confirmButtonClass: "ConfirmButtonClass",
        cancelButtonText: "取消",
        cancelButtonClass: "CancelButtonClass",
        type: "warning"
      })
        .then(() => {
          let that = this;
          rt
            .post("../api/PortalFlow/DeleteFlowStep", deleteList)
            .then(res => {
              rt.showSuccessToast(res);
              that.getStep();
            })
            .catch(error => {
              rt.showErrorToast(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    deleteFlowNotification() {
      var selection = this.$refs.gridNotificationTable.store.states.selection;
      if (selection == null || selection.length == 0) {
        rt.showErrorToast("请至少选择一个");
        return;
      } else {
        var deleteList = [];
        for (var i in selection) {
          deleteList.push(selection[i].Id);
        }
      }
      this.$confirm("是否要删除", "警告", {
        confirmButtonText: "确认",
        confirmButtonClass: "ConfirmButtonClass",
        cancelButtonText: "取消",
        cancelButtonClass: "CancelButtonClass",
        type: "warning"
      })
        .then(() => {
          let that = this;
          rt
            .post("../api/PortalFlow/DeleteFlowNotification", deleteList)
            .then(res => {
              rt.showSuccessToast(res);
              that.getNotification();
            })
            .catch(error => {
              rt.showErrorToast(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    addFlowStep() {
      this.$refs.flowStepCreateDialog.show();
    },
    addFlowNotification() {
      this.$refs.flowNotificationCreateDialog.show();
    },
    handleStepView(row) {
      this.$refs.flowStepDetailDialog.show(row.Id);
    },
    handleNotificationView(row) {
      this.$refs.flowNotificationDetailDialog.show(row.Id);
    }
  }
};
</script>
