<template>
  <rt-section id="areats" title="厨电调试">
    <div>
      <template slot="toolbar">
      </template>
      <el-table ref="gridTable" :data="KitchenDebugDetilData"  row-key="id"  v-loading="loading">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column label="编号" prop="new_code">
        </el-table-column>
        <el-table-column label="名称" prop="new_name">
           <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="调试规范" prop="new_content">
        </el-table-column>
        <el-table-column label="是否必须拍照" prop="new_isphotostr">

        </el-table-column>
       
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
      </el-pagination>
    </div>
<!--        <Kitchattachment ref="Kitchattachment"  @reload="reLoad"></Kitchattachment> -->
        <Kitchattachment ref="Kitchattachment" :workOrder="this.workOrder" @reLoad="reLoadTroubleLine"></Kitchattachment>
  </rt-section>
  
</template>

<script>
//import Kitchattachment from "./Kitchattachment";
export default {
  name: "KitchenDebugModel",
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
  components: {
    Kitchattachment: resolve => {
      require(["./Kitchattachment.vue"], resolve);
    }
  },
  methods: {
    //弹出附件
    gotoEditPage: function(row) {
      this.$refs.Kitchattachment.show(row);

      //this.$router.push({ name: "orderedit", params: { id: row.id } });
    },
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
        var requestStr = "../api/WorkOrder/KitchenDebugDetil";
        rt.get(requestStr, params)
          .then(res => {
            this.KitchenDebugDetilData = res.commissioning;
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
    showKitchenDebugModel: function(row) {
      this.$refs.KitchenDebugModel.show(row.id);
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
