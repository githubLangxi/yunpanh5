<template>
  <div>
    <rt-section id="area5" title="服务工程师" :collapsed="true">
      <template slot="toolbar">
      </template>
      <el-table ref="gridTable" :data="outLineData" v-loading="loading" max-height="250">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column label="服务工程师编码" prop="new_srv_worker_code">
        </el-table-column>
        <el-table-column label="服务工程师名称" prop="new_srv_worker_idname">
        </el-table-column>
        <el-table-column label="组别" prop="new_group">
        </el-table-column>
        <el-table-column label="服务状态" prop="new_statecodetext">
        </el-table-column>
        <el-table-column label="完工情况" prop="new_endstatetext">
        </el-table-column>
        <el-table-column label="是否接单" prop="new_issingletext">
        </el-table-column>
        <el-table-column label="创建时间" prop="createdon">
        </el-table-column>
      </el-table>
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
        </el-pagination> -->
    </rt-section>
  </div>
</template>

<script>
export default {
  name: "outsideLineModel",
  data: function() {
    return {
      loading: false,
      isLoad: false,
      outLineData: []
    };
  },
  components: {},
  props: {
    workOrder: Object
  },
  mounted: function() {
    this.outLineData = [];
    setTimeout(() => {
      this._fetchRecords();
    }, 1000);
    //this._fetchRecords();
  },
  methods: {
    //加载外出明细数据
    _fetchRecords: function() {
      if (this.workOrder && this.workOrder.id) {
        var params = {
          // pageIndex: this.pageIndex,
          // pageSize: this.pageSize,
          // pageCookie: this.pageCookie,
          id: this.workOrder.id
        };
        this.loading = true;
        var requestStr = "../api/WorkOrder/OutsideLine";
        rt.get(requestStr, params)
          .then(res => {
            this.outLineData = res.outsideLineList;
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
    reLoadout: function() {
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
