<template>
  <!--服务人员查询弹出框-->
  <el-dialog :title="$t('Inquery')" :visible.sync="dialogFormVisible">
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
      <el-button @click="dialogFormVisible = false">{{$t('BUTTON_CANCEL')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "worker",
  data: function() {
    return {
      loading: false,
      dialogFormVisible: false,
      dialogtableData: [],
      lookupOptions: [], //所需查询的数据列
      currentPage: 1, //当前页
      pageSize: 10, //页面大小
      pageCookie: "",
      dataTotalCount: 0, //s数据总数
      lookupCondition: "", //可输入查询条件
      quickSearch: "new_name" //快速查询输入条件
    };
  },
  mounted: function() {},
  props: {
    workOrder: {
      type: Object,
      require: true
    }
  },
  methods: {
    //查找配件
    show: function() {
      this.dialogFormVisible = true;
      this.dialogtableData = [];
      this.lookupOptions = [
        { label: "工程师编号", name: "new_code" },
        { label: "工程师名称", name: "new_name" }
      ];
      this.loading = true;
      var params = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        pageCookie: this.pageCookie,
        id: this.workOrder.id
      };
      var requestStr = "../api/WorkOrder/GetWorkerById";
      rt
        .get(requestStr, params)
        .then(res => {
          this.dialogtableData = res.workerList;
          this.dataTotalCount = res.totalRecordCount;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
      return;
    },
    lookupSelect: function() {
      if (this.currentRow == null || this.currentRow == "") {
        rt.showErrorToast(this.$t("PleaseChooseAtLeastOne"));
        return;
      }
      this.dialogFormVisible = false;
      this.$emit(
        "lookupSelect",
        this.currentRow.id,
        this.currentRow.new_name,
        this.currentRow.new_code
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
      this.$emit("lookupSelectClear");
    }
  }
};
</script>
