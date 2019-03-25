<template>
  <div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: this.$route.params.userId,
      targetUrl: this.$route.params.targetUrl,
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if(this.$store.state.auth.isLoggedIn){
        this.$router.push({ name: this.targetUrl })
      }
      else{
        this.getCrmToken(this.userId)
      }
    })
  },
  methods: {
    //Get请求传递加密roleId
    getCrmToken(userId) {
      var that = this
      var url = '../api/PortalOAuth/GetCRMToken?userid=' + that.userId
      rt.get(url).then(function (resp) {
        that.login(resp)
      })
    },
    //根据加密ID获取token
    login(crmToken) {
      let that = this
      var url = '../token'
      rt.post(url, 'grant_type=mscrm&crm_token=' + encodeURIComponent(crmToken)).then(function (resp) {
        console.log("123");
        var access_token = resp.access_token
        var refresh_token = resp.refresh_token
        var auth = {}
        auth.isLoggedIn = true;
        auth.accessToken = access_token
        auth.refreshToken = refresh_token
        that.$store.commit('UPDATE_AUTH', auth)
        that.$router.push({ name: that.targetUrl })
      })
      .catch((error) => {
        console.error(error)
      })
    },
  }
}
</script>

<style scoped>

</style>
