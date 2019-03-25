<template>
  <div>
     <rt-section title="平台信息">
        <el-table ref="gridTable" :data="interactionData" v-loading="loading">
          <el-table-column label="奥克斯公司别" prop="new_company">
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
  </div>
</template>
<script>
export default {
  name: "FwplatformList",
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
  },
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
        var requestStr = "../api/StationApply/GetFwPlatformList";
        rt.get(requestStr, params)
          .then(res => {
            this.interactionData = res.PlatformModelList;
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
