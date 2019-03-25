<template>
  <div class="login" @keyup.enter="onLogin">
    <div class="branding-container">
      <img src="../../assets/imgs/default_signin_illustration.png">
    </div>
    <div class="lang">
      <language></language>
    </div>
    <div class="content-container">
      <div class="login-panel">
        <div class="logo-container">
          <img src="../../assets/imgs/login_logo.png" alt="">
        </div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-form" @submit.native.prevent>
          <el-form-item prop="username">
            <el-input :placeholder="$t('LOGIN_USERNAME')" type="text" v-model="loginForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :placeholder="$t('LOGIN_PASSWORD')" type="password" v-model="loginForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
                <el-input :placeholder="$t('LOGIN_CAPTCHA')" type="text" v-model="loginForm.captcha" auto-complete="off">
                  <template slot="append"><img width="60px" height="23px" alt="" title="看不清?点击刷新" :src="loginForm.captcha_image" @click="getCaptcha" /></template>
                </el-input>
              </el-form-item>
          <el-form-item v-if="isDevMode" prop="serverAddress">
            <el-input placeholder="服务器地址，如http://192.168.1.99:9000" type="text" @change="onServerAddressChanged" v-model="loginForm.serverAddress" auto-complete="off"></el-input>
          </el-form-item>
          <div>
            <div style="float: left;">
            <el-form-item prop="type">
              <el-button type="primary" @click.native.prevent="onLogin" class="login-btn" :loading="isLogining">{{$t(isLogining ? 'LOGIN_LOGINING' : 'LOGIN')}}</el-button>
              <a v-if="false" class="forget-password" href="#">{{$t('LOGIN_FORGOT_PASSWORD')}}</a>
            </el-form-item>
            </div>
            <div style="float: right;">
            
            <el-button type="text" @click.native.prevent="showResetPasswordDialog" :loading="isLogining">忘记密码</el-button>
          
            </div>
          </div>
        </el-form>
      </div>

      <div class="copyright">
        <span>{{copyright}}</span>
      </div>
    </div>
    <reset-password-dialog ref="dlgResetPassword"></reset-password-dialog>
  </div>
</template>

<script>
import { locales } from "@/config/i18n-map";
import { copyright } from "@/config/customization";

import LanguageComponent from "../Language";
import Crypto from "jsencrypt";
import ResetPasswordDialog from "../ResetPasswordDialog";

export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error(this.$t("LOGIN_PLS_INPUT_USERNAME")));
      } else {
        callback();
      }
    };

    var validatePassword = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error(this.$t("LOGIN_PLS_INPUT_PASSWORD")));
      } else {
        callback();
      }
    };

    var validateServerAddress = (rule, value, callback) => {
      if (value == null || value.length <= 0 || rt.isUrl(value)) {
        callback();
      } else {
        callback(new Error("请输入有效的服务器地址"));
      }
    };

    var validateCaptcha = (rule, value, callback) => {
      if (value == null || value.length <= 0) {
        this.errorDescription = '请输入验证码';
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        captcha: "",
        captcha_image: "",
        encrypted_captcha1: "",
        encrypted_captcha2: "",
        serverAddress: "http://"
      },
      loginRules: {
        username: [
          {
            validator: validateUsername,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePassword,
            trigger: "blur"
          }
        ],
        captcha: [
          {
            validator: validateCaptcha,
            trigger: "submit"
          }
        ],
        serverAddress: [
          {
            validator: validateServerAddress,
            trigger: "change"
          }
        ]
      },
      isDevMode: process.env.NODE_ENV !== "production",
      isLogining: false,
    };
  },
  components: {
    language: LanguageComponent,
    "reset-password-dialog": ResetPasswordDialog
  },
  mounted: function() {
    this.$nextTick(function() {
      var auth = this.$store.state.auth;
      if (auth.isLoggedIn) {
        this.$router.push({
          path: "/home"
        });
      }
    this.getCaptcha();
      //开发者模式下，绑定服务器地址
      if (
        this.isDevMode &&
        !rt.isNullOrWhiteSpace(localStorage.serverAddress)
      ) {
        this.loginForm.serverAddress = localStorage.serverAddress;
      }
    });
  },
  computed: {
    copyright() {
      return copyright;
    }
  },
  watch: {
  },
  methods: {
    showResetPasswordDialog() {
      this.$refs.dlgResetPassword.show();
    },
    // 登陆前核对输入信息
    onLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login();
        }
      });
    },
    //
    getCaptcha() {
      rt
        .get("../api/captcha")
        .then(res => {
          //console.log(res);
          this.loginForm.captcha_image = "data:image/png;base64," + res[0];
          this.loginForm.encrypted_captcha1 = res[1];
          this.loginForm.encrypted_captcha2 = res[2];
        })
        .catch(res => {
          rt.showErrorToast(res);
        });
    },
    // 登陆
    login() {
      this.isLogining = true;
      rt
        .get("../api/PortalPassword/GetCryptoPublicKey")
        .then(publicKey => {
          var encrypt = new Crypto.JSEncrypt();
          encrypt.setPublicKey(publicKey);

          var creds = {
            username: this.loginForm.username,
            password: encodeURIComponent(
              encrypt.encrypt(this.loginForm.password)
            ),
            captcha1: this.loginForm.captcha,
            captcha2: this.loginForm.encrypted_captcha2
          };

          return this.$auth.login(creds);
        })
        .then(res => {
          return rt.get("../api/PortalUser/userInfo");
        })
        .then(res => {
          var i18nlang = this.$i18n;
          if (rt.isNull(res) || rt.isNullOrWhiteSpace(res.SystemUserId)) {
            this.$store.commit("UPDATE_AUTH", {});
            throw new Error(this.$t("LOGIN_USERNAME_OR_PASSWORD_INCORRECT"));
          }

          // 管理员登陆提示
          if (res.UserRole === 1) {
            this.$store.commit("UPDATE_AUTH", {});
            throw new Error(this.$t("LOGIN_USERNAME_OR_PASSWORD_INCORRECT"));
          }

          // web端登录权限
          if (!res.CanLoginWeb) {
            this.$store.commit("UPDATE_AUTH", {});
            throw new Error(this.$t("NO_LOGIN_PERMISSIONS"));
          }

          // 缓存用户信息
          let user = {
            userId: res.SystemUserId,
            userName: res.UserCode,
            nickName: res.UserName,
            avatarUrl: res.AvatarUrl,
            departName: res.OutterUserDepartName,
            departId: res.OutterUserDepartId
          };
          this.$store.commit("UPDATE_USER", user);
          //获取操作权限
          this.retrieveUserActions();

          //开发者模式下，保存服务器地址
          if (
            this.isDevMode &&
            !rt.isNullOrWhiteSpace(this.loginForm.serverAddress)
          ) {
            localStorage.serverAddress = this.loginForm.serverAddress;
          }

          this.$router.push({
            path: this.$route.query.redirect || "/home"
          });
        })
        .catch(res => {
          this.isLogining = false;
          if (res.data) {
             //自动刷新验证码
            this.getCaptcha();
            rt.showErrorToast(res.data.error_description);
          } else if (res.message) {
            rt.showErrorToast(res.message);
          } else {
            rt.showErrorToast(res);
          }
        });

      // var creds = {
      //   username: this.loginForm.username,
      //   password: this.loginForm.password
      // };

      // var that = this;
      // this.isLogining = true;
      // this.$auth.login(creds)
      //   .then((resp) => {
      //     return rt.get('../api/PortalUser/userInfo')
      //   })
      //   .then((res) => {
      //     var i18nlang = this.$i18n;
      //     if (rt.isNull(res) || rt.isNullOrWhiteSpace(res.SystemUserId)) {
      //       that.$store.commit('UPDATE_AUTH', {})
      //       throw new Error(that.$t("LOGIN_USERNAME_OR_PASSWORD_INCORRECT"));

      //     }

      //     // 管理员登陆提示
      //     if (res.UserRole === 1) {
      //       that.$store.commit('UPDATE_AUTH', {})
      //       throw new Error(that.$t("LOGIN_USERNAME_OR_PASSWORD_INCORRECT"));
      //     }

      //     // 管理员登陆提示
      //     if (!res.CanLoginWeb) {
      //       that.$store.commit('UPDATE_AUTH', {})
      //       throw new Error(that.$t("LOGIN_USERNAME_OR_PASSWORD_INCORRECT"));
      //     }

      //     // 缓存用户信息
      //     let user = {
      //       userId: res.SystemUserId,
      //       userName: res.UserCode,
      //       nickName: res.UserName,
      //       avatarUrl: res.AvatarUrl,
      //       departName: res.OutterUserDepartName,
      //       departId: res.OutterUserDepartId
      //     };
      //     that.$store.commit('UPDATE_USER', user);
      //     //获取操作权限
      //     that.retrieveUserActions();

      //     //开发者模式下，保存服务器地址
      //     if (this.isDevMode && !rt.isNullOrWhiteSpace(this.loginForm.serverAddress)) {
      //       localStorage.serverAddress = this.loginForm.serverAddress;
      //     }

      //     that.$router.push({
      //       path: that.$route.query.redirect || "/home"
      //     });
      //   })
      //   .catch((res) => {
      //     that.isLogining = false;
      //     if (res.data) {
      //       rt.showErrorToast(res.data.error);
      //     } else if (res.message) {
      //       rt.showErrorToast(res.message);
      //     } else {
      //       rt.showErrorToast(res);
      //     }
      //   });
    },
    retrieveUserActions() {
      rt.get("../api/PortalUser/GetUsersActions").then(actions => {
        window.GLOBAL_USER_ACTIONS = actions;
        localStorage.GLOBAL_USER_ACTIONS = JSON.stringify(actions);
      });
    },
    onServerAddressChanged() {
      this.$http.defaults.baseURL = this.loginForm.serverAddress;
    }
  }
};
</script>

<style scoped>
.lang {
  position: absolute;
  right: 20px;
  top: 10px;
  width: 100px;
  z-index: 2;
}

.lang .el-dropdown {
  float: right;
}

.branding-container {
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 0;
  opacity: 1;
  width: 100%;
  height: 100%;
  transition: opacity 1s;
  -moz-transition: opacity 1s;
  -webkit-transition: opacity 1s;
  -o-transition: opacity 1s;
  -ms-transition: opacity 1s;
  transition-property: opacity;
  transition-duration: 1s;
}

.branding-container img {
  min-width: 60%;
  height: 100%;
}

.content-container {
  background: #fff;
  position: fixed;
  right: 0;
  float: right;
  height: 100%;
  width: 40%;
  margin: 0;
  padding: 0;
  z-index: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.login-panel {
  padding: 0 15% 0 40px;
  height: 100%;
  text-align: left;
}

.logo-container {
  padding-top: 30%;
}

.login-form {
  padding-top: 100px;
}

.login-btn {
  width: 92px;
  background-color: #1fb6d8;
}

.forget-password {
  float: right;
  color: #1fb6d8;
  text-decoration: none;
}

.copyright {
  position: absolute;
  bottom: 15px;
  left: 40px;
  font-size: 14px;
  color: #999;
}

.button-clear {
  border-color: transparent;
  background: 0 0;
  box-shadow: none;
  color: transparent;
  cursor: pointer;
}
</style>

<style>
.el-checkbox .el-checkbox__label {
  vertical-align: middle;
}
</style>
