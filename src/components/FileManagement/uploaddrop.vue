<template>
<el-upload
  v-else
  class='ensure ensureButt'
  :action="importFileUrl"
  :data="upLoadData"
  name="importfile"
  :onError="uploadError"
  :onSuccess="uploadSuccess"
  :beforeUpload="beforeAvatarUpload"
>
</el-upload>

  <el-button size="small" type="primary">确定</el-button>
  </template>
<script>

  export default{
    data () {
      importFileUrl:'http:dtc.com/cpy/add';
        upLoadData:{
        cpyId: '123456';
          occurTime:'2017-08'
      }
    },
    methods: {
      // 上传成功后的回调
      uploadSuccess (response, file, fileList) {
        console.log('上传文件', response)
      },
      // 上传错误
      uploadError (response, file, fileList) {
        console.log('上传失败，请重试！')
      },
      // 上传前对文件的大小的判断
      beforeAvatarUpload (file) {
        const extension = file.name.split('.')[1] === 'xls'
        const extension2 = file.name.split('.')[1] === 'xlsx'
        const extension3 = file.name.split('.')[1] === 'doc'
        const extension4 = file.name.split('.')[1] === 'docx'
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!extension && !extension2 && !extension3 && !extension4) {
          console.log('上传模板只能是 xls、xlsx、doc、docx 格式!')
        }
        if (!isLt2M) {
          console.log('上传模板大小不能超过 10MB!')
        }
        return extension || extension2 || extension3 || extension4 && isLt2M
      }
    }

  }
</script>

<style>
</style>

