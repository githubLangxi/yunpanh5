<template>
    <el-dialog :visible.sync="dialogVisible" :show-close="false" size="small" title="重置密码" :before-close="handleBeforeClose" :close-on-click-modal="false">
        <div style="margin-bottom:15px;" v-show="errorMessage != null && errorMessage.length > 0">
            <el-alert :title="errorMessage" :closable="false" type="error">
            </el-alert>
        </div>
        <el-form ref="passwordForm" :model="form" :rules="rules" label-width="120">
            <el-form-item :label="$t('UserName')" prop="userName">
                <el-input v-model="form.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobilephone">
                <el-input v-model="form.mobilephone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('NewPSW')" prop="newPassword">
                <el-input v-model="form.newPassword" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('ConfirmPSW')" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="validCode">
                <el-input v-model="form.validCode" auto-complete="off" class="validWidth"></el-input>
                <el-button @click="getvalidCode">获取验证码</el-button>
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
      smsId:"",
      form: {
        userName: this.$store.state.user.userName,
        newPassword: null,
        confirmPassword: null,
        mobilephone:"",
        validCode:""
      },
      rules: {
        userName: [{ required: true, message: "请输入用户名" }],
        mobilephone: [{ required: true, message: "请输入手机号" }],
        newPassword: [{ required: true, message: "请输入新密码" }],
        confirmPassword: [{ required: true, message: "请输入确认密码" }],
        validCode: [{ required: true, message: "请输入验证码" }]
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
    getvalidCode(){
      //用户名
      var usercode=this.form.userName;
      if(rt.isNullOrWhiteSpace(usercode)){
          rt.showErrorToast("请输入用户名");
          return;
      }
      //手机号
      var phone=this.form.mobilephone;
      if(rt.isNullOrWhiteSpace(phone)){
          rt.showErrorToast("请输入手机号");
          return;
      }
        var requestStr = '../api/NewLogin/SendMessage?usercode=' + usercode+'&phone='+phone;
        rt.get(requestStr).then((res) => {
           this.smsId=res;
           rt.showSuccessToast("验证码已发送到手机号:"+phone+",请及时验证");
        }).catch((error) => {
           rt.showErrorToast(error);
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
            smsId: this.smsId,
            validCode:this.form.validCode,
            userCode: this.form.userName,
            newPassword: encrypt.encrypt(this.form.newPassword)
          };

          return rt.post("../api/NewLogin/VertifyCode", data);
        })
        .then(
          res => {
            rt.showSuccessToast("密码修改成功，请重新登录");
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
<style>
.validWidth{
    margin-right: 150px;
}

</style>
