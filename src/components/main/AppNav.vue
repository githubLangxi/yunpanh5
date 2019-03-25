<template>
	<div id="appNav">
		<div class="wrapper">
			<el-menu class="el-menu--portal" mode="horizontal" @select="onMenuSelected">
				<div v-for="(menu,index) in menuList" v-bind:key="menu.MenuId" v-if="index>0">
					<el-menu-item v-if="menu.SubMenu.length ==0" :index="menu.FormUrl">{{ menu.MenuDesc }}</el-menu-item>
					<el-submenu v-else :index="menu.MenuDesc">
						<!-- <template slot="title">{{ $t(menu.MenuCode) }}</template> -->
						<template slot="title">{{ menu.MenuDesc }}</template>
						<el-menu-item v-for="subMenu in menu.SubMenu" :key="subMenu.FormUrl" :index="subMenu.FormUrl">{{ subMenu.MenuDesc }}</el-menu-item>
					</el-submenu>
				</div>
			</el-menu>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: ["menuList"],

		mounted: function() {},
		methods: {
			onMenuSelected(key, keyPath) {
				sessionStorage.removeItem("conditionData");
				this.$router.push({
					path: "/" + key
				}); //取配置地址
			}
		}
	};
</script>

<style>
	/*#appNav {
		height: 44px;
		line-height: 44px;
		display: flex;
		flex: 1;
		justify-content: flex-start;
	}*/
	
	#appNav{
		margin-left: 80px;
	}
	
	#appNav .wrapper {
		margin: 0 auto;
		width: 450px;
	}
	
	.el-menu--portal {
		background-color: white !important;
	}
	
	.el-menu--portal.el-menu--horizontal .el-menu-item {
		height: 44px;
		line-height: 44px;
	}
	
	.el-menu--portal.el-menu--horizontal .el-submenu .el-submenu__title {
		height: 44px;
		line-height: 44px;
	}
	
	.el-menu--portal .el-menu-item,
	.el-menu--portal .el-submenu__title {
		color: #054994;
	}
	
	.el-menu--portal .el-menu-item:hover,
	.el-menu--portal .el-submenu__title:hover {
		background-color: #468FF9;
		color: #468FF9;
	}
	
	.el-menu--portal .el-submenu .el-menu {
		background-color: #384250;
	}
	
	.el-menu--portal .el-submenu .el-menu .el-menu-item:hover {
		background-color: #384250;
	}
	
	.el-menu--portal.el-menu--horizontal .el-menu-item:hover,
	.el-menu--portal.el-menu--horizontal .el-submenu__title:hover {
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3px 3px 0px rgba(8, 62, 89, 0.05);
	}
	
	.el-menu--portal.el-menu--horizontal .el-submenu .el-menu-item,
	.el-menu--portal.el-menu--horizontal .el-submenu .el-submenu-title {
		background-color: #384250;
		color: #ffffff;
		height: 40px;
		line-height: 40px;
		
	}
	
	.el-menu--portal.el-menu--horizontal .el-submenu .el-menu-item:hover,
	.el-menu--portal.el-menu--horizontal .el-submenu .el-submenu-title:hover {
		/* background-color: #384250; */
		font-weight: bolder;
		background-color: rgba(206, 206, 206, 0.33);
	}
	
	.el-menu--portal.el-menu--horizontal .el-submenu>.el-menu {
		background-color: #384250 !important;
		top: 43px;
		min-width: 220px;
		border: 0;
	}
	
	.el-menu--portal.el-menu--horizontal .el-menu-item.is-active {
		color: #ffffff;
	}
	
	.el-menu--portal.el-menu--horizontal .el-menu-item.is-active .el-submenu-title {
		background-color: transparent;
	}
	
	.el-menu--portal.el-menu--horizontal .el-submenu.is-active .el-submenu__title {
		border-bottom-color: transparent;
	}
	
	.el-menu--portal.el-menu--horizontal .el-icon-caret-bottom:before {
		content: "";
	}
	
	/*@media screen and (min-width: 1920px) {
		#appNav .wrapper {
			width: 1488px;
		}
	}*/
</style>