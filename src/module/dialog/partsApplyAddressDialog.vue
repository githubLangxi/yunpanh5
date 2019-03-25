<template>
  <div>
    <el-dialog :title="$t('Inquery')" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item :label="$t('InqueryCon')" :label-width="formLabelWidth">
          <el-input v-model="lookupCondition" auto-complete="off" icon="search" :on-icon-click="lookupsearch"></el-input>
        </el-form-item>
        <el-table :data="dialogtableData" style="width: 100%" max-height="500" highlight-current-row @current-change="selectRowChange" @row-dblclick="lookupSelect">
          <el-table-column v-for="item in lookupOptions" :key="item.label" :prop="item.name" :label="item.label">
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
  </div>
</template>
<script>
export default {
  name: "address",
  data: function() {
    return {
      //lookup数据
      currentPage: 1, //当前页码
      pageSize: 10, //每页显示条数
      dataTotalCount: 0, //总数据条数
      lookupCondition: "", //搜索框筛选条件
      //lookup显示列
      lookupOptions: [{ label: this.$t("Address"), name: "new_name" }],
      dialogFormVisible: false, //lookup显示与隐藏
      formLabelWidth: "80px", //Label默认宽度
      dialogtableData: [], //lookup数据源
      currentRow: "" //当前选中行
    };
  },
  props: {
    stocksiteid: ""
  },
  // mounted: function() {
  //   if (this.stocksiteid) {
  //     this.handleclick()
  //   }
  // },
  methods: {
    /*********************/
    /**配件名称lookUP方法**/
    /*********************/
    //lookup快速查询
    lookupsearch: function() {
      this.show();
    },
    //lookup确定按钮
    lookupSelect: function() {
      this.lookupCondition = "";
      if (this.currentRow != "") {
        var selectdata = {
          name: this.currentRow.new_name, //配件名称
          contact: this.currentRow.new_contact,
          tele: this.currentRow.new_tele
        };
        this.lookupCondition = this.currentRow.new_name;
        this.$emit("send-address", selectdata);
        this.dialogFormVisible = false;
        // this.lookupCondition = ''
        // this.handleclick()
      } else {
        rt.showErrorToast(this.$t("PleaseOneLine"));
      }
    },
    lookupCancel: function() {
      // this.lookupCondition = ''
      this.dialogFormVisible = false;
      // this.handleclick()
    },
    //lookup移除值
    lookupSelectClear: function() {
      // this.lookupCondition = ''
      this.dialogFormVisible = false;
      this.$emit("clear-address");
    },
    //lookup选中行改变
    selectRowChange: function(val) {
      this.currentRow = val;
    },
    //lookup的页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.show();
    },
    //lookup的页面尺寸变更
    handleSizeChange: function(val) {
      this.pageSize = val;
      this.show();
    },
    //处理lookup逻辑
    handleclick: function() {},
    show: function() {
      if (this.stocksiteid) {
        this.dialogFormVisible = true;
        var that = this;
        // if (rt.isNullOrWhiteSpace(this.lookupCondition)) {
        //   this.lookupCondition = ''
        // }
        that.dialogtableData = [];
        that.dataTotalCount = 0;
        var dataStr =
          "api/NewSrvStation/GetStockSiteLine?id=" +
          that.stocksiteid +
          "&new_name=" +
          this.lookupCondition;
        rt
          .get(dataStr)
          .then(function(res) {
            if (res === null) {
              return;
            }
            that.dialogtableData = res;
            that.dataTotalCount = res.length;
          })
          .catch(function(error) {
            rt.showErrorToast(error);
          });
      } else {
        rt.showErrorToast(this.$t("PleaseChooseStationWarehouse"));
      }
    }
  }
};
</script>

