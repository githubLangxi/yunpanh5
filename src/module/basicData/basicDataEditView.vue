<template>
	<div>
		<!--头部操作按钮-->
		<rt-header v-bind:title="$t('new_srv_station')">
			<rt-toolbar>
				<rt-button type="save" @click="onSave('editForm')" />
			</rt-toolbar>
		</rt-header>
		<!--服务站档案编辑Form-->
		<rt-content>
			<el-form :model="editForm" ref="editForm" :rules="rules" label-width="120px" label-position="left">
				<!--服务站编辑Form-->
				<rt-section v-bind:title="$t('new_srv_station')">
          <el-row :gutter="50">
            <el-col :span="8">
                <el-form-item v-bind:label="$t('new_srv_station.new_name')">
                  <el-input v-model="editForm.new_name" readonly disabled icon="search"></el-input>
                </el-form-item>
            </el-col>
				    <el-col :span="8">
                <el-form-item label="服务商简称">
                  <el-input v-model="editForm.new_shortername" readonly disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
							<el-form-item v-bind:label="$t('new_srv_station.new_type')" >
								<rt-picklist v-model="editForm.new_type" entity="new_srv_station" attribute="new_type" disabled></rt-picklist>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50">
            <el-col :span="8">
							<el-form-item v-bind:label="$t('new_srv_station.new_level')" >
								<rt-picklist v-model="editForm.new_level" entity="new_srv_station" attribute="new_level" disabled></rt-picklist>
							</el-form-item>
						</el-col>
            <el-col :span="8">
							<el-form-item label="上级服务商">
								<el-input v-model="editForm.new_upstation_idName" readonly disabled icon="search"></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="8">
							<el-form-item label="关联服务商">
								<el-input v-model="editForm.new_relationstation_idName" readonly disabled icon="search"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50">
            <el-col :span="8">
							<el-form-item label="sap供应商编码">
								<el-input v-model="editForm.new_sapcode" readonly disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="8">
							<el-form-item v-bind:label="$t('new_srv_station.new_code')">
								<el-input v-model="editForm.new_code" readonly disabled></el-input>
							</el-form-item>
						</el-col>
             <el-col :span="8">
							<el-form-item label="是否黑名单" >
								<rt-picklist v-model="editForm.new_isreject" entity="new_srv_station" attribute="new_isreject" disabled></rt-picklist>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50">
            <el-col :span="8">
							<el-form-item label="黑名单备注">
								<el-input v-model="editForm.new_rejectmemo" readonly disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="8">
							<el-form-item label="服务商状态">
								<rt-picklist v-model="editForm.new_formstatus" entity="new_srv_station" attribute="new_formstatus" disabled></rt-picklist>
							</el-form-item>
						</el-col>
             <el-col :span="8">
							<el-form-item label="开票冻结" >
								<rt-picklist v-model="editForm.new_isfrozeninvocie" entity="new_srv_station" attribute="new_isfrozeninvocie" disabled></rt-picklist>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50">
            <el-col :span="8">
							<el-form-item label="持卡人姓名">
								<el-input v-model="editForm.new_bankaccountname" readonly disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="8">
							<el-form-item label="银行编号">
								<el-input v-model="editForm.new_bankcode" readonly disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="8">
							<el-form-item label="开户银行全称">
								<el-input v-model="editForm.new_bank" readonly disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50">
						<el-col :span="8">
							<el-form-item label="银行账号">
								<el-input v-model="editForm.new_bankaccountnumber" readonly disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="8">
							<el-form-item label="法人">
								<el-input v-model="editForm.new_corpowner" readonly disabled></el-input>
							</el-form-item>
						</el-col>
            	<el-col :span="8">
							<el-form-item label="法人身份证">
								<el-input v-model="editForm.new_identitynumber" readonly disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50">
            <el-col :span="8">
							<el-form-item label="营业执照编号">
								<el-input v-model="editForm.new_licensenumber" readonly disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="8">
							<el-form-item label="纳税人识别号">
								<el-input v-model="editForm.new_taxnumber" readonly disabled></el-input>
							</el-form-item>
						</el-col>
            	<el-col :span="8">
							<el-form-item label="服务商负责人">
								<el-input v-model="editForm.new_siteowner" readonly disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50">
            <el-col :span="8">
							<el-form-item label="负责人电话">
								<el-input v-model="editForm.new_phone" ></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="8">
							<el-form-item label="电话区号">
								<el-input v-model="editForm.new_areacode" readonly disabled></el-input>
							</el-form-item>
						</el-col>
            	<el-col :span="8">
							<el-form-item label="所属服务中心">
								<el-input v-model="editForm.new_businessunit_idName" readonly disabled icon="search"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50">
						<el-col :span="8">
							<el-form-item v-bind:label="$t('new_srv_station.new_province_id')">
								<el-input v-model="editForm.new_province_idName" readonly disabled icon="search"></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="8">
							<el-form-item v-bind:label="$t('new_srv_station.new_city_id')">
								<el-input v-model="editForm.new_city_idName" icon="search" readonly disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item v-bind:label="$t('new_srv_station.new_county_id')" >
								<el-input v-model="editForm.new_county_idName" icon="search" readonly disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50">
            <el-col :span="8">
							<el-form-item label="街道/乡镇" >
								<el-input v-model="editForm.new_town_idName" readonly disabled icon="search"></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="8">
							<el-form-item label="信息员" >
								<el-input v-model="editForm.new_messageassistant" ></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="8">
							<el-form-item label="重要信息接收手机" >
								<el-input v-model="editForm.new_messagemobile" ></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50">
            <el-col :span="8">
							<el-form-item label="派单信息接收手机" >
								<el-input v-model="editForm.new_dispatchmobile"></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="8">
							<el-form-item label="服务商区域属性" >
									<rt-picklist v-model="editForm.new_areatype" entity="new_srv_station" attribute="new_areatype" disabled></rt-picklist>
							</el-form-item>
						</el-col>
            <el-col :span="8">
							<el-form-item label="详细地址" >
								<el-input v-model="editForm.new_address" readonly disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50">
            <el-col :span="8">
						<el-form-item label="付款方式" >
									<rt-picklist v-model="editForm.new_sappaymethod" entity="new_srv_station" attribute="new_sappaymethod" disabled></rt-picklist>
							</el-form-item>
						</el-col>
					</el-row>
				</rt-section>

        <rt-section title="资质">
          <el-row :gutter="50">
            <el-col :span="8">
						<el-form-item label="维修资质" >
									<rt-picklist v-model="editForm.new_isindependentrepair" entity="new_srv_station" attribute="new_isindependentrepair" disabled></rt-picklist>
							</el-form-item>
						</el-col>
             <el-col :span="8">
						<el-form-item label="退换机自行处理" >
									<rt-picklist v-model="editForm.new_isindependentexchange" entity="new_srv_station" attribute="new_isindependentexchange" disabled></rt-picklist>
							</el-form-item>
						</el-col>
             <el-col :span="8">
						<el-form-item label="停止派单" >
									<rt-picklist v-model="editForm.new_isstopdispatch" entity="new_srv_station" attribute="new_isstopdispatch" disabled></rt-picklist>
							</el-form-item>
						</el-col>
					</el-row>
           <el-row :gutter="50">
            <el-col :span="8">
						<el-form-item label="允许自建单" >
									<rt-picklist v-model="editForm.new_iscreateorder" entity="new_srv_station" attribute="new_iscreateorder" disabled></rt-picklist>
							</el-form-item>
						</el-col>
             <el-col :span="8">
						<el-form-item label="签约品牌" >
									<rt-picklist v-model="editForm.new_signbrand" entity="new_srv_station" attribute="new_signbrand" disabled></rt-picklist>
							</el-form-item>
						</el-col>
             <el-col :span="8">
						<el-form-item label="代结资质" >
									<rt-picklist v-model="editForm.new_isreplacesettle" entity="new_srv_station" attribute="new_isreplacesettle" disabled></rt-picklist>
							</el-form-item>
						</el-col>
					</el-row>
          <!--资质列表-->
          <BasicDataQualificationView v-if="shipConfirmid!==''" :mainid="shipConfirmid"></BasicDataQualificationView>
        </rt-section>

        <!--财务属性列表-->
        <BasicDataAccountView v-if="shipConfirmid!==''" :mainid="shipConfirmid"></BasicDataAccountView>

				<!--服务人员列表-->
				<!--<BasicDataDetailView v-if="shipConfirmid!==''" :mainid="shipConfirmid" @reloadEdit="initData"></BasicDataDetailView>-->

			</el-form>
		</rt-content>

		<!--省、城市、县lookup-->
		<div v-if="showProvince">
			<ProvinceDialog ref="provinceDialog" @send-provinceid="outProvinceId"></ProvinceDialog>
		</div>
		<div v-if="showCity">
			<CityDialog ref="cityDialog" @send-cityid="outCityId" :provinceid="new_province_id"></CityDialog>
		</div>
		<div v-if="showCounty">
			<CountyDialog ref="countyDialog" @send-countyid="outCountyId" :cityid="new_city_id"></CountyDialog>
		</div>
	</div>
</template>

<script type="text/javascript">
import picklistComponent from "@/components/common/picklist";
import BasicDataDetailView from "./basicDataDetailView";
import AddressDialog from "../dialog/addressDialog";
import ProvinceDialog from "../dialog/provinceDialog";
import CityDialog from "../dialog/cityDialog";
import CountyDialog from "../dialog/countyDialog";
import BasicDataQualificationView from "./basicDataQualificationView"
import BasicDataAccountView from "./basicDataAccountView"

export default {
  data() {
    return {
      //公用数据
      shipConfirmid: "", //当前服务站ID
      loading: false, //页面记载特效
      new_province_id: "", //省（组件判断）
      new_city_id: "", //市（组件判断）
      new_county_id: "", //县区（组件判断）
      showProvince: false,
      showCity: false,
      showCounty: false,

      /**************/
      /*服务站编辑数据*/
      /**************/
      editForm: {
        new_phone: "", //负责人电话
        new_messageassistant: "", //信息员
        new_messagemobile: "", //重要信息接收手机
        new_dispatchmobile: "", //派工信息接收手机
        // new_name: "", //服务站名称
        // new_code: "", //服务站编码
        // //第二行
        // new_type: "", //服务站类型
        // new_level: "", //服务站级别
        // new_province_id: "", //所属省份id
        // new_province_idName: "", //所属省份名称
        // //第三行
        // new_city_id: "", //所属城市id
        // new_city_idName: "", //所属城市名称
        // new_county_id: "", //所属区县id
        // new_county_idName: "", //所属区县名称
        // new_postalcode: "", //邮政编码
        // //第四行
        // new_fax: "", //传真
        // new_email: "", //电子邮箱
        // new_address: "", //地址
        // //第五行
        // new_siteowner: "", //服务站负责人
        // new_phone: "", //负责人电话
        // // new_region: '',//负责区域

        // new_beginamount: "", //期初额度
        // new_currentamount: "" //可用额度
      },
      rules: {
      /*  new_type: [
          {
            type: "number",
            required: true,
            message: "请选择服务站类型",
            trigger: "change"
          }
        ],
        new_level: [
          {
            type: "number",
            required: true,
            message: "请选择服务站级别",
            trigger: "change"
          }
        ],
        new_province_idName: [
          { required: true, message: "请选择省份", trigger: "change" }
        ],
        new_city_idName: [
          { required: true, message: "请选择城市", trigger: "change" }
        ],
        new_county_idName: [
          { required: true, message: "请选择区县", trigger: "change" }
        ]*/
        // new_region: [
        // 	{ required: true, message: '请选择负责区域', trigger: 'change' }
        // ]
      }
    };
  },
  components: {
    picklistComponent,
    BasicDataDetailView,
    AddressDialog,
    ProvinceDialog,
    CityDialog,
    CountyDialog,
    BasicDataQualificationView,
    BasicDataAccountView
  },
  mounted: function() {
    if (this.$store.state.user.departId) {
      this.shipConfirmid = this.$store.state.user.departId;
    }
    this.initData();
  },
  watch: {
    new_workorder_id: function(val) {
      this.editForm.new_workorder_id = val;
    },
    new_workorder_idname: function(val) {
      this.editForm.new_workorder_idname = val;
    }
  },

  methods: {
    /**************/
    /*初始化页面数据*/
    /**************/
    initData: function() {
      if (this.shipConfirmid === "") {
        return;
      } else {
        this.loadData();
      }
    },
    //数据加载
    loadData: function() {
      var self = this;
      //加载主档数据
      rt
        .get("../api/NewSrvStation/GetStationDetail")
        .then(function(res) {
          self.editForm = res;
          self.new_province_id = self.editForm.new_province_id;
          self.new_city_id = self.editForm.new_city_id;
          self.new_county_id = self.editForm.new_county_id;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },

    /**************/
    /*编辑项逻辑处理*/
    /**************/
    //服务站编辑项保存
    onSave: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this;
          var shipConfirm = self.editForm;
          var params = {
            new_srv_stationid: this.shipConfirmid, //服务站id
            // new_name: shipConfirm.new_name, //服务站名称
            // new_code: shipConfirm.new_code, //服务站编码

            // new_type: shipConfirm.new_type, //服务站类型
            // new_level: shipConfirm.new_level, //服务站级别
            // new_province_id: shipConfirm.new_province_id, //所属省份id

            // new_city_id: shipConfirm.new_city_id, //所属城市id
            // new_county_id: shipConfirm.new_county_id, //所属区县id
            // new_postalcode: shipConfirm.new_postalcode, //邮政编码

            // new_fax: shipConfirm.new_fax, //传真
            // new_email: shipConfirm.new_email, //电子邮箱
            // new_address: shipConfirm.new_address, //地址

            // new_siteowner: shipConfirm.new_siteowner, //服务站负责人
            // new_phone: shipConfirm.new_phone //负责人电话
            // new_region: shipConfirm.new_region,//负责区域

            new_phone: shipConfirm.new_phone, //负责人电话
        new_messageassistant: shipConfirm.new_messageassistant, //信息员
        new_messagemobile: shipConfirm.new_messagemobile, //重要信息接收手机
        new_dispatchmobile: shipConfirm.new_dispatchmobile, //派工信息接收手机
          };
          /*创建*/
          if (self.shipConfirmid === "") {
            return;
          } else {
            /*更新*/
            params.new_srv_stationid = self.shipConfirmid;
            self
              .updateFormDate(params)
              .then(function(res) {
                rt.showSuccessToast(self.$t("Successfullysaved"));
                self.initData();
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          }
        } else {
          rt.showErrorToast(self.$t("PleaseInputRequiredFields"));
        }
      });
    },
    //更新主档数据
    updateFormDate: function(params) {
      return rt.post("../api/NewSrvStation/SaveSrvStation", params);
    },
    //服务站级别组件赋值
    GetLevelSelected: function(val) {
      this.editForm.new_level = val;
    },

    /***************/
    /*lookup数据处理*/
    /***************/
    //显示省Dialog
    provincelookup: function() {
      this.showProvince = true;
      this.showCity = false;
      this.showCounty = false;
    },
    //省选择
    outProvinceId: function(val) {
      this.editForm.new_province_id = val[0];
      this.editForm.new_province_idName = val[1];
      this.new_province_id = val[0];
      this.editForm.new_city_id = "";
      this.editForm.new_city_idName = "";
      this.editForm.new_county_id = "";
      this.editForm.new_county_idName = "";
      this.showProvince = false;
    },

    //显示城市Dialog
    citylookup: function() {
      this.showCity = true;
      this.showCounty = false;
    },
    //选择城市
    outCityId: function(val) {
      this.editForm.new_city_id = val[0];
      this.editForm.new_city_idName = val[1];
      this.new_city_id = this.editForm.new_city_id;
      this.editForm.new_county_id = "";
      this.editForm.new_county_idName = "";
      this.showCity = false;
    },

    //显示区县Dialog
    countylookup: function() {
      this.showCounty = true;
    },
    //选择区县
    outCountyId: function(val) {
      this.editForm.new_county_id = val[0];
      this.editForm.new_county_idName = val[1];
      this.showCounty = false;
    }
  }
};
</script>

<style type="text/css" scoped>

</style>