<template>
  <div>
    <rt-section id="area9" title="服务互动" :collapsed="true">  
        <template slot="toolbar">
          <rt-button type="add" @click="addInteractionModel" />
        </template>
        <el-table ref="gridTable" :data="interactionData" v-loading="loading">
          <el-table-column type="selection" width="35">
          </el-table-column>
          <el-table-column label="类型" prop="new_interactiontypetext">
          </el-table-column>
          <el-table-column label="跟单内容" prop="new_contenttext">
          </el-table-column>
          <el-table-column label="补充信息" prop="new_desc">
          </el-table-column>
          <el-table-column label="跟单描述" prop="new_details">
          </el-table-column>
          <el-table-column label="处理时间" prop="createdon">
          </el-table-column>
          <el-table-column label="操作人" prop="new_operator">
          </el-table-column>
          <el-table-column label="处理单位" prop="new_unittext">
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
        </el-pagination>
        <interactionDialog ref="interactionModel" :work-order="this.workOrder" @reLoad="reLoadinteraction"></interactionDialog>  
    </rt-section>
  </div>
</template>

<script>
// import interactionDialog from "./interactionDialog";

export default {
  name: "interactionModel",
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
    interactionDialog: resolve => {
      require(["./interactionDialog.vue"], resolve);
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
          id: this.workOrder.id,
          orderby: "createdon,descending"
        };
        this.loading = true;
        var requestStr = "../api/WorkOrder/Interaction";
        rt.get(requestStr, params)
          .then(res => {
            this.interactionData = res.interactionList;
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
          var requestStr = "../api/WorkOrder/DeleteInteraction";
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
    showInteractionModel: function(row) {
      this.$refs.interactionModel.show(row.id);
    },
    addInteractionModel: function() {
      this.$refs.interactionModel.show("");
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
