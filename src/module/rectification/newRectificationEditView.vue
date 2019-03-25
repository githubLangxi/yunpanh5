<template>
  <div>
    <!--头部操作按钮-->
    <rt-header title="服务商整改单">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button type="save" @click="onSave('editForm')" v-show="canSave" />
        <rt-button type="submit" @click="submit" v-show="(editForm.new_approvalstatus==1||editForm.new_approvalstatus==4)&&canSave"/>
      </rt-toolbar>
    </rt-header>


    <!--主档数据编辑Form-->
    <rt-content>
      <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left">
        <rt-section title="发布信息">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="整改单编码">
                <el-input v-model="editForm.new_name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计划结束时间">
                <el-date-picker class="rt-portal-item-date" v-model="editForm.new_planendtime" type="date" placeholder="选择日期" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="整改单状态">
                <rt-picklist v-model="editForm.new_approvalstatus" entity="new_rectification" :disabled="true" attribute="new_approvalstatus"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="24">
              <el-form-item label="主题" >
                 <el-input type="textarea" v-model="editForm.new_theme" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="整改原因" >
                 <rt-picklist v-model="editForm.new_correctivereason" entity="new_rectification" :disabled="true" attribute="new_correctivereason"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="整改类型" >
                 <rt-picklist v-model="editForm.new_rectificationtype" entity="new_rectification" :disabled="true" attribute="new_rectificationtype"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="24">
              <el-form-item label="整改要求" >
                 <el-input type="textarea" v-model="editForm.new_requirements" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
            <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="发布人">
                   <el-input v-model="editForm.new_systemuser_idName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发布时间" >
                <el-date-picker class="rt-portal-item-date" v-model="editForm.new_begintime" type="date" placeholder="选择日期" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="发布单位" >
                 <rt-picklist v-model="editForm.new_beginunit" entity="new_rectification" :disabled="true" attribute="new_beginunit"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
             <el-col :span="8">
              <el-form-item label="服务商名称">
                   <el-input v-model="editForm.new_srv_station_idName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="中心名称" >
              <el-input v-model="editForm.new_businessunit_idName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="审核时间" >
               <el-date-picker class="rt-portal-item-date" v-model="editForm.new_approved_time" type="date" placeholder="选择日期" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
         <rt-section title="整改对象信息">
          <el-row :gutter="50">
            <el-col :span="24">
              <el-form-item label="整改结果">
                <el-input type="textarea" v-model="editForm.new_results" :disabled="!canSave"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
           <attachment ref="attachment" :rectificationid="this.new_rectificationid" :showDetail="true"></attachment>
      </el-form>
    </rt-content>

         <!--签核提交-->
    <el-dialog title="签核流程" class="rt-portal-flowSubmitDialog" :visible.sync="flowDialogVisible">
      <RTFlowSubmit entityname='new_rectification' :id='new_rectificationid' v-if="flowDialogVisible" @closesubmit='submitCallback()'></RTFlowSubmit>
    </el-dialog>

    <!--签核列表-->
    <el-dialog title="审批进度" class="rt-portal-flowListDialog" :visible.sync="flowListDialogVisible">
      <RTFlowApprovalList entityname='new_rectification' :id='new_rectificationid' v-if="flowListDialogVisible"></RTFlowApprovalList>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import attachment from "./attachment";
import RTFlowSubmit from "@/components/flow/flowSubmit";
import RTFlowApprovalList from "@/components/flow/flowApprovallist";


export default {
  data() {
    return {
      new_rectificationid: "", //整改单id
      canSave: false, //是否可以保存
      flowDialogVisible: false,//签核提交是否可见
      flowListDialogVisible: false,//审批记录是否可见

      /*表单数据*/
      editForm: {
        new_name: "", //整改单号
        new_planendtime: null, //计划结束时间
        new_approvalstatus: "", //整改单状态
        new_theme: "", //主题
        new_correctivereason: "", //整改原因
        new_rectificationtype: "", //整改类型
        new_requirements: "", //整改要求
        new_systemuser_idName: "", //发布人
        new_begintime: null, //发布时间
        new_beginunit: "", //发布单位
        new_srv_station_idName: "", //服务商名称
        new_businessunit_idName: "", //中心名称
        new_approved_time: null, //审核时间
        new_results: "" //整改结果
      }
    };
  },
  components: {
    RTFlowSubmit,
    RTFlowApprovalList,
    attachment
  },
    created: function() {
    if (this.$route.params.id) {
      this.new_rectificationid = this.$route.params.id;
    }
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    //数据加载
    loadData: function() {
      var self = this;
      rt.get(
        "../api/NewRectification/GetNewRectificationbyID/" +
          self.new_rectificationid
      )
        .then(function(res) {
          self.editForm = res;
          //整改类型：开票冻结,审核中和已审核不予保存
          if (
            res.new_rectificationtype == 3 ||
            (res.new_approvalstatus != 1 && res.new_approvalstatus != 4)
          ) {
            self.canSave = false;
          }
          else
          {
            self.canSave=true;
          }
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
     //返回按钮之前提示保存申请单数据
    beforeGoBack: function() {
      this.$router.push({ name: "rectificationlist" })
    },
    //提交
    submit() {
      this.flowDialogVisible = true;
    },
       //签核提交
    submitCallback() {
      this.flowDialogVisible = false;
      this.loadData();

    },
    //保存方法
    onSave: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this;
          var params = {
            new_rectificationid: self.new_rectificationid, //整改单id
            new_results: self.editForm.new_results //整改结果
          };
          /*创建*/
          if (self.new_rectificationid == "") {
          } else {
            /*更新*/
            rt.post("../api/NewRectification/SaveNewRectification", params)
              .then(function(res) {
                rt.showSuccessToast(res);
                self.$router.replace({
                  name: "rectificationedit",
                  params: { id: self.new_rectificationid }
                });
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
    }
  }
};
</script>