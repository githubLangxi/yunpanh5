<template>
  <!--配件名称查询弹出框-->
  <el-dialog :title="$t('Inquery')" :visible.sync="dialogFormVisible" :before-close="handleClose">
    <el-form>
      <el-form-item :label="$t('InqueryCon')">
        <el-input v-model="lookupCondition" auto-complete="off" icon="search" :on-icon-click="lookupsearch" @keyup.enter.native="lookupsearch"></el-input>
      </el-form-item>
      <el-table :data="dialogtableData" style="width: 100%" max-height="500" highlight-current-row @current-change="selectRowChange" @row-dblclick="lookupSelect" v-loading="loading">
        <el-table-column prop="PartName" :label="$t('product.name')" >
        </el-table-column>
        <el-table-column prop="PartCode" :label="$t('product.productnumber')">
        </el-table-column>
        <el-table-column prop="PartPrice" :label="$t('product.price')">
        </el-table-column>
        <el-table-column prop="PartModule.Text" :label="$t('product.new_productmodule_id')">
        </el-table-column>
      </el-table>
      <!-- <el-table :data="dialogtableData" style="width: 100%" max-height="500" highlight-current-row @current-change="selectRowChange" @row-dblclick="lookupSelect" v-loading="loading">
        <el-table-column v-for="item in lookupOptions" :key="item.label" :prop="item.name" :label="item.label">
        </el-table-column>
      </el-table> -->
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
  name: "parts",
  data: function() {
    return {
      loading: false,
      dialogFormVisible: false,
      dialogtableData: [],
      currentRow: { new_id: "", new_name: "" },
      lookupOptions: [], //所需查询的数据列
      currentPage: 1, //当前页
      pageSize: 10, //页面大小
      dataTotalCount: 0, //s数据总数
      lookupCondition: "", //可输入查询条件
      quickSearch: "name", //快速查询输入条件
      type: "" //旧件、新件区别，1：旧件查询；2：新件查询
    };
  },
  props: {
        workOrderId: String,
        productId:String
    },
  methods: {
    //查找配件
    show: function(val) {
      this.dialogFormVisible = true;
      this.dialogtableData = [];
      var accessory = [];
      this.type = val;
      this.lookupOptions = [
        { label: this.$t("product.name"), name: "name" },
        { label: this.$t("product.productnumber"), name: "productnumber" },
        { label: this.$t("product.price"), name: "price" },
        {
          label: this.$t("product.new_productmodule_id"),
          name: "new_productmodule_id"
        }
      ];
      var params = {
        workOrderId:this.workOrderId,
        ProductId:this.productId,
        entityName: "product",
        attributeList: "name,productnumber,new_productmodule_id,price",
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        IsActive: true
      };
      // var lookupQueryStr = "api/WorkOrder/GetStationProduct";
      var lookupQueryStr = "api/WorkOrder/GetProduct";
      this.loading = true;
      if (this.lookupapi) {
        lookupQueryStr = this.lookupapi;
      }

      if (this.lookupCondition) {
        params.quickSearch = this.lookupCondition;
        // params.quickSearch = this.quickSearch + "-" + this.lookupCondition;
      }
      this.attrList = params.attributeList.split(",");
      let that = this;

      rt
        .post(lookupQueryStr, params)
        .then(function(res) {
          if (res != null) {
            var data = res;
            that.dialogtableData=data.parts;
            that.dataTotalCount = data.TotalRecordCount;



            // accessory = [];
            // for (var i in data.Entities) {
            //   var result = data.Entities[i];
            //   var resultlength = result.Attributes.length;
            //   var obj = {};
            //   obj.checked = false; //声明标志位，表示该列是否被选中，默认为false
            //   obj.new_id = result.Id;

            //   // for (var m in result.Attributes) {
            //   //   if (typeof result.Attributes[m].Value === "object") {
            //   //     obj[result.Attributes[m].Key] =
            //   //       result.Attributes[m].Value.Name;
            //   //     if (result.Attributes[m].Key === "price") {
            //   //       obj[result.Attributes[m].Key] =
            //   //         result.Attributes[m].Value.Value;
            //   //     }
            //   //   } else {
            //   //     obj[result.Attributes[m].Key] = result.Attributes[m].Value;
            //   //   }
            //   // }

            //   for (var m in result.Attributes) {
            //     if (typeof result.Attributes[m].Value === "object") {
            //       if (result.Attributes[m].Key === "price") {
            //         if (rt.isNull(result.Attributes[m].Value)) {
            //           obj[result.Attributes[m].Key] = "";
            //         } else {
            //           obj[result.Attributes[m].Key] =
            //             result.Attributes[m].Value.Value;
            //         }
            //       } else {
            //         obj[result.Attributes[m].Key] =
            //           result.Attributes[m].Value.Name;
            //       }
            //     } else {
            //       obj[result.Attributes[m].Key] = result.Attributes[m].Value;
            //     }
            //   }
            //   accessory.push(obj);
            //   //that.dialogtableData.push(obj); //将obj添加到数据集
            // }
            // that.dialogtableData = accessory;
          }

          that.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          that.loading = false;
        });
      return;
    },
    //双击某行or点击确定向父组件传递事件和参数
    lookupSelect: function() {
      if (this.currentRow == null || this.currentRow == "") {
        rt.showErrorToast(
          "rt.showErrorToast(this.$t('PleaseChooseAtLeastOne'))"
        );
        return;
      }
      this.lookupCondition = "";
      this.dialogFormVisible = false;
      this.$emit(
        "lookupSelect",
        this.type,
        this.currentRow.Id,
        this.currentRow.PartName,
        this.currentRow.PartCode,
        this.currentRow.PartModule.Text,
        this.currentRow.PartPrice
      );
    },
    //lookup的页面尺寸变更
    handleSizeChange: function(val) {
      this.pageSize = val;
      this.show(this.type);
    },
    //lookup的页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.show(this.type);
    },
    //lookup选中行
    selectRowChange: function(val) {
      this.currentRow = val;
    },
    //快速查找
    lookupsearch: function() {
      this.show();
    },
    //移除值
    lookupSelectClear: function() {
      this.dialogFormVisible = false;
      this.lookupCondition = ""; //清空查询条件
      this.$emit("lookupSelectClear", this.type);
    },
    handleClose: function() {
      this.dialogFormVisible = false;
      this.lookupCondition = ""; //清空查询条件
    }
  }
};
</script>
