<template>
  <!--仓库查询弹出框-->
  <el-dialog :title="$t('Inquery')" :visible.sync="dialogFormVisible">
    <el-form>
      <el-form-item :label="$t('InqueryCon')">
        <el-input v-model="lookupCondition" auto-complete="off" icon="search" :on-icon-click="lookupsearch"></el-input>
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
      <el-button @click="lookupSelectClear">{{$t('BUTTON_REMOVE')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "SiteStockDialog",
  data: function() {
    return {
      loading: false,
      dialogFormVisible: false,
      currentRow: { new_id: "", new_name: "" },
      dialogtableData: [],
      lookupOptions: [], //所需查询的数据列
      currentPage: 1, //当前页
      pageSize: 10, //页面大小
      dataTotalCount: 0, //s数据总数
      lookupCondition: "", //可输入查询条件
      quickSearch: "new_name" //快速查询输入条件
    };
  },
  methods: {
    //查找配件
    show: function(ev) {
      this.dialogFormVisible = true;
      this.dialogtableData = [];
      this.lookupOptions = [
        { label: this.$t("Warehouse"), name: "new_name" },
        { label: this.$t("Code"), name: "new_stocksitecode" }
      ];
      var params = {
        entityName: "new_srv_stocksite",
        attributeList: "new_name,new_stocksitecode",
        pageIndex: this.currentPage,
        FilterList: "new_station_id=" + this.$store.state.user.departId, //权限控制
        pageSize: this.pageSize,
        IsActive: true
      };
      var lookupQueryStr = "/api/Lookup/GetLookupData";

      if (this.lookupapi) {
        lookupQueryStr = this.lookupapi;
      }

      if (this.lookupCondition) {
        params.quickSearch = this.quickSearch + "-" + this.lookupCondition;
      }
      this.attrList = params.attributeList.split(",");
      let that = this;

      rt
        .post(lookupQueryStr, params)
        .then(function(res) {
          var data = res;
          that.dataTotalCount = data.TotalRecordCount;

          for (var i in data.Entities) {
            var result = data.Entities[i];
            var resultlength = result.Attributes.length;
            var obj = {};
            obj.checked = false; //声明标志位，表示该列是否被选中，默认为false
            obj.new_id = result.Attributes[resultlength - 1].Value;
            for (var m in result.Attributes) {
              if (typeof result.Attributes[m].Value === "object") {
                obj[result.Attributes[m].Key] = result.Attributes[m].Value.Name;
                if (result.Attributes[m].Key === "price") {
                  obj[result.Attributes[m].Key] =
                    result.Attributes[m].Value.Value;
                }
              } else {
                obj[result.Attributes[m].Key] = result.Attributes[m].Value;
              }
            }
            //获取部分格式化后的数据
            // for (var j in result.FormattedValues) {
            //     var format = result.FormattedValues[j];
            //     obj[format.Key] = format.Value;
            // }
            that.dialogtableData.push(obj); //将obj添加到数据集
          }
        })
        .then(function() {
          that.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
      return;
    },
    //双击某行or点击确定按钮向父组件提交参数和事件
    lookupSelect: function() {
      if (
        this.currentRow === null ||
        this.currentRow.new_id === null ||
        this.currentRow.new_id === ""
      ) {
        rt.showErrorToast(this.$t("PleaseChooseStationWarehouse"));
        return;
      }
      this.dialogFormVisible = false;
      this.$emit(
        "lookupSelect",
        this.currentRow.new_id,
        this.currentRow.new_name
      );
    },
    //lookup的页面尺寸变更
    handleSizeChange: function(val) {
      //每页尺寸改变
      this.pageSize = val;
      this.show();
    },
    //lookup的页码变更
    handleCurrentChange: function(val) {
      //页码改变
      this.currentPage = val;
      this.show();
    },
    //lookup选中行
    selectRowChange: function(val) {
      this.currentRow = val;
    },
    //快速查找
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
