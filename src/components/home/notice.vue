<template>
    <div style="width:100%;height:100%;">
        <template>
            <div class="rt-home-table-header">
                <h2>{{$t('Notice')}}</h2>
                <el-button id="noticemore" type="text" @click="showmore">
                    {{$t('More')}}
                </el-button>
            </div>
            <template>
                <div class="table-content">
                    <el-table :data="noticeData" :row-class-name="tableRowClassName" style="width: 100%" border @row-dblclick="doubleClick">
                        <el-table-column :label="$t('Notice')">
                            <template slot-scope="scope">
                                <img src="../../assets/imgs/公告.png" style="vertical-align: text-top;"/>
                                <el-button id="new_title" type="text" @click="noticedetail(scope.row)">{{ scope.row.new_title }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="new_publishdate" :label="$t('NoticePublishTime')">
                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </template>
    </div>
</template>
<script >
export default {
  data: function() {
    return {
      noticeData: []
    };
  },
  mounted: function() {
    this._fetchRecords();
  },
  methods: {
    //加载数据
    _fetchRecords: function() {
      var requestStr = "../api/NoticeData/GetCurrentNotice";
      rt
        .get(requestStr)
        .then(res => {
          this.noticeData = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    showmore: function() {
      this.$router.push({ name: "NoticeList" });
    },
    noticedetail: function(row) {
      this.$router.push({ name: "NoticeView", params: { id: row.Id } });
    },
    doubleClick: function(row) {
      this.$router.push({ name: "NoticeView", params: { id: row.Id } });
    },
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

#noticemore {
  position: relative;
  float: right;
  z-index: 100;
  color: black;
  text-decoration: none;
  margin-right: 20px;
  margin-top: -10px;
  font-size: 14px;
  color: #555;
}

#noticemore:hover {
  color: #20a0ff;
  text-decoration: underline;
}

#new_title {
  color: #555;
  margin-left: 10px;
  font-size: 12px;
}

#new_title:hover {
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
  .table-content {
    height: 256px;
  }
}
</style>