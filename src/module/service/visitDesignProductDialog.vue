<template>
  <!--产品查询弹出框-->
  <el-dialog :title="$t('Inquery')" :visible.sync="dialogFormVisible">
    <el-form>
      <el-form-item :label="$t('InqueryCon')">
        <el-input v-model="lookupCondition" auto-complete="off" icon="search" :on-icon-click="lookupsearch" @keyup.enter.native="lookupsearch"></el-input>
      </el-form-item>
      <el-table :data="dialogtableData" style="width: 100%" max-height="500" highlight-current-row @current-change="selectRowChange"
        @row-dblclick="lookupSelect" v-loading="loading">
        <el-table-column v-for="item in lookupOptions" :key="item.label" :prop="item.name" :label="item.label">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-bind:current-page="currentPage" v-bind:page-sizes="[3, 5, 10, 20]"
          v-bind:page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" v-bind:total="dataTotalCount">
        </el-pagination>
      </div>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="lookupSelect">{{$t('BUTTON_DETERMINE')}}</el-button>
      <el-button @click="dialogFormVisible = false">{{$t('BUTTON_CANCEL')}}</el-button>
      <el-button @click="lookupSelectClear">{{$t('BUTTON_REMOVE')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "visitDesignProductDialog",
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
      quickSearch: "name", //快速查询输入条件
      filterList: ""
    };
  },
  props: {
    productModel: String,
    ids: String
  },
  methods: {
    //查找配件
    show: function(userInput) {
      if (!rt.isNullOrWhiteSpace(userInput)) {
        this.lookupCondition = userInput;
      }

      if (this.productModel != undefined && this.productModel != "") {
        this.filterList = "new_productmodule_id=" + this.productModel;
      }
      this.dialogFormVisible = true;
      this.dialogtableData = [];
      this.lookupOptions = [
        {
          label: this.$t("ProductName"),
          name: "name"
        },
        {
          label: this.$t("ProductNumber"),
          name: "productnumber"
        }
      ];
      var lookupQueryStr = "";
      //  查询条件
      //查询内机
      if (this.ids == undefined || this.ids == "") {
        //this.ids = "";
        lookupQueryStr =
          "/api/VisitDesign/getProdcut?pageIndex=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&condition=" +
          this.lookupCondition +
          "&isInside=1&ids=" +
          this.ids;
      } else {
        //查询外机
        lookupQueryStr =
          "/api/VisitDesign/getProdcut?pageIndex=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&condition=" +
          this.lookupCondition +
          "&isInside=2&ids=" +
          this.ids;
      }

      let that = this;

      rt
        .get(lookupQueryStr)
        .then(function(res) {
          that.dataTotalCount = res.totalRecordCount;

          res.designProductList.forEach(k => {
            var resultlength = res.length;
            var obj = {};
            obj.checked = false; //声明标志位，表示该列是否被选中，默认为false
            obj.new_id = k.id;
            obj.name = k.name;
            obj.productnumber = k.productnumber;
            obj.new_refrigeratingcapacity = k.new_refrigeratingcapacity;

            that.dialogtableData.push(obj); //将obj添加到数据集
          });
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
      return;
    },
    lookupSelect: function() {
      if (this.currentRow == null || this.currentRow == "") {
        rt.showErrorToast(this.$t("PleaseChooseAtLeastOne"));
        return;
      }
      this.dialogFormVisible = false;
      var data = {
        id: this.currentRow.new_id,
        name: this.currentRow.name,
        new_refrigeratingcapacity: this.currentRow.new_refrigeratingcapacity
      };
      this.$emit("lookupSelect", data);
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
