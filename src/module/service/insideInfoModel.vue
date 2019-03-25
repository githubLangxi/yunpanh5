<template>
  <div>
    <rt-section id="area16" title="内机信息">
      <template slot="toolbar">
        <rt-button type="add" text="添加外机" @click="gotoAddPage()" v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
        <rt-button type="delete" text="删除" @click="deleteData()" v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
      </template>
      <el-table ref="insideTable" :data="insideInfo" row-key="id" stripe v-loading="loading">
        <el-table-column type="selection" width="35">
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord"/>
    </rt-section>
    <insideMachineDialog ref="insideMachineDialog"  v-bind:outsideMachine="omachineid" :workOrder="workOrder" :mids="this.ids" v-bind:isInside="false" @reLoad="reLoadOutInfo"></insideMachineDialog>
  </div>
</template>
<script>
import insideMachineDialog from "./insideMachineDialog";

export default {
  data: function() {
    return {
      loading: false,
      insideInfo: [], //区域信息
      pageCookie: "",
      pageIndex: 1,
      pageSize: 5,
      pageSizes: [3, 5, 10],
      totalRecord: 0,
      layout: "total, sizes, prev, pager, next, jumper",
      ids: "",
      omachineid: {}
    };
  },
  props: {
    workOrder: Object
  },
  components: {
    insideMachineDialog
  },
  mounted: function() {
    this.init();
  },
  methods: {
    SaveData: function() {},
    doubleClick: function(row) {},
    gotoAddPage: function() {
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
    init: function() {
      var params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        pageCookie: this.pageCookie,
        new_srv_workorder_id: this.workOrder.id,
        queryValue: ""
      };
      this.loading = true;
      //获取功能区域int pageSize, int pageIndex, string queryValue, string pageCookie
      var requestStr1 = "../api/VisitDesign/GetInsideInfo";
      rt
        .get(requestStr1, params)
        .then(res => {
          this.insideInfo = res.InsideMachineInfoList;
          this.totalRecord = res.totalRecordCount;
          this.pageCookie = res.pagingCookie;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    deleteData: function() {
      //删除请求
      var selection = this.$refs.insideTable.selection;
      if (selection == null || selection.length == 0) {
        alert("请至少选择一条记录！");
        return;
      }
      var deleteList = [];
      for (var i in selection) {
        deleteList.push(selection[i].id);
      }
      var hasSetMark = false;
      this.insideInfo.forEach(k => {
        if (deleteList.indexOf(k.id) > -1) {
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

      this.$confirm("此操作将永久删除该记录,是否继续", "提示", {
        confirmButtonText: "确定",
        confirmButtonClass: "ConfirmButtonClass",
        cancelButtonText: "取消",
        cancelButtonClass: "CancelButtonClass",
        type: "warning"
      })
        .then(() => {
          this.loading = true;

          var params = deleteList;
          var requestStr = "../api/VisitDesign/DeleteInsideInfo";
          rt
            .post(requestStr, params)
            .then(res => {
              rt.showSuccessToast(res);
              this.reLoadOutInfo();
              this.loading = false;
            })
            .catch(error => {
              rt.showErrorToast(error);
              this.loading = false;
            });
        })
        .catch(e => {
          this.loading = false;
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      this.pageCookie = "";
      this.pageSize = val;
      this.init();
    },
    handleIndexChange(val) {
      this.pageIndex = val;
      this.init();
    },

    reLoadOutInfo: function() {
      this.init();
      this.$emit("reLoad");
    }
  }
};
</script>