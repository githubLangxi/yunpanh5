<template>
  <div>
    <!--头部操作按钮-->
    <rt-header title="新旧转换单">
      <rt-toolbar showBack @goback="beforeGoBack">
      </rt-toolbar>
    </rt-header>

    <!--主档数据编辑Form-->
    <rt-content>
      <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left" >
        <rt-section title="基本信息">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="新旧转换单号">
                <el-input v-model="editForm.new_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="8">
              <el-form-item label="转换类型">
                <rt-picklist v-model="editForm.new_type" entity="new_srv_changeorder" attribute="new_type" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位类别">
                <rt-picklist v-model="editForm.new_butype" entity="new_srv_changeorder" attribute="new_butype" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="提交时间">
              <el-date-picker class="rt-portal-item-date" v-model="editForm.new_submit_time" type="date" placeholder="选择日期" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核状态">
                <rt-picklist v-model="editForm.new_approvalstatus" entity="new_srv_changeorder" attribute="new_approvalstatus" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
              <el-col :span="8">
              <el-form-item label="服务商名称">
                   <el-input v-model="editForm.new_station_idName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
               <el-col :span="8">
              <el-form-item label="中心名称">
                 <el-input v-model="editForm.new_bu_idName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="8">
              <el-form-item label="新件仓库">
               <el-input v-model="editForm.new_stocksitenew_idName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
               <el-col :span="8">
              <el-form-item label="旧件仓库">
                 <el-input v-model="editForm.new_stocksiteold_idName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
      
        </rt-section>
       
          <rt-section title="新旧转换明细">
    <!--头部操作按钮-->
    <template slot="toolbar">
    </template>

    <!--明细列表-->
    <el-table stripe ref="tableData" :data="tableData" max-height="500" v-loading="loading">
      <el-table-column prop="new_product_idName" label="配件名称"  width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="new_partscode" label="配件编码">
      </el-table-column>
      <el-table-column prop="new_uom_idName" label="计量单位">
      </el-table-column>
      <el-table-column prop="new_price" label="价格">
      </el-table-column>
      <el-table-column prop="new_qty" label="申请数量">
      </el-table-column>
      <el-table-column prop="new_amount" label="申请金额">
      </el-table-column>
    </el-table>  
        </rt-section>
      </el-form>
    </rt-content>
  </div>
</template>

<script type="text/javascript">
  export default {
    data(){
      return{
        loading: false,
        editForm:{
          new_name:'',        //转换单号
          new_type:'',        //转换类型
          new_butype:'',      //单位类别
          new_submit_time:'', //提交时间
          new_approvalstatus:'', //审核状态
          new_station_idName:'', //服务商名称
          new_station_id:'',    //服务商名称ID
          new_bu_idName:'',     //中心名称
          new_bu_id:'',         //中心名称id
          new_stocksitenew_idName:'',   //新件仓库
          new_stocksitenew_id:'',
          new_stocksiteold_idName:'',   //旧件仓库
          new_stocksiteold_id:''
        },
        tableData:[]
      };
    },
    mounted: function() {
    this.loadData();            //初始化数据
    },
    methods: {
       loadData: function() {
         this.loading=true;
         if (this.$route.params.id) {
             var self = this;
             //获取转换单信息
              rt.get('../api/ChangeOrder/GetChangeOrderById/'+this.$route.params.id)
            .then(res=>{
              self.editForm=res;
              self.loading=false;
            })
            .catch(error => {
              rt.showErrorToast(error);
              self.loading = false;
            });
            

            //获取转换单明细
               rt.get('../api/ChangeOrder/GetChangeOrderDetailById/'+this.$route.params.id)
            .then(res=>{
              self.tableData=res;
              self.loading=false;
            })
             .catch(error => {
              rt.showErrorToast(error);
              self.loading = false;
            });
         }
       },
        beforeGoBack: function() {
        this.$router.push({ name: "changeOrderList" })
      }
    }
  };
</script>