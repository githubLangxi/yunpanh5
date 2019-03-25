<template>
    <rt-section id="area6" :title="$t('new_srv_repair')">
        <template slot="toolbar">
            <rt-button type="add" @click="showRepairContent" />
            <rt-button type="delete" @click="deleteData" />
        </template>
        <el-table ref="gridTable" :data="repairData" @row-dblclick="doubleClick" v-loading="loading">
            <el-table-column type="selection" width="35">
            </el-table-column>
            <el-table-column :label="$t('new_srv_repair.new_project_id')" prop="new_project_idname" show-overflow-tooltip width="165">
                <template slot-scope="scope">
                    <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_project_idname}}</el-button>
                </template>
            </el-table-column>
            <el-table-column :label="$t('new_srv_repair.new_srv_workhours_id')" prop="new_srv_workhours_idname" show-overflow-tooltip width="165">
            </el-table-column>
            <el-table-column :label="$t('new_srv_repair.new_standardhour')" prop="new_standardhour" width="163">
            </el-table-column>
            <el-table-column :label="$t('new_srv_repair.new_workhourprice')" prop="new_workhourprice">
            </el-table-column>
            <el-table-column :label="$t('new_srv_repair.new_workhourcost')" prop="new_workhourcost">
            </el-table-column>
            <el-table-column :label="$t('new_srv_repair.new_memo')" prop="new_memo" show-overflow-tooltip>
            </el-table-column>
            <el-table-column :label="$t('new_srv_repair.createdon')" prop="createdon" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <repairContentDialog ref="repairContent" :workOrderId="this.workOrderId" @reLoad="reLoadrepair"></repairContentDialog>
    </rt-section>
</template>

<script>
// import repairContentDialog from './repairContentDialog'

export default {
    data: function() {
        return {
            loading: false,
            repairData: [],
        }
    },
    components: { 
        repairContentDialog:resolve => { require(['./repairContentDialog.vue'], resolve) }
     },
    props: {
      sourceData: Array,
      workOrderId: String,
      approvalstatus: ''
    },
    mounted: function() {
      // // this.$nextTick(this._fetchRecords);
      // // this._fetchRecords();
      // // console.log("repairContent mounted, sourceData=" + this.sourceData);
      // if (this.sourceData)  {
      //   this.repairData = this.sourceData;
      // }
      // else {
      //   // this.$nextTick(this._fetchRecords);
      //   // this.repairData = [];
      // }
      this.repairData = [];
      this._fetchRecords();
    },

    // computed : {
    //   repairData() {
    //     if (this._repairData)
    //     {
    //       return this._repairData;
    //     }
    //     return this.sourceData;
    //   }
    // },

    watch: {
      sourceData: function(val) {
        // this.repairData = val;
      }
    },

    methods: {
        //弹出维修内容明细（新增or编辑）
        showRepairContent: function() {
            if (this.approvalstatus != 1 && this.approvalstatus != 4 || this.approvalstatus == 5) {
                this.$message({
                    type: 'warning',
                    message: this.$t('NotSingleAndRejectCanNotAdd')
                })
                return;
            }
            if (this.workOrderId) {
                this.$refs.repairContent.show('');
            }
            else {
                this.$message({
                    type: 'warning',
                    message: this.$t('PleaseSave')
                });
            }
        },
        //加载维修内容明细数据
        _fetchRecords: function() {
          var that=this;
            if (this.workOrderId) {
                this.loading = true;
                var requestStr = '../api/WorkOrder/RepairLine/' + this.workOrderId;
                rt.get(requestStr).then((res) => {
                    that.repairData = res;
                    that.loading = false;
                }).catch((error) => {
                    rt.showErrorToast(error);
                    this.loading = false;
                });
            }
        },
        reLoadrepair: function() {
            this._fetchRecords();
            //this.$emit('reLoad');
        },
        //删除维修内容明细
        deleteData: function() {
            if (this.approvalstatus != 1 && this.approvalstatus != 4 || this.approvalstatus == 5) {
                this.$message({
                    type: 'warning',
                    message: this.$t('NotSingleAndRejectCanNotDel')
                })
                return;
            }
            var selection = this.$refs.gridTable.selection;
            if (selection == null || selection.length == 0) {
                this.$message({
                    type: 'warning',
                    message: this.$t('PleaseChooseAtLeastOne')
                });
                return;
            }
            else {
                this.$confirm(this.$t('ThisActionDeletePerpetually'), this.$t('Tip'), {
                    confirmButtonText: this.$t('BUTTON_DETERMINE'),
                    confirmButtonClass: 'ConfirmButtonClass',
                    cancelButtonText: this.$t('BUTTON_CANCEL'),
                    cancelButtonClass: 'CancelButtonClass',
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    var deleteList = [];
                    for (var i in selection) {
                        deleteList.push(selection[i].id);
                    }
                    var params = deleteList;
                    var requestStr = '../api/WorkOrder/DeleteRepairLine';
                    rt.post(requestStr, params).then((res) => {
                        rt.showSuccessToast(res);
                        this._fetchRecords();
                        this.$emit('reLoad');
                    }).catch((error) => {
                        rt.showErrorToast(error);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$t('HasCancelledForDeleting')
                    });
                })
            }
        },
        //双击行进入编辑
        doubleClick: function(row) {
            if (this.approvalstatus != 1 && this.approvalstatus != 4 || this.approvalstatus == 5) {
                this.$message({
                    type: 'warning',
                    message: this.$t('NotSingleAndRejectCanNotModify')
                })
                return;
            }
            this.$refs.repairContent.show(row.id);
        },
        //编辑记录
        gotoEditPage: function(row) {
            if (this.approvalstatus != 1 && this.approvalstatus != 4 || this.approvalstatus == 5) {
                this.$message({
                    type: 'warning',
                    message: this.$t('NotSingleAndRejectCanNotModify')
                })
                return;
            }
            this.$refs.repairContent.show(row.id);
        },
    }
}
</script>
