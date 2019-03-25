<template>
	<div class="expenseclaim">
		<!-- 头部标题 -->
        <rt-header v-bind:title="$t('new_srv_expense_claim')">
        </rt-header>

         <!-- 内容部分 -->
        <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset">
            <template slot="more">
                <el-form ref="queryForm" label-position="left" label-width="120px" :model="queryForm">
                    <el-row :gutter="40" type="flex">
                        <el-col :span="8">
                            <el-form-item label="结算单类型" prop="new_type">
                                <rt-picklist entity="new_srv_expense_claim" attribute="new_type" v-model="queryForm.new_type">
                               </rt-picklist>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="服务单类型" prop="new_servicetype">
                                <rt-picklist entity="new_srv_expense_claim" attribute="new_servicetype" v-model="queryForm.new_servicetype">
                                </rt-picklist>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="结算单状态" prop="new_formstatus">
                                <rt-picklist entity="new_srv_expense_claim" attribute="new_formstatus" v-model="queryForm.new_formstatus">
                                </rt-picklist>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>
            <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" @sort-change="sortchange">
                <el-table-column prop="new_name" width="130" sortable label="费用结算单">
                   <template slot-scope="scope">
                        <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="new_typetext"  label="结算单类型">
                </el-table-column>
                <el-table-column prop="new_servicetypetext"  label="服务单类型">
                </el-table-column>
                <el-table-column prop="new_workorder_idname" width="200" label="关联服务单">
                </el-table-column>
                <el-table-column prop="new_setmark" width="300" label="套机标识">
                </el-table-column>
                <el-table-column prop="new_formstatustext"  label="结算单状态">
                </el-table-column>
                <el-table-column prop="new_settlewaytext"   label="结算方式">
                </el-table-column>
                <el-table-column prop="new_first_basicexp"  label="初审基本费用">
                </el-table-column>
                <el-table-column prop="new_first_totalamount"  label="初审总费用">
                </el-table-column>
                <el-table-column prop="createdonUTC" width="250" label="创建时间">
                </el-table-column>
            </el-table>
        </rt-grid>
	</div>
</template>
<script>
export default {
  data() {
    return {
      queryForm: {
        new_type: "",
        new_servicetype: "",
        new_formstatus: ""
      },

      loading: false,
      tableData: [],
      loading: false,

      dataTotalCount: 0, //总条数
      currentPage: 1, //当前显示的页
      pageSize: 10, //每页显示的条数

      //crm数据缓存，性能优化,//页面变更时启用
      pageCookie: "",
      isneedCookie: false,

      orderby: ""
    };
  },
  mounted: function() {
    this._fetchRecords();
  },
  computed: {
    filter: function() {
      var filter = "";
      if (this.$refs.grid.quickSearch) {
        filter += "quicksearch=" + this.$refs.grid.quickSearch + ",";
      }
      if (this.queryForm.new_type) {
        filter += "new_type=" + this.queryForm.new_type + ",";
      }
      if (this.queryForm.new_servicetype) {
        filter += "new_servicetype=" + this.queryForm.new_servicetype + ",";
      }
      if (this.queryForm.new_formstatus) {
        filter += "new_formstatus=" + this.queryForm.new_formstatus + ",";
      }
      if (filter.length > 0) {
        return filter.substring(filter, filter.length - 1);
      }
      return "";
    }
  },
  methods: {
    //初始化数据
    _fetchRecords: function() {
      var pageIndex = this.$refs.grid.getPageIndex();
      var pageSize = this.$refs.grid.getPageSize();
      var params = {
        pageSize: pageSize,
        pageIndex: pageIndex,
        orderby: this.orderby,
        filter: this.filter,
        pageCookie: this.isneedCookie == true ? this.pageCookie : ""
      };
      this.isneedCookie = false;
      this.loading = true;
      var that = this;
      var apiUrl = "../api/ExpenseClaim/GetExpenseClaim";
      rt
        .get(apiUrl, params)
        .then(res => {
          that.tableData = res.expenseClaimList;
          that.dataTotalCount = res.totalRecordCount;
          that.pageCookie = res.pagingCookie;
          that.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          that.loading = false;
        });
    },

    //查询和快速查询
    handleSearch: function() {
      this._fetchRecords();
    },

    //每页显示的条数
    handlePageChange: function() {
      this._fetchRecords();
    },

    //搜索重置
    handleReset: function() {
      this.$refs.grid.quickSearch = "";
      this.$refs["queryForm"].resetFields();
    },

    //编辑
    gotoEditPage: function(row) {
      this.$router.push({ name: "ExpenseClaimEdit", params: { id: row.id } });
    },

    //排序处理
    sortchange: function(val) {
      if (val.prop) {
        if (val.prop == "new_name") {
          this.orderby = "new_name" + "," + val.order;
        }
        this.tableData = [];
        this._fetchRecords();
      }
    }
  }
};
</script>
<style></style>
