<template>
    <div class="tableData">
        
        <!-- 头部标题-->
        <rt-header title="签核角色">
        </rt-header>
        <rt-grid ref="grid" quicksearch-placeholder="请输入签核角色名" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch(1)"  >
            <template slot="toolbar">
                <rt-button type="add" @click="gotoAddPage" />
                <rt-button type="delete" @click="deletedata" />
            </template>

            <!--签核角色列表-->
            <el-table ref="gridTable" :data="tableData" stripe tooltip-effect="dark" style="width:100%" v-loading="loading" @row-dblclick="handleView" :default-sort="{prop:'Name',order:'descending'}" @sort-change="sortChange">
                <el-table-column type="selection" width="55" :selectable="isSelectedTable">
                </el-table-column>
                <el-table-column prop="Name" sortable label="签核角色">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleView(scope.row)">{{scope.row.Name}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </rt-grid>

    </div>

    
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      queryForm: {
        //查询条件
        flowRole: ""
      },

      orderby: "Name,descending",
      orderby: "",
      loading: true,

      //签核角色列表分页
      tableData: [],
      pageCookie: "",
      isneedCookie: false,

      dataTotalCount: 0,
      searchType: 1
    };
  },
  mounted: function() {
    this._fetchRecord();
  },
  computed: {
    filter() {
      var filterstr = "";
      if (this.$refs.grid.quickSearch) {
        filterstr = "Name=" + this.$refs.grid.quickSearch;
        return filterstr;
      }
      if (filterstr.length > 0) {
        return filterstr.substring(filterstr, filterstr.length - 1);
      }
      return "";
    }
  },
  methods: {
    handlePageChange() {
      this._fetchRecord();
    },
    handleSearch(val) {
      this.searchType = val;
      this._fetchRecord();
    },

    //查看签核角色
    handleView(row) {
      this.$router.push({ name: "FlowRoleEdit", params: { id: row.Id } });
    },

    _fetchRecord() {
      var pageIndex = this.$refs.grid.getPageIndex();
      var pageSize = this.$refs.grid.getPageSize();

      this.loading = true;
      let apiUrl =
        "../api/PortalFlowRole/GetFlowRoleList?pageIndex=" +
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
          that.tableData = res.FlowRoleList;
          that.pageCookie = res.PagingCookie;

          that.dataTotalCount = res.TotalRecordCount;

          that.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          that.loading = false;
        });
    },
    deletedata() {
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
            .post("../api/PortalFlowRole/DeleteFlowRole", deleteList)
            .then(res => {
              rt.showSuccessToast(res);
              that._fetchRecord();
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
    },

    gotoAddPage() {
      //创建记录
      this.$router.push({ name: "FlowRoleCreateDetail" });
    },

    isSelectedTable: function() {
      if (this.disabled == true) {
        return false;
      } else {
        return true;
      }
    },
    //排序处理
    sortChange(val) {
      if (val.prop) {
        if (val.prop == "Name") {
          this.orderby = "new_name" + "," + val.order;
        }

        this.tableData = [];
        this._fetchRecord();
      }
    }
  }
};
</script>

 