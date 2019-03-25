<template>
  <div>
    <rt-header :title="$t('new_srv_sitereturn')">
    </rt-header>
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset">
      <template slot="toolbar">
        <rt-button type="add" @click="gotoAddPage" />
        <rt-button type="delete" @click="deleteData" />
      </template>

      <!--****搜索条件****-->
      <template slot="more">
        <el-form label-position="left" label-width="120px" ref="queryForm" :model="queryForm">
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item :label="$t('new_srv_sitereturn.new_returntype')" prop="new_returntype">
                <rt-picklist v-model="queryForm.new_returntype" entity="new_srv_sitereturn" attribute="new_returntype"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('new_srv_sitereturn.createdon')+$t('From')" prop="aftercreatedon">
                <el-date-picker v-model="queryForm.aftercreatedon" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('new_srv_sitereturn.createdon')+$t('To')" prop="beforecreatedon">
                <el-date-picker v-model="queryForm.beforecreatedon" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item :label="$t('new_srv_sitereturn.new_approvalstatus')" prop="new_approvalstatus">
                <rt-picklist v-model="queryForm.new_approvalstatus" entity="new_srv_sitereturn" attribute="new_approvalstatus"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <!--****列表****-->
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" row-key="new_srv_sitereturnId" @sort-change="handleSortChange">
        <el-table-column type="selection" width="35" :selectable="isSelectedTable">
        </el-table-column>
        <el-table-column prop="new_name" :label="$t('new_srv_sitereturn.new_name')" sortable width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_returntypeName" :label="$t('new_srv_sitereturn.new_returntype')" width="115">
        </el-table-column>
        <el-table-column prop="new_approvalstatusName" :label="$t('new_srv_sitereturn.new_approvalstatus')" width="128">
        </el-table-column>
        <el-table-column prop="new_senddateUTC"  :formatter="(row, column) => DateFormatter(row, 'new_senddateUTC',true)" :label="$t('new_srv_sitereturn.new_sendtime')" width="180">
        </el-table-column>
        <el-table-column prop="new_receiver" label="收货人" show-overflow-tooltip width="100">
        </el-table-column>
        <el-table-column prop="new_receiverphone" label="收货人电话" width="177">
        </el-table-column>
        <el-table-column prop="createdonUTC"  :formatter="(row, column) => DateFormatter(row, 'createdonUTC',true)" :label="$t('new_srv_sitereturn.createdon')" width="180">
        </el-table-column>
        <el-table-column prop="new_returnorderstatusName" label="物流状态">
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
        new_returntype: "", //退货类型
        aftercreatedon: null, //创建日期从
        beforecreatedon: null, //创建日期到
        new_approvalstatus: "" //退货状态
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
      if (this.queryForm.new_approvalstatus) {
        searchList.push({
          Type: 1,
          Value: this.queryForm.new_approvalstatus.toString(),
          Key: "new_approvalstatus"
        });
      }
      if (this.queryForm.new_returntype) {
        searchList.push({
          Type: 1,
          Value: this.queryForm.new_returntype.toString(),
          Key: "new_returntype"
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
        quickSearch: this.querySearch
      };
      if (!rt.isNullOrWhiteSpace(this.querySearch)) {
        params.quickSearch = this.querySearch;
      }
      // if (!rt.isNullOrWhiteSpace(this.pageCookie)) {
      //   params.pageCookie = this.pageCookie
      // }
      var requestStr = "../api/SrvSiteReturn/GetSrvSiteReturnData";
      this.isneedCookie = false; //回写为不需要cookie
      rt
        .get(requestStr, params)
        .then(res => {
          this.tableData = res.SrvSiteReturn;
          this.pageCookie = res.PagingCookie;
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
      this.$refs.grid.quickSearch = "";
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
        name: "sitereturnedit",
        params: { id: row.new_srv_sitereturnId }
      });
    },
    //创建记录
    gotoAddPage() {
      //创建记录
      this.$router.push({ name: "sitereturncreate" });
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
          if (selection[i].new_approvalstatusName == "制单") {
            deleteList.push(selection[i].new_srv_sitereturnId);
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
            var requestStr = "../api/SrvSiteReturn/DelSrvSiteReturn";
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
