    <template>
    <div class="tableData">

        <!-- 头部标题 -->
        <rt-header :title="$t('new_noticeread')">
        </rt-header>
        <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch(1)" @search="handleSearch(2)" @reset="handleReset">
            <template slot="toolbar">
            </template>

            <template slot="more">
                <el-form :model="queryForm" ref="queryForm" label-position="left" label-width="120px">
                    <el-row :gutter="40" type="flex">
                        <el-col :span="8">
                            <el-form-item :label="$t('startDate')" prop="dateBegin">
                                <el-date-picker class="data-input" v-model="queryForm.dateBegin" type="date" :placeholder="this.$t('SelectDate')" @change="startDateCheck">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('endDate')" prop="dateEnd">
                                <el-date-picker class="data-input" v-model="queryForm.dateEnd" type="date" :placeholder="this.$t('SelectDate')" @change="endDateCheck">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-show="true">
                            <el-form-item :label="$t('noticeType')" prop="noticeType">
                                <el-select class="rt-portal-item-select" v-model="queryForm.noticeType" :placeholder="this.$t('Select')" clearable>
                                    <el-option v-for="item in noticeTypes" :key="item.Value" v-bind:label="item.Text" v-bind:value="item.Value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" type="flex">
                        <el-col :span="8">
                            <el-form-item :label="$t('noticeTitle')" prop="title">
                                <el-input v-model="queryForm.title" :placeholder="$t('Input')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('noticeState')" prop="readStatus">
                                <el-select class="rt-portal-item-select" v-model="queryForm.readStatus" :placeholder="this.$t('Select')" clearable>
                                    <el-option v-for="item in readstatusList" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('new_noticeread.new_replystatus')" prop="replyStatus">
                                <el-select class="rt-portal-item-select" v-model="queryForm.replyStatus" :placeholder="this.$t('Select')" clearable>
                                    <el-option v-for="item in replystatusList" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>

            <!-- 公告列表 -->
            <el-table ref="gridTable" v-bind:data="tableData" stripe tooltip-effect="dark" style="width: 100%" v-loading="loading" @row-dblclick="handleView" :default-sort="{prop: 'PublishDate', order: 'descending'}" @sort-change="sortchange">
                <el-table-column sortable='custom' :label="$t('new_notice.new_publishdate')" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleView(scope.row)">{{scope.row.PublishDate}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="OwnerIdName" :label="$t('new_notice.ownerid')">
                </el-table-column>
                <el-table-column prop="NoticeTypeName" :label="$t('new_notice.new_type')">
                </el-table-column>
                <el-table-column prop="Title" :label="$t('new_notice.new_title')">
                </el-table-column>
                <el-table-column prop="IsReply" :label="$t('new_notice.new_isreply')" width="195">
                </el-table-column>
                <el-table-column prop="IsUrgent" :label="$t('new_notice.new_isurgent')">
                </el-table-column>
                <el-table-column prop="ReaderName" :label="$t('new_noticeread.new_readername')">
                </el-table-column>
                <el-table-column prop="ReadStatus" :label="$t('new_noticeread.new_readstatus')" width="165">
                </el-table-column>
            </el-table>

        </rt-grid>
    </div>
</template>

    <script type="text/javascript">
export default {
    data() {
        return {
            queryForm: {
                //查询条件

                dateBegin: '',
                dateEnd: '',
                noticeType: '',
                title: '',
                readStatus: '',
                replyStatus: '',
            },
            noticeTypes: [],

            readstatusList: [],
            replystatusList: [],

            orderby: 'PublishDate,descending',
            orderby: '',


            loading: true,
            //公告列表分页
            tableData: [],
            pageCookie: '',
            isneedCookie: false,

            dataTotalCount: 0,
            searchtype: 1
        }
    },
    mounted: function() {

        this.getNoticeType();

        this.readstatusBind();
        this.replystatusBind();
        this._fetchRecords();

    },
    computed: {
        //过滤条件
        filter() {

            var f = '';
            if (this.searchtype == 1 && this.$refs.grid.quickSearch) {
                f = 'title=' + this.$refs.grid.quickSearch;
                return f;
            }
            else if (this.searchtype == 2) {

                //结束时间
                if (this.queryForm.dateBegin) {
                    this.queryForm.dateBegin = rt.formatDateTime(this.queryForm.dateBegin, "yyyy-mm-dd HH:MM:ss"),
                        f += 'dateBegin=' + this.queryForm.dateBegin + ',';
                }

                //开始时间
                if (this.queryForm.dateEnd) {
                    this.dateEnd = rt.formatDateTime(this.queryForm.dateEnd, "yyyy-mm-dd HH:MM:ss"),
                        f += 'dateEnd=' + this.queryForm.dateEnd + ',';
                }

                //公告类别
                if (this.queryForm.noticeType) {
                    f += 'noticeType=' + this.queryForm.noticeType + ',';
                }

                //公告标题
                if (this.queryForm.title) {
                    f += 'title=' + this.queryForm.title + ',';
                }

                //阅读状态
                if (this.queryForm.readStatus) {
                    f += 'readStatus=' + this.queryForm.readStatus + ',';
                }

                //回复状态
                if (this.queryForm.replyStatus) {
                    f += 'replyStatus=' + this.queryForm.replyStatus + ',';
                }
            }
            if (f.length > 0) {
                return f.substring(f, f.length - 1);
            }
            return '';
        }
    },
    methods: {
        handleReset() {
            this.$refs['queryForm'].resetFields();
        },
        handlePageChange() {
            this._fetchRecords();
        },
        handleSearch(val) {
            //this.$refs.grid.reset();
            this.searchtype = val;

            this._fetchRecords();
        },
        //查看公告
        handleView(row) {
            //更新阅读状态
            let apiUrl = '../api/PortalNotice/UpdateNoticeReadStatus'
            rt.post(apiUrl, '=' + row.Id).then((res) => {

            }).catch((error) => {
                rt.showErrorToast(error)
            })
            this.$router.push({ name: "NoticeView", params: { id: row.Id } })
        },
        //公告类型
        getNoticeType() {

            let apiUrl = '../api/PortalNotice/GetNoticeType'
            let that = this
            rt.get(apiUrl).then((res) => {
                that.noticeTypes = res
            }).catch((error) => {
                rt.showErrorToast(error);
            })
        },

        //公告列表
        _fetchRecords() {

            var pageIndex = this.$refs.grid.getPageIndex();
            var pageSize = this.$refs.grid.getPageSize();


            this.loading = true
            let apiUrl = '../api/PortalNotice/GetNoticeList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&filter=' + this.filter + '&orderby=' + this.orderby;
            this.isneedCookie = false
            let that = this;
            rt.get(apiUrl).then((res) => {
                for (var i = 0; i < res.noticeList.length; i++) {
                    if (res.noticeList[i].IsUrgent) {
                        res.noticeList[i].IsUrgent = '是'
                    } else {
                        res.noticeList[i].IsUrgent = '否'
                    }
                    if (res.noticeList[i].IsReply) {
                        res.noticeList[i].IsReply = '是'
                    } else {
                        res.noticeList[i].IsReply = '否'
                    }
                }

                that.tableData = res.noticeList
                that.pageCookie = res.PagingCookie

                that.dataTotalCount = res.TotalRecordCount

                that.loading = false
            }).catch((error) => {
                rt.showErrorToast(error);
                that.loading = false;
            });
        },

        //阅读状态
        readstatusBind() {
            let that = this
            var requestStr = '../api/crmpicklist/options/new_noticeread/new_readstatus';
            rt.get(requestStr)
                .then((picklist) => {
                    that.readstatusList = picklist;
                })
                .catch((error) => {
                    rt.showErrorToast(error);
                });
        },

        //回复状态
        replystatusBind() {
            let that = this
            var requestStr = '../api/crmpicklist/options/new_noticeread/new_replystatus';
            rt.get(requestStr)
                .then((picklist) => {
                    that.replystatusList = picklist;
                })
                .catch((error) => {
                    rt.showErrorToast(error);
                });
        },
        //排序处理
        sortchange(val) {
            if (val.prop) {
                if (val.prop == "PublishDate") {
                    this.orderby = "new_publishdate" + ',' + val.order;
                }

                this.tableData = [];
                this._fetchRecords();
            }
        },
        //结束时间change事件
        endDateCheck: function() {
            if (this.queryForm.dateBegin) {
                if (this.queryForm.dateBegin > this.queryForm.dateEnd) {
                    rt.showErrorToast("结束时间必须大于等于开始时间");
                    this.queryForm.dateEnd = null;
                }
            }

        },
        //开始时间change事件
        startDateCheck: function() {
            if (this.queryForm.dateEnd) {
                if (this.queryForm.dateBegin > this.queryForm.dateEnd) {
                    rt.showErrorToast("开始时间必须小于等于结束时间");
                    this.queryForm.dateBegin = null;
                }
            }
        },
    }
}
</script>

    <style>
.data-input {
    width: 100% !important;
}

.tableData .view-form-btn {
    font-family: "微软雅黑" !important;
    padding: 0 !important;
}
</style>
