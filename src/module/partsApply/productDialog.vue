<template>
		<el-dialog :title="$t('product')" :visible="visible" :before-close="beforeClose">
		   <el-form>
        <el-form-item :label="$t('InqueryCon')">
            <el-input v-model="lookupCondition" auto-complete="off" icon="search" :on-icon-click="lookupsearch" @keyup.enter.native="lookupsearch" ></el-input>
        </el-form-item>


        <el-table stripe ref="tableData" v-bind:data="tableData"  max-height="500" highlight-current-row @current-change="selectRowChange" @row-dblclick="lookupSelect" v-loading="loading" @sort-change="handleSortChange">
            <el-table-column prop="productName" :label="$t('product.name')" sortable>
            </el-table-column>
            <el-table-column prop="productNumber" :label="$t('product.productnumber')" sortable>
            </el-table-column>
        </el-table>
			<div class="block">
	          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-bind:current-page="currentPage" v-bind:page-sizes="[3, 5, 10, 20]" v-bind:page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" v-bind:total="dataTotalCount">
	          </el-pagination>
	        </div>
		     </el-form>
		     <div slot="footer" class="dialog-footer">
		        <el-button @click="lookupSelect">{{$t('BUTTON_DETERMINE')}}</el-button>
		        <el-button @click="lookupCancel">{{$t('BUTTON_CANCEL')}}</el-button>
		        <el-button @click="lookupSelectClear">{{$t('BUTTON_REMOVE')}}</el-button>
		     </div>
		</el-dialog>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      currentPage: 1, //当前页码
      pageSize: 10, //每页显示条数
      dataTotalCount: 0, //总数据条数

      currentRow: "", //lookup当前选中行

      lookupCondition: "", //查询内容
      productLine: "", //产品线
      orderby: "productName,descending"
    };
  },
  props: {
    visible: {
      default: false
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.loadData();
    });
  },
  methods: {
    beforeClose: function() {
      this.$emit("update:visible", false);
    },
    loadData: function() {
      this.loading = true;
      var apiUrl =
        "../api/SrvBomProduct/GetSrvBomProduct?productLine=" +
        this.productLine +
        "&productName=" +
        this.lookupCondition +
        "&orderby=" +
        this.orderby +
        "&pageIndex=" +
        this.currentPage +
        "&pageSize=" +
        this.pageSize;
      rt
        .get(apiUrl)
        .then(res => {
          this.tableData = res.srvProducts;
          this.dataTotalCount = res.total;
          this.loading = false;
          console.log(this.tableData);
        })
        .catch(error => {});
    },
    lookupsearch: function() {
      this.loadData();
    },
    handleSortChange: function(sort) {
      if (!sort.prop) {
        return;
      }
      this.orderby = sort.prop + "," + sort.order;
      this.tableData = [];
      this.loadData();
    },

    lookupSelect: function() {
      if (this.currentRow == null || this.currentRow == "") {
        rt.showErrorToast(this.$t('PleaseChooseOneLine'));
        return;
      } else {
        this.$emit("send-workid", [
          this.currentRow.id,
          this.currentRow.productName
        ]);
        this.$emit("update:visible", false);
      }
      /*this.handleclick('new_workorder_id')*/
    },

    selectRowChange: function(val) {
      this.currentRow = val;
    },

    handleSizeChange: function(val) {
      console.log(val);
      this.pageSize = val;
      this.loadData();
    },
    handleCurrentChange: function(val) {
      this.currentPage = val;
      //this.isneedCookie = true;
      this.loadData();
    },

    //取消
    lookupCancel: function() {
      this.$emit("update:visible", false);
    },

    //移除值
    lookupSelectClear: function() {
      /*this.currentRow.productId="";
				this.currentRow.productName="";*/
      this.currentRow = {};
      this.currentRow.id = "";
      this.currentRow.productName = "";
      this.$emit("clear-workid", [
        this.currentRow.id,
        this.currentRow.productName
      ]);
      this.$emit("update:visible", false);
    }
  }
};
</script>
<style type="text/css">
.productDialog .el-form-item__content {
  margin-left: 80px;
}
.productDialog .el-table__body-wrapper {
  max-height: 300px !important;
}
</style>
