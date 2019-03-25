<template>
  <div>
    <rt-section id="area7" title="故障明细" :collapsed="true">
    <template slot="toolbar">
      <rt-button type="add" @click="addFaultModel" v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
      <rt-button type="delete" @click="deleteData" v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
    </template>
    <el-table ref="gridTable" :data="faultData" @row-dblclick="showFaultModel" v-loading="loading">
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column label="条码" prop="new_number">
      </el-table-column>
      <el-table-column label="故障现象" prop="new_srv_error_idName">
      </el-table-column>
      <el-table-column label="故障原因" prop="new_srv_errorgroup_idName">
      </el-table-column>
      <el-table-column label="维修项目" prop="new_troubleproject_idName">
      </el-table-column>
      <el-table-column label="配件小类" prop="new_partstype_idName">
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
    </el-pagination>
    <troubleDialog ref="troubleDialog" :workOrder="this.workOrder" @reLoad="reLoadTroubleLine"></troubleDialog>
    </rt-section>
  </div>
</template>

<script>
// import troubleDialog from "./troubleDialog";

export default {
  name: "troubleModel",
  data: function() {
    return {
      loading: false,
      faultData: [],
      pageCookie: "",
      pageIndex: 1,
      pageSize: 5,
      pageSizes: [3, 5, 10],
      totalRecord: 0,
      layout: "total, sizes, prev, pager, next, jumper"
    };
  },
  components: {
    troubleDialog: resolve => {
      require(["./troubleDialog.vue"], resolve);
    }
  },
  props: {
    workOrder: {
      type: Object,
      require: true
    }
  },
  mounted: function() {
    this.faultData = [];
    setTimeout(() => {
      this._fetchRecords();
    }, 1000);
    // this._fetchRecords();
  },
  methods: {
    //加载外出明细数据
    _fetchRecords: function() {
      if (this.workOrder && this.workOrder.id) {
        var params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          pageCookie: this.pageCookie,
          id: this.workOrder.id
        };
        this.loading = true;
        var requestStr = "../api/WorkOrder/TroubleLine";
        rt.get(requestStr, params)
          .then(res => {
            this.faultData = res.troubleLineList;
            this.totalRecord = res.totalRecordCount;
            this.pageCookie = res.pagingCookie;
            this.loading = false;
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.loading = false;
          });
      }
    },
    deleteData() {
      //删除请求
      var selection = this.$refs.gridTable.selection;
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
          var requestStr = "../api/WorkOrder/DeleteTroubleLine";
          rt.post(requestStr, params)
            .then(res => {
              rt.showSuccessToast(res);
              this._fetchRecords();
              this.loading = false;
            })
            .catch(error => {
              rt.showErrorToast(error);
              this.loading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    reLoadTroubleLine: function() {
      this._fetchRecords();
      this.$emit("reLoad");
    },
    showFaultModel: function(row) {
      this.$refs.troubleDialog.show(row.id);
    },
    addFaultModel: function() {
      this.$refs.troubleDialog.show("");
    },
    handleSizeChange(val) {
      this.pageCookie = "";
      this.pageSize = val;
      this._fetchRecords();
    },
    handleIndexChange(val) {
      this.pageIndex = val;
      this._fetchRecords();
    }
  }
};
</script>
