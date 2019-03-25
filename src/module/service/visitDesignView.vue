<template>
  <div>
    <rt-section id="area15" title="区域信息">
      <template slot="toolbar">
        <rt-button type="add" text="新增" @click="gotoAddPage()" v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
        <rt-button type="delete" text="删除" @click="deleteAreaInfo()" v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
      </template>
      <el-table ref="areaInfoTable" @row-dblclick="doubleClick" :data="areaInfo" row-key="new_workorderfunctionalareasid" stripe
        v-loading="false">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column prop="new_placetypes_name" label="场所类型">
        </el-table-column>
        <el-table-column prop="new_functionalareas_name" label="功能区域">
        </el-table-column>
        <el-table-column prop="new_regionalidentity" label="区域标识">
        </el-table-column>
        <el-table-column prop="new_usearea" label="使用面积">
        </el-table-column>
        <el-table-column prop="new_referenceurc" label="参考单位制冷量">
        </el-table-column>
        <el-table-column prop="new_ismeet_value" label="匹配是否满足">
        </el-table-column>
      </el-table>
    </rt-section>
    <rt-section id="area16" title="内机信息">
      <template slot="toolbar">
        <rt-button type="add" text="添加外机" @click="addInsideMachine(1)" v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
        <rt-button type="delete" text="删除" @click="deleteInsideInfo()" v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
      </template>
      <el-table ref="insideTable" :data="insideInfo" row-key="id" stripe v-loading="false">
        <el-table-column type="selection" width="35">
          <!-- new_workorderfunctionalareasid -->
        </el-table-column>
        <el-table-column prop="areaInfoModel.new_placetypes_name" label="场所类型">
        </el-table-column>
        <el-table-column prop="areaInfoModel.new_functionalareas_name" label="功能区域">
        </el-table-column>
        <el-table-column prop="areaInfoModel.new_regionalidentity" label="区域标识">
        </el-table-column>
        <el-table-column prop="areaInfoModel.new_usearea" label="使用面积">
        </el-table-column>
        <el-table-column prop="areaInfoModel.new_referenceurc" label="参考单位制冷量">
        </el-table-column>
        <el-table-column prop="areaInfoModel.new_ismeet_value" label="匹配是否满足">
        </el-table-column>
        <el-table-column prop="new_product_name" label="内机型号">
        </el-table-column>
        <el-table-column prop="new_insideqty" label="内机数量">
        </el-table-column>
        <el-table-column prop="new_RefrigeratingCapacity" label="制冷量">
        </el-table-column>
        <el-table-column prop="outsideMachineInfo.new_outproduct_name" label="外机型号">
        </el-table-column>
        <el-table-column prop="outsideMachineInfo.new_setmark" label="套机标识">
        </el-table-column>

      </el-table>
    </rt-section>
    <rt-section id="area17" title="外机信息">
      <template slot="toolbar">
        <!-- <rt-button type="delete" text="修正" @click="saveInsideMachine()" /> -->
        <rt-button type="delete" text="删除" @click="deleteOutsideInfo()" v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
      </template>
      <el-table ref="outsideTable" @row-dblclick="saveInsideMachine" :data="OutsideMachineInfo" row-key="id" stripe v-loading="false">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column prop="new_outproduct_name" label="外机类型">
        </el-table-column>
        <el-table-column prop="new_RefrigeratingCapacity" label="外机制冷量">
        </el-table-column>
        <el-table-column prop="new_outinstallname" label="外机安装条件">
        </el-table-column>
        <el-table-column prop="new_outinstalldissatisfyname" label="外机安装不满足条件">
        </el-table-column>
        <el-table-column prop="new_setmark" label="套机标识">
        </el-table-column>
        <el-table-column prop="new_grossfloorarea" label="建筑总面积">
        </el-table-column>
        <el-table-column prop="new_inoutmatching" label="内外机配比">
        </el-table-column>
      </el-table>
    </rt-section>
    <insideMachineDialog ref="insideMachineDialog" @insideMachineSelect="insideMachineSelect" v-bind:outsideMachine="omachineid" :mids="this.ids" v-bind:isInside="a" :title="wtitle"></insideMachineDialog>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      new_srv_workorderid: "", //主档id,
      a: false,
      omachineid: {}, //判断是修改还是新增（外机所以数据）
      ids: "", //选中的内机信息的id
      wtitle: "外机条码",
      areaInfo: [], //区域信息
      insideInfo: [], //内机信息
      OutsideMachineInfo: [] //外机信息
    };
  },
  props: {
    workOrder: Object
  },
  components: {
    insideMachineDialog: resolve => {
      require(["./insideMachineDialog.vue"], resolve);
    }
  },
  mounted: function() {
    this.init();
  },
  methods: {
    //返回按钮之前提示保存服务单数据
    beforeGoBack: function() {
      if (rt.isNullOrWhiteSpace(this.new_srv_workorderid)) {
        this.$confirm(this.$t("NewOrderNotSaveSureQuit"), this.$t("Tip"), {
          confirmButtonText: this.$t("BUTTON_DETERMINE"),
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: this.$t("BUTTON_CANCEL"),
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            this.$router.push({
              name: "workorder"
            });
          })
          .catch(() => {});
      } else {
        this.$router.push({
          name: "workorder"
        });
      }
    },
    SaveData: function() {},
    doubleClick: function(row) {
      this.$router.push({
        name: "areainfocreate",
        params: {
          id: row.new_workorderfunctionalareasid,
          preid: this.$route.params.id
        }
      });
    },
    gotoAddPage: function() {
      this.$router.push({
        name: "areainfocreate",
        params: {
          id: "1",
          preid: this.$route.params.id
        }
      });
    },
    init: function() {
      //获取功能区域int pageSize, int pageIndex, string queryValue, string pageCookie
      var requestStr1 =
        "../api/VisitDesign/GetAreaInfo?pageSize=20&pageIndex=1&queryValue=" +
        this.$route.params.id +
        "&pageCookie=";
      rt
        .get(requestStr1)
        .then(res => {
          this.areaInfo = res.areaInfoList;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });

      //获取内机信息
      var requestStr2 =
        "../api/VisitDesign/GetInsideInfo?pageSize=20&pageIndex=1&queryValue=&pageCookie=&new_srv_workorder_id=" +
        this.$route.params.id;
      rt
        .get(requestStr2)
        .then(res => {
          this.insideInfo = res.InsideMachineInfoList;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });

      //获取外机信息int pageSize, int pageIndex, string queryValue, string pageCookie
      var requestStr3 =
        "../api/VisitDesign/GetOutsideMachine?pageSize=20&pageIndex=1&queryValue=" +
        this.$route.params.id +
        "&pageCookie=";
      rt
        .get(requestStr3)
        .then(res => {
          this.OutsideMachineInfo = res.outsideMachineInfoList;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    //修改外机信息
    saveInsideMachine: function(row) {
      if (
        this.workOrder.new_dealstage == 6 ||
        this.workOrder.new_dealstage == 7 ||
        this.workOrder.new_dealstage == 10 ||
        this.workOrder.new_dealstage == 15 ||
        this.workOrder.new_dealstage == 16 ||
        this.workOrder.new_dealstage == 17 ||
        this.workOrder.new_tech_approvalstatus == 3
      ) {
      } else {
        rt.showErrorToast("当前状态不允许修改");
        return;
      }
      // if (this.$refs.outsideTable.store.states.selection.length != 1) {
      //   rt.showErrorToast("请选择一条外机信息");
      //   return;
      // }

      let obj_outsideMachine = {
        id: row.id,
        productid: row.new_outproduct_id,
        productName: row.new_outproduct_name,
        new_RefrigeratingCapacity: row.new_RefrigeratingCapacity,
        new_outinstalldissatisfyterm: row.new_outinstalldissatisfyterm,
        new_incount: "",
        new_outinstallterm: row.new_outinstallterm
      };

      console.log("输出行数据");
      console.log(obj_outsideMachine);

      this.omachineid = obj_outsideMachine;
      this.$refs.insideMachineDialog.show();
    },
    addInsideMachine: function(index) {
      //设置为弹出框新增
      let obj_outsideMachine = {
        id: "",
        productid: "",
        productName: "",
        new_RefrigeratingCapacity: "",
        new_outinstalldissatisfyterm: "",
        new_incount: "",
        new_outinstallterm: ""
      };
      this.omachineid = obj_outsideMachine;

      if (this.$refs.insideTable.store.states.selection.length <= 0) {
        rt.showErrorToast("先选择内机");
        return;
      }
      let arr_ids = [];
      this.$refs.insideTable.store.states.selection.forEach(k => {
        arr_ids.push(k.id);
      });
      this.ids = arr_ids.join(",");

      //判断是否有套机标识
      var isSetMark = false;
      this.insideInfo.forEach(k => {
        if (arr_ids.indexOf(k.id) > -1) {
          if (k.outsideMachineInfo != null) {
            if (
              k.outsideMachineInfo.new_setmark != null &&
              k.outsideMachineInfo.new_setmark != ""
            ) {
              isSetMark = true;
              return;
            }
          }
        }
      });
      if (isSetMark) {
        rt.showErrorToast("请选择无套机标识的内机");
        return;
      }

      this.$refs.insideMachineDialog.show();
    },
    deleteAreaInfo: function() {
      if (this.$refs.areaInfoTable.store.states.selection.length < 1) {
        rt.showErrorToast("请先选择区域信息");
        return;
      }
      var selection = this.$refs.areaInfoTable.store.states.selection;
      var list_id = [];
      selection.forEach(e => {
        list_id.push(e.new_workorderfunctionalareasid);
      });

      //删除功能区域
      var requestStr1 = "../api/VisitDesign/DeleteAreaInfo";
      rt
        .post(requestStr1, list_id)
        .then(res => {
          this.init();
          rt.showSuccessToast(res);
        })
        .catch(error => {
          rt.showErrorToast(error.Data);
        });
    },
    deleteInsideInfo: function() {
      if (this.$refs.insideTable.store.states.selection.length < 1) {
        rt.showErrorToast("请先选择内机信息");
        return;
      }
      var selection = this.$refs.insideTable.store.states.selection;
      var list_id = [];
      selection.forEach(e => {
        list_id.push(e.id);
      });

//逻辑未移-添加到接口中 2018-09-12 10：15
      //判断是否有套机标识
      var hasSetMark = false;
      this.insideInfo.forEach(k => {
        if (list_id.indexOf(k.id) > -1) {
          if (k.outsideMachineInfo != null) {
            if (
              k.outsideMachineInfo.new_setmark != null &&
              k.outsideMachineInfo.new_setmark != ""
            ) {
              hasSetMark = true;
              return;
            }
          }
        }
      });
      if (hasSetMark) {
        rt.showErrorToast("请先删除对应的外机");
        return;
      }

      //删除内机信息
      var requestStr1 = "../api/VisitDesign/DeleteInsideInfo";
      rt
        .post(requestStr1, list_id)
        .then(res => {
          this.init();
          rt.showSuccessToast(res);
        })
        .catch(error => {
          rt.showErrorToast(error.Data);
        });
    },
    deleteOutsideInfo: function() {
      if (this.$refs.outsideTable.store.states.selection.length < 1) {
        rt.showErrorToast("请先选择外机信息");
        return;
      }
      var selection = this.$refs.outsideTable.store.states.selection;
      var list_id = [];
      selection.forEach(e => {
        list_id.push(e.id);
      });
      //删除外机信息
      var requestStr1 = "../api/VisitDesign/DeleteOutsideInfo";
      rt
        .post(requestStr1, list_id)
        .then(res => {
          this.init();
          rt.showSuccessToast(res);
        })
        .catch(error => {
          rt.showErrorToast(error.Data);
        });
    },
    //选完内机后调用(添加外机)
    insideMachineSelect: function(form) {
      if (form.id != "" && form.id != null && form.id != undefined) {
        //执行更新
        let requestStr = "../api/VisitDesign/UpdateOutsideMachineInfo";

        let model = {
          id: form.id,
          new_outinstallterm: form.new_outinstallterm,
          new_RefrigeratingCapacity: form.new_RefrigeratingCapacity, //外机制冷量
          new_outproduct_id: form.productid, //外机型号
          new_outinstalldissatisfyterm: form.new_outinstalldissatisfyterm //外机安装不满足条件
        };

        rt
          .post(requestStr, model)
          .then(res => {
            rt.showSuccessToast(res);
            this.init();
          })
          .catch(error => {
            rt.showErrorToast(error.Data);
            this.loading = false;
          });

        return;
      }

      //执行新增
      let ids = [];
      this.$refs.insideTable.store.states.selection.forEach(k => {
        ids.push(k.id);
      });
      let ids_str = ids.join(",");
      let requestStr =
        "../api/VisitDesign/addOutsideMachineInfo?ids=" +
        ids_str +
        "&orderId=" +
        this.$route.params.id;

      let model = {
        new_outproduct_id: form.productid,
        new_RefrigeratingCapacity: form.new_RefrigeratingCapacity, //外机制冷量
        new_outinstallterm: form.new_outinstallterm, //外机安装条件
        new_outinstalldissatisfyterm: form.new_outinstalldissatisfyterm //外机安装不满足条件
      };

      rt
        .post(requestStr, model)
        .then(res => {
          rt.showSuccessToast(res);
          this.init();
        })
        .catch(error => {
          rt.showErrorToast(error.Data);
          this.loading = false;
        });
    }
  }
};
</script>
<style>
</style>
