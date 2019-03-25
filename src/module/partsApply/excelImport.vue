<template>
    <div class="vue-xlsx-container">
        <el-input type="textarea" v-model="desc" :rows="6" readonly style="width:500px;height:200px"></el-input>
        <br/>
        <el-button type="button" class="xlsx-button" @click="handleUploadBtnClick">
            选择文件
        </el-button>
        <input id="upload-input" type="file" :accept="accept" class="c-hide" @change="handkeFileChange">
    </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
    name: 'vue-xlsx-table',
    data() {
        return {
            desc: '',
            rawFile: null,
            workbook: null,
            tableData: {
                header: [],
                body: []
            },
            accept: {
                type: String,
                default: '.xlsx, .xls'
            }
        }
    },
    props: [
        'api',
    ],
    computed: {
        rABS() {
            return true;
        }
    },
    mounted: function () {
    },
    methods: {
        handkeFileChange(e) {
            if (this.rawFile !== null) {
                return
            }

            this.rawFile = e.target.files[0]
            this.fileConvertToWorkbook(this.rawFile)
                .then((workbook) => {
                    var data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
                    var desc1 = JSON.stringify(data);
                    this.desc = desc1;
                    console.log(this.desc)
                    var params = { "": "aaa" };
                    rt.post(this.api, params)
                        .then(function (res) {
                            console.log(res);
                        }).catch((error) => {
                            console.error(error)

                        })
                    rt.get("../api/PortalNotice/GetNoticeList?pageSize=10&pageIndex=1")
                        .then(function (res) {
                            console.log(rs)
                        })
                    // let xlsxArr = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
                    // this.workbook = workbook
                    // this.initTable(
                    //     this.xlsxArrToTableArr(xlsxArr)
                    // )

                })
                .catch((err) => {
                    console.error(err)
                })
        },
        fixdata(data) { //文件流转BinaryString
            var o = "",
                l = 0,
                w = 10240;
            for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
            return o;
        },
        fileConvertToWorkbook(file) {

            let reader = new FileReader()
            // let fixdata = (data) => {
            //     let o = "", l = 0, w = 10240
            //     for (; l < data.byteLength / w; ++l) {
            //         o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
            //     }
            //     o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
            //     return o
            // }
            return new Promise((resolve, reject) => {
                try {
                    reader.onload = (renderEvent) => {
                        let data = renderEvent.target.result
                        // console.log(data)
                        if (false) {
                            /* if binary string, read with type 'binary' */
                            // resolve(XLSX.read(data, { type: 'binary' }))
                            var sss = XLSX.read(data, { type: 'binary' });
                            // console.log(sss);
                            resolve(sss);
                        } else {
                            /* if array buffer, convert to base64 */
                            console.log(data)
                            let arr = this.fixdata(data)
                            // console.log(arr);
                            var nnn = XLSX.read(btoa(arr), { type: 'base64' });
                            resolve(nnn)
                        }
                    }
                    reader.onerror = (error) => {
                        reject(error)
                    }
                    if (false) {
                        reader.readAsBinaryString(file)
                    } else {
                        reader.readAsArrayBuffer(file)
                    }
                } catch (error) {
                    reject(error)
                }
            })
        },
        xlsxArrToTableArr(xlsxArr) {
            let tableArr = []
            let length = 0
            let maxLength = 0
            let maxLengthIndex = 0
            xlsxArr.forEach((item, index) => {
                length = Object.keys(item).length
                if (maxLength < length) {
                    maxLength = length
                    maxLengthIndex = index
                }
            })
            let tableHeader = Object.keys(xlsxArr[maxLengthIndex])
            let rowItem = {}
            xlsxArr.forEach((item) => {
                rowItem = {}
                for (let i = 0; i < maxLength; i++) {
                    rowItem[tableHeader[i]] = item[tableHeader[i]] || ''
                }
                tableArr.push(rowItem)
            })
            return {
                header: tableHeader,
                data: tableArr
            }
        },
        tableArrToXlsxArr({ data, header }) {
            let xlsxArr = []
            let tempObj = {}
            data.forEach((rowItem) => {
                tempObj = {}
                rowItem.forEach((item, index) => {
                    tempObj[header[index]] = item
                })
                xlsxArr.push(tempObj)
            })
            return xlsxArr
        },
        initTable({ data, header }) {
            this.tableData.header = header
            this.tableData.body = data
            this.$emit('on-select-file', this.tableData)
        },
        handleUploadBtnClick() {
            this.clearAllData()
            document.getElementById('upload-input').click()
        },
        clearAllData() {
            document.getElementById('upload-input').value = null
            this.tableData = {
                header: [],
                body: []
            }
            this.rawFile = null
            this.workbook = null
        }
    }
}
</script>

<style>
.vue-xlsx-container {
    display: inline-block;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.xlsx-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #20a0ff;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    padding: 7px 9px;
    font-size: 12px;
    border-radius: 4px;
    color: #fff;
    background-color: #20a0ff;
}
</style>
