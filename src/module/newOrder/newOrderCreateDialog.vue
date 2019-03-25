<template>
  <div class="partsReturn">
    <el-dialog title="销售单明细" :visible="visible" :before-close="beforeClose" size="large">
      <el-form :model="queryForm" class="detail-form" label-position="left" label-width="80px">
        <el-row :gutter="50">
            <el-col :span="7">
            <el-form-item label="配件编码" >
            <el-input v-model="queryForm.new_productcode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="配件名称">
              <el-input v-model="queryForm.new_product_idName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="search">{{$t('BUTTON_SEARCH')}}</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table stripe :data="tableData" v-loading="loading" ref="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column prop="new_product_idName" label="配件名称">
        </el-table-column>
        <el-table-column prop="new_productcode" label="配件编号">
        </el-table-column>
        <el-table-column prop="new_uom_idName" label="计量单位">
        </el-table-column>
        <el-table-column prop="new_price" label="结算价">
        </el-table-column>
        <el-table-column prop="qty" label="数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.qty"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="new_qty" label="库存数量">
        </el-table-column>
      </el-table>
     <!--  <div class="block">
        <el-pagination v-bind:page-sizes="[3, 5, 10, 20]" v-bind:page-size="pageSize" :current-page="pageIndex" layout="total, sizes, prev, pager, next, jumper" v-bind:total="dataTotalCount" @current-change="handleCurrentChange" @size-change="handleSizeChange">
        </el-pagination>
      </div> -->
      <div class="button">
        <el-button @click="beforeClose">{{$t("BUTTON_CANCEL")}}</el-button>
        <el-button type="primary" @click="save">{{$t("BUTTON_DETERMINE")}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      queryForm: {
        new_productcode:"",           //配件编码
        new_product_idName:""          //配件名称
      },
      // 分页
      pageIndex: 1, //当前显示的页
      pageSize: 10, //每页显示的条数
      dataTotalCount: 0,
      pageCookie: "",
      isneedCookie: false,
    
      choosedData: []     //被选中的数据
    };
  },
  props: {
    visible: {
      default: false
    },
    mainid: {
      type: String,
      require: true
    },
    stocksiteid:{
       type: String,
      require: true
    }
  },
  mounted: function() {
    this.initData();
  },
  methods: {
    //关闭dialog
    beforeClose: function() {
      this.$emit("update:visible", false);
    },

    //初始化数据
    initData: function() {
      var apiUrl = "../api/NewOrder/GetStockStieInv";

      var params = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        stocksiteid:this.stocksiteid,
        newOrderid:this.mainid,
        pageCookie: this.isneedCookie == true ? this.pageCookie : "",
        productCode: this.queryForm.new_productcode,
        productName: this.queryForm.new_product_idName
      };
      this.loading = true;
      this.isneedCookie = false;
      rt
        .get(apiUrl, params)
        .then(res => {
          this.tableData = res.datalist;
          for (var i = 0; i < this.tableData.length; i++) {
              this.tableData[i].qty=this.tableData[i].new_qty
          }
          // this.dataTotalCount = res.TotalRecordCount;
          // this.pageCookie = res.PagingCookie;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    search: function() {
      this.initData();
    },

    handleCurrentChange: function(val) {
      this.pageIndex = val;
      this.isneedCookie = true;
      this.initData();
    },
    handleSizeChange: function(val) {
      this.pageSize = val;
      this.initData();
    },
    handleSelectionChange: function(val) {
      this.choosedData = val;
    },
    save: function(row) {
      if (this.choosedData.length <= 0) {
        this.$message({
          showClose: true,
          type: "warning",
          message: this.$t("PleaseChooseAtLeastOne")
        });
      } else {
        var apiUrl = "../api/NewOrder/CreateOrderLine";
        var partsList = [];
        for (var i = 0; i < this.choosedData.length; i++) {
          partsList.push({
            id: this.mainid,
            qty: this.choosedData[i].qty,
            siteinvid: this.choosedData[i].new_srv_siteinvid,
          });
        }
        for (var i = 0; i < this.choosedData.length; i++) {
          if (this.choosedData[i].qty <= 0) {
            this.$message({
              showClose: true,
              type: "warning",
              message: this.$t("CountMoreThanZero")
            });
            return;
          }
          
        }
        var params = partsList;
        rt
          .post(apiUrl, params)
          .then(res => {
            this.$emit("resetLoadData");
            this.$emit("update:visible", false);
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
    }
  }
};
</script>
<style>
.partsReturn .button {
  margin: 20px 0;
  float: right;
}
</style>
