const Main = resolve => require(['@/components/main/Main.vue'], resolve);

//配件申请单
const PartApplyList = resolve => require(['@/module/partsApply/partsApplyListView.vue'], resolve);
const PartApplyEdit = resolve => require(['@/module/partsApply/partsApplyEditView.vue'], resolve);
const PartApplyDetail = resolve => require(['@/module/partsApply/partsApplyDetailView.vue'], resolve);
//服务商变更申请单列表
const GetStationApplyList = resolve => require(['@/module/service/StationApply/StationApplyList.vue'], resolve);
const AddStationApply = resolve => require(['@/module/service/StationApply/AddStationApply.vue'], resolve);
//服务站档案
const BasicDataEdit = resolve => require(['@/module/basicData/basicDataEditView.vue'], resolve);
//服务站档案预览
const ServiceView = resolve => require(['@/module/service/StationApply/baseDataView.vue'], resolve);
//服务人员
const BasicDataDetail = resolve => require(['@/module/basicData/basicDataDetailView.vue'], resolve);
const BasicDataDetailEdit = resolve => require(['@/module/basicData/basicDataDetailEditView.vue'], resolve);
const ChangeApply = resolve => require(['@/module/basicData/infoChangeView.vue'], resolve);
const ChangeApplyList = resolve => require(['@/module/basicData/infoChangeListView.vue'], resolve);

//公告
const NoticeList = resolve => require(['@/module/notice/noticeList.vue'], resolve);
const NoticeView = resolve => require(['@/module/notice/noticeView.vue'], resolve);
//资料下载
const DatumList = resolve => require(['@/module/datum/datumList.vue'], resolve);


//签核角色
const FlowRoleList = resolve => require(['@/module/flow/flowRoleList.vue'], resolve);
const FlowRoleEdit = resolve => require(['@/module/flow/flowRoleEdit.vue'], resolve);
const FlowRoleCreateDetail = resolve => require(["@/module/flow/flowRoleCreateDetail.vue"], resolve);

//签核流程
const FlowList = resolve => require(["@/module/flow/flowList.vue"], resolve);
const FlowCreateDetail = resolve => require(["@/module/flow/flowCreateDetail.vue"], resolve);
const FlowDetail = resolve => require(["@/module/flow/flowDetail.vue"], resolve);


//配件发运
const PartsDispatchList = resolve => require(['@/module/partsDispatch/partsDispatchListView.vue'], resolve);
const PartsDispatchEdit = resolve => require(['@/module/partsDispatch/partsDispatchEditView.vue'], resolve);
const PartsDispatchDetail = resolve => require(['@/module/partsDispatch/partsDispatchDetailView.vue'], resolve);

//配件签收
const PartsSignList = resolve => require(['@/module/partsSign/partsSignListView.vue'], resolve);
const PartsSignEdit = resolve => require(['@/module/partsSign/partsSignEditView.vue'], resolve);

//配件销售
const NewOrderList = resolve => require(['@/module/newOrder/newOrderListView.vue'], resolve)
const NewOrderEdit = resolve => require(['@/module/newOrder/newOrderEditView.vue'], resolve)
const NewOrderDetail = resolve => require(['@/module/newOrder/newOrderDetailView.vue'], resolve)

//配件退货订单
const SiteReturnList = resolve => require(['@/module/siteReturn/siteReturnListView.vue'], resolve)
const SiteReturnEdit = resolve => require(['@/module/siteReturn/siteReturnEditView.vue'], resolve)
const SiteReturnPrint = resolve => require(['@/module/siteReturn/siteReturnPrintView.vue'], resolve)

//旧件返厂
const PartsReturnList = resolve => require(['@/module/partsReturn/partsReturnListView.vue'], resolve);
const PartsReturnEdit = resolve => require(['@/module/partsReturn/partsReturnEditView.vue'], resolve);
const PartsReturnPrintLabel = resolve => require(['@/module/partsReturn/partsReturnPrintLabel.vue'], resolve);
const PartsReturnPrintlist = resolve => require(['@/module/partsReturn/partsReturnPrintList.vue'], resolve);

const AmountAdjustList = resolve => require(['@/module/amountAdjustment/amountAdjustListView.vue'], resolve);
const AmountAdjustEdit = resolve => require(['@/module/amountAdjustment/amountAdjustEditView.vue'], resolve);


//费用汇总单
const ExpenseClaimList = resolve => require(['@/module/expenseClaim/expenseClaimListView.vue'], resolve);
const ExpenseClaimEdit = resolve => require(['@/module/expenseClaim/expenseClaimEditView.vue'], resolve);

//汇总结算单
const ExpenseSummaryList = resolve => require(['@/module/expenseSummary/expenseSummaryListView.vue'], resolve);
const ExpenseSummaryEdit = resolve => require(['@/module/expenseSummary/expenseSummaryEditView.vue'], resolve);
//服务管理

const WorkOrderList = resolve => require(['@/module/service/workOrder/workOrderListView.vue'], resolve);
const WorkOrderEdit = resolve => require(['@/module/service/workOrderEditView.vue'], resolve);
const workOrderWaitList = resolve => require(['@/module/service/workOrderWaitListView.vue'], resolve);

// 处理_zcy
const WorkOutDeal = resolve => require(['@/module/service/workOut/workOutEditView.vue'], resolve);

//上门服务新增
const VisitDesignEdit = resolve => require(['@/module/service/visitDesignView.vue'], resolve);
const AreaInfoEdit = resolve => require(['@/module/service/areaInfoView.vue'], resolve);

const WorkOrderAssign = resolve => require(['@/module/service/mapAssignView.vue'], resolve);

//奖惩结算单
const claimFineList = resolve => require(['@/module/claimFine/claimFineListView.vue'], resolve);
const claimFineDetail = resolve => require(['@/module/claimFine/claimFineDetailView.vue'], resolve);

//额度调整流水
const AmountChangeLog = resolve => require(['@/module/amountChangeLog/amountChangeLog.vue'], resolve);
const AmountChangeLogLine = resolve => require(['@/module/amountChangeLog/amountChangeLogLine.vue'], resolve);

//配件库存查看
const SiteInvlist = resolve => require(['@/module/siteInv/siteInv.vue'], resolve);
const SiteInvLine = resolve => require(['@/module/siteInv/siteInvLine.vue'], resolve);

//新旧转换查看
const ChangeOrderList = resolve => require(['@/module/changeOrder/changeOrderList.vue'], resolve);
const ChangeOrderEdit = resolve => require(['@/module/changeOrder/changeOrderEdit.vue'], resolve);

//配件库存流水
const partStockTransactionlist = resolve => require(['@/module/partStockTransaction/partStockTransaction.vue'], resolve);
const partStockTransactionline = resolve => require(['@/module/partStockTransaction/partStockTransactionLine.vue'], resolve);

//质量反馈
const qualityFeedbackList = resolve => require(['@/module/qualityFeedback/qualityFeedbackListView.vue'], resolve);
const qualityFeedbackEdit = resolve => require(['@/module/qualityFeedback/qualityFeedbackEditView.vue'], resolve);
const feedbackAccessoriesCreate = resolve => require(['@/module/qualityFeedback/feedbackAccessoriesCreateView.vue'], resolve);
const feedbackModelCreate = resolve => require(['@/module/qualityFeedback/feedbackModelCreateView.vue'], resolve);

//监理单
const supervisionList = resolve => require(['@/module/supervision/supervisionListView.vue'], resolve);
const supervisionEdit = resolve => require(['@/module/supervision/supervisionEditView.vue'], resolve);

//服务互动
const interactionList = resolve => require(['@/module/service/interactionHomeModel.vue'], resolve);
const interactionDetail = resolve => require(['@/module/service/interactionHomeEdit.vue'], resolve);

//服务商整改
const rectificationList = resolve => require(['@/module/rectification/newRectificationListView.vue'], resolve);
const rectificationEdit = resolve => require(['@/module/rectification/newRectificationEditView.vue'], resolve);

//服务商清算
const liquidationList = resolve => require(['@/module/liquidation/newLiquidationListView.vue'], resolve);
const liquidationEdit = resolve => require(['@/module/liquidation/newLiquidationEditView.vue'], resolve);

//初审问题点
const firstProblemList = resolve => require(['@/module/firstProblem/firstProblemListView.vue'], resolve);
const firstProblemEdit = resolve => require(['@/module/firstProblem/firstProblemEditView.vue'], resolve);

const worker2dispatchList = resolve => require(['@/module/service/new_srv_worker2dispatchModel.vue'], resolve);
const workorder2feedetailList = resolve => require(['@/module/service/new_srv_workorder2feedetailModel.vue'], resolve);

export default [{
  path: "/flow",
  component: Main,
  children: [{
    path: "role",
    name: "FlowRoleList",
    component: FlowRoleList
  },
  {
    path: "createRoleDetail",
    name: "FlowRoleCreateDetail",
    component: FlowRoleCreateDetail
  },
  {
    path: "list",
    name: "FlowList",
    component: FlowList
  },
  {
    path: "createDetail",
    name: "FlowCreateDetail",
    component: FlowCreateDetail
  },
  {
    path: "roleedit/:id",
    name: "FlowRoleEdit",
    component: FlowRoleEdit
  },
  {
    path: "edit/:id",
    name: "FlowDetail",
    component: FlowDetail
  }
  ]
},
//服务单模块
{
  path: '/workOrder',
  component: Main,
  children: [{ //服务单主页面
    path: 'list',
    name: 'workorder',
    component: WorkOrderList
  },
  { //服务单主页面
    path: 'list/:type',
    name: 'workorderWithType',
    component: WorkOrderList
  },
  { //待处理服务单
    path: 'waitlist',
    name: 'waitworkorder',
    component: workOrderWaitList
  },
  {
    //服务单新增
    path: 'create/',
    name: 'ordercreate',
    component: WorkOrderEdit
  },
  {
    //服务单处理
    path: 'deal/',
    name: 'workoutDeal',
    component: WorkOutDeal
  },
  {
    //新增上门设计
    path: 'plus/',
    name: 'designcreate',
    component: VisitDesignEdit
  },
  {
    //新增上门设计-新增区域信息
    path: 'areainfo/:id/:preid',
    name: 'areainfocreate',
    component: AreaInfoEdit
  },
  {
    path: 'edit/:id',
    name: 'orderedit',
    component: WorkOrderEdit,
  },
  {
    path: 'mapassign',
    name: 'mapassign',
    component: WorkOrderAssign
  }
  ]
},
{
  path: '/interaction',
  component: Main,
  children: [{ //主页面
    path: 'list',
    name: 'interactionList',
    component: interactionList
  },
  {
    path: 'detail/:id',
    name: 'interactionDetail',
    component: interactionDetail,
  },
  ]
},
{
  path: '/worker2dispatch',
  component: Main,
  children: [{ //主页面
    path: 'list',
    name: 'worker2dispatchList',
    component: worker2dispatchList
  }
  ]
},
{
  path: '/workorder2feedetail',
  component: Main,
  children: [{ //主页面
    path: 'list',
    name: 'workorder2feedetailList',
    component: workorder2feedetailList
  }
  ]
},
//结算奖惩单模块
{
  path: '/claimFine',
  component: Main,
  children: [{ //主页面
    path: 'list',
    name: 'claimfine',
    component: claimFineList
  },
  {
    path: 'detail/:id',
    name: 'claimfinedetail',
    component: claimFineDetail,
  },
  ]
},
//配件申请模块
{
  path: '/partsApply',
  component: Main,
  children: [{
    path: 'list',
    name: 'partlist',
    component: PartApplyList
  },
  {
    path: 'create/',
    name: 'partcreate',
    component: PartApplyEdit
  },
  {
    path: 'edit/:id',
    name: 'partedit',
    component: PartApplyEdit
  },
  ]
},
//服务商整改单
{
  path: '/rectification',
  component: Main,
  children: [{
    path: 'list',
    name: 'rectificationlist',
    component: rectificationList
  },
  {
    path: 'edit/:id',
    name: 'rectificationedit',
    component: rectificationEdit
  },
  ]
},
//服务商清算
{
  path: '/liquidation',
  component: Main,
  children: [{
    path: 'list',
    name: 'liquidationlist',
    component: liquidationList
  },
  {
    path: 'edit/:id',
    name: 'liquidationedit',
    component: liquidationEdit
  },
  ]
},
//配件签收
{
  path: '/partsSign',
  component: Main,
  children: [{
    path: 'list',
    name: 'partssignlist',
    component: PartsSignList
  },
  {
    path: 'edit/:id',
    name: 'partssignedit',
    component: PartsSignEdit
  }
  ]
},
//配件库存查看
{
  path: '/siteInv',
  component: Main,
  children: [{
    path: 'list',
    name: 'siteInvlist',
    component: SiteInvlist
  },
  {
    path: 'line/:row',
    name: 'siteInvLine',
    component: SiteInvLine
  }
  ]

},
//新旧转换查看
{
  path: '/changeOrder',
  component: Main,
  children: [{
    path: 'list',
    name: 'changeOrderList',
    component: ChangeOrderList
  },
  {
    path: 'edit/:id',
    name: 'changeOrderEdit',
    component: ChangeOrderEdit
  }
  ]
},
//配件库存流水
{
  path: '/partStockTransaction',
  component: Main,
  children: [{
    path: 'list',
    name: 'partStockTransactionlist',
    component: partStockTransactionlist
  },
  {
    path: 'line/:row',
    name: 'partStockTransactionline',
    component: partStockTransactionline
  }
  ]
},
//配件发售
{
  path: '/newOrder',
  component: Main,
  children: [{
    path: 'list/',
    name: 'neworderlist',
    component: NewOrderList
  },
  {
    path: 'edit/:id',
    name: 'neworderedit',
    component: NewOrderEdit
  },
  {
    path: 'edit/',
    name: 'newordercreate',
    component: NewOrderEdit
  }
  ]
},
//配件退货
{
  path: '/siteReturn',
  component: Main,
  children: [{
    path: 'list/',
    name: 'sitereturnlist',
    component: SiteReturnList
  },
  {
    path: 'edit/:id',
    name: 'sitereturnedit',
    component: SiteReturnEdit
  },
  {
    path: 'edit/',
    name: 'sitereturncreate',
    component: SiteReturnEdit
  },
  {
    path: 'print/:id',
    name: 'sitereturnprint',
    component: SiteReturnPrint
  },
  ]
},

//基础数据模块
{
  path: '/basicData',
  component: Main,
  children: [{
    path: 'edit/',
    name: 'basiclist',
    component: BasicDataEdit
  },]
},

//服务人员
{
  path: '/basicData',
  component: Main,
  children: [{
    path: 'detaillist/',
    name: 'basicdetaillist',
    component: BasicDataDetail
  },
  {
    path: 'detailcreate/',
    name: 'basicdetailcreate',
    component: BasicDataDetailEdit
  },
  {
    path: 'detailedit/',
    name: 'basicdetailedit',
    component: BasicDataDetailEdit
  },
  {
    path: 'changeapply/',
    name: 'infochange',
    component: ChangeApply
  },
  {
    path: 'changeapplylist/',
    name: 'infochangelist',
    component: ChangeApplyList
  }

  ]
},
// //服务档案
{
  path: '/service/StationApply',
  component: Main,
  children: [{
    path: 'basicdata',
    name: 'servicelook',
    component: ServiceView
  },]
},
//发运单模块
{
  path: '/partsDispatch',
  component: Main,
  children: [{
    path: 'list',
    name: 'dispatchlist',
    component: PartsDispatchList
  },
  {
    path: 'create/',
    name: 'dispatchcreate',
    component: PartsDispatchEdit
  },
  {
    path: 'edit/:id',
    name: 'dispatchedit',
    component: PartsDispatchEdit
  },
  {
    path: 'detailcreate/:id',
    name: 'dispatchdetailcreate',
    component: PartsDispatchDetail
  },
  {
    path: 'detailedit/:id',
    name: 'dispatchdetailedit',
    meta: {
      keepAlive: true
    },
    component: PartsDispatchDetail
  }
  ]
},

//旧件返厂
{
  path: "/partsReturn",
  component: Main,
  children: [{
    path: "list",
    name: "PartsReturnList",
    component: PartsReturnList
  },
  {
    path: "edit/:id",
    name: "PartsReturnEdit",
    component: PartsReturnEdit
  },
  {
    path: "create/",
    name: "PartsReturnCreate",
    component: PartsReturnEdit
  },
  {
    path: "printlist/:id",
    name: "PartsReturnPrintlist",
    component: PartsReturnPrintlist
  },
  {
    path: "printlabel/:id",
    name: "PartsReturnPrintLabel",
    component: PartsReturnPrintLabel
  }
  ]
},

// 额度调整单
{
  path: "/amountAdjust",
  component: Main,
  children: [{
    path: "list",
    name: "AmountAdjustList",
    component: AmountAdjustList
  },
  {
    path: "create/",
    name: "AmountAdjustCreate",
    component: AmountAdjustEdit
  },
  {
    path: "edit/:id",
    name: "AmountAdjustEdit",
    component: AmountAdjustEdit
  }
  ]
},
//额度调整流水
{
  path: "/amountChangeLog",
  component: Main,
  children: [{
    path: "list",
    name: "AmountChangeLog",
    component: AmountChangeLog
  },
  {
    path: "Line/:row",
    name: "AmountChangeLogLine",
    component: AmountChangeLogLine
  }
  ]
},
//费用调整单
{
  path: "/expenseClaim",
  component: Main,
  children: [{
    path: "list",
    name: "ExpenseClaimList",
    component: ExpenseClaimList
  },
  {
    path: "edit/:id",
    name: "ExpenseClaimEdit",
    component: ExpenseClaimEdit
  }
  ]

},

//汇总结算单
{
  path: "/expenseSummary",
  component: Main,
  children: [{
    path: "list",
    name: "ExpenseSummaryList",
    component: ExpenseSummaryList
  },
  {
    path: "edit/:id",
    name: "ExpenseSummaryEdit",
    component: ExpenseSummaryEdit
  }
  ]

},
//公告
{
  path: "/notice",
  component: Main,
  children: [{
    path: "list",
    name: "NoticeList",
    component: NoticeList
  },
  {
    path: "view/:id",
    name: "NoticeView",
    component: NoticeView
  }
  ]
},
//资料下载
{
  path: "/file",
  component: Main,
  children: [{
    path: "list",
    name: "DatumList",
    component: DatumList
  }]
},

//质量反馈
{
  path: '/qualityFeedback',
  component: Main,
  children: [{
    path: 'list',
    name: 'qualityFeedbackList',
    component: qualityFeedbackList
  },
  {
    path: 'create',
    name: 'qualityFeedbackCreate',
    component: qualityFeedbackEdit
  },
  {
    path: 'edit/:id',
    name: 'qualityFeedbackEdit',
    component: qualityFeedbackEdit
  },
  {
    path: 'accessoriescreate',
    name: 'feedbackAccessoriesCreate',
    component: feedbackAccessoriesCreate
  },
  {
    path: 'modelcreate',
    name: 'feedbackModelCreate',
    component: feedbackModelCreate
  },
  ]
},

//监理单
{
  path: '/supervision',
  component: Main,
  children: [{
    path: 'list',
    name: 'supervisionList',
    component: supervisionList
  },
  {
    path: 'edit/:id',
    name: 'supervisionEdit',
    component: supervisionEdit
  },

  ]
},
//服务商变更申请单列表
{
  path: '/service/StationApply',
  component: Main,
  children: [{
    path: 'list',
    name: 'StationApply',
    component: GetStationApplyList
  },
  {
    path: 'edit/:id',
    name: 'StationApplyEdit',
    component: AddStationApply
  }]
},

//初审问题点
{
  path: '/firstproblem',
  component: Main,
  children: [{
    path: 'list',
    name: 'firstProblemList',
    component: firstProblemList
  },
  {
    path: 'edit/:id',
    name: 'firstProblemEdit',
    component: firstProblemEdit
  },]
},
  //客户管理模块
  // {
  //     path: '/account',
  //     component: Main,
  //     children: [
  //         {
  //             path: 'account/list',
  //             name: 'AccountList',
  //             component: Test
  //         }]
  // }
]
