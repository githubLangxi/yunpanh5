<template>
  <!--省、城市、县lookup-->
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
      <el-button @click="dialogFormVisible = false">{{$t('BUTTON_CANCEL')}}</el-button>
      <el-button @click="lookupSelectClear">{{$t('BUTTON_REMOVE')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data: function() {
    return {
      /**************/
      /*lookup公用数据*/
      /**************/
      dialogtableData: [], //省市县lookup公用数据源
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      dataTotalCount: 0, //查询到的总条数
      lookupCondition: "", //前端输入的查询条件
      quickSearch: "new_name", //后台所需筛选条件
      entityName: "new_province", //lookup关联实体名，默认省
      attributeList: "new_name,new_code", //lookup查询列名暂存
      filterList: "", //筛选条件
      lookupOptions: [], //所需查询的数据列
      dialogFormVisible: false, //lookup书否可见
      attrList: [], //lookup查询列名作为循环条件暂存
      formLabelWidth: "80px", //label默认宽度
      new_workorder_id:
        "" /*LookUp回写问题，无法识别editdata.new_workorder_id,这里作为中间量，后期修改*/,
      new_workorder_idname: "",
      lookupid: "", //lookup所选项的ID
      lookupidname: "" //lookup所选项的Name
    };
  },
  props: {
    EntityName: "",
    provinceid: "",
    cityid: "",
    countyid: ""
  },
  mounted: function() {
    this.entityName = this.EntityName;
    if (this.entityName == "new_province") {
      this.provincelookup();
    } else if (this.entityName == "new_city") {
      this.citylookup();
    } else if (this.entityName == "new_county") {
      this.countylookup();
    }
  },
  methods: {
    /***************/
    /*lookup数据处理*/
    /***************/
    //省选择lookup配置
    provincelookup: function() {
      this.filterList = "";
      this.entityName = "new_province";
      this.lookupOptions = [
        { label: this.$t("Province"), name: "new_name" },
        { label: this.$t("Code"), name: "new_code" }
      ];
      this.handleclick("new_province_id");
    },

    //城市选择lookup配置
    citylookup: function() {
      if (rt.isNullOrWhiteSpace(this.provinceid)) {
        rt.showErrorToast("请先选择省份");
        return;
      }
      this.entityName = "new_city";
      this.filterList = "new_province_id=" + this.provinceid;
      this.lookupOptions = [
        { label: this.$t("City"), name: "new_name" },
        { label: this.$t("Code"), name: "new_code" }
      ];
      this.handleclick("new_city_id");
    },
    //县区选择lookup配置
    countylookup: function() {
      if (rt.isNullOrWhiteSpace(this.cityid)) {
        rt.showErrorToast("请先选择城市");
        return;
      }
      this.entityName = "new_county";
      this.filterList = "new_city_id=" + this.cityid;
      this.lookupOptions = [
        { label: this.$t("County"), name: "new_name" },
        { label: this.$t("Code"), name: "new_code" }
      ];
      this.handleclick("new_county_id");
    },
    //lookup的页码变更
    handleCurrentChange(val) {
      //页码改变
      this.currentPage = val;
      this.handleclick();
    },
    //lookup的页面尺寸变更
    handleSizeChange(val) {
      //每页尺寸改变
      this.pageSize = val;
      this.handleclick();
    },
    //lookup选择
    lookupSelect() {
      this.dialogFormVisible = false;
      if (this.lookupid == "new_province_id") {
        this.$emit("send-provinceid", [
          this.currentRow.new_id,
          this.currentRow.new_name
        ]);
      } else if (this.lookupid == "new_city_id") {
        this.$emit("send-cityid", [
          this.currentRow.new_id,
          this.currentRow.new_name
        ]);
      } else if (this.lookupid == "new_county_id") {
        this.$emit("send-countyid", [
          this.currentRow.new_id,
          this.currentRow.new_name
        ]);
      }
    },
    //lookup移除值
    lookupSelectClear() {
      this.dialogFormVisible = false;
      this.editForm[this.lookupid] = "";
      this.editForm[this.lookupidname] = "";
    },
    //lookup快速查询
    lookupsearch() {
      this.handleclick();
    },
    //lookup选中行
    selectRowChange(val) {
      this.currentRow = val;
    },
    //处理lookup逻辑
    handleclick: function(ev) {
      this.lookupid = ev;
      this.lookupidname = ev + "Name";
      this.dialogtableData = [];
      var params = {
        entityName: this.entityName,
        attributeList: this.attributeList,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      var lookupQueryStr = "/api/Lookup/GetLookupData";
      if (this.lookupCondition) {
        params.quickSearch = this.quickSearch + "-" + this.lookupCondition;
      }
      if (this.filterList) {
        params.filterList = this.filterList;
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
            // obj.new_id = result.Attributes[resultlength - 1].Value;
            obj.new_id = result.Id;
            for (var m in that.attrList) {
              obj[that.attrList[m]] = result.Attributes[m].Value;
            }

            //获取部分格式化后的数据
            for (var j in result.FormattedValues) {
              var format = result.FormattedValues[j];
              obj[format.Key] = format.Value;
            }
            that.dialogtableData.push(obj); //将obj添加到数据集
          }
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
      return;
    },
    show: function() {
      this.dialogFormVisible = true;
    }
  }
};
</script>

