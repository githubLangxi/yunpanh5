<template>
  <div class="mapassign-order-info" v-if=" productArr.length>0">
    <div class="worker-order-area" :class="{'need-bg':text!=''&&rowIndex!=0}">
      <div class="orders" v-for="(pro,proIndex) in productArr" :class="{'last-order':proIndex==productArr.length-1}"  v-if="pro">
        <!--  -->
        <div :class="{'order-product':text!=''}">{{getProduct(pro).product}}</div>
        <div v-if="getProduct(pro).address" :class="{'order-address':getProduct(pro).address}">{{getProduct(pro).address}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mapassingorderinfo",
  data: function() {
    return {
     
    }
  },
  props: {
    text: String,
    index: Number,
    rowIndex: Number,
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getProduct: function(proStr) {
      let tmpObj = { product : '', address : '' }
      if(proStr) {
        tmpObj.product = proStr.split(',')[0];
        tmpObj.address = proStr.split(',')[1];

      }

      return tmpObj;
    }
  },
  computed: {
    productArr: function() {
      return this.text ? this.text.split(";") : [];
    }
  }
};
</script>

<style scoped>

.mapassign-order-info {
  /* background-color: #f5f5f5; */
}

.need-bg {
  min-height: 50px;
}

/* 服务人员已派单情况样式 */
.worker-order-area {
  font-size: 10px;
  color: #555555;
  text-align: center;
}

.order-product {
  /* display: inline-block; */
  padding: 10px 0;
}

.last-order {
  /* display: inline-block; */
  /* padding-bottom: 10px; */
  /* border-bottom: 1px solid #ededed; */
}
.order-address {
  /* display: inline-block; */
  /* padding-bottom: 10px; */
  /* border-bottom: 1px solid #ededed; */
}
</style>