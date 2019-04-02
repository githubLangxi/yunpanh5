<template>
<div>

<!--<rt-header :title="人员表单">-->
  <!--</rt-header>-->
  <template>

    <div class="table-content" >
      <el-table :data="tableData" :row-class-name="222" style="width: 100%;" border >
      <el-table-column prop="filename" label="文件名称" show-overflow-tooltip>
      </el-table-column>
        <el-table-column sortable label="尺寸">
          <template slot-scope="scope">
            <!--slot-scope="scope"-->
            <!--@click="partsReturnDataEdit(scope.row)"-->
            <el-button type="text" >{{getfilesize(scope.row.filesize)}}</el-button>
          </template>
        </el-table-column>
      <!--<el-table-column prop="filesize" label="尺寸(Byte)" show-overflow-tooltip>-->
      <!--</el-table-column>-->
        <el-table-column prop="createTime" :formatter="(row, column) => DateFormatter(row, 'createTime',true)" sortable label="创建时间">
        </el-table-column>
        <el-table-column sortable label="下载">
        <template slot-scope="scope">
          <!--slot-scope="scope"-->
          <!--@click="partsReturnDataEdit(scope.row)"-->
          <el-button type="text" @click="selecttable(scope.row)" >下载</el-button>
        </template>
      </el-table-column>
        <el-table-column sortable label="查看">
          <template slot-scope="scope">
            <!--slot-scope="scope"-->
            <!--@click="partsReturnDataEdit(scope.row)"-->
            <el-button type="text" ><a :href="scope.row.filepath">查看</a></el-button>
          </template>
        </el-table-column>
    </el-table>
    </div>
  </template>

</div>
</template>

<script>
export default {
  props: ['fileitems', 'hel'],
  data: function () {
    return {
      hell: "a",
      //页面初始化数据
      /*************/
      loading: false, //加载特效
      tableData: [], //table数据设定

      isneedCookie: false //页面变更时启用
    };
  },

  components: {},
  mounted:async  function () {

   await  this._fetchRecords();
  },
  computed: {},
  methods: {
    browserIsIe() {
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
      } else {
        return false;
      }
    },
    imgDownload(url, filename) {
      var browserIsIe = this.browserIsIe();

      if (browserIsIe) {
        var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = url;
        save_link.download = filename;
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
      } else {
        // window.location.href = CONTEXT_PATH + "/api/qyda/qyxx/downLoadQyxxPic?dataUrl=" + url + "&fileName=" + filename;
      }
    }
    ,
    getfilesize(size) {
      if (!size)
        return "";

      var num = 1024.00; //byte

      if (size < num)
        return size + "B";
      if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + "K"; //kb
      if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
      if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
      return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
    },
    selecttable(item) {
      alert(1);
      console.log(item)
      console.log(item.filename);
      this.imgDownload(item.filepath, item.filename)
      let link = document.createElement('list')
      link.style.display = 'none'
      link.href = "https://img.qiaoxuesi.com/qr_api/img/OW3eSZagZiPA.png"//http://local.gankao.com:8057/static/images/qrimgzip/hahda2019-03-28.zip" //"data:application/zip;charset=utf-8,"+result;
      link.setAttribute('download', "a.zip")// this.$cookies.get("dirname") + '.zip'
      document.body.appendChild(link)
      link.click()
    },
    /***************/
    /***数据初始化***/
    /***************/
    //数据加载
    async _fetchRecords() {

      debugger;
       this.tableData = this.fileitems;


    },


  }

}
</script>

<style scoped>

</style>
