<template>
	<div class="noticeView">
		<rt-header :title="$t('new_notice')">
			<rt-toolbar show-autoback>
				<rt-button type="" :text="$t('BUTTON_REPLY')" @click="dialogFormVisible=true" v-if="IsShow" />
			</rt-toolbar>
		</rt-header>

		<rt-content>
			<el-form :model="viewForm" :rules="rules" ref="viewForm" label-width="120px" class="rt-portal-form rt-reset-form" :label-position="labelPosition" v-loading="loading">
				<!-- 表单第一行 -->
				<el-row :gutter="50" class="rt-portal-form-row">
					<el-col :span="6">
						<el-form-item :label="$t('new_noticeread.new_noticeid')">
							<el-input v-model="viewForm.Name" :disabled="!isNoticeView"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item :label="$t('new_notice.new_noticetypeid')" prop="NoticeTypeName">
							<el-input v-model="viewForm.NoticeTypeName" :disabled="!isNoticeView"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item :label="$t('new_notice.ownerid')" prop="OwnerIdName">
							<el-input v-model="viewForm.OwnerIdName" :disabled="!isNoticeView"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item :label="$t('new_notice.new_publishdate')" prop="PublishDate">
							<el-input v-model="viewForm.PublishDate" :disabled="!isNoticeView"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<!-- 表单第二行 -->
				<el-row :gutter="50" class="rt-portal-form-row">
					<el-col :span="6">
						<el-form-item :label="$t('new_notice.new_buid')" prop="BuidName">
							<el-input v-model="viewForm.BuidName" :disabled="!isNoticeView"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item :label="$t('new_notice.new_isurgent')">
							<el-checkbox name="type" v-model="viewForm.IsReply" class="notice-checkbox" :checked="checked" :disabled="!isNoticeView"></el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item :label="$t('new_notice.new_isreply')">
							<el-checkbox name="type" v-model="viewForm.IsUrgent" class="notice-checkbox" :checked="checked" :disabled="!isNoticeView"></el-checkbox>
						</el-form-item>
					</el-col>
				</el-row>

				<!-- 表单第三行 -->
				<el-row :gutter="50" class="rt-portal-form-row">
					<el-col :span="24">
						<el-form-item :label="$t('new_notice.new_title')" prop="Title">
							<el-input v-model="viewForm.Title" :disabled="!isNoticeView"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<!-- 表单第三行 -->
				<el-row :gutter="50" class="rt-portal-form-row">
					<el-col :span="24">
						<el-form-item :label="$t('new_notice.new_content')">
							<el-input type="textarea" autosize class="notice-textarea" v-model="viewForm.Content" :disabled="!isNoticeView">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<!-- 附件下载 -->
				<el-row>
					<el-col v-bind:span="24" class="rt-portal-list-head">
						<a class="rt-portal-title rt-portal-tip">{{$t('annotation')}}</a>
					</el-col>
				</el-row>
				<el-row :gutter="50" class="rt-portal-form-row rt-reset">
					<el-col :span="24">
						<el-table :data="tableFiled" max-height="500">
							<el-table-column width="230" prop="Filename" :label="$t('annotation.filename')">
							</el-table-column>
							<el-table-column prop="Filesize" :label="$t('annotation.filesize')">
							</el-table-column>
							<el-table-column prop="Createdon" :label="$t('annotation.createdon')">
							</el-table-column>
							<el-table-column :label="$t('ACT')">
								<template slot-scope="scope">
									<a :href="scope.row.filelink" :download="scope.row.Filename" @click="downloadFile(scope.$index,scope.row)" class="row-opera">{{$t('DownLoad')}}</a>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				</el-row>
				<!--  </el-tab-pane> -->

				<!--  <el-tab-pane label="回复内容" name="third" v-if="viewForm.IsReply"> -->
				<el-row v-if="IsShowCont">
					<el-col v-bind:span="24" class="rt-portal-list-head">
						<a class="rt-portal-title rt-portal-tip">{{$t('ReplyContent')}}</a>
					</el-col>
				</el-row>
				<el-row :gutter="50" class="rt-portal-form-row rt-reset" v-if="IsShowCont">
					<el-col :span="24">
						<el-input disabled type="textarea" class="notice-textarea" v-model="replyContent">
						</el-input>
					</el-col>
				</el-row>
			</el-form>

		</rt-content>

		<el-dialog :title="$t('BUTTON_REPLY')" :visible.sync="dialogFormVisible">
			<el-form>
				<el-form-item>
					<el-input type="textarea" class="notice-textarea" v-model="replyContent" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">{{$t('BUTTON_CANCEL')}}</el-button>
				<el-button type="primary" @click="reply">{{$t('BUTTON_DETERMINE')}}</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script type="text/javascript">
export default {

	data() {
		return {
			loading: false,
			labelPosition: 'left', //控制必填项*的位置
			viewForm: {
				Name: '', //公告单号
				NoticeTypeName: '',  //公告类型
				OwnerIdName: '', //发布人
				PublishDate: '',//发布日期
				BuidName: '',//发布部门
				IsReply: '',//是否需要回复
				IsUrgent: '',//是否紧急
				Title: '',//公告标题
				Content: ''//公告内容
			},
			rules: {
				NoticeTypeName: [
					{ required: true, message: '请选择公告类型', trigger: 'blur' }
				],
				OwnerIdName: [
					{ required: true, message: '请选择发布人', trigger: 'change' }
				],
				PublishDate: [
					{ required: true, message: '请选择发布日期', trigger: 'change' }
				],
				BuidName: [
					{ required: true, message: '请选择发布部门', trigger: 'change' }
				],
				Title: [
					{ required: true, message: '请选择发布标题', trigger: 'change' }
				]
			},
			tableFiled: [],
			activeName: 'first',
			checked: false,
			isNoticeView: false,
			noticeId: '',
			replyContent: '',
			IsShow: false,
			IsReplyContent: false,
			dialogFormVisible: false,
			IsShowCont: false

		};
	},
	mounted: function() {
		if (this.$route.params.id) {
			this.noticeId = this.$route.params.id;
		}
		this.getNoticeDetail();

	},
	methods: {

		//数据初始化
		getNoticeDetail() {
			//this.loading=false

			let apiUrl = '../api/PortalNotice/GetNoticeById?id=' + this.noticeId
			rt.get(apiUrl).then((res) => {
				this.viewForm = res;
				if (res.IsReply) {
					this.IsShow = true;
				}
				if (res.ReplyContent) {
					this.replyContent = res.ReplyContent;
					this.IsReplyContent = true;
					this.IsShow = false;
					this.IsShowCont = true;
				}

				let annotation = res.AnnotationList;
				let list = []
				annotation.map((step) => {
					let filelink = 'data:' + step.Mimetype + ";base64," + step.Documentbody;
					let blob = this.base64Img2Blob(filelink)
					step.filelink = window.URL.createObjectURL(blob);
					step.blob = blob
					list.push(step)
				})
				this.tableFiled = list;
			}).catch((error) => {
				rt.showErrorToast(error)
			})
		},

		//公告回复
		reply() {

			let apiUrl = '../api/PortalNotice/UpdateNoticeReply'
			let params = {
				id: this.noticeId,
				ReplyContent: this.replyContent
			}
			let that = this
			rt.post(apiUrl, params).then((res) => {

				that.getNoticeDetail();
				// that.$message({
				// 	 type:success,
				// 	 message:'回复成功'
				// })
				that.dialogFormVisible = false

			}).catch((error) => {
				rt.showErrorToast(error)
			})
		},
		base64Img2Blob: function(code) {
			var parts = code.split(';base64,');
			var contentType = parts[0].split(':')[1];
			var raw = window.atob(parts[1]);
			var rawLength = raw.length;

			var uInt8Array = new Uint8Array(rawLength);

			for (var i = 0; i < rawLength; ++i) {
				uInt8Array[i] = raw.charCodeAt(i);
			}
			return new Blob([uInt8Array], { type: contentType });
		},


		//附件下载
		downloadFile(index, row) {

			let filelink = 'data:' + row.Mimetype + ";base64," + row.Documentbody;
			console.log(filelink)
			row.blob = this.base64Img2Blob(filelink)
			row.filelink = window.URL.createObjectURL(row.blob);
			//console.log(row.filelink)        
			let userAgent = navigator.userAgent;

			if (userAgent.indexOf("Trident") > -1) {
				//用于IE浏览器
				window.navigator.msSaveBlob(row.blob, row.Filename);
			}

		}

	}
}
</script>

<style>
.noticeView .replay-btn {
	width: 80px;
	height: 30px;
	background: #0078d7;
	line-height: 20px;
	text-align: center;
	color: #fff;
}

.noticeView .notice-textarea textarea {
	resize: none;
	min-height: 120px !important;
}

.noticeView .view-form-btn {
	font-family: "微软雅黑" !important;
	padding: 0 !important;
}

.noticeView .notice-checkbox {
	margin-top: 5px;
}

.noticeView .el-form-item__label {
	text-align: left;
}

.row-opera {
	text-decoration: none !important;
}

.rt-portal-tip {
	font-size: 18px;
}

.rt-reset-form {
	margin-top: 30px;
}

.rt-reset {
	margin-top: 15px;
}

.rt-head-reply {
	margin-top: 24px;
	position: relative;
}

.reply-button {
	width: 80px;
	position: absolute;
	right: 0;
}

.is-disabled .el-input__inner,
.el-textarea__inner {
	background-color: white !important;
	color: black !important;
}
</style>
