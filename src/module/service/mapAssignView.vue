<template>
  <div class="mapAssign">
    <!-- <rt-header title="地图派工"></rt-header> -->
    <div class="content">

      <!-- 服务派单地图页面 -->
      <div class="map-container">
        <!-- 地图操作按钮 -->
        <div class="tools">
          <div class="count" @click="getToAssignOrder">{{$t('ToBeAssigned')}}
            <span style="color: #1fb6d8; font-weight: 700;">{{dataTotalCount}}</span>
          </div>
          <div class="tabs">
            <rt-button @click="_getAllOrders(0)" :class="{'inActiveColor':tabIndex==0,'default-color':tabIndex!=0}" type="" :text="$t('All')"></rt-button>
            <div class="tab-divider"></div>
            <rt-button @click="filterOrders(1)" :class="{'inActiveColor':tabIndex==1,'default-color':tabIndex!=1}" type="" :text="$t('Today')"></rt-button>
            <div class="tab-divider"></div>
            <rt-button @click="filterOrders(2)" :class="{'inActiveColor':tabIndex==2,'default-color':tabIndex!=2}" type="" :text="$t('Tomorrow')"></rt-button>
          </div>

          <div class="tab-query">
            <el-input :placeholder="$t('QuickSearch')" v-model="orderQueryValue" class="search" @keyup.enter.native="filterOrders">
              <template slot="append">
                <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
                <el-button class="search-button" slot="append" icon="search" @click="filterOrders"></el-button>
              </template>
            </el-input>
          </div>
        </div>

        <!-- 地图内标记的信息显示框 -->
        <div class="assign-query" v-if="showQueryDialog">
          <div class="info">
            <div style="width: 188px;float: left;">
              <div class="title">{{infoMsg.new_typetext|| '' }}</div>
              <div class="product">{{infoMsg.new_productgroup_idName}}/{{infoMsg.new_productmodel_idName}}</div>
              <hr/>
              <div class="time-area">
                <div class="inline-b"><img src="../../assets/imgs/time.png"></div>
                <div class="inline-b">{{infoMsg.new_appointmenttime}}</div>
              </div>
              <div class="address-area" v-if="infoMsg.new_dealstatus > 1">
                <div class="inline-b"><img src="../../assets/imgs/user.png"></div>
                <div class="inline-b">{{infoMsg.worker}}</div>
              </div>
              <div class="address-area">
                <div class="inline-b"><img src="../../assets/imgs/address.png"></div>
                <div class="inline-b">{{infoMsg.addressdetail}}</div>
              </div>
              <div class="button-area" @click="showWorkers">
                <rt-button :text="$t('BUTTON_ASSIGN')" type=""></rt-button><img src="../../assets/imgs/assign.png"></div>
            </div>
          </div>

        </div>
      </div>

      <!-- 服务站下服务人员的列表数据 -->
      <div class="map-worker-list" v-if="showWorkerDialog">
        <el-input :placeholder="$t('EnterName')" v-model="queryValue" class="search" @keyup.enter.native="filterWorkers">
          <template slot="append">
            <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
            <el-button class="search-button" slot="append" icon="search" @click="filterWorkers"></el-button>
          </template>
        </el-input>

        <el-table style="width: 260px;" :data="workerList" max-height="400" stripe highlight-current-row @current-change="handleCurrentChange">
          <el-table-column prop="new_name" min-width="100" :label="$t('new_srv_worker.new_name')"></el-table-column>
          <el-table-column prop="new_phone" min-width="130" :label="$t('new_srv_worker.new_phone')"></el-table-column>
        </el-table>

        <div class="button-area deeper-button" @click="assignWorker">
          <el-button type="text">{{$t('BUTTON_ASSIGN')}}</el-button><img src="../../assets/imgs/assign.png">
        </div>
      </div>

      <!-- 地图展示块 -->
      <div class="map" id="assign-map" v-loading="loadingMap || loadingMarkers" :element-loading-text="mapLoadingText" element-loading-spinner="el-icon-loading">
        <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handlerMap" :scroll-wheel-zoom="true">
        </baidu-map>
      </div>
    </div>

    <!-- 服务日历模块 -->
    <div class="worker-calender" v-loading="loadingOrder" :element-loading-text="$t('CalenderLoading')" element-loading-spinner="el-icon-loading">

      <div class="rt-header calender-header">
        <h2>{{$t('ServiceCalendar')}}</h2>
        <el-date-picker v-model="date" @change="changeWorkerDate" type="date" class="worker-order-date">
        </el-date-picker>
      </div>

      <div class="worker-order-detail" ref="workerOrderDetail">
        <!-- 服务人员及服务单表格详情 -->

        <!-- begin -->

        <div class="table-area" v-on="{ load: setTableShadow, resize: setTableShadow }">

          <!-- 表头部分 -->
          <div class="table-header" ref="tableScroll" v-on:scroll="handleBodyScroll">
            <!-- 滚动的头部表格 -->
            <table ref="scrollHead">
              <colgroup>
                <col v-for="(time, index) in timeArea.TimeAreas" :width="labelWidth">
              </colgroup>
              <thead valign="middle">
                <tr>
                  <th class="time" v-for="(time, index) in timeArea.TimeAreas">
                    {{ time }}
                  </th>
                </tr>
              </thead>
            </table>
            <!-- 表格滚动部分 -->
            <div class="table-scroll-content" :style="{width:tableWidth +'px',height: tableHeight + 'px'}" ref="tableContent" v-on:scroll="handleBodyScrollTop">
              <table>
                <colgroup>
                  <col v-for="(time, index) in timeArea.TimeAreas" :width="labelWidth">
                </colgroup>
                <tbody class="ivu-table-tbody">
                  <tr v-for="(woker,index) in workerList2">
                    <td v-for="(time, timeIndex) in timeArea.TimeAreas" :class="{'has-workorder-data': getMyOrder(time,woker.id,timeArea.step)!=''}">
                      <span class="worker-name" v-if="timeIndex==0">{{woker.new_name}}</span>
                      <span>
                        <order-info :index="index" :text="getMyOrder(time,woker.id,timeArea.step)"></order-info>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 左侧固定的表格 -->
          <div class="table-fixed-left" :class="{'table-fixed-left-scroll': hasLeft}">
            <table>
              <colgroup>
                <col v-for="(time, index) in timeArea.TimeAreas" :width="labelWidth">
              </colgroup>
              <thead valign="middle">
                <tr>
                  <th class="time" v-for="(time, index) in timeArea.TimeAreas" :class="{'tdHidden': index!=0}">
                    {{ time }}
                  </th>
                </tr>
              </thead>
            </table>
            <div class="left-line" :style="{height:tableHeight +'px'}" ref="fixedBody">
              <table>
                <colgroup>
                  <col v-for="(time, index) in timeArea.TimeAreas" :width="labelWidth" :class="{'tdHidden': index!=0}">
                </colgroup>
                <tbody class="ivu-table-tbody">
                  <tr v-for="(woker,index) in workerList2">
                    <td v-for="(time, timeIndex) in timeArea.TimeAreas" :class="{'has-workorder-data':getMyOrder(time,woker.id,timeArea.step)!=''}">
                      <span class="worker-name" v-if="timeIndex==0">{{woker.new_name}}</span>
                      <span>
                        <order-info :text="getMyOrder(time,woker.id,timeArea.step)"></order-info>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- end -->

      </div>

    </div>

  </div>
</template>

<script>
// 服务单显示的组件
import orderInfoComponent from "./mapAssignOrderInfoTmpl.vue";

import point_assigned from "../../assets/imgs/point_assigned.png";
import point_tobeassign from "../../assets/imgs/point_tobeassign.png";

export default {
  data() {
    return {
      hasLeft: false,
      hasRight: false,
      scrollValue: 0,
      orderQueryValue: "", // 服务单查询条件
      queryValue: "", // 服务人员查询条件
      showQueryDialog: false,
      showWorkerDialog: false,
      infoMsg: null, // 地图内信息框显示的内容
      serviceData: [], //table数据绑定
      serviceData2: [], //table数据绑定
      dataTotalCount: 0, //数据总条数
      //crm数据缓存，性能优化,//页面变更时启用
      pageCookie: "",
      workerOrderList: [],
      choosedDayOrderList: [], // 被选中的日期当天的所有订单
      currentRow: null,
      timeArea: [],
      timeStep: 0,
      showType: 0, // showType 0: 全部；1：待派工；2：已派工
      date: null, // 右侧列表默认查询今天的数据
      tabIndex: 0,
      inActiveColor: "#ffffff",
      workerList: [],
      workerList2: [], // 用于右侧显示，一旦有值，不在改变
      map: null, // 百度地图对象
      mapGeo: null, // 地图获取地址对象
      // 百度地图定义的字段
      center: { lng: 0, lat: 0 },
      zoom: 12,
      loadingMap: true,
      mapLoadingText: "",
      loadingMarkers: true,
      loadingOrder: false,
      labelWidth: 150,
      tableWidth: 0,
      tableHeight: 0
    };
  },
  created() {

    this.$nextTick(() => {
      this.tableHeight = this.$refs.workerOrderDetail.clientHeight - 100;
      this._getTimeArea();
      this.getWorkers(); // 获取服务人员
      // 加载数据
      this._getAllOrders();
    });
  },
  mounted() {
    window.onresize = this.setTableShadow;
    window.onload = this.setTableShadow;
  },
  methods: {
    handleBodyScroll() {
      this.scrollValue = this.$refs.tableScroll.scrollLeft;
      this.hasRight = this.scrollValue - this.leftScroll < 0;
      this.hasLeft = this.scrollValue > 0;
    },
    handleBodyScrollTop(event) {
      this.$refs.fixedBody.scrollTop = event.target.scrollTop;
      // this.$refs.fixedRightBody.scrollTop = event.target.scrollTop;
    },
    setTableShadow() {
      this.leftScroll =
        this.$refs.tableContent.clientWidth -
        this.$refs.tableScroll.clientWidth;
      this.handleBodyScroll();
    },
    handlerMap: function ({ BMap, map }) {
      this.map = map;
      this.date = new Date();
      
      var point = null;
      let _this = this;
      // 点击地图的其他地方，隐藏弹出框
      map.addEventListener("click", function (e) {
        //点击事件
        if (!e.overlay) {
          _this.showQueryDialog = false;
          _this.showWorkerDialog = false;
        }
      });
      _this.mapGeo = new BMap.Geocoder();
      // 根据浏览器获取地理位置
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          // 地图添加点覆盖物
          // var mk = new BMap.Marker(r.point);
          // _this.map.addOverlay(mk);

          _this.center.lng = r.point.lng;
          _this.center.lat = r.point.lat;
        } else {
          rt.showErrorToast("failed" + this.getStatus());
        }
      }, function (e) {
        console.log(e);//定位错误事件
      });

      _this.loadingMap = false;
    },
    //加载所有的服务单信息
    _getAllOrders: function () {
      this.loadingMarkers = true;
      this.tabIndex = 0;
      this.showType = 0;
      this.mapLoadingText = this.$t("MapLoad");
      var params = {
        pageIndex: 1,
        pageSize: 5000,
        type: 0,
        queryValue: ""
      };
      let _this = this;

      var requestStr = "../api/WorkOrder/GetAssignWorkOrder";
      rt
        .get(requestStr, params)
        .then(res => {
          if (res.workOrderList.length <= 0) {
            _this.loadingMarkers = false;
            return;
          }

          _this.serviceData2 = [];
          _this.serviceData = res.workOrderList;
          // 默认右侧数据显示为所有的单据源
          if (_this.serviceData2 == null || _this.serviceData2.length <= 0) {
            _this.serviceData2 = res.workOrderList.slice();
          }

          _this.dataTotalCount = res.totalRecordCount;

          // 隐藏点标记和服务人员的查询对话框
          _this.showQueryDialog = false;
          _this.showWorkerDialog = false;

          // 右侧默认显示今天的数据
          _this.getOrdersByDate(null, 0);

          // 加载地图点
          // _this._addMapMarkers(res.workOrderList);
          // 过滤左侧服务单及标记
          _this.orderQueryValue = "";
          _this.filterOrders(0);
        })
        .catch(error => {
          _this.loadingMarkers = false;
          rt.showErrorToast(error);
        });
    },

    // 根据查询条件过滤单据
    filterOrders: function (tabIndex) {
      this.showWorkerDialog = false;
      this.showQueryDialog = false;

      let filteredOrders = this.serviceData2.slice();
      let _this = this;
      _this.map.clearOverlays(); //清除图层覆盖物
      this.loadingMap = true;

      // showType: 0:不做过滤，1:过滤显示类型为未派工
      if (tabIndex > 0) {
        this.tabIndex = tabIndex;
        if (this.tabIndex == 1) {
          // 预约今日
          this.date = new Date();
        } else if (this.tabIndex == 2) {
          // 预约明日
          this.date = new Date().dateAdd("d", 1);
        }
      }

      // 根据预约日期过滤（预约今日，预约明日）
      if (this.tabIndex > 0) {
        filteredOrders = this.getOrdersByDate(filteredOrders);
      }

      // 根据显示类型过滤（未派工，已派工）
      if (this.showType > 0) {
        filteredOrders = this._filterOrderByType(filteredOrders, this.showType);
      }

      let markerOrders = [];

      // 根据查询条件过滤
      if (_this.orderQueryValue != "") {
        filteredOrders.forEach(service => {
          let need = false;
          // 单号，产品线，产品型号，详细地址，服务人员
          if (service.new_dealstatus > 1) {
            // 已派工的过滤服务人员
            if (
              service.new_srv_worker_idname &&
              service.new_srv_worker_idname.indexOf(_this.orderQueryValue) > -1
            ) {
              need = true;
            }
          }

          if (
            (service.new_name &&
              service.new_name
                .toLowerCase()
                .indexOf(_this.orderQueryValue.toLowerCase()) > -1) ||
            (service.new_productgroup_idName &&
              service.new_productgroup_idName.indexOf(_this.orderQueryValue) >
              -1) ||
            (service.new_productmodel_idName &&
              service.new_productmodel_idName.indexOf(_this.orderQueryValue) >
              -1) ||
            (service.new_address &&
              service.new_address.indexOf(_this.orderQueryValue) > -1)
          ) {
            need = true;
          }

          if (need) {
            markerOrders.push(service);
          }
        });

        if (markerOrders.length <= 0) {
          _this.dataTotalCount = 0;
          _this.loadingMap = false;
          _this.loadingOrder = false;
          return;
        }
      } else {
        markerOrders = filteredOrders;
      }

      // 添加地图点
      this.loadingMap = false;
      _this.loadingOrder = false;
      this._addMapMarkers(markerOrders);
    },
    // 根据类型过滤服务单
    _filterOrderByType: function (orders, type) {
      // type: 1：过滤未派工数据， 2： 过滤已派工数据
      if (type == 0) {
        return orders;
      }
      let tmpOrdersArr = [];
      let _this = this;
      if (orders.length > 0) {
        orders.forEach(order => {
          if (type == 1) {
            if (order.new_dealstatus == 1) {
              tmpOrdersArr.push(order);
            }
          } else {
            if (order.new_dealstatus != 1) {
              tmpOrdersArr.push(order);
            }
          }
        });
      }

      return tmpOrdersArr;
    },
    // 获取时间线
    _getTimeArea: function () {
      var apiUrl = "../api/WorkOrder/GetTimeAreaParams";
      rt
        .get(apiUrl)
        .then(res => {
          this.timeArea = res;
          this.tableWidth = this.labelWidth * this.timeArea.TimeAreas.length;
        })
        .catch(err => {
          rt.showErrorToast(err);
        });
    },
    showWorkers: function () {
      this.queryValue = "";
      this.showWorkerDialog = true;
      this.filterWorkers();
    },
    // 点击派工按钮，获取所有服务人员
    getWorkers: function () {
      rt
        .get(`../api/WorkOrder/GetWorkerData?name=${this.queryValue}&skill=`)
        .then(res => {
          this.workerList = res;

          if (this.workerList2 == null || this.workerList2.length <= 0) {
            this.workerList2 = res.slice();
            // this.workerList2.unshift("");
          }
        })
        .catch(err => {
          rt.showErrorToast(err);
        });
    },
    // 根据查询条件过滤用户
    filterWorkers: function () {
      this.workerList = [];

      this.workerList2.forEach(wl2 => {
        if (
          wl2 != "" &&
          (wl2.new_name.indexOf(this.queryValue) > -1 ||
            wl2.new_phone.indexOf(this.queryValue) > -1 ||
            wl2.pinyin.indexOf(this.queryValue.toLowerCase()) > -1)
          //
        ) {
          this.workerList.push(wl2);
        }
      });
    },
    // 处理当前选中行
    handleCurrentChange: function (val) {
      this.currentRow = val;
    },
    // 派工处理
    assignWorker: function () {
      if (!this.currentRow) {
        rt.showErrorToast("请选择服务人员");
      }

      let postData = {
        id: this.infoMsg.id,
        workerId: this.currentRow.id,
        workerPhone: this.currentRow.new_phone
      };

      this.loadingMap = true;
      this.mapLoadingText = "正在派工...";

      rt
        .post("../api/WorkOrder/ChangeWorker", postData)
        .then(res => {
          rt.showSuccessToast(res);
          this.showQueryDialog = false;
          this.showWorkerDialog = false;
          this.loadingMap = false;
          this._getAllOrders();
        })
        .catch(err => {
          this.showQueryDialog = false;
          this.showWorkerDialog = false;
          this.loadingMap = false;
          rt.showErrorToast(err);
        });
    },
    // 根据日期获取相同日期内的工单
    getOrdersByDate(orders, type) {
      this.loadingOrder = false;

      let tmpOrderArr = [];
      let _this = this;

      if (orders == null || orders.length <= 0) {
        orders = this.serviceData2.slice();
      }

      if (orders == null || orders.length <= 0) {
        this.loadingOrder = false;
        return tmpOrderArr;
      }

      orders.forEach((order, index) => {
        // 没有预约时间的，不做处理

        if (order.new_appointmenttime && order.new_appointmenttime != "") {
          order.new_appointmenttime = order.new_appointmenttime.replace(
            new RegExp(/-/gm),
            "/"
          ); //将所有的'-'转为'/'即可
          let tmpTime = rt.formatDateTime(
            new Date(order.new_appointmenttime),
            "yyyy-mm-dd"
          );
          let compareTime = rt.formatDateTime(_this.date, "yyyy-mm-dd");

          if (tmpTime == compareTime) {
            tmpOrderArr.push(order);
          }
        }

        if (index >= orders.length - 1) {
          _this.loadingOrder = false;
        }
      });

      this.choosedDayOrderList = tmpOrderArr;

      return tmpOrderArr;
    },
    // 获取我的工单
    getMyOrder: function (timeStart, woker, timeStep) {
      // time 10:20  timeStep

      let orderMsg = "";

      if (timeStart == "") {
        return orderMsg;
      }
      // 当天没有数据，直接返回
      if (
        this.choosedDayOrderList == null ||
        this.choosedDayOrderList.length <= 0
      ) {
        return orderMsg;
      }

      let tmpArr = timeStart.split(":");

      // 开始时间点
      let beginTime = new Date("2017/12/21 " + timeStart);
      // 结束时间点
      let endTime = null;
      if (parseInt(tmpArr[0]) < 23) {
        endTime = new Date(
          "2017/12/21 " + (parseInt(tmpArr[0]) + 1) + ":" + tmpArr[1]
        );
      } else {
        endTime = new Date("2017/12/22 " + "00" + ":" + tmpArr[1]);
      }

      this.choosedDayOrderList.forEach(order => {
        let orderTime = new Date(order.new_appointmenttime);

        let tmpTime = new Date(
          "2017/12/21 " + orderTime.getHours() + ":" + orderTime.getMinutes()
        ); // 12:21

        // 如果时间字符串和人员都符合，返回数据
        if (
          order.new_srv_worker_id === woker &&
          tmpTime >= beginTime &&
          tmpTime < endTime
        ) {
          orderMsg += `${order.new_productgroup_idName ||
            ""}/${order.new_productmodel_idName || ""},${order.new_address ||
            ""};`;
        }
      });

      // 去掉最后一个符号
      orderMsg = orderMsg.substring(0, orderMsg.length - 1);

      return orderMsg;
    },
    // 日期修改事件
    changeWorkerDate: function () {
      this.getOrdersByDate(null, 0);
    },
    // 加载地图标记点
    _addMapMarkers: function (orders) {
      let _this = this;
      // 加载loading框
      _this.loadingMap = true;
      _this.loadingMarkers = true;
      _this.dataTotalCount = 0;

      _this.map.clearOverlays(); //清除图层覆盖物

      // 如果不存在点，返回
      if (orders == null || orders.length <= 0) {
        _this.loadingMap = false;
        _this.loadingMarkers = false;
        return;
      }

      // 加载地图上的点
      orders.forEach((order, index) => {
        let address = `${order.new_province_idname}${order.new_city_idname}${
          order.new_county_idname
          }${order.new_address}`;

        if (_this.tabIndex > 0) {
          console.log(order);
        }

        if (order.new_dealstatus === 1) {
          _this.dataTotalCount += 1;
        }

        _this.mapGeo.getPoint(address, function (point) {
          if (point) {
            // 地图需要加载的marker  ${order.new_dealstatus<=1?'point_tobeassign':'point_assigned'}
            var myIcon = new BMap.Icon(
              order.new_dealstatus <= 1 ? point_tobeassign : point_assigned,
              new BMap.Size(19, 30)
            ); //定义自己的标注
            let marker = new BMap.Marker(point, { icon: myIcon });
            // 给marker添加点击事件
            marker.addEventListener("click", e => {
              markerClick(order, address, point);
            });
            // 把marker添加到地图中去
            _this.map.addOverlay(marker);

            if (index >= orders.length - 1) {
              _this.loadingMap = false;
              _this.loadingMarkers = false;
            }
          } else {
            rt.showErrorToast(`地址[${address}]没有解析到结果!`);
          }
        });

        // 地图上的标记点点击事件
        function markerClick(order, address, point) {
          _this.showWorkerDialog = false;
          _this.infoMsg = order;

          _this.infoMsg.new_appointmenttime = order.new_appointmenttime;
          _this.infoMsg.worker = order.new_srv_worker_idname;
          _this.infoMsg.new_dealstatus = order.new_dealstatus;

          // 左侧图标显示，右侧日历联动
          if (
            order.new_appointmenttime != null &&
            order.new_appointmenttime !== ""
          ) {
            _this.date = order.new_appointmenttime;
          } else {
            _this.date = new Date();
          }

          _this.infoMsg.addressdetail = address;
          _this.showQueryDialog = true;
        }
      });
    },
    // 查看待派工的数据及标记
    getToAssignOrder: function () {
      this.showType = 1;
      this.filterOrders();
    }
  },
  components: {
    "order-info": orderInfoComponent
  }
};
</script>

<style>
.search .el-input-group__append {
	background: #1fb6d8;
	border-color: #1fb6d8;
	color: #ffffff;
}

.mapAssign table {
	table-layout: fixed;
}

.mapAssign th {
	border-right: 1px solid #ccc;
}

.button-area.deeper-button button {
	height: 30px;
}

.map-worker-list .el-table__body tr.current-row > td {
	background: #f0f0f0;
}

.map-worker-list
	.el-table--striped
	.el-table__body
	tr.el-table__row--striped.current-row
	td {
	background: #f0f0f0;
}

.map-worker-list .search .el-input__inner {
	padding-left: 20px;
}

.map-worker-list .el-table .cell {
	box-sizing: border-box;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: normal;
	word-break: break-all;
	line-height: 24px;
	padding-left: 20px;
	padding-right: 18px;
}

.tools .tab-query .el-input__inner {
	padding-left: 20px;
}
</style>

<style scoped>
.mapAssign {
	height: 100%;
	display: flex;
}

.inline-b {
	display: inline-block;
}

.inline-b img {
	margin-right: 6px;
}

.default-color {
	color: #555555;
}
.inActiveColor {
	color: #1fb6d8;
	font-weight: 700;
}

.tabs {
	line-height: 36px;
	margin-left: 100px;
	display: flex;
	font-size: 14px;
}

.tab-divider {
	height: 14px;
	width: 1px;
	margin: 11px 20px;
	background-color: #cccccc;
}

.tools .tab-query {
	position: absolute;
	right: 20px;
	margin-top: 5px;
}

.mapAssign .rt-header {
	flex: 0;
}
.content {
	width: 60%;
	position: relative;
	margin-top: 10px;
	margin-right: 10px;
	display: flex;
	flex-direction: column;
}

#assign-map.map {
	height: 100%;
}

.tools {
	position: absolute;
	height: 36px;
	background-color: #ffffff;
	z-index: 2;
	display: flex;
	width: 100%;
}

.tools .count {
	line-height: 36px;
	margin-left: 20px;
	font-size: 14px;
	color: #888888;
}

.tools .count:hover {
	cursor: pointer;
}

.assign-query {
	position: absolute;
	top: 300px;
	left: 60px;
	z-index: 2;
	background-color: #ffffff;
	box-shadow: 0 0 5px #ccc;
}

.worker-calender {
	flex: 1;
	width: 40%;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow-x: hidden;
	overflow-y: hidden;
}

.calender-header {
	display: flex;
	min-height: 36px;
	position: relative;
	overflow: hidden;
}

.worker-order-detail {
	height: 100%;
	background-color: #ffffff;
}

.info .title {
	background-color: #1fb6d8;
	text-align: center;
	color: #ffffff;
	height: 30px;
	font-size: 14px;
	font-weight: 700;
	line-height: 30px;
}

.info .product {
	font-weight: 700;
	padding: 12px 10px;
	font-size: 14px;
	color: #555;
}
.info hr {
	margin: 0 10px;
}

.info .time-area {
	display: flex;
	padding: 20px 0 20px 10px;
	font-size: 14px;
	color: #555;
	align-items: center;
}
.info .address-area {
	display: flex;
	padding: 0 10px 16px 10px;
}
.button-area {
	text-align: center;
	height: 36px;
	line-height: 36px;
	background-color: #f5f5f5;
}
.button-area:hover {
	cursor: pointer;
}

.info .el-button--text {
	font-size: 14px;
	font-weight: 700;
}

.deeper-button {
	background-color: #1eb7d9;
}

.deeper-button .el-button--text {
	color: #fff;
	font-weight: 700;
}

.button-area img {
	margin-left: 10px;
	vertical-align: middle;
}

.worker {
	height: 80px;
	line-height: 80px;
	background-color: #ffffff;
	border: 1px solid #e5e5e5;
	box-sizing: border-box;
}

.worker .name {
	margin-left: 20px;
}

.order {
	display: inline-block;
}

/* 地图派工列表样式 */
.map-worker-list {
	position: absolute;
	top: 40px;
	right: 200px;
	background-color: #fff;
	z-index: 2;
	box-shadow: 0 0 5px #ccc;
}

.el-date-editor.el-input.worker-order-date {
	width: 30% !important;
	margin: 5px 20px;
	position: absolute !important;
	right: 0;
}

.map-worker-list .search {
	padding: 14px 20px;
	box-sizing: border-box;
	width: 260px;
}

.time {
	height: 36px;
	line-height: 36px;
	font-size: 14px;
	color: #555555;
	background-color: #ebebeb;
}

.time-line {
	width: 150px;
	flex: 1;
	min-width: 150px;
	border: solid 1px #ededed;
	border-width: 0 1px 1px 0;
	box-sizing: border-box;
	position: relative;
}

.workers {
	height: auto;
	display: flex;
	min-height: 50px;
}

.worker-name {
	font-size: 12px;
	color: #555;
	vertical-align: middle;
	display: inline-block;
}
/* worker-name */
.worker-name:after {
	content: '';
	display: inline-block;
	height: 100%;
	vertical-align: middle;
}

.first-row {
	height: 36px;
	min-height: 36px;
}

.first-row .time-line {
	background-color: #ebebeb;
	border-right: 1px solid #d6d6d6;
}

.has-workorder-data {
	background-color: #f5f5f5;
}

.worker-name-line {
	min-width: auto;
}

/* 表格部分样式 */

.table-area {
	/* overflow: hidden; */
	border: 1px solid #ccc;
	position: relative;
	height: 100%;
}

* {
	box-sizing: border-box;
}

body {
	background: #fff;
}

table {
	table-layout: fixed;
	width: 100%;
}

table td {
	border-bottom: 1px solid #999;
	min-height: 50px;
	vertical-align: middle;
	text-align: center;
}

td {
	border: 1px solid #ccc;
	min-height: 50px;
	height: 50px;
}

.left-line {
	/* height: 800px; */
	overflow: hidden;
}

.tdHidden {
	visibility: hidden;
}

.table-fixed-left {
	border-right: 0;
	box-shadow: none;
	transition: box-shadow 0.3s ease;
	width: 150px;
	position: absolute;
	top: 0;
	left: 0;
	/* height: 100%; */
	overflow: hidden;
	background: #fff;
}

.table-header {
	overflow-x: auto;
	position: relative;
	overflow-y: hidden;
}

.table-scroll-content {
	overflow-y: auto;
	/* height: 800px; */
	width: 100%;
	overflow-x: hidden;
}

.table-fixed-right {
	border-left: 0;
	box-shadow: none;
	transition: box-shadow 0.3s ease;
}

.table-fixed-left-scroll {
	box-shadow: 6px 0 6px -4px rgba(0, 0, 0, 0.2);
}

.table-fixed-right-scroll {
	box-shadow: -6px 0 6px -4px rgba(0, 0, 0, 0.2);
}
</style>
