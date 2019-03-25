<template>
  <div class="amountAdjustEdit">
    <rt-header v-bind:title="$t('new_srv_amountadjustment')">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button type="save" @click="save('queryForm')" v-show="this.new_srv_amountadjustmentid==''||queryForm.new_approvalstatus==1||queryForm.new_approvalstatus==4" />
        <!-- 保存 -->

        <rt-button type="submit" v-show="this.new_srv_amountadjustmentid!=''&&queryForm.new_approvalstatus==1||queryForm.new_approvalstatus==4" @click="submit" />
        <!-- 提交 -->

        <rt-button type="revert" v-show="this.new_srv_amountadjustmentid!=''&&queryForm.new_approvalstatus==2" @click="recall" />
        <!-- 撤回 -->

        <el-dropdown trigger="click" @command="handleCommand" v-show="this.new_srv_amountadjustmentid !=''">
          <span class="el-dropdown-link">
            <rt-button type="more" />
          </span>
          <el-dropdown-menu class="rt-toolbar__dropdown" slot="dropdown">
            <el-dropdown-item command="flowlist">{{$t('RecordOfApproval')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <rt-button type="approve-progress" v-show="this.new_srv_amountadjustmentid !=''" @command="handleCommand"/>  -->
        <!-- 审批记录 -->
      </rt-toolbar>
    </rt-header>

    <rt-content>
      <el-form ref="queryForm" :model="queryForm" :rules="rules" label-width="120px" label-position="left">
        <rt-section :title="$t('BaseInfo')">
          <el-row :gutter="50" class="rt-portal-form-row">
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_amountadjustment.new_name')">
                <el-input  v-model="queryForm.new_name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_amountadjustment.new_stationid')" prop="new_stationidname">
                <el-input v-model="queryForm.new_stationidname" icon="search" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_amountadjustment.new_stationcode')">
                <el-input v-model="queryForm.new_stationcode" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50" class="rt-portal-form-row">
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_amountadjustment.new_amounttype')" prop="new_amounttype">
                <rt-picklist entity="new_srv_amountadjustment" attribute="new_amounttype" v-model="queryForm.new_amounttype" disabled>
                </rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_amountadjustment.new_amount')" prop="new_amount">
                <el-input v-model="queryForm.new_amount" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_amountadjustment.new_adjustmenttype')">
                <rt-picklist entity="new_srv_amountadjustment" attribute="new_adjustmenttype" v-model="queryForm.new_adjustmenttype" disabled>
                </rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50" class="rt-portal-form-row">
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_amountadjustment.createdon')">
                <el-input disabled v-model="queryForm.createdon"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_amountadjustment.new_approvalstatus')" >
                <rt-picklist entity="new_srv_amountadjustment" attribute="new_approvalstatus" v-model="queryForm.new_approvalstatus" disabled>
                </rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_amountadjustment.new_submit_time')" >
                <el-input disabled v-model="queryForm.new_submit_time"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50" class="rt-portal-form-row">
            <el-col :span="24">
              <el-form-item v-bind:label="$t('new_srv_amountadjustment.new_memo')" >
                <el-input type="textarea" v-model="queryForm.new_memo" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
      </el-form>

      <!--签核提交-->
      <el-dialog :title="$t('Flow')" class="rt-portal-flowSubmitDialog" :visible.sync="flowDialogVisible">
        <RTFlowSubmit entityname='new_srv_amountadjustment' :id='new_srv_amountadjustmentid' v-if="flowDialogVisible" @closesubmit='submitCallback()'></RTFlowSubmit>
      </el-dialog>

      <el-dialog :title="$t('BUTTON_APPROVALPROGRESS')" class="rt-portal-flowListDialog" :visible.sync="flowListDialogVisible">
        <RTFlowApprovalList entityname='new_srv_amountadjustment' :id='new_srv_amountadjustmentid' v-if="flowListDialogVisible"></RTFlowApprovalList>
      </el-dialog>
    </rt-content>
  </div>
</template>
<script>
import RTFlowSubmit from "@/components/flow/flowSubmit";
import RTFlowApprovalList from "@/components/flow/flowApprovallist";
export default {
  data() {
    return {
      flowDialogVisible: false,
      flowListDialogVisible: false,
      disabledform: false,
      queryForm: {
        new_name: "", //名称
        new_stationid: "", //服务站id
        new_stationidname: "", //服务站名称
        new_stationcode: "", //服务站编码
        new_amounttype: "", //额度变更
        new_amount: "", //调整额度
        new_adjustmenttype: "", //调整类型
        createdon: "", //创建时间
        new_approvalstatus: "", //审核状态
        new_submit_time: "", //提交时间
        new_memo: "" //备注
      },
      rules: {
        new_stationidname: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        new_amount: [
          {
            pattern: /^([0-9])+(\.[0-9]+)?$/,
            required: true,
            message: "必须为数字值"
          }
        ]
      },

      new_srv_amountadjustmentid: ""
    };
  },
  components: { RTFlowSubmit, RTFlowApprovalList },

  mounted: function() {
    if (this.$route.params.id) {
      this.new_srv_amountadjustmentid = this.$route.params.id;
      this.initData();
    } else {
      this.queryForm.new_amounttype = 1;
      this.queryForm.new_adjustmenttype = 2;
      this.queryForm.new_approvalstatus = 1;
    }
    this.getStation();
  },

  methods: {
    //获取服务站信息
    getStation: function() {
      var apiUrl = "../api/NewSrvStation/GetLocalStationinfo";
      rt
        .get(apiUrl)
        .then(res => {
          console.log(res);
          this.queryForm.new_stationid = res.Id;
          this.queryForm.new_stationidname = res.Name;
          this.queryForm.new_stationcode = res.LogicalName;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },

    //初始化数据
    initData: function() {
      var apiUrl =
        "../api/SrvAmountAdjustment/GetLineSrvAmountAdjustment/" +
        this.new_srv_amountadjustmentid;
      rt
        .get(apiUrl)
        .then(res => {
          this.queryForm = res;
          if (
            this.queryForm != null &&
            this.queryForm.new_submit_time != null
          ) {
            this.queryForm.new_submit_time = rt.formatDateTime(
              this.queryForm.new_submit_time,
              "yyyy-mm-dd HH:MM:ss"
            );
          }
          if (this.queryForm != null && this.queryForm.createdon != null) {
            this.queryForm.createdon = rt.formatDateTime(
              res.createdon,
              "yyyy-mm-dd HH:MM:ss"
            );
          }
          if (
            this.queryForm.new_approvalstatus == 2 ||
            this.queryForm.new_approvalstatus == 3
          ) {
            this.disabledform = true;
          }
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },

    //保存
    save: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = this.queryForm;
          var apiUrl = "../api/SrvAmountAdjustment/SaveSrvAmountAdjustment";
          var that = this;
          if (that.new_srv_amountadjustmentid === "") {
            rt
              .post(apiUrl, params)
              .then(res => {
                that.$message({
                  message: that.$t("Successfullysaved"),
                  type: "success"
                });
                that.new_srv_amountadjustmentid = res;

                that.initData();
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          } else {
            params.new_srv_amountadjustmentid = that.new_srv_amountadjustmentid;
            rt
              .post(apiUrl, params)
              .then(res => {
                that.$message({
                  message: that.$t("Successfullysaved"),
                  type: "success"
                });
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          }
        } else {
          this.$message({
            message: that.$t('PleaseInputRequiredFields'),
            type: "warning",
            showClose: true
          });
        }
      });
    },

    //签核提交
    submit: function() {
      this.flowDialogVisible = true;
    },

    submitCallback() {
      this.flowDialogVisible = false;
      this.initData();
    },

    //撤回
    recall: function() {
      var entityname = "new_srv_amountadjustment";
      var entityid = this.new_srv_amountadjustmentid;
      let that = this;
      rt
        .revoke(entityname, entityid)
        .then(function() {
          that.initData();
          that.disabledform = false;
        })
        .catch(function(error) {
          rt.showErrorToast(error);
        });
    },

    //查看审批记录
    flowlist: function() {
      this.flowListDialogVisible = true;
    },
    handleCommand: function(cmd) {
      switch (cmd) {
        case "flowlist":
          this.flowlist();
          break;
      }
    },
    //新建未保存点击返回提示
    beforeGoBack: function() {
      if (rt.isNullOrWhiteSpace(this.new_srv_amountadjustmentid)) {
        this.$confirm(this.$t("NewOrderNotSaveSureQuit"), this.$t("Tip"), {
          confirmButtonText: this.$t("BUTTON_DETERMINE"),
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: this.$t("BUTTON_CANCEL"),
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            this.$router.push({ name: "AmountAdjustList" });
          })
          .catch(() => {});
      } else {
        this.$router.push({ name: "AmountAdjustList" });
      }
    }
  }
};
</script>
<style></style>
