<template>
    <avatar-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" v-model="dialogVisible" :width="150" :height="150" :url="url" :params="params" :headers="headers" img-format="png">
    </avatar-upload>
</template>
<script>

import AvatarUploadComponent from 'vue-image-crop-upload'
export default {
    // props() {
    // },
    data() {
        return {
            dialogVisible: false,
            params: {},
            headers: {
                "Authorization": "Bearer " + this.$store.state.auth.accessToken
            }
        };
    },
    components: {
        'avatar-upload': AvatarUploadComponent
    },
    computed: {
        url() {
            return rt.getBaseUrl() + "api/portaluser/avatar"
        }
    },
    methods: {
        cropSuccess() { },
        cropUploadSuccess(res) {
            this.$store.commit("UPDATE_USER_AVATAR", res.Data + "?d=" + new Date().getTime());
        },
        cropUploadFail() { },
        show() {
            this.dialogVisible = true;
        },
        hide(){
            this.dialogVisible = false;
        }
    }
}
</script>

