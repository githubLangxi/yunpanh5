<template>
  <div>
     <rt-section title="签约品牌">
        <el-table ref="gridTable" :data="interactionData" v-loading="loading">
          <el-table-column label="奥克斯公司别" prop="new_auxcompany" width="240">
          </el-table-column>
          <el-table-column label="签约品牌" prop="new_signbrand">
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
        </el-pagination>
        </rt-section>
  </div>
</template>
<script>
export default {
  name: "Fwapplystation",
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
  components: {},
  props: {
    applyId: {
      type: String,
      value: ""
    }
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
      if (true) {
        var params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          // pageCookie: this.pageCookie,
          id: this.applyId
        };
        this.loading = true;
        var requestStr = "../api/StationApply/GetFwAccountList";
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
    reLoadinteraction: function() {
      this._fetchRecords();
      this.$emit("reLoad");
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
<style>
/* .rt-section .el-button--text {
  color: #1fb6d8;
} */
</style>