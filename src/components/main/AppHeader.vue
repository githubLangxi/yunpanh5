<template>
	<div>
		<div id="appHeader" class="appHeader">
			<span class="logo" @click="goHome">
       </span>
			<app-nav :menu-list="menuList"></app-nav>
			<ul class="userinfo">
				<li class="user-neme">{{UserName}}</li>
				<li class="user-headpic">
					<img class="avatar" :src="avatarUrl || defaultAvatar" @error="errorAvatar" />
				</li>
				<li class="people-name">{{$store.state.user.userName}}</li>
				<!--<li class="dashed"></li>
				<li class="appHeader-icon"></li>
				<li class="appHeader-icon home-icon"></li>-->
			</ul>
		</div>
		<div class="appHeader" v-if="showFlag">
			<span class="logo" @click="goHome">
       </span>
			<app-nav :menu-list="menuList"></app-nav>
			<ul class="userinfo">
				<li class="user-neme">{{UserName}}</li>
				<li class="user-headpic">
					<img class="avatar" :src="avatarUrl || defaultAvatar" @error="errorAvatar" />
				</li>
				<li class="people-name">{{$store.state.user.userName}}</li>
				<!--<li class="dashed"></li>
				<li class="appHeader-icon"></li>
				<li class="appHeader-icon home-icon"></li>-->
			</ul>
		</div>
	</div>
</template>

<script>
	import defaultAvatar from '../../assets/imgs/default_avatar.png';
	import LanguageComponent from '../Language'
	import ChangePasswordDialog from '../ChangePasswordDialog'
	import ChangeAvatarDialog from '../ChangeAvatarDialog'
	import AppNav from './AppNav'

	export default {
		data() {
			return {
				isShowProfile: false,
				defaultAvatar: defaultAvatar,
				UserName: "",
				passwordDialogVisible: false,
				avatarDialogVisible: false,
				menuList: [],
				showFlag: false,
			}
		},
		watch: {
			
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			avatarUrl() {
				var avatarUrl = this.$store.state.user.avatarUrl;
				if(rt.isNullOrWhiteSpace(avatarUrl)) {
					return null;
				}

				return rt.getBaseUrl() + avatarUrl;
			}
		},
		components: {
			'language': LanguageComponent,
			'change-avatar-dialog': ChangeAvatarDialog,
			'change-password-dialog': ChangePasswordDialog,
			'app-nav': AppNav,
		},
		beforeDestroy() {
			
		},
		mounted: function() {
			this.UserName = this.$store.state.user.nickName;
			this.bindMenus();
			/*let body = document.getElementsByTagName("body")[0];
			body.onscroll = this.scroll;*/
			window.addEventListener('scroll', this.scroll)
		},
		methods: {
			scroll() {
				let top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
					target = document.getElementById("appHeader").offsetTop;
				if(top >= target) {
					this.showFlag = true;
				} else {
					this.showFlag = false;
				}
			},
			logout() {
				this.$auth.logout();
			},
			showAvatarDialog() {
				this.$refs.dlgAvatar.show();
			},
			showPasswordDialog() {
				this.$refs.dlgPassword.show();
			},
			errorAvatar() {
				this.avatarUrl = null;
				this.$store.commit("UPDATE_USER_AVATAR", null);
			},
			bindMenus() {
				var apiUrl = '../api/PortalMenu/UserMenu/Web';
				rt.get(apiUrl)
					.then((menuList) => {
						this.menuList = this.menuList.concat(menuList);
					}).catch((error) => {
						rt.showErrorToast(error);
					})
			},
			goHome() {
				this.$router.push({
					path: "/Home"
				}); //取配置地址
			}
		}
	}
</script>

<style lang="scss">
	#appHeader,
	.appHeader {
		height: 56px;
		background-color: #ffffff;
		margin: 0 auto;
		display: flex;
		/*justify-content: space-between;*/
		align-items: center;
		position: relative;
		.logo {
			width: 200px;
			height: 25px;
			background: yellowgreen;
			margin-left: 40px;
			background: url(../../assets/imgs/logo.png) no-repeat center;
			background-size: 100% 100%;
			cursor: pointer;
		}
		.userinfo {
			display: flex;
			position: absolute;
			align-items: center;
			justify-content: flex-end;
			height: 18px;
			font-size: 18px;
			font-family: "微软雅黑";
			font-weight: bold;
			margin-right: 18px;
			right: 22px;
			color: #054994;
			li {
				display: flex;
			}
		}
		.user-headpic {
			width: 31px;
			height: 31px;
			border-radius: 50%;
			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.people-name {
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			margin-left: 8px;
		}
		.dashed:after {
			content: "";
			display: inline-block;
			height: 18px;
			border-right: 3px dotted #888;
			margin-left: 16px;
		}
		.appHeader-icon {
			width: 18px;
			height: 18px;
			margin-left: 20px;
			background: url(../../assets/imgs/setting.png) no-repeat center;
			background-size: 100% 100%;
		}
		.home-icon {
			background: url(../../assets/imgs/home.png) no-repeat center;
			background-size: 100% 100%;
		}
		.user-neme {
			margin-right: 16px;
		}
	}
	
	.appHeader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 20;
		background: white;
		box-shadow: 0 0 2px rgba(0, 0, 0, .4);
	}
</style>