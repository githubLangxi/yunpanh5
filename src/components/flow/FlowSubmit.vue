<template>
  <div class="rt-portal-Dialog">
    <div class="rt-portal-DialogContent">
      <div class="rt-portal-FlowSubmit">
        <h3>{{$t('ChooseSignFlow')}}
        </h3>
        <br />
        <div>
          <el-select :disabled="isDisabled" v-model="selectednew_flowid">
            <el-option v-for="flow in flowList" v-bind:value="flow.new_flowid" :key="flow.new_flowid" :label="flow.new_name">
            </el-option>
          </el-select>
        </div>
        <br />
        <br />
        <div class="rt-portal-FlowSteps">
          <h3>{{$t('ChooseSignUser')}}
          </h3>

          <div class="rt-portal-FlowStep" v-for="step in stepList" :key="step.new_name">
            <br />
            <h4>{{ step.new_name }}</h4>
            <br />
            <el-select v-model="step.ApproveUserId">
              <el-option v-for="user in step.new_stepusers" v-bind:value="user.systemuserid" :key="user.systemuserid" :label="user.fullname">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="rt-portal-DialogFooter">
      <div class="rt-portal-DialogButtons">
        <el-button @click="submitFlow" :loading="isSubmiting">{{$t('BUTTON_SUBMIT')}}</el-button>
        <el-button @click="closeDialog">{{$t('BUTTON_CLOSE')}}</el-button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "RTFlowSubmit",
  data() {
    return {
      isSubmiting: false,
      selectednew_flowid: "",
      flowList: [],
      selectedUserId: [],
      stepList: []
    };
  },
  props: ["entityname", "id", "new_name"],
  mounted: function() {
    this.getFlowList();
  },
  computed: {
    isDisabled() {
      return !rt.isNullOrWhiteSpace(this.new_name);
    }
  },
  watch: {
    selectednew_flowid: function(val) {
      if (val) {
        let that = this;

        rt
          .get(
            "../api/CrmFlow/GetFlowStepList?flowId=" +
              val +
              "&entityName=" +
              this.entityname +
              "&entityId=" +
              this.id
          )
          .then(function(res) {
            for (var r in res) {
              res[r].ApproveUserId = res[r].new_stepusers[0].systemuserid;
            }
            that.stepList = res;
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      } else {
        this.stepList = [];
      }
    }
  },

  methods: {
    getFlowList() {
      let that = this;
      rt
        .get(
          "../api/CrmFlow/GetFlowList?entityName=" +
            this.entityname +
            "&entityid=" +
            this.id
        )
        .then(function(res) {
          that.flowList = res;
          if (res == null || res.length <= 0) {
            return;
          }
          if (rt.isNullOrWhiteSpace(that.new_name)) {
            that.selectednew_flowid = res[0].new_flowid;
          } else {
            for (var i = 0; i < res.length; i++) {
              if (res[i].new_name == that.new_name) {
                that.selectednew_flowid = res[i].new_flowid;
                break;
              }
            }
          }
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    submitFlow() {
      if (this.isSubmiting) {
        return;
      }

      var approveList = [];
      this.stepList.map(step => {
        approveList.push({
          StepId: step.new_flowstepsid,
          ApproveUserId: step.ApproveUserId
        });
      });

      var data = {
        EntityId: this.id,
        EntityTypeName: this.entityname,
        FlowId: this.selectednew_flowid,
        ApproveList: approveList
      };

      this.isSubmiting = true;

      let that = this;

      rt
        .post("../api/CrmFlow/submit", data)
        .then(function(res) {
          rt.showSuccessToast(res);
          that.flowList = [];
          that.selectednew_flowid = "";
          that.$emit("closesubmit");

          that.isSubmiting = false;
        })
        .catch(errorMessage => {
          var exceptionIndex = errorMessage.indexOf(
            "System.Activities.InvalidWorkflowException:"
          );
          if (exceptionIndex > 0) {
            errorMessage = errorMessage.substring(exceptionIndex + 43);
          }

          rt.showErrorToast(errorMessage);
          that.isSubmiting = false;
        });
    },
    closeDialog() {
      this.flowList = [];
      this.selectednew_flowid = "";
      this.$emit("closesubmit");
    }
  }
};
</script>

