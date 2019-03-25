<template>
  <!-- 配件申请明细页面 弹出框 -->
  <div v-if="formDialog">
    <el-dialog :title="$t('BUTTON_RESETPASS')" :visible.sync="formDialog" :show-close="true" size="tiny" :before-close="beforeClose" :close-on-press-escape="false" :close-on-click-modal="false">
      <el-form v-loading="formLoading" :model="editForm" :rules="rules" label-position="left" label-width="100px">
        <el-row :gutter="20" class="rt-portal-form-row">
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="20">
            <el-form-item :label="$t('NewPSW')" prop="reset_password">
              <el-input type="password" v-model="editForm.reset_password" @change="pwdChange"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="rt-portal-form-row">
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="20">
            <el-form-item :label="$t('ConfirmPSW')" prop="confirm_password" >
              <el-input type="password" v-model="editForm.confirm_password" @change="pwdChange"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="rt-portal-form-row">
          <el-col :span="14">
            &nbsp;
          </el-col>
          <el-col :span="8">
            <div class="user-detail-buttons">
              <el-button class="Cancel-Footer" type="primary" @click="btnResetPWD">{{$t('BUTTON_RESETPASS')}}</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      //数据加载
      loading: false,
      //rowid: '',
      //编辑dialog
      formDialog: false,
      editForm: {
        reset_password: "", //重置密码
        confirm_password: "" //确认密码
      },
      //dialog加载
      formLoading: false,
      rules: {
        reset_password: [
          {
            type: "string",
            required: true,
            message: "请输入密码",
            trigger: "change"
          }
        ],
        confirm_password: [
          { required: true, message: "请输入确认密码", trigger: "change" }
        ]
      }
    };
  },
  props: {
    rowid: ""
  },
  watch: {
    formDialog: function(val) {
      if (!this.formDialog) {
        this.$emit("reloadEdit");
      }
    }
  },
  mounted() {},
  methods: {
    //保存按钮
    saveDataClick(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {});
    },
    //取消按钮
    beforeClose() {
      this.formDialog = false;
      this.resetPassword();
    },
    btnResetPWD: function() {
      var self = this;
      if (
        rt.isNullOrWhiteSpace(self.editForm.reset_password) &&
        rt.isNullOrWhiteSpace(self.editForm.confirm_password)
      ) {
        rt.showErrorToast(self.$t("ResetPassAndDeterminPass"));
        return;
      } else if (
        rt.isNullOrWhiteSpace(self.editForm.reset_password) &&
        !rt.isNullOrWhiteSpace(self.editForm.confirm_password)
      ) {
        rt.showErrorToast(self.$t("ResetpasswordREQUIRED"));
        return;
      } else if (
        !rt.isNullOrWhiteSpace(self.editForm.reset_password) &&
        rt.isNullOrWhiteSpace(self.editForm.confirm_password)
      ) {
        rt.showErrorToast(self.$t("ConfirmpasswordREQUIRED"));
        return;
      } else {
        var params = {
          USERID: self.rowid,
          PWD: self.editForm.reset_password,
          RESPWD: self.editForm.confirm_password
        };
        rt
          .post("../api/SrvWorker/UpdateWorkerPwd", params)
          .then(function(res) {
            rt.showSuccessToast(self.$t("Successfullyresetted"));
            self.formDialog = false;
          })
          .catch(error => {
            rt.showErrorToast(error);
            self.loading = false;
          });
        self.resetPassword();
      }
    },
    pwdChange: function(val) {
      if (val.length > 12) {
        rt.showErrorToast(this.$t("PassIsToLong"));
      }
    },
    resetPassword: function() {
      this.editForm.confirm_password = "";
      this.editForm.reset_password = "";
    },
    show: function() {
      this.formDialog = true;
    }
  }
};
</script>

<style>
.el-loading-mask {
  z-index: 2;
}
</style>


