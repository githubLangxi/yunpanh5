

<template>
  <div class="tableData">
      <!--头部标题-->
      <rt-header title="签核流程">
      </rt-header>
      
      <rt-grid ref="grid" quicksearch-placeholder="请输入签核流程名称" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch(1)" @search="handleSearch(2)" @reset="handleReset">
          <template slot="toolbar">
              <rt-button type="add" @click="gotoAddPage"/>
              <rt-button type="delete" @click="deleteData"/>
          </template>

          <template slot="more">
              <el-form :model="queryForm" ref="queryForm" label-position="left" label-width="120px">
                  <el-row :gutter="40" type="flex">
                    <el-col :span="12">
                        <el-form-item label="流程名称" prop="Name" >
                            <el-input v-model="queryForm.Name" placeholder="请输入流程名称" clearable ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="实体名称" prop="Etn" >
                            <el-input v-model="queryForm.Etn" placeholder="请输入实体名称" clearable ></el-input>
                        </el-form-item>
                    </el-col>
                  </el-row>
              </el-form>
          </template>

          <el-table ref="gridTable" :data="tableData" stripe tooltip-effect="dark" style="width: 100%" v-loading="loading" @row-dblclick="handleView" :default-sort="{prop: 'Name', order: 'descending'}" @sort-change="sortChange">
           <el-table-column type="selection" width="55" :selectable="isSelectedTable"></el-table-column>
            <el-table-column sortable label="流程名称" prop="Name">
                <template slot-scope="scope">
                        <el-button type="text" @click="handleView(scope.row)">{{scope.row.Name}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="流程描述" prop="Desc"></el-table-column>
            <el-table-column label="实体名称" prop="Etn"></el-table-column>
            <el-table-column label="单号字段" prop="NameField"></el-table-column>
          </el-table>
      </rt-grid>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      queryForm: {
        Name: "",
        Etn: "",
        Desc: "",
        NameField: ""
      },
      loading: true,
      orderby: "",
      dataTotalCount: 0,
      searchtype: 1,
      tableData: [],
      pageCookie: "",
      isneedCookie: false
    };
  },
  mounted: function() {
    this._fetchRecords();
  },
  computed: {
    filter() {
      var filterStr = "";
      if (this.searchtype == 1 && this.$refs.grid.quickSearch) {
        filterStr = "Name=" + this.$refs.grid.quickSearch;
        return filterStr;
      } else if (this.searchtype == 2) {
        //流程名称
        if (this.queryForm.Name) {
          filterStr += "Name=" + this.queryForm.Name;
        }
        //实体名称
        if (this.queryForm.Etn) {
          filterStr += "Etn=" + this.queryForm.Etn;
        }
      }
      if (filterStr.length > 0) {
        return filterStr.substring(filterStr, filterStr.length - 1);
      }
      return "";
    }
  },
  methods: {
    handleReset() {
      this.$refs["queryForm"].resetFields();
    },
    handlePageChange() {
      this._fetchRecords();
    },
    handleSearch(val) {
      this.searchtype = val;
      this._fetchRecords();
    },
    //查看签核流程
    handleView(row) {
      this.$router.push({ name: "FlowDetail", params: { id: row.Id } });
      
    },

    //流程列表
    _fetchRecords() {
      var pageIndex = this.$refs.grid.getPageIndex();
      var pageSize = this.$refs.grid.getPageSize();

      this.loading = true;
      let apiUrl =
        "../api/PortalFlow/GetFlowList?pageIndex=" +
        pageIndex +
        "&pageSize=" +
        pageSize +
        "&filter=" +
        encodeURIComponent(this.filter) +
        "&orderby=" +
        this.orderby;
      this.isneedCookie = false;
      let that = this;
      rt
        .get(apiUrl)
        .then(res => {
          that.tableData = res.FlowList;
          that.pageCookie = res.PagingCookie;

          that.dataTotalCount = res.TotalRecordCount;
          that.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    //排序处理
    sortChange(val) {
      if (val.prop) {
        if (val.prop == "Name") {
          this.orderby = "new_name" + "," + val.order;
        }

        this.tableData = [];
        this._fetchRecords();
      }
    },
    isSelectedTable: function() {
      if (this.disabled == true) {
        return false;
      } else {
        return true;
      }
    },
    gotoAddPage() {
      //创建记录
      this.$router.push({ name: "FlowCreateDetail" });
    },
    deleteData() {
      var selection = this.$refs.gridTable.store.states.selection;
      if (selection == null || selection.length == 0) {
        rt.showErrorToast("请至少选择一个");
        return;
      } else {
        var deleteList = [];
        for (var i in selection) {
          deleteList.push(selection[i].Id);
        }
      }
      this.$confirm("是否要删除", "警告", {
        confirmButtonText: "确认",
        confirmButtonClass: "ConfirmButtonClass",
        cancelButtonText: "取消",
        cancelButtonClass: "CancelButtonClass",
        type: "warning"
      })
        .then(() => {
          let that = this;
          rt
            .post("../api/PortalFlow/DeleteFlow", deleteList)
            .then(res => {
              rt.showSuccessToast(res);
              that._fetchRecords();
            })
            .catch(error => {
              rt.showErrorToast(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    }
  }
};
</script>

