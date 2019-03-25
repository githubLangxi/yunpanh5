<template>
  <div class="rt-portal-Dialog">
    <div class="rt-portal-DialogContent">
      <div class="rt-portal-FlowSubmit">
        <h3>选择签核流程
          <span>(下拉框中可能存在多个可选项目,请注意选择合适的流程)</span>
        </h3>
        <br />
        <div>
          <el-select v-model="selectedFlowId">
            <el-option v-for="flow in flowList" v-bind:value="flow.FlowId" :key="flow.FlowId" :label="flow.FlowName">
            </el-option>
          </el-select>
        </div>
        <br />
        <br />
        <div class="rt-portal-FlowSteps">
          <h3>选择签核用户
            <span>(下拉框中可能存在多个可选人员,请注意选择合适的下一级呈递人)</span>
          </h3>
  
          <div class="rt-portal-FlowStep" v-for="step in stepList" :key="step.StepName">
            <br />
            <h4>{{ step.StepName }}</h4>
            <br />
            <el-select v-model="step.ApproveUserId">
              <el-option v-for="user in step.UserList" v-bind:value="user.UserId" :key="user.UserId" :label="user.UserName">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="rt-portal-DialogFooter">
      <div class="rt-portal-DialogButtons">
        <el-button @click="submitFlow">提交</el-button>
        <el-button @click="closeDialog">关闭</el-button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name:'RTFlowSubmit',
  data() {
    return {
      selectedFlowId: '',
      flowList: [],
      selectedUserId: [],
      stepList: [],
    }
  },
  props: ['entityname', 'id'],
  mounted: function () {
    this.getFlowList();
  },
  watch: {
    selectedFlowId: function (val) {
      if (val) {
        let that = this;
        rt.get("../api/CrmFlow/GetFlowStep/" + val + "/" + this.entityname + "/" + this.id)
          .then(function (res) {
          for (var r in res) {
            res[r].ApproveUserId = res[r].UserList[0].UserId;
          }
            that.stepList = res;
          }).catch((error) => {
            rt.showErrorToast(error);
          });
      }
      else {
        this.stepList = [];
      }
    }

  },

  methods: {
    getFlowList() {
      let that = this;
      rt.get("../api/CrmFlow/GetFlowList/" + this.entityname)
        .then(function (res) {
          that.flowList = res;
          that.selectedFlowId = res[0].FlowId;
        }).catch((error) => {
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
        EntityId: this.id,
        EntityTypeName: this.entityname,
        FlowId: this.selectedFlowId,
        ApproveList: approveList
      }

      let that = this;
      rt.post("../api/CrmFlow/submit", data)
        .then(function (res) {
          rt.showSuccessToast(res);
          that.flowList = [];
          that.selectedFlowId = '';
          that.$emit('closesubmit');
        }
        ).catch((error) => {
          rt.showErrorToast(error);
        });
    },
    closeDialog() {
      this.flowList = [];
      this.selectedFlowId = '';
      this.$emit('closesubmit');
    }
  }

}
</script>

