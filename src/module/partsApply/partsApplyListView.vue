<template>
  <div>
    <rt-header v-bind:title="$t('new_srv_partsapply')">
    </rt-header>
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset">
      <template slot="toolbar">
        <rt-button type="add" @click="gotoAddPage" />
        <rt-button type="delete" @click="deleteData" />
        <rt-button type="export" @click="exportData" />
      </template>
      <!--****搜索条件****-->
      <template slot="more">
        <el-form label-position="left" label-width="120px" ref="queryForm" :model="queryForm">
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_partsapply.new_name')" prop="new_name">
                <el-input v-model="queryForm.new_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_partsapply.new_approvalstatus')" prop="approvalStatus">
                <el-select class="rt-portal-item-select" v-model="queryForm.approvalStatus" clearable>
                  <el-option v-for="item in statusOptions" :key="item.Value" :label="item.Text " :value="item.Value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-show="true">
              <el-form-item v-bind:label="$t('new_srv_partsapply.new_type')" prop="applyType">
                <el-select class="rt-portal-item-select" v-model="queryForm.applyType" clearable>
                  <el-option v-for="item in typeOptions" :key="item.Value" :label="item.Text " :value="item.Value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item label="提交时间 从" prop="aftersubmittime">
                <el-date-picker v-model="queryForm.aftersubmittime" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提交时间 到" prop="beforesubmittime">
                <el-date-picker v-model="queryForm.beforesubmittime" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <!--****列表****-->
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" row-key="id" @sort-change="handleSortChange">
        <el-table-column type="selection" width="35" :selectable="isSelectedTable">
        </el-table-column>
        <el-table-column prop="new_name" v-bind:label="$t('new_srv_partsapply.new_name')" sortable width="220">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_typetext" v-bind:label="$t('new_srv_partsapply.new_type')">
        </el-table-column>
        <el-table-column prop="new_recipient" v-bind:label="$t('new_srv_partsapply.new_recipient')">
        </el-table-column>
        <el-table-column prop="new_phonenumber" v-bind:label="$t('new_srv_partsapply.new_phonenumber')">
        </el-table-column>
        <el-table-column prop="new_approvalstatustext" v-bind:label="$t('new_srv_partsapply.new_approvalstatus')">
        </el-table-column>
        <el-table-column prop="new_submit_time" :formatter="(row, column) => DateFormatter(row, 'new_submit_time' )" label="提交时间">
        </el-table-column>
        <el-table-column prop="createdon" :formatter="(row, column) => DateFormatter(row, 'createdon' )" sortable label="创建时间">
        </el-table-column>
      </el-table>
    </rt-grid>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      //搜索项
      queryForm: {
        new_name: '', //申请单号
        approvalStatus: '', //审批状态
        applyType: '', //申请类型
        requireDate: null, //需求日期
        recipient: '', //收货人
        aftersubmittime:'',   //提交时间从
        beforesubmittime:'',  //提交时间到
      },

      /*************/
      //页面初始化数据
      /*************/
      loading: false, //加载特效
      tableData: [], //table数据设定
      typeOptions: [], //下拉列表申请类型
      statusOptions: [], //审批状态
      pageSize: 10, //每页显示数据条数
      dataTotalCount: 0, //总数局条数
      orderby: 'new_name,descending', //排序
      pageCookie: '', //crm数据缓存，性能优化,
      isneedCookie: false, //页面变更时启用

      //数据导出
      excelTitle: [
        this.$t('new_srv_workorder.new_name'),
        this.$t('new_srv_workorder.new_type'),
        this.$t('new_srv_workorder.new_requiredate'),
        this.$t('new_srv_workorder.new_recipient'),
        this.$t('new_srv_workorder.new_phonenumber'),
        this.$t('new_srv_workorder.new_approvalstatus')
      ], //导出Excel表头
      excelData: [] //excel导出数据源
    }
  },

  mounted: function() {
    this._fetchRecords()
    this.bindSelectType()
  },
  computed: {
    //筛选条件
    filter: function() {
      var filter = ''
      if (this.$refs.grid.quickSearch) {
        filter += 'new_name=' + this.$refs.grid.quickSearch + ','
      }
      if (this.queryForm.new_name) {
        filter += 'new_name=' + this.queryForm.new_name + ','
      }
      if (this.queryForm.applyType) {
        filter += 'new_type=' + this.queryForm.applyType + ','
      }
      if (this.queryForm.approvalStatus) {
        filter += 'new_approvalstatus=' + this.queryForm.approvalStatus + ','
      }
      if(this.queryForm.aftersubmittime){
        filter += 'aftersubmittime='+rt.formatDateTime(this.queryForm.aftersubmittime,'yyyy-mm-dd')+','
      }
      if(this.queryForm.beforesubmittime){
        filter += 'beforesubmittime='+rt.formatDateTime(this.queryForm.beforesubmittime,'yyyy-mm-dd')+','
      }
      if (filter.length > 0) {
        return filter.substring(filter, filter.length - 1)
      }
      return ''
    }
  },
  methods: {
    /***************/
    /***数据初始化***/
    /***************/
    //数据加载
    _fetchRecords() {
      var pageIndex = this.$refs.grid.getPageIndex()
      var pageSize = this.$refs.grid.getPageSize()
      this.loading = true
      var params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        filter: this.filter,
        orderby: this.orderby
      }
      var requestStr = '../api/PartsApply/GetPartsApply'
      this.isneedCookie = false //回写为不需要cookie
      rt
        .get(requestStr, params)
        .then(res => {
          console.log(res);
          this.tableData = res.new_srv_partsapplyList
          this.pageCookie = res.pagingCookie
          this.dataTotalCount = res.totalRecordCount
          this.loading = false
        })
        .catch(error => {
          rt.showErrorToast(error)
          this.loading = false
        })
    },
    //加载下拉框数据
    bindSelectType: function() {
      var typeLoad = '../api/crmpicklist/options/new_srv_partsapply/new_type'
      rt
        .get(typeLoad)
        .then(res => {
          this.typeOptions = res
        })
        .catch(error => {
          rt.showErrorToast(error)
        })

      var statusLoad =
        '../api/crmpicklist/options/new_srv_partsapply/new_approvalstatus'
      rt
        .get(statusLoad)
        .then(res => {
          this.statusOptions = res
        })
        .catch(error => {
          rt.showErrorToast(error)
        })
    },

    /***************/
    /***搜索框处理***/
    /***************/
    //重置按钮点击方法
    handleReset() {
      this.$refs.grid.quickSearch = ''
      this.queryForm.applyType = ''
      this.queryForm.approvalStatus = ''
      this.$refs['queryForm'].resetFields()
      this._fetchRecords()
    },
    //搜索按钮点击方法
    handleSearch(val) {
      this._fetchRecords()
    },

    /*************/
    /***列表处理***/
    /*************/
    //创建记录
    gotoAddPage() {
      //创建记录
      this.$router.push({ name: 'partcreate' })
    },
    //删除请求
    deleteData() {
      var selection = this.$refs.tableData.store.states.selection
      if (selection == null || selection.length == 0) {
        rt.showErrorToast(this.$t('PleaseChooseAtLeastOne'))
        return
      } else {
        var deleteList = []
        for (var i in selection) {
          if (selection[i].new_approvalstatustext == '制单') {
            deleteList.push(selection[i].id)
          } else {
            rt.showErrorToast(this.$t('CanNotDelete'))
            continue
          }
        }
        this.$confirm(this.$t('ThisActionDeletePerpetually'), this.$t('Tip'), {
          confirmButtonText: this.$t('BUTTON_DETERMINE'),
          confirmButtonClass: 'ConfirmButtonClass',
          cancelButtonText: this.$t('BUTTON_CANCEL'),
          cancelButtonClass: 'CancelButtonClass',
          type: 'warning'
        })
          .then(() => {
            var params = deleteList
            var requestStr = '../api/PartsApply/DeletePartsApply'
            rt
              .post(requestStr, params)
              .then(res => {
                rt.showSuccessToast(res)
                this._fetchRecords()
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
    //导出请求
    exportData() {
      var pageIndex = this.$refs.grid.getPageIndex()
      var pageSize = this.$refs.grid.getPageSize()
      var params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        filter: this.filter,
        orderby: this.orderby
      }
      var requestStr = '../api/PartsApply/ExportAllPartsApply'
      this.isneedCookie = false //回写为不需要cookie
      rt
        .get(requestStr, params)
        .then(res => {
          rt.export2Excel(
            this.$t('new_srv_partsapply'),
            res.new_srv_partsapplyList,
            this.excelTitle,
            'id,new_approvalstatus'
          ) //, "new_station_id,createdon,new_srv_partsapplyid"
        })
        .catch(error => {
          rt.showErrorToast(error)
        })
    },
    //编辑记录
    gotoEditPage(row) {
      //编辑记录
      this.$router.push({ name: 'partedit', params: { id: row.id } })
    },
    //排序处理
    handleSortChange(sort) {
      if (!sort.prop) {
        return
      }
      this.orderby = sort.prop + ',' + sort.order
      this.tableData = []
      this._fetchRecords()
    },
    //翻页处理
    handlePageChange() {
      this._fetchRecords()
    },
    //列表行是否可选
    isSelectedTable: function(row) {
      if (row.new_approvalstatus == 1) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
