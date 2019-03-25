<template>
    <el-dialog v-model="dialogVisible" :show-close="false" size="tiny" :title="$t('ResetPSW')" :before-close="handleBeforeClose" :close-on-click-modal="false">
        <div style="margin-bottom:15px;" v-show="errorMessage != null && errorMessage.length > 0">
            <el-alert :title="errorMessage" :closable="false" type="error">
            </el-alert>
        </div>
        <el-form ref="passwordForm" :model="form" :rules="rules" label-width="120">
            <el-form-item :label="$t('UserName')" prop="userName">
                <el-input v-model="form.userName" disabled auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('OriginPSW')" prop="oldPassword">
                <el-input v-model="form.oldPassword" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('NewPSW')" prop="newPassword">
                <el-input v-model="form.newPassword" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('ConfirmPSW')" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" type="password" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancelClick">{{$t('BUTTON_CANCEL')}}</el-button>
            <el-button type="primary" @click="handleOkClick" :loading="isProcessing">{{$t('BUTTON_DETERMINE')}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Crypto from "jsencrypt";

export default {
  data() {
    return {
      dialogVisible: false,
      isProcessing: false,
      errorMessage: "",
      form: {
        userName: this.$store.state.user.userName,
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
      },
      rules: {
        oldPassword: [{ required: true, message: "请输入旧密码" }],
        newPassword: [{ required: true, message: "请输入新密码" }],
        confirmPassword: [{ required: true, message: "请输入确认密码" }]
      }
    };
  },
  computed: {},
  mounted: function() {},
  methods: {
    handleCancelClick() {
      this.hide();
    },
    handleOkClick() {
      this.$refs.passwordForm.validate(valid => {
        if (!valid) {
          return false;
        }
        this.changePassword();
      });
    },
    changePassword() {
      this.errorMessage = "";
      this.isProcessing = true;

      rt
        .get("../api/PortalPassword/GetCryptoPublicKey")
        .then(publicKey => {
          var encrypt = new Crypto.JSEncrypt();
          encrypt.setPublicKey(publicKey);

          var data = {
            UserName: this.form.userName,
            OldPassword: encrypt.encrypt(this.form.oldPassword),
            NewPassword: encrypt.encrypt(this.form.newPassword)
          };

          return rt.post("../api/PortalUser/changepassword", data);
        })
        .then(
          res => {
            rt.showSuccessToast(this.$t("ModifySuccess"));
            setTimeout(() => {
              this.hide();
            }, 1500);
          },
          error => {
            this.errorMessage = error;
          }
        )
        .finally(() => {
          this.isProcessing = false;
        });
    },
    handleBeforeClose() {
      //
    },
    show() {
      this.dialogVisible = true;
    },
    hide() {
      this.dialogVisible = false;

      this.isProcessing = false;
      this.errorMessage = "";
      this.$refs.passwordForm.resetFields();
    }
  }
};
</script>