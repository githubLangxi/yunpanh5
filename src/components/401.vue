<template>
    <div class="div-401">
        <div class="img-box">
            <img src="../assets/imgs/401.png" alt=""><br>
            <div class="font-box">
                <p>抱歉，您没有访问权限哦...</p>
                <span>错误代码：401</span>
            </div>
            <el-button class="button-style" v-show="isLogin" @click="backToHome">返回首页</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isLogin:false
        }
    },
    mounted: function() {
        if(this.$store.state.auth.isLoggedIn){
            this.isLogin = true
        }
    },
    methods: {
        backToHome () {
            this.$router.push('/home')
        }
    }
}
</script>

<style scoped>
    .div-401{
        width: 100%;
        height: 100%;
        text-align: center;
        vertical-align: middle;
    }
    .div-401 button{
        width:142px;
        height: 24px;
        color:#888;
        line-height:8px;
        border-radius: 20px;
        vertical-align: middle;
        border: 1px solid #888!important;
    }
    .button-style:hover {
        border: 1px solid #09f!important;
        color: #fff!important;
        background: #09f;
    }
        .div-401 button > span{
            font-size: 14px;
            color: #888;
        }
    .img-box{
        padding-top: 60px;
    }
        .img-box p{
            font-size: 32px;
            color: #555;
            margin-bottom: 14px;
            font-family: "Microsoft YaHei";
        }
        .img-box img{
            margin-bottom: 30px;
        }
    .font-box{
        margin-bottom: 40px;
    }
        .font-box span{
            font-size:24px;
            font-family: "Microsoft YaHei";
            color: #888!important;
        }
</style>
