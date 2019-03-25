<template>
    <el-table ref="tableData" v-bind:data="tableData" stripe @sort-change="handleSortChange" v-loading="loading">
      <el-table-column prop="new_station_idName" label="服务商" show-overflow-tooltip width="250">
      </el-table-column>
      <el-table-column prop="new_auxcompanyName" label="奥克斯公司别" width="130">
      </el-table-column>
      <el-table-column prop="new_sapcompanycode" label="sap公司编码" width="150">
      </el-table-column>
      <el-table-column prop="new_channeltypeName" label="购买单位类型" width="130">
      </el-table-column>
      <el-table-column prop="new_typeName" label="服务类型" width="130">
      </el-table-column>
      <el-table-column prop="new_productgroupidName" label="产品线" width="130">
      </el-table-column>
      <el-table-column prop="new_multiconnectedName" label="是否大多联" width="130">
      </el-table-column>
       <el-table-column prop="new_ismodularityName" label="是否模块机" width="130">
      </el-table-column>
      <el-table-column prop="createdon" label="创建时间" width="160">
      </el-table-column>
    </el-table>
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
            self.tableData = res.stationqualificationlist;
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
        this.loadData();
        }
     }
};
</script>