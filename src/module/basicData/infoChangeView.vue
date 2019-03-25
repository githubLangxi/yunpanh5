<template>
  <div>
    <!--头部操作按钮-->
    <rt-header title="工程师重要信息变更">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button type="save"  @click="onSave('editForm',0)" :disabled="saveCollBack" v-show="editForm.new_approvalstatus==1||editForm.new_approvalstatus==4"/>
        <rt-button type="save" text="保存并关闭"  @click="onSave('editForm',1)" :disabled="saveCollBack" v-show="editForm.new_approvalstatus==1||editForm.new_approvalstatus==4"/>
        <rt-button type="submit" @click="submit" v-show="editForm.new_approvalstatus==1||editForm.new_approvalstatus==4"/>
        <rt-button type="revert" @click="recall" v-show="editForm.new_approvalstatus==2"/>
        <el-dropdown trigger="click" @command="handleCommand" v-show="editForm.new_approvalstatus!=1||editForm.new_approvalstatus==4">
          <span class="el-dropdown-link">
            <rt-button type="more" />
          </span>
          <el-dropdown-menu class="rt-toolbar__dropdown" slot="dropdown">
            <el-dropdown-item command="flowlist">审批记录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </rt-toolbar>
    </rt-header>

    <rt-content>
        <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left" >
            <rt-section title="基本信息">
                <el-row :gutter="50">
                    <el-col :span="8">
                        <el-form-item label="所属服务商">
                            <el-input v-model="editForm.new_station_idName" :disabled="true" icon="search"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="工程师">
                             <el-input v-model="editForm.new_worker_idName" readonly @keyup.enter.native="quickChooseWorker" :disabled="disabledform" icon="search" :on-icon-click="workerLookup"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="审核状态">
                             <rt-picklist v-model="editForm.new_approvalstatus" entity="new_srv_worker_changeapply" attribute="new_approvalstatus" :disabled="true"></rt-picklist>
                        </el-form-item>
                    </el-col>
                </el-row>
            </rt-section>
            <rt-section title="变更信息">
                <el-row :gutter="50">
                    <el-col :span="8">
                        <el-form-item label="原身份证">
                            <el-input v-model="editForm.new_idnumber_old" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="新身份证">
                            <el-input v-model="editForm.new_idnumber_new" :disabled="disabledform"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                     <el-col :span="24">
                        <el-form-item label="变更原因">
                            <el-input type="textarea" v-model="editForm.new_reason" :disabled="disabledform"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </rt-section>
        </el-form>
    </rt-content>

      <WorkderDialog ref="workderDialog" @lookupSelect="selectWorker" @lookupSelectClear="clear"></WorkderDialog>

    <!--签核提交-->
    <el-dialog title="签核流程" class="rt-portal-flowSubmitDialog" :visible.sync="flowDialogVisible">
      <RTFlowSubmit entityname='new_srv_worker_changeapply' :id='changeapplyid' v-if="flowDialogVisible" @closesubmit='submitCallback()'></RTFlowSubmit>
    </el-dialog>

    <!--签核列表-->
    <el-dialog title="审批进度" class="rt-portal-flowListDialog" :visible.sync="flowListDialogVisible">
      <RTFlowApprovalList entityname='new_srv_worker_changeapply' :id='changeapplyid' v-if="flowListDialogVisible"></RTFlowApprovalList>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import RTFlowSubmit from '@/components/flow/flowSubmit'
import RTFlowApprovalList from '@/components/flow/flowApprovallist'
import WorkderDialog from "../dialog/workerDialog";

export default {
  data(){
      return{
        saveCollBack: false,//保存回调禁用
        changeapplyid:'',       //主档ID
        workerid:'',              //服务人员ID
        disabledform:false,       //设置表单可用控件
        flowDialogVisible: false,//签核提交是否可见
        flowListDialogVisible:false,//审批记录是否可见
        editForm:{
          new_station_idName:'',      //服务商名称
          new_station_id:'',          //服务商ID
          new_worker_idName:'',       //工程师名称
          new_worker_id:'',           //工程师ID
          new_approvalstatus:'',      //审核状态
          new_idnumber_old:'',       //原身份证
          new_idnumber_new:'',        //新身份证
          new_reason:''               //变更原因
        }
      };
  },
   components: { 
    RTFlowSubmit, 
    RTFlowApprovalList,
    WorkderDialog
    },
    created: function() {
    if (this.$route.params.id) {
      this.changeapplyid = this.$route.params.id
    }
  },
   mounted: function() {
    if(this.changeapplyid=='')
    {
      this.getStationInfo();       //获取服务站信息
    }
    else
    {
      this.loadData();            //初始化数据
    }
  },
   methods: {
    quickChooseWorker: function() {
      this.$refs.workderDialog.show();
    },
    //显示服务人员Dialog
    workerLookup: function() {
      if(this.disabledform)
      {
        return;
      }
      this.$refs.workderDialog.show();
    },
    selectWorker:function(id,name,phone){
      if(this.editForm.new_worker_id==id&&this.editForm.new_worker_idName==name)
      {
        return;
      }
      else
      {
        this.editForm.new_worker_id=id;
        this.editForm.new_worker_idName=name;
        this.getWorkerInfo(id);
      }
    },
    clear:function(){
      this.editForm.new_worker_id='';
      this.editForm.new_worker_idName='';
    },
    //数据加载
    loadData: function() {
      var self = this
      rt.get('../api/SrvWorker/GetChangeApplyById/'+self.changeapplyid)
        .then(res=>{
          self.editForm=res;
         
          //设置页面控件
         if (res.new_approvalstatus == 1 || res.new_approvalstatus == 4) {
            self.disabledform = false;
          } else {
            self.disabledform = true;
          }
        });
    },
    //获取审批列表
    flowlist() {
       this.flowListDialogVisible = true;
    },
     //获取服务站信息
    getStationInfo:function(){
         var self=this; 
         rt.get('../api/NewSrvStation/GetBasicStation')
        .then(res=>{
          self.editForm.new_station_idName=res.new_name;                //申请单位名称 
          self.editForm.new_station_id=res.new_srv_stationid;         //申请单位id

          self.editForm.new_approvalstatus=1;
        });
    },
    //获取服务人员身份证信息
    getWorkerInfo:function(id){
          var self=this; 
          rt.get('../api/SrvWorker/GetWorkerInfo/'+id)
          .then(res=>{
            self.editForm.new_idnumber_old=res.idnumber;
          });
    },
    //签核提交
    submitCallback() {
      this.flowDialogVisible = false;
      this.loadData();
    },
    handleCommand(cmd) {
       switch (cmd) {
        case 'flowlist':
          this.flowlist();
          break
      }
    },
     //保存方法
    onSave: function(formName,type) {
          var self = this
          var params = {
                new_station_id:self.editForm.new_station_id,
                new_worker_id:self.editForm.new_worker_id,
                new_idnumber_old:self.editForm.new_idnumber_old,
                new_idnumber_new:self.editForm.new_idnumber_new,
                new_reason:self.editForm.new_reason
          }
         
           /*创建*/
          if (self.changeapplyid === '') {
              self.saveCollBack=true;
                    rt.post('../api/SrvWorker/CreateChangeApply', params).then(function(res) {
              self.$message({
                message: '保存成功',
                type: 'success'
              })
              self.saveCollBack = false
              self.changeapplyid=res;
              if(type==0)
              {
                  self.$router.replace({ name: "infochange", params: { id: self.changeapplyid } })
              }
              else
              {
                  self.$router.push({ name: "infochangelist" })
              }
            })
              .catch((error) => {
                self.saveCollBack = false
                rt.showErrorToast(error)
              })
          }
          else
          {
            /*更新*/
            params.id = self.changeapplyid
            rt.post('../api/SrvWorker/UpdateChangeApply', params).then(function(res) {
                          self.$message({
                            message: '保存成功',
                            type: 'success'
                          })
                          if(type==0)
                          {
                              self.$router.replace({ name: "infochange", params: { id: self.changeapplyid } })
                          }
                          else
                          {
                              self.$router.push({ name: "infochangelist" })
                          }
                        })
                          .catch((error) => {
                            rt.showErrorToast(error)
              })
          }
    },
    //提交
    submit() {
       if (this.changeapplyid != '') {
        this.flowDialogVisible = true
      }
    },
    //撤回
    recall() {
        var entityname = 'new_srv_worker_changeapply'
        var entityid = this.changeapplyid;
        let that = this
        rt.revoke(entityname, entityid)
        .then(function() {
          that.loadData();
        })
        .catch(function(error) {
          rt.showErrorToast(error)
        })
    },
    //返回按钮之前提示保存申请单数据
    beforeGoBack: function() {
      if (rt.isNullOrWhiteSpace(this.changeapplyid)) {
        this.$confirm('变更信息尚未保存，是否确定退出', '提示', {
          confirmButtonText: '确定',
          confirmButtonClass: 'ConfirmButtonClass',
          cancelButtonText: '取消',
          cancelButtonClass: 'CancelButtonClass',
          type: 'warning'
        }).then(() => {
          this.$router.push({ name: "infochangelist" })
        }).catch(() => {
        })
      }
      else {
        this.$router.push({ name: "infochangelist" })
      }
    }

   }
}

</script>
<style type="text/css" scoped>

</style>