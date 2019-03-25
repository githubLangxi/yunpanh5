<template>
  <rt-section id="area13" title="修改记录" :collapsed="true">
    <div>
      <template slot="toolbar">
      </template>
      <el-table ref="gridTable" :data="workorderLogData" v-loading="loading">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column label="修改字段" prop="new_fieldnamedesc">
        </el-table-column>
        <el-table-column label="修改前" prop="new_oldvalue">
        </el-table-column>
        <el-table-column label="修改后" prop="new_newvalue">
        </el-table-column>
        <el-table-column label="修改时间" prop="createdon">
        </el-table-column>
        <el-table-column label="修改人" prop="owneridName">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
      </el-pagination>
    </div>
  </rt-section>
</template>

<script>
export default {
  name: "workorderlogModel",
  data: function() {
    return {
      loading: false,
      workorderLogData: [],
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
  mounted: function() {
    this.workorderLogData = [];
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
        var requestStr = "../api/WorkOrder/Workorderlog";
        rt.get(requestStr, params)
          .then(res => {
            this.workorderLogData = res.workorderLogList;
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
          var requestStr = "../api/WorkOrder/DeleteWorkorderlog";
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
    reLoadworkorderLog: function() {
      this._fetchRecords();
      this.$emit("reLoad");
    },
    showWorkorderlog: function(row) {
      this.$refs.WorkorderlogModel.show(row.id);
    },
    addWorkorderlog: function() {
      this.$refs.Workorderlog.show("");
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
