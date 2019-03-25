<template>
	<div>
		<rt-header title="编辑服务站">
			<rt-toolbar show-autoback>
				<rt-button type="save" @click="onSave('editForm')" />
			</rt-toolbar>
		</rt-header>
	
		<rt-content>
			<rt-nav slot="side">
				<rt-nav-item href="#area1">配件发运</rt-nav-item>
				<rt-nav-item href="#area2">发运明细</rt-nav-item>
			</rt-nav>
			<el-form ref="editForm" :model="editForm" :rules="rules" label-width="120px" label-position="left">
				<!--配件发运Form-->
				<rt-section id="area1" title="配件发运">
					<el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="8">
							<el-form-item label="发运单号">
								<!--new_name-->
								<el-input v-model="editForm.new_name" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<!--new_partsource-->
							<el-form-item label="订单类型" prop="new_type">
								<picklist-component v-on:selected-option="GetTypeSelected" entitylogicname="new_srv_station" attributename="new_type" :is-disabled="disabledform" :origin-selected="editForm.new_type"></picklist-component>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="发运人">
								<!--new_shiperby-->
								<el-input v-model="editForm.new_phonenumber" readonly :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="8">
							<!--new_srv_stationid-->
							<el-form-item label="出库单位" prop="new_workorder_id">
								<el-input v-model="editForm.new_workorder_idname" readonly :disabled="disabledform" icon="search" :on-icon-click="workorderlookup"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<!--new_srv_instationid-->
							<el-form-item label="入库单位" prop="new_workorder_id">
								<el-input v-model="editForm.new_workorder_idname" readonly :disabled="disabledform" icon="search" :on-icon-click="workorderlookup"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="发运日期">
								<!--new_transportdate-->
								<el-input v-model="editForm.new_phonenumber" readonly :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="8">
							<!--new_shipstatus-->
							<el-form-item label="紧急程度" prop="new_type">
								<picklist-component v-on:selected-option="GetTypeSelected" entitylogicname="new_srv_station" attributename="new_type" :is-disabled="disabledform" :origin-selected="editForm.new_type"></picklist-component>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<!--new_transporttype-->
							<el-form-item label="发运方式" prop="new_type">
								<picklist-component v-on:selected-option="GetTypeSelected" entitylogicname="new_srv_station" attributename="new_type" :is-disabled="disabledform" :origin-selected="editForm.new_type"></picklist-component>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<!--new_receiver-->
							<el-form-item label="收货人" prop="new_type">
								<el-input v-model="editForm.new_phonenumber" :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="8">
							<!--new_receiver_tel-->
							<el-form-item label="收货人手机" prop="new_type">
								<el-input v-model="editForm.new_phonenumber" :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
						</el-col>
						<el-col :span="8">
						</el-col>
					</el-row>
					<el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="24">
							<!--new_transportaddr-->
							<el-form-item label="发运地址" prop="new_type">
								<el-input v-model="editForm.new_phonenumber" :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="8">
							<!--new_transportby-->
							<el-form-item label="运输公司" prop="new_type">
								<el-input v-model="editForm.new_phonenumber" :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<!--new_logistics-->
							<el-form-item label="物流单号">
								<el-input v-model="editForm.new_phonenumber" :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<!--new_telphone-->
							<el-form-item label="物流电话">
								<el-input v-model="editForm.new_phonenumber" :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="8">
							<!--new_stdtransportfee-->
							<el-form-item label="实收运费">
								<el-input v-model="editForm.new_phonenumber" :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<!--new_receiver-->
							<el-form-item label="签收人">
								<el-input v-model="editForm.new_phonenumber" :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<!--new_receivedon-->
							<el-form-item label="签收日期">
								<el-input v-model="editForm.new_phonenumber" :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="8">
							<!--new_transportstatus-->
							<el-form-item label="发运状态">
								<picklist-component v-on:selected-option="GetTypeSelected" readonly entitylogicname="new_srv_station" attributename="new_type" :is-disabled="disabledform" :origin-selected="editForm.new_type"></picklist-component>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<!--new_totalamount-->
							<el-form-item label="总金额">
								<el-input v-model="editForm.new_phonenumber" :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
						</el-col>
					</el-row>
					<el-row :gutter="50" class="rt-portal-form-row">
						<el-col :span="24">
							<!--new_memo-->
							<el-form-item label="备注">
								<el-input v-model="editForm.new_phonenumber" :disabled="disabledform"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</rt-section>
	
				<!--发运明细-->
				<rt-section id="area2" title="发运明细" ref="grid">
					<template slot="toolbar">
						<rt-button type="add" @click="createDetail" />
						<rt-button type="delete" />
						<rt-button type="search" />
					</template>
					<el-table ref="gridTable" v-bind:data="tableData" max-height="500" row-key="new_srv_partsapplyid" stripe @sort-change="handleSortChange" v-loading="loading">
						<el-table-column type="selection" width="50">
						</el-table-column>
						<!--<el-table-column prop="new_workorder_id" label="服务人员编码" width="180">
							<template slot-scope="scope">
								<el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
							</template>
						</el-table-column>-->
						<el-table-column prop="new_recipient" label="配件订单">
							<!--new_name-->
						</el-table-column>
						<el-table-column prop="new_station_id" label="配件名称" width="120">
							<!--new_srv_station_id-->
						</el-table-column>
						<el-table-column prop="new_type" label="配件编码">
							<!--new_sex-->
						</el-table-column>
						<el-table-column prop="new_type" label="配件价格">
							<!--new_job-->
						</el-table-column>
						<el-table-column prop="new_type" label="金额">
							<!--new_skill-->
						</el-table-column>
						<el-table-column prop="new_type" label="总申请数量">
							<!--new_educationlevel-->
						</el-table-column>
						<el-table-column prop="new_type" label="待发运数量">
							<!--new_workyear-->
						</el-table-column>
						<el-table-column prop="new_type" label="已发运数量">
							<!--new_trainnumber-->
						</el-table-column>
						<el-table-column prop="new_type" label="已签收数量">
							<!--new_trainnumber-->
						</el-table-column>
						<el-table-column prop="new_type" label="本次签收数量">
							<!--new_trainnumber-->
						</el-table-column>
						<el-table-column prop="new_type" label="备注">
							<!--new_trainnumber-->
						</el-table-column>
					</el-table>
				</rt-section>
			</el-form>
		</rt-content>
	
		<!-- 提示框 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
			<span>
	
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">{{$t('BUTTON_CANCEL')}}</el-button>
				<el-button type="primary" @click="dialogVisible = false">{{$t('BUTTON_DETERMINE')}}</el-button>
			</span>
		</el-dialog>
	
		<el-dialog title="查询" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="查找内容" :label-width="formLabelWidth">
					<el-input v-model="lookupCondition" auto-complete="off" icon="search" :on-icon-click="lookupsearch"></el-input>
				</el-form-item>
				<el-table :data="dialogtableData" style="width: 100%" max-height="500" highlight-current-row @current-change="selectRowChange" @row-dblclick="lookupSelect">
					<el-table-column v-for="item in lookupOptions" :key="item.label" :prop="item.name" :label="item.label">
					</el-table-column>
				</el-table>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-bind:current-page="currentPage" v-bind:page-sizes="[3, 5, 10, 20]" v-bind:page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" v-bind:total="dataTotalCount">
					</el-pagination>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="lookupSelect">{{$t('BUTTON_DETERMINE')}}</el-button>
				<el-button @click="dialogFormVisible = false">{{$t('BUTTON_CANCEL')}}</el-button>
				<el-button @click="lookupSelectClear">{{$t('BUTTON_REMOVE')}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">

import picklistComponent from '@/components/common/picklist'

export default {
	data() {
		return {
			url: '..',
			disabledform: false,/*设置可见性*/
			activeName: 'first',
			activeNames: ['1'],/*折叠面板控制*/
			dialogVisible: false,

			partsapplyid: '',
			typeOptions: [],
			loading: false,
			isSaveAndClose: false,

			/*表单数据*/
			editForm: {
				new_name: '',/*配件申请单号*/
				new_workorder_id: '',/*服务单Id*/
				new_workorder_idname: '',/*服务单名称*/
				new_type: '',/*申请类型*/

				new_requiredate: '',/*需求日期*/
				new_recipient: '',/*收货人*/
				new_phonenumber: '',/*收货人电话*/
				new_address: '',/*收货地址*/
				new_approvalstatus: '',/*审核状态*/
				new_station_id: '',/*服务站id*/
				new_station_idname: ''/*服务站*/
			},
			rules: {
				new_type: [
					{ type: 'number', required: true, message: '请选择活动区域', trigger: 'change' }
				],
				new_workorder_id: [
					{ required: true, message: '请选择活动区域', trigger: 'change' }
				],
				new_requiredate: [
					{ type: 'date', required: true, message: '请选择发货日期', trigger: 'change' }
				]
			},
			dialogtableData: [
			],
			currentPage: 1,
			pageSize: 10,
			dataTotalCount: 0,
			lookupCondition: '',
			quickSearch: 'new_name',
			entityName: 'new_srv_workorder',
			attributeList: 'createdon,new_name',
			filterList: '',////'name=苏州瑞泰信息技术有限公司';
			lookupOptions: [{ label: '创建时间', name: 'createdon' }, { label: '单号', name: 'new_name' }],
			dialogTableVisible: false,
			dialogFormVisible: false,
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			attrList: [],
			formLabelWidth: '80px',
			/*明细数据*/
			tableData: [],
			/*LookUp回写问题，无法识别editdata.new_workorder_id,这里作为中间量，后期修改*/
			new_workorder_id: '',
			new_workorder_idname: '',
			lookupid: '',
			lookupidname: ''
		}
	},
	components: { picklistComponent },
	mounted: function () {
		if (this.$route.params.id) {
			this.partsapplyid = this.$route.params.id;
		}
		this.initData();
	},
	watch: {
		new_workorder_id: function (val) {
			this.editForm.new_workorder_id = val;
		},
		new_workorder_idname: function (val) {
			this.editForm.new_workorder_idname = val;
		}
	},

	methods: {

		//初始化数据
		initData: function () {
			if (this.partsapplyid === '') {
				this.editForm.new_approvalstatus = 1;
			}
			else {
				this.loadData();
			}
		},
		//数据加载
		loadData: function () {
			var self = this;
			//加载主档数据
			this.loadFormData().then(function (res) {
				self.editForm = res;
				/*此处有对时间类型格式校验，必需转换为GMT时间类型，否则会报错*/
				self.editForm.new_requiredate = new Date(res.new_requiredate);

				if (self.editForm.new_approvalstatus != 1 && self.editForm.new_approvalstatus != 4) {
					self.disabledform = true;
				};
			})
				.catch((error) => {
					rt.showErrorToast(error);
				});

			//加载明细数据,新建状态无需加载
			if (this.partsapplyid === '') return;
			this.loading = true;
			this.loadLineData().then(function (res) {
				self.tableData = res.new_srv_partsapplyList;
				self.loading = false;
			})
				.catch((error) => {
					rt.showErrorToast(error);
					self.loading = false;
				});

		},
		//加载主档数据
		loadFormData: function () {
			return rt.get(this.url + '/api/PartsApply/' + this.partsapplyid);
		},
		//加载明细列表
		loadLineData: function () {
			var requestStr = '../api/Part/GetPartsApply?pageIndex=1&pageSize=2&filter=&orderby=new_name,descending'
			return rt.get(requestStr);
		},
		//排序处理
		handleSortChange(sort) {
      //排序处理
      if (!sort.prop) {
        return;
      }

      this.orderby = sort.prop + ',' + sort.order;
      this.tableData = [];

      this._fetchRecords();
    },
		//选项集绑定
		loadPickListData: function () {
			var self = this;
			rt.get(this.url + '/api/crmpicklist/options/new_srv_partsapply/new_type')
				.then(function (res) {
					var picklist = res;
					for (var i = 1; i <= picklist.length; i++) {
						var picklistOption = {};
						picklistOption.value = picklist[i - 1].Value;
						picklistOption.label = picklist[i - 1].Text;
						self.typeOptions.push(picklistOption);
					}
				}).catch((error) => {
					rt.showErrorToast(error);
				});
		},
		//从列表导向新增页面
		createDetail: function () {
			//创建记录
			alert(this.partsapplyid)
			this.$router.push({ name: "partdetailcreate", params: { partid: this.partsapplyid } })
		},
		//从列表导向编辑页面
		gotoEditPage(row) {
			//编辑记录
			this.$router.push({ name: "basicdetailedit", params: { id: row.new_srv_partsapplyid } })
		},

		//保存事件
		onSave: function (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var self = this;
					var partsApply = self.editForm;
					var params = {
						new_name: partsApply.new_name,
						new_workorder_id: partsApply.new_workorder_id,
						new_workorder_idname: partsApply.new_workorder_idname,
						new_type: partsApply.new_type,
						new_requiredate: rt.formatDateTime(partsApply.new_requiredate, "yyyy-mm-dd hh:mm:ss"),
						new_recipient: partsApply.new_recipient,
						new_phonenumber: partsApply.new_phonenumber,
						new_address: partsApply.new_address,
						new_approvalstatus: partsApply.new_approvalstatus,
						new_station_id: partsApply.new_station_id,
						new_station_idname: partsApply.new_station_idname
					};
					/*创建*/
					if (self.partsapplyid === '') {
						self.createFormData(params)
							.then(function (res) {
								self.$message({
									message: self.$t('Successfullysaved'),
									type: 'success'
								});
								self.partsapplyid = res;
								if (self.isSaveAndClose) {
									self.$router.push({ name: "partlist" });
								}
								else {
									self.$router.push({ name: "partedit", params: { id: res } })
								}

							})
							.catch((error) => {
								rt.showErrorToast(error);
							});
					}
					/*更新*/
					else {
						params.id = self.partsapplyid;
						self.updateFormDate(params)
							.then(function (res) {
								self.$message({
									message: self.$t('Successfullysaved'),
									type: 'success'
								});
								if (self.isSaveAndClose) {
									self.$router.push({ name: "partlist" });
								}
								else {
									self.$router.push({ name: "partedit", params: { id: self.partsapplyid } })
								}
							})
							.catch((error) => {
								rt.showErrorToast(error);
							});
					}
				}
				else {
					this.$message({
						message: this.$t('PleaseInputRequiredFields'),
						type: 'error'
					});
				}
			})
		},
		//创建主档数据
		createFormData: function (params) {
			return rt.post(this.url + '/api/PartsApply', params);
		},
		//更新主档数据
		updateFormDate: function (params) {
			return rt.post(this.url + '/api/PartsApply/UpdatePartsApply', params);
		},
		//保存并关闭（待分配）
		onSaveAndClose: function (form) {
			this.isSaveAndClose = true;
			this.onSave(form);
		},
		//选项控件组件赋值
		GetTypeSelected: function (val) {
			this.editForm.new_type = val;/*todo：不同picklist取值字段不同*/
		},
		GetLevelSelected: function () {
			this.editForm.new_type = val;/*todo：不同picklist取值字段不同*/
		},
		GetApprovalStatusSelected: function (val) {
			this.editForm.new_approvalstatus = val;
		},
		//从列表头部新建按钮导向创建明细页面
		createDetail: function () {
			//创建记录
			this.$router.push({ name: "basicdetailcreate", params: { partid: this.partsapplyid } })
		},
		//从列表行编辑行导向编辑记录页面
		editDetail: function name() {
			this.$router.push({ name: "partdetailedit", params: { id: this.partsapplyid } })
		},
		//关闭提示
		handleClose: function (done) {
			this.$confirm('确认关闭？')
				.then(function () {
					done();
				})
				.catch(function () { });
		},
		//服务站档案打开lookup
		workorderlookup() {
			this.handleclick('new_workorder_id');
		},
		//lookup的页码变更
		handleCurrentChange(val) {
			//页码改变
			this.currentPage = val;
			this.handleclick();
		},
		//lookup的页面尺寸变更
		handleSizeChange(val) {
			//每页尺寸改变
			this.pageSize = val;
			this.handleclick();
		},
		//lookup选择
		lookupSelect() {
			this.dialogFormVisible = false;
			this.editForm[this.lookupid] = this.currentRow.new_id;
			this.editForm[this.lookupidname] = this.currentRow.new_name;
		},
		//lookup移除值
		lookupSelectClear() {
			this.dialogFormVisible = false;
			this.editForm[this.lookupid] = '';
			this.editForm[this.lookupidname] = '';
		},
		//lookup快速查询
		lookupsearch() {
			this.handleclick();
		},
		//lookup选中行
		selectRowChange(val) {
			this.currentRow = val;
		},
		//处理lookup逻辑
		handleclick: function (ev) {
			if (this.disabledform) {
				return;
			}
			this.lookupid = ev;
			this.lookupidname = ev + 'name';
			this.dialogFormVisible = true;
			this.dialogtableData = [];
			var params = {
				entityName: this.entityName,
				attributeList: this.attributeList,
				pageIndex: this.currentPage,
				pageSize: this.pageSize,
			}
			var lookupQueryStr = '/api/Lookup/GetLookupData';
			if (this.lookupCondition) {
				params.quickSearch = this.quickSearch + '-' + this.lookupCondition;
			}
			if (this.filterList) {
				params.filterList = encodeURIComponent(this.filterList);
			}
			this.attrList = params.attributeList.split(',');
			let that = this;
			rt.post(lookupQueryStr, params).then(function (res) {
				var data = res;
				that.dataTotalCount = data.TotalRecordCount;

				for (var i in data.Entities) {
					var result = data.Entities[i];
					var resultlength = result.Attributes.length;
					var obj = {};
					obj.checked = false; //声明标志位，表示该列是否被选中，默认为false
					obj.new_id = result.Attributes[resultlength - 1].Value;
					for (var m in that.attrList) {
						obj[that.attrList[m]] = result.Attributes[m].Value;
					}

					//获取部分格式化后的数据
					for (var j in result.FormattedValues) {
						var format = result.FormattedValues[j];
						obj[format.Key] = format.Value;
					}
					that.dialogtableData.push(obj); //将obj添加到数据集
				}
			})
				.catch((error) => {
					rt.showErrorToast(error);
				});
			return;
		}
	}
}

</script>

<style type="text/css" scoped>

</style>