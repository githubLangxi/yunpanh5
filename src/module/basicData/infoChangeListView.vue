<template>
  <div>
    <rt-header title="工程师信息变更列表">
    </rt-header>
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" >
      <template slot="toolbar">
        <rt-button type="add" @click="gotoAddPage" />
        <rt-button type="delete" @click="deleteData" />
      </template>
    
      <!--****列表****-->
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" row-key="id" @sort-change="handleSortChange">
        <el-table-column type="selection" width="35" :selectable="isSelectedTable">
        </el-table-column>
        <el-table-column prop="new_name" label="申请单号" sortable width="220">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_station_idName" label="服务商">
        </el-table-column>
        <el-table-column prop="new_worker_idName" label="工程师">
        </el-table-column>
        <el-table-column prop="new_reason" label="变更原因">
        </el-table-column>
        <el-table-column prop="new_approvalstatustext" label="审核状态">
        </el-table-column>
        <el-table-column prop="createdon" label="创建时间">
        </el-table-column>
      </el-table>
    </rt-grid>
  </div>
</template>
<script>
export default {
    data() {
        return{
            loading: false, //加载特效
            tableData: [], //table数据设定
            pageSize: 10, //每页显示数据条数
            dataTotalCount: 0, //总数局条数
            orderby: 'new_name,descending', //排序
            pageCookie: '', //crm数据缓存，性能优化,
            isneedCookie: false, //页面变更时启用
        }
    },
    mounted: function() {
    this._fetchRecords()
    },
    computed: {
         //筛选条件
    filter: function() {
      var filter = ''
      if (this.$refs.grid.quickSearch) {
        filter += 'new_name=' + this.$refs.grid.quickSearch + ','
      }
      if (filter.length > 0) {
        return filter.substring(filter, filter.length - 1)
      }
      return ''
    }
    },
     methods: {
           //搜索按钮点击方法
            handleSearch(val) {
            this._fetchRecords()
            },
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
            var requestStr = '../api/SrvWorker/GetInfoChangeList'
            this.isneedCookie = false //回写为不需要cookie
            rt
                .get(requestStr, params)
                .then(res => {
                this.tableData = res.workerChangeApplyList
                this.pageCookie = res.pagingCookie
                this.dataTotalCount = res.totalRecordCount
                this.loading = false
                })
                .catch(error => {
                rt.showErrorToast(error)
                this.loading = false
                })
            },
               //创建记录
            gotoAddPage() {
            //创建记录
            this.$router.push({ name: 'infochange' })
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
                    var requestStr = '../api/SrvWorker/DeleteChangeApply'
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
            //编辑记录
            gotoEditPage(row) {
            //编辑记录
            this.$router.push({ name: 'infochange', params: { id: row.id } })
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