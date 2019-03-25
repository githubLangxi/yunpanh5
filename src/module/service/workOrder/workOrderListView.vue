<template>
	<div style="width:100%" id="serveroders">
		<div class="sort-conditions conditionfixed" v-if="serviceData.length&&showNextTop" v-bind:style="{top:fixFlag&&showFlag?'120px':'0px'}">
			<span class="sort-condition" @click="spanClick('new_accepttime')" v-bind:class="{'active2':sortType=='new_accepttime'}">
						受理时间
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_accepttime','descending')" v-bind:class="{'activearrow':sortType=='new_accepttime'&&upOrDown=='descending'}"></span>
			<span class="sort-arrowdown" @click.stop="filterSort('new_accepttime','asc')" v-bind:class="{'activearrow':sortType=='new_accepttime'&&upOrDown=='asc'}"></span>
			</span>
			</span>
			<span class="sort-condition" @click="spanClick('new_confirmtime1')" v-bind:class="{'active2':sortType=='new_confirmtime1'}">
						网点完工日期
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_confirmtime1','descending')" v-bind:class="{'activearrow':sortType=='new_confirmtime1'&&upOrDown=='descending'}"></span>
			<span class="sort-arrowdown" @click.stop="filterSort('new_confirmtime1','asc')" v-bind:class="{'activearrow':sortType=='new_confirmtime1'&&upOrDown=='asc'}"></span>
			</span>
			</span>
			<!--<span class="sort-condition">
						服务互动时间
						<span class="sort-arrow">
							<span class="sort-arrowup" @click="filterSort('new_dealtime','descending')" v-bind:class="{'activearrow':sortType=='new_dealtime'&&upOrDown=='descending'}"></span>
					<span class="sort-arrowdown" @click="filterSort('new_dealtime','asc')" v-bind:class="{'activearrow':sortType=='new_dealtime'&&upOrDown=='asc'}"></span>
					</span>
					</span>-->
			<span class="sort-condition" @click="spanClick('new_requiretime')" v-bind:class="{'active2':sortType=='new_requiretime'}">
						上门预约时间
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_requiretime','descending')" v-bind:class="{'activearrow':sortType=='new_requiretime'&&upOrDown=='descending'}"></span>
			<span class="sort-arrowdown" @click.stop="filterSort('new_requiretime','asc')" v-bind:class="{'activearrow':sortType=='new_requiretime'&&upOrDown=='asc'}"></span>
			</span>
			</span>
			<span class="sort-condition" @click="spanClick('new_deliverydate')" v-bind:class="{'active2':sortType=='new_deliverydate'}">
						物流签收日期
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_deliverydate','descending')" v-bind:class="{'activearrow':sortType=='new_deliverydate'&&upOrDown=='descending'}"></span>
			<span class="sort-arrowdown" @click.stop="filterSort('new_deliverydate','asc')" v-bind:class="{'activearrow':sortType=='new_deliverydate'&&upOrDown=='asc'}"></span>
			</span>
			</span>
			<span class="sort-condition" @click="spanClick('new_rechargecycles')" v-bind:class="{'active2':sortType=='new_rechargecycles'}">
						重电
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_rechargecycles','descending')" v-bind:class="{'activearrow':sortType=='new_rechargecycles'&&upOrDown=='descending'}"></span>
			<span class="sort-arrowdown" @click.stop="filterSort('new_rechargecycles','asc')" v-bind:class="{'activearrow':sortType=='new_rechargecycles'&&upOrDown=='asc'}"></span>
			</span>
			</span>
			<!--<span class="sort-condition">
						催单
						<span class="sort-arrow">
							<span class="sort-arrowup" @click="filterSort('new_urgetimes','descending')" v-bind:class="{'activearrow':sortType=='new_urgetimes'&&upOrDown=='descending'}"></span>
					<span class="sort-arrowdown" @click="filterSort('new_urgetimes','asc')" v-bind:class="{'activearrow':sortType=='new_urgetimes'&&upOrDown=='asc'}"></span>
					</span>
					</span>-->
			<span class="sort-condition" @click="spanClick('new_retreatnumber')" v-bind:class="{'active2':sortType=='new_retreatnumber'}">
						退单
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_retreatnumber','descending')" v-bind:class="{'activearrow':sortType=='new_retreatnumber'&&upOrDown=='descending'}"></span>
			<span class="sort-arrowdown" @click.stop="filterSort('new_retreatnumber','asc')" v-bind:class="{'activearrow':sortType=='new_retreatnumber'&&upOrDown=='asc'}"></span>
			</span>
			</span>
			<span class="sort-condition" @click="spanClick('new_trace_warningtimes')" v-bind:class="{'active2':sortType=='new_trace_warningtimes'}">
						跟踪警告
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_trace_warningtimes','descending')" v-bind:class="{'activearrow':sortType=='new_trace_warningtimes'&&upOrDown=='descending'}"></span>
			<span class="sort-arrowdown" @click.stop="filterSort('new_trace_warningtimes','asc')" v-bind:class="{'activearrow':sortType=='new_trace_warningtimes'&&upOrDown=='asc'}"></span>
			</span>
			</span>
			<span class="sort-condition" @click="spanClick('new_supervise_warningtimes')" v-bind:class="{'active2':sortType=='new_supervise_warningtimes'}">
						督办预警
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_supervise_warningtimes','descending')" v-bind:class="{'activearrow':sortType=='new_supervise_warningtimes'&&upOrDown=='descending'}"></span>
			<span class="sort-arrowdown" @click.stop="filterSort('new_supervise_warningtimes','asc')" v-bind:class="{'activearrow':sortType=='new_supervise_warningtimes'&&upOrDown=='asc'}"></span>
			</span>
			</span>
			<span class="sort-condition" @click="spanClick('new_supervise')" v-bind:class="{'active2':sortType=='new_supervise'}">
						督办次数
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_supervise','descending')" v-bind:class="{'activearrow':sortType=='new_supervise'&&upOrDown=='descending'}"></span>
			<span class="sort-arrowdown" @click.stop="filterSort('new_supervise','asc')" v-bind:class="{'activearrow':sortType=='new_supervise'&&upOrDown=='asc'}"></span>
			</span>
			</span>
		</div>
		<div class="title-box">
			<div class="flex order-title">
				<div class="title-left">服务单</div>
				<div class="title-right flex">
					<span class="condition_box haswidth product-box">
						<el-form label-position="left" ref="queryForm" label-width="60px" :model="queryForm">
							<el-form-item label="产品线" style="margin-top: 5px;">
								<rt-lookup placeholder="产品线" v-model="queryForm.new_productgroup_id" entity="new_productgroup" />
							</el-form-item>
						</el-form>
					</span>
					<div class="btn-box flex">
						<input class="seach-text" v-model.trim="quicksearch" type="text" placeholder="快速搜索单号" />
						<button class="search" @click="seachList"></button>
					</div>

					<div class="quickinto" @click="showTags">快速入口<span class="hasmargin" v-bind:class="{'el-icon-arrow-down':!showFlag,'el-icon-arrow-up':showFlag}"></span></div>
					<button class="refresh" @click="refresh"></button>
				</div>
			</div>
			<div class="serveroder-table fixed" v-bind:class="{'show-fixed':fixFlag&&showFlag}">

				<el-button type="primary" icon="el-icon-delete" class="clear-tags el-icon-delete" @click="clearWorkOrderType">清空</el-button>
				<div class="types">
					<span class="type">处理阶段</span>
					<span class="type">超期服务单</span>
					<span class="type">信息提醒</span>
				</div>
				<div class="tags">
					<ul class="tags-ul">
						<!--<li class="tags-li"><span class="tag-span checked">待接单<span class="tag-num">(165)</span></span>
						</li>-->
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(1,editForm.ReceiptCount)" v-bind:class="{'checked':workOrderType==1}">待接单<span class="tag-num" v-if="editForm.ReceiptCount">({{editForm.ReceiptCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(2,editForm.DispatchCount)" v-bind:class="{'checked':workOrderType==2}">待派工<span class="tag-num" v-if="editForm.DispatchCount">({{editForm.DispatchCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(3,editForm.AppointmentCount)" v-bind:class="{'checked':workOrderType==3}">待预约<span class="tag-num" v-if="editForm.AppointmentCount">({{editForm.AppointmentCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(4,editForm.TransferCount)" v-bind:class="{'checked':workOrderType==4}">待转派<span class="tag-num" v-if="editForm.TransferCount">({{editForm.TransferCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(5,editForm.RefundCount)" v-bind:class="{'checked':workOrderType==5}">退单<span class="tag-num" v-if="editForm.RefundCount">({{editForm.RefundCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(6,editForm.CompletedCount)" v-bind:class="{'checked':workOrderType==6}">待完工<span class="tag-num" v-if="editForm.CompletedCount">({{editForm.CompletedCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(7,editForm.DealCount)" v-bind:class="{'checked':workOrderType==7}">待处理<span class="tag-num" v-if="editForm.DealCount">({{editForm.DealCount}})</span></span>
						</li>
					</ul>
					<ul class="tags-ul">
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(11,editForm.Overdue1DayCount)" v-bind:class="{'checked':workOrderType==11}">超1天<span class="tag-num" v-if="editForm.Overdue1DayCount">({{editForm.Overdue1DayCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(12,editForm.Overdue2DayCount)" v-bind:class="{'checked':workOrderType==12}">超2天<span class="tag-num" v-if="editForm.Overdue2DayCount">({{editForm.Overdue2DayCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(13,editForm.Overdue3DayCount)" v-bind:class="{'checked':workOrderType==13}">超3天<span class="tag-num" v-if="editForm.Overdue3DayCount">({{editForm.Overdue3DayCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(14,editForm.Overdue5DayCount)" v-bind:class="{'checked':workOrderType==14}">超5天<span class="tag-num" v-if="editForm.Overdue5DayCount">({{editForm.Overdue5DayCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(15,editForm.Overdue7DayCount)" v-bind:class="{'checked':workOrderType==15}">超7天<span class="tag-num" v-if="editForm.Overdue7DayCount">({{editForm.Overdue7DayCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(16,editForm.Overdue15DayCount)" v-bind:class="{'checked':workOrderType==16}">超15天<span class="tag-num" v-if="editForm.Overdue15DayCount">({{editForm.Overdue15DayCount}})</span></span>
						</li>
					</ul>
					<ul class="tags-ul">
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(21,editForm.RechargecyclesCount)" v-bind:class="{'checked':workOrderType==21}">重电<span class="tag-num" v-if="editForm.RechargecyclesCount">({{editForm.RechargecyclesCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(27,editForm.UrgeCount)" v-bind:class="{'checked':workOrderType==27}">催单<span class="tag-num" v-if="editForm.UrgeCount">({{editForm.UrgeCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(22,editForm.TracWarningCount)" v-bind:class="{'checked':workOrderType==22}">跟踪警告<span class="tag-num" v-if="editForm.TracWarningCount">({{editForm.TracWarningCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(23,editForm.SuperviseWarningCount)" v-bind:class="{'checked':workOrderType==23}">督办预警<span class="tag-num" v-if="editForm.SuperviseWarningCount">({{editForm.SuperviseWarningCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(24,editForm.SuperviseCount)" v-bind:class="{'checked':workOrderType==24}">督办<span class="tag-num" v-if="editForm.SuperviseCount">({{editForm.SuperviseCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(25,editForm.SpeicaltypeCount)" v-bind:class="{'checked':workOrderType==25}">特殊工单<span class="tag-num" v-if="editForm.SpeicaltypeCount">({{editForm.SpeicaltypeCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(26,editForm.UnrealstatusCount)" v-bind:class="{'checked':workOrderType==26}">回访虚假<span class="tag-num" v-if="editForm.UnrealstatusCount">({{editForm.UnrealstatusCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(28,editForm.TechApprovalCount)" v-bind:class="{'checked':workOrderType==28}">待技术支持提交<span class="tag-num" v-if="editForm.TechApprovalCount">({{editForm.TechApprovalCount}})</span></span>
						</li>
					</ul>
				</div>
			</div>
			<div class="serveroder-table" v-bind:class="{'show-tags':showFlag}">
				<el-button type="primary" icon="el-icon-delete" class="clear-tags el-icon-delete" @click="clearWorkOrderType">清空</el-button>
				<div class="types">
					<span class="type">处理阶段</span>
					<span class="type">超期服务单</span>
					<span class="type">信息提醒</span>
				</div>
				<div class="tags">
					<ul class="tags-ul">
						<!--<li class="tags-li"><span class="tag-span checked">待接单<span class="tag-num">(165)</span></span>
						</li>-->
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(1,editForm.ReceiptCount)" v-bind:class="{'checked':workOrderType==1}">待接单<span class="tag-num" v-if="editForm.ReceiptCount">({{editForm.ReceiptCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(2,editForm.DispatchCount)" v-bind:class="{'checked':workOrderType==2}">待派工<span class="tag-num" v-if="editForm.DispatchCount">({{editForm.DispatchCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(3,editForm.AppointmentCount)" v-bind:class="{'checked':workOrderType==3}">待预约<span class="tag-num" v-if="editForm.AppointmentCount">({{editForm.AppointmentCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(4,editForm.TransferCount)" v-bind:class="{'checked':workOrderType==4}">待转派<span class="tag-num" v-if="editForm.TransferCount">({{editForm.TransferCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(5,editForm.RefundCount)" v-bind:class="{'checked':workOrderType==5}">退单<span class="tag-num" v-if="editForm.RefundCount">({{editForm.RefundCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(6,editForm.CompletedCount)" v-bind:class="{'checked':workOrderType==6}">待完工<span class="tag-num" v-if="editForm.CompletedCount">({{editForm.CompletedCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(7,editForm.DealCount)" v-bind:class="{'checked':workOrderType==7}">待处理<span class="tag-num" v-if="editForm.DealCount">({{editForm.DealCount}})</span></span>
						</li>
					</ul>
					<ul class="tags-ul">
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(11,editForm.Overdue1DayCount)" v-bind:class="{'checked':workOrderType==11}">超1天<span class="tag-num" v-if="editForm.Overdue1DayCount">({{editForm.Overdue1DayCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(12,editForm.Overdue2DayCount)" v-bind:class="{'checked':workOrderType==12}">超2天<span class="tag-num" v-if="editForm.Overdue2DayCount">({{editForm.Overdue2DayCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(13,editForm.Overdue3DayCount)" v-bind:class="{'checked':workOrderType==13}">超3天<span class="tag-num" v-if="editForm.Overdue3DayCount">({{editForm.Overdue3DayCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(14,editForm.Overdue5DayCount)" v-bind:class="{'checked':workOrderType==14}">超5天<span class="tag-num" v-if="editForm.Overdue5DayCount">({{editForm.Overdue5DayCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(15,editForm.Overdue7DayCount)" v-bind:class="{'checked':workOrderType==15}">超7天<span class="tag-num" v-if="editForm.Overdue7DayCount">({{editForm.Overdue7DayCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(16,editForm.Overdue15DayCount)" v-bind:class="{'checked':workOrderType==16}">超15天<span class="tag-num" v-if="editForm.Overdue15DayCount">({{editForm.Overdue15DayCount}})</span></span>
						</li>
					</ul>
					<ul class="tags-ul">
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(21,editForm.RechargecyclesCount)" v-bind:class="{'checked':workOrderType==21}">重电<span class="tag-num" v-if="editForm.RechargecyclesCount">({{editForm.RechargecyclesCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(27,editForm.UrgeCount)" v-bind:class="{'checked':workOrderType==27}">催单<span class="tag-num" v-if="editForm.UrgeCount">({{editForm.UrgeCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(22,editForm.TracWarningCount)" v-bind:class="{'checked':workOrderType==22}">跟踪警告<span class="tag-num" v-if="editForm.TracWarningCount">({{editForm.TracWarningCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(23,editForm.SuperviseWarningCount)" v-bind:class="{'checked':workOrderType==23}">督办预警<span class="tag-num" v-if="editForm.SuperviseWarningCount">({{editForm.SuperviseWarningCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(24,editForm.SuperviseCount)" v-bind:class="{'checked':workOrderType==24}">督办<span class="tag-num" v-if="editForm.SuperviseCount">({{editForm.SuperviseCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(25,editForm.SpeicaltypeCount)" v-bind:class="{'checked':workOrderType==25}">特殊工单<span class="tag-num" v-if="editForm.SpeicaltypeCount">({{editForm.SpeicaltypeCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(26,editForm.UnrealstatusCount)" v-bind:class="{'checked':workOrderType==26}">回访虚假<span class="tag-num" v-if="editForm.UnrealstatusCount">({{editForm.UnrealstatusCount}})</span></span>
						</li>
						<li class="tags-li"><span class="tag-span" @click="openWorkOrderList(28,editForm.TechApprovalCount)" v-bind:class="{'checked':workOrderType==28}">待技术支持提交<span class="tag-num" v-if="editForm.TechApprovalCount">({{editForm.TechApprovalCount}})</span></span>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="search-conditions">
			<div class="conditon-top">
				<span class="conditon-btn import" @click="showExcelImportDialog">导入</span>
				<span class="conditon-btn export" @click="handleExport">导出</span>
				<span class="conditon-btn download" @click="downloadTemplate">下载导入模版</span>
				<span class="conditon-btn add" @click="gotoAddPage">新增</span>
				<span class="conditon-btn condition-reset" @click="resetQuerry">重置</span>
				<span class="conditon-btn conditon-search" @click="seachList">搜索</span>
				<span class="conditon-btn conditon-search" @click="delTags" v-if="selectTags.length">删除已选标签</span>
				<div class="quickinto routine" @click="showRoutine">常规入口<span class="hasmargin" v-bind:class="{'el-icon-arrow-down':!routineFlag,'el-icon-arrow-up':routineFlag}"></span></div>
				<button class="condition-add" @click="showConditions">+</button>
			</div>
			<div class="condition-search" v-if="routineFlag">
				<span class="condition_box">
					<span class="condition-title">
						客户姓名
					</span>
				<input type="text" class="text" v-model="queryForm.new_contact" />
				</span>
				<span class="condition_box">
					<span class="condition-title">
						联系电话
					</span>
				<input type="text" class="text" v-model="queryForm.new_phone" />
				</span>
				<span class="condition_box">
					<span class="condition-title">
						服务单号
					</span>
				<input type="text" class="text" v-model.trim="queryForm.new_name" />
				</span>
				<!--<span class="condition_box haswidth">
				<el-form label-position="left" ref="queryForm" label-width="60px" :model="queryForm">
					<el-form-item label="产品线">
						<rt-lookup v-model="queryForm.new_productgroup_id" entity="new_productgroup" />
					</el-form-item>
				</el-form>

				</span>-->

				<span class="condition_box">
				<el-form label-position="left" ref="queryForm" label-width="80px" :model="queryForm">
					<el-form-item label="服务类型" prop="new_type">
						<rt-picklist v-model="queryForm.new_type" entity="new_srv_workorder" attribute="new_type"></rt-picklist>
					</el-form-item>
				</el-form>
				</span>
				<span class="condition_box">
					<el-form label-position="left" ref="queryForm" label-width="110px" :model="queryForm">
					<el-form-item label="购买单位类型" prop="new_channeltype">
								<rt-picklist v-model="queryForm.new_channeltype" entity="new_srv_workorder" attribute="new_channeltype"></rt-picklist>
							</el-form-item>
				</el-form>
				</span>
				<span class="condition_box">
					<span class="condition-title">
						电商订单号
					</span>
				<input type="text" class="text" v-model="queryForm.new_dsorderno" />
				</span>
				<!--<span class="condition_box moredata">
					<el-form label-position="left" ref="queryForm" label-width="120px" :model="queryForm">
							<el-form-item label="工程师预约时间" prop="new_appointmenttime">
								<el-date-picker type="date" v-model="queryForm.new_appointmenttime"  value-format="yyyy-MM-dd"></el-date-picker>
							</el-form-item>
				</el-form>
					
				</span>-->
				<span class="condition_box" v-if="showTag('engineer_mine')">
					<el-form label-position="left" ref="queryForm" label-width="140px" :model="queryForm">
						<el-form-item label="工程师预约日起" prop="new_appointmenttimeFrom">
								<el-date-picker type="date" v-model="queryForm.new_appointmenttimeFrom" @change="startDateCheck('new_appointmenttimeFrom','new_appointmenttimeTo')"></el-date-picker>
						</el-form-item>
					</el-form>
				</span>
				<span class="condition_box" v-if="showTag('engineer_mine')">
					<el-form label-position="left" ref="queryForm" label-width="140px" :model="queryForm">
						<el-form-item label="工程师预约日期止" prop="new_appointmenttimeTo">
								<el-date-picker type="date" v-model="queryForm.new_appointmenttimeTo" @change="startDateCheck('new_appointmenttimeFrom','new_appointmenttimeTo')"></el-date-picker>
							</el-form-item>
					</el-form>
				</span>
				<!--
                	作者：13397123423@163.com
                	时间：2018-11-16
                	描述：new_engineer_appointmenttime
                -->
				<span class="condition_box" v-if="showTag('engineer_mine')">
					<span class="condition-title">
					    工程师预约时间段
				</span>

				<el-select v-model="queryForm.new_engineer_appointmenttime" clearable placeholder="请选择">
					<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				</span>

				<span class="condition_box" v-if="showTag('new_serviceitem')">
				<el-form label-position="left" ref="queryForm" label-width="80px" :model="queryForm">
					<el-form-item label="服务项目" prop="new_serviceitem">
						<rt-picklist v-model="queryForm.new_serviceitem" entity="new_srv_workorder" attribute="new_serviceitem"></rt-picklist>
					</el-form-item>
				</el-form>

				</span>
				<span class="condition_box" v-if="showTag('new_logisticsstatus')">
				<el-form label-position="left" ref="queryForm" label-width="80px" :model="queryForm">
					<el-form-item label="物流状态">
						<rt-picklist v-model="queryForm.new_logisticsstatus" entity="new_srv_workorder" attribute="new_logisticsstatus"></rt-picklist>
					</el-form-item>
				</el-form>
				
				</span>
				<span class="condition_box" v-if="showTag('new_deliverydate')">
					<el-form label-position="left" ref="queryForm" label-width="200px" :model="queryForm">
						<el-form-item label="妥投/物流签收日期(大于等于)" prop="new_deliverydate">
								<el-date-picker type="date" v-model="queryForm.new_deliverydate" @change="startDateCheck"></el-date-picker>
							</el-form-item>
				</el-form>
				
				</span>
				<span class="condition_box" v-if="showTag('new_retreatnumber')">
					<span class="condition-title">
						退单次数
					</span>
				<input type="text" class="text" v-model.number="queryForm.new_retreatnumber" />
				</span>
				<span class="condition_box" v-if="showTag('new_trace_warningtimes')">
					<span class="condition-title">
						跟踪警告次数
					</span>
				<input type="text" class="text" v-model.number="queryForm.new_trace_warningtimes" />
				</span>
				<span class="condition_box" v-if="showTag('new_supervise_warningtimes')">
					<span class="condition-title">
						督办警告次数
					</span>
				<input type="text" class="text" v-model.number="queryForm.new_supervise_warningtimes" />
				</span>
				<span class="condition_box" v-if="showTag('new_supervise')">
					<span class="condition-title">
						督办次数
					</span>
				<input type="text" class="text" v-model.number="queryForm.new_supervise" />
				</span>
				<span class="condition_box" v-if="showTag('new_rechargecycles')">
					<span class="condition-title">
						重电次数
					</span>
				<input type="text" class="text" v-model.number="queryForm.new_rechargecycles" />
				</span>
				<span class="condition_box" v-if="showTag('new_speicaltype')">
				<el-form label-position="left" ref="queryForm" label-width="80px" :model="queryForm">
					<el-form-item label="特殊类型" prop="new_speicaltype">
						<rt-picklist v-model="queryForm.new_speicaltype" entity="new_srv_workorder" attribute="new_speicaltype"></rt-picklist>
					</el-form-item>
				</el-form>

				</span>
				<span class="condition_box" v-if="showTag('new_overduereasons')">
					<el-form label-position="left" ref="queryForm" label-width="80px" :model="queryForm">
					<el-form-item label="超期原因" prop="new_overduereasons">
								<rt-picklist v-model="queryForm.new_overduereasons" entity="new_srv_workorder" attribute="new_overduereasons"></rt-picklist>
							</el-form-item>	
					</el-form>
					
				</span>
				<span class="condition_box" v-if="showTag('new_csi')">
					<span class="condition-title">
						用户好评率
					</span>
				<input type="text" class="text" v-model="queryForm.new_csi" />
				</span>
				<span class="condition_box" v-if="showTag('new_iscomplain')">
					<el-form label-position="left" ref="queryForm" label-width="80px" :model="queryForm">
					<el-form-item label="是否差评" prop="new_iscomplain">
								<rt-picklist v-model="queryForm.new_iscomplain" entity="new_srv_workorder" attribute="new_iscomplain"></rt-picklist>
							</el-form-item>
					</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_servicelength2')">
					<span class="condition-title">
						总时长
					</span>
				<input type="text" class="text" v-model.number="queryForm.new_servicelength2" />
				</span>
				<span class="condition_box" v-if="showTag('new_servicelength1')">
					<span class="condition-title">
						网点时长
					</span>
				<input type="text" class="text" v-model.number="queryForm.new_servicelength1" />
				</span>
				<!--<span class="condition_box" v-if="showTag('new_worker_code')">
					<span class="condition-title">
						派往工程师编码
					</span>
				<input type="text" class="text" v-model="queryForm.new_worker_code" />
				</span>-->
				<!--<span class="condition_box" v-if="showTag('new_worker_name')">
					<span class="condition-title">
						派往工程师名称
					</span>
				<input type="text" class="text" v-model="queryForm.new_worker_name" />
				</span>-->
				<span class="condition_box" v-if="showTag('new_dealstage')">
					<el-form label-position="left" ref="queryForm" label-width="80px" :model="queryForm">
						<el-form-item label="处理阶段" prop="new_dealstage">
								<rt-picklist v-model="queryForm.new_dealstage" entity="new_srv_workorder" attribute="new_dealstage"></rt-picklist>
						</el-form-item>
					</el-form>
				</el-select>
				</span>
				<span class="condition_box" v-if="showTag('new_dealstatus')">
					<el-form label-position="left" ref="queryForm" label-width="80px" :model="queryForm">
						<el-form-item label="处理状态" prop="new_dealstatus">
								<rt-picklist v-model="queryForm.new_dealstatus" entity="new_srv_workorder" attribute="new_dealstatus"></rt-picklist>
						</el-form-item>
					</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_productmodel_id')">
				<el-form label-position="left" ref="queryForm" label-width="90px" :model="queryForm">
					<el-form-item label="产品类型">
								<rt-lookup v-model="queryForm.new_productmodel_id" entity="new_productmodel" />
							</el-form-item>
				</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_source')">
					<el-form label-position="left" ref="queryForm" label-width="80px" :model="queryForm">
						<el-form-item label="来源途径" prop="new_source">
								<rt-picklist v-model="queryForm.new_source" entity="new_srv_workorder" attribute="new_source"></rt-picklist>
							</el-form-item>
					</el-form>
				
				</span>
				<span class="condition_box" v-if="showTag('new_viplevel')">
					<el-form label-position="left" ref="queryForm" label-width="80px" :model="queryForm">
						<el-form-item label="VIP等级" prop="new_viplevel">
								<rt-picklist v-model="queryForm.new_viplevel" entity="new_srv_workorder" attribute="new_viplevel"></rt-picklist>
							</el-form-item>
					</el-form>
					
				</span>
				<span class="condition_box" v-if="showTag('dateFrom')">
					<el-form label-position="left" ref="queryForm" label-width="100px" :model="queryForm">
						<el-form-item label="受理日期起" prop="dateFrom">
								<el-date-picker type="date" v-model="queryForm.dateFrom" @change="startDateCheck('dateFrom','dateTo')" value-format="yyyy-MM-dd"></el-date-picker>
							</el-form-item>
					</el-form>
				</span>
				<span class="condition_box" v-if="showTag('dateTo')">
					<el-form label-position="left" ref="queryForm" label-width="100px" :model="queryForm">
						<el-form-item label="受理日期止" prop="dateTo">
								<el-date-picker type="date" v-model="queryForm.dateTo" @change="endDateCheck('dateFrom','dateTo')"></el-date-picker>
						</el-form-item>
					</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_deallevel')">
					<el-form label-position="left" ref="queryForm" label-width="80px" :model="queryForm">
						<el-form-item label="处理级别" prop="new_deallevel">
								<rt-picklist v-model="queryForm.new_deallevel" entity="new_srv_workorder" attribute="new_deallevel"></rt-picklist>
							</el-form-item>
					</el-form>
				
				</span>
				<span class="condition_box" v-if="showTag('new_content')">
					<el-form label-position="left" ref="queryForm" label-width="80px" :model="queryForm">
						<el-form-item label="跟单内容" prop="new_content">
								<rt-picklist v-model="queryForm.new_content" entity="new_srv_workorder" attribute="new_content"></rt-picklist>
							</el-form-item>
					</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_auditpoint')">
					<el-form label-position="left" ref="queryForm" label-width="110px" :model="queryForm">
						<el-form-item label="网点完工结果" prop="new_auditpoint">
								<rt-picklist v-model="queryForm.new_auditpoint" entity="new_srv_workorder" attribute="new_auditpoint"></rt-picklist>
							</el-form-item>
					</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_auditcentrality')">
					<el-form label-position="left" ref="queryForm" label-width="110px" :model="queryForm">
						<el-form-item label="中心完工结果" prop="new_auditcentrality">
								<rt-picklist v-model="queryForm.new_auditcentrality" entity="new_srv_workorder" attribute="new_auditcentrality"></rt-picklist>
							</el-form-item>
					</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_audithq')">
					<el-form label-position="left" ref="queryForm" label-width="110px" :model="queryForm">
						<el-form-item label="总部完工结果" prop="new_audithq">
								<rt-picklist v-model="queryForm.new_audithq" entity="new_srv_workorder" attribute="new_audithq"></rt-picklist>
							</el-form-item>
					</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_status')">
					<el-form label-position="left" ref="queryForm" label-width="80px" :model="queryForm">
						<el-form-item label="回访状态" prop="new_status">
								<rt-picklist v-model="queryForm.new_status" entity="new_srv_workorder" attribute="new_status"></rt-picklist>
						</el-form-item>
					</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_requiretime')">
					<!--<span class="condition-title">
						预约上门时间
					</span>
				<el-time-picker is-range v-model="queryForm.new_requiretime" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
				</el-time-picker>-->
				<el-form label-position="left" ref="queryForm" label-width="100px" :model="queryForm">
					<el-form-item label="预约上门时间" prop="new_requiretime">
						<el-date-picker type="date" v-model="queryForm.new_requiretime"></el-date-picker>
					</el-form-item>
				</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_timequantum')">
					<!--<span class="condition-title">
						预约上门时间段
					</span>
				<el-date-picker type="date" v-model="queryForm.new_timequantum"></el-date-picker>-->
				<span class="condition-title">
						预约上门时间段
				</span>

				<el-select v-model="queryForm.new_timequantum" clearable placeholder="请选择">
					<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				</span>
				<span class="condition_box" v-if="showTag('new_confirmtime1From')">
				<el-form label-position="left" ref="queryForm" label-width="120px" :model="queryForm">
						<el-form-item label="网点完工日期起" prop="new_deliverydate">
								<el-date-picker type="date" v-model="queryForm.new_confirmtime1From" @change="startDateCheck('new_confirmtime1From','new_confirmtime1To')"></el-date-picker>
							</el-form-item>
				</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_confirmtime1To')">
				<el-form label-position="left" ref="queryForm" label-width="120px" :model="queryForm">
						<el-form-item label="网点完工日期止" prop="new_deliverydate">
								<el-date-picker type="date" v-model="queryForm.new_confirmtime1To" @change="endDateCheck('new_confirmtime1From','new_confirmtime1To')"></el-date-picker>
							</el-form-item>
				</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_statement')">
					<span class="condition-title">
						派工说明
					</span>
				<input class="text" type="text" v-model="queryForm.new_statement" />
				</span>
				<span class="condition_box" v-if="showTag('new_reassignment')">
					<el-form label-position="left" ref="queryForm" label-width="80px" :model="queryForm">
						<el-form-item label="改派原因" prop="new_reassignment">
								<rt-picklist v-model="queryForm.new_reassignment" entity="new_srv_workorder" attribute="new_reassignment"></rt-picklist>
						</el-form-item>
					</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_ownstation_id')">
					
					<el-form label-position="left" ref="queryForm" label-width="90px" :model="queryForm">
							<el-form-item label="原安装网点" prop="new_ownstation_id">
							<rt-lookup v-model="queryForm.new_ownstation_id" entity="new_srv_station" />
						</el-form-item>
					</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_province_id')">
					<el-form label-position="left" ref="queryForm" label-width="50px" :model="queryForm">
					<el-form-item label="省份">
						<rt-lookup v-model="queryForm.new_province_id" entity="new_province" />
					</el-form-item>
				</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_city_id')">
					<el-form label-position="left" ref="queryForm" label-width="50px" :model="queryForm">
					<el-form-item label="城市" prop="new_city_id">
								<rt-lookup v-model="queryForm.new_city_id" entity="new_city" />
							</el-form-item>
				</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_county_id')">
					<el-form label-position="left" ref="queryForm" label-width="50px" :model="queryForm">
					<el-form-item label="区县" prop="new_county_id">
								<rt-lookup v-model="queryForm.new_county_id" entity="new_city" />
							</el-form-item>
				</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_town_id')">
					<el-form label-position="left" ref="queryForm" label-width="50px" :model="queryForm">
					<el-form-item label="街道" prop="new_town_id">
								<rt-lookup v-model="queryForm.new_town_id" entity="new_city" />
							</el-form-item>
				</el-form>
				</span>
				<span class="condition_box" v-if="showTag('new_engineeringcode')"><span class="condition-title">
					工程工单
				</span>
				<input type="text" class="text" v-model="queryForm.new_engineeringcode" />
				</span>
				<span class="condition_box" v-if="showTag('new_coolanttype')">
					<el-form label-position="left" ref="queryForm" label-width="60px" :model="queryForm">
					<el-form-item label="制冷剂" prop="new_coolanttype">
								<rt-picklist v-model="queryForm.new_coolanttype" entity="new_srv_workorder" attribute="new_coolanttype"></rt-picklist>
							</el-form-item>
				</el-form>
					
				</span>
				<span class="condition_box" v-if="showTag('new_systemuser_id')">
					<el-form label-position="left" ref="queryForm" label-width="60px" :model="queryForm">
					<el-form-item label="受理人" prop="new_systemuser_id">
								<rt-lookup v-model="queryForm.new_systemuser_id" entity="new_systemuser" />
							</el-form-item>
				</el-form>
				</span>
			</div>
			<div class="searchLists">
				<div class="sort-conditions" id="sort-condtions" v-if="serviceData.length">
					<span class="sort-condition" @click="spanClick('new_accepttime')" v-bind:class="{'active2':sortType=='new_accepttime'}">
						受理时间
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_accepttime','descending')" v-bind:class="{'activearrow':sortType=='new_accepttime'&&upOrDown=='descending'}"></span>
					<span class="sort-arrowdown" @click.stop="filterSort('new_accepttime','asc')" v-bind:class="{'activearrow':sortType=='new_accepttime'&&upOrDown=='asc'}"></span>
					</span>
					</span>
					<span class="sort-condition" @click="spanClick('new_confirmtime1')" v-bind:class="{'active2':sortType=='new_confirmtime1'}">
						网点完工日期
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_confirmtime1','descending')" v-bind:class="{'activearrow':sortType=='new_confirmtime1'&&upOrDown=='descending'}"></span>
					<span class="sort-arrowdown" @click.stop="filterSort('new_confirmtime1','asc')" v-bind:class="{'activearrow':sortType=='new_confirmtime1'&&upOrDown=='asc'}"></span>
					</span>
					</span>
					<!--<span class="sort-condition">
						服务互动时间
						<span class="sort-arrow">
							<span class="sort-arrowup" @click="filterSort('new_dealtime','descending')" v-bind:class="{'activearrow':sortType=='new_dealtime'&&upOrDown=='descending'}"></span>
					<span class="sort-arrowdown" @click="filterSort('new_dealtime','asc')" v-bind:class="{'activearrow':sortType=='new_dealtime'&&upOrDown=='asc'}"></span>
					</span>
					</span>-->
					<span class="sort-condition" @click="spanClick('new_requiretime')" v-bind:class="{'active2':sortType=='new_requiretime'}">
						上门预约时间
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_requiretime','descending')" v-bind:class="{'activearrow':sortType=='new_requiretime'&&upOrDown=='descending'}"></span>
					<span class="sort-arrowdown" @click.stop="filterSort('new_requiretime','asc')" v-bind:class="{'activearrow':sortType=='new_requiretime'&&upOrDown=='asc'}"></span>
					</span>
					</span>
					<span class="sort-condition" @click="spanClick('new_deliverydate')" v-bind:class="{'active2':sortType=='new_deliverydate'}">
						物流签收日期
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_deliverydate','descending')" v-bind:class="{'activearrow':sortType=='new_deliverydate'&&upOrDown=='descending'}"></span>
					<span class="sort-arrowdown" @click.stop="filterSort('new_deliverydate','asc')" v-bind:class="{'activearrow':sortType=='new_deliverydate'&&upOrDown=='asc'}"></span>
					</span>
					</span>
					<span class="sort-condition" @click="spanClick('new_rechargecycles')" v-bind:class="{'active2':sortType=='new_rechargecycles'}">
						重电
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_rechargecycles','descending')" v-bind:class="{'activearrow':sortType=='new_rechargecycles'&&upOrDown=='descending'}"></span>
					<span class="sort-arrowdown" @click.stop="filterSort('new_rechargecycles','asc')" v-bind:class="{'activearrow':sortType=='new_rechargecycles'&&upOrDown=='asc'}"></span>
					</span>
					</span>
					<!--<span class="sort-condition">
						催单
						<span class="sort-arrow">
							<span class="sort-arrowup" @click="filterSort('new_urgetimes','descending')" v-bind:class="{'activearrow':sortType=='new_urgetimes'&&upOrDown=='descending'}"></span>
					<span class="sort-arrowdown" @click="filterSort('new_urgetimes','asc')" v-bind:class="{'activearrow':sortType=='new_urgetimes'&&upOrDown=='asc'}"></span>
					</span>
					</span>-->
					<span class="sort-condition" @click="spanClick('new_retreatnumber')" v-bind:class="{'active2':sortType=='new_retreatnumber'}">
						退单
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_retreatnumber','descending')" v-bind:class="{'activearrow':sortType=='new_retreatnumber'&&upOrDown=='descending'}"></span>
					<span class="sort-arrowdown" @click.stop="filterSort('new_retreatnumber','asc')" v-bind:class="{'activearrow':sortType=='new_retreatnumber'&&upOrDown=='asc'}"></span>
					</span>
					</span>
					<span class="sort-condition" @click="spanClick('new_trace_warningtimes')" v-bind:class="{'active2':sortType=='new_trace_warningtimes'}">
						跟踪警告
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_trace_warningtimes','descending')" v-bind:class="{'activearrow':sortType=='new_trace_warningtimes'&&upOrDown=='descending'}"></span>
					<span class="sort-arrowdown" @click.stop="filterSort('new_trace_warningtimes','asc')" v-bind:class="{'activearrow':sortType=='new_trace_warningtimes'&&upOrDown=='asc'}"></span>
					</span>
					</span>
					<span class="sort-condition" @click="spanClick('new_supervise_warningtimes')" v-bind:class="{'active2':sortType=='new_supervise_warningtimes'}">
						督办预警
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_supervise_warningtimes','descending')" v-bind:class="{'activearrow':sortType=='new_supervise_warningtimes'&&upOrDown=='descending'}"></span>
					<span class="sort-arrowdown" @click.stop="filterSort('new_supervise_warningtimes','asc')" v-bind:class="{'activearrow':sortType=='new_supervise_warningtimes'&&upOrDown=='asc'}"></span>
					</span>
					</span>
					<span class="sort-condition" @click="spanClick('new_supervise')" v-bind:class="{'active2':sortType=='new_supervise'}">
						督办次数
						<span class="sort-arrow">
							<span class="sort-arrowup" @click.stop="filterSort('new_supervise','descending')" v-bind:class="{'activearrow':sortType=='new_supervise'&&upOrDown=='descending'}"></span>
					<span class="sort-arrowdown" @click.stop="filterSort('new_supervise','asc')" v-bind:class="{'activearrow':sortType=='new_supervise'&&upOrDown=='asc'}"></span>
					</span>
					</span>
				</div>
				<div class="searchList" v-for="(item,index) in serviceData" @dblclick="doubleClick(item)">
					<div class="searchList-title" v-bind:class="{'chaping':item.new_iscomplain}">
						<span class="searchList-icon"></span>
						<span class="searchList-type">{{item.new_typetext}}</span>
						<span class="searchList-num" @click="gotoEditPage(item)">{{item.new_name}}</span>
						<span class="searchList-producelline">产品线：{{item.new_productgroup_idName}}</span>
						<span class="searchList-online">{{item.new_sourcetext}}</span>
						<!--
                        	作者：13397123423@163.com
                        	时间：2018-11-07
                        	描述：购买单位类型开始
                        -->
						<span class="searchList-from" v-if="item.new_channeltypetext">{{item.new_channeltypetext}}</span>
						<!--
                        	作者：13397123423@163.com
                        	时间：2018-11-07
                        	描述：购买单位类型结束
                        -->
						<span class="searchList-special">特殊类型：{{item.new_speicaltypetext ? item.new_speicaltypetext :"- -"}}</span>
						<span class="searchList-rate">用户评价:{{item.new_dealstatustext.indexOf('已完工')>=0 ? item.new_csi == 1 ? " 满意":" 不满意" :" - -"}}</span>
						<span class="searchList-btn">{{item.new_dealstagetext}}</span>
					</div>
					<div class="searchlist-info">
						<dl class="searchlist-information">
							<dt>
								<span class="info-name" :title="item.new_contact">
									{{item.new_contact}} 
								</span>
								<span class="info-num">
									{{item.new_phone}}
								</span>
							</dt>
							<dd class="info-address" :title="item.new_complateaddress">{{item.new_complateaddress}}</dd>
							<dd class="info-ordertime">首次预约：{{item.new_begintime?item.new_begintime:"- -"}}</dd>
						</dl>
						<dl class="searchlist-information">
							<dt class="info-num">
								<span class="tiem-length">{{gethours(item.new_servicelength1,1)}}</span>天<span class="tiem-length">{{gethours(item.new_servicelength1,2)}}</span>时<span class="tiem-length">{{gethours(item.new_servicelength1,3)}}</span>分
							</dt>
							<dd class="info-address">用户要求时间：{{item.new_requiretime?item.new_requiretime:"- -"}}</dd>
							<dd class="info-ordertime">工程师预约：{{item.new_srv_worker_idname}}&nbsp;&nbsp;{{item.new_appointmenttime ? item.new_appointmenttime :"- -"}}</dd>
						</dl>
						<dl class="searchlist-information">
							<dt class="info-num">
								服务项目：收费安装 {{item.new_serviceitem}}
							</dt>
							<dd class="info-address">电商订单号： {{item.new_dsorderno?item.new_dsorderno:"- -"}} </dd>
							<dd class="info-ordertime">物流信息：{{item.new_logisticsstatus}}</dd>
						</dl>
						<dl class="searchlist-information">
							<dt class="info-num">
								<!--重电：{{item.new_rechargecycles}} -->
								跟踪警告：{{item.new_trace_warningtimes}}
							</dt>
							<dd class="info-address">
								<!--退单：{{item.new_retreatnumber}}-->
								督办预警：{{item.new_supervise_warningtimes}}
							</dd>
							<dd class="info-ordertime">
								督办次数：{{item.new_supervise}}
								<!--跟踪警告次数：{{item.new_trace_warningtimes}}-->
							</dd>
						</dl>
						<dl class="searchlist-information">
							<dt class="info-num">
								<!--督办次数：{{item.new_supervise}}-->
								重电：{{item.new_rechargecycles}}
							</dt>
							<dd class="info-address">
								<!--督办预警次数：{{item.new_supervise_warningtimes}}-->
								退单：{{item.new_retreatnumber}}
							</dd>
							<!--<dd class="info-ordertime">跟踪警告次数：{{item.new_trace_warningtimes}}</dd>-->
						</dl>
					</div>
				</div>

				<div class="liquid-separator" v-if="serviceData.length">
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10,20,30,40,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
						</el-pagination>
					</div>
				</div>
			</div>
		</div>
		<Condition v-bind:showCondition="conditionFlag" v-bind:selectTags="selectTags" v-on:closeCondition="closeCondition"></Condition>
		<!-- 数据导入 -->
		<rt-excel-import-dialog ref="excelImport" title="数据导入" :action="actionApi" :on-success="getDataLists">
		</rt-excel-import-dialog>
	</div>
</template>

<script>
	let Base64 = require('js-base64').Base64;
	import Condition from './dialog/conditions';
	import {conditions} from '../../../store/publicFucs'
	export default {
		components: {
			Condition
		},
		data: function() {
			return {
				quicksearch: '', //快速搜索
				//分页器相关开始
				currentPage: 1,
				pageSize: 20,
				total: 100,
				//分页器相关结束
				showFlag: true,
				routineFlag: false, //常规入口
				fixFlag: false,
				input5: '',
				options1: [{
						value: '8',
						label: '6:00-8:00'
					},
					{
						value: '10',
						label: '8:00-10:00'
					},
					{
						value: '12',
						label: '10:00-12:00'
					},
					{
						value: '14',
						label: '12:00-14:00'
					},
					{
						value: '16',
						label: '14:00-16:00'
					},
					{
						value: '18',
						label: '16:00-18:00'
					},
					{
						value: '20',
						label: '18:00-20:00'
					},
					{
						value: '22',
						label: '20:00-22:00'
					},
					{
						value: '23',
						label: '22:00-23:00'
					}
				],
				options2: [{
						value: '1',
						label: '上午'
					},
					{
						value: '2',
						label: '中午'
					},
					{
						value: '3',
						label: '上午'
					}
				],
				queryForm: {
					new_logisticsstatus: null, //物流状态
					new_deliverydate: '', //妥投/物流签收日期
					new_contact: '', //客户姓名
					new_phone: '', //联系电话
					new_name: '', //服务单号
					new_productgroup_id: {}, //产品线
					new_type: null, //服务类型
					new_province_id: {}, //省份
					new_city_id: {}, //城市
					new_county_id: {}, //区县
					new_town_id: {}, //街道
					//new_engineer_appointmenttime: '', //工程师预约时间
					new_appointmenttime: '', //工程师预约时间
					new_appointmenttimeFrom: '', //工程师预约时间起
					new_appointmenttimeTo: '', //工程师预约时间止
					new_dsorderno: '', //电商订单号
					new_serviceitem: null, //服务项目
					onlineRetailersOrderNum: '',
					new_channeltype: null, //购买单位类型
					new_supervise_warningtimes: null, //督办警告次数
					new_retreatnumber: null, //退单次数
					new_trace_warningtimes: null, //跟踪警告次数
					new_supervise: null, //督办次数
					new_rechargecycles: null, //重电次数
					new_speicaltype: null, //特殊类型
					new_overduereasons: null, //超期原因
					new_csi: null, //用户好评率
					new_iscomplain: null, //是否差评
					new_servicelength2: null, //服务时长
					new_servicelength1: null, //网点时长
					//new_worker_code: '', //派往工程师编码
					//new_worker_name: '', //派往工程师名称
					new_dealstage: null, // 处理阶段
					new_dealstatus: null, //处理状态
					new_productmodel_id: {}, //产品类型
					new_source: null, //来源途径
					new_viplevel: null, //vip等级
					dateFrom: '', //受理时间起
					dateTo: '', //受理时间止
					new_deallevel: null, //处理级别
					new_content: null, //跟单内容
					new_auditpoint: null, //网点完工结果
					new_auditcentrality: null, //中心完工结果
					new_audithq: null, //总部完工结果
					new_status: null, //回访状态
					new_requiretime: '', //预约上门时间
					new_timequantum: '', //预约上面时间段
					new_statement: '', //派工说明
					new_reassignment: null, //改派原因
					new_ownstation_id: {}, //原安装网点
					new_engineeringcode: '', //工程工单
					new_coolanttype: null, //z制冷剂
					new_systemuser_id: {}, //受理人
					new_confirmtime1From: '', //网点完工日期起
					new_confirmtime1To: '', //网点完工日期止
					new_confirmtime1: '' //网点完工时间段
				}, //已显示的条件
				conditionFlag: false,
				editForm: {},
				workOrderType: 0,
				orderby: 'createdon,descending', //排序条件
				serviceData: [], //table数据绑定
				//crm数据缓存，性能优化,//页面变更时启用
				pageCookie: '',
				loading: false,
				canAdd: false,
				selectTags: [], //选中的tags
				sortType: '',
				upOrDown: '',
				showNextTop: false
			};
		},
		beforeDestroy() {
			let body = document.getElementsByTagName('body')[0];
			body.onscroll = null;
		},
		computed: {
			iconClass() {
				return this.showHidden ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
			},
			filter: function() {
				var filter = '';
				if(this.quicksearch != null && this.quicksearch != '') {
					filter += 'quicksearch=' + this.quicksearch + ',';
				}
				if(this.queryForm.new_contact)
					filter += 'new_contact=' + this.queryForm.new_contact + ',';
				if(this.queryForm.new_name) filter += 'new_name=' + this.queryForm.new_name + ',';
				if(this.queryForm.new_type) filter += 'new_type=' + this.queryForm.new_type + ',';
				if(this.queryForm.new_dealstage)
					filter += 'new_dealstage=' + this.queryForm.new_dealstage + ',';
				if(this.queryForm.new_dealstatus)
					filter += 'new_dealstatus=' + this.queryForm.new_dealstatus + ',';
				if(this.queryForm.new_source)
					filter += 'new_source=' + this.queryForm.new_source + ',';
				if(this.queryForm.new_phone) filter += 'new_phone=' + this.queryForm.new_phone + ',';
				if(this.queryForm.new_dsorderno)
					filter += 'new_dsorderno=' + this.queryForm.new_dsorderno + ',';
				if(this.queryForm.new_serviceitem)
					filter += 'new_serviceitem=' + this.queryForm.new_serviceitem + ',';
				if(this.queryForm.new_rechargecycles)
					filter = 'new_rechargecycles=' + this.queryForm.new_rechargecycles + ',';
				if(this.queryForm.new_retreatnumber)
					filter += 'new_retreatnumber=' + this.queryForm.new_retreatnumber + ',';
				if(this.queryForm.new_supervise)
					filter += 'new_supervise=' + this.queryForm.new_supervise + ',';
				if(this.queryForm.new_iscomplain) {
					filter += 'new_iscomplain=' + this.queryForm.new_iscomplain + ',';
				}

				if(this.queryForm.new_iscomplain == 0) {
					filter += 'new_iscomplain=' + this.queryForm.new_iscomplain + ',';
				}

				if(this.queryForm.new_speicaltype)
					filter += 'new_speicaltype=' + this.queryForm.new_speicaltype + ',';
				if(this.queryForm.new_viplevel)
					filter += 'new_viplevel=' + this.queryForm.new_viplevel + ',';
				if(this.queryForm.new_servicelength1)
					filter += 'new_servicelength1=' + this.queryForm.new_servicelength1 + ',';
				if(this.queryForm.new_overduereasons)
					filter += 'new_overduereasons=' + this.queryForm.new_overduereasons + ',';
				if(this.queryForm.dateFrom)
					filter += 'dateFrom=' + this.queryForm.dateFrom.toLocaleDateString() + ',';
				if(this.queryForm.dateTo)
					filter += 'dateTo=' + this.queryForm.dateTo.toLocaleDateString() + ',';
				if(this.queryForm.new_deallevel)
					filter += 'new_deallevel=' + this.queryForm.new_deallevel + ',';
				if(this.queryForm.new_content)
					filter += 'new_content=' + this.queryForm.new_content + ',';
				if(this.queryForm.new_deliverydate)
					filter +=
					'new_deliverydate=' +
					this.queryForm.new_deliverydate.toLocaleDateString() +
					',';
				if(this.queryForm.new_auditpoint)
					filter += 'new_auditpoint=' + this.queryForm.new_auditpoint + ',';
				if(this.queryForm.new_auditcentrality)
					filter += 'new_auditcentrality=' + this.queryForm.new_auditcentrality + ',';
				if(this.queryForm.new_audithq)
					filter += 'new_audithq=' + this.queryForm.new_audithq + ',';
				/*if(this.queryForm.new_worker_code)
					filter += "new_worker_code=" + this.queryForm.new_worker_code + ",";*/
				/*if(this.queryForm.new_worker_name)
					filter += "new_worker_name=" + this.queryForm.new_worker_name + ",";*/
				//new_engineer_appointmenttime
				if(this.queryForm.new_engineer_appointmenttime)
					filter +=
					'new_engineer_appointmenttime=' +
					this.queryForm.new_engineer_appointmenttime +
					',';

				//new_engineer_appointmenttimeFrom
				/*if(this.queryForm.new_engineer_appointmenttimeFrom)
					filter +=
					"new_engineer_appointmenttimeFrom=" +
					this.queryForm.new_engineer_appointmenttimeFrom.toLocaleDateString() +
					",";
				//new_engineer_appointmenttimeTo
				if(this.queryForm.new_engineer_appointmenttimeTo)
					filter +=
					"new_engineer_appointmenttimeTo=" +
					this.queryForm.new_engineer_appointmenttimeTo.toLocaleDateString() +
					",";*/
				//new_trace_warningtimes
				if(this.queryForm.new_trace_warningtimes)
					filter += 'new_trace_warningtimes=' + this.queryForm.new_trace_warningtimes + ',';
				//new_supervise_warningtimes
				if(this.queryForm.new_supervise_warningtimes)
					filter +=
					'new_supervise_warningtimes=' + this.queryForm.new_supervise_warningtimes + ',';
				//new_csi
				if(this.queryForm.new_csi) filter += 'new_csi=' + this.queryForm.new_csi + ',';
				//new_servicelength2
				if(this.queryForm.new_servicelength2)
					filter += 'new_servicelength2=' + this.queryForm.new_servicelength2 + ',';
				//new_productmodel_id
				if(this.queryForm.new_productmodel_id && this.queryForm.new_productmodel_id.id)
					filter += 'new_productmodel_id=' + this.queryForm.new_productmodel_id.id + ',';
				///new_requiretime
				if(this.queryForm.new_requiretime)
					filter +=
					'new_requiretime=' + this.queryForm.new_requiretime.toLocaleDateString() + ',';
				//new_timequantum
				if(this.queryForm.new_timequantum)
					filter += 'new_timequantum=' + this.queryForm.new_timequantum + ',';
				//new_ownstation_id
				if(this.queryForm.new_ownstation_id && this.queryForm.new_ownstation_id.id)
					filter += 'new_ownstation_id=' + this.queryForm.new_ownstation_id.id + ',';
				//new_coolanttype
				if(this.queryForm.new_coolanttype)
					filter += 'new_coolanttype=' + this.queryForm.new_coolanttype + ',';
				//new_systemuser_id
				if(this.queryForm.new_systemuser_id && this.queryForm.new_systemuser_id.id)
					filter += 'new_systemuser_id=' + this.queryForm.new_systemuser_id.id + ',';
				if(this.queryForm.new_appointmenttime) {
					filter +=
						'new_appointmenttime=' +
						this.queryForm.new_appointmenttime.toLocaleDateString() +
						',';
				}

				if(this.queryForm.new_appointmenttimeFrom)
					filter +=
					'new_appointmenttimeFrom=' +
					this.queryForm.new_appointmenttimeFrom.toLocaleDateString() +
					',';
				if(this.queryForm.new_appointmenttimeTo)
					filter +=
					'new_appointmenttimeTo=' +
					this.queryForm.new_appointmenttimeTo.toLocaleDateString() +
					',';
				if(this.queryForm.new_confirmtime1From)
					filter +=
					'new_confirmtime1From=' +
					this.queryForm.new_confirmtime1From.toLocaleDateString() +
					',';
				if(this.queryForm.new_confirmtime1To)
					filter +=
					'new_confirmtime1To=' +
					this.queryForm.new_confirmtime1To.toLocaleDateString() +
					',';
				if(this.queryForm.new_statement)
					filter += 'new_statement=' + this.queryForm.new_statement + ',';
				if(this.queryForm.new_reassignment)
					filter += 'new_reassignment=' + this.queryForm.new_reassignment + ',';
				if(this.queryForm.new_channeltype)
					filter += 'new_channeltype=' + this.queryForm.new_channeltype + ',';
				if(this.queryForm.new_engineeringcode)
					filter += 'new_engineeringcode=' + this.queryForm.new_engineeringcode + ',';
				if(this.queryForm.new_status)
					filter += 'new_status=' + this.queryForm.new_status + ',';
				if(this.queryForm.new_logisticsstatus)
					filter += 'new_logisticsstatus=' + this.queryForm.new_logisticsstatus + ',';
				if(this.queryForm.new_businessunit_id && this.queryForm.new_businessunit_id.id)
					filter += 'new_businessunit_id=' + this.queryForm.new_businessunit_id.id + ',';
				if(this.queryForm.new_province_id && this.queryForm.new_province_id.id)
					filter += 'new_province_id=' + this.queryForm.new_province_id.id + ',';
				if(this.queryForm.new_city_id && this.queryForm.new_city_id.id)
					filter += 'new_city_id=' + this.queryForm.new_city_id.id + ',';
				if(this.queryForm.new_county_id && this.queryForm.new_county_id.id)
					filter += 'new_county_id=' + this.queryForm.new_county_id.id + ',';
				if(this.queryForm.new_town_id && this.queryForm.new_town_id.id)
					filter += 'new_town_id=' + this.queryForm.new_town_id.id + ',';
				if(this.queryForm.new_productgroup_id && this.queryForm.new_productgroup_id.id)
					filter += 'new_productgroup_id=' + this.queryForm.new_productgroup_id.id + ',';
				if(filter.length > 0) {
					return filter.substring(filter, filter.length - 1);
				}
				return '';
			},
			actionApi: function() {
				return '../api/WorkOrder/ExcelImport';
			}
		},
		mounted: function() {
			this._fetchWorkOrderHome();
			this.getCanAdd();
			if(this.canAdd) {} else {
				//this._fetchRecords();
				//this.getDataLists();
			}
			let body = document.getElementsByTagName('body')[0];
			body.onscroll = this.scrollBody;
		},
		created() {
			this.getOrigenData();
		},
		methods: {
			getOrigenData() {
				/* window.addEventListener('keydown', this.keydown); */
				let obj = sessionStorage.getItem('conditionData');
				if(obj) {
					obj = JSON.parse(obj);
					this.quicksearch = obj.quicksearch;
					this.currentPage = obj.currentPage;
					this.pageSize = obj.pageSize;
					this.total = obj.total;
					this.showFlag = obj.showFlag;
					this.routineFlag = obj.routineFlag;
					this.fixFlag = obj.fixFlag;
					this.input5 = obj.input5;
					this.options1 = obj.options1;
					this.options2 = obj.options2;
					this.queryForm = obj.queryForm;
					this.workOrderType = obj.workOrderType;
					this.orderby = obj.orderby;
					this.serviceData = obj.serviceData;
					this.pageCookie = obj.pageCookie;
					this.loading = obj.loading;
					this.canAdd = obj.canAdd;
					this.selectTags = obj.selectTags;
					this.sortType = obj.sortType;
					this.upOrDown = obj.upOrDown;
					this.showNextTop = obj.showNextTop;
					this.getDataLists();
					this.getSelectTags();
				} else {
					if(Object.keys(this.$route.params).length){
						let params = Base64.decode(this.$route.params.type);
						let arry = JSON.parse(params);
						//console.log(arry);
						if(arry.type) {
							params = arry;
							this.queryForm.new_contact = params.name;
							this.routineFlag = true;
							//this.seachList();
							if(params.type == 8) {
								this.queryForm.new_rechargecycles = params.count;
							}
							this.seachList();
							this.getSelectTags(params);
						} else {
							//alert(1);
							
							this.queryForm[arry.name] = arry.count;
							this.routineFlag = true;
							this.getSelectTags(arry.name);
							this.seachList();
						}
					}else{
						this.getSelectTags();
					}
					
				}
			},
			keydown(e) {
				if(e.keyCode == 116) {
					sessionStorage.removeItem('conditionData');
				}
			},
			showRoutine() {
				this.routineFlag = !this.routineFlag;
			},
			clearWorkOrderType() {
				this.workOrderType = 0;
				this.getDataLists();
			},
			endDateCheck(from, to) {
				if(this.queryForm[from] && this.queryForm[to]) {
					if(this.queryForm[from] > this.queryForm[to]) {
						rt.showErrorToast('结束时间必须大于等于开始时间');
						this.queryForm[to] = null;
					}
				}
			},
			scrollBody(e) {
				let top =
					document.documentElement.scrollTop ||
					window.pageYOffset ||
					document.body.scrollTop,
					h1 = document.getElementById('serviceNotice').offsetHeight,
					h2 = document.getElementById('serveroders').getElementsByClassName('order-title')[0]
					.offsetHeight,
					h3 = document.getElementById('appHeader').offsetHeight,
					h4 = h3 + h1 + h2 + 20,
					nexttop = document.getElementById('sort-condtions').offsetTop;
				if(top >= h4) {
					this.fixFlag = true;
				} else {
					this.fixFlag = false;
				}
				if(this.fixFlag ? nexttop - top < 120 : nexttop - top < 0) {
					this.showNextTop = true;
				} else {
					this.showNextTop = false;
				}
			},
			spanClick(type) {
				if(type != this.sortType) {
					this.filterSort(type, 'descending');
				} else {
					if(this.upOrDown == 'asc') {
						this.filterSort(type, 'descending');
					} else {
						this.filterSort(type, 'asc');
					}
				}
			},
			delTags() {
				//删除已选标签
				/*let */
				//存储搜索tags
				if(this.selectTags.length) {
					let params = ['[]'],
						arry = this.selectTags;
					rt.post('../api/Work/PostSearch', params)
						.then(res => {
							this.$message({
								message: '清除标签成功',
								type: 'success'
							});
							this.selectTags = [];
							this.setDelField(arry);
						})
						.catch(err => {
							this.$message({
								message: '清除标签失败',
								type: 'warning'
							});
						});
				}
			},
			setDelField(arry) {
				arry.map((item, index, arr) => {
					let str = item.key;
					if(item.key == 'engineer_mine') {
						this.queryForm.new_engineer_appointmenttime = ''; //工程师预约时间
						this.queryForm.new_appointmenttimeFrom = ''; //工程师预约时间起
						this.queryForm.new_appointmenttimeTo = ''; //工程师预约时间止
					} else {
						if(item.value == '') {
							this.queryForm[str] = '';
						}
						if(item.value == null) {
							this.queryForm[str] = null;
						}

						if(item.value == 'obj') {
							this.queryForm[str] = {};
						}
					}
				});
			},
			resetQuerry() {
				this.queryForm = {
					new_logisticsstatus: null, //物流状态
					new_deliverydate: '', //妥投/物流签收日期
					new_contact: '', //客户姓名
					new_phone: '', //联系电话
					new_name: '', //服务单号
					new_productgroup_id: {}, //产品线
					new_type: null, //服务类型
					new_province_id: {}, //省份
					new_city_id: {}, //城市
					new_county_id: {}, //区县
					new_town_id: {}, //街道
					//new_engineer_appointmenttime: '', //工程师预约时间
					new_appointmenttime: '', //工程师预约时间
					new_appointmenttimeFrom: '', //工程师预约时间起
					new_appointmenttimeTo: '', //工程师预约时间止
					new_dsorderno: '', //电商订单号
					new_serviceitem: null, //服务项目
					onlineRetailersOrderNum: '',
					new_channeltype: null, //购买单位类型
					new_supervise_warningtimes: null, //督办警告次数
					new_retreatnumber: null, //退单次数
					new_trace_warningtimes: null, //跟踪警告次数
					new_supervise: null, //督办次数
					new_rechargecycles: null, //重电次数
					new_speicaltype: null, //特殊类型
					new_overduereasons: null, //超期原因
					new_csi: null, //用户好评率
					new_iscomplain: null, //是否差评
					new_servicelength2: null, //服务时长
					new_servicelength1: null, //网点时长
					//new_worker_code: '', //派往工程师编码
					//new_worker_name: '', //派往工程师名称
					new_dealstage: null, // 处理阶段
					new_dealstatus: null, //处理状态
					new_productmodel_id: {}, //产品类型
					new_source: null, //来源途径
					new_viplevel: null, //vip等级
					dateFrom: '', //受理时间起
					dateTo: '', //受理时间止
					new_deallevel: null, //处理级别
					new_content: null, //跟单内容
					new_auditpoint: null, //网点完工结果
					new_auditcentrality: null, //中心完工结果
					new_audithq: null, //总部完工结果
					new_status: null, //回访状态
					new_requiretime: '', //预约上门时间
					new_timequantum: '', //预约上面时间段
					new_statement: '', //派工说明
					new_reassignment: null, //改派原因
					new_ownstation_id: {}, //原安装网点
					new_engineeringcode: '', //工程工单
					new_coolanttype: null, //z制冷剂
					new_systemuser_id: {}, //受理人
					new_confirmtime1From: '', //网点完工日期起
					new_confirmtime1To: '', //网点完工日期止
					new_confirmtime1: '' //网点完工时间段
				};
			},
			doubleClick: function(row) {
				/* this.$router.push({
					name: 'orderedit',
					params: {
						id: row.id
					}
				}); */
				this.gotoEditPage(row);
			},
			gotoAddPage() {
				this.$router.push({
					name: 'ordercreate'
				});
			},
			filterSort(status, type) {
				this.sortType = status;
				this.upOrDown = type;
				this.getDataLists();
			},
			getDataLists() {
				var params = {
					pageIndex: this.currentPage,
					pageSize: this.pageSize,
					filter: this.filter,
					orderby: this.sortType ? this.sortType + ',' + this.upOrDown : '',
					workOrderType: this.workOrderType
				};
				rt.get('../api/Work/GetWorkOrderby', params)
					.then(res => {
						this.serviceData = res.workOrderList;
						this.pageCookie = res.pagingCookie;
						this.total = res.totalRecordCount;
					})
					.catch(err => {
						alert(err);
					});
			},
			showTag(type) {
				if(this.selectTags.length) {
					let flag = false,
						arr = this.selectTags;
					for(let i = 0; i < arr.length; i++) {
						if(type == 'new_confirmtime1From' || type == 'new_confirmtime1To') {
							if(arr[i].key == 'new_confirmtime1') {
								flag = arr[i].selected;
								break;
							} else {
								continue;
							}
						} else {
							if(arr[i].key == type) {
								flag = arr[i].selected;
								break;
							} else {
								continue;
							}
						}
					}
					return flag;
				} else {
					return false;
				}
				//
			},
			//编辑记录
			gotoEditPage(row) {
				let params = {
					quicksearch: this.quicksearch, //快速搜索
					//分页器相关开始
					currentPage: this.currentPage,
					pageSize: this.pageSize,
					total: this.total,
					//分页器相关结束
					showFlag: this.showFlag,
					routineFlag: this.routineFlag, //常规入口
					fixFlag: this.fixFlag,
					input5: this.input5,
					options1: this.options1,
					options2: this.options2,
					queryForm: this.queryForm, //已显示的条件
					conditionFlag: this.conditionFlag,
					editForm: this.editForm,
					workOrderType: this.workOrderType,
					orderby: 'createdon,descending', //排序条件
					serviceData: this.serviceData, //table数据绑定
					//crm数据缓存，性能优化,//页面变更时启用
					pageCookie: this.pageCookie,
					loading: this.loading,
					canAdd: this.canAdd,
					selectTags: this.selectTags, //选中的tags
					sortType: this.sortType,
					upOrDown: this.upOrDown,
					showNextTop: this.showNextTop
				};
				sessionStorage.setItem('conditionData', JSON.stringify(params));

				this.$router.push({
					name: 'orderedit',
					params: {
						id: row.id
					}
				});
			},
			//开始时间change事件
			startDateCheck: function(from, to) {
				if(this.queryForm[from] && this.queryForm[to]) {
					if(this.queryForm[from] > this.queryForm[to]) {
						rt.showErrorToast('开始时间必须小于等于结束时间');
						this.queryForm[from] = null;
					}
				}
			},
			seachList() {
				this.workOrderType = 0;
				this.currentPage = 1;
				//this._fetchRecords();
				this.getDataLists();
			},
			gethours(hour, type) {
				if(type == 1) {
					return parseInt(hour / 24);
				}
				if(type == 2) {
					let day = parseInt(hour / 24),
						hour1 = parseInt(hour - day * 24);
					return hour1;
				}
				if(type == 3) {
					let day = parseInt(hour / 24),
						hour1 = parseInt(hour - day * 24),
						mins = ((hour - day * 24 - hour1) * 60).toFixed(0);
					return mins;
				}
			},
			getCanAdd() {
				var departId = this.$store.state.user.departId;
				if(!departId) {
					return;
				}
				var that = this;
				var requestStr =
					'../api/Helper/GetFieldValue?id=' +
					departId +
					'&entityName=new_srv_station&attributeList=new_iscreateorder,new_level,new_upstation_id,new_formstatus';
				var level = 0;
				var new_upstation_id = '';
				var formstatus = 0;
				rt.get(requestStr)
					.then(function(res) {
						var array = res.Attributes;
						for(var k in array) {
							if(array[k].Key == 'new_iscreateorder') {
								that.canAdd = array[k].Value;
							}
							if(array[k].Key == 'new_level') {
								level = array[k].Value.Value;
							}
							if(array[k].Key == 'new_upstation_id') {
								new_upstation_id = array[k].Value.Id;
							}
							if(array[k].Key == 'new_formstatus') {
								formstatus = array[k].Value.Value;
							}
						}
						if(!that.canAdd) {
							that.canAdd = false;
							return;
						}
						if(formstatus != 1 && formstatus != 3) {
							that.canAdd = false;
							return;
						}
						if(level == 2) {
							that.canAdd = false;
							// //判断上级服务商是否有代结资质
							// if (rt.isNullOrWhiteSpace(new_upstation_id)) {
							//   that.canAdd = false;
							//   return;
							// }
							// that.checkUpstation(new_upstation_id);
						}
					})
					.catch(error => {
						rt.showErrorToast(error);
					});
			},
			handleSizeChange(val) {
				this.currentPage = 1;
				this.pageSize = val;
				this.getDataLists();
			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.currentPage = val;
				this.pageSize = this.pageSize;
				//this._fetchRecords();
				this.getDataLists();
			},
			showTags() {
				this.showFlag = !this.showFlag;
			},
			showConditions() {
				this.conditionFlag = true;
				document.getElementsByTagName('body')[0].style.overflow = 'hidden';
			},
			getSelectTags(item1) {
				rt.get('../api/Work/GetSearchData')
					.then(res => {
						//console.log(res,123)
						let arry = [],
							arry1;
						if(res == '') {
							arry1 = '[]';
						} else {
							arry1 = res;
						}
						let arr = JSON.parse(arry1);
						if(item1){
							if(item1.type) {
								let name = item1.type,
									obj = null;
								if(name == 8) {
									name = '重电次数(大于等于)';
									obj = {
										key: 'new_rechargecycles',
										name: '重电次数(大于等于)',
										value: null,
										selected: true
									};
									let flag = arr.some((item, index, arry) => {
										return item.name == name;
									});
									if(!flag && obj) {
										arr.push(obj);
									}
								}
							}else{
								let obj = {};
								for(let i = 0; i < conditions.length ; i ++){
									if(conditions[i].key == item1){
										obj = conditions[i];
										obj.selected = true;
										break ;
									}
								}
								arr.push(obj)
							}
						}
						

						this.selectTags = arr;
					})
					.catch(err => {
						alert(err);
					});
			},

			resetQueerVal() {},
			closeCondition(msg) {
				this.conditionFlag = msg;
				document.getElementsByTagName('body')[0].style.overflow = 'auto';
				this.getSelectTags();
			},
			//加载数据
			_fetchWorkOrderHome() {
				var requestStr = '../api/WorkOrder/GetWorkOrderHome';
				rt.get(requestStr)
					.then(res => {
						this.editForm = res;
					})
					.catch(error => {
						this.loading = false;
					});
			},
			openWorkOrderList(type, flag) {
				if(flag) {
					this.workOrderType = type;
					this.currentPage = 1;
					this.getDataLists();
					/* if(type != 7){
						this.getDataLists();
					}else{
						this.getHandingDataLists()
					} */
				}
			},
			getHandingDataLists(){
				var params = {
					pageIndex: this.currentPage,
					pageSize: this.pageSize,
					filter: this.filter,
					orderby: this.sortType ? this.sortType + ',' + this.upOrDown : '',
					/* workOrderType: this.workOrderType, */
					new_dealstage:15
				};
				rt.get('../api/Work/GetWorkOrderby', params)
					.then(res => {
						this.serviceData = res.workOrderList;
						this.pageCookie = res.pagingCookie;
						this.total = res.totalRecordCount;
					})
					.catch(err => {
						alert(err);
					});
			},
			//加载数据
			_fetchRecords() {
				var params = {
					pageIndex: this.currentPage,
					pageSize: this.pageSize,
					filter: this.filter,
					orderby: this.orderby,
					workOrderType: this.workOrderType,
				};
				this.loading = true;
				var requestStr = '../api/WorkOrder/GetWorkOrder';
				rt.get(requestStr, params)
					.then(res => {
						this.serviceData = res.workOrderList;
						this.pageCookie = res.pagingCookie;
						this.total = res.totalRecordCount;
						this.loading = false;
					})
					.catch(error => {
						rt.showErrorToast(error);
						this.loading = false;
					});
			},
			refresh() {
				this._fetchWorkOrderHome();
			},
			showExcelImportDialog() {
				//导入
				this.$refs.excelImport.show();
			},
			downloadTemplate() {
				//服务单导入模板
				window.open('../template/服务单导入模板.xlsx');
			},
			handleExport() {
				//导出
				var arr = [];
				var params = {
					pageIndex: 1,
					pageSize: this.total,
					filter: this.filter,
					orderby: this.orderby,
					workOrderType: this.workOrderType
				};
				var requestStr = '../api/WorkOrder/GetWorkOrder';
				rt.get(requestStr, params).then(res => {
					arr = arr.concat(res.workOrderList);
					var option = {};
					option.fileName = 'excel';
					option.datas = [{
						sheetData: arr,
						sheetName: 'sheet',
						sheetFilter: [
							'new_name',
							'new_typetext',
							'new_sourcetext',
							'new_speicaltypetext',
							'new_dealstagetext',
							'new_dealstatustext',
							'new_productgroup_idName',
							'new_productmodel_idName',
							'new_accepttime',
							'new_srv_worker_idname',
							'new_begintime',
							'new_appointmenttime',
							'new_confirmtime1',
							'new_auditpointtext',
							'new_overduereasonstext',
							'new_rechargecycles',
							'new_retreatnumber',
							'new_trace_warningtimes',
							'new_supervise_warningtimes',
							'new_supervise',
							'new_iscomplaintext',
							'new_serviceitemtext',
							'new_dsorderno',
							'new_logisticsstatustext',
							'new_dealleveltext',
							'new_interactiondate',
							'new_contenttext',
							'new_interactiondesc',
							'new_servicelength2',
							'new_servicelength1',
							'new_reassignment',
							'new_csitext',
							'new_contact',
							'new_phone',
							'new_phone1',
							'new_province_idname',
							'new_city_idname',
							'new_county_idname',
							'new_town_idname',
							'new_complateaddress',
							'new_account_id',
							'new_statement',
							'new_vipleveltext',
							'new_ownstation_idname'
						],
						sheetHeader: [
							'服务单号',
							'服务类型',
							'来源途径',
							'特殊类型',
							'处理阶段',
							'处理状态',
							'产品线',
							'产品类型',
							'受理日期',
							'派往工程师名称',
							'首次预约时间',
							'工程师预约时间',
							'网点完工日期',
							'网点完工结果',
							'超期原因',
							'重电次数',
							'退单次数',
							'跟踪警告次数',
							'督办预警次数',
							'督办次数',
							'是否差评',
							'服务项目',
							'电商订单号',
							'物流状态',
							'处理级别',
							'最新业务互动时间',
							'最新跟单内容',
							'最新跟单描述',
							'服务总时长',
							'网点服务时长',
							'改派原因',
							'用户好评率',
							'客户姓名',
							'联系电话1',
							'联系电话2',
							'省份',
							'城市',
							'区县',
							'街道',
							'地址描述',
							'购买单位',
							'派工说明',
							'VIP等级',
							'原安装网点'
						]
					}];
					var toExcel = new ExportJsonExcel(option);
					toExcel.saveExcel();
				});
			}
		}
	};
</script>
<style lang="scss">
	#serveroders {
		.flex {
			display: flex;
		}
		margin-top: 20px;
		.search {
			width: 35px;
			height: 28px;
			background: white url(../../../assets/imgs/find.png) no-repeat center;
			background-size: 14px 14px;
			border: none;
			border-left: 1px solid #cccccc;
			cursor: pointer;
		}
		.btn-box {
			width: 300px;
			height: 28px;
			border: 1px solid #cccccc;
			margin-right: 20px;
		}
		.seach-text {
			display: flex;
			flex: 1;
			height: 100%;
			border: none;
			text-indent: 10px;
		}
		.refresh {
			width: 28px;
			height: 28px;
			background: #468ff9 url(../../../assets/imgs/refresh.png) no-repeat center;
			background-size: 14px 14px;
			border: none;
			cursor: pointer;
			margin-right: 30px;
			border-radius: 2px;
		}
		.flex {
			justify-content: space-between;
			align-items: center;
		}
		.order-title {
			height: 64px;
			background: white;
			box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
		}
		.title-left {
			margin-left: 20px;
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #888888;
		}
		.quickinto {
			width: 100px;
			height: 28px;
			background-color: #e4f1ff;
			text-align: center;
			line-height: 28px;
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #468ff9;
			margin-right: 20px;
			cursor: pointer;
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}
		.hasmargin {
			margin-left: 6px;
			font-size: 6px;
		}
		.serveroder-table {
			/*height: 180px;*/
			position: relative;
			height: 120px;
			display: none;
			box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
		}
		.show-tags {
			display: block;
		}
		.types,
		.tags {
			float: left;
			width: 10%;
			background: #f8f8f8;
			height: 100%;
			box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
		}
		.type {
			display: block;
			height: 40px;
			text-indent: 19px;
			line-height: 40px;
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #888888;
		}
		.tags {
			width: 90%;
			box-sizing: border-box;
			background: #fcfcfd;
			height: 100%;
		}
		.tags-ul {
			height: 40px;
		}
		.tags-li {
			float: left;
			width: 12.5%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.tag-span {
			display: block;
			width: 150px;
			height: 34px;
			line-height: 34px;
			/*text-indent: 31px;*/
			text-align: center;
			border-radius: 4px;
			overflow: hidden;
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #555555;
		}
		.checked {
			/*background: #468FF9 url(../../../assets/imgs/checked.png) no-repeat right top;*/
			background: #468ff9;
			background-size: 20px 19px;
			color: #468ff9;
			color: white;
			.tag-num {
				color: white;
			}
		}
		.tag-num {
			color: #468ff9;
			margin-left: 6px;
			cursor: pointer;
		}
		.search-conditions {
			margin-top: 10px;
		}
		.conditon-top {
			height: 64px;
			background: white;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
		}
		.conditon-btn {
			padding: 7px 16px;
			background: #f8f8f8;
			border-radius: 2px;
			display: inline-block;
			cursor: pointer;
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #888888;
			margin-left: 25px;
		}
		.import,
		.export,
		.download,
		.add {
			text-indent: 20px;
		}
		.import {
			background: #f8f8f8 url(../../../assets/imgs/import-gray.png) no-repeat 17px center;
			background-size: 14px 14px;
		}
		.export {
			background: #f8f8f8 url(../../../assets/imgs/export-gray.png) no-repeat 17px center;
			background-size: 14px 14px;
		}
		.download {
			background: #f8f8f8 url(../../../assets/imgs/download-gray.png) no-repeat 17px center;
			background-size: 14px 14px;
		}
		.add {
			background: #f8f8f8 url(../../../assets/imgs/add-gray.png) no-repeat 17px center;
			background-size: 14px 14px;
		}
		.import:hover {
			background: #e4f1ff url(../../../assets/imgs/import-blue.png) no-repeat 17px center;
			background-size: 14px 14px;
			color: #468ff9;
		}
		.export:hover {
			background: #e4f1ff url(../../../assets/imgs/export-blue.png) no-repeat 17px center;
			background-size: 14px 14px;
			color: #468ff9;
		}
		.download:hover {
			background: #e4f1ff url(../../../assets/imgs/download-blue.png) no-repeat 17px center;
			background-size: 14px 14px;
			color: #468ff9;
		}
		.add:hover {
			background: #e4f1ff url(../../../assets/imgs/add-blue.png) no-repeat 17px center;
			background-size: 14px 14px;
			color: #468ff9;
		}
		.condition-reset {
			background: #e4f1ff;
			color: #468ff9;
		}
		.conditon-search {
			background: #468ff9;
			color: white;
			margin-left: 25px;
		}
		.condition-add {
			width: 28px;
			height: 28px;
			background: #468ff9;
			color: white;
			font-size: 18px;
			border: none;
			margin-right: 30px;
			margin-left: 20px;
			cursor: pointer;
		}
		.condition-search {
			background: white;
			box-sizing: border-box;
			/*	padding-right: 19px;*/
			box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
		}
		.condition_box {
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #555555;
			display: inline-block;
			margin-top: 10px;
			margin-right: 20px;
			margin-left: 20px;
			margin-bottom: 10px;
			.text {
				width: 180px;
				height: 26px;
				border: 1px solid #bfd1d9;
				border-radius: 2px;
			}
			input.search-input {
				background: url(../../../assets/imgs/find.png) no-repeat 156px center;
				background-size: 14px 15px;
				cursor: pointer;
			}
			.el-icon-date,
			.el-icon-close {
				right: 0px;
			}
		}
		.condition-title {
			margin-right: 15px;
		}
		/*.haswidth {
			display: inline-block;
			width: 300px;
		}*/
		/*.moredata {
			.el-icon-date,
			.el-icon-close {
				right: 20px;
			}
		}*/
		.moredata {
			.el-date-editor--datetimerange {
				width: 300px;
			}
		}
		.moredata-range {
			.el-date-editor--daterange {
				width: 210px;
			}
		}
		.el-date-editor {
			width: 180px;
		}
		/*.searchLists{
			margin-top: 10px;
			background: white;
		}*/
		.searchList {
			height: 195px;
			background: white;
			margin-top: 10px;
			box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
		}
		.searchLists {
			.searchList:nth-child(2) {
				margin-top: 0px;
			}
		}
		.searchList-title {
			height: 74px;
			position: relative;
			span {
				display: inline-block;
			}
		}
		.chaping {
			background: url(../../../assets/imgs/chaping.png) no-repeat 90% center;
			background-size: 168px 74px;
		}
		.searchList-icon {
			width: 34px;
			height: 34px;
			background: url(../../../assets/imgs/anzhuang.png) no-repeat center;
			background-size: 100% 100%;
			margin-top: 12px;
			position: relative;
			top: 8px;
			left: 30px;
			margin-right: 40px;
		}
		.searchList-type {
			font-size: 20px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #222222;
			margin-right: 10px;
		}
		.searchList-num {
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #222222;
			margin-right: 10px;
			cursor: pointer;
		}
		.searchList-producelline,
		.searchList-from,
		.searchList-online {
			padding: 4 14px;
			background: rgba(70, 143, 249, 0.1);
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #468ff9;
			margin-right: 10px;
		}
		.searchList-from {
			background: rgba(255, 186, 0, 0.1);
			color: #ffba00;
		}
		.searchList-online {
			background: rgba(109, 196, 59, 0.1);
			color: #6dc43b;
		}
		.searchList-special,
		.searchList-rate {
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #888888;
			margin-right: 10px;
		}
		.searchList-btn {
			position: absolute;
			right: 30px;
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #054994;
			top: 30px;
		}
		.searchlist-info {
			height: calc(100% - 74px);
			background: #f8f9fc;
			box-sizing: border-box;
			padding-left: 30px;
			padding-top: 18px;
			padding-right: 30px;
			box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
		}
		.searchlist-information {
			float: left;
			width: 20%;
		}
		.info-name {
			display: inline-block;
			font-size: 20px;
			color: #222222;
			max-width: 100px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		.info-num,
		.info-address,
		.info-ordertime {
			font-size: 14px;
			color: #888888;
		}
		.info-address,
		.info-ordertime {
			margin-top: 20px;
		}
		.tiem-length {
			font-size: 18px;
			color: #468ff9;
		}
		.info-address {
			width: 80%;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		.liquid-separator {
			/*width: calc(100% - 100px);*/
			width: 100%;
			box-sizing: border-box;
			background: white;
			margin-top: 2px;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 20;
			box-sizing: border-box;
			padding-right: 50px;
			.block {
				float: right;
			}
			.el-pagination {
				background: white;
			}
		}
		.el-form-item {
			margin-bottom: 0;
		}
		.sort-conditions {
			background: white;
			height: 64px;
			margin-top: 10px;
			box-sizing: border-box;
			padding-left: 30px;
			vertical-align: middle;
			box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
		}
		.sort-conditions {
			overflow: hidden;
			.sort-condition:first-child {
				margin-left: 0;
			}
		}
		.sort-condition {
			/*float: left;*/
			display: inline-block;
			font-size: 14px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #888888;
			margin-left: 39px;
			margin-top: 21px;
			position: relative;
			padding: 4px 6px;
			border-radius: 2px;
			cursor: pointer;
		}
		.sort-condition.active2 {
			background: #468ff9;
			color: white;
		}
		.sort-condition:hover {
			background: #468ff9;
			color: white;
			.sort-arrow {
				display: block;
			}
		}
		.sort-arrow {
			position: absolute;
			left: 100%;
			top: 4px;
			padding-left: 2px;
			display: none;
		}
		.sort-arrowup,
		.sort-arrowdown {
			display: block;
			width: 7px;
			height: 7px;
			background: url(../../../assets/imgs/arrowup-gray.png) no-repeat center;
			background-size: 100% 100%;
			cursor: pointer;
		}
		.sort-arrowdown {
			background: url(../../../assets/imgs/arrowdown-gray.png) no-repeat center;
			background-size: 100% 100%;
		}
		.sort-arrowup:hover {
			background: url(../../../assets/imgs/arrowup-blue.png) no-repeat center;
			background-size: 100% 100%;
		}
		.sort-arrowup.activearrow {
			background: url(../../../assets/imgs/arrowup-blue.png) no-repeat center;
			background-size: 100% 100%;
		}
		.sort-arrowdown.activearrow {
			background: url(../../../assets/imgs/arrowdown-blue.png) no-repeat center;
			background-size: 100% 100%;
		}
		.sort-arrowdown:hover {
			background: url(../../../assets/imgs/arrowdown-blue.png) no-repeat center;
			background-size: 100% 100%;
		}
		.fixed {
			position: fixed;
			display: none;
			top: 0;
			left: 38px;
			width: calc(100% - 76px);
			z-index: 20;
		}
		.show-fixed {
			display: block;
			.types,
			.tags {
				background: #e4f1ff;
			}
		}
		.conditionfixed {
			width: calc(100% - 76px);
			top: 0;
			left: 38px;
			position: fixed;
			z-index: 20;
			margin-top: 0;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			background: #e4f1ff;
			padding-left: 14px;
		}
		ul.el-pager {
			.active {
				background: #468ff9;
			}
		}
		.clear-tags {
			position: absolute;
			right: 30px;
			top: 5px;
			background: #468ff9;
		}
		.routine {
			margin-left: 25px;
			margin-right: 0px;
		}
		/*.product-box{
			border: 1px solid #DDDDDD;
			display: flex;
			justify-content: center;
			align-items: center;
		}*/
	}
</style>