<template>
  <div class="partsReturnList">
    <!-- 头部标题 -->
    <rt-header :title="$t('new_srv_partsreturn')">
    </rt-header>

    <!-- 内容部分 -->
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset('queryForm')">
      <template slot="toolbar">
        <rt-button type="add" @click="createData" />
        <rt-button type="delete" @click="partsDelete" />
      </template>
      <template slot="more">
        <el-form ref="queryForm" label-position="left" label-width="120px" :model="queryForm">
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item label="申请单号" prop="new_name">
                 <el-input v-model="queryForm.new_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="旧件类型" prop="new_partstype">
                 <rt-picklist entity="new_srv_partsreturn" attribute="new_partstype" v-model="queryForm.new_partstype">
                </rt-picklist>
              </el-form-item>
            </el-col>
           <el-col :span="8">
              <el-form-item label="物流状态" prop="new_status">
                <rt-picklist entity="new_srv_partsreturn" attribute="new_status" v-model="queryForm.new_status">
                </rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40" type="flex">
              <el-col :span="8">
              <el-form-item label="发货时间 从" prop="aftersendon">
                <el-date-picker v-model="queryForm.aftersendon" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发货时间 到" prop="beforesendon">
                <el-date-picker v-model="queryForm.beforesendon" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" row-key="id" @sort-change="sortchange">
        <el-table-column type="selection" width="35" :selectable="selecTable">
        </el-table-column>
        <el-table-column prop="new_name" sortable label="申请单号">
          <template slot-scope="scope">
            <el-button type="text" @click="partsReturnDataEdit(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_partstypeName" label="旧件类型">
        </el-table-column>
        <el-table-column prop="new_stocksite_receiveidname" label="收货仓库">
        </el-table-column>
        <el-table-column prop="new_statusName" label="物流状态">
        </el-table-column>
         <el-table-column prop="new_sendon" :formatter="(row, column) => DateFormatter(row, 'new_sendon')" label="发货时间">
        </el-table-column>
         <el-table-column prop="new_reason" label="返还原因">
        </el-table-column>
      </el-table>
    </rt-grid>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      queryForm: {
        new_name:'',     //申请单号
        new_partstype:'',  //旧件类型
        new_status:'', //审核状态
        aftersendon:null,     //发货时间 从
        beforesendon:null    //发货时间 到
      },

      tableData: [], //列表数据
      orderby: 'new_name,descending',
      loading: false, //加载数据时的loading动画

      dataTotalCount: 0, //总条数
      currentPage: 1, //当前显示的页
      pageSize: 10, //每页显示的条数

      //crm数据缓存，性能优化,//页面变更时启用
      pageCookie: '',
      isneedCookie: false
    }
  },
  computed: {
    filter: function() {
      var filter = ''
      if (this.$refs.grid.quickSearch) {
        filter += 'new_name=' + this.$refs.grid.quickSearch + ','
      }
      if (this.queryForm.new_name) {
        filter += 'new_name=' + this.queryForm.new_name + ','
      }
      if (this.queryForm.new_status) {
        filter +=
          'new_status=' + this.queryForm.new_status + ','
      }
      if(this.queryForm.new_partstype)
      {
         filter +=
          'new_partstype=' + this.queryForm.new_partstype + ','
      }
      if(this.queryForm.aftersendon)
      {
        filter+='aftersendon='+rt.formatDateTime(this.queryForm.aftersendon, "yyyy-mm-dd")+','
      }
       if(this.queryForm.beforesendon)
      {
        filter+='beforesendon='+rt.formatDateTime(this.queryForm.beforesendon, "yyyy-mm-dd")+','
      }
      if (filter.length > 0) {
        return filter.substring(filter, filter.length - 1)
      }
      return ''
    }
  },
  mounted: function() {
    this._fetchRecords()
  },
  methods: {
    //初始化数据
    _fetchRecords: function() {
      var pageIndex = this.$refs.grid.getPageIndex()
      var pageSize = this.$refs.grid.getPageSize()
      var params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        filter: this.filter,
        orderby: this.orderby
      }
      this.loading = true
      var requestStr = '../api/PartsReturn/GetPartsReturn'
      this.isneedCookie = false //回写为不需要cookie
      rt
        .get(requestStr, params)
        .then(res => {
          this.tableData = res.partsReturnList
          this.pageCookie = res.pagingCookie
          this.dataTotalCount = res.totalRecordCount
          this.loading = false
        })
        .catch(error => {
          rt.showErrorToast(error)
          this.loading = false
        })
    },

    //页码改变
    handlePageChange: function() {
      this._fetchRecords()
    },

    //快速查询以及详细查询
    handleSearch: function(val) {
      this._fetchRecords()
    },

    //重置
    handleReset: function(formName) {
      this.$refs[formName].resetFields()
    },

    //删除
    partsDelete: function() {
      var partsDeleteList = []
      var selection = this.$refs.tableData.selection
      if (selection == null || selection.length == 0) {
        this.$message({
          showClose: true,
          message: this.$t('PleaseChooseAtLeastOne'),
          type: 'warning'
        })
        return
      } else {
        this.$confirm(this.$t('ThisActionDeletePerpetually'), this.$t('Tip'), {
          confirmButtonText: this.$t('BUTTON_DETERMINE'),
          confirmButtonClass: 'ConfirmButtonClass',
          cancelButtonText: this.$t('BUTTON_CANCEL'),
          cancelButtonClass: 'CancelButtonClass',
          type: 'warning'
        })
          .then(() => {
            for (var i = 0; i < selection.length; i++) {
              partsDeleteList.push(selection[i].id)
            }
            var params = partsDeleteList
            var that = this
            //alert(params)
            var apiUrl = '../api/PartsReturn/DeletePartsReturn'
            rt
              .post(apiUrl, params)
              .then(res => {
                rt.showSuccessToast("删除成功")
                that._fetchRecords()
              })
              .catch(error => {
                rt.showErrorToast(error)
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('HasCancelled')
            })
          })
      }
    },

    //非制单状态的select框禁用
    selecTable: function(row) {
      if (row.new_approvalstatus == 1) {
        return true
      } else {
        return false
      }
    },

    //排序处理
    sortchange: function(val) {
      if (val.prop) {
        if (val.prop == 'new_name') {
          this.orderby = 'new_name' + ',' + val.order
        }

        this.tableData = []
        this._fetchRecords()
      }
    },

    //新增
    createData: function() {
      this.$router.push({ name: 'PartsReturnCreate' })
    },

    //编辑
    partsReturnDataEdit: function(row) {
      this.$router.push({ name: 'PartsReturnEdit', params: { id: row.id } })
    }
  }
}
</script>
<style>
.data-input {
  width: 100% !important;
}
.partsReturnList .view-form-btn {
  font-family: '微软雅黑' !important;
  padding: 0 !important;
}
</style>
