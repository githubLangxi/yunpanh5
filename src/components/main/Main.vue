<template>
    <div class="container">
    	<sevice-notice></sevice-notice>
         <app-header></app-header> 
       <!-- <app-nav :menu-list="menuList"></app-nav>-->
        <app-content></app-content>
        <app-footer></app-footer>
    </div>
</template>

<script>
//服务单消息
import ServiceNotice from './seviceNotice'
//头部
import AppHeader from './AppHeader'
//菜单
import AppNav from './AppNav'
//内容
import AppContent from './AppContent'
//底部
import AppFooter from './AppFooter'

export default {
    data() {
        return {
            menuList: []
        }
    },
    components: {
    	'sevice-notice':ServiceNotice,
        'app-header': AppHeader,
        'app-nav': AppNav,
        'app-content': AppContent,
        'app-footer': AppFooter
    },
    mounted: function () {
        this.bindMenus();
    },
    methods: {
        bindMenus() {
            var apiUrl = '../api/PortalMenu/UserMenu/Web';
            rt.get(apiUrl)
                .then((menuList) => {
                    this.menuList = this.menuList.concat(menuList);
                }).catch((error) => {
                    rt.showErrorToast(error);
                })
        }
    }
}
</script>

<style>
.container {
    position: relative;
    min-width: 1200px;
}
</style>
