<template>
  <div>
    <rt-header :title="$t('PARTSSIGN')">
    </rt-header>
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch(1)" @search="handleSearch(2)" @reset="handleReset">
      <template slot="toolbar">
      </template>
      <!--****搜索条件****-->
      <template slot="more">
        <el-form label-position="left" label-width="120px" ref="queryForm" :model="queryForm">
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item label="出库时间 从" prop="afterindate">
                <el-date-picker v-model="queryForm.afterindate" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出库时间 到" prop="beforeindate">
                <el-date-picker v-model="queryForm.beforeindate" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('new_stockoutorder.new_recstatuscode')" prop="new_recstatuscode">
                <rt-picklist v-model="queryForm.new_recstatuscode" entity="new_stockoutorder" attribute="new_recstatuscode"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item :label="$t('new_stockoutorder.new_statuscode')" prop="new_statuscode">
                <rt-picklist v-model="queryForm.new_statuscode" entity="new_stockoutorder" attribute="new_statuscode"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配件申请单号" prop="partsapply">
                <el-input v-model="queryForm.partsapply"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <!--****列表****-->
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="gridTable" row-key="new_srv_shipconfirmid" @sort-change="handleSortChange" @row-dblclick="doubleClick">
        <el-table-column type="selection" width="35" :selectable="isSelectedTable">
        </el-table-column>
        <el-table-column prop="new_name" label="入库单号" sortable width="175">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_srv_partsapply_idName" label="配件申请单号" width="250">
        </el-table-column>
        <el-table-column prop="new_invintype" label="入库类型" width="250">
        </el-table-column>
        <el-table-column prop="new_srv_instationidName" show-overflow-tooltip :label="$t('new_stockoutorder.new_srv_station_id')" width="250">
        </el-table-column>
        <el-table-column prop="new_receiver" :label="$t('new_stockoutorder.new_recuser')" show-overflow-tooltip width="95">
        </el-table-column>
        <el-table-column prop="new_receiver_tel" :label="$t('new_stockoutorder.new_rectele')" show-overflow-tooltip width="250">
        </el-table-column>
        <el-table-column prop="new_reciveStatus" :label="$t('new_stockoutorder.new_recstatuscode')" width="250">
        </el-table-column>
        <el-table-column prop="new_transportdateUtc" :formatter="(row, column) => DateFormatter(row, 'new_transportdateUtc')" :label="$t('new_stockoutorder.new_indate')" width="250">
        </el-table-column>
      </el-table>
    </rt-grid>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      //搜索项
      searchtype: 1, //是全局搜索还是搜索框搜索
      queryForm: {
        new_recstatuscode: "", //签收状态
        new_statuscode: "", //出库状态
        afterindate: null, //出库日期从
        beforeindate: null, //出库日期到
        partsapply:""       //配件申请单号
      },

      /*************/
      //页面初始化数据
      /*************/
      loading: false, //加载特效
      tableData: [], //table数据设定
      shipstatusOptions: [], //下拉列表申请类型
      pageSize: 10, //每页显示数据条数
      dataTotalCount: 0, //总数局条数
      orderby: "new_namedesc", //排序
      pageCookie: null, //crm数据缓存，性能优化,
      isneedCookie: false //页面变更时启用
    };
  },

  components: {},
  mounted: function() {
    this._fetchRecords();
  },
  computed: {
    searchList: function() {
      var searchList = [];
      if (this.queryForm.new_recstatuscode) {
        searchList.push({
          Type: 1,
          Value: this.queryForm.new_recstatuscode.toString(),
          Key: "new_recstatuscode"
        });
      }
      if (this.queryForm.new_statuscode) {
        searchList.push({
          Type: 1,
          Value: this.queryForm.new_statuscode.toString(),
          Key: "new_statuscode"
        });
      }
      if (this.queryForm.afterindate) {
        searchList.push({
          Type: 3,
          Value: rt.formatDateTime(this.queryForm.afterindate, "yyyy-mm-dd"),
          Key: "afterindate"
        });
      }
      if (this.queryForm.beforeindate) {
        searchList.push({
          Type: 3,
          Value: rt.formatDateTime(
            this.queryForm.beforeindate,
            "yyyy-mm-dd"
          ),
          Key: "beforeindate"
        });
      }
      if(this.queryForm.partsapply){
        searchList.push({
          Type:0,
          Value:this.queryForm.partsapply,
          Key:"partsapply"
        });
      }
      return JSON.stringify(searchList);
    },
    querySearch: function() {
      var querySearch = "";
      if (this.$refs.grid.quickSearch) {
        querySearch += this.$refs.grid.quickSearch;
      }
      return querySearch;
    }
  },
  methods: {
    /***************/
    /***数据初始化***/
    /***************/
    //数据加载
    _fetchRecords: function() {
      var pageIndex = this.$refs.grid.getPageIndex();
      var pageSize = this.$refs.grid.getPageSize();

      this.loading = true;
      var params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        orderBy: this.orderby,
        pageCookie: "",
        searchList: this.searchList,
        querySearch: ""
      };
      if (!rt.isNullOrWhiteSpace(this.pageCookie)) {
        params.pageCookie = this.pageCookie;
      }
      if (!rt.isNullOrWhiteSpace(this.querySearch)) {
        params.querySearch = this.querySearch;
      }
      if (this.queryForm.afterindate > this.queryForm.beforeindate) {
        rt.showErrorToast(this.$t("BeginNeedLessThanEnd"));
        this.loading = false;
        return;
      }
      var requestStr = "../api/SotckOutOrder/GetStockOutOrderData";
      this.isneedCookie = false; //回写为不需要cookie
      rt
        .get(requestStr, params)
        .then(res => {
          this.tableData = res.data;
          this.pageCookie = res.pagingCookie;
          this.dataTotalCount = res.TotalRecordCount;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },

    /***************/
    /***搜索框处理***/
    /***************/
    //重置按钮点击方法
    handleReset: function() {
      this.$refs["queryForm"].resetFields();
      this.$refs.grid.quickSearch = "";
      this._fetchRecords();
    },
    //搜索按钮点击方法
    handleSearch: function(val) {
      this.searchtype = val;
      this._fetchRecords();
    },

    /*************/
    /***列表处理***/
    /*************/
    //编辑记录
    gotoEditPage: function(row) {
      //编辑记录
      this.$router.push({
        name: "partssignedit",
        params: { id: row.new_stockoutorder_id }
      });
    },
    doubleClick: function(row) {
      this.$router.push({
        name: "partssignedit",
        params: { id: row.new_stockoutorder_id }
      });
    },
    //排序处理
    handleSortChange: function(sort) {
      if (!sort.prop) {
        return;
      }
      if (sort.order == "ascending") {
        sort.order = "asc";
      } else if (sort.order == "descending") {
        sort.order = "desc";
      }
      this.orderby = sort.prop + sort.order;
      this.tableData = [];
      this._fetchRecords();
    },
    //翻页处理
    handlePageChange: function() {
      this._fetchRecords();
    },
    isSelectedTable: function() {
      return false;
    }
  }
};
</script>

<style scoped>

</style>
