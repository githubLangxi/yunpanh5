<template>
  <rt-section title="财务属性">
    <el-table ref="tableData" v-bind:data="tableData" stripe @sort-change="handleSortChange" v-loading="loading">
      <el-table-column prop="new_station_idName" label="服务商" show-overflow-tooltip width="250">
      </el-table-column>
      <el-table-column prop="new_account_idName" label="转款经销商" show-overflow-tooltip width="150">
      </el-table-column>
      <el-table-column prop="new_accountnumber" label="经销商编码" width="130">
      </el-table-column>
      <el-table-column prop="new_auxcompanyName" label="奥克斯公司别" width="130">
      </el-table-column>
      <el-table-column prop="new_sapcompanycode" label="sap公司编码" width="130">
      </el-table-column>
      <el-table-column prop="new_beginamount" label="押金总额" width="130">
      </el-table-column>
      <el-table-column prop="new_currentamount" label="当前账面押金额度" width="150">
      </el-table-column>
      <el-table-column prop="createdon" label="创建时间" width="160">
      </el-table-column>
    </el-table>
  </rt-section>
</template>
<script type="text/javascript">
export default {
     data() {
         return{
              loading: false,
              tableData: [],
         }
     },
     props: {
        mainid: ""
     },
     mounted() {
         this.loadData();
     },
     methods:{
          //加载数据
        loadData() {
        var self = this;
        self.loading = true;
        self
            .loadLineData()
            .then(function(res) {
            self.tableData = res.stationaccountlist;
            self.loading = false;
            })
            .catch(error => {
            rt.showErrorToast(error);
            self.loading = false;
            });
        },
         //加载明细列表
        loadLineData: function() {
        var requestStr = "../api/NewSrvStation/GetStationDetail";
        return rt.get(requestStr);
        },
         //排序处理
        handleSortChange(sort) {
        //排序处理
        if (!sort.prop) {
            return;
        }
        this.orderby = sort.prop + "," + sort.order;
        this.tableData = [];
        this.loadData()
     }
     }
};
</script>