<template>
  <div>
    <rt-header :title="$t('new_order')">
    </rt-header>
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch(1)" @search="handleSearch(2)" @reset="handleReset">
      <template slot="toolbar">
        <rt-button type="add" @click="gotoAddPage" />
        <rt-button type="delete" @click="deleteData" />
      </template>

      <!--****搜索条件****-->
      <template slot="more">
        <el-form label-position="left" label-width="120px" ref="queryForm" :model="queryForm">
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item :label="$t('new_order.new_srv_station_id')">
                <el-input v-model="shipConfirmName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('new_order.createdon')+$t('From')" prop="aftercreatedon">
                <el-date-picker v-model="queryForm.aftercreatedon" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('new_order.createdon')+$t('To')" prop="beforecreatedon">
                <el-date-picker v-model="queryForm.beforecreatedon" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item :label="$t('new_order.new_orderstatus')">
                <rt-picklist v-model="queryForm.new_orderstatus" entity="new_order" attribute="new_orderstatus"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <!--****列表****-->
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" row-key="new_orderid" @sort-change="handleSortChange">
        <el-table-column type="selection" width="35" :selectable="isSelectedTable">
        </el-table-column>
        <el-table-column prop="new_name" :label="$t('new_order.new_name')" sortable>
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_typename" label="销售类型">
        </el-table-column>
        <el-table-column prop="new_confirmtimeUtc" :formatter="(row, column) => DateFormatter(row, 'new_confirmtimeUtc')" label="确认时间">
        </el-table-column>
        <el-table-column prop="new_orderstatusname" :label="$t('new_order.new_orderstatus')">
        </el-table-column>
        <el-table-column prop="owneridname" :label="$t('new_order.ownerid')">
        </el-table-column>
        <el-table-column prop="createdonUtc" :formatter="(row, column) => DateFormatter(row, 'createdonUtc',true)" :label="$t('new_order.createdon')" show-overflow-tooltip>
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
      shipConfirmId: "", //当前服务站ID
      shipConfirmName: "", //当前服务站名称
      queryForm: {
        aftercreatedon: null, //创建日期从
        beforecreatedon: null, //创建日期到
        new_orderstatus: ""
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

  components: {},
  mounted: function() {
    if (this.$store.state.user.departId) {
      this.shipConfirmId = this.$store.state.user.departId;
      this.shipConfirmName = this.$store.state.user.departName;
    }
    this._fetchRecords();
  },
  computed: {
    searchList: function() {
      var searchList = [];
      if (this.queryForm.aftercreatedon) {
        searchList.push({
          Type: 3,
          Value: rt.formatDateTime(this.queryForm.aftercreatedon, "yyyy-mm-dd"),
          Key: "aftercreatedon"
        });
      }
      if (this.queryForm.beforecreatedon) {
        searchList.push({
          Type: 3,
          Value: rt.formatDateTime(
            this.queryForm.beforecreatedon,
            "yyyy-mm-dd"
          ),
          Key: "beforecreatedon"
        });
      }
      if (this.queryForm.new_orderstatus) {
        searchList.push({
          Type: 1,
          Value: this.queryForm.new_orderstatus.toString(),
          Key: "new_orderstatus"
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
      if (this.queryForm.aftercreatedon > this.queryForm.beforecreatedon) {
        rt.showErrorToast(this.$t("BeginNeedLessThanEnd"));
        this.loading = false;
        return;
      }
      var requestStr = "../api/NewOrder/GetNewOrderData";
      this.isneedCookie = false; //回写为不需要cookie
      rt
        .get(requestStr, params)
        .then(res => {
          this.tableData = res.neworder;
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
    handleReset() {
      this.queryForm.applyType = "";
      this.queryForm.approvalStatus = "";
      this.queryForm.new_orderstatus = "";
      this.$refs["queryForm"].resetFields();
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
        name: "neworderedit",
        params: { id: row.new_orderid }
      });
    },
    //创建记录
    gotoAddPage() {
      //创建记录
      this.$router.push({ name: "newordercreate" });
    },
    //删除请求
    deleteData() {
      var selection = this.$refs.tableData.store.states.selection;
      if (selection == null || selection.length == 0) {
        rt.showErrorToast(this.$t("PleaseChooseAtLeastOne"));
        return;
      } else {
        var deleteList = [];
        for (var i in selection) {
          if (selection[i].new_orderstatusname == "制单") {
            deleteList.push(selection[i].new_orderid);
          } else {
            rt.showErrorToast(this.$t("CanNotDelete"));
            continue;
          }
        }
        this.$confirm(this.$t("ThisActionDeletePerpetually"), this.$t("Tip"), {
          confirmButtonText: this.$t("BUTTON_DETERMINE"),
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: this.$t("BUTTON_CANCEL"),
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            var params = deleteList;
            var requestStr = "../api/NewOrder/DelNewOrder";
            rt
              .post(requestStr, params)
              .then(res => {
                rt.showSuccessToast(res);
                this._fetchRecords();
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
    },
    //翻页处理
    handlePageChange() {
      this._fetchRecords();
    },
    isSelectedTable: function(row) {
      if (row.new_orderstatus == 1) {
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
