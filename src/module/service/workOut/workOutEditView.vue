<template>
	<div class="workOutEdit">
		<rt-header v-bind:title="$t('new_srv_workorder')">
			<rt-toolbar show-autoback>
				<!-- <rt-button type="save" @click="save('editForm')"/>
				<rt-button :text="$t('BUTTON_ConAndSend')" type="confirm" @click="confirm('editForm')" v-show="editForm.new_formstatus==1"/>
	            <rt-button type="print" :text="$t('BUTTON_PRINT')"/> -->
			</rt-toolbar>
	    </rt-header>
		<rt-content>
			<el-form ref="editForm" :model="editForm" label-width="120px" label-position="left" :rules="rules">
			    <rt-section :title="$t('BaseInfo')">
                    <el-row :gutter="50">
                        <el-col :span="8">
                            <el-form-item label="客户姓名" prop="new_contact">
                                <el-input v-model="editForm.new_contact" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系电话1" prop="new_phone">
                                <el-input v-model="editForm.new_phone" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系电话2" prop="new_phone1">
                                <el-input v-model="editForm.new_phone1" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label="客户说明">
                                <el-input type="textarea" v-model="editForm.new_statement" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="所属省份" prop="new_province_id">
                                <el-input v-model="editForm.new_province_idname" readonly @keyup.enter.native="quickChooseProvince" :disabled="isEditForm&&!isReceipt&&!isNeedReceipt" icon="search" :on-icon-click="provinceLookup"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="所属城市" prop="new_city_id">
                                <el-input v-model="editForm.new_city_idname" readonly @keyup.enter.native="quickChooseCity" :disabled="isEditForm&&!isReceipt&&!isNeedReceipt" icon="search" :on-icon-click="cityLookup"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="所属区县" prop="new_county_id">
                                <el-input v-model="editForm.new_county_idname" readonly @keyup.enter.native="quickChooseCounty" :disabled="isEditForm&&!isReceipt&&!isNeedReceipt" icon="search" :on-icon-click="countyLookup"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="所属街道" prop="new_town_id">
                                <el-input v-model="editForm.new_town_idname" readonly @keyup.enter.native="quickChooseTown" :disabled="isEditForm&&!isReceipt&&!isNeedReceipt" icon="search" :on-icon-click="townLookup"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="具体地址描述" prop="new_complateaddress">
                                <el-input v-model="editForm.new_complateaddress" :disabled="isEditForm&&!isReceipt&&!isNeedReceipt"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="电商订单号" prop="new_dsorderno">
                                <el-input v-model="editForm.new_dsorderno" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="物流状态" prop="new_source">
                                <el-input v-model="editForm.new_dsorderno" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="妥投/物流签收日期">
                                <el-date-picker v-model="editForm.new_accepttime" :editable="false" class="rt-portal-item-date" type="datetime" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="产品线" prop="new_dsorderno">
                                <el-input v-model="editForm.new_dsorderno" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="产品类型" prop="new_dsorderno">
                                <el-input v-model="editForm.new_dsorderno" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="服务项目" prop="new_serviceitem">
                                <el-input v-model="editForm.new_serviceitem" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="来源途径" prop="new_source">
                                <el-select v-model="editForm.new_source" clearable >
                                    <el-option v-for="item in pickListOptions['new_source']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                                <!-- <rt-picklist v-model="editForm.new_source" entity="new_srv_workorder" attribute="new_source" disabled="" :options="pickListOptions" :hasOptions="true"></rt-picklist> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="!isEditForm">
                            <el-form-item label="服务类型" prop="new_type">
                                <el-select v-model="editForm.new_type" clearable>
                                    <el-option v-for="item in options" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="特殊类型" prop="new_speicaltype">
                                <el-select v-model="editForm.new_speicaltype" clearable :disabled="isEditForm">
                                    <el-option v-for="item in pickListOptions['new_speicaltype']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="预约上门时间" prop="new_requiretime">
                                <el-date-picker v-model="editForm.new_requiretime" :editable="false" :disabled="isEditForm&&!isReceipt" class="rt-portal-item-date" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="预约上门时间段" prop="new_timequantum">
                                <el-select v-model="editForm.new_timequantum" clearable :disabled="isEditForm&&!isReceipt">
                                    <el-option v-for="item in pickListOptions['new_timequantum']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="购买时间" prop="new_requiretime">
                                <el-date-picker v-model="editForm.new_requiretime" :editable="false" :disabled="isEditForm&&!isReceipt" class="rt-portal-item-date" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="空调台数" prop="new_count">
                                <el-input v-model.number="editForm.new_count" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="空调匹数" prop="new_source">
                                <el-select v-model="editForm.new_source" clearable >
                                    <el-option v-for="item in pickListOptions['new_source']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="购买单位类型" prop="new_channeltype" :rules="editForm.new_type!=5?[{ type:'number',required: true, message: '', trigger: 'change'}]:[]">
                                <el-select v-model="editForm.new_channeltype" clearable :disabled="isEditForm&&!isReceipt&&!isNeedReceipt">
                                <el-option v-for="item in pickListOptions['new_channeltype']" :key="item.Value" :label="item.Text" :value="item.Value">
                                    {{item.Text}}
                                </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="服务单号" prop="new_name">
                                <el-input v-model="editForm.new_name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="关联服务单号">
                                <el-input v-model="editForm.new_srv_workorder_idName" readonly :disabled="isEditForm" icon="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="微信账号">
                                <el-input v-model="editForm.new_wechat" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="原安装单位">
                                <el-input v-model="editForm.new_wechat" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="安装日期" prop="new_installdate" :rules="editForm.new_type==4&&isCompleteWorkOrder? ruleRequireDate:null">
                                <el-date-picker v-model="editForm.new_installdate" :editable="false" class="rt-portal-item-date" type="date" placeholder="选择日期" ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="微博账号">
                                <el-input v-model="editForm.new_weibo" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="派单网点" prop="new_station_idName">
                                <el-input v-model="editForm.new_station_idName" readonly :disabled="isEditForm" icon="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="实际服务网点" prop="new_srv_station_id2">
                                <el-input v-model="editForm.new_srv_station_id2Name" readonly @keyup.enter.native="quickChooseStation2" :disabled="isEditForm" icon="search" :on-icon-click="station2Lookup"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="结算网点" prop="new_srv_station_id1">
                                <el-input v-model="editForm.new_srv_station_id1Name" readonly @keyup.enter.native="quickChooseStation1" :disabled="isEditForm" icon="search" :on-icon-click="station1Lookup"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="发票号码">
                                <el-input v-model="editForm.new_invoicenumber" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开票单位">
                                <el-input v-model="editForm.new_invioceunit" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="VIP等级" prop="new_viplevel">
                                <el-select v-model="editForm.new_viplevel" clearable :disabled="isEditForm">
                                    <el-option v-for="item in pickListOptions['new_viplevel']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="工程工单" prop="new_isengineering">
                                <el-checkbox v-model="editForm.new_isengineering" :disabled="isEditForm&&!isReceipt"></el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="工程合同号">
                                <el-input v-model="editForm.new_engineeringcode" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="处理级别" prop="new_deallevel">
                                <el-select v-model="editForm.new_deallevel" clearable>
                                    <el-option v-for="item in pickListOptions['new_deallevel']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label="服务描述" prop="new_memo">
                                <el-input type="textarea" v-model="editForm.new_memo" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label="故障排查内容" prop="new_memo">
                                <el-input type="textarea" v-model="editForm.new_memo" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="50">
                        <el-col :span="8">
                            <el-form-item label="是否差评">
                                <el-checkbox v-model="editForm.new_iscomplain" :disabled="isEditForm"></el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="制冷剂">
                                <el-input v-model="editForm.new_invoicenumber" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="50">
                        <el-col :span="8">
                            <el-form-item label="受理人" prop="new_systemuser_id">
                                <el-input v-model="editForm.new_systemuser_idName" readonly @keyup.enter.native="quickSystemuser" icon="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="受理日期" prop="new_accepttime">
                                <el-date-picker v-model="editForm.new_accepttime" :editable="false" class="rt-portal-item-date" type="datetime" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label="服务完工地址（定位获取）">
                                <el-input type="textarea" v-model="editForm.new_address" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </rt-section>  

                <rt-section :title="'处理过程跟进'">
                    <el-row :gutter="50">
                        <el-col :span="8">
                            <el-form-item label="处理阶段">
                                <el-select v-model="editForm.new_dealstage" clearable>
                                <el-option v-for="item in pickListOptions['new_dealstage']" :key="item.Value" :label="item.Text" :value="item.Value">
                                    {{item.Text}}
                                </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="处理状态">
                                <el-select v-model="editForm.new_dealstatus" clearable>
                                <el-option v-for="item in pickListOptions['new_dealstatus']" :key="item.Value" :label="item.Text" :value="item.Value">
                                    {{item.Text}}
                                </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="所属服务中心" prop="new_businessunit_idName">
                                <el-input v-model="editForm.new_businessunit_idName" readonly :disabled="isEditForm" icon="search"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="派单时间">
                                <el-date-picker v-model="editForm.new_singletime" :editable="false" class="rt-portal-item-date" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="派单网点" prop="new_station_idName">
                                <el-input v-model="editForm.new_station_idName" readonly :disabled="isEditForm" icon="search"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="网点电话" prop="new_station_idName">
                                <el-input v-model="editForm.new_station_idName" readonly :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="50">
                        <el-col :span="8">
                            <el-form-item label="工程师预约日期">
                                <el-date-picker v-model="editForm.new_appointmenttime" :editable="false" :disabled="isEditForm" class="rt-portal-item-date" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="工程师预约上门时间节点">
                                <el-select v-model="editForm.new_engineer_appointmenttime" clearable :disabled="true">
                                    <el-option v-for="item in pickListOptions['new_engineer_appointmenttime']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="工程师完工时间">
                                <el-date-picker v-model="editForm.new_endtime" :editable="false" :disabled="isEditForm" class="rt-portal-item-date" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="50">
                        <el-col :span="8">
                            <el-form-item label="网点完工日期">
                                <el-date-picker v-model="editForm.new_confirmtime1" :editable="false" :disabled="isEditForm" class="rt-portal-item-date" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="中心完工日期">
                                <el-date-picker v-model="editForm.new_confirmtime2" :editable="false" :disabled="isEditForm" class="rt-portal-item-date" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="总部完工日期">
                                <el-date-picker v-model="editForm.new_completiontime" :editable="false" :disabled="isEditForm" class="rt-portal-item-date" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="工程师完工结果" prop="new_businessunit_idName">
                                <el-input v-model="editForm.new_businessunit_idName" readonly :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="首次督办时间">
                                <el-date-picker v-model="editForm.new_confirmtime1" :editable="false" :disabled="isEditForm" class="rt-portal-item-date" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="督办完成超期考核" prop="new_issupervisor">
                                <el-input v-model="editForm.new_issupervisor" readonly :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="50">
                        <el-col :span="8">
                            <el-form-item label="网点完工结果" prop="new_auditpoint" :rules="isCompleteWorkOrder?ruleRequireNumber:null">
                                <el-select v-model="editForm.new_auditpoint" clearable :disabled="!isReceipt">
                                    <el-option v-for="item in auditpointOptions" :key="item.Value" :label="item.Text" :value="item.Value" :disabled="item.disabled">{{item.Text}}</el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="中心完工结果">
                                <el-select v-model="editForm.new_auditcentrality" clearable :disabled="true">
                                    <el-option v-for="item in pickListOptions['new_auditcentrality']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="总部完工结果">
                                <el-select v-model="editForm.new_audithq" clearable :disabled="true">
                                    <el-option v-for="item in pickListOptions['new_audithq']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="网点完工说明" prop="new_network_completiondesc" :rules="isCompleteWorkOrder? ruleRequire:null">
                                <el-input type="textarea" v-model="editForm.new_network_completiondesc" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="中心完工说明" prop="new_network_completiondesc" :rules="isCompleteWorkOrder? ruleRequire:null">
                                <el-input type="textarea" v-model="editForm.new_network_completiondesc" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="总部完工说明" prop="new_network_completiondesc" :rules="isCompleteWorkOrder? ruleRequire:null">
                                <el-input type="textarea" v-model="editForm.new_network_completiondesc" :disabled="isEditForm&&!isReceipt"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="用户满意度" prop="new_businessunit_idName">
                                <el-input v-model="editForm.new_businessunit_idName" readonly :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="中心回访建议">
                                <el-select v-model="editForm.new_rvisitadvise1" clearable :disabled="true">
                                    <el-option v-for="item in pickListOptions['new_rvisitadvise1']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="总部回访建议">
                                <el-select v-model="editForm.new_rvisitadvise2" clearable :disabled="true">
                                    <el-option v-for="item in pickListOptions['new_rvisitadvise2']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="网点服务时长">
                                <el-input v-model.number="editForm.new_servicelength1" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="总服务时长">
                                <el-input v-model.number="editForm.new_servicelength2" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="超期时长">
                                <el-input v-model.number="editForm.new_overduelength" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="超期原因" prop="new_overduereasons" :rules="isCompleteWorkOrder&&editForm.new_servicelength1>24?ruleRequireNumber:null">
                                <el-select v-model="editForm.new_overduereasons" clearable :disabled="isEditForm&&!isReceipt">
                                    <el-option v-for="item in pickListOptions['new_overduereasons']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="改派原因" prop="new_reassignment" :rules="isSlipWorkOrder?ruleRequireNumber:null">
                                <el-select v-model="editForm.new_reassignment" clearable :disabled="!isNeedReceipt&&!isReceipt">
                                    <el-option v-for="item in pickListOptions['new_reassignment']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="转单次数">
                                <el-input v-model.number="editForm.new_transfers_number" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="重电次数">
                                <el-input v-model="editForm.new_rechargecycles" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="退单次数">
                                <el-input v-model.number="editForm.new_retreatnumber" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="回访退单次数">
                                <el-input v-model.number="editForm.new_retreatnumber" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="跟踪警告次数">
                                <el-input v-model.number="editForm.new_supervise" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="督办预警次数">
                                <el-input v-model.number="editForm.new_supervise" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="督办次数">
                                <el-input v-model.number="editForm.new_supervise" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </rt-section> 

                <rt-section :title="'处理结果'" collapsed="true">
                    <el-row :gutter="50">
                        <el-col :span="8">
                            <el-form-item label="安装量" prop="new_station_idName">
                                <el-input v-model="editForm.new_station_idName" readonly :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="保内维修量" prop="new_station_idName">
                                <el-input v-model="editForm.new_station_idName" readonly :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="保外维修量" prop="new_station_idName">
                                <el-input v-model="editForm.new_station_idName" readonly :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="收费金额">
                                <el-input v-model.number="editForm.new_charge" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="收费备注">
                                <el-input v-model="editForm.new_chargedesc" :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="回访状态">
                                <el-select v-model="editForm.new_status" clearable :disabled="isEditForm">
                                    <el-option v-for="item in pickListOptions['new_status']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="回访途径">
                                <el-select v-model="editForm.new_surveychannel" clearable :disabled="isEditForm">
                                    <el-option v-for="item in pickListOptions['new_surveychannel']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="回访日期">
                                <el-date-picker v-model="editForm.new_surveydate" :editable="false" :disabled="isEditForm" class="rt-portal-item-date" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="回访结果">
                                <el-select v-model="editForm.new_returnvisit" clearable :disabled="isEditForm">
                                    <el-option v-for="item in pickListOptions['new_returnvisit']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="结卡方式">
                                <el-select v-model="editForm.new_knotcard" clearable :disabled="isEditForm">
                                    <el-option v-for="item in pickListOptions['new_knotcard']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="结算状态">
                                <el-select v-model="editForm.new_servicestates" clearable :disabled="isEditForm">
                                    <el-option v-for="item in pickListOptions['new_servicestates']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>              
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="历史服务单次数" prop="new_station_idName">
                                <el-input v-model="editForm.new_station_idName" readonly :disabled="isEditForm"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label="网点反馈修改情况" prop="new_tech_sitememo" :rules="isTechSubmit?ruleRequire:null">
                                <el-input type="textarea" v-model="editForm.new_tech_sitememo" :disabled="this.editForm.new_tech_approvalstatus!=3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="50">
                         <el-col :span="8">
                            <el-form-item label="技术支持审核状态">
                                <el-select v-model="editForm.new_tech_approvalstatus" clearable :disabled="isEditForm">
                                    <el-option v-for="item in pickListOptions['new_tech_approvalstatus']" :key="item.Value" :label="item.Text" :value="item.Value">
                                        {{item.Text}}
                                    </el-option>
                                </el-select>              
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="技术支持审核意见" prop="new_tech_memo">
                                <el-input v-model="editForm.new_tech_memo" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="50">
                         <el-col :span="8">
                            <el-form-item label="虚假标识">
                                <el-select v-model="editForm.new_unrealstatus" clearable :disabled="true">
                                <el-option v-for="item in pickListOptions['new_unrealstatus']" :key="item.Value" :label="item.Text" :value="item.Value">
                                    {{item.Text}}
                                </el-option>
                                </el-select>              
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="虚假申诉理由" prop="new_tech_memo">
                                <el-input v-model="editForm.new_tech_memo" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </rt-section> 
			</el-form>
		</rt-content>

	</div>
</template>
<script>
export default {
  data() {
    return {
      options: [],
      pickListOptions: {},
      editForm: {},
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
  mounted: function() {},
  created: function() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      //   this.initData();
    } /*else{
				this.editForm.new_section=1;
			}*/
  },
  methods: {
    //初始化数据
    initData: function() {
      var apiUrl = "../api/ExpenseClaim/GetExpenseClaimById/" + this.id;
      rt.get(apiUrl)
        .then(res => {
          this.editForm = res;
          debugger;
          if (res.new_returnvisit == 0) {
            this.editForm.new_returnvisit = null;
          }
          if (res.new_center_result == 0) {
            this.editForm.new_center_result = null;
          }
          if (res.new_first_result == 0) {
            this.editForm.new_first_result = null;
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
          var params = this.editForm;
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
    }
  }
};
</script>
<style>
.expense-checkbox {
  margin-top: 8px;
}
</style>
