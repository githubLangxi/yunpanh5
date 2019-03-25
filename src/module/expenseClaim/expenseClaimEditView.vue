<template>
	<div class="expenseClaimEdit">
		<rt-header v-bind:title="$t('new_srv_expense_claim')">
			<rt-toolbar show-autoback>
				<!-- <rt-button type="save" @click="save('queryForm')"/>
				<rt-button :text="$t('BUTTON_ConAndSend')" type="confirm" @click="confirm('queryForm')" v-show="queryForm.new_formstatus==1"/>
	            <rt-button type="print" :text="$t('BUTTON_PRINT')"/> -->
			</rt-toolbar>
	    </rt-header>
		<rt-content>
			<el-form ref="queryForm" :model="queryForm" label-width="120px" label-position="left" :rules="rules">
			    <rt-section :title="$t('BaseInfo')">
					<el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="结算单号">
								<el-input v-model="queryForm.new_name" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="服务单类型" prop="new_formstatus">
								<rt-picklist entity="new_srv_expense_claim" attribute="new_servicetype" v-model="queryForm.new_servicetype" disabled></rt-picklist>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结算服务商名称">
								<el-input v-model="queryForm.new_srv_station_idname" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="结算服务商编码">
								<el-input v-model="queryForm.new_srv_station_code" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="关联服务单">
								<el-input v-model="queryForm.new_workorder_idname" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="关联监理单">
								<el-input v-model="queryForm.new_srv_supervision_idname" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="录单服务商名称">
								<el-input v-model="queryForm.new_worksite_idname" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="录单服务商编码">
								<el-input v-model="queryForm.new_worksite_code" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="套机标识">
								<el-input v-model="queryForm.new_setmark" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="结算单类型">
								<rt-picklist entity="new_srv_expense_claim" attribute="new_type" v-model="queryForm.new_type" disabled></rt-picklist>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="结算方式" >
								<rt-picklist entity="new_srv_expense_claim" attribute="new_settleway" v-model="queryForm.new_settleway" disabled></rt-picklist>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="结算单状态">
								<rt-picklist entity="new_srv_expense_claim" attribute="new_formstatus" v-model="queryForm.new_formstatus" disabled></rt-picklist>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="电商订单号">
								<el-input v-model="queryForm.new_ecommercecode" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="是否汇总">
									<el-checkbox class="expense-checkbox" v-model="queryForm.new_isgather" disabled></el-checkbox>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="结算汇总单">
								<el-input v-model="queryForm.new_expense_summary_idname" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="是否已收款">
									<el-checkbox class="expense-checkbox" v-model="queryForm.new_ispayed" disabled=""></el-checkbox>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50" class="rt-portal-form-row">
					 <el-col :span="6">
							<el-form-item label="公里数">
								<el-input v-model="queryForm.new_kms" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="回访结果">
								<rt-picklist entity="new_srv_expense_claim" attribute="new_returnvisit" v-model="queryForm.new_returnvisit" disabled></rt-picklist>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="用户满意度">
								<rt-picklist entity="new_srv_expense_claim" attribute="new_user_satisfaction" v-model="queryForm.new_user_satisfaction" disabled></rt-picklist>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="服务中心">
								<el-input v-model="queryForm.new_bu_idname" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="6" colspan="3">
							<el-form-item label="创建时间">
								<el-input v-model="queryForm.createdonUTC" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
			    </rt-section>
          <rt-section title="初审信息">
            <el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="初审基本费用">
								<el-input v-model="queryForm.new_first_basicexp" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="初审远程费用">
									<el-input v-model="queryForm.new_first_remoteexp" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="初审加氟补贴">
								<el-input v-model="queryForm.new_first_fu_allowance" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="初审补贴金额">
									<el-input v-model="queryForm.new_first_allowance" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="初审协议激励金额">
								<el-input v-model="queryForm.new_first_agreementamt" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="初审总费用">
								<el-input v-model="queryForm.new_first_totalamount" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="二级服务商初审金额">
								<el-input v-model="queryForm.new_second_firamount" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="初审结果">
								<rt-picklist entity="new_srv_expense_claim" attribute="new_first_result" v-model="queryForm.new_first_result" disabled></rt-picklist>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50">
            <el-col :span="24">
							<el-form-item label="初审金额补贴说明">
								<el-input type="textarea" v-model="queryForm.new_first_allowancedesc" disabled></el-input>
							</el-form-item>
						</el-col>
          </el-row>
        </rt-section>    
        <expenseClaimDetail :id="id"></expenseClaimDetail>
        <rt-section title="中心审核信息">
            <el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="审核基本费用">
								<el-input v-model="queryForm.new_center_basicexp" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="审核远程费用">
									<el-input v-model="queryForm.new_center_remoteexp" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="审核加氟补贴">
								<el-input v-model="queryForm.new_center_fu_allowance" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="审核补贴金额">
									<el-input v-model="queryForm.new_center_allowance" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="审核协议激励金额">
								<el-input v-model="queryForm.new_center_agreementamt" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="审核扣款金额">
								<el-input v-model="queryForm.new_center_deductamount" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="审核总金额">
								<el-input v-model="queryForm.new_center_totalamount" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="二级服务商审核金额">
								<el-input v-model="queryForm.new_second_approveamount" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50">
            <el-col :span="6">
							<el-form-item label="审核结果">
								<rt-picklist entity="new_srv_expense_claim" attribute="new_center_result" v-model="queryForm.new_center_result" disabled></rt-picklist>
  						</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="审核人">
								<el-input v-model="queryForm.new_approved_useridname" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="审核日期">
								<el-input v-model="queryForm.new_approved_timeUTC" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="审核原因">
                <el-input v-model="queryForm.new_firstrule_id" disabled></el-input>
							</el-form-item>
						</el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="24">
							<el-form-item label="审核备注">
								<el-input type="textarea" v-model="queryForm.new_center_approvedmemo" disabled></el-input>
							</el-form-item>
						</el-col>
          </el-row>
        </rt-section>  
        <rt-section title="产品信息">
            <el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="奥克斯公司别">
								<el-input v-model="queryForm.new_auxcompany" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="购买单位类型">
									<el-input v-model="queryForm.new_channeltype" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="购买日期">
								<el-input v-model="queryForm.new_purchasedateUTC" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="工程单号">
									<el-input v-model="queryForm.new_engineeringcode" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="省份">
								<el-input v-model="queryForm.new_province_idname" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="城市">
								<el-input v-model="queryForm.new_city_idname" disabled></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="6">
							<el-form-item label="区县">
								<el-input v-model="queryForm.new_county_idname" disabled></el-input>
							</el-form-item>
						</el-col>
             <el-col :span="6">
							<el-form-item label="街道">
								<el-input v-model="queryForm.new_town_idname" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row :gutter="50">
            <el-col :span="24">
							<el-form-item label="详细地址">
								<el-input v-model="queryForm.new_address" disabled></el-input>
							</el-form-item>
						</el-col>
          </el-row>
        </rt-section>     
			</el-form>
		</rt-content>
	</div>
</template>
<script>
import expenseClaimDetail from "./expenseClaimDetail";
import expenseServiceDetail from "./expenseServiceDetail";
export default {
  data() {
    return {
      queryForm: {
        new_name: "", //结算单号 string
        new_servicetype: "", //服务单类型 picklist
        new_srv_station_id: "", //结算服务商名称 lookup
        new_srv_station_code: "", //结算服务商编码 string

        new_workorder_id: "",
        new_workorder_idname: "", //关联服务单 查找
        new_srv_supervision_id: "",
        new_srv_supervision_idname: "", //关联监理单 查找
        new_worksite_id: "", //录单服务商名称 查找
        new_worksite_code: "", //录单服务商编码 string

        new_setmark: "", //套机标识
        new_type: "", //结算单类型
        new_settleway: "", //结算方式
        new_formstatus: "", //结算单状态

        new_ecommercecode: "", //电商订单号
        new_isgather: "", //是否汇总 两个选项
        new_expense_summary_id: "", //结算汇总单
        new_ispayed: "", //是否已收款 两个选项

        new_kms: "", //公里数 decimal
        new_returnvisit: "", //回访结果 picklist
        new_user_satisfaction: "", //用户满意度 picklist
        new_bu_id: "", //服务中心 lookup

        createdon: "", //创建时间
        createdonUTC: "",

        new_first_basicexp: "", //初审基本费用
        new_first_remoteexp: "", //初审远程费用
        new_first_fu_allowance: "", //初审加氟补贴
        new_first_allowance: "", //初审补贴金额

        new_first_agreementamt: "", //初审协议激励金额
        new_first_totalamount: "", //初审总费用
        new_second_firamount: "", //二级服务商初审金额
        new_first_result: "", //初审结果 picklist

        new_first_allowancedesc: "", //初审金额补贴说明 string

        new_center_basicexp: "", //中心审核基本费
        new_center_remoteexp: "", //中心审核远程费
        new_center_fu_allowance: "", //中心审核加氟补贴
        new_center_allowance: "", //中心审核补贴金额

        new_center_agreementamt: "", //中心审核协议激励金额
        new_center_deductamount: "", //中心审核扣款金额
        new_center_totalamount: "", //中心审核总金额
        new_second_approveamount: "", //二级服务商审核金额

        new_center_result: "", //中心审核结果 picklist
        new_approved_userid: "", //审核人 lookup
        new_approved_time: "", //审核日期 datetiem
        new_firstrule_id: "", //审核原因 picklist

        new_center_approvedmemo: "", //中心审核备注

        new_auxcompany: "", //奥克斯公司别
        new_channeltype: "", //购买单位类型 picklist
        new_purchasedate: "", //购买日期
        new_engineeringcode: "", //工程单号

        new_province_id: "", //省份
        new_city_id: "", //城市
        new_county_id: "", //区县
        new_town_id: "", //街道

        new_address: "" //详细地址
      },
      rules: {
        createdon: [
          { required: true, message: "请输入制单日期", trigger: "change" }
        ],
        new_year: [
          {
            type: "number",
            required: true,
            message: "请输入结算年份",
            trigger: "change"
          }
        ],
        new_month: [
          {
            type: "number",
            required: true,
            message: "请输入结算月份",
            trigger: "change"
          }
        ],
        new_section: [
          {
            type: "number",
            required: true,
            message: "请输入结算区间",
            trigger: "change"
          }
        ],
        new_srv_station_idname: [
          { required: true, message: "请输入服务站", trigger: "change" }
        ],
        owneridname: [
          { required: true, message: "请输入负责人", trigger: "change" }
        ],
        new_invoiceno: [
          { required: true, message: "请输入发票号", trigger: "blur" }
        ],
        new_expressname: [
          { required: true, message: "请输入快递名称", trigger: "blur" }
        ],
        new_sendnumber: [
          { required: true, message: "请输入寄件单号", trigger: "blur" }
        ]
      },
      id: ""
    };
  },
  components: {
    expenseClaimDetail,
    expenseServiceDetail
  },
  mounted: function() {},
  created: function() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.initData();
    } /*else{
				this.queryForm.new_section=1;
			}*/
  },
  methods: {
    //初始化数据
    initData: function() {
      var apiUrl = "../api/ExpenseClaim/GetExpenseClaimById/" + this.id;
      rt.get(apiUrl)
        .then(res => {
          this.queryForm = res;
          debugger;
          if (res.new_returnvisit == 0) {
            this.queryForm.new_returnvisit = null;
          }
          if (res.new_center_result == 0) {
            this.queryForm.new_center_result = null;
          }
          if (res.new_first_result == 0) {
            this.queryForm.new_first_result = null;
          }
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },

    //保存
    save: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = this.queryForm;
          params.id = this.id;
          var apiUrl = "../api/ExpenseClaim/UpdateExpenseClaim";
          var that = this;
          rt.post(apiUrl, params)
            .then(res => {
              that.$message({
                message: that.$t("Successfullysaved"),
                type: "success"
              });
              that.initData();
            })
            .catch(error => {
              rt.showErrorToast(error);
            });
        } else {
          this.$message({
            message: that.$t("PleaseInputRequiredFields"),
            type: "warning",
            showClose: true
          });
        }
      });
    },

    //确认并寄发票
    confirm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //var apiUrl='../api/ExpenseClaim/UpdateClaimStatus?id='+this.id;
          var apiUrl = "../api/ExpenseClaim/UpdateClaimStatus";
          var params = this.queryForm;
          params.id = this.id;
          var that = this;
          that
            .$confirm(
              that.$t("WhetherDeterminAndSendInvoice"),
              that.$t("Tip"),
              {
                confirmButtonText: that.$t("BUTTON_DETERMINE"),
                confirmButtonClass: "ConfirmButtonClass",
                cancelButtonText: that.$t("BUTTON_CANCEL"),
                cancelButtonClass: "CancelButtonClass",
                type: "warning"
              }
            )
            .then(() => {
              rt.post(apiUrl, params)
                .then(res => {
                  that.initData();
                  that.$message({
                    message: that.$t("Successfullysent"),
                    type: "success"
                  });
                })
                .catch(error => {
                  rt.showErrorToast(error);
                });
            })
            .catch(() => {
              that.$message({
                type: "info",
                message: that.$t("HasCancelled")
              });
            });
        } else {
          this.$message({
            message: that.$t("PleaseInputRequiredFields"),
            type: "warning",
            showClose: true
          });
        }
      });
    }
  }
};
</script>
<style>
.expense-checkbox {
  margin-top: 8px;
}
</style>
