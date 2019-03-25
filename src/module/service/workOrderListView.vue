 <template>
  <div style="width:100%">
    <rt-header title="服务单">
    </rt-header>
    <div class="service">
      <div class="rt-grid">
        <div class="rt-grid__header">
      <rt-toolbar>
        <slot name="toolbar"></slot>
      </rt-toolbar>
      <el-button type="primary" @click="handleCollapse"  style="margin-left: 20px;padding: 0 10px;height: 26px;margin-top: 6px;">
        <i :class="iconClass" style="font-size:10px;"></i>
        快速入口
      </el-button>
      <el-button type="primary" v-show="showHidden" @click="refresh"  style="margin-left: 20px;padding: 0 10px;height: 26px;margin-top: 6px;">
        刷新
      </el-button>
      </div>
      <div class="rt-grid__moresearch" v-show="showHidden">
        <template>
            <div class="table-content2">
                <h3>服务单处理阶段</h3>
                <el-row>
                    <el-col :span="3">
                        待接单<span class="el-dropdown-link" @click="openWorkOrderList(1)" v-if="editForm.ReceiptCount>0">(<a href="javascript:void 0">{{editForm.ReceiptCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        待派工<span class="el-dropdown-link" @click="openWorkOrderList(2)" v-if="editForm.DispatchCount>0">(<a href="javascript:void 0">{{editForm.DispatchCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        待预约<span class="el-dropdown-link" @click="openWorkOrderList(3)" v-if="editForm.AppointmentCount>0">(<a href="javascript:void 0">{{editForm.AppointmentCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        待转派<span class="el-dropdown-link" @click="openWorkOrderList(4)" v-if="editForm.TransferCount>0">(<a href="javascript:void 0">{{editForm.TransferCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        退单<span class="el-dropdown-link" @click="openWorkOrderList(5)" v-if="editForm.RefundCount>0">(<a href="javascript:void 0">{{editForm.RefundCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        待完工<span class="el-dropdown-link" @click="openWorkOrderList(6)" v-if="editForm.CompletedCount>0">(<a href="javascript:void 0">{{editForm.CompletedCount}})</a></span>
                    </el-col>
                </el-row>
                <h3>处理中超期服务单</h3>
                <el-row>
                    <el-col :span="3">
                        超1天<span class="el-dropdown-link" @click="openWorkOrderList(11)" v-if="editForm.Overdue1DayCount>0">(<a href="javascript:void 0">{{editForm.Overdue1DayCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        超2天<span class="el-dropdown-link" @click="openWorkOrderList(12)" v-if="editForm.Overdue2DayCount>0">(<a href="javascript:void 0">{{editForm.Overdue2DayCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        超3天<span class="el-dropdown-link" @click="openWorkOrderList(13)" v-if="editForm.Overdue3DayCount>0">(<a href="javascript:void 0">{{editForm.Overdue3DayCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        超5天<span class="el-dropdown-link" @click="openWorkOrderList(14)" v-if="editForm.Overdue5DayCount>0">(<a href="javascript:void 0">{{editForm.Overdue5DayCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        超7天<span class="el-dropdown-link" @click="openWorkOrderList(15)" v-if="editForm.Overdue7DayCount>0">(<a href="javascript:void 0">{{editForm.Overdue7DayCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        超15天<span class="el-dropdown-link" @click="openWorkOrderList(16)" v-if="editForm.Overdue15DayCount>0">(<a href="javascript:void 0">{{editForm.Overdue15DayCount}})</a></span>
                    </el-col>
                </el-row>
                <h3>信息提醒</h3>
                <el-row>
                    <el-col :span="3">
                        重电<span class="el-dropdown-link" @click="openWorkOrderList(21)" v-if="editForm.RechargecyclesCount>0">(<a href="javascript:void 0">{{editForm.RechargecyclesCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        跟踪警告<span class="el-dropdown-link" @click="openWorkOrderList(22)" v-if="editForm.TracWarningCount>0">(<a href="javascript:void 0">{{editForm.TracWarningCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        督办预警<span class="el-dropdown-link" @click="openWorkOrderList(23)" v-if="editForm.SuperviseWarningCount>0">(<a href="javascript:void 0">{{editForm.SuperviseWarningCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        督办<span class="el-dropdown-link" @click="openWorkOrderList(24)" v-if="editForm.SuperviseCount>0">(<a href="javascript:void 0">{{editForm.SuperviseCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        特殊工单<span class="el-dropdown-link" @click="openWorkOrderList(25)" v-if="editForm.SpeicaltypeCount>0">(<a href="javascript:void 0">{{editForm.SpeicaltypeCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        回访虚假<span class="el-dropdown-link" @click="openWorkOrderList(26)" v-if="editForm.UnrealstatusCount>0">(<a href="javascript:void 0">{{editForm.UnrealstatusCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        催单<span class="el-dropdown-link" @click="openWorkOrderList(27)" v-if="editForm.UrgeCount>0">(<a href="javascript:void 0">{{editForm.UrgeCount}})</a></span>
                    </el-col>
                    <el-col :span="3">
                        待技术支持提交<span class="el-dropdown-link" @click="openWorkOrderList(28)" v-if="editForm.UrgeCount>0">(<a href="javascript:void 0">{{editForm.TechApprovalCount}})</a></span>
                    </el-col>
                </el-row>               
            </div>                
        </template>
      </div>    
    </div>
  </div>
    <rt-grid ref="grid" quicksearch-placeholder="快速搜索服务单号" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset" style="width: 100%">
      <template slot="toolbar">
        <rt-button type="add" @click="gotoAddPage" v-if="canAdd" />
        <rt-button type="export" text="下载导入模板" @click="downloadTemplate" v-if="canAdd" />
        <rt-button type="import" @click="showExcelImportDialog" v-if="canAdd" />
      </template>

      <template slot="more">
        <el-form label-position="left" ref="queryForm" label-width="120px" :model="queryForm">
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item label="服务单号" prop="new_name">
                <el-input v-model="queryForm.new_name"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="6">
              <el-form-item label="服务类型" prop="new_type">
                <rt-picklist v-model="queryForm.new_type" entity="new_srv_workorder" attribute="new_type"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="处理阶段" prop="new_dealstage">
                <rt-picklist v-model="queryForm.new_dealstage" entity="new_srv_workorder" attribute="new_dealstage"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="处理状态" prop="new_dealstatus">
                <rt-picklist v-model="queryForm.new_dealstatus" entity="new_srv_workorder" attribute="new_dealstatus"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item label="来源途径" prop="new_source">
                <rt-picklist v-model="queryForm.new_source" entity="new_srv_workorder" attribute="new_source"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话" prop="new_phone">
                <el-input v-model="queryForm.new_phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电商订单号" prop="new_dsorderno">
                <el-input v-model="queryForm.new_dsorderno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="服务项目" prop="new_serviceitem">
                <rt-picklist v-model="queryForm.new_serviceitem" entity="new_srv_workorder" attribute="new_serviceitem"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item label="重电次数" prop="new_rechargecycles">
                <el-input v-model.number="queryForm.new_rechargecycles"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="退单次数" prop="new_retreatnumber">
                <el-input v-model.number="queryForm.new_retreatnumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="督办次数" prop="new_supervise">
                <el-input v-model.number="queryForm.new_supervise"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否差评" prop="new_iscomplain">
                <rt-picklist v-model="queryForm.new_iscomplain" entity="new_srv_workorder" attribute="new_iscomplain"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item label="特殊类型" prop="new_speicaltype">
                <rt-picklist v-model="queryForm.new_speicaltype" entity="new_srv_workorder" attribute="new_speicaltype"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="VIP等级" prop="new_viplevel">
                <rt-picklist v-model="queryForm.new_viplevel" entity="new_srv_workorder" attribute="new_viplevel"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="网点服务时长(小时)" prop="new_servicelength1">
                <el-input v-model.number="queryForm.new_servicelength1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="超期原因" prop="new_overduereasons">
                <rt-picklist v-model="queryForm.new_overduereasons" entity="new_srv_workorder" attribute="new_overduereasons"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item label="受理日期起" prop="dateFrom">
                <el-date-picker type="date" v-model="queryForm.dateFrom" @change="startDateCheck('dateFrom','dateTo')" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="受理日期止" prop="dateTo">
                <el-date-picker type="date" v-model="queryForm.dateTo" @change="endDateCheck('dateFrom','dateTo')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="处理级别" prop="new_deallevel">
                <rt-picklist v-model="queryForm.new_deallevel" entity="new_srv_workorder" attribute="new_deallevel"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="跟单内容" prop="new_content">
                <rt-picklist v-model="queryForm.new_content" entity="new_srv_workorder" attribute="new_content"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item label="妥投/物流签收日期" prop="new_deliverydate">
                <el-date-picker type="date" v-model="queryForm.new_deliverydate" @change="startDateCheck"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="网点完工结果" prop="new_auditpoint">
                <rt-picklist v-model="queryForm.new_auditpoint" entity="new_srv_workorder" attribute="new_auditpoint"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="中心完工结果" prop="new_auditcentrality">
                <rt-picklist v-model="queryForm.new_auditcentrality" entity="new_srv_workorder" attribute="new_auditcentrality"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总部完工结果" prop="new_audithq">
                <rt-picklist v-model="queryForm.new_audithq" entity="new_srv_workorder" attribute="new_audithq"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item label="原安装网点" prop="new_ownstation_id">
                <rt-lookup v-model="queryForm.new_ownstation_id" entity="new_srv_station" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="派往工程师编码" prop="new_worker_code">
                <el-input v-model="queryForm.new_worker_code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="派往工程师名称" prop="new_worker_name">
                <el-input v-model="queryForm.new_worker_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="派往中心" prop="new_businessunit_id">
                <rt-lookup v-model="queryForm.new_businessunit_id" entity="businessunit" nameField="name"  />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item label="预约时间起" prop="new_appointmenttimeFrom">
                <el-date-picker type="date" v-model="queryForm.new_appointmenttimeFrom" @change="startDateCheck('new_appointmenttimeFrom','new_appointmenttimeTo')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预约时间止" prop="new_appointmenttimeTo">
                <el-date-picker type="date" v-model="queryForm.new_appointmenttimeTo" @change="endDateCheck('new_appointmenttimeFrom','new_appointmenttimeTo')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="网点确认日期起" prop="new_confirmtime1From">
                <el-date-picker type="date" v-model="queryForm.new_confirmtime1From" @change="startDateCheck('new_confirmtime1From','new_confirmtime1To')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="网点确认日期止" prop="new_confirmtime1To">
                <el-date-picker type="date" v-model="queryForm.new_confirmtime1To" @change="endDateCheck('new_confirmtime1From','new_confirmtime1To')"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">              
              <el-form-item label="派工说明" prop="new_statement">
                <el-input v-model="queryForm.new_statement"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="改派原因" prop="new_reassignment">
                <rt-picklist v-model="queryForm.new_reassignment" entity="new_srv_workorder" attribute="new_reassignment"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="购买单位类型" prop="new_channeltype">
                <rt-picklist v-model="queryForm.new_channeltype" entity="new_srv_workorder" attribute="new_channeltype"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工程工单" prop="new_engineeringcode">
                <el-input v-model="queryForm.new_engineeringcode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item label="省份" prop="new_province_id">
                <rt-lookup v-model="queryForm.new_province_id" entity="new_province" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="城市" prop="new_city_id">
                <rt-lookup v-model="queryForm.new_city_id" entity="new_city" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区县" prop="new_county_id">
                <rt-lookup v-model="queryForm.new_county_id" entity="new_county" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="街道" prop="new_town_id">
                <rt-lookup v-model="queryForm.new_town_id" entity="new_town" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item label="回访状态" prop="new_status">
                <rt-picklist v-model="queryForm.new_status" entity="new_srv_workorder" attribute="new_status"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品大类" prop="new_productgroup_id">
                <rt-lookup v-model="queryForm.new_productgroup_id" entity="new_productgroup" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="物流状态" prop="new_logisticsstatus">
                <rt-picklist v-model="queryForm.new_logisticsstatus" entity="new_srv_workorder" attribute="new_logisticsstatus"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>

      <el-table ref="gridTable" v-bind:data="serviceData" row-key="id" stripe @row-dblclick="doubleClick" v-loading="loading" @sort-change="handleSortChange" style="width: 100%">
        <el-table-column type="selection" width="35" :selectable="selecTable">
        </el-table-column>
         <el-table-column prop="new_name" label="服务单号" show-overflow-tooltip sortable width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_typetext" label="服务类型" show-overflow-tooltip width="140">
        </el-table-column>
        <el-table-column prop="new_dealstagetext" label="处理阶段" show-overflow-tooltip width="100">
        </el-table-column>
        <el-table-column prop="new_begintime" label="首次与用户预约时间" show-overflow-tooltip width="180">
        </el-table-column>
        <el-table-column prop="new_appointmenttime" label="预约上门时间" show-overflow-tooltip width="200">
        </el-table-column>
        <el-table-column prop="new_accepttime" label="受理日期" show-overflow-tooltip width="150">
        </el-table-column>
        <el-table-column prop="new_interactiondate" label="最新业务互动时间" show-overflow-tooltip width="200">
        </el-table-column>
        <el-table-column prop="new_contenttext" label="最新跟单内容" show-overflow-tooltip width="150">
        </el-table-column>
        <el-table-column prop="new_interactiondesc" label="最新跟单描述" show-overflow-tooltip width="200">
        </el-table-column>
        <el-table-column prop="new_rechargecycles" label="重电次数" show-overflow-tooltip width="90">
        </el-table-column>
        <el-table-column prop="new_retreatnumber" label="退单次数" show-overflow-tooltip width="90">
        </el-table-column>
        <el-table-column prop="new_trace_warningtimes" label="跟踪警告次数" show-overflow-tooltip width="120">
        </el-table-column>
        <el-table-column prop="new_supervise_warningtimes" label="督办预警次数" show-overflow-tooltip width="120">
        </el-table-column>
        <el-table-column prop="new_supervise" label="督办次数" show-overflow-tooltip width="90">
        </el-table-column>
        <el-table-column prop="new_iscomplain" label="是否差评" show-overflow-tooltip width="90">
        </el-table-column>
        <el-table-column prop="new_srv_worker_idname" label="派往工程师名称" show-overflow-tooltip width="130">
        </el-table-column>
        <el-table-column prop="new_servicelength2" label="服务总时长" show-overflow-tooltip width="110">
        </el-table-column>
        <el-table-column prop="new_servicelength1" label="网点服务时长"  show-overflow-tooltip width="120">
        </el-table-column>
        <el-table-column prop="new_csi" label="满意度"  show-overflow-tooltip width="90">
        </el-table-column>
        <el-table-column prop="new_contact" label="客户姓名" show-overflow-tooltip width="100">
        </el-table-column>
        <el-table-column prop="new_phone" label="联系电话1" show-overflow-tooltip width="150">
        </el-table-column>
        <el-table-column prop="new_phone1" label="联系电话2" show-overflow-tooltip width="150">
        </el-table-column>
        <el-table-column prop="new_province_idname" label="省份" show-overflow-tooltip width="80">
        </el-table-column>
        <el-table-column prop="new_city_idname" label="城市" show-overflow-tooltip width="80">
        </el-table-column>
        <el-table-column prop="new_county_idname" label="区县" show-overflow-tooltip width="120">
        </el-table-column>
        <el-table-column prop="new_town_idname" label="街道" show-overflow-tooltip width="120">
        </el-table-column>
        <el-table-column prop="new_complateaddress" label="地址描述" show-overflow-tooltip width="200">
        </el-table-column>
        <el-table-column prop="new_statement" label="派工说明" show-overflow-tooltip width="400">
        </el-table-column>
        <el-table-column prop="new_vipleveltext" label="VIP等级" show-overflow-tooltip width="90">
        </el-table-column>
      </el-table>
    </rt-grid>
    <!-- 数据导入 -->
    <rt-excel-import-dialog ref="excelImport" title="数据导入" :action="actionApi" :on-success="_fetchRecords">
    </rt-excel-import-dialog>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      disabledform: false, //设置主档表单禁用状态
      // 查询条件
      queryForm: {
        new_ownstation_id: {},
        new_businessunit_id: {},
        new_productgroup_id: {},
        new_province_id: {},
        new_city_id: {},
        new_county_id: {},
        new_town_id: {},
        new_name: "",
        new_type: null,
        new_dealstage: null,
        new_dealstatus: null,
        new_source: null,
        new_phone: "",
        new_dsorderno: "",
        new_serviceitem: null,
        new_rechargecycles: null,
        new_retreatnumber: null,
        new_supervise: null,
        new_iscomplain: null,
        new_speicaltype: null,
        new_viplevel: null,
        new_servicelength1: null,
        new_overduereasons: null,
        // dateFrom: "",
        // dateTo: "",
        new_deallevel: null,
        new_content: null,
        new_deliverydate: "",
        new_auditpoint: null,
        new_auditcentrality: null,
        new_audithq: null,
        new_worker_code: "",
        new_worker_name: "",
        new_appointmenttimeFrom: "",
        new_appointmenttimeTo: "",
        new_confirmtime1From: "",
        new_confirmtime1To: "",
        new_statement: "",
        new_reassignment: null,
        new_channeltype: null,
        new_engineeringcode: "",
        new_status: null,
        new_logisticsstatus: null
      },
      orderby: "createdon,descending", //排序条件

      serviceData: [], //table数据绑定
      dataTotalCount: 0, //数据总条数

      loading: false,
      searchtype: 1, //搜索类别；1：快速查找；2：更多筛选

      //crm数据缓存，性能优化,//页面变更时启用
      pageCookie: "",
      isneedCookie: false, //页面变更时启用
      canAdd: false,
      editForm: {
        ReceiptCount: 0,
        DispatchCount: 0,
        AppointmentCount: 0,
        TransferCount: 0,
        RefundCount: 0,
        CompletedCount: 0,
        Overdue1DayCount: 0,
        Overdue2DayCount: 0,
        Overdue3DayCount: 0,
        Overdue5DayCount: 0,
        Overdue7DayCount: 0,
        Overdue15DayCount: 0,
        RechargecyclesCount: 0,
        TraceWarningCount: 0,
        SuperviseWarningCount: 0,
        SuperviseCount: 0,
        SpeicaltypeCount: 0,
        UnrealstatusCount: 0,
        UrgeCount: 0,
        TechApprovalCount: 0
      },
      workOrderLoading: true,
      displayStyle: "display: none;",
      workOrderType: 0,
      showHidden: true
    };
  },
  mounted: function() {
    this.getCanAdd();
    this._fetchWorkOrderHome();
    this._fetchRecords();
  },
  created: function() {
    if (this.$route.params.type > 0)
      this.workOrderType = this.$route.params.type;
  },
  watch: {},
  computed: {
    iconClass() {
      return this.showHidden ? "el-icon-arrow-up" : "el-icon-arrow-down";
    },
    filter: function() {
      var filter = "";
      if (
        this.$refs.grid.quickSearch != null &&
        this.$refs.grid.quickSearch != ""
      ) {
        filter += "quicksearch=" + this.$refs.grid.quickSearch + ",";
      }
      if (this.queryForm.new_name)
        filter += "new_name=" + this.queryForm.new_name + ",";
      if (this.queryForm.new_type)
        filter += "new_type=" + this.queryForm.new_type + ",";
      if (this.queryForm.new_dealstage)
        filter += "new_dealstage=" + this.queryForm.new_dealstage + ",";
      if (this.queryForm.new_dealstatus)
        filter += "new_dealstatus=" + this.queryForm.new_dealstatus + ",";
      if (this.queryForm.new_source)
        filter += "new_source=" + this.queryForm.new_source + ",";
      if (this.queryForm.new_phone)
        filter += "new_phone=" + this.queryForm.new_phone + ",";
      if (this.queryForm.new_dsorderno)
        filter += "new_dsorderno=" + this.queryForm.new_dsorderno + ",";
      if (this.queryForm.new_serviceitem)
        filter += "new_serviceitem=" + this.queryForm.new_serviceitem + ",";
      if (this.queryForm.new_rechargecycles)
        filter =
          "new_rechargecycles=" + this.queryForm.new_rechargecycles + ",";
      if (this.queryForm.new_retreatnumber)
        filter += "new_retreatnumber=" + this.queryForm.new_retreatnumber + ",";
      if (this.queryForm.new_supervise)
        filter += "new_supervise=" + this.queryForm.new_supervise + ",";
      if (this.queryForm.new_iscomplain)
        filter += "new_iscomplain=" + this.queryForm.new_iscomplain + ",";
      if (this.queryForm.new_speicaltype)
        filter += "new_speicaltype=" + this.queryForm.new_speicaltype + ",";
      if (this.queryForm.new_viplevel)
        filter += "new_viplevel=" + this.queryForm.new_viplevel + ",";
      if (this.queryForm.new_servicelength1)
        filter +=
          "new_servicelength1=" + this.queryForm.new_servicelength1 + ",";
      if (this.queryForm.new_overduereasons)
        filter +=
          "new_overduereasons=" + this.queryForm.new_overduereasons + ",";
      if (this.queryForm.dateFrom)
        filter +=
          "dateFrom=" + this.queryForm.dateFrom.toLocaleDateString() + ",";
      if (this.queryForm.dateTo)
        filter += "dateTo=" + this.queryForm.dateTo.toLocaleDateString() + ",";
      if (this.queryForm.new_deallevel)
        filter += "new_deallevel=" + this.queryForm.new_deallevel + ",";
      if (this.queryForm.new_content)
        filter += "new_content=" + this.queryForm.new_content + ",";
      if (this.queryForm.new_deliverydate)
        filter +=
          "new_deliverydate=" +
          this.queryForm.new_deliverydate.toLocaleDateString() +
          ",";
      if (this.queryForm.new_auditpoint)
        filter += "new_auditpoint=" + this.queryForm.new_auditpoint + ",";
      if (this.queryForm.new_auditcentrality)
        filter +=
          "new_auditcentrality=" + this.queryForm.new_auditcentrality + ",";
      if (this.queryForm.new_audithq)
        filter += "new_audithq=" + this.queryForm.new_audithq + ",";
      if (this.queryForm.new_worker_code)
        filter += "new_worker_code=" + this.queryForm.new_worker_code + ",";
      if (this.queryForm.new_worker_name)
        filter += "new_worker_name=" + this.queryForm.new_worker_name + ",";
      if (this.queryForm.new_appointmenttimeFrom)
        filter +=
          "new_appointmenttimeFrom=" +
          this.queryForm.new_appointmenttimeFrom.toLocaleDateString() +
          ",";
      if (this.queryForm.new_appointmenttimeTo)
        filter +=
          "new_appointmenttimeTo=" +
          this.queryForm.new_appointmenttimeTo.toLocaleDateString() +
          ",";
      if (this.queryForm.new_confirmtime1From)
        filter +=
          "new_confirmtime1From=" +
          this.queryForm.new_confirmtime1From.toLocaleDateString() +
          ",";
      if (this.queryForm.new_confirmtime1To)
        filter +=
          "new_confirmtime1To=" +
          this.queryForm.new_confirmtime1To.toLocaleDateString() +
          ",";
      if (this.queryForm.new_statement)
        filter += "new_statement=" + this.queryForm.new_statement + ",";
      if (this.queryForm.new_reassignment)
        filter += "new_reassignment=" + this.queryForm.new_reassignment + ",";
      if (this.queryForm.new_channeltype)
        filter += "new_channeltype=" + this.queryForm.new_channeltype + ",";
      if (this.queryForm.new_engineeringcode)
        filter +=
          "new_engineeringcode=" + this.queryForm.new_engineeringcode + ",";
      if (this.queryForm.new_status)
        filter += "new_status=" + this.queryForm.new_status + ",";
      if (this.queryForm.new_logisticsstatus)
        filter +=
          "new_logisticsstatus=" + this.queryForm.new_logisticsstatus + ",";
      if (
        this.queryForm.new_businessunit_id &&
        this.queryForm.new_businessunit_id.id
      )
        filter +=
          "new_businessunit_id=" + this.queryForm.new_businessunit_id.id + ",";
      if (this.queryForm.new_province_id && this.queryForm.new_province_id.id)
        filter += "new_province_id=" + this.queryForm.new_province_id.id + ",";
      if (this.queryForm.new_city_id && this.queryForm.new_city_id.id)
        filter += "new_city_id=" + this.queryForm.new_city_id.id + ",";
      if (this.queryForm.new_county_id && this.queryForm.new_county_id.id)
        filter += "new_county_id=" + this.queryForm.new_county_id.id + ",";
      if (this.queryForm.new_town_id && this.queryForm.new_town_id.id)
        filter += "new_town_id=" + this.queryForm.new_town_id.id + ",";
      if (
        this.queryForm.new_productgroup_id &&
        this.queryForm.new_productgroup_id.id
      )
        filter +=
          "new_productgroup_id=" + this.queryForm.new_productgroup_id.id + ",";
      if (filter.length > 0) {
        return filter.substring(filter, filter.length - 1);
      }
      return "";
    },
    actionApi: function() {
      return "../api/WorkOrder/ExcelImport";
    }
  },
  methods: {
    getCanAdd: function() {
      var departId = this.$store.state.user.departId;
      if (!departId) {
        return;
      }
      var that = this;
      var requestStr =
        "../api/Helper/GetFieldValue?id=" +
        departId +
        "&entityName=new_srv_station&attributeList=new_iscreateorder,new_level,new_upstation_id,new_formstatus";
      var level = 0;
      var new_upstation_id = "";
      var formstatus = 0;
      rt.get(requestStr)
        .then(function(res) {
          var array = res.Attributes;
          for (var k in array) {
            if (array[k].Key == "new_iscreateorder") {
              that.canAdd = array[k].Value;
            }
            if (array[k].Key == "new_level") {
              level = array[k].Value.Value;
            }
            if (array[k].Key == "new_upstation_id") {
              new_upstation_id = array[k].Value.Id;
            }
            if (array[k].Key == "new_formstatus") {
              formstatus = array[k].Value.Value;
            }
          }
          if (!that.canAdd) {
            that.canAdd = false;
            return;
          }
          if (formstatus != 1 && formstatus != 3) {
            that.canAdd = false;
            return;
          }
          //二级服务商只允许查看导出
          if (level == 2) {
            that.canAdd = false;
          }
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },

    //判断上级服务商是否有代结资质
    checkUpstation: function(stationId) {
      var that = this;
      var requestStr =
        "../api/Helper/GetFieldValue?id=" +
        stationId +
        "&entityName=new_srv_station&attributeList=new_isreplacesettle";
      var new_isreplacesettle = false;
      rt.get(requestStr)
        .then(function(res) {
          var array = res.Attributes;
          for (var k in array) {
            if (array[k].Key == "new_isreplacesettle") {
              new_isreplacesettle = array[k].Value;
            }
          }
          if (!new_isreplacesettle) {
            that.canAdd = false;
          }
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },

    //加载数据
    _fetchRecords: function() {
      var params = {
        pageIndex: this.$refs.grid.getPageIndex(),
        pageSize: this.$refs.grid.getPageSize(),
        filter: this.filter,
        orderby: this.orderby,
        workOrderType: this.workOrderType
      };
      this.loading = true;
      var requestStr = "../api/WorkOrder/GetWorkOrder";
      rt.get(requestStr, params)
        .then(res => {
          this.serviceData = res.workOrderList;
          this.pageCookie = res.pagingCookie;
          this.dataTotalCount = res.totalRecordCount;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    //查询数据
    handleSearch: function() {
      this.workOrderType = 0;
      this._fetchRecords();
    },
    //页面发生变化
    handlePageChange: function() {
      this._fetchRecords();
    },
    //新增记录
    gotoAddPage: function() {
      this.$router.push({ name: "ordercreate" });
    },
    //删除记录
    deleteData: function() {
      var selection = this.$refs.gridTable.selection;
      if (selection == null || selection.length == 0) {
        this.$message({
          type: "warning",
          message: "请至少选择一条数据"
        });
      } else {
        this.$confirm("此操作将永久删除该记录,是否继续", "提示", {
          confirmButtonText: "确定",
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: "取消",
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            this.loading = true;
            var deleteList = [];
            for (var i in selection) {
              deleteList.push(selection[i].id);
            }
            var params = deleteList;
            var requestStr = "../api/WorkOrder/DeleteWorkOrder";
            rt.post(requestStr, params)
              .then(res => {
                rt.showSuccessToast(res);
                this._fetchRecords();
              })
              .catch(error => {
                rt.showErrorToast(error);
                this.loading = false;
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    // 只有制单状态并且未派工状态下可以删除服务单
    selecTable: function(row) {
      if (row.new_dealstatustext == "制单") {
        return true;
      } else {
        return false;
      }
      //  return true
    },
    //结束时间change事件
    endDateCheck: function(from, to) {
      if (this.queryForm[from] && this.queryForm[to]) {
        if (this.queryForm[from] > this.queryForm[to]) {
          rt.showErrorToast("结束时间必须大于等于开始时间");
          this.queryForm[to] = null;
        }
      }
    },
    //开始时间change事件
    startDateCheck: function(from, to) {
      if (this.queryForm[from] && this.queryForm[to]) {
        if (this.queryForm[from] > this.queryForm[to]) {
          rt.showErrorToast("开始时间必须小于等于结束时间");
          this.queryForm[from] = null;
        }
      }
    },
    //编辑记录
    gotoEditPage: function(row) {
      this.$router.push({ name: "orderedit", params: { id: row.id } });
    },
    //双击某一行数据,跳转编辑页面
    doubleClick: function(row) {
      this.$router.push({ name: "orderedit", params: { id: row.id } });
    },
    //排序
    handleSortChange: function(sort) {
      if (!sort.prop) {
        return;
      }
      this.orderby = sort.prop + "," + sort.order;
      this.serviceData = [];
      this._fetchRecords();
    },
    //重置查询选项
    handleReset: function() {
      this.$refs["queryForm"].resetFields();
      this.$refs.grid.quickSearch = "";
      this._fetchRecords();
    },
    showExcelImportDialog() {
      this.$refs.excelImport.show();
    },
    //下载导入模板
    downloadTemplate() {
      window.open("../template/服务单导入模板.xlsx");
    },
    openWorkOrderList: function(type) {
      this.workOrderType = type;
      this._fetchRecords();
    },
    refresh: function() {
      this._fetchWorkOrderHome();
    },

    //加载数据
    _fetchWorkOrderHome: function() {
      var requestStr = "../api/WorkOrder/GetWorkOrderHome";
      rt.get(requestStr)
        .then(res => {
          this.editForm = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    handleCollapse() {
      this.showHidden = !this.showHidden;
    }
  }
};
</script>
<style>
.el-col {
  font-size: 14px;
  color: #555;
}
.service h3 {
  padding: 8px 0;
  font-weight: bold;
  font-size: 15px;
}
.service a {
  text-decoration: underline;
  color: #20a0ff;
}

.el-row {
  padding: 5px 0;
}

.header-margin {
  margin-top: 5px;
}

.table-content2 {
  padding-left: 20px;
  padding-right: 20px;
  background: #fff;
}

#refresh {
  position: relative;
  z-index: 100;
  float: right;
  color: black;
  text-decoration: none;
  margin-right: 20px;
  margin-top: -10px;
  font-size: 14px;
  color: #555;
}

#servicemore:hover {
  color: #20a0ff;
  text-decoration: underline;
}

#servicename {
  font-size: 12px;
}

#servicename:hover {
  color: #20a0ff;
  text-decoration: underline;
}

.el-table th,
.el-table td {
  height: 36px !important;
  color: #555;
  font-size: 12px;
}

.el-table th > .cell {
  line-height: 36px !important;
}

.el-table .info-row {
  background: #fafafa;
}

.el-table .positive-row {
  background: #fff;
}

@media screen and (min-width: 1920px) {
  .header-margin {
    margin-top: 5px;
  }
  .table-content2 {
    padding-left: 20px;
    padding-right: 20px;
    background: #fff;
  }
}
</style>

