<template>
    <el-dialog size="auto" :title="title" :close-on-click-modal="false" :before-close="handleDialogClose" :visible.sync="dialogVisible">
        <div class="rt-excel-import">
            <div class="rt-excel-import_tip">
                只能上传Excel(xls或xlsx)文件，且记录数不超过5000条
            </div>
            <el-upload ref="upload" drag action="/" accept=".xls,.xlsx" :http-request="handleHttpRequest" :show-file-list="false" :on-change="handleChange" :multiple="false" :auto-upload="false">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或
                    <em>点击上传</em>
                </div>
                <div slot="tip" class="el-upload__tip">已选择文件：{{selectedFile.name}}</div>
            </el-upload>

            <div class="rt-excel-import__result" :class="{'rt-excel-import__result_error':!isSuccessed,'rt-excel-import__result_success':isSuccessed}">
                <pre>{{importResult}}</pre>
            </div>

            <div style="height:40px;line-height:40px;">
                <span v-if="templateUrl">
                    <a target="_blank" :href="templateExcelUrl">下载模板</a>
                </span>
                <div style="float:right;margin-top:10px;">
                    <el-button type="primary" @click="handleImport" :loading="isImporting">导 入</el-button>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "RtExcelImportDialog",
    props: {
        title: {
            type: String,
            require: true
        },
        action: {
            type: String,
            require: true
        },
        templateUrl: String,
        onSuccess: Function
    },
    data() {
        return {
            dialogVisible: false,

            isImporting: false,
            selectedFile: {},
            importResult: null,
            isSuccessed: null
        }
    },
    computed: {
        templateExcelUrl() {
            return rt.getBaseUrl() + this.templateUrl;
        }
    },
    methods: {
        handleChange(file, fileList) {
            this.selectedFile = file;
        },
        handleImport() {
            this.$refs.upload.submit();
        },
        handleHttpRequest() {
            if (this.isImporting) {
                return;
            }

            this.importResult = null;
            this.isSuccessed = null;

            this.isImporting = true;
            var data = new FormData();
            data.append("file", this.selectedFile.raw);

            rt.post(this.action, data)
                .then((res) => {
                    this.isSuccessed = true;
                    this.importResult = res;
                    this.isImporting = false;

                    if (this.onSuccess) {
                        this.onSuccess();
                    }
                }, (error) => {
                    this.isSuccessed = false;
                    this.importResult = error;
                    this.isImporting = false;
                });
        },
        handleDialogClose() {
            this._reset();

            this.dialogVisible = false;
        },
        show() {
            this.dialogVisible = true;
        },
        _reset() {
            this.$refs.upload.clearFiles();

            this.isImporting = false;
            this.selectedFile = {};
            this.importResult = null;
            this.isSuccessed = null;
        }
    }
}
</script>