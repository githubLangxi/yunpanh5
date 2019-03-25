<template>
  <div>
    <rt-header title="监理单">
    </rt-header>
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset">
      <template slot="toolbar">
      </template>
      <!--****搜索条件****-->
      <template slot="more">
        <el-form label-position="left" label-width="120px" ref="queryForm" :model="queryForm">
          <el-row :gutter="40" type="flex">
             <el-col :span="8">
              <el-form-item label="监理阶段" prop="queryForm.new_supervisionstage">
                <el-select class="rt-portal-item-select" v-model="queryForm.new_supervisionstage" clearable>
                  <el-option v-for="item in statusOptions" :key="item.Value" :label="item.Text " :value="item.Value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <!--****列表****-->
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" row-key="id" @sort-change="handleSortChange">
        <el-table-column type="selection" width="35" :selectable="isSelectedTable">
        </el-table-column>
        <el-table-column prop="new_name" label="监理单号" sortable width="220">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_projectname" label="项目名称">
        </el-table-column>
        <el-table-column prop="new_supervisionmodelsText" label="监理主要机型">
        </el-table-column>
        <el-table-column prop="new_sales" label="业务员">
        </el-table-column>
        <el-table-column prop="new_supervisionstageText" label="监理阶段">
        </el-table-column>
        <el-table-column prop="new_accountname" label="经销商名称">
        </el-table-column>
        <el-table-column prop="createdon" :formatter="(row, column) => DateFormatter(row, 'createdon' )" sortable label="创建时间">
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
      queryForm: {
        id: "",
        new_name: "", //单号
        new_supervisionstage: "" //监理阶段
      },

      /*************/
      //页面初始化数据
      /*************/
      loading: false, //加载特效
      tableData: [], //table数据设定
      typeOptions: [], //下拉列表申请类型
      statusOptions: [], //审批状态
      pageSize: 10, //每页显示数据条数
      dataTotalCount: 0, //总数局条数
      orderby: "new_name,descending", //排序
      pageCookie: "", //crm数据缓存，性能优化,
      isneedCookie: false //页面变更时启用
    };
  },

  mounted: function() {
    this._fetchRecords();
    this.bindSelectType();
  },
  computed: {
    //筛选条件
    filter: function() {
      var filter  = '';
      if (this.$refs.grid.quickSearch) {
        filter += "new_name=" + this.$refs.grid.quickSearch + ",";
      }
      if (this.queryForm.new_supervisionstage) {
        filter += "new_supervisionstage=" + this.queryForm.new_supervisionstage + ",";
      }
      if (filter.length > 0) {
        return filter.substring(filter, filter.length - 1);
      }
      return "";
    }
  },
  methods: {
    /***************/
    /***数据初始化***/
    /***************/
    //数据加载
    _fetchRecords() {
      var pageIndex = this.$refs.grid.getPageIndex();
      var pageSize = this.$refs.grid.getPageSize();
      this.loading = true;
      var params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        filter: this.filter,
        orderby: this.orderby
      };
      var requestStr = "../api/Supervision/GetSupervision";
      this.isneedCookie = false; //回写为不需要cookie
      rt
        .get(requestStr, params)
        .then(res => {
          console.log(res);
          this.tableData = res.SupervisionList;
          this.pageCookie = res.PagingCookie;
          this.dataTotalCount = res.TotalRecordCount;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    //加载下拉框数据
    bindSelectType: function() {
      var statusLoad =
        "../api/crmpicklist/options/new_srv_supervision/new_supervisionstage";
      rt
        .get(statusLoad)
        .then(res => {
          this.statusOptions = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },

    /***************/
    /***搜索框处理***/
    /***************/
    //重置按钮点击方法
    handleReset() {
      this.$refs.grid.quickSearch = "";
      this.queryForm.new_supervisionstage = "";
      this.$refs["queryForm"].resetFields();
      this._fetchRecords();
    },
    //搜索按钮点击方法
    handleSearch(val) {
      this._fetchRecords();
    },

    /*************/
    /***列表处理***/
    /*************/

    //编辑记录
    gotoEditPage(row) {
      //编辑记录
      this.$router.push({
        name: "supervisionEdit",
        params: { id: row.Id }
      });
    },
    //排序处理
    handleSortChange(sort) {
      if (!sort.prop) {
        return;
      }
      this.orderby = sort.prop + "," + sort.order;
      this.tableData = [];
      this._fetchRecords();
    },
    //翻页处理
    handlePageChange() {
      this._fetchRecords();
    },
    //列表行是否可选
    isSelectedTable: function(row) {
      if (row.new_approvalstatus == 1) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
</style>
