<template>
  <div>
    <rt-section id="area17" title="外机信息">
      <template slot="toolbar">
        <rt-button type="delete" text="删除" @click="deleteData()" v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
      </template>
      <el-table ref="outsideTable" @row-dblclick="doubleClick" :data="OutsideMachineInfo" row-key="id" stripe v-loading="false">
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord"/>
    </rt-section>
    <insideMachineDialog ref="insideMachineDialog"  v-bind:outsideMachine="omachineid" :mids="this.ids" v-bind:isInside="isInside" :workOrder="workOrder" @reLoad="reLoad" ></insideMachineDialog>
  </div>
</template>
<script>
import insideMachineDialog from "./insideMachineDialog";

export default {
  data: function() {
    return {
      loading: false,
      OutsideMachineInfo: [], //区域信息
      omachineid: {}, //判断是修改还是新增（外机所以数据）
      pageCookie: "",
      pageIndex: 1,
      pageSize: 5,
      pageSizes: [3, 5, 10],
      totalRecord: 0,
      layout: "total, sizes, prev, pager, next, jumper",
      ids: "", //选中的内机信息的id
      isInside: false
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
    doubleClick: function(row) {
      let obj_outsideMachine = {
        id: row.id,
        productid: row.new_outproduct_id,
        productName: row.new_outproduct_name,
        new_RefrigeratingCapacity: row.new_RefrigeratingCapacity,
        new_outinstalldissatisfyterm: row.new_outinstalldissatisfyterm,
        new_incount: "",
        new_outinstallterm: row.new_outinstallterm
      };
      this.omachineid = obj_outsideMachine;
      this.$refs.insideMachineDialog.show(obj_outsideMachine);
    },
    gotoAddPage: function() {},
    reLoad: function() {
      this.init();
      this.$emit("reLoad");
    },
    init: function() {
      var params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        pageCookie: this.pageCookie,
        queryValue: this.workOrder.id
      };
      this.loading = true;
      //获取功能区域int pageSize, int pageIndex, string queryValue, string pageCookie
      var requestStr1 = "../api/VisitDesign/GetOutsideMachine";
      rt
        .get(requestStr1, params)
        .then(res => {
          this.OutsideMachineInfo = res.outsideMachineInfoList;
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
      var selection = this.$refs.outsideTable.selection;
      if (selection == null || selection.length == 0) {
        alert("请至少选择一条记录！");
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
          var deleteList = [];
          for (var i in selection) {
            deleteList.push(selection[i].id);
          }
          var params = deleteList;
          var requestStr = "../api/VisitDesign/DeleteOutsideInfo";
          rt
            .post(requestStr, params)
            .then(res => {
              rt.showSuccessToast(res);
              this.init();
              this.loading = false;
              this.$emit("reLoad");
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
    }
  }
};
</script>