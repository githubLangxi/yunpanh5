<template>
  <div class="partsReturn">
    <el-dialog title="销售单明细" :visible="visible" :before-close="beforeClose" size="large">
      <el-form :model="queryForm" class="detail-form" label-position="left" label-width="80px">
        <el-row :gutter="50">
            <el-col :span="7">
            <el-form-item label="旧件编码" >
            <el-input v-model="queryForm.new_productcode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('new_srv_partsreturnline.new_workorderid')">
              <el-input v-model="queryForm.new_srv_workorder_idname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="旧件名称">
              <el-input v-model="queryForm.new_productnew_idname"></el-input>
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
        <el-table-column prop="new_srv_workorder_idName" :label="$t('new_srv_partsreturnline.new_workorderid')" width="180"></el-table-column>
        <el-table-column prop="new_productold_idName" label="旧件名称">
        </el-table-column>
        <el-table-column prop="new_productcode" label="旧件编号">
        </el-table-column>
        <el-table-column prop="new_uom_idname" label="计量单位">
        </el-table-column>
        <el-table-column prop="new_qty" label="使用数量">
        </el-table-column>
        <el-table-column prop="return_qty" label="已返数量">
        </el-table-column>
        <el-table-column prop="new_price" label="结算价">
        </el-table-column>
        <el-table-column prop="new_appqty" label="返还数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.new_appqty"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="keep_qty" label="未返数量">
        </el-table-column>
      </el-table>
    <!--   <div class="block">
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
        new_srv_workorder_idname: "", //服务单号
        new_productcode:"",           //旧件编码
        new_productnew_idname:""      //旧件名称
      },
      // 分页
      pageIndex: 1, //当前显示的页
      pageSize: 10, //每页显示的条数
      dataTotalCount: 0,
      pageCookie: "",
      isneedCookie: false,
      keep_qty: "",

      choosedWorkName: [] // 被选中的服务单
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
    productgroupid:{
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
      var apiUrl = "../api/PartsReturn/GetWorkOrderPartsApply";
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
      var params = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        pageCookie: this.isneedCookie == true ? this.pageCookie : "",
        workOrder: this.queryForm.new_srv_workorder_idname,
        productCode: this.queryForm.new_productcode,
        productName: this.queryForm.new_productnew_idname,
        isfailureparts:2,
        productGroupId:this.productgroupid
      };
      this.loading = true;
      this.isneedCookie = false;
      rt
        .get(apiUrl, params)
        .then(res => {
          this.tableData = res.PartsLineList;
          // this.dataTotalCount = res.totalRecordCount;
          // this.pageCookie = res.pagingCookie;
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
      this.choosedWorkName = val;
    },
    save: function(row) {
      if (this.choosedWorkName.length <= 0) {
        this.$message({
          showClose: true,
          type: "warning",
          message: this.$t("PleaseChooseAtLeastOne")
        });
      } else {
        var apiUrl = "../api/NewOrder/CreateOrderLineOldPart";
        var partsList = [];
        for (var i = 0; i < this.choosedWorkName.length; i++) {
          partsList.push({
            id: this.mainid,
            qty: this.choosedWorkName[i].new_appqty,
            lineId: this.choosedWorkName[i].id,
            meno:""
          });
        }
        for (var i = 0; i < this.choosedWorkName.length; i++) {
          if (this.choosedWorkName[i].new_appqty <= 0) {
            this.$message({
              showClose: true,
              type: "warning",
              message: this.$t("CountMoreThanZero")
            });
            return;
          }
          
          if(this.choosedWorkName[i].new_appqty>this.choosedWorkName[i].keep_qty)
          {
            var differences=this.choosedWorkName[i].new_appqty-this.choosedWorkName[i].keep_qty;
            this.$message({
              showClose: true,
              type: "warning",
              message: this.choosedWorkName[i].new_productcode+" "+this.choosedWorkName[i].new_productold_idName+"返还数量大于未返数量"+differences
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
