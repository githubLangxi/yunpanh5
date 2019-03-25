<template>
  <div>
    <!--头部操作按钮-->
    <rt-header title="服务商清算单">
      <rt-toolbar showBack @goback="beforeGoBack">
    
      </rt-toolbar>
    </rt-header>


    <!--主档数据编辑Form-->
    <rt-content>
      <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left">
        <rt-section title="基础信息">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="清算单号">
                <el-input v-model="editForm.new_name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务商名称">
                <el-input v-model="editForm.new_station_idName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="清算类型">
                <rt-picklist v-model="editForm.new_liquidationtype" entity="new_liquidation" :disabled="true" attribute="new_liquidationtype"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
        
          <el-row :gutter="50">
                  <el-col :span="8">
              <el-form-item label="清算开始时间" >
                  <el-date-picker class="rt-portal-item-date" v-model="editForm.new_begintime" type="date" placeholder="选择日期" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="允许结束时间" >
                  <el-date-picker class="rt-portal-item-date" v-model="editForm.new_allowendtime" type="date" placeholder="选择日期" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="清算原因" >
                 <rt-picklist v-model="editForm.new_liquidationreason" entity="new_liquidation" :disabled="true" attribute="new_liquidationreason"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="清算状态" >
                <rt-picklist v-model="editForm.new_liquidationstatus" entity="new_liquidation" :disabled="true" attribute="new_liquidationstatus"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="核查剩余天数">
                   <el-input v-model="editForm.new_checksurplusdays" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="清算实际结束时间" >
                <el-date-picker class="rt-portal-item-date" v-model="editForm.new_actualendtime" type="date" placeholder="选择日期" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
             <el-col :span="8">
              <el-form-item label="转账服务商">
                   <el-input v-model="editForm.new_transferstation_idName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品线" >
              <el-input v-model="editForm.new_productgroup_idName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="清算剩余天数" >
                 <el-input v-model="editForm.new_liquidationsurplusdays" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
             <el-col :span="8">
              <el-form-item label="核销单号">
                   <el-input v-model="editForm.new_verification" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="撤回时间" >
              <el-date-picker class="rt-portal-item-date" v-model="editForm.new_reverttime" type="date" placeholder="选择日期" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
      </el-form>
    </rt-content>
  </div>
</template>


<script type="text/javascript">
export default {
  data() {
    return {
      new_liquidationid: "", //清算单id
    
      /*表单数据*/
      editForm: {
        new_name: "", //清算单号
        new_station_idName: "", //服务商名称
        new_liquidationtype: "", //清算类型
        new_begintime: null, //清算开始时间
        new_allowendtime: null, //允许结束时间
        new_liquidationreason: "", //清算原因
        new_liquidationstatus: "", //清算状态
        new_checksurplusdays: "", //核查剩余天数
        new_actualendtime: null, //清算实际结束时间
        new_transferstation_idName: "", //转账服务商
        new_productgroup_idName: "", //产品线
        new_liquidationsurplusdays: "", //清算剩余天数
        new_verification: "", //核销单号
        new_reverttime: null //撤回时间
      }
    };
  },
  components: {
  
  },
    created: function() {
    if (this.$route.params.id) {
      this.new_liquidationid = this.$route.params.id;
    }
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    //数据加载
    loadData: function() {
      var self = this;
      rt.get(
        "../api/NewLiquidation/GetNewLiquidationbyID/" +
          self.new_liquidationid
      )
        .then(function(res) {
          self.editForm = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
     //返回按钮之前提示保存申请单数据
    beforeGoBack: function() {
      this.$router.push({ name: "liquidationlist" })
    }
  }
};
</script>