<template>
  <div>
    <!--头部操作按钮-->
    <rt-header title="新增/修改服务商变单">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button type="save"  @click="onSave('editForm',0)" :disabled="saveCollBack"  v-show="editForm.new_approvalstatus==null||editForm.new_approvalstatus==1||editForm.new_approvalstatus==4"/>
        <rt-button type="save" text="保存并关闭"  @click="onSave('editForm',1)" :disabled="saveCollBack" v-show="editForm.new_approvalstatus==null||editForm.new_approvalstatus==1||editForm.new_approvalstatus==4"/>
        <rt-button type="submit" @click="onSave('editForm',3)" v-show="editForm.new_approvalstatus==null||editForm.new_approvalstatus==1||editForm.new_approvalstatus==4"/>
        <rt-button type="revert" @click="recall" v-show="editForm.new_approvalstatus==2"/>
        <el-dropdown trigger="click" @command="handleCommand" v-show="(editForm.new_approvalstatus!=1||editForm.new_approvalstatus==4)&&editForm.new_approvalstatus!=null">
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
    <signProcess ref="signProcess"  v-if="this.applyId!=''"  :applyId="this.applyId"></signProcess>
    <!--主档数据编辑Form-->
    <rt-content>
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="120px" label-position="left" v-loading="loading">
        <rt-section title="基础资料">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="服务商编码">
                <el-input v-model="editForm.new_code" :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="8">
              <el-form-item label="服务商名称" >
                <el-input v-model="editForm.new_name"    :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务商简称">
                 <el-input v-model="editForm.new_shortername" :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
        <rt-section title="公司信息">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="企业名称" >
                <el-input v-model="editForm.new_bankaccountname"  :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="8">
              <el-form-item label="统一信用代码/营业执照" >
                <el-input v-model="editForm.new_licensenumber"  :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="纳税人识别号" >
                 <el-input v-model="editForm.new_taxnumber"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="银行名称" >
                   <el-input v-model="editForm.new_bank_name"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户支行名称" >
              <el-input v-model="editForm.new_bank"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行行号" >
                   <el-input v-model="editForm.new_bankcode"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="银行账号" >
                <el-input v-model="editForm.new_bankaccountnumber"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人" >
                <el-input v-model="editForm.new_siteowner"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人手机" >
                   <el-input v-model="editForm.new_phone"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="法人姓名" >
                  <el-input v-model="editForm.new_corpowner"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人手机" >
                     <el-input v-model="editForm.new_corp_owner_mobile"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人身份证号" >
                   <el-input v-model="editForm.new_identitynumber"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
             <el-col :span="8">
              <el-form-item label="合同经办人">
                  <el-input v-model="editForm.new_contract_agent"  :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="8">
              <el-form-item label="合同经办人手机">
                  <el-input v-model="editForm.new_contract_agent_mobile"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="8">
              <el-form-item label="合同经办人身份证">
                  <el-input v-model="editForm.new_contract_agent_number"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
            <el-row :gutter="50">
             <el-col :span="8">
              <el-form-item label="信息员" >
                  <el-input v-model="editForm.new_messageassistant"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="8">
              <el-form-item label="信息员手机" >
                  <el-input v-model="editForm.new_dispatchmobile"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="8">
            </el-col>
          </el-row>
           <el-row :gutter="50">
             <el-col :span="8">
              <el-form-item label="发票类型" >
                 <rt-picklist v-model="editForm.new_invoice_type" attribute="new_invoice_type"    entity="new_srv_station_apply"  :disabled="this.FormType"></rt-picklist>
              </el-form-item>
            </el-col>
           <el-col :span="8">
              <el-form-item label="安装发票税率" >
                  <rt-picklist v-model="editForm.new_install_tax" attribute="new_install_tax"   entity="new_srv_station_apply"  :disabled="this.FormType"></rt-picklist>
              </el-form-item>
            </el-col>
           <el-col :span="8">
              <el-form-item label="维修发票税率" >
                 <rt-picklist v-model="editForm.new_repair_tax"  attribute="new_repair_tax"  entity="new_srv_station_apply" :disabled="this.FormType"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
                    <el-row :gutter="50">
             <el-col :span="8">
              <el-form-item label="电话区号" >
                  <el-input v-model="editForm.new_areacode"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="8">
              <el-form-item label="所属省份" >
                 <el-input v-model="editForm.new_province_idname"  readonly @keyup.enter.native="quickChooseProvince"  :disabled="this.FormType" icon="search" :on-icon-click="provinceLookup"></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="8">
              <el-form-item label="所属城市" >
                 <el-input v-model="editForm.new_city_idname"   readonly @keyup.enter.native="quickChooseCity" :disabled="this.FormType" icon="search" :on-icon-click="cityLookup"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
             <el-row :gutter="50">
             <el-col :span="8">
              <el-form-item label="所属区县" >
                 <el-input v-model="editForm.new_county_idname"   readonly @keyup.enter.native="quickChooseCounty" :disabled="this.FormType" icon="search" :on-icon-click="countyLookup"></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="8">
              <el-form-item label="街道/乡镇" >
               <el-input v-model="editForm.new_town_idname"   readonly @keyup.enter.native="quickChooseTown" :disabled="this.FormType" icon="search" :on-icon-click="townLookup"></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="8">
            </el-col>
          </el-row>
          <el-row :gutter="50">
             <el-col :span="24">
              <el-form-item label="详细地址" >
                  <el-input type="textarea" v-model="editForm.new_address"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

           <!-- <PictureList ref="PictureList" :applyId="this.applyId" :showDetail="true"></PictureList> -->
           <attachment ref="attachment" :workOrder="{id:this.applyId,state:editForm.new_approvalstatus}" :showDetail="true"></attachment>
        </rt-section>
                  <rt-section title="基本图片">
  <div class="pcontent">
    <div v-for="list in DataList" class="piclist">
      <div class="picurl">
       <upload-png :workOrder="{id:list.applyid,new_id:list.new_id}" :basePng="list.pngsrc" />
      </div>
          <div class="picname">
            <span>{{list.new_name}}</span>
          </div>
    </div>
    <div class="clear"></div>
     </div>
     </rt-section>
           <PlatformList ref="interactionModel" :workOrder="{id:this.applyId,state:editForm.new_approvalstatus}"></PlatformList>
      <rt-section title="协议图片">
  <div class="pcontent">
    <div v-for="list in XyList" class="piclist">
      <div class="picurl">
       <upload-png :workOrder="{id:list.applyid,new_id:list.new_id}" :basePng="list.pngsrc" />
      </div>
          <div class="picname">
            <span>{{list.new_name}}</span>
          </div>
    </div>
    <div class="clear"></div>
     </div>
     </rt-section>
           <ApplyAccount ref="ApplyAccount" :workOrder="{id:this.applyId,state:editForm.new_approvalstatus}"></ApplyAccount>
      </el-form>
    </rt-content>
      <!--签核提交-->
    <el-dialog title="签核流程" class="rt-portal-flowSubmitDialog" :visible.sync="flowDialogVisible">
      <RTFlowSubmit entityname='new_srv_station_apply' :id='this.applyId' v-if="flowDialogVisible" @closesubmit='submitCallback()'></RTFlowSubmit>
    </el-dialog>
 
    <!--签核列表-->
    <el-dialog title="审批进度" class="rt-portal-flowListDialog" :visible.sync="flowListDialogVisible">
      <RTFlowApprovalList entityname='new_srv_station_apply' :id='this.applyId' v-if="flowListDialogVisible"></RTFlowApprovalList>
    </el-dialog>
      <!--Lookup组件-->
    <ProvinceDialog ref="provinceDialog" @lookupSelect="selectProvince" @lookupSelectClear="clear"></ProvinceDialog>
    <CityDialog ref="cityDialog" @lookupSelect="selectCity" @lookupSelectClear="clearCityAndCounty" :provinceid="this.editForm.new_province_id"></CityDialog>
    <CountyDialog ref="countyDialog" @lookupSelect="selectCounty" @lookupSelectClear="clearCounty" :cityid="this.editForm.new_city_id"></CountyDialog>
    <TownDialog ref="townDialog" @lookupSelect="selectTown" @lookupSelectClear="clearTown" :countyid="this.editForm.new_county_id"></TownDialog>
  </div>
</template>
<script type="text/javascript">
import RTFlowSubmit from "@/components/flow/flowSubmit";
import picklistComponent from "@/components/common/picklist";
import RTFlowApprovalList from "@/components/flow/flowApprovallist";
import signProcess from "./signProcess";
import PlatformList from "./PlatformList";
import attachment from "./attachment";
import ApplyAccount from "./ApplyAccount";
import ProvinceDialog from "../../dialog/provinceDialog";
import CityDialog from "../../dialog/cityDialog";
import CountyDialog from "../../dialog/countyDialog";
import TownDialog from "../../dialog/townDialog";
// import PictureList from "./PictureList";
import uploadPng from "@/components/uploadPng/uploadPng";
export default {
  data() {
    return {
      applyId: "", //主键
      FormType: false, //窗体类型
      DataList: [], //基本图片
      XyList: [], //协议图片
      /*表单数据*/
      editForm: {
        new_code: "", //服务商编码
        new_name: "", //服务商名称
        new_shortername: "", //服务商简称
        new_bankaccountname: "", //企业名称
        new_licensenumber: "", //统一信用代码/营业执照
        new_taxnumber: "", //纳税人识别号
        new_bank_name: "", //银行名称
        new_bank: "", //开户支行名称
        new_bankcode: "", //银行行号
        new_bankaccountnumber: "", //银行账号
        new_siteowner: "", //负责人
        new_phone: "", //负责人手机
        new_corpowner: "", //法人姓名
        new_corp_owner_mobile: "", //法人手机
        new_identitynumber: "", //法人身份证号
        new_contract_agent: "", //合同经办人
        new_contract_agent_mobile: "", //合同经办人手机
        new_contract_agent_number: "", //合同经办人身份证
        new_messageassistant: "", //信息员
        new_dispatchmobile: "", //信息员手机
        new_invoice_type: "", //发票类型
        new_install_tax: "", //安装发票税率
        new_repair_tax: "", //维修发票税率
        new_areacode: "", //电话区号
        new_province_idname: "", //所属省份
        new_city_idname: "", //所属城市
        new_county_idname: "", //所属区县
        new_town_idname: "", //街道/乡镇
        new_address: "", //详细地址
        new_province_id: "", //省份
        new_city_id: "", //城市
        new_county_id: "", //区县
        new_town_id: "", //街道
        new_address: "" //详细地址
      },
      loading: false, //加载特效
      flowDialogVisible: false, //签核提交是否可见
      saveCollBack: false, //保存回调禁用
      flowListDialogVisible: false, //审批记录是否可见
      rules: {
        isrequired: [
          {
            required: true,
            message: "请填写必填项"
          }
        ]
      }
    };
  },
  components: {
    PlatformList,
    attachment,
    RTFlowApprovalList,
    RTFlowSubmit,
    signProcess,
    ApplyAccount,
    ProvinceDialog,
    CityDialog,
    CountyDialog,
    TownDialog,
    picklistComponent,
    uploadPng
    // PictureList
  },
  created: function() {
    if (this.$route.params.id) {
      this.applyId = this.$route.params.id;
    } else {
    }
  },
  mounted: function() {
    this.initData(); //初始化数据
  },
  computed: {},
  watch: {},
  methods: {
    /**初始化编辑页面**/
    initData: function() {
      this.loadData();
    },
    //数据加载
    loadData: function() {
      var self = this;
      self.loading = true;
      var params = { id: this.applyId };
      var requestStr = "../api/StationApply/GetStationApply";
      rt.get(requestStr, params)
        .then(res => {
          self.loading = false;
          if (
            res.new_approvalstatus != null &&
            (res.new_approvalstatus != "1" && res.new_approvalstatus != "4")
          ) {
            this.FormType = true;
          } else {
            this.FormType = false;
          }
          self.editForm = res;
          self.DataList = JSON.parse(res.pictureurl);
          self.XyList = JSON.parse(res.pictureurl2);
        })
        .catch(error => {
          self.loading = false;
          self.FormType = true;
          rt.showErrorToast(error);
        });
      //加载主档数据
    },
    /***主档数据操作***/
    //保存方法
    onSave: function(formName, type) {
      this.loading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this;
          var partsApply = self.editForm;
          var params = {
            new_srv_station_applyId: this.applyId, //主键
            new_code: partsApply.new_code, //服务商编码
            new_name: partsApply.new_name, //服务商名称
            new_shortername: partsApply.new_shortername, //服务商简称
            new_bankaccountname: partsApply.new_bankaccountname, //企业名称
            new_licensenumber: partsApply.new_licensenumber, //统一信用代码/营业执照
            new_taxnumber: partsApply.new_taxnumber, //纳税人识别号
            new_bank_name: partsApply.new_bank_name, //银行名称
            new_bank: partsApply.new_bank, //开户支行名称
            new_bankcode: partsApply.new_bankcode, //银行行号
            new_bankaccountnumber: partsApply.new_bankaccountnumber, //银行账号
            new_siteowner: partsApply.new_siteowner, //负责人
            new_phone: partsApply.new_phone, //负责人手机
            new_corpowner: partsApply.new_corpowner, //法人姓名
            new_corp_owner_mobile: partsApply.new_corp_owner_mobile, //法人手机
            new_identitynumber: partsApply.new_identitynumber, //法人身份证号
            new_contract_agent: partsApply.new_contract_agent, //合同经办人
            new_contract_agent_mobile: partsApply.new_contract_agent_mobile, //合同经办人手机
            new_contract_agent_number: partsApply.new_contract_agent_number, //合同经办人身份证
            new_messageassistant: partsApply.new_messageassistant, //信息员
            new_dispatchmobile: partsApply.new_dispatchmobile, //信息员手机
            new_invoice_type: partsApply.new_invoice_type, //发票类型
            new_install_tax: partsApply.new_install_tax, //安装发票税率
            new_repair_tax: partsApply.new_repair_tax, //维修发票税率
            new_areacode: partsApply.new_areacode, //电话区号
            new_province_idname: partsApply.new_province_idname, //所属省份
            new_city_idname: partsApply.new_city_idname, //所属城市
            new_county_idname: partsApply.new_county_idname, //所属区县
            new_town_idname: partsApply.new_town_idname, //街道/乡镇
            new_address: partsApply.new_address, //详细地址
            new_province_id: partsApply.new_province_id, //省份
            new_city_id: partsApply.new_city_id, //城市
            new_county_id: partsApply.new_county_id, //区县
            new_town_id: partsApply.new_town_id, //街道
            new_address: partsApply.new_address, //详细地址
            new_stationid: partsApply.new_stationid, //服务商档案
            new_change_type: partsApply.new_change_type, //变更类型
            ownerid: partsApply.ownerid, //负责人
            new_process_type: partsApply.new_process_type, //审批走向
            new_businessunit_id: partsApply.new_businessunit_id //所属中心
          };
          /*创建*/
          self.saveCollBack = true;
          rt.post("../api/StationApply/AddStationEntity", params)
            .then(function(res) {
              self.loading = false;
              self.$message({
                message: "保存成功",
                type: "success"
              });
              self.saveCollBack = false;
              self.applyId = res;
              self.initData();
              if (type == 3) {
                self.loading = false;
                self.flowDialogVisible = true;
              }
              if (type == 0) {
                self.loading = false;
                self.$router.replace({
                  name: "StationApplyEdit",
                  params: { id: res }
                });
              }
              if (type == 1) {
                self.$router.push({ name: "StationApply" });
              }
            })
            .catch(error => {
              self.loading = false;
              self.saveCollBack = false;
              rt.showErrorToast(error);
            });
        } else {
          rt.showErrorToast("请输入必填项！");
        }
      });
    },
    // //提交
    // submit() {
    // },
    //撤回
    recall() {
      var entityname = "new_srv_station_apply";
      var entityid = this.applyId;
      let that = this;
      rt.revoke(entityname, entityid)
        .then(function() {
          that.initData();
          that.$refs.signProcess.loadData();
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
      this.$refs.signProcess.loadData();
    },
    handleCommand(cmd) {
      switch (cmd) {
        case "flowlist":
          this.flowlist();
          break;
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
    //显示省Dialog
    provinceLookup: function() {
      if (this.disabledform) {
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
      if (this.disabledform) {
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
      if (this.disabledform) {
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
      if (this.disabledform) {
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
    //返回按钮之前提示保存申请单数据
    beforeGoBack: function() {
      if (rt.isNullOrWhiteSpace(this.applyId)) {
        this.$confirm("新增服务变更单尚未保存，是否确定退出", "提示", {
          confirmButtonText: "确定",
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: "取消",
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            this.$router.push({ name: "StationApply" });
          })
          .catch(() => {});
      } else {
        this.$router.push({ name: "StationApply" });
      }
    }
  }
};
</script>
<style type="text/css" scoped>
.piclist {
  position: relative;
  float: left;
  width: 25%;
}
.picname {
  position: absolute;
  width: 278px;
  height: 30px;
  left: 16px;
  bottom: 11px;
  text-align: center;
  border-radius: 0 0 5px 5px;
  background-color: rgba(0, 0, 0, 0.5);
}
.picname span {
  width: 100%;
  height: 24px;
  line-height: 24px;
  color: #ffffff;
  font-family: "微软雅黑";
  font-size: 16px;
}
.pcontent {
  margin: 12px auto;
  background-color: #fff;
}
.clear {
  clear: both;
}
</style>
