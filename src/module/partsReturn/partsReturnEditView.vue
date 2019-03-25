<template>
  <div class="partsReturnEdit">
    <rt-header :title="$t('new_srv_partsreturn')">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button text="清单打印" type="print" @click="listPrint" v-show="partsreturnid!=''" />
        <rt-button text="标签打印" type="print" @click="labelPrint" v-show="partsreturnid!=''" />
        <rt-button type="save" @click="save('queryForm')" v-show="partsreturnid==''||queryForm.new_status==1" />
        <rt-button :text="$t('DeliveryConfirm')" type="confirm" @click="confirm" v-show="partsreturnid!=''&&(queryForm.new_status==1||queryForm.new_status==4)" :disabled="isconfirming"/>
      </rt-toolbar>
    </rt-header>

    <rt-content>
      <el-form ref="queryForm" :model="queryForm" :rules="rules" label-width="120px" label-position="left">
        <rt-section :title="$t('BaseInfo')">
          <el-row :gutter="50" class="rt-portal-form-row">
            <el-col :span="8">
              <el-form-item :label="$t('new_srv_partsreturn.new_name')">
                <el-input v-model="queryForm.new_name" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="返还类型">
                <rt-picklist v-model="queryForm.new_type" entity="new_srv_partsreturn" attribute="new_type" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收货仓库" >
              <el-input v-model="queryForm.new_stocksite_receiveidname" readonly  :disabled="true" icon="search" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50" class="rt-portal-form-row">
            <el-col :span="8">
              <el-form-item label="产品线">
                <el-input v-model="queryForm.new_productgroup_idname" readonly @keyup.enter.native="quickChooseGroup" :disabled="partsreturnid!=''" icon="search" :on-icon-click="groupLookup"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="旧件类型" prop="new_partstype">
                <rt-picklist v-model="queryForm.new_partstype" entity="new_srv_partsreturn" attribute="new_partstype" :disabled="disabledPartstype"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物流状态" >
               <rt-picklist v-model="queryForm.new_status" entity="new_srv_partsreturn" attribute="new_status" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
           <el-row :gutter="50" class="rt-portal-form-row">
            <el-col :span="24">
              <el-form-item label="返还原因">
                <el-input :autosize="true" type="textarea" v-model="queryForm.new_reason" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50" class="rt-portal-form-row">
            <el-col :span="24">
              <el-form-item :label="$t('new_srv_partsreturn.new_memo')">
                <el-input :autosize="true" type="textarea" v-model="queryForm.new_memo" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50" class="rt-portal-form-row" v-if="queryForm.new_bhmemo!=''">
            <el-col :span="24">
              <el-form-item label="驳回原因">
                <el-input :autosize="true" type="textarea" v-model="queryForm.new_bhmemo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
        
        <rt-section title="物流信息">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="物流公司">
                 <rt-picklist v-model="queryForm.new_logistics_company" entity="new_srv_partsreturn" attribute="new_logistics_company" :disabled="disabledLogistic"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发运日期">
               <el-date-picker class="rt-portal-item-date" v-model="queryForm.new_sendon" :disabled="true"></el-date-picker>
            
              </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="签收日期">
                <el-date-picker class="rt-portal-item-date" v-model="queryForm.new_receiveddate" disabled></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
           <el-row :gutter="50">
           <el-col :span="8">
              <el-form-item label="签收人">
                <el-input icon="search" disabled v-model="queryForm.new_systemuser_idname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="收货人">
                <el-input v-model="queryForm.new_recipient" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收货电话">
                 <el-input v-model="queryForm.new_recphone" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="省份">
                   <el-input v-model="queryForm.new_province_idname" readonly @keyup.enter.native="quickChooseProvince" :disabled="disabledform" icon="search" :on-icon-click="provinceLookup"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="城市">
                  <el-input v-model="queryForm.new_city_idname" readonly @keyup.enter.native="quickChooseCity" :disabled="disabledform" icon="search" :on-icon-click="cityLookup"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区县">
                   <el-input v-model="queryForm.new_county_idname" readonly @keyup.enter.native="quickChooseCounty" :disabled="disabledform" icon="search" :on-icon-click="countyLookup"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="街道">
                  <el-input v-model="queryForm.new_town_idname" readonly @keyup.enter.native="quickChooseTown" :disabled="disabledform" icon="search" :on-icon-click="townLookup"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="24">
              <el-form-item label="详细地址">
                <el-input type="textarea" v-model="queryForm.new_address" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>

        <!-- 表单状态不是制单和已发运的时候显示  v-show="partsreturnid!=''&&queryForm.new_formstatus!=1||queryForm.new_formstatus!=2"-->
       <!--   <rt-section title="签收信息" v-if="partsreturnid!=''&&queryForm.new_formstatus!=1&&queryForm.new_formstatus!=2">
          <el-row :gutter="50" class="rt-portal-form-row">
            <el-col :span="8">
              <el-form-item label="签收人">
                <el-input icon="search" disabled v-model="queryForm.new_systemuser_idname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签收日期">
                <el-date-picker class="rt-portal-item-date" v-model="queryForm.new_receiveddate" disabled></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>-->

        <!-- 旧件明细 当新建的时候是不显示的 -->
        <partsReturnDetailView ref="partsReturnDetailView" v-if="partsreturnid!=''" :partsreturnId="this.partsreturnid" :isfailureparts="this.queryForm.new_partstype" :productgroupid="this.queryForm.new_productgroup_id" :disabled="disabledform" @ievent="ievent"></partsReturnDetailView>
      </el-form>
    </rt-content>


      <!--Lookup组件-->
    <ProvinceDialog ref="provinceDialog" @lookupSelect="selectProvince" @lookupSelectClear="clear"></ProvinceDialog>
    <CityDialog ref="cityDialog" @lookupSelect="selectCity" @lookupSelectClear="clearCityAndCounty" :provinceid="this.queryForm.new_province_id"></CityDialog>
    <CountyDialog ref="countyDialog" @lookupSelect="selectCounty" @lookupSelectClear="clearCounty" :cityid="this.queryForm.new_city_id"></CountyDialog>
    <TownDialog ref="townDialog" @lookupSelect="selectTown" @lookupSelectClear="clearTown" :countyid="this.queryForm.new_county_id"></TownDialog>
    <SiteStockDialog ref="siteStockDialog" @lookupSelect="selectStocksite" @lookupSelectClear="clearStocksite"> </SiteStockDialog>
    <ProductGroupDialog ref="productGroupDialog" @lookupSelect="selectGroup" @lookupSelectClear="clearGroup"></ProductGroupDialog>
  </div>
</template>
<script>
import partsReturnDetailView from "./partsReturnDetailView";
import RTFlowSubmit from "@/components/flow/flowSubmit";
import RTFlowApprovalList from "@/components/flow/flowApprovallist";
import ProvinceDialog from "../dialog/provinceDialog";
import CityDialog from "../dialog/cityDialog";
import CountyDialog from "../dialog/countyDialog";
import TownDialog from "../dialog/townDialog";
import SiteStockDialog from "../dialog/SiteStockDialog";
import ProductGroupDialog from "../dialog/productgroupDialog"

export default {
  data() {
    // 用户手机号验证规则
    var validatePhone = (rule, value, callback) => {
      if (value.length > 0 && !rt.isCellphone(value)) {
        callback(new Error("电话的格式不正确"));
      } else {
        callback();
      }
    };
    return {
      isconfirming:false,         //按钮禁用
      disabledPartstype:false,    //旧件类型禁用
      disabledLogistic:false,     //物流信息禁用
      needShowPiecesDialog: false, //旧件明细编辑新增lookup
      autoNewFee: 99999, //最高运费金额
      loading: false,
      disabledform: false, //设置表单状态下拉框不可见
      disabled: true,
      isSaveAndClose: false, //保存之后跳转
      partsreturnid: "",
      flowDialogVisible: false, //签核提交是否可见
      flowListDialogVisible: false, //审批记录是否可见
      formStatusOptions: [], //表单状态
      queryForm: {
        new_name: "", //返厂单号
        new_sendby: "", //发运人
        new_phone: "", //发运人电话
        new_sendon: "", //发运日期
        new_carrycompany: "", //运输单位
        new_carryid: "", //发运单号
        new_fee: "", //运费
        new_formstatus: "", //表单状态
        new_systemuser_idname: "", //签收人
        new_receiveddate: "", //签收日期
        new_approvalstatus: "",
        new_totalamount: "", //总金额
        new_memo: "", //备注

        //新增字段
        new_type:"",      //返还类型
        new_stocksite_receiveid:"",   //收货仓库id
        new_stocksite_receiveidname:"", //收货仓库名称
        new_submit_time:"",             //提交时间
        new_status:"",		//物流状态
        new_partstype:"",	//旧件类型
        new_productgroup_id:"",           //产品线ID
        new_productgroup_idname:"",       //产品线名称
        new_reason:"",		//返还原因
        new_logistics:"",	//物流单号
        new_logistics_company:"",	//物流公司
        new_recipient:"",		//收货人
        new_recphone:"",		//收货电话
        new_province_id:"",		//省份
        new_province_idname:"",		
        new_city_id:"",			//城市
        new_city_idname:"",		
        new_county_id:"",		//区县
        new_county_idname:"",		
        new_town_id:"",			//街道
        new_town_idname:"",
        new_address:"",			//详细地址
        new_bhmemo:""       //驳回原因
      },
      rules: {
        new_fee: [
          { pattern: /^([0-9])+(\.[0-9]+)?$/, message: "必须为数字值" }
        ],
        new_siteidname: [
          { required: true, message: "请选择服务站", trigger: "change" }
        ],
        new_partstype:[
           { type: "number",required: true, message: "请选择旧件类型", trigger: "change" }
        ],
        new_productgroup_id: [
          { required: true, message: "请选择产品线", trigger: "change" }
        ],
        new_sendby: [
          { required: true, message: "请输入发运人", trigger: "change" }
        ],
        new_phone: [
          { validator: validatePhone },
          { required: true, message: "请输入手机号", trigger: "change" }
        ],
        new_sendon: [
          {
            type: "date",
            required: true,
            message: "请输入发运日期",
            trigger: "change"
          }
        ],
        new_carrycompany: [
          { required: true, message: "请输入运输单位", trigger: "change" }
        ],
        new_carryid: [
          { required: true, message: "请输入发运单号", trigger: "change" }
        ],
        new_formstatus: [
          {
            type: "number",
            required: true,
            message: "请选择表单状态",
            trigger: "change"
          }
        ]
      },
      tableDate: []
    };
  },
  computed: {
    new_partstype(){
      return this.queryForm.new_partstype;
    },
    new_productgroup_id(){
      return this.queryForm.new_productgroup_id;
    }
  },
  watch:{
     
  },
  components: {
    RTFlowSubmit,
    RTFlowApprovalList,
    partsReturnDetailView,
    ProvinceDialog,
    CityDialog,
    CountyDialog,
    TownDialog,
    SiteStockDialog,
    ProductGroupDialog
  },
  mounted: function() {
    if (this.$route.params.id) {
      this.partsreturnid = this.$route.params.id;
      this.initData();
    }
    else
    {
         this.queryForm.new_type=1;    //返还类型，服务商返厂
         //this.queryForm.new_approvalstatus=1;      //审核状态，制单
         this.queryForm.new_status=1;           //物流状态，待发运
         //this.getFormStatusOptions();
         this.disabledLogistic=true;    
         this.$watch('queryForm.new_partstype', this.partstypeChange)
    }
    
  },
  methods: {
    partstypeChange:function(val,oldVal)
      {
        if(this.queryForm.new_productgroup_id==''&&this.queryForm.new_partstype!="")
        {
          this.queryForm.new_partstype="";
          alert("请选择产品线");
          return;
        }

        switch(val)
        {
          //普通旧件
          case 1:{
         var self=this; 
         rt.get('../api/NewSrvStation/GetBasicStation')
        .then(res=>{
          if(res.new_srv_stationid!='' && res.new_srv_stationid!=null && res.new_srv_stationid!=undefined)   
          {
              var stationUrl='../api/PartsReturn/GetParentStockByStationId';
              var stationParam={
                StationID:res.new_srv_stationid,
                ProductGroupID:self.queryForm.new_productgroup_id
              }

              rt.get(stationUrl,stationParam)
                .then(data=>{
                     self.queryForm.new_stocksite_receiveid=data.Id;   //收货仓库id
                     self.queryForm.new_stocksite_receiveidname=data.Name; //收货仓库名称

                      this.getRecipientInfo();                          //收货人默认信息

                });
          }
        });
          }
          break;
          //故障件
          case 2:{
        var self=this; 
         rt.get('../api/PartsReturn/GetHeadStock/'+self.queryForm.new_productgroup_id)
        .then(res=>{
                     self.queryForm.new_stocksite_receiveid=res.Id;   //收货仓库id
                     self.queryForm.new_stocksite_receiveidname=res.Name; //收货仓库名称

                      this.getRecipientInfo();                          //收货人默认信息
                    });
          }
          break;
          //易损件
          case 4:{
         var self=this; 
         rt.get('../api/NewSrvStation/GetBasicStation')
        .then(res=>{
          if(res.new_srv_stationid!='' && res.new_srv_stationid!=null && res.new_srv_stationid!=undefined)   
          {
              var stationUrl='../api/PartsReturn/GetParentStockByStationId';
              var stationParam={
                StationID:res.new_srv_stationid,
                ProductGroupID:self.queryForm.new_productgroup_id
              }

              rt.get(stationUrl,stationParam)
                .then(data=>{
                     self.queryForm.new_stocksite_receiveid=data.Id;   //收货仓库id
                     self.queryForm.new_stocksite_receiveidname=data.Name; //收货仓库名称

                      this.getRecipientInfo();                          //收货人默认信息

                });
          }
        });
          }
          break;
          //旧件报损
          case 3:{
               //清空收货仓库
             this.queryForm.new_stocksite_receiveid="";   
             this.queryForm.new_stocksite_receiveidname=""; 
          }
           break;
          default:{
             //清空收货仓库
             this.queryForm.new_stocksite_receiveid="";   
             this.queryForm.new_stocksite_receiveidname=""; 
          }
          break;
        }
        
      },
    
     //收货人默认信息
    getRecipientInfo:function(){
      var self=this;
          rt.get('../api/NewSrvStation/GetStockLineByStockID/'+this.queryForm.new_stocksite_receiveid)
                   .then(res=>{
                    self.queryForm.new_recipient=res.new_contact;         //收货人
                    self.queryForm.new_recphone=res.new_tele;           //收货电话
                  
                    self.queryForm.new_province_id=res.new_province_id;      //省会
                    self.queryForm.new_province_idname=res.new_province_idName;  //省会名称
                   
                    self.queryForm.new_city_id=res.new_city_id;               //城市
                    self.queryForm.new_city_idname=res.new_city_idName;       //城市名称
                  
                    self.queryForm.new_county_id=res.new_county_id;            //县区
                    self.queryForm.new_county_idname=res.new_county_idName;    //县区名称
                    
                    self.queryForm.new_town_id=res.new_town_id;            //街道
                    self.queryForm.new_town_idname=res.new_town_idName;    //街道名称
                    //地址
                    self.queryForm.new_address=res.new_province_idName+res.new_city_idName+res.new_county_idName+res.new_town_idName+res.new_address;
                    });
      

      
    },
    //初始化数据
    initData: function() {
     
      var that = this;
      var apiUrl =
        "../api/PartsReturn/GetPartsReturnById/" + this.partsreturnid;
      rt
        .get(apiUrl)
        .then(res => {
          that.queryForm = res;
          if(res.new_sendon)
          {
            that.queryForm.new_sendon = new Date(res.new_sendon);
          }
         if(res.new_submit_time)
         {
           that.queryForm.new_submit_time=new Date(res.new_submit_time)
         }
          if (res.new_receiveddate) {
            that.queryForm.new_receiveddate = new Date(res.new_receiveddate);
          }
          
          if(res.new_status==1 || res.new_status==4)
          {
            that.disabledform = false;
            that.disabledLogistic=false;
          }
          else
          {
            that.disabledLogistic=true;
             that.disabledform = true;
          }
            if(this.tableDate)
            {
              this.disabledPartstype=true;
            }
            else
            {
              this.disabledPartstype=false;
            }
           this.$watch('queryForm.new_partstype', this.partstypeChange)
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    //获取表单状态的下拉列表
    getFormStatusOptions: function() {
      var apiUrl =
        "../api/crmpicklist/options/new_srv_partsreturn/new_formstatus";
      rt
        .get(apiUrl)
        .then(res => {
          this.formStatusOptions = res;

         
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
     /************
      Dialog弹出框部分
    ************/
    quickChooseStocksite:function(){

       this.$refs.siteStockDialog.show(this.queryForm.new_stocksite_receiveidname);
    },
    quickChooseProvince: function() {
      this.$refs.provinceDialog.show(this.queryForm.new_province_idname);
    },
    quickChooseCity: function() {
      this.$refs.cityDialog.show(this.queryForm.new_city_idname);
    },
    quickChooseCounty: function() {
      this.$refs.countyDialog.show(this.queryForm.new_county_idname);
    },
    quickChooseTown: function() {
      this.$refs.townDialog.show(this.queryForm.new_town_idname);
    },
    quickChooseGroup:function(){
       this.$refs.productGroupDialog.show(this.queryForm.new_productgroup_idname);
    },
    //显示签收仓库
    stocksiteLookup:function(){
         if(this.disabledform)
      {
        return;
      }
      this.$refs.siteStockDialog.show(this.queryForm.new_stocksite_receiveidname)
    },
    clearStocksite:function(){
      this.queryForm.new_stocksite_receiveid="";
      this.queryForm.new_stocksite_receiveidname="";
    },
    //显示省Dialog
    provinceLookup: function() {
         if(this.disabledform)
      {
        return;
      }
      this.$refs.provinceDialog.show(this.queryForm.new_province_idname);
    },
    //签收仓库选择
    selectStocksite:function(id,name){
      if(this.queryForm.new_stocksite_receiveid==id && this.queryForm.new_stocksite_receiveidname==name)
      {
        return;
      }
      else
      {
        this.queryForm.new_stocksite_receiveid=id;
        this.queryForm.new_stocksite_receiveidname=name;
      }
    },
    //省选择
    selectProvince: function(id, name) {
      if (
        this.queryForm.new_province_id == id &&
        this.queryForm.new_province_idname == name
      ) {
        return;
      } else {
        this.queryForm.new_province_id = id;
        this.queryForm.new_province_idname = name;
        this.queryForm.new_city_id = "";
        this.queryForm.new_city_idname = "";
        this.queryForm.new_county_id = "";
        this.queryForm.new_county_idname = "";
        this.queryForm.new_town_id = "";
        this.queryForm.new_town_idname = "";
      }
    },
    //清除省份数据，将市县数据一起清除
    clear: function() {
      this.queryForm.new_province_id = "";
      this.queryForm.new_province_idname = "";
      this.queryForm.new_city_id = "";
      this.queryForm.new_city_idname = "";
      this.queryForm.new_county_id = "";
      this.queryForm.new_county_idname = "";
      this.queryForm.new_town_id = "";
      this.queryForm.new_town_idname = "";
    },

    //显示城市Dialog
    cityLookup: function() {
         if(this.disabledform)
      {
        return;
      }
      this.$refs.cityDialog.show(this.queryForm.new_city_idname);
    },
    //市选择
    selectCity: function(id, name) {
      if (
        this.queryForm.new_city_id == id &&
        this.queryForm.new_city_idname == name
      ) {
        return;
      } else {
        this.queryForm.new_city_id = id;
        this.queryForm.new_city_idname = name;
        this.queryForm.new_county_id = "";
        this.queryForm.new_county_idname = "";
        this.queryForm.new_town_id = "";
        this.queryForm.new_town_idname = "";
      }
    },
    //清除市数据，并将县数据一起清除
    clearCityAndCounty: function() {
      this.queryForm.new_city_id = "";
      this.queryForm.new_city_idname = "";
      this.queryForm.new_county_id = "";
      this.queryForm.new_county_idname = "";
      this.queryForm.new_town_id = "";
      this.queryForm.new_town_idname = "";
    },

    //显示区县Dialog
    countyLookup: function() {
         if(this.disabledform)
      {
        return;
      }
      this.$refs.countyDialog.show(this.queryForm.new_county_idname);
    },
    //区县选择
    selectCounty: function(id, name) {
      if (
        this.queryForm.new_county_id == id &&
        this.queryForm.new_county_idname == name
      ) {
        return;
      } else {
        this.queryForm.new_county_id = id;
        this.queryForm.new_county_idname = name;
        this.queryForm.new_town_id = "";
        this.queryForm.new_town_idname = "";
      }
    },
    //清除县数据
    clearCounty: function() {
      this.queryForm.new_county_id = "";
      this.queryForm.new_county_idname = "";
      this.queryForm.new_town_id = "";
      this.queryForm.new_town_idname = "";
    },

    //显示城镇Dialog
    townLookup: function() {
         if(this.disabledform)
      {
        return;
      }
      this.$refs.townDialog.show(this.queryForm.new_town_idname);
    },
    //城镇选择
    selectTown: function(id, name) {
      if (
        this.queryForm.new_town_id == id &&
        this.queryForm.new_town_idname == name
      ) {
        return;
      } else {
        this.queryForm.new_town_id = id;
        this.queryForm.new_town_idname = name;
      }
    },
    //清除城镇数据
    clearTown: function() {
      this.queryForm.new_town_id = "";
      this.queryForm.new_town_idname = "";
    },
    //显示产品线Dialog
    groupLookup: function() {
      if(this.partsreturnid!='')
      {
        return;
      }
      this.$refs.productGroupDialog.show(this.queryForm.new_productgroup_idname);
    },
    //产品线选择
    selectGroup: function(data) {
      if (
        this.queryForm.new_productgroup_id == data.id &&
        this.queryForm.new_productgroup_idname == data.name
      ) {
        return;
      } else {
        this.queryForm.new_productgroup_id = data.id;
        this.queryForm.new_productgroup_idname = data.name;
      }
    },
    //清除产品线数据
    clearGroup: function() {
      this.queryForm.new_productgroup_id = "";
      this.queryForm.new_productgroup_idname = "";
    },
    //保存
    save: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var that = this;
          if (that.queryForm.new_sendon) {
            that.queryForm.new_sendon = rt.formatDateTime(
              that.queryForm.new_sendon,
              "yyyy-mm-dd"
            );
            that.queryForm.new_sendon = new Date(that.queryForm.new_sendon);
          }

          var params = that.queryForm;
          if (params.new_fee > that.autoNewFee) {
            rt.showErrorToast(that.$t("CostMustBeInNormal"));
            return;
          }
          //创建和更新
            if (that.partsreturnid === "") {
            params.new_name = that.queryForm.new_name;
            params.new_formstatus = that.queryForm.new_formstatus;
            var apiUrl = "../api/PartsReturn/CreatePartsReturn";
            rt
              .post(apiUrl, params)
              .then(res => {
                that.$message({
                  message: that.$t('Successfullysaved'),
                  type: "success"
                });
                that.partsreturnid = res;
                that.$router.push({
                  name: "PartsReturnEdit",
                  params: { id: res }
                });
                that.initData();
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          } else {
            params.id = that.partsreturnid;
            var apiUrl = "../api/PartsReturn/UpdatePartsReturn";
            rt
              .post(apiUrl, params)
              .then(res => {
                that.$message({
                  message: that.$t('Successfullysaved'),
                  type: "success"
                });

                that.initData();
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          }
        } else {
          this.$message({
            message: this.$t("PleaseInputRequiredFields"),
            type: "warning",
            showClose: true
          });
        }
      });
    },

    //获取子组件中tableDate的数据，为空不能进行发运确认
    ievent: function(data) {
      this.tableDate = data[0];
      if(this.tableDate)
      {
        this.disabledPartstype=true;
      }
      else
      {
        this.disabledPartstype=false;
      }
    },
    //提交
    submit() {
      if (this.partsreturnid != "") {
        if (
          this.$refs.partsReturnDetailView.tableData === null ||
          this.$refs.partsReturnDetailView.tableData.length < 1
        ) {
          rt.showErrorToast(this.$t("RequiredIncludeOneLine"));
          return;
        }
        this.flowDialogVisible = true;
      } else {
        rt.showErrorToast(this.$t("PleaseSaveAndAdd"));
      }
    },
    //清单打印
    listPrint(){
       this.$router.push({ name: "PartsReturnPrintlist", params: { id: this.partsreturnid } });
    },
    //标签打印
    labelPrint(){
       this.$router.push({ name: "PartsReturnPrintLabel", params: { id: this.partsreturnid } });
    },
    //撤回
    recall() {
      var entityname = "new_srv_partsreturn";
      var entityid = this.partsreturnid;
      let that = this;
      rt
        .revoke(entityname, entityid)
        .then(function() {
          that.initData();
          that.disabledform = false;
        })
        .catch(function(error) {
          rt.showErrorToast(error);
        });
    },
    //获取审批列表
    flowlist() {
      this.flowListDialogVisible = true;
    },
    //签核提交
    submitCallback() {
      this.flowDialogVisible = false;
      this.initData();
    },
    handleCommand(cmd) {
      switch (cmd) {
        case "flowlist":
          this.flowlist();
          break;
      }
    },
    //发运确认
    confirm: function() {
      this.isconfirming=true;
       var params = this.queryForm;
       params.id=this.partsreturnid;
      var apiUrl =
        "../api/PartsReturn/UpdatePartReturnStatus";
      if (this.tableDate) {
        this.$confirm(this.$t("WhetherSendDetermin"), this.$t("Tip"), {
          confirmButtonText: this.$t("BUTTON_DETERMINE"),
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: this.$t("BUTTON_CANCEL"),
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        }).then(() => {
          rt
            .post(apiUrl,params)
            .then(res => {
              this.$message({
                message: this.$t("Successfullydelivered"),
                type: "success"
              });
              this.initData();
              this.isconfirming=false;
            })
            .catch(error => {
              this.isconfirming=false;
              rt.showErrorToast(error);
            });
        })
        .catch(error=>{
             this.isconfirming=false;
        });
      } else {
        this.$message({
          type: "warning",
          message: this.$t("DocumentdetailREQUIRED")
        });
         this.isconfirming=false;
      }
    },

    beforeGoBack: function() {
      if (rt.isNullOrWhiteSpace(this.partsreturnid)) {
        this.$confirm(this.$t("NewOrderNotSaveSureQuit"), this.$t("Tip"), {
          confirmButtonText: this.$t("BUTTON_DETERMINE"),
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: this.$t("BUTTON_CANCEL"),
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            this.$router.push({ name: "PartsReturnList" });
          })
          .catch(() => {});
      } else {
        this.$router.push({ name: "PartsReturnList" });
      }
    }
  }
};
</script>
<style>

</style>
