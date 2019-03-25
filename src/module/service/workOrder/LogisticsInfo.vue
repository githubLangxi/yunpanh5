<template>
  <div>
    <rt-header title="物流信息">
      <rt-toolbar showBack @goback="beforeGoBack">
      </rt-toolbar>
    </rt-header>

    <rt-content>
      <!--侧边栏-->
      <rt-nav slot="side" ref="_rt_nav">
         <template v-for="item in infoTab">
            <h2 class="log_name">{{item.new_name}}</h2>
            <template v-for="o in item.new_exp">
              <rt-nav-item href="">{{o}}</rt-nav-item>
            </template>
         </template>
      </rt-nav>

       <div id="demoID"></div>
    </rt-content>
  </div>
</template>
 <script>
export default {
  data: function() {
    return {
      infoTab: [
        {
          new_name: "顺丰",
          new_exp: ["s123", "s124", "s125"]
        },
        {
          new_name: "申通",
          new_exp: ["ST33", "ST34", "ST35"]
        }
      ]
    };
  },
  mounted: function() {
    KDNWidget.run({
      serviceType: "B",
      expCode: "YD",
      expNo: "3711650935447",
      showType: "normal",
      container: "demoID"
    });
  },
  created: function() {
    // this.getworkorderid();
  },
  methods: {
    //返回按钮之前提示保存服务单数据
    beforeGoBack: function() {
      window.history.go(-1);
      /* this.$router.push({ name: "workorder" }); */
    },
    // 根据运输ID查询物流
    getLogistics() {}
  }
};
</script>
<style>
.rt-content .rt-content__side {
  overflow-y: auto;
}
.log_name {
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  color: #555;
  margin: 10px 0;
  /* border-left: 2px solid #1fb6d8; */
  /* padding-left: 20px; */
}
.rt-nav-item {
  margin: 0 !important;
}
/* #demoID {
  position: absolute;
  top: 10%;
  left: 15%;
} */
</style>
