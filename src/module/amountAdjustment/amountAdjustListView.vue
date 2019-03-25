<template>
  <div class="amountAdjustment">
    <!-- 头部标题 -->
    <rt-header v-bind:title="$t('new_srv_amountadjustment')">
    </rt-header>

    <!-- 内容部分 -->
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset('queryForm')">
      <template slot="toolbar">
        <!--rt-button type="add" @click="gotoAddPage" />
        <rt-button type="delete" @click="deleteData" /-->
      </template>
      <template slot="more">
        <el-form ref="queryForm" :rules="rules" label-position="left" label-width="120px" :model="queryForm">
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_amountadjustment.new_approvalstatus')" prop="new_approvalstatus">
                <rt-picklist entity="new_srv_amountadjustment" attribute="new_approvalstatus" v-model="queryForm.new_approvalstatus">
                </rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_amountadjustment.createdon')+$t('From')" prop="createdons">
                <el-date-picker v-model="queryForm.createdons" type="date" :placeholder="$t('SelectDate')">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-show="true">
              <el-form-item v-bind:label="$t('new_srv_amountadjustment.createdon')+$t('To')" prop="createdone">
                <el-date-picker v-model="queryForm.createdone" type="date" :placeholder="$t('SelectDate')">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>

      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" @sort-change="sortchange" >
        <el-table-column type="selection" width="35" :selectable="selecTable">
        </el-table-column>
        <el-table-column prop="new_name" width="180" sortable v-bind:label="$t('new_srv_amountadjustment.new_name')">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_stationidname" width="200" v-bind:label="$t('new_srv_amountadjustment.new_stationid')">
        </el-table-column>
        <el-table-column prop="new_stationcode"  width="200" v-bind:label="$t('new_srv_amountadjustment.new_stationcode')">
        </el-table-column>
        <el-table-column prop="new_amounttypeName" v-bind:label="$t('new_srv_amountadjustment.new_amounttype')">
        </el-table-column>
        <el-table-column prop="new_amount"  v-bind:label="$t('new_srv_amountadjustment.new_amount')">
        </el-table-column>
        <el-table-column prop="new_adjustmenttypeName" v-bind:label="$t('new_srv_amountadjustment.new_adjustmenttype')">
        </el-table-column>
        <el-table-column prop="new_approvalstatusName" v-bind:label="$t('new_srv_amountadjustment.new_approvalstatus')">
        </el-table-column>
        <el-table-column prop="createdonUTC" :formatter="(row, column) => DateFormatter(row, 'createdonUTC',true)" v-bind:label="$t('new_srv_amountadjustment.createdon')" sortable width="165">
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
        new_approvalstatus: "", //调整单状态
        createdons: "", //创建时间开始
        createdone: "" //创建时间结束
      },

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
    this._fetchRecords();
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
      if (this.queryForm.new_approvalstatus != "") {
        searchlist.push({
          Type: 1,
          Value: "" + this.queryForm.new_approvalstatus,
          Key: "new_approvalstatus"
        });
      }
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
      return searchlist;
    }
  },
  methods: {
    //初始化表格数据
    _fetchRecords: function() {
      var pageIndex = this.$refs.grid.getPageIndex();
      var pageSize = this.$refs.grid.getPageSize();
      var newName = this.$refs.grid.getSearchString();
      var params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        orderBy: this.orderby,
        searchList: JSON.stringify(this.searchlist),
        pageCookie: this.isneedCookie == true ? this.pageCookie : "",
        quickSearch: newName
      };
      if (newName == null) {
        params.quickSearch = "";
      }
      var requestStr = "../api/SrvAmountAdjustment/GetSrvAmountAdjustment";
      this.loading = true;
      this.isneedCookie = false;
      rt
        .get(requestStr, params)
        .then(res => {
          this.tableData = res.amountadjustment;
          this.pageCookie = res.PagingCookie;
          this.dataTotalCount = res.TotalRecordCount;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },

    //初始化表格数据
    _fetchRecords: function() {
      var pageIndex = this.$refs.grid.getPageIndex();
      var pageSize = this.$refs.grid.getPageSize();
      var newName = this.$refs.grid.getSearchString();
      var params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        orderBy: this.orderby,
        searchList: JSON.stringify(this.searchlist),
        pageCookie: this.isneedCookie == true ? this.pageCookie : "",
        quickSearch: newName
      };
      if (newName == null) {
        params.quickSearch = "";
      }
      var requestStr = "../api/SrvAmountAdjustment/GetSrvAmountAdjustment";
      this.loading = true;
      this.isneedCookie = false;
      rt
        .get(requestStr, params)
        .then(res => {
          this.tableData = res.amountadjustment;
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
      this._fetchRecords();
    },
    //重置
    handleReset: function(formName) {
      this.$refs[formName].resetFields();
    },

    //分页
    handlePageChange: function() {
      this._fetchRecords();
    },

    //快速查询和详细查询
    handleSearch: function() {
      this._fetchRecords();
    },

    //新建gotoAddPage
    gotoAddPage: function() {
      this.$router.push({ name: "AmountAdjustCreate" });
    },

    //编辑gotoEditPage
    gotoEditPage: function(row) {
      this.$router.push({
        name: "AmountAdjustEdit",
        params: { id: row.new_srv_amountadjustmentid }
      });
    },

    //删除
    deleteData: function() {
      var partsDeleteList = [];
      var selection = this.$refs.tableData.selection;
      if (selection == null || selection.length == 0) {
        this.$message({
          showClose: true,
          message: this.$t("PleaseChooseAtLeastOne"),
          type: "warning"
        });
        return;
      } else {
        this.$confirm(this.$t("ThisActionDeletePerpetually"), this.$t("Tip"), {
          confirmButtonText: this.$t("BUTTON_DETERMINE"),
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: this.$t("BUTTON_CANCEL"),
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            for (var i = 0; i < selection.length; i++) {
              partsDeleteList.push(selection[i].new_srv_amountadjustmentid);
            }
            var params = partsDeleteList;
            console.log(params);
            var that = this;
            var apiUrl = "../api/SrvAmountAdjustment/DelSrvAmountAdjustment";
            rt
              .post(apiUrl, params)
              .then(res => {
                rt.showSuccessToast(res);
                that._fetchRecords();
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: this.$t("HasCancelled")
            });
          });
      }
    },

    selecTable: function(row) {
      if (row.new_approvalstatus == 1) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style></style>
