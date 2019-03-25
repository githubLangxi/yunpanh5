<template>
  <div>
     <rt-section title="账务属性">
        <template slot="toolbar">
          <rt-button type="add" @click="addInteractionModel" v-if="false" />
        </template>
        <el-table ref="gridTable" :data="interactionData" v-loading="loading">
          <el-table-column type="selection" width="35" :selectable="isSelectedTable">
          </el-table-column>
          <el-table-column label="奥克斯公司别" prop="new_auxcompany" width="240">
           <template slot-scope="scope" class="">
            <el-button style="color:#1fb6d8;"  type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_auxcompany}}</el-button>
          </template>
          </el-table-column>
          <el-table-column label="安装日能力" prop="new_install_estimate_num">
          </el-table-column>
          <el-table-column label="维修日能力" prop="new_repair_estimate_num">
          </el-table-column>
          <el-table-column label="日能力变更日期" prop="new_estimate_change_date">
          </el-table-column>
          <el-table-column label="转账服务商" prop="new_transfer_station_id">
          </el-table-column>
          <el-table-column label="签约品牌" prop="new_signbrand">
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
        </el-pagination>
        </rt-section>
        <ApplyAccountDialog ref="ApplyAccount" :work-order="this.workOrder" @reLoad="reLoadinteraction"></ApplyAccountDialog>  
  </div>
</template>
<script>
export default {
  name: "ApplyAccount",
  data: function() {
    return {
      loading: false,
      interactionData: [],
      pageCookie: "",
      pageIndex: 1,
      pageSize: 5,
      pageSizes: [3, 5, 10],
      totalRecord: 0,
      layout: "total, sizes, prev, pager, next, jumper",
      isLoad: false
    };
  },
  components: {
    ApplyAccountDialog: resolve => {
      require(["./ApplyAccountDialog.vue"], resolve);
    }
  },
  props: {
    workOrder: Object
  },
  mounted: function() {
    this.interactionData = [];
    setTimeout(() => {
      this._fetchRecords();
    }, 1000);
  },
  methods: {
    //账务属性
    _fetchRecords: function() {
      if (this.workOrder && this.workOrder.id) {
        var params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          // pageCookie: this.pageCookie,
          id: this.workOrder.id
        };
        this.loading = true;
        var requestStr = "../api/StationApply/GetAccountList";
        rt.get(requestStr, params)
          .then(res => {
            this.interactionData = res.AccountModelList;
            this.totalRecord = res.TotalRecordCount;
            // this.pageCookie = res.pagingCookie;
            this.loading = false;
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.loading = false;
          });
        this.isLoad = true;
      }
    },
    //编辑记录
    gotoEditPage(row) {
      //编辑记录
      this.$refs.ApplyAccount.show(row.new_srv_station_apply2accountid);
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
          var requestStr = "";
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
    reLoadinteraction: function() {
      this._fetchRecords();
      this.$emit("reLoad");
    },
    addInteractionModel: function() {
      this.$refs.ApplyAccount.show(false);
    },
    handleSizeChange(val) {
      this.pageCookie = "";
      this.pageSize = val;
      this._fetchRecords();
    },
    handleIndexChange(val) {
      this.pageIndex = val;
      this._fetchRecords();
    },
    //列表行是否可选
    isSelectedTable: function() {
      if (
        this.workOrder.state != null &&
        (this.workOrder.state != "1" && this.workOrder.state != "4")
      ) {
        this.IsForm = false;
      } else {
        this.IsForm = true;
      }
    }
  }
};
</script>
<style>
/* .rt-section .el-button--text {
  color: #1fb6d8;
} */
</style>