<template>
  <div>
    <rt-section id="historyRoot" title="历史服务单" :collapsed="true">
    <el-table ref="gridTable" :data="faultData" v-loading="loading">
      <el-table-column label="服务单号" prop="new_name" width="180">
      </el-table-column>
      <el-table-column label="服务类型" prop="new_typetext" width="140">
      </el-table-column>
      <el-table-column label="处理状态" prop="new_dealstatustext" width="100">
      </el-table-column>
      <el-table-column label="网点完工说明" prop="new_network_completiondesc" width="200">
      </el-table-column>
      <el-table-column label="客户姓名" prop="new_contact" width="100">
      </el-table-column>
      <el-table-column label="省份" prop="new_province_idname" width="80">
      </el-table-column>
      <el-table-column label="城市" prop="new_city_idname" width="80">
      </el-table-column>
      <el-table-column label="县区" prop="new_county_idname" width="120">
      </el-table-column>
      <el-table-column label="街道/乡镇" prop="new_town_idname" width="120">
      </el-table-column>
      <el-table-column label="服务现场地址" prop="new_complateaddress" width="200">
      </el-table-column>
      <el-table-column label="服务描述" prop="new_memo" width="200">
      </el-table-column>
      <el-table-column label="重电次数" prop="new_rechargecycles" width="100">
      </el-table-column>
      <el-table-column label="受理人" prop="new_systemuser_idName" width="100">
      </el-table-column>
      <el-table-column label="受理时间" prop="new_accepttime" width="200">
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
    </el-pagination>
    </rt-section>
  </div>
</template>

<script>
export default {
  name: "historyModal",
  data: function() {
    return {
      loading: false,
      faultData: [],
      pageCookie: "",
      pageIndex: 1,
      pageSize: 5,
      pageSizes: [3, 5, 10],
      totalRecord: 0,
      layout: "total, sizes, prev, pager, next, jumper"
    };
  },
  props: {
    workOrder: {
      type: Object,
      require: true
    }
  },
  mounted: function() {
    this.faultData = [];
    setTimeout(() => {
      this._fetchRecords();
    }, 1000);
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
        var requestStr = "../api/WorkOrder/GetHistoryWorkOrder";
        rt.get(requestStr, params)
          .then(res => {
            this.faultData = res.workOrderList;
            this.totalRecord = res.totalRecordCount;
            this.pageCookie = res.pagingCookie;
            this.loading = false;
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.loading = false;
          });
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
