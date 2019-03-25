<template>
<div>
<rt-section title="协议（失效+待生效+生效）">
        <el-table ref="gridTable" :data="interactionData" v-loading="loading">
          <el-table-column label="协议编码" prop="new_contract_code">
          </el-table-column>
          <el-table-column label="协议年度" prop="new_contract_year">
          </el-table-column>
          <el-table-column label="状态" prop="new_contract_status">
          </el-table-column>
          <el-table-column label="签署公司" prop="new_contract_company">
          </el-table-column>
          <el-table-column label="协议名称" prop="new_contract_id">
          </el-table-column>
          <el-table-column label="协议金额A" prop="new_contract_amount1">
          </el-table-column>
                    <el-table-column label="协议金额B" prop="new_contract_amount2">
          </el-table-column>
                    <el-table-column label="协议生效日期" prop="new_contract_valid_date">
          </el-table-column>
                    <el-table-column label="协议失效日期" prop="new_contract_invalid_date">
          </el-table-column>
                    <el-table-column label="协议补充内容" prop="new_contract_content">
          </el-table-column>
                    <el-table-column label=" 应交质保金" prop="new_yjguarantee_amount ">
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
        </el-pagination>
</rt-section>
</div>  
</template>
<script>
export default {
  name: "FwXyList",
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
        var requestStr = "../api/StationApply/FwXyList";
        rt.get(requestStr, params)
          .then(res => {
            this.interactionData = res.ContractModelList;
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