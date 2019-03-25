<template>
  <div>
    <rt-header title="服务商档案">
    </rt-header>
    <rt-content>
      <el-form ref="editForm"  label-width="120px" label-position="left" v-loading="loading">
        <rt-section title="基础资料">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="服务商编码">
                <el-input v-model="editForm.new_code" :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="8">
              <el-form-item label="服务商名称" >
                <el-input v-model="editForm.new_name" :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务商简称">
                 <el-input v-model="editForm.new_shortername" :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
            <el-row :gutter="50">
             <el-col :span="8">
                <el-form-item label="所属中心">
                    <el-input v-model="editForm.new_businessunit_id" :disabled="this.FormType"></el-input>
                </el-form-item>
                </el-col>
                            <el-col :span="8">
                <el-form-item label="中心负责人">
                    <el-input v-model="editForm.ownerid" :disabled="this.FormType"></el-input>
                </el-form-item>
                </el-col>
             <el-col :span="8">
                <el-form-item label="上级服务商">
                    <el-input v-model="editForm.new_upstation_id" :disabled="this.FormType"  icon="search"></el-input>
                </el-form-item>
                </el-col>
            </el-row>
              <el-row :gutter="50">
             <el-col :span="8">
                <el-form-item label="服务商等级">
                <rt-picklist v-model="editForm.new_level" entity="new_srv_station" attribute="new_level" disabled />
                </el-form-item>
                </el-col>
                            <el-col :span="8">
                <el-form-item label="允许使用App">
              <rt-picklist v-model="editForm.new_usedapp" entity="new_srv_station" attribute="new_usedapp" disabled />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="允许自建单">
            <rt-picklist v-model="editForm.new_iscreateorder" entity="new_srv_station" attribute="new_iscreateorder" disabled /> 
                </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="50">
             <el-col :span="8">
                <el-form-item label="是否黑名单">
              <rt-picklist v-model="editForm.new_isreject" entity="new_srv_station" attribute="new_isreject" disabled />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="黑名单备注">
                    <el-input v-model="editForm.new_rejectmemo" :disabled="this.FormType"></el-input>
                </el-form-item>
                </el-col>
                            <el-col :span="8">
                <el-form-item label="SAP供应商编码">
                    <el-input v-model="editForm.new_sapcode" :disabled="this.FormType"></el-input>
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
                <el-form-item label="电子邮箱" >
                  <el-input v-model="editForm.internalemailaddress"   :disabled="this.FormType"></el-input>
              </el-form-item>
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
                 <el-input v-model="editForm.new_province_idname"    :disabled="this.FormType" icon="search" ></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="8">
              <el-form-item label="所属城市" >
                 <el-input v-model="editForm.new_city_idname"   :disabled="this.FormType" icon="search"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
             <el-row :gutter="50">
             <el-col :span="8">
              <el-form-item label="所属区县" >
                 <el-input v-model="editForm.new_county_idname"   :disabled="this.FormType" icon="search" ></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="8">
              <el-form-item label="街道/乡镇" >
               <el-input v-model="editForm.new_town_idname"   :disabled="this.FormType" icon="search" ></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="8">
            </el-col>
          </el-row>
          <el-row :gutter="50">
             <el-col :span="24">
              <el-form-item label="详细地址">
                  <el-input type="textarea" v-model="editForm.new_address"   :disabled="this.FormType"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
  <rt-section title="基本图片">
  <div class="pcontent">
    <div v-for="list in DataList" class="piclist">
      <div class="picurl">
       <upload-png :workOrder="{id:list.applyid,new_id:list.new_id}" :basePng="list.pngsrc" :disabled="true" />
      </div>
          <div class="picname">
            <span>{{list.new_name}}</span>
          </div>
    </div>
    <div class="clear"></div>
     </div>
     </rt-section>
        <attachment ref="attachment" :workOrder="{id:editForm.applyId,state:editForm.new_approvalstatus}" :showDetail="true"/>
        <XyList :applyId="editForm.applyId"/>
        <YwzzList :applyId="editForm.applyId"/>
        <PlatformList  :applyId="editForm.applyId"/>
   <rt-section title="协议图片">
  <div class="pcontent">
    <div v-for="list in XyList" class="piclist">
      <div class="picurl">
       <upload-png :workOrder="{id:list.applyid,new_id:list.new_id}" :basePng="list.pngsrc" :disabled="true" />
      </div>
          <div class="picname">
            <span>{{list.new_name}}</span>
          </div>
    </div>
    <div class="clear"></div>
     </div>
     </rt-section>
        <ApplyAccount ref="ApplyAccount" :applyId="editForm.applyId"/>
        <ApplyService  :applyId="editForm.applyId"/>
        <ApplyOther  :applyId="editForm.applyId"/>
        <ApplyBrand  :applyId="editForm.applyId"/>
      </el-form>
    </rt-content>
  </div>
</template>
<script type="text/javascript">
import PlatformList from "./FwplatformList";
import attachment from "./Fwattachment";
import ApplyAccount from "./Fwapplystation";
import XyList from "./FwXyList";
import YwzzList from "./FwYwzzList";
import ApplyService from "./FwApplyService";
import ApplyOther from "./FwApplyOther";
import ApplyBrand from "./FwApplyBrand";
import uploadPng from "@/components/uploadPng/uploadPng";
export default {
  data() {
    return {
      FormType: true, //窗体类型
      DataList: [], //基本图片
      XyList: [], //协议图片
      /*表单数据*/
      editForm: {
        applyId: "",
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
        new_address: "", //详细地址
        new_businessunit_id: "", //所属中心  lock
        ownerid: "", //中心负责人   lock
        new_upstation_id: "", //上级服务商  lock
        new_level: "", //服务商等级   op
        new_usedapp: "", //允许使用APP   bool
        new_iscreateorder: "", //允许自建单  bool
        new_isreject: "", //是否黑名单  bool
        new_rejectmemo: "", //黑名单备注  txt
        new_sapcode: "" //SAP供应商编码 txt
      },
      loading: false //加载特效
    };
  },
  components: {
    PlatformList,
    attachment,
    ApplyAccount,
    uploadPng,
    XyList,
    YwzzList,
    ApplyService,
    ApplyOther,
    ApplyBrand
  },
  mounted: function() {
    this.initData(); //初始化数据
  },
  computed: {},
  methods: {
    /**初始化编辑页面**/
    initData: function() {
      //   this.FormType = true;
      this.loadData();
    },
    //数据加载
    loadData: function() {
      var self = this;
      self.loading = true;
      var requestStr = "../api/StationApply/ServiceView";
      rt.get(requestStr)
        .then(res => {
          self.loading = false;
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

