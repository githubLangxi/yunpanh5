<template>
    <!--更换件查询出框-->
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
  name: "partLineProductDialog",
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
    userprofileId: {
      type: String,
      require: true
    },
    partstypeId: {
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
      if (!this.userprofileId) {
        this.$message({
          message: "请先选择故障机",
          type: "warning"
        });
        return;
      }
      if (!this.partstypeId) {
        this.$message({
          message: "请先选择维修项目",
          type: "warning"
        });
        return;
      }
      this.dialogFormVisible = true;
      this.dialogtableData = [];
      this.lookupOptions = [
        { label: "配件编码", name: "productnumber" },
        { label: "配件名称", name: "name" },
        { label: "配件小类", name: "new_parstypeidName" },
        { label: "BOM用量", name: "bomQty" },
        { label: "BOM更新时间", name: "bomDateTime" },
        { label: "申请频次", name: "new_frequency" },
        { label: "是否代用件", name: "isReplace" },
        { label: "是否通用件", name: "new_interchangeable" },
        { label: "网点库存", name: "invQty" },
        { label: "是否可申请", name: "new_ifappliedtext" }
      ];
      var params = {
        userprofileId: this.userprofileId,
        condition: this.lookupCondition,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        partstypeId: this.partstypeId
      };
      var lookupQueryStr = "/api/WorkOrder/CrmLookupProductList";
      this.loading = true;
      let that = this;
      rt
        .get(lookupQueryStr, params)
        .then(function(res) {
          var data = res;
          that.dataTotalCount = data.TotalRecordCount;
          that.dialogtableData = data.list;
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
      if(!this.currentRow.new_ifapplied){
        rt.showErrorToast("该配件处于未启用/冻结状态，请优先考虑代用件");
        return;
      }

      this.dialogFormVisible = false;
      this.lookupCondition = ""; //清空查询条件
      this.$emit(
        "lookupSelect",
        this.currentRow.productId,
        this.currentRow.name
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
