<template>
  <div class="partStockTransaction">
    <!-- 头部标题 -->
    <rt-header :title="$t('PARTSTOCKTRANSACTION')">
    </rt-header>

    <!-- 内容部分 -->
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset('queryForm')">
      <template slot="toolbar">

      </template>
      <template slot="more">
        <el-form ref="queryForm" label-position="left" label-width="120px" :model="queryForm">
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item label="配件编码" prop="new_partcode">
                <el-input v-model="queryForm.new_partcode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配件名称" prop="new_productname">
                <el-input v-model="queryForm.new_productname"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="交易方向" prop="new_invtransdirection">
                <rt-picklist v-model="queryForm.new_invtransdirection" entity="new_part_stocktransaction" attribute="new_invtransdirection"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="交易类型" prop="new_transactiontype">
                <rt-picklist v-model="queryForm.new_transactiontype" entity="new_part_stocktransaction" attribute="new_transactiontype"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" @sort-change="sortchange">
        <el-table-column type="selection" width="35" :selectable="isSelectedTable">
        </el-table-column>
        <el-table-column prop="new_stocksite_idName" sortable="custom" :label="$t('new_part_stocktransaction.new_stocksite_id')" width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoDetailPage(scope.row)">{{scope.row.new_stocksite_idName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_product_idName" label="配件名称" width="128">
        </el-table-column>
        <el-table-column prop="new_partcode" label="配件编码" width="140">
        </el-table-column>
        <el-table-column prop="new_invtransdirectionName" :label="$t('new_part_stocktransaction.new_invtransdirection')" width="180">
        </el-table-column>
        <el-table-column prop="new_qty" :label="$t('new_part_stocktransaction.new_qty')" >
        </el-table-column>
        <el-table-column prop="new_uom_idName" :label="$t('new_part_stocktransaction.new_uom_id')" width="160">
        </el-table-column>
        <el-table-column prop="new_fromno" :label="$t('new_part_stocktransaction.new_fromno')" show-overflow-tooltip width="180">
        </el-table-column>
        <el-table-column prop="new_transactiontypeName" :label="$t('new_part_stocktransaction.new_transactiontype')" width="94">
        </el-table-column>
        <el-table-column prop="createdon" :formatter="(row, column) => DateFormatter(row, 'createdon',true)" :label="$t('new_part_stocktransaction.createdon')"  width="108">
        </el-table-column>
      </el-table>
    </rt-grid>
    <SiteStockDialog ref="SiteStockDialog" @lookupSelect="outStockid" @lookupSelectClear="clearStockid"></SiteStockDialog>
    <partsDialog ref="partsDialog" @select-data="outproductid" @clear-data="clearproductid"></partsDialog>
  </div>
</template>
<script>
import SiteStockDialog from "../dialog/SiteStockDialog";
import partsDialog from "../dialog/partsApplyDetailDialog";

export default {
  data() {
    return {
      loading: false, //数据加载loading
      new_stocksite_idName: "", //仓库名
      new_product_idName: "",
      queryForm: {
        new_partcode: "", //配件编码
        new_productname: "", //配件名称
        new_invtransdirection: "", //交易方向
        new_transactiontype: "" //交易类型
      },

      tableData: [], //列表数据
      orderby: "",

      dataTotalCount: 0, //总条数
      pageSize: 10, //每页显示的条数

      //crm数据缓存，性能优化,  页面变更时启用
      pageCookie: "",
      isneedCookie: false
    };
  },
  mounted: function() {
    this._InitData();
  },
  computed: {
    searchlist: function() {
      var searchlist = [];
      if (this.queryForm.new_partcode != "") {
        searchlist.push({
          Type: 0,
          Value: this.queryForm.new_partcode,
          Key: "new_partcode"
        });
      }
      if (this.queryForm.new_productname != "") {
        searchlist.push({
          Type: 0,
          Value: this.queryForm.new_productname,
          Key: "new_productname"
        });
      }
      if (this.queryForm.new_invtransdirection) {
        searchlist.push({
          Type: 1,
          Value: this.queryForm.new_invtransdirection,
          Key: "new_invtransdirection"
        });
      }
       if (this.queryForm.new_transactiontype) {
        searchlist.push({
          Type: 1,
          Value: this.queryForm.new_transactiontype,
          Key: "new_transactiontype"
        });
      }
      return searchlist;
    }
  },
  //注册dialog
  components: { SiteStockDialog, partsDialog },
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
      if (this.queryForm.createdone < this.queryForm.createdons) {
        rt.showErrorToast(this.$t("BeginNeedLessThanEnd"));
        return;
      }
      var requestStr = "../api/PartStockTransaction/GetPartStockTransaction";
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
      this.clearproductid();
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
        name: "partStockTransactionline",
        params: { row: JSON.stringify(data) }
      });
    },
    isSelectedTable: function() {
      return false;
    },
    //打开lookup
    Partslookup() {
      if (rt.isNullOrWhiteSpace(this.currentRow)) {
        this.lookupBtn = true;
      }
      this.$refs.partsDialog.show();
    },
    StockSitelookup() {
      if (rt.isNullOrWhiteSpace(this.currentRow)) {
        this.lookupBtn = true;
      }
      this.$refs.SiteStockDialog.show();
    },
    //选择
    outStockid: function(id, name) {
      this.queryForm.new_stocksite_id = id;
      this.new_stocksite_idName = name;
    },
    //清空
    clearStockid: function() {
      this.queryForm.new_stocksite_id = "";
      this.new_stocksite_idName = "";
    },
    //选择
    outproductid: function(type) {
      if (type == null || type == "") {
        return;
      }
      this.queryForm.new_product_id = type[0];
      this.new_product_idName = type[1];
    },
    //清空
    clearproductid: function() {
      this.queryForm.new_product_id = "";
      this.new_product_idName = "";
    },
    //默认载入第一个仓库信息
    loadStationStock: function() {
      rt
        .get("../api/SiteInv/GetStationStock")
        .then(res => {
          if (res != null) {
            this.queryForm.new_stocksite_id = res.id;
            this.new_stocksite_idName = res.name;
          }
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    }
  }
};
</script>
<style></style>
