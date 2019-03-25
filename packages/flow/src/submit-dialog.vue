<template>
  <el-dialog size="auto" title="流程提交" :close-on-click-modal="false" :before-close="handleClose" :visible.sync="dialogVisible">
    <div class="rt-flowsubmit-dialog">
      <h2>选择签核流程
        <span>(下拉框中可能存在多个可选项目,请注意选择合适的流程)</span>
      </h2>
      <br />
      <div>
        <el-select v-model="selectedFlowId">
          <el-option v-for="flow in flowList" v-bind:value="flow.FlowId" :key="flow.FlowId" :label="flow.FlowName">
          </el-option>
        </el-select>
      </div>
      <br />
      <br />
      <div>
        <h2>选择签核用户
          <span>(下拉框中可能存在多个可选人员,请注意选择合适的下一级呈递人)</span>
        </h2>

        <div v-for="step in stepList" :key="step.StepName">
          <br />
          <h3>{{ step.StepName }}</h3>
          <br />
          <el-select v-model="step.ApproveUserId">
            <el-option v-for="user in step.UserList" v-bind:value="user.UserId" :key="user.UserId" :label="user.UserName">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="submitFlow" type="primary" :loading="isSubmiting">提交</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>


<script>
export default {
  name: 'RtFlowSubmitDialog',
  data() {
    return {
      isSubmiting: false,
      dialogVisible: false,
      selectedFlowId: '',
      flowList: [],
      selectedUserId: [],
      stepList: [],
    }
  },
  props: {
    entityName: {
      type: String,
      require: true
    },
    entityId: {
      type: String,
      require: true
    },
    onSuccess: {
      type: Function
    }
  },
  mounted: function() {

  },
  watch: {
    selectedFlowId: function(val) {
      if (rt.isNullOrWhiteSpace(val)) {
        this.stepList = [];
        return;
      }

      rt.get("../api/CrmFlow/GetFlowStep?flowid=" + val + "&entityname=" + this.entityName + "&entityid=" + this.entityId)
        .then((res) => {
          for (var i in res) {
            if (res[i].UserList.length > 0) {
              res[i].ApproveUserId = res[i].UserList[0].UserId;
            }
          }
          this.stepList = res;
        }).catch((error) => {
          rt.showErrorToast(error);
        });
    }

  },

  methods: {
    getFlowList() {
      rt.get("../api/CrmFlow/GetFlowList?entityName=" + this.entityName)
        .then((res) => {
          if (res.length > 0) {
            this.flowList = res;
            this.selectedFlowId = res[0].FlowId;
          }
        })
        .catch((error) => {
          rt.showErrorToast(error);
        });


    },
    submitFlow() {
      var approveList = [];
      this.stepList.map((step) => {
        approveList.push({
          StepId: step.StepId,
          ApproveUserId: step.ApproveUserId
        });
      });

      var data = {
        EntityId: this.entityId,
        EntityTypeName: this.entityName,
        FlowId: this.selectedFlowId,
        ApproveList: approveList
      }

      this.isSubmiting = true;
      rt.post("../api/CrmFlow/submit", data)
        .then((res) => {
          rt.showSuccessToast(res);

          if (this.onSuccess) {
            this.onSuccess();
          }

          this.closeDialog();
        })
        .catch((error) => {
          rt.showErrorToast(error);
        })
        .finally(() => {
          this.isSubmiting = false;
        });
    },
    handleClose() {
      this.closeDialog();
    },
    closeDialog() {
      this.dialogVisible = false;

      this.flowList = [];
      this.selectedFlowId = '';

    },
    show() {
      this.dialogVisible = true;

      this.getFlowList();
    }
  }

}
</script>

<style>
.rt-flowsubmit-dialog {
  min-height: 400px;
}

.rt-flowsubmit-dialog .el-select {
  width: 100%;
}

.rt-flowsubmit-dialog h2>span {
  font-size: 12px;
}
</style>
