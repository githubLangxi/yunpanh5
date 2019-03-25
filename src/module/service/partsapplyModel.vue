<template>
  <rt-section id="area10" title="配件申请记录" :collapsed="true">
    <div>
      <template slot="toolbar">
      </template>
      <el-table ref="gridTable" :data="partsApplyData" v-loading="loading">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column label="申请单号" prop="new_srv_partsapply_idName">
        </el-table-column>
        <el-table-column label="配件编码" prop="new_code">
        </el-table-column>
        <el-table-column label="配件名称" prop="new_applyproduct_idName">
        </el-table-column>
        <el-table-column label="申请数量" prop="new_qty">
        </el-table-column>
        <el-table-column label="已发数量" prop="new_shippedqty">
        </el-table-column>
        <el-table-column label="未发数量" prop="new_pendingqty">
        </el-table-column>
        <el-table-column label="已入库数量" prop="new_stockqty_in">
        </el-table-column>
        <el-table-column label="未入库数量" prop="new_stockqty_notin">
        </el-table-column>
        <el-table-column label="是否完成" prop="new_iscompletedText">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
      </el-pagination>
    </div>
  </rt-section>
</template>

<script>
export default {
  name: "partsapplyModel",
  data: function() {
    return {
      loading: false,
      partsApplyData: [],
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
    this.partsApplyData = [];
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
        var requestStr = "../api/WorkOrder/PartsApplyDetil";
        rt.get(requestStr, params)
          .then(res => {
            this.partsApplyData = res.partsApplyDetilList;
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
    reLoadpartsApply: function() {
      this._fetchRecords();
      this.$emit("reLoad");
    },
    showPartsApplyModel: function(row) {
      this.$refs.partsApplyModel.show(row.id);
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
