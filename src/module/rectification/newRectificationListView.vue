<template>
  <div>
    <rt-header title="服务商整改单">
    </rt-header>
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch()" @search="handleSearch()" @reset="handleReset">
      <!--****搜索条件****-->
      <template slot="more">
        <el-form label-position="left" label-width="120px" ref="queryForm" :model="queryForm">
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item label="整改单号">
                <el-input v-model="queryForm.new_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="整改类型">
                <rt-picklist v-model="queryForm.new_rectificationtype" entity="new_rectification" attribute="new_rectificationtype"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <!--****列表****-->
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" row-key="new_rectificationid" @sort-change="handleSortChange">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column prop="new_name" label="整改单号" sortable>
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_begintimeUTC" :formatter="(row, column) => DateFormatter(row, 'new_begintimeUTC')" label="发布时间">
        </el-table-column>
        <el-table-column prop="new_planendtimeUTC" :formatter="(row, column) => DateFormatter(row, 'new_planendtimeUTC')" label="计划结束时间">
        </el-table-column> 
        <el-table-column prop="new_theme" label="主题">
        </el-table-column>
        <el-table-column prop="new_correctivereasonName" label="整改原因">
        </el-table-column>
         <el-table-column prop="new_rectificationtypeName" label="整改类型">
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
        new_name: "", //整改单号
        new_rectificationtype: "" //整改类型
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
      if (this.queryForm.new_rectificationtype) {
        searchList.push({
          Type: 1,
          Value: this.queryForm.new_rectificationtype.toString(),
          Key: "new_rectificationtype"
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
      var requestStr = "../api/NewRectification/GetNewRectificationData";
      this.isneedCookie = false; //回写为不需要cookie
      rt
        .get(requestStr, params)
        .then(res => {
          this.tableData = res.newrectification;
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
      this.queryForm.new_rectificationtype = "";
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
        name: "rectificationedit",
        params: { id: row.new_rectificationid }
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
