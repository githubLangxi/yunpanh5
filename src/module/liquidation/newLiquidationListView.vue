<template>
  <div>
    <rt-header title="服务商清算单">
    </rt-header>
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch()" @search="handleSearch()" @reset="handleReset">
      <!--****搜索条件****-->
      <template slot="more">
        <el-form label-position="left" label-width="120px" ref="queryForm" :model="queryForm">
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item label="清算单号">
                <el-input v-model="queryForm.new_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="清算原因">
                <rt-picklist v-model="queryForm.new_liquidationreason" entity="new_liquidation" attribute="new_liquidationreason"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <!--****列表****-->
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" row-key="new_liquidationid" @sort-change="handleSortChange">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column prop="new_name" label="清算单号" sortable>
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_station_idName" label="服务商名称">
        </el-table-column>
        <el-table-column prop="new_liquidationtypeName" label="清算类型">
        </el-table-column>
         <el-table-column prop="new_liquidationstatusName" label="清算状态">
        </el-table-column>
         <el-table-column prop="new_liquidationreasonName" label="清算原因">
        </el-table-column>
        <el-table-column prop="new_begintimeUTC" :formatter="(row, column) => DateFormatter(row, 'new_begintimeUTC')" label="清算开始时间">
        </el-table-column>
        <el-table-column prop="new_productgroup_idName" label="产品线">
        </el-table-column>
        <el-table-column prop="createdonUTC" :formatter="(row, column) => DateFormatter(row, 'createdonUTC')" label="创建时间">
        </el-table-column>
      </el-table>
    </rt-grid>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      queryForm: {
        new_name: "", //清算单号
        new_liquidationreason: "" //清算原因
      },
      /*************/
      //页面初始化数据
      /*************/
      loading: false, //加载特效
      tableData: [], //table数据设定
      pageSize: 10, //每页显示数据条数
      dataTotalCount: 0, //总数局条数
      orderby: "new_namedesc", //排序
      pageCookie: null, //crm数据缓存，性能优化,
      isneedCookie: false //页面变更时启用
    };
  },
  computed: {
    searchList: function() {
      var searchList = [];
      if (this.queryForm.new_name) {
        searchList.push({
          Type: 0,
          Value: this.queryForm.new_name.toString(),
          Key: "new_name"
        });
      }
      if (this.queryForm.new_liquidationreason) {
        searchList.push({
          Type: 1,
          Value: this.queryForm.new_liquidationreason.toString(),
          Key: "new_liquidationreason"
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
  mounted: function() {
    this._fetchRecords();
  },
  methods: {
       //数据加载
    _fetchRecords() {
      var pageIndex = this.$refs.grid.getPageIndex();
      var pageSize = this.$refs.grid.getPageSize();

      this.loading = true;
      var params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        orderBy: this.orderby,
        pageCookie: "",
        searchList: this.searchList,
        querySearch: this.querySearch
      };
      if (!rt.isNullOrWhiteSpace(this.querySearch)) {
        params.querySearch = this.querySearch;
      }
      if (!rt.isNullOrWhiteSpace(this.pageCookie)) {
        params.pageCookie = this.pageCookie;
      }
      var requestStr = "../api/NewLiquidation/GetNewLiquidationData";
      this.isneedCookie = false; //回写为不需要cookie
      rt
        .get(requestStr, params)
        .then(res => {
          this.tableData = res.newliquidation;
          this.pageCookie = res.pagingCookie;
          this.dataTotalCount = res.TotalRecordCount;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    //重置按钮点击方法
    handleReset() {
      this.queryForm.new_name = "";
      this.queryForm.new_liquidationreason = "";
      this.$refs["queryForm"].resetFields();
    },
    //搜索按钮点击方法
    handleSearch() {
      this._fetchRecords();
    },
    //编辑记录
    gotoEditPage(row) {
      //编辑记录
      this.$router.push({
        name: "liquidationedit",
        params: { id: row.new_liquidationid }
      });
    },
    //翻页处理
    handlePageChange() {
      this._fetchRecords();
    },
      //排序处理
    handleSortChange(sort) {
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
    }
  }
};
</script>