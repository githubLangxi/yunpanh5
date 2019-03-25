<template>
  <div class="siteInv">
    <!-- 头部标题 -->
    <rt-header title="新旧转换单">
    </rt-header>

    <!-- 内容部分 -->
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset('queryForm')">
      <template slot="more">
        <el-form ref="queryForm" label-position="left" label-width="120px" :model="queryForm">
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item label="新旧转换单号" prop="new_name">
                <el-input v-model="queryForm.new_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" @sort-change="sortchange">
        <el-table-column type="selection" width="35" :selectable="isSelectedTable">
        </el-table-column>
        <el-table-column prop="new_name" sortable="custom" label="新旧转换单号">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoDetailPage(scope.row.new_srv_changeorderid)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_station_idName" label="服务商名称">
        </el-table-column>
        <el-table-column prop="new_bu_idName" label="中心名称">
        </el-table-column>
        <el-table-column prop="new_butypeName" label="单位类别">
        </el-table-column>
        <el-table-column prop="new_stocksitenew_idName" label="新件仓库">
        </el-table-column>
        <el-table-column prop="new_stocksiteold_idName" label="旧件仓库">
        </el-table-column>
      </el-table>
    </rt-grid>
  </div>
</template>
<script>
export default {
    data:function(){
        return{
            loading: false, //数据加载loading
            queryForm: {
                new_name: "", //转换单号
            },
            tableData: [], //列表数据
            orderby: "new_namedesc",

            dataTotalCount: 0, //总条数
            pageSize: 10, //每页显示的条数

            //crm数据缓存，性能优化,  页面变更时启用
            pageCookie: "",
            isneedCookie: false,

        };
    },
    mounted: function() {
        this._InitData();
    },
    computed: {
        searchlist: function() {
        var searchlist = [];
        if (this.queryForm.new_name) {
            searchlist.push({
            Type: 0,
            Value: this.queryForm.new_name,
            Key: "new_name"
            });
        }
        return searchlist;
        }
    },
     methods: {
    //初始化表格数据
    _InitData: function() {
      var pageIndex = this.$refs.grid.getPageIndex();
      var pageSize = this.$refs.grid.getPageSize();
      var newName = this.$refs.grid.getSearchString();
      var params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        pageCookie: this.isneedCookie == true ? this.pageCookie : "",
        orderBy: this.orderby,
        quickSearch: newName,
        searchList: JSON.stringify(this.searchlist)
      };
      if (newName == null) {
        params.quickSearch = "";
      }
      var requestStr = "../api/ChangeOrder/GetChangeOrderList";
      this.loading = true;
      this.isneedCookie = false;
      rt
        .get(requestStr, params)
        .then(res => {
          this.tableData = res.datalist;
          this.pageCookie = res.PagingCookie;
          this.dataTotalCount = res.TotalRecordCount;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },

    //排序
    sortchange: function(sort) {
      if (!sort.prop) {
        return;
      }
      this.orderby = sort.prop + (sort.order == "ascending" ? "asc" : "desc");
      this.tableData = [];
      this._InitData();
    },
    //重置
    handleReset: function(formName) {
      this.$refs[formName].resetFields();
      this.$refs.grid.setSearchString("");
      this.clearStockid();
    },

    //分页
    handlePageChange: function() {
      this._InitData();
    },

    //快速查询和详细查询
    handleSearch: function() {
      this._InitData();
    },
    //去往详细页面
    gotoDetailPage: function(data) {
      this.$router.push({
        name: "changeOrderEdit",
        params: { id: data }
      });
    },
    isSelectedTable: function() {
      return false;
    }
  }
}
</script>