<template>
	<div class="expenseclaim">
		<!-- 头部标题 -->
        <rt-header title="结算汇总单">
        </rt-header>

         <!-- 内容部分 -->
        <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset">
            <template slot="more">
                <el-form ref="queryForm" label-position="left" label-width="120px" :model="queryForm">
                    <el-row :gutter="40" type="flex">
                        <el-col :span="8">
                            <el-form-item label="结算批次" prop="new_batchno">
                                <el-input v-model="queryForm.new_batchno"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="费用分类" prop="new_expensetype">
                                <rt-picklist entity="new_srv_expense_summary" attribute="new_expensetype" v-model="queryForm.new_expensetype">
                                </rt-picklist>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-show="true" >
                            <el-form-item label="单据状态" prop="new_formstatus">
                                <rt-picklist entity="new_srv_expense_summary" attribute="new_formstatus" v-model="queryForm.new_formstatus">
                                </rt-picklist>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>
            <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" @sort-change="sortchange">
                <el-table-column prop="new_name" width="150" sortable label="结算汇总单">
                   <template slot-scope="scope">
                        <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="new_batchno"  label="结算批次">
                </el-table-column>
                <el-table-column prop="new_expensetypetext"  label="费用分类">
                </el-table-column>
                <el-table-column prop="new_formstatustext"  label="单据状态">
                </el-table-column>
                <el-table-column prop="new_systemuser_idname"  width="120" label="汇总人员">
                </el-table-column>
                <el-table-column prop="new_summarymodetext"   label="汇总方式">
                </el-table-column>
                <el-table-column prop="new_summarydateUTC"   width="170" label="汇总日期">
                </el-table-column>
                <el-table-column prop="new_totalamount"  label="汇总金额">
                </el-table-column>
                <el-table-column prop="new_invoice_thisamount"  label="开票金额">
                </el-table-column>
                <el-table-column prop="createdonUTC" width="200" label="创建时间">
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
        new_batchno: "",
        new_expensetype: "",
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
      if (this.queryForm.new_batchno) {
        filter += "new_batchno=" + this.queryForm.new_batchno + ",";
      }
      if (this.queryForm.new_expensetype) {
        filter += "new_expensetype=" + this.queryForm.new_expensetype + ",";
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
      var apiUrl = "../api/ExpenseSummary/GetExpenseSummary";
      rt
        .get(apiUrl, params)
        .then(res => {
          that.tableData = res.expenseSummaryList;
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
      this.$refs["queryForm"].resetFields();
    },

    //编辑
    gotoEditPage: function(row) {
      this.$router.push({ name: "ExpenseSummaryEdit", params: { id: row.id } });
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
