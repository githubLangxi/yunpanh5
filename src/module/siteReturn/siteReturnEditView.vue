<template>
  <div>
    <!--头部操作按钮-->
    <rt-header :title="$t('new_srv_sitereturn')">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button type="confirm" @click="goPrint" :text="$t('BUTTON_PRINT')" />
        <rt-button type="save" @click="onSave('editForm')" v-show="editForm.new_approvalstatus==1  || editForm.new_approvalstatus==4||(editForm.new_returnorderstatus == 1 && editForm.new_approvalstatus==3)" />
        <rt-button type="confirm" @click="submit('editForm')" :text="$t('BUTTON_SUBMIT')" v-show="(editForm.new_approvalstatus==1 || editForm.new_approvalstatus==4)&&(new_srv_sitereturnId!='')" />
        <rt-button type="revert" @click="recall" v-show="editForm.new_approvalstatus==2" />
        <rt-button type="confirm" @click="ship('editForm')" v-show="editForm.new_approvalstatus==3&&editForm.new_returnorderstatus==1" :text="$t('BUTTON_SENDCONFIRM')" />
        <rt-button type="approve-progress" @click="flowlist" v-show="editForm.new_approvalstatus!=1"></rt-button>
      </rt-toolbar>
    </rt-header>


    <!--主档数据编辑Form-->
    <rt-content>
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="120px" label-position="left">
        <rt-section :title="$t('BaseInfo')">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="申请单号" >
                <el-input v-model="editForm.new_name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提交时间">
                <el-input v-model="editForm.new_submit_timeUTC" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收货仓库">
                <el-input v-model="editForm.new_stocksite_receiveidName" readonly :disabled="true" icon="search"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="审核状态">
                <rt-picklist v-model="editForm.new_approvalstatus" entity="new_srv_sitereturn" :disabled="true" attribute="new_approvalstatus"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核时间">
               <el-input v-model="editForm.new_approved_timeUTC" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="返还类型">
                 <rt-picklist v-model="editForm.new_returntype" entity="new_srv_sitereturn" :disabled="true" attribute="new_returntype"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="24">
              <el-form-item label="返还原因" prop="new_reason">
                <el-input type="textarea" v-model="editForm.new_reason" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
           <el-row :gutter="50">
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input  type="textarea" v-model="editForm.new_memo" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="返还总额">
                <el-input v-model="editForm.new_amount" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务商">
                <el-input v-model="editForm.new_srv_site_idName" readonly :disabled="true" icon="search"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品线">
                <rt-lookup v-model="editForm.new_productgroup_id" entity="new_productgroup" nameField="new_name" @input="getGetSrvStockSite" readonly :disabled="new_srv_sitereturnId!=''" />
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
       <rt-section title="物流信息">
           <el-row :gutter="50">
            <el-col :span="8">
              
            </el-col>
            <el-col :span="8">
              <el-form-item label="发运日期">
                <el-input v-model="editForm.new_senddateUTC" readonly :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签收日期">
                <el-input v-model="editForm.new_receiveddateUTC" readonly :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="物流公司">
                <rt-picklist v-model="editForm.new_logistics_company" entity="new_srv_sitereturn" :disabled="editForm.new_approvalstatus != 3 || editForm.new_returnorderstatus != 1" attribute="new_logistics_company"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物流状态">
                 <rt-picklist v-model="editForm.new_returnorderstatus" entity="new_srv_sitereturn" :disabled="true" attribute="new_returnorderstatus"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签收人员">
                <el-input v-model="editForm.new_systemuser_idName" readonly :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="收货人">
                <el-input v-model="editForm.new_receiver" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收货电话">
                <el-input v-model="editForm.new_receiverphone" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="省份">
                <el-input v-model="editForm.new_province_idName" readonly @keyup.enter.native="quickChooseProvince" :disabled="disabledform" icon="search" :on-icon-click="provinceLookup"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="城市">
                <el-input v-model="editForm.new_city_idName" readonly @keyup.enter.native="quickChooseCity" :disabled="disabledform" icon="search" :on-icon-click="cityLookup"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区县">
                <el-input v-model="editForm.new_county_idName" readonly @keyup.enter.native="quickChooseCounty" :disabled="disabledform" icon="search" :on-icon-click="countyLookup"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="街道">
                <el-input v-model="editForm.new_town_idName" readonly @keyup.enter.native="quickChooseTown" :disabled="disabledform" icon="search" :on-icon-click="townLookup"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="24">
              <el-form-item label="详细地址">
                <el-input type="textarea" v-model="editForm.new_address" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            </el-row>
          </rt-section>
        <div v-if="detailShow">
          <SiteReturnDetailView ref="sitereturndetail" v-if="new_srv_sitereturnId!==''" :disabled="editForm.new_approvalstatus!=1&&editForm.new_approvalstatus!=4" :mainid="new_srv_sitereturnId" @reloadEdit="initData" :newname="editForm.new_name" :new_stocksite_receiveid="editForm.new_stocksite_receiveid" :approvalstatus="editForm.new_approvalstatus" :returnorderstatus="editForm.new_returnorderstatus" :disabledaftersend="disabledaftersend"></SiteReturnDetailView>
        </div>
        <attachment ref="attachment" :sitereturnId="this.new_srv_sitereturnId" :showDetail="true"></attachment>
      </el-form>
    </rt-content>
    <!--签核提交-->
    <el-dialog :title="$t('Flow')" class="rt-portal-flowSubmitDialog" :visible.sync="flowDialogVisible">
      <RTFlowSubmit entityname='new_srv_sitereturn' :id='new_srv_sitereturnId' v-if="flowDialogVisible" @closesubmit='submitCallback()'></RTFlowSubmit>
    </el-dialog>

    <!--签核列表-->
    <el-dialog :title="$t('BUTTON_APPROVALPROGRESS')" class="rt-portal-flowListDialog" :visible.sync="flowListDialogVisible">
      <RTFlowApprovalList entityname='new_srv_sitereturn' :id='new_srv_sitereturnId' v-if="flowListDialogVisible"></RTFlowApprovalList>
    </el-dialog>

    <ProvinceDialog ref="provinceDialog" @lookupSelect="selectProvince" @lookupSelectClear="clear"></ProvinceDialog>
    <CityDialog ref="cityDialog" @lookupSelect="selectCity" @lookupSelectClear="clearCityAndCounty" :provinceid="this.editForm.new_province_id"></CityDialog>
    <CountyDialog ref="countyDialog" @lookupSelect="selectCounty" @lookupSelectClear="clearCounty" :cityid="this.editForm.new_city_id"></CountyDialog>
    <TownDialog ref="townDialog" @lookupSelect="selectTown" @lookupSelectClear="clearTown" :countyid="this.editForm.new_county_id"></TownDialog>
  </div>
</template>

<script type="text/javascript">
import SiteReturnDetailView from './siteReturnDetailView'
import SiteReturnEditDialog from '../dialog/siteReturnEditDialog'
import RTFlowSubmit from '@/components/flow/flowSubmit'
import RTFlowApprovalList from '@/components/flow/flowApprovallist'
import Vue from "vue"
import moment from "moment"
import VueMomentJS from "vue-momentjs"
Vue.use(VueMomentJS, moment)

import attachment from './attachment';
import ProvinceDialog from "../dialog/provinceDialog";
import CityDialog from "../dialog/cityDialog";
import CountyDialog from "../dialog/countyDialog";
import TownDialog from "../dialog/townDialog";


export default {
  data() {
    return {
      
      new_srv_sitereturnId: '',//主档ID

      /****************/
      //主档数据编辑项数据
      /****************/
      disabledaftersend:true,
      detailShow: true,//明细列表操作是否可见
      disabledform: false,/*控制编辑项是否可用*/
      flowDialogVisible: false,//签核提交是否可见
      flowListDialogVisible: false,
      //detailShow: true,//明细列表操作是否可见
      stocksiteOptions: [],
      /*表单数据*/
      editForm: {
        new_name: '',//配件申请单号
        new_submit_time: '',//提交时间
        new_stocksite_receiveid:'',//收货仓库id
        new_stocksite_receiveidName:'',//收货仓库

        //第二行
        new_approvalstatus: '',//审核状态id
        new_approvalstatusName: '',//审核状态
        new_approved_time: '',//审核时间
        new_returnorderstatus: '',//退货单状态id
        new_returnorderstatusName: '',//退货单状态
        new_returntype:'',
        new_returntypeName:'',

        //第三行
        new_reason: '',//返还原因
        new_stocksite_sendid:'',
        new_stocksite_sendidName:'',
        //第四行
        new_memo: '',//备注

        //第五行
        new_amount: '',//返还金额
        new_srv_site_id: '',//服务商id
        new_srv_site_idName: '',//服务商
        new_productgroup_id:{
          id:'',
          name:'',
        },
        //第六行
        new_logisticscode: '',//物流单号
        new_senddate: '',//发运日期
        new_receiveddate: '',//签收日期

        //第七行
        new_logistics_company: '',//物流公司
        new_logistics_companyName: '',
        new_systemuser_idName: '',//签收人员

        //第八行
        new_receiver: '',//收货人
        new_receiverphone: '',//收货电话
        new_province_id: '',//省份id
        new_province_idName: '',//省份

        //第九行
        new_city_id: '',//城市id
        new_city_idName: '',//城市
        new_county_id: '',//区县id
        new_county_idName: '',//区县
        new_town_id: '',//街道id
        new_town_idName: '',//街道

        //第十行
        new_address:'',
      },
      rules: {

        new_reason: [
          { required: true, message: '返还原因不能为空', trigger: 'change' }
        ],
        // new_productgroup_id: [
        //   { required: true, message: '产品线不能为空', trigger: 'change' }
        // ],
      },
    }
  },
  components: {
    SiteReturnDetailView, 
    RTFlowSubmit,
    RTFlowApprovalList, 
    SiteReturnEditDialog,
    ProvinceDialog,
    CityDialog,
    CountyDialog,
    TownDialog,
    attachment
  },
  computed: {
    new_stocksite_receiveid() {
      return this.editForm.new_stocksite_receiveid
    }
  },
  watch: {
    new_stocksite_receiveid(val) {
      this.editForm.new_stocksite_receiveid = val
      //this.detailShow = false
    },
  },
  created: function() {
    if (this.$route.params.id) {
      this.new_srv_sitereturnId = this.$route.params.id
    }
  },
  mounted: function() {
    if (this.$route.params.id) {
      this.new_srv_sitereturnId = this.$route.params.id
    }
    this.initData()
    this.loadSelectOption()
  },
  methods: {
    /************
      Dialog弹出框部分
    ************/
    quickChooseProvince: function() {
      this.$refs.provinceDialog.show(this.editForm.new_province_idName);
    },
    quickChooseCity: function() {
      this.$refs.cityDialog.show(this.editForm.new_city_idName);
    },
    quickChooseCounty: function() {
      this.$refs.countyDialog.show(this.editForm.new_county_idName);
    },
    quickChooseTown: function() {
      this.$refs.townDialog.show(this.editForm.new_town_idName);
    },
    //显示省Dialog
    provinceLookup: function() {
        if(this.disabledform)
      {
        return;
      }
      this.$refs.provinceDialog.show(this.editForm.new_province_idName);
    },
    //省选择
    selectProvince: function(id, name) {
      if (
        this.editForm.new_province_id == id &&
        this.editForm.new_province_idName == name
      ) {
        return;
      } else {
        this.editForm.new_province_id = id;
        this.editForm.new_province_idName = name;
        this.editForm.new_city_id = "";
        this.editForm.new_city_idName = "";
        this.editForm.new_county_id = "";
        this.editForm.new_county_idName = "";
        this.editForm.new_town_id = "";
        this.editForm.new_town_idName = "";
      }
    },
    //清除省份数据，将市县数据一起清除
    clear: function() {
      this.editForm.new_province_id = "";
      this.editForm.new_province_idName = "";
      this.editForm.new_city_id = "";
      this.editForm.new_city_idName = "";
      this.editForm.new_county_id = "";
      this.editForm.new_county_idName = "";
      this.editForm.new_town_id = "";
      this.editForm.new_town_idName = "";
    },

    //显示城市Dialog
    cityLookup: function() {
      if(this.disabledform)
      {
        return;
      }
      this.$refs.cityDialog.show(this.editForm.new_city_idName);
    },
    //市选择
    selectCity: function(id, name) {
      if (
        this.editForm.new_city_id == id &&
        this.editForm.new_city_idName == name
      ) {
        return;
      } else {
        this.editForm.new_city_id = id;
        this.editForm.new_city_idName = name;
        this.editForm.new_county_id = "";
        this.editForm.new_county_idName = "";
        this.editForm.new_town_id = "";
        this.editForm.new_town_idName = "";
      }
    },
    //清除市数据，并将县数据一起清除
    clearCityAndCounty: function() {
      this.editForm.new_city_id = "";
      this.editForm.new_city_idName = "";
      this.editForm.new_county_id = "";
      this.editForm.new_county_idName = "";
      this.editForm.new_town_id = "";
      this.editForm.new_town_idName = "";
    },

    //显示区县Dialog
    countyLookup: function() {
        if(this.disabledform)
      {
        return;
      }
      this.$refs.countyDialog.show(this.editForm.new_county_idName);
    },
    //区县选择
    selectCounty: function(id, name) {
      if (
        this.editForm.new_county_id == id &&
        this.editForm.new_county_idName == name
      ) {
        return;
      } else {
        this.editForm.new_county_id = id;
        this.editForm.new_county_idName = name;
        this.editForm.new_town_id = "";
        this.editForm.new_town_idName = "";
      }
    },
    //清除县数据
    clearCounty: function() {
      this.editForm.new_county_id = "";
      this.editForm.new_county_idName = "";
      this.editForm.new_town_id = "";
      this.editForm.new_town_idName = "";
    },

    //显示城镇Dialog
    townLookup: function() {
        if(this.disabledform)
      {
        return;
      }
      this.$refs.townDialog.show(this.editForm.new_town_idName);
    },
    //城镇选择
    selectTown: function(id, name) {
      if (
        this.editForm.new_town_id == id &&
        this.editForm.new_town_idName == name
      ) {
        return;
      } else {
        this.editForm.new_town_id = id;
        this.editForm.new_town_idName = name;
      }
    },
    //清除城镇数据
    clearTown: function() {
      this.editForm.new_town_id = "";
      this.editForm.new_town_idName = "";
    },
    /*****************/
    /**初始化编辑页面**/
    /*****************/
    //初始化数据
    initData: function() {
      this.getStationInfo();      
    },
    //数据加载
    loadData: function() {
      var self = this
      rt.get('../api/SrvSiteReturn/GetSrvSiteReturnSign/' + self.new_srv_sitereturnId)
        .then(function(res) {
          self.editForm = res
          if(res.new_logistics_company == 0){
            self.editForm.new_logistics_company = "";
          }
          if (!rt.isNullOrWhiteSpace(res.new_approved_timeUTC)) {
            if (res.new_approved_timeUTC.indexOf("-") != -1) {
              self.editForm.new_approved_timeUTC= res.new_approved_timeUTC.replace(new RegExp(/-/gm), "/");
             }

            // self.editForm.new_sendtimeUtc = rt.formatDateTime(res.new_sendtimeUtc, 'yyyy-mm-dd hh:mm')
          }
          else {
            self.editForm.new_approved_timeUTC = ''
          }
          if (!rt.isNullOrWhiteSpace(res.new_receiveddateUTC)) {
             if (res.new_receiveddateUTC.indexOf("-") != -1) {
              self.editForm.new_receiveddateUTC= res.new_receiveddateUTC.replace(new RegExp(/-/gm), "/");
             }
            // self.editForm.new_receiveddateUTC = rt.formatDateTime(res.new_receiveddateUTC, 'yyyy-mm-dd hh:mm')
          }
          else {
            self.editForm.new_receiveddateUTC = ''
          }
          if (!rt.isNullOrWhiteSpace(res.new_submit_timeUTC)) {
            if (res.new_submit_timeUTC.indexOf("-") != -1) {
              self.editForm.new_submit_timeUTC= res.new_submit_timeUTC.replace(new RegExp(/-/gm), "/");
             }

            // self.editForm.new_sendtimeUtc = rt.formatDateTime(res.new_sendtimeUtc, 'yyyy-mm-dd hh:mm')
          }
          else {
            self.editForm.new_sendtimeUtc = ''
          }
          if (!rt.isNullOrWhiteSpace(res.new_senddateUTC)) {
            if (res.new_senddateUTC.indexOf("-") != -1) {
              self.editForm.new_senddateUTC= res.new_senddateUTC.replace(new RegExp(/-/gm), "/");
             }

            // self.editForm.new_sendtimeUtc = rt.formatDateTime(res.new_sendtimeUtc, 'yyyy-mm-dd hh:mm')
          }
          else {
            self.editForm.new_senddateUTC = ''
          }
          if (self.editForm.new_approvalstatus != 1 && self.editForm.new_approvalstatus != 4) {
            self.disabledform = true
          }
        }).catch((error) => {
          rt.showErrorToast(error)
        })
    },
  getStationInfo:function(){
         //新建
        if (this.new_srv_sitereturnId === '') {
         var self=this; 
         rt.get('../api/NewSrvStation/GetBasicStation')
        .then(res=>{
          self.editForm.new_srv_site_idName=res.new_name;                //服务商名称 
          self.editForm.new_srv_site_id=res.new_srv_stationid;         //服务商id
          // var date=rt.formatDateTime(new Date(), 'yyyy-mm-dd hh:mm');
          // self.editForm.new_submit_time = date;
          // self.editForm.new_submit_timeUTC = date.replace(new RegExp(/-/gm), "/");
          //this.editForm.new_submit_timeUTC=new Date().toString();
          //this.editForm.new_type=1;                         //申请类型默认备货申请
          this.editForm.new_approvalstatus=1;               //审核状态默认制单
          this.editForm.new_returnorderstatus=1;                    //退货单状态默认待发运
          this.editForm.new_returntype=1;                   //返还
          // this.editForm.new_sendtype=1;
          // this.getGetSrvStockSite();                        //收货仓库默认信息
          // this.getRecipientInfo();                          //收货人默认信息
            });
        }
        else {
          //编辑
          this.loadData();
        }
    },
    getGetSrvStockSite:function(){
      var self = this;
      debugger;
      if(this.editForm.new_productgroup_id.id == null){
        this.clearData();
        return;
      }
      rt.get('../api/SrvSiteReturn/GetSrvStockSiteModel/'+this.editForm.new_srv_site_id+','+this.editForm.new_productgroup_id.id)
                   .then(res=>{
                      // self.editForm.new_productgroup_idName = self.editForm.new_productgroup_id.name;
                      // self.editForm.new_productgroup_id = self.editForm.new_productgroup_id.id;

                     self.editForm.new_stocksite_receiveid = res.new_parentstocksite_id;
                     self.editForm.new_stocksite_receiveidName = res.new_parentstocksite_idName;
                     self.editForm.new_stocksite_sendid = res.new_srv_sitestockid;
                     self.editForm.new_stocksite_sendidName = res.new_name;

                    self.editForm.new_receiver=res.new_contact;         //收货人
                    self.editForm.new_receiverphone=res.new_tele;           //收货电话
                  
                    self.editForm.new_province_id=res.new_province_id;      //省会
                    self.editForm.new_province_idName=res.new_province_idName;  //省会名称
                   
                    self.editForm.new_city_id=res.new_city_id;               //城市
                    self.editForm.new_city_idName=res.new_city_idName;       //城市名称
                  
                    self.editForm.new_county_id=res.new_county_id;            //县区
                    self.editForm.new_county_idName=res.new_county_idName;    //县区名称
                    
                    self.editForm.new_town_id=res.new_town_id;            //街道
                    self.editForm.new_town_idName=res.new_town_idName;    //街道名称
                    //地址
                    self.editForm.new_address=res.new_province_idName+res.new_city_idName+res.new_county_idName+res.new_town_idName+res.new_address;
                    }).catch((error) => {
                        this.clearData();
                        rt.showErrorToast(error)
              });
    },

    clearData:function(){
      var self = this;
                    self.editForm.new_stocksite_receiveid = '';
                     self.editForm.new_stocksite_receiveidName = '';
                     self.editForm.new_stocksite_sendid = '';
                     self.editForm.new_stocksite_sendidName = '';

                    self.editForm.new_receiver='';         //收货人
                    self.editForm.new_receiverphone='';           //收货电话
                  
                    self.editForm.new_province_id='';      //省会
                    self.editForm.new_province_idName='';  //省会名称
                   
                    self.editForm.new_city_id='';               //城市
                    self.editForm.new_city_idName='';       //城市名称
                  
                    self.editForm.new_county_id='';            //县区
                    self.editForm.new_county_idName='';    //县区名称
                    
                    self.editForm.new_town_id='';            //街道
                    self.editForm.new_town_idName='';    //街道名称
                    //地址
                    self.editForm.new_address='';
                    self.editForm.new_productgroup_id='';
                    self.editForm.new_productgroup_idName='';
    },
    /*****************/
    /***主档数据操作***/
    /*****************/
    //打印页面
    goPrint() {
      this.$router.push({
        name: "sitereturnprint",
        params: { id: this.$route.params.id }
      });
    },
    //保存方法
    onSave: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var self = this
          var siteReturn = self.editForm
          if (!rt.isNullOrWhiteSpace(siteReturn.new_returnreason)) {
            if (siteReturn.new_returnreason.length > 100) {
              rt.showErrorToast(this.$t('BackReasonLessThan100'))
              return
            }
          }
          debugger;
          if (self.editForm.new_productgroup_id.id == "") {
              rt.showErrorToast("请选择产品线")
              return
          }
          if (!rt.isNullOrWhiteSpace(siteReturn.new_address)) {
            if (siteReturn.new_address.length > 100) {
              rt.showErrorToast(this.$t('AddressLessThan100'))
              return
            }
          }
          /*创建*/
          if (self.new_srv_sitereturnId == '') {
            rt.post('../api/SrvSiteReturn/SaveSrvSiteReturn', siteReturn)
              .then(function(res) {
                rt.showSuccessToast(self.$t('Successfullysaved'))
                self.new_srv_sitereturnId = res
                self.$router.replace({ name: "sitereturnedit", params: { id: self.new_srv_sitereturnId } })
                self.initData()
              }).catch((error) => {
                rt.showErrorToast(error)
              })
          }
          /*更新*/
          else {
            siteReturn.new_srv_sitereturnId = self.new_srv_sitereturnId
            rt.post('../api/SrvSiteReturn/SaveSrvSiteReturn', siteReturn)
              .then(function(res) {
                rt.showSuccessToast(self.$t('Successfullysaved'))
                siteReturn = {}
                self.initData()
              }).catch((error) => {
                rt.showErrorToast(error)
              })
          }
        }
        else {
          this.$message({
            message: this.$t('PleaseInputRequiredFields'),
            type: 'error'
          })
        }
      })
    },
    //确认方法
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$refs.sitereturndetail.tableData == null || this.$refs.sitereturndetail.tableData.length < 1) {
            rt.showErrorToast(this.$t('RequiredMoeThanOneLine'))
            return
          }
          this.flowDialogVisible = true
          this.initData()
        }
        else {
          this.$message({
            message: this.$t('PleaseInputRequiredFields'),
            type: 'error'
          })
        }
      })
    },
    //撤回
    recall() {
      var entityname = 'new_srv_sitereturn'
      var entityid = this.new_srv_sitereturnId
      let that = this
      rt.revoke(entityname, entityid)
        .then(function() {
          that.initData()
          that.disabledform = false
        })
        .catch(function(error) {
          rt.showErrorToast(error)
        })
    },
    //发运确认
    ship: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this
          var sitereturnDetail = []
          sitereturnDetail = this.sitereturndetail()
          var shipStr = '../api/SrvSiteReturn/EnsureSend'
          var params = {
            new_srv_sitereturnId: that.new_srv_sitereturnId,
            //sitereturnline: sitereturnDetail
          }
          rt.post(shipStr, params).then(function(res) {
            rt.showSuccessToast(that.$t('Successfullydelivered'))
            that.disabledaftersend = true;
            that.initData()
          }).catch(function(error) {
            rt.showErrorToast(error)
          })
          
          //that.onSave(formName)
        }
        else {
          this.$message({
            message: this.$t('PleaseInputRequiredFields'),
            type: 'error'
          })
        }
      })
    },
    //获取发运确认所需明细列表
    sitereturndetail: function() {
      return this.$refs.sitereturndetail.outdetail()
    },
    //获取审批列表
    flowlist() {
      this.flowListDialogVisible = true
    },
    //签核提交
    submitCallback() {
      this.flowDialogVisible = false
      this.initData()
    },
    // changeStocksite: function() {
    //   this.detailShow = false
    //   this.detailShow = true
    // },
    // //获取下拉框列表选项
    // loadSelectOption: function() {
    //   var selectStr = '../api/PartsApply/GetStockSite'
    //   rt.get(selectStr).then((res) => {
    //     this.stocksiteOptions = res
    //   })
    // },

    //新建未保存点击返回提示
    beforeGoBack: function() {
      if (rt.isNullOrWhiteSpace(this.new_srv_sitereturnId)) {
        this.$confirm(this.$t('NewOrderNotSaveSureQuit'), this.$t('Tip'), {
          confirmButtonText: this.$t('BUTTON_DETERMINE'),
          confirmButtonClass: 'ConfirmButtonClass',
          cancelButtonText: this.$t('BUTTON_CANCEL'),
          cancelButtonClass: 'CancelButtonClass',
          type: 'warning'
        }).then(() => {
          this.$router.push({ name: "sitereturnlist" })
        }).catch(() => {
        })
      }
      else {
        this.$router.push({ name: "sitereturnlist" })
      }
    }
  }
}
</script>

<style type="text/css" scoped>

</style>
