<template>
  <div>
    <rt-header :title="$t('new_srv_workorder')">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button text="物流信息" type="" @click="goToLogisticsInfo()" />
        <rt-button type="add" @click="gotoAddPage()" />
        <rt-button  type="save" @click="SaveData('editForm')" />
        <rt-button  type="btnsingle" @click="orderTakeWorkOrder()" />
        <rt-button  type="btnslip" @click="slipWorkOrderVerify()" />
        <rt-button  type="btndispatch" @click="dispatchWorkOrder()" />
        <!-- <rt-button type="submit" @click="onSave('editForm')" /> -->
        <rt-button  type="btncompleted" @click="confirmWorkOrderVerify()" />
        <rt-button  text="技术支持-提交" type="submit" @click="techSubmit()"/>
        <rt-button  text="虚假单申诉" type="submit" @click="complain()"/>
      </rt-toolbar>
    </rt-header>

    <rt-content>
      <!--侧边栏-->
      <rt-nav slot="side" ref="_rt_nav">
        <rt-nav-item href="#area1">基本信息</rt-nav-item>
        <rt-nav-item href="#areaProcess" v-if="isEditForm">处理过程跟进</rt-nav-item>
        <rt-nav-item href="#areaResult" v-if="isEditForm&&editForm.new_type!=16&&editForm.new_type!=17">处理结果</rt-nav-item>
        <rt-nav-item v-if="editForm.new_type==16" href="#airacdsmsj">厨电上门设计</rt-nav-item>  
        <rt-nav-item v-if="editForm.new_type==17 " href="#areats">厨电调试</rt-nav-item> 
        <rt-nav-item href="#area9" v-if="isEditForm">服务互动</rt-nav-item>
        <rt-nav-item href="#area5" v-if="isEditForm">服务工程师</rt-nav-item>
        <rt-nav-item href="#area10" v-if="editForm.new_type!=4&&isEditForm&&editForm.new_type!=16&&editForm.new_type!=17&&editForm.new_type!=10">申请记录</rt-nav-item>
        <rt-nav-item href="#area6" v-if="isEditForm&&editForm.new_type!=16&&editForm.new_type!=17">套机产品明细</rt-nav-item>
        <rt-nav-item href="#area7" v-if="editForm.new_type!=4&&isEditForm&&editForm.new_type!=16&&editForm.new_type!=17&&editForm.new_type!=10">故障明细</rt-nav-item>
        <rt-nav-item href="#area8" v-if="editForm.new_type!=4&&isEditForm&&editForm.new_type!=16&&editForm.new_type!=17&&editForm.new_type!=10">换件明细</rt-nav-item>
        <rt-nav-item href="#historyRoot" v-if="isEditForm">历史服务单</rt-nav-item>
        <rt-nav-item href="#area13" v-if="isEditForm">修改记录</rt-nav-item>
        <rt-nav-item v-if="editForm.new_type==10" href="#area15">区域信息</rt-nav-item>
        <rt-nav-item v-if="editForm.new_type==10" href="#area16">内机信息</rt-nav-item>
        <rt-nav-item v-if="editForm.new_type==10" href="#area17">外机信息</rt-nav-item>
        <rt-nav-item href="#area14" v-if="isEditForm">附件</rt-nav-item>
      </rt-nav>

      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="120px" label-position="left">
        <rt-section id="area1" title="基本信息">
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
                    <el-input type="textarea" v-model="editForm.new_contactmemo" disabled></el-input>
                </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="50">
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
          </el-row>

          <el-row :gutter="50">
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
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="电商订单号" prop="new_dsorderno">
                <el-input v-model="editForm.new_dsorderno" :disabled="isEditForm&&!isReceipt"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="物流状态" prop="new_logisticsstatus">
                   <el-select v-model="editForm.new_logisticsstatus" clearable :disabled="isEditForm&&!isReceipt">
                        <el-option v-for="item in pickListOptions['new_logisticsstatus']" :key="item.Value" :label="item.Text" :value="item.Value">
                            {{item.Text}}
                        </el-option>
                    </el-select>
                    <!-- <el-input v-model="editForm.new_logisticsstatus" :disabled="isEditForm&&!isReceipt"></el-input> -->
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="妥投/物流签收日期">
                    <el-date-picker v-model="editForm.new_deliverydate" :editable="false" class="rt-portal-item-date" type="datetime" placeholder="选择日期" :disabled="isEditForm&&!isReceipt"></el-date-picker>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="产品大类" prop="new_productgroup_id">
                <el-input v-model="editForm.new_productgroup_idName" readonly @keyup.enter.native="quickChooseProductgroup" :disabled="isEditForm" icon="search" :on-icon-click="productgroupLookup"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品类型" prop="new_productmodel_idName">
                  <el-input v-model="editForm.new_productmodel_idName" readonly @keyup.enter.native="quickChooseProductgroup" :disabled="isEditForm" icon="search" :on-icon-click="productModelLookup"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务项目" prop="new_serviceitem">
                <el-select v-model="editForm.new_serviceitem" clearable :disabled="isEditForm">
                  <el-option v-for="item in pickListOptions['new_serviceitem']" :key="item.Value" :label="item.Text" :value="item.Value">
                    {{item.Text}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="来源途径" prop="new_source">
                <el-select v-model="editForm.new_source" clearable disabled="">
                  <el-option v-for="item in pickListOptions['new_source']" :key="item.Value" :label="item.Text" :value="item.Value">
                    {{item.Text}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="!isEditForm">
              <el-form-item label="服务类型" prop="new_type">
                <el-select v-model="editForm.new_type" clearable>
                  <el-option v-for="item in options" :key="item.Value" :label="item.Text" :value="item.Value">{{item.Text}}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="isEditForm">
              <el-form-item label="服务类型" prop="new_type">
                <el-select v-model="editForm.new_type" clearable disabled="">
                  <el-option v-for="item in pickListOptions['new_type']" :key="item.Value" :label="item.Text" :value="item.Value">
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
          </el-row>
          <el-row :gutter="50">
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
              <el-form-item label="购买时间" :rules="editForm.new_type!=5?[{ type:'date',required: true, message: '', trigger: 'change'}]:[]">
                <el-date-picker v-model="editForm.new_purchase_date" :editable="false" :disabled="isEditForm&&!isReceipt" class="rt-portal-item-date" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>          
          <el-row :gutter="50">
            <el-col :span="8">
                <el-form-item label="台数" prop="new_count">
                    <el-input v-model.number="editForm.new_count" :disabled="isEditForm&&!isReceipt"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="空调匹数" :rules="editForm.new_productgroup_idName=='家用空调'?[{ type:'date',required: true, message: '', trigger: 'change'}]:[]">
                    <el-select v-model="editForm.new_conditionpower" clearable :disabled="isEditForm&&!isReceipt">
                        <el-option v-for="item in pickListOptions['new_conditionpower']" :key="item.Value" :label="item.Text" :value="item.Value">
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
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
                <el-form-item label="服务单号" prop="new_name">
                    <el-input v-model="editForm.new_name" disabled=""></el-input>
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
          </el-row>
          <el-row :gutter="50">  
            <el-col :span="8">
                <el-form-item label="原安装单位">
                    <el-input v-model="editForm.new_ownstation_idName" readonly :disabled="true" icon="search"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="安装日期" prop="new_installdate" :rules="editForm.new_type==4&&isCompleteWorkOrder? ruleRequireDate:null">
                    <el-date-picker v-model="editForm.new_installdate" :disabled="(isEditForm&&!isReceipt)||editForm.new_type!=4" :editable="false" class="rt-portal-item-date" type="date" placeholder="选择日期" ></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="微博账号">
                    <el-input v-model="editForm.new_weibo" :disabled="isEditForm"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
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
          </el-row>
          <el-row :gutter="50">
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
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
                <el-form-item label="工程工单" prop="new_isengineering">
                    <el-checkbox v-model="editForm.new_isengineering" :disabled="(editForm.new_dealstage==11||editForm.new_dealstage==12||editForm.new_dealstage==13||editForm.new_dealstage==14)?true:false"></el-checkbox>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="工程合同号">
                    <el-input v-model="editForm.new_engineeringcode"  :disabled="(editForm.new_dealstage==11||editForm.new_dealstage==12||editForm.new_dealstage==13||editForm.new_dealstage==14||editForm.new_isengineering!=true)?true:false"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="处理级别" prop="new_deallevel">
                    <el-select v-model="editForm.new_deallevel" clearable :disabled="true">
                        <el-option v-for="item in pickListOptions['new_deallevel']" :key="item.Value" :label="item.Text" :value="item.Value">
                            {{item.Text}}
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="24">
                <el-form-item label="服务描述" prop="new_memo">
                    <el-input type="textarea" v-model="editForm.new_memo" :disabled="isEditForm&&!isReceipt"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="24">
                <el-form-item label="故障排查内容" prop="new_description">
                    <el-input type="textarea" v-model="editForm.new_description" disabled></el-input>
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
                        <el-select v-model="editForm.new_coolanttype" clearable disabled>
                            <el-option v-for="item in pickListOptions['new_coolanttype']" :key="item.Value" :label="item.Text" :value="item.Value">
                                {{item.Text}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电商产品型号">
                        <el-input v-model="editForm.new_ecmodel" readonly disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="50">
                <el-col :span="8">
                    <el-form-item label="受理人" prop="new_systemuser_id">
                        <el-input v-model="editForm.new_systemuser_idName" readonly @keyup.enter.native="quickSystemuser" icon="search" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="受理日期" prop="new_accepttime">
                        <el-date-picker v-model="editForm.new_accepttime" :editable="false" class="rt-portal-item-date" type="datetime" placeholder="选择日期" :disabled="true"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="产品">
                        <el-input v-model="editForm.new_product" readonly disabled></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="服务完工地址（定位获取）">
                        <el-input type="textarea" v-model="editForm.new_address" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


        </rt-section>

        <rt-section id="areaProcess" title="处理过程跟进" v-if="isEditForm">
            <el-row :gutter="50">
                <el-col :span="8">
                    <el-form-item label="处理阶段">
                        <el-select v-model="editForm.new_dealstage" clearable :disabled="true">
                            <el-option v-for="item in pickListOptions['new_dealstage']" :key="item.Value" :label="item.Text" :value="item.Value">
                                {{item.Text}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="处理状态">
                        <el-select v-model="editForm.new_dealstatus" clearable :disabled="true">
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
            </el-row>
            <el-row :gutter="50">
                <el-col :span="8">
                    <el-form-item label="派单时间">
                        <el-date-picker v-model="editForm.new_singletime" :editable="false" :disabled="true" class="rt-portal-item-date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="派单网点" prop="new_station_idName">
                        <el-input v-model="editForm.new_station_idName" readonly :disabled="isEditForm" icon="search"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="网点电话" prop="new_station_tel">
                        <el-input v-model="editForm.new_station_tel" readonly disabled></el-input>
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
                    <el-form-item label="工程师完工结果">
                        <el-input v-model="editForm.new_auditpoint" readonly disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="首次督办时间">
                        <el-date-picker v-model="editForm.new_supervisiontime" :editable="false" disabled class="rt-portal-item-date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="督办完成超期考核">
                        <el-checkbox v-model="editForm.new_issupervisor" :disabled="true"></el-checkbox>
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
                    <el-form-item label="中心完工说明" :rules="isCompleteWorkOrder? ruleRequire:null">
                        <el-input type="textarea" v-model="editForm.new_completiondesc_sc" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="总部完工说明" :rules="isCompleteWorkOrder? ruleRequire:null">
                        <el-input type="textarea" v-model="editForm.new_completiondesc" disabled></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="用户满意度" prop="new_csi">
                        <el-select v-model="editForm.new_csi" clearable :disabled="true">
                            <el-option v-for="item in pickListOptions['new_csi']" :key="item.Value" :label="item.Text" :value="item.Value">
                                {{item.Text}}
                            </el-option>
                        </el-select>
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
                        <el-input v-model.number="editForm.new_transfers_number" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="50">
                <el-col :span="8">
                    <el-form-item label="重电次数">
                        <el-input v-model="editForm.new_rechargecycles" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="退单次数">
                        <el-input v-model.number="editForm.new_retreatnumber" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="回访退单次数">
                        <el-input v-model.number="editForm.new_survey_returntimes" readonly disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="50">
                <el-col :span="8">
                    <el-form-item label="跟踪警告次数">
                        <el-input v-model.number="editForm.new_trace_warningtimes" readonly disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="督办预警次数">
                        <el-input v-model.number="editForm.new_supervise_warningtimes" readonly disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="督办次数">
                        <el-input v-model.number="editForm.new_supervise" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </rt-section>

        <rt-section id="areaResult" title="处理结果" :collapsed="true" v-if="isEditForm&&editForm.new_type!=16&&editForm.new_type!=17">
            <el-row :gutter="50">
                <el-col :span="8">
                    <el-form-item label="安装量" prop="new_installqty">
                        <el-input v-model="editForm.new_installqty" readonly disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="保内维修量" prop="new_inwarranty_qty">
                        <el-input v-model="editForm.new_inwarranty_qty" readonly disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="保外维修量" prop="new_outwarranty_qty">
                        <el-input v-model="editForm.new_outwarranty_qty" readonly disabled></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="收费金额">
                        <el-input v-model.number="editForm.new_charge" :disabled="(editForm.new_dealstage==11||editForm.new_dealstage==12||editForm.new_dealstage==13||editForm.new_dealstage==14)?true:false"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="收费备注">
                        <el-input v-model="editForm.new_chargedesc" :disabled="(editForm.new_dealstage==11||editForm.new_dealstage==12||editForm.new_dealstage==13||editForm.new_dealstage==14)?true:false"></el-input>
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
                    <el-form-item label="是否生成回访单" prop="new_isreturnvisit">
                        <el-checkbox v-model="editForm.new_isreturnvisit" :disabled="isEditForm"></el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="回访结果类型">
                        <el-select v-model="editForm.new_resulttype" clearable :disabled="isEditForm">
                            <el-option v-for="item in pickListOptions['new_resulttype']" :key="item.Value" :label="item.Text" :value="item.Value">
                                {{item.Text}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="回访用户好评率">
                        <el-input v-model="editForm.new_appraisetext" disabled></el-input>
                        <!-- <el-select v-model="editForm.new_appraise" clearable :disabled="isEditForm">
                            <el-option v-for="item in pickListOptions['new_appraise']" :key="item.Value" :label="item.Text" :value="item.Value">
                                {{item.Text}}
                            </el-option>
                        </el-select> -->
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
                    <el-form-item label="虚假申诉理由" prop="new_complain_memo">
                        <el-input v-model="editForm.new_complain_memo" :disabled="editForm.new_unrealstatus==1?false:true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </rt-section>

        <rt-section id="airacdsmsj" title="厨电上门设计" v-if="isEditForm" v-show="IsShow">
            <el-row :gutter="50">
            <el-col :span="30">
                <el-form-item label="满足安装条件" prop="new_isinstallcondition">
                    <el-checkbox v-model="selectAll"  :disabled="isEditForm&&!isReceipt&&!isNeedReceipt"></el-checkbox>
                </el-form-item>
                </el-col>
                </el-row>
            <el-row :gutter="100">
            <el-col :span="8" >
                <el-form-item label="安装尺寸长度小于895mm" prop="new_isinstalllength"  >
                    <el-checkbox v-model="editForm.new_isinstalllength" :disabled="isEditForm&&!isReceipt&&!isNeedReceipt" ></el-checkbox>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="机器离烟道（排烟孔）距离小于200mm" prop="new_isdistancetoflue">
                    <!-- <el-checkbox v-model="editForm.new_isdistancetoflue" id=""></el-checkbox> -->
                    <el-checkbox v-model="editForm.new_isdistancetoflue" :disabled="isEditForm&&!isReceipt&&!isNeedReceipt"></el-checkbox>
                </el-form-item>
                </el-col>

                <el-col :span="8">
                <el-form-item label="燃气表（管道）离机器距离小于300mm" prop="new_isdistancetopipe">
                    <el-checkbox v-model="editForm.new_isdistancetopipe" :disabled="isEditForm&&!isReceipt&&!isNeedReceipt" ></el-checkbox>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row :gutter="50">
                <el-col :span="24">
                <el-form-item label="注意项">
                    <el-input type="textarea" v-model="editForm.new_cdmemo" :disabled="true"></el-input>
                </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="50">
                <el-col :span="8">
                <el-form-item label="用户厨房电源线径（m㎡）" prop="new_wirediameter">
                    <el-select v-model="editForm.new_wirediameter" clearable :disabled="isEditForm&&!isReceipt&&!isNeedReceipt">
                    <el-option v-for="item in pickListOptions['new_wirediameter']" :key="item.Value" :label="item.Text" :value="item.Value">
                        {{item.Text}}
                    </el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="气源类型" prop="new_airsupply">
                    <el-select v-model="editForm.new_airsupply" clearable :disabled="isEditForm&&!isReceipt&&!isNeedReceipt">
                    <el-option v-for="item in pickListOptions['new_airsupply']" :key="item.Value" :label="item.Text" :value="item.Value">
                        {{item.Text}}
                    </el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="机器尺寸（mm)" prop="new_machinesize">
                    <el-select v-model="editForm.new_machinesize" clearable :disabled="isEditForm&&!isReceipt&&!isNeedReceipt">
                    <el-option v-for="item in pickListOptions['new_machinesize']" :key="item.Value" :label="item.Text" :value="item.Value">
                        {{item.Text}}
                    </el-option>
                    </el-select>
                </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="50">
                <el-col :span="8">
                <el-form-item label="排烟孔方向" prop="new_holedirection">
                    <el-select v-model="editForm.new_holedirection" clearable :disabled="isEditForm&&!isReceipt&&!isNeedReceipt">
                    <el-option v-for="item in pickListOptions['new_holedirection']" :key="item.Value" :label="item.Text" :value="item.Value">
                        {{item.Text}}
                    </el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="烟道开孔尺寸（mm)" prop="new_holesize">
                    <el-select v-model="editForm.new_holesize" clearable :disabled="isEditForm&&!isReceipt&&!isNeedReceipt">
                    <el-option v-for="item in pickListOptions['new_holesize']" :key="item.Value" :label="item.Text" :value="item.Value">
                        {{item.Text}}
                    </el-option>
                    </el-select>
                </el-form-item>
                </el-col>
            </el-row>
        </rt-section>

      </el-form>

      <div v-show="IsShow2">
         <!-- 厨电调试 -->
        <KitchenDebugModel ref="KitchenDebugModel" :workOrder="{id:this.new_srv_workorderid}" v-if="editForm.new_type!=4&&isEditForm&&editForm.new_type==17"></KitchenDebugModel>
      </div>

      <div v-if="showComponents_3">
        <!--服务互动-->
        <InteractionModel ref="interactionModel" :workOrder="{id:this.new_srv_workorderid,name:this.editForm.new_name,new_dealstage:this.editForm.new_dealstage,usedApp:this.usedApp}" v-if="isEditForm"></InteractionModel>
      </div>

      <div v-if="showComponents_1">
        <!--服务工程师-->
        <OutsideLineModel ref="outsideLineModel" :workOrder="{id:this.new_srv_workorderid,name:this.editForm.new_name,new_dealstage:this.editForm.new_dealstage,usedApp:this.usedApp}" v-if="isEditForm"></OutsideLineModel>
        <!-- 套机产品明细 -->
        <WorkOrder2UserprofileModel ref="WorkOrder2UserprofileModel" :workOrder="{id:this.new_srv_workorderid,name:this.editForm.new_name,new_type:this.editForm.new_type,new_dealstage:this.editForm.new_dealstage,usedApp:this.usedApp,new_purchase_date:this.editForm.new_purchase_date}" @gotoNewOrder="gotoNewOrder" v-if="isEditForm&&this.editForm.new_type!=10&&this.editForm.new_type!=16&&this.editForm.new_type!=17"></WorkOrder2UserprofileModel>
      </div>

      <div v-if="showComponents_3">
          <!-- <div> -->
        <!-- 配件申请记录 -->
        <partsapplyModel ref="partsapplyModel" :workOrder="{id:this.new_srv_workorderid,name:this.editForm.new_name,new_dealstage:this.editForm.new_dealstage,usedApp:this.usedApp}" v-if="editForm.new_type!=4&&isEditForm&&editForm.new_type!=10&&editForm.new_type!=16&&editForm.new_type!=17"></partsapplyModel>
        <!-- <partsapplyModel ref="partsapplyModel" :workOrder="{id:this.new_srv_workorderid,name:this.editForm.new_name,new_dealstage:this.editForm.new_dealstage,usedApp:this.usedApp}"></partsapplyModel> -->
      </div>
    
      <div v-if="showComponents_2&&editForm.new_type!=10">
        <!-- 故障明细 -->
        <troubleModel :workOrder="{id:this.new_srv_workorderid,name:this.editForm.new_name,new_dealstage:this.editForm.new_dealstage,usedApp:this.usedApp,new_tech_approvalstatus:this.editForm.new_tech_approvalstatus}" v-if="editForm.new_type!=4&&isEditForm&&editForm.new_type!=16&&editForm.new_type!=17"></troubleModel>
        <!-- 换件明细 -->
        <partLineModel ref="partLineModel" :workOrder="{id:this.new_srv_workorderid,name:this.editForm.new_name,new_dealstage:this.editForm.new_dealstage,usedApp:this.usedApp,new_tech_approvalstatus:this.editForm.new_tech_approvalstatus}" @reLoad="reloadPartsApply" v-if="editForm.new_type!=4&&isEditForm&&editForm.new_type!=16&&editForm.new_type!=17"></partLineModel>
      </div>      

      <div>
          <history-modal ref="historyModel" :workOrder="{id:this.new_srv_workorderid,name:this.editForm.new_name,new_dealstage:this.editForm.new_dealstage,usedApp:this.usedApp}"></history-modal>
      </div>      

      <div v-if="editForm.new_type==10">
        <areaInfoModel :workOrder="{id:this.new_srv_workorderid,name:this.editForm.new_name,new_dealstage:this.editForm.new_dealstage,usedApp:this.usedApp}" @reload="reloadAreaInfo"></areaInfoModel>
        <insideInfoModel ref="insideInfoModel" :workOrder="{id:this.new_srv_workorderid,name:this.editForm.new_name,new_dealstage:this.editForm.new_dealstage,usedApp:this.usedApp}" @reLoad="reloadOutSideInfo"></insideInfoModel>
        <outsideInfoModel ref="outsideInfoModel" :workOrder="{id:this.new_srv_workorderid,name:this.editForm.new_name,new_dealstage:this.editForm.new_dealstage,usedApp:this.usedApp}" @reLoad="reloadInSideInfo"></outsideInfoModel>
      </div>
      
      <div v-if="showComponents_4">
        <!--修改记录-->
        <workorderLogModel :workOrder="{id:this.new_srv_workorderid,name:this.editForm.new_name,new_dealstage:this.editForm.new_dealstage,usedApp:this.usedApp}" v-if="isEditForm"></workorderLogModel>
        <!--附件-->
        <attachment :workOrder="{id:this.new_srv_workorderid,name:this.editForm.new_name,new_dealstage:this.editForm.new_dealstage,usedApp:this.usedApp}" v-if="isEditForm"></attachment>
      </div>


    </rt-content>
    <div v-if="showComponentsDialog">
      <!--Lookup组件-->
      <ProvinceDialog ref="provinceDialog" @lookupSelect="selectProvince" @lookupSelectClear="clear"></ProvinceDialog>
      <CityDialog ref="cityDialog" @lookupSelect="selectCity" @lookupSelectClear="clearCityAndCounty" :provinceid="this.editForm.new_province_id"></CityDialog>
      <CountyDialog ref="countyDialog" @lookupSelect="selectCounty" @lookupSelectClear="clearCounty" :cityid="this.editForm.new_city_id"></CountyDialog>
      <TownDialog ref="townDialog" @lookupSelect="selectTown" @lookupSelectClear="clearTown" :countyid="this.editForm.new_county_id"></TownDialog>
      <ProductgroupDialog ref="productgroupDialog" @lookupSelect="selectProductgroup" @lookupSelectClear="clearProductgroup"></ProductgroupDialog>
      <SystemuserDialog ref="systemuserDialog" @lookupSelect="selectSystemuser" @lookupSelectClear="clearSystemuser"></SystemuserDialog>
      <StationDialog ref="stationDialog" @lookupSelect="selectStation" @lookupSelectClear="clearStation"></StationDialog>
      <productmoduleDialog ref="productmoduleDialog" @lookupSelect="selectProductModel" @lookupSelectClear="clearProductModel" :productGroup="this.editForm.new_productgroup_id"></productmoduleDialog>
      <!--dialog-->
      <dispatchDialog ref="dispatchDialog" :workOrder="{id:this.new_srv_workorderid,name:this.editForm.new_name}" :workerList="this.$refs.OutsideLineModel" @reLoad="reloadOutSideLine"></dispatchDialog>
      <infoDialog ref="infoDialog" :infoDialog="infoDialog"></infoDialog>
    </div>
  </div>
</template>
 <script>
export default {
  data: function() {
    return {
      //分批次加载组件
      showComponents_1: false,
      showComponents_2: false,
      showComponents_3: false,
      showComponents_4: false,
      showComponentsDialog: false,
      pickListOptions: {},
      contentHeight: rt.getScreenHeight - 100,

      //按钮禁用
      disabledDispatch: false,
      disabledsingle: false,
      disabledslip: false,
      disabledispatch: false,
      disabledcompleted: false,
      disabledsubmit: false,
      disabledbutton: false,

      //按钮显示隐藏控制数据
      showSave: false, //保存按钮，默认隐藏
      isSaved: false,

      //主档数据
      new_srv_workorderid: "", //主档id
      isEditForm: false, //是否编辑页面
      isReceipt: false, //接单
      isNeedReceipt: false, //待接单
      usedApp: true,
      /**/
      /**/
      //lookup对于网点字段
      lookupItem: "",
      editForm: {
        new_contactmemo: "",
        new_province_id: "",
        new_province_idname: "",
        new_city_id: "",
        new_city_idname: "",
        new_county_id: "",
        new_county_idname: "",
        new_town_id: "",
        new_town_idname: "",
        new_productgroup_id: "",
        new_productgroup_idName: "",
        new_systemuser_id: "",
        new_systemuser_idName: "",
        new_srv_station_id1: "",
        new_srv_station_id1Name: "",
        new_srv_station_id2: "",
        new_srv_station_id2Name: "",
        new_station_id: "",
        new_station_idName: "",
        new_productmodel_id: "",
        new_productmodel_idName: "",
        new_businessunit_id: "",
        new_businessunit_idName: "",
        new_accepttime: "",
        owneridName: "",
        ownerid: "",
        oldTownId: "",
        new_timequantum: null,
        new_viplevel: null
        // new_source: 7
      },
      options: [],
      auditpointOptions: [],

      rules: {
        new_type: [
          {
            type: "number",
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_contact: [
          {
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_phone: [
          {
            required: true,
            message: "请填写反馈人电话",
            trigger: "change"
          }
        ],
        new_type: [
          {
            type: "number",
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_count: [
          {
            type: "number",
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_province_id: [
          {
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_city_id: [
          {
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_county_id: [
          {
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_town_id: [
          {
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_purchase_date: [
          {
            type: "date",
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        //new_channeltype: [
        //{
        //  type: "number",
        //  required: true,
        //  message: "",
        //  trigger: "change"
        // }
        // ],
        new_requiretime: [
          {
            type: "date",
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_timequantum: [
          {
            type: "number",
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_memo: [
          {
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_productgroup_id: [
          {
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_source: [
          {
            type: "number",
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_accepttime: [
          {
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_complateaddress: [
          {
            required: true,
            message: "",
            trigger: "change"
          }
        ]
      },
      ruleRequire: {
        required: true,
        message: "",
        trigger: "change"
      },
      ruleRequireNumber: {
        type: "number",
        required: true,
        message: "",
        trigger: "change"
      },
      ruleRequireDate: {
        type: "date",
        required: true,
        message: "",
        trigger: "change"
      },
      isRequiretimeChange: true, //是否变更预约上门日期
      isCompleteWorkOrder: false, //是否完工确认操作
      isSlipWorkOrder: false,
      isTechSubmit: false,
      infoDialog: {
        visible: false,
        workId: ""
      }
    };
  },
  components: {
    infoDialog: resolve => {
      require(["./logisticsInfoDialog.vue"], resolve);
    }, //物流信息
    historyModal: resolve => {
      require(["./historyModal.vue"], resolve);
    }, //历史服务单
    OutsideLineModel: resolve => {
      require(["../outsideLineModel.vue"], resolve);
    }, //服务工程师
    WorkOrder2UserprofileModel: resolve => {
      require(["../WorkOrder2UserprofileModel.vue"], resolve);
    }, //套机产品明细
    troubleModel: resolve => {
      require(["../troubleModel.vue"], resolve);
    }, //故障明细
    partLineModel: resolve => {
      require(["../partLineModel.vue"], resolve);
    }, // 换件明细
    InteractionModel: resolve => {
      require(["../interactionModel.vue"], resolve);
    }, //服务互动
    partsapplyModel: resolve => {
      require(["../partsapplyModel.vue"], resolve);
    }, //配件申请
    KitchenDebugModel: resolve => {
      require(["../KitchenDebugModel.vue"], resolve);
    }, //厨电调试
    workorderLogModel: resolve => {
      require(["../workorderLogModel.vue"], resolve);
    }, //修改记录
    attachment: resolve => {
      require(["../attachment.vue"], resolve);
    }, //
    dispatchDialog: resolve => {
      require(["../dispatchDialog.vue"], resolve);
    }, //服务工程师
    areaInfoModel: resolve => {
      require(["../areaInfoModel.vue"], resolve);
    }, //区域信息
    insideInfoModel: resolve => {
      require(["../insideInfoModel.vue"], resolve);
    }, //内机信息
    outsideInfoModel: resolve => {
      require(["../outsideInfoModel.vue"], resolve);
    }, //外机信息
    //lookup Dialog
    ProvinceDialog: resolve => {
      require(["../../dialog/provinceDialog.vue"], resolve);
    },
    CityDialog: resolve => {
      require(["../../dialog/cityDialog.vue"], resolve);
    },
    CountyDialog: resolve => {
      require(["../../dialog/countyDialog.vue"], resolve);
    },
    TownDialog: resolve => {
      require(["../../dialog/townDialog.vue"], resolve);
    },
    ProductgroupDialog: resolve => {
      require(["../../dialog/productgroupDialog.vue"], resolve);
    },
    SystemuserDialog: resolve => {
      require(["../../dialog/systemUserDialog.vue"], resolve);
    },
    StationDialog: resolve => {
      require(["../../dialog/stationDialog.vue"], resolve);
    },
    productmoduleDialog: resolve => {
      require(["../../dialog/productmoduleDialog.vue"], resolve);
    }
  },
  computed: {
    selectAll: {
      get: function() {
        var arrayObj = new Array(3);
        var checked = this.editForm;
        if (checked != undefined && checked != null) {
          arrayObj[0] = checked.new_isinstalllength;
          arrayObj[1] = checked.new_isdistancetoflue;
          arrayObj[2] = checked.new_isdistancetopipe;
        } else {
          arrayObj[0] = false;
          arrayObj[1] = false;
          arrayObj[2] = false;
        }
        if (istrue(true, arrayObj)) {
          this.editForm.new_isinstallcondition = false;
          return false;
        } else {
          this.editForm.new_isinstallcondition = true;
          return true;
        }
      },
      set: function(value) {
        if (value) {
          this.editForm.new_isinstalllength = false;
          this.editForm.new_isdistancetoflue = false;
          this.editForm.new_isdistancetopipe = false;
        }
      }
    },
    IsDisabled: {
      get: function() {
        if (this.editForm.new_isinstallcondition) {
          return false;
        } else {
          return true;
        }
      }
    },
    //厨电模块div 上门设计 显示或者隐藏
    IsShow: {
      get: function() {
        if (this.editForm.new_type == 16) {
          return true;
        } else {
          return false;
        }
      }
    },
    //厨电模块div 调试 显示或者隐藏
    IsShow2: {
      get: function() {
        if (this.editForm.new_type == 17) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  mounted: function() {
    this.getPickListOptions();
    this._fetchRecords();
    this.showComponents();
  },
  created: function() {
    this.getworkorderid();
  },
  watch: {
    $route(to, from) {
      this.$router.go(0);
    },
    "editForm.new_purchase_date": {
      handler(newValue, oldValue) {
        if (newValue && newValue > new Date()) {
          rt.showErrorToast("购买日期不能大于当前日期");
          this.editForm.new_purchase_date = null;
        }
      },
      deep: true
    },
    "editForm.new_installdate": {
      handler(newValue, oldValue) {
        if (newValue && newValue > new Date()) {
          rt.showErrorToast("安装日期不能大于当前日期");
          this.editForm.new_installdate = null;
        }
      },
      deep: true
    },
    "editForm.new_requiretime": {
      handler(newValue, oldValue) {
        if (!this.isRequiretimeChange) {
          this.isRequiretimeChange = true;
          return;
        }
        var date = new Date(); //获取当前时间
        date.setDate(date.getDate() - 1); //设置天数 -1 天
        if (newValue && newValue <= date) {
          rt.showErrorToast("预约上门日期不能小于当前日期");
          this.editForm.new_requiretime = null;
        }
      },
      deep: true
    },
    "editForm.new_type": {
      handler(newValue, oldValue) {
        if (!newValue) {
          return;
        }
        this.auditpointOptions = [
          {
            Value: 1,
            Text: "正常完工-故障修复",
            disabled: newValue != 3 && newValue != 5 && newValue != 12
          },
          {
            Value: 2,
            Text: "正常完工-保养",
            disabled: newValue != 3 && newValue != 5
          },
          {
            Value: 3,
            Text: "正常完工-安装",
            disabled: newValue != 3 && newValue != 4
          },
          {
            Value: 4,
            Text: "正常完工-退机",
            disabled: newValue != 3 && newValue != 4 && newValue != 5
          },
          {
            Value: 5,
            Text: "正常完工-换机",
            disabled: newValue != 3 && newValue != 4 && newValue != 5
          },
          {
            Value: 6,
            Text: "正常完工-移机",
            disabled: newValue != 3 && newValue != 5
          },
          {
            Value: 7,
            Text: "正常完工-退赔费用",
            disabled: newValue != 3 && newValue != 4 && newValue != 5
          },
          {
            Value: 8,
            Text: "正常完工-设计完成",
            disabled: newValue != 10 && newValue != 16
          },
          {
            Value: 9,
            Text: "正常完工-上门解释",
            disabled: newValue != 3 && newValue != 5
          },
          {
            Value: 10,
            Text: "正常完工-电话解释",
            disabled:
              newValue != 1 &&
              newValue != 2 &&
              newValue != 3 &&
              newValue != 5 &&
              newValue != 6 &&
              newValue != 7
          },
          {
            Value: 11,
            Text: "正常完工-性能鉴定（效果）",
            disabled: newValue != 3 && newValue != 5
          },
          {
            Value: 12,
            Text: "正常完工-性能鉴定（其它）",
            disabled: newValue != 3 && newValue != 5
          },
          {
            Value: 13,
            Text: "正常完工-电商完工",
            disabled: newValue != 9
          },
          {
            Value: 14,
            Text: "正常完工-调试完成",
            disabled: newValue != 11 && newValue != 17
          },
          { Value: 15, Text: "正常完工-监理完成", disabled: newValue != 15 },
          { Value: 16, Text: "正常完工-物流取件", disabled: true },
          {
            Value: 17,
            Text: "取消服务-用户主动取消服务",
            disabled:
              newValue == 1 || newValue == 2 || newValue == 7 || newValue == 9
          },
          {
            Value: 18,
            Text: "取消服务-用户联系不上",
            disabled: newValue == 1
          },
          {
            Value: 19,
            Text: "取消服务-其他空调品牌",
            disabled:
              newValue == 1 ||
              newValue == 2 ||
              newValue == 7 ||
              newValue == 9 ||
              newValue == 11 ||
              newValue == 12
          },
          { Value: 20, Text: "取消服务-其他产品", disabled: true },
          { Value: 21, Text: "取消服务-地址错误", disabled: newValue == 1 },
          { Value: 22, Text: "取消服务-重单", disabled: newValue == 1 },
          { Value: 23, Text: "取消服务-工单类型选择错误" },
          { Value: 24, Text: "取消服务-其他原因", disabled: newValue == 1 }
        ];
      },
      deep: true
    }
  },
  methods: {
    goToLogisticsInfo() {
      // this.$router.push({
      //   name: "logisticsInfo",
      //   params: { id: this.new_srv_workorderid }
      // });
      this.infoDialog = {
        visible: true,
        workId: this.new_srv_workorderid
      };
      // this.$refs.infoDialog.show(this.new_srv_workorderid);
    },
    showComponents() {
      let _timeout = 1000;
      setTimeout(() => {
        this.showComponentsDialog = true;
      }, _timeout);
      _timeout += 1000;
      setTimeout(() => {
        this.showComponents_1 = true;
      }, _timeout);
      _timeout += 1000;
      setTimeout(() => {
        this.showComponents_2 = true;
      }, _timeout);
      _timeout += 1000;
      setTimeout(() => {
        this.showComponents_3 = true;
      }, _timeout);
      _timeout += 1000;
      setTimeout(() => {
        this.showComponents_4 = true;
        setTimeout(() => {
          this.$refs._rt_nav.load();
        }, 1000);
      }, _timeout);
    },
    //加载下拉框
    getPickListOptions() {
      var attributes =
        "new_type,new_source,new_speicaltype,new_serviceitem,new_deallevel,new_timequantum,new_viplevel,new_channeltype,new_dealstage,new_dealstatus";
      attributes +=
        ",new_engineer_appointmenttime,new_reassignment,new_audithq,new_rvisitadvise1";
      var attributes2 =
        "new_wirediameter,new_airsupply,new_machinesize,new_auditcentrality,new_overduereasons,new_status,new_surveychannel,new_resulttype,new_returnvisit,new_knotcard,new_servicestates,new_csi,new_tech_approvalstatus";
      var attributes3 =
        "new_holedirection,new_holesize,new_unrealstatus,new_conditionpower,new_logisticsstatus";
      var entityName = "new_srv_workorder";
      let that = this;
      that.$set(that.pickListOptions, "test", "");
      rt.get(
        "../api/crmpicklists/options/" + entityName + "/" + attributes
      ).then(function(res) {
        console.log(res);
        let atts = attributes.split(",");
        atts.forEach(item => {
          that.$set(that.pickListOptions, item, res[item]);
        });
      });
      rt.get(
        "../api/crmpicklists/options/" + entityName + "/" + attributes2
      ).then(function(res) {
        let atts = attributes2.split(",");
        atts.forEach(item => {
          that.$set(that.pickListOptions, item, res[item]);
        });
      });
      rt.get(
        "../api/crmpicklists/options/" + entityName + "/" + attributes3
      ).then(function(res) {
        let atts = attributes3.split(",");
        atts.forEach(item => {
          that.$set(that.pickListOptions, item, res[item]);
        });
      });
    },
    getworkorderid: function() {
      this.new_srv_workorderid = this.$route.params.id;
    },

    isPhone: function(phone) {
      var first = phone.charAt(0);
      if (first == "1") {
        var myreg = /^[1][0-9]{10}$/;
        if (!myreg.test(phone)) {
          return false;
        } else {
          return true;
        }
      }
      return true;
    },

    // GMT转换普通时间格式
    GMTToStr: function(time) {
      let date = new Date(time);
      let Str =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes();
      return Str;
    },

    //加载数据
    _fetchRecords: function() {
      if (this.new_srv_workorderid) {
        this.isEditForm = true;
        var requestStr =
          "../api/WorkOrder/GetWorkOrderById/" + this.new_srv_workorderid;
        var that = this;
        that.disabledbutton = true;
        rt.get(requestStr)
          .then(res => {
            that.editForm = res;
            that.editForm.new_purchase_date = that.editForm.new_purchase_date
              ? new Date(
                  Date.parse(that.editForm.new_purchase_date.replace(/-/g, "/"))
                )
              : null;
            that.editForm.new_requiretime = that.editForm.new_requiretime
              ? new Date(
                  Date.parse(that.editForm.new_requiretime.replace(/-/g, "/"))
                )
              : null;
            that.editForm.new_installdate = that.editForm.new_installdate
              ? new Date(
                  Date.parse(that.editForm.new_installdate.replace(/-/g, "/"))
                )
              : null;
            that.editForm.oldTownId = that.editForm.new_town_id;
            that.isRequiretimeChange = false;
            that.getFormStatus(that);
            that.setServicelength(that);

            var requestStr =
              "../api/Helper/GetFieldValue?id=" +
              this.$store.state.user.departId +
              "&entityName=new_srv_station&attributeList=new_usedapp";
            rt.get(requestStr)
              .then(function(res) {
                var array = res.Attributes;
                for (var k in array) {
                  if (array[k].Key == "new_usedapp") {
                    that.usedApp = array[k].Value;
                  }
                }
                that.disabledbutton = false;
              })
              .catch(error => {
                that.disabledbutton = false;
                rt.showErrorToast(error);
              });
          })
          .catch(error => {
            that.disabledbutton = false;
            rt.showErrorToast(error);
          });
      } else {
        this.editForm.new_accepttime = this.GMTToStr(new Date());
        this.editForm.new_source = 7; //自建-网点
        this.editForm.new_deallevel = 6; //处理级别-六级
        var departId = this.$store.state.user.departId;
        var departName = this.$store.state.user.departName;
        this.editForm.new_srv_station_id2 = departId;
        this.editForm.new_srv_station_id2Name = departName;
        this.editForm.new_station_id = departId;
        this.editForm.new_station_idName = departName;
        this.editForm.new_statement = "网点自建单";
        this.editForm.new_dealstage = 5; //派单网点
        this.editForm.new_dealstatus = 2; //处理状态
        this.editForm.new_viplevel = 1; //vip等级

        // var date = new Date();//获取当前时间
        // date.setDate(date.getDate() + 1);//设置天数
        var that = this;
        var requestStr =
          "../api/Helper/GetFieldValue?id=" +
          departId +
          "&entityName=new_srv_station&attributeList=new_iscreateorder,new_level,new_upstation_id,new_formstatus,ownerid,new_businessunit_id,new_phone,new_usedapp";
        var isCanAdd = false;
        var level = 0;
        var new_upstation_id = "";
        var new_upstation_idName = "";
        var formstatus = 0;
        that.disabledbutton = true;
        rt.get(requestStr)
          .then(function(res) {
            var date = new Date(); //获取当前时间
            date.setDate(date.getDate() + 1); //设置天数
            that.editForm.new_requiretime = date;
            that.editForm.new_timequantum = 1;
            that.editForm.new_singletime = new Date();
            var array = res.Attributes;
            for (var k in array) {
              if (array[k].Key == "new_iscreateorder") {
                isCanAdd = array[k].Value;
              }
              if (array[k].Key == "new_level") {
                level = array[k].Value.Value;
              }
              if (array[k].Key == "new_upstation_id") {
                new_upstation_id = array[k].Value.Id;
                new_upstation_idName = array[k].Value.Name;
              }
              if (array[k].Key == "new_formstatus") {
                formstatus = array[k].Value.Value;
              }
              if (array[k].Key == "ownerid") {
                that.editForm.new_systemuser_id = array[k].Value.Id;
                that.editForm.new_systemuser_idName = array[k].Value.Name;
                that.editForm.ownerid = array[k].Value.Id;
                that.editForm.owneridName = array[k].Value.Name;
              }
              if (array[k].Key == "new_businessunit_id") {
                that.editForm.new_businessunit_id = array[k].Value.Id;
                that.editForm.new_businessunit_idName = array[k].Value.Name;
              }
              if (array[k].Key == "new_phone") {
                that.editForm.new_station_tel = array[k].Value;
              }
            }
            if (!isCanAdd) {
              rt.showErrorToast("当前服务商不允许创建自建单");
              that.$router.go(-1);
            }
            if (formstatus != 1 && formstatus != 3) {
              rt.showErrorToast("当前服务商不允许创建自建单");
              that.$router.go(-1);
            }
            if (level == 1) {
              that.options = [
                {
                  Text: "安装",
                  Value: 4
                },
                {
                  Text: "维修",
                  Value: 5
                },
                {
                  Text: "返包",
                  Value: 12
                }
              ];
              that.editForm.new_srv_station_id1 = departId;
              that.editForm.new_srv_station_id1Name = departName;
            } else if (level == 2) {
              that.options = [
                {
                  Text: "安装",
                  Value: 4
                }
              ];
              //判断上级服务商是否有代结资质
              if (rt.isNullOrWhiteSpace(new_upstation_id)) {
                rt.showErrorToast("当前服务商不允许创建自建单");
                that.$router.go(-1);
              }
              that.editForm.new_srv_station_id1 = new_upstation_id;
              that.editForm.new_srv_station_id1Name = new_upstation_idName;
              that.checkUpstation(new_upstation_id);
            }
            that.disabledbutton = false;
          })
          .catch(error => {
            that.disabledbutton = false;
            rt.showErrorToast(error);
          });
      }
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
            rt.showErrorToast("当前服务商不允许创建自建单");
            that.$router.go(-1);
          }
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    CheckItem: function(e, value) {},
    getFormStatus: function(that) {
      if (
        that.editForm.new_dealstage == 6 ||
        that.editForm.new_dealstage == 7 ||
        that.editForm.new_dealstage == 10 ||
        that.editForm.new_dealstage == 15 ||
        that.editForm.new_dealstage == 16 ||
        that.editForm.new_dealstage == 17
      ) {
        that.isReceipt = true;
      } else that.isReceipt = false;
      if (that.editForm.new_dealstage == 5) {
        that.isNeedReceipt = true;
      } else that.isNeedReceipt = false;
    },
    setServicelength: function(that) {
      if (
        that.editForm.new_dealstage == 5 ||
        that.editForm.new_dealstage == 6 ||
        that.editForm.new_dealstage == 7 ||
        that.editForm.new_dealstage == 9 ||
        that.editForm.new_dealstage == 10 ||
        that.editForm.new_dealstage == 15 ||
        that.editForm.new_dealstage == 16 ||
        that.editForm.new_dealstage == 17
      ) {
        that.editForm.new_servicelength1 = (
          (new Date() - new Date(this.editForm.new_singletime)) /
          3600000
        ).toFixed(2);
      }

      if (
        that.editForm.new_dealstage != 14 &&
        that.editForm.new_dealstage != 13
      ) {
        that.editForm.new_servicelength2 = (
          (new Date() - new Date(that.editForm.new_accepttime)) /
          3600000
        ).toFixed(2);
      }
    },

    SaveData: function(formName) {
      this.isSlipWorkOrder = false;
      this.isCompleteWorkOrder = false;
      this.isTechSubmit = false;
      setTimeout(() => {
        this.onSave(formName);
      }, 200);
    },

    //保存主档信息
    onSave: function(formName) {
      if (this.disabledbutton) {
        rt.showErrorToast("请等待之前操作完成");
        return;
      }
      if (
        this.isEditForm &&
        !this.isReceipt &&
        !this.isNeedReceipt &&
        !this.editForm.new_tech_approvalstatus == 3
      ) {
        rt.showErrorToast("当前单据无法保存");
        return;
      }
      var self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            (!this.isEditForm || this.isReceipt) &&
            this.editForm.new_phone1 &&
            !rt.isNullOrWhiteSpace(this.editForm.new_phone1) &&
            !this.isPhone(this.editForm.new_phone1)
          ) {
            rt.showErrorToast("请输入正确的联系电话2");
            this.editForm.new_phone1 = null;
            return;
          }

          self.editForm.new_accepttime = rt.formatDateTime(
            self.editForm.new_accepttime,
            "yyyy-mm-dd HH:MM:ss"
          );
          self.disabledbutton = true;
          var params = self.editForm;
          /*创建*/
          if (rt.isNullOrWhiteSpace(self.new_srv_workorderid)) {
            self
              .createFormData(params)
              .then(function(res) {
                rt.showSuccessToast(self.$t("Successfullysaved"));
                self.new_srv_workorderid = res;
                self.$router.push({ name: "orderedit", params: { id: res } });
                self._fetchRecords();
                self.isSaved = true;
                self.disabledbutton = false;
              })
              .catch(error => {
                self.disabledbutton = false;
                rt.showErrorToast(error);
              });
          } else {
            /*更新*/
            params.id = self.new_srv_workorderid;
            self
              .updateFormDate(params)
              .then(function(res) {
                rt.showSuccessToast(self.$t("Successfullysaved"));
                self._fetchRecords();
                self.isSaved = true;
                self.disabledbutton = false;
              })
              .catch(error => {
                self.disabledbutton = false;
                rt.showErrorToast(error);
              });
          }
        } else {
          this.$message({
            message: this.$t("PleaseInputRequiredFields"),
            type: "error"
          });
        }
      });
    },

    //创建服务单
    createFormData: function(params) {
      return rt.post("../api/WorkOrder/CreateWorkOrder", params);
    },
    //更新服务单
    updateFormDate: function(params) {
      return rt.post("../api/WorkOrder/UpdateWorkOrder", params);
    },

    /************
      Dialog弹出框部分
    ************/
    quickChooseProvince: function() {
      if (isEditForm && !this.isReceipt) {
        return;
      }
      this.$refs.provinceDialog.show(this.editForm.new_province_idname);
    },
    quickChooseCity: function() {
      if (isEditForm && !this.isReceipt) {
        return;
      }
      this.$refs.cityDialog.show(this.editForm.new_city_idname);
    },
    quickChooseCounty: function() {
      if (this.isEditForm && !this.isReceipt) {
        return;
      }
      this.$refs.countyDialog.show(this.editForm.new_county_idname);
    },
    quickChooseTown: function() {
      if (this.isEditForm && !this.isReceipt) {
        return;
      }
      this.$refs.townDialog.show(this.editForm.new_town_idname);
    },

    //显示省Dialog
    provinceLookup: function() {
      if (this.isEditForm && !this.isReceipt && !this.isNeedReceipt) {
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
      if (this.isEditForm && !this.isReceipt && !this.isNeedReceipt) {
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
      if (this.isEditForm && !this.isReceipt && !this.isNeedReceipt) {
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
      if (this.isEditForm && !this.isReceipt && !this.isNeedReceipt) {
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

    quickChooseProductgroup: function() {
      this.$refs.productgroupDialog.show(this.editForm.new_productgroup_idName);
    },
    //显示产品大类Dialog
    productgroupLookup: function() {
      this.$refs.productgroupDialog.show(this.editForm.new_productgroup_idName);
    },
    //产品大类选择
    selectProductgroup: function(value) {
      if (
        this.editForm.new_productgroup_id == value.id &&
        this.editForm.new_productgroup_idName == value.name
      ) {
        return;
      } else {
        this.editForm.new_productgroup_id = value.id;
        this.editForm.new_productgroup_idName = value.name;
        this.editForm.new_productmodel_id = "";
        this.editForm.new_productmodel_idName = "";
      }
    },
    //清除产品大类数据
    clearProductgroup: function() {
      this.editForm.new_productgroup_id = "";
      this.editForm.new_productgroup_idName = "";
      this.editForm.new_productmodel_id = "";
      this.editForm.new_productmodel_idName = "";
    },

    quickChooseSystemuser: function() {
      if (this.isEditForm) {
        return;
      }
      this.lookupItem = "new_systemuser_id";
      this.$refs.systemuserDialog.show(this.editForm[this.lookupItem + "Name"]);
    },
    //显示处理人Dialog
    systemuserLookup: function() {
      if (this.isEditForm) {
        return;
      }
      this.lookupItem = "new_systemuser_id";
      this.$refs.systemuserDialog.show(this.editForm[this.lookupItem + "Name"]);
    },
    quickChooseIdcenter: function() {
      if (this.isEditForm) {
        return;
      }
      this.lookupItem = "new_systemuser_idcenter";
      this.$refs.systemuserDialog.show(this.editForm[this.lookupItem + "Name"]);
    },
    //显示处理人Dialog
    idcenterLookup: function() {
      if (this.isEditForm) {
        return;
      }
      this.lookupItem = "new_systemuser_idcenter";
      this.$refs.systemuserDialog.show(this.editForm[this.lookupItem + "Name"]);
    },
    //处理人选择
    selectSystemuser: function(id, name) {
      if (
        this.editForm[this.lookupItem] == id &&
        this.editForm[this.lookupItem + "Name"] == name
      ) {
        return;
      } else {
        this.editForm[this.lookupItem] = id;
        this.editForm[this.lookupItem + "Name"] = name;
      }
    },
    //清除处理人数据
    clearSystemuser: function() {
      this.editForm[this.lookupItem] = "";
      this.editForm[this.lookupItem + "Name"] = "";
    },

    quickChooseStation1: function() {
      if (this.isEditForm) {
        return;
      }
      this.lookupItem = "new_srv_station_id1";
      this.$refs.stationDialog.show(this.editForm[this.lookupItem + "Name"]);
    },
    //显示服务网点Dialog
    station1Lookup: function() {
      if (this.isEditForm) {
        return;
      }
      this.lookupItem = "new_srv_station_id1";
      this.$refs.stationDialog.show(this.editForm[this.lookupItem + "Name"]);
    },
    quickChooseStation2: function() {
      if (this.isEditForm) {
        return;
      }
      this.lookupItem = "new_srv_station_id2";
      this.$refs.stationDialog.show(this.editForm[this.lookupItem + "Name"]);
    },
    //显示服务网点Dialog
    station2Lookup: function() {
      if (this.isEditForm) {
        return;
      }
      this.lookupItem = "new_srv_station_id2";
      this.$refs.stationDialog.show(this.editForm[this.lookupItem + "Name"]);
    },
    quickChooseStation: function() {
      if (this.isEditForm) {
        return;
      }
      this.lookupItem = "new_station_id";
      this.$refs.stationDialog.show(this.editForm[this.lookupItem + "Name"]);
    },
    //显示服务网点Dialog
    stationLookup: function() {
      if (this.isEditForm) {
        return;
      }
      this.lookupItem = "new_station_id";
      this.$refs.stationDialog.show(this.editForm[this.lookupItem + "Name"]);
    },
    //服务网点选择
    selectStation: function(id, name) {
      if (
        this.editForm[this.lookupItem] == id &&
        this.editForm[this.lookupItem + "Name"] == name
      ) {
        return;
      } else {
        this.editForm[this.lookupItem] = id;
        this.editForm[this.lookupItem + "Name"] = name;
      }
    },
    //清除服务网点数据
    clearStation: function() {
      this.editForm[this.lookupItem] = "";
      this.editForm[this.lookupItem + "Name"] = "";
    },

    //返回按钮之前提示保存服务单数据
    beforeGoBack: function() {
      if (rt.isNullOrWhiteSpace(this.new_srv_workorderid)) {
        this.$confirm(this.$t("NewOrderNotSaveSureQuit"), this.$t("Tip"), {
          confirmButtonText: this.$t("BUTTON_DETERMINE"),
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: this.$t("BUTTON_CANCEL"),
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            window.history.go(-1);
            /* this.$router.push({ name: "workorder" }); */
          })
          .catch(() => {});
      } else {
        window.history.go(-1);

        /* this.$router.push({ name: "workorder" }); */
      }
    },

    //按钮状态控制
    //完工按钮状态控制
    confirmButtonVisbile() {
      if (rt.isNullOrWhiteSpace(this.new_srv_workorderid)) {
        return false;
      }
      var type = this.editForm.new_type;

      if (
        type == 4 ||
        type == 5 ||
        type == 10 ||
        type == 11 ||
        type == 12 ||
        type == 13
      ) {
        //服务单，完工-工程师时可网点完工
        if (this.editForm.new_dealstage == 16) return true;
        else if (this.editForm.new_dealstage == 6) {
          //不使用app的服务商 接单-网点阶段可直接完工
          return true;
        }
      } else if (type == 3 || type == 6) {
        if (this.editForm.new_dealstage == 6) return true;
      } else if (type == 16 || type == 17) {
        return true;
      }

      return false;
    },

    confirmWorkOrderVerify() {
      if (this.disabledbutton) {
        rt.showErrorToast("请等待之前操作完成");
        return;
      }
      if (rt.isNullOrWhiteSpace(this.new_srv_workorderid)) {
        rt.showErrorToast("请先保存服务单");
        return;
      }
      this.isCompleteWorkOrder = true;
      this.isSlipWorkOrder = false;
      this.isTechSubmit = false;

      setTimeout(() => {
        this.confirmWorkOrder();
      }, 200);
    },

    //完工确认
    confirmWorkOrder() {
      if (this.editForm.new_auditpoint < 17) {
        //厨电调试判断
        if (this.editForm.new_type == 17) {
          var paramsid = this.new_srv_workorderid;

          if (paramsid) {
            this.loading = true;
            var requestStr = "../api/WorkOrder/GetPictures/" + paramsid;
            rt.get(requestStr)
              .then(res => {
                var attachmentList = res;
                if (attachmentList == false) {
                  rt.showErrorToast("请上传调试的图片！");
                  return;
                }
              })
              .catch(error => {
                rt.showErrorToast(error);
                this.loading = false;
              });
          }
        }

        //厨电上门设计判断
        if (this.editForm.new_type == 16) {
          if (this.editForm.new_isinstallcondition == true) {
            if (this.editForm.new_wirediameter <= 0) {
              rt.showErrorToast("请选择用户厨房电源线径");
              return;
            }
            if (this.editForm.new_airsupply <= 0) {
              rt.showErrorToast("请选择气源类型");

              return;
            }
            if (this.editForm.new_machinesize <= 0) {
              rt.showErrorToast("请选择机器尺寸");
              return;
            }
            if (this.editForm.new_holedirection <= 0) {
              rt.showErrorToast("请选择排烟孔方向");
              return;
            }
            if (this.editForm.new_holesize <= 0) {
              rt.showErrorToast("请选择烟道开孔尺寸");
              return;
            }
          }
        }
      }
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          if (!this.confirmButtonVisbile()) {
            rt.showErrorToast("只有接单-网点/完工-工程师可进行完工操作");
            return;
          }
          if (this.editForm.new_type == 6) {
            this.completeData();
            return;
          }
          if (rt.isNullOrWhiteSpace(this.new_srv_workorderid)) {
            rt.showErrorToast("请先保存服务单");
            return;
          }
          if (this.editForm.new_auditpoint <= 0) {
            rt.showErrorToast("请选择网点完工结果");
            return;
          }
          if (this.editForm.new_csi <= 0) {
            rt.showErrorToast("请选择用户满意度");
            return;
          }
          if (rt.isNullOrWhiteSpace(this.editForm.new_network_completiondesc)) {
            rt.showErrorToast("请填写网点完工情况说明");
            return;
          }
          if (
            this.editForm.new_servicelength1 > 24 &&
            this.editForm.new_overduereasons <= 0
          ) {
            rt.showErrorToast("请选择超期原因");
            return;
          }
          var that = this;
          var issettlement = true;
          if (this.editForm.new_type == 5) {
            if (
              that.$refs.WorkOrder2UserprofileModel.workOrder2UserprofileList !=
                null &&
              that.$refs.WorkOrder2UserprofileModel.workOrder2UserprofileList
                .length > 0
            ) {
              for (var item in that.$refs.WorkOrder2UserprofileModel
                .workOrder2UserprofileList) {
                if (
                  !that.$refs.WorkOrder2UserprofileModel
                    .workOrder2UserprofileList[item].new_issettlement &&
                  that.$refs.WorkOrder2UserprofileModel
                    .workOrder2UserprofileList[item].new_iserror
                ) {
                  issettlement = false;
                  break;
                }
              }
            }
          }
          var msg = "";
          if (
            this.editForm.new_type == 4 &&
            (this.editForm.new_auditpoint == 4 ||
              this.editForm.new_auditpoint == 5)
          ) {
            msg =
              "只有未上墙的产品才选择退换机，如果已经上墙，请选择正常完工-安装，否则将影响安装费结算。确认以当前完工结果提交完工吗？";
          } else if (!issettlement)
            msg = "套机列表中存在不予结算的故障机，是否确定提交";

          if (!rt.isNullOrWhiteSpace(msg)) {
            this.$confirm(msg, "提示", {
              confirmButtonText: "确定",
              confirmButtonClass: "ConfirmButtonClass",
              cancelButtonText: "取消",
              cancelButtonClass: "CancelButtonClass",
              type: "warning"
            })
              .then(() => {
                this.completeData();
              })
              .catch(function(error) {
                console.log("取消完工");
              });
          } else {
            this.completeData();
          }
        } else {
          this.$message({
            message: this.$t("PleaseInputRequiredFields"),
            type: "error"
          });
        }
      });
    },
    //完工确认
    completeData: function() {
      var self = this;
      var params = self.editForm;
      params.id = self.new_srv_workorderid;
      self.disabledbutton = true;
      rt.post("../api/WorkOrder/CompletedWorkOrder", params)
        .then(function(res) {
          if (!rt.isNullOrWhiteSpace(res)) {
            rt.showErrorToast(res);
          } else {
            rt.showSuccessToast("服务商完工成功");
          }
          self.disabledcompleted = true;
          self._fetchRecords();
          self.isSaved = true;
          self.disabledbutton = false;
        })
        .catch(error => {
          this.disabledbutton = false;
          rt.showErrorToast(error);
        });
    },

    slipWorkOrderVerify: function() {
      if (this.disabledbutton) {
        rt.showErrorToast("请等待之前操作完成");
        return;
      }
      if (rt.isNullOrWhiteSpace(this.new_srv_workorderid)) {
        rt.showErrorToast("请先保存服务单");
        return;
      }
      this.isCompleteWorkOrder = false;
      this.isSlipWorkOrder = true;
      this.isTechSubmit = false;
      setTimeout(() => {
        this.slipWorkOrder();
      }, 200);
    },

    //转单
    slipWorkOrder: function() {
      if (
        this.editForm.new_dealstage != 5 &&
        this.editForm.new_dealstage != 6 &&
        this.editForm.new_dealstage != 9
      ) {
        rt.showErrorToast("只有派单-网点/接单-网点/退单-网点状态可转单");
        return;
      }
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          if (this.editForm.new_reassignment <= 0) {
            rt.showErrorToast("请选择改派原因");
            return;
          }
          if (
            this.editForm.new_reassignment == 2 &&
            this.editForm.new_town_id == this.editForm.oldTownId
          ) {
            rt.showErrorToast("地址原因的改派请先修改地址");
            return;
          }
          var self = this;
          var params = self.editForm;
          params.id = self.new_srv_workorderid;
          self.disabledbutton = true;
          rt.post("../api/WorkOrder/SlipWorkOrder", params)
            .then(function(res) {
              rt.showSuccessToast("转单成功");
              self._fetchRecords();
              self.isSaved = true;
              self.disabledslip = true;
              self.disabledbutton = false;
            })
            .catch(error => {
              this.disabledbutton = false;
              rt.showErrorToast(error);
            });
        } else {
          this.$message({
            message: this.$t("PleaseInputRequiredFields"),
            type: "error"
          });
        }
      });
    },
    //接单
    orderTakeWorkOrder: function() {
      if (this.disabledbutton) {
        rt.showErrorToast("请等待之前操作完成");
        return;
      }
      if (rt.isNullOrWhiteSpace(this.new_srv_workorderid)) {
        rt.showErrorToast("请先保存服务单");
        return;
      }
      if (this.editForm.new_type == 3 && this.editForm.new_dealstage != 5) {
        rt.showErrorToast("外部投诉只有派单-网点状态可接单");
        return;
      } else if (
        this.editForm.new_type == 1 ||
        this.editForm.new_type == 2 ||
        //this.editForm.new_type == 6 ||
        this.editForm.new_type == 7 ||
        this.editForm.new_type == 9
      ) {
        rt.showErrorToast("当前服务单类型无法接单");
        return;
      } else if (
        this.editForm.new_dealstage != 5 &&
        this.editForm.new_dealstage != 9
      ) {
        rt.showErrorToast("当前服务单状态无法接单");
        return;
      }
      var self = this;
      var params = self.editForm;
      params.id = self.new_srv_workorderid;
      self.disabledbutton = true;
      rt.post("../api/WorkOrder/OrderTakeWorkOrder", params)
        .then(function(res) {
          rt.showSuccessToast("接单成功");
          self.disabledsingle = true; //禁用该按钮
          self._fetchRecords();
          self.isSaved = true;
          self.disabledbutton = false;
        })
        .catch(error => {
          this.disabledbutton = false;
          rt.showErrorToast(error);
        });
    },
    //派工
    dispatchWorkOrder: function() {
      if (this.disabledbutton) {
        rt.showErrorToast("请等待之前操作完成");
        return;
      }
      if (rt.isNullOrWhiteSpace(this.new_srv_workorderid)) {
        rt.showErrorToast("请先保存服务单");
        return;
      }
      if (!this.usedApp) {
        rt.showErrorToast("当前服务商不使用app，不需要走派工流程");
        return;
      }
      if (
        this.editForm.new_dealstage != 6 &&
        this.editForm.new_dealstage != 7 &&
        this.editForm.new_dealstage != 10 &&
        this.editForm.new_dealstage != 15 &&
        this.editForm.new_dealstage != 16 &&
        this.editForm.new_dealstage != 17
      ) {
        rt.showErrorToast("只有接单-网点/工程师处理过程中状态可派工");
        return;
      }
      if (
        this.editForm.new_type != 4 && //安装
        this.editForm.new_type != 5 && //维修
        this.editForm.new_type != 12 && //返包
        this.editForm.new_type != 13 && //返修
        this.editForm.new_type != 10 && //上门设计
        this.editForm.new_type != 11 && //调试
        this.editForm.new_type != 16 && //厨电-上门设计
        this.editForm.new_type != 17 //厨电-调试
      ) {
        rt.showErrorToast("当前单据类型不可派工");
        return;
      }
      this.$refs.dispatchDialog.show(this.$refs.outsideLineModel.outLineData);
    },
    reloadOutSideLine: function() {
      this._fetchRecords();
      this.$refs.outsideLineModel._fetchRecords();
    },
    //跳转新服务单
    gotoNewOrder: function(val) {
      this.$router.push({ name: "orderedit", params: { id: val } });
    },

    reloadPartsApply: function() {
      this.$refs.partsapplyModel.reLoadpartsApply();
    },

    reloadPartsApply: function() {
      this.$refs.KitchenDebugModel.reLoadpartsApply();
    },

    //新增记录
    gotoAddPage: function() {
      // alert(1);
      this.$router.replace({ name: "ordercreate" });
    },

    selectProductModel: function(data) {
      this.editForm.new_productmodel_id = data.id;
      this.editForm.new_productmodel_idName = data.name;
    },
    clearProductModel: function() {
      this.editForm.new_productmodel_id = "";
      this.editForm.new_productmodel_idName = "";
    },
    productModelLookup: function() {
      this.$refs.productmoduleDialog.show();
    },
    //技术支持-提交
    techSubmit: function() {
      if (this.disabledbutton) {
        rt.showErrorToast("请等待之前操作完成");
        return;
      }
      if (rt.isNullOrWhiteSpace(this.new_srv_workorderid)) {
        rt.showErrorToast("请先保存服务单");
        return;
      }
      if (this.editForm.new_tech_approvalstatus != 3) {
        rt.showErrorToast("只有审核中-待网点修改状态可以提交");
        return;
      }
      this.isCompleteWorkOrder = false;
      this.isSlipWorkOrder = false;
      this.isTechSubmit = true;
      setTimeout(() => {
        var params = this.editForm;
        params.id = this.new_srv_workorderid;
        var self = this;
        self.disabledbutton = true;
        this.$refs["editForm"].validate(valid => {
          if (valid) {
            rt.post("../api/WorkOrder/TechSubmit", params)
              .then(function(res) {
                rt.showSuccessToast("提交成功");
                self._fetchRecords();
                self.isSaved = true;
                self.disabledsubmit = true;
                self.disabledbutton = false;
              })
              .catch(error => {
                this.disabledbutton = false;
                rt.showErrorToast(error);
              });
          } else {
            this.$message({
              message: this.$t("PleaseInputRequiredFields"),
              type: "error"
            });
          }
        });
      }, 200);
    },

    reloadOutSideInfo: function() {
      this.$refs.outsideInfoModel.init();
    },

    reloadInSideInfo: function() {
      this.$refs.insideInfoModel.init();
      this.$refs.outsideInfoModel.init();
    },
    reloadAreaInfo: function() {
      this.$refs.insideInfoModel.init();
      // this.reloadOutSideInfo();
      // alert("finishreloadAreaInfo");
    },
    //虚假单申诉
    complain: function() {
      if (this.disabledbutton) {
        rt.showErrorToast("请等待之前操作完成");
        return;
      }
      if (rt.isNullOrWhiteSpace(this.new_srv_workorderid)) {
        rt.showErrorToast("请先保存服务单");
        return;
      }
      if (this.editForm.new_unrealstatus != 1) {
        rt.showErrorToast("只有虚假待申诉状态可以申诉");
        return;
      }
      if (rt.isNullOrWhiteSpace(this.editForm.new_complain_memo)) {
        rt.showErrorToast("请填写申述理由");
        return;
      }
      var params = this.editForm;
      params.id = this.new_srv_workorderid;
      var self = this;
      self.disabledbutton = true;
      rt.post("../api/WorkOrder/UnRealComplain", params)
        .then(function(res) {
          rt.showSuccessToast("提交成功");
          self._fetchRecords();
          self.isSaved = true;
          self.disabledsubmit = true;
          self.disabledbutton = false;
        })
        .catch(error => {
          this.disabledbutton = false;
          rt.showErrorToast(error);
        });
    }
  }
};
function istrue(stringToSearch, arrayToSearch) {
  for (var i = 0; i < arrayToSearch.length; i++) {
    var thisEntry = arrayToSearch[i];
    if (thisEntry == stringToSearch) {
      return true;
    }
  }
  return false;
}
</script>
<style>
.rt-content .rt-content__side {
  overflow-y: auto;
}

.rt-content__side{
	right: 40px;
}
.rt-content__side,.rt-content__main{
	top: 142px;
	
}
</style>
