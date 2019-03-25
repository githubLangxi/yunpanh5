<template>
  <div class="amountChangeLog">
    <!-- 头部标题 -->
    <rt-header title="押金授信">
        </rt-header>
     <rt-content>
<el-table stripe v-loading="loading" v-bind:data="dataForm" ref="dataForm" @sort-change="sortchange">
        <el-table-column type="selection" width="35" :selectable="isSelectedTable">
        </el-table-column>
        <el-table-column prop="new_auxcompanytext" label="奥克斯公司别">
        </el-table-column>
        <el-table-column prop="TotalDeposit" label="总押金">
        </el-table-column>
        <el-table-column prop="TotalBookDeposit" label="账面押金总额">
        </el-table-column>
        <el-table-column prop="BusinessFreezeAmount" label="业务冻结金额">
        </el-table-column>
        <el-table-column prop="AvailableAmount" label="可用押金">
        </el-table-column>
        <el-table-column prop="CreditAmount" label="授信总额">
        </el-table-column>
        <el-table-column prop="InventoryAmount" label="库存占用金额">
        </el-table-column>
        <el-table-column prop="OnTheWayAmount" label="在途金额">
        </el-table-column>
      </el-table>
      <el-form>
        <rt-section title="属性说明">
                  <el-row :gutter="50">
            <el-col :span="24">
                <el-input  type="textarea" disabled rows="4" 
                value=
"总押金：打押金流水扣减零售出库金额汇总
账面押金总额=总押金-库存占用金额
业务冻结金额：配件申请，审核中的金额汇总
可用金额=账面押金总额-业务冻结金额">
                </el-input>
            </el-col>
          </el-row>
        </rt-section>
      </el-form> 
    </rt-content>
    <rt-header v-bind:title="$t('new_srv_amountchangelog')">
    </rt-header>
    <!-- 内容部分 -->
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset('queryForm')">
      <template slot="toolbar">

      </template>
      <template slot="more">
        <el-form ref="queryForm" :rules="rules" label-position="left" label-width="120px" :model="queryForm">
          <el-row :gutter="40" type="flex" width="100">
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_amountchangelog.createdon')+$t('From')" prop="createdons">
                <el-date-picker v-model="queryForm.createdons" type="date" :placeholder="$t('SelectDate')">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_amountchangelog.createdon')+$t('To')" prop="createdone">
                <el-date-picker v-model="queryForm.createdone" type="date" :placeholder="$t('SelectDate')">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_amountchangelog.new_adjustmenttype')" prop="new_adjustmenttype">
                <rt-picklist v-model="queryForm.new_adjustmenttype" entity="new_srv_amountchangelog" attribute="new_adjustmenttype"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" @sort-change="sortchange">
        <el-table-column type="selection" width="35" :selectable="isSelectedTable">
        </el-table-column>
        <el-table-column prop="createdon" sortable="custom" v-bind:label="$t('new_srv_amountchangelog.createdon')">
          <!-- <template slot-scope="scope">
            <el-button type="text" @click="gotoDetailPage(scope.row)">{{scope.row.createdon}}</el-button>
          </template> -->
        </el-table-column>
        <el-table-column prop="new_adjustmenttypeName" v-bind:label="$t('new_srv_amountchangelog.new_adjustmenttype')">
        </el-table-column>
        <el-table-column prop="new_name" v-bind:label="$t('new_srv_amountchangelog.new_name')">
        </el-table-column>
        <el-table-column prop="new_adjustamount" v-bind:label="$t('new_srv_amountchangelog.new_adjustamount')">
        </el-table-column>
      </el-table>
    </rt-grid>
  </div>
</template>
<script>
export default {
  data() {
    var checkActualstart = (rule, value, callback) => {
      if (
        value &&
        this.queryForm.createdone &&
        new Date(value) > new Date(this.queryForm.createdone)
      ) {
        callback(new Error(this.$t("BeginNeedLessThanEnd")));
      } else {
        callback();
      }
    };
    var checkActualend = (rule, value, callback) => {
      if (
        value &&
        this.queryForm.createdons &&
        new Date(value) < new Date(this.queryForm.createdons)
      ) {
        callback(new Error(this.$t("BeginNeedLessThanEnd")));
      } else {
        callback();
      }
    };

    return {
      loading: false, //数据加载loading
      queryForm: {
        createdons: "", //创建时间开始
        createdone: "", //创建时间结束
        new_adjustmenttype: "" //来源类型
      },
      dataForm:[],
      tableData: [], //列表数据
      orderby: "",

      dataTotalCount: 0, //总条数
      pageSize: 10, //每页显示的条数

      //crm数据缓存，性能优化,  页面变更时启用
      pageCookie: "",
      isneedCookie: false,

      rules: {
        createdons: [{ validator: checkActualstart, trigger: "blur" }],
        createdone: [{ validator: checkActualend, trigger: "blur" }]
      }
    };
  },
  mounted: function() {
    this._InitData();
  },
  computed: {
    searchlist: function() {
      var searchlist = [];
      var beforecreatedon = rt.formatDateTime(
        this.queryForm.createdons,
        "yyyy-mm-dd"
      );
      var aftercreatedon = rt.formatDateTime(
        this.queryForm.createdone,
        "yyyy-mm-dd"
      );
      if (this.queryForm.createdons != "") {
        searchlist.push({
          Type: 3,
          Value: beforecreatedon,
          Key: "aftercreatedon"
        });
      }
      if (this.queryForm.createdone != "") {
        searchlist.push({
          Type: 3,
          Value: aftercreatedon,
          Key: "beforecreatedon"
        });
      }
      if (
        this.queryForm.new_adjustmenttype != "" ||
        this.queryForm.new_adjustmenttype != 0
      ) {
        searchlist.push({
          Type: 1,
          Value: this.queryForm.new_adjustmenttype.toString(),
          Key: "new_adjustmenttype"
        });
      }
      return searchlist;
    }
  },
  methods: {
    //加载数据
    _InitData: function() {
      this.getTableData();
      this.getDataForm();
    },
    //获取押金授信
    getDataForm:function(){
      var requestStr = "../api/AmountChangeLog/GetAmountCreditModel";
      this.loading = true;
      this.isneedCookie = false;
      rt
        .get(requestStr)
        .then(res => {
          this.dataForm = res;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },

    //获取列表数据
    getTableData:function(){
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
      var requestStr = "../api/AmountChangeLog/GetAmountChangeLog";
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
        name: "AmountChangeLogLine",
        params: { row: JSON.stringify(data) }
      });
    },
    isSelectedTable: function() {
      return false;
    }
  }
};
</script>
<style></style>
