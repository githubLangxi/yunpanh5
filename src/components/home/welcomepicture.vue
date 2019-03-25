<template>
    <div style="width:100%;height:100%;position:relative;">
        <span class="say_hello">{{sayhello}}</span>
        <!--  <img src="../../assets/imgs/1366.png" />-->
        <div class="welcome"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      sayhello: ""
    };
  },
  mounted: function() {
    this.sayHello();
  },
  methods: {
    sayHello: function() {
      var tmCur = new Date();
      var userName = this.$store.state.user.userName;
      if (tmCur.getHours() <= 6 || tmCur.getHours() > 18) {
        //晚上  getUserFullName
        this.sayhello = this.$t("GOODNIGHT") + "，" + userName;
      } else if (tmCur.getHours() >= 7 && tmCur.getHours() <= 12) {
        //上午
        this.sayhello = this.$t("GOODMORNING") + "，" + userName;
      } else {
        //下午
        this.sayhello = this.$t("GOODAFTERNOON") + "，" + userName;
      }
    }
  }
};
</script>
<style>
.say_hello {
  left: 310px;
  top: 125px;
  position: absolute;
  font-size: 18px;
  color: #313a46;
  font-weight: bold;
}

.welcome {
  width: 604px;
  height: 340px;
  background-image: url(../../assets/imgs/1366.png);
}

@media screen and (min-width: 1920px) {
  .say_hello {
    left: 450px;
    top: 165px;
  }
  .welcome {
    height: 400px;
    width: 718px;
    background-image: url(../../assets/imgs/1920.png);
  }
}
</style>
