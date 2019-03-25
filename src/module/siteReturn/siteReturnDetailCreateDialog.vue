<template>
  <div class="partsReturn">
    <el-dialog title="配件退货明细" :visible="visible" :before-close="beforeClose" size="large">
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
      <el-table stripe :data="tableData" v-loading="loading" ref="tableData" @selection-change="handleSelectionChange" >
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column prop="new_productcode" label="配件编码">
        </el-table-column>
        <el-table-column prop="new_product_idName" label="配件名称">
        </el-table-column>
        <el-table-column prop="new_uom_idName" label="计量单位" width="100">
        </el-table-column>
        <el-table-column prop="new_returnqty" label="返还数量" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.new_returnqty" @blur="changeQty(scope.row)" :class="scope.row.new_returnqty<=0||scope.row.new_returnqty===''?'active':''" :disabled="scope.row.isAdd==='true'?true:false" :width="40"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="new_qty" label="可返数量" width="150" v-show="new_qty>0">
        </el-table-column>
        <el-table-column prop="new_price" label="结算价">
        </el-table-column>
        <el-table-column prop="new_amount" label="申请金额" width="100">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination v-bind:page-sizes="[3, 5, 10, 20]" v-bind:page-size="pageSize" :current-page="pageIndex" layout="total, sizes, prev, pager, next, jumper" v-bind:total="dataTotalCount" @current-change="handleCurrentChange" @size-change="handleSizeChange">
        </el-pagination>
      </div>
      <div class="button">
        <el-button @click="beforeClose">{{$t("BUTTON_CANCEL")}}</el-button>
        <el-button type="primary" @click="save" :disabled="issave">{{$t("BUTTON_DETERMINE")}}</el-button>
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
        new_product_idName:""      //配件名称
      },
      // 分页
      pageIndex: 1, //当前显示的页
      pageSize: 10, //每页显示的条数
      dataTotalCount: 0,
      pageCookie: "",
      isneedCookie: false,
      keep_qty: "",
      issave:false,
      choosedWorkName: [], // 被选中的服务单
      new_qty:''
    };
  },
  props: {
    visible: {
      default: false
    },
    // partsReturnId: {
    //   type: String,
    //   require: true
    // },
    // isFailureParts:{
    //    type: String,
    //   require: true
    // }
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
      var apiUrl = "../api/SrvSiteReturn/GetSiteInv";
     /* if (this.queryForm.startDate != "") {
        this.queryForm.startDate = rt.formatDateTime(
          this.queryForm.startDate,
          "yyyy-mm-dd"
        );
      }
      if (this.queryForm.endDate != "") {
        this.queryForm.endDate = rt.formatDateTime(
          this.queryForm.endDate,
          "yyyy-mm-dd"
        );
      }*/
      var url = window.location.hash;
      var params = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        pageCookie: this.isneedCookie == true ? this.pageCookie : "",
        productCode: this.queryForm.new_productcode,
        productName: this.queryForm.new_product_idName,
        sitereturnid :url.substring(url.lastIndexOf('/')+1, url.length)
      };
      this.loading = true;
      this.isneedCookie = false;
      rt
        .get(apiUrl, params)
        .then(res => {
          this.tableData = res.datalist;
          this.dataTotalCount = res.totalRecordCount;
          this.pageCookie = res.PagingCookie;
          this.loading = false;
          console.log(res);
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
      this.choosedWorkName = val;
    },
    changeQty: function(row) {
      if (
        !rt.isNull(row.new_returnqty)
      ) 
      {
      row.new_amount = row.new_returnqty * row.new_price;
      }
    },
    save: function(row) {
      this.issave = true;
      if (this.choosedWorkName.length <= 0) {
        this.$message({
          showClose: true,
          type: "warning",
          message: this.$t("PleaseChooseAtLeastOne")
        });
        this.issave = false;
      } else {
        var apiUrl = "../api/SrvSiteReturn/SaveSrvSiteReturnLineDetail";
        var partsList = [];
        var url = window.location.hash;
        for (var i = 0; i < this.choosedWorkName.length; i++) {
          partsList.push({
            new_partcode: this.choosedWorkName[i].new_productcode,
            new_product_id: this.choosedWorkName[i].new_product_id,
            new_uomid: this.choosedWorkName[i].new_uom_id,
            new_returnqty: this.choosedWorkName[i].new_returnqty,
            new_price: this.choosedWorkName[i].new_price,
            new_amount: this.choosedWorkName[i].new_amount,
            new_sitereturnid :  url.substring(url.lastIndexOf('/')+1, url.length)
          });
        }
        for (var i = 0; i < this.choosedWorkName.length; i++) {
          debugger;
          if (this.choosedWorkName[i].new_returnqty <= 0 || rt.isNull(this.choosedWorkName[i].new_returnqty)) {
            this.$message({
              showClose: true,
              type: "warning",
              message: this.$t("CountMoreThanZero")
            });
            this.issave = false;
            return;
          }
          
          if(this.choosedWorkName[i].new_returnqty>this.choosedWorkName[i].new_qty)
          {
            var differences=this.choosedWorkName[i].new_returnqty-this.choosedWorkName[i].new_qty;
            this.$message({
              showClose: true,
              type: "warning",
              message: "配件编码为"+this.choosedWorkName[i].new_productcode+" 配件名称为"+this.choosedWorkName[i].new_product_idName+"返还数量大于可返数量"+differences
            });
            this.issave = false;
            return;
          }
        }
        var params = partsList;
        rt
          .post(apiUrl, params)
          .then(res => {
            rt.showSuccessToast(res);
            this.$emit("resetLoadData");
            this.$emit("update:visible", false);
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.issave = false;
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
