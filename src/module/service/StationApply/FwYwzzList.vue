<template>
<div>
<rt-section title="业务资质">
        <el-table ref="gridTable" :data="interactionData" v-loading="loading">
          <el-table-column label="奥克斯公司别" prop="new_auxcompany">
          </el-table-column>
          <el-table-column label="安装购买单位类别" prop="new_channeltype">
          </el-table-column>
          <el-table-column label="安装模块机" prop="new_ismodularity">
          </el-table-column>
          <el-table-column label="安装大多联" prop="new_multiconnected">
          </el-table-column>
          <el-table-column label="其它业务资质" prop="new_qt">
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
        </el-pagination>
</rt-section>
</div>  
</template>
<script>
export default {
  name: "YwzzList",
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
  components: {},
  props: {
    applyId:  {
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
    //平台信息
    _fetchRecords: function() {
      if (true) {
        var params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          // pageCookie: this.pageCookie,
          id: this.applyId
        };
        this.loading = true;
        var requestStr = "../api/StationApply/FwYwzzList";
        rt.get(requestStr, params)
          .then(res => {
            this.interactionData = res.QualificationModelList;
            this.totalRecord = res.TotalRecordCount;
            this.loading = false;
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.loading = false;
          });
        this.isLoad = true;
      }
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