<template>
  <!--城镇查询出框-->
  <el-dialog :title="$t('Inquery')" :visible.sync="dialogFormVisible" :before-close="handleClose">
    <el-form>
      <el-form-item :label="$t('InqueryCon')">
        <el-input v-model="lookupCondition" auto-complete="off" icon="search" :on-icon-click="lookupsearch" @keyup.enter.native="lookupsearch"></el-input>
      </el-form-item>
      <el-table :data="dialogtableData" style="width: 100%" max-height="500" highlight-current-row @current-change="selectRowChange" @row-dblclick="lookupSelect" v-loading="loading">
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
      <el-button @click="handleClose">{{$t('BUTTON_CANCEL')}}</el-button>
      <el-button @click="lookupSelectClear">{{$t('BUTTON_REMOVE')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "townDialog",
  data: function() {
    return {
      loading: false,
      dialogFormVisible: false,
      dialogtableData: [],
      lookupOptions: [], //所需查询的数据列
      filterList: "", //筛选条件
      currentPage: 1, //当前页
      pageSize: 10, //页面大小
      dataTotalCount: 0, //s数据总数
      lookupCondition: "", //可输入查询条件
      quickSearch: "new_name" //快速查询输入条件
    };
  },
  props: {
    workOrder: {
      type: Object,
      require: true
    }
  },
  methods: {
    //查找配件
    show: function(userInput) {
      if (!rt.isNullOrWhiteSpace(userInput)) {
        this.lookupCondition = userInput;
      }
      this.dialogFormVisible = true;
      this.dialogtableData = [];
      this.lookupOptions = [
        { label: "条码", name: "new_name" },
        { label: "设备名称", name: "new_userprofileidName" }
      ];
      var params = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      if (this.lookupCondition) {
        params.condition = this.lookupCondition;
      }
      if (
        rt.isNull(this.workOrder) ||
        rt.isNullOrWhiteSpace(this.workOrder.id)
      ) {
        this.$message({
          message: "服务单信息丢失",
          type: "warning"
        });
        return;
      }
      params.id = this.workOrder.id;
      var lookupQueryStr = "/api/WorkOrder/CrmLookupFaultMachine";      
      let that = this;
      that.loading = true;
      rt
        .get(lookupQueryStr, params)
        .then(function(res) {
          var data = res;
          that.dataTotalCount = data.totalRecordCount;
          that.dialogtableData = data.list; //将obj添加到数据集
          that.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          that.loading = false;
        });
      return;
    },
    lookupSelect: function() {
      if (this.currentRow == null || this.currentRow == "") {
        rt.showErrorToast(this.$t("PleaseChooseAtLeastOne"));
        return;
      }
      this.dialogFormVisible = false;
      this.lookupCondition = ""; //清空查询条件
      this.$emit(
        "lookupSelect",
        this.currentRow.new_userprofileid,
        this.currentRow.new_userprofileidName,
        this.currentRow.new_name,
        this.currentRow.new_insideoroutside
      );
    },
    //lookup的页面尺寸变更
    handleSizeChange: function(val) {
      this.pageSize = val;
      this.show();
    },
    //lookup的页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.show();
    },
    //lookup选中行
    selectRowChange: function(val) {
      this.currentRow = val;
    },
    lookupsearch: function() {
      this.show();
    },
    lookupSelectClear: function() {
      this.dialogFormVisible = false;
      this.lookupCondition = ""; //清空查询条件
      this.$emit("lookupSelectClear");
    },
    handleClose: function() {
      this.dialogFormVisible = false;
      this.lookupCondition = ""; //清空查询条件
    }
  }
};
</script>
