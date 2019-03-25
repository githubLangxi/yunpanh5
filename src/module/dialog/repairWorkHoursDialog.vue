<template>
    <!--维修项目-->
    <el-dialog :title="$t('Inquery')" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <el-form>
            <el-form-item :label="$t('InqueryCon')">
                <el-input v-model="lookupCondition" auto-complete="off" icon="search" :on-icon-click="lookupsearch" @keyup.enter.native="lookupsearch"></el-input>
            </el-form-item>
            <!-- <el-table :data="dialogtableData" style="width: 100%" max-height="500" highlight-current-row @current-change="selectRowChange" @row-dblclick="lookupSelect" v-loading="loading">
                <el-table-column v-for="item in lookupOptions" :key="item.label" :prop="item.name" :label="item.label">
                </el-table-column>
            </el-table> -->
            <el-table  :data="dialogtableData" style="width: 100%" max-height="500" highlight-current-row @current-change="selectRowChange" @row-dblclick="lookupSelect" v-loading="loading">
            <el-table-column :label="$t('MaintenanceTimeDes')" prop="new_srv_workhours_idname" >
            </el-table-column>
            <el-table-column :label="$t('LaborHourUnitPrice')" prop="new_workhourprice" >
            </el-table-column>
        </el-table>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-bind:current-page="currentPage" v-bind:page-sizes="[3, 5, 10, 20]" v-bind:page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" v-bind:total="dataTotalCount">
                </el-pagination>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="lookupSelect">{{$t('BUTTON_DETERMINE')}}</el-button>
            <el-button @click="handleClose">{{$t('BUTTON_CANCEL')}}</el-button>
            <el-button @click="lookupSelectClear">{{$t('BUTTON_REMOVE')}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'repairWorkHours',
    data: function() {
        return {
            loading: false,
            dialogFormVisible: false,
            dialogtableData: [],
            lookupOptions: [],//所需查询的数据列
            currentPage: 1,//当前页
            pageSize: 10,//页面大小
            dataTotalCount: 0,//s数据总数
            lookupCondition: '',//可输入查询条件
            quickSearch: 'new_name',//快速查询输入条件,
        }
    },
    props:{
      workOrderId:String,
      projectId:String
    },
    methods: {
        //查找配件
        show: function() {
            this.dialogFormVisible = true;
            this.dialogtableData = [];
             var requestStr = '../api/WorkOrder/GetRepairList'
                + '?workorderId=' + this.workOrderId
                + "&pageIndex=" + this.currentPage
                + "&projectId="+this.projectId
                + "&pageSize=" + this.pageSize
                + "&query="+this.lookupCondition;
            rt.get(requestStr).then((res) => {
              if(res!=null){
                for(var i in res.repairList){
                  if(res.repairList[i]["new_workhourprice"]==0){
                    res.repairList[i]["new_workhourprice"]=res.repairList[i]["new_workhourcost"];
                  }
                }
                this.dialogtableData=res.repairList;
                this.dataTotalCount=res.totalRecordCount;
              }
              // this.dialogtableData=res;
            }).catch((error) => {
                rt.showErrorToast(error);
            }).finally(() => {
                this.loading = false;
            });


            // this.lookupOptions = [{ label: this.$t('MaintenanceTimeDes'), name: 'new_name' }, { label: this.$t('LaborHourUnitPrice'), name: 'new_hourcost' }]
            // var params = {
            //     entityName: 'new_srv_workhours',
            //     attributeList: 'new_name,new_standardhour,new_hourcost',
            //     pageIndex: this.currentPage,
            //     pageSize: this.pageSize,
            //     IsActive: true
            // }
            // var lookupQueryStr = '/api/Lookup/GetLookupData';

            // if (this.lookupapi) {
            //     lookupQueryStr = this.lookupapi;
            // }

            // if (this.lookupCondition) {
            //     params.quickSearch = this.quickSearch + '-' + this.lookupCondition;
            // }
            // this.attrList = params.attributeList.split(',');
            // let that = this;

            // rt.post(lookupQueryStr, params).then(function(res) {
            //     var data = res;
            //     that.dataTotalCount = data.TotalRecordCount;

            //     for (var i in data.Entities) {
            //         var result = data.Entities[i];
            //         var resultlength = result.Attributes.length;
            //         var obj = {};
            //         obj.checked = false; //声明标志位，表示该列是否被选中，默认为false
            //         obj.new_id = result.Attributes[resultlength - 1].Value;
            //         for (var m in result.Attributes) {
            //             if (typeof result.Attributes[m].Value === "object") {
            //                 obj[result.Attributes[m].Key] = result.Attributes[m].Value.Name;
            //                 if (result.Attributes[m].Key === 'new_hourcost') {
            //                     obj[result.Attributes[m].Key] = result.Attributes[m].Value.Value;
            //                 }
            //             }
            //             else {
            //                 obj[result.Attributes[m].Key] = result.Attributes[m].Value;
            //             }
            //         }
            //         //获取部分格式化后的数据
            //         // for (var j in result.FormattedValues) {
            //         //     var format = result.FormattedValues[j];
            //         //     obj[format.Key] = format.Value;
            //         // }
            //         that.dialogtableData.push(obj); //将obj添加到数据集
            //     }

            // })
            //     .catch((error) => {
            //         rt.showErrorToast(error);
            //     });
            // return;
        },
        lookupSelect: function() {
            if (this.currentRow == null || this.currentRow == '') {
                rt.showErrorToast(this.$t('PleaseChooseAtLeastOne'))
                return;
            }
            this.dialogFormVisible = false;
            this.lookupCondition = '';//清空查询条件
            this.$emit('lookupSelect', this.currentRow.id, this.currentRow.new_srv_workhours_idname, this.currentRow.new_standardhour, this.currentRow.new_workhourprice,this.currentRow.new_workhourcost);
        },
        //lookup的页面尺寸变更
        handleSizeChange: function(val) {
            this.pageSize = val;
            this.show();
        },
        //lookup的页码变更
        handleCurrentChange: function(val) {
            this.currentPage = val;
            this.show();
        },
        //lookup选中行
        selectRowChange: function(val) {
            this.currentRow = val;
        },
        lookupsearch: function() {
            this.show();
        },
        lookupSelectClear: function() {
            this.dialogFormVisible = false;
            this.lookupCondition = '';//清空查询条件
            this.$emit("lookupSelectClear");
        },
        handleClose: function() {
            this.dialogFormVisible = false;
            this.lookupCondition = '';//清空查询条件
        }
    }
}
</script>
