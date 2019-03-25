<template>
  <div>
    <rt-section id="area8" title="换件明细" :collapsed="true">
      <template slot="toolbar">
        <rt-button type="add" @click="addPartsLineModel" v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
        <rt-button type="delete" @click="deleteData" v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
      </template>
      <el-table ref="gridTable" :data="partsLineData" @row-dblclick="showPartsLineModel" v-loading="loading">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column label="换下件编码" prop="new_productcode">
        </el-table-column>
        <el-table-column label="换下件名称" prop="new_productold_idName">
        </el-table-column>
        <el-table-column label="更换数量" prop="new_qty">
        </el-table-column>
        <el-table-column label="申请数量" prop="new_apply_qty">
        </el-table-column>
        <el-table-column label="换上件编码" prop="new_name">
        </el-table-column>
        <el-table-column label="换上件名称" prop="new_product_idName">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
      </el-pagination>
      <partLineDialog ref="partLineDialog" :workOrder="this.workOrder" @reLoad="reLoadpartsLine"></partLineDialog>
    </rt-section>
  </div>
</template>

<script>
// import partLineDialog from "./partLineDialog";

export default {
  name: "partLineModel",
  data: function() {
    return {
      loading: false,
      partsLineData: [],
      pageCookie: "",
      pageIndex: 1,
      pageSize: 5,
      pageSizes: [3, 5, 10],
      totalRecord: 0,
      layout: "total, sizes, prev, pager, next, jumper",
      isLoad: false
    };
  },
  props: {
    workOrder: Object
  },
  components: {
    partLineDialog: resolve => {
      require(["./partLineDialog.vue"], resolve);
    }
  },
  mounted: function() {
    this.partsLineData = [];
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
          //pageCookie: this.pageCookie,
          id: this.workOrder.id
        };
        this.loading = true;
        var requestStr = "../api/WorkOrder/partsLine";
        rt.get(requestStr, params)
          .then(res => {
            this.partsLineData = res.partsLineList;
            this.totalRecord = res.totalRecordCount;
            this.pageCookie = res.pagingCookie;
            this.loading = false;
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.loading = false;
          });
        this.isLoad = true;
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
          var requestStr = "../api/WorkOrder/DeletePartsLine";
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
    reLoadpartsLine: function() {
      this._fetchRecords();
      this.$emit("reLoad");
    },
    showPartsLineModel: function(row) {
      this.$refs.partLineDialog.show(row.id);
    },
    addPartsLineModel: function() {
      this.$refs.partLineDialog.show("");
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
