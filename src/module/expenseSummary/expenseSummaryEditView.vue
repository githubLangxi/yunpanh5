<template>
	<div class="expenseClaimEdit">
		<rt-header title="结算汇总单">
			<rt-toolbar show-autoback>
				<rt-button type="submit"
				           text="发票提交"
				           @click="Registration"
				           v-show="queryForm.new_formstatus == 3" />
				<rt-button type="revert"
				           text="放弃结算"
				           @click="GiveUp"
				           v-show="queryForm.new_formstatus == 3" />
				<rt-button type="save"
				           @click="onSave('queryForm')"
				           v-show="!disabledform" />
				<!--<rt-button :text="$t('BUTTON_ConAndSend')" type="confirm" @click="confirm('queryForm')" v-show="queryForm.new_formstatus==1"/>
	            <rt-button type="print" :text="$t('BUTTON_PRINT')"/> -->
			</rt-toolbar>
		</rt-header>
		<rt-content>
			<el-form ref="queryForm"
			         :model="queryForm"
			         label-width="120px"
			         label-position="left">
				<rt-section title="汇总单信息">
					<el-row :gutter="50"
					        class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="结算单号">
								<el-input v-model="queryForm.new_name"
								          disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结算批次">
								<el-input v-model="queryForm.new_batchno"
								          disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="费用分类">
								<rt-picklist entity="new_srv_expense_summary"
								             attribute="new_expensetype"
								             v-model="queryForm.new_expensetype"
								             disabled></rt-picklist>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="服务商">
								<el-input v-model="queryForm.new_srv_station_idname"
								          disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50"
					        class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="汇总中心">
								<el-input v-model="queryForm.new_businessunit_idname"
								          disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="汇总人员">
								<el-input v-model="queryForm.new_systemuser_idname"
								          disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="汇总日期">
								<el-input v-model="queryForm.new_summarydateUTC"
								          disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="是否通知开票">
								<el-checkbox class="expense-checkbox"
								             v-model="queryForm.new_isinvoice"
								             disabled></el-checkbox>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50"
					        class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="汇总金额">
								<el-input v-model="queryForm.new_totalamount"
								          disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="汇总方式">
								<rt-picklist entity="new_srv_expense_summary"
								             attribute="new_summarymode"
								             v-model="queryForm.new_summarymode"
								             disabled></rt-picklist>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="单据状态">
								<rt-picklist entity="new_srv_expense_summary"
								             attribute="new_formstatus"
								             v-model="queryForm.new_formstatus"
								             disabled></rt-picklist>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="是否提交付款申请">
								<el-checkbox class="expense-checkbox"
								             v-model="queryForm.new_ispayapply"
								             disabled></el-checkbox>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50"
					        class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="负责人">
								<el-input v-model="queryForm.owneridname"
								          disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</rt-section>
				<rt-section title="通知开票信息">
					<el-row :gutter="50"
					        class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="本次开票金额">
								<el-input v-model="queryForm.new_invoice_thisamount"
								          disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="冻结金额">
								<el-input v-model="queryForm.new_frozen_amount"
								          disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="冻结备注">
								<el-input type="textarea"
								          v-model="queryForm.new_frozen_memo"
								          disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</rt-section>
				<rt-section title="开票信息">
					<el-row :gutter="50"
					        class="rt-portal-form-row">
						<el-col :span="6">
							<el-form-item label="发票总金额（含税）">
								<el-input v-model="queryForm.new_invoice_totalamount"
								          disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="快递公司">
								<el-input v-model="queryForm.new_expresscompany"
								          :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="快递单号">
								<el-input v-model="queryForm.new_expresscode"
								          :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6"
						        v-show="queryForm.new_formstatus ==2 ||queryForm.new_formstatus ==3||queryForm.new_formstatus ==4">
							<el-form-item label="付款方式">
								<rt-picklist entity="new_srv_expense_summary"
								             attribute="new_paymentmode"
								             v-model="queryForm.new_paymentmode"
								             disabled></rt-picklist>
							</el-form-item>
						</el-col>
					</el-row>
					<Invoicerecord :id="id"
					               :disabled="queryForm.new_formstatus != 3"
					               @resetLoadData="initData"></Invoicerecord>
					<Claimline :id="id"
					           :disabled=true
					           @resetLoadData="initData"></Claimline>
				</rt-section>
			</el-form>
		</rt-content>
	</div>
</template>
<script>
import Invoicerecord from './Invoicerecord';
import Claimline from './Claimline';
export default {
  data() {
    return {
      queryForm: {
        //汇总单信息

        //汇总结算单号
        new_name: '',
        //结算批次
        new_batchno: '',
        //费用分类
        new_expensetype: '',
        //服务商
        new_srv_station_id: '',

        //汇总中心
        new_businessunit_id: '',
        //汇总人员
        new_systemuser_id: '',
        //汇总日期
        new_summarydate: '',
        //是否通知开票
        new_isinvoice: false,

        //汇总金额
        new_totalamount: '',
        //汇总方式
        new_summarymode: '',
        //单据状态
        new_formstatus: '',
        //是否提交付款申请
        new_ispayapply: false,

        //负责人
        ownerid: '',

        //通知开票信息

        //本次开票金额
        new_invoice_thisamount: '',
        new_frozen_amount: '',
        new_foozen_memo: '',

        //开票信息

        //发票总金额（含税）
        new_invoice_totalamount: '',
        //快递公司
        new_expresscompany: '',
        //快递单号
        new_expresscode: '',
        //付款方式
        new_paymentmode: ''
      },
      id: '',
      disabledform: true
    };
  },
  components: {
    Invoicerecord,
    Claimline
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
      var apiUrl = '../api/ExpenseSummary/GetExpenseSummaryById/' + this.id;
      rt
        .get(apiUrl)
        .then(res => {
          this.queryForm = res;
          if (res.new_returnvisit == 0) {
            this.queryForm.new_returnvisit = null;
          }
          if (res.new_center_result == 0) {
            this.queryForm.new_center_result = null;
          }
          if (res.new_first_result == 0) {
            this.queryForm.new_first_result = null;
          }
          debugger;
          if (res.new_formstatus == 3) {
            this.disabledform = false;
          } else {
            this.disabledform = true;
          }
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    GiveUp: function() {
      var apiUrl = '../api/ExpenseSummary/GiveUp/' + this.id;
      rt
        .confirm(
          '请注意！此结算汇总单确定后将变更为【已核销】状态，视为放弃结算此费用！请谨慎选择！'
        )
        .then(() => {
          rt
            .get(apiUrl)
            .then(res => {
              rt.showSuccessToast(res);
              this.initData();
            })
            .catch(error => {
              rt.showErrorToast(error);
            });
        })
        .catch(() => {
          return;
        });
    },
    Registration: function() {
      var apiUrl = '../api/ExpenseSummary/Submit/' + this.id;

      if (
        Number(this.queryForm.new_invoice_thisamount) <=
        Number(this.queryForm.new_invoice_totalamount)
      ) {
        rt
          .confirm(
            '发票总金额' +
              Number(this.queryForm.new_invoice_totalamount) +
              '元，本次开票金额' +
              Number(this.queryForm.new_invoice_thisamount) +
              '元，请确认是否提交'
          )
          .then(() => {
            rt
              .get(apiUrl)
              .then(res => {
                rt.showSuccessToast(res);
                this.initData();
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          })
          .catch(() => {
            return;
          });
      } else {
        rt
          .confirm(
            '发票总金额' +
              Number(this.queryForm.new_invoice_totalamount) +
              '元，本次开票金额' +
              Number(this.queryForm.new_invoice_thisamount) +
              '元，将按照发票总金额进行支付，请确认是否提交'
          )
          .then(() => {
            rt
              .get(apiUrl)
              .then(res => {
                debugger;
                rt.showSuccessToast(res);
                this.initData();
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          })
          .catch(() => {
            return;
          });
      }
    },
    onSave: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var apiUrl = '../api/ExpenseSummary/Save';
          var params = {
            id: this.id,
            new_expresscompany: this.queryForm.new_expresscompany,
            new_expresscode: this.queryForm.new_expresscode
          };
          rt
            .post(apiUrl, params)
            .then(res => {
              rt.showSuccessToast(res);
              this.initData();
            })
            .catch(error => {
              rt.showErrorToast(error);
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
