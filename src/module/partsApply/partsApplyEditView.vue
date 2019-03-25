<template>
  <div>
    <!--头部操作按钮-->
    <rt-header title="配件申请单">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button type="save"  @click="onSave('editForm',0)" :disabled="saveCollBack" v-show="editForm.new_approvalstatus==1||editForm.new_approvalstatus==4"/>
        <rt-button type="save" text="保存并关闭"  @click="onSave('editForm',1)" :disabled="saveCollBack" v-show="editForm.new_approvalstatus==1||editForm.new_approvalstatus==4"/>
        <rt-button type="submit" @click="submit" v-show="editForm.new_approvalstatus==1||editForm.new_approvalstatus==4"/>
        <rt-button type="revert" @click="recall" v-show="editForm.new_approvalstatus==2"/>
        <el-dropdown trigger="click" @command="handleCommand" v-show="editForm.new_approvalstatus!=1||editForm.new_approvalstatus==4">
          <span class="el-dropdown-link">
            <rt-button type="more" />
          </span>
          <el-dropdown-menu class="rt-toolbar__dropdown" slot="dropdown">
            <el-dropdown-item command="flowlist">审批记录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </rt-toolbar>
    </rt-header>
    
     <!-- 进度流程 -->
    <signProcess ref="signProcess" v-if="partsapplyid!=''" :partsapplyid="this.partsapplyid"></signProcess>

    <!--主档数据编辑Form-->
    <rt-content>
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="120px" label-position="left" >
        <rt-section title="基本信息">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="申请单号">
                <el-input v-model="editForm.new_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="8">
              <el-form-item label="服务商编码">
                <el-input v-model="editForm.new_unitcode" :disabled="true"></el-input>
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
              <el-form-item label="申请类型" prop="new_type">
                <rt-picklist v-model="editForm.new_type" entity="new_srv_partsapply" attribute="new_type" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总金额">
              <el-input v-model="editForm.new_tatalamount" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发货类型">
                <rt-picklist v-model="editForm.new_sendtype" entity="new_srv_partsapply" attribute="new_sendtype" :disabled="true"></rt-picklist>
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
              <el-form-item label="审核时间">
              <el-date-picker class="rt-portal-item-date" v-model="editForm.new_approved_time" type="date" placeholder="选择日期" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核状态">
                <rt-picklist v-model="editForm.new_approvalstatus" entity="new_srv_partsapply" attribute="new_approvalstatus" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="服务单号" v-if="workorderShow">
                  <rt-lookup v-model="editForm.new_workorder_id" entity="new_srv_workorder" idField="new_srv_workorderid" nameField="new_name" :dialog-filter-fields="new_name" :disabled="true" :rt-disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请归属">
                 <rt-picklist v-model="editForm.new_applyattr" entity="new_srv_partsapply" attribute="new_applyattr" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品线">
                <el-input v-model="editForm.new_productgroup_idname" readonly @keyup.enter.native="quickChooseGroup" :disabled="partsapplyid!=''" icon="search" :on-icon-click="groupLookup"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
             <el-col :span="24">
              <el-form-item label="申请说明">
               <el-input type="textarea" v-model="editForm.new_desc" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
         <rt-section title="收货地址">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="收货人">
                <el-input v-model="editForm.new_recipient" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收货电话">
                 <el-input v-model="editForm.new_phonenumber" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="省份">
                   <el-input v-model="editForm.new_province_idname" readonly @keyup.enter.native="quickChooseProvince" :disabled="disabledform" icon="search" :on-icon-click="provinceLookup"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="城市">
                  <el-input v-model="editForm.new_city_idname" readonly @keyup.enter.native="quickChooseCity" :disabled="disabledform" icon="search" :on-icon-click="cityLookup"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区县">
                   <el-input v-model="editForm.new_county_idname" readonly @keyup.enter.native="quickChooseCounty" :disabled="disabledform" icon="search" :on-icon-click="countyLookup"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="街道">
                  <el-input v-model="editForm.new_town_idname" readonly @keyup.enter.native="quickChooseTown" :disabled="disabledform" icon="search" :on-icon-click="townLookup"></el-input>
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
         <PartsApplyDetailView ref="partsapplydetail" v-if="partsapplyid!==''" :disabled="editForm.new_approvalstatus!=1&&editForm.new_approvalstatus!=4" :mainid="partsapplyid" :stocksendid="editForm.new_stocksite_sendid" :stocksendidname="editForm.new_stocksite_sendidname" @reloadEdit="initData"></PartsApplyDetailView>
          <attachment ref="attachment" :partsapplyid="this.partsapplyid" :showDetail="true"></attachment>
      </el-form>
    </rt-content>

     <!--签核提交-->
    <el-dialog title="签核流程" class="rt-portal-flowSubmitDialog" :visible.sync="flowDialogVisible">
      <RTFlowSubmit entityname='new_srv_partsapply' :id='partsapplyid' v-if="flowDialogVisible" @closesubmit='submitCallback()'></RTFlowSubmit>
    </el-dialog>

    <!--签核列表-->
    <el-dialog title="审批进度" class="rt-portal-flowListDialog" :visible.sync="flowListDialogVisible">
      <RTFlowApprovalList entityname='new_srv_partsapply' :id='partsapplyid' v-if="flowListDialogVisible"></RTFlowApprovalList>
    </el-dialog>

    <!--Lookup组件-->
    <ProvinceDialog ref="provinceDialog" @lookupSelect="selectProvince" @lookupSelectClear="clear"></ProvinceDialog>
    <CityDialog ref="cityDialog" @lookupSelect="selectCity" @lookupSelectClear="clearCityAndCounty" :provinceid="this.editForm.new_province_id"></CityDialog>
    <CountyDialog ref="countyDialog" @lookupSelect="selectCounty" @lookupSelectClear="clearCounty" :cityid="this.editForm.new_city_id"></CountyDialog>
    <TownDialog ref="townDialog" @lookupSelect="selectTown" @lookupSelectClear="clearTown" :countyid="this.editForm.new_county_id"></TownDialog>
    <ProductGroupDialog ref="productGroupDialog" @lookupSelect="selectGroup" @lookupSelectClear="clearGroup"></ProductGroupDialog>
  </div>
</template>

<script type="text/javascript">
import PartsApplyDetailView from './partsApplyDetailView';
import attachment from './attachment';
import picklistComponent from '@/components/common/picklist'
import RTFlowSubmit from '@/components/flow/flowSubmit'
import RTFlowApprovalList from '@/components/flow/flowApprovallist'
import PartsApplyEditDialog from '../dialog/partsApplyEditDialog'
import PartsApplyAddressDialog from '../dialog/partsApplyAddressDialog'
import signProcess from "./signProcess" 

import ProvinceDialog from "../dialog/provinceDialog";
import CityDialog from "../dialog/cityDialog";
import CountyDialog from "../dialog/countyDialog";
import TownDialog from "../dialog/townDialog";
import ProductGroupDialog from "../dialog/productgroupDialog"

export default {
  data() {
    return {
      //只能选择当前日期之后的日期
      pickerOptions: {
        disabledDate(time) {
          /*console.log(time.getTime()+"------------------------------------"+ Date.now() - 8.64e7);*/
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      saveCollBack: false,//保存回调禁用
      partsapplyid: '',         //主档ID
      cityCondition:'',         //城市过滤条件
      countyCondition:'',       //区县过滤条件
      townCondition:'',         //街道过滤条件     
      workorderShow:true,          //服务单是否显示
      disabledform:false,       //设置表单可用控件
      /****************/
      //主档数据编辑项数据
      /****************/
      flowDialogVisible: false,//签核提交是否可见
      flowListDialogVisible: false,//审批记录是否可见
      isPrivinceChange:true,            //省会是否改变
      isCityChange:true,                //城市是否改变
      isCountyChange:true,              //县区是否改变
      /*表单数据*/
      editForm: {
        new_name:'',                     //申请单号
        new_unitcode:'',                    //服务商编码
        new_station_idName:'',              //服务商名称
        new_station_id:'',                  //服务商id
       
        new_type:"",                      //申请类型
        new_tatalamount:"",               //总金额
        new_sendtype:"",                  //发货类型
       
        new_submit_time:"",               //提交时间
        new_approved_time:"",             //审核时间
        new_approvalstatus:"",            //审核状态
        
        new_workorder_id:null,            //服务单号
        new_desc:"",                      //申请说明
        
        new_applyattr:"",                 //申请归属
        new_productgroup_id:"",           //产品线ID
        new_productgroup_idname:"",       //产品线名称

        new_recipient:"",                 //收货人
        new_phonenumber:"",               //收货电话
        new_province_id:"",                    //省份
        new_province_idName:"",                //省份名称
        new_city_id:"",                        //城市
        new_city_idname:"",                   //城市名称
        new_county_id:"",                     //区县
        new_county_idName:"",                 //区县名称
        new_town_id:"",                       //街道
        new_town_idname:"",                   //街道名称

        new_address:"",                    //详细地址
       

        new_isclose: false,//是否关闭
        new_iscloseName: ''//是否关闭
      },
      rules: {
        new_type:[
          {
            required:true,
            message:'请选择申请类型'
          }
        ]
      },
    }
  },
  components: { 
    PartsApplyDetailView,
    picklistComponent, 
    RTFlowSubmit, 
    RTFlowApprovalList, 
    PartsApplyEditDialog, 
    PartsApplyAddressDialog,
    signProcess,
    ProvinceDialog,
    CityDialog,
    CountyDialog,
    TownDialog,
    ProductGroupDialog,
    attachment
    },
  created: function() {
    if (this.$route.params.id) {
      this.partsapplyid = this.$route.params.id
    }
  },
  mounted: function() {
    this.initData();            //初始化数据
  },
  computed: {
    new_type(){
      return this.editForm.new_type;
    }
  },
  watch: {
    //申请类型
    new_type(val,oldVal){
        if(val==1)           //备货申请
        {
          this.workorderShow=false;             //隐藏服务单
        }
        else if(val==2)      //服务单申请
        {
          this.workorderShow=true;              //显示服务单
        }
        else
        {
           this.workorderShow=false;
        }
    }
  },
  methods: {
    /*****************/
    /**初始化编辑页面**/
    /*****************/
    //初始化数据
    initData: function() {
      this.getStationInfo();                               //获取服务站信息
    },
    //数据加载
    loadData: function() {
      var self = this
      rt.get('../api/PartsApply/GetPartsApplyById/'+self.partsapplyid)
        .then(res=>{
          
          self.editForm=res;

         //改变事件
         this.$watch('editForm.new_productgroup_id', this.getRecipientInfo)

          //设置页面控件
         if (res.new_approvalstatus == 1 || res.new_approvalstatus == 4) {
            self.disabledform = false;
          } else {
            self.disabledform = true;
          }
        });
      //加载主档数据
    },
    /*****************/
    /***主档数据操作***/
    /*****************/
    //保存方法
    onSave: function(formName,type) {
      if(this.editForm.new_type==2&&this.editForm.new_workorder_id==null)
      {
          rt.showErrorToast("请选择服务单号！");
      }
      else
      {
        this.$refs[formName].validate((valid) => {
        if (valid) {
          var self = this
          var partsApply = self.editForm
          var params = {
                                                                //申请单号
                new_unitcode:partsApply.new_unitcode,                 //服务商编码
                new_station_idName:partsApply.new_station_idName,                //服务商名称
                new_station_id:partsApply.new_station_id,                  //服务商id
                             
                new_type:partsApply.new_type,                      //申请类型
                new_tatalamount:partsApply.new_tatalamount,               //总金额
                new_sendtype:partsApply.new_sendtype,                  //发货类型
              
                new_submit_time:rt.formatDateTime(partsApply.new_submit_time,"yyyy-mm-dd"),               //提交时间
                new_approved_time:rt.formatDateTime(partsApply.new_approved_time,"yyyy-mm-dd"),             //审核时间
                new_approvalstatus:partsApply.new_approvalstatus,            //审核状态
                
                new_workorder_id:partsApply.new_workorder_id,                    //服务单号
                new_desc:partsApply.new_desc,                      //申请说明
                
                new_applyattr:partsApply.new_applyattr,                 //申请归属
                new_productgroup_id:partsApply.new_productgroup_id,     //产品线ID
                new_productgroup_idname:partsApply.new_productgroup_idname,//产品线名称

                new_recipient:partsApply.new_recipient,                 //收货人
                new_phonenumber:partsApply.new_phonenumber,               //收货电话
                new_province_id:partsApply.new_province_id,                    //省份

                new_city_id:partsApply.new_city_id,                        //城市
                new_county_id:partsApply.new_county_id,                     //区县
                new_town_id:partsApply.new_town_id,                        //街道

                new_address:partsApply.new_address,                    //详细地址
          }
          /*创建*/
          if (self.partsapplyid === '') {
              self.saveCollBack=true;
                    rt.post('../api/PartsApply/CreatePartsApply', params).then(function(res) {
              self.$message({
                message: '保存成功',
                type: 'success'
              })
              self.saveCollBack = false
              self.partsapplyid = res
              self.initData()
              if(type==0)
              {
                  self.$router.replace({ name: "partedit", params: { id: self.partsapplyid } })
              }
              else
              {
                  self.$router.push({ name: "partlist" })
              }
           
            })
              .catch((error) => {
                self.saveCollBack = false
                rt.showErrorToast(error)
              })
          }
          /*更新*/
          else {
            params.id = self.partsapplyid
            rt.post('../api/PartsApply/UpdatePartsApply', params).then(function(res) {
              self.$message({
                message: '保存成功',
                type: 'success'
              })
              self.initData()
              if(type==0)
              {
                  self.$router.replace({ name: "partedit", params: { id: self.partsapplyid } })
              }
              else
              {
                  self.$router.push({ name: "partlist" })
              }
            })
              .catch((error) => {
                rt.showErrorToast(error)
              })
          }
        }
        else {
          rt.showErrorToast("请输入必填项！")
        }
      });
      }
    },
    //提交
    submit() {
       if (this.partsapplyid != '') {
        if (this.$refs.partsapplydetail.tableData === null || this.$refs.partsapplydetail.tableData.length < 1) {
          rt.showErrorToast("必须包含一条明细")
          return
        }
        this.flowDialogVisible = true
      }
      else {
        rt.showErrorToast('请先保存并添加明细')
      }
    },
    //撤回
    recall() {
        var entityname = 'new_srv_partsapply'
        var entityid = this.partsapplyid;
        let that = this
        rt.revoke(entityname, entityid)
        .then(function() {
          that.initData();
          that.$refs.signProcess.loadData();
        })
        .catch(function(error) {
          rt.showErrorToast(error)
        })
    },
    //获取审批列表
    flowlist() {
       this.flowListDialogVisible = true;
    },
    //签核提交
    submitCallback() {
      this.flowDialogVisible = false;
      this.initData();
      this.$refs.signProcess.loadData();
    },
    handleCommand(cmd) {
       switch (cmd) {
        case 'flowlist':
          this.flowlist();
          break
      }
    },
    /************
      Dialog弹出框部分
    ************/
    quickChooseProvince: function() {
      this.$refs.provinceDialog.show(this.editForm.new_province_idname);
    },
    quickChooseCity: function() {
      this.$refs.cityDialog.show(this.editForm.new_city_idname);
    },
    quickChooseCounty: function() {
      this.$refs.countyDialog.show(this.editForm.new_county_idname);
    },
    quickChooseTown: function() {
      this.$refs.townDialog.show(this.editForm.new_town_idname);
    },
    quickChooseGroup:function(){
       this.$refs.productGroupDialog.show(this.editForm.new_productgroup_idname);
    },
    //显示省Dialog
    provinceLookup: function() {
        if(this.disabledform)
      {
        return;
      }
      this.$refs.provinceDialog.show(this.editForm.new_province_idname);
    },
    //省选择
    selectProvince: function(id, name) {
      if (
        this.editForm.new_province_id == id &&
        this.editForm.new_province_idname == name
      ) {
        return;
      } else {
        this.editForm.new_province_id = id;
        this.editForm.new_province_idname = name;
        this.editForm.new_city_id = "";
        this.editForm.new_city_idname = "";
        this.editForm.new_county_id = "";
        this.editForm.new_county_idname = "";
        this.editForm.new_town_id = "";
        this.editForm.new_town_idname = "";
      }
    },
    //清除省份数据，将市县数据一起清除
    clear: function() {
      this.editForm.new_province_id = "";
      this.editForm.new_province_idname = "";
      this.editForm.new_city_id = "";
      this.editForm.new_city_idname = "";
      this.editForm.new_county_id = "";
      this.editForm.new_county_idname = "";
      this.editForm.new_town_id = "";
      this.editForm.new_town_idname = "";
    },

    //显示城市Dialog
    cityLookup: function() {
      if(this.disabledform)
      {
        return;
      }
      this.$refs.cityDialog.show(this.editForm.new_city_idname);
    },
    //市选择
    selectCity: function(id, name) {
      if (
        this.editForm.new_city_id == id &&
        this.editForm.new_city_idname == name
      ) {
        return;
      } else {
        this.editForm.new_city_id = id;
        this.editForm.new_city_idname = name;
        this.editForm.new_county_id = "";
        this.editForm.new_county_idname = "";
        this.editForm.new_town_id = "";
        this.editForm.new_town_idname = "";
      }
    },
    //清除市数据，并将县数据一起清除
    clearCityAndCounty: function() {
      this.editForm.new_city_id = "";
      this.editForm.new_city_idname = "";
      this.editForm.new_county_id = "";
      this.editForm.new_county_idname = "";
      this.editForm.new_town_id = "";
      this.editForm.new_town_idname = "";
    },

    //显示区县Dialog
    countyLookup: function() {
        if(this.disabledform)
      {
        return;
      }
      this.$refs.countyDialog.show(this.editForm.new_county_idname);
    },
    //区县选择
    selectCounty: function(id, name) {
      if (
        this.editForm.new_county_id == id &&
        this.editForm.new_county_idname == name
      ) {
        return;
      } else {
        this.editForm.new_county_id = id;
        this.editForm.new_county_idname = name;
        this.editForm.new_town_id = "";
        this.editForm.new_town_idname = "";
      }
    },
    //清除县数据
    clearCounty: function() {
      this.editForm.new_county_id = "";
      this.editForm.new_county_idname = "";
      this.editForm.new_town_id = "";
      this.editForm.new_town_idname = "";
    },

    //显示城镇Dialog
    townLookup: function() {
        if(this.disabledform)
      {
        return;
      }
      this.$refs.townDialog.show(this.editForm.new_town_idname);
    },
    //城镇选择
    selectTown: function(id, name) {
      if (
        this.editForm.new_town_id == id &&
        this.editForm.new_town_idname == name
      ) {
        return;
      } else {
        this.editForm.new_town_id = id;
        this.editForm.new_town_idname = name;
      }
    },
    //清除城镇数据
    clearTown: function() {
      this.editForm.new_town_id = "";
      this.editForm.new_town_idname = "";
    },
  
    //显示产品线Dialog
    groupLookup: function() {
      if(this.partsapplyid!='')
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

    //返回按钮之前提示保存申请单数据
    beforeGoBack: function() {
      if (rt.isNullOrWhiteSpace(this.partsapplyid)) {
        this.$confirm('新增配件申请单尚未保存，是否确定退出', '提示', {
          confirmButtonText: '确定',
          confirmButtonClass: 'ConfirmButtonClass',
          cancelButtonText: '取消',
          cancelButtonClass: 'CancelButtonClass',
          type: 'warning'
        }).then(() => {
          this.$router.push({ name: "partlist" })
        }).catch(() => {
        })
      }
      else {
        this.$router.push({ name: "partlist" })
      }
    },
    //获取服务站信息
    getStationInfo:function(){
         //新建
        if (this.partsapplyid === '') {
         var self=this; 
         rt.get('../api/NewSrvStation/GetBasicStation')
        .then(res=>{
          self.editForm.new_unitcode=res.new_code;        //申请单位编码
          self.editForm.new_station_idName=res.new_name;                //申请单位名称 
          self.editForm.new_station_id=res.new_srv_stationid;         //申请单位id
         
                var date=new Date();
                this.editForm.new_submit_time=new Date();
                this.editForm.new_type=1;                         //申请类型默认备货申请
                this.editForm.new_approvalstatus=1;               //审核状态默认制单
                this.editForm.new_applyattr=1;                    //申请属性默认服务商申请
                this.editForm.new_sendtype=1;
               
               //改变事件,获取收货人信息
               this.$watch('editForm.new_productgroup_id', this.getRecipientInfo)
               //this.getRecipientInfo();                          //收货人默认信息
                  });
              }
              else {
                //编辑
                this.loadData();
              }
      
    },
    //收货人默认信息
    getRecipientInfo:function(val,oldVal){
       if(this.editForm.new_productgroup_id=='')
        {
          alert("请选择产品线");
          return;
        }

      var param={
        new_station_id:this.editForm.new_station_id,
        new_productgroup_id:this.editForm.new_productgroup_id
      }

      var self=this;
      rt.get('../api/NewSrvStation/GetStockLineByStationID',param)
                   .then(res=>{
                    self.editForm.new_recipient=res.new_contact;         //收货人
                    self.editForm.new_phonenumber=res.new_tele;           //收货电话
                  
                    self.editForm.new_province_id=res.new_province_id;      //省会
                    self.editForm.new_province_idname=res.new_province_idName;  //省会名称
                   
                    self.editForm.new_city_id=res.new_city_id;               //城市
                    self.editForm.new_city_idname=res.new_city_idName;       //城市名称
                  
                    self.editForm.new_county_id=res.new_county_id;            //县区
                    self.editForm.new_county_idname=res.new_county_idName;    //县区名称
                    
                    self.editForm.new_town_id=res.new_town_id;            //街道
                    self.editForm.new_town_idname=res.new_town_idName;    //街道名称
                    //地址
                    self.editForm.new_address=res.new_province_idName+res.new_city_idName+res.new_county_idName+res.new_town_idName+res.new_address;
                    
                    });
    }
  }
}
</script>

<style type="text/css" scoped>

</style>
