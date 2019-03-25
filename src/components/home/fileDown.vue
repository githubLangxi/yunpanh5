<template>
    <div style="width:100%;height:100%;">
        <template>
            <div class="rt-home-table-header">
                <h2>{{$t('DataDownload')}}</h2>
                <el-button id="filemore" type="text" @click="showmore">
                    {{$t('More')}}
                </el-button>
            </div>
            <template>
                <div class="table-content">
                    <el-table :data="fileData" :row-class-name="tableRowClassName" style="width: 100%" border @row-dblclick="doubleClick">
                        <el-table-column :label="$t('FileName')" prop="title" align="left">
                            <template slot-scope="scope">
                                <img src="../../assets/imgs/阅读.png" style="vertical-align: text-top;" />
                                <el-button id="title" type="text" @click="fileRead(scope.row)">{{ scope.row.title }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createdon" :label="$t('NoticePublishTime')">
                        </el-table-column>
                    </el-table>
                </div>
            </template>

        </template>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      fileData: []
    };
  },
  mounted: function() {
    this._fetchRecords();
  },
  methods: {
    //加载数据
    _fetchRecords: function() {
      var requestStr = "../api/Kbarticle/GetKnowledgeForHome";
      rt
        .get(requestStr)
        .then(res => {
          this.fileData = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    fileRead: function(row) {
      console.log(row.Id);
    },
    showmore: function() {
      this.$router.push({ name: "DatumList" });
    },
    doubleClick: function() {},
    tableRowClassName: function(row, index) {
      if (index % 2 === 0) {
        //偶数行
        return "positive-row";
      } else {
        //奇数行
        return "info-row";
      }
      return "";
    }
  }
};
</script>
<style>
.table-content {
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background: #fff;
  height: 216px;
}

#filemore {
  position: relative;
  float: right;
  z-index: 100;
  text-decoration: none;
  margin-right: 20px;
  margin-top: -10px;
  font-size: 14px;
  color: #555;
}

#filemore:hover {
  color: #20a0ff;
  text-decoration: underline;
}

#title {
  color: #555;
  margin-left: 10px;
  font-size: 12px;
}

#title:hover {
  color: #20a0ff;
  text-decoration: underline;
}

.el-table .info-row {
  background: #fafafa;
}

.el-table .positive-row {
  background: #fff;
}

@media screen and (min-width: 1920px) {
  .table-content {
    height: 256px;
  }
}
</style>