<template>
  <div>
    <!--头部操作按钮-->
    <rt-header title="初审问题点">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button type="save"  @click="onSave('editForm',0)" :disabled="saveCollBack" v-show="editForm.new_appealstatus==1"/>
        <rt-button type="save" text="保存并关闭"  @click="onSave('editForm',1)" :disabled="saveCollBack" v-show="editForm.new_appealstatus==1"/>
        <rt-button type="submit" @click="submit" v-show="editForm.new_appealstatus==1"/>
        <rt-button type="abandon" @click="abandon" v-show="editForm.new_appealstatus==1 || editForm.new_appealstatus==2"/>
      </rt-toolbar>
    </rt-header>

    <!--主档数据编辑Form-->
    <rt-content>
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="120px" label-position="left" >
        <rt-section title="基本信息">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="问题编码">
                <el-input v-model="editForm.new_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关联结算单">
                <el-input v-model="editForm.new_expense_claim_idName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="初审规则">
                <el-input v-model="editForm.new_firstrule_idName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="预扣款金额">
                <el-input v-model="editForm.new_deductamount" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="执行状态">
                <rt-picklist v-model="editForm.new_executestatus" entity="new_srv_firstproblem" attribute="new_executestatus" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否最高标准">
                <el-checkbox class="expense-checkbox" v-model="editForm.new_ishighest" disabled></el-checkbox>
              </el-form-item>
              </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="申诉状态">
                <rt-picklist v-model="editForm.new_appealstatus" entity="new_srv_firstproblem" attribute="new_appealstatus" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="申诉理由">
                <el-input v-model="editForm.new_appeal_reason" :disabled="disabledform"></el-input>
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
      saveCollBack: false, //保存回调禁用
      fpid: "", //主档ID
      qualityfeedbackname: "",
      workorderShow: true, //单据是否显示
      disabledform: false, //设置表单可用控件
      /****************/
      //主档数据编辑项数据
      /****************/
      flowDialogVisible: false, //签核提交是否可见
      flowListDialogVisible: false, //审批记录是否可见
      /*表单数据*/
      editForm: {
        new_isclose: false, //是否关闭
        new_iscloseName: "" //是否关闭
      },
      rules: {}
    };
  },
  components: {},
  created: function() {
    if (this.$route.params.id) {
      this.fpid = this.$route.params.id;
    }
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
    },
    //数据加载
    loadData: function() {
      var self = this;
      rt
        .get("../api/FirstProblem/GetFirstProblemById?id=" + self.fpid)
        .then(res => {
          self.editForm = res;
          if (res.new_appealstatus != "1") self.disabledform = true;
        });
    },
    /*****************/
    /***主档数据操作***/
    /*****************/
    //保存方法
    onSave: function(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this;
          var params = {
            new_appeal_reason: self.editForm.new_appeal_reason
          };
          /*更新*/
          params.Id = self.fpid;
          rt
            .post("../api/FirstProblem/UpdateFirstProblem", params)
            .then(function(res) {
              self.$message({
                message: "保存成功",
                type: "success"
              });
              if (type == 0) {
                self.$router.replace({
                  name: "firstProblemEdit",
                  params: { id: self.fpid }
                });
              } else {
                self.$router.push({ name: "firstProblemList" });
              }
            })
            .catch(error => {
              rt.showErrorToast(error);
            });
        }
      });
    },
    //申诉提交
    submit() {
      var self = this;
      var params = {
        new_appealstatus: 2,
        new_appeal_reason: self.editForm.new_appeal_reason
      };
      /*更新*/
      params.Id = self.fpid;
      rt
        .post("../api/FirstProblem/UpdateFirstProblem", params)
        .then(function(res) {
          self.$message({
            message: "申诉提交成功",
            type: "success"
          });
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    //放弃申诉
    abandon() {
      var self = this;
      var params = {
        new_appealstatus: 6
      };
      /*更新*/
      params.Id = self.fpid;
      rt
        .post("../api/FirstProblem/UpdateFirstProblem", params)
        .then(function(res) {
          self.$message({
            message: "申诉提交成功",
            type: "success"
          });
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    //返回按钮之前提示保存申请单数据
    beforeGoBack: function() {
      if (rt.isNullOrWhiteSpace(this.fpid)) {
        this.$confirm("新增单据尚未保存，是否确定退出", "提示", {
          confirmButtonText: "确定",
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: "取消",
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            this.$router.push({ name: "firstProblemList" });
          })
          .catch(() => {});
      } else {
        this.$router.push({ name: "firstProblemList" });
      }
    }
  }
};
</script>

<style type="text/css" scoped>
</style>
