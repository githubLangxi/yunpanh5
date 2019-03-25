<template>
    <div class="reassignDialog">
        <el-dialog :title="$t('BUTTON_ASSIGN')" :visible.sync="dialogFormVisible" :before-close="beforeClose" size="large">
            <el-form ref="queryForm" :model="queryForm" class="detail-form" label-position="left" label-width="85px">
                <el-row :gutter="40">
                    <el-col :span="8">
                        <el-form-item :label="$t('new_srv_worker')" prop="new_name">
                            <el-input v-model="queryForm.new_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="$t('new_srv_worker.new_job')" prop="new_job">
                            <rt-picklist v-model="queryForm.new_job" entity="new_srv_worker" attribute="new_job"></rt-picklist>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="$t('new_srv_worker.new_skill')" prop="new_skill">
                            <el-input v-model="queryForm.new_skill"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="8">
                        <el-form-item :label="$t('ServiceAmountLess')" prop="limitCount">
                            <el-input v-model="queryForm.limitCount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40" type="flex">
                    <el-col v-bind:span="24" style="float:right;text-align:right;">
                        <el-button @click="handleReset" plain >{{this.$t('BUTTON_RESET')}}</el-button>
                        <el-button type="primary" @click="search">{{this.$t('BUTTON_SEARCH')}}</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="tableData" v-loading="loading" ref="singleTable" height="300" stripe highlight-current-row @current-change="selectRowChange" @row-dblclick="onSave">
                <!-- <el-table-column type="selection" :reserve-selection="true" width="55">
                </el-table-column> -->
                <el-table-column prop="new_name" :label="$t('new_srv_worker')">
                </el-table-column>
                <el-table-column prop="new_phone" :label="$t('new_srv_worker.new_phone')">
                </el-table-column>
                <el-table-column prop="ordercount" :label="$t('TheCurrentAmount')">
                </el-table-column>
                <el-table-column prop="new_skill" :label="$t('new_srv_worker.new_skill')">
                </el-table-column>
                <el-table-column prop="new_job" :label="$t('new_srv_worker.new_job')">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSave" :disabled="submitDisabled"   class="rt-query__reset">{{this.$t('BUTTON_DETERMINE')}}</el-button>
                <el-button @click="beforeClose">{{this.$t('BUTTON_CANCEL')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "reassignDialog",
  data: function() {
    return {
      loading: false,
      dialogFormVisible: false,
      tableData: [], //服务人员数据
      workerId: "", //服务人员数据
      workerPhone: "", //服务人员电话
      submitDisabled: false,
      queryForm: {
        new_name: "", //服务人员
        new_job: "", //人员岗位
        new_skill: "", //人员技能
        limitCount: "" //服务量
      }
    };
  },
  props: {
    workOrderId: String
  },
  methods: {
    show: function() {
      this.dialogFormVisible = true;
      this._fetchRecords();
    },
    _fetchRecords: function() {
      var params = {
        name: this.queryForm.new_name,
        skill: this.queryForm.new_skill
      };
      if (this.queryForm.new_job != "") {
        params.job = this.queryForm.new_job;
      }
      if (!rt.isNullOrWhiteSpace(this.queryForm.limitCount)) {
        params.limitCount = this.queryForm.limitCount;
      }
      if (this.workOrderId) {
        var requestStr = "../api/WorkOrder/GetWorkerData";
        this.loading = true;
        rt
          .get(requestStr, params)
          .then(res => {
            this.tableData = res;
            this.loading = false;
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.loading = false;
          });
      }
    },
    //查询按钮
    search: function() {
      this._fetchRecords();
    },
    beforeClose: function() {
      this.dialogFormVisible = false;
      this.$refs["queryForm"].resetFields();
    },
    //选中行
    selectRowChange: function(val) {
      this.currentRow = val;
      this.workerId = this.currentRow.id;
      this.workerPhone = this.currentRow.new_phone;
    },
    onSave: function() {
      var that = this;
      that.submitDisabled = true;
      var params = {
        id: that.workOrderId,
        workerId: that.workerId,
        workerPhone: that.workerPhone
      };
      if (rt.isNullOrWhiteSpace(params.workerId)) {
        that.submitDisabled = false;
        that.$message({
          message: "请先选择服务人员",
          type: "warning"
        });
        return;
      }
      rt
        .post("../api/WorkOrder/ChangeWorker", params)
        .then(function(res) {
          rt.showSuccessToast(res);
          that.dialogFormVisible = false;
          that.$emit("selected");
          that.$refs["queryForm"].resetFields();
          that.workerId = "";
          that.workerPhone = "";
          that.submitDisabled = false;
        })
        .catch(error => {
          that.submitDisabled = false;
          rt.showErrorToast(error);
        });
    },
    //重置查询条件
    handleReset: function() {
      this.$refs["queryForm"].resetFields();
      this._fetchRecords();
    }
  }
};
</script>
