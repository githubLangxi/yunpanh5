<template>
	<div class="signprocess" v-loading="loading">
		<li v-for="list in signprocess.stateList">
			<div v-bind:class="signprocess.currentStateValue==(list.stateValue)?'active':'statusValue'">
				{{list.num}}
			</div>
			<div class="statusText">
				<span v-bind:class="signprocess.currentStateValue==(list.stateValue)?'active1':''">{{list.stateText}}</span>
				<span style="" v-if="signprocess.currentStateValue==(list.stateValue)?true:false">{{list.optTime}}</span>
			</div>
		</li>
	</div>
</template>
<script type="text/javascript">
export default {
  data: function() {
    return {
      signprocess: {},
      loading: false
    };
  },
  props: {
    applyId: {
      type: String,
      require: true
    }
  },
  mounted: function() {
    if (this.applyId) {
      this.loadData();
    }
  },
  methods: {
    loadData: function() {
      this.loading = true;
      var apiUrl = "api/StationApply/ApplyProGress/" + this.applyId;
      rt.get(apiUrl)
        .then(res => {
          this.loading = false;
          this.signprocess = JSON.parse(res);
          // for (var i = 0; i <= this.signprocess.stateList.length; i++) {
          //   this.signprocess.stateList[i]["num"] = i + 1;
          // }
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    }
  }
};
</script>
<style type="text/css" scoped>
.signprocess li {
  list-style: none;
  display: inline-block;
  width: 20%;
}
.signprocess span {
  display: block;
}
.signprocess .active1 {
  color: #1fb6d8;
}
.signprocess {
  padding: 20px 0 20px 16px;
  margin-top: 10px;
  background: #fff;
}
.statusValue {
  float: left;
  width: 45px;
  height: 45px;
  border-radius: 100%;
  color: #fff;
  background: darkgray;
  line-height: 45px;
  text-align: center;
}
.statusText {
  float: left;
  margin-left: 8px;
  padding-top: 5px;
  height: 45px;
  /* line-height: 45px; */
}
.statusText span {
  padding: 4px 0px;
}
.active {
  float: left;
  width: 45px;
  height: 45px;
  border-radius: 100%;
  color: #fff;
  background: #1fb6d8;
  line-height: 45px;
  text-align: center;
}
</style>