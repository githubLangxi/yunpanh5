<template>
  <div>
    <!--头部操作按钮-->
    <rt-header :title="$t('new_order')">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button type="save" @click="onSave('editForm')" v-show="editForm.new_orderstatus==1 || editForm.new_orderstatus==4" />
        <rt-button type="confirm" @click="onSubmit" v-show="editForm.new_orderstatus==1 || editForm.new_orderstatus==4" :disabled="isconfirming"/>
      </rt-toolbar>
    </rt-header>

    <!--主档数据编辑Form-->
    <rt-content>
      <el-form ref="editForm" :model="editForm" label-width="120px" :rules="rules" label-position="left">
        <rt-section :title="$t('BaseInfo')">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item :label="$t('new_order.new_name')" :disabled="disabledform">
                <el-input v-model="editForm.new_name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" prop="new_type">
              <el-form-item label="产品线" prop="new_productgroup_id">
                <el-input v-model="editForm.new_productgroup_idname" readonly @keyup.enter.native="quickChooseGroup" :disabled="neworderid!=''" icon="search" :on-icon-click="groupLookup"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配件类型" prop="new_parttype">
                <rt-picklist v-model="editForm.new_parttype" entity="new_order" :disabled="disabledform" attribute="new_parttype"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item :label="$t('new_order.new_stocksite_id')" prop="new_stocksite_id">
                 <el-input v-model="editForm.new_stocksite_idName" readonly :disabled="true" icon="search"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="零售状态" >
                <rt-picklist v-model="editForm.new_orderstatus" entity="new_order" :disabled="true" attribute="new_orderstatus"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="确认时间">
              <el-date-picker class="rt-portal-item-date" v-model="editForm.new_confirmtime" type="date" placeholder="选择日期" :disabled="editForm"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
            <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="奥克斯公司别">
                   <rt-picklist v-model="editForm.new_auxcompany" entity="new_order" :disabled="true" attribute="new_auxcompany"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="销售类型" prop="new_type">
                <rt-picklist v-model="editForm.new_type" entity="new_order" :disabled="true" attribute="new_type"></rt-picklist>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="总金额" prop="new_amount">
                <el-input v-model="editForm.new_amount" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="是否需要发票" prop="new_isprovideinvoice">
                   <rt-picklist v-model="editForm.new_isprovideinvoice" entity="new_order" :disabled="disabledvoice" attribute="new_isprovideinvoice"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票类型" prop="new_invoicetype">
                <rt-picklist v-model="editForm.new_invoicetype" entity="new_order" :disabled="disabledvoice" attribute="new_invoicetype"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
     
          <NewOrderDetailView ref="neworderdetail" v-if="neworderid!==''" :disabled="editForm.new_orderstatus!=1" :mainid="neworderid" :productgroupid="editForm.new_productgroup_id" @reloadEdit="initData" :newname="editForm.new_name" :stocksiteid="editForm.new_stocksite_id" :parttype="editForm.new_parttype" @ievent="ievent"></NewOrderDetailView>
        <ProductGroupDialog ref="productGroupDialog" @lookupSelect="selectGroup" @lookupSelectClear="clearGroup"></ProductGroupDialog>
      </el-form>
    </rt-content>
  </div>
</template>

<script type="text/javascript">
import NewOrderDetailView from "./newOrderDetailView";
import ProductGroupDialog from "../dialog/productgroupDialog"
import Vue from "vue";
import moment from "moment";
import VueMomentJS from "vue-momentjs";
Vue.use(VueMomentJS, moment);
export default {
  data() {
    return {
      neworderid: "", //主档ID
      isconfirming:false, //禁用按钮
      /****************/
      //主档数据编辑项数据
      /****************/
      disabledvoice:false, 
      disabledform: false /*控制编辑项是否可用*/,
      flowDialogVisible: false, //签核提交是否可见
    
      /*表单数据*/
      editForm: {
        new_name: "", //配件申请单号
        new_type:"",              //销售类型
        new_parttype:"",          //配件类型
        new_stocksite_id: "",     //仓库
        new_stocksite_idName:"",  //仓库名称
        //第二行
        new_orderstatus: "",      //订单状态
        new_confirmtime:"",       //确认时间
        new_srv_station_id:"",
        //第三行
        new_auxcompany:"",         //奥克斯公司别
        new_productgroup_id:"",           //产品线ID
        new_productgroup_idname:"",       //产品线名称
        new_amount:"",             //总金额
        new_isprovideinvoice:"",   //是否需要发票
        new_invoicetype:""         //发票类型
      },
      rules: {
        new_type: [
          {
            type: "number",
            required: true,
            message: "请选择销售类型",
            trigger: "change"
          }
        ],
          new_parttype: [
          {
            type: "number",
            required: true,
            message: "请选择配件类型",
            trigger: "change"
          }
        ],
         new_isprovideinvoice: [
          {
            type: "number",
            required: true,
            message: "是否需要发票",
            trigger: "change"
          }
        ],
          new_invoicetype: [
          {
            type: "number",
            required: true,
            message: "请选择发票类型",
            trigger: "change"
          }
        ],
        new_stocksite_id: [
          {
            type: "string",
            required: true,
            message: "请选择服务站仓库",
            trigger: "change"
          }
        ],
        new_productgroup_id:[
          {
            type: "string",
            required: true,
            message: "请选择产品线",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: { NewOrderDetailView,ProductGroupDialog },
  computed: {
    new_type(){
      return this.editForm.new_type;
    },
    new_productgroup_id(){
      return this.editForm.new_productgroup_id
    },
    new_isprovideinvoice(){
      return this.editForm.new_isprovideinvoice
    },
    new_invoicetype(){
      return this.new_invoicetype
    }
  },
  watch: {
  },
  mounted: function() {
    if (this.$route.params.id) {
      this.neworderid = this.$route.params.id;
    }
    this.initData();
  },

  methods: {
    /*****************/
    /**初始化编辑页面**/
    /*****************/
    //初始化数据
    initData: function() {
      var self = this;
      if (self.neworderid == "") {
        rt
          .get("../api/NewSrvStation/GetBasicStation")
          .then(function(res) {
            self.editForm.new_srv_station_id = res.new_srv_stationid;
          })
          .catch(error => {
          
            rt.showErrorToast(error);
          });
          self.editForm.new_type=1;
          self.editForm.new_orderstatus=1;
          //self.editForm.new_auxcompany=1120;
          this.$watch('editForm.new_type', this.typeChange)
          this.$watch('editForm.new_parttype', this.parttypeChange)
          this.$watch('editForm.new_productgroup_id',this.productGroupChange)
      } else {
        this.loadData();
      }
    },
      //获取子组件中tableDate的数据，为空不能进行发运确认
    ievent: function(data) {
      
      if(this.editForm.new_orderstatus==1 ||this.editForm.new_orderstatus==4 || this.editForm.new_orderstatus=="")
      {
        if(data.length>0)
        {
          
          this.disabledform=true;
        }
        else
        {
          this.disabledform=false;
        }
      }
     
    },
     //显示产品线Dialog
    groupLookup: function() {
      if(this.neworderid!='')
      {
        return;
      }
      this.$refs.productGroupDialog.show(this.editForm.new_productgroup_idname);
    },
    //产品线选择
    selectGroup: function(data) {
      if (
        this.editForm.new_productgroup_id == data.id &&
        this.editForm.new_productgroup_idname == data.name
      ) {
        return;
      } else {
        this.editForm.new_productgroup_id = data.id;
        this.editForm.new_productgroup_idname = data.name;
      }
    },
    //清除产品线数据
    clearGroup: function() {
      this.editForm.new_productgroup_id = "";
      this.editForm.new_productgroup_idname = "";
    },
    //数据加载
    loadData: function() {
    
      var self = this;
      rt
        .get("../api/NewOrder/GetNewOrderLine/" + self.neworderid)
        .then(function(res) {
          self.editForm = res;
          if (
            self.editForm.new_orderstatus != 1 &&
            self.editForm.new_orderstatus != 4
          ) {
            self.disabledform = true;
            self.disabledvoice=true;
          }
          self.$watch('editForm.new_type', self.typeChange)
          self.$watch('editForm.new_parttype', self.parttypeChange)
          self.$watch('editForm.new_productgroup_id',self.productGroupChange)
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    //产品线改变事件
    productGroupChange:function(val,oldVal)
    {
        var self=this;
              rt.get("../api/NewOrder/GetAuxCompanyByGroupid/" + self.editForm.new_productgroup_id)
                .then(data=>{
                  self.editForm.new_auxcompany=data;      //公司别
                })
                .catch(error => {
               
                  rt.showErrorToast(error);
                });
    },
    //销售类型改变事件
    typeChange:function(val,oldVal)
    {
         var url='';
         switch(val)
         {
           //零售
           case 1:
           {
              //url='../api/NewSrvStation/GetStationNewStock/' + this.editForm.new_srv_station_id;
           }
           break;
           //报损
           case 2:
           {
               //url='../api/NewSrvStation/GetStationOldStock/' + this.editForm.new_srv_station_id;
               alert("报损类型不可选，请重新选择");
               this.editForm.new_type='';
               this.editForm.new_parttype='';
               this.editForm.new_stocksite_id='';
               this.editForm.new_stocksite_idName='';
               return;
           }
           break;
             case 3:
           {
               
               alert("自动零售类型不可选，请重新选择");
               this.editForm.new_type='';
               this.editForm.new_parttype='';
               this.editForm.new_stocksite_id='';
               this.editForm.new_stocksite_idName='';
               return;
           }
           break;
         }
    },//配件类型改变事件
    parttypeChange:function(val,oldVal)
    {
          //产品线
          if(this.editForm.new_productgroup_id==''&&this.editForm.new_parttype!="")
          {
            this.editForm.new_parttype="";
            alert("请选择产品线");
            return;
          }
     
         var url='';
         switch(val)
         {
           //新件
           case 1:
           {
              url='../api/NewSrvStation/GetStationNewStock';
           }
           break;
           //旧件
           case 2:
           {
              url='../api/NewSrvStation/GetStationOldStock';
           }
           break;
  
         }
         
         var param={
           new_srv_station_id:this.editForm.new_srv_station_id,
           new_productgroup_id:this.editForm.new_productgroup_id
         }

          if(this.editForm.new_srv_station_id!='' && this.editForm.new_srv_station_id !=null && this.editForm.new_srv_station_id!=undefined && url!='')   
          {
            var self=this;
              rt.get(url,param)
                .then(data=>{
                    self.editForm.new_stocksite_id=data.Id; //新件仓库ID
                    self.editForm.new_stocksite_idName=data.Name;   //新件仓库名称
                })
                .catch(error => {
               
                  rt.showErrorToast(error);
                });
          }
    },
    /*****************/
    /***主档数据操作***/
    /*****************/
    //保存方法
    onSave: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this;
          var newOrder = self.editForm;
          var params = {
            new_name: newOrder.new_name, //配件申请单号
            new_srv_station_id: newOrder.new_srv_station_id, //服务站Id
            new_type:newOrder.new_type,       //销售类型
            new_parttype:newOrder.new_parttype, //配件类型
            new_stocksite_id:newOrder.new_stocksite_id, //仓库
            new_stocksite_idName:newOrder.new_stocksite_idName,
            new_orderstatus:newOrder.new_orderstatus,
            new_auxcompany:newOrder.new_auxcompany,        //奥克斯公司别
            new_productgroup_id:newOrder.new_productgroup_id,    //产品线
            new_isprovideinvoice:newOrder.new_isprovideinvoice,   //是否需要发票
            new_invoicetype:newOrder.new_invoicetype              //发票类型
          };
          /*创建*/
          if (self.neworderid == "") {
            rt
              .post("../api/NewOrder/SaveNewOrder", params)
              .then(function(res) {
                rt.showSuccessToast(self.$t("Successfullycreated"));
                self.neworderid = res;
                self.initData();
                self.$router.replace({
                  name: "neworderedit",
                  params: { id: self.neworderid }
                });
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          } else {
            /*更新*/
            params.new_orderid = self.neworderid;
            rt
              .post("../api/NewOrder/SaveNewOrder", params)
              .then(function(res) {
                rt.showSuccessToast(self.$t("Successfullysaved"));
                self.initData();
                self.$router.replace({
                  name: "neworderedit",
                  params: { id: self.neworderid }
                });
              })
              .catch(error => {
               
                rt.showErrorToast(error);
              });
          }
        } else {
          this.$message({
            message: this.$t("PleaseInputRequiredFields"),
            type: "error"
          });
        }
      });
    },
    //确认方法
    onSubmit: function() {
      this.isconfirming=true;
      var that = this;
      if (that.neworderid != "") {
        var submitStr = "../api/NewOrder/SubmitApply";
        var params = {
          new_orderid: that.neworderid,
          new_srv_station_id: that.editForm.new_srv_station_id
        };
        rt
          .post(submitStr, params)
          .then(function(res) {
            rt.showSuccessToast(that.$t("Successfullyconfirmed"));
            that.initData();
            that.isconfirming=false;
          })
          .catch(error => {
            that.isconfirming=false;
            rt.showErrorToast(error);
          });
      } else {
        that.isconfirming=false;
        rt.showErrorToast(that.$t("PleaseSaveAndAdd"));
      }
    },
    //加载下拉框选项
    loadSelectOption: function() {
      var selectStr = "../api/PartsApply/GetStockSite";
      rt.get(selectStr).then(res => {
        this.stocksiteOptions = res;
      });
    },
    //返回按钮之前提示保存申请单数据
    beforeGoBack: function() {
      if (rt.isNullOrWhiteSpace(this.neworderid)) {
        this.$confirm(this.$t("NewOrderNotSaveSureQuit"), this.$t("Tip"), {
          confirmButtonText: this.$t("BUTTON_DETERMINE"),
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: this.$t("BUTTON_CANCEL"),
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            this.$router.push({ name: "neworderlist" });
          })
          .catch(() => {});
      } else {
        this.$router.push({ name: "neworderlist" });
      }
    }
  }
};
</script>
