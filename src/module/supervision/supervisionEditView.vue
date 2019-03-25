<template>
  <div>
    <!--头部操作按钮-->
    <rt-header title="监理单">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button text="接单"  @click="accept" v-show="editForm.new_supervisionstage==9" />
        <rt-button text="拒绝"  @click="refuse" v-show="editForm.new_supervisionstage==9" />
        <rt-button type="save"  @click="onSave('editForm',0)" :disabled="saveCollBack" />
        <rt-button type="save" text="保存并关闭"  @click="onSave('editForm',1)" :disabled="saveCollBack"/>
      </rt-toolbar>
    </rt-header>

    <!--主档数据编辑Form-->
    <rt-content>
      <rt-nav slot="side" ref="_rt_nav">
        <rt-nav-item href="#area1">基本信息</rt-nav-item>
        <rt-nav-item href="#area2">技术风评结果</rt-nav-item>
        <rt-nav-item href="#area3">工程监理风评问题汇总</rt-nav-item>
        <rt-nav-item href="#area4">派工信息</rt-nav-item>
        <rt-nav-item href="#area5">网点反馈信息</rt-nav-item>
        <rt-nav-item href="#area6">监理过程记录</rt-nav-item>
        <rt-nav-item href="#area7">电话记录</rt-nav-item>
        <rt-nav-item href="#area8">出差记录</rt-nav-item>
        <rt-nav-item href="#area9">监理评分</rt-nav-item>
      </rt-nav>

      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="120px" label-position="left" >
        <rt-section id="area1" title="基本信息">
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="监理单号">
                <el-input v-model="editForm.new_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目编号">
                <el-input v-model="editForm.new_number" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目名称">
                  <el-input v-model="editForm.new_projectname" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目主要机型">
                  <rt-picklist v-model="editForm.new_supervisionmodels" entity="new_srv_supervision" attribute="new_supervisionmodels" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="省份" prop="editForm.new_province_idName">
                <el-input v-model="editForm.new_province_idName" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="城市" prop="editForm.new_city_idName">
                <el-input v-model="editForm.new_city_idName" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区县" prop="editForm.new_county_idName">
                <el-input v-model="editForm.new_county_idName" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="街道" prop="editForm.new_town_idName">
                <el-input v-model="editForm.new_town_idName" :disabled="true"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label="项目地址">
                  <el-input v-model="editForm.new_address" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="营销中心名称">
                  <el-input v-model="editForm.new_saledepartment" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务员">
                  <el-input v-model="editForm.new_sales" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="技术审核金额">
                  <el-input v-model="editForm.new_aprovedamount" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="成交日期">
                  <el-input v-model="editForm.new_recorddate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否跨区">
                  <el-checkbox class="expense-checkbox" v-model="editForm.new_isdiffarea" disabled></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预计提货日期">
                  <el-input v-model="editForm.new_forecastsenddate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="监理阶段">
                  <rt-picklist v-model="editForm.new_supervisionstage" entity="new_srv_supervision" attribute="new_supervisionstage" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="接收时间">
                  <el-input v-model="editForm.new_receivingtime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="审图完成时间">
                  <el-input v-model="editForm.new_planapprovaltime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开工检查完成时间">
                  <el-input v-model="editForm.new_startcheckingtime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="过程检查完成时间">
                  <el-input v-model="editForm.new_processinspectiontime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="评分提交时间">
                  <el-input v-model="editForm.new_scoretime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目类型">
                <rt-picklist v-model="editForm.new_projecttype" entity="new_srv_supervision" attribute="new_projecttype" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="集采来源项目">
                  <el-input v-model="editForm.new_projectfrom" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="建筑类型">
                  <el-input v-model="editForm.new_buildingtype" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="建筑面积">
                  <el-input v-model="editForm.new_builtarea" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="经销商编码">
                  <el-input v-model="editForm.new_accountcode" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="经销商名称">
                  <el-input v-model="editForm.new_accountname" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="经销商联系人">
                  <el-input v-model="editForm.new_accountcontact" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="经销商联系人电话">
                  <el-input v-model="editForm.new_accountphone" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row> 
          <delivery-dialog ref="deliveryDialog" :supervisionid="id" :visible="!disabledform" v-if="id != ''"></delivery-dialog>   
        </rt-section>
        <rt-section id="area2" title="技术风评结果">
          <el-row :gutter="50">
            <el-col :span="6">
                <el-form-item label="评估结果">
                 <rt-picklist v-model="editForm.new_approvalresult" entity="new_srv_supervision" attribute="new_approvalresult" :disabled="true"></rt-picklist>
                </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="有无设计资料">
               <el-checkbox class="expense-checkbox" v-model="editForm.new_hasdata" disabled></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="方案评估人">
                <el-input v-model="editForm.new_approvalby" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
            <el-form-item label="方案评估日期">
              <el-input v-model="editForm.new_approvaldate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
         </el-row>
         <el-row :gutter="50">
            <el-col :span="18">
             <el-form-item label="方案评估备注">
               <el-input type="textarea" v-model="editForm.new_approvalmemo" :disabled="true"></el-input>
             </el-form-item>
            </el-col>
            <el-col :span="6">
             <el-form-item label="有无技术服务函">
               <el-checkbox class="expense-checkbox" v-model="editForm.new_hasletter" disabled></el-checkbox>
             </el-form-item>
            </el-col>
          </el-row>
          <plantally-dialog ref="plantallyDialog" :supervisionid="id" :visible="!disabledform" v-if="id != ''"></plantally-dialog>
        </rt-section>
        <rt-section id="area3" title="工程监理风评问题汇总">
          <el-row :gutter="50">
            <el-col :span="6">
             <el-form-item label="是否出函（审图）">
               <el-checkbox class="expense-checkbox" v-model="editForm.new_isletterst" disabled></el-checkbox>
             </el-form-item>
            </el-col>
            <el-col :span="6">
             <el-form-item label="风评说明">
               <el-input v-model="editForm.new_rumor" :disabled="true"></el-input>
             </el-form-item>
            </el-col>
          </el-row>
          <tallyProjectDetail-dialog ref="tallyProjectDetailDialog" :supervisionid="id" type="1" :visible="!disabledform" v-if="id != ''"></tallyProjectDetail-dialog>  
        </rt-section>
        <rt-section id="area4" title="派工信息">
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="监理负责人">
                  <el-input v-model="editForm.new_systemuseridName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="机器类别">
                  <rt-picklist v-model="editForm.new_systemtype" entity="new_srv_supervision" attribute="new_systemtype" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="安装单位名称">
                  <el-input v-model="editForm.new_installcompany" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="安装联系人名称">
                  <el-input v-model="editForm.new_installcontact" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="安装联系人电话">
                  <el-input v-model="editForm.new_installphone" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否第一次安装">
               <el-checkbox class="expense-checkbox" v-model="editForm.new_isfirstinstall" disabled></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预计到货时间">
                  <el-input v-model="editForm.new_arrivedate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预计开工检查时间">
                  <el-input v-model="editForm.new_startcheckdate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="监理优先级">
                  <rt-picklist v-model="editForm.new_prioritylevel" entity="new_srv_supervision" attribute="new_prioritylevel" :disabled="true"></rt-picklist>                  
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="安装进度">
                  <rt-picklist v-model="editForm.new_installstage" entity="new_srv_supervision" attribute="new_installstage" :disabled="true"></rt-picklist>                  
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否第三方监理">
                  <el-checkbox class="expense-checkbox" v-model="editForm.new_isthirdparty" disabled></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="第三方监理">
                <el-input v-model="editForm.new_supervisionstation_idName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="跳过开工检查">
                  <el-checkbox class="expense-checkbox" v-model="editForm.new_isfirstinstall" disabled></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="派单时间">
                  <el-input v-model="editForm.new_dispatchtime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="派工备注">
                  <el-input type="textarea" v-model="editForm.new_dispatchmemo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="是否过货">
                  <rt-picklist v-model="editForm.new_isaftergoods" entity="new_srv_supervision" attribute="new_isaftergoods" :disabled="true"></rt-picklist>                  
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
        <rt-section id="area5" title="网点反馈信息">
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="接收/拒绝">
                  <rt-picklist v-model="editForm.new_receiverefused" entity="new_srv_supervision" attribute="new_receiverefused" :disabled="true"></rt-picklist>                  
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="接收/拒绝时间">
                <el-input v-model="editForm.new_receiverefusedtime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="监理工程师">
                 <el-input v-model="editForm.new_worker_idName" readonly @keyup.enter.native="quickChooseWorker" :disabled="editForm.new_supervisionstage!=3 && editForm.new_supervisionstage!=10" icon="search" :on-icon-click="workerLookup"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工程师联系电话">
                <el-input v-model="editForm.new_workerphone" :disabled="editForm.new_supervisionstage!=3 && editForm.new_supervisionstage!=10"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
        <rt-section id="area6" title="监理过程记录">
          <el-row :gutter="50">
            <el-col>
              <el-form-item label="开工检查情况说明">
                  <el-input type="textarea" v-model="editForm.new_startcheckingmemo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col>
              <el-form-item label="过程检查情况说明">
                  <el-input type="textarea" v-model="editForm.new_processinspectionmemo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <tallyProjectDetail-dialog ref="tallyProjectDetailDialog" :supervisionid="id" type="2" :visible="!disabledform" v-if="id != ''"></tallyProjectDetail-dialog>  
          <tallyProjectDetail-dialog ref="tallyProjectDetailDialog" :supervisionid="id" type="3" :visible="!disabledform" v-if="id != ''"></tallyProjectDetail-dialog>  
        </rt-section>
        <phoneCallDialog id="area7" ref="phoneCallDialog" :supervisionid="id" :visible="!disabledform" v-if="id != ''"></phoneCallDialog>
        <outsideLineDialog id="area8" ref="outsideLineDialog" :supervisionid="id" :visible="!disabledform" v-if="id != ''"></outsideLineDialog>
        <rt-section id="area9" title="监理评分">
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="总计得分（百分制）">
                  <el-input v-model="editForm.new_totalscore" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col>
              <el-form-item label="备注">
                  <el-input type="textarea" v-model="editForm.new_memo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <supervisionScoreDialog ref="supervisionScoreDialog" :supervisionid="id" :visible="!disabledform" v-if="id != ''"></supervisionScoreDialog>          
        </rt-section>
      </el-form>
    </rt-content>

    <!--Lookup组件-->
    <WorkerDialog ref="workerDialog"   @lookupSelect="selectWorker" @lookupSelectClear="clearWorker"></WorkerDialog>
  </div>
</template>

<script type="text/javascript">
import deliveryDialog from "./deliveryDialog";
import plantallyDialog from "./plantallyDialog";
import phoneCallDialog from "./phoneCallDialog";
import WorkerDialog from "../dialog/workerDialog";
import outsideLineDialog from "./outsideLineDialog";
import supervisionScoreDialog from "./supervisionScoreDialog";
import tallyProjectDetailDialog from "./tallyProjectDetailDialog";

export default {
  data() {
    return {
      id: "", //监理单id
      saveCollBack: false, //保存回调禁用
      workorderShow: true, //单据是否显示
      disabledform: false, //设置表单可用控件
      /****************/
      //主档数据编辑项数据
      /****************/
      flowDialogVisible: false, //签核提交是否可见
      flowListDialogVisible: false, //审批记录是否可见
      /*表单数据*/
      editForm: {
        new_supervisionmodels: ""
      },
      rules: {}
    };
  },
  created: function() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
    }
  },
  components: {
    WorkerDialog,
    deliveryDialog,
    plantallyDialog,
    phoneCallDialog,
    outsideLineDialog,
    supervisionScoreDialog,
    tallyProjectDetailDialog
  },
  mounted: function() {
    this.initData(); //初始化数据
  },
  computed: {},

  watch: {},
  methods: {
    /*****************/
    /**初始化编辑页面**/
    /*****************/
    //初始化数据
    initData: function() {
      this.loadData();
      //this.editForm.new_supervisionmodels=4;
    },
    //数据加载
    loadData: function() {
      try {
        var self = this;
        rt
          .get("../api/Supervision/GetSupervisionById?id=" + self.id)
          .then(res => {
            self.editForm = res;
            if (self.editForm.new_worker_id === null) {
              self.editForm.new_worker_id = { id: "", name: "" };
            }
          });
      } catch (e) {
        alert(e.message);
      }
      //加载主档数据
    },
    /*****************/
    /***主档数据操作***/
    /*****************/
    //保存方法
    onSave: function(formName, type) {
      var self = this;
      var qualityFeedback = self.editForm;
      var params = {
        new_worker_id: self.editForm.new_worker_id,
        new_workerphone: self.editForm.new_workerphone
      };
      /*更新*/
      params.Id = self.id;
      rt
        .post("../api/Supervision/UpdateSupervision", params)
        .then(function(res) {
          self.$message({
            message: "保存成功",
            type: "success"
          });
          self.saveCollBack = true;
          self.initData();
          if (type == 0) {
            self.$router.replace({
              name: "supervisionEdit",
              params: { id: self.id }
            });
          } else {
            self.$router.push({ name: "supervisionList" });
          }
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    //返回按钮之前提示保存申请单数据
    beforeGoBack: function() {
      this.$router.push({ name: "supervisionList" });
    },
    //接收按钮
    accept: function() {
      var self = this;
      var params = {
        new_receiverefused: 2,
        new_supervisionstage: 10,
        new_receiverefusedtime: new Date()
      };
      if (this.editForm.new_isfirstinstall) params.new_supervisionstage = 3; //跳过开工检查
      params.Id = self.id;
      rt
        .post("../api/Supervision/UpdateSupervision", params)
        .then(function(res) {
          rt.showSuccessToast("接收成功!");
          self.initData();
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    //拒绝按钮
    refuse: function() {
      var self = this;
      rt
        .get("../api/Supervision/RefuseWorkorder?id=" + self.id)
        .then(function(res) {
          rt.showSuccessToast("拒接成功!");
          self.$router.push({ name: "supervisionList" });
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    quickChooseWorker: function() {
      this.$refs.workerDialog.show(this.editForm.new_worker_id);
    },
    workerLookup: function() {
      if (
        this.editForm.new_supervisionstage != 3 &&
        this.editForm.new_supervisionstage != 10
      ) {
        return;
      }
      this.$refs.workerDialog.show(this.editForm.new_worker_id);
    },
    selectWorker: function(id, name) {
      if (
        this.editForm.new_worker_id.id == id &&
        this.editForm.new_worker_id.name == name
      ) {
        return;
      }
      this.editForm.new_worker_id.id = id;
      this.editForm.new_worker_id.name = name;
      this.editForm.new_worker_idName = name;
      rt.get("../api/Supervision/GetWorkerPhone?id=" + id).then(res => {
        this.editForm.new_workerphone = res;
      });
    },
    clearWorker: function() {
      this.editForm.new_worker_id.id = "";
      this.editForm.new_worker_id.name = "";
      this.editForm.new_worker_idName = "";
      this.editForm.new_workerphone = "";
    }
  }
};
</script>

<style type="text/css" scoped>
</style>
