<template>
  <div class="sitereturnedit">
    <rt-header>
      <rt-toolbar showBack @goback="beforeGoBack">
         <rt-button text="打印" type="print" @click="printContent" />
      </rt-toolbar>
    </rt-header>
    <div id="printDiv">
        <div id="order" style="width:90%;padding-left:5%;padding-right:5%;font-size:12px;">
        <div style="width:100%;text-align:center;">
            <h style="font-size:20px;">{{order.new_stocksite_sendidName +order.new_returntypeName+"单"}}</h>
        </div>
        <div style="padding-top:10px;">
            <div style="display:flex;">
                <div style="width:12.5%;">发货单号</div>
                <h style="width:35%;">{{order.new_name}}</h>
                <div style="width:12.5%;" >发货日期</div>
                <div >{{order.new_approved_timeUTC}}</div>
            </div>
            <div id="div" style="display:flex;width:100%;">
                <div style="width:12.5%;">收货单位</div>
                <div style="width:35%;">{{order.new_stocksite_receiveidName}}</div>
                <div style="width:12.5%;">收货人</div>
                <div style="width:15%;">{{order.new_receiver}}</div>
                <div style="width:7.5%;">电话</div>
                <div>{{order.new_receiverphone}}</div>
            </div>
            <div id="div" style="display:flex;">
                <div style="width:12.5%;">收货地址</div>
                <div>{{order.new_address}}</div>
            </div>
            <div id="div" style="display:flex;">
                <div style="width:12.5%;">备注</div>
                <div style="width:35%;">{{order.new_memo}}</div>
                <div style="width:12.5%;">物流公司</div>
                <div>{{order.new_logistics_companyName}}</div>
            </div>
        </div>


        <div style="padding-top:10px;">
            <div style="display:flex;width:100%;">
                <div class="columndiv" style="width:500px;">
                    <div>序号</div>
                </div>
                <div class="columndiv" style="width:1800px;">
                    <div>物料编码</div>
                </div>
                <div class="columndiv" style="width:4000px;">
                    <div>物料名称</div>
                </div>
                <div class="columndiv" style="width:800px;">
                    <div>单位</div>
                </div>
                <div class="columndiv">
                    <div>数量</div>
                </div>
                <div class="columndiv" style="width:1800px;">
                    <div>物流单号</div>
                </div>
                <div class="columndiv" style="border-right-width: 1px;">
                    <div>备注</div>
                </div>
            </div>
            <div style="display:flex;" v-for="(detail,index) in detailList">
                <div class="valuediv" style="text-align:center;width:500px;">
                    <div>{{index+1}}</div>
                </div>
                <div class="valuediv" style="width:1800px;">
                    <div>{{detail.new_partcode}}</div>
                </div>
                <div class="valuediv" style="width:4000px;">
                    <div>{{detail.new_product_idName}}</div>
                </div>
                <div class="valuediv" style="width:800px;">
                    <div>{{detail.new_uomidName}}</div>
                </div>
                <div class="valuediv" style="text-align:center;">
                    <div>{{detail.new_returnqty}}</div>
                </div>
                <div class="valuediv" style="width:1800px;">
                    <div>{{detail.new_logisticscode}}</div>
                </div>
                <div class="valuediv" style="border-right-width: 1px;">
                    <div></div>
                </div>
            </div>
            <div style="display:flex;">
                <div class="valuediv" style="width:7100px;padding-left:3px;border-bottom-width: 1px;text-align:center;">
                    <div>总计</div>
                </div>
                <div class="valuediv" style="text-align:center;border-bottom-width: 1px;">
                    <div>{{amount}}</div>
                </div>
                <div class="valuediv" style="border-bottom-width: 1px;width:1800px;">
                    <div></div>
                </div>
                <div class="valuediv" style="border-right-width: 1px;border-bottom-width: 1px;">
                    <div></div>
                </div>
            </div>
        </div>
        <div style="padding-top:10px;display:flex;">
            <div style="width:12.5%;">发货单位</div>
            <div style="width:40%">{{order.new_stocksite_sendidName}}</div>
            <div style="width:22.5%;">承运人</div>
            <div>电话</div>
        </div>
        <div style="padding-top:10px;display:flex;">
            <div style="width:12.5%;">合计</div>
            <div style="width:30%">配件</div>
            <div style="width:10%;">箱</div>
            <div style="width:12.5%;">纸箱</div>
            <div style="width:10%;">个</div>
            <div>其他</div>
        </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sitereturnid: "",
      order: {
        new_name: "",
        new_approved_timeUTC: "",
        new_stocksite_receiveidName: "",
        new_receiver: "",
        new_receiverphone: "",
        new_address: "",
        new_memo: "",
        new_logistics_companyName: "",
      },
      detail: {
        new_partcode: "",
        new_product_idName: "",
        new_uomidName: "",
        new_returnqty: 0,
        new_logisticscode: "",
      },
      detailList: [],
      amount: 0,
    };
  },
  mounted: function() {
    if (this.$route.params.id) {
      this.sitereturnid = this.$route.params.id;
      this.initOrderData();
      this.initDetailData();
    }
  },
  methods: {
    initOrderData() {
      var that = this;
      var apiUrl =
        "../api/SrvSiteReturn/GetSrvSiteReturnSign/" + this.sitereturnid;
      rt
        .get(apiUrl)
        .then(res => {
          that.order = res;
        })
        .catch(e => {});
    },
    initDetailData() {
      var that = this;
      var apiUrl =
        "../api/SrvSiteReturn/GetSiteReturnLineList/" + this.sitereturnid;
      rt
        .get(apiUrl)
        .then(res => {
          that.detailList = res;
          for (var i = 0; i < that.detailList.length;i++) {
            that.amount += parseInt(that.detailList[i].new_returnqty);
          }
        })
        .catch(e => {});
    },
    printContent() {
      let subOutputRankPrint = document.getElementById("printDiv");
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      return false;
    },
    beforeGoBack: function() {
      this.$router.push({
        name: "sitereturnedit",
        params: { id: this.sitereturnid }
      });
    }
  }
};
</script>
<style>
.columndiv {
  width: 1000px;
  text-align: center;
  border-style: solid;
  border-width: 1px 0px 0px 1px;
}

.valuediv {
  width: 1000px;
  border-style: solid;
  border-width: 1px 0px 0px 1px;
}

#div {
  padding-top: 5px;
}
</style>