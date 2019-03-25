<template>
  <div>
     <rt-section title="平台信息">
        <template slot="toolbar">
          <rt-button type="add" @click="addInteractionModel" v-if="this.isIF" />
          <rt-button type="delete" @click="deleteData"  v-if="this.isIF" />
        </template>
        <el-table ref="gridTable" :data="interactionData" v-loading="loading">
          <el-table-column type="selection" width="35" :selectable="isSelectedTable">
          </el-table-column>
          <el-table-column label="奥克斯公司别" prop="new_company" width="240">
           <template slot-scope="scope" class="">
            <el-button style="color:#1fb6d8;"  type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_company}}</el-button>
          </template>
          </el-table-column>
          <el-table-column label="平台分类" prop="new_platform_type">
          </el-table-column>
          <el-table-column label="平台网点编码" prop="new_platform_shop_code">
          </el-table-column>
          <el-table-column label="平台网点名称" prop="new_platform_shop_name">
          </el-table-column>
          <el-table-column label="平台网点属性" prop="new_platform_shop_property">
          </el-table-column>
          <el-table-column label="合作关系" prop="new_platform_shop_partner">
          </el-table-column>
          <el-table-column label="二级服务商" prop="new_second_level_station">
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
        </el-pagination>
        </rt-section>
        <PlatformListDialog ref="PlatformList" :work-order="this.workOrder" @reLoad="reLoadinteraction"></PlatformListDialog>  
  </div>
</template>
<script>
export default {
  name: "PlatformList",
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
      isLoad: false,
      isIF: true
    };
  },
  components: {
    PlatformListDialog: resolve => {
      require(["./PlatformListDialog.vue"], resolve);
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
    this.bindSelectType();
  },
  methods: {
    //平台信息
    _fetchRecords: function() {
      if (this.workOrder && this.workOrder.id) {
        var params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          // pageCookie: this.pageCookie,
          id: this.workOrder.id
        };
        this.loading = true;
        var requestStr = "../api/StationApply/GetPlatformList";
        rt.get(requestStr, params)
          .then(res => {
            this.interactionData = res.PlatformModelList;
            this.totalRecord = res.TotalRecordCount;
            if (
              this.workOrder.state != null &&
              (this.workOrder.state != "1" && this.workOrder.state != "4")
            ) {
              this.isIF = false;
            } else {
              this.isIF = true;
            }
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
      this.$refs.PlatformList.show(row.new_srv_station_apply2platformid);
    },
    //加载下拉框数据
    bindSelectType: function() {
      var statusLoad = "../api/crmpicklist/options/new_srv_station_apply/state";
      rt.get(statusLoad)
        .then(res => {
          this.statusOptions = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    deleteData() {
      //删除请求
      var selection = this.$refs.gridTable.selection;
      if (selection == null || selection.length == 0) {
        this.$message({
          type: "warning",
          message: "请至少选择一条记录"
        });
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
          var deleteList = "";
          for (var i in selection) {
            deleteList += selection[i].new_srv_station_apply2platformid + ",";
          }
          var params = {
            idList: deleteList,
            id: this.workOrder.id
          };
          var requestStr = "../api/StationApply/DelPlatformList";
          rt.get(requestStr, params)
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
      if (this.workOrder.id == "") {
        this.$message({
          type: "warning",
          message: "请先保存主档"
        });
        return;
      }
      this.$refs.PlatformList.show(false);
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
        return false;
      } else {
        return true;
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
