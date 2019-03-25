<template>
    <rt-section id="area5" :title="$t('new_srv_partline')">
        <template slot="toolbar">
            <rt-button type="add" @click="showequipmentLine" />
            <rt-button type="delete" @click="deleteData" />
        </template>
        <el-table ref="gridTable" :data="equipmentLineData" @row-dblclick="doubleClick" v-loading="loading">
            <el-table-column type="selection" width="35">
            </el-table-column>
            <el-table-column prop="new_product_idname" :label="$t('new_srv_partline.new_product_id')">
                <template slot-scope="scope">
                    <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_product_idname}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="new_name" :label="$t('new_srv_partline.new_name')">
            </el-table-column>
            <!--<el-table-column prop="new_model" :label="$t('new_srv_partline.new_model')">
            </el-table-column>-->
            <el-table-column prop="new_qty" :label="$t('new_srv_partline.new_qty')">
            </el-table-column>
            <el-table-column prop="new_partscost" :label="$t('new_srv_partline.new_partscost')">
            </el-table-column>
            <el-table-column prop="createdon" :label="$t('new_srv_partline.createdon')" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <equipmentLineDialog ref="equipmentLine" :productId='this.productId' :partsArray="this.equipmentLineData" :workOrderId="this.workOrderId" @reLoad="reLoadeq"></equipmentLineDialog>
    </rt-section>
</template>

<script>
import equipmentLineDialog from './equipmentLineDialog'

export default {
    name: 'equipmentLine',
    data: function() {
        return {
            loading: false,
            equipmentLineData: [],//更换件明细数据
        }
    },
    components: { equipmentLineDialog },
    props: {
        sourceData: {
          require: false,
        },
        productId:String,
        workOrderId: String,
        approvalstatus: '',
    },
    mounted: function() {
      // this._fetchRecords();
      // this.$nextTick(this._fetchRecords);
      // if (this.sourceData)  {
      //   this.equipmentLineData = this.sourceData;
      // }
      // else {
      //   // this.$nextTick(this._fetchRecords);
      //   // this._fetchRecords();
      //   this.equipmentLineData = null;
      // }

      this.equipmentLineData = [];
      this._fetchRecords();
    },
    methods: {
        //加载更换件明细
        _fetchRecords: function() {

            if (this.workOrderId) {
                this.loading = true;
                var requestStr = '../api/WorkOrder/PartsLine/' + this.workOrderId;
                rt.get(requestStr).then((res) => {
                    this.equipmentLineData = res;
                    this.loading = false;
                }).catch((error) => {
                    rt.showErrorToast(error);
                    this.loading = false;
                });
            }
        },
        //刷新更换件明细列表
        reLoadeq: function() {
            this._fetchRecords();
            this.$emit('reLoad');
        },
        //删除更换件明细
        deleteData: function() {
            var selection = this.$refs.gridTable.selection;
            if (this.approvalstatus != 1 && this.approvalstatus != 4 || this.approvalstatus == 5) {
                this.$message({
                    type: 'warning',
                    message: this.$t('NotSingleAndRejectCanNotDel')
                })
                return;
            }
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
                    var deleteList = [];
                    for (var i in selection) {
                        deleteList.push(selection[i].id);
                    }
                    var params = deleteList;
                    var requestStr = '../api/WorkOrder/DeletePartsLine';
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
        //弹出更换件明细Dialog（新增）
        showequipmentLine: function() {
          var requestStr = '../api/WorkOrder/GetProductCondition';
          rt.get(requestStr).then((res) => {
            //需要根据服务BOM进行过滤
            if(res==true&&rt.isNullOrWhiteSpace(this.productId)){
              this.$emit(
                  "focusProduct",
                  true
              );
              rt.showErrorToast(this.$t("SelectProdut"));
            }
            else{
              if (this.approvalstatus != 1 && this.approvalstatus != 4 || this.approvalstatus == 5) {
                this.$message({
                    type: 'warning',
                    message: this.$t('NotSingleAndRejectCanNotAdd')
                })
                return;
            }
            if (this.workOrderId) {
                this.$refs.equipmentLine.show('');//调用子组件函数时传递参数（空或者是明细的id）
            }
            else {
                this.$message({
                    type: 'warning',
                    message: this.$t('PleaseSave')
                });
              }
            }
          }).catch((error) => {
              rt.showErrorToast(error);
          })

          // if(rt.isNullOrWhiteSpace(this.productId)){       
          //    this.$emit(
          //         "focusProduct",
          //         true
          //     );
          //     rt.showErrorToast(this.$t("SelectProdut"));


          // }
          // else{
          //   if (this.approvalstatus != 1 && this.approvalstatus != 4 || this.approvalstatus == 5) {
          //       this.$message({
          //           type: 'warning',
          //           message: this.$t('NotSingleAndRejectCanNotAdd')
          //       })
          //       return;
          //   }
          //   if (this.workOrderId) {
          //       this.$refs.equipmentLine.show('');//调用子组件函数时传递参数（空或者是明细的id）
          //   }
          //   else {
          //       this.$message({
          //           type: 'warning',
          //           message: this.$t('PleaseSave')
          //       });
          //     }
          //   }
        },
        //双击行弹出更换件明细Dialog（编辑）
        doubleClick: function(row) {
            if (this.approvalstatus != 1 && this.approvalstatus != 4 || this.approvalstatus == 5) {
                this.$message({
                    type: 'warning',
                    message: this.$t('NotSingleAndRejectCanNotModify')
                })
                return;
            }
            this.$refs.equipmentLine.show(row.id);
        },
        //点击第一列数据弹出更换件明细Dialog（编辑）
        gotoEditPage: function(row) {
            if (this.approvalstatus != 1 && this.approvalstatus != 4 || this.approvalstatus == 5) {
                this.$message({
                    type: 'warning',
                    message: this.$t('NotSingleAndRejectCanNotModify')
                })
                return;
            }
            this.$refs.equipmentLine.show(row.id);
        },
    }
}
</script>
