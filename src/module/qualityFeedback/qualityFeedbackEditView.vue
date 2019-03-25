<template>
  <div>
    <!--头部操作按钮-->
    <rt-header title="质量反馈单">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button type="save"  @click="onSave('editForm',0)" :disabled="saveCollBack" v-show="editForm.new_approvalstatus==1||editForm.new_approvalstatus==4"/>
        <rt-button type="save" text="保存并关闭"  @click="onSave('editForm',1)" :disabled="saveCollBack" v-show="editForm.new_approvalstatus==1||editForm.new_approvalstatus==4"/>
        <rt-button type="submit" @click="submit" v-show="editForm.new_approvalstatus==1||editForm.new_approvalstatus==4"/>
        <!-- <rt-button type="revert" @click="recall" v-show="editForm.new_approvalstatus==2"/> -->
        <!-- <rt-button type="approve-progress" @click="flowlist" v-show="editForm.new_approvalstatus!=1"></rt-button> -->
      </rt-toolbar>
    </rt-header>

    <!--主档数据编辑Form-->
    <rt-content>
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="120px" label-position="left" >
        <rt-section title="基本信息">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="反馈单号">
                <el-input v-model="editForm.new_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务单号">
                    <rt-lookup v-model="editForm.new_srv_workorder_id" entity="new_srv_workorder" idField="new_srv_workorderid" nameField="new_name" dialog-filter-fields="new_name" :disabled="disabledform"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="反馈时间">
              <el-date-picker class="rt-portal-item-date" v-model="editForm.new_feedbacktime" type="date" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="服务商" prop="new_srv_station_idName">
                <el-input v-model="editForm.new_srv_station_idName" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核状态">
                <el-input v-model="editForm.new_approvalstatusText" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="整机/配件">
                <rt-picklist v-model="editForm.new_type" entity="new_qualityfeedback" attribute="new_type" :disabled="disabledform"></rt-picklist>
              </el-form-item>
              </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="审核时间">
              <el-date-picker class="rt-portal-item-date" v-model="editForm.new_approved_time" type="date"  :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提交时间">
              <el-date-picker class="rt-portal-item-date" v-model="editForm.new_submit_time" type="date" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="优先级">
                <rt-picklist v-model="editForm.new_priority" entity="new_qualityfeedback" attribute="new_priority" :disabled="disabledform"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="产品线" >
              <rt-lookup v-model="editForm.new_productgroup_id" entity="new_productgroup" idField="new_productgroupid" nameField="new_name" dialog-filter-fields="new_name" :disabled="disabledform||disablegroup"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品类型" v-show="!ishidemodel">
              <rt-lookup v-model="editForm.new_productmodel_id" entity="new_productmodel" idField="new_productmodelid" nameField="new_name" dialog-filter-fields="new_name" :disabled="disabledform||disablemodel"/>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
        <rt-section title="反馈故障">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="故障小类">
                  <!-- <rt-lookup v-model="editForm.new_errormodule_id" entity="new_errormodule" idField="new_errormoduleid" nameField="new_name" dialog-filter-fields="new_name" :disabled="disabledform"/> -->
              <el-input v-model="editForm.new_errormodule_id.name" readonly @keyup.enter.native="quickChooseModule" :disabled="disabledform||disablemodule" icon="search" :on-icon-click="moduleLookup"></el-input>
              </el-form-item>
            </el-col>
               <el-col :span="8">
              <el-form-item label="故障现象">
                 <!-- <rt-lookup v-model="editForm.new_srv_error_id" entity="new_srv_error" idField="new_srv_errorid" nameField="new_name" dialog-filter-fields="new_name" :disabled="disabledform"/> -->
                 <el-input v-model="editForm.new_srv_error_id.name" readonly @keyup.enter.native="quickChooseError" :disabled="disabledform" icon="search" :on-icon-click="errorLookup"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="故障原因">
                   <el-input v-model="editForm.new_srv_errorgroup_id.name" readonly @keyup.enter.native="quickChooseGroup" :disabled="disabledform" icon="search" :on-icon-click="groupLookup"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="故障台数">
                <el-input v-model="editForm.new_number" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="故障率">
                 <el-input v-model="editForm.new_rate" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="200">
            <el-col :span="24">
              <el-form-item label="质量信息描述">
                   <el-input type="textarea" v-model="editForm.new_memo" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="提醒">
                <el-input v-model="editForm.new_remind" :disabled="true" placeholder="多联机效果差类需提供鉴定数据"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
        <feedbackModelDialog ref="feedbackModel" :qualityfeedbackid="this.qualityfeedbackid" :qualityfeedbackname="this.qualityfeedbackname" :visible="!disabledform" v-if="qualityfeedbackid != ''"></feedbackModelDialog>
        <feedbackAccessoriesDialog ref="feedbackAccessories" :qualityfeedbackid="this.qualityfeedbackid" :qualityfeedbackname="this.qualityfeedbackname" :visible="!disabledform" v-if="qualityfeedbackid != ''"></feedbackAccessoriesDialog>
         <attachment ref="attachment" :qualityfeedbackid="this.qualityfeedbackid" :showDetail="true" :visible="!disabledform" v-if="qualityfeedbackid != ''" ></attachment>
      </el-form>
    </rt-content>

    <!--Lookup组件-->
    <ErrorDialog ref="errorDialog" :errorgroupid='editForm.new_srv_errorgroup_id.id' :productgroupid='editForm.new_productgroup_id.id' :productmodelid='editForm.new_productmodel_id.id' @lookupSelect="selectError" @lookupSelectClear="clearError"></ErrorDialog>
    <ErrorGroupDialog ref="errorGroupDialog" :errorid='editForm.new_srv_error_id.id' :errormoduleid='editForm.new_errormodule_id.id' :productmodelid='editForm.new_productmodel_id.id' @lookupSelect="selectGroup" @lookupSelectClear="clearGroup"></ErrorGroupDialog>
    <ErrorModuleDialog ref="errorModuleDialog" :productgroupid='editForm.new_productgroup_id.id'  @lookupSelect="select" @lookupSelectClear="clear"></ErrorModuleDialog>
 
  </div>
</template>

<script type="text/javascript">
import attachment from "./attachment";
import feedbackAccessoriesDialog from "./feedbackAccessoriesDialog";
import feedbackModelDialog from "./feedbackModelDialog";

import ErrorDialog from "../dialog/qfErrorDialog";
import ErrorGroupDialog from "../dialog/qfErrorGroupDialog";
import ErrorModuleDialog from "../dialog/qfErrorModuleDialog";

export default {
  data() {
    return {
      saveCollBack: false, //保存回调禁用
      qualityfeedbackid: "", //主档ID
      qualityfeedbackname: "",
      workorderShow: true, //单据是否显示
      disabledform: false, //设置表单可用控件
      ishidemodel: false, //是否隐藏产品类别
      disablemodel: true, //是否禁用产品类别
      disablegroup: true, //是否禁用产品线
      disablemodule: true, //是否禁用故障小类
      /****************/
      //主档数据编辑项数据
      /****************/
      flowDialogVisible: false, //签核提交是否可见
      flowListDialogVisible: false, //审批记录是否可见
      /*表单数据*/
      editForm: {
        new_name: "", //申请单号
        new_srv_workorder_id: {}, //服务商编码
        new_feedbacktime: "", //总金额
        new_exchange: 0, //流转状态
        new_srv_station_id: "",
        new_srv_station_idName: "", //服务商
        new_type: "", //整机/配件
        new_approvalstatus: "", //发货类型

        new_submit_time: "", //提交时间
        new_approved_time: "", //审核时间
        new_priority: "", //审核状态
        new_productgroup_id: {
          id: "",
          name: ""
        }, //产品线
        new_productgroup_idName: "", //产品线
        new_productmodel_id: {
          id: "",
          name: ""
        }, //产品类别
        new_productmodel_idName: "",
        new_errormodule_id: {
          id: "",
          name: ""
        }, //服务单号
        new_srv_error_id: {
          id: "",
          name: ""
        }, //申请说明
        new_srv_errorgroup_id: {
          id: "",
          name: ""
        }, //申请归属

        new_isclose: false, //是否关闭
        new_iscloseName: "" //是否关闭
      },
      rules: {}
    };
  },
  components: {
    attachment,
    feedbackAccessoriesDialog,
    feedbackModelDialog,
    ErrorDialog,
    ErrorGroupDialog,
    ErrorModuleDialog
  },
  created: function() {
    if (this.$route.params.id) {
      this.qualityfeedbackid = this.$route.params.id;
    }
  },
  mounted: function() {
    this.initData(); //初始化数据
  },
  computed: {},

  watch: {
    "editForm.new_productgroup_id.name": {
      handler(newVal, oldVal) {
        if (newVal == "厨电") this.ishidemodel = false;
        else {
          this.ishidemodel = true;
          this.editForm.new_productmodel_id = {};
          this.editForm.new_productmodel_idName = null;
        }
      }
    },
    "editForm.new_srv_error_id.id": {
      handler(newVal, oldVal) {
        this.disablemodel = true; //是否禁用产品类别
        this.disablegroup = true; //是否禁用产品线
        if (
          rt.isNullOrWhiteSpace(newVal) &&
          (this.editForm.new_errormodule_id === null ||
            rt.isNullOrWhiteSpace(this.editForm.new_errormodule_id.id)) &&
          (this.editForm.new_srv_errorgroup_id === null ||
            rt.isNullOrWhiteSpace(this.editForm.new_srv_errorgroup_id.id))
        ) {
          this.disablegroup = false;
          this.disablemodel = false;
        }
      }
    },
    "editForm.new_errormodule_id.id": {
      handler(newVal, oldVal) {
        this.disablemodel = true; //是否禁用产品类别
        this.disablegroup = true; //是否禁用产品线
        if (
          rt.isNullOrWhiteSpace(newVal) &&
          (this.editForm.new_srv_error_id === null ||
            rt.isNullOrWhiteSpace(this.editForm.new_srv_error_id.id)) &&
          (this.editForm.new_srv_errorgroup_id === null ||
            rt.isNullOrWhiteSpace(this.editForm.new_srv_errorgroup_id.id))
        ) {
          this.disablegroup = false;
          this.disablemodel = false;
        }
      }
    },
    "editForm.new_srv_errorgroup_id.id": {
      handler(newVal, oldVal) {
        this.disablemodel = true; //是否禁用产品类别
        this.disablegroup = true; //是否禁用产品线
        this.disablemodule = true;
        if (
          rt.isNullOrWhiteSpace(newVal) &&
          (this.editForm.new_errormodule_id === null ||
            rt.isNullOrWhiteSpace(this.editForm.new_errormodule_id.id)) &&
          (this.editForm.new_srv_error_id === null ||
            rt.isNullOrWhiteSpace(this.editForm.new_srv_error_id.id))
        ) {
          this.disablegroup = false;
          this.disablemodel = false;
        }
        if (rt.isNullOrWhiteSpace(newVal)) this.disablemodule = false;
      }
    },
    immediate: true
  },
  methods: {
    /*****************/
    /**初始化编辑页面**/
    /*****************/
    //初始化数据
    initData: function() {
      this.getStationInfo(); //获取服务站信息
      if (
        this.editForm.new_approvalstatusText == "审核中" &&
        this.editForm.new_approvalstatusText != "已审核"
      ) {
        this.disabledform = true;
      }
      
    },
    //数据加载
    loadData: function() {
      var self = this;
      rt
        .get(
          "../api/QualityFeedback/GetQualityFeedbackById?id=" +
            self.qualityfeedbackid
        )
        .then(res => {
          self.editForm = res;
          this.qualityfeedbackname = res.new_name;
          //设置页面控件
          if (res.new_approvalstatus == 1 || res.new_approvalstatus == 4) {
            self.disabledform = false;
          } else {
            self.disabledform = true;
          }
        });
      //加载主档数据
    },
    /*****************/
    /***主档数据操作***/
    /*****************/
    //保存方法
    onSave: function(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this;
          var qualityFeedback = self.editForm;
          var params = {
            new_srv_station_id: qualityFeedback.new_srv_station_id, //服务商id
            // new_approved_time: rt.formatDateTime(
            //   qualityFeedback.new_approved_time,
            //   "yyyy-mm-dd"
            // ), //审核时间
            //new_approvalstatus: qualityFeedback.new_approvalstatus, //审核状态
            new_productgroup_id: qualityFeedback.new_productgroup_id,
            new_productmodel_id: qualityFeedback.new_productmodel_id,
            new_srv_workorder_id: qualityFeedback.new_srv_workorder_id, //服务单号
            new_errormodule_id: qualityFeedback.new_errormodule_id,
            new_srv_error_id: qualityFeedback.new_srv_error_id,

            new_srv_errorgroup_id: qualityFeedback.new_srv_errorgroup_id,
            new_number: qualityFeedback.new_number,
            new_rate: qualityFeedback.new_rate,
            new_memo: qualityFeedback.new_memo,
            new_srv_station_idName: qualityFeedback.new_srv_station_idName,
            new_srv_station_id: qualityFeedback.new_srv_station_id,
            new_priority: qualityFeedback.new_priority,
            new_type: qualityFeedback.new_type,
            new_exchange: qualityFeedback.new_exchange,
            new_approvalstatus: qualityFeedback.new_approvalstatus
          };
          /*创建*/
          if (self.qualityfeedbackid === "") {
            self.saveCollBack = true;
            rt
              .post("../api/QualityFeedback/CreateQualityFeedback", params)
              .then(function(res) {
                self.$message({
                  message: "保存成功",
                  type: "success"
                });
                self.saveCollBack = false;
                self.qualityfeedbackid = res;
                //self.initData();
                if (type == 0) {
                  self.$router.replace({
                    name: "qualityFeedbackEdit",
                    params: { id: self.qualityfeedbackid }
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
            /*更新*/
            params.Id = self.qualityfeedbackid;
            rt
              .post("../api/QualityFeedback/UpdateQualityFeedback", params)
              .then(function(res) {
                self.$message({
                  message: "保存成功",
                  type: "success"
                });
                // self.initData();
                if (type == 0) {
                  self.$router.replace({
                    name: "qualityFeedbackEdit",
                    params: { id: self.qualityfeedbackid }
                  });
                } else {
                  self.$router.push({ name: "qualityFeedbackList" });
                }
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          }
        } else {
          rt.showErrorToast("请输入必填项！");
        }
      });
    },
    //提交
    submit() {
      if (this.qualityfeedbackid != "") {
        if (
          (this.$refs.feedbackAccessories.tableData === null ||
            this.$refs.feedbackAccessories.tableData.length < 1) &&
          this.editForm.new_type == 2
        ) {
          rt.showErrorToast("必须包含一条配件明细");
          return;
        }
        this.editForm.new_approvalstatus = 2;
        this.editForm.new_exchange = 4;
        this.onSave('editForm',0);
        window.location.reload();
      } else {
        rt.showErrorToast("请先保存质量反馈单");
      }
    },
    //撤回
    recall() {
      var entityname = "new_qualityfeedback";
      var entityid = this.qualityfeedbackid;
      let that = this;
      rt
        .revoke(entityname, entityid)
        .then(function() {
          that.initData();
        })
        .catch(function(error) {
          rt.showErrorToast(error);
        });
    },
    
    handleCommand(cmd) {
      switch (cmd) {
        case "flowlist":
          this.flowlist();
          break;
      }
    },
    //返回按钮之前提示保存申请单数据
    beforeGoBack: function() {
      if (rt.isNullOrWhiteSpace(this.qualityfeedbackid)) {
        this.$confirm("新增单据尚未保存，是否确定退出", "提示", {
          confirmButtonText: "确定",
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: "取消",
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            this.$router.push({ name: "qualityFeedbackList" });
          })
          .catch(() => {});
      } else {
        this.$router.push({ name: "qualityFeedbackList" });
      }
    },
    //获取服务站信息
    getStationInfo: function() {
      //新建
      if (this.qualityfeedbackid === "") {
        var self = this;
        rt.get("../api/NewSrvStation/GetBasicStation").then(res => {
          self.editForm.new_srv_station_idName = res.new_name; //申请单位名称
          self.editForm.new_srv_station_id = res.new_srv_stationid; //申请单位id

          //var date = new Date();
          //this.editForm.new_submit_time = new Date();
          this.editForm.new_approvalstatus = 1; //审核状态默认制单
          this.editForm.new_exchange = 1;
          this.new_approvalstatusText = "制单";
        });
      } else {
        //编辑
        this.loadData();
      }
    },

    //故障原因Dialog
    quickChooseGroup: function() {
      this.$refs.errorGroupDialog.show(this.editForm.new_srv_errorgroup_id);
    },
    groupLookup: function() {
      if (this.disabledform) {
        return;
      }
      this.$refs.errorGroupDialog.show(this.editForm.new_srv_errorgroup_id);
    },
    selectGroup: function(id, name) {
      debugger;
      this.editForm.new_srv_errorgroup_id.id = id;
      this.editForm.new_srv_errorgroup_id.name = name;
    },
    clearGroup: function() {
      this.editForm.new_srv_errorgroup_id.id = "";
      this.editForm.new_srv_errorgroup_id.name = "";
    },

    //故障现象Dialog
    quickChooseError: function() {
      this.$refs.errorDialog.show(this.editForm.new_srv_error_id);
    },
    errorLookup: function() {
      if (this.disabledform) {
        return;
      }
      this.$refs.errorDialog.show(this.editForm.new_srv_error_id);
    },
    selectError: function(id, name) {
      if (
        this.editForm.new_srv_error_id.id == id &&
        this.editForm.new_srv_error_id.name == name
      ) {
        return;
      }
      this.editForm.new_srv_error_id.id = id;
      this.editForm.new_srv_error_id.name = name;
      this.editForm.new_srv_errorgroup_id.id = "";
      this.editForm.new_srv_errorgroup_id.name = "";
    },
    clearError: function() {
      this.editForm.new_srv_error_id.id = "";
      this.editForm.new_srv_error_id.name = "";
      this.editForm.new_srv_errorgroup_id.id = "";
      this.editForm.new_srv_errorgroup_id.name = "";
    },

    //故障小类Dialog
    quickChooseModule: function() {
      this.$refs.errorModuleDialog.show(this.editForm.new_errormodule_id);
    },
    moduleLookup: function() {
      if (this.disabledform) {
        return;
      }
      this.$refs.errorModuleDialog.show(this.editForm.new_errormodule_id);
    },
    select: function(id, name) {
      this.editForm.new_errormodule_id.id = id;
      this.editForm.new_errormodule_id.name = name;
    },
    clear: function() {
      this.editForm.new_errormodule_id.id = "";
      this.editForm.new_errormodule_id.name = "";
    }
  }
};
</script>

<style type="text/css" scoped>
</style>
