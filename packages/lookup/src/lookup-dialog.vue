<template>
  <el-dialog class="rt-lookup-dialog" size="tiny" :close-on-click-modal="false" title="查找" :visible.sync="dialogVisible">
    <div>
      <el-form label-position="left">
        <el-form-item label="搜索">
          <el-input v-model="filterValue" placeholder="搜索记录">
            <el-button slot="append" icon="search" @click="handleSearch"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-table ref="lookupTable" height="450" style="width: 100%" highlight-current-row v-bind:data="tableData" stripe @current-change="handleCurrentChange"
      @row-dblclick="handleConfirm" @sort-change="handleSortChange" v-loading="loading">
      <el-table-column width="55">
        <template slot-scope="scope">
          <i class="el-icon-check" v-if="scope.row == currentRow"></i>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" v-for="display in displayFields" v-bind:key="display.name" :prop="display.name"
        :label="display.label" :width="display.width">
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize"
      :page-sizes="pageSizes" :layout="layout" :total="totalRecordCount">
    </el-pagination>
    <span slot="footer" class="dialog-footer" style="">
      <el-button @click="handleReset">移除值</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "RtLookupDialog",
    props: {
      entity: {
        type: String,
        required: true
      },
      requestUrl: {
        type: String,
        default: function () {
          return "../api/crmlookupview/data";
        }
      },
      nameField: {
        type: String,
        default: function () {
          return "new_name";
        }
      },
      idField: {
        type: String,
        default: function () {
          return this.entity + "id";
        }
      },
      displayFields: {
        type: Array,
        default: function () {
          return [{
            name: this.nameField,
            label: '名称'
          }, {
            name: "createdon",
            label: "创建日期",
            width: 180
          }];
        }
      },
      orderbyFields: {
        type: String,
        default: function () {
          return "createdon desc";
        }
      },
      filterFields: {
        type: String,
        default: function () {
          return this.nameField;
        }
      }
    },
    data() {
      return {
        dialogVisible: false,
        loading: false,

        filterValue: "",

        pageIndex: 1,
        pageSize: 20,
        layout: "total, sizes, prev, pager, next",
        pageSizes: [10, 20, 30, 40, 50],
        totalRecordCount: 0,

        tableData: [],
        currentRow: null
      }
    },
    computed: {
      dialogTitle() {
        return "查找"
      },
      selectString: {
        get() {
          //将idField、nameField、displayFields合并，并去掉重复的字段
          var selectFields = [];
          selectFields.push(this.nameField);
          selectFields.push(this.idField);
          for (var i in this.displayFields) {
            var fieldName = this.displayFields[i].name;
            if (selectFields.indexOf(fieldName) >= 0) {
              continue;
            }
            selectFields.push(fieldName);
          }

          return selectFields.join(",");
        }
      },
      orderbyString: {
        get() {
          return this.orderbyFields;
        }
      },
      filterString: {
        get() {
          return this.filterFields;
        }
      }
    },
    mounted() {

    },
    methods: {
      show() {
        this.dialogVisible = true;

        this.pageIndex = 1;
        this._fetchRecords();
      },
      handleSearch() {
        this.pageIndex = 1;
        this._fetchRecords();
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleSortChange() {
        alert("未实现");
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;

        this._fetchRecords();
      },
      handleIndexChange(pageIndex) {
        this.pageIndex = pageIndex;

        this._fetchRecords();
      },
      handleReset() {
        this.$emit("data-selected", {
          id: null,
          logicalName: this.logicalName,
          name: null
        });

        this.dialogVisible = false;
      },
      handleConfirm() {
        var selectedRow = this.$refs.lookupTable.store.states.currentRow;
        if (rt.isNull(selectedRow)) {
          rt.showErrorToast("请选择一条记录");
          return;
        }
        this.$emit("data-selected", {
          id: selectedRow[this.idField],
          name: selectedRow[this.nameField]
        });

        this.dialogVisible = false;
      },
      //数据加载
      _fetchRecords() {
        this.loading = true;
        var requestStr = this.requestUrl + '?entityName=' + this.entity +
          '&page=' + this.pageIndex + '&count=' + this.pageSize +
          "&select=" + this.selectString +
          "&orderby=" + this.orderbyString +
          "&filter=" + this.filterString +
          "&filterValue=" + encodeURIComponent(this.filterValue || "");

        rt.get(requestStr).then((res) => {
          this.tableData = res.Data;
          this.totalRecordCount = res.TotalRecordCount;
        }).catch((error) => {
          rt.showErrorToast(error);
        }).finally(() => {
          this.loading = false;
        });
      },
    }
  }

</script>

<style>
  /* .rt-lookup-dialog {} */

  .rt-lookup-dialog .el-form-item .el-form-item__label {
    width: 120px;
  }

  .rt-lookup-dialog .el-form-item .el-form-item__label:before {
    display: none;
  }

  .rt-lookup-dialog .el-form-item .el-form-item__content {
    margin-left: 120px !important;
  }

  .rt-lookup-dialog .el-table {
    margin-top: 15px;
  }

  .rt-lookup-dialog .el-dialog__body {
    padding-bottom: 15px;
  }

  .rt-lookup-dialog .el-dialog__footer {
    padding-top: 0;
  }

  .el-dialog--tiny {
    width: 50%;
  }

</style>
