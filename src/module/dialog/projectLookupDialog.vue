<template>
    <!--故障现象查询出框-->
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
  name: "provinceDialog",
  data: function() {
    return {
      loading: false,
      dialogFormVisible: false,
      dialogtableData: [],
      lookupOptions: [], //所需查询的数据列
      currentPage: 1, //当前页
      pageSize: 10, //页面大小
      dataTotalCount: 0, //s数据总数
      lookupCondition: "", //可输入查询条件
      quickSearch: "new_name" //快速查询输入条件
    };
  },
  props: {
    new_userprofile_id: {
      type: String,
      require: true
    },
    workOrderId: {
      type: String,
      require: true
    }
  },
  methods: {
    //查找配件
    show: function(ev) {
      if (!rt.isNullOrWhiteSpace(ev)) {
        this.lookupCondition = ev;
      }
      if (!this.new_userprofile_id) {
        this.$message({
          message: "请先选择故障机",
          type: "warning"
        });
        return;
      }
      if (!this.workOrderId) {
        this.$message({
          message: "服务单信息丢失",
          type: "warning"
        });
        return;
      }
      this.dialogFormVisible = true;
      this.dialogtableData = [];
      this.lookupOptions = [
        { label: "现象编码", name: "new_code" },
        { label: "名称", name: "new_name" },
        { label: "配件小类", name: "new_srv_partstype_idName" }
      ];
      var params = {
        new_userprofile_id: this.new_userprofile_id,
        workOrderId: this.workOrderId,
        condition: this.lookupCondition,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      var lookupQueryStr = "/api/WorkOrder/CrmLookupProject";
      this.loading = true;
      let that = this;
      rt
        .get(lookupQueryStr, params)
        .then(function(res) {
          var data = res;
          that.dataTotalCount = data.TotalRecordCount;
          that.dialogtableData = data.projectModel;
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
        this.currentRow.id,
        this.currentRow.new_name,
        this.currentRow.new_srv_partstype_id,
        this.currentRow.new_srv_partstype_idName,
        this.currentRow.new_srv_troubleid
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
