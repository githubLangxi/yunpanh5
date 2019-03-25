<template>
  <!--服务单选择lookup-->
  <el-dialog :title="$t('Inquery')" :visible.sync="dialogFormVisible" :before-close="lookupCancel">
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
      <el-button @click="lookupClear">{{$t('BUTTON_REMOVE')}}</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
export default {
  data: function() {
    return {
      /****************/
      //服务单lookup数据
      /****************/
      dialogtableData: [], //lookup数据源
      currentPage: 1, //当前页数
      pageSize: 10, //每页显示条数
      dataTotalCount: 0, //lookup查询总条数
      lookupCondition: "", //前端筛选条件
      quickSearch: "new_name", //后台所需筛选条件
      entityName: "new_srv_workorder", //实体名
      attributeList: "new_name,createdon", //后台所需排序条件
      stationAttr: "new_station_id",
      orderby: "createdon",
      filterList: "new_approvalstatus=3", //
      lookupOptions: [
        { label: this.$t("new_srv_workorder.new_name"), name: "new_name" },
        { label: this.$t("new_srv_workorder.createdon"), name: "createdon" }
      ], //lookup显示列
      dialogFormVisible: false, //lookup是否可见
      attrList: [], //暂存lookOptions列的数组
      formLabelWidth: "80px", //Label默认宽度
      //tableData: [],

      /*LookUp回写问题，无法识别editdata.new_workorder_id,这里作为中间量，后期修改*/
      new_workorder_id: "",
      new_workorder_idname: "",
      lookupid: "", //lookup所选项id
      lookupidname: "", //lookup所选项name
      currentRow: "" //lookup当前选中行
    };
  },
  mounted: function() {
    this.workorderlookup();
  },
  methods: {
    /******************/
    /***服务单lookup***/
    /******************/
    //工作单打开lookup
    workorderlookup() {
      this.handleclick("new_workorder_id");
    },
    //lookup快速查询
    lookupsearch() {
      this.handleclick();
    },
    //lookup选中行
    selectRowChange(val) {
      this.currentRow = val;
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
      this.lookupCondition = "";
      if (this.currentRow == null || this.currentRow == "") {
        rt.showErrorToast(this.$t("PleaseChooseOneLine"));
        return;
      } else {
        this.dialogFormVisible = false;
        this.$emit("send-workid", [
          this.currentRow.new_id,
          this.currentRow.new_name
        ]);
      }
      this.handleclick("new_workorder_id");
    },
    lookupCancel() {
      this.lookupCondition = "";
      this.dialogFormVisible = false;
      this.handleclick("new_workorder_id");
    },
    //lookup移除值
    lookupClear: function() {
      this.lookupCondition = "";
      this.dialogFormVisible = false;
      this.$emit("clear-workid", [
        this.new_workorder_id,
        this.new_workorder_idname
      ]);
    },
    //处理lookup逻辑
    handleclick: function(ev) {
      if (this.disabledform) {
        return;
      }
      this.lookupid = ev;
      this.lookupidname = ev + "name";
      //this.dialogFormVisible = true;
      this.dialogtableData = [];
      var params = {
        entityName: this.entityName,
        attributeList: this.attributeList,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        stationAttr: this.stationAttr,
        orderby: this.orderby,
        IsActive: true
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

            for (var m in result.Attributes) {
              if (typeof result.Attributes[m].Value === "object") {
                obj[result.Attributes[m].Key] = result.Attributes[m].Value.Name;
              } else {
                obj[result.Attributes[m].Key] = result.Attributes[m].Value;
              }
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
