<template>
  <div>
     <rt-section title="服务能力">
        <el-table ref="gridTable" :data="interactionData" v-loading="loading">
          <el-table-column label="奥克斯公司别" prop="new_auxcompany">
          </el-table-column>
          <el-table-column label="安装日能力" prop="new_install_estimate_num">
          </el-table-column>
          <el-table-column label="维修日能力" prop="new_repair_estimate_num">
          </el-table-column>
          <el-table-column label="日能力变更日期" prop="new_estimate_change_date">
          </el-table-column>
          <el-table-column label="区域级别" prop="new_areatype">
          </el-table-column>
          <el-table-column label="维修资质" prop="new_isindependentrepair">
          </el-table-column>
                    <el-table-column label="停止派工" prop="new_isstopdispatch">
          </el-table-column>
                    <el-table-column label="是否整改" prop="new_isrectification">
          </el-table-column>
                    <el-table-column label="代结资质" prop="new_isreplacesettle">
          </el-table-column>
                    <el-table-column label="退换机自行处理" prop="new_isindependentexchange">
          </el-table-column>
                    <el-table-column label="退换机买断服务商" prop="new_return_station_id">
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