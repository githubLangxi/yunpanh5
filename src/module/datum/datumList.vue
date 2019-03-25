<template>
    <div class="tableData">
        <!-- 头部标题 -->
        <rt-header :title="$t('DocumentDownload')">
        </rt-header>
        <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset">
            <template slot="toolbar">
                <rt-button type="export" @click="exportData" />
            </template>
            <template slot="more">
                <el-form :model="queryForm" ref="queryForm" label-position="left" label-width="120px">
                    <el-row :gutter="40" type="flex">
                        <el-col :span="8">
                            <el-form-item :label="$t('kbarticle.createdon') +$t('From')" prop="dateFrom">
                                <el-date-picker v-model="queryForm.dateFrom" type="date" @change="startDateCheck"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('kbarticle.createdon') +$t('To')" prop="dateTo">
                                <el-date-picker v-model="queryForm.dateTo" type="date" @change="endDateCheck"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>

            <!-- 公告列表 -->
            <el-table ref="gridTable" v-bind:data="tableData" stripe tooltip-effect="dark" style="width: 100%" v-loading="loading">
                <el-table-column prop="number" :label="$t('kbarticle.number')">
                </el-table-column>
                <el-table-column prop="subjectid" :label="$t('kbarticle.subjectid')">
                </el-table-column>
                <el-table-column prop="languagecode" :label="$t('kbarticle.languagecode')">
                </el-table-column>
                <el-table-column prop="title" :label="$t('kbarticle.title')">
                </el-table-column>
                <el-table-column prop="createdon" :label="$t('kbarticle.createdon')">
                </el-table-column>
                <el-table-column :label="$t('ACT')">
                    <template slot-scope="scope">
                        <a :href="scope.row.filelink" :download="scope.row.filename" @click="downLoadFile(scope.$index,scope.row)" class="row-opera">{{$t('Download')}}</a>
                    </template>
                </el-table-column>
            </el-table>

        </rt-grid>
    </div>
</template>

    <script type="text/javascript">
export default {
  data: function() {
    return {
      loading: false,
      dataTotalCount: 0, //数据总条数
      queryForm: {
        dateFrom: "",
        dateTo: ""
      },
      tableData: [],
      orderby: "createdon,descending" //排序条件
    };
  },
  mounted: function() {
    this._fetchRecords();
  },
  computed: {
    filter: function() {
      var filter = "";
      if (
        this.$refs.grid.quickSearch != null &&
        this.$refs.grid.quickSearch != ""
      ) {
        filter = "quicksearch=" + this.$refs.grid.quickSearch + ",";
      }
      //创建时间从
      if (this.queryForm.dateFrom) {
        filter +=
          "dateFrom=" +
          rt.formatDateTime(this.queryForm.dateFrom, "yyyy-mm-dd") +
          ",";
      }
      //到
      if (this.queryForm.dateTo) {
        filter +=
          "dateTo=" +
          rt.formatDateTime(this.queryForm.dateTo, "yyyy-mm-dd") +
          ",";
      }
      if (filter.length > 0) {
        return filter.substring(filter, filter.length - 1);
      }
      return "";
    }
  },
  methods: {
    _fetchRecords: function() {
      var params = {
        pageIndex: this.$refs.grid.getPageIndex(),
        pageSize: this.$refs.grid.getPageSize(),
        filter: this.filter,
        orderby: this.orderby
      };
      this.loading = true;
      var requestStr = "../api/Kbarticle/GetKnowledgeForHome";
      rt
        .get(requestStr, params)
        .then(res => {
          this.tableData = res;
          this.pageCookie = res.pagingCookie;
          this.dataTotalCount = res.totalRecordCount;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    handleSearch: function() {
      this._fetchRecords();
    },
    //页面发生变化
    handlePageChange: function() {
      this._fetchRecords();
    },
    //数据导出
    exportData: function() {
      console.log("数据导出");
    },
    //下载附件
    downLoadFile: function(index, row) {
      // let filelink = 'data:' + row.mimetype + ";base64," + row.documentbody;
      // console.log(filelink)
      // row.blob = this.base64Img2Blob(filelink)
      // row.filelink = window.URL.createObjectURL(row.blob);
      // console.log(row.filelink)
      // let userAgent = navigator.userAgent;
      // if (userAgent.indexOf("Trident") > -1) {
      //     //用于IE浏览器
      //     window.navigator.msSaveBlob(row.blob, row.filename);
      // }
    },
    base64Img2Blob: function(code) {
      // var parts = code.split(';base64,');
      // var contentType = parts[0].split(':')[1];
      // var raw = window.atob(parts[1]);
      // var rawLength = raw.length;
      // var uInt8Array = new Uint8Array(rawLength);
      // for (var i = 0; i < rawLength; ++i) {
      //     uInt8Array[i] = raw.charCodeAt(i);
      // }
      // return new Blob([uInt8Array], { type: contentType });
    },
    //结束时间change事件
    endDateCheck: function() {
      if (this.queryForm.dateFrom) {
        if (this.queryForm.dateFrom > this.queryForm.dateTo) {
          rt.showErrorToast("结束时间必须大于等于开始时间");
          this.queryForm.dateTo = null;
        }
      }
    },
    //开始时间change事件
    startDateCheck: function() {
      if (this.queryForm.dateTo) {
        if (this.queryForm.dateFrom > this.queryForm.dateTo) {
          rt.showErrorToast("开始时间必须小于等于结束时间");
          this.queryForm.dateFrom = null;
        }
      }
    },
    //重置查询选项
    handleReset: function() {
      this.$refs["queryForm"].resetFields();
      this.$refs.grid.quickSearch = "";
    }
  }
};
</script>
