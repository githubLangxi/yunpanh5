<template>
  <div class="partsReturnEdit">
    <rt-header>
      <rt-toolbar showBack @goback="beforeGoBack">
         <rt-button text="打印" type="print" @click="printContent" v-show="partsreturnid!=''" />
      </rt-toolbar>
    </rt-header>
    <div id="printDiv">
    
        <table class="tb" v-for="(item,index) in tableData">
            <tr class="tr">
                <td colspan="7" class="titletd"><span class="title">旧件退回标签单</span></td>
            </tr>
            <tr>
                <td class="th">营销中心</td>
                <td class="td">{{item.new_businessunit_idName}}</td>
            </tr>
            <tr>
                <td class="th">维修网点</td>
                <td class="td">{{item.new_station_idName}}</td>
            </tr>
            <tr>
                <td class="th">服务单号</td>
                <td class="td">{{item.new_srv_workorder_idName}}</td>
            </tr>
            <tr>
                <td class="th">用户姓名</td>
                <td class="td">{{item.new_accountname}}</td>
            </tr>
               <tr>
                <td class="th">联系电话</td>
                <td class="td">{{item.new_phone}}</td>
            </tr>
            <tr>
                <td class="th">故障原因</td>
                <td class="td">{{item.new_srv_errorgroup_idName}}</td>
            </tr>
            <tr>
                <td class="th">故障现象描述</td>
                <td class="td">{{item.new_troubledesc}}</td>
            </tr>
            <tr>
                <td class="th">物料描述</td>
                <td class="td">{{item.new_partsdesc}}</td>
            </tr>
             <tr>
                <td class="th">物料编码</td>
                <td class="td">{{item.new_partscode}}</td>
            </tr>
            <tr>
                <td class="th">整机型号</td>
                <td class="td"></td>
            </tr>
            <tr>
                <td class="th">物料厂家名称</td>
                <td class="td"></td>
            </tr>
            <tr>
                <td class="th">故障机条码</td>
                <td class="td">{{item.new_number}}</td>
            </tr>
               <tr>
                <td class="th">故障机</td>
                <td class="td">{{item.new_userprofile_idName}}</td>
            </tr>
            <tr>
                <td class="th">维修日期</td>
                <td class="td">{{item.new_fixtime}}</td>
            </tr>
            <tr>
                <td class="th">购机日期</td>
                <td class="td">{{item.new_purchase_date}}</td>
            </tr>
            <tr>
                <td class="th">条形码</td>
                <td class="td"></td>
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
                //tableData:[{a:1},{b:2},{c:3},{d:4},{e:5}]
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
            "../api/PartsReturn/GetPartsReturnPrintLabelById/" + this.partsreturnid;
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
     .titletd
    {
         line-height: 25px;
    }
    .tb{
        margin-left:10px;
        margin-top:10px;
        width:45%;
        height:48%;
        border:1px solid;
        float:left;
    }
    .th{
        width:30%;
        height: 20px;
        font-size: 16spx;
        line-height: 20px;
        border:1px solid;
        white-space: nowrap;
        text-align: center;
        padding:3px 0px 3px 0px;
    }
    .tr{
        text-align: center;
        border:1px solid;
        height: 20px;
        font-size: 14spx;
        line-height: 20px;
        white-space: nowrap;
        font-weight:bold;
    }
    .td{
        width:120px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        border:1px solid;
        font-weight:normal;
        padding:3px 0px 3px 0px;
    }
</style>