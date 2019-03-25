<template>
<div class="uploader-list" v-loading="loading">
<ul id="thelist">
    <li v-for="list in signprocess.Img">
    <div>
        <img :src="list.Data"/>
    </div>
    <div class="picname">
        {{list.FileName}}
    </div>
</li>
</ul>
</div>
</template>
<script>
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
      if (this.applyId) {
        this.loading = true;
        var requestStr = "../api/StationApply/GetPictureList/" + this.applyId;
        rt.get(requestStr)
          .then(res => {
            this.loading = false;
            this.signprocess = JSON.parse(res);
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.loading = false;
          });
      }
    }
  }
};
</script>
<style>
img {
  vertical-align: top;
  border: none;
}
li {
  list-style: none;
}
.uploader-list {
  width: 100%;
  height: 60%;
}
.uploader-list > ul > li {
  float: left;
  width: 208px;
  border-radius: 5px;
  border: 1px #bebebe solid;
  margin: 10px 15px;
}
.uploader > ul > li:nth-last-child(1) {
  margin-right: 0px;
}
.uploader-list > ul > li img {
  opacity: 0.7;
  transition: all ease 1s;
  filter: alpha(opacity=70); /* 针对 IE8 以及更早的版本 */
  width: 200px;
  height: 150px;
  border: 1px #bebebe solid;
  margin: 3px;
}
.uploader-list > ul > li img:hover {
  opacity: 1;
  filter: alpha(opacity=100); /* 针对 IE8 以及更早的版本 */
}

.uploader-list > ul > li div {
  float: left;
}
.picname {
  text-align: center;
  color: #000;
  font-size: 14px;
  width: 100%;
}
</style>