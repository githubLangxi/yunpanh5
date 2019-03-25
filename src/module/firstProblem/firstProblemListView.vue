<template>
	<div class="firstProblem">
		<!-- 头部标题 -->
        <rt-header title="初审问题点">
        </rt-header>

         <!-- 内容部分 -->
        <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset">
            <template slot="more">
                <el-form ref="queryForm" label-position="left" label-width="120px" :model="queryForm">
                    <el-row :gutter="40" type="flex">
                        <el-col :span="8">
                            <el-form-item label="结算单号" prop="new_expense_claim_id">
                                <el-input v-model="queryForm.new_expense_claim_id"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="服务商" prop="new_station_id">
                                <el-input v-model="queryForm.new_station_id"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-show="true" >
                            <el-form-item label="申诉状态" prop="new_appealstatus">
                                <rt-picklist entity="new_srv_firstproblem" attribute="new_appealstatus" v-model="queryForm.new_appealstatus">
                                </rt-picklist>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>
            <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" @sort-change="sortchange">
                <el-table-column prop="new_name" width="150" sortable label="问题编码">
                   <template slot-scope="scope">
                        <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="new_expense_claim_idName"  label="关联结算单号">
                </el-table-column>
                <el-table-column prop="new_firstrule_idName" width="300" label="初审规则">
                </el-table-column>
                <el-table-column prop="new_deductamount" label="扣款金额">
                </el-table-column>
                <el-table-column prop="new_appealstatusText" label="申诉状态">
                </el-table-column>
                <el-table-column prop="new_executestatusText"   label="执行状态">
                </el-table-column>
                <el-table-column prop="createdon" width="200" label="创建时间">
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
        new_expense_claim_idName: "",
        new_station_idName: "",
        new_appealstatus: ""
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
      if (this.queryForm.new_expense_claim_id) {
        filter +=
          "new_expense_claim_id=" + this.queryForm.new_expense_claim_id + ",";
      }
      if (this.queryForm.new_station_id) {
        filter += "new_station_id=" + this.queryForm.new_station_id + ",";
      }
      if (this.queryForm.new_appealstatus) {
        filter += "new_appealstatus=" + this.queryForm.new_appealstatus + ",";
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
      this.loading = true;
      var params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        filter: this.filter,
        orderby: this.orderby
      };
      this.isneedCookie = false;
      this.loading = true;
      var that = this;
      var apiUrl = "../api/FirstProblem/GetFirstProblem";
      rt
        .get(apiUrl, params)
        .then(res => {
          that.tableData = res.FirstProblemList;
          that.dataTotalCount = res.TotalRecordCount;
          that.pageCookie = res.PagingCookie;
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
      this.$router.push({
        name: "firstProblemEdit",
        params: { id: row.Id }
      });
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
