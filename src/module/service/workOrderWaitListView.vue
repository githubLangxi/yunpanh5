<template>
  <div>
    <rt-header title="待处理的服务单">
    </rt-header>
    <rt-grid ref="grid" quicksearch-placeholder="快速搜索服务单号" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset">
      <template slot="toolbar">
        <rt-button type="add" @click="gotoAddPage" v-if="canAdd" />

        <!-- <rt-button type="plus" /> -->
        <!-- <rt-button type="add" @click="gotoPlusPage" text="新增上门设计" v-if="canAdd" /> -->

        <!-- <rt-button type="delete" @click="deleteData" /> -->
        <rt-button type="export" text="下载导入模板" @click="downloadTemplate" v-if="canAdd" />
        <rt-button type="import" @click="showExcelImportDialog" v-if="canAdd" />
      </template>

      <template slot="more">
        <el-form label-position="left" ref="queryForm" label-width="120px" :model="queryForm">
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="客户姓名" prop="new_contact">
                <el-input v-model="queryForm.new_contact"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话" prop="new_phone">
                <el-input v-model="queryForm.new_phone"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="8">
              <el-form-item label="虚假标识" prop="new_unrealstatus">
                <rt-picklist v-model="queryForm.new_unrealstatus" entity="new_srv_workorder" attribute="new_unrealstatus"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="服务类型" prop="new_type">
                <rt-picklist v-model="queryForm.new_type" entity="new_srv_workorder" attribute="new_type"></rt-picklist>
              </el-form-item>
            </el-col>
           <!--  <el-col :span="8">
              <el-form-item label="处理级别" prop="new_deallevel">
                <rt-picklist v-model="queryForm.new_deallevel" entity="new_srv_workorder" attribute="new_deallevel"></rt-picklist>
              </el-form-item>
            </el-col> -->
              <el-col :span="8">
              <el-form-item label="重电次数" prop="new_rechargecycles">
                <el-input v-model="queryForm.new_rechargecycles"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="处理阶段" prop="new_dealstage">
                <rt-picklist v-model="queryForm.new_dealstage" entity="new_srv_workorder" attribute="new_dealstage"></rt-picklist>
              </el-form-item>
            </el-col>
           <!--  <el-col :span="8">
              <el-form-item label="是否派工" prop="new_isdispatch">
                <rt-picklist v-model="queryForm.new_isdispatch" entity="new_srv_workorder" attribute="new_isdispatch"></rt-picklist>
              </el-form-item>
            </el-col> -->
          </el-row>
        
       
        </el-form>
      </template>

      <el-table ref="gridTable" v-bind:data="serviceData" row-key="id" stripe @row-dblclick="doubleClick" v-loading="loading" @sort-change="handleSortChange">
        <el-table-column type="selection" width="35" :selectable="selecTable">
        </el-table-column>
        <el-table-column prop="new_name" label="服务单号" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_contact" label="客户名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="new_phone" label="联系电话" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="new_typetext" label="服务类型">
        </el-table-column>
        <el-table-column prop="new_dealleveltext" label="处理级别">
        </el-table-column>
        <el-table-column prop="new_dealstatustext" label="处理状态">
        </el-table-column>
        <el-table-column prop="new_dealstagetext" label="处理阶段">
        </el-table-column>
        <el-table-column prop="new_rechargecycles" label="重电次数">
        </el-table-column>
        <el-table-column prop="new_isdispatchText" label="是否派工">
        </el-table-column>
        <el-table-column prop="new_accepttime" label="受理日期" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="new_memo" label="服务描述">
        </el-table-column>
      </el-table>
    </rt-grid>
    <!-- 数据导入 -->
    <rt-excel-import-dialog ref="excelImport" title="数据导入" :action="actionApi" :on-success="_fetchRecords">
    </rt-excel-import-dialog>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      disabledform: false, //设置主档表单禁用状态
      // 查询条件
      queryForm: {
      /*   dateFrom: null, //受理开始时间
        dateTo: null, //受理结束时间 */
        new_name: "", //服务单号
        new_accountname: "", //客户姓名
        new_phone: "", //联系电话
        new_type: "", //服务类型
       /*  new_deallevel: "", //处理级别 */
       /*  new_isdispatch: "", //是否派工 */
        new_rechargecycles: "", //充电次数
        new_dealstage: "",//处理阶段
        new_unrealstatus:"" //虚假标识
      },
      orderby: "createdon,descending", //排序条件

      serviceData: [], //table数据绑定
      dataTotalCount: 0, //数据总条数

      loading: false,
      searchtype: 1, //搜索类别；1：快速查找；2：更多筛选

      //crm数据缓存，性能优化,//页面变更时启用
      pageCookie: "",
      isneedCookie: false, //页面变更时启用
      canAdd: false
    };
  },
  mounted: function() {
    this.getCanAdd();
    this._fetchRecords();
  },
  watch: {},
  computed: {
    filter: function() {
      var filter = "";
      if (
        this.$refs.grid.quickSearch != null &&
        this.$refs.grid.quickSearch != ""
      ) {
        filter = "quicksearch=" + this.$refs.grid.quickSearch + ",";
      }
      //服务单号
      if (this.queryForm.new_name) {
        filter += "new_name=" + this.queryForm.new_name + ",";
      }
      //客户姓名
      if (this.queryForm.new_contact) {
        
        filter += "new_contact=" + this.queryForm.new_contact + ",";
      }
      //联系电话
      if (this.queryForm.new_phone) {
        filter += "new_phone=" + this.queryForm.new_phone + ",";
      }
      //服务类型
      if (this.queryForm.new_type) {
        filter += "new_type=" + this.queryForm.new_type + ",";
      }
      //虚假标识
      if (this.queryForm.new_unrealstatus) {
        filter += "new_unrealstatus=" + this.queryForm.new_unrealstatus + ",";
      }
      /* //处理级别
      if (this.queryForm.new_deallevel) {
        filter += "new_deallevel=" + this.queryForm.new_deallevel + ",";
      } */
      /* //是否派工
      if (this.queryForm.new_isdispatch) {
        filter += "new_isdispatch=" + this.queryForm.new_isdispatch + ",";
      } */
      //充电次数
      if (this.queryForm.new_rechargecycles) {
        filter +=
          "new_rechargecycles=" + this.queryForm.new_rechargecycles + ",";
      }
      //受理开始日期
    /*   if (this.queryForm.dateFrom) {
        filter +=
          "dateFrom=" +
          rt.formatDateTime(this.queryForm.dateFrom, "yyyy-mm-dd") +
          ",";
      }
      //受理结束日期
      if (this.queryForm.dateTo) {
        filter +=
          "dateTo=" +
          rt.formatDateTime(this.queryForm.dateTo, "yyyy-mm-dd") +
          ",";
      } */
      //处理阶段
      if (this.queryForm.new_dealstage) {
        filter += "new_dealstage=" + this.queryForm.new_dealstage + ",";
      }
      if (filter.length > 0) {
        
        return filter.substring(filter, filter.length - 1);
      }
      return "";
    },
    actionApi: function() {
      return "../api/WorkOrder/ExcelImport";
    }
    
  },
  methods: {
    getCanAdd: function() {
      var departId = this.$store.state.user.departId;
      if (!departId) {
        return;
      }
      var that = this;
      var requestStr =
        "../api/Helper/GetFieldValue?id=" +
        departId +
        "&entityName=new_srv_station&attributeList=new_iscreateorder,new_level,new_upstation_id,new_formstatus";
      var level = 0;
      var new_upstation_id = "";
      var formstatus = 0;
      rt
        .get(requestStr)
        .then(function(res) {
          var array = res.Attributes;
          for (var k in array) {
            if (array[k].Key == "new_iscreateorder") {
              that.canAdd = array[k].Value;
            }
            if (array[k].Key == "new_level") {
              level = array[k].Value.Value;
            }
            if (array[k].Key == "new_upstation_id") {
              new_upstation_id = array[k].Value.Id;
            }
            if (array[k].Key == "new_formstatus") {
              formstatus = array[k].Value.Value;
            }
          }
          if (!that.canAdd) {
            that.canAdd = false;
            return;
          }
          if (formstatus != 1 && formstatus != 3) {
            that.canAdd = false;
            return;
          }
          if (level == 2) {
            //判断上级服务商是否有代结资质
            if (rt.isNullOrWhiteSpace(new_upstation_id)) {
              that.canAdd = false;
              return;
            }
            that.checkUpstation(new_upstation_id);
          }
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },

    //判断上级服务商是否有代结资质
    checkUpstation: function(stationId) {
      var that = this;
      var requestStr =
        "../api/Helper/GetFieldValue?id=" +
        stationId +
        "&entityName=new_srv_station&attributeList=new_isreplacesettle";
      var new_isreplacesettle = false;
      rt
        .get(requestStr)
        .then(function(res) {
          var array = res.Attributes;
          for (var k in array) {
            if (array[k].Key == "new_isreplacesettle") {
              new_isreplacesettle = array[k].Value;
            }
          }
          if (!new_isreplacesettle) {
            that.canAdd = false;
          }
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },

    //加载数据
    _fetchRecords: function() {
    
      var params = {
        pageIndex: this.$refs.grid.getPageIndex(),
        pageSize: this.$refs.grid.getPageSize(),
        filter: this.filter,
        orderby: this.orderby
      };
      this.loading = true;
      var requestStr = "../api/WorkOrder/GetWaitWorkOrder";
      rt
        .get(requestStr, params)
        .then(res => {
          this.serviceData = res.workOrderList;
          this.pageCookie = res.pagingCookie;
          this.dataTotalCount = res.totalRecordCount;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    //查询数据
    handleSearch: function() {
      // this.searchtype = val;
      this._fetchRecords();
    },
    //页面发生变化
    handlePageChange: function() {
      this._fetchRecords();
    },
    //新增记录
    gotoAddPage: function() {
      this.$router.push({ name: "ordercreate" });
    },
    //新增上门设计
    gotoPlusPage: function() {
      this.$router.push({ name: "designcreate" });
    },
    //删除记录
    deleteData: function() {
      var selection = this.$refs.gridTable.selection;
      if (selection == null || selection.length == 0) {
        this.$message({
          type: "warning",
          message: "请至少选择一条数据"
        });
      } else {
        this.$confirm("此操作将永久删除该记录,是否继续", "提示", {
          confirmButtonText: "确定",
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: "取消",
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            this.loading = true;
            var deleteList = [];
            for (var i in selection) {
              deleteList.push(selection[i].id);
            }
            var params = deleteList;
            var requestStr = "../api/WorkOrder/DeleteWorkOrder";
            rt
              .post(requestStr, params)
              .then(res => {
                rt.showSuccessToast(res);
                this._fetchRecords();
              })
              .catch(error => {
                rt.showErrorToast(error);
                this.loading = false;
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    // 只有制单状态并且未派工状态下可以删除服务单
    selecTable: function(row) {
      if (row.new_dealstatustext == "制单") {
        return true;
      } else {
        return false;
      }
      //  return true
    },
    //结束时间change事件
    /* endDateCheck: function() {
      if (this.queryForm.dateFrom && this.queryForm.dateTo) {
        if (this.queryForm.dateFrom > this.queryForm.dateTo) {
          rt.showErrorToast("结束时间必须大于等于开始时间");
          this.queryForm.dateTo = null;
        }
      }
    },
    //开始时间change事件
    startDateCheck: function() {
      if (this.queryForm.dateTo && this.queryForm.dateFrom) {
        if (this.queryForm.dateFrom > this.queryForm.dateTo) {
          rt.showErrorToast("开始时间必须小于等于结束时间");
          this.queryForm.dateFrom = null;
        }
      }
    }, */
    //编辑记录
    gotoEditPage: function(row) {
      this.$router.push({ name: "orderedit", params: { id: row.id } });
    },
    //双击某一行数据,跳转编辑页面
    doubleClick: function(row) {
      this.$router.push({ name: "orderedit", params: { id: row.id } });
    },
    //排序
    handleSortChange: function(sort) {
      if (!sort.prop) {
        return;
      }
      this.orderby = sort.prop + "," + sort.order;
      this.serviceData = [];
      this._fetchRecords();
    },
    //重置查询选项
    handleReset: function() {
      this.$refs["queryForm"].resetFields();
      this.$refs.grid.quickSearch = "";
      this._fetchRecords();
    },
    showExcelImportDialog() {
      this.$refs.excelImport.show();
    },
    //下载导入模板
    downloadTemplate() {
      window.open("../template/服务单导入模板.xlsx");
    }
  }
};
</script>

