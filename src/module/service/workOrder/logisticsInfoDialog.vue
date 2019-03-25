<template>
  <!--物流信息-->
  <el-dialog title="物流信息" :visible.sync="infoDialog.visible" v-loading="loading" :before-close="handleClose" @open="open()">
    <rt-content>
        <rt-nav slot="side" ref="_rt_nav">
        <template v-for="o in infoTab">
            <rt-nav-item href="" @click="getMes(o.expCode,o.expNo)">{{o.expNo}}</rt-nav-item>
        </template>
    </rt-nav>
    <div id="demoID"></div>
    </rt-content>
  </el-dialog>
</template>

<script>
export default {
  name: "infoDialog",
  data: function() {
    return {
      //   infoVisible: false,
      loading: false,
      // workId: "",
      infoTab: []
    };
  },
  props: {
    infoDialog: {
      type: Object,
      default: {
        visible: false,
        workId: ""
      }
    }
  },
  methods: {
    getMes(code, no) {
      KDNWidget.run({
        serviceType: "B",
        expCode: code,
        expNo: no,
        showType: "normal",
        container: "demoID"
      });
    },
    getSideMes() {
      this.loading = false;
      var that = this;
      rt.get("../api/WorkOrder/GetLogistics/" + this.infoDialog.workId)
        .then(function(res) {
          var infoTab = [];
          infoTab = res;
          var arr = [];
          infoTab.forEach(function(e) {
            e.new_exp.forEach(function(o) {
              arr.push({
                expCode: e.new_name,
                expNo: o
              });
            });
          });
          that.infoTab = arr;
          that.getMes(arr[0].expCode, arr[0].expNo);
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
      // rt.get("../api/WorkOrder/GetLogistics/" + this.new_srv_workorderid)
    },
    open() {
      this.loading = true;
      setTimeout(() => {
        this.getSideMes();
      }, 1000);
    },
    // show: function(new_srv_workorderid) {
    //   if (!rt.isNullOrWhiteSpace(new_srv_workorderid)) {
    //     this.workId = new_srv_workorderid;
    //   }
    //   this.infoVisible = true;
    // },
    handleClose: function() {
      this.infoDialog.visible = false;
    }
  }
};
</script>
<style>
.el-dialog {
  width: 960px !important;
}
.rt-content .rt-content__side {
  overflow-y: auto;
}
.rt-content {
  height: 540px;
}
.rt-nav-item {
  margin: 0 !important;
}
.log_name {
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  color: #555;
  margin: 10px 0;
  /* border-right: 1px dashed #555; */
  /* box-sizing: border-box; */
  /* border-left: 2px solid #1fb6d8; */
  /* padding-left: 20px; */
}
</style>

