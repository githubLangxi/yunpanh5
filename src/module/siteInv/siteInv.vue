<template>
  <div class="siteInv">
    <!-- 头部标题 -->
    <rt-header v-bind:title="$t('new_srv_siteinv')">
    </rt-header>

    <!-- 内容部分 -->
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset('queryForm')">
      <template slot="toolbar">
          <rt-button type="export" @click="exportData" />
      </template>
      <template slot="more">
        <el-form ref="queryForm" label-position="left" label-width="120px" :model="queryForm">
          <el-row :gutter="40" type="flex">
           <el-col :span="8">
              <el-form-item label="配件类型" prop="new_itemtype">
                <rt-picklist v-model="queryForm.new_itemtype" entity="new_srv_stocksite" attribute="new_itemtype"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配件编码" prop="new_productcode">
                <el-input v-model="queryForm.new_productcode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配件名称" prop="new_productname">
                <el-input v-model="queryForm.new_productname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" @sort-change="sortchange">
        <el-table-column type="selection" width="35" :selectable="isSelectedTable">
        </el-table-column>
        <!-- <el-table-column prop="new_stocksite_idName" sortable="custom" v-bind:label="$t('new_srv_siteinv.new_stocksite_id')">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoDetailPage(scope.row)">{{scope.row.new_stocksite_idName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_stockcode" :label="$t('new_srv_siteinv.new_stockcode')">
        </el-table-column> -->
        <el-table-column prop="new_itemtypeName" label="配件类型">
        </el-table-column>
        <el-table-column prop="new_stocksite_idName" label="仓库">
        </el-table-column>
        <el-table-column prop="new_productgroupidName" label="产品线">
        </el-table-column>
        <el-table-column prop="new_product_idName" label="配件名称">
        </el-table-column>
        <el-table-column prop="new_productcode" label="配件编码">
        </el-table-column>
        <el-table-column prop="new_qty" label="配件数量">
        </el-table-column>
         <el-table-column prop="freeze_qty" label="冻结数量">
        </el-table-column>
        <el-table-column prop="new_price" label="结算价">
        </el-table-column>
        <el-table-column prop="freeze_amount" label="冻结金额">
        </el-table-column>
        <el-table-column prop="new_amount" label="库存金额">
        </el-table-column>
      </el-table>
    </rt-grid>
    <SiteStockDialog ref="SiteStockDialog" @lookupSelect="outStockid" @lookupSelectClear="clearStockid"></SiteStockDialog>
  </div>
</template>
<script>
import SiteStockDialog from "../dialog/SiteStockDialog";
export default {
  data: function() {
    return {
      loading: false, //数据加载loading
      new_stocksite_idName: "", //仓库名
      queryForm: {
        new_itemtype: "", //配件类型
        new_productcode:"",//配件编码
        new_productname:""//配件名称
      },
      tableData: [], //列表数据
      orderby: "new_stocksite_idNamedesc",

      dataTotalCount: 0, //总条数
      pageSize: 10, //每页显示的条数

      //crm数据缓存，性能优化,  页面变更时启用
      pageCookie: "",
      isneedCookie: false,

      seeRealInv: false, //查看实际库存
            //数据导出
      excelTitle: [
        this.$t('new_srv_siteinv.new_stocksite_id'),
        this.$t('new_srv_siteinv.new_stockcode'),
        this.$t('new_srv_siteinv.new_product_id'),
        this.$t('new_srv_siteinv.new_productcode'),
        this.$t('new_srv_siteinv.new_qty'),
        this.$t('new_srv_siteinv.new_uom_id'),
        this.$t('配件类型')

      ], //导出Excel表头
      excelData: [] //excel导出数据源
    };
  },
  mounted: function() {
    this._InitData();
  },
  computed: {
    searchlist: function() {
      var searchlist = [];
      if (this.queryForm.new_itemtype) {
        searchlist.push({
          Type: 1,
          Value: this.queryForm.new_itemtype,
          Key: "new_itemtype"
        });
      }
      if(this.queryForm.new_productcode)
      {
         searchlist.push({
          Type: 0,
          Value: this.queryForm.new_productcode,
          Key: "new_productcode"
        });
      }
      if(this.queryForm.new_productname)
      {
         searchlist.push({
          Type: 0,
          Value: this.queryForm.new_productname,
          Key: "new_productname"
        });
      }
      return searchlist;
    }
  },
  //注册dialog
  components: { SiteStockDialog },
  methods: {
      //导出
      exportData() {
      var pageIndex = this.$refs.grid.getPageIndex();
      var pageSize = this.$refs.grid.getPageSize();
      var newName = this.$refs.grid.getSearchString();
      var params = {
        orderby: this.orderby,
        quickSearch:newName,
        searchList:JSON.stringify(this.searchlist),
        seeRealInv:this.seeRealInv,
      }

      if (newName == null) {
        params.quickSearch = "";
      }
      var requestStr = "../api/SiteInv/ExportAllSiteInv"
      this.isneedCookie = false //回写为不需要cookie
      rt
        .get(requestStr, params)
        .then(res => {
          rt.export2Excel(
            this.$t('new_srv_siteinv'),
            res.datalist,
            this.excelTitle,
            'new_itemtype,new_product_id,new_productclass,new_productclassName,new_srv_siteinvid,new_stocksite_id,new_uom_id,now_qty',
          ) 
        })
        
        .catch(error => {
          rt.showErrorToast(error)
        })
    },
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
        searchList: JSON.stringify(this.searchlist),
        seeRealInv: this.seeRealInv
      };
      if (newName == null) {
        params.quickSearch = "";
      }
      var requestStr = "../api/SiteInv/GetSiteInv";
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
        name: "siteInvLine",
        params: { row: JSON.stringify(data) }
      });
    },
    isSelectedTable: function() {
      return false;
    },
    //打开lookup
    StockSitelookup: function() {
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
    },
    RealLoadData: function() {
      this.seeRealInv == false
        ? (this.seeRealInv = true)
        : (this.seeRealInv = false);
      this._InitData();
    }
  }
};
</script>
<style></style>
