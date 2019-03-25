<template>
    <div id="appContent">
        <div class="wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        /*this.calculateContentHeight();
        window.onresize = this.calculateContentHeight;*/
    },
    methods: {
        calculateContentHeight() {
            /*var contentHeight = document.body.clientHeight;

            var appHeader = document.getElementById("appHeader");
            if (appHeader != null) {
                contentHeight -= appHeader.clientHeight;
            }

            var appNav = document.getElementById("appNav");
            if (appNav != null) {
                contentHeight -= appNav.clientHeight;
            }

            var appFooter = document.getElementById("appFooter");
            if (appFooter != null) {
                contentHeight -= appFooter.clientHeight;
            }

            document.getElementById("appContent").style.minHeight = contentHeight - 10;*/
        }
    }
}
</script>


<style>
#appContent {
    width: 100%;
    /*不能去掉，否则如果内容是float的会有问题*/
   min-height: calc(100% - 126px);
   display: flex;
   background: #f1f2f6;
   flex: 1;
}

#appContent .wrapper {
   /* padding: 0 50px;
    margin: 0 auto;*/
   width: calc(100% - 76px);
   margin: 0 auto;
}
</style>
