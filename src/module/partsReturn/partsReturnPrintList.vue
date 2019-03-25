<template>
  <div class="partsReturnEdit">
    <rt-header>
      <rt-toolbar showBack @goback="beforeGoBack">
         <rt-button text="打印" type="print" @click="printContent" v-show="partsreturnid!=''" />
      </rt-toolbar>
    </rt-header>
    <div id="printDiv">
        <table class="tb">
            <tr class="tr">
                <td colspan="7"><span class="title">旧件退回机打清单</span></td>
            </tr>
            <th class="th" width="140px">
               工单号
            </th>
            <th class="th" width="250px">
               故障原因
            </th>
            <th class="th" width="140px">
               营销中心
            </th>
            <th class="th" width="200px">
               维修网点
            </th>
            <th class="th" width="140px">
               物料编码
            </th>
            <th class="th" width="250px">
               物料描述
            </th>
            <th class="th" width="140px">
               维修日期
            </th>
            <tr :class="tr" v-for="(item,index) in tableData">
                <td class="td" width="140px">{{item.new_srv_workorder_idName}}</td>
                <td class="td" width="250px">{{item.new_srv_errorgroup_idName}}</td>
                <td class="td" width="140px">{{item.new_businessunit_idName}}</td>
                <td class="td" width="200px">{{item.new_station_idName}}</td>
                <td class="td" width="140px">{{item.new_partscode}}</td>
                <td class="td" width="250px">{{item.new_partsdesc}}</td>
                <td class="td" width="140px">{{item.new_fixtime}}</td>
            </tr>
        </table>
    </div>
  </div>
</template>
<script>
    export default{
        data(){
            return{
                partsreturnid:"",
                tableData:[]
            }
        },
        mounted: function() {
            if (this.$route.params.id) {
                this.partsreturnid = this.$route.params.id;
                this.initData();
            }            
        },
        methods: {
        initData(){
            var that = this;
            var apiUrl =
            "../api/PartsReturn/GetPartsReturnPrintListById/" + this.partsreturnid;
                rt
                .get(apiUrl)
                .then(res=>{
                    that.tableData=res;
                })
                .catch(e=>{

                });
        },
        printContent(){
                let subOutputRankPrint = document.getElementById('printDiv');
                let newContent =subOutputRankPrint.innerHTML;
                let oldContent = document.body.innerHTML;
                document.body.innerHTML = newContent;
                window.print();
                window.location.reload();
                document.body.innerHTML = oldContent;
                return false;
            },
        beforeGoBack: function() {
           this.$router.push({ name: 'PartsReturnEdit', params: { id: this.partsreturnid } });
        }
         }
    };
</script>
<style>
    .title
    {
        font-size: 22px;
    }
    .tb{
        margin-top:10px;
        width:100%;
        border:1px solid;
    }
    .th{
        height: 20px;
        font-size: 16px;
        line-height: 20px;
        border:1px solid;
    }
    .tr{
        text-align: center;
        border:1px solid;
    }
    .td{
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        border:1px solid;
        font-weight:normal;
        font-weight:normal;
    }
</style>